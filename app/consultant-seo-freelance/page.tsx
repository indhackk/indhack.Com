import { Metadata } from "next";
import ConsultantSEOFreelanceClient from "./ConsultantSEOFreelanceClient";

export const metadata: Metadata = {
    title: "Consultant SEO Freelance | IndHack, Consultante SEO",
    description: "Consultante SEO freelance disponible pour vos projets. Expertise technique, flexibilité totale, tarifs compétitifs. Audit gratuit et accompagnement sur-mesure.",
    keywords: ["consultant SEO freelance", "SEO freelance", "référenceur freelance", "expert SEO indépendant", "consultant référencement freelance"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-freelance"
    },
    openGraph: {
        title: "Consultant SEO Freelance | Indiana Aflalo",
        description: "Consultante SEO freelance : expertise, flexibilité et résultats. Audit gratuit.",
        url: "https://indhack.com/consultant-seo-freelance",
        type: "website",
        locale: "fr_FR",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ConsultantSEOFreelancePage() {
    return <ConsultantSEOFreelanceClient />;
}
