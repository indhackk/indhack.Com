"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ExternalLink,
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
        { id: 1, title: "Le zéro-clic domine", stat: "60%", description: "des recherches Google se terminent sans clic vers un site. Ce chiffre monte à 83% quand un AI Overview est affiché.", source: "Semrush 2025" },
        { id: 2, title: "AI Overviews partout", stat: "48%", description: "des recherches Google déclenchent désormais un AI Overview. Ce chiffre a augmenté de 58% en un an.", source: "BrightEdge 2026" },
        { id: 3, title: "La Gen Z migre vers l'IA", stat: "28%", description: "des 18-24 ans commencent leurs recherches sur ChatGPT plutôt que Google.", source: "Adobe 2025" },
        { id: 4, title: "Le GEO fonctionne", stat: "+40%", description: "de visibilité dans les réponses IA pour les sites optimisés GEO (Generative Engine Optimization).", source: "Princeton KDD 2024" },
        { id: 5, title: "GPTBot très bloqué", stat: "5.6M", description: "de sites web bloquent GPTBot dans leur robots.txt. Une augmentation de 336% en un an.", source: "Cloudflare 2025" },
        { id: 6, title: "llms.txt quasi absent", stat: "<5%", description: "des sites possèdent un fichier llms.txt, l'équivalent du robots.txt pour les IA.", source: "Analyse IndHack" }
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
        { title: "Auditez votre robots.txt", description: "Vérifiez que les crawlers IA ne sont pas bloqués par défaut.", cta: "Tester gratuitement", link: "/outils/testeur-visibilite-ia" },
        { title: "Créez votre fichier llms.txt", description: "Indiquez aux IA quelles pages de votre site sont les plus importantes.", cta: "Lire le guide", link: "/blog/llms-txt-guide-complet" },
        { title: "Implémentez les données structurées", description: "Les IA extraient directement les données JSON-LD pour construire leurs réponses.", cta: "Générateur gratuit", link: "/outils/generateur-schema-json-ld" },
        { title: "Distinguez navigation et entraînement", description: "Autorisez GPTBot-User (citations) tout en bloquant GPTBot (entraînement).", cta: "Générateur robots.txt", link: "/outils/generateur-robots-txt" }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
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
        const steps = 50;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) { setDisplay(value); clearInterval(timer); }
            else { setDisplay(Math.floor(current * 10) / 10); }
        }, 25);
        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{display % 1 === 0 ? display : display.toFixed(1)}{suffix}
        </span>
    );
}

