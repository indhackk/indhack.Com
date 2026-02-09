import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-paris")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Paris 75 | INDHACK, Consultante SEO",
    description: "Expert SEO Paris. Audit technique avancé pour sites ambitieux : crawl Screaming Frog, Core Web Vitals, indexation. Consultante freelance.",
    openGraph: {
        title: "Audit Technique SEO Paris 75 | INDHACK, Consultante SEO",
        description: "Consultante SEO Paris. Diagnostic technique haut de gamme pour votre référencement.",
        url: "https://indhack.com/consultant-seo-paris/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-paris/audit-technique"
    }
};

export default function AuditTechniqueParisPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
