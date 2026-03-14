import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-lille")!;

export const metadata: Metadata = {
    title: "Consultante SEO Lille — experte référencement Nord",
    description: "Consultante SEO freelance à Lille. Référencement local pour PME et entrepreneurs du Nord. Audit technique gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises lilloises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoLillePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
