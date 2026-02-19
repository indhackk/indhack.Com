import { Metadata } from "next";
import ExtracteurClient from "./ExtracteurClient";

export const metadata: Metadata = {
    title: "Extracteur de Mots-Clés Gratuit | Densité & N-grammes – IndHack",
    description: "Analysez un texte : extraction mots-clés, densité, bi-grammes, tri-grammes. Outil SEO gratuit sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/extracteur-mots-cles"
    },
    openGraph: {
        title: "Extracteur de Mots-Clés Gratuit | Densité & N-grammes – IndHack",
        description: "Analysez un texte : extraction mots-clés, densité, bi-grammes, tri-grammes. Outil SEO gratuit sans inscription.",
        url: "https://indhack.com/outils/extracteur-mots-cles",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Extracteur de Mots-Clés Gratuit | Densité & N-grammes – IndHack",
        description: "Analysez un texte : extraction mots-clés, densité, bi-grammes, tri-grammes. Outil SEO gratuit sans inscription.",
    }
};

// FAQ data for schema
const FAQ_ITEMS = [
    {
        question: "Comment fonctionne l'extracteur de mots-clés ?",
        answer: "L'outil analyse votre texte, supprime les mots vides (stop words) français, puis compte les occurrences de chaque terme. Il calcule ensuite la densité de chaque mot-clé (pourcentage par rapport au total) et identifie les bi-grammes et tri-grammes les plus fréquents."
    },
    {
        question: "Quelle est la densité de mots-clés idéale pour le SEO ?",
        answer: "La densité idéale se situe entre 1% et 3%. En dessous de 1%, votre mot-clé principal manque de présence. Au-dessus de 3%, Google peut considérer qu'il s'agit de keyword stuffing (bourrage de mots-clés), ce qui peut pénaliser votre référencement."
    },
    {
        question: "Qu'est-ce qu'un bi-gramme et un tri-gramme ?",
        answer: "Un bi-gramme est une expression de 2 mots consécutifs fréquemment utilisés ensemble (ex: 'référencement naturel'). Un tri-gramme comporte 3 mots (ex: 'audit SEO gratuit'). Ces expressions correspondent souvent aux requêtes longue traîne que les utilisateurs tapent dans Google."
    },
    {
        question: "Puis-je analyser le contenu de mes concurrents ?",
        answer: "Oui, copiez simplement le texte visible d'une page concurrente et collez-le dans l'outil. Vous découvrirez quels mots-clés ils ciblent, leur densité, et les expressions récurrentes. C'est idéal pour identifier des opportunités ou améliorer votre propre contenu."
    },
    {
        question: "L'outil conserve-t-il mes textes ?",
        answer: "Non, l'analyse est effectuée entièrement côté navigateur (client-side). Votre texte n'est jamais envoyé à un serveur ni stocké. Vos données restent confidentielles et sont supprimées dès que vous quittez la page."
    }
];

export default function ExtracteurMotsClesPage() {
    return (
        <>
            {/* Schema JSON-LD SoftwareApplication */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Extracteur de mots-clés gratuit",
                        "description": "Analysez les mots-clés d'un texte gratuitement. Extraction de mots-clés, densité, bi-grammes et tri-grammes. Outil SEO gratuit.",
                        "applicationCategory": "WebApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "EUR"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com"
                        }
                    })
                }}
            />

            {/* Schema JSON-LD FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ_ITEMS.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        }))
                    })
                }}
            />

            {/* Schema JSON-LD BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com" },
                            { "@type": "ListItem", "position": 2, "name": "Outils SEO", "item": "https://indhack.com/outils" },
                            { "@type": "ListItem", "position": 3, "name": "Extracteur de mots-clés", "item": "https://indhack.com/outils/extracteur-mots-cles" }
                        ]
                    })
                }}
            />

            <ExtracteurClient />
        </>
    );
}
