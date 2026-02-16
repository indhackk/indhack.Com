import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-lille")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-lille")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Lille 59",
    description: "Spécialiste SEO Lille. Audit technique complet de votre site : indexation, vitesse, maillage interne. Freelance indépendante.",
    openGraph: {
        title: "Audit Technique SEO Lille 59",
        description: "Consultante référencement Lille. Diagnostic technique pour débloquer votre SEO.",
        url: "https://indhack.com/consultant-seo-lille/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-lille/audit-technique"
    }
};

export default function AuditTechniqueLillePage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
