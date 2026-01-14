import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Cannes | Référencement Luxe & Prestige",
    description: "Expertise SEO à Cannes pour entreprises exigeantes. Positionnez-vous sur les mots-clés premium de la Croisette. Référencement local et multilingue. Audit offert.",
    alternates: {
        canonical: "https://indhack.com/seo-cannes"
    },
    openGraph: {
        title: "Consultante SEO Cannes | Indiana Aflalo - IndHack",
        description: "Dominez Google à Cannes. SEO haut de gamme pour hôtels, commerces de luxe et entreprises événementielles de la Côte d'Azur.",
        url: "https://indhack.com/seo-cannes",
    }
};

export default function SeoCannesPage() {
    return (
        <CityPageTemplate
            city="Cannes"
            zipCode="06400"
            description="Cannes n'est pas qu'une ville de cinéma, c'est un hub business international. Pour capter une clientèle locale ou internationale lors des congrès (MIPIM, Festival, MAPIC), votre visibilité Google doit être irréprochable et multilingue. Le SEO local à Cannes exige une approche premium, adaptée aux attentes d'une clientèle exigeante."
        />
    );
}

