import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { name, email, phone, company, website, budget, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Nom, email et message requis' },
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
                company: company || 'Non renseigné',
                website: website || 'Non renseigné',
                budget: budget || 'Non renseigné',
                message,
                _subject: `📩 Nouveau contact - ${name}${company ? ` (${company})` : ''}`,
                _template: 'table',
                _captcha: 'false'
            })
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");
        const result = isJson ? await response.json() : null;

        if (response.ok && result?.success) {
            return NextResponse.json({
                success: true,
                message: 'Message envoyé !'
            });
        } else {
            console.error('FormSubmit Error:', result || 'Non-JSON response');

            // FALLBACK TO WEB3FORMS (Reliable)
            const WEB3FORMS_KEY = "dbf0dae2-86ac-495e-a670-c4fc028ce036";
            const web3Response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `📩 Nouveau contact - ${name}`,
                    from_name: name,
                    replyto: email,
                    Nom: name,
                    Email: email,
                    Téléphone: phone || 'Non renseigné',
                    Entreprise: company || 'Non renseigné',
                    Budget: budget || 'Non renseigné',
                    Message: message,
                })
            });

            const web3Result = await web3Response.json();
            if (web3Result.success) {
                return NextResponse.json({ success: true, message: 'Message envoyé via backup' });
            }

            return NextResponse.json(
                { success: false, error: 'Erreur d\'envoi' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('API Send-Contact Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur serveur' },
            { status: 500 }
        );
    }
}
