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
    Quote,
    Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const STUDY_DATA = {
    hero: [
        { value: 45.5, suffix: "%", label: "des top sites bloquent les crawlers IA", source: "Originresearch.com" },
        { value: 2.5, suffix: " Mrd", label: "de prompts ChatGPT par jour", source: "TechCrunch 2025" },
        { value: 800, prefix: "+", suffix: "%", label: "croissance Perplexity en 12 mois", source: "DemandSage 2026" },
        { value: 25, prefix: "-", suffix: "%", label: "de recherches Google d'ici 2026", source: "Gartner" }
    ],
    constats: [
        { id: 1, icon: "search", title: "Le zéro-clic domine", stat: "60%", description: "des recherches Google se terminent sans clic. Ce chiffre monte à 83% avec AI Overview.", source: "Semrush 2025" },
        { id: 2, icon: "sparkles", title: "AI Overviews partout", stat: "48%", description: "des recherches déclenchent un AI Overview. +58% en un an.", source: "BrightEdge 2026" },
        { id: 3, icon: "users", title: "La Gen Z migre", stat: "28%", description: "des 18-24 ans démarrent leurs recherches sur ChatGPT plutôt que Google.", source: "Adobe 2025" },
        { id: 4, icon: "trending-up", title: "Le GEO fonctionne", stat: "+40%", description: "de visibilité dans les réponses IA pour les sites optimisés GEO.", source: "Princeton KDD 2024" },
        { id: 5, icon: "lock", title: "GPTBot très bloqué", stat: "5.6M", description: "de sites bloquent GPTBot dans leur robots.txt. +336% en un an.", source: "Cloudflare 2025" },
        { id: 6, icon: "file-text", title: "llms.txt quasi absent", stat: "<5%", description: "des sites possèdent ce fichier essentiel pour communiquer avec les IA.", source: "Analyse IndHack" }
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
        { title: "Auditez votre robots.txt", description: "Vérifiez que les crawlers IA ne sont pas bloqués.", cta: "Tester gratuitement", link: "/outils/testeur-visibilite-ia" },
        { title: "Créez votre llms.txt", description: "Indiquez aux IA vos pages importantes.", cta: "Guide complet", link: "/blog/llms-txt-guide-complet" },
        { title: "Ajoutez du JSON-LD", description: "Les IA extraient ces données structurées directement.", cta: "Générateur gratuit", link: "/outils/generateur-schema-json-ld" },
        { title: "Distinguez les crawlers", description: "Navigation vs entraînement : autorisez l'un, bloquez l'autre.", cta: "Générateur robots.txt", link: "/outils/generateur-robots-txt" }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!inView) return;
        const duration = 1500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) { setDisplay(value); clearInterval(timer); }
            else { setDisplay(Math.floor(current * 10) / 10); }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{display % 1 === 0 ? display : display.toFixed(1)}{suffix}
        </span>
    );
}

function StatCard({ stat, index }: { stat: typeof STUDY_DATA.hero[0]; index: number }) {
    return (
        <motion.div
            variants={fadeUp}
            className="group"
        >
            <div className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 mb-3">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <p className="text-gray-600 text-lg mb-2">{stat.label}</p>
            <p className="text-sm text-gray-400">{stat.source}</p>
        </motion.div>
    );
}

