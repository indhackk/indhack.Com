import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-aix-en-provence")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-aix-en-provence")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Aix-en-Provence 13",
    description: "Audit SEO Aix-en-Provence. Analyse technique approfondie par une consultante indépendante. Indexation, vitesse, maillage interne.",
    openGraph: {
        title: "Audit Technique SEO Aix-en-Provence 13",
        description: "Spécialiste SEO Aix. Diagnostic technique pour optimiser votre référencement naturel.",
        url: "https://indhack.com/consultant-seo-aix-en-provence/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-aix-en-provence/audit-technique"
    }
};

export default function AuditTechniqueAixEnProvencePage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
