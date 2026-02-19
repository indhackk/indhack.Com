import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import { CannesContent } from "./CannesContent";

const cityData = getCityBySlug("consultant-seo-cannes")!;

export const metadata: Metadata = {
    title: "Consultante SEO Cannes (06) — Référencement Premium",
    description: "Consultante SEO spécialisée marché premium à Cannes. Immobilier prestige, yachting, événementiel. Référencement multilingue FR/EN.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Cannes | Expert Marché Luxe Côte d'Azur`,
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
