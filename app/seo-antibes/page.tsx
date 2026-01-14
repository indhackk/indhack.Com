import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Antibes & Sophia | Expert Tech",
    description: "Référencement naturel à Antibes, Juan-les-Pins et Sophia-Antipolis. Stratégies SEO pour startups et commerces locaux.",
};

export default function SeoAntibesPage() {
    return (
        <CityPageTemplate
            city="Antibes"
            zipCode="06600"
            description="Entre le port Vauban et la technopole de Sophia-Antipolis, Antibes est un carrefour stratégique. Ne laissez pas vos concurrents de la technopole prendre toute la place sur les résultats de recherche."
        />
    );
}
