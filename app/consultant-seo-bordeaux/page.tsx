import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-bordeaux")!;

export const metadata: Metadata = {
    title: "Consultante SEO Bordeaux — experte référencement",
    description: "Consultante SEO freelance à Bordeaux. Référencement local pour PME et entrepreneurs de Gironde. Audit technique gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale pour entreprises bordelaises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoBordeauxPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
