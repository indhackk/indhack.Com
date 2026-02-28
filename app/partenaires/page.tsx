import { Metadata } from "next";
import { PartenairesClient } from "./PartenairesClient";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "Widget SEO Gratuit pour Agences Web | Générateur de Leads",
    description: "Intégrez gratuitement notre widget d'audit SEO marque blanche sur votre site web. Vos visiteurs testent leur référencement, vous générez des leads qualifiés.",
    keywords: ["widget seo agence", "générateur de leads SEO marque blanche", "widget audit seo gratuit wordpress", "outil lead generation agence web", "testeur ia marque blanche", "outil prospection digitale agence web", "inbound marketing agence seo"],
    alternates: {
        canonical: "https://indhack.com/partenaires"
    },
    openGraph: {
        title: "Widget SEO Gratuit pour Agences Web | Générez des Leads — IndHack",
        description: "Intégrez un testeur de visibilité IA gratuit sur votre site d'agence. Vos visiteurs testent leur SEO, vous recevez leurs emails. Installation en 2 min, 0€.",
        url: "https://indhack.com/partenaires",
        type: "website",
        images: [{
            url: "https://indhack.com/api/og?title=Widget%20SEO%20Gratuit%20pour%20Agences&subtitle=G%C3%A9n%C3%A9rez%20des%20leads%20depuis%20votre%20site",
            width: 1200,
            height: 630,
            alt: "Widget SEO Gratuit pour Agences Web - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Widget SEO Gratuit pour Agences Web | Générez des Leads — IndHack",
        description: "Intégrez un testeur de visibilité IA gratuit sur votre site d'agence. Vos visiteurs testent leur SEO, vous recevez leurs emails. Installation en 2 min, 0€.",
        images: ["https://indhack.com/api/og?title=Widget%20SEO%20Gratuit%20pour%20Agences&subtitle=G%C3%A9n%C3%A9rez%20des%20leads%20depuis%20votre%20site"],
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
            "name": "Comment intégrer ce widget d'audit SEO gratuit sur mon site d'agence web (WordPress, Webflow, etc.) ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le widget est universel. Vous copiez l'extrait de code HTML généré ci-dessus et vous le collez sur n'importe quel CMS : WordPress, Shopify, Webflow, Wix, Squarespace ou un site développé sur-mesure. Il s'intègre instantanément pour capter les emails de vos prospects."
            }
        },
        {
            "@type": "Question",
            "name": "Est-ce que le générateur de leads SEO est vraiment 100% gratuit ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, ce widget d'audit est entièrement gratuit. Contrairement aux outils de prospection digitale SaaS, il n'y a ni abonnement ni coût caché. En échange de l'analyse, un simple lien discret 'Propulsé par IndHack' informe vos visiteurs sur l'origine du calcul."
            }
        },
        {
            "@type": "Question",
            "name": "Combien de prospects cet outil d'inbound marketing SEO génère-t-il en moyenne ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sur une page d'agence recevant du trafic qualifié, l'outil offre un fort taux de conversion. En moyenne, 5 à 15 % des visiteurs qui testent leur site laissent leur email pour obtenir le rapport complet. Pour 1000 visiteurs sur la page, attendez-vous à collecter entre 50 et 150 leads qualifiés."
            }
        },
        {
            "@type": "Question",
            "name": "Le widget d'analyse a-t-il un impact sur la vitesse (Core Web Vitals) de l'agence ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Non. L'iframe utilise l'attribut native HTML `loading=lazy`. Le script ne sera donc chargé que si le visiteur scrolle jusqu'au générateur. Les performances de vitesse de votre landing page restent parfaitement optimisées."
            }
        },
        {
            "@type": "Question",
            "name": "Comment fonctionne techniquement l'analyse de visibilité IA ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "L'outil vérifie en temps réel le fichier robots.txt du nom de domaine analysé. Il teste les accès des 8 grands crawlers d'intelligence artificielle (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, etc.). De plus, il scanne le balisage sémantique et la structure du site pour évaluer si l'information est lisible pour l'IA (Generative Engine Optimization)."
            }
        },
        {
            "@type": "Question",
            "name": "Puis-je adapter esthétiquement ce testeur SEO marque blanche à la charte de mon agence de communication ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le design a été conçu pour être premium et neutre. Actuellement, les couleurs internes de l'iframe ne peuvent pas être modifiées, mais son esthétique élégante lui permet de s'adapter facilement à la majorité des agences digitales et studios de développement web. Vous gardez en revanche le contrôle sur la largeur et le positionnement du conteneur."
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
