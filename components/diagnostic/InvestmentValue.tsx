'use client'

import { motion } from 'framer-motion'
import {
    TrendingUp, Banknote, Clock, Target, Zap, Building2,
    ArrowRight, CheckCircle2, XCircle, Sparkles, Globe,
    Search, MapPin, Brain
} from 'lucide-react'
import { useState } from 'react'

interface InvestmentValueProps {
    metier: string
    ville: string
}

export default function InvestmentValue({ metier, ville }: InvestmentValueProps) {
    const [activeTab, setActiveTab] = useState<'seo' | 'geo' | 'ia'>('seo')

    // Calcul ROI sur 3 ans
    const siteInvestment = 1490
    const monthlyFee = 150
    const year1Total = siteInvestment + (monthlyFee * 12)
    const year2Total = monthlyFee * 12
    const year3Total = monthlyFee * 12

    const avgLeadsPerMonth = 15
    const avgConversion = 0.20
    const avgTicket = 200
    const monthlyRevenue = avgLeadsPerMonth * avgConversion * avgTicket

    return (
        <section className="py-24 px-6 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900">
            <div className="max-w-5xl mx-auto">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_50%)]" />

                <div className="relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium text-sm">Pourquoi c'est un INVESTISSEMENT, pas une dépense</span>
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Votre site travaille pour vous<br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                24h/24, 365 jours/an
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Contrairement à la pub qui s'arrête quand vous arrêtez de payer, votre présence web est un <strong className="text-white">actif digital</strong> qui prend de la valeur avec le temps.
                        </p>
                    </motion.div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-2 mb-8">
                        {[
                            { id: 'seo', label: 'SEO', icon: <Search className="w-4 h-4" /> },
                            { id: 'geo', label: 'GEO (Google Maps)', icon: <MapPin className="w-4 h-4" /> },
                            { id: 'ia', label: 'IA & Futur', icon: <Brain className="w-4 h-4" /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'seo' | 'geo' | 'ia')}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-white text-gray-900'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Publicité */}
                                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                            <Banknote className="w-5 h-5 text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Publicité (Google Ads)</h4>
                                            <p className="text-red-400 text-sm">Dépense récurrente</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            "Vous payez CHAQUE clic (2-10€/clic)",
                                            "Dès que vous arrêtez → 0 trafic",
                                            "Les enchères augmentent chaque année",
                                            "Aucune valeur résiduelle"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 p-4 bg-red-500/20 rounded-xl">
                                        <p className="text-red-300 text-sm">
                                            <strong>En 3 ans :</strong> 500€/mois = <span className="text-red-400 font-bold">18 000€</span> dépensés
                                            <br />→ Valeur à la fin : <span className="text-red-400 font-bold">0€</span>
                                        </p>
                                    </div>
                                </div>

                                {/* SEO */}
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Référencement (SEO)</h4>
                                            <p className="text-emerald-400 text-sm">Investissement durable</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            "Trafic GRATUIT illimité",
                                            "Effet boule de neige (croissance composée)",
                                            "Vous êtes PROPRIÉTAIRE des positions",
                                            "Valeur qui augmente avec le temps"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 p-4 bg-emerald-500/20 rounded-xl">
                                        <p className="text-emerald-300 text-sm">
                                            <strong>En 3 ans :</strong> Investissement = <span className="text-emerald-400 font-bold">~5 000€</span>
                                            <br />→ Valeur : <span className="text-emerald-400 font-bold">Actif qui génère du CA</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ROI Timeline */}
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    Évolution de votre ROI sur 3 ans
                                </h4>
                                <div className="space-y-4">
                                    {[
                                        { year: "Année 1", investment: year1Total, revenue: monthlyRevenue * 6, note: "Montée en puissance" },
                                        { year: "Année 2", investment: year2Total, revenue: monthlyRevenue * 12, note: "Croissance exponentielle" },
                                        { year: "Année 3", investment: year3Total, revenue: monthlyRevenue * 12 * 1.5, note: "Domination locale" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-24 text-sm text-gray-400">{item.year}</div>
                                            <div className="flex-1 h-8 bg-gray-800 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${Math.min((item.revenue / 10000) * 100, 100)}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.2, duration: 0.8 }}
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                                                />
                                            </div>
                                            <div className="w-20 text-sm text-white font-bold">+{item.revenue.toLocaleString()}€</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* GEO Tab */}
                    {activeTab === 'geo' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <h4 className="text-2xl font-bold text-white mb-4">
                                    GEO = <span className="text-blue-400">Google Maps</span> + <span className="text-green-400">Fiche Établissement</span>
                                </h4>
                                <p className="text-gray-400">
                                    82% des recherches locales mènent à une visite ou un appel <strong className="text-white">dans les 24h</strong>
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { icon: <MapPin className="w-8 h-8" />, title: "Top 3 Maps", value: "70%", desc: "des clics vont aux 3 premiers" },
                                    { icon: <Target className="w-8 h-8" />, title: "Recherches locales", value: "46%", desc: "de toutes les recherches Google" },
                                    { icon: <Building2 className="w-8 h-8" />, title: "Conversion", value: "28%", desc: "achètent le même jour" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                                            {item.icon}
                                        </div>
                                        <p className="text-4xl font-bold text-white mb-2">{item.value}</p>
                                        <h5 className="font-bold text-gray-300 mb-2">{item.title}</h5>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <Globe className="w-10 h-10 text-blue-400 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-white font-bold mb-2">Pourquoi le GEO est crucial à {ville}</h4>
                                        <p className="text-gray-300 text-sm">
                                            Quand quelqu'un cherche "{metier} {ville}" sur son téléphone, il a <strong className="text-white">besoin de vous MAINTENANT</strong>.
                                            Si vous n'êtes pas dans le top 3, il ira chez votre concurrent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* IA Tab */}
                    {activeTab === 'ia' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                        <Brain className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">L'IA change tout. Mais elle a BESOIN de votre contenu.</h4>
                                        <p className="text-gray-400">ChatGPT, Perplexity, Google AI - D'où tirent-ils leurs réponses ?</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <p className="text-gray-300">
                                        Quand quelqu'un demande à une IA : <em className="text-purple-300">"Quel est le meilleur {metier} à {ville} ?"</em>
                                    </p>
                                    <p className="text-gray-300">
                                        L'IA cherche sur... <strong className="text-white">les sites web existants</strong>.
                                    </p>
                                    <p className="text-purple-400 font-bold">
                                        Pas de site = Pas de mention = Invisible pour l'IA
                                    </p>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
                                    <p className="text-sm text-gray-400 mb-2">Exemple de réponse IA dans 2 ans :</p>
                                    <p className="text-white font-mono text-sm">
                                        "Pour un {metier} à {ville}, je recommande <span className="text-emerald-400">[VOTRE NOM]</span> qui a d'excellents avis..."
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <Zap className="w-8 h-8 text-amber-400 mb-4" />
                                    <h5 className="text-white font-bold mb-2">Préparez-vous maintenant</h5>
                                    <p className="text-gray-400 text-sm">
                                        Les entreprises qui investissent aujourd'hui seront recommandées par l'IA demain.
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <Globe className="w-8 h-8 text-blue-400 mb-4" />
                                    <h5 className="text-white font-bold mb-2">Contenu = Carburant</h5>
                                    <p className="text-gray-400 text-sm">
                                        Chaque article, chaque page nourrit les algorithmes en votre faveur.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gray-400 mb-4">
                            Ne voyez pas ça comme une dépense. <strong className="text-white">C'est un actif qui prend de la valeur.</strong>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
