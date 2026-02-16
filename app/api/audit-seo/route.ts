import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Simple in-memory rate limiting and cache
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: AuditResult; expiry: number }>();

const RATE_LIMIT = 5; // 5 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CriteriaResult {
    id: string;
    name: string;
    category: "technique" | "contenu" | "accessibilite" | "ia";
    status: "success" | "warning" | "error";
    score: number;
    maxScore: number;
    message: string;
    details?: string;
    fix?: string;
}

interface AuditResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    categories: {
        technique: { score: number; maxScore: number };
        contenu: { score: number; maxScore: number };
        accessibilite: { score: number; maxScore: number };
        ia: { score: number; maxScore: number };
    };
    criteria: CriteriaResult[];
    pageTitle: string;
    pageDescription: string;
}

// AI Crawlers to check in robots.txt
const AI_CRAWLERS = [
    { name: "GPTBot", agent: "GPTBot" },
    { name: "ChatGPT-User", agent: "ChatGPT-User" },
    { name: "Claude-Web", agent: "Claude-Web" },
    { name: "PerplexityBot", agent: "PerplexityBot" },
    { name: "Google-Extended", agent: "Google-Extended" },
];

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    return ip;
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

function getCachedResult(url: string): AuditResult | null {
    const cached = cacheMap.get(url);
    if (cached && Date.now() < cached.expiry) {
        return cached.data;
    }
    cacheMap.delete(url);
    return null;
}

