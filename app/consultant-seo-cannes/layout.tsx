import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Cannes (06400) - IndHack",
    description: "Consultante SEO à Cannes. Stratégie Google pour immobilier prestige, yachting, événementiel et recherches locales premium.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-cannes"
    },
    openGraph: {
        title: "Consultant SEO Cannes (06400) - IndHack",
        description: "Experte SEO à Cannes pour marchés luxe. Immobilier, yachting, événementiel : positionnement Google premium.",
        url: "https://indhack.com/consultant-seo-cannes",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
