"use client";

import { motion } from "framer-motion";
import { Crown, Film, Building, Anchor, Calendar, TrendingUp, Globe, Star, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CannesContent() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Titre de section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-bold rounded-full mb-4">
                            Marché Luxe & Prestige
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            SEO à <span className="text-sauge">Cannes</span> :
                            <br />le référencement du marché premium
                        </h2>
                    </motion.div>

                    {/* Contexte Cannes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg max-w-none mb-12"
                    >
                        <p className="text-lg text-soft leading-relaxed">
                            <strong className="text-ink">À Cannes, chaque clic peut valoir plusieurs milliers d'euros.</strong> Avec
                            un prix immobilier moyen de <strong>15 000€/m²</strong> sur La Croisette, des yachts à plusieurs
                            millions d'euros au Port Canto, et le Festival de Cannes qui attire le monde entier,
                            le marché cannois est l'un des plus compétitifs de France.
                        </p>
                        <p className="text-soft">
                            Les agences parisiennes et internationales investissent massivement en Google Ads pour
                            capter ce marché premium. <strong>Le SEO est votre arme secrète</strong> : une visibilité
                            organique durable qui ne coûte pas 50€ par clic.
                        </p>
                        <p className="text-soft">
                            Mais le référencement à Cannes n'est pas un SEO classique. Vos clients recherchent en
                            <strong> anglais</strong>, en <strong>russe</strong>, en <strong>arabe</strong>. Ils veulent
                            du prestige, des garanties, de l'excellence. Votre positionnement Google doit refléter
                            cette exigence.
                        </p>
                    </motion.div>

                    {/* Festival de Cannes - Opportunité */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 mb-12 border border-amber-200"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                                <Film className="w-7 h-7 text-amber-800" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-ink mb-2">
                                    Le Festival de Cannes : 40% des recherches annuelles en 2 semaines
                                </h3>
                                <p className="text-soft">
                                    Chaque mai, le monde entier google "Cannes". Hôtels, restaurants, transferts VIP,
                                    location de villas, sécurité privée... <strong>Si vous n'êtes pas positionné avant
                                        le Festival, vous perdez la bataille de l'année.</strong>
                                </p>
                                <p className="text-soft mt-2">
                                    Ma stratégie : préparer votre visibilité 3 mois en amont pour être en pole position
                                    quand l'afflux arrive. Après le Festival, on capitalise sur l'autorité acquise.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secteurs clés Cannes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h3 className="text-xl font-bold text-ink mb-6 text-center">
                            Les secteurs premium que j'accompagne à Cannes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-5">
                            {[
                                {
                                    icon: <Building className="w-6 h-6" />,
                                    title: "Immobilier de prestige",
                                    desc: "Agences immobilières La Croisette, Californie, Super-Cannes. Villas pieds dans l'eau, penthouses vue mer.",
                                    keywords: "appartement vue mer Cannes, villa prestige Croisette, immobilier luxe Cannes"
                                },
                                {
                                    icon: <Anchor className="w-6 h-6" />,
                                    title: "Yachting & nautisme",
                                    desc: "Yacht brokers, services de crew, maintenance navale. Le Port Canto et Port Pierre Canto concentrent les recherches.",
                                    keywords: "yacht broker Cannes, crew agency French Riviera, yacht services Cannes"
                                },
                                {
                                    icon: <Calendar className="w-6 h-6" />,
                                    title: "Événementiel & MICE",
                                    desc: "Traiteurs, wedding planners, sociétés de production. Le Palais des Festivals attire 300 000 congressistes/an.",
                                    keywords: "traiteur événementiel Cannes, wedding planner Côte d'Azur, organisation congrès Cannes"
                                },
                                {
                                    icon: <Crown className="w-6 h-6" />,
                                    title: "Hôtellerie & restauration",
                                    desc: "Palaces, boutique-hôtels, restaurants étoilés. La concurrence est mondiale, la visibilité locale est l'avantage.",
                                    keywords: "hôtel 5 étoiles Cannes, restaurant gastronomique Cannes, palace Croisette"
                                }
                            ].map((sector, i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                                        {sector.icon}
                                    </div>
                                    <h4 className="font-bold text-ink mb-2">{sector.title}</h4>
                                    <p className="text-sm text-soft mb-3">{sector.desc}</p>
                                    <p className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full inline-block">
                                        Mots-clés cibles : {sector.keywords}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Défis SEO spécifiques */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-ink text-white rounded-2xl p-8 mb-12"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-amber-400" />
                            Les défis SEO du marché premium cannois
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-bold text-amber-400 mb-2">Multilinguisme obligatoire</h4>
                                <p className="text-sm text-white/70">
                                    40% des recherches en anglais, 15% en russe, arabe, chinois.
                                    Stratégie hreflang et contenu localisé par marché.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-400 mb-2">Google Ads prohibitif</h4>
                                <p className="text-sm text-white/70">
                                    CPC de 30-80€ sur "immobilier Cannes". Le SEO offre un ROI
                                    10x supérieur sur le long terme.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-400 mb-2">E-réputation critique</h4>
                                <p className="text-sm text-white/70">
                                    Clientèle exigeante qui vérifie les avis. Stratégie de
                                    réputation en ligne intégrée au SEO.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Témoignage */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-2xl p-8 border-l-4 border-amber-400"
                    >
                        <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <blockquote className="text-lg text-ink italic mb-4">
                            "Grâce à Indiana, nous sommes passés de la page 3 à la position 1 sur
                            'appartement vue mer Cannes'. En haute saison, cela représente 30 leads
                            qualifiés par semaine — sans dépenser un centime en publicité."
                        </blockquote>
                        <p className="text-sm text-soft">
                            — <strong>Directrice d'agence</strong>, Immobilier prestige La Croisette
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-soft mb-6">
                            Agence immobilière, yacht broker ou prestataire événementiel à Cannes ?
                            Discutons de votre stratégie SEO premium.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-colors"
                        >
                            Demander un audit gratuit
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
