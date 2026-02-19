import { Metadata } from "next";
import CreationSiteClient from "./CreationSiteClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Création de Site Web Optimisé SEO | Sites Performants – IndHack",
    description: "Sites WordPress et Next.js ultra-rapides, conçus pour la conversion et le référencement. Design sur-mesure. Devis gratuit.",
    alternates: {
        canonical: "https://indhack.com/creation-site-web"
    },
    openGraph: {
        title: "Création de Site Web SEO",
        description: "Lancez un site performant qui attire des clients. Design premium, vitesse optimisée et architecture SEO-ready.",
        url: "https://indhack.com/creation-site-web",
    }
};

export default function CreationSiteWebPage() {
    return (
        <>
            <ServiceSchema
                name="Création de Site Web"
                description="Sites WordPress et Next.js ultra-rapides, conçus pour la conversion et le référencement. Design sur-mesure, sécurité maximale."
                url="https://indhack.com/creation-site-web"
                serviceType="Création de Site Web"
            />
            <Breadcrumb items={getServiceBreadcrumb("Création de Site Web", "/creation-site-web")} />
            <CreationSiteClient />
        </>
    );
}
