"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    Bot,
    Cpu,
    Zap,
    Workflow,
    Code,
    Database,
    ArrowRight,
    CheckCircle2,
    MessageSquareText,
    TrendingUp,
    Phone,
    Mail,
    Clock,
    Shield,
    Target,
    Users,
    Award,
    FileText,
    Sparkles,
    Settings,
    BarChart3,
    AlertTriangle,
    Briefcase,
    Wrench
} from "lucide-react";

// ══════════════════════════════════════════════════════════════
// DONNÉES
// ══════════════════════════════════════════════════════════════

const STATS = [
    {
        value: "72 %",
        label: "des entreprises utilisent l'IA en 2025",
        source: "McKinsey, 2025"
    },
    {
        value: "10h",
        label: "gagnées/semaine avec l'automatisation IA",
        source: "Accenture, 2025"
    },
    {
        value: "x3,5",
        label: "ROI moyen d'un projet IA en PME",
        source: "Deloitte, 2025"
    },
    {
        value: "40 %",
        label: "des tâches administratives automatisables",
        source: "Goldman Sachs, 2024"
    }
];

const USE_CASES = [
    {
        icon: MessageSquareText,
        title: "Service client automatisé",
        description: "Un chatbot IA nourri de vos FAQ, fiches produit et process internes qui répond 24h/24 avec la précision d'un expert.",
        result: "Réduction de 70 % des tickets de niveau 1",
        color: "bg-blue-500"
    },
    {
        icon: FileText,
        title: "Rédaction et contenu",
        description: "Génération de fiches produit, descriptions, emails marketing et rapports via des flux RAG sécurisés avec vos données.",
        result: "Production de contenu x5 plus rapide",
        color: "bg-emerald-500"
    },
    {
        icon: Database,
        title: "Extraction et analyse de données",
        description: "Scraping intelligent, analyse concurrentielle, veille automatisée et structuration de données non formatées.",
        result: "De 2 jours à 15 minutes par analyse",
        color: "bg-purple-500"
    },
    {
        icon: Workflow,
        title: "Automatisation des processus",
        description: "Synchronisation CRM/CMS/email, génération automatique de devis, relances clients, reporting financier.",
        result: "80 % de temps administratif économisé",
        color: "bg-orange-500"
    },
    {
        icon: Briefcase,
        title: "Aide à la décision",
        description: "Dashboards IA qui analysent vos KPIs, détectent les tendances et proposent des actions concrètes.",
        result: "Décisions data-driven en temps réel",
        color: "bg-pink-500"
    },
    {
        icon: Code,
        title: "Agents IA sur mesure",
        description: "Création d'agents autonomes qui exécutent des tâches complexes : prospection, qualification de leads, tri de candidatures.",
        result: "Agents qui travaillent pendant que vous dormez",
        color: "bg-indigo-500"
    }
];

const METHODOLOGY = [
    {
        step: 1,
        title: "Audit métier gratuit",
        description: "J'analyse vos processus en détail : quelles tâches sont répétitives ? Où perdez-vous du temps ? Quel est le ROI potentiel de l'automatisation ?",
        duration: "1-2 jours",
        color: "bg-ink"
    },
    {
        step: 2,
        title: "Conception de la solution",
        description: "Architecture technique sur mesure : choix du LLM (Claude, GPT-4, Mistral), design des prompts, structure des flux de données, sécurité.",
        duration: "3-5 jours",
        color: "bg-emerald-500"
    },
    {
        step: 3,
        title: "Développement et tests",
        description: "Création des agents, pipelines d'automatisation et intégrations. Tests rigoureux sur vos cas réels avec validation humaine.",
        duration: "1-3 semaines",
        color: "bg-purple-500"
    },
    {
        step: 4,
        title: "Déploiement et formation",
        description: "Mise en production dans votre environnement. Formation de vos équipes au prompt engineering et à la supervision des agents.",
        duration: "2-3 jours",
        color: "bg-blue-500"
    },
    {
        step: 5,
        title: "SAV et optimisation continue",
        description: "Maintenance, monitoring des performances, ajustements des prompts et évolution des agents selon vos nouveaux besoins.",
        duration: "Continu",
        color: "bg-orange-500"
    }
];

