import { NextRequest, NextResponse } from 'next/server';

const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || '';

function sanitize(str: string): string {
    return str.replace(/[<>]/g, '').trim().slice(0, 500);
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
    try {
        if (!WEB3FORMS_KEY) {
            console.error('WEB3FORMS_ACCESS_KEY not configured');
            return NextResponse.json(
                { success: false, error: 'Configuration serveur manquante' },
                { status: 500 }
            );
        }

        const data = await request.json();
        const { name, contactEmail, website, message } = data;

        if (!name || !contactEmail || !message) {
            return NextResponse.json(
                { success: false, error: 'Champs requis manquants' },
                { status: 400 }
            );
        }

        if (!isValidEmail(contactEmail)) {
            return NextResponse.json(
                { success: false, error: 'Email invalide' },
                { status: 400 }
            );
        }

        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: `🤝 Question partenaire - ${sanitize(name)}`,
                from_name: sanitize(name),
                replyto: sanitize(contactEmail),
                Nom: sanitize(name),
                Email: sanitize(contactEmail),
                Site_Web: website ? sanitize(website) : 'Non renseigné',
                Message: sanitize(message),
                Source: 'Page Partenaires',
            }),
        });

        const result = await res.json();

        if (result.success) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: "Erreur lors de l'envoi" },
            { status: 500 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
