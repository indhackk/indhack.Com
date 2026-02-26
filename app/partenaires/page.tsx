import { Metadata } from "next";
import { PartenairesClient } from "./PartenairesClient";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "Testeur Visibilité IA en Marque Blanche — Gratuit pour Agences",
    description: "Intégrez notre Testeur de Visibilité IA sur votre site d'agence. Vos visiteurs testent leur SEO, vous recevez leurs coordonnées. Gratuit, prêt en 2 minutes.",
    alternates: {
        canonical: "https://indhack.com/partenaires"
    },
    openGraph: {
        title: "Widget Testeur IA en Marque Blanche — Gratuit pour Agences",
        description: "Générez des leads SEO depuis votre site. Intégrez notre outil gratuit en 2 minutes.",
        url: "https://indhack.com/partenaires",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function PartenairesPage() {
    return (
        <>
            <Breadcrumb items={[
                { label: "Partenaires", href: "/partenaires" }
            ]} />
            <PartenairesClient />
        </>
    );
}
