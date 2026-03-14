import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-rennes")!;

export const metadata: Metadata = {
    title: "Consultante SEO Rennes — référencement & visibilité",
    description: "Consultante SEO freelance à Rennes. Référencement local pour PME et startups tech d'Ille-et-Vilaine. Audit gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
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
