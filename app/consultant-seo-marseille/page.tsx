import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-marseille")!;

export const metadata: Metadata = {
    title: "Consultante SEO Marseille — Référencement & Visibilité",
    description: "Consultante SEO à Marseille. Experte référencement local pour PME et entrepreneurs des Bouches-du-Rhône. Audit gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | IndHack`,
        description: `Dominez les résultats Google à ${cityData.name}. Référencement local, audit SEO et stratégie digitale sur-mesure pour entreprises des ${cityData.department}.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoMarseillePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
