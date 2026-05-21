import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Antibes (06600) - IndHack",
    description: "Consultante SEO à Antibes et Juan-les-Pins. Stratégie de visibilité pour yachting, artisans du Vieil Antibes et commerces du Port Vauban.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-antibes"
    },
    openGraph: {
        title: "Consultant SEO Antibes (06600) - IndHack",
        description: "Experte SEO à Antibes. Port Vauban, yachting, artisanat local : renforcez votre visibilité sur la Côte d'Azur.",
        url: "https://indhack.com/consultant-seo-antibes",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
