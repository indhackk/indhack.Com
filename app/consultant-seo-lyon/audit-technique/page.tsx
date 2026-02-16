import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-lyon")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-lyon")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Lyon 69 | IndHack, Consultante SEO",
    description: "Référencement naturel Lyon. Mon audit technique SEO révèle les freins à votre visibilité Google. Consultante indépendante, diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Lyon 69 | IndHack, Consultante SEO",
        description: "Freelance SEO Lyon. Audit technique complet pour optimiser votre référencement.",
        url: "https://indhack.com/consultant-seo-lyon/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-lyon/audit-technique"
    }
};

export default function AuditTechniqueLyonPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
