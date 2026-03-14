import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Lyon — Référencement Local Rhône-Alpes",
    description: "Consultante SEO freelance à Lyon. Référencement local pour PME et startups du Rhône. Audit technique gratuit.",
    keywords: ["consultant SEO Lyon", "référencement Lyon", "SEO Rhône", "audit SEO Lyon", "expert SEO 69", "agence SEO Lyon", "référencement naturel Lyon"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-lyon"
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Consultante SEO Lyon — Référencement Local Rhône-Alpes",
        description: "Dominez Google à Lyon. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises lyonnaises. Part-Dieu, Confluence, Gerland.",
        url: "https://indhack.com/consultant-seo-lyon",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultante SEO Lyon — Référencement Local Rhône-Alpes",
        description: "Consultante SEO freelance à Lyon. Référencement local pour PME et startups du Rhône."
    }
};

export default function LyonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
