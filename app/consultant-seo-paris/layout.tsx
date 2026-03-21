import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Paris (75000) | Expert référencement Île-de-France",
    description: "Consultante SEO à Paris. Stratégie de visibilité pour startups, PME et commerces parisiens. Dominez Google dans le marché le plus concurrentiel de France.",
    keywords: ["consultante SEO Paris", "référencement Paris", "SEO Île-de-France", "audit SEO Paris", "expert SEO 75"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-paris"
    },
    openGraph: {
        title: "Consultante SEO Paris (75000) | Référencement premium",
        description: "Experte SEO à Paris. Stratégie chirurgicale pour émerger dans la capitale. Tous secteurs, tous arrondissements.",
        url: "https://indhack.com/consultant-seo-paris",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function ParisLayout({ children }: { children: React.ReactNode }) {
    return children;
}
