import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-aix-en-provence")!;

export const metadata: Metadata = {
    title: "Consultante SEO Aix-en-Provence — référencement",
    description: "Consultante SEO freelance à Aix-en-Provence. Référencement local pour PME et entrepreneurs des Bouches-du-Rhône. Audit gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Aix-en-Provence | IndHack`,
        description: `Dominez les résultats Google à Aix-en-Provence. Référencement local, audit SEO et stratégie digitale pour entreprises aixoises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoAixPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
