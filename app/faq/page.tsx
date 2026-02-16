import { Metadata } from "next";
import { FAQContent } from "@/components/FAQContent";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "FAQ - Questions Fréquentes SEO | IndHack",
    description: "Réponses à vos questions sur le référencement naturel, l'audit SEO, la création de site web et le community management. Consultante SEO indépendante.",
    alternates: {
        canonical: "https://indhack.com/faq"
    },
    openGraph: {
        title: "FAQ SEO - Toutes vos Questions sur le Référencement",
        description: "Combien coûte le SEO ? Combien de temps pour voir des résultats ? Comment choisir son consultant ? Toutes les réponses.",
        url: "https://indhack.com/faq",
    }
};

// FAQ Schema for rich results
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Combien coûte une prestation SEO ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Un audit SEO complet démarre autour de 500€. Un accompagnement mensuel se situe entre 500€ et 2000€/mois selon l'ampleur du projet. Je propose toujours un premier diagnostic gratuit pour évaluer vos besoins."
            }
        },
        {
            "@type": "Question",
            "name": "Combien de temps pour voir des résultats SEO ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les premières améliorations techniques sont visibles sous 1-2 mois. Les gains de positionnement significatifs arrivent entre 3 et 6 mois. Pour des mots-clés très concurrentiels, comptez 6 à 12 mois."
            }
        },
        {
            "@type": "Question",
            "name": "Garantissez-vous la première position Google ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Non, et fuyez quiconque le promet. Google seul décide des classements. Ce que je garantis : une méthodologie rigoureuse, un travail transparent et une amélioration mesurable de votre visibilité."
            }
        },
        {
            "@type": "Question",
            "name": "Quelle différence entre SEO et SEA ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le SEO (référencement naturel) travaille sur les résultats organiques - investissement long terme. Le SEA (Google Ads) affiche des annonces payantes - résultats immédiats mais coût par clic. Les deux sont complémentaires."
            }
        },
        {
            "@type": "Question",
            "name": "Travaillez-vous à distance ou uniquement localement ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Je travaille avec des clients partout en France et à l'international. Les échanges se font par visio, téléphone et email. Pour les clients locaux (Côte d'Azur, PACA), des rendez-vous physiques sont possibles."
            }
        }
    ]
};

export default function FAQPage() {
    return (
        <>
            <Breadcrumb items={getServiceBreadcrumb("FAQ", "/faq")} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FAQContent />
        </>
    );
}
