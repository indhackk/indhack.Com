import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Simple in-memory rate limiting and cache
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: VisibilityResult; expiry: number }>();

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// AI Crawlers to check
const AI_CRAWLERS = [
    { name: "GPTBot", agent: "GPTBot", description: "OpenAI - Entraînement modèles", company: "OpenAI" },
    { name: "ChatGPT-User", agent: "ChatGPT-User", description: "OpenAI - Navigation temps réel", company: "OpenAI" },
    { name: "OAI-SearchBot", agent: "OAI-SearchBot", description: "OpenAI - Recherche", company: "OpenAI" },
    { name: "Claude-Web", agent: "Claude-Web", description: "Anthropic - Claude", company: "Anthropic" },
    { name: "PerplexityBot", agent: "PerplexityBot", description: "Perplexity AI", company: "Perplexity" },
    { name: "Google-Extended", agent: "Google-Extended", description: "Gemini - Entraînement", company: "Google" },
    { name: "Bytespider", agent: "Bytespider", description: "ByteDance / TikTok", company: "ByteDance" },
    { name: "CCBot", agent: "CCBot", description: "Common Crawl", company: "Common Crawl" },
];

interface CrawlerStatus {
    name: string;
    agent: string;
    description: string;
    company: string;
    allowed: boolean;
}

interface CategoryScore {
    score: number;
    maxScore: number;
    details: string[];
}

interface VisibilityResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    level: "invisible" | "partial" | "visible" | "optimized";
    levelLabel: string;
    categories: {
        accessibilite: CategoryScore;
        semantique: CategoryScore;
        eeat: CategoryScore;
        format: CategoryScore;
    };
    crawlers: CrawlerStatus[];
    recommendations: string[];
    pageTitle: string;
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

function getCachedResult(url: string): VisibilityResult | null {
    const cached = cacheMap.get(url);
    if (cached && Date.now() < cached.expiry) return cached.data;
    cacheMap.delete(url);
    return null;
}

function setCachedResult(url: string, data: VisibilityResult): void {
    cacheMap.set(url, { data, expiry: Date.now() + CACHE_TTL });
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "INDHACK-Visibility-Checker/1.0 (+https://indhack.com/outils/testeur-visibilite-ia)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
            redirect: "follow",
        });
        clearTimeout(timeoutId);
        return response;
    } catch {
        clearTimeout(timeoutId);
        throw new Error("Timeout ou erreur de connexion");
    }
}

function checkCrawlerBlocked(robotsTxt: string, agent: string): boolean {
    const lines = robotsTxt.toLowerCase().split("\n");
    let currentUserAgent = "";
    let isBlocked = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("user-agent:")) {
            currentUserAgent = trimmed.replace("user-agent:", "").trim();
        } else if (trimmed.startsWith("disallow:")) {
            const path = trimmed.replace("disallow:", "").trim();
            if (path === "/" && (currentUserAgent === "*" || currentUserAgent === agent.toLowerCase())) {
                if (currentUserAgent === agent.toLowerCase()) {
                    return true; // Explicitly blocked
                }
                isBlocked = true; // Blocked by wildcard
            }
        } else if (trimmed.startsWith("allow:")) {
            const path = trimmed.replace("allow:", "").trim();
            if (path === "/" && currentUserAgent === agent.toLowerCase()) {
                return false; // Explicitly allowed
            }
        }
    }

    return isBlocked;
}

