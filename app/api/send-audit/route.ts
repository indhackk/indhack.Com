import { NextRequest, NextResponse } from 'next/server';

// API Route pour envoyer les demandes d'audit
// Utilise FormSubmit.co (pas d'inscription requise, juste confirmer le premier email)

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { name, email, phone, website, message } = data;

        // Validation basique
        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: 'Nom et email requis' },
                { status: 400 }
            );
        }

        // FormSubmit.co - Envoie directement à contact@indhack.com
        // Au premier envoi, vous recevrez un email de confirmation à activer
        const FORMSUBMIT_EMAIL = 'contact@indhack.com';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone || 'Non renseigné');
        formData.append('website', website || 'Non renseigné');
        formData.append('message', message || 'Demande d\'audit SEO');
        formData.append('_subject', `🎯 Nouvelle demande d'Audit SEO - ${name}`);
        formData.append('_template', 'table'); // Format tableau
        formData.append('_captcha', 'false'); // Pas de captcha

        const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        console.log('FormSubmit response:', result);

        if (result.success === 'true' || result.success === true) {
            return NextResponse.json({
                success: true,
                message: 'Demande envoyée avec succès !'
            });
        } else {
            // Si FormSubmit échoue, essayer Web3Forms comme backup
            const web3Key = process.env.WEB3FORMS_ACCESS_KEY || "dbf0dae2-86ac-495e-a670-c4fc028ce036";
            if (web3Key && web3Key !== 'YOUR_ACCESS_KEY_HERE') {
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

                try {
                    const web3Result = await web3Response.json();
                    if (web3Result.success) {
                        return NextResponse.json({ success: true, message: 'Envoyé via Web3Forms' });
                    }
                } catch {
                    // Web3Forms a échoué aussi
                }
            }

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
