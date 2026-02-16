import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: VisibilityResult; expiry: number }>();

const RATE_LIMIT = 10; // 10 requêtes/minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const CACHE_TTL = 60 * 60 * 1000; // 1 heure

// AI Crawlers
const AI_CRAWLERS = [
    { name: "GPTBot", agent: "GPTBot", description: "Entraînement modèles", company: "OpenAI", critical: true },
    { name: "ChatGPT-User", agent: "ChatGPT-User", description: "Navigation temps réel", company: "OpenAI", critical: true },
    { name: "OAI-SearchBot", agent: "OAI-SearchBot", description: "Recherche OpenAI", company: "OpenAI", critical: true },
    { name: "Claude-Web", agent: "Claude-Web", description: "Assistant Claude", company: "Anthropic", critical: true },
    { name: "PerplexityBot", agent: "PerplexityBot", description: "Moteur de recherche IA", company: "Perplexity", critical: true },
    { name: "Google-Extended", agent: "Google-Extended", description: "Entraînement Gemini", company: "Google", critical: false },
    { name: "Bytespider", agent: "Bytespider", description: "TikTok / Doubao", company: "ByteDance", critical: false },
    { name: "CCBot", agent: "CCBot", description: "Common Crawl", company: "Common Crawl", critical: false },
];

const VALUABLE_SCHEMAS = ["LocalBusiness", "Organization", "FAQPage", "HowTo", "Article", "BlogPosting", "Person", "Product", "Service", "BreadcrumbList", "WebSite", "Review", "AggregateRating"];

interface CrawlerStatus {
    name: string;
    agent: string;
    description: string;
    company: string;
    status: "allowed" | "blocked" | "not_mentioned";
    critical: boolean;
}

interface CheckItem {
    label: string;
    status: "success" | "warning" | "error";
    detail: string;
    points: number;
    maxPoints: number;
    fixUrl?: string;
    fixLabel?: string;
}

interface CategoryScore {
    score: number;
    maxScore: number;
    checks: CheckItem[];
}

interface VisibilityResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    level: "invisible" | "partial" | "visible" | "excellent";
    levelLabel: string;
    categories: {
        accessibilite: CategoryScore;
        semantique: CategoryScore;
        eeat: CategoryScore;
        format: CategoryScore;
    };
    crawlers: CrawlerStatus[];
    recommendations: { text: string; fixUrl?: string; fixLabel?: string; priority: number }[];
    pageTitle: string;
    metaDescription: string;
    wordCount: number;
    responseTime: number;
    hasLlmsTxt: boolean;
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
    if (cached && Date.now() < cached.expiry) return { ...cached.data, cached: true };
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
                "User-Agent": "INDHACK-GEO-Checker/2.0 (+https://indhack.com/outils/testeur-visibilite-ia)",
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

function parseCrawlerStatus(robotsTxt: string, agent: string): "allowed" | "blocked" | "not_mentioned" {
    if (!robotsTxt) return "not_mentioned";

    const lines = robotsTxt.toLowerCase().split("\n");
    const agentLower = agent.toLowerCase();
    let currentUserAgent = "";
    let explicitlyMentioned = false;
    let isBlockedByWildcard = false;
    let isAllowedByWildcard = true;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("user-agent:")) {
            currentUserAgent = trimmed.replace("user-agent:", "").trim();
        } else if (currentUserAgent === agentLower) {
            explicitlyMentioned = true;
            if (trimmed.startsWith("disallow:")) {
                const path = trimmed.replace("disallow:", "").trim();
                if (path === "/" || path === "/*") return "blocked";
            } else if (trimmed.startsWith("allow:")) {
                return "allowed";
            }
        } else if (currentUserAgent === "*") {
            if (trimmed.startsWith("disallow:")) {
                const path = trimmed.replace("disallow:", "").trim();
                if (path === "/" || path === "/*") {
                    isBlockedByWildcard = true;
                    isAllowedByWildcard = false;
                }
            }
        }
    }

    if (explicitlyMentioned) return "allowed"; // Mentioned but not blocked
    if (isBlockedByWildcard) return "blocked";
    return "not_mentioned";
}

function countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
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
    const responseTime = Date.now() - startTime;
    const html = await response.text();
    const $ = cheerio.load(html);

    const pageTitle = $("title").text().trim() || "Sans titre";
    const metaDescription = $('meta[name="description"]').attr("content") || "";
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = countWords(bodyText);

    // Fetch robots.txt
    let robotsTxt = "";
    let hasSitemapInRobots = false;
    try {
        const robotsResponse = await fetchWithTimeout(`${baseUrl}/robots.txt`, 5000);
        if (robotsResponse.ok) {
            robotsTxt = await robotsResponse.text();
            hasSitemapInRobots = robotsTxt.toLowerCase().includes("sitemap:");
        }
    } catch {
        robotsTxt = "";
    }

    // Check llms.txt
    let hasLlmsTxt = false;
    try {
        const llmsResponse = await fetchWithTimeout(`${baseUrl}/llms.txt`, 3000);
        hasLlmsTxt = llmsResponse.ok;
    } catch {
        hasLlmsTxt = false;
    }

    // Check sitemap.xml
    let hasSitemapXml = false;
    try {
        const sitemapResponse = await fetchWithTimeout(`${baseUrl}/sitemap.xml`, 3000);
        hasSitemapXml = sitemapResponse.ok;
    } catch {
        hasSitemapXml = false;
    }

    // Initialize categories
    const categories: VisibilityResult["categories"] = {
        accessibilite: { score: 0, maxScore: 30, checks: [] },
        semantique: { score: 0, maxScore: 30, checks: [] },
        eeat: { score: 0, maxScore: 20, checks: [] },
        format: { score: 0, maxScore: 20, checks: [] },
    };

    const recommendations: VisibilityResult["recommendations"] = [];

    // ========== 1. ACCESSIBILITÉ IA (/30) ==========
    const crawlers: CrawlerStatus[] = AI_CRAWLERS.map(crawler => ({
        ...crawler,
        status: parseCrawlerStatus(robotsTxt, crawler.agent),
    }));

    const allowedCrawlers = crawlers.filter(c => c.status === "allowed" || c.status === "not_mentioned").length;
    const blockedCrawlers = crawlers.filter(c => c.status === "blocked").length;
    const criticalBlocked = crawlers.filter(c => c.status === "blocked" && c.critical).length;

    // Crawler score (max 14 pts)
    let crawlerPoints = 0;
    if (blockedCrawlers === 0) {
        crawlerPoints = 14;
    } else if (criticalBlocked === 0) {
        crawlerPoints = 10;
    } else if (criticalBlocked <= 2) {
        crawlerPoints = 6;
    } else {
        crawlerPoints = 2;
    }
    categories.accessibilite.score += crawlerPoints;
    categories.accessibilite.checks.push({
        label: "Crawlers IA",
        status: blockedCrawlers === 0 ? "success" : criticalBlocked > 0 ? "error" : "warning",
        detail: `${allowedCrawlers}/${AI_CRAWLERS.length} autorisés${blockedCrawlers > 0 ? ` (${blockedCrawlers} bloqués)` : ""}`,
        points: crawlerPoints,
        maxPoints: 14,
        fixUrl: blockedCrawlers > 0 ? "/outils/generateur-robots-txt" : undefined,
        fixLabel: blockedCrawlers > 0 ? "Configurer robots.txt" : undefined,
    });

    if (criticalBlocked > 0) {
        recommendations.push({
            text: `${criticalBlocked} crawler(s) IA critique(s) bloqué(s) : vos contenus ne seront pas indexés par ces IA`,
            fixUrl: "/outils/generateur-robots-txt",
            fixLabel: "Générateur robots.txt",
            priority: 1,
        });
    }

    // Sitemap (5 pts)
    const hasSitemap = hasSitemapXml || hasSitemapInRobots;
    const sitemapPoints = hasSitemap ? 5 : 0;
    categories.accessibilite.score += sitemapPoints;
    categories.accessibilite.checks.push({
        label: "Sitemap",
        status: hasSitemap ? "success" : "error",
        detail: hasSitemap ? "Sitemap XML accessible" : "Aucun sitemap détecté",
        points: sitemapPoints,
        maxPoints: 5,
    });
    if (!hasSitemap) {
        recommendations.push({ text: "Créez un sitemap.xml pour faciliter l'indexation", priority: 3 });
    }

    // Response time (6 pts)
    let ttfbPoints = 0;
    let ttfbStatus: CheckItem["status"] = "error";
    if (responseTime < 500) {
        ttfbPoints = 6;
        ttfbStatus = "success";
    } else if (responseTime < 1500) {
        ttfbPoints = 3;
        ttfbStatus = "warning";
    }
    categories.accessibilite.score += ttfbPoints;
    categories.accessibilite.checks.push({
        label: "Temps de réponse",
        status: ttfbStatus,
        detail: `${responseTime}ms${responseTime < 500 ? " (rapide)" : responseTime < 1500 ? " (correct)" : " (lent)"}`,
        points: ttfbPoints,
        maxPoints: 6,
    });

    // llms.txt (5 pts bonus)
    const llmsPoints = hasLlmsTxt ? 5 : 0;
    categories.accessibilite.score += llmsPoints;
    categories.accessibilite.checks.push({
        label: "Fichier llms.txt",
        status: hasLlmsTxt ? "success" : "warning",
        detail: hasLlmsTxt ? "Présent (excellent pour les LLM)" : "Non détecté (optionnel mais recommandé)",
        points: llmsPoints,
        maxPoints: 5,
    });

    // ========== 2. RICHESSE SÉMANTIQUE (/30) ==========

    // JSON-LD Schema (12 pts)
    const jsonLdScripts = $('script[type="application/ld+json"]');
    const schemaTypes: string[] = [];

    jsonLdScripts.each((_, el) => {
        try {
            const content = $(el).html();
            if (content) {
                const parsed = JSON.parse(content);
                const extractTypes = (obj: unknown): void => {
                    if (typeof obj === 'object' && obj !== null) {
                        if ('@type' in obj) {
                            const type = (obj as Record<string, unknown>)['@type'];
                            if (Array.isArray(type)) schemaTypes.push(...type.map(String));
                            else if (typeof type === 'string') schemaTypes.push(type);
                        }
                        if ('@graph' in obj && Array.isArray((obj as Record<string, unknown>)['@graph'])) {
                            ((obj as Record<string, unknown>)['@graph'] as unknown[]).forEach(extractTypes);
                        }
                    }
                };
                extractTypes(parsed);
            }
        } catch { /* Invalid JSON-LD */ }
    });

    const uniqueSchemas = Array.from(new Set(schemaTypes));
    const valuableSchemaCount = uniqueSchemas.filter(t => VALUABLE_SCHEMAS.includes(t)).length;

    let schemaPoints = 0;
    let schemaStatus: CheckItem["status"] = "error";
    if (valuableSchemaCount >= 3) {
        schemaPoints = 12;
        schemaStatus = "success";
    } else if (valuableSchemaCount >= 1) {
        schemaPoints = 7;
        schemaStatus = "warning";
    } else if (uniqueSchemas.length > 0) {
        schemaPoints = 3;
        schemaStatus = "warning";
    }
    categories.semantique.score += schemaPoints;
    categories.semantique.checks.push({
        label: "Schema JSON-LD",
        status: schemaStatus,
        detail: uniqueSchemas.length > 0 ? uniqueSchemas.join(", ") : "Aucun schema détecté",
        points: schemaPoints,
        maxPoints: 12,
        fixUrl: schemaPoints < 12 ? "/outils/generateur-schema-json-ld" : undefined,
        fixLabel: schemaPoints < 12 ? "Générer des schemas" : undefined,
    });
    if (schemaPoints === 0) {
        recommendations.push({
            text: "Ajoutez des données structurées JSON-LD (Organization, FAQPage, LocalBusiness...)",
            fixUrl: "/outils/generateur-schema-json-ld",
            fixLabel: "Générateur Schema JSON-LD",
            priority: 1,
        });
    }

    // FAQ (8 pts)
    const hasFaqSchema = uniqueSchemas.includes("FAQPage");
    const hasFaqHtml = $("details").length >= 2 || $("[itemtype*='Question']").length > 0 || $("dt").length >= 2;

    let faqPoints = 0;
    let faqStatus: CheckItem["status"] = "error";
    if (hasFaqSchema) {
        faqPoints = 8;
        faqStatus = "success";
    } else if (hasFaqHtml) {
        faqPoints = 4;
        faqStatus = "warning";
    }
    categories.semantique.score += faqPoints;
    categories.semantique.checks.push({
        label: "FAQ structurée",
        status: faqStatus,
        detail: hasFaqSchema ? "FAQ avec schema FAQPage" : hasFaqHtml ? "FAQ HTML (sans schema)" : "Pas de FAQ",
        points: faqPoints,
        maxPoints: 8,
    });

    // Headings (5 pts)
    const h1Count = $("h1").length;
    const h2Count = $("h2").length;
    const h3Count = $("h3").length;

    let headingPoints = 0;
    let headingStatus: CheckItem["status"] = "error";
    if (h1Count === 1 && h2Count >= 3) {
        headingPoints = 5;
        headingStatus = "success";
    } else if (h1Count === 1 && h2Count >= 1) {
        headingPoints = 3;
        headingStatus = "warning";
    } else if (h1Count >= 1) {
        headingPoints = 1;
        headingStatus = "warning";
    }
    categories.semantique.score += headingPoints;
    categories.semantique.checks.push({
        label: "Hiérarchie titres",
        status: headingStatus,
        detail: `${h1Count} H1, ${h2Count} H2, ${h3Count} H3`,
        points: headingPoints,
        maxPoints: 5,
    });

    // Lists & Tables (5 pts)
    const listsCount = $("ul, ol").length;
    const tablesCount = $("table").length;

    let structurePoints = 0;
    if (listsCount >= 3 || tablesCount >= 1) {
        structurePoints = 5;
    } else if (listsCount >= 1) {
        structurePoints = 2;
    }
    categories.semantique.score += structurePoints;
    categories.semantique.checks.push({
        label: "Listes & tableaux",
        status: structurePoints >= 5 ? "success" : structurePoints > 0 ? "warning" : "error",
        detail: `${listsCount} listes, ${tablesCount} tableaux`,
        points: structurePoints,
        maxPoints: 5,
    });

    // ========== 3. SIGNAUX E-E-A-T (/20) ==========

    // About page (4 pts)
    const hasAboutLink = $('a[href*="propos"], a[href*="about"], a[href*="qui-sommes"], a[href*="notre-histoire"]').length > 0;
    const aboutPoints = hasAboutLink ? 4 : 0;
    categories.eeat.score += aboutPoints;
    categories.eeat.checks.push({
        label: "Page À propos",
        status: hasAboutLink ? "success" : "error",
        detail: hasAboutLink ? "Lien détecté" : "Aucun lien vers une page À propos",
        points: aboutPoints,
        maxPoints: 4,
    });

    // Author (4 pts)
    const hasAuthor = $("[rel='author'], .author, [itemprop='author'], meta[name='author'], .author-name, .byline").length > 0 ||
                      uniqueSchemas.includes("Person");
    const authorPoints = hasAuthor ? 4 : 0;
    categories.eeat.score += authorPoints;
    categories.eeat.checks.push({
        label: "Auteur identifié",
        status: hasAuthor ? "success" : "warning",
        detail: hasAuthor ? "Auteur identifié" : "Pas d'auteur visible",
        points: authorPoints,
        maxPoints: 4,
    });

    // Social links (3 pts)
    const hasSocialLinks = $('a[href*="linkedin.com"], a[href*="twitter.com"], a[href*="x.com"], a[href*="facebook.com"], a[href*="instagram.com"], a[href*="youtube.com"]').length > 0;
    const socialPoints = hasSocialLinks ? 3 : 0;
    categories.eeat.score += socialPoints;
    categories.eeat.checks.push({
        label: "Réseaux sociaux",
        status: hasSocialLinks ? "success" : "warning",
        detail: hasSocialLinks ? "Liens présents" : "Pas de liens sociaux",
        points: socialPoints,
        maxPoints: 3,
    });

    // Contact (4 pts)
    const hasContactLink = $('a[href*="contact"]').length > 0;
    const hasPhone = $('a[href^="tel:"]').length > 0 || /(\+33|0[1-9])[\s.-]?(\d{2}[\s.-]?){4}/.test(bodyText);
    const hasEmail = $('a[href^="mailto:"]').length > 0;
    const contactScore = (hasContactLink ? 2 : 0) + (hasPhone || hasEmail ? 2 : 0);
    categories.eeat.score += contactScore;
    categories.eeat.checks.push({
        label: "Contact visible",
        status: contactScore >= 4 ? "success" : contactScore > 0 ? "warning" : "error",
        detail: `${hasContactLink ? "Page contact" : ""}${hasPhone ? " + Téléphone" : ""}${hasEmail ? " + Email" : ""}`.trim() || "Pas de contact visible",
        points: contactScore,
        maxPoints: 4,
    });

    // Legal pages (5 pts)
    const hasLegal = $('a[href*="mentions-legales"], a[href*="legal"], a[href*="mentions"]').length > 0;
    const hasPrivacy = $('a[href*="confidentialite"], a[href*="privacy"], a[href*="rgpd"], a[href*="donnees"]').length > 0;
    const hasCgv = $('a[href*="cgv"], a[href*="cgu"], a[href*="conditions"]').length > 0;
    const legalCount = (hasLegal ? 1 : 0) + (hasPrivacy ? 1 : 0) + (hasCgv ? 1 : 0);
    const legalPoints = Math.min(legalCount * 2, 5);
    categories.eeat.score += legalPoints;
    categories.eeat.checks.push({
        label: "Pages légales",
        status: legalCount >= 2 ? "success" : legalCount > 0 ? "warning" : "error",
        detail: `${hasLegal ? "Mentions légales" : ""}${hasPrivacy ? " + Confidentialité" : ""}${hasCgv ? " + CGV" : ""}`.trim() || "Aucune page légale",
        points: legalPoints,
        maxPoints: 5,
    });

    // ========== 4. FORMAT IA-FRIENDLY (/20) ==========

    // Word count (6 pts)
    let wordPoints = 0;
    let wordStatus: CheckItem["status"] = "error";
    let wordDetail = "";
    if (wordCount >= 1500) {
        wordPoints = 6;
        wordStatus = "success";
        wordDetail = `${wordCount} mots (excellent)`;
    } else if (wordCount >= 800) {
        wordPoints = 4;
        wordStatus = "success";
        wordDetail = `${wordCount} mots (bon)`;
    } else if (wordCount >= 300) {
        wordPoints = 2;
        wordStatus = "warning";
        wordDetail = `${wordCount} mots (moyen)`;
    } else {
        wordDetail = `${wordCount} mots (insuffisant)`;
    }
    categories.format.score += wordPoints;
    categories.format.checks.push({
        label: "Longueur contenu",
        status: wordStatus,
        detail: wordDetail,
        points: wordPoints,
        maxPoints: 6,
    });
    if (wordCount < 300) {
        recommendations.push({ text: "Enrichissez votre contenu (minimum 300 mots, idéalement 800+)", priority: 2 });
    }

    // Numbers & data (4 pts)
    const hasNumbers = /\d+\s?%|\d+\s?€|\d+\s?(ans|jours|heures|clients|projets|utilisateurs)/i.test(bodyText);
    const numberPoints = hasNumbers ? 4 : 0;
    categories.format.score += numberPoints;
    categories.format.checks.push({
        label: "Données chiffrées",
        status: hasNumbers ? "success" : "warning",
        detail: hasNumbers ? "Statistiques détectées" : "Pas de données chiffrées",
        points: numberPoints,
        maxPoints: 4,
    });

    // Meta title (3 pts)
    const titleLength = pageTitle.length;
    let titlePoints = 0;
    let titleStatus: CheckItem["status"] = "error";
    if (titleLength >= 30 && titleLength <= 60) {
        titlePoints = 3;
        titleStatus = "success";
    } else if (titleLength > 0 && titleLength < 70) {
        titlePoints = 2;
        titleStatus = "warning";
    }
    categories.format.score += titlePoints;
    categories.format.checks.push({
        label: "Meta title",
        status: titleStatus,
        detail: `${titleLength} caractères${titleLength < 30 ? " (trop court)" : titleLength > 60 ? " (trop long)" : " (optimal)"}`,
        points: titlePoints,
        maxPoints: 3,
    });

    // Meta description (3 pts)
    const descLength = metaDescription.length;
    let descPoints = 0;
    let descStatus: CheckItem["status"] = "error";
    if (descLength >= 120 && descLength <= 160) {
        descPoints = 3;
        descStatus = "success";
    } else if (descLength >= 70) {
        descPoints = 2;
        descStatus = "warning";
    } else if (descLength > 0) {
        descPoints = 1;
        descStatus = "warning";
    }
    categories.format.score += descPoints;
    categories.format.checks.push({
        label: "Meta description",
        status: descStatus,
        detail: descLength > 0 ? `${descLength} caractères` : "Absente",
        points: descPoints,
        maxPoints: 3,
    });

    // Canonical (2 pts)
    const hasCanonical = $('link[rel="canonical"]').length > 0;
    const canonicalPoints = hasCanonical ? 2 : 0;
    categories.format.score += canonicalPoints;
    categories.format.checks.push({
        label: "Balise canonical",
        status: hasCanonical ? "success" : "warning",
        detail: hasCanonical ? "Présente" : "Absente",
        points: canonicalPoints,
        maxPoints: 2,
    });

    // Image alt (2 pts)
    const images = $("img").slice(0, 10);
    let imagesWithAlt = 0;
    let totalImages = images.length;
    images.each((_, el) => {
        const alt = $(el).attr("alt");
        if (alt && alt.trim().length > 0) imagesWithAlt++;
    });

    let altPoints = 0;
    let altStatus: CheckItem["status"] = "error";
    if (totalImages === 0) {
        altPoints = 2;
        altStatus = "success";
    } else if (imagesWithAlt === totalImages) {
        altPoints = 2;
        altStatus = "success";
    } else if (imagesWithAlt >= totalImages / 2) {
        altPoints = 1;
        altStatus = "warning";
    }
    categories.format.score += altPoints;
    categories.format.checks.push({
        label: "Alt images",
        status: altStatus,
        detail: totalImages > 0 ? `${imagesWithAlt}/${totalImages} avec alt` : "Pas d'images",
        points: altPoints,
        maxPoints: 2,
    });

    // Calculate total score
    const totalScore = categories.accessibilite.score +
        categories.semantique.score +
        categories.eeat.score +
        categories.format.score;

    // Determine level
    let level: VisibilityResult["level"];
    let levelLabel: string;

    if (totalScore >= 90) {
        level = "excellent";
        levelLabel = "Excellent — Prêt pour le GEO";
    } else if (totalScore >= 70) {
        level = "visible";
        levelLabel = "Bonne visibilité IA";
    } else if (totalScore >= 40) {
        level = "partial";
        levelLabel = "Partiellement visible";
    } else {
        level = "invisible";
        levelLabel = "Invisible pour les IA";
    }

    // Sort recommendations by priority
    recommendations.sort((a, b) => a.priority - b.priority);

    return {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        score: totalScore,
        maxScore: 100,
        level,
        levelLabel,
        categories,
        crawlers,
        recommendations: recommendations.slice(0, 5),
        pageTitle,
        metaDescription,
        wordCount,
        responseTime,
        hasLlmsTxt,
    };
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte (10 tests/minute). Réessayez dans 1 minute." },
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
            return NextResponse.json(cached);
        }

        const result = await analyzeVisibility(url);
        setCachedResult(url, result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("GEO Visibility test error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse. Vérifiez l'URL." },
            { status: 500 }
        );
    }
}
