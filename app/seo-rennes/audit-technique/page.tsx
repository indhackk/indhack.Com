import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-rennes")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Rennes 35 | INDHACK, Consultante SEO",
    description: "Consultante SEO Rennes. Mon audit technique identifie les freins à votre référencement : indexation, vitesse, maillage. Diagnostic gratuit.",
    openGraph: {
        title: "Audit Technique SEO Rennes 35 | INDHACK, Consultante SEO",
        description: "Freelance SEO Rennes. Analyse technique complète de votre site.",
        url: "https://indhack.com/seo-rennes/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-rennes/audit-technique"
    }
};

export default function AuditTechniqueRennesPage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
