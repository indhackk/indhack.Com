import { Metadata } from "next";
import ChecklistGEOClient from "./ChecklistGEOClient";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "Checklist GEO 2026 : 50 points de visibilité IA",
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
                        "@type": "Article",
                        "headline": "Checklist GEO 2026 : 50 points pour optimiser votre visibilité dans les IA",
                        "description": "Guide actionnable pour rendre votre site visible dans ChatGPT, Perplexity, Claude et Gemini en 2026.",
                        "author": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com/a-propos"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com",
                            "logo": { "@type": "ImageObject", "url": "https://indhack.com/images/logo-indhack.webp" }
                        },
                        "datePublished": "2026-03-12",
                        "dateModified": "2026-04-28",
                        "mainEntityOfPage": "https://indhack.com/checklist-geo",
                        "about": {
                            "@type": "ItemList",
                            "name": "5 piliers de la checklist GEO",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Accessibilité IA", "description": "Vérifier que les crawlers IA peuvent accéder à votre site" },
                                { "@type": "ListItem", "position": 2, "name": "Contenu optimisé", "description": "Structurer le contenu pour être cité par les IA" },
                                { "@type": "ListItem", "position": 3, "name": "Données structurées", "description": "Ajouter les schémas Schema.org pertinents" },
                                { "@type": "ListItem", "position": 4, "name": "E-E-A-T et autorité", "description": "Renforcer les signaux de confiance pour les IA" },
                                { "@type": "ListItem", "position": 5, "name": "Distribution", "description": "Maximiser la visibilité du contenu auprès des IA" }
                            ]
                        }
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