const AVANTAGES = [
    {
        icon: Zap,
        title: "Experte technique",
        description: "Je code vos agents moi-même (Python, API Anthropic/OpenAI, n8n). Pas de sous-traitance, pas d'intermédiaire."
    },
    {
        icon: Shield,
        title: "Données sécurisées",
        description: "Hébergement local ou cloud privé. Vos données ne quittent jamais votre infrastructure si vous le souhaitez."
    },
    {
        icon: Users,
        title: "Formation incluse",
        description: "Vos équipes deviennent autonomes. Je forme au prompt engineering et à la supervision des agents IA."
    },
    {
        icon: Award,
        title: "SAV garanti",
        description: "Maintenance continue, monitoring des performances et évolution des agents. Vous n'êtes jamais seul après le déploiement."
    }
];

const FAQ = [
    {
        question: "Qu'est-ce qu'un consultant IA pour entreprise ?",
        answer: "Un consultant IA est un expert qui aide les entreprises à identifier, concevoir et déployer des solutions d'intelligence artificielle adaptées à leurs besoins. Contrairement à un simple intégrateur, je réalise un audit métier complet pour identifier les tâches automatisables, puis je crée des agents IA sur mesure (chatbots, assistants de rédaction, automatisation de processus) en utilisant les meilleurs LLMs du marché (Claude, ChatGPT, Mistral)."
    },
    {
        question: "Combien coûte l'intégration de l'IA dans une PME ?",
        answer: "Le coût varie selon la complexité du projet. Un chatbot simple démarre autour de 1 500 €, une automatisation complète de processus entre 3 000 € et 10 000 €. L'audit initial est gratuit et vous donne une estimation précise avec le ROI attendu. En moyenne, mes clients récupèrent leur investissement en moins de 3 mois grâce au temps gagné."
    },
    {
        question: "Quels outils et technologies utilisez-vous ?",
        answer: "J'utilise les API d'Anthropic (Claude) et d'OpenAI (GPT-4), les plateformes d'automatisation n8n et Make, Python pour le développement d'agents complexes, et des bases vectorielles (Pinecone, ChromaDB) pour le RAG. Le choix technologique dépend de votre cas d'usage : performance, coût, confidentialité des données."
    },
    {
        question: "Mes données sont-elles en sécurité ?",
        answer: "La sécurité est ma priorité absolue. Je propose des déploiements 100 % locaux (aucune donnée ne quitte votre serveur), des modèles open-source auto-hébergés si nécessaire, et je respecte le RGPD. Chaque projet inclut un audit de sécurité des données et une documentation complète des flux."
    },
    {
        question: "Faut-il des compétences techniques dans mon équipe ?",
        answer: "Non. Je forme vos collaborateurs au prompt engineering et à la supervision des agents IA. L'objectif est de vous rendre autonome. Mes interfaces sont conçues pour être utilisables par des non-techniciens. Le SAV inclus garantit un accompagnement continu après le déploiement."
    },
    {
        question: "Quelle est la différence entre consultant IA et consultant GEO ?",
        answer: "Le consultant IA automatise vos processus internes (chatbots, agents, workflows). Le consultant GEO optimise votre visibilité sur les moteurs IA (ChatGPT, Perplexity, Gemini). Les deux sont complémentaires : l'IA optimise votre productivité en interne, le GEO attire des clients via les réponses des IA. Je propose les deux services."
    }
];

const TARIFS = [
    {
        name: "Audit IA",
        subtitle: "Diagnostic de vos processus",
        price: "Gratuit",
        features: [
            "Analyse de vos tâches répétitives",
            "Cartographie des processus automatisables",
            "Estimation du ROI et du temps gagné",
            "Recommandations techniques",
            "Rapport détaillé sous 48h"
        ],
        cta: "Demander l'audit gratuit",
        ctaLink: "/contact",
        popular: false,
        variant: "outline" as const
    },
    {
        name: "Projet clé en main",
        subtitle: "Solution IA complète",
        price: "Sur devis",
        features: [
            "Audit métier approfondi",
            "Architecture technique sur mesure",
            "Développement des agents IA",
            "Intégrations CRM/CMS/email",
            "Formation de votre équipe",
            "30 jours de SAV inclus"
        ],
        cta: "Obtenir un devis",
        ctaLink: "/contact",
        popular: true,
        variant: "primary" as const
    },
    {
        name: "Accompagnement mensuel",
        subtitle: "Maintenance + évolution",
        price: "Sur devis",
        features: [
            "Monitoring des agents IA",
            "Optimisation continue des prompts",
            "Ajout de nouvelles fonctionnalités",
            "Support prioritaire sous 4h",
            "Reporting mensuel de performance"
        ],
        cta: "Discuter du projet",
        ctaLink: "/contact",
        popular: false,
        variant: "outline" as const
    }
];

