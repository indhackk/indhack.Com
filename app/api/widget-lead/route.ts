import { NextRequest, NextResponse } from 'next/server';

// Security headers
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Type': 'application/json',
};

// Simple email validation
function isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simple URL validation
function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Sanitize string to prevent injection
function sanitize(str: string): string {
    return str
        .replace(/[<>]/g, '')
        .trim()
        .slice(0, 500);
}

export async function POST(request: NextRequest) {
    try {
        // Check Content-Type
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { success: false, error: 'Content-Type invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        // Parse body
        let data: Record<string, unknown>;
        try {
            data = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'JSON invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        const { visitorEmail, score, testedUrl, agencyEmail } = data;

        // Validate required fields
        if (!visitorEmail || typeof visitorEmail !== 'string' || !isValidEmail(visitorEmail)) {
            return NextResponse.json(
                { success: false, error: 'Email visiteur invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        if (!agencyEmail || typeof agencyEmail !== 'string' || !isValidEmail(agencyEmail)) {
            return NextResponse.json(
                { success: false, error: 'Email agence invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        if (typeof score !== 'number' || score < 0 || score > 100) {
            return NextResponse.json(
                { success: false, error: 'Score invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        if (!testedUrl || typeof testedUrl !== 'string' || !isValidUrl(testedUrl)) {
            return NextResponse.json(
                { success: false, error: 'URL testée invalide' },
                { status: 400, headers: securityHeaders }
            );
        }

        // Sanitize inputs
        const cleanVisitorEmail = sanitize(visitorEmail);
        const cleanAgencyEmail = sanitize(agencyEmail);
        const cleanTestedUrl = sanitize(testedUrl);

        // Send email via FormSubmit to the agency
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${cleanAgencyEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Nouveau lead SEO — ${cleanTestedUrl}`,
                    _template: 'box',
                    _captcha: 'false',
                    'URL testée': cleanTestedUrl,
                    'Score visibilité IA': `${score}/100`,
                    'Email du prospect': cleanVisitorEmail,
                    'Message': `Un visiteur a testé son site via votre widget IndHack.\n\nCe prospect a un score de visibilité IA de ${score}/100${score < 50 ? ' (faible)' : score < 70 ? ' (moyen)' : ' (bon)'} et cherche probablement de l'aide. Contactez-le rapidement.\n\n— Widget IndHack`
                })
            });

            const isJson = response.headers.get("content-type")?.includes("application/json");
            const result = isJson ? await response.json() : await response.text();

            if (response.ok && (typeof result === 'object' && result?.success)) {
                // Also send a copy to IndHack for tracking (optional)
                try {
                    await fetch(`https://formsubmit.co/ajax/contact@indhack.com`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            _subject: `[Widget] Lead envoyé à ${cleanAgencyEmail}`,
                            _template: 'box',
                            _captcha: 'false',
                            'Agence': cleanAgencyEmail,
                            'URL testée': cleanTestedUrl,
                            'Score': `${score}/100`,
                            'Email prospect': cleanVisitorEmail,
                        })
                    });
                } catch {
                    // Ignore copy errors
                }

                return NextResponse.json(
                    { success: true, message: 'Lead envoyé avec succès' },
                    { status: 200, headers: securityHeaders }
                );
            }

            // Log error but return success to user (don't show email errors)
            console.error('FormSubmit error:', result);
            return NextResponse.json(
                { success: true, message: 'Demande enregistrée' },
                { status: 200, headers: securityHeaders }
            );

        } catch (error) {
            // Log error but return success to user
            console.error('Email send error:', error);
            return NextResponse.json(
                { success: true, message: 'Demande enregistrée' },
                { status: 200, headers: securityHeaders }
            );
        }

    } catch (error) {
        console.error('Widget lead error:', error);
        // Return success anyway to not show errors to visitors
        return NextResponse.json(
            { success: true, message: 'Demande enregistrée' },
            { status: 200, headers: securityHeaders }
        );
    }
}

// Block other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Méthode non autorisée' },
        { status: 405, headers: { ...securityHeaders, 'Allow': 'POST' } }
    );
}
