import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import { SophiaAntipolisContent } from "./SophiaContent";

const cityData = getCityBySlug("consultant-seo-sophia-antipolis")!;

export const metadata: Metadata = {
    title: "Consultante SEO Sophia Antipolis — référencement B2B tech",
    description: "Consultante SEO à Sophia Antipolis, experte référencement startups et ESN de la technopole. Audit technique, SEO B2B, content marketing SaaS. Devis gratuit.",
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
