import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-paris")!;

export const metadata: Metadata = {
    title: "Consultante SEO Paris — Experte Référencement Naturel",
    description: "Consultante SEO freelance à Paris. Stratégies de référencement sur-mesure pour dominer Google dans la capitale. Audit gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises parisiennes.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoParisPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