function ConstatRow({ constat, index }: { constat: typeof STUDY_DATA.constats[0]; index: number }) {
    const icons: Record<string, React.ReactNode> = {
        "search": <Search className="w-5 h-5" />,
        "sparkles": <Sparkles className="w-5 h-5" />,
        "users": <Users className="w-5 h-5" />,
        "trending-up": <TrendingUp className="w-5 h-5" />,
        "lock": <Lock className="w-5 h-5" />,
        "file-text": <FileText className="w-5 h-5" />
    };

    return (
        <motion.div
            variants={fadeUp}
            className="group grid grid-cols-12 gap-6 py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 -mx-6 px-6 transition-colors"
        >
            <div className="col-span-1 flex items-start justify-center pt-1">
                <span className="text-sm font-medium text-gray-300">0{index + 1}</span>
            </div>
            <div className="col-span-2 md:col-span-2">
                <span className="text-4xl md:text-5xl font-semibold text-gray-900">{constat.stat}</span>
            </div>
            <div className="col-span-9 md:col-span-9">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{constat.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-2">{constat.description}</p>
                <p className="text-sm text-gray-400">{constat.source}</p>
            </div>
        </motion.div>
    );
}

function CrawlerBar({ crawler, index, inView }: { crawler: typeof STUDY_DATA.crawlers[0]; index: number; inView: boolean }) {
    return (
        <div className="group">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{crawler.name}</span>
                    <span className="text-sm text-gray-400">{crawler.company}</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">{crawler.blocked}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${crawler.blocked * 4}%` } : {}}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                    className="h-full rounded-full bg-gray-900"
                />
            </div>
        </div>
    );
}

function CMSTable() {
    const getIcon = (status: boolean | string) => {
        if (status === true) return <CheckCircle2 className="w-4 h-4 text-gray-900" />;
        if (status === false) return <Minus className="w-4 h-4 text-gray-300" />;
        return <span className="text-xs text-gray-400">Partiel</span>;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left py-4 pr-8 font-medium text-gray-500 text-sm">Plateforme</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-500 text-sm">GPTBot</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-500 text-sm">Perplexity</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-500 text-sm">Claude</th>
                        <th className="text-center py-4 px-4 font-medium text-gray-500 text-sm">Google-Ext</th>
                    </tr>
                </thead>
                <tbody>
                    {STUDY_DATA.cms.map((cms) => (
                        <tr key={cms.name} className="border-b border-gray-100 last:border-0">
                            <td className="py-4 pr-8">
                                <span className="font-medium text-gray-900">{cms.name}</span>
                            </td>
                            <td className="text-center py-4 px-4">{getIcon(cms.gptbot)}</td>
                            <td className="text-center py-4 px-4">{getIcon(cms.perplexity)}</td>
                            <td className="text-center py-4 px-4">{getIcon(cms.claude)}</td>
                            <td className="text-center py-4 px-4">{getIcon(cms.googleExt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

export default function BarometreClientContent() {
    const crawlerRef = useRef<HTMLDivElement>(null);
    const crawlerInView = useInView(crawlerRef, { once: true, margin: "-100px" });

    return (
        <main className="bg-white min-h-screen text-gray-900 antialiased">

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* HERO */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="pt-16 md:pt-24 pb-20 border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        {/* Meta */}
                        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10 text-sm">
                            <span className="text-gray-400">Étude</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-400">Mars 2026</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Sources vérifiées
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                            Baromètre de la Visibilité IA des Sites Français
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-16 leading-relaxed">
                            Votre site est-il visible par ChatGPT, Perplexity et Claude ?
                            Analyse complète et recommandations.
                        </motion.p>

                        {/* Stats Grid */}
                        <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                            {STUDY_DATA.hero.map((stat, i) => (
                                <StatCard key={i} stat={stat} index={i} />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* QUOTE */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug mb-6">
                            « D'ici 2026, le volume des moteurs de recherche traditionnels chutera de 25% à cause des chatbots IA. »
                        </p>
                        <p className="text-gray-400">
                            Gartner, Février 2024
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CONSTATS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20" id="constats">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-12">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">Les données</p>
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                                6 constats clés
                            </h2>
                        </motion.div>

                        <div>
                            {STUDY_DATA.constats.map((constat, i) => (
                                <ConstatRow key={constat.id} constat={constat} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CRAWLERS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp}>
                                <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">Robots.txt</p>
                                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
                                    Crawlers IA bloqués
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed mb-4">
                                    Pourcentage des 1000 premiers sites mondiaux qui bloquent chaque crawler IA.
                                </p>
                                <p className="text-sm text-gray-400">
                                    Source : Cloudflare "From Googlebot to GPTBot" (2025)
                                </p>
                            </motion.div>
                        </motion.div>

                        <div ref={crawlerRef} className="space-y-6">
                            {STUDY_DATA.crawlers.map((crawler, i) => (
                                <CrawlerBar key={crawler.name} crawler={crawler} index={i} inView={crawlerInView} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CMS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-12">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">Compatibilité</p>
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
                                Votre CMS autorise-t-il les crawlers IA ?
                            </h2>
                            <p className="text-gray-500 text-lg max-w-2xl">
                                Configuration par défaut du robots.txt de chaque plateforme.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <CMSTable />
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-sm text-gray-400 mt-6">
                            Analyse IndHack des robots.txt par défaut (mars 2026)
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* RECOMMENDATIONS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-12">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">Actions</p>
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                                4 recommandations
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {STUDY_DATA.recommendations.map((rec, i) => (
                                <motion.div
                                    key={rec.title}
                                    variants={fadeUp}
                                    className="bg-white p-8 rounded-lg border border-gray-100"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-2xl font-semibold text-gray-200">{i + 1}</span>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">{rec.title}</h3>
                                            <p className="text-gray-500 mb-4">{rec.description}</p>
                                            {rec.cta && rec.link && (
                                                <Link
                                                    href={rec.link}
                                                    className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all"
                                                >
                                                    {rec.cta}
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* SOURCES */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-10">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">Méthodologie</p>
                            <h2 className="text-2xl font-semibold text-gray-900">Sources</h2>
                        </motion.div>

                        <motion.div variants={fadeUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                            {[
                                { label: "ChatGPT Usage", source: "TechCrunch juillet 2025" },
                                { label: "Prédiction recherche", source: "Gartner février 2024" },
                                { label: "Zero-Click", source: "Semrush 2025" },
                                { label: "Perplexity Growth", source: "DemandSage 2026" },
                                { label: "Blocage médias", source: "Press Gazette 2025" },
                                { label: "GEO Optimization", source: "Princeton KDD 2024" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-900">{item.label}</span>
                                    <span className="text-gray-400">{item.source}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-sm text-gray-400 mt-8">
                            Étude libre de citation : « Baromètre Visibilité IA France 2026, IndHack »
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CTA */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gray-900">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                            Testez la visibilité IA de votre site
                        </h2>
                        <p className="text-gray-400 text-lg mb-10">
                            Résultat immédiat, gratuit, sans inscription.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-full px-8 py-6 text-base h-auto">
                                    Tester mon site
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026">
                                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full px-8 py-6 text-base font-medium h-auto">
                                    Lire le guide GEO
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
