import { NextRequest, NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════
// CITATION CHECK API — Vérifie si un site est cité par les IA
// Utilise Perplexity Sonar API pour des réponses grounded
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
    citationPosition: number | null; // 1-based position dans les sources, null si absent
    totalSources: number;
    competitors: string[]; // domaines concurrents mentionnés
    snippet: string; // extrait de la réponse mentionnant le site (ou résumé)
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

    if (entry.count >= RATE_LIMIT) {
        return false;
    }

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

// Interroge Perplexity Sonar avec un prompt et retourne la réponse + sources
async function queryPerplexity(prompt: string): Promise<{ content: string; citations: string[] }> {
    const apiKey = process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
        throw new Error("PERPLEXITY_API_KEY not configured");
    }

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "sonar",
            messages: [
                {
                    role: "system",
                    content: "Tu es un assistant de recherche. Réponds de façon factuelle et concise en citant des sources web spécifiques. Mentionne les noms de sites, outils et entreprises pertinents avec leurs URLs quand c'est possible."
                },
                {
                    role: "user",
                    content: prompt
                }
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

// Fallback : utilise l'API SERPER pour simuler une vérification de citation
async function querySerperFallback(prompt: string): Promise<{ content: string; citations: string[] }> {
    const apiKey = process.env.SERPER_API_KEY;

    if (!apiKey) {
        throw new Error("No API key available (neither PERPLEXITY_API_KEY nor SERPER_API_KEY)");
    }

    const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q: prompt,
            gl: "fr",
            hl: "fr",
            num: 10,
        }),
    });

    if (!response.ok) {
        throw new Error(`Serper API error ${response.status}`);
    }

    const data = await response.json();
    const citations: string[] = [];
    let content = "";

    // AI Overview si disponible
    if (data.answerBox) {
        content = data.answerBox.snippet || data.answerBox.answer || "";
        if (data.answerBox.link) citations.push(data.answerBox.link);
    }

    // Knowledge Graph
    if (data.knowledgeGraph?.description) {
        content += " " + data.knowledgeGraph.description;
        if (data.knowledgeGraph.website) citations.push(data.knowledgeGraph.website);
    }

    // Résultats organiques
    if (data.organic) {
        for (const result of data.organic.slice(0, 10)) {
            citations.push(result.link);
            if (!content) content = result.snippet || "";
        }
    }

    // AI Overview de Google
    if (data.aiOverview) {
        content = typeof data.aiOverview === "string"
            ? data.aiOverview
            : data.aiOverview.text || data.aiOverview.snippet || content;

        if (data.aiOverview.references) {
            for (const ref of data.aiOverview.references) {
                if (ref.link) citations.push(ref.link);
            }
        }
    }

    return { content, citations };
}

function analyzePromptResult(
    prompt: string,
    domain: string,
    content: string,
    citations: string[],
    aiEngine: string
): PromptResult {
    const domainLower = domain.toLowerCase();

    // Cherche le domaine dans les citations/sources
    let citationPosition: number | null = null;
    const sources: CitationSource[] = citations.map((url, i) => {
        const sourceDomain = extractDomain(url);
        if (sourceDomain.includes(domainLower) || domainLower.includes(sourceDomain)) {
            if (citationPosition === null) citationPosition = i + 1;
        }
        return { url, title: sourceDomain };
    });

    // Vérifie aussi si le domaine est mentionné dans le texte de la réponse
    const isCitedInText = content.toLowerCase().includes(domainLower) ||
        content.toLowerCase().includes(domainLower.replace(".", " "));

    const isCited = citationPosition !== null || isCitedInText;

    // Si cité dans le texte mais pas dans les sources, marquer position spéciale
    if (isCitedInText && citationPosition === null) {
        citationPosition = -1; // Mentionné dans le texte mais pas comme source
    }

    // Extraire les concurrents (autres domaines dans les sources)
    const competitors = citations
        .map(url => extractDomain(url))
        .filter(d => !d.includes(domainLower) && !domainLower.includes(d))
        .filter(d => !d.includes("wikipedia") && !d.includes("reddit") && !d.includes("google"))
        .filter((d, i, arr) => arr.indexOf(d) === i) // unique
        .slice(0, 5);

    // Extraire un snippet pertinent
    let snippet = "";
    if (isCited) {
        // Chercher la phrase qui mentionne le domaine
        const sentences = content.split(/[.!?]\s/);
        const relevant = sentences.find(s =>
            s.toLowerCase().includes(domainLower) ||
            s.toLowerCase().includes(domainLower.split(".")[0])
        );
        snippet = relevant ? relevant.trim().slice(0, 200) : content.slice(0, 200);
    } else {
        snippet = content.slice(0, 200);
    }

    return {
        prompt,
        isCited,
        citationPosition,
        totalSources: citations.length,
        competitors,
        snippet: snippet + (snippet.length >= 200 ? "..." : ""),
        sources,
        aiEngine,
    };
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
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
            // Formater comme une vraie question utilisateur
            if (k.includes("?")) return k;
            if (k.toLowerCase().startsWith("quel") || k.toLowerCase().startsWith("comment") || k.toLowerCase().startsWith("meilleur")) return k;
            return `Quels sont les meilleurs ${k} ? Donne-moi des recommandations concrètes avec des sites web.`;
        });

        // Déterminer quel moteur utiliser
        const hasPerplexity = !!process.env.PERPLEXITY_API_KEY;
        const hasSerper = !!process.env.SERPER_API_KEY;

        if (!hasPerplexity && !hasSerper) {
            return NextResponse.json(
                { error: "Service temporairement indisponible. Réessayez plus tard." },
                { status: 503 }
            );
        }

        const aiEngine = hasPerplexity ? "Perplexity Sonar" : "Google AI Overview";

        // Exécuter les requêtes (séquentiellement pour respecter les rate limits API)
        const results: PromptResult[] = [];

        for (const searchPrompt of searchPrompts) {
            try {
                const { content, citations } = hasPerplexity
                    ? await queryPerplexity(searchPrompt)
                    : await querySerperFallback(searchPrompt);

                results.push(analyzePromptResult(
                    searchPrompt,
                    cleanDomain,
                    content,
                    citations,
                    aiEngine
                ));
            } catch (err) {
                console.error(`Error querying for prompt "${searchPrompt}":`, err);
                results.push({
                    prompt: searchPrompt,
                    isCited: false,
                    citationPosition: null,
                    totalSources: 0,
                    competitors: [],
                    snippet: "Erreur lors de la vérification. Réessayez.",
                    sources: [],
                    aiEngine,
                });
            }

            // Petit délai entre les requêtes pour éviter le throttling
            if (searchPrompts.indexOf(searchPrompt) < searchPrompts.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        // Calculer le score global
        const cited = results.filter(r => r.isCited).length;
        const total = results.length;

        // Agréger les concurrents
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

        const response: CitationCheckResult = {
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

        return NextResponse.json(response);

    } catch (error) {
        console.error("Citation check error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification. Réessayez." },
            { status: 500 }
        );
    }
}
