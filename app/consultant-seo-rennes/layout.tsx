import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Rennes (35000) | Expert référencement Bretagne",
    description: "Consultante SEO à Rennes. Stratégie de visibilité pour ESN, startups cybersécurité et entreprises tech de la French Tech Rennes.",
    keywords: ["consultante SEO Rennes", "référencement Rennes", "SEO Bretagne", "audit SEO Rennes", "expert SEO 35"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-rennes"
    },
    openGraph: {
        title: "Consultante SEO Rennes (35000) | SEO tech & cybersécurité",
        description: "Experte SEO à Rennes. ESN, cybersécurité, recrutement tech : générez des leads dans l'écosystème breton.",
        url: "https://indhack.com/consultant-seo-rennes",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function RennesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