function CrawlerBar({ crawler, index, inView }: { crawler: typeof STUDY_DATA.crawlers[0]; index: number; inView: boolean }) {
    return (
        <div className="flex items-center gap-4 py-3">
            <div className="w-32 shrink-0">
                <span className="font-medium text-ink">{crawler.name}</span>
            </div>
            <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${crawler.blocked * 4}%` } : {}}
                    transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                    className="h-full rounded-full bg-sauge"
                />
            </div>
            <span className="w-12 text-right font-medium text-ink">{crawler.blocked}%</span>
        </div>
    );
}

function CMSTable() {
    const getIcon = (status: boolean | string) => {
        if (status === true) return <CheckCircle2 className="w-4 h-4 text-sauge" />;
        if (status === false) return <Minus className="w-4 h-4 text-soft/40" />;
        return <span className="text-xs text-soft">Partiel</span>;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-line">
                        <th className="text-left py-3 pr-6 font-medium text-soft">Plateforme</th>
                        <th className="text-center py-3 px-3 font-medium text-soft">GPTBot</th>
                        <th className="text-center py-3 px-3 font-medium text-soft">Perplexity</th>
                        <th className="text-center py-3 px-3 font-medium text-soft">Claude</th>
                        <th className="text-center py-3 px-3 font-medium text-soft">Google-Ext</th>
                    </tr>
                </thead>
                <tbody>
                    {STUDY_DATA.cms.map((cms) => (
                        <tr key={cms.name} className="border-b border-line/50 last:border-0">
                            <td className="py-3 pr-6 font-medium text-ink">{cms.name}</td>
                            <td className="text-center py-3 px-3">{getIcon(cms.gptbot)}</td>
                            <td className="text-center py-3 px-3">{getIcon(cms.perplexity)}</td>
                            <td className="text-center py-3 px-3">{getIcon(cms.claude)}</td>
                            <td className="text-center py-3 px-3">{getIcon(cms.googleExt)}</td>
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
        <main className="bg-white min-h-screen text-ink antialiased">

            {/* HERO */}
            <section className="pt-16 pb-16 border-b border-line">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>

                        {/* Meta */}
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8 text-sm text-soft">
                            <span>Étude</span>
                            <span className="text-line">•</span>
                            <span>Mars 2026</span>
                            <span className="text-line">•</span>
                            <span className="flex items-center gap-1.5 text-sauge">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Sources vérifiées
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-bold text-ink leading-tight mb-6">
                            Baromètre de la Visibilité IA<br />des Sites Français
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p variants={fadeUp} className="text-lg text-soft max-w-xl mb-12">
                            Votre site est-il visible par ChatGPT, Perplexity et Claude ?
                            Analyse complète et recommandations actionnables.
                        </motion.p>

                        {/* Stats */}
                        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {STUDY_DATA.hero.map((stat, i) => (
                                <motion.div key={i} variants={fadeUp}>
                                    <div className="text-3xl md:text-4xl font-heading font-bold text-sauge mb-1">
                                        <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                    </div>
                                    <p className="text-sm text-soft leading-snug">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* QUOTE */}
            <section className="py-12 bg-fond-clair border-b border-line">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <p className="text-xl md:text-2xl text-ink font-medium leading-relaxed mb-3">
                        « D'ici 2026, le volume des moteurs de recherche traditionnels chutera de 25% à cause des chatbots IA. »
                    </p>
                    <p className="text-sm text-soft">— Gartner, Février 2024</p>
                </div>
            </section>

            {/* CONSTATS */}
            <section className="py-16" id="constats">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-10">
                            <p className="text-xs text-soft uppercase tracking-wider mb-2">Analyse</p>
                            <h2 className="text-2xl font-heading font-bold text-ink">6 constats clés</h2>
                        </motion.div>

                        <div className="space-y-0">
                            {STUDY_DATA.constats.map((constat, i) => (
                                <motion.div
                                    key={constat.id}
                                    variants={fadeUp}
                                    className="grid grid-cols-12 gap-4 py-6 border-b border-line last:border-0"
                                >
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="text-xs text-soft/50">0{i + 1}</span>
                                    </div>
                                    <div className="col-span-3 md:col-span-2">
                                        <span className="text-2xl font-heading font-bold text-sauge">{constat.stat}</span>
                                    </div>
                                    <div className="col-span-7 md:col-span-9">
                                        <h3 className="font-medium text-ink mb-1">{constat.title}</h3>
                                        <p className="text-sm text-soft leading-relaxed mb-1">{constat.description}</p>
                                        <p className="text-xs text-soft/60">{constat.source}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CRAWLERS */}
            <section className="py-16 bg-fond-clair border-y border-line">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-xs text-soft uppercase tracking-wider mb-2">Robots.txt</p>
                            <h2 className="text-2xl font-heading font-bold text-ink mb-4">Crawlers IA bloqués</h2>
                            <p className="text-soft mb-4">
                                Pourcentage des 1000 premiers sites mondiaux qui bloquent chaque crawler IA dans leur robots.txt.
                            </p>
                            <p className="text-xs text-soft/60">Source : Cloudflare (2025)</p>
                        </div>
                        <div ref={crawlerRef}>
                            {STUDY_DATA.crawlers.map((crawler, i) => (
                                <CrawlerBar key={crawler.name} crawler={crawler} index={i} inView={crawlerInView} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CMS */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-8">
                            <p className="text-xs text-soft uppercase tracking-wider mb-2">Compatibilité</p>
                            <h2 className="text-2xl font-heading font-bold text-ink mb-3">Votre CMS autorise-t-il les crawlers IA ?</h2>
                            <p className="text-soft">Configuration par défaut du robots.txt de chaque plateforme.</p>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <CMSTable />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* RECOMMENDATIONS */}
            <section className="py-16 bg-fond-clair border-y border-line">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="mb-10">
                            <p className="text-xs text-soft uppercase tracking-wider mb-2">Actions</p>
                            <h2 className="text-2xl font-heading font-bold text-ink">4 recommandations</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {STUDY_DATA.recommendations.map((rec, i) => (
                                <motion.div
                                    key={rec.title}
                                    variants={fadeUp}
                                    className="bg-white p-6 rounded-lg border border-line"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg font-heading font-bold text-sauge/30">{i + 1}</span>
                                        <div>
                                            <h3 className="font-medium text-ink mb-2">{rec.title}</h3>
                                            <p className="text-sm text-soft mb-3">{rec.description}</p>
                                            <Link
                                                href={rec.link}
                                                className="inline-flex items-center gap-1.5 text-sm font-medium text-sauge hover:text-accent transition-colors"
                                            >
                                                {rec.cta}
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SOURCES */}
            <section className="py-12 border-b border-line">
                <div className="container mx-auto px-6 max-w-4xl">
                    <p className="text-xs text-soft uppercase tracking-wider mb-4">Sources</p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        {[
                            { label: "ChatGPT Usage", source: "TechCrunch 2025" },
                            { label: "Prédiction recherche", source: "Gartner 2024" },
                            { label: "Zero-Click", source: "Semrush 2025" },
                            { label: "Perplexity Growth", source: "DemandSage 2026" },
                            { label: "Blocage médias", source: "Press Gazette 2025" },
                            { label: "GEO Optimization", source: "Princeton KDD 2024" }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between py-2 border-b border-line/50">
                                <span className="text-ink">{item.label}</span>
                                <span className="text-soft/60">{item.source}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-soft/60 mt-6">
                        Étude libre de citation : « Baromètre Visibilité IA France 2026, IndHack »
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                        Testez la visibilité IA de votre site
                    </h2>
                    <p className="text-soft mb-8">
                        Résultat immédiat, gratuit, sans inscription.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href="/outils/testeur-visibilite-ia">
                            <Button className="bg-accent hover:bg-accent-hover text-white font-medium rounded-full px-6 py-3 h-auto">
                                Tester mon site
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/blog/geo-comment-apparaitre-chatgpt-2026">
                            <Button variant="outline" className="border-line text-ink hover:bg-fond-clair rounded-full px-6 py-3 font-medium h-auto">
                                Lire le guide GEO
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
