"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Anchor, Gem, MapPin, Globe, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-monaco")!;

// Contenu personnalisé Monaco - sections uniques pour atteindre 2000+ mots
function MonacoCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Monaco */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Monaco : 2 km² de puissance économique et de <span className="text-sauge">SEO ultra-ciblé</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Monaco n'est pas une ville comme les autres — c'est une <strong>place financière mondiale de 2 km²</strong>. Avec le PIB par habitant le plus élevé au monde, plus de 130 banques et sociétés de gestion de patrimoine, et une clientèle UHNWI (ultra-high-net-worth individuals) exigeant l'excellence absolue, le SEO à Monaco demande une expertise radicalement différente du reste de la Côte d'Azur.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Monaco exige un SEO multilingue spécialisé</h4>
                                <p className="text-sm mb-0">
                                    60 % des recherches à Monaco se font en anglais, 20 % en français, 10 % en russe ou en italien. Une stratégie SEO franco-française laisse de côté les trois quarts du marché. Je déploie des stratégies <strong>multilingues FR/EN/RU/IT</strong>, avec une compréhension fine du marché UHNWI, de la discrétion attendue et de la réputation en ligne — critique dans ce milieu. Les agences monégasques facturent 5 000–15 000 €/mois pour ce type de prestation ; mon expertise apporte les mêmes résultats à un coût structurellement inférieur.
                                </p>
                            </div>

                            <p>
                                L'agenda monégasque structure la saisonnalité SEO : le <strong>Grand Prix de Formule 1</strong> en mai, le <strong>Monaco Yacht Show</strong> en septembre, les sommets financiers et les événements de la Croix-Rouge drainent chaque année une audience internationale ultra-qualifiée. Anticiper ces pics par des contenus et des mots-clés ciblés transforme ces fenêtres d'exposition en flux de leads continus. Family offices, single family offices, immobilier à 50 000 €/m² — chaque segment demande un vocabulaire, une intention de recherche et une autorité thématique distincts.
                            </p>
                        </div>

                        {/* Stats Monaco */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">39 000</p>
                                <p className="text-xs text-soft">Habitants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">130+</p>
                                <p className="text-xs text-soft">Banques & sociétés de gestion</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">50 000 €</p>
                                <p className="text-xs text-soft">Prix moyen/m² (1er mondial)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">PIB/hab n°1</p>
                                <p className="text-xs text-soft">Mondial</p>
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
                                Zones d'intervention à <span className="text-sauge">Monaco</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de la Principauté concentre un marché distinct. J'adapte la stratégie SEO à votre localisation et à votre clientèle cible — locale, nationale ou internationale.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Monte-Carlo / Carré d'Or",
                                    type: "SEO finance & luxe",
                                    clients: "Banques privées, joailliers, hôtels de prestige",
                                    icon: <Gem className="w-5 h-5" />
                                },
                                {
                                    zone: "Port Hercule",
                                    type: "SEO yachting & nautisme",
                                    clients: "Brokers, charters, Yacht Show",
                                    icon: <Anchor className="w-5 h-5" />
                                },
                                {
                                    zone: "La Condamine",
                                    type: "SEO commerce & services",
                                    clients: "Marché, restaurants, boutiques de proximité",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Fontvieille",
                                    type: "SEO corporate & industrie",
                                    clients: "Sièges sociaux, logistique, holdings",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Larvotto",
                                    type: "SEO hôtellerie & beach clubs",
                                    clients: "Plages privées, restaurants vue mer, résidences",
                                    icon: <Globe className="w-5 h-5" />
                                },
                                {
                                    zone: "Le Rocher",
                                    type: "SEO institutionnel & tourisme",
                                    clients: "Musées, restaurants panoramiques, artisans",
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence monégasque ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Monaco compte des agences web et SEO qui facturent entre <strong>5 000 € et 15 000 €/mois</strong>, souvent avec un positionnement "luxe" qui gonfle les prix sans nécessairement gonfler les résultats. La discrétion — valeur cardinale dans cet écosystème — est rarement au rendez-vous dans des structures à dix consultants.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> spécialisée dans les marchés premium. Je maîtrise le SEO multilingue, les stratégies de réputation en ligne pour les profils UHNWI, et la <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> — cruciale quand vos clients cherchent via ChatGPT ou Perplexity.
                                    </p>
                                    <p>
                                        Je comprends que dans le marché monégasque, un lead vaut dix fois plus qu'ailleurs. Ma stratégie n'optimise pas le volume — elle optimise la <strong>qualité et la discrétion</strong> des signaux envoyés aux profils les plus exigeants.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "SEO multilingue FR/EN/RU/IT natif",
                                        "Stratégie adaptée au marché UHNWI",
                                        "Réputation en ligne et e-réputation premium",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
                                        "Tarifs 40-60 % inférieurs aux agences locales",
                                        "Discrétion totale — NDA disponible sur demande"
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

            {/* Section Secteurs d'activité Monaco */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs accompagnés à <span className="text-sauge-light">Monaco</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Gestion de patrimoine & Family offices", examples: "Single family offices, multi-FO", volume: "SEO UHNWI discret" },
                                { sector: "Banques privées & Finance", examples: "Private banking, asset management", volume: "SEO B2B autorité" },
                                { sector: "Immobilier prestige", examples: "Agences, promoteurs, notaires", volume: "SEO local premium" },
                                { sector: "Yachting & Nautisme", examples: "Brokers, charters, maintenance", volume: "SEO international EN" },
                                { sector: "Joaillerie & Horlogerie", examples: "Maisons, ateliers, revendeurs", volume: "SEO luxe + e-rep" },
                                { sector: "Hôtellerie ultra-luxe", examples: "Palace, résidences privées", volume: "SEO saisonnier" },
                                { sector: "Services juridiques & Fiscalité", examples: "Avocats, fiduciaires, family law", volume: "SEO B2B technique" },
                                { sector: "Conciergerie & Services premium", examples: "Lifestyle management, jet, yacht", volume: "SEO niche HNWI" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">monégasques</span>
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
                                        <td className="py-3 px-4">Family office / gestion de patrimoine</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Autorité thématique + leads UHNWI</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Banque privée</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Visibilité sur "wealth management Monaco"</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Agent immobilier prestige</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 sur "appartement Monaco"</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant Monte-Carlo</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 local + visibilité touristes</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Yacht broker</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads internationaux qualifiés</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises monégasques</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-nice" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Nice (30 min de Monaco)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-cannes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Cannes (à 35 min)
                                </Link>
                                <Link href="/outils/testeur-visibilite-ia" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testeur de visibilité IA (ChatGPT, Perplexity)
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Comment capter les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoMonacoPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<MonacoCustomContent />}
            />
        </>
    );
}
