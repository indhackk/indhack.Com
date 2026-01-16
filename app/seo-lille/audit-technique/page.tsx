import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-lille")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Lille 59 | INDHACK, Consultante SEO",
    description: "Spécialiste SEO Lille. Audit technique complet de votre site : indexation, vitesse, maillage interne. Freelance indépendante.",
    openGraph: {
        title: "Audit Technique SEO Lille 59 | INDHACK, Consultante SEO",
        description: "Consultante référencement Lille. Diagnostic technique pour débloquer votre SEO.",
        url: "https://indhack.com/seo-lille/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-lille/audit-technique"
    }
};

export default function AuditTechniqueLillePage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
