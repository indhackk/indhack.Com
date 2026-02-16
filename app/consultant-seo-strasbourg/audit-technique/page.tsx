import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-strasbourg")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-strasbourg")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Strasbourg 67",
    description: "Référencement naturel Strasbourg. Audit technique SEO rigoureux : Screaming Frog, Search Console, Core Web Vitals. Consultante indépendante.",
    openGraph: {
        title: "Audit Technique SEO Strasbourg 67",
        description: "Spécialiste SEO Strasbourg. Diagnostic technique pour votre référencement.",
        url: "https://indhack.com/consultant-seo-strasbourg/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-strasbourg/audit-technique"
    }
};

export default function AuditTechniqueStrasbourgPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
