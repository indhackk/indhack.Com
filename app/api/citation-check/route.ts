import { NextRequest, NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════
// CITATION CHECK API — Vérifie si un site est cité par les IA
// Priorité : Tavily AI Search (GRATUIT 1000 req/mois)
// Fallback : Perplexity Sonar > SERPER Google Results
// ═══════════════════════════════════════════════════════════

const RATE_LIMIT = 5; // 5 tests/heure par IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure
const MAX_PROMPTS = 3;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface CitationSource {
    url: string;
    title?: string;
}

interface PromptResult {
    prompt: string;
    isCited: boolean;
    citationPosition: number | null;
    totalSources: number;
    competitors: string[];
    snippet: string;
    sources: CitationSource[];
    aiEngine: string;
}

interface CitationCheckResult {
    domain: string;
    timestamp: string;
    prompts: PromptResult[];
    overallScore: {
        cited: number;
        total: number;
        percentage: number;
    };
    topCompetitors: { domain: string; count: number }[];
}

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

function extractDomain(url: string): string {
    try {
        return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace("www.", "");
    } catch {
        return url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    }
}

// ═══════════════════════════════════════════════════════════
// MOTEUR 1 : Tavily AI Search
// GRATUIT : 1000 requêtes/mois, pas de carte bancaire
// Retourne une réponse IA + sources avec URLs
// ═══════════════════════════════════════════════════════════
async function queryTavily(prompt: string): Promise<{ content: string; citations: string[] }> {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) throw new Error("TAVILY_API_KEY not configured");

    const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            query: prompt,
            search_depth: "basic",
            include_answer: true,
            max_results: 10,
            topic: "general",
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tavily API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    const content = data.answer || "";
    const citations: string[] = (data.results || [])
        .map((r: { url?: string }) => r.url)
        .filter(Boolean);

    return { content, citations };
}

// ═══════════════════════════════════════════════════════════
// MOTEUR 2 (Fallback) : Perplexity Sonar
// ═══════════════════════════════════════════════════════════
async function queryPerplexity(prompt: string): Promise<{ content: string; citations: string[] }> {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) throw new Error("PERPLEXITY_API_KEY not configured");

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "sonar",
            messages: [
                {
                    role: "system",
                    content:
                        "Tu es un assistant de recherche. Réponds de façon factuelle et concise en citant des sources web spécifiques. Mentionne les noms de sites, outils et entreprises pertinents avec leurs URLs.",
                },
                { role: "user", content: prompt },
            ],
            max_tokens: 1024,
            temperature: 0.1,
            return_citations: true,
            search_recency_filter: "month",
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Perplexity API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return {
        content: data.choices?.[0]?.message?.content || "",
        citations: data.citations || [],
    };
}

// ═══════════════════════════════════════════════════════════
// MOTEUR 3 (Dernier recours) : SERPER Google Results
// ═══════════════════════════════════════════════════════════
async function querySerper(prompt: string): Promise<{ content: string; citations: string[] }> {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) throw new Error("SERPER_API_KEY not configured");

    const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: prompt, gl: "fr", hl: "fr", num: 10 }),
    });

    if (!response.ok) throw new Error(`Serper API error ${response.status}`);

    const data = await response.json();
    const citations: string[] = [];
    let content = "";

    // AI Overview si disponible
    if (data.answerBox) {
        content = data.answerBox.snippet || data.answerBox.answer || "";
        if (data.answerBox.link) citations.push(data.answerBox.link);
    }

    if (data.knowledgeGraph?.description) {
        content += " " + data.knowledgeGraph.description;
        if (data.knowledgeGraph.website) citations.push(data.knowledgeGraph.website);
    }

    // AI Overview de Google
    if (data.aiOverview) {
        content =
            typeof data.aiOverview === "string"
                ? data.aiOverview
                : data.aiOverview.text || data.aiOverview.snippet || content;
        if (data.aiOverview.references) {
            for (const ref of data.aiOverview.references) {
                if (ref.link) citations.push(ref.link);
            }
        }
    }

    if (data.organic) {
        for (const result of data.organic.slice(0, 10)) {
            citations.push(result.link);
            if (!content) content = result.snippet || "";
        }
    }

    return { content, citations };
}

// ═══════════════════════════════════════════════════════════
// DISPATCH : essaie Tavily > Perplexity > SERPER
// ═══════════════════════════════════════════════════════════
async function queryAI(prompt: string): Promise<{ content: string; citations: string[]; engine: string }> {
    // 1. Tavily (gratuit, 1000/mois)
    if (process.env.TAVILY_API_KEY) {
        try {
            const result = await queryTavily(prompt);
            return { ...result, engine: "Tavily AI Search" };
        } catch (err) {
            console.warn("Tavily failed, trying fallback:", err);
        }
    }

    // 2. Perplexity Sonar (payant)
    if (process.env.PERPLEXITY_API_KEY) {
        try {
            const result = await queryPerplexity(prompt);
            return { ...result, engine: "Perplexity Sonar" };
        } catch (err) {
            console.warn("Perplexity failed, trying fallback:", err);
        }
    }

    // 3. SERPER Google (existant, pas un vrai LLM)
    if (process.env.SERPER_API_KEY) {
        const result = await querySerper(prompt);
        return { ...result, engine: "Google AI Overview" };
    }

    throw new Error("Aucune API configurée (TAVILY_API_KEY, PERPLEXITY_API_KEY ou SERPER_API_KEY)");
}

