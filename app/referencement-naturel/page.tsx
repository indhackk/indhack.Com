import { Metadata } from "next";
import ReferencementClient from "./ReferencementClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Référencement Naturel | Stratégie SEO Sur-Mesure – INDHACK",
    description: "Stratégies SEO sur-mesure pour atteindre la 1ère page Google. Trafic qualifié, leads durables et ROI maximisé. Experte certifiée. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/referencement-naturel"
    },
    openGraph: {
        title: "Référencement Naturel (SEO) | IndHack",
        description: "Transformez votre site en machine à leads grâce au SEO. Stratégie technique, sémantique et netlinking.",
        url: "https://indhack.com/referencement-naturel",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=R%C3%A9f%C3%A9rencement%20Naturel%20SEO&subtitle=Strat%C3%A9gie%20technique%2C%20s%C3%A9mantique%20et%20netlinking",
            width: 1200,
            height: 630,
            alt: "Référencement Naturel SEO - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Référencement Naturel (SEO) | IndHack",
        description: "Transformez votre site en machine à leads grâce au SEO.",
        images: ["https://indhack.com/api/og?title=R%C3%A9f%C3%A9rencement%20Naturel%20SEO&subtitle=Machine%20%C3%A0%20leads%20gr%C3%A2ce%20au%20SEO"],
    },
};

export default function ReferencementNaturelPage() {
    return (
        <>
            <ServiceSchema
                name="Référencement Naturel"
                description="Stratégies SEO sur-mesure pour atteindre la 1ère page Google. Trafic qualifié, leads durables et ROI maximisé."
                url="https://indhack.com/referencement-naturel"
                serviceType="Référencement Naturel SEO"
            />
            <Breadcrumb items={getServiceBreadcrumb("Référencement Naturel", "/referencement-naturel")} />
            <ReferencementClient />
        </>
    );
}
