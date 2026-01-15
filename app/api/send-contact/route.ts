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

        const result = await response.json();

        if (result.success === 'true' || result.success === true) {
            return NextResponse.json({
                success: true,
                message: 'Message envoyé !'
            });
        } else {
            console.error('FormSubmit error:', result);
            return NextResponse.json(
                { success: false, error: 'Erreur d\'envoi' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
