"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, Plane } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-nice")!;

// Contenu personnalisé Nice - sections uniques pour atteindre 2000+ mots
function NiceCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Nice */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                L'économie niçoise : entre tourisme international et <span className="text-sauge">tech azuréenne</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Nice n'est pas qu'une carte postale ensoleillée — c'est la <strong>5ème ville de France</strong>, capitale d'une métropole de 550 000 habitants qui concentre des marchés SEO radicalement différents. Du restaurateur du Vieux-Nice qui doit apparaître sur Google Maps avant un touriste anglais, à la startup de l'éco-vallée plaine du Var qui cible des clients B2B en Europe, les besoins sont incomparables.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Nice exige une expertise SEO locale spécifique</h4>
                                <p className="text-sm mb-0">
                                    Les recherches à Nice sont <strong>multilingues par nature</strong> : 70 % des 5 millions de visiteurs annuels viennent de l'étranger (Royaume-Uni, Italie, Russie, Scandinavie). Une stratégie SEO franco-française ne capte pas ces opportunités. Je maîtrise le SEO multilingue FR/EN/IT et j'adapte chaque campagne aux comportements de recherche réels des audiences niçoises et touristiques.
                                </p>
                            </div>

                            <p>
                                Nice bénéficie d'un label <strong>French Tech</strong> et de l'éco-vallée plaine du Var, premier éco-quartier d'Europe qui attire startups et entreprises innovantes. L'aéroport Nice Côte d'Azur — 3ème de France avec 14 millions de passagers — génère un flux de clientèle business unique. L'immobilier premium (5 000 €/m² en moyenne) et un pôle santé structuré autour du CHU de Nice complètent un marché économique dense et diversifié.
                            </p>
                        </div>

                        {/* Stats Nice */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">340 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 550 000)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">5 M</p>
                                <p className="text-xs text-soft">Touristes/an</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">3ème</p>
                                <p className="text-xs text-soft">Aéroport de France</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">14 M</p>
                                <p className="text-xs text-soft">Passagers/an</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Nice</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Nice et de sa métropole a ses propres enjeux SEO. J'adapte ma stratégie selon votre localisation, votre clientèle cible et la saisonnalité de votre marché.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Vieux-Nice",
                                    type: "SEO tourisme & restauration",
                                    clients: "Restaurants, galeries, artisans, caves à vins",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Promenade des Anglais / Carré d'Or",
                                    type: "SEO luxe & hôtellerie",
                                    clients: "Hôtels 5*, boutiques luxe, spas, joaillerie",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Port de Nice / Garibaldi",
                                    type: "SEO local & commerce",
                                    clients: "Bistrots, commerces indépendants, services",
                                    icon: <MapPin className="w-5 h-5" />
                                },
                                {
                                    zone: "Libération / Jean-Médecin",
                                    type: "SEO retail & services",
                                    clients: "Enseignes, centre commercial, services grand public",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Cimiez",
                                    type: "SEO premium résidentiel",
                                    clients: "Professions libérales, cliniques privées, cabinets",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Plaine du Var / Éco-Vallée",
                                    type: "SEO tech & startup",
                                    clients: "Incubateurs, coworking, ESN, SaaS",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Arenas / Aéroport",
                                    type: "SEO corporate & MICE",
                                    clients: "Hôtels business, congrès, location de salles",
                                    icon: <Plane className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Laurent-du-Var",
                                    type: "SEO local fort",
                                    clients: "Commerces, restaurants, Cap 3000, services",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Cagnes-sur-Mer",
                                    type: "SEO saisonnier",
                                    clients: "Hippodrome, plages, vieille ville, hôtels",
                                    icon: <TrendingUp className="w-5 h-5" />
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO freelance</span> plutôt qu'une agence niçoise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Nice compte des dizaines d'agences SEO et web. Elles facturent entre <strong>2 000€ et 7 000€/mois</strong>, souvent avec un junior affecté à votre dossier et un turn-over d'interlocuteurs qui vous oblige à répéter vos objectifs à chaque réunion.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO freelance</Link> avec une expertise technique poussée (site Next.js, score PageSpeed 95+/100) et une spécialisation en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> qui positionne vos contenus sur ChatGPT et Perplexity.
                                    </p>
                                    <p>
                                        Je connais l'écosystème azuréen dans ses nuances : la saisonnalité touristique estivale, le multilinguisme indispensable sur la Côte, les cycles de décision courts en hôtellerie et les dynamiques B2B propres à la French Tech niçoise. Je ne sous-traite pas, je n'applique pas de grille générique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Stratégie personnalisée au marché niçois",
                                        "Expertise multilingue FR/EN/IT pour les marchés touristiques",
                                        "Reporting mensuel clair avec KPIs business",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
                                        "Tarifs 30-50% inférieurs aux agences locales",
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

            {/* Section Secteurs d'activité Nice */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Nice</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Hôtellerie & Tourisme", examples: "Hôtels, résidences, guides touristiques", volume: "SEO multilingue" },
                                { sector: "Restauration", examples: "Restaurants, bistrots, traiteurs", volume: "SEO local Google Maps" },
                                { sector: "Immobilier prestige", examples: "Agences, promoteurs, gestion locative", volume: "SEO premium B2C" },
                                { sector: "Santé & Bien-être", examples: "Cliniques, praticiens, spas, instituts", volume: "SEO local YMYL" },
                                { sector: "Tech & Startups", examples: "Éco-vallée, SaaS, ESN", volume: "SEO B2B growth" },
                                { sector: "Commerce & Retail", examples: "Boutiques, enseignes, e-commerce", volume: "SEO e-commerce" },
                                { sector: "Services aux entreprises", examples: "Avocats, experts-comptables, conseil", volume: "SEO autorité locale" },
                                { sector: "Événementiel & MICE", examples: "Congrès, mariages, séminaires", volume: "SEO saisonnier" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">niçoises</span>
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
                                        <td className="py-3 px-4">Restaurant Vieux-Nice</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Hôtel Promenade des Anglais</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">+40 % de réservations directes (vs Booking)</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Agence immobilière</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Page 1 sur requêtes par quartier</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup Éco-Vallée</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+200 % de leads qualifiés</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Cabinet médical Cimiez</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Top 3 local + prise de RDV en ligne</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-soft mt-4 italic">
                            * Ces résultats sont basés sur des projets réels. Chaque situation est unique — l'<Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">audit SEO gratuit</Link> permet d'évaluer votre potentiel spécifique.
                        </p>
                    </div>
                </div>
            </section>

            {/* Liens internes contextuels */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises niçoises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-cannes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Cannes (à 30 min de Nice)
                                </Link>
                                <Link href="/consultant-seo-monaco" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Monaco (à 20 min de Nice)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/blog/google-business-profile-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide complet Google Business Profile
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps
                                </Link>
                                <Link href="/blog/checklist-seo-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Checklist SEO 2026 : 30 points essentiels
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoNicePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<NiceCustomContent />}
            />
        </>
    );
}
