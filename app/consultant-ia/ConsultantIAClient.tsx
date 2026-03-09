"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Bot,
    Cpu,
    Zap,
    Network,
    Shield,
    Workflow,
    Code,
    Database,
    ArrowRight,
    CheckCircle2,
    MessageSquareText,
    TrendingUp,
    Phone
} from "lucide-react";

export default function ConsultantIAClient() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="bg-ink text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl max-auto text-center mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
                                <Bot className="w-4 h-4 text-emerald-400" />
                                <span className="text-white text-sm font-medium">Département IA & Automatisation</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                                Transformez votre entreprise avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">l'Intelligence Artificielle</span>
                            </h1>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                                Ne subissez plus la révolution technologique. Nous intégrons les LLMs (Claude, ChatGPT) directement dans vos processus métiers pour automatiser vos tâches répétitives et doper votre croissance.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Link href="/contact">
                                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                                        Audit Data/IA Gratuit
                                    </Button>
                                </Link>
                                <a href="tel:0661139748">
                                    <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg">
                                        Parler à un expert
                                    </Button>
                                </a>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-soft-light">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Agents Claude / OpenAI
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Workflows n8n / Make
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    Formation équipe
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pourquoi l'IA */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-ink mb-6">
                                Fini le temps perdu sur des <span className="text-emerald-600">tâches chronophages</span>
                            </h2>
                            <p className="text-lg text-soft mb-8 leading-relaxed">
                                Les TPE et PME perdent en moyenne 35% de leur temps sur la saisie de données, le tri d'emails, la génération de devis ou le service client de niveau 1. Nos agents IA prennent le relais avec une fiabilité de 99%, 24h/24.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Réduction de 80% du temps de traitement sur les tâches administratives",
                                    "Rédaction automatisée SEO grâce à des flux RAG sécurisés",
                                    "Agents vocaux ou chatbots intelligents sur votre site",
                                    "Zéro dépendance, propriété totale de vos workflows"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-ink font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
                                <Workflow className="w-10 h-10 text-purple-500 mb-4" />
                                <h3 className="font-bold text-ink text-xl mb-2">Automatisation</h3>
                                <p className="text-soft text-sm">Synchronisation des données entre CRM, CMS et boîtes mails sans code.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sm:-mt-8">
                                <Database className="w-10 h-10 text-emerald-500 mb-4" />
                                <h3 className="font-bold text-ink text-xl mb-2">Bases de Connaissance (RAG)</h3>
                                <p className="text-soft text-sm">Votre propre "ChatGPT" nourri exclusivement aux PDF et process de votre entreprise.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <MessageSquareText className="w-10 h-10 text-blue-500 mb-4" />
                                <h3 className="font-bold text-ink text-xl mb-2">Service Client</h3>
                                <p className="text-soft text-sm">Support Niveau 1 géré par IA, capable de consulter vos stocks ou FAQs.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <Cpu className="w-10 h-10 text-orange-500 mb-4" />
                                <h3 className="font-bold text-ink text-xl mb-2">Data Scraping</h3>
                                <p className="text-soft text-sm">Extraction intelligente de données web et analyse concurrentielle de masse.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Méthodologie */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-ink mb-6">
                            Notre méthodologie d'Intégration
                        </h2>
                        <p className="text-lg text-soft">
                            Une approche technique rigoureuse, étape par étape, pour garantir le succès de la transition IA dans vos équipes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block" />

                        <div className="relative bg-white pt-8 z-10 text-center">
                            <div className="w-16 h-16 mx-auto bg-ink text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_0_8px_white]">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-3">Audit Métier</h3>
                            <p className="text-soft">Identification des goulots d'étranglement qui peuvent être remplacés ou assistés par l'IA générative.</p>
                        </div>

                        <div className="relative bg-white pt-8 z-10 text-center">
                            <div className="w-16 h-16 mx-auto bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_0_8px_white]">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-3">Création des Pipelines</h3>
                            <p className="text-soft">Développement des agents via API (Anthropic, OpenAI) et architecture des flux automatisés locaux ou cloud.</p>
                        </div>

                        <div className="relative bg-white pt-8 z-10 text-center">
                            <div className="w-16 h-16 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_0_8px_white]">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-3">Déploiement & Formation</h3>
                            <p className="text-soft">Mise en production interne. Formation des employés au Prompt Engineering et à la supervision des agents.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-ink text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">Passez à la vitesse supérieure.</h2>
                    <p className="text-xl text-white/70 mb-10">L'IA n'est plus gadget. C'est l'avantage compétitif déloyal de 2026. Prenez rendez-vous pour un audit gratuit de vos process.</p>

                    <Link href="/contact">
                        <Button className="bg-white text-ink hover:bg-emerald-400 hover:text-white px-8 py-6 rounded-xl text-lg font-bold transition-all w-full sm:w-auto">
                            Discuter de l'intégration IA
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
