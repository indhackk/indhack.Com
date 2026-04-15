"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, FlaskConical } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-toulouse")!;

// Contenu personnalisé Toulouse - sections uniques pour atteindre 2000+ mots
function ToulouseCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Toulouse */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Toulouse : capitale aéronautique et <span className="text-sauge">SEO B2B industriel</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Toulouse n'est pas une ville ordinaire — c'est la <strong>capitale mondiale de l'aéronautique</strong>. Entre Airbus (25 000 employés sur le seul site de Blagnac), Thales Alenia Space, ATR et Safran, la métropole toulousaine abrite une chaîne de valeur industrielle sans équivalent en France. Cette concentration crée un marché SEO B2B unique, avec ses propres codes, ses cycles de décision longs et ses exigences de contenu technique.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Toulouse a besoin d'une consultante SEO locale</h4>
                                <p className="text-sm mb-0">
                                    Les recherches sur Toulouse sont <strong>hyper-segmentées</strong> : "sous-traitant aéronautique Blagnac", "ESN Labège recrutement", "restaurant Capitole Toulouse"… Une stratégie SEO nationale ne capture pas ces requêtes. Je connais personnellement la dualité de l'écosystème toulousain — B2B industriel d'un côté, vie étudiante et commerciale de l'autre — et j'adapte ma stratégie aux comportements de recherche locaux, pas aux templates génériques.
                                </p>
                            </div>

                            <p>
                                Toulouse concentre également <strong>130 000 étudiants</strong> (3ème ville étudiante de France), une scène tech en plein essor autour de la French Tech Toulouse (IA, spatial, drone), et un cœur touristique animé autour du Capitole. Chaque segment demande une approche SEO radicalement différente : vocabulaire technique pour les sous-traitants aéro, SEO local pour les restaurateurs, contenu de recrutement pour les ESN de Labège.
                            </p>
                        </div>

                        {/* Stats Toulouse */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">490 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 800 000)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">25 000</p>
                                <p className="text-xs text-soft">Emplois Airbus</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">130 000</p>
                                <p className="text-xs text-soft">Étudiants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">800+</p>
                                <p className="text-xs text-soft">Sous-traitants aéro</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Toulouse</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Toulouse et de sa métropole a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation et de votre cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Capitole / Centre",
                                    type: "SEO tourisme & commerce",
                                    clients: "Restaurants, boutiques, hôtels",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Blagnac / Aéroconstellation",
                                    type: "SEO aéronautique B2B",
                                    clients: "Airbus, sous-traitants supply chain",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Colomiers",
                                    type: "SEO industrie & services",
                                    clients: "PME, artisans, zones d'activités",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Labège / Innopole",
                                    type: "SEO tech & startup",
                                    clients: "Incubateurs, ESN, éditeurs logiciels",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Cyprien",
                                    type: "SEO local & vie nocturne",
                                    clients: "Restaurants, bars, galeries d'art",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Rangueil / Université",
                                    type: "SEO étudiants & santé",
                                    clients: "CHU, campus, professions médicales",
                                    icon: <FlaskConical className="w-5 h-5" />
                                },
                                {
                                    zone: "Compans-Caffarelli",
                                    type: "SEO corporate",
                                    clients: "Bureaux, services B2B, sièges sociaux",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Ramonville / Castanet",
                                    type: "SEO spatial & recherche",
                                    clients: "CNES, CNRS, laboratoires R&D",
                                    icon: <FlaskConical className="w-5 h-5" />
                                },
                                {
                                    zone: "Balma / L'Union",
                                    type: "SEO résidentiel & commerce",
                                    clients: "Commerces, services de proximité",
                                    icon: <Users className="w-5 h-5" />
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO freelance</span> plutôt qu'une agence toulousaine ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Toulouse présente un double marché unique : le <strong>B2B aéronautique</strong>, avec ses cycles de décision longs, ses RFP complexes et son contenu ultra-technique, et le <strong>B2C local</strong>, avec ses restaurants étudiants, ses bars de Saint-Cyprien et ses commerces du Capitole. Les agences généralistes ne comprennent ni l'un ni l'autre.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO freelance</Link> avec une expertise en SEO B2B industriel et en <Link href="/seo-local" className="text-sauge hover:underline">SEO local</Link>. Je produis du contenu qui parle aux acheteurs d'Airbus autant qu'aux Toulousains qui cherchent où dîner ce soir.
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je n'applique pas de grille générique, et je vous accompagne personnellement du diagnostic à la croissance — avec une connaissance fine des spécificités de l'écosystème toulousain.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Stratégie SEO B2B adaptée aux sous-traitants aéronautiques et ESN",
                                        "Contenu technique pour cycles de décision longs (Airbus, Thales, Safran)",
                                        "SEO local pour les commerces du Capitole et de la Ville Rose",
                                        "Expertise SEO campus et recrutement (130 000 étudiants à capter)",
                                        "Accompagnement GEO pour être cité par ChatGPT sur les requêtes aéro",
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

            {/* Section Secteurs d'activité Toulouse */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Toulouse</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Aéronautique & Spatial", examples: "Sous-traitants, équipementiers, bureau d'études", volume: "SEO B2B technique" },
                                { sector: "ESN & Logiciel", examples: "Développeurs, intégrateurs, éditeurs SaaS", volume: "SEO B2B recrutement" },
                                { sector: "Sous-traitance industrielle", examples: "Mécanique, composite, électronique embarquée", volume: "SEO B2B supply chain" },
                                { sector: "Restauration & Gastronomie", examples: "Restaurants, brasseries, food trucks", volume: "SEO local prioritaire" },
                                { sector: "Santé & Recherche", examples: "CHU, cliniques, laboratoires", volume: "SEO YMYL & autorité" },
                                { sector: "Commerce & Retail", examples: "Boutiques centre-ville, e-commerce local", volume: "SEO local + e-commerce" },
                                { sector: "Tourisme & Culture", examples: "Hôtels, Cité de l'Espace, musées", volume: "SEO saisonnier" },
                                { sector: "Formation & Éducation", examples: "Écoles d'ingénieurs, universités, centres", volume: "SEO informationnel" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">toulousaines</span>
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
                                        <td className="py-3 px-4">Sous-traitant aéronautique</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Visibilité supply chain Airbus + leads RFP</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant Capitole / centre-ville</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">ESN Labège (recrutement)</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+200% leads recrutement qualifiés</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup IA / French Tech</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Autorité thématique sur la niche</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Commerce Saint-Cyprien</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Google Maps optimisé + gestion avis</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises toulousaines</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps en 2026
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-bordeaux" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Bordeaux (à 2h de Toulouse)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-montpellier" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Montpellier (Occitanie)
                                </Link>
                                <Link href="/blog/optimiser-fiche-gmb-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Optimiser votre fiche Google Business Profile
                                </Link>
                                <Link href="/blog/programmatic-seo-50-pages-locales" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Programmatic SEO : créer des pages locales efficaces
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Demander un audit SEO gratuit à Toulouse
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoToulousePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<ToulouseCustomContent />}
            />
        </>
    );
}
