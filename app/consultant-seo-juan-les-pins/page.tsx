import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-juan-les-pins")!;

export const metadata: Metadata = {
    title: `Consultant SEO Juan-les-Pins | Expert Référencement 06 - INDHACK`,
    description: `Consultant SEO à Juan-les-Pins : boostez votre visibilité Google AVANT la saison estivale. Experte référencement pour hôtels, restaurants, beach clubs et nightlife. Audit gratuit ✆ 06 61 13 97 48`,
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Juan-les-Pins | Indiana Aflalo`,
        description: `Dominez Google à Juan-les-Pins avant l'été. SEO pour beach clubs, hôtels, restaurants et vie nocturne de la Côte d'Azur.`,
        url: `https://indhack.com/${cityData.slug}`,
    }
};

export default function SeoJuanLesPinsPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} />
        </>
    );
}
