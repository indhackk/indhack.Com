"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, ShoppingCart } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-lille")!;

// Contenu personnalisé Lille - sections uniques pour atteindre 2000+ mots
function LilleCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Lille */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Lille : carrefour européen, e-commerce et <span className="text-sauge">commerce transfrontalier</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Lille n'est pas qu'une métropole régionale — c'est la <strong>capitale française du e-commerce</strong>. OVH, Showroomprivé, Auchan.fr, Decathlon, Kiabi : les plus grandes enseignes et plateformes numériques hexagonales ont leur siège dans la Métropole Européenne de Lille. Cette concentration unique crée un écosystème SEO à nulle autre pareille en France.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Lille a besoin d'une consultante SEO locale</h4>
                                <p className="text-sm mb-0">
                                    Lille est à <strong>1 heure de Paris, Londres et Bruxelles</strong> en train. Cette position crée des opportunités SEO transfrontalières : cibler des clients belges et britanniques depuis Lille demande une stratégie multilingue, géolocalisée et cohérente avec les comportements de recherche locaux.
                                </p>
                            </div>

                            <p>
                                La MEL concentre des <strong>filières d'excellence</strong> : l'e-commerce et la grande distribution (sièges d'Auchan, Decathlon, Kiabi, La Redoute), la tech (OVH à Roubaix, Euratechnologies), le textile en reconversion numérique, et une gastronomie reconnue. La Braderie de Lille — plus grand marché aux puces d'Europe avec 2 millions de visiteurs — illustre à elle seule la puissance commerciale et touristique de cette métropole. Euralille est le 3ème quartier d'affaires de France. Chaque secteur demande une expertise SEO adaptée.
                            </p>
                        </div>

                        {/* Stats Lille */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">235 000</p>
                                <p className="text-xs text-soft">Habitants (MEL 1,2M)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">Capitale</p>
                                <p className="text-xs text-soft">e-commerce FR</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2 M</p>
                                <p className="text-xs text-soft">Visiteurs Braderie/an</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1h</p>
                                <p className="text-xs text-soft">Paris / Londres / Bruxelles</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Lille</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Lille et de sa métropole a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation et de votre cible, de Vieux-Lille au marché transfrontalier belge.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Vieux-Lille",
                                    type: "SEO premium & gastronomie",
                                    clients: "Restaurants étoilés, boutiques luxe, immobilier",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Euralille",
                                    type: "SEO corporate & B2B",
                                    clients: "Sièges sociaux, banques, conseil",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Roubaix",
                                    type: "SEO e-commerce & tech",
                                    clients: "OVH, La Redoute, startups",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Tourcoing",
                                    type: "SEO industrie & artisanat",
                                    clients: "Textile, reconversion numérique",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Villeneuve-d'Ascq",
                                    type: "SEO campus & tech",
                                    clients: "Université, Decathlon, zones d'activités",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Marcq-en-Barœul",
                                    type: "SEO résidentiel premium",
                                    clients: "Services haut de gamme, professions libérales",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Wasquehal / Croix",
                                    type: "SEO PME & commerce local",
                                    clients: "Commerces de proximité, PME",
                                    icon: <ShoppingCart className="w-5 h-5" />
                                },
                                {
                                    zone: "Belgique / Mouscron",
                                    type: "SEO transfrontalier FR/BE",
                                    clients: "Commerce cross-border, services",
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

            {/* Section Pourquoi indépendante vs agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi travailler avec une <span className="text-sauge">consultante SEO</span> sur le marché de Lille ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Lille est un marché fort pour l'e-commerce, le retail et les requêtes transfrontalières. Optimiser des fiches produit à l'échelle, gérer le crawl budget d'un catalogue de 50 000 références, cibler simultanément des clients en France et en Belgique : la stratégie doit mêler SEO technique, contenu et logique commerciale.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO</Link> spécialisée en SEO e-commerce, avec une expertise en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> et en SEO international FR/BE/UK. Je connais les spécificités du marché lillois : requêtes transfrontalières, saisonnalité autour de la Braderie, comportements de recherche spécifiques à la MEL.
                                    </p>
                                    <p>
                                        Le cadrage reste personnalisé, avec une lecture directe de votre marché du diagnostic à la croissance organique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique, avec une lecture senior du SEO",
                                        "Diagnostic technique intégré au cadrage",
                                        "Expertise SEO e-commerce (OVH, Decathlon, La Redoute sont nés ici)",
                                        "SEO transfrontalier FR/BE/NL pour capter le marché Benelux",
                                        "Stratégie retail et grande distribution adaptée au Nord",
                                        "SEO local pour les commerces du Vieux-Lille et de la Grand'Place",
                                        "Optimisation logistique et supply chain (Rungis du Nord)",
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

            {/* Section Secteurs d'activité Lille */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Lille</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "E-commerce & Marketplaces", examples: "Pure players, retailers, catalogues", volume: "SEO e-commerce avancé" },
                                { sector: "Grande distribution & Retail", examples: "Auchan, Decathlon, enseignes", volume: "SEO national + local" },
                                { sector: "Commerce transfrontalier", examples: "Grossistes, importateurs FR/BE", volume: "SEO international" },
                                { sector: "Restauration & Gastronomie", examples: "Restaurants, brasseries, Vieux-Lille", volume: "SEO local prioritaire" },
                                { sector: "Immobilier & BTP", examples: "Agences, promoteurs, artisans", volume: "SEO local + autorité" },
                                { sector: "Logistique & Supply chain", examples: "Transporteurs, entrepôts, 3PL", volume: "SEO B2B industriel" },
                                { sector: "Industrie textile", examples: "Marques, façonniers, reconversion", volume: "SEO B2B & e-commerce" },
                                { sector: "Tech & Data (OVH)", examples: "SaaS, hébergeurs, Euratechnologies", volume: "SEO B2B technique" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">lilloises</span>
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
                                        <td className="py-3 px-4">E-commerce mode & textile</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Trafic organique qualifié</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant Vieux-Lille</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Visibilité Google Maps + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Grossiste transfrontalier FR/BE</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Visibilité France + Belgique</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup Euratechnologies</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu ciblé</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Commerce centre-ville</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Google Maps dominant + avis</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises lilloises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-paris" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Paris (TGV 1h de Lille)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-strasbourg" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Strasbourg (axe nord-est)
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Voler les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/blog/google-business-profile-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide complet Google Business Profile 2026
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Demander un audit SEO gratuit à Lille
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoLillePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<LilleCustomContent />}
            />
        </>
    );
}
