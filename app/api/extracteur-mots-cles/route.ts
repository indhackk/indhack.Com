import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

// French stop words to filter out
const STOP_WORDS = new Set([
    "le", "la", "les", "de", "du", "des", "un", "une", "et", "est", "en", "que", "qui",
    "dans", "ce", "il", "elle", "nous", "vous", "ils", "elles", "son", "sa", "ses",
    "leur", "leurs", "mon", "ma", "mes", "ton", "ta", "tes", "notre", "votre",
    "au", "aux", "avec", "pour", "par", "sur", "sous", "entre", "vers", "chez",
    "sans", "tout", "tous", "toute", "toutes", "mais", "ou", "donc", "car", "ni",
    "plus", "moins", "très", "bien", "aussi", "comme", "quand", "si", "ne", "pas",
    "cette", "cet", "ces", "être", "avoir", "faire", "dire", "aller", "voir", "venir",
    "pouvoir", "vouloir", "devoir", "falloir", "savoir", "prendre", "donner", "tenir",
    "a", "à", "the", "and", "of", "to", "in", "is", "it", "for", "on", "with", "as",
    "be", "was", "are", "were", "been", "have", "has", "had", "do", "does", "did",
    "will", "would", "could", "should", "may", "might", "must", "shall", "can",
    "qu", "d", "l", "n", "c", "s", "j", "m", "t", "y"
]);

interface KeywordData {
    word: string;
    count: number;
    density: number;
    locations: string[];
    importance: number;
}

interface NGramData {
    phrase: string;
    count: number;
    words: number;
}

interface ExtractionResult {
    url?: string;
    timestamp: string;
    totalWords: number;
    uniqueWords: number;
    keywords: KeywordData[];
    bigrams: NGramData[];
    trigrams: NGramData[];
    titleKeywords: string[];
    h1Keywords: string[];
    metaKeywords: string[];
    pageTitle?: string;
    mode: "url" | "text";
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

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "INDHACK-Keyword-Extractor/1.0 (+https://indhack.com/outils/extracteur-mots-cles)",
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

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents for matching
        .replace(/[^a-z0-9àâäéèêëïîôùûüÿœæç\s-]/gi, " ")
        .split(/\s+/)
        .filter(word => word.length >= 3 && !STOP_WORDS.has(word.toLowerCase()));
}

function extractNGrams(words: string[], n: number): Map<string, number> {
    const ngrams = new Map<string, number>();
    for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(" ");
        ngrams.set(ngram, (ngrams.get(ngram) || 0) + 1);
    }
    return ngrams;
}

function analyzeText(text: string, source: string, wordCounts: Map<string, { count: number; locations: Set<string> }>): void {
    const words = tokenize(text);
    for (const word of words) {
        const existing = wordCounts.get(word) || { count: 0, locations: new Set() };
        existing.count++;
        existing.locations.add(source);
        wordCounts.set(word, existing);
    }
}

// SSRF Protection: block private/internal IPs
function isPrivateUrl(urlString: string): boolean {
    try {
        const urlObj = new URL(urlString);
        const hostname = urlObj.hostname.toLowerCase();
        if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "[::1]") return true;
        if (hostname.startsWith("10.") || hostname.startsWith("192.168.") || hostname.startsWith("172.") || hostname.startsWith("169.254.")) return true;
        if (hostname.endsWith(".local") || hostname.endsWith(".internal")) return true;
        if (!["http:", "https:"].includes(urlObj.protocol)) return true;
        return false;
    } catch { return true; }
}

