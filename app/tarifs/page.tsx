import { Metadata } from "next";
import TarifsClient from "./TarifsClient";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Tarifs Consultant SEO | Audit, Accompagnement, Création Site – INDHACK",
    description: "Tarifs transparents : Audit SEO dès 490€, Accompagnement mensuel dès 890€/mois, Création de site dès 2490€. Devis gratuit personnalisé. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/tarifs"
    },
    openGraph: {
        title: "Tarifs Consultant SEO Freelance | INDHACK",
        description: "Tarifs clairs et transparents. Audit SEO, accompagnement mensuel et création de site web optimisé.",
        url: "https://indhack.com/tarifs",
    }
};

export default function TarifsPage() {
    return (
        <>
            <ServiceSchema
                name="Tarifs SEO"
                description="Tarifs transparents pour les services de référencement naturel, audit SEO et création de site web."
                url="https://indhack.com/tarifs"
                serviceType="Services SEO"
            />
            <Breadcrumb items={[{ label: "Tarifs", href: "/tarifs" }]} />
            <TarifsClient />
        </>
    );
}
