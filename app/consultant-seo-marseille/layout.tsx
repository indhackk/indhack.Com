import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Marseille (13000) - IndHack",
    description: "Consultante SEO à Marseille. Référencement local pour PME et entrepreneurs des Bouches-du-Rhône. Diagnostic SEO local.",
    keywords: ["consultant SEO Marseille", "référencement Marseille", "SEO Bouches-du-Rhône", "audit SEO Marseille", "experte SEO 13", "agence SEO Marseille", "référencement naturel Marseille"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-marseille"
    },
    openGraph: {
        title: "Consultant SEO Marseille (13000) - IndHack",
        description: "Renforcez votre visibilité à Marseille. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises marseillaises. Vieux-Port, Euroméditerranée, Castellane.",
        url: "https://indhack.com/consultant-seo-marseille",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultant SEO Marseille (13000) - IndHack",
        description: "Consultante SEO à Marseille. Référencement local pour PME et entrepreneurs des Bouches-du-Rhône."
    }
};

export default function MarseilleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
