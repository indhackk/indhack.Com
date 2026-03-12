import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-nice")!;

export const metadata: Metadata = {
    title: "Consultante SEO Nice (06) — experte référencement local",
    description: "Consultante SEO freelance à Nice. Référencement local, audit technique et stratégie sur-mesure pour PME et entrepreneurs des Alpes-Maritimes.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultante SEO Nice | IndHack`,
        description: `Dominez les résultats Google à Nice. Référencement local, audit SEO et stratégie digitale sur-mesure pour entreprises des Alpes-Maritimes.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoNicePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
