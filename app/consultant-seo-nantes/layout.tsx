import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Nantes (44000) | Expert référencement Loire-Atlantique",
    description: "Consultante SEO à Nantes. Stratégie de visibilité pour startups créatives, agences digitales et commerces du centre-ville nantais.",
    keywords: ["consultante SEO Nantes", "référencement Nantes", "SEO Loire-Atlantique", "audit SEO Nantes", "expert SEO 44"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-nantes"
    },
    openGraph: {
        title: "Consultante SEO Nantes (44000) | Référencement créatif",
        description: "Experte SEO à Nantes. Écosystème créatif, tech, événementiel : dominez Google dans la métropole nantaise.",
        url: "https://indhack.com/consultant-seo-nantes",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function NantesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
