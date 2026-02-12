import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-boulogne-billancourt")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-boulogne-billancourt")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Boulogne-Billancourt 92 | INDHACK, Consultante SEO",
    description: "Audit SEO Boulogne-Billancourt. Analyse technique approfondie pour entreprises corporate. Consultante freelance, diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Boulogne-Billancourt 92 | INDHACK, Consultante SEO",
        description: "Consultante référencement Boulogne. Audit technique pour votre visibilité Google.",
        url: "https://indhack.com/consultant-seo-boulogne-billancourt/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-boulogne-billancourt/audit-technique"
    }
};

export default function AuditTechniqueBoulogneBillancourtPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
