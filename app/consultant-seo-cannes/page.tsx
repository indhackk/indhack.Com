import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import { CannesContent } from "./CannesContent";

const cityData = getCityBySlug("consultant-seo-cannes")!;

export const metadata: Metadata = {
    title: `Consultant SEO Cannes | Expert Référencement Luxe & Prestige`,
    description: `Consultante SEO spécialisée marché premium à Cannes. Immobilier prestige, yachting, événementiel. Référencement multilingue FR/EN. Audit gratuit. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Cannes | Expert Marché Luxe Côte d'Azur - IndHack`,
        description: `Dominez Google sur le marché premium cannois. SEO immobilier prestige, yachting, événementiel. Stratégie multilingue pour clientèle internationale.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoCannesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<CannesContent />}
            />
        </>
    );
}
