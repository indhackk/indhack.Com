"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Zap, Star, MessageSquare, TrendingUp, CheckCircle2, ArrowRight,
    Play, Shield, Clock, BarChart3, Sparkles, Bot, Target, Award
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Dashboard } from "@/components/gmb-autopilot/Dashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/gmb/mock-data";

export default function GMBAutoPilotClient() {
    const [showDemo, setShowDemo] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    if (showDemo) {
        return (
            <div className="relative">
                {/* Exit Demo Button */}
                <button
                    onClick={() => setShowDemo(false)}
                    className="fixed top-4 left-4 z-50 px-4 py-2 bg-ink text-white rounded-full text-sm font-medium hover:bg-ink/90 transition-colors shadow-lg"
                >
                    ← Quitter la démo
                </button>
                <Dashboard />
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "GMB AutoPilot",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "29",
                            "priceCurrency": "EUR",
                            "priceValidUntil": "2026-12-31"
                        },
                        "description": "Outil SaaS de réponse automatique aux avis Google My Business avec intégration de mots-clés SEO.",
                        "provider": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com"
                        }
                    })
                }}
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-ink via-ink to-ink/95 text-white">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sauge/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sauge/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 rounded-full text-white text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            Nouveau : Propulsé par l'IA
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
                        >
                            Répondez à <span className="text-sauge">tous vos avis</span>
                            <br />en un clic
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
                        >
                            L'IA répond automatiquement aux avis de votre fiche Google avec des mots-clés SEO intégrés.
                            <strong className="text-white"> Boostez votre référencement local sans effort.</strong>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                onClick={() => setShowDemo(true)}
                                className="bg-sauge hover:bg-sauge/90 text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl shadow-sauge/30"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Tester gratuitement
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                            >
                                Voir la démo
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-8 mt-12 text-white/40 text-sm"
                        >
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Sans engagement
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Setup en 5 min
                            </span>
                            <span className="flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                4.9/5 satisfaction
                            </span>
                        </motion.div>
                    </div>

                    {/* Hero Image/Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 max-w-5xl mx-auto"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 p-6 lg:p-10">
                                {/* Mock Dashboard Preview */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {[
                                        { label: "Avis en attente", value: "13", color: "bg-amber-500/20 text-amber-400" },
                                        { label: "Réponses ce mois", value: "47", color: "bg-green-500/20 text-green-400" },
                                        { label: "Note moyenne", value: "4.8", color: "bg-yellow-500/20 text-yellow-400" },
                                        { label: "SEO Boost", value: "+23%", color: "bg-sauge/20 text-white" }
                                    ].map((stat, i) => (
                                        <div key={i} className={`${stat.color} rounded-xl p-4`}>
                                            <p className="text-xs text-white/60 mb-1">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sauge to-sauge/60" />
                                        <div>
                                            <p className="text-white font-medium">Marie D.</p>
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="ml-auto px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                                            En attente
                                        </span>
                                    </div>
                                    <p className="text-white/70 text-sm mb-4">
                                        "Excellent service, très professionnel ! Je recommande vivement."
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 bg-sauge rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Générer réponse IA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Problem / Solution */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Problem */}
                            <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
                                <h3 className="text-xl font-bold text-red-700 mb-4">Sans GMB AutoPilot</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Avis ignorés = Perte de confiance",
                                        "Réponses génériques sans impact SEO",
                                        "2h/jour perdues à gérer les avis",
                                        "Opportunités de mots-clés manquées",
                                        "Note Google qui stagne"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-red-800">
                                            <span className="text-red-400">✕</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Solution */}
                            <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                                <h3 className="text-xl font-bold text-green-700 mb-4">Avec GMB AutoPilot</h3>
                                <ul className="space-y-3">
                                    {[
                                        "100% des avis reçoivent une réponse",
                                        "Mots-clés SEO intégrés naturellement",
                                        "Automatisation complète en 5 min",
                                        "Boost du référencement local",
                                        "Note et engagement en hausse"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-green-800">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-widest uppercase mb-4 text-sm">Fonctionnalités</p>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-4">
                            Tout ce dont vous avez <span className="text-sauge">besoin</span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Un outil complet pour transformer vos avis en machine de référencement local
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <Bot className="w-8 h-8" />,
                                title: "IA Intelligente",
                                desc: "L'IA génère des réponses personnalisées en analysant le contenu et le sentiment de chaque avis."
                            },
                            {
                                icon: <Target className="w-8 h-8" />,
                                title: "Mots-clés SEO",
                                desc: "Intégrez automatiquement vos mots-clés stratégiques dans chaque réponse pour booster le référencement."
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Auto-Pilote",
                                desc: "Activez les réponses automatiques et laissez l'IA gérer vos avis 24/7 selon vos paramètres."
                            },
                            {
                                icon: <MessageSquare className="w-8 h-8" />,
                                title: "Multi-Fiches",
                                desc: "Gérez toutes vos fiches Google depuis un seul dashboard. Idéal pour les agences."
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8" />,
                                title: "Analytics",
                                desc: "Suivez l'évolution de vos notes, le volume d'avis et l'impact sur votre référencement."
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: "Tonalité Custom",
                                desc: "Choisissez le ton de vos réponses : professionnel, amical ou enthousiaste selon votre marque."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group"
                            >
                                <div className="mb-6 p-4 bg-sauge/10 rounded-2xl w-fit text-white group-hover:bg-sauge group-hover:text-white transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-3">{feature.title}</h3>
                                <p className="text-gray-500">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 bg-white" id="pricing">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-widest uppercase mb-4 text-sm">Tarifs</p>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-4">
                            Simple et <span className="text-sauge">transparent</span>
                        </h2>
                        <p className="text-xl text-gray-500">
                            Commencez gratuitement, évoluez selon vos besoins
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {SUBSCRIPTION_PLANS.map((plan, i) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative bg-white rounded-3xl p-8 ${plan.popular
                                    ? 'border-2 border-sauge shadow-xl shadow-sauge/10 scale-105'
                                    : 'border border-gray-200'
                                    }`}
                            >
                                {plan.popular && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-sauge text-white text-sm font-bold rounded-full">
                                        Recommandé
                                    </span>
                                )}

                                <h3 className="text-2xl font-bold text-ink mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-5xl font-bold text-ink">{plan.price}€</span>
                                    <span className="text-gray-500">/mois</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-gray-600">
                                            <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => setShowDemo(true)}
                                    className={`w-full rounded-xl py-6 text-lg font-bold ${plan.popular
                                        ? 'bg-sauge hover:bg-sauge/90 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-ink'
                                        }`}
                                >
                                    {plan.price === 0 ? 'Commencer gratuitement' : 'Essayer 14 jours gratuit'}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center text-gray-500 mt-8">
                        Tous les plans incluent un essai gratuit de 14 jours. Annulation possible à tout moment.
                    </p>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 bg-ink text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-widest uppercase mb-4 text-sm">Comment ça marche</p>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            3 étapes pour <span className="text-sauge">automatiser</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Connectez votre fiche",
                                desc: "Liez votre compte Google My Business en quelques clics. Connexion sécurisée via OAuth."
                            },
                            {
                                step: "02",
                                title: "Configurez vos préférences",
                                desc: "Définissez vos mots-clés SEO, le ton des réponses et activez l'auto-pilote."
                            },
                            {
                                step: "03",
                                title: "L'IA fait le reste",
                                desc: "Validez les réponses générées ou laissez l'automatisation prendre le relai."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative"
                            >
                                <span className="text-7xl font-bold text-sauge/20 absolute -top-6 left-0">
                                    {item.step}
                                </span>
                                <div className="pt-12">
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-white/60">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                q: "Est-ce que ça fonctionne avec toutes les fiches Google ?",
                                a: "Oui, GMB AutoPilot fonctionne avec toutes les fiches Google My Business, quelle que soit votre activité : restaurant, garage, commerce, cabinet médical, etc."
                            },
                            {
                                q: "Les réponses sont-elles vraiment personnalisées ?",
                                a: "Absolument ! L'IA analyse le contenu et le sentiment de chaque avis pour générer une réponse unique et pertinente. Vous pouvez toujours modifier avant publication."
                            },
                            {
                                q: "Comment les mots-clés SEO sont-ils intégrés ?",
                                a: "L'IA intègre naturellement vos mots-clés dans les réponses sans que cela paraisse forcé. C'est une technique éprouvée pour améliorer le référencement local."
                            },
                            {
                                q: "Puis-je annuler à tout moment ?",
                                a: "Oui, aucun engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre espace client."
                            },
                            {
                                q: "Y a-t-il une limite de réponses ?",
                                a: "Le plan gratuit est limité à 10 réponses/mois. Les plans Pro et Agence sont illimités."
                            }
                        ].map((faq, i) => (
                            <details
                                key={i}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden group"
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-ink">
                                    {faq.q}
                                    <span className="text-sauge group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600">
                                    <ReactMarkdown>{faq.a}</ReactMarkdown>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                    <div className="bg-gradient-to-br from-ink via-ink to-ink/90 p-12 md:p-20 rounded-[3rem] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sauge/20 rounded-full blur-[100px]" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                                Prêt à <span className="text-sauge">automatiser</span> vos avis ?
                            </h2>
                            <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
                                Rejoignez les entreprises qui boostent leur référencement local avec GMB AutoPilot.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    onClick={() => setShowDemo(true)}
                                    className="bg-sauge hover:bg-sauge/90 text-white rounded-full px-10 py-7 text-xl font-bold shadow-xl shadow-sauge/30"
                                >
                                    Démarrer maintenant
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                            <p className="text-white/40 text-sm mt-6">
                                14 jours gratuit • Sans engagement • Setup en 5 min
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Back to main site */}
            <section className="py-12 bg-gray-50 text-center">
                <Link
                    href="/"
                    className="text-sauge hover:text-ink transition-colors font-medium"
                >
                    ← Retour à indhack.com
                </Link>
            </section>
        </main>
    );
}
