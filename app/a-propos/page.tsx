import { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
    title: "À Propos | Indiana Aflalo - Consultante SEO & Experte Acquisition Digitale",
    description: "Découvrez mon parcours : consultante SEO indépendante spécialisée en référencement naturel, audit technique et stratégie digitale. Accompagnement personnalisé pour PME et startups.",
    alternates: {
        canonical: "https://indhack.com/a-propos"
    },
    openGraph: {
        title: "Indiana Aflalo - Consultante SEO & Experte Digitale",
        description: "Spécialiste du référencement naturel, j'aide les entreprises à dominer Google et transformer leur visibilité en clients.",
        url: "https://indhack.com/a-propos",
    }
};

export default function AboutPage() {
    return <AboutContent />;
}
