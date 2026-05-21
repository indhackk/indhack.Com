import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Montpellier (34000) - IndHack",
    description: "Consultante SEO à Montpellier. Stratégie de visibilité pour professionnels de santé, startups biotech et commerces de l'Écusson.",
    keywords: ["consultante SEO Montpellier", "référencement Montpellier", "SEO Hérault", "audit SEO Montpellier", "experte SEO 34"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-montpellier"
    },
    openGraph: {
        title: "Consultant SEO Montpellier (34000) - IndHack",
        description: "Experte SEO à Montpellier. Santé, biotech, commerce : renforcez votre visibilité dans la métropole héraultaise en croissance.",
        url: "https://indhack.com/consultant-seo-montpellier",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function MontpellierLayout({ children }: { children: React.ReactNode }) {
    return children;
}
