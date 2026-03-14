import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-boulogne-billancourt")!;

export const metadata: Metadata = {
    title: "Consultante SEO Boulogne-Billancourt (92)",
    description: "Consultante SEO freelance à Boulogne-Billancourt. Référencement pour entreprises médias, agences et sièges sociaux du 92.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: `Consultant SEO Boulogne-Billancourt | IndHack`,
        description: `Dominez Google à Boulogne-Billancourt. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises des Hauts-de-Seine.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoBoulogneBillancourtPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
