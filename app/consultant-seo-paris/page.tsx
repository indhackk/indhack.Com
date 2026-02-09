import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-paris")!;

export const metadata: Metadata = {
    title: `Consultant SEO Paris | INDHACK, Consultante SEO`,
    description: `Consultante SEO freelance à ${cityData.name}. Stratégies de référencement sur-mesure pour dominer Google dans la capitale. Audit gratuit, accompagnement personnalisé. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO ${cityData.name} | Indiana Aflalo - IndHack`,
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
