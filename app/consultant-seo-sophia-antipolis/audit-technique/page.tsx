import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-sophia-antipolis")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-sophia-antipolis")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Sophia Antipolis 06",
    description: "Freelance SEO tech à Sophia Antipolis. Audit technique pointu pour startups et entreprises tech. Crawl, indexation, Core Web Vitals.",
    openGraph: {
        title: "Audit Technique SEO Sophia Antipolis 06",
        description: "Consultante SEO technopole. Audit technique spécialisé pour le secteur tech.",
        url: "https://indhack.com/consultant-seo-sophia-antipolis/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-sophia-antipolis/audit-technique"
    }
};

export default function AuditTechniqueSophiaAntipolisPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
