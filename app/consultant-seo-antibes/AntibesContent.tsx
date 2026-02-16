"use client";

import { motion } from "framer-motion";
import { Anchor, ShoppingBag, UtensilsCrossed, Sun, Waves, Store, MapPin, TrendingUp, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function AntibesContent() {
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
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-bold rounded-full mb-4">
                            Double marché : Yachting & Artisanat local
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            SEO à <span className="text-sauge">Antibes</span> :
                            <br />du Port Vauban au Marché Provençal
                        </h2>
                    </motion.div>

                    {/* Contexte Antibes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg max-w-none mb-12"
                    >
                        <p className="text-lg text-soft leading-relaxed">
                            <strong className="text-ink">Antibes, c'est deux mondes en un.</strong> D'un côté,
                            le <strong>Port Vauban</strong>, premier port de plaisance d'Europe avec ses super-yachts
                            et un marché du nautisme à plusieurs millions d'euros. De l'autre, le <strong>Vieil Antibes</strong>
                            et son Marché Provençal, royaume des artisans, restaurateurs et boutiques de charme.
                        </p>
                        <p className="text-soft">
                            Ces deux marchés ont des besoins SEO radicalement différents. Le yachting recherche une
                            visibilité <strong>internationale en anglais</strong>. Le commerce local veut attirer
                            les <strong>touristes de passage et les résidents</strong>. Ma stratégie s'adapte à ces deux réalités.
                        </p>
                        <p className="text-soft">
                            Et puis il y a <strong>Juan-les-Pins</strong>, à 5 minutes, qui capte une partie des
                            recherches "Antibes". Une stratégie de mots-clés fine est indispensable pour ne pas
                            se diluer entre les deux communes.
                        </p>
                    </motion.div>

                    {/* Port Vauban - Focus Yachting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8 border border-blue-200"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-blue-200 flex items-center justify-center flex-shrink-0">
                                <Anchor className="w-7 h-7 text-blue-800" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-ink mb-2">
                                    Port Vauban : le SEO du yachting professionnel
                                </h3>
                                <p className="text-soft mb-3">
                                    1 600 anneaux dont 19 pour mega-yachts de +100m. Les recherches "yacht services Antibes",
                                    "crew agency French Riviera", "yacht refit Antibes" représentent un <strong>marché
                                        de plusieurs millions d'euros</strong> par an.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {["Yacht brokers", "Crew agencies", "Maintenance navale", "Avitaillement", "Charter"].map((service, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vieil Antibes - Focus Commerce local */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-12 border border-amber-200"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                                <Store className="w-7 h-7 text-amber-800" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-ink mb-2">
                                    Vieil Antibes : redonner du pouvoir au commerce local
                                </h3>
                                <p className="text-soft mb-3">
                                    Face aux plateformes (TripAdvisor, TheFork, Google Hotels), les artisans et
                                    restaurateurs antibois perdent en visibilité. Le SEO local permet de
                                    <strong> reprendre le contrôle</strong> : fiche Google optimisée, avis gérés,
                                    contenu hyper-localisé qui convertit.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {["Restaurants", "Boutiques artisanales", "Galeries d'art", "Producteurs locaux", "Services proximité"].map((service, i) => (
                                        <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Saisonnalité */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-ink text-white rounded-2xl p-8 mb-12"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Sun className="w-5 h-5 text-amber-400" />
                            La saisonnalité : un défi SEO transformé en opportunité
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-amber-400 mb-2">Haute saison (mai-septembre)</h4>
                                <p className="text-sm text-white/70">
                                    +400% de recherches. Votre positionnement doit être acquis AVANT.
                                    Je prépare votre visibilité 3 mois en amont pour capter le pic.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-400 mb-2">Basse saison (octobre-avril)</h4>
                                <p className="text-sm text-white/70">
                                    Le moment idéal pour construire : contenu, technique, netlinking.
                                    Les actions de basse saison génèrent les résultats de haute saison.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-white/10 rounded-xl">
                            <p className="text-sm text-white/80">
                                <strong className="text-amber-400">Ma stratégie :</strong> Calendrier éditorial
                                aligné sur les saisons, push SEO Q1-Q2 pour être prêt en mai, capitalisation
                                sur l'autorité acquise en haute saison.
                            </p>
                        </div>
                    </motion.div>

                    {/* Secteurs accompagnés */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h3 className="text-xl font-bold text-ink mb-6 text-center">
                            Secteurs que j'accompagne à Antibes
                        </h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                {
                                    icon: <Anchor className="w-6 h-6" />,
                                    title: "Yachting & nautisme",
                                    examples: "Brokers, services crew, maintenance, charter",
                                    color: "blue"
                                },
                                {
                                    icon: <UtensilsCrossed className="w-6 h-6" />,
                                    title: "Restauration",
                                    examples: "Restaurants, traiteurs, bars, glaciers",
                                    color: "amber"
                                },
                                {
                                    icon: <ShoppingBag className="w-6 h-6" />,
                                    title: "Commerces & artisans",
                                    examples: "Boutiques, galeries, producteurs locaux",
                                    color: "green"
                                }
                            ].map((sector, i) => (
                                <div
                                    key={i}
                                    className={`bg-${sector.color}-50 border border-${sector.color}-200 rounded-xl p-6`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-${sector.color}-100 flex items-center justify-center text-${sector.color}-700 mb-4`}>
                                        {sector.icon}
                                    </div>
                                    <h4 className="font-bold text-ink mb-2">{sector.title}</h4>
                                    <p className="text-sm text-soft">{sector.examples}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Zones couvertes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-2xl p-8 mb-12"
                    >
                        <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-sauge" />
                            Zones couvertes autour d'Antibes
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                "Port Vauban", "Vieil Antibes", "Cap d'Antibes", "Juan-les-Pins",
                                "Vallauris", "Biot", "Villeneuve-Loubet", "Sophia Antipolis"
                            ].map((zone, i) => (
                                <span
                                    key={i}
                                    className="bg-white px-4 py-2 rounded-full text-sm font-medium text-ink border border-gray-200"
                                >
                                    {zone}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Témoignage */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                    >
                        <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <blockquote className="text-lg text-ink italic mb-4">
                            "Notre restaurant dans le Vieil Antibes était invisible sur Google.
                            Après 4 mois de travail avec Indiana, nous sommes dans le top 3 sur
                            'restaurant Antibes vieille ville'. La saison a été exceptionnelle."
                        </blockquote>
                        <p className="text-sm text-soft">
                            — <strong>Restaurateur</strong>, Vieil Antibes
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
                            Professionnel du yachting, restaurateur ou commerçant à Antibes ?
                            Parlons de votre visibilité locale.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-ink transition-colors"
                            >
                                Demander un audit gratuit
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/blog/google-business-profile-guide-complet"
                                className="inline-flex items-center gap-2 border-2 border-ink text-ink px-8 py-4 rounded-full font-bold hover:bg-ink hover:text-white transition-colors"
                            >
                                Guide : Optimiser sa fiche Google
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
