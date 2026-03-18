import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Aix-en-Provence — référencement local PACA",
    description: "Consultante SEO freelance à Aix-en-Provence. Référencement local pour PME, startups et professions libérales des Bouches-du-Rhône. Audit gratuit.",
    keywords: ["consultant SEO Aix-en-Provence", "référencement Aix", "SEO Bouches-du-Rhône", "audit SEO Aix", "expert SEO Aix", "agence SEO Aix-en-Provence", "référencement naturel Aix"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-aix-en-provence"
    },
    openGraph: {
        title: "Consultante SEO Aix-en-Provence — référencement local PACA",
        description: "Dominez Google à Aix-en-Provence. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises aixoises. Cours Mirabeau, Les Milles, Mazarin.",
        url: "https://indhack.com/consultant-seo-aix-en-provence",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultante SEO Aix-en-Provence — référencement local PACA",
        description: "Consultante SEO freelance à Aix-en-Provence. Référencement local pour PME, startups et professions libérales des Bouches-du-Rhône."
    }
};

export default function AixLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
