import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-monaco")!;

export const metadata: Metadata = {
    title: "Consultante SEO Monaco — référencement premium",
    description: "Consultante SEO freelance experte du marché de luxe monégasque. Audit gratuit pour entreprises premium.",
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
