import { Metadata } from "next";
import CommunityManagerClient from "./CommunityManagerClient";

export const metadata: Metadata = {
    title: "Community Manager — Gestion Réseaux Sociaux – IndHack",
    description: "Gestion de vos réseaux sociaux (Instagram, TikTok, LinkedIn). Augmentez votre engagement et générez des leads qualifiés.",
    alternates: {
        canonical: "https://indhack.com/community-manager"
    },
    openGraph: {
        title: "Community Manager Freelance",
        description: "Boostez votre présence sociale. Stratégie éditoriale, création de contenu et animation de communauté.",
        url: "https://indhack.com/community-manager",
    }
};

export default function CommunityManagerPage() {
    return <CommunityManagerClient />;
}
