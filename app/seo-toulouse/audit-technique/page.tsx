import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-toulouse")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Toulouse 31 | INDHACK, Consultante SEO",
    description: "Expert référencement Toulouse. Audit technique SEO complet : crawl, indexation, Core Web Vitals. Consultante freelance indépendante.",
    openGraph: {
        title: "Audit Technique SEO Toulouse 31 | INDHACK, Consultante SEO",
        description: "Consultante SEO Toulouse. Diagnostic technique pour optimiser votre visibilité Google.",
        url: "https://indhack.com/seo-toulouse/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-toulouse/audit-technique"
    }
};

export default function AuditTechniqueToulousePage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
