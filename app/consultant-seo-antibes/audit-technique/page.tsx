import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-antibes")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Antibes 06 | INDHACK, Consultante SEO",
    description: "Spécialiste SEO à Antibes. J'audite la technique de votre site pour révéler les freins à votre référencement. Premier diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Antibes 06 | INDHACK, Consultante SEO",
        description: "Freelance SEO à Antibes. Audit technique approfondi de votre site web.",
        url: "https://indhack.com/consultant-seo-antibes/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-antibes/audit-technique"
    }
};

export default function AuditTechniqueAntibesPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
