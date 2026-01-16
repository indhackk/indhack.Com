import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple password protection for admin routes
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'indhack2024';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /keystatic and /dashboard routes
    if (pathname.startsWith('/keystatic') || pathname.startsWith('/dashboard')) {
        const authCookie = request.cookies.get('admin_auth');

        // Check if already authenticated
        if (authCookie?.value === ADMIN_PASSWORD) {
            return NextResponse.next();
        }

        // Check for login attempt via query param
        const password = request.nextUrl.searchParams.get('password');
        if (password === ADMIN_PASSWORD) {
            const response = NextResponse.redirect(new URL(pathname, request.url));
            response.cookies.set('admin_auth', ADMIN_PASSWORD, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
            return response;
        }

        // Redirect to login page
        return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/keystatic/:path*', '/dashboard/:path*'],
};