// ═══════════════════════════════════════════════════════════
// ANALYSE : vérifie si le domaine est cité dans les résultats
// ═══════════════════════════════════════════════════════════
function analyzePromptResult(
    prompt: string,
    domain: string,
    content: string,
    citations: string[],
    aiEngine: string
): PromptResult {
    const domainLower = domain.toLowerCase();

    // Dédupliquer les citations par domaine
    const seenDomains = new Set<string>();
    const uniqueCitations = citations.filter((url) => {
        const d = extractDomain(url);
        if (seenDomains.has(d)) return false;
        seenDomains.add(d);
        return true;
    });

    // Cherche le domaine dans les citations/sources
    let citationPosition: number | null = null;
    const sources: CitationSource[] = uniqueCitations.map((url, i) => {
        const sourceDomain = extractDomain(url);
        if (sourceDomain.includes(domainLower) || domainLower.includes(sourceDomain)) {
            if (citationPosition === null) citationPosition = i + 1;
        }
        return { url, title: sourceDomain };
    });

    // Vérifie aussi si le domaine est mentionné dans le texte
    const isCitedInText =
        content.toLowerCase().includes(domainLower) ||
        content.toLowerCase().includes(domainLower.replace(".", " ")) ||
        content.toLowerCase().includes(domainLower.split(".")[0]);

    const isCited = citationPosition !== null || isCitedInText;

    if (isCitedInText && citationPosition === null) {
        citationPosition = -1; // Mentionné dans le texte mais pas comme source directe
    }

    // Extraire les concurrents
    const competitors = uniqueCitations
        .map((url) => extractDomain(url))
        .filter((d) => !d.includes(domainLower) && !domainLower.includes(d))
        .filter(
            (d) =>
                !d.includes("wikipedia") &&
                !d.includes("reddit") &&
                !d.includes("google") &&
                !d.includes("youtube") &&
                !d.includes("facebook") &&
                !d.includes("twitter") &&
                !d.includes("x.com")
        )
        .filter((d, i, arr) => arr.indexOf(d) === i)
        .slice(0, 5);

    // Extraire un snippet pertinent
    let snippet = "";
    if (isCited) {
        const sentences = content.split(/[.!?]\s/);
        const relevant = sentences.find(
            (s) =>
                s.toLowerCase().includes(domainLower) ||
                s.toLowerCase().includes(domainLower.split(".")[0])
        );
        snippet = relevant ? relevant.trim().slice(0, 250) : content.slice(0, 250);
    } else {
        snippet = content.slice(0, 250);
    }

    return {
        prompt,
        isCited,
        citationPosition,
        totalSources: uniqueCitations.length,
        competitors,
        snippet: snippet + (snippet.length >= 250 ? "..." : ""),
        sources,
        aiEngine,
    };
}

// ═══════════════════════════════════════════════════════════
// ROUTE HANDLER
// ═══════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte : 5 tests par heure. Réessayez plus tard." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { domain, prompts } = body;

        if (!domain || !prompts || !Array.isArray(prompts) || prompts.length === 0) {
            return NextResponse.json(
                { error: "Veuillez fournir un domaine et au moins un mot-clé." },
                { status: 400 }
            );
        }

        if (prompts.length > MAX_PROMPTS) {
            return NextResponse.json(
                { error: `Maximum ${MAX_PROMPTS} mots-clés par test.` },
                { status: 400 }
            );
        }

        const cleanDomain = extractDomain(domain);

        // Construire les prompts de recherche
        const searchPrompts = prompts.map((keyword: string) => {
            const k = keyword.trim();
            if (k.includes("?")) return k;
            if (
                k.toLowerCase().startsWith("quel") ||
                k.toLowerCase().startsWith("comment") ||
                k.toLowerCase().startsWith("meilleur") ||
                k.toLowerCase().startsWith("top")
            )
                return k;
            return `Quels sont les meilleurs ${k} ? Donne-moi des recommandations concrètes avec des sites web.`;
        });

        // Exécuter les requêtes
        const results: PromptResult[] = [];

        for (let i = 0; i < searchPrompts.length; i++) {
            try {
                const { content, citations, engine } = await queryAI(searchPrompts[i]);
                results.push(
                    analyzePromptResult(searchPrompts[i], cleanDomain, content, citations, engine)
                );
            } catch (err) {
                console.error(`Error querying for prompt "${searchPrompts[i]}":`, err);
                results.push({
                    prompt: searchPrompts[i],
                    isCited: false,
                    citationPosition: null,
                    totalSources: 0,
                    competitors: [],
                    snippet: "Erreur lors de la vérification. Réessayez.",
                    sources: [],
                    aiEngine: "N/A",
                });
            }

            // Délai entre requêtes
            if (i < searchPrompts.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }

        // Score global
        const cited = results.filter((r) => r.isCited).length;
        const total = results.length;

        // Top concurrents
        const competitorCount = new Map<string, number>();
        for (const result of results) {
            for (const comp of result.competitors) {
                competitorCount.set(comp, (competitorCount.get(comp) || 0) + 1);
            }
        }
        const topCompetitors = Array.from(competitorCount.entries())
            .map(([domain, count]) => ({ domain, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);

        const citationResult: CitationCheckResult = {
            domain: cleanDomain,
            timestamp: new Date().toISOString(),
            prompts: results,
            overallScore: {
                cited,
                total,
                percentage: Math.round((cited / total) * 100),
            },
            topCompetitors,
        };

        return NextResponse.json(citationResult);
    } catch (error) {
        console.error("Citation check error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification. Réessayez." },
            { status: 500 }
        );
    }
}
