import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-rennes")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-rennes")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Rennes 35 | INDHACK, Consultante SEO",
    description: "Consultante SEO Rennes. Mon audit technique identifie les freins à votre référencement : indexation, vitesse, maillage. Diagnostic gratuit.",
    openGraph: {
        title: "Audit Technique SEO Rennes 35 | INDHACK, Consultante SEO",
        description: "Freelance SEO Rennes. Analyse technique complète de votre site.",
        url: "https://indhack.com/consultant-seo-rennes/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-rennes/audit-technique"
    }
};

export default function AuditTechniqueRennesPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
