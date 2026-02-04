import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";

const cityData = getCityBySlug("seo-cannes")!;

export const metadata: Metadata = {
    title: `Consultant SEO Cannes | INDHACK, Consultante SEO`,
    description: `Boostez votre visibilité sur Google à Cannes. Consultante SEO freelance experte de la Côte d'Azur. Audit gratuit pour PME, commerces et professions libérales. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Cannes | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à Cannes. Référencement local, audit SEO et stratégie digitale pour entreprises cannoises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoCannesPage() {
    return <CityPageTemplateV2 cityData={cityData} />;
}
