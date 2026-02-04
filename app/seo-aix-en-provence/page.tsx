import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";

const cityData = getCityBySlug("seo-aix-en-provence")!;

export const metadata: Metadata = {
    title: `Consultant SEO Aix-en-Provence | INDHACK, Consultante SEO`,
    description: `Boostez votre visibilité sur Google à Aix-en-Provence. Consultante SEO freelance experte en référencement local pour PME et entrepreneurs des ${cityData.department}. Audit gratuit ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Aix-en-Provence | Indiana Aflalo - IndHack`,
        description: `Dominez les résultats Google à Aix-en-Provence. Référencement local, audit SEO et stratégie digitale pour entreprises aixoises.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoAixPage() {
    return <CityPageTemplateV2 cityData={cityData} />;
}
