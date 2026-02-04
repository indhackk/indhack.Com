import { Metadata } from "next";
import CreationSiteClient from "./CreationSiteClient";

export const metadata: Metadata = {
    title: "Création Site Web | INDHACK, Consultante SEO",
    description: "Sites WordPress et Next.js ultra-rapides, conçus pour la conversion et le référencement. Design sur-mesure, sécurité maximale. Devis gratuit. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/creation-site-web"
    },
    openGraph: {
        title: "Création de Site Web SEO | INDHACK",
        description: "Lancez un site performant qui attire des clients. Design premium, vitesse optimisée et architecture SEO-ready.",
        url: "https://indhack.com/creation-site-web",
    }
};

export default function CreationSiteWebPage() {
    return <CreationSiteClient />;
}
