"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    Bot,
    Shield,
    ShieldOff,
    TrendingUp,
    AlertTriangle,
    Search,
    FileText,
    Zap,
    Target,
    CheckCircle2,
    ExternalLink,
    Sparkles,
    Eye,
    Users,
    BarChart3,
    Lock,
    Code,
    FileCode,
    BookOpen,
    Lightbulb,
    Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const STUDY_DATA = {
    hero: [
        {
            value: 45.5,
            suffix: "%",
            label: "des top sites bloquent les crawlers IA",
            source: "Originresearch.com",
            color: "coral"
        },
        {
            value: 2.5,
            suffix: " Mrd",
            label: "de prompts ChatGPT par jour",
            source: "TechCrunch 2025",
            color: "teal"
        },
        {
            value: 800,
            prefix: "+",
            suffix: "%",
            label: "croissance Perplexity en 12 mois",
            source: "DemandSage 2026",
            color: "amber"
        },
        {
            value: 25,
            prefix: "-",
            suffix: "%",
            label: "de recherches Google d'ici 2026",
            source: "Gartner",
            color: "violet"
        }
    ],
    constats: [
        {
            id: 1,
            icon: "search",
            title: "Le zéro-clic domine",
            stat: "60%",
            highlight: "des recherches",
            description: "se terminent sans clic. Avec AI Overview : 83%.",
            source: "Semrush 2025",
            color: "from-rose-500 to-orange-400"
        },
        {
            id: 2,
            icon: "sparkles",
            title: "AI Overviews partout",
            stat: "48%",
            highlight: "des recherches",
            description: "déclenchent un AI Overview (+58% en 1 an).",
            source: "BrightEdge 2026",
            color: "from-violet-500 to-purple-400"
        },
        {
            id: 3,
            icon: "users",
            title: "La Gen Z migre",
            stat: "28%",
            highlight: "des 18-24 ans",
            description: "démarrent sur ChatGPT plutôt que Google.",
            source: "Adobe 2025",
            color: "from-cyan-500 to-blue-400"
        },
        {
            id: 4,
            icon: "trending-up",
            title: "Le GEO fonctionne",
            stat: "+40%",
            highlight: "de visibilité",
            description: "pour les sites optimisés GEO.",
            source: "Princeton KDD 2024",
            color: "from-emerald-500 to-teal-400"
        },
        {
            id: 5,
            icon: "lock",
            title: "GPTBot très bloqué",
            stat: "5.6M",
            highlight: "de sites",
            description: "bloquent GPTBot (+336% en 1 an).",
            source: "Cloudflare 2025",
            color: "from-red-500 to-rose-400"
        },
        {
            id: 6,
            icon: "file-text",
            title: "llms.txt rare",
            stat: "<5%",
            highlight: "des sites",
            description: "possèdent ce fichier essentiel.",
            source: "Analyse IndHack",
            color: "from-amber-500 to-yellow-400"
        }
    ],
    crawlers: [
        { name: "GPTBot", company: "OpenAI", blocked: 21 },
        { name: "Google-Extended", company: "Google", blocked: 18 },
        { name: "CCBot", company: "Common Crawl", blocked: 15 },
        { name: "Bytespider", company: "ByteDance", blocked: 12 },
        { name: "Claude-Web", company: "Anthropic", blocked: 10 },
        { name: "PerplexityBot", company: "Perplexity", blocked: 8 }
    ],
    cms: [
        { name: "WordPress", gptbot: true, perplexity: true, claude: true, googleExt: true },
        { name: "Shopify", gptbot: false, perplexity: true, claude: true, googleExt: false },
        { name: "Wix", gptbot: false, perplexity: false, claude: false, googleExt: false },
        { name: "Squarespace", gptbot: false, perplexity: "partial", claude: true, googleExt: false },
        { name: "Next.js", gptbot: true, perplexity: true, claude: true, googleExt: true },
        { name: "Webflow", gptbot: "partial", perplexity: true, claude: true, googleExt: "partial" }
    ],
    recommendations: [
        { title: "Auditez votre robots.txt", description: "Vérifiez que les crawlers IA ne sont pas bloqués.", cta: "Tester gratuitement", link: "/outils/testeur-visibilite-ia", icon: "shield" },
        { title: "Créez votre llms.txt", description: "Indiquez aux IA vos pages importantes.", cta: "Guide complet", link: "/blog/llms-txt-guide-complet", icon: "file-text" },
        { title: "Ajoutez du JSON-LD", description: "Les IA extraient ces données directement.", cta: "Générateur gratuit", link: "/outils/generateur-schema-json-ld", icon: "code" },
        { title: "Distinguez les crawlers", description: "Navigation vs entraînement : autorisez l'un, bloquez l'autre.", cta: "Générateur robots.txt", link: "/outils/generateur-robots-txt", icon: "bot" }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedNumber({ value, prefix = "", suffix = "", duration = 2 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;
        const end = value;
        const step = end / (duration * 60);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= end) { setDisplay(end); clearInterval(timer); }
            else { setDisplay(Math.floor(current * 10) / 10); }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{display % 1 === 0 ? display : display.toFixed(1)}{suffix}
        </span>
    );
}

function HeroStat({ stat, index }: { stat: typeof STUDY_DATA.hero[0]; index: number }) {
    const colors = {
        coral: "from-[#FF6B6B] to-[#FF8E53] text-white",
        teal: "from-[#00C9A7] to-[#00B4D8] text-white",
        amber: "from-[#FFB347] to-[#FFCC33] text-gray-900",
        violet: "from-[#667EEA] to-[#764BA2] text-white"
    };

    return (
        <motion.div
            variants={scaleUp}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`relative group rounded-3xl bg-gradient-to-br ${colors[stat.color as keyof typeof colors]} p-8 shadow-2xl shadow-black/10 cursor-default overflow-hidden`}
        >
            {/* Decorative circle */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-black/5" />

            <div className="relative z-10">
                <div className="text-6xl md:text-7xl font-black tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={1.5 + index * 0.2} />
                </div>
                <p className="text-lg font-medium opacity-90 leading-snug mb-4">{stat.label}</p>
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {stat.source}
                </div>
            </div>
        </motion.div>
    );
}

function ConstatCard({ constat, index }: { constat: typeof STUDY_DATA.constats[0]; index: number }) {
    const icons: Record<string, React.ReactNode> = {
        "search": <Search className="w-6 h-6" />,
        "sparkles": <Sparkles className="w-6 h-6" />,
        "users": <Users className="w-6 h-6" />,
        "trending-up": <TrendingUp className="w-6 h-6" />,
        "lock": <Lock className="w-6 h-6" />,
        "file-text": <FileText className="w-6 h-6" />
    };

    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="group bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500"
        >
            {/* Icon with gradient background */}
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${constat.color} text-white mb-6 shadow-lg`}>
                {icons[constat.icon]}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {constat.title}
            </h3>

            <div className="mb-4">
                <span className={`text-5xl font-black bg-gradient-to-r ${constat.color} bg-clip-text text-transparent`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {constat.stat}
                </span>
                <span className="text-gray-500 ml-2">{constat.highlight}</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">{constat.description}</p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {constat.source}
            </div>
        </motion.div>
    );
}

function CrawlerChart() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="space-y-5">
            {STUDY_DATA.crawlers.map((crawler, i) => (
                <motion.div
                    key={crawler.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900">{crawler.name}</span>
                            <span className="text-sm text-gray-400">{crawler.company}</span>
                        </div>
                        <span className="text-2xl font-black text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{crawler.blocked}%</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${crawler.blocked * 4}%` } : {}}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function CMSTable() {
    const getIcon = (status: boolean | string) => {
        if (status === true) return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        if (status === false) return <ShieldOff className="w-5 h-5 text-rose-500" />;
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    };

    const getBg = (status: boolean | string) => {
        if (status === true) return "bg-emerald-50";
        if (status === false) return "bg-rose-50";
        return "bg-amber-50";
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-4 px-6 font-bold text-gray-900">CMS</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-600 text-sm">GPTBot</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-600 text-sm">Perplexity</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-600 text-sm">Claude</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-600 text-sm">Google-Ext</th>
                    </tr>
                </thead>
                <tbody>
                    {STUDY_DATA.cms.map((cms, i) => (
                        <motion.tr
                            key={cms.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-b border-gray-100 last:border-0 ${cms.name === "Next.js" ? "bg-emerald-50/50" : "hover:bg-gray-50"} transition-colors`}
                        >
                            <td className="py-4 px-6">
                                <span className={`font-bold ${cms.name === "Next.js" ? "text-emerald-600" : "text-gray-900"}`}>
                                    {cms.name}
                                </span>
                            </td>
                            <td className="text-center py-4 px-4">
                                <div className={`inline-flex p-2 rounded-xl ${getBg(cms.gptbot)}`}>
                                    {getIcon(cms.gptbot)}
                                </div>
                            </td>
                            <td className="text-center py-4 px-4">
                                <div className={`inline-flex p-2 rounded-xl ${getBg(cms.perplexity)}`}>
                                    {getIcon(cms.perplexity)}
                                </div>
                            </td>
                            <td className="text-center py-4 px-4">
                                <div className={`inline-flex p-2 rounded-xl ${getBg(cms.claude)}`}>
                                    {getIcon(cms.claude)}
                                </div>
                            </td>
                            <td className="text-center py-4 px-4">
                                <div className={`inline-flex p-2 rounded-xl ${getBg(cms.googleExt)}`}>
                                    {getIcon(cms.googleExt)}
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function RecommendationCard({ rec, index }: { rec: typeof STUDY_DATA.recommendations[0]; index: number }) {
    const icons: Record<string, React.ReactNode> = {
        "shield": <Shield className="w-6 h-6" />,
        "file-text": <FileText className="w-6 h-6" />,
        "code": <Code className="w-6 h-6" />,
        "bot": <Bot className="w-6 h-6" />
    };

    const colors = [
        "from-rose-500 to-orange-400",
        "from-violet-500 to-purple-400",
        "from-cyan-500 to-blue-400",
        "from-emerald-500 to-teal-400"
    ];

    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            className="group bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl transition-all duration-500"
        >
            <div className="flex items-start gap-6">
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[index]} text-white shadow-lg shrink-0`}>
                    <span className="text-2xl font-black" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{index + 1}</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{rec.title}</h3>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    {rec.cta && rec.link && (
                        <Link
                            href={rec.link}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${colors[index]} text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:gap-3`}
                        >
                            {rec.cta}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

export default function BarometreClientContent() {
    return (
        <main className="bg-[#FAFAFA] min-h-screen text-gray-900 antialiased overflow-x-hidden">

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* HERO */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-12 pb-24 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-200/40 to-orange-200/40 blur-3xl" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-200/40 to-blue-200/40 blur-3xl" />
                    <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-violet-200/30 to-purple-200/30 blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg">
                                <Sparkles className="w-4 h-4" />
                                <span className="font-bold text-sm">Étude Exclusive</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                                <span className="text-sm text-gray-500">Mars 2026</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm text-emerald-700 font-medium">Sources vérifiées</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.div variants={fadeUp} className="text-center mb-8">
                            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                <span className="text-gray-900">Baromètre</span><br />
                                <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">Visibilité IA</span><br />
                                <span className="text-gray-400">France 2026</span>
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
                            Votre site est-il visible par <span className="font-bold text-gray-900">ChatGPT</span>, <span className="font-bold text-gray-900">Perplexity</span> et <span className="font-bold text-gray-900">Claude</span> ?
                            <br />Découvrez les chiffres clés et nos recommandations.
                        </motion.p>

                        {/* Hero Stats Grid */}
                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {STUDY_DATA.hero.map((stat, i) => (
                                <HeroStat key={i} stat={stat} index={i} />
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-bold rounded-full px-8 py-6 text-lg h-auto shadow-xl shadow-gray-900/20 hover:shadow-2xl transition-all duration-300">
                                    Tester mon site gratuitement
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <a href="#constats">
                                <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 rounded-full px-8 py-6 text-lg font-bold h-auto">
                                    Voir l'étude complète
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* QUOTE */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-rose-500 blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-cyan-500 blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <Quote className="w-16 h-16 text-white/20 mx-auto mb-8" />
                        <p className="text-3xl md:text-4xl font-bold text-white leading-relaxed mb-8" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                            D'ici 2026, le volume des moteurs de recherche traditionnels
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400"> chutera de 25%</span> à cause des chatbots IA.
                        </p>
                        <p className="text-lg text-white/60">
                            — Gartner, Février 2024
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CONSTATS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24" id="constats">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Section Header */}
                        <motion.div variants={fadeUp} className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-medium text-sm mb-6">
                                <BarChart3 className="w-4 h-4" />
                                6 constats clés
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                Ce que disent les données
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                Chaque chiffre est sourcé et vérifiable. L'IA transforme la recherche en profondeur.
                            </p>
                        </motion.div>

                        {/* Constats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {STUDY_DATA.constats.map((constat, i) => (
                                <ConstatCard key={constat.id} constat={constat} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CRAWLERS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left: Content */}
                            <motion.div variants={fadeUp}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 font-medium text-sm mb-6">
                                    <Lock className="w-4 h-4" />
                                    Crawlers IA bloqués
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                    Qui bloque quoi ?
                                </h2>
                                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                                    Pourcentage des 1000 premiers sites mondiaux qui bloquent chaque crawler IA dans leur robots.txt.
                                </p>
                                <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Source : Cloudflare "From Googlebot to GPTBot" (2025)
                                </div>
                            </motion.div>

                            {/* Right: Chart */}
                            <motion.div variants={fadeUp} className="bg-gray-50 rounded-3xl p-8">
                                <CrawlerChart />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CMS COMPATIBILITY */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeUp} className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-medium text-sm mb-6">
                                <FileCode className="w-4 h-4" />
                                Compatibilité CMS
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                Votre CMS bloque-t-il les IA ?
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                Configuration par défaut du robots.txt. <span className="text-emerald-600 font-bold">Next.js</span> offre un contrôle total.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <CMSTable />
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mt-6">
                            Source : Analyse IndHack des robots.txt par défaut (mars 2026)
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* RECOMMENDATIONS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeUp} className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium text-sm mb-6">
                                <Lightbulb className="w-4 h-4" />
                                Passez à l'action
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                4 actions immédiates
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                Optimisez votre visibilité IA dès aujourd'hui avec ces recommandations concrètes.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {STUDY_DATA.recommendations.map((rec, i) => (
                                <RecommendationCard key={rec.title} rec={rec} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* SOURCES */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeUp} className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm mb-6">
                                <BookOpen className="w-4 h-4" />
                                Méthodologie
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                                Sources vérifiées
                            </h2>
                        </motion.div>

                        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
                            {[
                                { label: "ChatGPT Prompts", value: "2,5 Mrd/jour", source: "TechCrunch juillet 2025", url: "https://techcrunch.com" },
                                { label: "Prédiction Gartner", value: "-25%", source: "Gartner Newsroom fév. 2024", url: "https://gartner.com" },
                                { label: "Zero-Click Searches", value: "58-60%", source: "Semrush 2025", url: "https://semrush.com" },
                                { label: "Perplexity Growth", value: "+800%", source: "DemandSage 2026", url: "https://demandsage.com" },
                                { label: "Médias bloquant IA", value: "79%", source: "Press Gazette 2025", url: "https://pressgazette.co.uk" },
                                { label: "GEO Optimization", value: "+30-40%", source: "Princeton KDD 2024", url: "https://arxiv.org" }
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.source}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{item.value}</span>
                                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mt-8">
                            Étude libre de citation : « Baromètre Visibilité IA France 2026, IndHack (indhack.com) »
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CTA FINAL */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-rose-500/20 to-orange-500/20 blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl text-white/90 font-medium text-sm mb-8 border border-white/10">
                            <Bot className="w-4 h-4" />
                            Test gratuit en 30 secondes
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                            Votre site est-il<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400">visible par les IA ?</span>
                        </h2>

                        <p className="text-xl text-white/60 mb-12 leading-relaxed">
                            Découvrez si ChatGPT, Perplexity et Claude peuvent citer votre site.
                            <br />Résultat immédiat, sans inscription.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button className="bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white font-bold rounded-full px-10 py-7 text-lg h-auto shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/40 transition-all duration-300">
                                    Tester mon site maintenant
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026">
                                <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg font-bold h-auto">
                                    Lire le guide GEO
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
