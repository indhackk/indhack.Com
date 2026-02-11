import { NextRequest, NextResponse } from "next/server";

// Rate limiting and cache
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: LocalVisibilityResult; expiry: number }>();

const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days cache for SERP results

// Platform classifications
const PLATFORMS = {
    national: [
        { pattern: "pagesjaunes", name: "PagesJaunes", type: "annuaire" },
        { pattern: "doctolib", name: "Doctolib", type: "plateforme" },
        { pattern: "tripadvisor", name: "TripAdvisor", type: "plateforme" },
        { pattern: "yelp", name: "Yelp", type: "plateforme" },
        { pattern: "planity", name: "Planity", type: "plateforme" },
        { pattern: "booking.com", name: "Booking", type: "plateforme" },
        { pattern: "leboncoin", name: "Leboncoin", type: "plateforme" },
        { pattern: "indeed", name: "Indeed", type: "plateforme" },
        { pattern: "lafourchette", name: "LaFourchette", type: "plateforme" },
        { pattern: "thefork", name: "TheFork", type: "plateforme" },
        { pattern: "google.com/maps", name: "Google Maps", type: "google" },
        { pattern: "facebook.com", name: "Facebook", type: "social" },
        { pattern: "instagram.com", name: "Instagram", type: "social" },
        { pattern: "linkedin.com", name: "LinkedIn", type: "social" },
    ],
    annuaires: [
        { pattern: "118000", name: "118000", type: "annuaire" },
        { pattern: "hotfrog", name: "Hotfrog", type: "annuaire" },
        { pattern: "europages", name: "Europages", type: "annuaire" },
        { pattern: "cylex", name: "Cylex", type: "annuaire" },
        { pattern: "infobel", name: "Infobel", type: "annuaire" },
        { pattern: "starofservice", name: "StarOfService", type: "annuaire" },
        { pattern: "kompass", name: "Kompass", type: "annuaire" },
        { pattern: "societe.com", name: "Societe.com", type: "annuaire" },
    ],
};

interface SearchResult {
    position: number;
    title: string;
    url: string;
    snippet: string;
    classification: "platform" | "annuaire" | "local" | "google";
    platformName?: string;
}

interface LocalVisibilityResult {
    query: string;
    metier: string;
    ville: string;
    timestamp: string;
    results: SearchResult[];
    stats: {
        totalResults: number;
        platforms: number;
        annuaires: number;
        locaux: number;
        platformPercentage: number;
        localPercentage: number;
    };
    opportunity: "high" | "medium" | "low";
    opportunityMessage: string;
    recommendations: string[];
    cached?: boolean;
}

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }
    if (record.count >= RATE_LIMIT) return false;
    record.count++;
    return true;
}

function getCachedResult(key: string): LocalVisibilityResult | null {
    const cached = cacheMap.get(key);
    if (cached && Date.now() < cached.expiry) return cached.data;
    cacheMap.delete(key);
    return null;
}

function setCachedResult(key: string, data: LocalVisibilityResult): void {
    cacheMap.set(key, { data, expiry: Date.now() + CACHE_TTL });
}

function classifyResult(url: string): { classification: SearchResult["classification"]; platformName?: string } {
    const lowerUrl = url.toLowerCase();

    // Check national platforms
    for (const platform of PLATFORMS.national) {
        if (lowerUrl.includes(platform.pattern)) {
            return {
                classification: platform.type === "google" ? "google" : "platform",
                platformName: platform.name
            };
        }
    }

    // Check annuaires
    for (const annuaire of PLATFORMS.annuaires) {
        if (lowerUrl.includes(annuaire.pattern)) {
            return { classification: "annuaire", platformName: annuaire.name };
        }
    }

    // Default to local business
    return { classification: "local" };
}

async function searchGoogle(query: string): Promise<SearchResult[]> {
    const apiKey = process.env.SERPER_API_KEY;

    if (!apiKey) {
        throw new Error("API_NOT_CONFIGURED");
    }

    const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q: query,
            gl: "fr",
            hl: "fr",
            num: 10,
        }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
    }

    const data = await response.json();
    const organic = data.organic || [];

    return organic.map((result: { title: string; link: string; snippet: string }, index: number) => {
        const { classification, platformName } = classifyResult(result.link);
        return {
            position: index + 1,
            title: result.title,
            url: result.link,
            snippet: result.snippet || "",
            classification,
            platformName,
        };
    });
}

