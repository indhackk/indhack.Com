"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, TrendingUp, FlaskConical } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-lyon")!;

// Contenu personnalisé Lyon - sections uniques pour atteindre 2000+ mots
function LyonCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Lyon */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                L'écosystème économique de <span className="text-sauge">Lyon</span> : un marché SEO stratégique
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Lyon n'est pas qu'une métropole régionale — c'est la <strong>deuxième économie de France</strong>. Entre la Part-Dieu (premier quartier d'affaires hors Paris), Confluence (écoquartier innovant), Gerland (biotech et sciences de la vie) et la Presqu'île (commerces et services), chaque quartier représente un marché SEO distinct avec ses propres défis.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Pourquoi Lyon a besoin d'une consultante SEO locale</h4>
                                <p className="text-sm mb-0">
                                    Les recherches sur Lyon sont <strong>hyper-localisées</strong> : "restaurant Part-Dieu", "expert-comptable Confluence", "avocat Lyon 6ème"... Une stratégie SEO nationale ne capture pas ces requêtes. Je connais personnellement l'écosystème Auvergne-Rhône-Alpes et j'adapte ma stratégie aux comportements de recherche locaux, pas aux templates génériques.
                                </p>
                            </div>

                            <p>
                                Lyon concentre des <strong>filières d'excellence</strong> : la biotech (Lyonbiopôle), la santé (hôpitaux universitaires, laboratoires), la gastronomie (capitale mondiale, 4000 restaurants), le textile technique et la French Tech. Chaque secteur demande une expertise SEO adaptée : vocabulaire technique, cycles de décision longs en B2B, saisonnalité en restauration.
                            </p>
                        </div>

                        {/* Stats Lyon */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">520 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 1,4M)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">155 000</p>
                                <p className="text-xs text-soft">Entreprises</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">4 000</p>
                                <p className="text-xs text-soft">Restaurants</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">7 M</p>
                                <p className="text-xs text-soft">Touristes/an</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Lyon</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            Chaque quartier de Lyon et de sa métropole a ses spécificités SEO. J'adapte ma stratégie en fonction de votre localisation et de votre cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Part-Dieu / 3ème",
                                    type: "SEO B2B corporate",
                                    clients: "Sièges sociaux, banques, cabinets conseil",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Confluence / 2ème",
                                    type: "SEO tech & retail",
                                    clients: "Startups, commerces, loisirs",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Presqu'île / 1er-2ème",
                                    type: "SEO local premium",
                                    clients: "Restaurants, boutiques, artisans",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Gerland / 7ème",
                                    type: "SEO biotech & santé",
                                    clients: "Labos, startups santé, medical devices",
                                    icon: <FlaskConical className="w-5 h-5" />
                                },
                                {
                                    zone: "Vieux Lyon / 5ème",
                                    type: "SEO tourisme & culture",
                                    clients: "Restaurants, hôtels, guides, musées",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Villeurbanne / Tonkin",
                                    type: "SEO startup & campus",
                                    clients: "Écoles, étudiants, jeunes entreprises",
                                    icon: <Users className="w-5 h-5" />
                                },
                                {
                                    zone: "Écully / Ouest lyonnais",
                                    type: "SEO premium",
                                    clients: "Services haut de gamme, professions libérales",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Vénissieux / Sud-Est",
                                    type: "SEO industriel",
                                    clients: "PMI, sous-traitants, logistique",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Bellecour / Lyon 2",
                                    type: "SEO retail & luxe",
                                    clients: "Boutiques, enseignes, mode",
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

            {/* Section Pourquoi consultante indépendante vs agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi choisir une <span className="text-sauge">consultante SEO indépendante</span> plutôt qu'une agence lyonnaise ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Lyon compte des dizaines d'agences web et SEO. Elles facturent entre <strong>1 500€ et 6 000€/mois</strong> avec souvent un junior qui découvre votre dossier et une rotation d'interlocuteurs qui vous fait répéter vos objectifs.
                                    </p>
                                    <p>
                                        Mon approche est différente : je suis <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO indépendante</Link> avec une expertise technique poussée (mon site tourne sur Next.js avec un score PageSpeed de 95+/100) et une spécialisation en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link>.
                                    </p>
                                    <p>
                                        Je connais l'écosystème lyonnais : je sais que les restaurateurs du Vieux Lyon n'ont pas les mêmes besoins qu'une startup biotech de Gerland. Je ne sous-traite pas, je n'applique pas de grille générique, et je vous accompagne personnellement du diagnostic à la croissance.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500 €)",
                                        "Stratégie biotech et santé adaptée à Gerland et Lyonbiopôle",
                                        "SEO gastronomie pour les 4 000 restaurants lyonnais et bouchons",
                                        "Expertise Part-Dieu et Confluence : SEO B2B pour sièges sociaux",
                                        "SEO local pour les commerces de la Presqu'île et du Vieux Lyon",
                                        "Accompagnement GEO pour les startups French Tech Lyon",
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

            {/* Section Secteurs d'activité Lyon */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Lyon</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Santé & Biotech", examples: "Labos, medtech, pharma", volume: "SEO B2B technique" },
                                { sector: "Gastronomie", examples: "Restaurants, bouchons, traiteurs", volume: "SEO local prioritaire" },
                                { sector: "Tech & Startups", examples: "SaaS, French Tech, éditeurs", volume: "SEO B2B growth" },
                                { sector: "Industrie & BTP", examples: "Textile, métallurgie, équipements", volume: "SEO B2B industriel" },
                                { sector: "Services pro", examples: "Cabinets, avocats, experts", volume: "SEO local + autorité" },
                                { sector: "Commerce & Retail", examples: "Boutiques, enseignes, e-commerce", volume: "SEO e-commerce" },
                                { sector: "Tourisme & Hôtellerie", examples: "Hôtels, guides, événementiel", volume: "SEO saisonnier" },
                                { sector: "Formation & Éducation", examples: "Écoles, centres, e-learning", volume: "SEO informationnel" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">lyonnaises</span>
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
                                        <td className="py-3 px-4">Restaurant / Bouchon lyonnais</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup tech / SaaS</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+200% leads qualifiés via contenu</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Cabinet libéral (avocat, expert)</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 sur requêtes locales</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">E-commerce mode/textile</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+100% trafic organique produits</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Entreprise biotech/santé</td>
                                        <td className="py-3 px-4">4-6 mois</td>
                                        <td className="py-3 px-4">Autorité thématique + leads B2B</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises lyonnaises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps en 2026
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Audit SEO gratuit : testez votre site en 30 secondes
                                </Link>
                                <Link href="/consultant-seo-grenoble" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Grenoble (à 1h de Lyon)
                                </Link>
                                <Link href="/outils/simulateur-visibilite-locale" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Simulateur de visibilité locale pour votre ville
                                </Link>
                                <Link href="/consultant-seo-marseille" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultante SEO Marseille (axe Rhône)
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
                                    Demander un audit SEO gratuit à Lyon
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoLyonPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<LyonCustomContent />}
                visualVariant="premium"
            />
        </>
    );
}
