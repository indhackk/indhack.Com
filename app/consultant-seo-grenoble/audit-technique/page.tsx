import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-grenoble")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-grenoble")!;

export const metadata: Metadata = {
    title: "Audit de Site Grenoble | Audit SEO Technique 38 - INDHACK",
    description: "Audit de site à Grenoble : analyse technique complète pour sites tech et e-commerce. Indexation, vitesse, architecture. Consultante SEO freelance Isère.",
    openGraph: {
        title: "Audit Technique SEO Grenoble 38 | IndHack, Consultante SEO",
        description: "Consultante SEO Grenoble. Analyse technique pointue de votre site.",
        url: "https://indhack.com/consultant-seo-grenoble/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-grenoble/audit-technique"
    }
};

export default function AuditTechniqueGrenoblePage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
