"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Download, Info, Shield, Eye, Bot, Search, Globe, Zap, Lock, Unlock } from "lucide-react";

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
        description: "Visibilité IA + protection de l'entraînement",
        icon: Zap,
        gradient: "from-sauge to-emerald-600",
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
        description: "Accès total à tous les crawlers",
        icon: Unlock,
        gradient: "from-blue-500 to-cyan-500",
        settings: Object.fromEntries(CRAWLERS.map(c => [c.id, true]))
    },
    protective: {
        name: "Protecteur",
        description: "Bloque l'entraînement IA",
        icon: Shield,
        gradient: "from-amber-500 to-orange-500",
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
        description: "Aucune IA, moteurs classiques seulement",
        icon: Lock,
        gradient: "from-red-500 to-rose-600",
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
        setActivePreset("");
    };

    const robotsTxt = useMemo(() => {
        let content = "# robots.txt généré par INDHACK.com\n";
        content += "# https://indhack.com/outils/generateur-robots-txt\n\n";

        const blocked = CRAWLERS.filter(c => !crawlerSettings[c.id]);

        content += "# Règle par défaut\n";
        content += "User-agent: *\n";
        content += "Allow: /\n";

        if (customDisallow.trim()) {
            customDisallow.split("\n").filter(d => d.trim()).forEach(path => {
                content += `Disallow: ${path.trim()}\n`;
            });
        }
        content += "\n";

        if (blocked.length > 0) {
            content += "# Crawlers bloqués\n";
            blocked.forEach(crawler => {
                content += `User-agent: ${crawler.id}\n`;
                content += "Disallow: /\n\n";
            });
        }

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
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-sauge" />
                        Configurations prédéfinies
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(PRESETS).map(([id, preset]) => {
                            const Icon = preset.icon;
                            return (
                                <button
                                    key={id}
                                    onClick={() => applyPreset(id)}
                                    className={`p-4 rounded-xl text-left transition-all ${
                                        activePreset === id
                                            ? "bg-white/10 border-2 border-sauge"
                                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${preset.gradient} flex items-center justify-center mb-2`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="font-bold text-white text-sm">{preset.name}</div>
                                    <div className="text-xs text-white/50 mt-1">{preset.description}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* AI Visibility Indicator */}
                <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/10 rounded-2xl p-6 border border-violet-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-violet-400" />
                            <span className="font-bold text-white">Visibilité IA</span>
                        </div>
                        <span className="text-2xl font-bold text-violet-400">{allowedAI}/{totalAI}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${(allowedAI / totalAI) * 100}%` }}
                        />
                    </div>
                    <p className="text-sm text-white/60 mt-3">
                        {allowedAI === totalAI
                            ? "Votre site sera visible par toutes les IA"
                            : allowedAI === 0
                            ? "Votre site sera invisible pour les IA"
                            : `${allowedAI} crawlers IA peuvent accéder à votre site`}
                    </p>
                </div>

                {/* Crawler Toggles by Category */}
                <div className="space-y-4">
                    <CrawlerSection
                        title="Moteurs de recherche"
                        icon={<Search className="w-5 h-5 text-emerald-400" />}
                        crawlers={CRAWLERS.filter(c => c.category === "search")}
                        settings={crawlerSettings}
                        onToggle={toggleCrawler}
                        color="emerald"
                    />

                    <CrawlerSection
                        title="Crawlers IA (2026)"
                        icon={<Bot className="w-5 h-5 text-violet-400" />}
                        crawlers={CRAWLERS.filter(c => c.category === "ai")}
                        settings={crawlerSettings}
                        onToggle={toggleCrawler}
                        color="violet"
                        highlight
                    />

                    <CrawlerSection
                        title="Réseaux sociaux"
                        icon={<Globe className="w-5 h-5 text-blue-400" />}
                        crawlers={CRAWLERS.filter(c => c.category === "social")}
                        settings={crawlerSettings}
                        onToggle={toggleCrawler}
                        color="blue"
                    />
                </div>

                {/* Custom Disallow */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <label className="block font-bold text-white mb-2">
                        Chemins à bloquer (Disallow)
                    </label>
                    <p className="text-sm text-white/50 mb-3">Un chemin par ligne. Ex: /admin/, /private/</p>
                    <textarea
                        value={customDisallow}
                        onChange={(e) => setCustomDisallow(e.target.value)}
                        rows={4}
                        placeholder="/admin/&#10;/private/&#10;/wp-admin/"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50"
                    />
                </div>

                {/* Sitemap */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <label className="block font-bold text-white mb-2">URL du Sitemap</label>
                    <input
                        type="url"
                        value={sitemapUrl}
                        onChange={(e) => setSitemapUrl(e.target.value)}
                        placeholder="https://example.com/sitemap.xml"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-sauge/50 focus:border-sauge/50"
                    />
                </div>
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
                {/* Preview */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden sticky top-24">
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="w-3 h-3 rounded-full bg-amber-500" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                            </div>
                            <span className="font-mono text-sm text-white/60 ml-2">robots.txt</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Télécharger
                            </button>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-1.5 bg-sauge text-white rounded-lg text-sm font-medium hover:bg-sauge/80 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copié !" : "Copier"}
                            </button>
                        </div>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto max-h-[500px] font-mono">
                        <code className="text-white/80">
                            {robotsTxt.split('\n').map((line, i) => (
                                <div key={i} className="leading-relaxed">
                                    {line.startsWith('#') ? (
                                        <span className="text-emerald-400">{line}</span>
                                    ) : line.startsWith('User-agent:') ? (
                                        <>
                                            <span className="text-violet-400">User-agent:</span>
                                            <span className="text-white">{line.replace('User-agent:', '')}</span>
                                        </>
                                    ) : line.startsWith('Disallow:') ? (
                                        <>
                                            <span className="text-red-400">Disallow:</span>
                                            <span className="text-white/60">{line.replace('Disallow:', '')}</span>
                                        </>
                                    ) : line.startsWith('Allow:') ? (
                                        <>
                                            <span className="text-emerald-400">Allow:</span>
                                            <span className="text-white/60">{line.replace('Allow:', '')}</span>
                                        </>
                                    ) : line.startsWith('Sitemap:') ? (
                                        <>
                                            <span className="text-cyan-400">Sitemap:</span>
                                            <span className="text-white/60">{line.replace('Sitemap:', '')}</span>
                                        </>
                                    ) : (
                                        <span>{line}</span>
                                    )}
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>

                {/* Instructions */}
                <div className="bg-sauge/10 rounded-2xl p-6 border border-sauge/20">
                    <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-sauge" />
                        Comment utiliser ce fichier ?
                    </h3>
                    <ol className="space-y-2 text-sm text-white/70">
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-sauge flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                            <span>Téléchargez ou copiez le fichier robots.txt</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-sauge flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                            <span>Placez-le à la racine de votre site (ex: example.com/robots.txt)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-sauge flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                            <span>Vérifiez l'accès : <code className="bg-white/10 px-1.5 py-0.5 rounded text-sauge">votre-site.com/robots.txt</code></span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-sauge/20 text-sauge flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                            <span>Testez dans Google Search Console &gt; robots.txt Tester</span>
                        </li>
                    </ol>
                </div>

                {/* Info Box */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                    <div className="flex gap-3">
                        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-amber-400 mb-2">À savoir</h4>
                            <p className="text-sm text-white/70">
                                Le robots.txt est une <strong className="text-white">directive</strong>, pas une obligation. Les bots bien intentionnés le respectent,
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
    color = "white",
    highlight = false,
}: {
    title: string;
    icon: React.ReactNode;
    crawlers: Crawler[];
    settings: Record<string, boolean>;
    onToggle: (id: string) => void;
    color?: "emerald" | "violet" | "blue" | "white";
    highlight?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(highlight);

    const borderColor = highlight ? `border-${color}-500/30` : "border-white/10";

    return (
        <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border ${highlight ? 'border-violet-500/30' : 'border-white/10'} overflow-hidden`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-bold text-white">{title}</span>
                    <span className="text-sm text-white/50">
                        ({crawlers.filter(c => settings[c.id]).length}/{crawlers.length})
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="border-t border-white/10 p-4 space-y-3">
                    {crawlers.map((crawler) => (
                        <div
                            key={crawler.id}
                            className="flex items-center justify-between py-2"
                        >
                            <div className="flex-1">
                                <div className="font-medium text-white text-sm">{crawler.name}</div>
                                <div className="text-xs text-white/50">{crawler.description}</div>
                            </div>
                            <button
                                onClick={() => onToggle(crawler.id)}
                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                    settings[crawler.id]
                                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                                        : 'bg-white/10'
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
