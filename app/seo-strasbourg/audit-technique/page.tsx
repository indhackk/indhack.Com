import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-strasbourg")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Strasbourg 67 - INDHACK - Consultante SEO",
    description: "Référencement naturel Strasbourg. Audit technique SEO rigoureux : Screaming Frog, Search Console, Core Web Vitals. Consultante indépendante.",
    openGraph: {
        title: "Audit Technique SEO Strasbourg 67 - INDHACK - Consultante SEO",
        description: "Spécialiste SEO Strasbourg. Diagnostic technique pour votre référencement.",
        url: "https://indhack.com/seo-strasbourg/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-strasbourg/audit-technique"
    }
};

export default function AuditTechniqueStrasbourgPage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
