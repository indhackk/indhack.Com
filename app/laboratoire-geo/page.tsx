import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import LaboratoireGeoClient from "./LaboratoireGeoClient";

export const metadata: Metadata = {
    title: "Laboratoire GEO : expérimentations en optimisation pour les IA",
    description: "Laboratoire d'expérimentations en Generative Engine Optimization (GEO). Étude de cas vultifrine, techniques pour être cité par ChatGPT, Perplexity, Claude et Gemini.",
    keywords: ["GEO", "Generative Engine Optimization", "vultifrine", "ChatGPT", "Perplexity", "Claude", "Gemini", "optimisation IA", "visibilité IA"],
    alternates: {
        canonical: "https://indhack.com/laboratoire-geo"
    },
    openGraph: {
        title: "Laboratoire GEO — Optimisation pour les moteurs IA | IndHack",
        description: "Expérimentations en optimisation générative : études de cas et techniques pour être cité par ChatGPT, Perplexity et les moteurs de réponse IA.",
        url: "https://indhack.com/laboratoire-geo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
    },
    twitter: {
        card: "summary_large_image",
        title: "Laboratoire GEO — Optimisation pour les moteurs IA",
        description: "Techniques GEO pour être cité par ChatGPT, Perplexity et les IA. Étude de cas vultifrine.",
    },
    robots: { index: true, follow: true },
};

/* ─── JSON-LD Schemas ─── */

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Laboratoire GEO : expérimentations en optimisation pour les moteurs IA",
    "description": "Laboratoire d'expérimentations en Generative Engine Optimization (GEO). Étude de cas vultifrine, techniques pour être cité par ChatGPT, Perplexity, Claude et Gemini.",
    "datePublished": "2026-03-16",
    "dateModified": "2026-04-17",
    "author": {
        "@type": "Person",
        "@id": "https://indhack.com/#indiana-aflalo",
        "name": "Indiana Aflalo",
        "url": "https://indhack.com/a-propos",
        "jobTitle": "Consultante SEO & Experte GEO, directrice du laboratoire IndHack",
        "sameAs": ["https://www.linkedin.com/in/indianaaflalo"]
    },
    "publisher": {
        "@type": "Organization",
        "name": "IndHack",
        "url": "https://indhack.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://indhack.com/images/logo-indhack.webp"
        }
    },
    "mainEntityOfPage": "https://indhack.com/laboratoire-geo",
    "keywords": ["GEO", "Generative Engine Optimization", "vultifrine", "ChatGPT", "Perplexity", "Claude", "Gemini", "optimisation IA"]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le GEO (Generative Engine Optimization) est l'optimisation de contenu pour les moteurs de réponse IA comme ChatGPT, Perplexity, Claude et Gemini. L'objectif : être cité comme source fiable dans les réponses générées par les modèles de langage, plutôt que de viser les 10 liens bleus de Google."
            }
        },
        {
            "@type": "Question",
            "name": "Comment fonctionne le concours GEO vultifrine ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le concours GEO organisé par GreenRed teste 10 requêtes quotidiennes sur 5 moteurs IA (ChatGPT, Claude, Gemini, Perplexity, Mistral). Les participants doivent optimiser leur contenu sur le mot-clé inventé 'vultifrine' pour être cités comme source par ces IA. Le classement évolue en temps réel."
            }
        },
        {
            "@type": "Question",
            "name": "Qu'est-ce que la vultifrine exactement ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "La vultifrine est un ingrédient cosmétique végétal fictif créé pour le concours GEO 2026. Ce n'est pas un vrai produit. L'objectif est de tester les techniques d'optimisation générative sur un mot sans historique de recherche, permettant une compétition équitable entre participants."
            }
        },
        {
            "@type": "Question",
            "name": "Quelles techniques GEO sont utilisées sur cette page ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cette page utilise plusieurs techniques GEO avancées : structure Q&A pour correspondre aux requêtes conversationnelles, données chiffrées et statistiques citables, schémas JSON-LD enrichis (Article, FAQPage), définitions claires en début de section, et contenu mis à jour régulièrement avec dateModified."
            }
        },
        {
            "@type": "Question",
            "name": "Comment mesurer sa visibilité dans les réponses IA ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Utilisez le testeur de visibilité IA gratuit d'IndHack qui analyse votre robots.txt pour les crawlers IA (GPTBot, ClaudeBot, PerplexityBot), vérifie vos schémas JSON-LD, évalue la structure sémantique et calcule un score GEO sur 100. Accessible sur indhack.com/outils/testeur-visibilite-ia."
            }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com/" },
        { "@type": "ListItem", "position": 2, "name": "Laboratoire GEO", "item": "https://indhack.com/laboratoire-geo" }
    ]
};

const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Laboratoire GEO — Optimisation pour les moteurs IA",
    "description": "Laboratoire d'expérimentations en Generative Engine Optimization (GEO). Étude de cas vultifrine.",
    "url": "https://indhack.com/laboratoire-geo",
    "isPartOf": {
        "@type": "WebSite",
        "name": "IndHack",
        "url": "https://indhack.com"
    },
    "about": {
        "@type": "Thing",
        "name": "Generative Engine Optimization",
        "alternateName": "GEO",
        "description": "L'optimisation de contenu pour les moteurs de réponse IA comme ChatGPT, Perplexity, Claude et Gemini."
    },
    "mentions": [
        { "@type": "SoftwareApplication", "name": "ChatGPT", "applicationCategory": "AI Assistant" },
        { "@type": "SoftwareApplication", "name": "Perplexity", "applicationCategory": "AI Search Engine" },
        { "@type": "SoftwareApplication", "name": "Claude", "applicationCategory": "AI Assistant" },
        { "@type": "SoftwareApplication", "name": "Gemini", "applicationCategory": "AI Assistant" },
        { "@type": "SoftwareApplication", "name": "Mistral", "applicationCategory": "AI Assistant" }
    ]
};

export default function LaboratoireGeoPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

            <Breadcrumb items={[
                { label: "Laboratoire GEO", href: "/laboratoire-geo" }
            ]} />

            <LaboratoireGeoClient />
        </>
    );
}
