import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultant SEO Sophia-Antipolis (06560) - IndHack",
    description: "Consultante SEO à Sophia-Antipolis. Stratégie de visibilité pour startups SaaS, ESN et deeptech. SEO B2B pour la technopole azuréenne.",
    alternates: {
        canonical: "https://indhack.com/consultant-seo-sophia-antipolis"
    },
    openGraph: {
        title: "Consultant SEO Sophia-Antipolis (06560) - IndHack",
        description: "Experte SEO pour la Silicon Valley européenne. Startups, SaaS, ESN : développez des demandes qualifiées via Google.",
        url: "https://indhack.com/consultant-seo-sophia-antipolis",
        type: "website",
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
