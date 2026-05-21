"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, FlaskConical, Globe } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-sophia-antipolis")!;

// Contenu personnalisé Sophia-Antipolis - sections uniques pour atteindre 2000+ mots
function SophiaAntipolisCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Sophia-Antipolis */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Sophia-Antipolis : la Silicon Valley européenne et son <span className="text-sauge">SEO B2B</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Sophia-Antipolis n'est pas une ville ordinaire — c'est le <strong>premier technopole d'Europe</strong>. Avec 2 500 entreprises, 40 000 emplois et des géants technologiques comme Amadeus (6 000 employés), SAP, NXP Semiconductors, Thales et Orange Labs, la technopole concentre une densité de décideurs tech sans équivalent en France hors Paris.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Sophia demande un SEO B2B tech pur</h4>
                                <p className="text-sm mb-0">
                                    Sophia-Antipolis est unique : il n'existe pas de "centre-ville" à référencer. Pas de SEO local classique ici — uniquement du <strong>SEO B2B pur</strong>. Les agences généralistes ne comprennent ni les cycles de vente longs (6–18 mois), ni le vocabulaire technique exigé par des prospects DSI ou CTO. Mon expertise couvre les contenus techniques B2B, le SEO SaaS, et la génération de leads en longue traîne sur des niches pointues.
                                </p>
                            </div>

                            <p>
                                L'écosystème s'appuie sur une recherche de pointe avec l'INRIA, le laboratoire I3S et EURECOM, et sur la SKEMA Business School qui forme chaque année un vivier de talents internationaux. Résultat : vos prospects ne tapent pas "plombier près de moi" mais "API de paiement SEPA conformité PSD2" ou "plateforme IoT industrielle MQTT". Un SEO efficace à Sophia commence par maîtriser ce vocabulaire.
                            </p>
                        </div>

                        {/* Stats Sophia-Antipolis */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">2 500</p>
                                <p className="text-xs text-soft">Entreprises</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">40 000</p>
                                <p className="text-xs text-soft">Emplois tech</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">1er</p>
                                <p className="text-xs text-soft">Technopole d'Europe</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">6 000</p>
                                <p className="text-xs text-soft">Employés Amadeus seul</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Zones tech */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Zones d'intervention à <span className="text-sauge">Sophia-Antipolis</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            La technopole est découpée en zones fonctionnelles aux enjeux SEO très différents. J'adapte ma stratégie à votre zone et à votre cible — B2B tech, corporate ou local.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Zone des Bouillides",
                                    type: "SEO SaaS & telecom",
                                    clients: "NXP, Orange Labs, éditeurs logiciels",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Zone de Saint-Philippe",
                                    type: "SEO corporate",
                                    clients: "Sièges sociaux, ESN, consultants IT",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Campus SKEMA",
                                    type: "SEO formation & edtech",
                                    clients: "Écoles, centres de formation, e-learning",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Zone Garbejaire",
                                    type: "SEO startup & incubation",
                                    clients: "Startups early-stage, accélérateurs, VCs",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Valbonne village (5 min)",
                                    type: "SEO local & lifestyle",
                                    clients: "Restaurants, services, professions libérales",
                                    icon: <Globe className="w-5 h-5" />
                                },
                                {
                                    zone: "INRIA / EURECOM",
                                    type: "SEO recherche & deeptech",
                                    clients: "Labos, spin-offs, partenariats industriels",
                                    icon: <FlaskConical className="w-5 h-5" />
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
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence généraliste ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Les agences généralistes ne comprennent pas les spécificités de Sophia. Elles appliquent des grilles SEO conçues pour des commerces locaux à des entreprises B2B tech aux cycles de vente de 12 mois. Le résultat : des contenus trop superficiels qui ne capturent jamais les décideurs techniques.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une compréhension fine des marchés SaaS et tech. Je produis des contenus qui parlent à des DSI et des CTO, pas à des consommateurs. J'optimise aussi la <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> — de plus en plus décisive quand vos prospects s'informent via ChatGPT ou Perplexity.
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je n'applique pas de template générique, et je vous accompagne personnellement du diagnostic à la croissance organique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Contenus techniques B2B validés par des experts",
                                        "SEO SaaS : pages features, comparatifs, cas clients",
                                        "Stratégie de lead generation longue traîne",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
                                        "Tarifs 30-50 % inférieurs aux agences",
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

            {/* Section Secteurs d'activité Sophia */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs accompagnés à <span className="text-sauge-light">Sophia-Antipolis</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "SaaS & Cloud", examples: "ERP, CRM, MarTech, DevOps", volume: "SEO B2B growth" },
                                { sector: "Telecom & Réseaux", examples: "5G, SD-WAN, infra, IoT", volume: "SEO technique B2B" },
                                { sector: "Intelligence artificielle", examples: "ML, NLP, computer vision", volume: "SEO thought leadership" },
                                { sector: "Cybersécurité", examples: "SOC, pentest, audit, IAM", volume: "SEO autorité niche" },
                                { sector: "IoT & Semiconducteurs", examples: "NXP, capteurs, embarqué", volume: "SEO industriel B2B" },
                                { sector: "ESN & Consulting IT", examples: "Intégrateurs, SSII, conseil", volume: "SEO local + autorité" },
                                { sector: "Edtech & Formation", examples: "SKEMA, e-learning, certif.", volume: "SEO informationnel" },
                                { sector: "Healthtech", examples: "E-santé, medtech, bioinfo", volume: "SEO B2B réglementé" }
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
                            Résultats SEO attendus pour les entreprises de <span className="text-sauge">Sophia-Antipolis</span>
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
                                        <td className="py-3 px-4">Startup SaaS</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Leads qualifiés via contenu ciblé</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">ESN / société de conseil IT</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Visibilité sur "développement logiciel Sophia"</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Éditeur logiciel (niche)</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Autorité thématique sur la niche</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet de recrutement IT</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 recrutement tech PACA</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Startup deeptech</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Visibilité internationale + partenariats</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises de Sophia-Antipolis</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-antibes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Antibes (porte de Sophia)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-nice" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Nice (20 min de Sophia)
                                </Link>
                                <Link href="/outils/testeur-visibilite-ia" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testeur de visibilité IA (ChatGPT, Perplexity)
                                </Link>
                                <Link href="/blog/programmatic-seo-50-pages-locales" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO programmatique : créer 50 pages locales efficaces
                                </Link>
                                <Link href="/blog/checklist-seo-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Checklist SEO 2026 : 30 points essentiels
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoSophiaAntipolisPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<SophiaAntipolisCustomContent />}
            />
        </>
    );
}
