import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth Callback Handler
 *
 * This route handles the OAuth callback from Google after user authorization.
 * In production, this exchanges the auth code for access tokens.
 *
 * Required environment variables:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - NEXT_PUBLIC_APP_URL
 */

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Base redirect URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/outils/gmb-autopilot`;

    // Handle OAuth errors
    if (error) {
        console.error('Google OAuth error:', error);
        return NextResponse.redirect(
            `${redirectUrl}?error=${encodeURIComponent(error)}`
        );
    }

    // Validate code presence
    if (!code) {
        return NextResponse.redirect(
            `${redirectUrl}?error=missing_code`
        );
    }

    // In development/demo mode, just redirect with success
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.log('Demo mode: Skipping token exchange');
        return NextResponse.redirect(
            `${redirectUrl}?connected=true&demo=true`
        );
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${baseUrl}/api/auth/google/callback`,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error('Token exchange failed:', tokenData);
            return NextResponse.redirect(
                `${redirectUrl}?error=token_exchange_failed`
            );
        }

        // Create response with redirect
        const response = NextResponse.redirect(
            `${redirectUrl}?connected=true`
        );

        // Store tokens in a secure HTTP-only cookie
        // In production, you'd want to store this more securely (e.g., encrypted in a database)
        response.cookies.set('gmb_tokens', JSON.stringify({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            expiresAt: Date.now() + (tokenData.expires_in * 1000),
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return response;

    } catch (error) {
        console.error('OAuth callback error:', error);
        return NextResponse.redirect(
            `${redirectUrl}?error=callback_error`
        );
    }
}
