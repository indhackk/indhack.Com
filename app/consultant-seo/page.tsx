import { Metadata } from "next";
import ConsultantSEOClient from "./ConsultantSEOClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultante SEO : audit et stratégie Google | IndHack",
    description: "Indiana Aflalo accompagne les PME et sites de services en SEO : audit technique, contenu, maillage, autorité et visibilité durable sur Google.",
    keywords: [
        "consultante SEO",
        "consultant SEO",
        "audit SEO",
        "stratégie SEO",
        "référencement naturel",
        "maillage interne",
        "Search Console",
        "consultant référencement"
    ],
    alternates: {
        canonical: "https://indhack.com/consultant-seo"
    },
    openGraph: {
        title: "Consultante SEO : audit et stratégie Google | IndHack",
        description: "Une approche SEO technique et éditoriale pour transformer votre visibilité Google en demandes qualifiées.",
        url: "https://indhack.com/consultant-seo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultante%20SEO&subtitle=Audit%2C%20strat%C3%A9gie%20et%20visibilit%C3%A9%20Google%20durable",
            width: 1200,
            height: 630,
            alt: "Consultante SEO — IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultante SEO : audit et stratégie Google | IndHack",
        description: "Audit technique, contenu, maillage et suivi Search Console pour transformer la visibilité Google en demandes qualifiées.",
        images: ["https://indhack.com/api/og?title=Consultante%20SEO&subtitle=Audit%2C%20strat%C3%A9gie%20et%20visibilit%C3%A9%20Google%20durable"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantSEOPage() {
    return (
        <>
            <ServiceSchema
                name="Consultante SEO"
                description="Audit technique, stratégie de contenu, maillage interne, autorité et suivi Search Console pour les PME et sites de services."
                url="https://indhack.com/consultant-seo"
                serviceType="Consultant SEO"
            />
            <Breadcrumb items={getServiceBreadcrumb("Consultante SEO", "/consultant-seo")} />
            <ConsultantSEOClient />
        </>
    );
}