function analyzeResults(results: SearchResult[], metier: string, ville: string): LocalVisibilityResult {
    const stats = {
        totalResults: results.length,
        platforms: results.filter(r => r.classification === "platform").length,
        annuaires: results.filter(r => r.classification === "annuaire").length,
        locaux: results.filter(r => r.classification === "local").length,
        platformPercentage: 0,
        localPercentage: 0,
    };

    stats.platformPercentage = Math.round((stats.platforms / stats.totalResults) * 100);
    stats.localPercentage = Math.round((stats.locaux / stats.totalResults) * 100);

    // Determine opportunity level
    let opportunity: LocalVisibilityResult["opportunity"];
    let opportunityMessage: string;

    if (stats.locaux <= 2) {
        opportunity = "high";
        opportunityMessage = `Excellente opportunité ! Seulement ${stats.locaux} site(s) local/locaux en page 1. La concurrence est faible.`;
    } else if (stats.locaux <= 4) {
        opportunity = "medium";
        opportunityMessage = `Opportunité modérée. ${stats.locaux} sites locaux en page 1. Un bon référencement peut vous faire gagner des places.`;
    } else {
        opportunity = "low";
        opportunityMessage = `Concurrence locale forte. ${stats.locaux} sites locaux dominent déjà la page 1. Une stratégie SEO poussée sera nécessaire.`;
    }

    // Generate recommendations
    const recommendations: string[] = [];

    if (stats.platforms > 3) {
        const topPlatforms = results
            .filter(r => r.classification === "platform" && r.platformName)
            .slice(0, 3)
            .map(r => r.platformName);
        recommendations.push(`Créez et optimisez vos profils sur ${topPlatforms.join(", ")}`);
    }

    if (stats.locaux < 3) {
        recommendations.push("Opportunité de positionnement : peu de concurrents locaux directs");
    }

    recommendations.push(`Ciblez le mot-clé "${metier} ${ville}" dans votre title et H1`);
    recommendations.push("Créez du contenu local (blog, témoignages clients de la région)");
    recommendations.push("Obtenez des backlinks de sites locaux (presse locale, partenaires)");

    if (results.some(r => r.platformName === "Google Maps")) {
        recommendations.push("Optimisez votre fiche Google Business Profile");
    }

    return {
        query: `${metier} ${ville}`,
        metier,
        ville,
        timestamp: new Date().toISOString(),
        results,
        stats,
        opportunity,
        opportunityMessage,
        recommendations: recommendations.slice(0, 5),
    };
}

// Fallback data for demo when API is not configured
function getDemoResults(metier: string, ville: string): LocalVisibilityResult {
    const demoResults: SearchResult[] = [
        { position: 1, title: `${metier} ${ville} - PagesJaunes`, url: `https://www.pagesjaunes.fr/${metier}/${ville}`, snippet: `Trouvez un ${metier} à ${ville}`, classification: "platform", platformName: "PagesJaunes" },
        { position: 2, title: `Google Maps - ${metier} ${ville}`, url: `https://www.google.com/maps/search/${metier}+${ville}`, snippet: `Résultats sur Google Maps`, classification: "google", platformName: "Google Maps" },
        { position: 3, title: `Les meilleurs ${metier}s à ${ville}`, url: `https://example-local.fr/${metier}-${ville}`, snippet: `Découvrez notre sélection de ${metier}s`, classification: "local" },
        { position: 4, title: `${metier} - Yelp ${ville}`, url: `https://www.yelp.fr/search?find_desc=${metier}&find_loc=${ville}`, snippet: `Avis et recommandations`, classification: "platform", platformName: "Yelp" },
        { position: 5, title: `Annuaire ${metier} ${ville}`, url: `https://www.118000.fr/${metier}/${ville}`, snippet: `Annuaire professionnel`, classification: "annuaire", platformName: "118000" },
        { position: 6, title: `${metier} Pro ${ville}`, url: `https://www.example-pro.fr`, snippet: `Votre ${metier} de confiance`, classification: "local" },
        { position: 7, title: `Doctolib - ${ville}`, url: `https://www.doctolib.fr/${metier}/${ville}`, snippet: `Prenez rendez-vous`, classification: "platform", platformName: "Doctolib" },
        { position: 8, title: `${metier} Expert ${ville}`, url: `https://www.expert-local.fr`, snippet: `Expert depuis 20 ans`, classification: "local" },
        { position: 9, title: `Facebook - ${metier} ${ville}`, url: `https://www.facebook.com/search/${metier}/${ville}`, snippet: `Pages et groupes`, classification: "platform", platformName: "Facebook" },
        { position: 10, title: `Hotfrog ${metier}`, url: `https://www.hotfrog.fr/${metier}/${ville}`, snippet: `Annuaire d'entreprises`, classification: "annuaire", platformName: "Hotfrog" },
    ];

    const result = analyzeResults(demoResults, metier, ville);
    return { ...result, cached: true };
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte. Réessayez dans 1 heure." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { metier, ville } = body;

        if (!metier || !ville) {
            return NextResponse.json(
                { error: "Métier et ville requis" },
                { status: 400 }
            );
        }

        const cacheKey = `${metier.toLowerCase()}-${ville.toLowerCase()}`;
        const cached = getCachedResult(cacheKey);
        if (cached) {
            return NextResponse.json({ ...cached, cached: true });
        }

        try {
            const results = await searchGoogle(`${metier} ${ville}`);
            const analysis = analyzeResults(results, metier, ville);
            setCachedResult(cacheKey, analysis);
            return NextResponse.json(analysis);
        } catch (error) {
            if (error instanceof Error && error.message === "API_NOT_CONFIGURED") {
                // Return demo data when API is not configured
                const demoData = getDemoResults(metier, ville);
                return NextResponse.json({
                    ...demoData,
                    isDemo: true,
                    demoMessage: "Données de démonstration. Configurez SERPER_API_KEY pour des résultats réels."
                });
            }
            throw error;
        }
    } catch (error) {
        console.error("Local visibility error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse." },
            { status: 500 }
        );
    }
}
