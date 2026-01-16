import { Metadata } from "next";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("seo-montpellier")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Montpellier 34 | INDHACK, Consultante SEO",
    description: "Freelance SEO Montpellier. Mon audit technique analyse votre site en profondeur : vitesse, indexation, maillage. Diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Montpellier 34 | INDHACK, Consultante SEO",
        description: "Spécialiste référencement Montpellier. Audit technique pour booster votre SEO.",
        url: "https://indhack.com/seo-montpellier/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/seo-montpellier/audit-technique"
    }
};

export default function AuditTechniqueMontpellierPage() {
    return <CityServiceTemplate cityData={cityData} serviceData={serviceData} />;
}
