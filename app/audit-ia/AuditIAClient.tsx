"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    Bot,
    Cpu,
    Zap,
    Workflow,
    ArrowRight,
    CheckCircle2,
    Phone,
    Mail,
    Clock,
    Shield,
    Target,
    Users,
    FileText,
    Sparkles,
    Settings,
    BarChart3,
    AlertTriangle,
    ClipboardCheck,
    Search,
    TrendingUp,
    Code,
    Database,
    Lightbulb,
    Timer,
    PieChart,
    Layers
} from "lucide-react";

// ══════════════════════════════════════════════════════════════
// DONNÉES
// ══════════════════════════════════════════════════════════════

const AUDIT_POINTS = [
    {
        icon: Search,
        title: "Cartographie des processus",
        description: "Analyse détaillée de chaque processus métier : temps passé, fréquence, complexité, dépendances. Identification des goulots d'étranglement.",
        items: ["Entretiens avec vos équipes", "Analyse des flux de travail", "Mesure du temps par tâche", "Identification des doublons"]
    },
    {
        icon: Target,
        title: "Score d'automatisabilité",
        description: "Chaque tâche reçoit un score de 1 à 10 basé sur sa répétitivité, sa complexité et le volume de données impliqué.",
        items: ["Matrice effort/impact", "Priorisation par ROI", "Faisabilité technique", "Risques identifiés"]
    },
    {
        icon: BarChart3,
        title: "Estimation du ROI",
        description: "Calcul précis du temps et de l'argent économisés pour chaque automatisation proposée, avec projection à 3, 6 et 12 mois.",
        items: ["Coût actuel vs automatisé", "Temps gagné par semaine", "Retour sur investissement", "Seuil de rentabilité"]
    },
    {
        icon: Layers,
        title: "Roadmap technique",
        description: "Plan d'action priorisé avec les technologies recommandées (LLM, n8n, Make), le calendrier de mise en œuvre et le budget estimé.",
        items: ["Choix technologiques", "Planning de déploiement", "Budget détaillé", "Quick wins identifiés"]
    }
];

const TASKS_AUTOMATISABLES = [
    {
        category: "Administration",
        icon: FileText,
        color: "bg-blue-500",
        tasks: [
            "Saisie et mise à jour de données",
            "Génération de factures et devis",
            "Tri et réponse aux emails",
            "Classement de documents"
        ],
        gain: "8-12h/semaine"
    },
    {
        category: "Commercial",
        icon: Users,
        color: "bg-emerald-500",
        tasks: [
            "Qualification de leads",
            "Relances automatiques",
            "Création de propositions commerciales",
            "Veille concurrentielle"
        ],
        gain: "6-10h/semaine"
    },
    {
        category: "Marketing",
        icon: TrendingUp,
        color: "bg-purple-500",
        tasks: [
            "Rédaction de contenus (fiches produit, posts)",
            "Analyse des performances",
            "Reporting mensuel",
            "Veille sectorielle"
        ],
        gain: "5-8h/semaine"
    },
    {
        category: "Service client",
        icon: Bot,
        color: "bg-orange-500",
        tasks: [
            "Réponses aux questions fréquentes",
            "Prise de rendez-vous",
            "Suivi des réclamations",
            "FAQ dynamique"
        ],
        gain: "10-15h/semaine"
    }
];

const PROCESS_STEPS = [
    {
        step: 1,
        title: "Prise de contact",
        description: "Échange de 15 minutes pour comprendre votre activité, vos enjeux et vos objectifs. Gratuit et sans engagement.",
        icon: Phone
    },
    {
        step: 2,
        title: "Immersion terrain",
        description: "J'observe vos équipes en situation réelle ou par visio. Je cartographie chaque processus, mesure les temps et identifie les points de friction.",
        icon: Search
    },
    {
        step: 3,
        title: "Analyse et scoring",
        description: "Attribution d'un score d'automatisabilité à chaque tâche. Calcul du ROI potentiel et priorisation par impact business.",
        icon: PieChart
    },
    {
        step: 4,
        title: "Livraison du rapport",
        description: "Rapport complet sous 48h : cartographie, scores, ROI estimé, roadmap technique et budget. Présentation en visio incluse.",
        icon: FileText
    }
];

