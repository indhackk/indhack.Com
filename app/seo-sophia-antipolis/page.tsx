import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";

const cityData = getCityBySlug("seo-sophia-antipolis")!;

export const metadata: Metadata = {
    title: `Consultant SEO Sophia Antipolis | INDHACK, Consultante SEO`,
    description: `Boostez votre visibilité B2B sur Google à Sophia Antipolis. Consultante SEO freelance experte du marché tech. Audit gratuit pour startups et ESN. ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Sophia Antipolis | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à Sophia Antipolis. Référencement B2B, audit SEO tech et stratégie digitale pour la technopole.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoSophiaPage() {
    return <CityPageTemplateV2 cityData={cityData} />;
}
