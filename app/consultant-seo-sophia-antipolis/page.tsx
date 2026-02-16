import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import { SophiaAntipolisContent } from "./SophiaContent";

const cityData = getCityBySlug("consultant-seo-sophia-antipolis")!;

export const metadata: Metadata = {
    title: `Consultant SEO Sophia Antipolis | Expert SEO Technopole B2B`,
    description: `Consultante SEO spécialisée startups et ESN à Sophia Antipolis. Référencement B2B tech, content marketing SaaS, génération de leads qualifiés. Audit gratuit. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Sophia Antipolis | Expert Technopole B2B`,
        description: `Dominez Google sur le marché tech de Sophia Antipolis. SEO B2B, content marketing SaaS, stratégie de visibilité pour startups, ESN et scale-ups de la technopole.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoSophiaPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<SophiaAntipolisContent />}
            />
        </>
    );
}
