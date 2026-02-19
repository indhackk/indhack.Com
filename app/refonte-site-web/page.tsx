import { Metadata } from "next";
import RefonteSiteClient from "./RefonteSiteClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Refonte de Site Web | Migration SEO Sécurisée – IndHack",
    description: "Refonte de site sans perte de trafic. Migration SEO sécurisée, redirection 301 et optimisation technique.",
    alternates: {
        canonical: "https://indhack.com/refonte-site-web"
    },
    openGraph: {
        title: "Refonte de Site Web SEO",
        description: "Changez de design sans perdre vos positions Google. Migration technique experte et sécurisée.",
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
