import { Metadata } from "next";
import RefonteSiteClient from "./RefonteSiteClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Refonte site web sans perdre son SEO : méthode complète 2026",
    description: "Refonte de site sans perte de trafic : audit pré-migration, plan de redirection 301, surveillance post-launch. +45 points de contrôle, 0 perte de positions.",
    keywords: ["refonte site web", "refonte SEO", "migration site web", "redirection 301", "refonte sans perdre SEO", "migration SEO sécurisée", "audit pré-migration"],
    alternates: {
        canonical: "https://indhack.com/refonte-site-web"
    },
    openGraph: {
        title: "Refonte site web sans perdre son SEO : méthode complète 2026",
        description: "Changez de design sans perdre vos positions Google. Migration SEO experte en 45 points de contrôle. Audit pré-migration + plan 301 + surveillance 90j.",
        url: "https://indhack.com/refonte-site-web",
    }
};

export default function RefonteSiteWebPage() {
    return (
        <>
            <ServiceSchema
                name="Refonte de Site Web"
                description="Refonte de site sans perte de trafic. Migration SEO sécurisée, redirection 301 et optimisation technique."
                url="https://indhack.com/refonte-site-web"
                serviceType="Refonte de Site Web"
            />
            <Breadcrumb items={getServiceBreadcrumb("Refonte de Site Web", "/refonte-site-web")} />
            <RefonteSiteClient />
        </>
    );
}
