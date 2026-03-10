import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import GlossaireSeoClient from "./GlossaireSeoClient";

export const metadata: Metadata = {
    title: "Glossaire SEO & GEO : +60 Définitions Référencement [2026]",
    description:
        "Glossaire SEO complet : +60 termes du référencement naturel et du GEO (Generative Engine Optimization) expliqués simplement. De A/B Testing à Zero-Click Search.",
    keywords: [
        "glossaire SEO",
        "définition SEO",
        "vocabulaire référencement",
        "lexique SEO",
        "glossaire GEO",
        "termes SEO",
        "dictionnaire référencement",
    ],
    alternates: {
        canonical: "https://indhack.com/glossaire-seo",
    },
    openGraph: {
        title: "Glossaire SEO & GEO : +60 Définitions [2026]",
        description:
            "Tous les termes du SEO et du GEO expliqués simplement. Le glossaire le plus complet du référencement en français.",
        url: "https://indhack.com/glossaire-seo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [
            {
                url: "https://indhack.com/api/og?title=Glossaire%20SEO%20%26%20GEO&subtitle=%2B60%20d%C3%A9finitions%20du%20r%C3%A9f%C3%A9rencement",
                width: 1200,
                height: 630,
                alt: "Glossaire SEO & GEO IndHack",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Glossaire SEO & GEO : +60 Définitions [2026]",
        description:
            "De A/B Testing à Zero-Click Search : tous les termes du référencement naturel et de la visibilité IA.",
    },
};

export default function GlossaireSeoPage() {
    const breadcrumbItems = [
        { label: "Accueil", href: "/" },
        { label: "Glossaire SEO & GEO" },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "DefinedTermSet",
                        name: "Glossaire SEO & GEO 2026",
                        description:
                            "Plus de 60 définitions du référencement naturel et du GEO expliquées simplement.",
                        url: "https://indhack.com/glossaire-seo",
                        inLanguage: "fr",
                        publisher: {
                            "@type": "Organization",
                            name: "IndHack",
                            url: "https://indhack.com",
                        },
                    }),
                }}
            />
            <Breadcrumb items={breadcrumbItems} />
            <GlossaireSeoClient />
        </>
    );
}
