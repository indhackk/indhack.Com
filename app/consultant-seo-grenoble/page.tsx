"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Mountain, Cpu, MapPin, Users, CheckCircle2, ArrowRight } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-grenoble")!;

// Contenu personnalisé Grenoble - sections uniques pour atteindre 2000+ mots
function GrenobleCustomContent() {
    return (
        <>
            {/* Section Écosystème Tech Grenoble */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                L'écosystème tech de <span className="text-sauge">Grenoble</span> : un marché SEO unique
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Grenoble n'est pas une ville comme les autres pour le SEO. Le <strong>pôle scientifique</strong> (CEA-Leti, CNRS, ESRF, ILL) génère une densité unique d'entreprises B2B tech qui ont des besoins SEO très spécifiques : cycles de vente longs, contenus techniques pointus, vocabulaire de niche. Les startups de la <strong>Presqu'île scientifique</strong> (Minatec, Giant) ont besoin de visibilité sur des requêtes ultra-qualifiées.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Double économie = double expertise SEO</h4>
                                <p className="text-sm mb-0">
                                    Le <strong>tourisme de montagne</strong> (Chamrousse, Les 2 Alpes, l'Alpe d'Huez accessibles en 1h) crée une saisonnalité forte que votre stratégie SEO doit anticiper. Les recherches "station ski + nom" explosent de novembre à mars — c'est le moment de capter ce trafic. Cette double économie tech + montagne demande un consultant SEO qui comprend les deux univers. Pas une agence parisienne qui applique la même recette partout.
                                </p>
                            </div>

                            <p>
                                En tant que <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO spécialisée</Link> dans les marchés tech et B2B, je maîtrise les problématiques spécifiques des entreprises grenobloises : <strong>SEO technique avancé</strong> pour les sites applicatifs, <strong>content marketing B2B</strong> pour les cycles de vente longs, et <strong>SEO local</strong> pour capter les requêtes géolocalisées qui convertissent.
                            </p>
                        </div>

                        {/* Stats Grenoble */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2 500+</p>
                                <p className="text-xs text-soft">Entreprises tech</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">40 000</p>
                                <p className="text-xs text-soft">Emplois innovation</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">7 M</p>
                                <p className="text-xs text-soft">Touristes/an stations</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">160 000</p>
                                <p className="text-xs text-soft">Habitants Grenoble</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Quartiers et zones d'intervention détaillée */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Quartiers et zones d'intervention à <span className="text-sauge">Grenoble</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de l'agglomération grenobloise a ses spécificités SEO. Je connais le terrain et j'adapte ma stratégie en fonction de votre localisation et de votre cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Presqu'île scientifique / Giant",
                                    type: "SEO B2B technique",
                                    clients: "Startups deeptech, labos, éditeurs logiciel",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Centre-ville / Hyper-centre",
                                    type: "SEO local + Google Maps",
                                    clients: "Commerces, restaurants, artisans",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Europole / Gare",
                                    type: "SEO corporate",
                                    clients: "Entreprises de services, cabinets conseil",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Meylan / Inovallée",
                                    type: "SEO SaaS / Tech",
                                    clients: "Entreprises tech, éditeurs logiciel, ESN",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Échirolles / Villeneuve",
                                    type: "SEO B2B classique",
                                    clients: "PME industrielles, sous-traitants",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Martin-d'Hères",
                                    type: "SEO local",
                                    clients: "Campus universitaire, commerces étudiants",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Fontaine / Seyssinet",
                                    type: "SEO local fort",
                                    clients: "Artisans BTP, services à la personne",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Stations de ski (1h)",
                                    type: "SEO tourisme",
                                    clients: "Hébergeurs, moniteurs, commerces montagne",
                                    icon: <Mountain className="w-5 h-5" />
                                },
                                {
                                    zone: "Voiron / Pays Voironnais",
                                    type: "SEO PME",
                                    clients: "Industries, commerces, services",
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

            {/* Section Pourquoi pas une agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence à Grenoble ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Les <strong>agences SEO classiques à Grenoble</strong> facturent entre 1 500€ et 5 000€/mois pour des prestations standardisées. Elles appliquent les mêmes grilles d'audit à un restaurant du centre-ville et à une startup de Minatec — deux business aux besoins radicalement différents.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link>, spécialisée dans la <strong>performance web</strong> (mon site tourne sur Next.js avec un score PageSpeed de 95+/100) et la <strong>visibilité IA</strong> (<Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">GEO - Generative Engine Optimization</Link>).
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je ne facture pas de frais d'agence, et je connais personnellement l'écosystème <strong>Auvergne-Rhône-Alpes</strong>. Résultat : des tarifs 30 à 50% inférieurs aux agences pour une expertise plus pointue.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Stratégie deeptech adaptée à Giant, Minatec et CEA Grenoble",
                                        "SEO B2B pour startups hardware, medtech et cleantech iséroises",
                                        "Expertise SEO montagne et tourisme hivernal (stations, résidences)",
                                        "SEO local pour les commerces et professions libérales du centre",
                                        "Contenu technique pour cycles de décision longs en R&D et innovation",
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

            {/* Section Secteurs d'activité Grenoble */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Grenoble</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Deeptech & Startups", examples: "IA, IoT, cleantech, biotech", volume: "Requêtes B2B haute intention" },
                                { sector: "Tourisme montagne", examples: "Stations, hébergeurs, moniteurs", volume: "Saisonnalité nov-mars" },
                                { sector: "Industrie & BTP", examples: "Sous-traitants, équipementiers", volume: "SEO B2B industriel" },
                                { sector: "Services & Commerce", examples: "Restaurants, artisans, médecins", volume: "SEO local prioritaire" },
                                { sector: "Recherche & Formation", examples: "Labos, écoles, universités", volume: "Contenus techniques" },
                                { sector: "Outdoor & Sport", examples: "Équipementiers, guides, magasins", volume: "SEO e-commerce" },
                                { sector: "Santé & Bien-être", examples: "Cliniques, praticiens, coachs", volume: "SEO local YMYL" },
                                { sector: "ESN & Conseil", examples: "SSII, cabinets, consultants", volume: "SEO B2B services" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">grenobloises</span>
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
                                        <td className="py-3 px-4">Commerce local (restaurant, artisan)</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Visibilité Pack Local et trafic qualifié</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup tech B2B</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu ciblé</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Hébergeur station ski</td>
                                        <td className="py-3 px-4">2-3 mois (avant saison)</td>
                                        <td className="py-3 px-4">Page 1 sur requêtes station</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet conseil / ESN</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Autorité thématique + leads</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">E-commerce outdoor</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Trafic organique qualifié</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises grenobloises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-lyon" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Lyon (à 1h de Grenoble)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-marseille" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Marseille (axe sud)
                                </Link>
                                <Link href="/blog/google-business-profile-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide complet Google Business Profile 2026
                                </Link>
                                <Link href="/blog/optimiser-fiche-gmb-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Optimiser votre fiche Google Business Profile
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Demander un audit SEO gratuit à Grenoble
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoGrenoblePage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<GrenobleCustomContent />}
            />
        </>
    );
}
