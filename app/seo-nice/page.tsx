import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Nice (06) | Experte Référencement Freelance",
    description: "Boostez votre visibilité sur Google à Nice avec une experte SEO locale. Audit gratuit, stratégie sur-mesure, accompagnement personnalisé pour PME et entrepreneurs niçois. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/seo-nice"
    },
    openGraph: {
        title: "Consultante SEO Nice | Indiana Aflalo - IndHack",
        description: "Dominez les résultats Google à Nice. Référencement local, audit SEO et stratégie digitale sur-mesure pour entreprises des Alpes-Maritimes.",
        url: "https://indhack.com/seo-nice",
    }
};

export default function SeoNicePage() {
    return (
        <CityPageTemplate
            city="Nice"
            zipCode="06000"
            description="Capitale de la Côte d'Azur, Nice est un marché ultra-dynamique où la concurrence digitale est féroce. Que vous soyez restaurateur dans le Vieux-Nice, avocat sur la Promenade ou artisan à Cimiez, votre client est sur Google. Un positionnement SEO local solide vous permettra de capter cette audience qualifiée avant vos concurrents."
        />
    );
}

