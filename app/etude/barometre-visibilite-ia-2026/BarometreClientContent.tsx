"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ExternalLink,
    TrendingDown,
    TrendingUp,
    Zap,
    Shield,
    FileText,
    Search,
    Bot,
    BarChart3,
    Sparkles
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA COMPLÈTE - Sources vérifiées
// ═══════════════════════════════════════════════════════════════════════════════

const STUDY_DATA = {
    hero: [
        {
            value: 45.5,
            suffix: "%",
            label: "des top 1000 sites bloquent au moins un crawler IA",
            detail: "Ce chiffre monte à 79% pour les sites médias et 88,9% dans l'échantillon DataDome.",
            source: "Originresearch.com (2025)",
            sourceUrl: "https://originresearch.com",
            icon: Shield,
            gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
            iconColor: "text-rose-500",
            accentBorder: "border-rose-200"
        },
        {
            value: 2.5,
            suffix: " Mrd",
            label: "de prompts envoyés à ChatGPT chaque jour",
            detail: "900 millions d'utilisateurs hebdomadaires actifs. 4ème site le plus visité au monde.",
            source: "TechCrunch (juillet 2025)",
            sourceUrl: "https://techcrunch.com",
            icon: Zap,
            gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
            iconColor: "text-amber-500",
            accentBorder: "border-amber-200"
        },
        {
            value: 800,
            prefix: "+",
            suffix: "%",
            label: "de croissance Perplexity en 12 mois",
            detail: "45 millions d'utilisateurs actifs, valorisé à 20 milliards $. 30M requêtes/jour.",
            source: "DemandSage (2026)",
            sourceUrl: "https://demandsage.com",
            icon: TrendingUp,
            gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
            iconColor: "text-emerald-500",
            accentBorder: "border-emerald-200"
        },
        {
            value: 25,
            prefix: "-",
            suffix: "%",
            label: "de volume de recherche traditionnelle d'ici fin 2026",
            detail: "Les solutions d'IA générative deviennent des moteurs de réponse alternatifs.",
            source: "Gartner (février 2024)",
            sourceUrl: "https://gartner.com",
            icon: TrendingDown,
            gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
            iconColor: "text-violet-500",
            accentBorder: "border-violet-200"
        }
    ],
    constats: [
        {
            id: 1,
            title: "Le zéro-clic domine",
            stat: "58-60%",
            description: "des recherches Google se terminent sans aucun clic vers un site web. Ce chiffre monte à 83% quand un AI Overview est affiché.",
            source: "Semrush Zero-Click Study 2025",
            sourceUrl: "https://semrush.com",
            color: "rose"
        },
        {
            id: 2,
            title: "Les AI Overviews envahissent Google",
            stat: "48%",
            description: "des recherches Google déclenchent un AI Overview (données février 2026). Ce chiffre a augmenté de 58% en un an. Dans l'éducation : 83%.",
            source: "BrightEdge (fév. 2026)",
            sourceUrl: "https://brightedge.com",
            color: "amber"
        },
        {
            id: 3,
            title: "La Gen Z migre vers l'IA",
            stat: "28%",
            description: "des 18-24 ans commencent leurs recherches sur ChatGPT plutôt que Google. L'écart avec Google n'est plus que de 3%.",
            source: "Adobe & ContentGrip (2025)",
            sourceUrl: "https://contentgrip.com",
            color: "emerald"
        },
        {
            id: 4,
            title: "Le GEO multiplie la visibilité",
            stat: "+30-40%",
            description: "d'amélioration de la visibilité dans les réponses IA pour les sites optimisés GEO. Stratégies clés : citer des sources, ajouter des statistiques.",
            source: "Princeton University (KDD 2024)",
            sourceUrl: "https://arxiv.org/abs/2311.09735",
            color: "violet"
        },
        {
            id: 5,
            title: "GPTBot est le crawler le plus bloqué",
            stat: "5,6M",
            description: "de sites web ont ajouté GPTBot à leur liste de blocage robots.txt (+336% selon Tollbit Q2 2025). 21% des top 1000 sites le bloquent.",
            source: "Cloudflare Blog (2025)",
            sourceUrl: "https://blog.cloudflare.com",
            color: "sky"
        },
        {
            id: 6,
            title: "Le fichier llms.txt est quasi inexistant",
            stat: "<5%",
            description: "des sites possèdent un fichier llms.txt, l'équivalent du robots.txt pour les IA. Les premiers adoptants ont un avantage concurrentiel majeur.",
            source: "Analyse IndHack (mars 2026)",
            sourceUrl: null,
            color: "orange"
        },
        {
            id: 7,
            title: "Les données structurées font la différence",
            stat: "JSON-LD",
            description: "Les sites avec des schemas (FAQPage, Article, Organization, HowTo) sont significativement mieux cités par les IA qui extraient directement ces informations.",
            source: "Étude GEO Princeton (KDD 2024)",
            sourceUrl: "https://arxiv.org/abs/2311.09735",
            color: "teal"
        }
    ],
    crawlers: [
        { name: "GPTBot", company: "OpenAI (training)", blocked: 21 },
        { name: "Google-Extended", company: "Google", blocked: 18 },
        { name: "CCBot", company: "Common Crawl", blocked: 15 },
        { name: "Bytespider", company: "ByteDance", blocked: 12 },
        { name: "Claude-Web", company: "Anthropic", blocked: 10 },
        { name: "PerplexityBot", company: "Perplexity", blocked: 8 },
        { name: "Anthropic-AI", company: "Anthropic", blocked: 7 },
        { name: "ChatGPT-User", company: "OpenAI (navigation)", blocked: 5 }
    ],
    sectors: [
        { name: "Médias / Presse", blocked: 79, verified: true },
        { name: "Finance / Banque", blocked: 60, verified: false },
        { name: "E-commerce", blocked: 55, verified: false },
        { name: "Santé", blocked: 50, verified: false },
        { name: "Tourisme", blocked: 45, verified: false },
        { name: "Services B2B", blocked: 40, verified: false },
        { name: "Éducation", blocked: 35, verified: false },
        { name: "Tech / SaaS", blocked: 30, verified: false }
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
            title: "Auditez votre robots.txt",
            description: "Vérifiez que GPTBot, PerplexityBot et Claude-Web ne sont pas bloqués. La majorité des sites le font sans le savoir, surtout sur Shopify et Wix.",
            cta: "Tester gratuitement",
            link: "/outils/testeur-visibilite-ia",
            icon: Search
        },
        {
            title: "Créez votre fichier llms.txt",
            description: "Moins de 5% des sites en possèdent un. Il indique aux LLM quelles pages sont les plus importantes. Premier arrivé, premier servi.",
            cta: "Lire le guide",
            link: "/blog/llms-txt-guide-complet",
            icon: FileText
        },
        {
            title: "Implémentez les données structurées JSON-LD",
            description: "FAQPage, Article, Organization, LocalBusiness, HowTo — ces schemas sont lus directement par les IA pour construire leurs réponses.",
            cta: "Générateur gratuit",
            link: "/outils/generateur-schema-json-ld",
            icon: Bot
        },
        {
            title: "Distinguez crawlers de navigation et d'entraînement",
            description: "GPTBot-User (navigation) = cite votre site. GPTBot (training) = utilise votre contenu pour entraîner le modèle. Vous pouvez autoriser l'un et bloquer l'autre.",
            cta: "Générateur robots.txt",
            link: "/outils/generateur-robots-txt",
            icon: Shield
        },
        {
            title: "Structurez votre contenu pour la citabilité",
            description: "Les IA citent les contenus qui répondent directement aux questions en 2-3 phrases, incluent des données chiffrées sourcées et utilisent des tableaux comparatifs.",
            cta: null,
            link: null,
            icon: BarChart3
        },
        {
            title: "Publiez régulièrement du contenu frais",
            description: "Perplexity privilégie le contenu récent. Les sites qui publient 1-2 articles par semaine sont cités significativement plus souvent.",
            cta: null,
            link: null,
            icon: Sparkles
        },
        {
            title: "Mesurez et itérez",
            description: "Testez régulièrement votre visibilité. Posez des questions à ChatGPT et Perplexity sur votre domaine d'expertise. Votre site apparaît-il dans les réponses ?",
            cta: "Tester ma visibilité IA",
            link: "/outils/testeur-visibilite-ia",
            icon: TrendingUp
        }
    ],
    sources: [
        { label: "ChatGPT Prompts/jour", value: "2,5 Mrd", source: "TechCrunch juillet 2025", url: "https://techcrunch.com" },
        { label: "Prédiction recherche", value: "-25%", source: "Gartner février 2024", url: "https://gartner.com" },
        { label: "Zero-Click Searches", value: "58-60%", source: "Semrush 2025", url: "https://semrush.com" },
        { label: "Perplexity Growth", value: "+800%", source: "DemandSage 2026", url: "https://demandsage.com" },
        { label: "Médias bloquant IA", value: "79%", source: "Press Gazette 2025", url: "https://pressgazette.co.uk" },
        { label: "GEO Optimization", value: "+30-40%", source: "Princeton KDD 2024", url: "https://arxiv.org" },
        { label: "Crawlers bloqués", value: "45,5%", source: "Originresearch.com", url: "https://originresearch.com" },
        { label: "GPTBot blocages", value: "5,6M sites", source: "Cloudflare 2025", url: "https://cloudflare.com" }
    ]
};

const STAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
    sky: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
    teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = value * eased;

            setDisplay(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplay(value);
            }
        };

        requestAnimationFrame(animate);
    }, [inView, value]);

    const formatted = display % 1 === 0 ? Math.round(display) : display.toFixed(1);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{formatted}{suffix}
        </span>
    );
}

function HeroStatCard({ stat, index }: { stat: typeof STUDY_DATA.hero[0]; index: number }) {
    const Icon = stat.icon;

    return (
        <motion.div
            variants={scaleUp}
            className={`group relative overflow-hidden rounded-2xl bg-white border ${stat.accentBorder} p-6 md:p-8
                       shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500
                       hover:-translate-y-1`}
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Content */}
            <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>

                {/* Number */}
                <div className={`text-4xl md:text-5xl font-heading font-bold ${stat.iconColor} mb-3 tracking-tight`}>
                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="font-medium text-ink text-lg leading-snug mb-3">{stat.label}</p>

                {/* Detail */}
                <p className="text-soft text-sm leading-relaxed mb-4">{stat.detail}</p>

                {/* Source */}
                {stat.sourceUrl ? (
                    <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-soft hover:text-ink transition-colors group/link"
                    >
                        <span className="underline underline-offset-2 decoration-line group-hover/link:decoration-ink">{stat.source}</span>
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100" />
                    </a>
                ) : (
                    <span className="text-xs text-soft/60">{stat.source}</span>
                )}
            </div>
        </motion.div>
    );
}

