import { NextRequest, NextResponse } from 'next/server';

// API Route pour envoyer les demandes d'audit via Web3Forms (gratuit, sans serveur SMTP)
// Documentation: https://web3forms.com/

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

        // Web3Forms API - Clé publique (à remplacer par votre clé)
        // Créez votre clé gratuitement sur https://web3forms.com/
        const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `🎯 Nouvelle demande d'Audit SEO - ${name}`,
                from_name: 'IndHack.com',
                to: 'contact@indhack.com',
                name: name,
                email: email,
                phone: phone || 'Non renseigné',
                website: website || 'Non renseigné',
                message: message || 'Demande d\'audit sans message',
                // Formatage du message
                botcheck: false,
            })
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({
                success: true,
                message: 'Demande envoyée avec succès !'
            });
        } else {
            console.error('Web3Forms error:', result);
            return NextResponse.json(
                { success: false, error: 'Erreur lors de l\'envoi' },
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
