import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Antibes & Sophia-Antipolis | Expert Tech",
    description: "Référencement naturel à Antibes, Juan-les-Pins et Sophia-Antipolis. Stratégies SEO pour startups tech, commerces locaux et professions libérales. Audit gratuit.",
    alternates: {
        canonical: "https://indhack.com/seo-antibes"
    },
    openGraph: {
        title: "Consultante SEO Antibes | Indiana Aflalo - IndHack",
        description: "Dominez Google sur Antibes et Sophia-Antipolis. SEO technique pour startups et PME de la technopole.",
        url: "https://indhack.com/seo-antibes",
    }
};

export default function SeoAntibesPage() {
    return (
        <CityPageTemplate
            city="Antibes"
            zipCode="06600"
            description="Entre le port Vauban et la technopole de Sophia-Antipolis, Antibes est un carrefour stratégique où se mêlent tourisme, tech et commerce. Les startups de Sophia comme les commerces de Juan-les-Pins ont besoin d'une visibilité Google optimale. Ne laissez pas vos concurrents prendre toute la place sur les résultats de recherche."
        />
    );
}

