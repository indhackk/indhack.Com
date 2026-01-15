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

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone || 'Non renseigné');
        formData.append('company', company || 'Non renseigné');
        formData.append('website', website || 'Non renseigné');
        formData.append('budget', budget || 'Non renseigné');
        formData.append('message', message);
        formData.append('_subject', `📩 Nouveau contact - ${name}${company ? ` (${company})` : ''}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('FormSubmit HTTP Error:', response.status, errorText);
            // Don't throw yet, try fallback
        } else {
            const result = await response.json();
            if (result.success === 'true' || result.success === true) {
                return NextResponse.json({ success: true, message: 'Message envoyé !' });
            }
            console.error('FormSubmit Logic Error:', result);
        }

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

    } catch (error: any) {
        console.error('API Send-Contact Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erreur serveur' },
            { status: 500 }
        );
    }
}
