import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Lyon (69000) | Experte référencement Rhône",
    description: "Consultante SEO à Lyon. Audit, stratégie locale et référencement naturel pour PME, startups et entreprises de services du Rhône.",
    keywords: ["consultant SEO Lyon", "référencement Lyon", "SEO Rhône", "audit SEO Lyon", "experte SEO 69", "agence SEO Lyon", "référencement naturel Lyon"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-lyon"
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Consultante SEO Lyon — Référencement Local Rhône-Alpes",
        description: "Renforcez votre visibilité à Lyon avec une stratégie SEO locale claire, technique et mesurable. Part-Dieu, Confluence, Gerland.",
        url: "https://indhack.com/consultant-seo-lyon",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultante SEO Lyon — Référencement Local Rhône-Alpes",
        description: "Consultante SEO à Lyon. Référencement local pour PME, startups et entreprises de services du Rhône."
    }
};

export default function LyonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
