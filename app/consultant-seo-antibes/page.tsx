import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import { AntibesContent } from "./AntibesContent";

const cityData = getCityBySlug("consultant-seo-antibes")!;

export const metadata: Metadata = {
    title: "Consultante SEO Antibes (06) — Référencement Local",
    description: "Consultante SEO spécialisée yachting Port Vauban et commerces Vieil Antibes. Référencement local, stratégie saisonnière.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Antibes | Expert Yachting & Commerce Local`,
        description: `Dominez Google à Antibes : SEO yachting Port Vauban, référencement restaurateurs et artisans Vieil Antibes. Stratégie adaptée à la saisonnalité.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoAntibesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<AntibesContent />}
            />
        </>
    );
}
