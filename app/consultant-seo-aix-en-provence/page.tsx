"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, BookOpen } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-aix-en-provence")!;

// Contenu personnalisé Aix-en-Provence - sections uniques pour atteindre 2000+ mots
function AixCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Aix-en-Provence */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Aix-en-Provence : art de vivre, tech et <span className="text-sauge">40 000 étudiants</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Aix-en-Provence n'est pas qu'une jolie ville de province — c'est un marché SEO d'une richesse exceptionnelle. Avec 145 000 habitants, 40 000 étudiants et un tissu économique qui mêle commerce haut de gamme, pôle technologique aux Milles et rayonnement culturel international, chaque quartier représente des besoins et des audiences radicalement différents.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Aix-en-Provence exige une expertise SEO locale spécifique</h4>
                                <p className="text-sm mb-0">
                                    Les recherches à Aix sont <strong>fortement segmentées par intention</strong> : un touriste cherche "restaurant cours Mirabeau", un étudiant cherche "colocation Aix-Marseille Université", une entreprise cherche "ESN Les Milles". Une stratégie SEO générique ne capture aucun de ces segments. Je connais l'écosystème aixois et j'adapte chaque campagne aux comportements de recherche réels de vos audiences cibles.
                                </p>
                            </div>

                            <p>
                                Aix-en-Provence concentre des <strong>atouts économiques uniques</strong> : le pôle d'activités des Milles (startups, ESN, sièges régionaux), un centre historique premium (boutiques haut de gamme, galeries, restaurants gastronomiques), et un rayonnement culturel international grâce au Festival d'Aix-en-Provence (opéra) et au tourisme Cézanne. 300 jours de soleil par an n'y sont pas pour rien.
                            </p>
                        </div>

                        {/* Stats Aix-en-Provence */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">145 000</p>
                                <p className="text-xs text-soft">Habitants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">40 000</p>
                                <p className="text-xs text-soft">Étudiants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">Intl</p>
                                <p className="text-xs text-soft">Festival d'Aix (opéra)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">300</p>
                                <p className="text-xs text-soft">Jours de soleil/an</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Aix-en-Provence</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier d'Aix-en-Provence a ses propres enjeux SEO. J'adapte ma stratégie selon votre localisation, votre clientèle cible et la nature de votre activité.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Cours Mirabeau / Centre",
                                    type: "SEO commerce premium",
                                    clients: "Boutiques, restaurants, cafés historiques",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Mazarin",
                                    type: "SEO professions libérales",
                                    clients: "Avocats, architectes, notaires, experts",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Les Milles / Pôle d'activités",
                                    type: "SEO B2B & tech",
                                    clients: "ESN, startups, sièges régionaux, industrie",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Jas de Bouffan",
                                    type: "SEO commerce & services",
                                    clients: "Zone commerciale, artisans, services locaux",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Pont de l'Arc",
                                    type: "SEO santé & bien-être",
                                    clients: "Cliniques, praticiens, kinés, ostéos",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Quartier des facultés",
                                    type: "SEO étudiants & restauration",
                                    clients: "Restauration rapide, services étudiants",
                                    icon: <BookOpen className="w-5 h-5" />
                                },
                                {
                                    zone: "Luynes / Venelles",
                                    type: "SEO résidentiel & services",
                                    clients: "Artisans, professions libérales, PME locales",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Montagne Sainte-Victoire",
                                    type: "SEO tourisme nature",
                                    clients: "Randonnée, hébergements, activités outdoor",
                                    icon: <MapPin className="w-5 h-5" />
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence aixoise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Aix-en-Provence compte plusieurs agences web et SEO, souvent positionnées sur le marché premium de la ville. Leurs tarifs, entre <strong>1 500€ et 5 000€/mois</strong>, reflètent leur localisation en centre-ville autant que leur expertise réelle. Le résultat : vous payez leur loyer cours Mirabeau autant que votre stratégie digitale.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une expertise technique poussée (site Next.js, score PageSpeed 95+/100) et une spécialisation en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> qui positionne vos contenus sur ChatGPT et Perplexity.
                                    </p>
                                    <p>
                                        Je connais l'écosystème aixois dans ses nuances : la clientèle premium du centre historique, les dynamiques B2B du pôle des Milles, la concurrence intense en restauration gastronomique et les spécificités SEO des professions libérales du quartier Mazarin. Je ne sous-traite pas, je n'applique pas de grille générique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Stratégie personnalisée au marché aixois",
                                        "Expertise des marchés B2B tech (Les Milles) et premium (centre)",
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

            {/* Section Secteurs d'activité Aix-en-Provence */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Aix-en-Provence</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Commerce premium", examples: "Boutiques centre, galeries, maroquinerie", volume: "SEO local premium" },
                                { sector: "Tech & Startups", examples: "ESN, SaaS, pôle Les Milles", volume: "SEO B2B growth" },
                                { sector: "Professions libérales", examples: "Avocats, notaires, architectes", volume: "SEO autorité locale" },
                                { sector: "Tourisme culturel", examples: "Festival d'Aix, musées, Cézanne", volume: "SEO touristique" },
                                { sector: "Restauration gastronomique", examples: "Restaurants, bistrots, traiteurs", volume: "SEO local Google Maps" },
                                { sector: "Formation & Éducation", examples: "Aix-Marseille Université, Sciences Po", volume: "SEO informationnel" },
                                { sector: "Santé & Bien-être", examples: "Cliniques, praticiens, spas, yoga", volume: "SEO local YMYL" },
                                { sector: "Art & Galeries", examples: "Galeries d'art, ateliers, antiquaires", volume: "SEO niche premium" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">aixoises</span>
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
                                        <td className="py-3 px-4">Restaurant cours Mirabeau</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet libéral (avocat, notaire)</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 sur requêtes spécialité + ville</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup / ESN Les Milles</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu B2B</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Commerce premium centre</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Visibilité Google Maps + trafic qualifié</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Praticien santé</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Top 3 local + prise de RDV en ligne</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-soft mt-4 italic">
                            * Ces objectifs dépendent de la concurrence, de l’état technique du site et de la vitesse d’exécution. Chaque situation est unique — l'<Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">audit SEO gratuit</Link> permet d'évaluer votre potentiel spécifique.
                        </p>
                    </div>
                </div>
            </section>

            {/* Liens internes contextuels */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises aixoises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-marseille" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Marseille (à 30 min d'Aix)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/blog/audit-seo-approfondi-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Pourquoi un audit SEO est indispensable
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/blog/checklist-seo-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Checklist SEO 2026 : 30 points essentiels
                                </Link>
                                <Link href="/creation-site-web" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Création de site web performant
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoAixPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<AixCustomContent />}
            />
        </>
    );
}
