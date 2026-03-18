"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Anchor, Building2, MapPin, Users, CheckCircle2, ArrowRight, Cpu, Utensils } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-antibes")!;

// Contenu personnalisé Antibes - sections uniques pour atteindre 2000+ mots
function AntibesCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Antibes */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Anchor className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Antibes : yachting, artisanat et <span className="text-sauge">double marché littoral</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Antibes n'est pas une ville côtière ordinaire — c'est la <strong>deuxième ville des Alpes-Maritimes</strong> avec 73 000 habitants et deux marchés radicalement différents qui coexistent. Le <strong>Port Vauban</strong>, premier port de plaisance d'Europe (1 642 places, superyachts jusqu'à 163 m), concentre une industrie du yachting valant des centaines de millions d'euros : réparation navale, maintenance, agences crew, brokers. À cinq minutes à pied, le <strong>Vieil Antibes</strong> et son Marché Provençal attirent artisans, restaurateurs et boutiques de charme pour une clientèle de résidents et de touristes de passage.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Antibes exige une stratégie SEO duale</h4>
                                <p className="text-sm mb-0">
                                    Le yachting à Antibes cherche une visibilité <strong>internationale en anglais</strong> ("yacht services Antibes", "crew agency French Riviera"). Le commerce local veut capter les <strong>touristes de proximité et les résidents</strong> en français. Une seule stratégie générique ne peut pas servir ces deux audiences. Je construis deux axes SEO distincts, adaptés à chaque marché, pour maximiser votre visibilité quelle que soit votre activité.
                                </p>
                            </div>

                            <p>
                                Le <strong>Cap d'Antibes</strong> ajoute une troisième dimension : l'immobilier ultra-luxe (villas entre 10 M€ et 50 M€) avec ses property managers et services de conciergerie haut de gamme. À 10 minutes, <strong>Sophia-Antipolis</strong> génère un flux permanent de cadres tech et de décideurs B2B. Antibes est ainsi une ville à quatre vitesses — yachting, artisanat, immobilier prestige et débordement tech — et chacune a ses propres requêtes Google.
                            </p>
                        </div>

                        {/* Stats Antibes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">73 000</p>
                                <p className="text-xs text-soft">Habitants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1 642</p>
                                <p className="text-xs text-soft">Places Port Vauban</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">10 min</p>
                                <p className="text-xs text-soft">De Sophia-Antipolis</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">50 M€</p>
                                <p className="text-xs text-soft">Villas Cap d'Antibes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Quartiers et zones d'intervention */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Quartiers et zones d'intervention à <span className="text-sauge">Antibes</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier d'Antibes et de son bassin de vie a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation et de votre cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Vieil Antibes / Safranier",
                                    type: "SEO artisanat & culture",
                                    clients: "Galeries, restaurants, artisans, boutiques de charme",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Port Vauban",
                                    type: "SEO yachting international",
                                    clients: "Brokers, chantiers navals, services crew, charter",
                                    icon: <Anchor className="w-5 h-5" />
                                },
                                {
                                    zone: "Cap d'Antibes",
                                    type: "SEO immobilier ultra-prestige",
                                    clients: "Villas, property managers, conciergerie haut de gamme",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Juan-les-Pins",
                                    type: "SEO nightlife & plages",
                                    clients: "Beach clubs, hôtels saisonniers, restaurants",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Sophia-Antipolis (proche)",
                                    type: "SEO B2B tech",
                                    clients: "SaaS, ESN, R&D, services aux entreprises tech",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "La Brague / Biot",
                                    type: "SEO artisanat & verrerie",
                                    clients: "Ateliers, galeries, verrerie de Biot",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Vallauris",
                                    type: "SEO céramique & artisanat",
                                    clients: "Poteries, galeries, héritage Picasso",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Plages (Salis, Ponteil, Gravette)",
                                    type: "SEO tourisme balnéaire",
                                    clients: "Locations, activités nautiques, restauration de plage",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Zone commerciale",
                                    type: "SEO retail & services",
                                    clients: "Enseignes, automobile, grande restauration",
                                    icon: <Users className="w-5 h-5" />
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 hover:border-sauge/30 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sauge">{item.icon}</span>
                                        <h3 className="font-bold text-ink text-sm">{item.zone}</h3>
                                    </div>
                                    <p className="text-xs text-sauge font-semibold mb-1">{item.type}</p>
                                    <p className="text-xs text-soft">{item.clients}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Pourquoi freelance vs agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi choisir une <span className="text-sauge">consultante SEO freelance</span> plutôt qu'une agence locale ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Les agences SEO de la Côte d'Azur facturent entre <strong>1 500 € et 6 000 €/mois</strong>. Souvent, un junior hérite de votre dossier et change tous les six mois. Vous finissez par répéter vos objectifs à chaque nouvelle tête — sans jamais voir vos positions progresser vraiment.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO freelance</Link> avec une expertise technique solide et une spécialisation en <Link href="/seo-local" className="text-sauge hover:underline">SEO local</Link> adaptée aux marchés saisonniers de la Riviera. Je connais la dualité antiboise : les besoins du yachting ne ressemblent en rien à ceux d'un artisan du Safranier.
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je n'applique pas de grille générique, et je vous accompagne personnellement du diagnostic à la croissance. Mon site tourne sur Next.js avec un score PageSpeed de 95+/100 — preuve que je maîtrise la technique autant que la stratégie.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Stratégie adaptée au double marché d'Antibes",
                                        "SEO bilingue si besoin (yachting en anglais)",
                                        "Reporting mensuel clair avec KPIs business",
                                        "Expertise Core Web Vitals et SEO technique",
                                        "Tarifs 30-50 % inférieurs aux agences",
                                        "Sans engagement long terme (3 mois puis liberté)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-sauge shrink-0 mt-0.5" />
                                            <span className="text-soft">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Secteurs d'activité Antibes */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Antibes</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Yachting & nautisme", examples: "Brokers, maintenance, crew agencies", volume: "SEO international EN/FR" },
                                { sector: "Artisanat & commerce local", examples: "Galeries, boutiques, Marché Provençal", volume: "SEO local prioritaire" },
                                { sector: "Immobilier luxe", examples: "Agences, property managers, conciergerie", volume: "SEO prestige & autorité" },
                                { sector: "Tech (Sophia proche)", examples: "SaaS, ESN, R&D, scale-ups", volume: "SEO B2B growth" },
                                { sector: "Restauration", examples: "Restaurants, bars, traiteurs", volume: "SEO local + Google Maps" },
                                { sector: "Tourisme familial", examples: "Marineland, hôtels, activités", volume: "SEO saisonnier" },
                                { sector: "Commerce local", examples: "Enseignes, services, automobile", volume: "SEO de proximité" },
                                { sector: "Services nautiques", examples: "Avitaillement, électronique, voilerie", volume: "SEO B2B spécialisé" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all">
                                    <h3 className="font-bold text-white text-sm mb-1">{item.sector}</h3>
                                    <p className="text-xs text-white/60 mb-2">{item.examples}</p>
                                    <span className="text-xs text-sauge-light font-medium">{item.volume}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Résultats attendus */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">antiboise</span>s
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-bold text-ink">Type de business</th>
                                        <th className="text-left py-3 px-4 font-bold text-ink">Délai premiers résultats</th>
                                        <th className="text-left py-3 px-4 font-bold text-ink">Objectif réaliste 6 mois</th>
                                    </tr>
                                </thead>
                                <tbody className="text-soft">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant / Artisan Vieil Antibes</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + fréquentation directe</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Service yachting (broker, maintenance)</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Visibilité internationale + leads qualifiés</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Agence immobilier luxe / Cap d'Antibes</td>
                                        <td className="py-3 px-4">3-5 mois</td>
                                        <td className="py-3 px-4">Autorité thématique prestige + mandats entrants</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">SaaS / ESN (Sophia proximité)</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+200 % leads qualifiés via contenu B2B</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Hôtel / Beach club saisonnier</td>
                                        <td className="py-3 px-4">2-3 mois*</td>
                                        <td className="py-3 px-4">Réservations directes avant haute saison</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-soft mt-4 italic">
                            * Pour les acteurs saisonniers, le travail SEO doit commencer en janvier-février pour être positionné avant mai. L'<Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">audit SEO gratuit</Link> permet d'évaluer votre potentiel et votre timing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Liens internes contextuels */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises antiboises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/blog/google-business-profile-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide complet Google Business Profile
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-juan-les-pins" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Juan-les-Pins (à 5 min)
                                </Link>
                                <Link href="/consultant-seo-sophia-antipolis" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Sophia-Antipolis (à 10 min)
                                </Link>
                                <Link href="/consultant-seo-nice" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Nice
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoAntibesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<AntibesCustomContent />}
            />
        </>
    );
}
