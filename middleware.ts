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

// Routes admin neutralisées par défaut en production. Indiana n'utilise pas
// le back-office Keystatic en production, donc on bloque proprement plutôt
// que de maintenir une auth fragile. Si besoin de réactiver un jour, mettre
// la variable d'environnement ADMIN_ENABLED=true sur Vercel.
const ADMIN_ENABLED = process.env.ADMIN_ENABLED === 'true';

function isAdminPath(pathname: string): boolean {
    return (
        pathname.startsWith('/keystatic') ||
        pathname.startsWith('/dashboard') ||
        pathname === '/admin-login' ||
        pathname.startsWith('/api/admin-auth')
    );
}

function blockAdminResponse(): NextResponse {
    // 404 propre, non indexable. On préfère 404 à 403 pour ne pas révéler
    // qu'une zone admin existe.
    return new NextResponse('Not Found', {
        status: 404,
        headers: {
            'X-Robots-Tag': 'noindex, nofollow',
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Si l'admin est désactivé (cas par défaut en prod), on 404 toutes les
    // routes admin avant même de regarder les cookies. Plus rien à indexer,
    // plus rien à brute-forcer.
    if (!ADMIN_ENABLED && isAdminPath(pathname)) {
        return blockAdminResponse();
    }

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

    // Protection des routes admin (uniquement si ADMIN_ENABLED=true)
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
        '/admin-login',
        '/api/:path*',
    ],
};
