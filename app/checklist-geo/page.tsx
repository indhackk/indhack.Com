import { Metadata } from "next";
import ChecklistGEOClient from "./ChecklistGEOClient";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "Checklist GEO 2026 : 50 points pour être visible dans les IA | IndHack",
    description: "Checklist interactive de 50 points pour optimiser votre site pour ChatGPT, Perplexity, Claude et Gemini. Accessibilité IA, contenu, données structurées, E-E-A-T et plus.",
    keywords: [
        "checklist GEO",
        "checklist visibilité IA",
        "optimisation ChatGPT",
        "GEO checklist 2026",
        "Generative Engine Optimization checklist",
        "SEO IA checklist",
        "optimisation Perplexity",
        "checklist llms.txt"
    ],
    alternates: {
        canonical: "https://indhack.com/checklist-geo"
    },
    openGraph: {
        title: "Checklist GEO 2026 : 50 points pour être visible dans les IA",
        description: "Checklist interactive pour optimiser votre site pour les moteurs de réponse IA. 50 points actionnables.",
        url: "https://indhack.com/checklist-geo",
        type: "website",
        images: [{
            url: "https://indhack.com/api/og?title=Checklist%20GEO%202026&subtitle=50%20points%20pour%20%C3%AAtre%20visible%20dans%20les%20IA",
            width: 1200,
            height: 630,
            alt: "Checklist GEO 2026 — 50 points de vérification"
        }],
    },
};

export default function ChecklistGEOPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "Checklist GEO : 50 points pour optimiser votre visibilité dans les IA",
                        "description": "Guide étape par étape pour rendre votre site visible dans ChatGPT, Perplexity, Claude et Gemini",
                        "totalTime": "PT4H",
                        "tool": [
                            { "@type": "HowToTool", "name": "Testeur Visibilité IA IndHack" },
                            { "@type": "HowToTool", "name": "Google Search Console" }
                        ],
                        "step": [
                            { "@type": "HowToStep", "name": "Accessibilité IA", "text": "Vérifier que les crawlers IA peuvent accéder à votre site" },
                            { "@type": "HowToStep", "name": "Contenu optimisé", "text": "Structurer le contenu pour être cité par les IA" },
                            { "@type": "HowToStep", "name": "Données structurées", "text": "Ajouter les schémas Schema.org pertinents" },
                            { "@type": "HowToStep", "name": "E-E-A-T et autorité", "text": "Renforcer les signaux de confiance pour les IA" },
                            { "@type": "HowToStep", "name": "Distribution", "text": "Maximiser la visibilité du contenu auprès des IA" }
                        ]
                    })
                }}
            />

            <Breadcrumb items={[
                { label: "Accueil", href: "/" },
                { label: "Checklist GEO 2026", href: "/checklist-geo" }
            ]} />

            <ChecklistGEOClient />
        </>
    );
}
