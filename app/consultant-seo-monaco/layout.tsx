import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Monaco (98000) - IndHack",
    description: "Consultante SEO à Monaco. Stratégie de visibilité pour family offices, banques privées et services premium. SEO multilingue FR/EN/IT.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-monaco"
    },
    openGraph: {
        title: "Consultant SEO Monaco (98000) - IndHack",
        description: "Experte SEO à Monaco. Clientèle ultra-premium, gestion de patrimoine, conciergerie luxe. Visibilité Google en 4 langues.",
        url: "https://indhack.com/consultant-seo-monaco",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
