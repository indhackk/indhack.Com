import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Nantes (44000) - IndHack",
    description: "Consultante SEO à Nantes. Stratégie de visibilité pour startups créatives, agences digitales et commerces du centre-ville nantais.",
    robots: { index: true, follow: true },
    keywords: ["consultante SEO Nantes", "référencement Nantes", "SEO Loire-Atlantique", "audit SEO Nantes", "experte SEO 44"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-nantes"
    },
    openGraph: {
        title: "Consultant SEO Nantes (44000) - IndHack",
        description: "Experte SEO à Nantes. Écosystème créatif, tech, événementiel : renforcez votre visibilité dans la métropole nantaise.",
        url: "https://indhack.com/consultant-seo-nantes",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function NantesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
