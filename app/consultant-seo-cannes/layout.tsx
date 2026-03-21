import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Cannes (06400) | Expert référencement luxe",
    description: "Consultante SEO à Cannes. Stratégie de visibilité Google pour immobilier prestige, yachting et événementiel. Dominez la Croisette sur Google.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-cannes"
    },
    openGraph: {
        title: "Consultant SEO Cannes (06400) | Référencement premium",
        description: "Experte SEO à Cannes pour marchés luxe. Immobilier, yachting, événementiel : positionnement Google premium.",
        url: "https://indhack.com/consultant-seo-cannes",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
