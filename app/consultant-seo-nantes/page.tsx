"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { Building2, Utensils, Cpu, MapPin, Users, CheckCircle2, ArrowRight, Palette } from "lucide-react";

const cityData = getCityBySlug("consultant-seo-nantes")!;

// Contenu personnalisé Nantes - sections uniques pour atteindre 2000+ mots
function NantesCustomContent() {
    return (
        <>
            {/* Section Écosystème économique Nantes */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center">
                                <Palette className="w-6 h-6 text-sauge" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                                Nantes : la créative de l'Ouest, entre <span className="text-sauge">tech et culture</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg text-soft max-w-none">
                            <p>
                                Nantes est régulièrement classée <strong>ville de France où il fait le mieux vivre</strong>. Avec 320 000 habitants en ville et une métropole de 660 000 personnes, elle conjugue qualité de vie, dynamisme économique et identité créative unique. Les <strong>Machines de l'île</strong> — éléphant géant et carrousel des mondes marins — attirent 700 000 visiteurs par an et symbolisent l'ADN nantais : imagination, art, industrie réinventée.
                            </p>

                            <div className="bg-gradient-to-r from-sauge/5 to-transparent border-l-4 border-sauge p-6 my-6 rounded-r-xl">
                                <h4 className="font-bold text-ink text-lg mb-2">Un écosystème numérique parmi les plus actifs de France</h4>
                                <p className="text-sm mb-0">
                                    Nantes accueille la <strong>Nantes Digital Week</strong>, le <strong>Web2Day</strong> (événement tech majeur de l'Ouest) et un tissu dense d'agences digitales, de studios créatifs et de startups. L'<strong>Île de Nantes</strong> se transforme en quartier de la création, attirant agences, labs et ateliers. Cette densité numérique signifie que <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">le niveau de compétition SEO</Link> est très élevé — et les opportunités pour ceux qui s'y positionnent intelligemment, considérables.
                                </p>
                            </div>

                            <p>
                                Le <strong>Passage Pommeraye</strong>, joyau architectural du XIXe, et le <strong>Lieu Unique</strong> (LU) illustrent la capacité nantaise à valoriser son patrimoine dans une économie moderne. L'agroalimentaire, la construction navale (Chantiers de l'Atlantique), les services numériques et l'événementiel coexistent dans une métropole qui attire chaque année de nouvelles entreprises venues d'Ile-de-France ou d'autres régions.
                            </p>
                        </div>

                        {/* Stats Nantes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">320 000</p>
                                <p className="text-xs text-soft">Habitants (métropole 660 000)</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">700 000</p>
                                <p className="text-xs text-soft">Visiteurs Machines de l'île/an</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">N°1</p>
                                <p className="text-xs text-soft">Qualité de vie en France</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-2xl font-bold text-sauge">Web2Day</p>
                                <p className="text-xs text-soft">Événement tech de l'Ouest</p>
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
                                Quartiers et zones d'intervention à <span className="text-sauge">Nantes</span>
                            </h2>
                        </div>

                        <p className="text-soft mb-8">
                            De Bouffay à Saint-Herblain, chaque quartier nantais a ses spécificités SEO. J'adapte ma stratégie à votre localisation et à votre marché cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    zone: "Centre-ville / Bouffay",
                                    type: "SEO commerce & tourisme",
                                    clients: "Restaurants, boutiques, galeries",
                                    icon: <Utensils className="w-5 h-5" />
                                },
                                {
                                    zone: "Île de Nantes",
                                    type: "SEO créatif & tech",
                                    clients: "Agences, startups, studios",
                                    icon: <Cpu className="w-5 h-5" />
                                },
                                {
                                    zone: "Quartier de la création",
                                    type: "SEO digital & design",
                                    clients: "Creative tech, UX, gaming",
                                    icon: <Palette className="w-5 h-5" />
                                },
                                {
                                    zone: "Saint-Herblain / Atlantis",
                                    type: "SEO retail & commerce",
                                    clients: "Zones commerciales, grandes surfaces",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Trentemoult",
                                    type: "SEO artistes & alternatif",
                                    clients: "Ateliers, restaurants, bars",
                                    icon: <Palette className="w-5 h-5" />
                                },
                                {
                                    zone: "Rezé / Sud Loire",
                                    type: "SEO résidentiel & services",
                                    clients: "Commerces, professions libérales",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Orvault",
                                    type: "SEO entreprises & zones d'activités",
                                    clients: "PME, services B2B, bureaux",
                                    icon: <Building2 className="w-5 h-5" />
                                },
                                {
                                    zone: "Route de Vannes",
                                    type: "SEO automobile & commerce",
                                    clients: "Concessionnaires, enseignes périphériques",
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

            {/* Section Pourquoi freelance vs agence */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Pourquoi choisir une <span className="text-sauge">consultante SEO freelance</span> dans un milieu digital très actif comme Nantes ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="prose prose-sm text-soft">
                                    <p>
                                        Nantes compte une densité remarquable d'agences digitales, de freelances et de studios créatifs. Ce dynamisme est une force pour l'écosystème — mais il rend la concurrence SEO particulièrement intense. Les agences nantaises facturent entre <strong>1 500€ et 5 000€/mois</strong>, souvent avec des offres packagées qui ne tiennent pas compte de vos spécificités.
                                    </p>
                                    <p>
                                        En tant que <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline">consultante SEO freelance</Link>, je travaille différemment : expertise technique poussée, suivi personnalisé et spécialisation en <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">visibilité IA (GEO)</Link> — un enjeu clé pour les entreprises nantaises qui veulent exister dans les réponses de ChatGPT et Perplexity.
                                    </p>
                                    <p>
                                        Je comprends les nuances du marché nantais : une agence créative de l'Île de Nantes n'a pas les mêmes besoins SEO qu'un commerce de Bouffay ou qu'une PME industrielle de Saint-Herblain. Je construis une stratégie sur mesure, pas un template.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-ink mb-4">Ce que vous obtenez avec moi</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Un interlocuteur unique expert (pas de junior)",
                                        "Audit technique SEO offert (valeur 500€)",
                                        "Stratégie personnalisée à votre marché nantais",
                                        "Reporting mensuel clair avec KPIs business",
                                        "Expertise Core Web Vitals et SEO technique",
                                        "Accompagnement GEO (visibilité ChatGPT, Perplexity)",
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

            {/* Section Secteurs d'activité Nantes */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Nantes</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { sector: "Digital & Créatif", examples: "Agences, studios, UX, gaming", volume: "SEO B2B + branding" },
                                { sector: "Tech & SaaS", examples: "Startups, éditeurs logiciels", volume: "SEO B2B growth" },
                                { sector: "Commerce centre-ville", examples: "Boutiques, restauration, galeries", volume: "SEO local prioritaire" },
                                { sector: "Tourisme & Culture", examples: "Machines de l'île, hôtels, musées", volume: "SEO saisonnier" },
                                { sector: "Agroalimentaire", examples: "Industries, marques, distribution", volume: "SEO e-commerce + B2B" },
                                { sector: "Construction navale", examples: "Sous-traitants, ingénierie", volume: "SEO B2B industriel" },
                                { sector: "Services", examples: "Cabinets, professions libérales", volume: "SEO local + autorité" },
                                { sector: "Événementiel", examples: "Organisateurs, prestataires", volume: "SEO saisonnier + local" }
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
                            Résultats SEO attendus pour les entreprises <span className="text-sauge">nantaises</span>
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
                                        <td className="py-3 px-4">Restaurant / commerce Bouffay</td>
                                        <td className="py-3 px-4">1-2 mois</td>
                                        <td className="py-3 px-4">Top 3 Pack Local + réservations directes</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Agence digitale / studio créatif</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+150% leads entrants via contenu</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Startup SaaS / tech</td>
                                        <td className="py-3 px-4">3-4 mois</td>
                                        <td className="py-3 px-4">+200% leads qualifiés via SEO B2B</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4">Profession libérale (avocat, kiné)</td>
                                        <td className="py-3 px-4">2-3 mois</td>
                                        <td className="py-3 px-4">Page 1 sur requêtes locales Nantes</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">E-commerce (agroalimentaire, mode)</td>
                                        <td className="py-3 px-4">3-5 mois</td>
                                        <td className="py-3 px-4">+100% trafic organique produits</td>
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
                            <h3 className="font-bold text-ink mb-4">Ressources SEO pour les entreprises nantaises</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/consultant-seo-rennes" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Rennes (à 1h de Nantes)
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Testez votre site avec notre audit SEO gratuit
                                </Link>
                                <Link href="/consultant-seo-bordeaux" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Consultant SEO Bordeaux (façade Atlantique)
                                </Link>
                                <Link href="/blog/programmatic-seo-50-pages-locales" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    Comment créer des pages locales efficaces
                                </Link>
                                <Link href="/seo-local" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO local : dominer Google Maps
                                </Link>
                                <Link href="/blog/seo-vs-sea-que-choisir" className="flex items-center gap-2 text-soft hover:text-sauge transition-colors text-sm">
                                    <ArrowRight className="w-4 h-4 text-sauge" />
                                    SEO vs SEA : que choisir pour votre business ?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoNantesPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<NantesCustomContent />}
            />
        </>
    );
}
