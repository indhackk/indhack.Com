import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Antibes (06600) | Experte référencement yachting",
    description: "Consultante SEO à Antibes et Juan-les-Pins. Stratégie de visibilité pour yachting, artisans du Vieil Antibes et commerces du Port Vauban.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-antibes"
    },
    openGraph: {
        title: "Consultante SEO Antibes (06600) | Référencement local",
        description: "Experte SEO à Antibes. Port Vauban, yachting, artisanat local : dominez Google sur la Côte d'Azur.",
        url: "https://indhack.com/consultant-seo-antibes",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
