"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, Wine } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-bordeaux")!;

// Contenu personnalisé Bordeaux - sections uniques pour atteindre 2000+ mots
function BordeauxCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Bordeaux */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Wine className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Bordeaux : vin, tech et la belle endormie devenue <span className="text-sauge">métropole attractive</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Bordeaux n'est plus la ville endormie d'autrefois. Depuis l'arrivée de la <strong>LGV Paris-Bordeaux en 2017</strong> — qui a ramené la capitale à 2h — la métropole s'est transformée à une vitesse impressionnante. Afflux de Parisiens, délocalisation d'entreprises, explosion de l'immobilier : Bordeaux est désormais une <strong>métropole de 800 000 habitants</strong> en pleine effervescence, avec une croissance démographique de +12 % en 10 ans.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Un marché SEO dual : vin et tech</h4>
                                <p className="text-sm mb-0">
                                    Bordeaux est un cas unique en France : la région concentre <strong>7 000 châteaux viticoles</strong> avec des besoins en SEO e-commerce et international (EN/ZH), et en parallèle un écosystème tech dynamique — French Tech, aérospatial, fintech — qui exige du <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">SEO B2B</Link> et du content marketing. Les agences locales comprennent rarement les deux. Je m'y suis spécialisée.
                                </p>
                            </div>

                            <p>
                                L'oenotourisme représente <strong>6 millions de visiteurs par an</strong> : châteaux, dégustations, La Cité du Vin, les routes des vins. Ce flux génère une demande SEO massive en plusieurs langues. Côté tech, Darwin (écosystème alternatif et startups), la French Tech Bordeaux (aérospatial, e-commerce, fintech) et le projet <strong>Euratlantique</strong> — le plus grand projet urbain d'Europe sur 738 ha — attirent des entreprises de tout le pays.
                            </p>
                        </div>

                        {/* Stats Bordeaux */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">260 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 800 000)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">7 000</p>
                                <p className="text-xs text-soft">Châteaux viticoles</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">6 M</p>
                                <p className="text-xs text-soft">Visiteurs oenotourisme/an</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2h</p>
                                <p className="text-xs text-soft">De Paris en LGV</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Bordeaux</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            De Saint-Pierre au Bassin d'Arcachon, chaque zone bordelaise a ses spécificités SEO. J'adapte ma stratégie à votre localisation et à votre marché cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Saint-Pierre / Centre",
                                    type: "SEO tourisme & gastronomie",
                                    clients: "Restaurants, bars à vin, boutiques",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Chartrons",
                                    type: "SEO antiquités & tendance",
                                    clients: "Galeries, cavistes, concept stores",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Darwin / Bastide",
                                    type: "SEO startup & créatif",
                                    clients: "Coworking, économie circulaire",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Mériadeck / Euratlantique",
                                    type: "SEO corporate & services",
                                    clients: "Bureaux, banques, cabinets",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Michel",
                                    type: "SEO local populaire",
                                    clients: "Marché, commerces, artisans",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Pessac / Talence",
                                    type: "SEO étudiants & campus",
                                    clients: "Université, restaurants, services",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Mérignac / Aéroport",
                                    type: "SEO business & tech",
                                    clients: "Zones d'activités, ESN, aérospatial",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Émilion (40 min)",
                                    type: "SEO oenotourisme premium",
                                    clients: "Châteaux, dégustations, hôtels",
                                    icon: <Wine className="w-5 h-5" />
                                },
                                {
                                    zone: "Arcachon / Bassin (1h)",
                                    type: "SEO tourisme balnéaire",
                                    clients: "Ostréiculture, plages, restaurants",
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence bordelaise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Bordeaux a ses agences web et SEO. Elles facturent entre <strong>1 500€ et 6 000€/mois</strong> avec souvent un junior sur votre dossier et des interlocuteurs qui changent d'un trimestre à l'autre. Et surtout, très peu maîtrisent à la fois le SEO viticole (e-commerce, marchés internationaux EN/ZH) et le SEO tech B2B.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une expertise technique poussée et une spécialisation en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link>, essentielle à mesure que ChatGPT et Perplexity captent du trafic.
                                    </p>
                                    <p>
                                        Je connais l'écosystème bordelais dans ses deux dimensions : un château de Saint-Émilion qui veut vendre en direct à des clients chinois n'a pas les mêmes besoins qu'une startup Darwin qui cherche des leads B2B. Je ne sous-traite pas, je n'applique pas de grille générique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Stratégie adaptée à l'oenotourisme, aux domaines viticoles et au négoce bordelais",
                                        "SEO multilingue FR/EN pour capter le tourisme international (Saint-Émilion, Médoc)",
                                        "Optimisation Google Business Profile pour les commerces du centre historique",
                                        "Expertise SEO e-commerce pour les caves et producteurs en vente directe",
                                        "Connaissance de l'écosystème startup Euratlantique et Darwin",
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

            {/* Section Secteurs d'activité Bordeaux */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Bordeaux</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Vin & Oenotourisme", examples: "Châteaux, caves, dégustations", volume: "SEO e-commerce + international" },
                                { sector: "Tech & Startups", examples: "French Tech, SaaS, fintech", volume: "SEO B2B growth" },
                                { sector: "Immobilier & BTP", examples: "Promoteurs, agences, Euratlantique", volume: "SEO local compétitif" },
                                { sector: "Restauration & Gastronomie", examples: "Restaurants, traiteurs, food", volume: "SEO local prioritaire" },
                                { sector: "Commerce & Retail", examples: "Boutiques, enseignes, e-commerce", volume: "SEO e-commerce" },
                                { sector: "Tourisme & Culture", examples: "Hôtels, guides, Cité du Vin", volume: "SEO saisonnier" },
                                { sector: "Services aux entreprises", examples: "Cabinets, avocats, conseils", volume: "SEO local + autorité" },
                                { sector: "Aérospatial & Industrie", examples: "Sous-traitants, ESN, logistique", volume: "SEO B2B industriel" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">bordelaises</span>
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
                                        <td className="py-3 px-4">Château viticole (vente directe)</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Visibilité internationale « wine Bordeaux »</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant Saint-Pierre / centre</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup Darwin (B2B)</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu ciblé</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Agence immobilière</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 « appartement Bordeaux centre »</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Cave / caviste</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Google Maps + avis + réservations dégustations</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises bordelaises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-toulouse" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Toulouse (à 2h de Bordeaux)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-nantes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Nantes (façade Atlantique)
                                </Link>
                                <Link href="/blog/optimiser-fiche-gmb-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Optimiser votre fiche Google Business Profile
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Voler les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Demander un audit SEO gratuit à Bordeaux
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoBordeauxPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<BordeauxCustomContent />}
            />
        </>
    );
}