function setCachedResult(url: string, data: AuditResult): void {
    cacheMap.set(url, { data, expiry: Date.now() + CACHE_TTL });
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "INDHACK-SEO-Audit/1.0 (+https://indhack.com/outils/audit-seo-gratuit)",
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

async function analyzeURL(url: string): Promise<AuditResult> {
    const criteria: CriteriaResult[] = [];
    let pageTitle = "";
    let pageDescription = "";

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

    // Get basic info
    pageTitle = $("title").text().trim() || "Sans titre";
    pageDescription = $('meta[name="description"]').attr("content")?.trim() || "";

    // 1. HTTPS
    const isHttps = normalizedUrl.startsWith("https://");
    criteria.push({
        id: "https",
        name: "Connexion HTTPS",
        category: "technique",
        status: isHttps ? "success" : "error",
        score: isHttps ? 8 : 0,
        maxScore: 8,
        message: isHttps ? "Votre site utilise HTTPS" : "Votre site n'utilise pas HTTPS",
        details: isHttps ? "Certificat SSL actif" : "Le site est accessible en HTTP non sécurisé",
        fix: isHttps ? undefined : "Installez un certificat SSL gratuit avec Let's Encrypt",
    });

    // 2. Title
    const title = $("title").text().trim();
    const titleLength = title.length;
    const titleStatus = !title ? "error" : (titleLength >= 50 && titleLength <= 60) ? "success" : "warning";
    criteria.push({
        id: "title",
        name: "Balise Title",
        category: "contenu",
        status: titleStatus,
        score: titleStatus === "success" ? 8 : titleStatus === "warning" ? 5 : 0,
        maxScore: 8,
        message: !title
            ? "Balise title manquante"
            : `Title de ${titleLength} caractères`,
        details: title || "Aucun titre trouvé",
        fix: titleStatus !== "success"
            ? "Rédigez un titre de 50-60 caractères incluant votre mot-clé principal"
            : undefined,
    });

    // 3. Meta Description
    const metaDesc = $('meta[name="description"]').attr("content")?.trim() || "";
    const metaDescLength = metaDesc.length;
    const metaDescStatus = !metaDesc ? "error" : (metaDescLength >= 150 && metaDescLength <= 160) ? "success" : "warning";
    criteria.push({
        id: "meta-description",
        name: "Meta Description",
        category: "contenu",
        status: metaDescStatus,
        score: metaDescStatus === "success" ? 7 : metaDescStatus === "warning" ? 4 : 0,
        maxScore: 7,
        message: !metaDesc
            ? "Meta description manquante"
            : `Meta description de ${metaDescLength} caractères`,
        details: metaDesc ? metaDesc.substring(0, 100) + (metaDesc.length > 100 ? "..." : "") : "Aucune meta description",
        fix: metaDescStatus !== "success"
            ? "Rédigez une meta description de 150-160 caractères avec un appel à l'action"
            : undefined,
    });

    // 4. H1
    const h1Elements = $("h1");
    const h1Count = h1Elements.length;
    const h1Text = h1Elements.first().text().trim();
    const h1Status = h1Count === 1 ? "success" : h1Count === 0 ? "error" : "warning";
    criteria.push({
        id: "h1",
        name: "Balise H1",
        category: "contenu",
        status: h1Status,
        score: h1Status === "success" ? 7 : h1Status === "warning" ? 4 : 0,
        maxScore: 7,
        message: h1Count === 0
            ? "Aucune balise H1 trouvée"
            : h1Count === 1
                ? "Une seule balise H1 (parfait)"
                : `${h1Count} balises H1 trouvées (trop)`,
        details: h1Text || "Aucun H1",
        fix: h1Status !== "success"
            ? "Utilisez une seule balise H1 par page avec votre mot-clé principal"
            : undefined,
    });

    // 5. Heading Structure
    const h2Count = $("h2").length;
    const h3Count = $("h3").length;
    const hasGoodStructure = h1Count >= 1 && h2Count >= 1;
    criteria.push({
        id: "heading-structure",
        name: "Structure des titres Hn",
        category: "contenu",
        status: hasGoodStructure ? "success" : h2Count > 0 ? "warning" : "error",
        score: hasGoodStructure ? 6 : h2Count > 0 ? 3 : 0,
        maxScore: 6,
        message: `Structure: ${h1Count} H1, ${h2Count} H2, ${h3Count} H3`,
        details: hasGoodStructure
            ? "Hiérarchie correcte H1 > H2 > H3"
            : "Structure de titres à améliorer",
        fix: !hasGoodStructure
            ? "Structurez votre contenu avec des sous-titres H2 et H3"
            : undefined,
    });

    // 6. Images without alt
    const images = $("img");
    let imagesWithoutAlt = 0;
    let totalImages = 0;
    images.each((_, el) => {
        const $img = $(el);
        const width = parseInt($img.attr("width") || "100", 10);
        const height = parseInt($img.attr("height") || "100", 10);
        // Skip tiny images (likely icons/spacers)
        if (width < 50 && height < 50) return;
        totalImages++;
        const alt = $img.attr("alt");
        if (!alt || alt.trim() === "") {
            imagesWithoutAlt++;
        }
    });
    const imgStatus = imagesWithoutAlt === 0 ? "success" : imagesWithoutAlt <= 2 ? "warning" : "error";
    criteria.push({
        id: "images-alt",
        name: "Attributs alt des images",
        category: "accessibilite",
        status: imgStatus,
        score: imgStatus === "success" ? 6 : imgStatus === "warning" ? 3 : 0,
        maxScore: 6,
        message: imagesWithoutAlt === 0
            ? `Toutes les ${totalImages} images ont un attribut alt`
            : `${imagesWithoutAlt}/${totalImages} images sans attribut alt`,
        fix: imgStatus !== "success"
            ? "Ajoutez des descriptions alt pertinentes à toutes vos images"
            : undefined,
    });

    // 7. Mobile-friendly (viewport)
    const hasViewport = $('meta[name="viewport"]').length > 0;
    criteria.push({
        id: "viewport",
        name: "Mobile-friendly (viewport)",
        category: "technique",
        status: hasViewport ? "success" : "error",
        score: hasViewport ? 7 : 0,
        maxScore: 7,
        message: hasViewport
            ? "Balise viewport présente"
            : "Balise viewport manquante",
        details: hasViewport
            ? $('meta[name="viewport"]').attr("content") || ""
            : "Le site n'est pas optimisé pour mobile",
        fix: !hasViewport
            ? 'Ajoutez <meta name="viewport" content="width=device-width, initial-scale=1">'
            : undefined,
    });

    // 8. Page Speed (basic: TTFB + page size)
    const pageSizeKb = Math.round(html.length / 1024);
    const speedStatus = ttfb < 500 && pageSizeKb < 500 ? "success" : ttfb < 1000 && pageSizeKb < 1000 ? "warning" : "error";
    criteria.push({
        id: "speed",
        name: "Vitesse de chargement",
        category: "technique",
        status: speedStatus,
        score: speedStatus === "success" ? 6 : speedStatus === "warning" ? 3 : 0,
        maxScore: 6,
        message: `TTFB: ${ttfb}ms | Taille HTML: ${pageSizeKb}Ko`,
        details: `Temps de réponse serveur: ${ttfb}ms`,
        fix: speedStatus !== "success"
            ? "Optimisez votre serveur et réduisez la taille de vos pages"
            : undefined,
    });

    // 9. Schema JSON-LD
    const jsonLdScripts = $('script[type="application/ld+json"]');
    const schemaTypes: string[] = [];
    jsonLdScripts.each((_, el) => {
        try {
            const content = $(el).html();
            if (content) {
                const parsed = JSON.parse(content);
                if (parsed["@type"]) {
                    schemaTypes.push(parsed["@type"]);
                }
            }
        } catch {
            // Invalid JSON-LD
        }
    });
    const hasSchema = schemaTypes.length > 0;
    criteria.push({
        id: "schema",
        name: "Schema JSON-LD",
        category: "technique",
        status: hasSchema ? "success" : "warning",
        score: hasSchema ? 7 : 0,
        maxScore: 7,
        message: hasSchema
            ? `${schemaTypes.length} schema(s) trouvé(s): ${schemaTypes.join(", ")}`
            : "Aucun schema JSON-LD détecté",
        fix: !hasSchema
            ? "Ajoutez des données structurées avec le générateur Schema JSON-LD"
            : undefined,
    });

    // 10. Sitemap.xml
    let hasSitemap = false;
    try {
        const sitemapResponse = await fetchWithTimeout(`${baseUrl}/sitemap.xml`, 5000);
        hasSitemap = sitemapResponse.ok && sitemapResponse.headers.get("content-type")?.includes("xml") || false;
    } catch {
        hasSitemap = false;
    }
    criteria.push({
        id: "sitemap",
        name: "Sitemap XML",
        category: "technique",
        status: hasSitemap ? "success" : "warning",
        score: hasSitemap ? 5 : 0,
        maxScore: 5,
        message: hasSitemap
            ? "Sitemap.xml accessible"
            : "Sitemap.xml non trouvé",
        fix: !hasSitemap
            ? "Créez et soumettez un sitemap.xml à Google Search Console"
            : undefined,
    });

    // 11. Robots.txt
    let robotsTxt = "";
    let hasRobotsTxt = false;
    let blocksAll = false;
    try {
        const robotsResponse = await fetchWithTimeout(`${baseUrl}/robots.txt`, 5000);
        if (robotsResponse.ok) {
            robotsTxt = await robotsResponse.text();
            hasRobotsTxt = true;
            blocksAll = robotsTxt.toLowerCase().includes("disallow: /") &&
                robotsTxt.toLowerCase().includes("user-agent: *");
        }
    } catch {
        hasRobotsTxt = false;
    }
    criteria.push({
        id: "robots",
        name: "Robots.txt",
        category: "technique",
        status: hasRobotsTxt && !blocksAll ? "success" : hasRobotsTxt && blocksAll ? "error" : "warning",
        score: hasRobotsTxt && !blocksAll ? 5 : 0,
        maxScore: 5,
        message: !hasRobotsTxt
            ? "Robots.txt non trouvé"
            : blocksAll
                ? "Robots.txt bloque tout le site !"
                : "Robots.txt configuré correctement",
        fix: !hasRobotsTxt || blocksAll
            ? "Configurez votre robots.txt avec le générateur"
            : undefined,
    });

    // 12. Text/HTML Ratio
    const textContent = $("body").text().replace(/\s+/g, " ").trim();
    const textLength = textContent.length;
    const htmlLength = html.length;
    const textRatio = Math.round((textLength / htmlLength) * 100);
    const ratioStatus = textRatio >= 25 ? "success" : textRatio >= 15 ? "warning" : "error";
    criteria.push({
        id: "text-ratio",
        name: "Ratio texte/HTML",
        category: "contenu",
        status: ratioStatus,
        score: ratioStatus === "success" ? 5 : ratioStatus === "warning" ? 2 : 0,
        maxScore: 5,
        message: `Ratio texte/HTML: ${textRatio}%`,
        details: textRatio >= 25
            ? "Bon équilibre contenu/code"
            : "Trop de code par rapport au contenu",
        fix: ratioStatus !== "success"
            ? "Ajoutez plus de contenu textuel de qualité"
            : undefined,
    });

    // 13. Open Graph
    const hasOgTitle = $('meta[property="og:title"]').length > 0;
    const hasOgDesc = $('meta[property="og:description"]').length > 0;
    const hasOgImage = $('meta[property="og:image"]').length > 0;
    const ogScore = (hasOgTitle ? 1 : 0) + (hasOgDesc ? 1 : 0) + (hasOgImage ? 1 : 0);
    criteria.push({
        id: "open-graph",
        name: "Open Graph (réseaux sociaux)",
        category: "technique",
        status: ogScore === 3 ? "success" : ogScore >= 1 ? "warning" : "error",
        score: ogScore === 3 ? 5 : ogScore >= 1 ? 2 : 0,
        maxScore: 5,
        message: ogScore === 3
            ? "Balises Open Graph complètes"
            : `${ogScore}/3 balises Open Graph présentes`,
        details: `Title: ${hasOgTitle ? "✓" : "✗"} | Description: ${hasOgDesc ? "✓" : "✗"} | Image: ${hasOgImage ? "✓" : "✗"}`,
        fix: ogScore < 3
            ? "Ajoutez les balises og:title, og:description et og:image"
            : undefined,
    });

    // 14. Twitter Cards
    const hasTwitterCard = $('meta[name="twitter:card"]').length > 0;
    const hasTwitterTitle = $('meta[name="twitter:title"]').length > 0;
    criteria.push({
        id: "twitter-cards",
        name: "Twitter Cards",
        category: "technique",
        status: hasTwitterCard ? "success" : "warning",
        score: hasTwitterCard ? 4 : 0,
        maxScore: 4,
        message: hasTwitterCard
            ? "Twitter Cards configurées"
            : "Twitter Cards manquantes",
        fix: !hasTwitterCard
            ? 'Ajoutez <meta name="twitter:card" content="summary_large_image">'
            : undefined,
    });

    // 15. AI Crawlers (check robots.txt)
    let aiCrawlersAllowed = 0;
    const aiCrawlerResults: string[] = [];
    for (const crawler of AI_CRAWLERS) {
        const isBlocked = robotsTxt.toLowerCase().includes(`user-agent: ${crawler.agent.toLowerCase()}`) &&
            robotsTxt.toLowerCase().includes("disallow: /");
        if (!isBlocked) {
            aiCrawlersAllowed++;
            aiCrawlerResults.push(`${crawler.name}: ✓`);
        } else {
            aiCrawlerResults.push(`${crawler.name}: ✗`);
        }
    }
    criteria.push({
        id: "ai-crawlers",
        name: "Crawlers IA autorisés",
        category: "ia",
        status: aiCrawlersAllowed >= 4 ? "success" : aiCrawlersAllowed >= 2 ? "warning" : "error",
        score: Math.min(aiCrawlersAllowed * 2, 8),
        maxScore: 8,
        message: `${aiCrawlersAllowed}/${AI_CRAWLERS.length} crawlers IA autorisés`,
        details: aiCrawlerResults.join(" | "),
        fix: aiCrawlersAllowed < AI_CRAWLERS.length
            ? "Configurez votre robots.txt pour autoriser les crawlers IA avec le générateur"
            : undefined,
    });

    // Calculate scores by category
    const categoryScores = {
        technique: { score: 0, maxScore: 0 },
        contenu: { score: 0, maxScore: 0 },
        accessibilite: { score: 0, maxScore: 0 },
        ia: { score: 0, maxScore: 0 },
    };

    let totalScore = 0;
    let totalMaxScore = 0;

    for (const c of criteria) {
        categoryScores[c.category].score += c.score;
        categoryScores[c.category].maxScore += c.maxScore;
        totalScore += c.score;
        totalMaxScore += c.maxScore;
    }

    const result: AuditResult = {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        score: Math.round((totalScore / totalMaxScore) * 100),
        maxScore: 100,
        categories: categoryScores,
        criteria,
        pageTitle,
        pageDescription,
    };

    return result;
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte. Réessayez dans 1 heure (max 5 audits/heure)." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { url } = body;

        if (!url || typeof url !== "string") {
            return NextResponse.json(
                { error: "URL requise" },
                { status: 400 }
            );
        }

        // Check cache
        const cached = getCachedResult(url);
        if (cached) {
            return NextResponse.json({ ...cached, cached: true });
        }

        // Perform audit
        const result = await analyzeURL(url);

        // Cache result
        setCachedResult(url, result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Audit error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse. Vérifiez l'URL." },
            { status: 500 }
        );
    }
}