async function analyzeVisibility(url: string): Promise<VisibilityResult> {
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
        normalizedUrl = "https://" + normalizedUrl;
    }

    const urlObj = new URL(normalizedUrl);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

    // Fetch main page
    const startTime = Date.now();
    const response = await fetchWithTimeout(normalizedUrl);
    const ttfb = Date.now() - startTime;
    const html = await response.text();
    const $ = cheerio.load(html);
    const pageTitle = $("title").text().trim() || "Sans titre";

    // Fetch robots.txt
    let robotsTxt = "";
    try {
        const robotsResponse = await fetchWithTimeout(`${baseUrl}/robots.txt`, 5000);
        if (robotsResponse.ok) {
            robotsTxt = await robotsResponse.text();
        }
    } catch {
        robotsTxt = "";
    }

    // Check sitemap
    let hasSitemap = false;
    try {
        const sitemapResponse = await fetchWithTimeout(`${baseUrl}/sitemap.xml`, 5000);
        hasSitemap = sitemapResponse.ok;
    } catch {
        hasSitemap = false;
    }

    // Initialize scores
    const categories: VisibilityResult["categories"] = {
        accessibilite: { score: 0, maxScore: 30, details: [] },
        semantique: { score: 0, maxScore: 30, details: [] },
        eeat: { score: 0, maxScore: 20, details: [] },
        format: { score: 0, maxScore: 20, details: [] },
    };

    const recommendations: string[] = [];

    // ========== 1. ACCESSIBILITÉ IA (/30) ==========
    const crawlers: CrawlerStatus[] = [];
    let allowedCrawlers = 0;

    for (const crawler of AI_CRAWLERS) {
        const isBlocked = checkCrawlerBlocked(robotsTxt, crawler.agent);
        crawlers.push({
            ...crawler,
            allowed: !isBlocked,
        });
        if (!isBlocked) allowedCrawlers++;
    }

    // Points for crawlers (max 16)
    const crawlerScore = Math.round((allowedCrawlers / AI_CRAWLERS.length) * 16);
    categories.accessibilite.score += crawlerScore;
    categories.accessibilite.details.push(`${allowedCrawlers}/${AI_CRAWLERS.length} crawlers IA autorisés`);

    if (allowedCrawlers < AI_CRAWLERS.length) {
        recommendations.push("Autorisez les crawlers IA dans votre robots.txt avec notre générateur");
    }

    // Sitemap (4 points)
    if (hasSitemap) {
        categories.accessibilite.score += 4;
        categories.accessibilite.details.push("Sitemap XML accessible");
    } else {
        categories.accessibilite.details.push("Sitemap XML non trouvé");
        recommendations.push("Créez un sitemap.xml pour faciliter l'exploration par les IA");
    }

    // TTFB (5 points)
    if (ttfb < 500) {
        categories.accessibilite.score += 5;
        categories.accessibilite.details.push(`Temps de réponse rapide (${ttfb}ms)`);
    } else if (ttfb < 1000) {
        categories.accessibilite.score += 3;
        categories.accessibilite.details.push(`Temps de réponse correct (${ttfb}ms)`);
    } else {
        categories.accessibilite.details.push(`Temps de réponse lent (${ttfb}ms)`);
        recommendations.push("Optimisez le temps de réponse de votre serveur");
    }

    // Content accessible (not in iframes, check noscript) (5 points)
    const hasNoscript = $("noscript").length > 0;
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const hasSubstantialContent = bodyText.length > 500;

    if (hasSubstantialContent) {
        categories.accessibilite.score += 5;
        categories.accessibilite.details.push("Contenu textuel accessible");
    } else {
        categories.accessibilite.details.push("Peu de contenu textuel accessible");
        recommendations.push("Ajoutez plus de contenu textuel directement dans le HTML");
    }

    // ========== 2. RICHESSE SÉMANTIQUE (/30) ==========

    // Schema JSON-LD (max 15 points)
    const jsonLdScripts = $('script[type="application/ld+json"]');
    const schemaTypes: string[] = [];
    const valuableSchemas = ["LocalBusiness", "Organization", "FAQPage", "HowTo", "Article", "Person", "Product", "BreadcrumbList"];

    jsonLdScripts.each((_, el) => {
        try {
            const content = $(el).html();
            if (content) {
                const parsed = JSON.parse(content);
                const type = parsed["@type"];
                if (type) {
                    if (Array.isArray(type)) {
                        schemaTypes.push(...type);
                    } else {
                        schemaTypes.push(type);
                    }
                }
            }
        } catch {
            // Invalid JSON-LD
        }
    });

    const hasValuableSchema = schemaTypes.some(t => valuableSchemas.includes(t));
    const schemaScore = schemaTypes.length === 0 ? 0 : hasValuableSchema ? 15 : 8;
    categories.semantique.score += schemaScore;

    if (schemaTypes.length > 0) {
        categories.semantique.details.push(`Schema JSON-LD: ${schemaTypes.join(", ")}`);
    } else {
        categories.semantique.details.push("Aucun schema JSON-LD détecté");
        recommendations.push("Ajoutez des données structurées avec notre générateur Schema JSON-LD");
    }

    // FAQ detection (8 points)
    const hasFaqSchema = schemaTypes.includes("FAQPage");
    const hasFaqSection = $("*:contains('FAQ')").length > 0 ||
        $("*:contains('Questions')").length > 0 ||
        $("details").length >= 3 ||
        $("[itemtype*='Question']").length > 0;

    if (hasFaqSchema) {
        categories.semantique.score += 8;
        categories.semantique.details.push("FAQ structurée avec schema");
    } else if (hasFaqSection) {
        categories.semantique.score += 4;
        categories.semantique.details.push("Section FAQ détectée (sans schema)");
        recommendations.push("Ajoutez le schema FAQPage à votre section FAQ");
    } else {
        categories.semantique.details.push("Pas de FAQ détectée");
        recommendations.push("Ajoutez une section FAQ avec des questions/réponses pertinentes");
    }

    // Lists and tables (7 points)
    const listsCount = $("ul, ol").length;
    const tablesCount = $("table").length;

    if (listsCount >= 3 || tablesCount >= 1) {
        categories.semantique.score += 7;
        categories.semantique.details.push("Contenu structuré (listes/tableaux)");
    } else if (listsCount >= 1) {
        categories.semantique.score += 4;
        categories.semantique.details.push("Quelques listes présentes");
    } else {
        categories.semantique.details.push("Peu de contenu structuré");
        recommendations.push("Utilisez des listes à puces et tableaux pour structurer votre contenu");
    }

    // ========== 3. SIGNAUX E-E-A-T (/20) ==========

    // About page link (5 points)
    const hasAboutLink = $('a[href*="propos"], a[href*="about"], a[href*="qui-sommes"]').length > 0;
    if (hasAboutLink) {
        categories.eeat.score += 5;
        categories.eeat.details.push("Lien vers page À propos détecté");
    } else {
        categories.eeat.details.push("Pas de lien vers page À propos");
        recommendations.push("Ajoutez un lien vers une page À propos / Qui sommes-nous");
    }

    // Author markup (5 points)
    const hasAuthor = $("[rel='author'], .author, [itemprop='author'], meta[name='author']").length > 0;
    if (hasAuthor) {
        categories.eeat.score += 5;
        categories.eeat.details.push("Auteur identifié");
    } else {
        categories.eeat.details.push("Pas d'auteur identifié");
        recommendations.push("Identifiez les auteurs de vos contenus avec des balises author");
    }

    // Social profiles (5 points)
    const hasSocialLinks = $('a[href*="linkedin"], a[href*="twitter"], a[href*="facebook"]').length > 0;
    if (hasSocialLinks) {
        categories.eeat.score += 5;
        categories.eeat.details.push("Liens vers réseaux sociaux");
    } else {
        categories.eeat.details.push("Pas de liens vers réseaux sociaux");
        recommendations.push("Ajoutez des liens vers vos profils LinkedIn/Twitter");
    }

    // Contact info (5 points)
    const hasContact = $('a[href*="contact"], a[href^="tel:"], a[href^="mailto:"]').length > 0 ||
        $("*:contains('@')").filter((_, el) => $(el).text().includes("@") && $(el).text().includes(".")).length > 0;
    if (hasContact) {
        categories.eeat.score += 5;
        categories.eeat.details.push("Informations de contact présentes");
    } else {
        categories.eeat.details.push("Pas d'informations de contact visibles");
        recommendations.push("Affichez clairement vos coordonnées de contact");
    }

    // ========== 4. FORMAT IA-FRIENDLY (/20) ==========

    // Content length (8 points)
    const contentLength = bodyText.length;
    if (contentLength > 5000) {
        categories.format.score += 8;
        categories.format.details.push("Contenu riche (>5000 caractères)");
    } else if (contentLength > 2000) {
        categories.format.score += 5;
        categories.format.details.push("Contenu correct (>2000 caractères)");
    } else {
        categories.format.score += 2;
        categories.format.details.push("Contenu limité (<2000 caractères)");
        recommendations.push("Enrichissez votre contenu avec plus de texte de qualité");
    }

    // Statistics and numbers (6 points)
    const textContent = $("body").text();
    const hasNumbers = /\d+%|\d+€|\d+ (ans|jours|heures|clients|projets)/i.test(textContent);
    if (hasNumbers) {
        categories.format.score += 6;
        categories.format.details.push("Données chiffrées présentes");
    } else {
        categories.format.details.push("Peu de données chiffrées");
        recommendations.push("Ajoutez des statistiques et données chiffrées (les IA adorent les citer)");
    }

    // Heading structure (6 points)
    const h1Count = $("h1").length;
    const h2Count = $("h2").length;
    const h3Count = $("h3").length;

    if (h1Count === 1 && h2Count >= 2) {
        categories.format.score += 6;
        categories.format.details.push("Structure de titres optimale");
    } else if (h1Count >= 1 && h2Count >= 1) {
        categories.format.score += 3;
        categories.format.details.push("Structure de titres correcte");
    } else {
        categories.format.details.push("Structure de titres à améliorer");
        recommendations.push("Structurez votre contenu avec des titres H1, H2, H3");
    }

    // Calculate total score
    const totalScore = categories.accessibilite.score +
        categories.semantique.score +
        categories.eeat.score +
        categories.format.score;

    // Determine visibility level
    let level: VisibilityResult["level"];
    let levelLabel: string;

    if (totalScore >= 80) {
        level = "optimized";
        levelLabel = "Optimisé pour les IA";
    } else if (totalScore >= 60) {
        level = "visible";
        levelLabel = "Bien visible";
    } else if (totalScore >= 40) {
        level = "partial";
        levelLabel = "Partiellement visible";
    } else {
        level = "invisible";
        levelLabel = "Peu visible";
    }

    return {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        score: totalScore,
        maxScore: 100,
        level,
        levelLabel,
        categories,
        crawlers,
        recommendations: recommendations.slice(0, 5), // Top 5 recommendations
        pageTitle,
    };
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte. Réessayez dans 1 heure (max 5 tests/heure)." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { url } = body;

        if (!url || typeof url !== "string") {
            return NextResponse.json({ error: "URL requise" }, { status: 400 });
        }

        const cached = getCachedResult(url);
        if (cached) {
            return NextResponse.json({ ...cached, cached: true });
        }

        const result = await analyzeVisibility(url);
        setCachedResult(url, result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Visibility test error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse. Vérifiez l'URL." },
            { status: 500 }
        );
    }
}
