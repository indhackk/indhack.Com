"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Download, Info, Shield, Eye, Bot, Search, Globe } from "lucide-react";

interface Crawler {
    id: string;
    name: string;
    description: string;
    category: "search" | "ai" | "social";
    defaultAllowed: boolean;
}

const CRAWLERS: Crawler[] = [
    // Moteurs de recherche classiques
    { id: "Googlebot", name: "Googlebot", description: "Crawler principal de Google Search", category: "search", defaultAllowed: true },
    { id: "Bingbot", name: "Bingbot", description: "Crawler de Microsoft Bing", category: "search", defaultAllowed: true },
    { id: "DuckDuckBot", name: "DuckDuckBot", description: "Crawler de DuckDuckGo", category: "search", defaultAllowed: true },
    { id: "Yandex", name: "Yandex", description: "Moteur de recherche russe", category: "search", defaultAllowed: true },
    { id: "Baiduspider", name: "Baiduspider", description: "Moteur de recherche chinois", category: "search", defaultAllowed: true },

    // Crawlers IA - Training
    { id: "GPTBot", name: "GPTBot", description: "OpenAI - Entraînement des modèles GPT", category: "ai", defaultAllowed: true },
    { id: "ChatGPT-User", name: "ChatGPT-User", description: "OpenAI - Navigation temps réel ChatGPT", category: "ai", defaultAllowed: true },
    { id: "OAI-SearchBot", name: "OAI-SearchBot", description: "OpenAI - Recherche web ChatGPT", category: "ai", defaultAllowed: true },
    { id: "Claude-Web", name: "Claude-Web", description: "Anthropic - Crawler de Claude AI", category: "ai", defaultAllowed: true },
    { id: "PerplexityBot", name: "PerplexityBot", description: "Perplexity AI - Recherche augmentée", category: "ai", defaultAllowed: true },
    { id: "Google-Extended", name: "Google-Extended", description: "Google - Entraînement Gemini/Bard", category: "ai", defaultAllowed: false },
    { id: "Bytespider", name: "Bytespider", description: "ByteDance - TikTok/Doubao AI", category: "ai", defaultAllowed: false },
    { id: "CCBot", name: "CCBot", description: "Common Crawl - Dataset public IA", category: "ai", defaultAllowed: false },
    { id: "Applebot-Extended", name: "Applebot-Extended", description: "Apple - Entraînement Apple Intelligence", category: "ai", defaultAllowed: false },
    { id: "Amazonbot", name: "Amazonbot", description: "Amazon - Alexa et services AWS", category: "ai", defaultAllowed: true },
    { id: "anthropic-ai", name: "anthropic-ai", description: "Anthropic - Crawler alternatif Claude", category: "ai", defaultAllowed: true },
    { id: "cohere-ai", name: "cohere-ai", description: "Cohere - Entraînement modèles IA", category: "ai", defaultAllowed: false },

    // Réseaux sociaux
    { id: "facebookexternalhit", name: "FacebookExternalHit", description: "Meta - Aperçus Facebook/Instagram", category: "social", defaultAllowed: true },
    { id: "Twitterbot", name: "Twitterbot", description: "X/Twitter - Aperçus de liens", category: "social", defaultAllowed: true },
    { id: "LinkedInBot", name: "LinkedInBot", description: "LinkedIn - Aperçus de liens", category: "social", defaultAllowed: true },
];

const PRESETS = {
    recommended: {
        name: "Recommandé",
        description: "Configuration optimale : visible par les moteurs de recherche et les IA de recherche, protégé contre l'entraînement abusif.",
        settings: {
            "Googlebot": true, "Bingbot": true, "DuckDuckBot": true, "Yandex": true, "Baiduspider": true,
            "GPTBot": true, "ChatGPT-User": true, "OAI-SearchBot": true, "Claude-Web": true, "PerplexityBot": true,
            "Google-Extended": false, "Bytespider": false, "CCBot": false, "Applebot-Extended": false,
            "Amazonbot": true, "anthropic-ai": true, "cohere-ai": false,
            "facebookexternalhit": true, "Twitterbot": true, "LinkedInBot": true,
        }
    },
    open: {
        name: "Tout autoriser",
        description: "Accès total à tous les crawlers. Maximise la visibilité mais autorise l'entraînement IA.",
        settings: Object.fromEntries(CRAWLERS.map(c => [c.id, true]))
    },
    protective: {
        name: "Protecteur",
        description: "Bloque l'entraînement IA mais garde la recherche. Équilibre visibilité et protection.",
        settings: {
            "Googlebot": true, "Bingbot": true, "DuckDuckBot": true, "Yandex": true, "Baiduspider": true,
            "GPTBot": false, "ChatGPT-User": true, "OAI-SearchBot": true, "Claude-Web": true, "PerplexityBot": true,
            "Google-Extended": false, "Bytespider": false, "CCBot": false, "Applebot-Extended": false,
            "Amazonbot": false, "anthropic-ai": false, "cohere-ai": false,
            "facebookexternalhit": true, "Twitterbot": true, "LinkedInBot": true,
        }
    },
    lockdown: {
        name: "Verrouillé",
        description: "Bloque toutes les IA. Seulement les moteurs de recherche classiques.",
        settings: {
            "Googlebot": true, "Bingbot": true, "DuckDuckBot": true, "Yandex": true, "Baiduspider": true,
            "GPTBot": false, "ChatGPT-User": false, "OAI-SearchBot": false, "Claude-Web": false, "PerplexityBot": false,
            "Google-Extended": false, "Bytespider": false, "CCBot": false, "Applebot-Extended": false,
            "Amazonbot": false, "anthropic-ai": false, "cohere-ai": false,
            "facebookexternalhit": true, "Twitterbot": true, "LinkedInBot": true,
        }
    }
};

