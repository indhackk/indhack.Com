import { Metadata } from "next";
import GMBAutoPilotClient from "./GMBAutoPilotClient";

export const metadata: Metadata = {
    title: "GMB AutoPilot - Réponses Automatiques aux Avis Google",
    description: "Automatisez les réponses à vos avis Google My Business avec l'IA. Intégrez des mots-clés SEO et boostez votre référencement local. À partir de 29€/mois.",
    keywords: ["gmb", "google my business", "avis google", "réponse automatique", "seo local", "fiche google"],
    openGraph: {
        title: "GMB AutoPilot - Réponses Automatiques aux Avis Google",
        description: "Automatisez les réponses à vos avis Google avec l'IA. Boostez votre SEO local.",
        type: "website",
        url: "https://indhack.com/outils/gmb-autopilot"
    }
};

export default function GMBAutoPilotPage() {
    return <GMBAutoPilotClient />;
}
