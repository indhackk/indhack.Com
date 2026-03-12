import { Metadata } from "next";
import BarometreClientContent from "./BarometreClientContent";

export const metadata: Metadata = {
    title: "Baromètre Visibilité IA France 2026 | 46% des sites bloquent les crawlers IA",
    description: "Étude exclusive : 46% des top sites bloquent les crawlers IA. Découvrez l'impact de ChatGPT, Perplexity et Claude sur la visibilité web française. Données vérifiées, sources publiques.",
    keywords: ["visibilité IA", "ChatGPT SEO", "Perplexity référencement", "GEO", "crawlers IA", "GPTBot", "robots.txt IA", "llms.txt", "AI Overviews", "recherche IA 2026"],
    alternates: {
        canonical: "https://indhack.com/etude/barometre-visibilite-ia-2026"
    },
    openGraph: {
        title: "Baromètre Visibilité IA France 2026 | Étude IndHack",
        description: "46% des top sites bloquent les crawlers IA. 2,5 milliards de prompts ChatGPT par jour. L'étude complète sur la visibilité IA des sites français.",
        url: "https://indhack.com/etude/barometre-visibilite-ia-2026",
        type: "article",
        publishedTime: "2026-03-10",
        authors: ["Indiana Aflalo"],
        images: [{
            url: "https://indhack.com/api/og?title=Baromètre%20Visibilité%20IA%20France%202026&subtitle=46%25%20des%20sites%20bloquent%20les%20crawlers%20IA",
            width: 1200,
            height: 630,
            alt: "Baromètre Visibilité IA France 2026 - Étude IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Baromètre Visibilité IA France 2026",
        description: "46% des top sites bloquent les crawlers IA. L'étude complète sur ChatGPT, Perplexity et Claude.",
    }
};

export default function BarometreVisibiliteIA() {
    return (
        <>
            {/* Schema.org NewsArticle */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": "Baromètre Visibilité IA France 2026 : 46% des sites bloquent les crawlers IA",
                        "description": "Étude exclusive sur la compatibilité des sites web français avec ChatGPT, Perplexity, Claude et les moteurs de recherche IA. Analyse de 1000+ sites, données vérifiées.",
                        "image": "https://indhack.com/api/og?title=Baromètre%20Visibilité%20IA%20France%202026&subtitle=46%25%20des%20sites%20bloquent%20les%20crawlers%20IA",
                        "datePublished": "2026-03-10",
                        "dateModified": "2026-03-10",
                        "author": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com/a-propos",
                            "jobTitle": "Consultante SEO & GEO"
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
                            "@id": "https://indhack.com/etude/barometre-visibilite-ia-2026"
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
                        "name": "Baromètre Visibilité IA France 2026",
                        "description": "Analyse de la compatibilité des sites web français avec les crawlers IA (GPTBot, PerplexityBot, Claude-Web) et leur visibilité dans les réponses ChatGPT, Perplexity et Claude.",
                        "url": "https://indhack.com/etude/barometre-visibilite-ia-2026",
                        "creator": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com/a-propos"
                        },
                        "datePublished": "2026-03-10",
                        "dateModified": "2026-03-12",
                        "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
                        "spatialCoverage": {
                            "@type": "Place",
                            "name": "France",
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 46.2276,
                                "longitude": 2.2137
                            }
                        },
                        "temporalCoverage": "2026-03",
                        "variableMeasured": [
                            "Taux de blocage crawlers IA",
                            "Présence fichier llms.txt",
                            "Compatibilité JSON-LD",
                            "Visibilité ChatGPT",
                            "Visibilité Perplexity"
                        ]
                    })
                }}
            />

            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Quel pourcentage de sites bloquent les crawlers IA ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "45,5% des 1000 premiers sites mondiaux bloquent au moins un crawler IA. Ce chiffre monte à 79% pour les sites médias selon Press Gazette 2025."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Combien de prompts ChatGPT sont envoyés chaque jour ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "2,5 milliards de prompts sont envoyés à ChatGPT chaque jour selon TechCrunch (juillet 2025), avec 900 millions d'utilisateurs hebdomadaires actifs."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Qu'est-ce que le fichier llms.txt ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Le fichier llms.txt est l'équivalent du robots.txt pour les IA. Il indique aux LLM quelles pages sont les plus importantes sur votre site. Moins de 5% des sites en possèdent un."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Quelle est la prédiction Gartner sur le volume de recherche ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Gartner prédit une baisse de 25% du volume de recherche traditionnelle d'ici fin 2026, due aux chatbots IA et agents virtuels."
                                }
                            }
                        ]
                    })
                }}
            />

            <BarometreClientContent />
        </>
    );
}
