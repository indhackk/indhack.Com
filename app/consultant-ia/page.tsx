import { Metadata } from "next";
import ConsultantIAClient from "./ConsultantIAClient";

export const metadata: Metadata = {
    title: "Consultant IA & Automatisation | IndHack",
    description: "Experts en intégration d'Intelligence Artificielle pour les PME. Automatisation, déploiement d'agents LLM, optimisation des process. Devis gratuit.",
    keywords: ["consultant IA", "intégration IA", "automatisation entreprise", "intelligence artificielle PME", "agent IA sur mesure", "chatGPT entreprise"],
    alternates: {
        canonical: "https://indhack.com/consultant-ia"
    },
    openGraph: {
        title: "Consultant IA & Automatisation | IndHack",
        description: "Intégrez l'IA dans votre entreprise. Gain de temps, automatisation de vos processus et création d'agents sur mesure (ChatGPT, Claude).",
        url: "https://indhack.com/consultant-ia",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantIAPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Consultant Intelligence Artificielle",
                        "provider": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com",
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "France"
                        },
                        "description": "Services de consulting IA : intégration de LLMs (Claude, ChatGPT), automatisation des processus métiers, et création d'agents conversationnels sur mesure.",
                    })
                }}
            />
            <ConsultantIAClient />
        </>
    );
}
