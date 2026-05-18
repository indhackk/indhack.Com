import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { saveRapport, type RapportData } from "@/lib/rapports";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: VisibilityResult; expiry: number }>();

const RATE_LIMIT = 10; // 10 requêtes/minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const CACHE_TTL = 60 * 60 * 1000; // 1 heure

// AI Crawlers
const AI_CRAWLERS = [
    { name: "MistralBot", agent: "MistralBot", description: "Entraînement Mistral", company: "Mistral AI", critical: false },
    { name: "GPTBot", agent: "GPTBot", description: "Entraînement modèles", company: "OpenAI", critical: true },
    { name: "ChatGPT-User", agent: "ChatGPT-User", description: "Navigation temps réel", company: "OpenAI", critical: true },
    { name: "OAI-SearchBot", agent: "OAI-SearchBot", description: "Recherche OpenAI", company: "OpenAI", critical: true },
    { name: "Claude-Web", agent: "Claude-Web", description: "Assistant Claude", company: "Anthropic", critical: true },
    { name: "PerplexityBot", agent: "PerplexityBot", description: "Moteur de recherche IA", company: "Perplexity", critical: true },
    { name: "Google-Extended", agent: "Google-Extended", description: "Entraînement Gemini", company: "Google", critical: false },
    { name: "Bytespider", agent: "Bytespider", description: "TikTok / Doubao", company: "ByteDance", critical: false },
    { name: "CCBot", agent: "CCBot", description: "Common Crawl", company: "Common Crawl", critical: false },
];

// AI crawler user-agents for X-Robots-Tag and meta detection
const AI_CRAWLER_AGENTS = ["gptbot", "chatgpt-user", "oai-searchbot", "claude-web", "perplexitybot", "google-extended", "bytespider", "ccbot", "anthropic-ai", "cohere-ai"];

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

interface LlmsTxtInfo {
    exists: boolean;
    isValid: boolean;
    hasFullVersion: boolean;
    projectName?: string;
}

interface XRobotsTagInfo {
    hasAiBlocking: boolean;
    blockedAgents: string[];
}

interface MetaRobotsIaInfo {
    hasAiBlocking: boolean;
    blockedAgents: string[];
}

interface CitabilityInfo {
    statsCount: number;
    hasDefinitions: boolean;
    listsCount: number;
    tablesCount: number;
    score: number; // 0-100
}

interface FreshnessInfo {
    hasDate: boolean;
    date?: string;
    ageMonths?: number;
    source?: string;
}

interface QAStructureInfo {
    questionHeadingsCount: number;
    totalH2H3: number;
}

interface OGSignalsInfo {
    count: number;
    present: string[];
    missing: string[];
}

interface HeadingDepthInfo {
    hasProperStructure: boolean;
    hasSkips: boolean;
    h1Count: number;
    h2Count: number;
    h3Count: number;
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
    llmsTxtInfo?: LlmsTxtInfo;
    xRobotsTagInfo?: XRobotsTagInfo;
    metaRobotsIaInfo?: MetaRobotsIaInfo;
    citabilityInfo?: CitabilityInfo;
    freshnessInfo?: FreshnessInfo;
    qaStructureInfo?: QAStructureInfo;
    ogSignalsInfo?: OGSignalsInfo;
    headingDepthInfo?: HeadingDepthInfo;
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

interface FetchResult {
    response: Response;
    headers: Headers;
}

async function fetchWithTimeout(url: string, timeout = 15000): Promise<FetchResult> {
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
        return { response, headers: response.headers };
    } catch (err) {
        clearTimeout(timeoutId);
        let hostname = url;
        try { hostname = new URL(url).hostname; } catch { /* keep raw url */ }
        if (err instanceof Error && err.name === "AbortError") {
            throw new Error(`Le site ${hostname} ne répond pas (timeout de ${timeout / 1000}s). Vérifiez que l'URL est correcte.`);
        }
        throw new Error(`Impossible de joindre ${hostname}. Vérifiez que le site est accessible.`);
    }
}

