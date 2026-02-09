import { Metadata } from "next";
import AuditSeoClient from "./AuditSeoClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Audit SEO Complet | Diagnostic & Plan d'Action – INDHACK",
    description: "Identifiez les freins SEO de votre site en 48h. Rapport détaillé + roadmap priorisée par ROI. +150 points analysés. Audit gratuit disponible. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/audit-seo"
    },
    openGraph: {
        title: "Audit SEO Complet | INDHACK",
        description: "Diagnostic technique et sémantique de votre site. Identifiez vos freins SEO et obtenez un plan d'action priorisé.",
        url: "https://indhack.com/audit-seo",
    }
};

export default function AuditSeoPage() {
    return (
        <>
            <ServiceSchema
                name="Audit SEO Complet"
                description="Identifiez les freins SEO de votre site en 48h. Rapport détaillé + roadmap priorisée par ROI. +150 points analysés."
                url="https://indhack.com/audit-seo"
                serviceType="Audit SEO"
            />
            <Breadcrumb items={getServiceBreadcrumb("Audit SEO Complet", "/audit-seo")} />
            <AuditSeoClient />
        </>
    );
}
