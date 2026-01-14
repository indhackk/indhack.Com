import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Nice (06) | Expert Référencement Freelance",
    description: "Boostez votre visibilité à Nice avec une experte SEO locale. Stratégies sur-mesure pour PME niçoises. Audit gratuit.",
};

export default function SeoNicePage() {
    return (
        <CityPageTemplate
            city="Nice"
            zipCode="06000"
            description="Capitale de la Côte d'Azur, Nice est un marché ultra-dynamique où la concurrence digitale est féroce. Que vous soyez restaurateur dans le Vieux-Nice, avocat sur la Promenade ou artisan à Cimiez, votre client est sur Google."
        />
    );
}
