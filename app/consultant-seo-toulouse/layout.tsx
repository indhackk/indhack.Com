import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Toulouse (31000) - IndHack",
    description: "Consultante SEO à Toulouse. Stratégie de visibilité B2B pour sous-traitants aéronautiques, ESN et startups de la Ville Rose.",
    robots: { index: true, follow: true },
    keywords: ["consultante SEO Toulouse", "référencement Toulouse", "SEO Haute-Garonne", "audit SEO Toulouse", "experte SEO 31"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-toulouse"
    },
    openGraph: {
        title: "Consultant SEO Toulouse (31000) - IndHack",
        description: "Experte SEO à Toulouse. Airbus, sous-traitants, ESN : développez des demandes qualifiées dans l'écosystème aéronautique.",
        url: "https://indhack.com/consultant-seo-toulouse",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function ToulouseLayout({ children }: { children: React.ReactNode }) {
    return children;
}
