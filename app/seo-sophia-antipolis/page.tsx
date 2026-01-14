import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Sophia-Antipolis | Experte Startups & Tech",
    description: "Référencement naturel pour startups et entreprises tech de Sophia-Antipolis. Stratégies SEO B2B, SaaS et deeptech. Audit gratuit pour la technopole.",
    alternates: {
        canonical: "https://indhack.com/seo-sophia-antipolis"
    },
    openGraph: {
        title: "Consultante SEO Sophia-Antipolis | Indiana Aflalo - IndHack",
        description: "Dominez Google sur la technopole. SEO technique pour startups, SaaS et entreprises innovantes de Sophia-Antipolis.",
        url: "https://indhack.com/seo-sophia-antipolis",
    }
};

export default function SeoSophiaAntipolisPage() {
    return (
        <CityPageTemplate
            city="Sophia-Antipolis"
            zipCode="06560"
            description="Première technopole d'Europe, Sophia-Antipolis concentre plus de 2 500 entreprises et 40 000 emplois dans les secteurs de l'innovation : IA, IoT, biotech, greentech, fintech. Dans cet écosystème ultra-compétitif, la visibilité Google est un levier de croissance stratégique. Que vous soyez une startup early-stage cherchant vos premiers clients B2B, une scale-up en hypercroissance ou un grand compte tech, une stratégie SEO adaptée à votre cycle de maturité est essentielle pour générer des leads qualifiés."
        />
    );
}
