import { NextRequest, NextResponse } from "next/server";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: SpeedAnalysisResult; expiry: number }>();

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CoreWebVital {
    name: string;
    value: number;
    unit: string;
    rating: "good" | "needs-improvement" | "poor";
    description: string;
    threshold: { good: number; poor: number };
}

interface SpeedMetric {
    name: string;
    value: number;
    displayValue: string;
    score: number;
    description: string;
}

interface SpeedAnalysisResult {
    url: string;
    timestamp: string;
    strategy: "mobile" | "desktop";
    scores: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
    };
    coreWebVitals: CoreWebVital[];
    metrics: SpeedMetric[];
    opportunities: Opportunity[];
    diagnostics: Diagnostic[];
    summary: string;
    cached?: boolean;
}

interface Opportunity {
    title: string;
    description: string;
    savings: string;
    priority: "high" | "medium" | "low";
}

interface Diagnostic {
    title: string;
    description: string;
    value: string;
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

function getCachedResult(key: string): SpeedAnalysisResult | null {
    const cached = cacheMap.get(key);
    if (cached && Date.now() < cached.expiry) return cached.data;
    cacheMap.delete(key);
    return null;
}

function setCachedResult(key: string, data: SpeedAnalysisResult): void {
    cacheMap.set(key, { data, expiry: Date.now() + CACHE_TTL });
}

function getRating(value: number, good: number, poor: number): "good" | "needs-improvement" | "poor" {
    if (value <= good) return "good";
    if (value <= poor) return "needs-improvement";
    return "poor";
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTime(ms: number): string {
    if (ms < 1000) return `${Math.round(ms)} ms`;
    return `${(ms / 1000).toFixed(1)} s`;
}

interface AuditResult {
    score: number | null;
    numericValue?: number;
    displayValue?: string;
    description?: string;
    details?: {
        overallSavingsBytes?: number;
    };
}

function extractOpportunities(audits: Record<string, AuditResult>): Opportunity[] {
    const opportunities: Opportunity[] = [];

    const opportunityAudits = [
        { id: "render-blocking-resources", title: "Éliminer les ressources bloquantes", priority: "high" as const },
        { id: "unused-css-rules", title: "Supprimer le CSS inutilisé", priority: "medium" as const },
        { id: "unused-javascript", title: "Supprimer le JavaScript inutilisé", priority: "medium" as const },
        { id: "modern-image-formats", title: "Utiliser des formats d'image modernes", priority: "high" as const },
        { id: "uses-optimized-images", title: "Optimiser les images", priority: "high" as const },
        { id: "efficient-animated-content", title: "Optimiser les animations", priority: "low" as const },
        { id: "uses-text-compression", title: "Activer la compression texte", priority: "high" as const },
        { id: "uses-responsive-images", title: "Utiliser des images responsives", priority: "medium" as const },
        { id: "offscreen-images", title: "Différer les images hors écran", priority: "medium" as const },
        { id: "unminified-css", title: "Minifier le CSS", priority: "low" as const },
        { id: "unminified-javascript", title: "Minifier le JavaScript", priority: "low" as const },
    ];

    for (const opp of opportunityAudits) {
        const audit = audits[opp.id];
        if (audit && audit.score !== null && audit.score < 1) {
            const savings = audit.numericValue
                ? formatTime(audit.numericValue)
                : audit.details?.overallSavingsBytes
                    ? formatBytes(audit.details.overallSavingsBytes)
                    : "";

            opportunities.push({
                title: opp.title,
                description: audit.description || "",
                savings: savings ? `Économie potentielle : ${savings}` : "",
                priority: opp.priority,
            });
        }
    }

    return opportunities.slice(0, 8);
}

function extractDiagnostics(audits: Record<string, AuditResult>): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];

    const diagnosticAudits = [
        { id: "dom-size", title: "Taille du DOM" },
        { id: "total-byte-weight", title: "Poids total de la page" },
        { id: "mainthread-work-breakdown", title: "Travail du thread principal" },
        { id: "bootup-time", title: "Temps d'exécution JavaScript" },
        { id: "network-requests", title: "Requêtes réseau" },
        { id: "critical-request-chains", title: "Chaînes de requêtes critiques" },
    ];

    for (const diag of diagnosticAudits) {
        const audit = audits[diag.id];
        if (audit && audit.displayValue) {
            diagnostics.push({
                title: diag.title,
                description: audit.description || "",
                value: audit.displayValue,
            });
        }
    }

    return diagnostics;
}

