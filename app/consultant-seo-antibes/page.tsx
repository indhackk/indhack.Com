import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-antibes")!;

export const metadata: Metadata = {
    title: `Consultant SEO Antibes | INDHACK, Consultante SEO`,
    description: `Boostez votre visibilité sur Google à Antibes et Juan-les-Pins. Consultante SEO freelance experte. Audit gratuit pour PME, commerces et artisans. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Antibes | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à Antibes. Référencement local, audit SEO et stratégie digitale pour entreprises antiboises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoAntibesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