export function RobotsGenerator() {
    const [crawlerSettings, setCrawlerSettings] = useState<Record<string, boolean>>(
        PRESETS.recommended.settings
    );
    const [customDisallow, setCustomDisallow] = useState("/admin/\n/private/");
    const [sitemapUrl, setSitemapUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [activePreset, setActivePreset] = useState<string>("recommended");

    const applyPreset = (presetId: string) => {
        const preset = PRESETS[presetId as keyof typeof PRESETS];
        if (preset) {
            setCrawlerSettings(preset.settings);
            setActivePreset(presetId);
        }
    };

    const toggleCrawler = (crawlerId: string) => {
        setCrawlerSettings(prev => ({
            ...prev,
            [crawlerId]: !prev[crawlerId]
        }));
        setActivePreset(""); // Reset preset indicator when manually changing
    };

    const robotsTxt = useMemo(() => {
        let content = "# robots.txt généré par INDHACK.com\n";
        content += "# https://indhack.com/outils/generateur-robots-txt\n\n";

        // Group by allowed status
        const allowed = CRAWLERS.filter(c => crawlerSettings[c.id]);
        const blocked = CRAWLERS.filter(c => !crawlerSettings[c.id]);

        // Default rule for all bots
        content += "# Règle par défaut\n";
        content += "User-agent: *\n";
        content += "Allow: /\n";

        // Custom disallow rules
        if (customDisallow.trim()) {
            customDisallow.split("\n").filter(d => d.trim()).forEach(path => {
                content += `Disallow: ${path.trim()}\n`;
            });
        }
        content += "\n";

        // Blocked crawlers
        if (blocked.length > 0) {
            content += "# Crawlers bloqués\n";
            blocked.forEach(crawler => {
                content += `User-agent: ${crawler.id}\n`;
                content += "Disallow: /\n\n";
            });
        }

        // Sitemap
        if (sitemapUrl.trim()) {
            content += `# Sitemap\nSitemap: ${sitemapUrl.trim()}\n`;
        }

        return content;
    }, [crawlerSettings, customDisallow, sitemapUrl]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(robotsTxt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([robotsTxt], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "robots.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Stats
    const aiCrawlers = CRAWLERS.filter(c => c.category === "ai");
    const allowedAI = aiCrawlers.filter(c => crawlerSettings[c.id]).length;
    const totalAI = aiCrawlers.length;

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-6">
                {/* Presets */}
                <div className="bg-white rounded-2xl border border-line p-6">
                    <h2 className="font-bold text-ink mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-sauge" />
                        Configurations prédéfinies
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(PRESETS).map(([id, preset]) => (
                            <button
                                key={id}
                                onClick={() => applyPreset(id)}
                                className={`p-4 rounded-xl text-left transition-all ${
                                    activePreset === id
                                        ? "bg-sauge text-white"
                                        : "bg-gray-50 hover:bg-gray-100 text-ink"
                                }`}
                            >
                                <div className="font-bold text-sm">{preset.name}</div>
                                <div className={`text-xs mt-1 ${activePreset === id ? "text-white/80" : "text-soft"}`}>
                                    {preset.description.slice(0, 60)}...
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Visibility Indicator */}
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 border border-violet-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-violet-600" />
                            <span className="font-bold text-ink">Visibilité IA</span>
                        </div>
                        <span className="text-2xl font-bold text-violet-600">{allowedAI}/{totalAI}</span>
                    </div>
                    <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-violet-500 transition-all duration-300"
                            style={{ width: `${(allowedAI / totalAI) * 100}%` }}
                        />
                    </div>
                    <p className="text-sm text-soft mt-2">
                        {allowedAI === totalAI
                            ? "Votre site sera visible par toutes les IA"
                            : allowedAI === 0
                            ? "Votre site sera invisible pour les IA"
                            : `${allowedAI} crawlers IA peuvent accéder à votre site`}
                    </p>
                </div>

                {/* Crawler Toggles by Category */}
                <div className="space-y-4">
                    {/* Search Engines */}
                    <CrawlerSection
                        title="Moteurs de recherche"
                        icon={<Search className="w-5 h-5 text-green-600" />}
                        crawlers={CRAWLERS.filter(c => c.category === "search")}
                        settings={crawlerSettings}
                        onToggle={toggleCrawler}
                    />

                    {/* AI Crawlers */}
                    <CrawlerSection
                        title="Crawlers IA (2026)"
                        icon={<Bot className="w-5 h-5 text-violet-600" />}
                        crawlers={CRAWLERS.filter(c => c.category === "ai")}
                        settings={crawlerSettings}
                        onToggle={toggleCrawler}
                        highlight
                    />

                    {/* Social */}
                    <CrawlerSection
                        title="Réseaux sociaux"
                        icon={<Globe className="w-5 h-5 text-blue-600" />}
                        crawlers={CRAWLERS.filter(c => c.category === "social")}
                        settings={crawlerSettings}
                        onToggle={toggleCrawler}
                    />
                </div>

                {/* Custom Disallow */}
                <div className="bg-white rounded-2xl border border-line p-6">
                    <label className="block font-bold text-ink mb-2">
                        Chemins à bloquer (Disallow)
                    </label>
                    <p className="text-sm text-soft mb-3">Un chemin par ligne. Ex: /admin/, /private/</p>
                    <textarea
                        value={customDisallow}
                        onChange={(e) => setCustomDisallow(e.target.value)}
                        rows={4}
                        placeholder="/admin/&#10;/private/&#10;/wp-admin/"
                        className="w-full px-4 py-3 border border-line rounded-xl font-mono text-sm focus:ring-2 focus:ring-sauge/20 focus:border-sauge"
                    />
                </div>

                {/* Sitemap */}
                <div className="bg-white rounded-2xl border border-line p-6">
                    <label className="block font-bold text-ink mb-2">URL du Sitemap</label>
                    <input
                        type="url"
                        value={sitemapUrl}
                        onChange={(e) => setSitemapUrl(e.target.value)}
                        placeholder="https://example.com/sitemap.xml"
                        className="w-full px-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-sauge/20 focus:border-sauge"
                    />
                </div>
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
                {/* Preview */}
                <div className="bg-white rounded-2xl border border-line overflow-hidden sticky top-24">
                    <div className="flex items-center justify-between p-4 border-b border-line bg-gray-50">
                        <span className="font-bold text-ink">robots.txt</span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-soft hover:text-sauge transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Télécharger
                            </button>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-1.5 bg-sauge text-white rounded-lg text-sm font-medium hover:bg-sauge/90 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copié !" : "Copier"}
                            </button>
                        </div>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto max-h-[500px] bg-gray-900 text-gray-100 font-mono">
                        {robotsTxt}
                    </pre>
                </div>

                {/* Instructions */}
                <div className="bg-sauge/10 rounded-2xl p-6">
                    <h3 className="font-bold text-ink mb-3">Comment utiliser ce fichier ?</h3>
                    <ol className="space-y-2 text-sm text-soft">
                        <li>1. Téléchargez ou copiez le fichier robots.txt</li>
                        <li>2. Placez-le à la racine de votre site (ex: example.com/robots.txt)</li>
                        <li>3. Vérifiez l'accès : <code className="bg-white px-1.5 py-0.5 rounded">votre-site.com/robots.txt</code></li>
                        <li>4. Testez dans Google Search Console &gt; robots.txt Tester</li>
                    </ol>
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <div className="flex gap-3">
                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-amber-800 mb-2">À savoir</h4>
                            <p className="text-sm text-amber-700">
                                Le robots.txt est une <strong>directive</strong>, pas une obligation. Les bots bien intentionnés le respectent,
                                mais il ne protège pas contre le scraping malveillant. Pour une vraie protection,
                                utilisez des solutions techniques (WAF, authentification).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CrawlerSection({
    title,
    icon,
    crawlers,
    settings,
    onToggle,
    highlight = false,
}: {
    title: string;
    icon: React.ReactNode;
    crawlers: Crawler[];
    settings: Record<string, boolean>;
    onToggle: (id: string) => void;
    highlight?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`bg-white rounded-2xl border ${highlight ? 'border-violet-200' : 'border-line'} overflow-hidden`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-bold text-ink">{title}</span>
                    <span className="text-sm text-soft">
                        ({crawlers.filter(c => settings[c.id]).length}/{crawlers.length})
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 text-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="border-t border-line p-4 space-y-3">
                    {crawlers.map((crawler) => (
                        <div
                            key={crawler.id}
                            className="flex items-center justify-between py-2"
                        >
                            <div className="flex-1">
                                <div className="font-medium text-ink text-sm">{crawler.name}</div>
                                <div className="text-xs text-soft">{crawler.description}</div>
                            </div>
                            <button
                                onClick={() => onToggle(crawler.id)}
                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                    settings[crawler.id] ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                                        settings[crawler.id] ? 'left-7' : 'left-1'
                                    }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
