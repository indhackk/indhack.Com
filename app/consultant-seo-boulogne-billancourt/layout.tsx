import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Boulogne-Billancourt (92100) | Expert référencement médias",
    description: "Consultante SEO à Boulogne-Billancourt. Stratégie de visibilité pour agences de production, sociétés de médias et prestataires audiovisuels du 92.",
    keywords: ["consultante SEO Boulogne-Billancourt", "référencement Boulogne", "SEO Hauts-de-Seine", "audit SEO 92", "expert SEO médias"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-boulogne-billancourt"
    },
    openGraph: {
        title: "Consultante SEO Boulogne-Billancourt (92100) | SEO médias & production",
        description: "Experte SEO à Boulogne-Billancourt. Médias, production audiovisuelle, communication : visibilité Google pour l'écosystème média du 92.",
        url: "https://indhack.com/consultant-seo-boulogne-billancourt",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function BoulogneLayout({ children }: { children: React.ReactNode }) {
    return children;
}
