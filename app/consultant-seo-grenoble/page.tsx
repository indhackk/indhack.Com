import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-grenoble")!;

export const metadata: Metadata = {
    title: `Consultant SEO Grenoble | Expert Référencement Isère - INDHACK`,
    description: `Consultant SEO à Grenoble : boostez votre visibilité Google. Experte en référencement local pour startups tech et PME de l'Isère. Audit de site gratuit ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises grenobloises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoGrenoblePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
