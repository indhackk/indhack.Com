import { Metadata } from "next";
import ConsultantIAClient from "./ConsultantIAClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultant IA & Automatisation | IndHack",
    description: "Experts en intégration d'Intelligence Artificielle pour les PME. Automatisation, déploiement d'agents LLM, optimisation des process. Devis gratuit.",
    keywords: ["consultant IA", "intégration IA", "automatisation entreprise", "intelligence artificielle PME", "agent IA sur mesure", "chatGPT entreprise"],
    alternates: {
        canonical: "https://indhack.com/consultant-ia"
    },
    openGraph: {
        title: "Consultant IA & Automatisation | IndHack",
        description: "Intégrez l'IA dans votre entreprise. Gain de temps, automatisation de vos processus et création d'agents sur mesure (ChatGPT, Claude).",
        url: "https://indhack.com/consultant-ia",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultant%20IA%20%26%20Automatisation&subtitle=Int%C3%A9gration%20IA%20pour%20entreprises",
            width: 1200,
            height: 630,
            alt: "Consultant IA & Automatisation"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant IA & Automatisation",
        description: "Intégrez l'IA dans votre entreprise. Automatisation des processus et création d'agents sur mesure.",
        images: ["https://indhack.com/api/og?title=Consultant%20IA%20%26%20Automatisation"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantIAPage() {
    return (
        <>
            <ServiceSchema
                name="Consultant IA & Automatisation"
                description="Services de consulting IA : intégration de LLMs (Claude, ChatGPT), automatisation des processus métiers, et création d'agents conversationnels sur mesure."
                url="https://indhack.com/consultant-ia"
                serviceType="Consultant Intelligence Artificielle"
            />
            <Breadcrumb items={getServiceBreadcrumb("Consultant IA & Automatisation", "/consultant-ia")} />
            <ConsultantIAClient />
        </>
    );
}
