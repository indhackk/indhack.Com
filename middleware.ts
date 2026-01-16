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

// Nettoyage périodique du rate limit map
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap) {
        if (now - record.timestamp > RATE_LIMIT_WINDOW) {
            rateLimitMap.delete(ip);
        }
    }
}, 60 * 1000);

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
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!ADMIN_PASSWORD) {
            console.error('ADMIN_PASSWORD non configuré dans les variables d\'environnement');
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Vérifier si déjà authentifié (comparaison avec hash simple)
        if (authCookie?.value === Buffer.from(ADMIN_PASSWORD).toString('base64')) {
            return NextResponse.next();
        }

        // Tentative de login via query param
        const password = request.nextUrl.searchParams.get('password');
        if (password === ADMIN_PASSWORD) {
            const response = NextResponse.redirect(new URL(pathname, request.url));
            response.cookies.set('admin_auth', Buffer.from(ADMIN_PASSWORD).toString('base64'), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 jours
                path: '/',
            });
            return response;
        }

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
