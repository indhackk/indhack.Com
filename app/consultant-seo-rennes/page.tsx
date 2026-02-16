import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-rennes")!;

export const metadata: Metadata = {
    title: `Consultant SEO Rennes`,
    description: `Boostez votre visibilité sur Google à ${cityData.name}. Consultante SEO freelance experte en référencement local pour PME et startups tech d'${cityData.department}. Audit gratuit ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | Indiana Aflalo`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises bretonnes.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoRennesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
