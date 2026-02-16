import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-bordeaux")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-bordeaux")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Bordeaux 33",
    description: "Consultante SEO Bordeaux. Audit technique approfondi pour identifier les blocages de votre référencement naturel. Diagnostic gratuit.",
    openGraph: {
        title: "Audit Technique SEO Bordeaux 33",
        description: "Expert SEO Bordeaux. Analyse technique complète de votre site web.",
        url: "https://indhack.com/consultant-seo-bordeaux/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-bordeaux/audit-technique"
    }
};

export default function AuditTechniqueBordeauxPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