const FAQ = [
    {
        question: "L'audit IA est-il vraiment gratuit ?",
        answer: "Oui, l'audit initial est 100 % gratuit et sans engagement. C'est un diagnostic de vos processus qui vous donne une vision claire de ce que l'IA peut vous apporter. Si vous souhaitez aller plus loin avec l'implémentation, je vous propose un devis détaillé."
    },
    {
        question: "Combien de temps dure un audit IA ?",
        answer: "L'audit complet prend 1 à 2 jours selon la taille de votre entreprise. La phase d'immersion dure environ 2 heures (sur site ou en visio). Le rapport détaillé est livré sous 48h avec une présentation en visio incluse."
    },
    {
        question: "Mon entreprise est-elle trop petite pour l'IA ?",
        answer: "Absolument pas. L'IA est même plus impactante dans les petites structures car chaque heure gagnée compte davantage. Un auto-entrepreneur qui gagne 5h/semaine, c'est l'équivalent d'un mi-temps en plus. Les solutions que je propose s'adaptent à tous les budgets."
    },
    {
        question: "Quels types d'entreprises bénéficient le plus d'un audit IA ?",
        answer: "Toute entreprise avec des tâches répétitives : cabinets comptables, agences immobilières, e-commerce, artisans, restaurants, cabinets médicaux, agences web… Si vos équipes passent du temps sur de la saisie, du tri, des relances ou du reporting, l'IA peut les libérer."
    },
    {
        question: "Quelle est la différence entre l'audit IA et l'audit SEO ?",
        answer: "L'audit SEO analyse votre site web pour améliorer votre visibilité sur Google. L'audit IA analyse vos processus métiers pour identifier les tâches automatisables. Les deux sont complémentaires : le SEO vous amène des clients, l'IA vous fait gagner du temps pour mieux les servir."
    }
];

// ══════════════════════════════════════════════════════════════
// COMPOSANT
// ══════════════════════════════════════════════════════════════

