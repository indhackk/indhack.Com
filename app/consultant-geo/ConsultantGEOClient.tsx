"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    Bot,
    Search,
    FileText,
    TrendingUp,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    Phone,
    Mail,
    Clock,
    Shield,
    Target,
    Zap,
    Users,
    Award,
    MapPin,
    Eye,
    Code2,
    Globe,
    BrainCircuit,
    MessageSquare,
    Layers,
    AlertTriangle,
    Sparkles
} from "lucide-react";

// ══════════════════════════════════════════════════════════════
// DONNÉES
// ══════════════════════════════════════════════════════════════

const STATS = [
    { value: "2,5 Md", label: "requêtes/jour sur ChatGPT", source: "OpenAI, 2026" },
    { value: "-61 %", label: "de CTR Google avec AI Overviews", source: "Ahrefs, 2025" },
    { value: "39 %", label: "des Français utilisent l'IA pour chercher", source: "IPSOS, 2025" },
    { value: "1,48 Md€", label: "marché GEO estimé en 2026", source: "Gartner, 2026" },
];

const PILIERS = [
    {
        icon: Code2,
        title: "Accessibilité technique IA",
        description: "Autorisation des crawlers IA (GPTBot, PerplexityBot, Claude-Web), fichier llms.txt, sitemap optimisé, temps de réponse serveur.",
        details: ["robots.txt configuré pour 8 crawlers IA", "Fichier llms.txt conforme", "Temps de réponse < 500 ms", "Sitemap XML à jour"]
    },
    {
        icon: Layers,
        title: "Richesse sémantique",
        description: "Données structurées JSON-LD (Organization, FAQPage, HowTo, Article), hiérarchie Hn, contenu en format Q&R pour les LLMs.",
        details: ["7 schemas JSON-LD essentiels", "Headings en format question", "Tableaux comparatifs structurés", "Définitions claires et citables"]
    },
    {
        icon: Award,
        title: "Signaux E-E-A-T",
        description: "Expérience, Expertise, Autorité, Fiabilité : les 4 piliers que les IA utilisent pour choisir leurs sources.",
        details: ["Page auteur avec bio détaillée", "Sources et données chiffrées", "Mentions et backlinks éditoriaux", "Contenu mis à jour régulièrement"]
    },
    {
        icon: MessageSquare,
        title: "Format IA-friendly",
        description: "Contenu structuré pour être compris et cité par les LLMs : listes, FAQ, résumés, données sourcées, réponses directes.",
        details: ["Réponses directes en début de section", "Listes à puces et tableaux", "Statistiques sourcées", "FAQ structurées avec Schema"]
    },
];

const SERVICES_GEO = [
    {
        icon: Eye,
        title: "Audit de visibilité IA",
        description: "Test complet de votre site sur 8 crawlers IA. Score de citabilité, accessibilité technique, analyse sémantique et plan d'action priorisé.",
        link: "/outils/testeur-visibilite-ia",
        linkText: "Tester gratuitement"
    },
    {
        icon: Bot,
        title: "Optimisation GEO on-page",
        description: "Restructuration de vos contenus pour maximiser les chances d'être cité : format Q&R, données structurées, contenu citable.",
        link: "/referencement-naturel",
        linkText: "En savoir plus"
    },
    {
        icon: Globe,
        title: "Stratégie de contenu GEO",
        description: "Création d'un cocon sémantique optimisé pour les IA : articles piliers, guides experts, études de données originales.",
        link: "/blog/geo-comment-apparaitre-chatgpt-2026",
        linkText: "Lire le guide GEO"
    },
    {
        icon: Code2,
        title: "Implémentation technique",
        description: "Configuration des crawlers IA, fichier llms.txt, schemas JSON-LD avancés, optimisation des temps de réponse.",
        link: "/outils/generateur-robots-txt",
        linkText: "Générateur robots.txt"
    },
    {
        icon: BarChart3,
        title: "Monitoring & reporting",
        description: "Suivi mensuel de vos citations IA, évolution du score GEO, analyse des requêtes où vous apparaissez dans ChatGPT.",
        link: "/contact",
        linkText: "Demander un devis"
    },
    {
        icon: BrainCircuit,
        title: "Formation GEO",
        description: "Formez vos équipes aux bonnes pratiques GEO. Comprendre les LLMs, structurer le contenu, mesurer les résultats.",
        link: "/contact",
        linkText: "Programme sur demande"
    },
];

