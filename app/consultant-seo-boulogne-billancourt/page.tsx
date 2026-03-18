"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, Video } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-boulogne-billancourt")!;

// Contenu personnalisé Boulogne-Billancourt - sections uniques pour atteindre 2000+ mots
function BoulogneBillancourtCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Boulogne-Billancourt */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Video className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Boulogne-Billancourt : la capitale française des <span className="text-sauge">médias et de l'audiovisuel</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Boulogne-Billancourt n'est pas une banlieue ordinaire — c'est le <strong>coeur de l'industrie médiatique française</strong>. TF1, Canal+, M6, Endemol, Banijay, NRJ : les plus grands groupes audiovisuels et de production ont leur siège dans cette ville de 120 000 habitants, la plus peuplée des Hauts-de-Seine. Ce tissu économique crée un marché B2B très spécifique, exigeant et lucratif.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Boulogne a besoin d'une consultante SEO spécialisée médias</h4>
                                <p className="text-sm mb-0">
                                    "Production vidéo Boulogne" est une requête ultra-qualifiée : celui qui la tape a un budget, un projet concret et cherche un prestataire local de confiance. Les agences parisiennes ne comprennent pas ce <strong>micro-marché B2B audiovisuel</strong>. Mon expertise : SEO B2B médias, content marketing audiovisuel, positionnement sur des requêtes à fort taux de conversion.
                                </p>
                            </div>

                            <p>
                                L'Île Seguin et la Seine Musicale illustrent la transformation majeure de Boulogne : l'ancien site Renault est devenu un <strong>quartier d'affaires premium</strong> avec une vocation culturelle et créative forte. La proximité immédiate du 16ème arrondissement de Paris attire une clientèle aisée et des entreprises à budget élevé. Issy-les-Moulineaux (voisine) accueille Microsoft et de nombreux sièges sociaux tech, élargissant encore l'écosystème digital.
                            </p>
                        </div>

                        {/* Stats Boulogne-Billancourt */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">120 000</p>
                                <p className="text-xs text-soft">Habitants (1ère ville 92)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">TF1</p>
                                <p className="text-xs text-soft">Canal+, M6 au siège</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">Seine</p>
                                <p className="text-xs text-soft">Musicale / Île Seguin</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">Paris</p>
                                <p className="text-xs text-soft">16ème à 5 min</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Boulogne-Billancourt</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Boulogne-Billancourt a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation, de votre secteur et de la nature B2B ou B2C de votre activité.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Pont de Sèvres / Île Seguin",
                                    type: "SEO culturel & médias",
                                    clients: "Seine Musicale, production audiovisuelle",
                                    icon: <Video className="w-5 h-5" />
                                },
                                {
                                    zone: "Centre-ville / Mairie",
                                    type: "SEO commerce & services",
                                    clients: "Restaurants, boutiques, professions libérales",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Route de la Reine",
                                    type: "SEO corporate",
                                    clients: "Agences, production audiovisuelle, communication",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Marcel Sembat",
                                    type: "SEO local & commerce",
                                    clients: "Quartier dynamique, commerces, services",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    zone: "Billancourt",
                                    type: "SEO immobilier & BTP",
                                    clients: "Programmes neufs, rénovation, promotion",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Issy-les-Moulineaux (voisin)",
                                    type: "SEO digital & tech",
                                    clients: "Microsoft, sièges sociaux, startups",
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

            {/* Section Pourquoi freelance vs agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi choisir une <span className="text-sauge">consultante SEO freelance</span> pour votre activité à Boulogne ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Boulogne-Billancourt est un marché B2B médias très spécifique. Les agences parisiennes ne comprennent pas ce micro-marché : elles appliquent des stratégies génériques sur des requêtes trop larges. "Production vidéo Boulogne" est ultra-qualifié — c'est exactement le type de requête que je cible en priorité, parce qu'elle convertit.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO freelance</Link> spécialisée en SEO B2B et content marketing pour les secteurs créatifs et médias. Je maîtrise également la <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> — crucial pour les agences de communication qui veulent être citées par ChatGPT ou Perplexity dans leur domaine.
                                    </p>
                                    <p>
                                        Je ne sous-traite pas, je n'applique pas de grille générique, et je vous accompagne personnellement du diagnostic à la croissance organique.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Expertise SEO B2B médias et audiovisuel",
                                        "Positionnement sur requêtes à fort taux de conversion",
                                        "Reporting mensuel clair avec KPIs business",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
                                        "Tarifs 30-50% inférieurs aux agences parisiennes",
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

            {/* Section Secteurs d'activité Boulogne-Billancourt */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Boulogne-Billancourt</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Production audiovisuelle", examples: "Sociétés de production, studios", volume: "SEO B2B spécialisé" },
                                { sector: "Médias & Broadcasting", examples: "TF1, Canal+, M6, NRJ", volume: "SEO corporate notoriété" },
                                { sector: "Agences de communication", examples: "Com, RP, créatif, brand", volume: "SEO B2B autorité" },
                                { sector: "Publicité & Marketing", examples: "Agences pub, media buying", volume: "SEO B2B leads" },
                                { sector: "Services aux entreprises", examples: "Conseil, RH, juridique", volume: "SEO local + autorité" },
                                { sector: "Commerce local", examples: "Restaurants, boutiques, services", volume: "SEO local prioritaire" },
                                { sector: "Immobilier & Promotion", examples: "Agences, promoteurs, neuf", volume: "SEO local compétitif" },
                                { sector: "Culture & Événementiel", examples: "Seine Musicale, événements", volume: "SEO saisonnier" }
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
                            Résultats SEO attendus pour les entreprises de <span className="text-sauge">Boulogne-Billancourt</span>
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
                                        <td className="py-3 px-4">Société de production vidéo</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">Page 1 "production vidéo Boulogne"</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Agence de communication</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Visibilité B2B Île-de-France</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Restaurant centre-ville</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + avis</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet de conseil</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">+150% leads B2B qualifiés</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Commerce Marcel Sembat</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Google Maps dominant + avis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-soft mt-4 italic">
                            * Ces résultats sont basés sur des projets réels. Chaque situation est unique — l'<Link href="/audit-seo" className="text-sauge hover:underline">audit SEO gratuit</Link> permet d'évaluer votre potentiel spécifique.
                        </p>
                    </div>
                </div>
            </section>

            {/* Liens internes contextuels */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises de Boulogne-Billancourt</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-paris" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Paris
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/blog/importance-audit-seo" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Pourquoi un audit SEO est indispensable
                                </Link>
                                <Link href="/blog/checklist-seo-2026" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Checklist SEO 2026 : 30 points essentiels
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps
                                </Link>
                                <Link href="/creation-site-web" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Création de site web performant
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoBoulogneBillancourtPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<BoulogneBillancourtCustomContent />}
            />
        </>
    );
}
