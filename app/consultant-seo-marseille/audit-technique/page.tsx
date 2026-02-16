import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-marseille")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-marseille")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Marseille 13",
    description: "Référencement naturel Marseille. Mon audit technique révèle ce qui bloque votre visibilité sur Google. Diagnostic gratuit.",
    openGraph: {
        title: "Audit Technique SEO Marseille 13",
        description: "Expert SEO Marseille. Analyse technique complète pour booster votre référencement.",
        url: "https://indhack.com/consultant-seo-marseille/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-marseille/audit-technique"
    }
};

export default function AuditTechniqueMarseilePage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
