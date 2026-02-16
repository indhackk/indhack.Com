import { Metadata } from "next";
import CommunityManagerClient from "./CommunityManagerClient";

export const metadata: Metadata = {
    title: "Community Manager | IndHack, Consultante SEO",
    description: "Gestion experte de vos réseaux sociaux (Instagram, TikTok, LinkedIn). Augmentez votre engagement et générez des leads qualifiés. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/community-manager"
    },
    openGraph: {
        title: "Community Manager Freelance | IndHack",
        description: "Boostez votre présence sociale. Stratégie éditoriale, création de contenu et animation de communauté.",
        url: "https://indhack.com/community-manager",
    }
};

export default function CommunityManagerPage() {
    return <CommunityManagerClient />;
}
