import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Monaco | Expert Référencement Prestige",
    description: "Référencement naturel à Monaco pour entreprises d'exception. Stratégies SEO premium, multilingue (FR/EN/IT). Audit offert pour les acteurs monégasques.",
    alternates: {
        canonical: "https://indhack.com/seo-monaco"
    }
};

export default function SeoMonacoPage() {
    return (
        <CityPageTemplate
            city="Monaco"
            zipCode="98000"
            description="Principauté synonyme d'excellence et de luxe, Monaco attire une clientèle internationale ultra-exigeante. Que vous soyez dans l'immobilier de prestige, la gestion de patrimoine, l'événementiel ou les services premium, votre présence digitale doit refléter ce standing. Un référencement naturel stratégique vous positionne face aux recherches des HNWI (High Net Worth Individuals) en quête de services d'exception."
        />
    );
}