export default function AuditIAClient() {
    return (
        <main className="bg-white">
            {/* ─── Hero ─── */}
            <section className="bg-ink text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-emerald-400 font-medium mb-4 text-sm uppercase tracking-wider">
                                Audit IA · Diagnostic d'automatisation · Gratuit
                            </p>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Découvrez combien de temps{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                                    l'IA peut vous faire gagner
                                </span>
                            </h1>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                                Audit gratuit de vos processus métiers. Je cartographie vos tâches répétitives, calcule le <strong>ROI de l'automatisation</strong> et vous livre une roadmap actionnable sous 48h.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Link href="/contact">
                                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                                        <ClipboardCheck className="w-5 h-5 mr-2" />
                                        Demander l'audit gratuit
                                    </Button>
                                </Link>
                                <a href="tel:0661139748">
                                    <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        06 61 13 97 48
                                    </Button>
                                </a>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-soft-light">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    100 % gratuit
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Rapport sous 48h
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Sans engagement
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Visio de restitution incluse
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Alert Banner ─── */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-amber-50 border-y border-amber-200 py-4"
            >
                <div className="container mx-auto px-4 text-center">
                    <p className="text-amber-900">
                        <AlertTriangle className="inline w-4 h-4 mr-2 -mt-0.5" />
                        <strong>40 % des tâches administratives sont automatisables par l'IA</strong> (Goldman Sachs, 2024).{" "}
                        <span className="text-amber-800">
                            Et si vous commenciez par savoir lesquelles ?
                        </span>
                    </p>
                </div>
            </motion.section>

            {/* ─── Ce que l'audit analyse ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Ce que l'audit IA <span className="text-emerald-600">analyse</span>
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Un diagnostic complet de vos processus avec des recommandations concrètes et chiffrées.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {AUDIT_POINTS.map((point, index) => (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                                    <point.icon className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                    {point.title}
                                </h3>
                                <p className="text-soft leading-relaxed mb-4">
                                    {point.description}
                                </p>
                                <ul className="space-y-2">
                                    {point.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-soft">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Tâches automatisables par département ─── */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Quelles tâches peut-on <span className="text-emerald-400">automatiser</span> ?
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Voici les tâches les plus fréquemment automatisées chez mes clients, classées par département.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {TASKS_AUTOMATISABLES.map((dept, index) => (
                            <motion.div
                                key={dept.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                            >
                                <div className={`w-12 h-12 ${dept.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <dept.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-heading font-bold mb-3">
                                    {dept.category}
                                </h3>
                                <ul className="space-y-2 mb-4">
                                    {dept.tasks.map((task, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-3 border-t border-white/10">
                                    <p className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                        <Timer className="w-4 h-4" />
                                        Gain moyen : {dept.gain}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Comment se déroule l'audit ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Comment se déroule l'audit ?
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Un processus simple en 4 étapes, de la prise de contact à la livraison du rapport.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {PROCESS_STEPS.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 bg-ink text-white rounded-full flex items-center justify-center relative">
                                        <step.icon className="w-7 h-7" />
                                        <span className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                                            {step.step}
                                        </span>
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <h3 className="text-lg font-heading font-bold text-ink mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-soft leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/contact">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl text-lg font-semibold">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Lancer mon audit gratuit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Ce que vous recevez ─── */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-8 text-center">
                            Ce que contient le rapport d'audit
                        </h2>

                        <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-emerald-500" />
                                        Rapport détaillé (PDF)
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Cartographie complète de vos processus",
                                            "Score d'automatisabilité par tâche (1 à 10)",
                                            "Estimation du ROI à 3, 6 et 12 mois",
                                            "Technologies recommandées pour chaque cas",
                                            "Budget estimé pour l'implémentation",
                                            "Identification des quick wins (gains rapides)"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-soft">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-emerald-500" />
                                        Roadmap d'implémentation
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Planning de déploiement phase par phase",
                                            "Priorisation par impact business",
                                            "Ressources nécessaires (internes + externes)",
                                            "Risques identifiés et mitigations",
                                            "KPIs de suivi recommandés",
                                            "Présentation en visio (30 min)"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-soft">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Lien vers consultant-ia ─── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto bg-emerald-50 p-8 md:p-10 rounded-2xl border border-emerald-100"
                    >
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center">
                                    <Bot className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-heading font-bold text-ink mb-2">
                                    Envie d'aller plus loin après l'audit ?
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    L'audit identifie les opportunités. Mon service de <Link href="/consultant-ia" className="text-emerald-600 font-semibold hover:underline">consultant IA</Link> les concrétise : création d'agents sur mesure, automatisation des workflows, formation de vos équipes et SAV garanti.
                                </p>
                            </div>
                            <Link href="/consultant-ia" className="flex-shrink-0">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-4">
                                    Découvrir le service IA
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes sur l'audit IA
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {FAQ.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100"
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

            {/* ─── Articles liés ─── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">
                                    Comment apparaître sur ChatGPT en 2026
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Le guide complet GEO pour être cité par les IA.
                                </p>
                            </Link>
                            <Link href="/blog/audit-seo-erreurs-qui-coutent-cher" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">
                                    Les erreurs d'audit qui coûtent cher
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Les erreurs SEO les plus fréquentes et comment les éviter.
                                </p>
                            </Link>
                            <Link href="/blog/checklist-seo-2026" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">
                                    Checklist SEO 2026
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Tous les critères SEO et GEO à vérifier pour votre site.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Outils gratuits ─── */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Mes outils gratuits
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/outils/audit-seo-gratuit" className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Target className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Audit SEO gratuit</h3>
                                    <p className="text-xs text-soft">Analysez votre site en 30s</p>
                                </div>
                            </Link>
                            <Link href="/outils/testeur-visibilite-ia" className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Bot className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Testeur visibilité IA</h3>
                                    <p className="text-xs text-soft">Êtes-vous cité par ChatGPT ?</p>
                                </div>
                            </Link>
                            <Link href="/outils/generateur-schema-json-ld" className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Code className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Générateur Schema</h3>
                                    <p className="text-xs text-soft">Données structurées JSON-LD</p>
                                </div>
                            </Link>
                            <Link href="/outils/generateur-robots-txt" className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Settings className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Générateur robots.txt</h3>
                                    <p className="text-xs text-soft">Contrôlez les crawlers IA</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA Final ─── */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à découvrir votre potentiel IA ?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                            L'audit est gratuit, sans engagement, et livré sous 48h. Vous n'avez rien à perdre — seulement du temps à gagner.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link href="/contact">
                                <Button className="bg-emerald-500 hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all">
                                    <ClipboardCheck className="w-5 h-5 mr-2" />
                                    Demander l'audit gratuit
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
                                100 % gratuit
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </span>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6">
                            <Link href="/consultant-ia" className="text-soft-light hover:text-emerald-400 transition-colors text-sm">
                                Voir aussi : <span className="underline">Consultant IA</span> →
                            </Link>
                            <Link href="/consultant-geo" className="text-soft-light hover:text-emerald-400 transition-colors text-sm">
                                Voir aussi : <span className="underline">Consultant GEO</span> →
                            </Link>
                            <Link href="/audit-seo" className="text-soft-light hover:text-sauge-light transition-colors text-sm">
                                Voir aussi : <span className="underline">Audit SEO</span> →
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Schema.org FAQ ─── */}
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

            <HomepageBacklink variant="default" />
        </main>
    );
}
