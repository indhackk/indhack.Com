import { Metadata } from "next";
import AuditSeoClient from "./AuditSeoClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Rapport Audit SEO Gratuit | Diagnostic Site Web Complet",
    description: "Rapport d'audit SEO complet en 48h : +150 points analysés, diagnostic technique et sémantique, plan d'action priorisé par ROI. Rapport PDF gratuit.",
    alternates: {
        canonical: "https://indhack.com/audit-seo"
    },
    openGraph: {
        title: "Audit SEO Complet",
        description: "Diagnostic technique et sémantique de votre site. Identifiez vos freins SEO et obtenez un plan d'action priorisé.",
        url: "https://indhack.com/audit-seo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Audit%20SEO%20Complet&subtitle=Diagnostic%20technique%20et%20s%C3%A9mantique%20de%20votre%20site",
            width: 1200,
            height: 630,
            alt: "Audit SEO Complet"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Audit SEO Complet",
        description: "Identifiez les freins SEO de votre site en 48h. +150 points analysés.",
        images: ["https://indhack.com/api/og?title=Audit%20SEO%20Complet&subtitle=%2B150%20points%20analys%C3%A9s"],
    },
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
