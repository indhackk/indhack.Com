import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Cannes | Référencement & Luxe",
    description: "Expertise SEO à Cannes pour entreprises exigeantes. Positionnez-vous sur les mots-clés premium de la Croisette. Audit offert.",
};

export default function SeoCannesPage() {
    return (
        <CityPageTemplate
            city="Cannes"
            zipCode="06400"
            description="Cannes n'est pas qu'une ville de cinéma, c'est un hub business international. Pour capter une clientèle locale ou internationale lors des congrès, votre visibilité Google doit être irréprochable et multilingue."
        />
    );
}
