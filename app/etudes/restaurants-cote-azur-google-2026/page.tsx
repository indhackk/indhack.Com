import { Metadata } from "next";
import StudyClientContent from "./StudyClientContent";

export const metadata: Metadata = {
    title: "30% des meilleurs restaurants Google sans site web | Étude Côte d'Azur 2026",
    description: "Étude exclusive : analyse de 308 restaurants du Top Google sur la Côte d'Azur. 30% sans site web, 13% avec des profils suspects. Données vérifiées, méthodologie transparente.",
    keywords: ["restaurants Côte d'Azur", "Google My Business", "SEO local restauration", "visibilité Google restaurants", "étude restauration 2026", "Nice", "Cannes", "Monaco"],
    alternates: {
        canonical: "https://indhack.com/etudes/restaurants-cote-azur-google-2026"
    },
    openGraph: {
        title: "30% des meilleurs restaurants Google sans site web | Côte d'Azur",
        description: "Même les restaurants les plus visibles de la Côte d'Azur ont des failles critiques. Étude exclusive sur 308 établissements.",
        url: "https://indhack.com/etudes/restaurants-cote-azur-google-2026",
        type: "article",
        publishedTime: "2026-02-24",
        authors: ["Indiana Aflalo"],
        images: [{
            url: "https://indhack.com/images/etudes/restaurants-cote-azur-2026-og.png",
            width: 1200,
            height: 630,
            alt: "Infographie : failles des meilleurs restaurants Google de la Côte d'Azur"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "30% des meilleurs restaurants Google sans site web",
        description: "Étude exclusive sur 308 restaurants de la Côte d'Azur. Données vérifiées.",
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
                        "headline": "30% des restaurants les plus visibles de la Côte d'Azur n'ont pas de site web : étude 2026",
                        "description": "Analyse des failles des 308 restaurants apparaissant dans le Top Google sur 10 villes de la Côte d'Azur. 30% sans site web, 13% de profils suspects.",
                        "image": "https://indhack.com/images/etudes/restaurants-cote-azur-2026-og.png",
                        "datePublished": "2026-02-24",
                        "dateModified": "2026-02-24",
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
                                "url": "https://indhack.com/logo.png"
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
                        "description": "Analyse des failles des 308 restaurants les plus visibles sur Google dans 10 villes de la Côte d'Azur (Nice, Cannes, Monaco, Antibes, etc.)",
                        "url": "https://indhack.com/etudes/restaurants-cote-azur-google-2026",
                        "creator": {
                            "@type": "Person",
                            "name": "Indiana Aflalo"
                        },
                        "datePublished": "2026-02-24",
                        "spatialCoverage": {
                            "@type": "Place",
                            "name": "Côte d'Azur, France"
                        },
                        "temporalCoverage": "2026-02",
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
