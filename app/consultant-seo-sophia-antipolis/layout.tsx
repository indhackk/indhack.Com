import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO Sophia-Antipolis (06560) | Expert référencement tech B2B",
    description: "Consultante SEO à Sophia-Antipolis. Stratégie de visibilité pour startups SaaS, ESN et deeptech. SEO B2B pour la technopole azuréenne.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-sophia-antipolis"
    },
    openGraph: {
        title: "Consultant SEO Sophia-Antipolis (06560) | SEO tech B2B",
        description: "Experte SEO pour la Silicon Valley européenne. Startups, SaaS, ESN : générez des leads qualifiés via Google.",
        url: "https://indhack.com/consultant-seo-sophia-antipolis",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
