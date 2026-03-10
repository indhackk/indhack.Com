import { Metadata } from "next";
import ConsultantGEOClient from "./ConsultantGEOClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultant GEO : soyez cité par ChatGPT et les IA – IndHack",
    description: "Consultante GEO (Generative Engine Optimization) à Nice. Audit de visibilité IA, optimisation pour ChatGPT, Perplexity, Gemini. Outil gratuit + accompagnement.",
    keywords: ["consultant GEO", "consultante GEO", "Generative Engine Optimization", "visibilité ChatGPT", "référencement IA", "GEO SEO", "optimisation IA", "consultant GEO France", "consultant GEO Nice"],
    alternates: {
        canonical: "https://indhack.com/consultant-geo"
    },
    openGraph: {
        title: "Consultant GEO : soyez cité par ChatGPT et les IA",
        description: "Audit de visibilité IA gratuit + accompagnement GEO. Faites de votre site la source préférée de ChatGPT, Perplexity et Gemini.",
        url: "https://indhack.com/consultant-geo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultant%20GEO&subtitle=Soyez%20cit%C3%A9%20par%20ChatGPT%20et%20les%20IA",
            width: 1200,
            height: 630,
            alt: "Consultant GEO - Visibilité sur ChatGPT et les IA - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant GEO : soyez cité par ChatGPT et les IA",
        description: "Audit de visibilité IA gratuit + accompagnement GEO pour apparaître dans les réponses de ChatGPT.",
        images: ["https://indhack.com/api/og?title=Consultant%20GEO&subtitle=Visibilit%C3%A9%20ChatGPT%20%26%20IA"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantGEOPage() {
    return (
        <>
            <ServiceSchema
                name="Consultant GEO - Generative Engine Optimization"
                description="Consultante GEO spécialisée en visibilité sur les moteurs IA (ChatGPT, Perplexity, Gemini). Audit gratuit, optimisation de contenu, données structurées et stratégie de citabilité pour les LLMs."
                url="https://indhack.com/consultant-geo"
                serviceType="Consultant GEO"
            />
            <Breadcrumb items={getServiceBreadcrumb("Consultant GEO", "/consultant-geo")} />
            <ConsultantGEOClient />
        </>
    );
}
