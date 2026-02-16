import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-cannes")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-cannes")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Cannes 06 | IndHack, Consultante SEO",
    description: "Consultante SEO freelance à Cannes. Mon audit technique identifie les blocages qui freinent votre visibilité Google. Diagnostic gratuit sans engagement.",
    openGraph: {
        title: "Audit Technique SEO Cannes 06 | IndHack, Consultante SEO",
        description: "Expert SEO à Cannes. Audit technique complet pour débloquer votre référencement naturel.",
        url: "https://indhack.com/consultant-seo-cannes/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-cannes/audit-technique"
    }
};

export default function AuditTechniqueCannesPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
