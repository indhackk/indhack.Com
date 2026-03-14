import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-toulouse")!;

export const metadata: Metadata = {
    title: "Consultante SEO Toulouse — référencement & croissance",
    description: "Consultante SEO freelance à Toulouse. Référencement local pour PME et startups de Haute-Garonne. Audit technique gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises toulousaines.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoToulousePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
