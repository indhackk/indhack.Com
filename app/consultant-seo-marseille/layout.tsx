import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Marseille — référencement local PACA",
    description: "Consultante SEO freelance à Marseille. Référencement local pour PME et entrepreneurs des Bouches-du-Rhône. Audit SEO gratuit.",
    keywords: ["consultant SEO Marseille", "référencement Marseille", "SEO Bouches-du-Rhône", "audit SEO Marseille", "expert SEO 13", "agence SEO Marseille", "référencement naturel Marseille"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-marseille"
    },
    openGraph: {
        title: "Consultante SEO Marseille — référencement local PACA",
        description: "Dominez Google à Marseille. Référencement naturel, audit SEO technique et stratégie digitale pour entreprises marseillaises. Vieux-Port, Euroméditerranée, Castellane.",
        url: "https://indhack.com/consultant-seo-marseille",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultante SEO Marseille — référencement local PACA",
        description: "Consultante SEO freelance à Marseille. Référencement local pour PME et entrepreneurs des Bouches-du-Rhône."
    }
};

export default function MarseilleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
