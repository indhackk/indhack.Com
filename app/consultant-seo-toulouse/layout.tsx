import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Toulouse (31000) | Experte référencement Haute-Garonne",
    description: "Consultante SEO à Toulouse. Stratégie de visibilité B2B pour sous-traitants aéronautiques, ESN et startups de la Ville Rose.",
    robots: { index: true, follow: true },
    keywords: ["consultante SEO Toulouse", "référencement Toulouse", "SEO Haute-Garonne", "audit SEO Toulouse", "experte SEO 31"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-toulouse"
    },
    openGraph: {
        title: "Consultante SEO Toulouse (31000) | SEO B2B aéronautique",
        description: "Experte SEO à Toulouse. Airbus, sous-traitants, ESN : générez des leads qualifiés dans l'écosystème aéronautique.",
        url: "https://indhack.com/consultant-seo-toulouse",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function ToulouseLayout({ children }: { children: React.ReactNode }) {
    return children;
}
