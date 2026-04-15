import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Lille (59000) | Experte référencement Hauts-de-France",
    description: "Consultante SEO à Lille. Stratégie de visibilité pour e-commerçants, enseignes retail et commerces transfrontaliers du Nord.",
    robots: { index: true, follow: true },
    keywords: ["consultante SEO Lille", "référencement Lille", "SEO Nord", "audit SEO Lille", "experte SEO 59"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-lille"
    },
    openGraph: {
        title: "Consultante SEO Lille (59000) | SEO e-commerce & retail",
        description: "Experte SEO à Lille. E-commerce, retail, transfrontalier : dominez Google dans le carrefour européen lillois.",
        url: "https://indhack.com/consultant-seo-lille",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function LilleLayout({ children }: { children: React.ReactNode }) {
    return children;
}
