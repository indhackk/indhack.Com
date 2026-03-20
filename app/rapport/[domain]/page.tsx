import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRapport, sanitizeDomain } from "@/lib/rapports";
import RapportClient from "./RapportClient";

interface Props {
    params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { domain } = await params;
    const cleanDomain = sanitizeDomain(decodeURIComponent(domain));
    const rapport = getRapport(cleanDomain);

    if (!rapport) {
        return { title: "Rapport introuvable – IndHack" };
    }

    const title = `GEO Score de ${cleanDomain} : ${rapport.score}/100 – Rapport IndHack`;
    const description = `Rapport de visibilité IA pour ${cleanDomain}. Score GEO : ${rapport.score}/100 (${rapport.levelLabel}). Accessibilité : ${rapport.categories.accessibilite.score}/${rapport.categories.accessibilite.maxScore}, Sémantique : ${rapport.categories.semantique.score}/${rapport.categories.semantique.maxScore}, E-E-A-T : ${rapport.categories.eeat.score}/${rapport.categories.eeat.maxScore}.`;

    return {
        title,
        description,
        alternates: { canonical: `https://indhack.com/rapport/${cleanDomain}` },
        openGraph: {
            title,
            description,
            url: `https://indhack.com/rapport/${cleanDomain}`,
            type: "website",
            locale: "fr_FR",
            siteName: "IndHack",
            images: [
                {
                    url: `https://indhack.com/api/og?title=GEO%20Score%20${rapport.score}%2F100&subtitle=${encodeURIComponent(cleanDomain)}`,
                    width: 1200,
                    height: 630,
                    alt: `GEO Score de ${cleanDomain}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `GEO Score : ${rapport.score}/100 – ${cleanDomain}`,
            description,
        },
        robots: { index: true, follow: true },
    };
}

export const dynamic = "force-dynamic";

export default async function RapportPage({ params }: Props) {
    const { domain } = await params;
    const cleanDomain = sanitizeDomain(decodeURIComponent(domain));
    const rapport = getRapport(cleanDomain);

    if (!rapport) {
        notFound();
    }

    return <RapportClient rapport={rapport} />;
}
