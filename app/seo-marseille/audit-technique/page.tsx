import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-marseille")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Marseille 13 - INDHACK - Consultante SEO",
    description: "Référencement naturel Marseille. Mon audit technique révèle ce qui bloque votre visibilité sur Google. Diagnostic gratuit.",
    openGraph: {
        title: "Audit Technique SEO Marseille 13 - INDHACK - Consultante SEO",
        description: "Expert SEO Marseille. Analyse technique complète pour booster votre référencement.",
        url: "https://indhack.com/seo-marseille/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-marseille/audit-technique"
    }
};

export default function AuditTechniqueMarseilePage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
