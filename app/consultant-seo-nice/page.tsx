import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-nice")!;

export const metadata: Metadata = {
    title: `Consultant SEO Nice | INDHACK, Consultante SEO`,
    description: `Boostez votre visibilité sur Google à Nice avec une experte SEO locale. Audit gratuit, stratégie sur-mesure, accompagnement personnalisé pour PME et entrepreneurs niçois. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultante SEO Nice | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à Nice. Référencement local, audit SEO et stratégie digitale sur-mesure pour entreprises des Alpes-Maritimes.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoNicePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
