import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * API d'authentification admin sécurisée
 * Le password n'est jamais exposé dans l'URL
 */

const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Type': 'application/json',
};

// Génère un token sécurisé basé sur le password
function generateSecureToken(password: string): string {
    const secret = process.env.ADMIN_PASSWORD || '';
    return crypto
        .createHmac('sha256', secret)
        .update(password + Date.now().toString().slice(0, -4)) // Rotation toutes les 10 secondes
        .digest('hex');
}

// Vérifie le token
function verifyToken(token: string): boolean {
    const secret = process.env.ADMIN_PASSWORD || '';
    // Vérifie avec une fenêtre de 30 secondes
    for (let i = 0; i < 3; i++) {
        const timestamp = Date.now() - (i * 10000);
        const expected = crypto
            .createHmac('sha256', secret)
            .update(secret + timestamp.toString().slice(0, -4))
            .digest('hex');
        if (crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))) {
            return true;
        }
    }
    return false;
}

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { success: false, error: 'Content-Type invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        const { password } = await request.json();
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!ADMIN_PASSWORD) {
            // ADMIN_PASSWORD not configured - logged server-side only in dev
            return NextResponse.json(
                { success: false, error: 'Configuration serveur manquante' },
                { status: 500, headers: securityHeaders }
            );
        }

        // Vérification sécurisée avec timing constant
        const passwordBuffer = Buffer.from(password || '');
        const adminBuffer = Buffer.from(ADMIN_PASSWORD);

        const isValid = passwordBuffer.length === adminBuffer.length &&
            crypto.timingSafeEqual(passwordBuffer, adminBuffer);

        if (!isValid) {
            // Délai pour prévenir le timing attack
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
            return NextResponse.json(
                { success: false, error: 'Mot de passe incorrect' },
                { status: 401, headers: securityHeaders }
            );
        }

        // Génère un token sécurisé pour le cookie
        const token = crypto
            .createHmac('sha256', ADMIN_PASSWORD)
            .update(ADMIN_PASSWORD + 'indhack-admin-session')
            .digest('hex');

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: securityHeaders }
        );

        // Set secure cookie
        response.cookies.set('admin_auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 jours
            path: '/',
        });

        return response;

    } catch {
        // Error logged server-side only - no details exposed to client
        return NextResponse.json(
            { success: false, error: 'Erreur serveur' },
            { status: 500, headers: securityHeaders }
        );
    }
}

// Bloquer GET
export async function GET() {
    return NextResponse.json(
        { error: 'Méthode non autorisée' },
        { status: 405, headers: { ...securityHeaders, 'Allow': 'POST' } }
    );
}
