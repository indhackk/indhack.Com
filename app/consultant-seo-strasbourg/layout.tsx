import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Strasbourg (67000) | Experte référencement Alsace",
    description: "Consultante SEO à Strasbourg. Stratégie de visibilité bilingue FR/DE pour entreprises transfrontalières et commerces de la Grande Île.",
    robots: { index: false, follow: true },
    keywords: ["consultante SEO Strasbourg", "référencement Strasbourg", "SEO Alsace", "audit SEO Strasbourg", "experte SEO 67"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-strasbourg"
    },
    openGraph: {
        title: "Consultante SEO Strasbourg (67000) | SEO bilingue FR/DE",
        description: "Experte SEO à Strasbourg. Carrefour européen, SEO bilingue, institutions : positionnement Google adapté au marché alsacien.",
        url: "https://indhack.com/consultant-seo-strasbourg",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function StrasbourgLayout({ children }: { children: React.ReactNode }) {
    return children;
}
