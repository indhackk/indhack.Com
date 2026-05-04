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

/**
 * Génère le token attendu pour le cookie admin via Web Crypto API.
 * Doit produire EXACTEMENT le même hash que l'API /api/admin-auth :
 *   HMAC-SHA256(key=ADMIN_PASSWORD, message=ADMIN_PASSWORD + 'indhack-admin-session')
 */
async function generateExpectedToken(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(password);
    const messageData = encoder.encode(password + 'indhack-admin-session');

    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, messageData);
    const bytes = new Uint8Array(signature);
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += bytes[i].toString(16).padStart(2, '0');
    }
    return hex;
}

/** Comparaison à temps constant pour éviter les timing attacks. */
function safeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
}

export async function middleware(request: NextRequest) {
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

        // 1) Cookie absent ou format invalide → login.
        if (!authCookie?.value || !/^[a-f0-9]{64}$/.test(authCookie.value)) {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }

        // 2) Le mot de passe doit être configuré côté serveur. Sinon, on refuse.
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }

        // 3) Comparaison effective contre le vrai token attendu, pas seulement le format.
        try {
            const expected = await generateExpectedToken(adminPassword);
            if (!safeCompare(authCookie.value, expected)) {
                return NextResponse.redirect(new URL('/admin-login', request.url));
            }
        } catch {
            // En cas d'erreur cryptographique, on bloque.
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }

        return NextResponse.next();
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
