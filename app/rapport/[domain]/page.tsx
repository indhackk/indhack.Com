import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRapport, sanitizeDomain, type RapportData } from "@/lib/rapports";
import RapportClient from "./RapportClient";

interface Props {
    params: Promise<{ domain: string }>;
    searchParams: Promise<{ data?: string }>;
}

// Décoder les données encodées en base64 depuis l'URL
function decodeRapportData(encoded: string, domain: string): RapportData | null {
    try {
        const decoded = decodeURIComponent(atob(encoded));
        const data = JSON.parse(decoded);

        return {
            domain: data.d || domain,
            url: data.u || `https://${domain}`,
            score: data.s || 0,
            maxScore: 100,
            level: data.l || "partial",
            levelLabel: data.ll || "Analyse",
            pageTitle: data.t || domain,
            wordCount: data.w || 0,
            responseTime: data.r || 0,
            hasLlmsTxt: data.lm || false,
            categories: {
                accessibilite: { score: data.c?.a?.s || 0, maxScore: data.c?.a?.m || 30 },
                semantique: { score: data.c?.se?.s || 0, maxScore: data.c?.se?.m || 30 },
                eeat: { score: data.c?.e?.s || 0, maxScore: data.c?.e?.m || 20 },
                format: { score: data.c?.f?.s || 0, maxScore: data.c?.f?.m || 20 },
            },
            crawlers: (data.cr || []).map((c: { n: string; co: string; st: string }) => ({
                name: c.n,
                company: c.co,
                status: c.st as "allowed" | "blocked" | "not_mentioned",
            })),
            recommendations: data.rec || [],
            testedAt: data.ts || new Date().toISOString(),
            updatedAt: data.ts || new Date().toISOString(),
        };
    } catch {
        return null;
    }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { domain } = await params;
    const { data: encodedData } = await searchParams;
    const cleanDomain = sanitizeDomain(decodeURIComponent(domain));

    // Essayer d'abord le stockage, puis les données encodées
    let rapport = getRapport(cleanDomain);
    if (!rapport && encodedData) {
        rapport = decodeRapportData(encodedData, cleanDomain);
    }

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

export default async function RapportPage({ params, searchParams }: Props) {
    const { domain } = await params;
    const { data: encodedData } = await searchParams;
    const cleanDomain = sanitizeDomain(decodeURIComponent(domain));

    // Essayer d'abord le stockage, puis les données encodées
    let rapport = getRapport(cleanDomain);
    if (!rapport && encodedData) {
        rapport = decodeRapportData(encodedData, cleanDomain);
    }

    if (!rapport) {
        notFound();
    }

    return <RapportClient rapport={rapport} />;
}
