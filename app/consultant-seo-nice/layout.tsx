import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Nice (06000) | Experte référencement Côte d'Azur",
    description: "Consultante SEO freelance à Nice. Audit technique, stratégie de visibilité Google et SEO local pour PME niçoises. +200 % de trafic organique en 6 mois.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-nice"
    },
    openGraph: {
        title: "Consultante SEO Nice (06000) | Experte référencement",
        description: "Experte SEO à Nice, Côte d'Azur. Audit gratuit, accompagnement personnalisé pour dominer Google dans les Alpes-Maritimes.",
        url: "https://indhack.com/consultant-seo-nice",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
