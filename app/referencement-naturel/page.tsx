import { Metadata } from "next";
import ReferencementClient from "./ReferencementClient";

export const metadata: Metadata = {
    title: "Référencement Naturel | INDHACK, Consultante SEO",
    description: "Stratégies SEO sur-mesure pour atteindre la 1ère page Google. Trafic qualifié, leads durables et ROI maximisé. Experte certifiée. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/referencement-naturel"
    },
    openGraph: {
        title: "Référencement Naturel (SEO) | INDHACK",
        description: "Transformez votre site en machine à leads grâce au SEO. Stratégie technique, sémantique et netlinking.",
        url: "https://indhack.com/referencement-naturel",
    }
};

export default function ReferencementNaturelPage() {
    return <ReferencementClient />;
}
