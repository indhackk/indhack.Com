"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, Globe } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-paris")!;

// Contenu personnalisé Paris - sections uniques pour atteindre 2000+ mots
function ParisCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Paris */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Paris : 2 millions d'habitants, la <span className="text-sauge">concurrence SEO la plus féroce</span> de France
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Paris n'est pas un marché SEO — c'est <strong>vingt marchés en un</strong>. "Plombier 15ème" et "plombier Paris" ne sont pas les mêmes requêtes : la première est accessible, la seconde est un champ de bataille. Avec 2,1 millions d'habitants en ville et 12 millions en Île-de-France, tous les secteurs, tous les budgets et toutes les concurrences coexistent dans un périmètre de 105 km².
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">La stratégie gagnante à Paris : le SEO par arrondissement</h4>
                                <p className="text-sm mb-0">
                                    Les agences parisiennes font du SEO générique sur "avocat Paris" ou "restaurant Paris". Ces requêtes sont inaccessibles pour 99% des PME. La vraie stratégie : <strong>cibler par arrondissement et par micro-niche</strong>. "Avocat droit social 11ème", "restaurant gastronomique Marais", "coach sportif Montparnasse" — ces requêtes sont rentables et atteignables. Je construis cette architecture dès le départ.
                                </p>
                            </div>

                            <p>
                                Paris concentre des <strong>écosystèmes incomparables</strong> : Station F (plus grand campus de startups au monde), La Défense (1er quartier d'affaires d'Europe), 35 millions de touristes par an nécessitant un SEO multilingue, Le Marais, Saint-Germain et Montmartre pour le tourisme culturel et gastronomique, et des professions libérales parmi les plus denses d'Europe. Chaque arrondissement est un marché à part entière avec ses propres comportements de recherche.
                            </p>
                        </div>

                        {/* Stats Paris */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2,1 M</p>
                                <p className="text-xs text-soft">Habitants (IDF 12M)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">35 M</p>
                                <p className="text-xs text-soft">Touristes/an</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">20</p>
                                <p className="text-xs text-soft">Arrondissements</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1 000</p>
                                <p className="text-xs text-soft">Startups Station F</p>
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
                                Arrondissements et zones d'intervention à <span className="text-sauge">Paris</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque arrondissement parisien a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation, de votre clientèle cible et de la concurrence réelle sur votre marché.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Le Marais (3ème-4ème)",
                                    type: "SEO mode & culture",
                                    clients: "Boutiques, galeries, restaurants tendance",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Germain (6ème)",
                                    type: "SEO luxe & édition",
                                    clients: "Galeries, librairies, restaurants gastronomiques",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Triangle d'Or (8ème)",
                                    type: "SEO luxe international",
                                    clients: "Marques, hôtels 5*, joaillerie",
                                    icon: <Globe className="w-5 h-5" />
                                },
                                {
                                    zone: "Opéra / Grands Boulevards (9ème)",
                                    type: "SEO corporate & finance",
                                    clients: "Bureaux, banques, sociétés de conseil",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "République / Oberkampf (11ème)",
                                    type: "SEO startup & nightlife",
                                    clients: "Bars, espaces coworking, tech",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Bercy / Nation (12ème)",
                                    type: "SEO commerce & famille",
                                    clients: "Restaurants, services, commerces",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Montparnasse (14ème-15ème)",
                                    type: "SEO professions libérales",
                                    clients: "Cabinets médicaux, avocats, experts",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Montmartre / Pigalle (18ème)",
                                    type: "SEO tourisme & créatif",
                                    clients: "Artistes, restaurants, hôtels",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "La Défense",
                                    type: "SEO corporate B2B",
                                    clients: "Grands comptes, ESN, conseil",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Station F / 13ème",
                                    type: "SEO startup & IA",
                                    clients: "Incubateurs, tech, intelligence artificielle",
                                    icon: <Cpu className="w-5 h-5" />
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

            {/* Section Pourquoi indépendante vs agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence parisienne ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Paris est le marché le plus dur de France. Les agences facturent entre <strong>3 000€ et 15 000€/mois</strong> avec souvent des juniors qui gèrent votre dossier et une rotation d'interlocuteurs. Leur loyer parisien, leurs charges et leur structure gonflent les tarifs sans améliorer les résultats.
                                    </p>
                                    <p>
                                        Mon avantage est structurel : pas de loyer parisien, pas de surcharge administrative, <strong>expertise technique pure</strong>. Je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une maîtrise avancée du SEO technique et de la <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> pour ChatGPT, Perplexity et les moteurs génératifs.
                                    </p>
                                    <p>
                                        Je ne promets pas la 1ère place sur "avocat Paris" — je trouve les niches rentables par arrondissement et micro-segment qui génèrent de vrais clients, pas du trafic vanity.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Stratégie par arrondissement et micro-niche",
                                        "Reporting mensuel clair avec KPIs business",
                                        "Expertise SEO multilingue (tourisme international)",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
                                        "Tarifs 30-50% inférieurs aux agences parisiennes",
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

            {/* Section Secteurs d'activité Paris */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Paris</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Startups & Tech", examples: "SaaS, Station F, French Tech", volume: "SEO B2B growth" },
                                { sector: "Luxe & Mode", examples: "Marques, boutiques, joaillerie", volume: "SEO premium international" },
                                { sector: "Santé & Professions libérales", examples: "Médecins, avocats, experts", volume: "SEO local + autorité" },
                                { sector: "Restauration & Gastronomie", examples: "Restaurants, bistrots, étoilés", volume: "SEO local prioritaire" },
                                { sector: "Immobilier", examples: "Agences, promoteurs, gestion", volume: "SEO local compétitif" },
                                { sector: "E-commerce", examples: "Pure players, DTC, marketplaces", volume: "SEO e-commerce avancé" },
                                { sector: "Services B2B", examples: "Cabinets, ESN, conseil", volume: "SEO autorité thématique" },
                                { sector: "Tourisme & Hôtellerie", examples: "Hôtels, expériences, guides", volume: "SEO saisonnier multilingue" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">parisiennes</span>
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
                                        <td className="py-3 px-4">Restaurant Le Marais</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local quartier + réservations</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup Station F</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu ciblé</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet médical 15ème</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 "spécialité + arrondissement"</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">E-commerce mode</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Trafic organique qualifié</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Professions libérales</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Visibilité dominante arrondissement</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-soft mt-4 italic">
                            * Ces objectifs dépendent de la concurrence, de l’état technique du site et de la vitesse d’exécution. Chaque situation est unique — l'<Link href="/audit-seo" className="text-sauge hover:underline">audit SEO gratuit</Link> permet d'évaluer votre potentiel spécifique.
                        </p>
                    </div>
                </div>
            </section>

            {/* Liens internes contextuels */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises parisiennes</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-boulogne-billancourt" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Boulogne-Billancourt (92)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/outils/testeur-visibilite-ia" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testeur de visibilité IA (ChatGPT, Perplexity)
                                </Link>
                                <Link href="/blog/checklist-seo-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Checklist SEO 2026 : 30 points essentiels
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/blog/seo-vs-sea-que-choisir" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO vs SEA : que choisir pour votre budget ?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoParisPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<ParisCustomContent />}
            />
        </>
    );
}
