import { Metadata } from "next";
import StudyClientContent from "./StudyClientContent";

export const metadata: Metadata = {
    title: "Étude : 20 % des restaurants Google sans site [2026]",
    description: "297 restaurants du top Google analysés sur la Côte d'Azur : 20 % sans site web, 9 % de profils suspects. Données vérifiées et méthodologie transparente.",
    keywords: ["restaurants Côte d'Azur", "Google My Business", "SEO local restauration", "visibilité Google restaurants", "étude restauration 2026", "Nice", "Cannes", "Monaco"],
    alternates: {
        canonical: "https://indhack.com/etudes/restaurants-cote-azur-google-2026"
    },
    openGraph: {
        title: "20% des meilleurs restaurants Google sans site web | Côte d'Azur",
        description: "Même les restaurants les plus visibles de la Côte d'Azur ont des failles critiques. Étude exclusive sur 297 établissements.",
        url: "https://indhack.com/etudes/restaurants-cote-azur-google-2026",
        type: "article",
        publishedTime: "2026-03-09",
        authors: ["Indiana Aflalo"],
        images: [{
            url: "https://indhack.com/images/etudes/restaurants-cote-azur-2026-og.svg",
            width: 1200,
            height: 630,
            alt: "Infographie : failles des meilleurs restaurants Google de la Côte d'Azur"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "20% des meilleurs restaurants Google sans site web",
        description: "Étude exclusive sur 297 restaurants de la Côte d'Azur. Données vérifiées.",
    }
};

export default function EtudeRestaurantsCoteAzur() {
    return (
        <>
            {/* Schema.org NewsArticle */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": "20.5% des restaurants les plus visibles de la Côte d'Azur n'ont pas de site web : étude 2026",
                        "description": "Analyse des failles des 297 restaurants apparaissant dans le Top Google sur 10 villes de la Côte d'Azur. 20.5% sans site web, 9% de profils suspects.",
                        "image": "https://indhack.com/images/etudes/restaurants-cote-azur-2026-og.svg",
                        "datePublished": "2026-03-09",
                        "dateModified": "2026-03-09",
                        "author": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com/a-propos",
                            "jobTitle": "Consultante SEO"
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
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://indhack.com/etudes/restaurants-cote-azur-google-2026"
                        }
                    })
                }}
            />

            {/* Schema.org Dataset */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Dataset",
                        "name": "Failles GMB des restaurants de la Côte d'Azur 2026",
                        "description": "Analyse des failles des 297 restaurants les plus visibles sur Google dans 10 villes de la Côte d'Azur (Nice, Cannes, Monaco, Antibes, etc.)",
                        "url": "https://indhack.com/etudes/restaurants-cote-azur-google-2026",
                        "creator": {
                            "@type": "Person",
                            "name": "Indiana Aflalo"
                        },
                        "datePublished": "2026-03-09",
                        "spatialCoverage": {
                            "@type": "Place",
                            "name": "Côte d'Azur, France"
                        },
                        "temporalCoverage": "2026-03",
                        "variableMeasured": [
                            "Présence site web",
                            "Note moyenne Google",
                            "Nombre d'avis",
                            "Profils suspects"
                        ]
                    })
                }}
            />

            <StudyClientContent />
        </>
    );
}
