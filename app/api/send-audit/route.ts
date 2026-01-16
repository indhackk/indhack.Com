import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { name, email, phone, website, message } = data;

        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: 'Nom et email requis' },
                { status: 400 }
            );
        }

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
                website: website || 'Non renseigné',
                message: message || 'Demande d\'audit SEO',
                _subject: `🎯 Nouvelle demande d'Audit SEO - ${name}`,
                _template: 'table',
                _captcha: 'false'
            })
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");
        const result = isJson ? await response.json() : null;

        if (response.ok && result?.success) {
            return NextResponse.json({
                success: true,
                message: 'Demande envoyée avec succès !'
            });
        } else {
            // FALLBACK TO WEB3FORMS
            const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
            const web3Response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: web3Key,
                    subject: `🎯 Audit SEO - ${name}`,
                    from_name: name,
                    replyto: email,
                    Nom: name,
                    Email: email,
                    Téléphone: phone || 'Non renseigné',
                    Site_Web: website || 'Non renseigné',
                    Message: message || 'Demande d\'audit',
                })
            });

            const web3Result = await web3Response.json();
            if (web3Result.success) {
                return NextResponse.json({ success: true, message: 'Envoyé via Web3Forms' });
            }

            return NextResponse.json(
                { success: false, error: 'Erreur d\'envoi' },
                { status: 500 }
            );
        }

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erreur serveur';
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
