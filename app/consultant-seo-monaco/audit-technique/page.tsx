import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-monaco")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Monaco 98 | INDHACK, Consultante SEO",
    description: "Consultant SEO Monaco. Audit technique premium pour entreprises exigeantes. Analyse complète indexation, vitesse, Core Web Vitals.",
    openGraph: {
        title: "Audit Technique SEO Monaco 98 | INDHACK, Consultante SEO",
        description: "Expert référencement Monaco. Diagnostic technique haut de gamme pour votre site.",
        url: "https://indhack.com/consultant-seo-monaco/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-monaco/audit-technique"
    }
};

export default function AuditTechniqueMonacoPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