async function analyzeWithPageSpeed(url: string, strategy: "mobile" | "desktop"): Promise<SpeedAnalysisResult> {
    const apiKey = process.env.PAGESPEED_API_KEY;

    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("strategy", strategy);
    apiUrl.searchParams.set("category", "performance");
    apiUrl.searchParams.set("category", "accessibility");
    apiUrl.searchParams.set("category", "best-practices");
    apiUrl.searchParams.set("category", "seo");

    if (apiKey) {
        apiUrl.searchParams.set("key", apiKey);
    }

    const response = await fetch(apiUrl.toString(), {
        headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("PageSpeed API error:", errorText);
        throw new Error("Erreur lors de l'analyse. Vérifiez l'URL et réessayez.");
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    const audits = lighthouse.audits;

    // Extract scores
    const scores = {
        performance: Math.round((lighthouse.categories.performance?.score || 0) * 100),
        accessibility: Math.round((lighthouse.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((lighthouse.categories["best-practices"]?.score || 0) * 100),
        seo: Math.round((lighthouse.categories.seo?.score || 0) * 100),
    };

    // Extract Core Web Vitals
    const coreWebVitals: CoreWebVital[] = [
        {
            name: "LCP",
            value: audits["largest-contentful-paint"]?.numericValue || 0,
            unit: "ms",
            rating: getRating(audits["largest-contentful-paint"]?.numericValue || 0, 2500, 4000),
            description: "Largest Contentful Paint - Temps d'affichage du plus grand élément visible",
            threshold: { good: 2500, poor: 4000 },
        },
        {
            name: "FID",
            value: audits["max-potential-fid"]?.numericValue || 0,
            unit: "ms",
            rating: getRating(audits["max-potential-fid"]?.numericValue || 0, 100, 300),
            description: "First Input Delay - Délai avant la première interaction",
            threshold: { good: 100, poor: 300 },
        },
        {
            name: "CLS",
            value: parseFloat((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(3)),
            unit: "",
            rating: getRating(audits["cumulative-layout-shift"]?.numericValue || 0, 0.1, 0.25),
            description: "Cumulative Layout Shift - Stabilité visuelle de la page",
            threshold: { good: 0.1, poor: 0.25 },
        },
        {
            name: "INP",
            value: audits["interaction-to-next-paint"]?.numericValue || audits["total-blocking-time"]?.numericValue || 0,
            unit: "ms",
            rating: getRating(audits["interaction-to-next-paint"]?.numericValue || audits["total-blocking-time"]?.numericValue || 0, 200, 500),
            description: "Interaction to Next Paint - Réactivité aux interactions",
            threshold: { good: 200, poor: 500 },
        },
    ];

    // Extract additional metrics
    const metrics: SpeedMetric[] = [
        {
            name: "First Contentful Paint",
            value: audits["first-contentful-paint"]?.numericValue || 0,
            displayValue: formatTime(audits["first-contentful-paint"]?.numericValue || 0),
            score: Math.round((audits["first-contentful-paint"]?.score || 0) * 100),
            description: "Premier affichage de contenu",
        },
        {
            name: "Speed Index",
            value: audits["speed-index"]?.numericValue || 0,
            displayValue: formatTime(audits["speed-index"]?.numericValue || 0),
            score: Math.round((audits["speed-index"]?.score || 0) * 100),
            description: "Vitesse de chargement visuel",
        },
        {
            name: "Time to Interactive",
            value: audits["interactive"]?.numericValue || 0,
            displayValue: formatTime(audits["interactive"]?.numericValue || 0),
            score: Math.round((audits["interactive"]?.score || 0) * 100),
            description: "Temps avant interactivité complète",
        },
        {
            name: "Total Blocking Time",
            value: audits["total-blocking-time"]?.numericValue || 0,
            displayValue: formatTime(audits["total-blocking-time"]?.numericValue || 0),
            score: Math.round((audits["total-blocking-time"]?.score || 0) * 100),
            description: "Temps de blocage du thread principal",
        },
    ];

    // Extract opportunities and diagnostics
    const opportunities = extractOpportunities(audits);
    const diagnostics = extractDiagnostics(audits);

    // Generate summary
    let summary = "";
    if (scores.performance >= 90) {
        summary = "Excellentes performances ! Votre site offre une expérience utilisateur rapide et fluide.";
    } else if (scores.performance >= 50) {
        summary = "Performances moyennes. Des optimisations sont possibles pour améliorer l'expérience utilisateur.";
    } else {
        summary = "Performances insuffisantes. Des améliorations significatives sont nécessaires pour le SEO et l'UX.";
    }

    return {
        url,
        timestamp: new Date().toISOString(),
        strategy,
        scores,
        coreWebVitals,
        metrics,
        opportunities,
        diagnostics,
        summary,
    };
}

// Demo data when API fails or for testing
function getDemoResults(url: string, strategy: "mobile" | "desktop"): SpeedAnalysisResult {
    const isMobile = strategy === "mobile";

    return {
        url,
        timestamp: new Date().toISOString(),
        strategy,
        scores: {
            performance: isMobile ? 72 : 85,
            accessibility: 88,
            bestPractices: 92,
            seo: 95,
        },
        coreWebVitals: [
            {
                name: "LCP",
                value: isMobile ? 2800 : 1900,
                unit: "ms",
                rating: isMobile ? "needs-improvement" : "good",
                description: "Largest Contentful Paint - Temps d'affichage du plus grand élément visible",
                threshold: { good: 2500, poor: 4000 },
            },
            {
                name: "FID",
                value: isMobile ? 150 : 80,
                unit: "ms",
                rating: isMobile ? "needs-improvement" : "good",
                description: "First Input Delay - Délai avant la première interaction",
                threshold: { good: 100, poor: 300 },
            },
            {
                name: "CLS",
                value: 0.08,
                unit: "",
                rating: "good",
                description: "Cumulative Layout Shift - Stabilité visuelle de la page",
                threshold: { good: 0.1, poor: 0.25 },
            },
            {
                name: "INP",
                value: isMobile ? 280 : 150,
                unit: "ms",
                rating: isMobile ? "needs-improvement" : "good",
                description: "Interaction to Next Paint - Réactivité aux interactions",
                threshold: { good: 200, poor: 500 },
            },
        ],
        metrics: [
            {
                name: "First Contentful Paint",
                value: isMobile ? 1800 : 1200,
                displayValue: isMobile ? "1.8 s" : "1.2 s",
                score: isMobile ? 75 : 90,
                description: "Premier affichage de contenu",
            },
            {
                name: "Speed Index",
                value: isMobile ? 3200 : 2100,
                displayValue: isMobile ? "3.2 s" : "2.1 s",
                score: isMobile ? 68 : 82,
                description: "Vitesse de chargement visuel",
            },
            {
                name: "Time to Interactive",
                value: isMobile ? 4500 : 2800,
                displayValue: isMobile ? "4.5 s" : "2.8 s",
                score: isMobile ? 65 : 80,
                description: "Temps avant interactivité complète",
            },
            {
                name: "Total Blocking Time",
                value: isMobile ? 450 : 200,
                displayValue: isMobile ? "450 ms" : "200 ms",
                score: isMobile ? 70 : 88,
                description: "Temps de blocage du thread principal",
            },
        ],
        opportunities: [
            {
                title: "Éliminer les ressources bloquantes",
                description: "Ressources qui retardent le premier affichage de la page",
                savings: "Économie potentielle : 850 ms",
                priority: "high",
            },
            {
                title: "Utiliser des formats d'image modernes",
                description: "AVIF et WebP offrent une meilleure compression",
                savings: "Économie potentielle : 120 KB",
                priority: "high",
            },
            {
                title: "Différer les images hors écran",
                description: "Charger les images au fur et à mesure du scroll",
                savings: "Économie potentielle : 340 KB",
                priority: "medium",
            },
            {
                title: "Supprimer le JavaScript inutilisé",
                description: "Code JavaScript qui n'est pas utilisé sur cette page",
                savings: "Économie potentielle : 180 KB",
                priority: "medium",
            },
        ],
        diagnostics: [
            { title: "Taille du DOM", description: "Nombre d'éléments dans le DOM", value: "847 éléments" },
            { title: "Poids total de la page", description: "Taille totale des ressources", value: "2.4 MB" },
            { title: "Requêtes réseau", description: "Nombre de requêtes HTTP", value: "67 requêtes" },
        ],
        summary: isMobile
            ? "Performances moyennes sur mobile. Des optimisations sont possibles pour améliorer l'expérience utilisateur."
            : "Bonnes performances sur desktop. Quelques optimisations mineures peuvent encore améliorer la vitesse.",
        cached: true,
    };
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte (5/heure). Réessayez plus tard." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { url, strategy = "mobile" } = body;

        if (!url) {
            return NextResponse.json(
                { error: "URL requise" },
                { status: 400 }
            );
        }

        // Validate URL
        let validUrl: URL;
        try {
            validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
        } catch {
            return NextResponse.json(
                { error: "URL invalide" },
                { status: 400 }
            );
        }

        const cacheKey = `${validUrl.href}-${strategy}`;
        const cached = getCachedResult(cacheKey);
        if (cached) {
            return NextResponse.json({ ...cached, cached: true });
        }

        try {
            const result = await analyzeWithPageSpeed(validUrl.href, strategy as "mobile" | "desktop");
            setCachedResult(cacheKey, result);
            return NextResponse.json(result);
        } catch (error) {
            console.error("PageSpeed API error:", error);
            // Return demo data on API failure
            const demoData = getDemoResults(validUrl.href, strategy as "mobile" | "desktop");
            return NextResponse.json({
                ...demoData,
                isDemo: true,
                demoMessage: "Données de démonstration. L'API PageSpeed est temporairement indisponible."
            });
        }
    } catch (error) {
        console.error("Speed analysis error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse." },
            { status: 500 }
        );
    }
}
