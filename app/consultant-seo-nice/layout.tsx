import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Nice (06000) - IndHack",
    description: "Consultante SEO à Nice. Audit technique, stratégie de visibilité Google et SEO local pour PME niçoises. Stratégie SEO locale claire et mesurable.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-nice"
    },
    openGraph: {
        title: "Consultant SEO Nice (06000) - IndHack",
        description: "Consultante SEO à Nice, Côte d'Azur. Diagnostic SEO, accompagnement personnalisé pour renforcer votre visibilité dans les Alpes-Maritimes.",
        url: "https://indhack.com/consultant-seo-nice",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
