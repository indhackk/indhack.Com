import { Metadata } from "next";
import ConsultantSeoFreelanceClient from "./ConsultantSeoFreelanceClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultant SEO freelance : comment choisir le bon en 2026",
    description: "Comment choisir un consultant SEO freelance ? Tarifs réels (250 à 1 000 €/jour), comparatif freelance vs agence, process de travail et critères de sélection.",
    keywords: ["consultant seo freelance", "freelance seo", "expert seo freelance", "consultant seo indépendant", "consultant seo freelance tarif", "freelance seo prix", "agence seo ou freelance", "TJM consultant seo"],
    other: {
        "article:modified_time": "2026-04-13",
    },
    alternates: {
        canonical: "https://indhack.com/consultant-seo-freelance"
    },
    openGraph: {
        title: "Consultant SEO freelance : comment choisir le bon en 2026",
        description: "Tarifs réels, comparatif freelance vs agence, process de travail et critères de sélection. Le guide complet.",
        url: "https://indhack.com/consultant-seo-freelance",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultant%20SEO%20Freelance&subtitle=Comment%20choisir%20le%20bon%20expert%20en%202026",
            width: 1200,
            height: 630,
            alt: "Consultant SEO freelance : guide pour bien choisir en 2026"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant SEO freelance : comment choisir le bon en 2026",
        description: "Tarifs, comparatif freelance vs agence, et critères de sélection.",
        images: ["https://indhack.com/api/og?title=Consultant%20SEO%20Freelance&subtitle=Tarifs%2C%20comparatif%20et%20crit%C3%A8res"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantSeoFreelancePage() {
    return (
        <>
            <ServiceSchema
                name="Consultant SEO Freelance"
                description="Guide complet pour choisir un consultant SEO freelance : tarifs, comparatif freelance vs agence, processus de travail et critères de sélection."
                url="https://indhack.com/consultant-seo-freelance"
                serviceType="SEO Consulting"
            />
            <Breadcrumb items={getServiceBreadcrumb("Consultant SEO freelance", "/consultant-seo-freelance")} />
            <ConsultantSeoFreelanceClient />
        </>
    );
}