async function extractFromURL(url: string): Promise<ExtractionResult> {
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
        normalizedUrl = "https://" + normalizedUrl;
    }

    if (isPrivateUrl(normalizedUrl)) {
        throw new Error("URL non autorisée : les adresses internes/privées sont bloquées.");
    }

    const response = await fetchWithTimeout(normalizedUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove scripts, styles, and other non-content elements
    $("script, style, noscript, iframe, nav, footer, header, aside").remove();

    const wordCounts = new Map<string, { count: number; locations: Set<string> }>();
    const allWords: string[] = [];

    // Extract from title
    const title = $("title").text().trim();
    const titleKeywords = tokenize(title);
    analyzeText(title, "title", wordCounts);
    allWords.push(...tokenize(title));

    // Extract from meta description
    const metaDesc = $('meta[name="description"]').attr("content") || "";
    const metaKeywords = tokenize(metaDesc);
    analyzeText(metaDesc, "meta", wordCounts);
    allWords.push(...tokenize(metaDesc));

    // Extract from H1
    const h1Text = $("h1").text().trim();
    const h1Keywords = tokenize(h1Text);
    analyzeText(h1Text, "h1", wordCounts);
    allWords.push(...tokenize(h1Text));

    // Extract from H2-H6
    $("h2, h3, h4, h5, h6").each((_, el) => {
        const text = $(el).text().trim();
        analyzeText(text, "headings", wordCounts);
        allWords.push(...tokenize(text));
    });

    // Extract from body content
    const bodyText = $("body").text().trim();
    analyzeText(bodyText, "content", wordCounts);
    allWords.push(...tokenize(bodyText));

    // Extract from image alts
    $("img[alt]").each((_, el) => {
        const alt = $(el).attr("alt") || "";
        if (alt.length > 2) {
            analyzeText(alt, "images", wordCounts);
            allWords.push(...tokenize(alt));
        }
    });

    // Extract from anchor texts
    $("a").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 2 && text.length < 100) {
            analyzeText(text, "links", wordCounts);
        }
    });

    // Calculate total words
    const totalWords = allWords.length;

    // Convert to sorted keywords array
    const keywords: KeywordData[] = Array.from(wordCounts.entries())
        .map(([word, data]) => ({
            word,
            count: data.count,
            density: Math.round((data.count / totalWords) * 10000) / 100,
            locations: Array.from(data.locations),
            importance: calculateImportance(data.locations, data.count),
        }))
        .filter(k => k.count >= 2)
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 50);

    // Extract n-grams
    const cleanWords = allWords.filter(w => !STOP_WORDS.has(w));
    const bigramMap = extractNGrams(cleanWords, 2);
    const trigramMap = extractNGrams(cleanWords, 3);

    const bigrams: NGramData[] = Array.from(bigramMap.entries())
        .filter(([, count]) => count >= 2)
        .map(([phrase, count]) => ({ phrase, count, words: 2 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

    const trigrams: NGramData[] = Array.from(trigramMap.entries())
        .filter(([, count]) => count >= 2)
        .map(([phrase, count]) => ({ phrase, count, words: 3 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);

    return {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        totalWords,
        uniqueWords: wordCounts.size,
        keywords,
        bigrams,
        trigrams,
        titleKeywords: titleKeywords.slice(0, 10),
        h1Keywords: h1Keywords.slice(0, 10),
        metaKeywords: metaKeywords.slice(0, 10),
        pageTitle: title || undefined,
        mode: "url",
    };
}

function extractFromText(text: string): ExtractionResult {
    const wordCounts = new Map<string, { count: number; locations: Set<string> }>();
    const allWords = tokenize(text);

    for (const word of allWords) {
        const existing = wordCounts.get(word) || { count: 0, locations: new Set() };
        existing.count++;
        existing.locations.add("content");
        wordCounts.set(word, existing);
    }

    const totalWords = allWords.length;

    const keywords: KeywordData[] = Array.from(wordCounts.entries())
        .map(([word, data]) => ({
            word,
            count: data.count,
            density: Math.round((data.count / totalWords) * 10000) / 100,
            locations: Array.from(data.locations),
            importance: data.count,
        }))
        .filter(k => k.count >= 2)
        .sort((a, b) => b.count - a.count)
        .slice(0, 50);

    const cleanWords = allWords.filter(w => !STOP_WORDS.has(w));
    const bigramMap = extractNGrams(cleanWords, 2);
    const trigramMap = extractNGrams(cleanWords, 3);

    const bigrams: NGramData[] = Array.from(bigramMap.entries())
        .filter(([, count]) => count >= 2)
        .map(([phrase, count]) => ({ phrase, count, words: 2 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

    const trigrams: NGramData[] = Array.from(trigramMap.entries())
        .filter(([, count]) => count >= 2)
        .map(([phrase, count]) => ({ phrase, count, words: 3 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);

    return {
        timestamp: new Date().toISOString(),
        totalWords,
        uniqueWords: wordCounts.size,
        keywords,
        bigrams,
        trigrams,
        titleKeywords: [],
        h1Keywords: [],
        metaKeywords: [],
        mode: "text",
    };
}

function calculateImportance(locations: Set<string>, count: number): number {
    let score = count;
    if (locations.has("title")) score += 20;
    if (locations.has("h1")) score += 15;
    if (locations.has("meta")) score += 10;
    if (locations.has("headings")) score += 5;
    if (locations.has("images")) score += 3;
    if (locations.has("links")) score += 2;
    return score;
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
        const { url, text, mode } = body;

        if (mode === "url" && url) {
            const result = await extractFromURL(url);
            return NextResponse.json(result);
        } else if (mode === "text" && text) {
            const result = extractFromText(text);
            return NextResponse.json(result);
        } else {
            return NextResponse.json(
                { error: "URL ou texte requis" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Extraction error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'extraction." },
            { status: 500 }
        );
    }
}
