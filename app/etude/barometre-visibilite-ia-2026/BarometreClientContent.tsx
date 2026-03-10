"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import {
    ArrowRight,
    Bot,
    Shield,
    ShieldOff,
    TrendingDown,
    TrendingUp,
    AlertTriangle,
    Globe,
    ChevronDown,
    ChevronUp,
    Search,
    FileText,
    Zap,
    Target,
    CheckCircle2,
    Info,
    ExternalLink,
    Sparkles,
    Eye,
    EyeOff,
    Database,
    Code,
    FileCode,
    MessageSquare,
    Users,
    BarChart3,
    PieChart,
    Lock,
    Unlock,
    BookOpen,
    Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA - Sources vérifiées
// ═══════════════════════════════════════════════════════════════════════════════

const STUDY_DATA = {
    hero: {
        blocking: {
            value: 45.5,
            label: "des top 1000 sites bloquent au moins un crawler IA",
            source: "Originresearch.com (2025)",
            sourceUrl: "https://originresearch.com"
        },
        chatgptPrompts: {
            value: 2.5,
            unit: "Mrd",
            label: "de prompts envoyés à ChatGPT chaque jour",
            source: "TechCrunch (juillet 2025)",
            sourceUrl: "https://techcrunch.com/2025/07/21/chatgpt-users-send-2-5-billion-prompts-a-day/"
        },
        perplexityGrowth: {
            value: 800,
            label: "de croissance utilisateurs Perplexity en 12 mois",
            source: "DemandSage (2026)",
            sourceUrl: "https://www.demandsage.com/perplexity-ai-statistics/"
        },
        gartnerPrediction: {
            value: -25,
            label: "de volume de recherche traditionnelle d'ici fin 2026",
            source: "Gartner (février 2024)",
            sourceUrl: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents"
        }
    },
    constats: [
        {
            id: 1,
            icon: "search",
            title: "Le zéro-clic domine",
            stat: "58-60%",
            description: "des recherches Google se terminent sans aucun clic vers un site web. Ce chiffre monte à 83% quand un AI Overview est affiché.",
            source: "Semrush Zero-Click Study 2025",
            sourceUrl: "https://www.semrush.com/blog/zero-click-searches/"
        },
        {
            id: 2,
            icon: "sparkles",
            title: "Les AI Overviews envahissent Google",
            stat: "48%",
            description: "des recherches Google déclenchent un AI Overview (données février 2026). Ce chiffre a augmenté de 58% en un an.",
            source: "BrightEdge (fév. 2026)",
            sourceUrl: "https://www.brightedge.com"
        },
        {
            id: 3,
            icon: "users",
            title: "La Gen Z migre vers l'IA",
            stat: "28%",
            description: "des 18-24 ans commencent leurs recherches sur ChatGPT plutôt que Google. L'usage de ChatGPT chez cette tranche d'âge est à 3% d'écart avec Google.",
            source: "Adobe & ContentGrip (2025)",
            sourceUrl: "https://contentgrip.com"
        },
        {
            id: 4,
            icon: "trending-up",
            title: "Le GEO multiplie la visibilité",
            stat: "+30-40%",
            description: "d'amélioration de la visibilité dans les réponses IA pour les sites optimisés GEO. Citer des sources et intégrer des statistiques sont les stratégies les plus efficaces.",
            source: "Princeton University (KDD 2024)",
            sourceUrl: "https://arxiv.org/abs/2311.09735"
        },
        {
            id: 5,
            icon: "lock",
            title: "GPTBot est le crawler le plus bloqué",
            stat: "5,6M",
            description: "de sites web ont ajouté GPTBot à leur liste de blocage robots.txt (+336% selon Tollbit Q2 2025). 21% des top 1000 sites bloquent spécifiquement GPTBot.",
            source: "Cloudflare Blog (2025)",
            sourceUrl: "https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/"
        },
        {
            id: 6,
            icon: "file-text",
            title: "Le fichier llms.txt est quasi inexistant",
            stat: "<5%",
            description: "des sites possèdent un fichier llms.txt. C'est l'équivalent du robots.txt pour les IA : il indique aux LLM quelles pages sont les plus importantes.",
            source: "Analyse IndHack (mars 2026)",
            sourceUrl: null
        },
        {
            id: 7,
            icon: "code",
            title: "Les données structurées font la différence",
            stat: "JSON-LD",
            description: "Les sites avec des données structurées (FAQPage, Article, Organization) sont significativement mieux cités par les IA qui extraient directement ces informations.",
            source: "Étude GEO Princeton (KDD 2024)",
            sourceUrl: "https://arxiv.org/abs/2311.09735"
        }
    ],
    crawlers: [
        { name: "GPTBot (OpenAI)", blocked: 21, color: "from-red-500 to-orange-500" },
        { name: "Google-Extended", blocked: 18, color: "from-blue-500 to-cyan-500" },
        { name: "CCBot (Common Crawl)", blocked: 15, color: "from-purple-500 to-pink-500" },
        { name: "Bytespider (ByteDance)", blocked: 12, color: "from-green-500 to-emerald-500" },
        { name: "Claude-Web (Anthropic)", blocked: 10, color: "from-amber-500 to-yellow-500" },
        { name: "PerplexityBot", blocked: 8, color: "from-violet-500 to-purple-500" }
    ],
    sectors: [
        { name: "Médias / Presse", blocked: 79, verified: true, source: "Press Gazette 2025" },
        { name: "E-commerce", blocked: 55, verified: false, source: "Estimation Cloudflare" },
        { name: "Finance / Banque", blocked: 60, verified: false, source: "Estimation sectorielle" },
        { name: "Santé", blocked: 50, verified: false, source: "Estimation sectorielle" },
        { name: "Services B2B", blocked: 40, verified: false, source: "Estimation sectorielle" },
        { name: "Tech / SaaS", blocked: 30, verified: false, source: "Estimation sectorielle" },
        { name: "Tourisme", blocked: 45, verified: false, source: "Estimation sectorielle" }
    ],
    cms: [
        { name: "WordPress (défaut)", gptbot: true, perplexity: true, claude: true, googleExt: true, note: "Autorise tout par défaut" },
        { name: "WP + Yoast/RankMath", gptbot: "partial", perplexity: true, claude: true, googleExt: "partial", note: "Peut bloquer selon config" },
        { name: "Shopify", gptbot: false, perplexity: true, claude: true, googleExt: false, note: "Bloque GPTBot par défaut" },
        { name: "Wix", gptbot: false, perplexity: false, claude: false, googleExt: false, note: "Bloque tous les crawlers IA" },
        { name: "Squarespace", gptbot: false, perplexity: "partial", claude: true, googleExt: false, note: "Blocage partiel" },
        { name: "Next.js / Custom", gptbot: true, perplexity: true, claude: true, googleExt: true, note: "Contrôle total" },
        { name: "Webflow", gptbot: "partial", perplexity: true, claude: true, googleExt: "partial", note: "Variable selon config" }
    ],
    recommendations: [
        {
            title: "Auditez votre robots.txt immédiatement",
            description: "Vérifiez que GPTBot, PerplexityBot et Claude-Web ne sont pas bloqués. La majorité des sites le font sans le savoir, surtout sur Shopify et Wix.",
            cta: "Testez gratuitement",
            link: "/outils/testeur-visibilite-ia",
            icon: "shield"
        },
        {
            title: "Créez votre fichier llms.txt",
            description: "Moins de 5% des sites en possèdent un. Il indique aux LLM quelles pages sont les plus importantes. Premier arrivé, premier servi.",
            cta: "Guide complet llms.txt",
            link: "/blog/llms-txt-guide-complet",
            icon: "file-text"
        },
        {
            title: "Implémentez les données structurées JSON-LD",
            description: "FAQPage, Article, Organization, LocalBusiness, HowTo — ces schemas sont lus directement par les IA pour construire leurs réponses.",
            cta: "Générateur JSON-LD gratuit",
            link: "/outils/generateur-schema-json-ld",
            icon: "code"
        },
        {
            title: "Distinguez crawlers de navigation et d'entraînement",
            description: "GPTBot-User (navigation) = cite votre site. GPTBot (training) = utilise votre contenu pour entraîner le modèle. Vous pouvez autoriser l'un et bloquer l'autre.",
            cta: "Générateur robots.txt IA",
            link: "/outils/generateur-robots-txt",
            icon: "bot"
        },
        {
            title: "Structurez votre contenu pour la citabilité",
            description: "Les IA citent les contenus qui répondent directement aux questions en 2-3 phrases, incluent des données chiffrées sourcées et utilisent des tableaux comparatifs.",
            cta: null,
            link: null,
            icon: "target"
        },
        {
            title: "Publiez régulièrement du contenu frais",
            description: "Perplexity privilégie le contenu récent. Les sites qui publient 1-2 articles par semaine sont cités significativement plus souvent.",
            cta: null,
            link: null,
            icon: "zap"
        },
        {
            title: "Mesurez et itérez",
            description: "Testez régulièrement votre visibilité. Posez des questions à ChatGPT et Perplexity sur votre domaine d'expertise. Votre site apparaît-il dans les réponses ?",
            cta: "Tester ma visibilité IA",
            link: "/outils/testeur-visibilite-ia",
            icon: "eye"
        }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2, decimals = 0 }: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    decimals?: number;
}) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(decimals > 0 ? Math.floor(start * Math.pow(10, decimals)) / Math.pow(10, decimals) : Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, value, duration, decimals]);

    return (
        <span ref={ref} className="font-mono tabular-nums">
            {prefix}{displayValue.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
        </span>
    );
}

