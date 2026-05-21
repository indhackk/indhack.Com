import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Rennes (35000) - IndHack",
    description: "Consultante SEO à Rennes. Stratégie de visibilité pour ESN, startups cybersécurité et entreprises tech de la French Tech Rennes.",
    robots: { index: true, follow: true },
    keywords: ["consultante SEO Rennes", "référencement Rennes", "SEO Bretagne", "audit SEO Rennes", "experte SEO 35"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-rennes"
    },
    openGraph: {
        title: "Consultant SEO Rennes (35000) - IndHack",
        description: "Experte SEO à Rennes. ESN, cybersécurité, recrutement tech : développez des demandes qualifiées dans l'écosystème breton.",
        url: "https://indhack.com/consultant-seo-rennes",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function RennesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
