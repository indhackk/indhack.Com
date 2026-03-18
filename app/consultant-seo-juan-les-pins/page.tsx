"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, MapPin, Users, CheckCircle2, ArrowRight, Utensils, Waves } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-juan-les-pins")!;

// Contenu personnalisé Juan-les-Pins - sections uniques pour atteindre 2000+ mots
function JuanLesPinsCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Juan-les-Pins */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Waves className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Juan-les-Pins : la <span className="text-sauge">saisonnalité au cœur du SEO</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Juan-les-Pins, c'est 15 000 habitants à l'année — et une population multipliée par dix chaque été. Ce paradoxe définit tout : <strong>75 % du chiffre d'affaires annuel se réalise entre juin et septembre</strong>. Les beach clubs, hôtels, restaurants et clubs de nightlife vivent ou meurent en quatre mois. Le SEO n'est pas une option, c'est une question de survie économique.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">La règle d'or du SEO saisonnier à Juan-les-Pins</h4>
                                <p className="text-sm mb-0">
                                    Pour être visible en <strong>juin, vous devez commencer à travailler en mars-avril</strong>. Google indexe et évalue les contenus sur plusieurs semaines. Si vous lancez votre SEO en mai, vous arrivez trop tard. Mon approche est de construire votre autorité en basse saison pour récolter les fruits dès l'ouverture estivale.
                                </p>
                            </div>

                            <p>
                                Juan-les-Pins est la <strong>deuxième destination clubbing de la Côte d'Azur</strong> après Saint-Tropez. Le festival <strong>Jazz à Juan</strong> — historique depuis 1960 — attire 70 000 visiteurs chaque juillet et génère une exposition médiatique nationale. Les plages privées emblématiques (Belles Rives, Bijou Plage) sont des marques à part entière. Cette réputation se traduit en volume de recherche élevé, mais aussi en concurrence SEO féroce entre établissements.
                            </p>
                        </div>

                        {/* Stats Juan-les-Pins */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">15 000</p>
                                <p className="text-xs text-soft">Habitants (x10 l'été)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">70 000</p>
                                <p className="text-xs text-soft">Visiteurs Jazz à Juan</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">75 %</p>
                                <p className="text-xs text-soft">Du CA en juin-septembre</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2ème</p>
                                <p className="text-xs text-soft">Clubbing Côte d'Azur</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Juan-les-Pins</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque zone de Juan-les-Pins a son profil de clientèle et ses requêtes Google propres. Ma stratégie SEO tient compte de ces micro-marchés.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Front de mer / Plages",
                                    type: "SEO plages privées & hôtellerie",
                                    clients: "Beach clubs, hôtels bord de mer, locations saisonnières",
                                    icon: <Waves className="w-5 h-5" />
                                },
                                {
                                    zone: "Pinède Gould",
                                    type: "SEO événementiel",
                                    clients: "Jazz à Juan, concerts, organisateurs d'événements",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Centre-ville",
                                    type: "SEO restaurants & nightlife",
                                    clients: "Restaurants, bars, clubs, brasseries",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Port Gallice",
                                    type: "SEO nautisme & loisirs mer",
                                    clients: "Location de bateaux, sports nautiques, excursions",
                                    icon: <Waves className="w-5 h-5" />
                                },
                                {
                                    zone: "Résidentiel",
                                    type: "SEO professions libérales",
                                    clients: "Médecins, kinés, avocats, experts-comptables",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Golfe-Juan (proche)",
                                    type: "SEO tourisme & restaurants",
                                    clients: "Restaurants de port, activités nautiques, commerce",
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

            {/* Section Saisonnalité - particularité clé */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            La saisonnalité : votre <span className="text-sauge">contrainte transformée en avantage</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        La majorité des établissements à Juan-les-Pins font la même erreur : ils pensent au SEO quand la saison arrive. En mai, ils cherchent un consultant. En juin, ils viennent juste d'être indexés. Résultat : ils ratent le pic.
                                    </p>
                                    <p>
                                        Mon calendrier est inverse. Je travaille avec vous de <strong>janvier à mars</strong> pour que votre site soit techniquement irréprochable, vos fiches Google optimisées et vos contenus saisonniers indexés. En avril-mai, nous activons le push final. En juin, vous récoltez.
                                    </p>
                                    <p>
                                        La basse saison n'est pas une période morte : c'est le meilleur moment pour construire l'autorité de votre domaine, créer du contenu de fond et obtenir des backlinks. Ce capital SEO se capitalise et se bonifie d'une année sur l'autre — contrairement à la pub payante qui s'arrête dès que vous coupez le budget.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Mon planning SEO saisonnier</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Janv-fév : audit technique et stratégie annuelle",
                                        "Mars-avril : contenus, fiches Google, netlinking",
                                        "Mai : push final et optimisations de conversion",
                                        "Juin-sept : monitoring, réactivité, ajustements",
                                        "Oct-nov : bilan de saison, capitalisation d'autorité",
                                        "Déc : stratégie N+1 et contenu hors-saison",
                                        "SEO bilingue FR/EN pour clientèle internationale",
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

            {/* Section Secteurs d'activité Juan-les-Pins */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Juan-les-Pins</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Beach clubs", examples: "Plages privées, clubs de jour, restauration", volume: "SEO saisonnier prioritaire" },
                                { sector: "Hôtellerie saisonnière", examples: "Hôtels, résidences, boutique hotels", volume: "SEO réservations directes" },
                                { sector: "Nightlife", examples: "Clubs, bars, soirées, DJ sets", volume: "SEO local + événementiel" },
                                { sector: "Restauration estivale", examples: "Restaurants, terrasses, food trucks", volume: "SEO Google Maps" },
                                { sector: "Location vacances", examples: "Villas, appartements, saisonniers", volume: "SEO vs Airbnb/Booking" },
                                { sector: "Nautisme", examples: "Location bateaux, jet-ski, plongée", volume: "SEO activités touristiques" },
                                { sector: "Événementiel", examples: "Jazz à Juan, festivals, concerts", volume: "SEO temporel & local" },
                                { sector: "Commerces saisonniers", examples: "Boutiques, services aux touristes", volume: "SEO de proximité" }
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
                            Résultats SEO attendus pour les établissements de <span className="text-sauge">Juan-les-Pins</span>
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-bold text-ink">Type de business</th>
                                        <th className="text-left py-3 px-4 font-bold text-ink">Début idéal</th>
                                        <th className="text-left py-3 px-4 font-bold text-ink">Objectif pour l'été</th>
                                    </tr>
                                </thead>
                                <tbody className="text-soft">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Beach club / restaurant de plage</td>
                                        <td className="py-3 px-4">Janvier-février</td>
                                        <td className="py-3 px-4">Top 3 Pack Local avant juin</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Hôtel saisonnier</td>
                                        <td className="py-3 px-4">Novembre-décembre</td>
                                        <td className="py-3 px-4">+40 % réservations directes (vs OTA)</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Club de nuit / bar événementiel</td>
                                        <td className="py-3 px-4">Mars-avril</td>
                                        <td className="py-3 px-4">Visibilité événementielle + fiche Google optimisée</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Location de vacances</td>
                                        <td className="py-3 px-4">Décembre-janvier</td>
                                        <td className="py-3 px-4">Trafic direct et réservations sans commission</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Activité nautique / sport de mer</td>
                                        <td className="py-3 px-4">Février-mars</td>
                                        <td className="py-3 px-4">Top 5 sur "activités Juan-les-Pins" + réservations</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-soft mt-4 italic">
                            * Le timing est critique à Juan-les-Pins. Commencer trop tard = rater l'été. L'<Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">audit SEO gratuit</Link> permet d'évaluer votre situation actuelle et le délai nécessaire avant la haute saison.
                        </p>
                    </div>
                </div>
            </section>

            {/* Liens internes contextuels */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les établissements de Juan-les-Pins</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Comment voler les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-antibes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Antibes (à 5 min)
                                </Link>
                                <Link href="/consultant-seo-cannes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Cannes (à 15 min)
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoJuanLesPinsPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<JuanLesPinsCustomContent />}
            />
        </>
    );
}
