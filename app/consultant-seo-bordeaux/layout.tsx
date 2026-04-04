import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Bordeaux (33000) | Experte référencement Gironde",
    description: "Consultante SEO à Bordeaux. Stratégie de visibilité pour domaines viticoles, startups tech et commerces du centre historique bordelais.",
    robots: { index: false, follow: true },
    keywords: ["consultante SEO Bordeaux", "référencement Bordeaux", "SEO Gironde", "audit SEO Bordeaux", "experte SEO 33"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-bordeaux"
    },
    openGraph: {
        title: "Consultante SEO Bordeaux (33000) | Référencement vin & tech",
        description: "Experte SEO à Bordeaux. Oenotourisme, tech, immobilier : positionnement Google adapté à l'écosystème girondin.",
        url: "https://indhack.com/consultant-seo-bordeaux",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function BordeauxLayout({ children }: { children: React.ReactNode }) {
    return children;
}
