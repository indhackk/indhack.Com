import { Metadata } from "next";
import AuditIAClient from "./AuditIAClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Audit IA gratuit : identifiez vos tâches automatisables – IndHack",
    description: "Audit IA gratuit pour PME. Cartographie de vos processus, identification des tâches automatisables, estimation du ROI. Rapport livré sous 48h.",
    keywords: ["audit IA", "audit intelligence artificielle", "audit automatisation", "audit processus IA", "audit IA gratuit", "audit IA entreprise", "diagnostic IA PME"],
    alternates: {
        canonical: "https://indhack.com/audit-ia"
    },
    openGraph: {
        title: "Audit IA gratuit : identifiez vos tâches automatisables",
        description: "Cartographie de vos processus + estimation du ROI de l'automatisation IA. Rapport détaillé livré sous 48h.",
        url: "https://indhack.com/audit-ia",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Audit%20IA%20Gratuit&subtitle=Identifiez%20vos%20t%C3%A2ches%20automatisables",
            width: 1200,
            height: 630,
            alt: "Audit IA Gratuit - Identifiez vos tâches automatisables - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Audit IA gratuit : identifiez vos tâches automatisables",
        description: "Cartographie de vos processus + estimation du ROI. Rapport livré sous 48h.",
        images: ["https://indhack.com/api/og?title=Audit%20IA%20Gratuit&subtitle=Diagnostic%20automatisation%20IA"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AuditIAPage() {
    return (
        <>
            <ServiceSchema
                name="Audit IA - Diagnostic d'automatisation"
                description="Audit gratuit de vos processus métiers pour identifier les tâches automatisables par l'intelligence artificielle. Cartographie complète, estimation du ROI et roadmap priorisée livrés sous 48h."
                url="https://indhack.com/audit-ia"
                serviceType="Audit IA"
            />
            <Breadcrumb items={getServiceBreadcrumb("Audit IA", "/audit-ia")} />
            <AuditIAClient />
        </>
    );
}
