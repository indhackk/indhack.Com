import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Metadata } from "next";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";

const cityData = getCityBySlug("consultant-seo-juan-les-pins")!;

export const metadata: Metadata = {
    title: "Consultante SEO Juan-les-Pins (06) — Réf. Local",
    description: "Consultante SEO à Juan-les-Pins. Référencement pour hôtels, restaurants, beach clubs et nightlife. Audit gratuit.",
    alternates: {
        canonical: `https://indhack.com/${cityData.slug}`
    },
    openGraph: {
        title: `Consultant SEO Juan-les-Pins | IndHack`,
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