// ══════════════════════════════════════════════════════════════
// COMPOSANT
// ══════════════════════════════════════════════════════════════

export default function ConsultantIAClient() {
    return (
        <main className="bg-white">
            {/* ─── Hero ─── */}
            <section className="bg-ink text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-emerald-400 font-medium mb-4 text-sm uppercase tracking-wider">
                                Consultant IA · Automatisation · Agents LLM
                            </p>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Automatisez votre entreprise avec{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">
                                    l'intelligence artificielle
                                </span>
                            </h1>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                                En tant que <strong>consultante IA</strong>, j'audite vos tâches répétitives et je crée des <strong>agents IA sur mesure</strong> qui travaillent pour vous 24h/24. Vous gardez la propriété totale de vos outils et de vos données.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Link href="/contact">
                                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Audit IA gratuit
                                    </Button>
                                </Link>
                                <a href="tel:0661139748">
                                    <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Parler à un expert
                                    </Button>
                                </a>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-soft-light">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Agents Claude / GPT-4
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Workflows n8n / Make
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Formation équipe incluse
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    SAV garanti
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
                        <strong>En 2025, 72 % des entreprises utilisent déjà l'IA.</strong>{" "}
                        <span className="text-amber-800">
                            Celles qui n'automatisent pas perdent en compétitivité chaque jour.
                        </span>{" "}
                        <Link href="/contact" className="text-amber-900 font-semibold underline hover:text-amber-700">
                            Demandez votre audit gratuit →
                        </Link>
                    </p>
                </div>
            </motion.section>

            {/* ─── Stats ─── */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            L'IA n'est plus une option, c'est une <span className="text-emerald-600">nécessité</span>
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Les chiffres montrent que les entreprises qui intègrent l'IA surpassent leurs concurrents dans tous les domaines.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-ink mb-2 font-heading">
                                    {stat.value}
                                </div>
                                <p className="text-soft text-sm mb-3">{stat.label}</p>
                                <p className="text-xs text-soft/60 italic">{stat.source}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Définition ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-8 text-center">
                            Qu'est-ce qu'un <span className="text-emerald-600">consultant IA</span> ?
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft">
                            <p className="text-xl leading-relaxed mb-6">
                                Un <strong>consultant IA</strong> est un expert qui aide les entreprises à intégrer l'intelligence artificielle dans leurs processus métiers. Mon rôle : <strong>identifier vos tâches répétitives</strong>, concevoir des agents IA sur mesure, et former vos équipes pour qu'elles deviennent autonomes.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Concrètement, j'utilise les <strong>meilleurs LLMs du marché</strong> (Claude d'Anthropic, GPT-4 d'OpenAI, Mistral) pour créer des outils qui automatisent ce qui vous fait perdre du temps : saisie de données, tri d'emails, génération de devis, service client de niveau 1, reporting…
                            </p>
                            <p className="leading-relaxed mb-6">
                                En tant que <Link href="/consultant-seo" className="text-sauge hover:underline font-medium">consultante SEO</Link> et experte en <Link href="/consultant-geo" className="text-sauge hover:underline font-medium">optimisation GEO</Link>, j'ai une double compétence rare : je sais comment l'IA fonctionne en interne <em>et</em> comment elle référence les sites en externe. Cette vision 360° me permet de créer des solutions qui non seulement automatisent vos tâches, mais améliorent aussi votre <Link href="/referencement-naturel" className="text-sauge hover:underline font-medium">visibilité en ligne</Link>.
                            </p>
                            <p className="leading-relaxed">
                                Ma philosophie : <strong>zéro dépendance</strong>. Vous êtes propriétaire de vos outils, de vos données et de vos workflows. Pas d'abonnement piège, pas de boîte noire.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Cas d'usage ─── */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Ce que l'IA peut faire pour <span className="text-emerald-400">votre entreprise</span>
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Voici les cas d'usage les plus demandés par mes clients. Chaque solution est créée sur mesure pour votre contexte.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {USE_CASES.map((useCase, index) => (
                            <motion.div
                                key={useCase.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-emerald-400/30 transition-all group"
                            >
                                <div className={`w-14 h-14 ${useCase.color} rounded-xl flex items-center justify-center mb-6`}>
                                    <useCase.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3">
                                    {useCase.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed mb-4">
                                    {useCase.description}
                                </p>
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    {useCase.result}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Méthodologie ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Ma méthodologie en 5 étapes
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Une approche rigoureuse, de l'audit gratuit au SAV continu, pour garantir le succès de votre projet IA.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {METHODOLOGY.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                <div className={`flex-shrink-0 w-14 h-14 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-xl font-heading`}>
                                    {step.step}
                                </div>
                                <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="text-lg font-heading font-bold text-ink">
                                            {step.title}
                                        </h3>
                                        <span className="text-xs bg-gray-200 text-soft px-3 py-1 rounded-full">
                                            {step.duration}
                                        </span>
                                    </div>
                                    <p className="text-soft leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SEO vs GEO vs IA ─── */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            SEO, GEO, IA : quelle différence ?
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Trois expertises complémentaires pour une stratégie digitale complète. Je les propose toutes les trois.
                        </p>
                    </motion.div>

                    <div className="overflow-x-auto max-w-5xl mx-auto">
                        <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <thead>
                                <tr className="bg-ink text-white">
                                    <th className="text-left p-4 font-heading">Critère</th>
                                    <th className="text-center p-4 font-heading">
                                        <Link href="/consultant-seo" className="hover:text-sauge-light transition-colors">
                                            Consultant SEO
                                        </Link>
                                    </th>
                                    <th className="text-center p-4 font-heading">
                                        <Link href="/consultant-geo" className="hover:text-emerald-400 transition-colors">
                                            Consultant GEO
                                        </Link>
                                    </th>
                                    <th className="text-center p-4 font-heading bg-emerald-600">
                                        Consultant IA
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-4 font-medium text-ink">Objectif</td>
                                    <td className="p-4 text-center text-soft text-sm">Ranker sur Google</td>
                                    <td className="p-4 text-center text-soft text-sm">Être cité par les IA</td>
                                    <td className="p-4 text-center text-soft text-sm bg-emerald-50 font-medium">Automatiser vos processus</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-ink">Cible</td>
                                    <td className="p-4 text-center text-soft text-sm">Moteurs de recherche</td>
                                    <td className="p-4 text-center text-soft text-sm">ChatGPT, Perplexity, Gemini</td>
                                    <td className="p-4 text-center text-soft text-sm bg-emerald-50 font-medium">Vos équipes internes</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-ink">Résultat</td>
                                    <td className="p-4 text-center text-soft text-sm">Plus de trafic organique</td>
                                    <td className="p-4 text-center text-soft text-sm">Plus de citations IA</td>
                                    <td className="p-4 text-center text-soft text-sm bg-emerald-50 font-medium">Plus de productivité</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-ink">Délai</td>
                                    <td className="p-4 text-center text-soft text-sm">3-6 mois</td>
                                    <td className="p-4 text-center text-soft text-sm">1-3 mois</td>
                                    <td className="p-4 text-center text-soft text-sm bg-emerald-50 font-medium">1-4 semaines</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-ink">ROI typique</td>
                                    <td className="p-4 text-center text-soft text-sm">x5 à 12 mois</td>
                                    <td className="p-4 text-center text-soft text-sm">x3 à 6 mois</td>
                                    <td className="p-4 text-center text-soft text-sm bg-emerald-50 font-medium">x3,5 à 3 mois</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-soft mb-4">
                            Besoin des trois ? Je propose des <strong>packs combinés SEO + GEO + IA</strong> pour une stratégie digitale complète.
                        </p>
                        <Link href="/contact">
                            <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-8 py-4">
                                Demander un pack combiné
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Avantages ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Pourquoi me choisir comme <span className="text-emerald-600">consultante IA</span> ?
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Une expertise technique réelle, pas du consulting PowerPoint.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {AVANTAGES.map((avantage, index) => (
                            <motion.div
                                key={avantage.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <avantage.icon className="w-8 h-8 text-emerald-600" />
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

            {/* ─── Tarifs ─── */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Tarifs consultant IA
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Des formules adaptées à chaque besoin. L'audit initial est toujours gratuit.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {TARIFS.map((tarif, index) => (
                            <motion.div
                                key={tarif.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-2xl relative ${
                                    tarif.popular
                                        ? "bg-ink text-white transform lg:scale-105 shadow-xl"
                                        : "bg-white border border-gray-200 hover:border-emerald-500 transition-all"
                                }`}
                            >
                                {tarif.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                        RECOMMANDÉ
                                    </div>
                                )}
                                <h3 className={`text-xl font-heading font-bold mb-2 ${!tarif.popular ? "text-ink" : ""}`}>
                                    {tarif.name}
                                </h3>
                                <p className={`text-sm mb-6 ${tarif.popular ? "text-white/70" : "text-soft"}`}>
                                    {tarif.subtitle}
                                </p>
                                <div className={`text-4xl font-bold mb-6 ${!tarif.popular ? "text-ink" : ""}`}>
                                    {tarif.price}
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {tarif.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tarif.popular ? "text-emerald-400" : "text-emerald-500"}`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={tarif.ctaLink}>
                                    <Button
                                        className={`w-full rounded-xl py-6 ${
                                            tarif.popular
                                                ? "bg-emerald-500 hover:bg-white hover:text-ink"
                                                : "border-2 border-ink text-ink hover:bg-ink hover:text-white"
                                        }`}
                                        variant={tarif.popular ? "default" : "outline"}
                                    >
                                        {tarif.cta}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Tout ce que vous devez savoir avant de faire appel à un consultant IA.
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

            {/* ─── Articles liés ─── */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">
                                    GEO : comment apparaître sur ChatGPT en 2026
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Le guide complet pour être cité par les intelligences artificielles.
                                </p>
                            </Link>
                            <Link href="/blog/checklist-seo-2026" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">
                                    Checklist SEO 2026
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Tous les critères SEO et GEO à vérifier pour votre site.
                                </p>
                            </Link>
                            <Link href="/blog/definition-seo-guide-complet" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">
                                    Qu'est-ce que le SEO ?
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Le guide complet pour comprendre le référencement naturel.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Outils gratuits ─── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Mes outils gratuits
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/outils/testeur-visibilite-ia" className="group flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Bot className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Testeur de visibilité IA</h3>
                                    <p className="text-xs text-soft">Êtes-vous cité par ChatGPT ?</p>
                                </div>
                            </Link>
                            <Link href="/outils/audit-seo-gratuit" className="group flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Target className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Audit SEO gratuit</h3>
                                    <p className="text-xs text-soft">Analysez votre site en 30s</p>
                                </div>
                            </Link>
                            <Link href="/outils/generateur-schema-json-ld" className="group flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
                                <Code className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-ink group-hover:text-emerald-600">Générateur Schema</h3>
                                    <p className="text-xs text-soft">Données structurées JSON-LD</p>
                                </div>
                            </Link>
                            <Link href="/outils/generateur-robots-txt" className="group flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-emerald-500 transition-all">
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
                            Prêt à automatiser votre entreprise ?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                            L'audit initial est gratuit. Découvrez combien de temps et d'argent vous pouvez gagner grâce à l'IA.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link href="/contact">
                                <Button className="bg-emerald-500 hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Audit IA gratuit
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
                                Audit gratuit sans engagement
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </span>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6">
                            <Link href="/consultant-geo" className="text-soft-light hover:text-emerald-400 transition-colors text-sm">
                                Voir aussi : <span className="underline">Consultant GEO</span> →
                            </Link>
                            <Link href="/consultant-seo" className="text-soft-light hover:text-sauge-light transition-colors text-sm">
                                Voir aussi : <span className="underline">Consultant SEO</span> →
                            </Link>
                            <Link href="/outils" className="text-soft-light hover:text-white transition-colors text-sm">
                                Testez mes <span className="underline">outils SEO gratuits</span> →
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

            {/* ─── Schema.org Service ─── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Consultant Intelligence Artificielle",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "jobTitle": "Consultante IA & SEO",
                            "url": "https://indhack.com",
                            "sameAs": [
                                "https://www.linkedin.com/in/indianaaflalo"
                            ]
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "France"
                        },
                        "description": "Services de consultant IA : audit des tâches répétitives, création d'agents LLM sur mesure (Claude, ChatGPT), automatisation des processus métiers, formation au prompt engineering et SAV continu.",
                        "offers": {
                            "@type": "AggregateOffer",
                            "lowPrice": "0",
                            "highPrice": "10000",
                            "priceCurrency": "EUR",
                            "offerCount": "3"
                        }
                    })
                }}
            />

            <HomepageBacklink variant="default" />
        </main>
    );
}
