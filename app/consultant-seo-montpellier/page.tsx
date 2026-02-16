import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-montpellier")!;

export const metadata: Metadata = {
    title: `Consultante SEO Montpellier | Indiana Aflalo - Experte Référencement`,
    description: `Consultante SEO à Montpellier : boostez votre visibilité Google. Experte en référencement local pour PME et startups de l'Hérault. Audit gratuit ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | Indiana Aflalo`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises montpelliéraines.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoMontpellierPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
