import { Metadata } from "next";
import { PartenairesClient } from "./PartenairesClient";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "Widget SEO Gratuit pour Agences Web | Générez des Leads — IndHack",
    description: "Intégrez un testeur de visibilité IA gratuit sur votre site d'agence. Vos visiteurs testent leur SEO, vous recevez leurs emails. Installation en 2 min, 0€.",
    keywords: ["widget seo agence", "outil lead generation agence web", "testeur ia marque blanche"],
    alternates: {
        canonical: "https://indhack.com/partenaires"
    },
    openGraph: {
        title: "Widget SEO Gratuit pour Agences Web | Générez des Leads — IndHack",
        description: "Intégrez un testeur de visibilité IA gratuit sur votre site d'agence. Vos visiteurs testent leur SEO, vous recevez leurs emails. Installation en 2 min, 0€.",
        url: "https://indhack.com/partenaires",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Widget SEO Gratuit pour Agences Web | Générez des Leads — IndHack",
        description: "Intégrez un testeur de visibilité IA gratuit sur votre site d'agence. Vos visiteurs testent leur SEO, vous recevez leurs emails. Installation en 2 min, 0€.",
    },
    robots: {
        index: true,
        follow: true,
    }
};

// FAQ Schema JSON-LD
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Est-ce vraiment 100% gratuit ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, le widget est entièrement gratuit. Pas de frais cachés, pas d'abonnement. En échange, un petit lien \"Propulsé par IndHack\" apparaît sous le widget, ce qui nous aide pour notre référencement."
            }
        },
        {
            "@type": "Question",
            "name": "Combien de leads puis-je espérer par mois ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cela dépend de votre trafic. En moyenne, 5 à 15% des visiteurs qui utilisent l'outil laissent leur email pour recevoir un rapport détaillé. Sur un site avec 1000 visiteurs/mois sur la page du widget, vous pouvez espérer 50 à 150 leads qualifiés."
            }
        },
        {
            "@type": "Question",
            "name": "Le widget ralentit-il mon site ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Non. Le widget se charge via une iframe avec l'attribut loading=\"lazy\", ce qui signifie qu'il ne se charge que lorsque l'utilisateur scrolle jusqu'à lui. Il n'impacte pas votre Core Web Vitals."
            }
        },
        {
            "@type": "Question",
            "name": "Puis-je personnaliser l'apparence du widget ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le widget a un design neutre qui s'intègre bien sur la plupart des sites. Pour l'instant, la personnalisation des couleurs n'est pas disponible, mais vous pouvez ajuster la largeur maximale et le style du conteneur via le code HTML."
            }
        },
        {
            "@type": "Question",
            "name": "Comment fonctionne l'analyse de visibilité IA ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "L'outil analyse le fichier robots.txt du site testé pour vérifier s'il autorise les 8 principaux crawlers IA (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, etc.). Il évalue également la structure sémantique, les signaux E-E-A-T et le format du contenu pour calculer un score de visibilité sur 100."
            }
        },
        {
            "@type": "Question",
            "name": "C'est compatible avec quel CMS ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le widget fonctionne avec tous les CMS et constructeurs de sites : WordPress, Webflow, Shopify, Wix, Squarespace, Framer, ou même un site HTML statique. Il suffit de pouvoir coller du code HTML."
            }
        }
    ]
};

export default function PartenairesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Breadcrumb items={[
                { label: "Partenaires", href: "/partenaires" }
            ]} />
            <PartenairesClient />
        </>
    );
}