const COMPARAISON = [
    { critere: "Objectif", seo: "Ranker dans les résultats Google", geo: "Être cité dans les réponses IA" },
    { critere: "Cible", seo: "Algorithme Google (PageRank, Core Updates)", geo: "LLMs (GPT-4, Gemini, Claude)" },
    { critere: "Format idéal", seo: "Contenu long, mots-clés, backlinks", geo: "Réponses directes, données sourcées, Q&R" },
    { critere: "Mesure", seo: "Positions, CTR, trafic organique", geo: "Citations IA, score de citabilité, mentions" },
    { critere: "Technique", seo: "Balises meta, vitesse, maillage", geo: "JSON-LD, llms.txt, crawlers IA" },
    { critere: "Délai", seo: "3-6 mois", geo: "1-3 mois (terrain encore vierge)" },
];

const FAQ = [
    {
        question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
        answer: "Le GEO est l'ensemble des techniques d'optimisation de contenu pour apparaître dans les réponses des moteurs IA génératifs comme ChatGPT, Perplexity, Gemini ou Claude. Contrairement au SEO classique qui vise les résultats Google, le GEO vise à être cité comme source par les intelligences artificielles. C'est un complément du SEO, pas un remplacement."
    },
    {
        question: "Pourquoi le GEO est-il important en 2026 ?",
        answer: "En 2026, ChatGPT traite 2,5 milliards de requêtes par jour. 39 % des Français utilisent déjà l'IA pour leurs recherches. Les AI Overviews de Google réduisent le CTR organique de 61 % sur certaines requêtes. Si votre site n'est pas optimisé pour les IA, vous perdez une part croissante de votre audience potentielle."
    },
    {
        question: "Quelle est la différence entre un consultant SEO et un consultant GEO ?",
        answer: "Un consultant SEO optimise votre site pour les moteurs de recherche classiques (Google, Bing). Un consultant GEO optimise votre contenu pour être cité par les IA génératives (ChatGPT, Perplexity, Gemini). En réalité, les deux sont complémentaires : un bon référencement Google reste la base pour être visible dans les IA, car les LLMs privilégient les sources qui rankent bien."
    },
    {
        question: "Comment savoir si mon site est visible sur ChatGPT ?",
        answer: "Utilisez notre outil gratuit de test de visibilité IA. Il analyse votre site sur 8 crawlers IA (GPTBot, PerplexityBot, Claude-Web, etc.), vérifie votre fichier llms.txt, évalue votre score de citabilité et identifie les optimisations prioritaires. Le test prend 30 secondes et ne nécessite aucune inscription."
    },
    {
        question: "Combien coûte un accompagnement GEO ?",
        answer: "Les tarifs varient selon la taille de votre site et vos objectifs. Un audit GEO initial démarre à partir de 800 €. L'accompagnement mensuel (optimisation continue + monitoring) se situe entre 500 € et 1 500 €/mois selon le volume de contenu à traiter. Le premier diagnostic avec notre outil est entièrement gratuit."
    },
    {
        question: "Faut-il choisir entre SEO et GEO ?",
        answer: "Non, les deux stratégies sont complémentaires. Le SEO reste la base : les IA génératives citent principalement des sites qui sont déjà bien positionnés sur Google. Le GEO ajoute une couche d'optimisation spécifique pour maximiser vos chances d'être la source choisie par les IA. Un bon consultant GEO maîtrise les deux."
    },
];

// ══════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════

