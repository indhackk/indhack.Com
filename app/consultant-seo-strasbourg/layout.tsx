import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Strasbourg : audit et référencement Alsace",
    description: "Consultant SEO à Strasbourg : audit, référencement Google et stratégie bilingue FR/DE pour PME alsaciennes. Devis gratuit sous 24h.",
    robots: { index: true, follow: true },
    keywords: ["consultant SEO Strasbourg", "référencement Strasbourg", "SEO Alsace", "audit SEO Strasbourg", "consultant SEO 67", "consultante SEO Strasbourg"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-strasbourg"
    },
    openGraph: {
        title: "Consultant SEO Strasbourg : audit et référencement Alsace",
        description: "Expert SEO à Strasbourg. Carrefour européen, SEO bilingue FR/DE, institutions : positionnement Google adapté au marché alsacien.",
        url: "https://indhack.com/consultant-seo-strasbourg",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function StrasbourgLayout({ children }: { children: React.ReactNode }) {
    return children;
}
