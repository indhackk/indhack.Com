import { Metadata } from "next";
import ConsultantIAClient from "./ConsultantIAClient";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultant IA : automatisez votre entreprise avec l'IA – IndHack",
    description: "Consultante IA à Nice. Audit des tâches répétitives, création d'agents LLM sur mesure (ChatGPT, Claude), automatisation n8n/Make. Audit gratuit + accompagnement.",
    keywords: ["consultant IA", "consultante IA", "intégration IA entreprise", "automatisation IA", "agent IA sur mesure", "ChatGPT entreprise", "IA PME", "consultant IA France", "consultant IA Nice"],
    alternates: {
        canonical: "https://indhack.com/consultant-ia"
    },
    openGraph: {
        title: "Consultant IA : automatisez votre entreprise avec l'IA",
        description: "Audit gratuit de vos tâches répétitives + création d'agents IA sur mesure. Gagnez 10h/semaine grâce à l'intelligence artificielle.",
        url: "https://indhack.com/consultant-ia",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultant%20IA&subtitle=Automatisez%20votre%20entreprise%20avec%20l%27IA",
            width: 1200,
            height: 630,
            alt: "Consultant IA - Automatisation et agents LLM - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant IA : automatisez votre entreprise avec l'IA",
        description: "Audit gratuit + agents IA sur mesure pour automatiser vos tâches répétitives et gagner en productivité.",
        images: ["https://indhack.com/api/og?title=Consultant%20IA&subtitle=Automatisation%20%26%20Agents%20LLM"],
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
                name="Consultant IA - Intégration et automatisation"
                description="Consultante IA spécialisée en intégration d'intelligence artificielle pour les PME. Audit des tâches répétitives, création d'agents LLM (ChatGPT, Claude), automatisation des processus métiers avec n8n/Make, formation des équipes."
                url="https://indhack.com/consultant-ia"
                serviceType="Consultant IA"
            />
            <Breadcrumb items={getServiceBreadcrumb("Consultant IA", "/consultant-ia")} />
            <ConsultantIAClient />
        </>
    );
}
