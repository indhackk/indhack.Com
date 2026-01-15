import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de Confidentialité | IndHack",
    description: "Politique de confidentialité et gestion des données personnelles du site indhack.com - Consultante SEO Indiana Aflalo.",
    alternates: {
        canonical: "https://indhack.com/confidentialite"
    },
    robots: {
        index: false,
        follow: true
    }
};

export default function Confidentialite() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-3xl">
            <h1 className="text-4xl font-heading font-bold mb-8 text-ink">Politique de Confidentialité</h1>

            <div className="space-y-8 text-soft leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-ink mb-2">1. Collecte des données</h2>
                    <p>
                        Nous collectons uniquement les données personnelles que vous nous transmettez volontairement via le formulaire de contact (Nom, Email, Téléphone, Message). Ces données sont utilisées exclusivement pour répondre à votre demande.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-ink mb-2">2. Cookies</h2>
                    <p>
                        Ce site utilise un minimum de cookies nécessaires au bon fonctionnement technique. Nous n'utilisons pas de cookies publicitaires intrusifs.
                    </p>
                </section>
            </div>
        </div>
    );
}
