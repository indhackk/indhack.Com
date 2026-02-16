import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-montpellier")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-montpellier")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Montpellier 34",
    description: "Freelance SEO Montpellier. Mon audit technique analyse votre site en profondeur : vitesse, indexation, maillage. Diagnostic offert.",
    openGraph: {
        title: "Audit Technique SEO Montpellier 34",
        description: "Spécialiste référencement Montpellier. Audit technique pour booster votre SEO.",
        url: "https://indhack.com/consultant-seo-montpellier/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-montpellier/audit-technique"
    }
};

export default function AuditTechniqueMontpellierPage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
