import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-cannes")!;

export const metadata: Metadata = {
    title: `Consultant SEO Cannes | Expert Référencement Côte d'Azur - INDHACK`,
    description: `Consultant SEO à Cannes : boostez votre visibilité Google. Experte référencement freelance Côte d'Azur. Audit gratuit PME, commerces, professions libérales ✆ 06 61 13 97 48`,
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
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
