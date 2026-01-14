import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";

const cityData = getCityBySlug("seo-montpellier")!;

export const metadata: Metadata = {
    title: `Consultant SEO ${cityData.name} (${cityData.zipCode}) | Référencement Local`,
    description: `Boostez votre visibilité sur Google à ${cityData.name}. Consultante SEO freelance experte en référencement local pour PME et startups de l'${cityData.department}. Audit gratuit ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises montpelliéraines.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoMontpellierPage() {
    return <CityPageTemplateV2 cityData={cityData} />;
}
