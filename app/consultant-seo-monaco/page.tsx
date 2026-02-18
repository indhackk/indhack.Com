import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-monaco")!;

export const metadata: Metadata = {
    title: `Consultant SEO Monaco`,
    description: `Boostez votre visibilité sur Google à Monaco. Consultante SEO freelance experte du marché de luxe monégasque. Audit gratuit pour entreprises premium. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Monaco | IndHack`,
        description: `Dominez les résultats Google à Monaco. Référencement local premium, audit SEO et stratégie digitale haut de gamme.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoMonacoPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
