import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-sophia-antipolis")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Sophia Antipolis 06 - INDHACK - Consultante SEO",
    description: "Freelance SEO tech à Sophia Antipolis. Audit technique pointu pour startups et entreprises tech. Crawl, indexation, Core Web Vitals.",
    openGraph: {
        title: "Audit Technique SEO Sophia Antipolis 06 - INDHACK - Consultante SEO",
        description: "Consultante SEO technopole. Audit technique spécialisé pour le secteur tech.",
        url: "https://indhack.com/seo-sophia-antipolis/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-sophia-antipolis/audit-technique"
    }
};

export default function AuditTechniqueSophiaAntipolisPage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