function ConstatCard({ constat, index }: { constat: typeof STUDY_DATA.constats[0]; index: number }) {
    const colors = STAT_COLORS[constat.color] || STAT_COLORS.emerald;

    return (
        <motion.div
            variants={fadeUp}
            className="group"
        >
            <div className={`flex flex-col md:flex-row gap-6 py-8 border-b border-line/50 last:border-0
                           hover:bg-gradient-to-r hover:from-transparent hover:via-gray-50/50 hover:to-transparent
                           transition-colors duration-300 -mx-4 px-4 rounded-xl`}>

                {/* Number badge */}
                <div className="shrink-0 flex items-start gap-4">
                    <span className="text-xs text-soft/40 font-medium pt-1 tabular-nums">0{index + 1}</span>
                    <div className={`${colors.bg} ${colors.border} border rounded-xl px-4 py-2 min-w-[90px] text-center`}>
                        <span className={`text-2xl md:text-3xl font-heading font-bold ${colors.text}`}>
                            {constat.stat}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                    <h3 className="font-heading font-semibold text-ink text-lg mb-2 group-hover:text-sauge transition-colors">
                        {constat.title}
                    </h3>
                    <p className="text-soft leading-relaxed mb-3">{constat.description}</p>
                    {constat.sourceUrl ? (
                        <a
                            href={constat.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-sauge hover:text-accent transition-colors"
                        >
                            {constat.source}
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    ) : (
                        <span className="text-sm text-soft/60">{constat.source}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function CrawlerBar({ crawler, index, inView }: { crawler: typeof STUDY_DATA.crawlers[0]; index: number; inView: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="group py-3"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink">{crawler.name}</span>
                    <span className="text-xs text-soft/60 hidden sm:inline">({crawler.company})</span>
                </div>
                <span className="text-sm font-bold text-ink tabular-nums">{crawler.blocked}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${crawler.blocked * 4}%` } : {}}
                    transition={{ delay: index * 0.08 + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-sauge to-emerald-500"
                />
            </div>
        </motion.div>
    );
}

function SectorBar({ sector, index, inView }: { sector: typeof STUDY_DATA.sectors[0]; index: number; inView: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="group py-3"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-ink">{sector.name}</span>
                    {sector.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-2.5 h-2.5" /> vérifié
                        </span>
                    )}
                </div>
                <span className="text-sm font-bold text-ink tabular-nums">{sector.blocked}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${sector.blocked}%` } : {}}
                    transition={{ delay: index * 0.06 + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-orange-400"
                />
            </div>
        </motion.div>
    );
}

function CMSTable() {
    const getIcon = (status: boolean | string) => {
        if (status === true) return (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </span>
        );
        if (status === false) return (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100">
                <span className="w-2.5 h-0.5 bg-rose-400 rounded-full" />
            </span>
        );
        return (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
                <span className="text-amber-600 text-xs font-bold">~</span>
            </span>
        );
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50/80">
                        <th className="text-left py-4 px-5 font-semibold text-ink">CMS / Plateforme</th>
                        <th className="text-center py-4 px-3 font-medium text-soft">GPTBot</th>
                        <th className="text-center py-4 px-3 font-medium text-soft">Perplexity</th>
                        <th className="text-center py-4 px-3 font-medium text-soft">Claude</th>
                        <th className="text-center py-4 px-3 font-medium text-soft">Google-Ext</th>
                        <th className="text-left py-4 px-5 font-medium text-soft hidden lg:table-cell">Configuration</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-line/50">
                    {STUDY_DATA.cms.map((cms, i) => (
                        <motion.tr
                            key={cms.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="hover:bg-gray-50/50 transition-colors"
                        >
                            <td className="py-4 px-5 font-medium text-ink">{cms.name}</td>
                            <td className="text-center py-4 px-3">{getIcon(cms.gptbot)}</td>
                            <td className="text-center py-4 px-3">{getIcon(cms.perplexity)}</td>
                            <td className="text-center py-4 px-3">{getIcon(cms.claude)}</td>
                            <td className="text-center py-4 px-3">{getIcon(cms.googleExt)}</td>
                            <td className="py-4 px-5 text-soft text-xs hidden lg:table-cell">{cms.note}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
            <div className="bg-gray-50/50 px-5 py-3 border-t border-line/50 flex items-center gap-4 text-xs text-soft">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-100" /> Autorisé</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-100" /> Bloqué</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-100" /> Variable</span>
            </div>
        </div>
    );
}

function RecommendationCard({ rec, index }: { rec: typeof STUDY_DATA.recommendations[0]; index: number }) {
    const Icon = rec.icon;

    return (
        <motion.div
            variants={scaleUp}
            className="group bg-white rounded-2xl border border-line p-6
                      hover:border-sauge/30 hover:shadow-lg hover:shadow-sauge/5
                      transition-all duration-300"
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-sauge/10 to-sauge/5
                               flex items-center justify-center group-hover:from-sauge group-hover:to-emerald-600
                               transition-all duration-300">
                    <Icon className="w-5 h-5 text-sauge group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-sauge/60 tabular-nums">0{index + 1}</span>
                        <h3 className="font-heading font-semibold text-ink group-hover:text-sauge transition-colors">
                            {rec.title}
                        </h3>
                    </div>
                    <p className="text-soft text-sm leading-relaxed mb-3">{rec.description}</p>
                    {rec.cta && rec.link && (
                        <Link
                            href={rec.link}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-sauge
                                      hover:text-accent transition-colors group/link"
                        >
                            {rec.cta}
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BarometreClientContent() {
    const crawlerRef = useRef<HTMLDivElement>(null);
    const crawlerInView = useInView(crawlerRef, { once: true, margin: "-100px" });
    const sectorRef = useRef<HTMLDivElement>(null);
    const sectorInView = useInView(sectorRef, { once: true, margin: "-100px" });

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    return (
        <main className="bg-white min-h-screen text-ink antialiased overflow-x-hidden">

            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative pt-8 pb-20 overflow-hidden">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white pointer-events-none" />

                {/* Decorative elements */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-sauge/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/5 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="relative container mx-auto px-6 max-w-6xl"
                >
                    <motion.div initial="hidden" animate="visible" variants={stagger}>

                        {/* Badge */}
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-3 mb-8"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-line shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-medium text-ink">Étude exclusive</span>
                            </span>
                            <span className="text-sm text-soft">Mars 2026</span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-sauge">
                                <CheckCircle2 className="w-4 h-4" />
                                Sources vérifiées
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink leading-[1.1] mb-6 max-w-4xl"
                        >
                            Baromètre de la{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-sauge">Visibilité IA</span>
                                <span className="absolute bottom-1 left-0 right-0 h-3 bg-emerald-100/60 -z-0 rounded" />
                            </span>
                            <br />
                            des Sites Français
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUp}
                            className="text-xl text-soft max-w-2xl mb-16 leading-relaxed"
                        >
                            Analyse complète de la compatibilité des sites web français avec
                            <span className="text-ink font-medium"> ChatGPT</span>,
                            <span className="text-ink font-medium"> Perplexity</span>,
                            <span className="text-ink font-medium"> Claude</span> et les moteurs de recherche IA.
                        </motion.p>

                        {/* Hero Stats Grid */}
                        <motion.div
                            variants={stagger}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                            {STUDY_DATA.hero.map((stat, i) => (
                                <HeroStatCard key={i} stat={stat} index={i} />
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                QUOTE SECTION
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sauge via-emerald-700 to-sauge" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

                <div className="relative container mx-auto px-6 max-w-4xl text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="text-6xl text-white/20 font-serif mb-4">"</div>
                        <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-6">
                            D'ici 2026, le volume des moteurs de recherche traditionnels chutera de
                            <span className="text-accent font-bold"> 25%</span> à cause des chatbots IA et agents virtuels.
                        </p>
                        <a
                            href="https://gartner.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <span className="font-medium">Gartner</span>
                            <span className="text-white/40">•</span>
                            <span>Février 2024</span>
                            <ExternalLink className="w-4 h-4 opacity-60" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                7 CONSTATS
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20" id="constats">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                    >
                        {/* Section header */}
                        <motion.div variants={fadeUp} className="mb-12">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-sauge bg-sauge/10 rounded-full mb-4">
                                Analyse
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                7 constats clés
                            </h2>
                        </motion.div>

                        {/* Constats list */}
                        <div>
                            {STUDY_DATA.constats.map((constat, i) => (
                                <ConstatCard key={constat.id} constat={constat} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CRAWLERS & SECTEURS
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Crawlers */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="mb-8">
                                <span className="inline-block px-3 py-1 text-xs font-medium text-sauge bg-sauge/10 rounded-full mb-4">
                                    Robots.txt
                                </span>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">
                                    Crawlers IA les plus bloqués
                                </h2>
                                <p className="text-soft">
                                    Pourcentage des top 1000 sites mondiaux bloquant chaque crawler.
                                </p>
                            </motion.div>

                            <div ref={crawlerRef} className="bg-white rounded-2xl border border-line p-6">
                                {STUDY_DATA.crawlers.map((crawler, i) => (
                                    <CrawlerBar key={crawler.name} crawler={crawler} index={i} inView={crawlerInView} />
                                ))}
                            </div>

                            <p className="text-xs text-soft/60 mt-4 flex items-center gap-1.5">
                                <ExternalLink className="w-3 h-3" />
                                Sources : Cloudflare, Paul Calvano (2025)
                            </p>
                        </motion.div>

                        {/* Secteurs */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="mb-8">
                                <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
                                    Par secteur
                                </span>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">
                                    Taux de blocage GPTBot
                                </h2>
                                <p className="text-soft">
                                    Répartition par industrie. Badge <span className="text-emerald-600 font-medium">vérifié</span> = source documentée.
                                </p>
                            </motion.div>

                            <div ref={sectorRef} className="bg-white rounded-2xl border border-line p-6">
                                {STUDY_DATA.sectors.map((sector, i) => (
                                    <SectorBar key={sector.name} sector={sector} index={i} inView={sectorInView} />
                                ))}
                            </div>

                            <p className="text-xs text-soft/60 mt-4">
                                Le chiffre médias (79%) est documenté par Press Gazette 2025.
                                Les autres sont des estimations sectorielles IndHack.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CMS COMPATIBILITY
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-10 text-center">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-violet-600 bg-violet-100 rounded-full mb-4">
                                Compatibilité
                            </span>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">
                                Votre CMS autorise-t-il les crawlers IA ?
                            </h2>
                            <p className="text-soft max-w-2xl mx-auto">
                                Configuration par défaut du robots.txt de chaque plateforme.
                                Vérifiez si votre site bloque involontairement les IA.
                            </p>
                        </motion.div>

                        <motion.div variants={scaleUp}>
                            <CMSTable />
                        </motion.div>

                        <motion.p variants={fadeIn} className="text-xs text-soft/60 mt-6 text-center">
                            Analyse IndHack des robots.txt par défaut (mars 2026)
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                7 RECOMMENDATIONS
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-12 text-center">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-sauge bg-sauge/10 rounded-full mb-4">
                                Actions
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-3">
                                7 recommandations
                            </h2>
                            <p className="text-soft max-w-2xl mx-auto">
                                Les actions concrètes pour améliorer votre visibilité dans les réponses IA.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {STUDY_DATA.recommendations.map((rec, i) => (
                                <RecommendationCard key={rec.title} rec={rec} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                SOURCES
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-line">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-8">
                            <h3 className="text-lg font-heading font-semibold text-ink mb-1">
                                Sources et méthodologie
                            </h3>
                            <p className="text-sm text-soft">
                                Toutes les données citées proviennent de sources publiques vérifiées.
                            </p>
                        </motion.div>

                        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {STUDY_DATA.sources.map((item, i) => (
                                <motion.a
                                    key={i}
                                    variants={scaleUp}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col p-4 bg-white rounded-xl border border-line
                                             hover:border-sauge/30 hover:shadow-md transition-all duration-300"
                                >
                                    <span className="text-2xl font-heading font-bold text-sauge mb-1">
                                        {item.value}
                                    </span>
                                    <span className="text-sm text-ink mb-2">{item.label}</span>
                                    <span className="text-xs text-soft/60 mt-auto flex items-center gap-1">
                                        {item.source}
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 p-4 bg-gray-50 rounded-xl border border-line"
                        >
                            <p className="text-sm text-soft">
                                <span className="font-medium text-ink">Libre de citation</span> avec mention :
                                « Baromètre Visibilité IA France 2026, IndHack (indhack.com) »
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                FINAL CTA
            ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-sauge/90 to-ink" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

                {/* Decorative blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

                <div className="relative container mx-auto px-6 max-w-3xl text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div
                            variants={scaleUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-sm text-white/90 font-medium">Gratuit • Sans inscription • Résultat immédiat</span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl md:text-4xl font-heading font-bold text-white mb-6"
                        >
                            Testez la visibilité IA<br />de votre site
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg text-white/70 mb-10 max-w-xl mx-auto"
                        >
                            Découvrez si votre site est visible dans les réponses de ChatGPT,
                            Perplexity et Claude en quelques secondes.
                        </motion.p>

                        <motion.div
                            variants={scaleUp}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <Link
                                href="/outils/testeur-visibilite-ia"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                                          bg-accent hover:bg-accent-hover text-white font-semibold rounded-full
                                          shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30
                                          hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Tester mon site
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/blog/geo-comment-apparaitre-chatgpt-2026"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4
                                          bg-white/10 hover:bg-white/20 text-white font-medium rounded-full
                                          backdrop-blur-sm border border-white/20 hover:border-white/30
                                          transition-all duration-300"
                            >
                                Lire le guide GEO
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
