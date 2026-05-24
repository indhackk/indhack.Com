"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, Ship } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-marseille")!;

// Contenu personnalisé Marseille - sections uniques pour atteindre 2000+ mots
function MarseilleCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Marseille */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Marseille : 870 000 habitants, jungle digitale et <span className="text-sauge">opportunités massives</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Marseille n'est pas une ville ordinaire — c'est la <strong>2ème ville de France</strong>, une métropole de 1,8 million d'habitants qui concentre des marchés SEO radicalement différents. Du restaurateur du Vieux-Port qui doit apparaître sur Google Maps avant un touriste, à l'entreprise maritime qui cible des partenaires B2B en Méditerranée, les besoins sont incomparables.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Marseille exige une expertise SEO locale spécifique</h4>
                                <p className="text-sm mb-0">
                                    Les recherches à Marseille sont <strong>hyper-localisées par quartier</strong> : "restaurant Vieux-Port", "avocat Castellane", "médecin Prado"... Une stratégie SEO nationale ne capture pas ces requêtes. Je connais l'écosystème PACA et j'adapte ma stratégie aux comportements de recherche réels du marché marseillais, pas aux templates génériques qui ignorent les 111 quartiers de la ville.
                                </p>
                            </div>

                            <p>
                                Marseille concentre des <strong>filières d'excellence</strong> : le maritime (1er port de France, hub méditerranéen), la santé (AP-HM, plus gros hôpital d'Europe), le tourisme (MuCEM, Calanques, 2 millions de croisiéristes par an) et la tech (Belle de Mai, The Camp, French Tech Aix-Marseille). Chaque secteur demande une expertise SEO adaptée : vocabulaire technique en B2B maritime, contenu multilingue pour le tourisme international, cycles courts pour la restauration.
                            </p>
                        </div>

                        {/* Stats Marseille */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">870 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 1,8 M)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1er</p>
                                <p className="text-xs text-soft">Port de France</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2 M</p>
                                <p className="text-xs text-soft">Croisiéristes/an</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">111</p>
                                <p className="text-xs text-soft">Quartiers</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Marseille</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Marseille et de sa métropole a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation, votre clientèle cible et votre secteur d'activité.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Vieux-Port / Panier",
                                    type: "SEO tourisme & gastronomie",
                                    clients: "Restaurants, bars, galeries, artisans",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Euroméditerranée / Joliette",
                                    type: "SEO corporate & tech",
                                    clients: "Bureaux, startups, coworking, services B2B",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Castellane / Prado",
                                    type: "SEO professions libérales",
                                    clients: "Avocats, médecins, comptables, notaires",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "La Valentine / Aubagne",
                                    type: "SEO commerce & retail",
                                    clients: "Zones commerciales, enseignes, grandes surfaces",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Calanques / Pointe Rouge",
                                    type: "SEO tourisme nature & nautique",
                                    clients: "Plongée, kayak, restaurants vue mer",
                                    icon: <Ship className="w-5 h-5" />
                                },
                                {
                                    zone: "Cours Julien / Noailles",
                                    type: "SEO créatif & alternatif",
                                    clients: "Artistes, concept stores, bars, associations",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Endoume / Corniche",
                                    type: "SEO immobilier premium",
                                    clients: "Agences immobilières, résidences vue mer",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Belle de Mai / Quartiers Nord",
                                    type: "SEO associatif & services",
                                    clients: "Associations, services publics, artisans",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Aix-en-Provence (30 min)",
                                    type: "SEO tech & premium",
                                    clients: "Pôle d'activités Les Milles, centre historique",
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence marseillaise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Marseille est une <strong>jungle SEO</strong>. Des dizaines d'agences web et SEO se disputent votre budget, avec des forfaits entre <strong>1 500€ et 6 000€/mois</strong> qui incluent souvent le loyer de leurs bureaux au Vieux-Port, un junior affecté à votre dossier et une rotation d'interlocuteurs qui vous oblige à répéter vos objectifs à chaque réunion.
                                    </p>
                                    <p>
                                        Mon avantage est simple : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une expertise technique pure (site Next.js, score PageSpeed 95+/100) et une spécialisation en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link>. Je ne vends pas une méthode packagée : je priorise des actions mesurables, adaptées à votre marché.
                                    </p>
                                    <p>
                                        Je connais le marché PACA dans ses nuances : la saisonnalité du tourisme marseillais, la compétition très forte en restauration autour du Vieux-Port, les cycles B2B propres au secteur maritime et les dynamiques de la French Tech Aix-Marseille. Je ne sous-traite pas, je n'applique pas de grille générique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Stratégie personnalisée au marché marseillais",
                                        "Connaissance terrain de l'écosystème PACA",
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

            {/* Section Secteurs d'activité Marseille */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Marseille</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Santé & Médical", examples: "AP-HM, cliniques, cabinets spécialisés", volume: "SEO local YMYL" },
                                { sector: "Maritime & Logistique", examples: "Armateurs, transitaires, freight", volume: "SEO B2B international" },
                                { sector: "Tourisme & Croisières", examples: "Hôtels, guides, opérateurs nautiques", volume: "SEO multilingue" },
                                { sector: "Restauration & Gastronomie", examples: "Restaurants, bistrots, traiteurs", volume: "SEO local Google Maps" },
                                { sector: "Immobilier & BTP", examples: "Promoteurs, agences, artisans", volume: "SEO local premium" },
                                { sector: "Commerce & Retail", examples: "Boutiques, enseignes, e-commerce", volume: "SEO e-commerce" },
                                { sector: "Services aux entreprises", examples: "Avocats, experts-comptables, RH", volume: "SEO autorité locale" },
                                { sector: "Tech & Innovation", examples: "Belle de Mai, The Camp, French Tech", volume: "SEO B2B growth" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">marseillaises</span>
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
                                        <td className="py-3 px-4">Restaurant Vieux-Port</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Visibilité Google Maps + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet médical</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Progression sur requêtes spécialité + quartier</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">E-commerce</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Trafic organique qualifié</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Entreprise maritime</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Autorité thématique B2B internationale</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Commerce de quartier</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Visibilité Google Maps immédiate</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises marseillaises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-aix-en-provence" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Aix-en-Provence (à 30 min de Marseille)
                                </Link>
                                <Link href="/consultant-seo-nice" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Nice (Côte d'Azur)
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
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/blog/seo-vs-sea-que-choisir" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO vs SEA : que choisir pour votre business ?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoMarseillePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<MarseilleCustomContent />}
            />
        </>
    );
}
