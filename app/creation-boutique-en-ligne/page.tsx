import { Metadata } from "next";
import CreationBoutiqueClient from "./CreationBoutiqueClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Création Boutique en Ligne | E-commerce SEO Optimisé – IndHack",
    description: "Création de boutique en ligne optimisée SEO. WooCommerce, Shopify, PrestaShop. Sites e-commerce performants et visibles sur Google.",
    alternates: {
        canonical: "https://indhack.com/creation-boutique-en-ligne"
    },
    openGraph: {
        title: "Création Boutique E-commerce",
        description: "Boutique en ligne optimisée SEO dès la conception. Performance, conversion et visibilité Google.",
        url: "https://indhack.com/creation-boutique-en-ligne",
    }
};

export default function CreationBoutiquePage() {
    return (
        <>
            <ServiceSchema
                name="Création de Boutique en Ligne"
                description="Création de boutiques e-commerce optimisées SEO. WooCommerce, Shopify, PrestaShop."
                url="https://indhack.com/creation-boutique-en-ligne"
                serviceType="Création E-commerce"
            />
            <Breadcrumb items={getServiceBreadcrumb("Création Boutique en Ligne", "/creation-boutique-en-ligne")} />
            <CreationBoutiqueClient />
        </>
    );
}
