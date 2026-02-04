import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';

// Headers de sécurité pour les réponses API
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Type': 'application/json',
};

export async function POST(request: NextRequest) {
    try {
        // Vérification du Content-Type
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { success: false, error: 'Content-Type invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        // Parse du body avec gestion d'erreur
        let data: Record<string, unknown>;
        try {
            data = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'JSON invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        // Validation et sanitization des données
        const validation = validateContactForm(data);
        if (!validation.success || !validation.data) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400, headers: securityHeaders }
            );
        }

        const { name, email, phone, company, website, budget, message } = validation.data;

        // PRIORITÉ: Web3Forms (plus fiable, clé API configurée)
        // Note: Web3Forms dit que c'est une clé publique (comme un form ID)
        const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEBFORM || 'dbf0dae2-86ac-495e-a670-c4fc028ce036';
        if (WEB3FORMS_KEY) {
            const web3Response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `🚀 Nouveau contact - ${name}${company ? ` (${company})` : ''}`,
                    from_name: name,
                    replyto: email,
                    Nom: name,
                    Email: email,
                    Telephone: phone || 'Non renseigné',
                    Entreprise: company || 'Non renseigné',
                    Site_Web: website || 'Non renseigné',
                    Budget: budget || 'Non renseigné',
                    Message: message,
                })
            });

            const web3Result = await web3Response.json();
            if (web3Result.success) {
                return NextResponse.json(
                    { success: true, message: 'Message envoyé avec succès !' },
                    { status: 200, headers: securityHeaders }
                );
            }
            console.error('Web3Forms error:', web3Result);
        }

        // FALLBACK: FormSubmit
        const FORMSUBMIT_EMAIL = 'contact@indhack.com';
        const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone: phone || 'Non renseigné',
                company: company || 'Non renseigné',
                website: website || 'Non renseigné',
                budget: budget || 'Non renseigné',
                message,
                _subject: `Nouveau contact - ${name}${company ? ` (${company})` : ''}`,
                _template: 'table',
                _captcha: 'false'
            })
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");
        const result = isJson ? await response.json() : null;

        if (response.ok && result?.success) {
            return NextResponse.json(
                { success: true, message: 'Message envoyé avec succès !' },
                { status: 200, headers: securityHeaders }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Erreur lors de l\'envoi. Appelez-nous au 06 61 13 97 48.' },
            { status: 500, headers: securityHeaders }
        );

    } catch (error: unknown) {
        console.error('Erreur API contact:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur serveur. Veuillez réessayer.' },
            { status: 500, headers: securityHeaders }
        );
    }
}

// Bloquer les autres méthodes HTTP
export async function GET() {
    return NextResponse.json(
        { error: 'Méthode non autorisée' },
        { status: 405, headers: { ...securityHeaders, 'Allow': 'POST' } }
    );
}
