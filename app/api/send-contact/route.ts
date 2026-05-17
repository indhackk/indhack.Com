import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';
import { deliverFormSubmission, summarizeAttempts } from '@/lib/external-form-submit';

// Headers de sécurité pour les réponses API
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Type': 'application/json',
};

const FALLBACK_EMAIL = 'contact@indhack.com';
const FALLBACK_PHONE = '06 61 13 97 48';

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

        // Cascade Web3Forms → FormSubmit, isolée des exceptions et avec timeout.
        const result = await deliverFormSubmission({
            web3Payload: {
                subject: `Nouveau contact IndHack - ${name}${company ? ` (${company})` : ''}`,
                from_name: name,
                replyto: email,
                Nom: name,
                Email: email,
                Telephone: phone || 'Non renseigné',
                Entreprise: company || 'Non renseigné',
                Site_Web: website || 'Non renseigné',
                Budget: budget || 'Non renseigné',
                Message: message,
            },
            formSubmitEmail: FALLBACK_EMAIL,
            formSubmitPayload: {
                name,
                email,
                phone: phone || 'Non renseigné',
                company: company || 'Non renseigné',
                website: website || 'Non renseigné',
                budget: budget || 'Non renseigné',
                message,
                _subject: `Nouveau contact IndHack - ${name}${company ? ` (${company})` : ''}`,
            },
        });

        // Log court côté Vercel sans clé API ni données du visiteur.
        console.log(summarizeAttempts('contact', result.attempts));

        if (result.delivered) {
            return NextResponse.json(
                { success: true, message: 'Message envoyé avec succès.' },
                { status: 200, headers: securityHeaders }
            );
        }

        // Tous les services externes ont échoué : 503 (service indisponible)
        // avec instructions claires pour le visiteur (mail + tel).
        return NextResponse.json(
            {
                success: false,
                error: `Envoi temporairement indisponible. Écrivez-moi à ${FALLBACK_EMAIL} ou appelez le ${FALLBACK_PHONE}.`,
                fallback: {
                    email: FALLBACK_EMAIL,
                    phone: FALLBACK_PHONE,
                },
            },
            { status: 503, headers: securityHeaders }
        );

    } catch (error) {
        // Filet ultime : on ne devrait jamais arriver ici grâce au helper,
        // mais on garde un 500 propre au cas où.
        console.error('Contact form unexpected error:', error instanceof Error ? error.message : 'unknown');
        return NextResponse.json(
            {
                success: false,
                error: `Erreur serveur. Écrivez-moi à ${FALLBACK_EMAIL} ou appelez le ${FALLBACK_PHONE}.`,
                fallback: {
                    email: FALLBACK_EMAIL,
                    phone: FALLBACK_PHONE,
                },
            },
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
