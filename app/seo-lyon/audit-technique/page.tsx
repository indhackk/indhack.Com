import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-lyon")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Lyon 69 | INDHACK, Consultante SEO",
    description: "Référencement naturel Lyon. Mon audit technique SEO révèle les freins à votre visibilité Google. Consultante indépendante, diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Lyon 69 | INDHACK, Consultante SEO",
        description: "Freelance SEO Lyon. Audit technique complet pour optimiser votre référencement.",
        url: "https://indhack.com/seo-lyon/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-lyon/audit-technique"
    }
};

export default function AuditTechniqueLyonPage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
