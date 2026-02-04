import { Metadata } from "next";
import ConsultantSEOClient from "./ConsultantSEOClient";

export const metadata: Metadata = {
    title: "Consultant SEO Freelance | Indiana Aflalo - Experte Référencement",
    description: "Consultante SEO freelance expérimentée. Audit technique, stratégie de contenu, netlinking. Résultats mesurables et ROI garanti. Devis gratuit sous 24h.",
    keywords: ["consultant SEO", "consultant SEO freelance", "consultante SEO", "expert référencement naturel", "consultant référencement", "SEO freelance"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo"
    },
    openGraph: {
        title: "Consultant SEO Freelance | Indiana Aflalo",
        description: "Consultante SEO freelance expérimentée. Audit, stratégie et optimisation pour booster votre visibilité Google.",
        url: "https://indhack.com/consultant-seo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant SEO Freelance | Indiana Aflalo",
        description: "Consultante SEO freelance expérimentée. Résultats mesurables et ROI garanti.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantSEOPage() {
    return <ConsultantSEOClient />;
}
