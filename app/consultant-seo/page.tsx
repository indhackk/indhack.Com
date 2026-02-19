import { Metadata } from "next";
import ConsultantSEOClient from "./ConsultantSEOClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultante SEO Freelance | Experte Référencement Naturel – IndHack",
    description: "Consultante SEO freelance expérimentée. Audit technique, stratégie de contenu, netlinking. Résultats mesurables. Devis gratuit.",
    keywords: ["consultant SEO", "consultant SEO freelance", "consultante SEO", "expert référencement naturel", "consultant référencement", "SEO freelance"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo"
    },
    openGraph: {
        title: "Consultant SEO Freelance | IndHack",
        description: "Consultante SEO freelance expérimentée. Audit, stratégie et optimisation pour booster votre visibilité Google.",
        url: "https://indhack.com/consultant-seo",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultante%20SEO%20Freelance&subtitle=Audit%2C%20strat%C3%A9gie%20et%20optimisation%20pour%20booster%20votre%20visibilit%C3%A9%20Google",
            width: 1200,
            height: 630,
            alt: "Consultante SEO Freelance - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant SEO Freelance | IndHack",
        description: "Consultante SEO freelance expérimentée. Résultats mesurables et ROI garanti.",
        images: ["https://indhack.com/api/og?title=Consultante%20SEO%20Freelance&subtitle=R%C3%A9sultats%20mesurables%20et%20ROI%20garanti"],
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
                name="Consultante SEO Freelance"
                description="Consultante SEO freelance expérimentée. Audit technique, stratégie de contenu, netlinking. Résultats mesurables et ROI garanti."
                url="https://indhack.com/consultant-seo"
                serviceType="Consultant SEO"
            />
            <Breadcrumb items={getServiceBreadcrumb("Consultante SEO Freelance", "/consultant-seo")} />
            <ConsultantSEOClient />
        </>
    );
}
