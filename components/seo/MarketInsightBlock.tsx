"use client";

import { motion } from "framer-motion";
import { Crown, Cpu, Building2, Compass, TrendingUp, Sparkles, Globe, Rocket, Users, Star, Palmtree } from "lucide-react";
import Link from "next/link";
import type { CityContext } from "@/lib/cities-data";

interface MarketInsightBlockProps {
    marketType: CityContext["marketType"];
    cityName: string;
    targetClients: string;
    variant?: "default" | "indhack";
}

/**
 * Composant de différenciation structurelle pour les pages villes (anti-Doorway Pages)
 * Génère des structures DOM distinctes selon le type de marché → patterns HTML uniques
 */
export function MarketInsightBlock({ marketType, cityName, targetClients, variant = "default" }: MarketInsightBlockProps) {
    if (variant === "indhack") {
        return (
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="py-12 bg-fond-clair"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto rounded-[1.5rem] border border-line bg-white p-6 md:p-8 shadow-sm">
                        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-sauge/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sauge">
                                    <Building2 className="h-3.5 w-3.5" />
                                    Marché local exigeant
                                </div>
                                <h3 className="mt-4 font-heading text-2xl font-bold text-ink md:text-3xl">
                                    À {cityName}, le SEO local se joue quartier par quartier
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-soft md:text-base">
                                    Pour {targetClients}, la visibilité ne dépend pas seulement d'un mot-clé générique.
                                    Elle se construit avec une lecture précise des zones de demande, des intentions de recherche
                                    et des pages capables de répondre clairement à chaque besoin local.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Prioriser",
                                        desc: "Les quartiers, services et intentions qui peuvent générer des demandes qualifiées.",
                                        icon: <Compass className="h-5 w-5" />,
                                    },
                                    {
                                        title: "Structurer",
                                        desc: "Des pages lisibles par Google, utiles pour l'utilisateur et reliées au bon cocon SEO.",
                                        icon: <Sparkles className="h-5 w-5" />,
                                    },
                                    {
                                        title: "Mesurer",
                                        desc: "Les impressions, positions, appels et formulaires pour corriger ce qui bloque vraiment.",
                                        icon: <TrendingUp className="h-5 w-5" />,
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-line bg-fond-clair p-5">
                                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sauge/10 text-sauge">
                                            {item.icon}
                                        </div>
                                        <p className="font-bold text-ink">{item.title}</p>
                                        <p className="mt-2 text-xs leading-relaxed text-soft">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    }

    // LUXURY : Structure prestige avec badge doré et citation design
    if (marketType === "luxury") {
        return (
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="py-10 bg-gradient-to-br from-amber-50 via-white to-amber-50/30"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative bg-white border border-amber-200/50 rounded-2xl p-8 shadow-lg">
                            {/* Badge Premium */}
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                                <Crown className="w-3.5 h-3.5" />
                                Marché Premium
                            </div>

                            <div className="mt-4 grid md:grid-cols-5 gap-6 items-center">
                                <div className="md:col-span-3">
                                    <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                        SEO haut de gamme à {cityName}
                                    </h3>
                                    <p className="text-soft text-sm leading-relaxed mb-4">
                                        Sur un marché où chaque client représente un panier moyen élevé,
                                        le SEO ne tolère pas l'approximation. Vos prospects recherchent
                                        l'excellence — votre présence digitale doit la refléter.
                                    </p>
                                    <blockquote className="border-l-4 border-amber-400 pl-4 italic text-ink/80 text-sm">
                                        "Une stratégie SEO premium pour {targetClients} :
                                        positionnement de marque, contenu éditorial soigné,
                                        expérience utilisateur irréprochable."
                                    </blockquote>
                                </div>
                                <div className="md:col-span-2 flex justify-center">
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        <div className="bg-amber-50 rounded-xl p-4">
                                            <Globe className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-ink">Multilingue</p>
                                            <p className="text-[10px] text-soft">FR/EN/IT</p>
                                        </div>
                                        <div className="bg-amber-50 rounded-xl p-4">
                                            <Star className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-ink">E-réputation</p>
                                            <p className="text-[10px] text-soft">Gestion avis</p>
                                        </div>
                                        <div className="bg-amber-50 rounded-xl p-4">
                                            <Crown className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-ink">Branding</p>
                                            <p className="text-[10px] text-soft">Image premium</p>
                                        </div>
                                        <div className="bg-amber-50 rounded-xl p-4">
                                            <TrendingUp className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-ink">ROI élevé</p>
                                            <p className="text-[10px] text-soft">Clients qualifiés</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    }

    // TECH : Structure startup avec metrics et focus scalabilité
    if (marketType === "tech") {
        return (
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="py-10 bg-gradient-to-br from-violet-50 via-white to-indigo-50/30"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border border-violet-200/50 rounded-2xl overflow-hidden shadow-lg">
                            {/* Header Tech */}
                            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Cpu className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">SEO Tech & Startups</h3>
                                        <p className="text-white/70 text-xs">{cityName} — Écosystème innovation</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">SaaS</span>
                                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">B2B</span>
                                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Scale</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-violet-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-violet-600">6-12</p>
                                        <p className="text-xs text-soft">mois cycle vente B2B</p>
                                    </div>
                                    <div className="bg-violet-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-violet-600">x10</p>
                                        <p className="text-xs text-soft">valeur lead qualifié</p>
                                    </div>
                                    <div className="bg-violet-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-violet-600">LTV</p>
                                        <p className="text-xs text-soft">focus long terme</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-ink flex items-center gap-2">
                                        <Rocket className="w-4 h-4 text-violet-600" />
                                        Stratégie SEO scalable pour {targetClients}
                                    </h4>
                                    <p className="text-soft text-sm">
                                        Content marketing technique, autorité thématique, SEO programmatique
                                        pour générer des leads qualifiés sur des cycles de vente longs.
                                        Architecture pensée pour la croissance.
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <span className="bg-gray-100 text-ink text-xs px-3 py-1.5 rounded-full font-medium">Core Web Vitals</span>
                                        <span className="bg-gray-100 text-ink text-xs px-3 py-1.5 rounded-full font-medium">Technical SEO</span>
                                        <span className="bg-gray-100 text-ink text-xs px-3 py-1.5 rounded-full font-medium">Content Strategy</span>
                                        <span className="bg-gray-100 text-ink text-xs px-3 py-1.5 rounded-full font-medium">Link Building B2B</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    }

    // PREMIUM (Tourisme mixte) : Structure saisonnalité avec timeline
    if (marketType === "premium") {
        return (
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="py-10 bg-gradient-to-br from-cyan-50 via-white to-teal-50/30"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border border-cyan-200/50 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Palmtree className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-heading font-bold text-ink">
                                        Double marché à {cityName}
                                    </h3>
                                    <p className="text-soft text-sm">
                                        Locaux + touristes : deux cibles, deux stratégies SEO
                                    </p>
                                </div>
                            </div>

                            {/* Timeline saisonnalité */}
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-ink mb-3">Cycle SEO saisonnier optimal</h4>
                                <div className="relative">
                                    <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                                    <div className="relative flex justify-between">
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-1 relative z-10 border-2 border-white">
                                                <span className="text-xs font-bold text-cyan-600">J</span>
                                            </div>
                                            <p className="text-[10px] text-soft">Préparation</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-1 relative z-10 border-2 border-white">
                                                <span className="text-xs font-bold text-cyan-700">M</span>
                                            </div>
                                            <p className="text-[10px] text-soft">Optimisation</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-1 relative z-10 border-2 border-white">
                                                <span className="text-xs font-bold text-white">J</span>
                                            </div>
                                            <p className="text-[10px] text-soft font-bold">Haute saison</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-1 relative z-10 border-2 border-white">
                                                <span className="text-xs font-bold text-cyan-700">S</span>
                                            </div>
                                            <p className="text-[10px] text-soft">Consolidation</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-1 relative z-10 border-2 border-white">
                                                <span className="text-xs font-bold text-cyan-600">D</span>
                                            </div>
                                            <p className="text-[10px] text-soft">Analyse</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-cyan-50 rounded-xl p-4">
                                    <h5 className="font-bold text-ink text-sm mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-cyan-600" />
                                        Cible Locale
                                    </h5>
                                    <p className="text-xs text-soft">
                                        Contenu FR, SEO local pérenne, fidélisation.
                                        {targetClients} à portée de clic toute l'année.
                                    </p>
                                </div>
                                <div className="bg-teal-50 rounded-xl p-4">
                                    <h5 className="font-bold text-ink text-sm mb-2 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-teal-600" />
                                        Cible Touriste
                                    </h5>
                                    <p className="text-xs text-soft">
                                        Pages EN/IT, requêtes saisonnières,
                                        optimisation mobile et recherche vocale.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    }

    // VOLUME (Grandes métropoles) : Structure compétition avec comparateur
    if (marketType === "volume") {
        return (
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="py-10 bg-gradient-to-br from-orange-50 via-white to-red-50/30"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border border-orange-200/50 rounded-2xl overflow-hidden shadow-lg">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-8 h-8 text-white" />
                                        <div>
                                            <h3 className="text-white font-bold">Marché métropolitain {cityName}</h3>
                                            <p className="text-white/70 text-xs">Concurrence intense — Volume élevé</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 rounded-lg px-3 py-1">
                                        <p className="text-white text-xs font-bold">High Volume</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-6">
                                    <h4 className="font-bold text-ink mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-orange-500" />
                                        Stratégie de différenciation pour {targetClients}
                                    </h4>
                                    <p className="text-soft text-sm mb-4">
                                        Sur un marché saturé, la clé est la spécialisation :
                                        niches sous-exploitées, quartiers spécifiques,
                                        services complémentaires. Volume de leads par l'exhaustivité.
                                    </p>
                                </div>

                                {/* Comparateur visuel */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-bold text-red-500 mb-2">Sans stratégie SEO</p>
                                            <ul className="space-y-1.5">
                                                <li className="text-xs text-soft flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                    Noyé dans la masse
                                                </li>
                                                <li className="text-xs text-soft flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                    Dépendance Google Ads
                                                </li>
                                                <li className="text-xs text-soft flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                    Coût d'acquisition élevé
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-green-600 mb-2">Avec IndHack</p>
                                            <ul className="space-y-1.5">
                                                <li className="text-xs text-soft flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    Niches identifiées et priorisées
                                                </li>
                                                <li className="text-xs text-soft flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    Trafic organique durable
                                                </li>
                                                <li className="text-xs text-soft flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    Budget mieux priorisé
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    }

    // LOCAL (Default) : Structure simplicité avec focus proximité
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="py-10 bg-gradient-to-br from-sauge/5 via-white to-sauge/10"
        >
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border border-sauge/20 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Compass className="w-6 h-6 text-sauge" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-heading font-bold text-ink mb-2">
                                    Votre partenaire SEO de proximité à {cityName}
                                </h3>
                                <p className="text-soft text-sm mb-4">
                                    Pour {targetClients}, le référencement local est le levier
                                    le plus rentable. Je connais votre marché, vos concurrents,
                                    les habitudes de recherche de vos clients potentiels.
                                </p>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center bg-sauge/5 rounded-lg p-3">
                                        <Sparkles className="w-5 h-5 text-sauge mx-auto mb-1" />
                                        <p className="text-xs font-bold text-ink">Expertise locale</p>
                                    </div>
                                    <div className="text-center bg-sauge/5 rounded-lg p-3">
                                        <Users className="w-5 h-5 text-sauge mx-auto mb-1" />
                                        <p className="text-xs font-bold text-ink">Accompagnement</p>
                                    </div>
                                    <div className="text-center bg-sauge/5 rounded-lg p-3">
                                        <TrendingUp className="w-5 h-5 text-sauge mx-auto mb-1" />
                                        <p className="text-xs font-bold text-ink">Résultats</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
