import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Antibes | Experte Référencement Juan-les-Pins",
    description: "Référencement naturel à Antibes et Juan-les-Pins. Stratégies SEO pour commerces, restaurants, hôtels et professions libérales. Audit gratuit.",
    alternates: {
        canonical: "https://indhack.com/seo-antibes"
    },
    openGraph: {
        title: "Consultante SEO Antibes | Indiana Aflalo - IndHack",
        description: "Dominez Google à Antibes et Juan-les-Pins. SEO local pour commerces, hôtellerie et services de proximité.",
        url: "https://indhack.com/seo-antibes",
    }
};

export default function SeoAntibesPage() {
    return (
        <CityPageTemplate
            city="Antibes"
            zipCode="06600"
            description="Entre le prestigieux port Vauban et les plages de Juan-les-Pins, Antibes est une destination prisée qui attire touristes fortunés et résidents permanents. Pour les restaurateurs du vieil Antibes, les hôteliers de Juan-les-Pins, les agents immobiliers ou les professions libérales, la visibilité Google est cruciale pour capter cette clientèle locale et touristique à fort pouvoir d'achat."
        />
    );
}


