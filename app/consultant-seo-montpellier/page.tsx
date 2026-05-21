"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, FlaskConical } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-montpellier")!;

// Contenu personnalisé Montpellier - sections uniques pour atteindre 2000+ mots
function MontpellierCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Montpellier */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Montpellier : croissance record, santé d'excellence et <span className="text-sauge">dynamisme startup</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Montpellier n'est pas une ville qui stagne — c'est la ville française à la <strong>croissance démographique la plus forte de France</strong>. Avec 290 000 habitants et une attractivité qui ne se dément pas, elle réunit un marché en pleine expansion, une scène médicale d'exception (la plus ancienne faculté de médecine d'Europe, fondée en 1220) et un dynamisme startup porté par la French Tech locale (MedTech, AgriTech, gaming).
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Montpellier a besoin d'une consultante SEO locale</h4>
                                <p className="text-sm mb-0">
                                    Les recherches sur Montpellier sont <strong>multi-marchés</strong> : "dermatologue Montpellier", "appartement neuf Port Marianne", "restaurant Écusson", "plage Palavas-les-Flots"… Une stratégie SEO nationale rate ces spécificités. Je connais la double dimension de Montpellier — urbaine et balnéaire — et j'adapte ma stratégie aux comportements de recherche locaux, pas aux templates génériques.
                                </p>
                            </div>

                            <p>
                                Montpellier concentre également <strong>70 000 étudiants</strong>, ce qui en fait la 1ère ville étudiante de France en proportion de sa population. Ce poids estudiantin crée une demande spécifique, des habitudes de recherche mobile-first et une économie de services très active. À 10 km de la mer, la ville rayonne sur un double bassin économique urbain et balnéaire, unique en France métropolitaine.
                            </p>
                        </div>

                        {/* Stats Montpellier */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">290 000</p>
                                <p className="text-xs text-soft">Habitants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">70 000</p>
                                <p className="text-xs text-soft">Étudiants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">N°1</p>
                                <p className="text-xs text-soft">Croissance démographique FR</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1220</p>
                                <p className="text-xs text-soft">Fondation faculté médecine</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Montpellier</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Montpellier et de son agglomération a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation et de votre cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Écusson / Centre historique",
                                    type: "SEO commerce & tourisme",
                                    clients: "Boutiques, restaurants, galeries",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Antigone / Odysseum",
                                    type: "SEO retail & loisirs",
                                    clients: "Centre commercial, cinéma, restaurants",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Millénaire / Odysseum",
                                    type: "SEO grande distribution & e-commerce",
                                    clients: "Enseignes, pure players, grandes surfaces",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Hôpitaux / Facultés",
                                    type: "SEO santé & YMYL",
                                    clients: "Médecins, cliniques, paramédicaux",
                                    icon: <FlaskConical className="w-5 h-5" />
                                },
                                {
                                    zone: "Port Marianne",
                                    type: "SEO premium résidentiel",
                                    clients: "Immobilier neuf, services haut de gamme",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Castelnau-le-Lez",
                                    type: "SEO local & services",
                                    clients: "Commerces, professions libérales",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Lattes / Pérols",
                                    type: "SEO balnéaire & commerce",
                                    clients: "Plages, zones commerciales, tourisme",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Jean-de-Védas",
                                    type: "SEO zones d'activités",
                                    clients: "Entreprises, logistique, artisans",
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence montpelliéraine ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Montpellier compte de nombreuses agences web, souvent généralistes. Elles facturent entre <strong>1 500€ et 5 000€/mois</strong> avec fréquemment un junior affecté à votre dossier et des interlocuteurs qui changent. Résultat : une stratégie copiée-collée qui ignore la dualité montpelliéraine — ville étudiante et pôle médical de rang mondial d'un côté, destination balnéaire de l'autre.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une expertise en <Link href="/seo-local" className="text-sauge hover:underline">SEO local</Link> et en contenu médical YMYL. Je sais qu'un cabinet médical sur le quartier des hôpitaux n'a pas les mêmes enjeux qu'une startup AgriTech ou qu'un restaurant de l'Écusson.
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je n'applique pas de grille générique, et je vous accompagne personnellement — avec une lecture précise des spécificités montpelliéraines et de sa croissance accélérée.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Stratégie personnalisée à votre marché montpelliérain",
                                        "Expertise contenu médical & YMYL (santé, droit)",
                                        "Reporting mensuel clair avec KPIs business",
                                        "Expertise Core Web Vitals et SEO technique",
                                        "Tarifs 30-50% inférieurs aux agences",
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

            {/* Section Secteurs d'activité Montpellier */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Montpellier</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Santé & Médical", examples: "Médecins, cliniques, spécialistes", volume: "SEO YMYL & autorité" },
                                { sector: "Biotech & MedTech", examples: "Startups santé, dispositifs médicaux", volume: "SEO B2B spécialisé" },
                                { sector: "Commerce centre-ville", examples: "Boutiques Écusson, marchés, artisans", volume: "SEO local prioritaire" },
                                { sector: "Tourisme & Balnéaire", examples: "Hôtels, locations, activités mer", volume: "SEO saisonnier" },
                                { sector: "Formation & Éducation", examples: "Universités, écoles, centres de langues", volume: "SEO informationnel" },
                                { sector: "Immobilier neuf", examples: "Promoteurs, agents, programmes neufs", volume: "SEO local premium" },
                                { sector: "Restauration", examples: "Restaurants, bistrots, food trucks", volume: "SEO Google Maps" },
                                { sector: "AgriTech & Viticulture", examples: "Domaines viticoles, coopératives, agritech", volume: "SEO niche & contenu" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">montpelliéraines</span>
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
                                        <td className="py-3 px-4">Cabinet médical / spécialiste</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 + autorité YMYL renforcée</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant Écusson / centre-ville</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Promoteur immobilier</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés pour programmes neufs</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup MedTech / AgriTech</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Autorité thématique sur la niche</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Hôtel / hébergement balnéaire</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Réservations directes hors OTA</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises montpelliéraines</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/blog/audit-seo-approfondi-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Pourquoi réaliser un audit SEO avant toute stratégie
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-toulouse" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Toulouse (à 2h de Montpellier)
                                </Link>
                                <Link href="/blog/google-business-profile-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide complet Google Business Profile 2026
                                </Link>
                                <Link href="/creation-site-web" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Création de site web performant pour le SEO
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

export default function SeoMontpellierPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<MontpellierCustomContent />}
            />
        </>
    );
}
