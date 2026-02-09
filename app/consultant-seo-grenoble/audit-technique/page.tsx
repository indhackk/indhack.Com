import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, CITY_SERVICES } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-grenoble")!;
const serviceData = CITY_SERVICES["audit-technique"];

export const metadata: Metadata = {
    title: "Audit Technique SEO Grenoble 38 | INDHACK, Consultante SEO",
    description: "Expert SEO Grenoble. Audit technique chirurgical pour sites tech et e-commerce. Indexation, vitesse, architecture. Freelance indépendante.",
    openGraph: {
        title: "Audit Technique SEO Grenoble 38 | INDHACK, Consultante SEO",
        description: "Consultante SEO Grenoble. Analyse technique pointue de votre site.",
        url: "https://indhack.com/consultant-seo-grenoble/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK"
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
