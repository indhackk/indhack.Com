import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Juan-les-Pins (06160) | Experte référencement saisonnier",
    description: "Consultante SEO à Juan-les-Pins. Stratégie de visibilité pour plages privées, hôtels et nightlife. Préparez votre saison estivale sur Google.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-juan-les-pins"
    },
    openGraph: {
        title: "Consultante SEO Juan-les-Pins (06160) | SEO saisonnier",
        description: "Experte SEO à Juan-les-Pins. Beach clubs, hôtels, Jazz à Juan : soyez visible AVANT la saison.",
        url: "https://indhack.com/consultant-seo-juan-les-pins",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