function GlowingOrb({ color, size, position, delay = 0 }: { color: string; size: string; position: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
            className={`absolute ${position} ${size} ${color} rounded-full blur-[100px] pointer-events-none`}
        />
    );
}

function HeroStatCard({ stat, index }: { stat: typeof STUDY_DATA.hero.blocking & { value: number; unit?: string; label: string }; index: number }) {
    const colors = [
        { bg: "from-red-500/20 to-orange-500/10", border: "border-red-500/30", text: "text-red-400", glow: "shadow-red-500/20" },
        { bg: "from-violet-500/20 to-purple-500/10", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-violet-500/20" },
        { bg: "from-emerald-500/20 to-green-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
        { bg: "from-amber-500/20 to-yellow-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/20" }
    ];
    const color = colors[index % colors.length];

    return (
        <motion.div
            variants={scaleIn}
            className={`group relative overflow-hidden rounded-2xl border ${color.border} bg-gradient-to-br ${color.bg} backdrop-blur-xl p-6 hover:scale-[1.02] transition-transform duration-300 shadow-2xl ${color.glow}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                <div className="flex items-baseline gap-1 mb-3">
                    <span className={`text-5xl md:text-6xl font-bold font-mono tracking-tight ${color.text}`}>
                        <AnimatedCounter
                            value={Math.abs(stat.value)}
                            prefix={stat.value < 0 ? "-" : (index === 2 ? "+" : "")}
                            suffix={stat.unit || "%"}
                            duration={1.5 + index * 0.3}
                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                        />
                    </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{stat.label}</p>
                <a
                    href={stat.sourceUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {stat.source}
                    {stat.sourceUrl && <ExternalLink className="w-3 h-3" />}
                </a>
            </div>
        </motion.div>
    );
}

function ConstatCard({ constat }: { constat: typeof STUDY_DATA.constats[0] }) {
    const iconMap: Record<string, React.ReactNode> = {
        "search": <Search className="w-5 h-5" />,
        "sparkles": <Sparkles className="w-5 h-5" />,
        "users": <Users className="w-5 h-5" />,
        "trending-up": <TrendingUp className="w-5 h-5" />,
        "lock": <Lock className="w-5 h-5" />,
        "file-text": <FileText className="w-5 h-5" />,
        "code": <Code className="w-5 h-5" />
    };

    return (
        <motion.div
            variants={fadeInUp}
            className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 text-accent">
                    {iconMap[constat.icon]}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
                    #{String(constat.id).padStart(2, '0')}
                </span>
            </div>

            <h3 className="font-bold text-white/90 text-lg mb-2">{constat.title}</h3>

            <div className="mb-4">
                <span className="text-3xl font-mono font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {constat.stat}
                </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-4">{constat.description}</p>

            {constat.sourceUrl ? (
                <a
                    href={constat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-accent/70 hover:text-accent transition-colors"
                >
                    {constat.source}
                    <ExternalLink className="w-3 h-3" />
                </a>
            ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/30">
                    {constat.source}
                </span>
            )}
        </motion.div>
    );
}

function CrawlerBar({ crawler, index }: { crawler: typeof STUDY_DATA.crawlers[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            className="group"
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70 font-medium">{crawler.name}</span>
                <span className="font-mono text-white font-bold">{crawler.blocked}%</span>
            </div>
            <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${crawler.blocked}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${crawler.color}`}
                />
            </div>
        </motion.div>
    );
}

function CMSCompatibilityTable() {
    const getStatusIcon = (status: boolean | string) => {
        if (status === true) return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        if (status === false) return <ShieldOff className="w-4 h-4 text-red-400" />;
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    };

    const getStatusBg = (status: boolean | string) => {
        if (status === true) return "bg-emerald-500/10";
        if (status === false) return "bg-red-500/10";
        return "bg-amber-500/10";
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-4 px-4 text-[10px] font-mono uppercase tracking-wider text-white/40">CMS</th>
                        <th className="text-center py-4 px-3 text-[10px] font-mono uppercase tracking-wider text-white/40">GPTBot</th>
                        <th className="text-center py-4 px-3 text-[10px] font-mono uppercase tracking-wider text-white/40">Perplexity</th>
                        <th className="text-center py-4 px-3 text-[10px] font-mono uppercase tracking-wider text-white/40">Claude</th>
                        <th className="text-center py-4 px-3 text-[10px] font-mono uppercase tracking-wider text-white/40">Google-Ext</th>
                        <th className="text-left py-4 px-4 text-[10px] font-mono uppercase tracking-wider text-white/40">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {STUDY_DATA.cms.map((cms, i) => (
                        <motion.tr
                            key={cms.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${cms.name === "Next.js / Custom" ? "bg-emerald-500/[0.03]" : ""}`}
                        >
                            <td className="py-4 px-4">
                                <span className={`font-medium ${cms.name === "Next.js / Custom" ? "text-emerald-400" : "text-white/80"}`}>
                                    {cms.name}
                                </span>
                            </td>
                            <td className="text-center py-4 px-3">
                                <div className={`inline-flex p-1.5 rounded-lg ${getStatusBg(cms.gptbot)}`}>
                                    {getStatusIcon(cms.gptbot)}
                                </div>
                            </td>
                            <td className="text-center py-4 px-3">
                                <div className={`inline-flex p-1.5 rounded-lg ${getStatusBg(cms.perplexity)}`}>
                                    {getStatusIcon(cms.perplexity)}
                                </div>
                            </td>
                            <td className="text-center py-4 px-3">
                                <div className={`inline-flex p-1.5 rounded-lg ${getStatusBg(cms.claude)}`}>
                                    {getStatusIcon(cms.claude)}
                                </div>
                            </td>
                            <td className="text-center py-4 px-3">
                                <div className={`inline-flex p-1.5 rounded-lg ${getStatusBg(cms.googleExt)}`}>
                                    {getStatusIcon(cms.googleExt)}
                                </div>
                            </td>
                            <td className="py-4 px-4 text-xs text-white/50">{cms.note}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function RecommendationCard({ rec, index }: { rec: typeof STUDY_DATA.recommendations[0]; index: number }) {
    const iconMap: Record<string, React.ReactNode> = {
        "shield": <Shield className="w-5 h-5" />,
        "file-text": <FileText className="w-5 h-5" />,
        "code": <Code className="w-5 h-5" />,
        "bot": <Bot className="w-5 h-5" />,
        "target": <Target className="w-5 h-5" />,
        "zap": <Zap className="w-5 h-5" />,
        "eye": <Eye className="w-5 h-5" />
    };

    return (
        <motion.div
            variants={fadeInUp}
            className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-300"
        >
            <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 text-accent shrink-0">
                    <span className="font-mono font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white/90 mb-2">{rec.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{rec.description}</p>
                    {rec.cta && rec.link && (
                        <Link
                            href={rec.link}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
                        >
                            {rec.cta}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
                <div className="hidden md:block p-2 rounded-lg bg-white/[0.02] text-white/30">
                    {iconMap[rec.icon]}
                </div>
            </div>
        </motion.div>
    );
}

function DataStreamLine() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset(prev => (prev + 1) % 200);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const dataPoints = "▪ GPTBOT:21% ▪ PERPLEXITY:8% ▪ CLAUDE:10% ▪ GOOGLE-EXT:18% ▪ CHATGPT:2.5B/jour ▪ ZERO-CLICK:60% ▪ AI-OVERVIEW:48% ▪ GEN-Z:28% ▪ GEO:+40% ▪ LLMS.TXT:<5% ▪ ";

    return (
        <div className="overflow-hidden py-3 border-y border-white/[0.04] bg-white/[0.01]">
            <div
                className="whitespace-nowrap font-mono text-[10px] text-white/15 tracking-[0.2em]"
                style={{ transform: `translateX(-${offset}px)` }}
            >
                {dataPoints.repeat(6)}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BarometreClientContent() {
    return (
        <main className="bg-[#060708] min-h-screen text-white selection:bg-accent/30 antialiased overflow-x-hidden">

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* DATA STREAM */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <DataStreamLine />

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* HERO SECTION */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-20 pb-24 overflow-hidden">
                {/* Orbes lumineux */}
                <GlowingOrb color="bg-violet-600/30" size="w-[600px] h-[600px]" position="top-[-200px] left-[-200px]" delay={0} />
                <GlowingOrb color="bg-accent/20" size="w-[400px] h-[400px]" position="top-[100px] right-[-100px]" delay={0.5} />
                <GlowingOrb color="bg-emerald-600/20" size="w-[300px] h-[300px]" position="bottom-[-100px] left-[30%]" delay={1} />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-xl">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span className="text-xs font-medium text-accent">Étude Exclusive Mars 2026</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Sources Vérifiées</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-[1.05] tracking-tight mb-6">
                            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Baromètre de la</span><br />
                            <span className="bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">Visibilité IA</span><br />
                            <span className="text-white/50">des Sites Français</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
                            Analyse complète de la compatibilité des sites web français avec
                            <span className="text-white/90 font-medium"> ChatGPT</span>,
                            <span className="text-white/90 font-medium"> Perplexity</span>,
                            <span className="text-white/90 font-medium"> Claude</span> et les moteurs de recherche IA.
                        </motion.p>

                        {/* Hero Stats Grid */}
                        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            <HeroStatCard stat={STUDY_DATA.hero.blocking} index={0} />
                            <HeroStatCard stat={STUDY_DATA.hero.chatgptPrompts} index={1} />
                            <HeroStatCard stat={STUDY_DATA.hero.perplexityGrowth} index={2} />
                            <HeroStatCard stat={STUDY_DATA.hero.gartnerPrediction} index={3} />
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-black font-bold rounded-full px-8 py-6 text-sm h-14 shadow-lg shadow-accent/25">
                                    Tester ma visibilité IA
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <a href="#constats">
                                <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white rounded-full px-8 py-6 text-sm font-bold h-14">
                                    Voir les 7 constats
                                    <ChevronDown className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* 7 CONSTATS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04]" id="constats">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-4">
                                <BarChart3 className="w-4 h-4 text-accent" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Section 01</span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 mb-4">Les 7 Constats Clés</h2>
                            <p className="text-white/50 max-w-xl mx-auto">Chaque donnée est sourcée et vérifiable. Survolez les sources pour plus de détails.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {STUDY_DATA.constats.map((constat) => (
                                <ConstatCard key={constat.id} constat={constat} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CRAWLERS BLOQUÉS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04] bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-4">
                                <Lock className="w-4 h-4 text-red-400" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Section 02</span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 mb-4">Crawlers IA les plus bloqués</h2>
                            <p className="text-white/50 max-w-xl">Pourcentage des 1000 premiers sites mondiaux bloquant chaque crawler.</p>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Barres */}
                            <div className="space-y-6">
                                {STUDY_DATA.crawlers.map((crawler, i) => (
                                    <CrawlerBar key={crawler.name} crawler={crawler} index={i} />
                                ))}
                                <motion.p variants={fadeInUp} className="text-[10px] font-mono text-white/30 pt-4 border-t border-white/[0.04]">
                                    Source : Cloudflare « From Googlebot to GPTBot » (2025), Paul Calvano (2025)
                                </motion.p>
                            </div>

                            {/* Secteurs */}
                            <motion.div variants={fadeInUp} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                                <h3 className="font-bold text-white/90 mb-6 flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-accent" />
                                    Taux de blocage par secteur
                                </h3>
                                <div className="space-y-4">
                                    {STUDY_DATA.sectors.map((sector) => (
                                        <div key={sector.name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-white/70">{sector.name}</span>
                                                {sector.verified && (
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${sector.blocked > 60 ? 'bg-gradient-to-r from-red-500 to-red-400' : sector.blocked > 40 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-emerald-500 to-emerald-400'}`}
                                                        style={{ width: `${sector.blocked}%` }}
                                                    />
                                                </div>
                                                <span className="font-mono text-white font-bold text-sm w-12 text-right">{sector.blocked}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] font-mono text-white/30 mt-6 pt-4 border-t border-white/[0.04]">
                                    Le chiffre médias (79%) est documenté par Press Gazette 2025. Les autres sont des estimations.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* COMPATIBILITÉ CMS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-4">
                                <FileCode className="w-4 h-4 text-violet-400" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Section 03</span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 mb-4">Compatibilité IA par CMS</h2>
                            <p className="text-white/50 max-w-xl">Configuration par défaut du robots.txt de chaque plateforme. Next.js offre un contrôle total.</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                            <CMSCompatibilityTable />
                        </motion.div>

                        <motion.p variants={fadeInUp} className="text-[10px] font-mono text-white/30 mt-4 text-center">
                            Source : Analyse IndHack des robots.txt par défaut de chaque CMS (mars 2026)
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* RECOMMANDATIONS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04] bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-4">
                                <Lightbulb className="w-4 h-4 text-accent" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-accent">Section 04</span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 mb-4">Nos 7 Recommandations</h2>
                            <p className="text-white/50 max-w-xl mx-auto">Actions concrètes pour optimiser votre visibilité dans les réponses IA.</p>
                        </motion.div>

                        <div className="space-y-4">
                            {STUDY_DATA.recommendations.map((rec, i) => (
                                <RecommendationCard key={rec.title} rec={rec} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* MÉTHODOLOGIE */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4">
                                <Database className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Méthodologie</span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 mb-4">Sources et Références</h2>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="w-5 h-5 text-white/50" />
                                <h3 className="font-bold text-white/90">Sources externes vérifiées</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                        <p className="font-mono text-accent text-xs mb-1">ChatGPT Prompts</p>
                                        <p className="text-white/70">2,5 milliards/jour</p>
                                        <a href="https://techcrunch.com/2025/07/21/chatgpt-users-send-2-5-billion-prompts-a-day/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1 mt-2">
                                            TechCrunch (juillet 2025) <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                        <p className="font-mono text-accent text-xs mb-1">Prédiction Gartner</p>
                                        <p className="text-white/70">-25% volume recherche d'ici 2026</p>
                                        <a href="https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1 mt-2">
                                            Gartner Newsroom (fév. 2024) <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                        <p className="font-mono text-accent text-xs mb-1">Zero-Click Searches</p>
                                        <p className="text-white/70">58-60% des recherches Google</p>
                                        <a href="https://www.semrush.com/blog/zero-click-searches/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1 mt-2">
                                            Semrush (2025) <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                        <p className="font-mono text-accent text-xs mb-1">Perplexity Growth</p>
                                        <p className="text-white/70">+800% en 12 mois, 45M utilisateurs</p>
                                        <a href="https://www.demandsage.com/perplexity-ai-statistics/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1 mt-2">
                                            DemandSage (2026) <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                        <p className="font-mono text-accent text-xs mb-1">Blocage Crawlers IA</p>
                                        <p className="text-white/70">79% des sites médias</p>
                                        <a href="https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1 mt-2">
                                            Cloudflare & Press Gazette (2025) <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                        <p className="font-mono text-accent text-xs mb-1">GEO Optimization</p>
                                        <p className="text-white/70">+30-40% visibilité IA</p>
                                        <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1 mt-2">
                                            Princeton University (KDD 2024) <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/[0.04]">
                                <p className="text-white/40 text-xs leading-relaxed">
                                    <strong className="text-white/60">Analyses IndHack :</strong> Le taux d'adoption llms.txt (&lt;5%) est basé sur notre vérification manuelle de 200+ sites francophones.
                                    La compatibilité CMS est issue de l'analyse des robots.txt par défaut de chaque plateforme.
                                    Les estimations sectorielles (hors médias) sont des fourchettes basées sur les tendances générales.
                                </p>
                            </div>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="text-center text-white/40 text-xs mt-6">
                            Étude libre de citation avec mention : « Baromètre Visibilité IA France 2026, IndHack (indhack.com) »
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CTA FINAL */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
                <GlowingOrb color="bg-accent/30" size="w-[500px] h-[500px]" position="top-[-100px] left-[50%] -translate-x-1/2" delay={0} />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-xl mb-6">
                            <Bot className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-accent">Test Gratuit</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                            Votre site est-il visible<br />par les IA ?
                        </h2>

                        <p className="text-white/50 mb-10 text-lg leading-relaxed">
                            Testez gratuitement en 30 secondes. Résultat immédiat, sans inscription.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-black font-bold rounded-full px-10 py-7 text-base h-16 shadow-lg shadow-accent/25">
                                    Tester ma visibilité IA
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026">
                                <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white rounded-full px-10 py-7 text-base font-bold h-16">
                                    Guide GEO complet
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer Data Stream */}
            <DataStreamLine />
        </main>
    );
}
