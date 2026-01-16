import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-aix-en-provence")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Aix-en-Provence 13 - INDHACK - Consultante SEO",
    description: "Audit SEO Aix-en-Provence. Analyse technique approfondie par une consultante indépendante. Indexation, vitesse, maillage interne.",
    openGraph: {
        title: "Audit Technique SEO Aix-en-Provence 13 - INDHACK - Consultante SEO",
        description: "Spécialiste SEO Aix. Diagnostic technique pour optimiser votre référencement naturel.",
        url: "https://indhack.com/seo-aix-en-provence/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-aix-en-provence/audit-technique"
    }
};

export default function AuditTechniqueAixEnProvencePage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
