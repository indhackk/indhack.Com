import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Grenoble (38) | Expert Référencement Isère",
    description: "Consultante SEO freelance à Grenoble. Audit technique, référencement local pour startups tech, PME de l'Isère et entreprises Auvergne-Rhône-Alpes. Devis gratuit ✆ 06 61 13 97 48",
    keywords: ["consultant SEO Grenoble", "référencement Grenoble", "SEO Isère", "audit SEO Grenoble", "expert SEO 38", "agence SEO Grenoble", "référencement naturel Grenoble"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-grenoble"
    },
    openGraph: {
        title: "Consultant SEO Grenoble (38) | Expert Référencement Isère",
        description: "Dominez Google à Grenoble. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises grenobloises. Startups tech, tourisme montagne, PME.",
        url: "https://indhack.com/consultant-seo-grenoble",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant SEO Grenoble (38) | Expert Référencement Isère",
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
