import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting simple en mémoire (pour le middleware edge)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requêtes par minute

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
        return false;
    }

    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
        return false;
    }

    record.count++;
    return record.count > MAX_REQUESTS;
}

// Génère le token attendu (doit matcher celui de l'API)
function generateExpectedToken(password: string): string {
    // Simple hash pour Edge Runtime (pas de crypto.createHmac)
    // Le vrai hash est généré côté API, ici on vérifie juste le format
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'indhack-admin-session');
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rate limiting pour les APIs
    if (pathname.startsWith('/api/')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Trop de requêtes. Réessayez plus tard.' },
                { status: 429 }
            );
        }
    }

    // Protection des routes admin
    if (pathname.startsWith('/keystatic') || pathname.startsWith('/dashboard')) {
        const authCookie = request.cookies.get('admin_auth');

        // Vérifie si le cookie existe et a un format valide (hash hex de 64 chars)
        if (authCookie?.value && /^[a-f0-9]{64}$/.test(authCookie.value)) {
            return NextResponse.next();
        }

        // Pas de cookie valide → redirection vers login
        return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/keystatic/:path*',
        '/dashboard/:path*',
        '/api/:path*',
    ],
};
