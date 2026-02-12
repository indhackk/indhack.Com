import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-toulouse")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-toulouse")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Toulouse 31 | INDHACK, Consultante SEO",
    description: "Expert référencement Toulouse. Audit technique SEO complet : crawl, indexation, Core Web Vitals. Consultante freelance indépendante.",
    openGraph: {
        title: "Audit Technique SEO Toulouse 31 | INDHACK, Consultante SEO",
        description: "Consultante SEO Toulouse. Diagnostic technique pour optimiser votre visibilité Google.",
        url: "https://indhack.com/consultant-seo-toulouse/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-toulouse/audit-technique"
    }
};

export default function AuditTechniqueToulousePage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
