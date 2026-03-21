import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Montpellier (34000) | Expert référencement Hérault",
    description: "Consultante SEO à Montpellier. Stratégie de visibilité pour professionnels de santé, startups biotech et commerces de l'Écusson.",
    keywords: ["consultante SEO Montpellier", "référencement Montpellier", "SEO Hérault", "audit SEO Montpellier", "expert SEO 34"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-montpellier"
    },
    openGraph: {
        title: "Consultante SEO Montpellier (34000) | Référencement local",
        description: "Experte SEO à Montpellier. Santé, biotech, commerce : dominez Google dans la métropole héraultaise en croissance.",
        url: "https://indhack.com/consultant-seo-montpellier",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function MontpellierLayout({ children }: { children: React.ReactNode }) {
    return children;
}
