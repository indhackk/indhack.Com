import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Lille (59000) - IndHack",
    description: "Consultante SEO à Lille. Stratégie de visibilité pour e-commerçants, enseignes retail et commerces transfrontaliers du Nord.",
    robots: { index: true, follow: true },
    keywords: ["consultante SEO Lille", "référencement Lille", "SEO Nord", "audit SEO Lille", "experte SEO 59"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-lille"
    },
    openGraph: {
        title: "Consultant SEO Lille (59000) - IndHack",
        description: "Experte SEO à Lille. E-commerce, retail, transfrontalier : renforcez votre visibilité dans le carrefour européen lillois.",
        url: "https://indhack.com/consultant-seo-lille",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack"
    }
};

export default function LilleLayout({ children }: { children: React.ReactNode }) {
    return children;
}
