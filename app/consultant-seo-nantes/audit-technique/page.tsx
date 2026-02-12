import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-nantes")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-nantes")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Nantes 44 | INDHACK, Consultante SEO",
    description: "Audit SEO Nantes. Analyse technique approfondie par une consultante freelance : crawl, indexation, Core Web Vitals. Diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Nantes 44 | INDHACK, Consultante SEO",
        description: "Expert référencement Nantes. Audit technique pour optimiser votre visibilité.",
        url: "https://indhack.com/consultant-seo-nantes/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-nantes/audit-technique"
    }
};

export default function AuditTechniqueNantesPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
