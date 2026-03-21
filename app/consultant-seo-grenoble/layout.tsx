import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Grenoble (38000) | Experte référencement Isère",
    description: "Consultante SEO à Grenoble : audit technique, référencement local et stratégie SEO pour PME et startups de l'Isère. Premier audit gratuit. Résultats en 3 mois.",
    keywords: ["consultant SEO Grenoble", "référencement Grenoble", "SEO Isère", "audit SEO Grenoble", "experte SEO 38", "agence SEO Grenoble", "référencement naturel Grenoble"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-grenoble"
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Consultante SEO Grenoble (38) | Experte référencement Isère",
        description: "Dominez Google à Grenoble. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises grenobloises. Startups tech, tourisme montagne, PME.",
        url: "https://indhack.com/consultant-seo-grenoble",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultante SEO Grenoble (38) | Experte référencement Isère",
        description: "Consultante SEO freelance à Grenoble. Audit technique, référencement local pour startups tech et PME de l'Isère."
    }
};

export default function GrenoblelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
