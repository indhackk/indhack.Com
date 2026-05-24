"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Anchor, Calendar, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, Star } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-cannes")!;

// Contenu personnalisé Cannes - sections uniques pour atteindre 2000+ mots
function CannesCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Cannes */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Cannes : le luxe, l'événementiel et le yachting au service du <span className="text-sauge">SEO</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Cannes n'est pas une ville comme les autres — c'est une <strong>marque mondiale</strong>. Avec 74 000 habitants mais un impact économique disproportionné, la ville génère une activité numérique hors norme que peu de consultants SEO savent exploiter. Le Festival de Cannes concentre à lui seul <strong>40 % des recherches annuelles en deux semaines</strong>, avec 200 000 visiteurs qui inondent les résultats Google d'une concurrence venue du monde entier.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Cannes exige une expertise SEO spécifique</h4>
                                <p className="text-sm mb-0">
                                    Le calendrier événementiel de Cannes est un <strong>levier SEO permanent</strong> : MIPIM, MAPIC, Cannes Lions, Festival du Film… Chaque événement crée une fenêtre de trafic massif qu'il faut anticiper des mois à l'avance. Sans une stratégie SEO alignée sur ce calendrier, vos concurrents captent ces pics pendant que votre site reste invisible.
                                </p>
                            </div>

                            <p>
                                L'industrie nautique structure une part majeure de l'économie locale : le <strong>Port Canto et le Port Pierre Cano</strong> accueillent plus de 400 yachts et une industrie de services (brokers, charters, maintenance, équipements) dont les clients sont internationaux et recherchent en plusieurs langues. L'immobilier ultra-premium des quartiers Californie et Super-Cannes affiche des prix jusqu'à <strong>30 000 €/m²</strong>, générant un marché de recherche en ligne extrêmement compétitif mais à forte valeur ajoutée.
                            </p>
                        </div>

                        {/* Stats Cannes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">74 000</p>
                                <p className="text-xs text-soft">Habitants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">200 000</p>
                                <p className="text-xs text-soft">Visiteurs Festival</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">15 000 €</p>
                                <p className="text-xs text-soft">Prix moyen /m²</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">400+</p>
                                <p className="text-xs text-soft">Yachts Port Canto</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Cannes</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque secteur de Cannes et ses environs a ses propres enjeux SEO. J'adapte la stratégie à votre quartier, votre marché et votre clientèle cible — locale, nationale ou internationale.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "La Croisette",
                                    type: "SEO luxe international",
                                    clients: "Palaces, boutiques haute couture, joaillerie",
                                    icon: <Star className="w-5 h-5" />
                                },
                                {
                                    zone: "Le Suquet",
                                    type: "SEO tourisme & artisanat",
                                    clients: "Restaurants vue mer, galeries, artisans",
                                    icon: <MapPin className="w-5 h-5" />
                                },
                                {
                                    zone: "Rue d'Antibes",
                                    type: "SEO retail premium",
                                    clients: "Boutiques mode, enseignes, bijouterie",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "La Bocca",
                                    type: "SEO local & services",
                                    clients: "Commerces de proximité, artisans, PME",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Californie / Super-Cannes",
                                    type: "SEO immobilier ultra-prestige",
                                    clients: "Villas, property management, agences",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Port Canto",
                                    type: "SEO yachting & nautisme",
                                    clients: "Brokers, services nautiques, charters",
                                    icon: <Anchor className="w-5 h-5" />
                                },
                                {
                                    zone: "Palm Beach",
                                    type: "SEO événementiel",
                                    clients: "Casino, plages privées, nightlife",
                                    icon: <Calendar className="w-5 h-5" />
                                },
                                {
                                    zone: "Mougins (10 min)",
                                    type: "SEO gastronomie & art",
                                    clients: "Restaurants étoilés, galeries d'art",
                                    icon: <Star className="w-5 h-5" />
                                },
                                {
                                    zone: "Le Cannet",
                                    type: "SEO local résidentiel",
                                    clients: "Commerces, professions libérales",
                                    icon: <Building2 className="w-5 h-5" />
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
                            Pourquoi travailler avec une <span className="text-sauge">consultante SEO</span> sur le marché de Cannes ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Cannes impose une lecture fine du luxe, du multilingue, de la saisonnalité événementielle et des intentions à forte valeur. Une page générique ne suffit pas : il faut relier contenu, réputation, calendrier et conversion.
                                    </p>
                                    <p>
                                        Mon expertise couvre le <strong>SEO multilingue (FR/EN/RU)</strong>, utile pour le yachting, l’immobilier prestige et l’hôtellerie de luxe à Cannes. Le calendrier événementiel compte aussi : Festival, MIPIM et MAPIC doivent être anticipés plusieurs semaines avant le pic de recherche.
                                    </p>
                                    <p>
                                        Je travaille comme <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO</Link> spécialisée en <Link href="/seo-local" className="text-sauge hover:underline">SEO local</Link> et en visibilité sur les marchés premium. Le cadrage reste personnalisé : intentions, pages, preuves, langue et saisonnalité.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert marché luxe",
                                        "Diagnostic technique intégré au cadrage",
                                        "Stratégie multilingue FR/EN/RU selon votre cible",
                                        "SEO calendrier événementiel (Festival, MIPIM…)",
                                        "Expertise Core Web Vitals et SEO technique",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
                                        "Périmètre clair, sans couche agence inutile",
                                        "Cadre d’accompagnement précis, ajustable selon les besoins"
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

            {/* Section Secteurs d'activité Cannes */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Cannes</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Immobilier prestige", examples: "Agences, promoteurs, villas luxe", volume: "SEO multilingue premium" },
                                { sector: "Yachting & Nautisme", examples: "Brokers, charters, maintenance", volume: "SEO international EN/RU" },
                                { sector: "Événementiel & MICE", examples: "Organisateurs, venues, prestataires", volume: "SEO calendrier événementiel" },
                                { sector: "Hôtellerie 5 étoiles", examples: "Palaces, boutique-hôtels, resorts", volume: "SEO réservations directes" },
                                { sector: "Restauration gastronomique", examples: "Étoilés, bistrots prestige, traiteurs", volume: "SEO local prioritaire" },
                                { sector: "Joaillerie & Mode luxe", examples: "Boutiques, créateurs, showrooms", volume: "SEO e-commerce luxe" },
                                { sector: "Services conciergerie", examples: "Conciergeries privées, lifestyle", volume: "SEO B2C haut de gamme" },
                                { sector: "Production & Cinéma", examples: "Boîtes de prod, agents, casting", volume: "SEO festival & année" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">cannoises</span>
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
                                        <td className="py-3 px-4">Agence immobilière prestige</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Progression sur « villa Cannes » et variantes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Yacht broker</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Leads internationaux qualifiés</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant La Croisette</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Visibilité Google Maps + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Hôtel 5 étoiles</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Réservations directes hors OTA</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Prestataire événementiel</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Visibilité pré-festival et hors saison</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises cannoises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-nice" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Nice (à 30 min de Cannes)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-antibes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Antibes (à 15 min de Cannes)
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Comment voler les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/blog/seo-local-nice" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local sur la Côte d'Azur : guide complet
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoCannesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<CannesCustomContent />}
            />
        </>
    );
}
