import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Grenoble (38000) - IndHack",
    description: "Consultante SEO à Grenoble : audit technique, référencement local et stratégie SEO pour PME, startups et entreprises de l'Isère.",
    keywords: ["consultant SEO Grenoble", "référencement Grenoble", "SEO Isère", "audit SEO Grenoble", "experte SEO 38", "agence SEO Grenoble", "référencement naturel Grenoble"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-grenoble"
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Consultant SEO Grenoble (38000) - IndHack",
        description: "Renforcez votre visibilité à Grenoble. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises grenobloises. Startups tech, tourisme montagne, PME.",
        url: "https://indhack.com/consultant-seo-grenoble",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant SEO Grenoble (38000) - IndHack",
        description: "Consultante SEO à Grenoble. Audit technique, référencement local pour startups tech et PME de l'Isère."
    }
};

export default function GrenoblelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
