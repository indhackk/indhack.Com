"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, MapPin, Users, CheckCircle2, ArrowRight, Globe, Ship } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-strasbourg")!;

// Contenu personnalisé Strasbourg - sections uniques pour atteindre 2000+ mots
function StrasbourgCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Strasbourg */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Strasbourg : capitale européenne, carrefour <span className="text-sauge">franco-allemand</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Strasbourg n'est pas qu'une métropole alsacienne — c'est la <strong>seule ville de France où le SEO bilingue FR/DE est une nécessité absolue</strong>. Siège du Parlement européen, du Conseil de l'Europe et de la Cour européenne des droits de l'Homme, Strasbourg attire une clientèle internationale et un marché transfrontalier unique en France : 30 % des recherches locales se font en allemand.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Strasbourg exige une expertise SEO spécifique</h4>
                                <p className="text-sm mb-0">
                                    Les agences parisiennes ne comprennent pas la dimension franco-allemande du marché strasbourgeois. Kehl est à 5 minutes en tram : les commerçants de la Grande Île ont autant de clients allemands que français. Je maîtrise le <strong>SEO multilingue FR/DE</strong>, la saisonnalité du marché de Noël (2 millions de visiteurs) et les spécificités du marché institutionnel européen. C'est mon avantage concret sur toute agence généraliste.
                                </p>
                            </div>

                            <p>
                                Strasbourg concentre des <strong>marchés à fort potentiel SEO</strong> : le tourisme patrimonial (Grande Île classée UNESCO), la gastronomie alsacienne (winstubs, brasseries), le droit européen, le commerce transfrontalier avec l'Allemagne et le deuxième port fluvial de France. Chaque secteur demande une expertise SEO adaptée — vocabulaire institutionnel, timing de Noël, requêtes en allemand.
                            </p>
                        </div>

                        {/* Stats Strasbourg */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">285 000</p>
                                <p className="text-xs text-soft">Habitants (Eurométropole 500 000)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2 M</p>
                                <p className="text-xs text-soft">Visiteurs marché de Noël</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">30 %</p>
                                <p className="text-xs text-soft">Recherches en allemand</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">3 inst.</p>
                                <p className="text-xs text-soft">Institutions EU majeures</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Strasbourg</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Strasbourg et de l'Eurométropole a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation, de votre cible et de la langue de vos clients.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Grande Île / Petite France",
                                    type: "SEO tourisme & patrimoine",
                                    clients: "Hôtels, restaurants, artisans, musées",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Parlement / Wacken",
                                    type: "SEO institutionnel & corporate",
                                    clients: "Lobbying, droit EU, affaires publiques",
                                    icon: <Globe className="w-5 h-5" />
                                },
                                {
                                    zone: "Krutenau / Université",
                                    type: "SEO étudiants & nightlife",
                                    clients: "Restaurants, bars, services de proximité",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Robertsau",
                                    type: "SEO résidentiel premium",
                                    clients: "Consulats, organisations internationales",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Neudorf",
                                    type: "SEO local & commerce",
                                    clients: "Commerce de quartier en plein essor",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Schiltigheim",
                                    type: "SEO brasserie & artisanat",
                                    clients: "Tradition brassicole, PME alsaciennes",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Hautepierre / Cronenbourg",
                                    type: "SEO industrie & services",
                                    clients: "PMI, logistique, sous-traitants",
                                    icon: <Ship className="w-5 h-5" />
                                },
                                {
                                    zone: "Kehl / Allemagne",
                                    type: "SEO transfrontalier",
                                    clients: "Commerce cross-border FR/DE",
                                    icon: <Globe className="w-5 h-5" />
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence strasbourgeoise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Strasbourg est le seul marché français où le SEO bilingue FR/DE est vital. Les agences génériques — parisiennes ou locales — ne comprennent pas cette dimension. Elles ne gèrent pas la saisonnalité du marché de Noël, ne ciblent pas les requêtes allemandes et ignorent les spécificités institutionnelles de Wacken.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une expertise en SEO multilingue et en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link>. Je comprends le marché franco-allemand, je gère le timing Noël et je parle le langage de vos clients, qu'ils viennent de Strasbourg ou de Kehl.
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je ne déroule pas de template générique, et je vous accompagne personnellement — du diagnostic initial jusqu'à la croissance durable de votre visibilité.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "SEO bilingue FR/DE pour capter le marché transfrontalier allemand",
                                        "Stratégie européenne adaptée aux institutions (Parlement, Conseil)",
                                        "SEO tourisme pour le marché de Noël (2 millions de visiteurs/an)",
                                        "Expertise Grande Île et Petite France : commerces, winstubs, hôtels",
                                        "SEO B2B pour les groupes industriels alsaciens et transfrontaliers",
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

            {/* Section Secteurs d'activité Strasbourg */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Strasbourg</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "International & Institutions EU", examples: "Parlement, Conseil de l'Europe, ONG", volume: "SEO institutionnel" },
                                { sector: "Tourisme & Hôtellerie", examples: "Hôtels, restaurants, guides, Noël", volume: "SEO saisonnier FR/DE" },
                                { sector: "Brasserie & Gastronomie", examples: "Winstubs, brasseries alsaciennes", volume: "SEO local prioritaire" },
                                { sector: "Commerce transfrontalier", examples: "Retail, services cross-border FR/DE", volume: "SEO bilingue FR/DE" },
                                { sector: "Droit européen & Lobbying", examples: "Cabinets EU, consultants affaires pub.", volume: "SEO B2B autorité" },
                                { sector: "Santé & Recherche", examples: "CHU Strasbourg, biotech, pharma", volume: "SEO B2B technique" },
                                { sector: "E-commerce FR/DE", examples: "Boutiques en ligne, marketplaces", volume: "SEO e-commerce multilingue" },
                                { sector: "Industrie & Logistique", examples: "Port fluvial, PMI, sous-traitants", volume: "SEO B2B industriel" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">strasbourgeoises</span>
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
                                        <td className="py-3 px-4">Hôtel Grande Île</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Visibilité marché de Noël (pic saisonnier)</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Winstub / Restaurant</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 local FR + DE</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet droit européen</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Autorité thématique EU law</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Commerce transfrontalier</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Visibilité cross-border FR/DE</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Startup locale</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu ciblé</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises strasbourgeoises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-lille" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Lille (axe nord-est)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-lyon" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Lyon (axe Rhône-Rhin)
                                </Link>
                                <Link href="/blog/optimiser-fiche-gmb-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Optimiser votre fiche Google Business Profile
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Voler les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/blog/seo-strasbourg-guide-pme-alsaciennes-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide SEO complet pour les PME alsaciennes 2026
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Demander un audit SEO gratuit à Strasbourg
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoStrasbourgPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<StrasbourgCustomContent />}
            />
        </>
    );
}
