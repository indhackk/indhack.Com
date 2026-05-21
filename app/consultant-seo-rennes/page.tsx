"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Cpu, MapPin, Users, CheckCircle2, ArrowRight, FlaskConical, Shield } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-rennes")!;

// Contenu personnalisé Rennes - sections uniques pour atteindre 2000+ mots
function RennesCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Rennes */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Rennes : capitale tech bretonne et pôle <span className="text-sauge">cybersécurité</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Rennes n'est pas qu'une ville étudiante animée — c'est la <strong>capitale technologique de l'Ouest de la France</strong>. Entre Cesson-Sévigné (surnommée la "Silicon Valley bretonne"), le pôle d'excellence cyber et un écosystème agroalimentaire qui pèse à l'échelle européenne, chaque secteur rennais a ses propres enjeux de visibilité sur Google.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Rennes a besoin d'une consultante SEO locale</h4>
                                <p className="text-sm mb-0">
                                    Les recherches sur Rennes sont <strong>très segmentées</strong> : "ESN Cesson-Sévigné", "startup cybersécurité Rennes", "fournisseur agroalimentaire Bretagne"... Une stratégie SEO générique ne capture pas ces requêtes. Je connais l'écosystème breton et je parle le même langage que les ESN, les équipes cyber et les industriels de la filière agro. Pas de jargon marketing creux.
                                </p>
                            </div>

                            <p>
                                Rennes concentre des <strong>filières d'excellence uniques en France</strong> : la cybersécurité (DGA Maîtrise de l'Information, Orange Cyberdefense, pôle d'excellence cyber), l'agrotech (premier pôle agroalimentaire d'Europe avec Lactalis, Yoplait, Noyal), et une French Tech Rennes Saint-Malo labellisée. Avec 70 000 étudiants et les laboratoires IRISA/INRIA, le tissu de startups et de PME innovantes est parmi les plus denses de France. À 1h25 de Paris en TGV, Rennes combine attractivité locale et rayonnement national.
                            </p>
                        </div>

                        {/* Stats Rennes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">220 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 460 000)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">70 000</p>
                                <p className="text-xs text-soft">Étudiants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">Pôle #1</p>
                                <p className="text-xs text-soft">Cyber FR</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1er EU</p>
                                <p className="text-xs text-soft">Pôle agroalimentaire</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Rennes</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Rennes et de sa métropole a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation et de votre cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Centre / République",
                                    type: "SEO commerce & services",
                                    clients: "Boutiques, restaurants, cafés",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Cesson-Sévigné / ViaSilva",
                                    type: "SEO tech & ESN",
                                    clients: "Orange, Sopra, éditeurs logiciels",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Beaulieu",
                                    type: "SEO campus & recherche",
                                    clients: "Université, startups, incubateurs",
                                    icon: <FlaskConical className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Grégoire",
                                    type: "SEO corporate & tertiaire",
                                    clients: "Zones de bureaux, sièges sociaux",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Thabor / Saint-Hélier",
                                    type: "SEO professions libérales",
                                    clients: "Avocats, architectes, cabinets premium",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Chantepie / Vern",
                                    type: "SEO résidentiel & commerce local",
                                    clients: "Services de proximité, artisans",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Cleunay / Arsenal",
                                    type: "SEO industrie & artisanat",
                                    clients: "Ateliers, PMI, sous-traitants",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Rue Saint-Michel",
                                    type: "SEO nightlife & restauration",
                                    clients: "Bars, restaurants étudiants, loisirs",
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence rennaise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Rennes est un écosystème soudé où les recommandations comptent autant que le SEO. Les agences locales facturent entre <strong>1 500€ et 5 000€/mois</strong> avec souvent un interlocuteur junior et une approche générique qui ne comprend pas les nuances du marché breton.
                                    </p>
                                    <p>
                                        Mon avantage concret : j'ai une <strong>expertise tech poussée</strong> et je parle le même langage que les ESN et startups cyber de Cesson-Sévigné. Je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> spécialisée en SEO technique et en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link>.
                                    </p>
                                    <p>
                                        Je sais qu'une ESN de Cesson-Sévigné qui recrute des développeurs n'a pas les mêmes besoins qu'un restaurant du centre ou qu'une startup du pôle cyber. Je ne sous-traite pas, je ne déroule pas de template générique, et je vous accompagne personnellement du diagnostic à la croissance.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Stratégie SEO cybersécurité et ESN (pôle cyber #1 de France)",
                                        "Contenu B2B technique pour Orange, Sopra Steria et éditeurs bretons",
                                        "SEO local agroalimentaire (Lactalis, groupes coopératifs)",
                                        "Expertise campus et recrutement tech (70 000 étudiants)",
                                        "SEO pour les commerces de la rue Le Bastard et du centre",
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

            {/* Section Secteurs d'activité Rennes */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Rennes</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Cybersécurité & Défense", examples: "Pôle cyber, DGA, Orange Cyberdefense", volume: "SEO B2B technique" },
                                { sector: "ESN & Logiciel", examples: "Éditeurs, prestataires IT, SaaS", volume: "SEO B2B growth" },
                                { sector: "Agroalimentaire", examples: "Industriels, fournisseurs, biotech agro", volume: "SEO B2B filière" },
                                { sector: "Commerce & Retail", examples: "Boutiques, enseignes, e-commerce", volume: "SEO local prioritaire" },
                                { sector: "Telecom & Réseaux", examples: "Opérateurs, intégrateurs, IoT", volume: "SEO B2B industriel" },
                                { sector: "Recrutement tech", examples: "Cabinets RH, chasseurs de têtes IT", volume: "SEO local + autorité" },
                                { sector: "Formation & Éducation", examples: "Écoles, universités, e-learning", volume: "SEO informationnel" },
                                { sector: "Santé & Recherche", examples: "INRIA, CHU, biotech", volume: "SEO B2B autorité" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">rennaises</span>
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
                                        <td className="py-3 px-4">ESN Cesson-Sévigné</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads recrutement et clients</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup cybersécurité</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Autorité thématique sécurité</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant centre-ville</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet recrutement IT</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 « recrutement tech Rennes »</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Entreprise agroalimentaire</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Visibilité B2B filière + leads qualifiés</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises rennaises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : renforcer sa présence sur Google Maps
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-nantes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Nantes (à 1h de Rennes)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-lille" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Lille (axe Grand Ouest)
                                </Link>
                                <Link href="/blog/google-business-profile-guide-complet" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Guide complet Google Business Profile 2026
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Voler les clients de vos concurrents sur Google Maps
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Demander un audit SEO gratuit à Rennes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoRennesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<RennesCustomContent />}
            />
        </>
    );
}
