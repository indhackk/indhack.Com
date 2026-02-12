import { Metadata } from "next";
import { Breadcrumb, getCityServiceBreadcrumb } from "@/components/Breadcrumb";
import { CityServiceTemplate } from "@/components/templates/CityServiceTemplate";
import { getCityBySlug, getServiceContent } from "@/lib/cities-data";

// Get city and service data
const cityData = getCityBySlug("consultant-seo-nice")!;
const serviceData = getServiceContent("audit-technique", "consultant-seo-nice")!;

export const metadata: Metadata = {
    title: "Audit Technique SEO Nice 06 | INDHACK, Consultante SEO",
    description: "Consultante SEO freelance à Nice. Mon audit technique révèle ce qui bloque votre visibilité Google : indexation, vitesse, maillage interne. Diagnostic gratuit.",
    keywords: [
        "audit technique SEO Nice",
        "consultante SEO Nice",
        "audit SEO Nice 06",
        "freelance SEO Nice",
        "Core Web Vitals",
        "indexation Google",
        "maillage interne"
    ],
    openGraph: {
        title: "Audit Technique SEO Nice 06 | INDHACK, Consultante SEO",
        description: "Consultante SEO freelance à Nice. Mon audit technique identifie les blocages qui freinent votre visibilité sur Google.",
        url: "https://indhack.com/consultant-seo-nice/audit-technique",
        type: "website",
        locale: "fr_FR",
        siteName: "INDHACK",
        images: [
            {
                url: "https://indhack.com/images/og-audit-technique.png",
                width: 1200,
                height: 630,
                alt: "Audit Technique SEO - INDHACK Consultante SEO"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Audit Technique SEO Nice 06 - INDHACK",
        description: "Consultante SEO freelance. Audit technique pour débloquer votre visibilité Google."
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-nice/audit-technique"
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function AuditTechniqueNicePage() {
    return (
        <>
            <Breadcrumb items={getCityServiceBreadcrumb(cityData.name, cityData.slug, serviceData.title, "audit-technique")} />
            <CityServiceTemplate cityData={cityData} serviceData={serviceData} />
        </>
    );
}