// Check llms.txt validity (should start with # and project name)
function validateLlmsTxt(content: string): { isValid: boolean; projectName?: string } {
    if (!content || content.trim().length === 0) return { isValid: false };
    const lines = content.trim().split("\n");
    const firstLine = lines[0].trim();
    // Valid llms.txt starts with # followed by project name
    if (firstLine.startsWith("# ") && firstLine.length > 2) {
        return { isValid: true, projectName: firstLine.substring(2).trim() };
    }
    // Also accept markdown with any heading
    if (firstLine.startsWith("#")) {
        return { isValid: true, projectName: firstLine.replace(/^#+\s*/, "").trim() };
    }
    return { isValid: false };
}

// Parse X-Robots-Tag headers for AI blocking
function parseXRobotsTag(headers: Headers): XRobotsTagInfo {
    const result: XRobotsTagInfo = { hasAiBlocking: false, blockedAgents: [] };

    // Check all headers (some servers send multiple X-Robots-Tag)
    const xRobotsTag = headers.get("x-robots-tag");
    if (!xRobotsTag) return result;

    const directives = xRobotsTag.toLowerCase();

    for (const agent of AI_CRAWLER_AGENTS) {
        // Check for agent-specific blocking like "GPTBot: noindex" or "noindex, nofollow" for all
        if (directives.includes(agent) && (directives.includes("noindex") || directives.includes("nofollow"))) {
            result.hasAiBlocking = true;
            result.blockedAgents.push(agent);
        }
    }

    // Also check for global noindex that would affect all
    if ((directives.includes("noindex") || directives.includes("none")) && !directives.includes(":")) {
        result.hasAiBlocking = true;
        result.blockedAgents = ["all"];
    }

    return result;
}

// Parse meta robots tags for AI-specific blocking
function parseMetaRobotsIa($: cheerio.CheerioAPI): MetaRobotsIaInfo {
    const result: MetaRobotsIaInfo = { hasAiBlocking: false, blockedAgents: [] };

    for (const agent of AI_CRAWLER_AGENTS) {
        const metaTag = $(`meta[name="${agent}" i], meta[name="${agent.toLowerCase()}" i]`);
        if (metaTag.length > 0) {
            const content = metaTag.attr("content")?.toLowerCase() || "";
            if (content.includes("noindex") || content.includes("nofollow") || content.includes("none")) {
                result.hasAiBlocking = true;
                result.blockedAgents.push(agent);
            }
        }
    }

    return result;
}

// Calculate citability score
function calculateCitability($: cheerio.CheerioAPI, bodyText: string): CitabilityInfo {
    // Count statistics/numbers patterns
    const statsPatterns = [
        /\d+\s?%/g,                           // Percentages: 53%, 53 %
        /\d{1,3}(?:[\s,]\d{3})+/g,            // Large numbers: 1 000, 10,000
        /\d+\s?(millions?|milliards?|milliers?)/gi, // Millions, milliards
        /\d+\s?(€|EUR|USD|\$)/g,              // Currency
        /\d+\s?(ans?|jours?|heures?|mois)/gi, // Time periods
        /\d+\s?(clients?|utilisateurs?|projets?|sites?)/gi, // Metrics
        /(?:en|depuis|de)\s+\d{4}/gi,         // Years: en 2024, depuis 2020
        /\d+x|\d+\s?fois/gi,                  // Multipliers: 3x, 3 fois
    ];

    let statsCount = 0;
    for (const pattern of statsPatterns) {
        const matches = bodyText.match(pattern);
        if (matches) statsCount += matches.length;
    }

    // Check for definitions (patterns like "X est...", "On appelle X...")
    const definitionPatterns = [
        /(?:est|sont|désigne|signifie|correspond à|consiste à)\s+(?:un|une|le|la|les|l')/gi,
        /on\s+(?:appelle|définit|nomme|désigne)/gi,
        /(?:définition|qu'est-ce que|c'est quoi)/gi,
    ];

    let hasDefinitions = false;
    for (const pattern of definitionPatterns) {
        if (pattern.test(bodyText)) {
            hasDefinitions = true;
            break;
        }
    }

    // Count lists and tables
    const listsCount = $("ul, ol").length;
    const tablesCount = $("table").length;

    // Calculate score (0-100)
    let score = 0;
    score += Math.min(statsCount * 5, 40);      // Up to 40 points for stats (8+ stats = max)
    score += hasDefinitions ? 20 : 0;            // 20 points for definitions
    score += Math.min(listsCount * 5, 20);       // Up to 20 points for lists (4+ = max)
    score += Math.min(tablesCount * 10, 20);     // Up to 20 points for tables (2+ = max)

    return {
        statsCount,
        hasDefinitions,
        listsCount,
        tablesCount,
        score: Math.min(score, 100),
    };
}

// Check content freshness from various date sources
function checkFreshness($: cheerio.CheerioAPI, headers: Headers): FreshnessInfo {
    const result: FreshnessInfo = { hasDate: false };

    // Try multiple date sources
    const dateSources = [
        // Meta tags
        () => $('meta[property="article:modified_time"]').attr("content"),
        () => $('meta[property="article:published_time"]').attr("content"),
        () => $('meta[name="date"]').attr("content"),
        () => $('meta[name="DC.date"]').attr("content"),
        () => $('meta[property="og:updated_time"]').attr("content"),
        // Time element
        () => $("time[datetime]").first().attr("datetime"),
        () => $("time").first().text(),
        // Schema.org
        () => $('[itemprop="dateModified"]').attr("content") || $('[itemprop="dateModified"]').text(),
        () => $('[itemprop="datePublished"]').attr("content") || $('[itemprop="datePublished"]').text(),
    ];

    let dateStr: string | undefined;
    let source = "";

    for (const getDate of dateSources) {
        const val = getDate();
        if (val && val.length > 6) {
            dateStr = val;
            source = "meta/html";
            break;
        }
    }

    // Check Last-Modified header
    if (!dateStr) {
        const lastMod = headers.get("last-modified");
        if (lastMod) {
            dateStr = lastMod;
            source = "header";
        }
    }

    // Try to parse text patterns in body
    if (!dateStr) {
        const bodyText = $("body").text();
        const patterns = [
            /(?:mis à jour|modifié|publié|updated|published)\s*(?:le|:)?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i,
            /(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4})/i,
        ];
        for (const pattern of patterns) {
            const match = bodyText.match(pattern);
            if (match) {
                dateStr = match[1];
                source = "text";
                break;
            }
        }
    }

    if (dateStr) {
        result.hasDate = true;
        result.date = dateStr;
        result.source = source;

        // Try to calculate age
        try {
            const parsed = new Date(dateStr);
            if (!isNaN(parsed.getTime())) {
                const now = new Date();
                const diffMs = now.getTime() - parsed.getTime();
                result.ageMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
            }
        } catch {
            // Date parsing failed
        }
    }

    return result;
}

// Check Q&A structure in headings
function checkQAStructure($: cheerio.CheerioAPI): QAStructureInfo {
    const h2h3 = $("h2, h3");
    let questionCount = 0;

    const questionWords = /^(comment|pourquoi|quand|quel|quelle|quels|quelles|combien|où|est-ce|what|how|why|when|which|who|can|do|does|is|are|should)/i;

    h2h3.each((_, el) => {
        const text = $(el).text().trim();
        if (questionWords.test(text) || text.endsWith("?")) {
            questionCount++;
        }
    });

    return {
        questionHeadingsCount: questionCount,
        totalH2H3: h2h3.length,
    };
}

// Check Open Graph signals
function checkOGSignals($: cheerio.CheerioAPI): OGSignalsInfo {
    const ogTags = ["og:title", "og:description", "og:image", "og:type", "og:url"];
    const twitterTags = ["twitter:card", "twitter:title"];
    const allTags = [...ogTags, ...twitterTags];

    const present: string[] = [];
    const missing: string[] = [];

    for (const tag of allTags) {
        const selector = tag.startsWith("twitter:")
            ? `meta[name="${tag}"]`
            : `meta[property="${tag}"]`;
        if ($(selector).length > 0) {
            present.push(tag);
        } else {
            missing.push(tag);
        }
    }

    return {
        count: present.length,
        present,
        missing,
    };
}

// Check heading depth and structure
function checkHeadingDepth($: cheerio.CheerioAPI): HeadingDepthInfo {
    const h1 = $("h1").length;
    const h2 = $("h2").length;
    const h3 = $("h3").length;
    const h4 = $("h4").length;

    // Check for heading skips (H1 -> H3 without H2, etc.)
    let hasSkips = false;
    const headings = $("h1, h2, h3, h4, h5, h6");
    let lastLevel = 0;

    headings.each((_, el) => {
        const tagName = $(el).prop("tagName")?.toLowerCase();
        if (tagName) {
            const level = parseInt(tagName.replace("h", ""));
            if (lastLevel > 0 && level > lastLevel + 1) {
                hasSkips = true;
            }
            lastLevel = level;
        }
    });

    const hasProperStructure = h1 === 1 && h2 >= 2 && h3 >= 1 && !hasSkips;

    return {
        hasProperStructure,
        hasSkips,
        h1Count: h1,
        h2Count: h2,
        h3Count: h3,
    };
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

/**
 * Valide qu'une string représente une URL http/https atteignable de l'extérieur.
 * Renvoie l'URL normalisée (avec https:// préfixé si besoin) ou null si invalide.
 *
 * Doit être appelée AVANT toute analyse pour éviter qu'une URL bidon
 * ("not-a-url", "javascript:alert", "ftp://...") ne fasse planter la route
 * en 500. À la place : 400 propre côté caller.
 */
function validatePublicUrl(input: unknown): string | null {
    if (typeof input !== "string") return null;
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Préfixe https si l'utilisateur n'a tapé que le domaine
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    let parsed: URL;
    try {
        parsed = new URL(candidate);
    } catch {
        return null;
    }

    // Seulement http/https — pas de javascript:, data:, ftp:, etc.
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;

    // Hostname obligatoire et au moins un point (refuse "localhost", "abc")
    const host = parsed.hostname.toLowerCase();
    if (!host || !host.includes(".")) return null;

    // Pas d'IPs privées ni de TLDs locaux
    if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return null;
    if (host.startsWith("10.") || host.startsWith("192.168.") || host.startsWith("169.254.")) return null;
    if (host === "127.0.0.1" || host === "0.0.0.0") return null;
    // Plage privée 172.16.0.0 — 172.31.255.255
    const ip172 = host.match(/^172\.(\d+)\./);
    if (ip172) {
        const second = parseInt(ip172[1], 10);
        if (second >= 16 && second <= 31) return null;
    }

    return parsed.toString();
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
    const { response, headers: pageHeaders } = await fetchWithTimeout(normalizedUrl);
    const responseTime = Date.now() - startTime;
    const html = await response.text();
    const $ = cheerio.load(html);

    const pageTitle = $("title").text().trim() || "Sans titre";
    const metaDescription = $('meta[name="description"]').attr("content") || "";
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = countWords(bodyText);

    // Parse X-Robots-Tag from headers
    const xRobotsTagInfo = parseXRobotsTag(pageHeaders);

    // Parse meta robots for AI-specific tags
    const metaRobotsIaInfo = parseMetaRobotsIa($);

    // Calculate citability score
    const citabilityInfo = calculateCitability($, bodyText);

    // Check content freshness
    const freshnessInfo = checkFreshness($, pageHeaders);

    // Check Q&A structure
    const qaStructureInfo = checkQAStructure($);

    // Check Open Graph signals
    const ogSignalsInfo = checkOGSignals($);

    // Check heading depth
    const headingDepthInfo = checkHeadingDepth($);

    // Fetch robots.txt
    let robotsTxt = "";
    let hasSitemapInRobots = false;
    try {
        const { response: robotsResponse } = await fetchWithTimeout(`${baseUrl}/robots.txt`, 5000);
        if (robotsResponse.ok) {
            robotsTxt = await robotsResponse.text();
            hasSitemapInRobots = robotsTxt.toLowerCase().includes("sitemap:");
        }
    } catch {
        robotsTxt = "";
    }

    // Check llms.txt with validation
    let llmsTxtInfo: LlmsTxtInfo = { exists: false, isValid: false, hasFullVersion: false };
    try {
        const { response: llmsResponse } = await fetchWithTimeout(`${baseUrl}/llms.txt`, 3000);
        if (llmsResponse.ok) {
            const llmsContent = await llmsResponse.text();
            const validation = validateLlmsTxt(llmsContent);
            llmsTxtInfo.exists = true;
            llmsTxtInfo.isValid = validation.isValid;
            llmsTxtInfo.projectName = validation.projectName;
        }
    } catch {
        // llms.txt not found
    }

    // Check llms-full.txt
    try {
        const { response: llmsFullResponse } = await fetchWithTimeout(`${baseUrl}/llms-full.txt`, 3000);
        if (llmsFullResponse.ok) {
            llmsTxtInfo.hasFullVersion = true;
        }
    } catch {
        // llms-full.txt not found
    }

    const hasLlmsTxt = llmsTxtInfo.exists;

    // Check sitemap.xml
    let hasSitemapXml = false;
    try {
        const { response: sitemapResponse } = await fetchWithTimeout(`${baseUrl}/sitemap.xml`, 3000);
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

    // llms.txt enhanced check (5 pts)
    let llmsPoints = 0;
    let llmsStatus: CheckItem["status"] = "warning";
    let llmsDetail = "Non détecté";

    if (llmsTxtInfo.exists) {
        if (llmsTxtInfo.isValid) {
            llmsPoints = llmsTxtInfo.hasFullVersion ? 5 : 4;
            llmsStatus = "success";
            llmsDetail = llmsTxtInfo.hasFullVersion
                ? `Valide + llms-full.txt (${llmsTxtInfo.projectName})`
                : `Valide (${llmsTxtInfo.projectName})`;
        } else {
            llmsPoints = 2;
            llmsStatus = "warning";
            llmsDetail = "Présent mais format invalide (doit commencer par # Nom)";
        }
    } else {
        llmsDetail = "Non détecté — recommandé pour guider les LLM";
    }

    categories.accessibilite.score += llmsPoints;
    categories.accessibilite.checks.push({
        label: "Fichier llms.txt",
        status: llmsStatus,
        detail: llmsDetail,
        points: llmsPoints,
        maxPoints: 5,
        fixUrl: !llmsTxtInfo.exists ? "/outils/generateur-robots-txt" : undefined,
        fixLabel: !llmsTxtInfo.exists ? "En savoir plus sur llms.txt" : undefined,
    });

    // X-Robots-Tag check (warning only, no points)
    if (xRobotsTagInfo.hasAiBlocking) {
        const blockedList = xRobotsTagInfo.blockedAgents.join(", ");
        categories.accessibilite.checks.push({
            label: "Header X-Robots-Tag",
            status: "error",
            detail: `Bloque les crawlers IA via header HTTP (${blockedList})`,
            points: 0,
            maxPoints: 0,
        });
        recommendations.push({
            text: `Le header X-Robots-Tag bloque les crawlers IA (${blockedList}). Vérifiez votre serveur web.`,
            priority: 1,
        });
    }

    // Meta robots IA check (warning only, no points)
    if (metaRobotsIaInfo.hasAiBlocking) {
        const blockedList = metaRobotsIaInfo.blockedAgents.join(", ");
        categories.accessibilite.checks.push({
            label: "Meta robots IA",
            status: "error",
            detail: `Balises meta bloquant les crawlers IA (${blockedList})`,
            points: 0,
            maxPoints: 0,
        });
        recommendations.push({
            text: `Des balises <meta name="${metaRobotsIaInfo.blockedAgents[0]}"> bloquent les crawlers IA.`,
            priority: 1,
        });
    }

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

    // Heading depth bonus check
    const depthStatus: CheckItem["status"] = headingDepthInfo.hasProperStructure ? "success" :
        headingDepthInfo.hasSkips ? "error" : "warning";
    categories.semantique.checks.push({
        label: "Profondeur sémantique",
        status: depthStatus,
        detail: headingDepthInfo.hasProperStructure
            ? "Structure H1→H2→H3 parfaite"
            : headingDepthInfo.hasSkips
                ? "Sauts de niveaux détectés (ex: H1→H3)"
                : "Structure incomplète (ajoutez des H3)",
        points: 0,
        maxPoints: 0,
    });
    if (headingDepthInfo.hasSkips) {
        recommendations.push({
            text: "Évitez les sauts de niveaux dans vos titres (H1→H3 sans H2). Les IA comprennent mieux une structure logique.",
            priority: 3,
        });
    }

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

    // Open Graph signals bonus check
    const ogStatus: CheckItem["status"] = ogSignalsInfo.count >= 5 ? "success" :
        ogSignalsInfo.count >= 2 ? "warning" : "error";
    categories.eeat.checks.push({
        label: "Métadonnées sociales (OG)",
        status: ogStatus,
        detail: ogSignalsInfo.count >= 5
            ? `${ogSignalsInfo.count}/7 balises OG/Twitter`
            : ogSignalsInfo.count > 0
                ? `${ogSignalsInfo.count}/7 (manque: ${ogSignalsInfo.missing.slice(0, 3).join(", ")})`
                : "Aucune balise Open Graph détectée",
        points: 0,
        maxPoints: 0,
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

    // Citability score (enhanced, 4 pts)
    let citabilityPoints = 0;
    let citabilityStatus: CheckItem["status"] = "error";
    let citabilityDetail = "";

    if (citabilityInfo.score >= 60) {
        citabilityPoints = 4;
        citabilityStatus = "success";
        citabilityDetail = `Excellent (${citabilityInfo.statsCount} stats, ${citabilityInfo.listsCount} listes, ${citabilityInfo.tablesCount} tableaux)`;
    } else if (citabilityInfo.score >= 30) {
        citabilityPoints = 2;
        citabilityStatus = "warning";
        citabilityDetail = `Moyen (${citabilityInfo.statsCount} stats${citabilityInfo.hasDefinitions ? ", définitions" : ""})`;
    } else if (citabilityInfo.statsCount > 0 || citabilityInfo.listsCount > 0) {
        citabilityPoints = 1;
        citabilityStatus = "warning";
        citabilityDetail = `Faible — ajoutez des données chiffrées, listes ou tableaux`;
    } else {
        citabilityDetail = "Aucune donnée citable — les IA préfèrent citer du contenu structuré";
    }

    categories.format.score += citabilityPoints;
    categories.format.checks.push({
        label: "Score de citabilité",
        status: citabilityStatus,
        detail: citabilityDetail,
        points: citabilityPoints,
        maxPoints: 4,
    });

    if (citabilityInfo.score < 30) {
        recommendations.push({
            text: "Enrichissez votre contenu avec des statistiques, listes et tableaux pour améliorer la citabilité par les IA",
            priority: 3,
        });
    }

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

    // Content freshness bonus check
    let freshnessStatus: CheckItem["status"] = "error";
    let freshnessDetail = "Pas de signal de fraîcheur détecté";

    if (freshnessInfo.hasDate && freshnessInfo.ageMonths !== undefined) {
        if (freshnessInfo.ageMonths <= 3) {
            freshnessStatus = "success";
            freshnessDetail = `Contenu frais (${freshnessInfo.ageMonths <= 1 ? "< 1 mois" : `${freshnessInfo.ageMonths} mois`})`;
        } else if (freshnessInfo.ageMonths <= 12) {
            freshnessStatus = "warning";
            freshnessDetail = `Contenu récent (${freshnessInfo.ageMonths} mois)`;
        } else {
            freshnessStatus = "warning";
            freshnessDetail = `Contenu potentiellement obsolète (${freshnessInfo.ageMonths} mois)`;
        }
    } else if (freshnessInfo.hasDate) {
        freshnessStatus = "warning";
        freshnessDetail = `Date détectée: ${freshnessInfo.date}`;
    }

    categories.format.checks.push({
        label: "Fraîcheur du contenu",
        status: freshnessStatus,
        detail: freshnessDetail,
        points: 0,
        maxPoints: 0,
    });

    if (!freshnessInfo.hasDate) {
        recommendations.push({
            text: "Ajoutez une date de publication/mise à jour visible. Les IA préfèrent citer du contenu récent.",
            priority: 3,
        });
    }

    // Q&A structure bonus check
    let qaStatus: CheckItem["status"] = "error";
    let qaDetail = "Aucun titre en question";

    if (qaStructureInfo.questionHeadingsCount >= 3) {
        qaStatus = "success";
        qaDetail = `Excellent (${qaStructureInfo.questionHeadingsCount}/${qaStructureInfo.totalH2H3} titres en question)`;
    } else if (qaStructureInfo.questionHeadingsCount >= 1) {
        qaStatus = "warning";
        qaDetail = `${qaStructureInfo.questionHeadingsCount}/${qaStructureInfo.totalH2H3} titres en question`;
    }

    categories.format.checks.push({
        label: "Structure Q&A",
        status: qaStatus,
        detail: qaDetail,
        points: 0,
        maxPoints: 0,
    });

    if (qaStructureInfo.questionHeadingsCount === 0 && qaStructureInfo.totalH2H3 > 0) {
        recommendations.push({
            text: "Reformulez certains sous-titres en questions. Les IA extraient prioritairement les réponses à des questions explicites.",
            priority: 4,
        });
    }

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
        llmsTxtInfo,
        xRobotsTagInfo,
        metaRobotsIaInfo,
        citabilityInfo,
        freshnessInfo,
        qaStructureInfo,
        ogSignalsInfo,
        headingDepthInfo,
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

        const validatedUrl = validatePublicUrl(url);
        if (!validatedUrl) {
            return NextResponse.json(
                { error: "URL invalide. Indiquez un domaine ou une URL http(s) publique, par exemple https://votresite.com." },
                { status: 400 }
            );
        }

        const cached = getCachedResult(validatedUrl);
        if (cached) {
            return NextResponse.json(cached);
        }

        const result = await analyzeVisibility(validatedUrl);
        setCachedResult(url, result);

        // Sauvegarder le rapport public
        try {
            const domain = new URL(result.url).hostname.replace("www.", "");
            const rapportData: RapportData = {
                domain,
                url: result.url,
                score: result.score,
                maxScore: result.maxScore,
                level: result.level,
                levelLabel: result.levelLabel,
                pageTitle: result.pageTitle,
                wordCount: result.wordCount,
                responseTime: result.responseTime,
                hasLlmsTxt: result.hasLlmsTxt,
                categories: {
                    accessibilite: { score: result.categories.accessibilite.score, maxScore: result.categories.accessibilite.maxScore },
                    semantique: { score: result.categories.semantique.score, maxScore: result.categories.semantique.maxScore },
                    eeat: { score: result.categories.eeat.score, maxScore: result.categories.eeat.maxScore },
                    format: { score: result.categories.format.score, maxScore: result.categories.format.maxScore },
                },
                crawlers: result.crawlers.map((c) => ({ name: c.name, company: c.company, status: c.status })),
                recommendations: result.recommendations.map((r) => r.text),
                testedAt: result.timestamp,
                updatedAt: new Date().toISOString(),
            };
            saveRapport(rapportData);
        } catch (saveErr) {
            console.warn("Failed to save rapport:", saveErr);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("GEO Visibility test error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse. Vérifiez l'URL." },
            { status: 500 }
        );
    }
}
