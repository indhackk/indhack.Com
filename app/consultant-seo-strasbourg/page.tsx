import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-strasbourg")!;

export const metadata: Metadata = {
    title: "Consultant SEO Strasbourg | expert référencement Alsace",
    description: "Consultant SEO à Strasbourg : référencement local, audit technique et stratégie SEO pour PME du Bas-Rhin et d'Alsace. Premier audit gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises strasbourgeoises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoStrasbourgPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
