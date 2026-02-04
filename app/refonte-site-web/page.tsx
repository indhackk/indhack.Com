import { Metadata } from "next";
import RefonteSiteClient from "./RefonteSiteClient";

export const metadata: Metadata = {
    title: "Refonte Site Web | INDHACK, Consultante SEO",
    description: "Refonte de site sans perte de trafic. Migration SEO sécurisée, redirection 301 et optimisation technique. Sécurisez votre visibilité. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/refonte-site-web"
    },
    openGraph: {
        title: "Refonte de Site Web SEO | INDHACK",
        description: "Changez de design sans perdre vos positions Google. Migration technique experte et sécurisée.",
        url: "https://indhack.com/refonte-site-web",
    }
};

export default function RefonteSiteWebPage() {
    return <RefonteSiteClient />;
}