export default function ConsultantGEOClient() {
    return (
        <main className="bg-white">
            {/* ═══ HERO ═══ */}
            <section className="bg-ink text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-sauge font-medium mb-4 text-sm uppercase tracking-wider">
                                Consultant GEO &middot; Generative Engine Optimization
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Soyez <span className="text-sauge">cité par ChatGPT</span> et les IA génératives
                            </h1>
                            <p className="text-xl text-white/80 mb-8 leading-relaxed">
                                En tant que consultante GEO, j'optimise votre site pour qu'il devienne la <strong>source privilégiée</strong> des intelligences artificielles. Pas juste ranker sur Google — être <strong>cité par ChatGPT, Perplexity et Gemini</strong>.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <Link href="/outils/testeur-visibilite-ia">
                                    <Button className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all">
                                        <Eye className="w-5 h-5 mr-2" />
                                        Tester ma visibilité IA (gratuit)
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                        Demander un audit GEO
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm text-soft-light">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Outil d'audit GEO gratuit
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Seul outil GEO gratuit en français
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Experte SEO + GEO
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-sauge/20 rounded-3xl transform rotate-6"></div>
                                <div className="absolute inset-0 bg-white/10 rounded-3xl transform -rotate-3"></div>
                                <Image
                                    src="/images/ai-brain.webp"
                                    alt="Consultant GEO - Optimisation pour ChatGPT et les IA génératives"
                                    fill
                                    className="object-cover rounded-3xl relative z-10"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ ALERTE : POURQUOI LE GEO EST URGENT ═══ */}
            <section className="py-6 bg-amber-50 border-b border-amber-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 text-center">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-sm md:text-base text-amber-800">
                            <strong>En 2026, 39 % des Français utilisent l'IA pour chercher des informations.</strong>{" "}
                            Si votre site n'est pas optimisé, vous êtes invisible pour une part croissante de votre audience.{" "}
                            <Link href="/outils/testeur-visibilite-ia" className="text-sauge font-semibold hover:underline">
                                Testez votre visibilité IA gratuitement &rarr;
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ CHIFFRES CLÉS ═══ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Pourquoi le <span className="text-sauge">GEO</span> est devenu indispensable
                        </h2>
                        <p className="text-lg text-soft max-w-3xl mx-auto">
                            Les chiffres parlent d'eux-mêmes : l'IA transforme la façon dont les gens trouvent de l'information. Les entreprises qui ne s'adaptent pas perdent du terrain chaque jour.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:border-sauge hover:shadow-lg transition-all"
                            >
                                <div className="text-3xl md:text-4xl font-heading font-bold text-sauge mb-2">
                                    {stat.value}
                                </div>
                                <p className="text-soft text-sm mb-2">{stat.label}</p>
                                <p className="text-xs text-soft/60 italic">{stat.source}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ DÉFINITION GEO ═══ */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-8 text-center">
                            Qu'est-ce qu'un <span className="text-sauge">consultant GEO</span> ?
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft">
                            <p className="text-xl leading-relaxed mb-6">
                                Un <strong>consultant GEO</strong> (Generative Engine Optimization) est un expert qui optimise votre présence en ligne pour être <strong>cité et recommandé par les intelligences artificielles</strong> : ChatGPT, Perplexity, Gemini, Claude, et les AI Overviews de Google.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Contrairement au <Link href="/consultant-seo" className="text-sauge hover:underline">consultant SEO classique</Link> qui se concentre sur le positionnement dans les résultats de recherche Google, le consultant GEO travaille sur la <strong>citabilité</strong> de votre contenu. L'objectif : que lorsqu'un utilisateur pose une question à ChatGPT dans votre domaine, <strong>votre site soit la source citée</strong>.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Le GEO repose sur 4 piliers : l'accessibilité technique aux crawlers IA, la richesse sémantique du contenu, les signaux E-E-A-T (Expérience, Expertise, Autorité, Fiabilité) et un format de contenu adapté aux LLMs. J'ai détaillé ces piliers dans mon <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="text-sauge hover:underline">guide complet GEO 2026</Link>.
                            </p>
                            <p className="leading-relaxed mb-6">
                                En tant que <strong>consultante GEO et SEO</strong>, je combine expertise technique (Next.js, données structurées, automatisation) et stratégie de contenu pour faire de votre site une référence — sur Google <em>et</em> dans les IA. Mon <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">outil gratuit de test de visibilité IA</Link> est le seul outil GEO gratuit en français.
                            </p>
                            <p className="leading-relaxed">
                                Je propose aussi un accompagnement en <Link href="/consultant-ia" className="text-sauge hover:underline">intégration IA pour les entreprises</Link> (agents sur mesure, automatisation) avec un <Link href="/audit-ia" className="text-sauge hover:underline">audit IA gratuit</Link>. Besoin d'un diagnostic complet ? Commencez par un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO</Link> pour évaluer votre situation sur Google, ou explorez mes services de <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ 4 PILIERS DU GEO ═══ */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Les 4 piliers du <span className="text-sauge-light">GEO</span>
                        </h2>
                        <p className="text-lg text-soft-light max-w-2xl mx-auto">
                            Ma méthodologie s'appuie sur les 4 dimensions que les IA évaluent pour choisir leurs sources.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {PILIERS.map((pilier, index) => (
                            <motion.div
                                key={pilier.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-sauge/50 transition-all"
                            >
                                <div className="w-14 h-14 bg-sauge/20 rounded-xl flex items-center justify-center mb-6">
                                    <pilier.icon className="w-7 h-7 text-sauge-light" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3">
                                    {pilier.title}
                                </h3>
                                <p className="text-soft-light leading-relaxed mb-4">
                                    {pilier.description}
                                </p>
                                <ul className="space-y-2">
                                    {pilier.details.map((detail) => (
                                        <li key={detail} className="flex items-start gap-2 text-sm text-soft-light">
                                            <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SERVICES GEO ═══ */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Mes services de <span className="text-sauge">consultant GEO</span>
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            De l'audit initial au monitoring continu, je vous accompagne pour devenir la source que les IA recommandent.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES_GEO.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-sauge/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sauge transition-colors">
                                    <service.icon className="w-7 h-7 text-sauge group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-soft leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <Link href={service.link} className="inline-flex items-center gap-2 text-sauge font-semibold text-sm hover:underline">
                                    {service.linkText}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TABLEAU SEO vs GEO ═══ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            <span className="text-sauge">SEO</span> vs <span className="text-sauge">GEO</span> : les différences clés
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Le GEO ne remplace pas le SEO, il le complète. Voici ce qui change concrètement.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                <thead>
                                    <tr className="bg-ink text-white">
                                        <th className="px-6 py-4 text-left font-heading font-bold">Critère</th>
                                        <th className="px-6 py-4 text-left font-heading font-bold">SEO classique</th>
                                        <th className="px-6 py-4 text-left font-heading font-bold text-sauge-light">GEO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARAISON.map((row, index) => (
                                        <tr key={row.critere} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="px-6 py-4 font-semibold text-ink text-sm">{row.critere}</td>
                                            <td className="px-6 py-4 text-soft text-sm">{row.seo}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-ink">{row.geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center mt-6 text-soft text-sm">
                            Pour aller plus loin, consultez mon <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="text-sauge hover:underline">guide complet du GEO en 2026</Link>.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══ POURQUOI MOI ═══ */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Pourquoi me choisir comme <span className="text-sauge">consultante GEO</span> ?
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Un profil rare : expertise technique + stratégie SEO + compréhension des LLMs.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "Outil GEO unique",
                                description: "Créatrice du seul outil d'audit GEO gratuit en français, utilisé par des centaines de professionnels."
                            },
                            {
                                icon: Code2,
                                title: "Profil technique",
                                description: "Développeuse Next.js, Claude Code, n8n. Je code les solutions, pas juste les recommandations."
                            },
                            {
                                icon: Target,
                                title: "Double expertise",
                                description: "Consultante SEO et GEO. Pas l'un OU l'autre — les deux, combinés pour un maximum d'impact."
                            },
                            {
                                icon: Zap,
                                title: "Early adopter",
                                description: "Spécialisée GEO depuis les débuts. Avance stratégique sur un marché encore en construction."
                            }
                        ].map((avantage, index) => (
                            <motion.div
                                key={avantage.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-sauge/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <avantage.icon className="w-8 h-8 text-sauge" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                    {avantage.title}
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    {avantage.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TARIFS ═══ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Tarifs consultant GEO
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Des formules claires, du diagnostic gratuit à l'accompagnement complet.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Audit gratuit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-sauge transition-all"
                        >
                            <h3 className="text-xl font-heading font-bold text-ink mb-2">Diagnostic GEO</h3>
                            <p className="text-soft text-sm mb-6">Test automatisé de votre visibilité IA</p>
                            <div className="text-4xl font-bold text-sauge mb-6">
                                Gratuit
                            </div>
                            <ul className="space-y-3 mb-8">
                                {["Score de visibilité IA /100", "Analyse de 8 crawlers IA", "Vérification llms.txt", "3 actions prioritaires"].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button variant="outline" className="w-full rounded-xl border-2">
                                    Tester gratuitement
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Audit expert */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-ink text-white p-8 rounded-2xl relative transform lg:scale-105 shadow-xl"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sauge text-white text-xs font-bold px-4 py-1 rounded-full">
                                RECOMMANDÉ
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2">Audit GEO expert</h3>
                            <p className="text-soft-light text-sm mb-6">Analyse approfondie + plan d'action</p>
                            <div className="text-4xl font-bold mb-6">
                                Sur devis
                            </div>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Audit technique complet (crawlers, llms.txt, schemas)",
                                    "Analyse sémantique de citabilité",
                                    "Benchmark concurrentiel GEO",
                                    "Plan d'action priorisé sur 3 mois",
                                    "Livrable PDF détaillé"
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact">
                                <Button className="w-full bg-sauge hover:bg-white hover:text-ink rounded-xl py-6">
                                    Demander un devis
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Accompagnement */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-sauge transition-all"
                        >
                            <h3 className="text-xl font-heading font-bold text-ink mb-2">Accompagnement GEO</h3>
                            <p className="text-soft text-sm mb-6">Optimisation continue + monitoring</p>
                            <div className="text-4xl font-bold text-ink mb-6">
                                Sur devis
                            </div>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Audit initial inclus",
                                    "Optimisations mensuelles on-page",
                                    "Création de contenu GEO (2-4 articles)",
                                    "Monitoring des citations IA",
                                    "Reporting mensuel"
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full rounded-xl border-2">
                                    Discuter du projet
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes sur le GEO
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Tout ce que vous devez savoir avant de vous lancer dans le Generative Engine Optimization.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {FAQ.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 p-6 rounded-2xl border border-gray-100"
                            >
                                <h3 className="text-lg font-heading font-bold text-ink mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ARTICLES LIÉS ═══ */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le GEO
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Guide complet</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    GEO 2026 : être visible sur ChatGPT et les IA
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Le guide de référence pour comprendre et appliquer le Generative Engine Optimization.
                                </p>
                            </Link>
                            <Link href="/blog/checklist-seo-2026" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Checklist</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Checklist SEO 2026 : 50 points essentiels
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Inclut une section complète sur la visibilité IA et les optimisations GEO.
                                </p>
                            </Link>
                            <Link href="/blog/definition-seo-guide-complet" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Fondamentaux</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Le SEO expliqué : guide complet
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Comprendre les bases du référencement naturel, fondation du GEO.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ OUTILS GRATUITS ═══ */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Outils GEO &amp; SEO gratuits
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/outils/testeur-visibilite-ia" className="group flex items-start gap-4 bg-sauge/5 p-6 rounded-2xl border border-sauge/10 hover:border-sauge hover:shadow-lg transition-all">
                                <Bot className="w-10 h-10 text-sauge flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-ink group-hover:text-sauge transition-colors">
                                        Testeur de visibilité IA
                                    </h3>
                                    <p className="text-soft text-sm mt-1">
                                        Testez si votre site est visible par ChatGPT, Perplexity et les autres IA. Score /100 + plan d'action.
                                    </p>
                                </div>
                            </Link>
                            <Link href="/outils/generateur-robots-txt" className="group flex items-start gap-4 bg-sauge/5 p-6 rounded-2xl border border-sauge/10 hover:border-sauge hover:shadow-lg transition-all">
                                <FileText className="w-10 h-10 text-sauge flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-ink group-hover:text-sauge transition-colors">
                                        Générateur robots.txt
                                    </h3>
                                    <p className="text-soft text-sm mt-1">
                                        Configurez votre robots.txt avec les crawlers IA 2026 inclus (GPTBot, PerplexityBot, Claude-Web).
                                    </p>
                                </div>
                            </Link>
                            <Link href="/outils/generateur-schema-json-ld" className="group flex items-start gap-4 bg-sauge/5 p-6 rounded-2xl border border-sauge/10 hover:border-sauge hover:shadow-lg transition-all">
                                <Code2 className="w-10 h-10 text-sauge flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-ink group-hover:text-sauge transition-colors">
                                        Générateur Schema JSON-LD
                                    </h3>
                                    <p className="text-soft text-sm mt-1">
                                        Créez vos données structurées en un clic. Essentiel pour le GEO et les rich snippets Google.
                                    </p>
                                </div>
                            </Link>
                            <Link href="/outils/audit-seo-gratuit" className="group flex items-start gap-4 bg-sauge/5 p-6 rounded-2xl border border-sauge/10 hover:border-sauge hover:shadow-lg transition-all">
                                <Search className="w-10 h-10 text-sauge flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-ink group-hover:text-sauge transition-colors">
                                        Audit SEO gratuit
                                    </h3>
                                    <p className="text-soft text-sm mt-1">
                                        Calculez votre score SEO en 3 secondes. Analyse technique, sémantique et performance.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ CTA FINAL ═══ */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à être cité par les IA ?
                        </h2>
                        <p className="text-xl text-soft-light mb-8 max-w-2xl mx-auto">
                            Commencez par tester votre visibilité gratuitement, ou contactez-moi pour un accompagnement GEO sur mesure.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link href="/outils/testeur-visibilite-ia">
                                <Button className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all">
                                    <Eye className="w-5 h-5 mr-2" />
                                    Test de visibilité IA gratuit
                                </Button>
                            </Link>
                            <a href="tel:0661139748">
                                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                    <Phone className="w-5 h-5 mr-2" />
                                    06 61 13 97 48
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-soft-light text-sm">
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Réponse sous 24h
                            </span>
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Diagnostic gratuit sans engagement
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </span>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <Link href="/consultant-seo" className="text-soft-light hover:text-sauge transition-colors text-sm">
                                Vous cherchez un <span className="underline">consultant SEO classique</span> ? &rarr;
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SCHEMAS JSON-LD ═══ */}

            {/* FAQPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            {/* Service Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Consultant GEO - Generative Engine Optimization",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "jobTitle": "Consultante GEO & SEO",
                            "url": "https://indhack.com",
                            "sameAs": [
                                "https://www.linkedin.com/in/indianaaflalo"
                            ]
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "France"
                        },
                        "description": "Services de consultant GEO (Generative Engine Optimization) : audit de visibilité IA, optimisation pour ChatGPT, Perplexity et Gemini, création de contenu citable, données structurées et monitoring des citations IA.",
                        "offers": {
                            "@type": "AggregateOffer",
                            "lowPrice": "0",
                            "highPrice": "5000",
                            "priceCurrency": "EUR",
                            "offerCount": "3"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Services GEO",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Diagnostic GEO gratuit",
                                        "url": "https://indhack.com/outils/testeur-visibilite-ia"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Audit GEO expert"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Accompagnement GEO mensuel"
                                    }
                                }
                            ]
                        }
                    })
                }}
            />

            <HomepageBacklink variant="default" />
        </main>
    );
}
