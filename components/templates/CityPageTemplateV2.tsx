"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { SEOScoreChecker } from "@/components/SEOScoreChecker";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Search, ArrowRight, CheckCircle2, Zap, Target, BarChart3, Globe, FileSearch, Star, Phone, Clock, Building2, Award, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { CityData, FRENCH_CITIES } from "@/lib/cities-data";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import { MarketInsightBlock } from "@/components/seo/MarketInsightBlock";
import { NearbyLinks } from "@/components/NearbyLinks";

const DEPARTMENT_PREPOSITIONS: Record<string, string> = {
    "Alpes-Maritimes": "des Alpes-Maritimes",
    "Bas-Rhin": "du Bas-Rhin",
    "Bouches-du-Rhône": "des Bouches-du-Rhône",
    "Gironde": "de Gironde",
    "Haute-Garonne": "de Haute-Garonne",
    "Hauts-de-Seine": "des Hauts-de-Seine",
    "Hérault": "de l'Hérault",
    "Ille-et-Vilaine": "d'Ille-et-Vilaine",
    "Isère": "d'Isère",
    "Loire-Atlantique": "de Loire-Atlantique",
    "Monaco": "de Monaco",
    "Nord": "du Nord",
    "Paris": "de Paris",
    "Rhône": "du Rhône",
};

function getDepartmentPreposition(department: string): string {
    return DEPARTMENT_PREPOSITIONS[department] || `de ${department}`;
}

interface CityPageProps {
    cityData: CityData;
    customContent?: React.ReactNode;
}

export function CityPageTemplateV2({ cityData, customContent }: CityPageProps) {
    const { openAuditModal } = useModal();
    const city = cityData.name;
    const zipCode = cityData.zipCode;

    // Slug de base (sans le préfixe) pour NearbyLinks
    // cityData.slug = "consultant-seo-nice" → baseCitySlug = "nice"
    const baseCitySlug = cityData.slug.replace('consultant-seo-', '');

    // JSON-LD LocalBusiness
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `https://indhack.com/${cityData.slug}#business`,
        "name": `IndHack - Consultant SEO ${city}`,
        "alternateName": "Indiana Aflalo - Experte SEO",
        "description": `Consultante SEO experte à ${city}. Référencement naturel, audit technique et stratégie de visibilité Google pour PME et entrepreneurs de ${city} et sa région.`,
        "url": `https://indhack.com/${cityData.slug}`,
        "telephone": "+33661139748",
        "email": "contact@indhack.com",
        "image": "https://indhack.com/images/logo-indhack.webp",
        "priceRange": "€€",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "postalCode": zipCode,
            "addressRegion": cityData.region,
            "addressCountry": city === "Monaco" ? "MC" : "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": cityData.lat,
            "longitude": cityData.lng
        },
        "areaServed": [
            { "@type": "City", "name": city },
            { "@type": "AdministrativeArea", "name": cityData.department },
            ...cityData.nearbyAreas.map(area => ({ "@type": "Place", "name": area }))
        ],
        "serviceType": [
            "Référencement Naturel SEO",
            "Audit SEO",
            "SEO Local",
            "Google Business Profile",
            "Création de Site Web",
            "GEO - Generative Engine Optimization"
        ],
        "dateModified": new Date().toISOString().split('T')[0],
        "founder": {
            "@type": "Person",
            "@id": "https://indhack.com/#indiana-aflalo",
            "name": "Indiana Aflalo",
            "jobTitle": "Consultante SEO & Experte GEO",
            "url": "https://indhack.com/a-propos",
            "sameAs": [
                "https://www.linkedin.com/in/indianaaflalo"
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "ratingCount": "47"
        }
    };

    // FAQ enrichie et diversifiée par type de marché
    const getContextualFAQ = () => {
        const baseFAQ = [
            {
                question: `Pourquoi choisir une consultante SEO à ${city} plutôt qu'une agence parisienne ?`,
                answer: `Une experte locale connaît les spécificités du marché ${city} : comportements de recherche, concurrents directs, partenaires locaux pour le netlinking. Je peux vous rencontrer physiquement, visiter votre établissement et adapter ma stratégie à votre réalité terrain. Cette proximité génère des résultats plus rapides et pertinents.`
            },
            {
                question: `Quels résultats SEO attendre sur ${city} et les ${cityData.department} ?`,
                answer: `Sur des requêtes locales type "votre métier + ${city}", les premiers résultats apparaissent en 1 à 3 mois. Pour les secteurs très concurrentiels (immobilier, restauration, avocats), comptez 4 à 6 mois. L'objectif : apparaître dans le Pack Local Google Maps et générer un flux régulier de prospects qualifiés.`
            },
            {
                question: `Intervenez-vous sur ${cityData.nearbyAreas.slice(0, 3).join(", ")} et alentours ?`,
                answer: `Oui, j'interviens sur toute la zone ${cityData.department} : ${cityData.nearbyAreas.join(", ")}. La proximité géographique est un atout pour le SEO local, mais les outils modernes permettent aussi un accompagnement à distance très efficace.`
            }
        ];

        // FAQ spécifiques par type de marché
        const contextFAQ: Record<string, { question: string; answer: string }[]> = {
            luxury: [
                {
                    question: `Comment le SEO peut-il attirer une clientèle haut de gamme à ${city} ?`,
                    answer: `Les clients premium recherchent différemment : requêtes en anglais, comparaisons de services exclusifs, recherche de témoignages. Je cible ces comportements spécifiques avec du contenu premium, un site au design irréprochable et une stratégie de réputation en ligne. L'objectif : être trouvé par ceux qui ont les moyens d'investir.`
                },
                {
                    question: `Proposez-vous du SEO multilingue pour la clientèle internationale de ${city} ?`,
                    answer: `Absolument. Sur ${city}, ${cityData.context.localInsight}. Je mets en place une stratégie multilingue (FR/EN/IT) avec des balises hreflang, du contenu traduit par des natifs et une optimisation des fiches Google Business Profile dans plusieurs langues.`
                }
            ],
            tech: [
                {
                    question: `Quel type de SEO pour les startups tech de ${city} ?`,
                    answer: `Le SEO B2B tech requiert du contenu technique de haut niveau : études de cas, whitepapers, comparatifs produits. Je travaille sur des cycles de vente longs avec du content marketing qui éduque et convertit sur 6-12 mois. Les mots-clés techniques à faible volume mais forte intention sont ma spécialité.`
                },
                {
                    question: `Comment rivaliser avec les géants américains sur les requêtes tech ?`,
                    answer: `La clé est le positionnement de niche et l'ancrage local. Plutôt que "CRM logiciel", on cible "CRM PME française" ou "solution SaaS RGPD". Je combine SEO technique avancé (Core Web Vitals, PWA) et autorité thématique pour vous positionner comme référence sur votre segment.`
                }
            ],
            volume: [
                {
                    question: `Comment se démarquer dans un marché très concurrentiel comme ${city} ?`,
                    answer: `Avec ${cityData.population} habitants, la concurrence est féroce. Ma stratégie : identifier des niches sous-exploitées (quartiers spécifiques, services complémentaires), créer du contenu hyper-localisé et accumuler des avis Google plus vite que vos concurrents. Le volume se gagne par l'exhaustivité.`
                },
                {
                    question: `Le SEO peut-il remplacer Google Ads à ${city} ?`,
                    answer: `Le SEO et Google Ads sont complémentaires. Sur une grande métropole comme ${city}, le SEO offre un meilleur ROI long terme (x5 en moyenne) tandis que Ads génère du trafic immédiat. Je recommande souvent de commencer par les deux puis de réduire Ads progressivement quand le SEO prend le relais.`
                }
            ],
            premium: [
                {
                    question: `Comment toucher à la fois la clientèle locale et touristique de ${city} ?`,
                    answer: `${city} a un double marché : locaux et visiteurs. Je crée deux types de contenus : pages locales en français ciblant les résidents, et pages optimisées EN/IT pour les touristes. Les stratégies d'avis et de Google Maps diffèrent aussi selon ces cibles.`
                },
                {
                    question: `La saisonnalité impacte-t-elle le SEO à ${city} ?`,
                    answer: `Oui, mais c'est une opportunité ! Je prépare votre visibilité 3 mois avant la haute saison pour que vous soyez en pole position quand l'afflux arrive. Hors saison, on travaille le contenu et la technique. Cette anticipation fait toute la différence.`
                }
            ],
            local: [
                {
                    question: `Quel budget prévoir pour du SEO local à ${city} ?`,
                    answer: `L'audit SEO initial est 100% gratuit et sans engagement. Il permet de définir votre potentiel. Ensuite, je définis avec vous une stratégie adaptée à vos objectifs de croissance. Chaque projet est unique : commençons par l'audit offert pour voir ce qu'il est possible de faire.`
                },
                {
                    question: `Comment fonctionne le référencement local sur Google à ${city} ?`,
                    answer: `Le SEO local repose sur 3 piliers : votre fiche Google Business Profile, les citations locales (annuaires, Pages Jaunes, Yelp...) et les avis clients. Mon travail consiste à optimiser ces éléments pour vous faire apparaître dans le Pack Local de 3 résultats affichés en haut des recherches géolocalisées.`
                }
            ]
        };

        const marketFAQ = contextFAQ[cityData.context.marketType] || contextFAQ.local;
        return [...baseFAQ, ...marketFAQ];
    };

    const FAQ_ITEMS = getContextualFAQ();

    // Méthodologie compacte
    const METHODOLOGY = [
        { step: "01", title: "Audit Local", desc: `Analyse de votre visibilité sur ${city} : fiche Google, positions actuelles, concurrents directs.`, icon: <FileSearch className="w-5 h-5" /> },
        { step: "02", title: "Stratégie", desc: "Mots-clés à fort potentiel, plan de contenu géolocalisé, acquisition d'avis.", icon: <Target className="w-5 h-5" /> },
        { step: "03", title: "Optimisation", desc: "Technique on-site, pages locales, enrichissement Google Business Profile.", icon: <Zap className="w-5 h-5" /> },
        { step: "04", title: "Croissance", desc: "Reporting mensuel, évolution des positions, leads générés, ajustements.", icon: <TrendingUp className="w-5 h-5" /> }
    ];

    // Services liés avec liens vers sub-services (ancres sémantiques liées au mot-clé cible)
    const RELATED_SERVICES = [
        { title: `Audit SEO complet à ${city}`, href: "/audit-seo", desc: "Analyse technique approfondie de votre site", isPrimary: true },
        { title: "Accompagnement SEO personnalisé", href: "/consultant-seo", desc: "Votre expert dédié" },
        { title: "Rapport d'audit SEO : guide complet", href: "/blog/contenu-rapport-audit-seo", desc: "Contenu, modèle et exemple" },
        { title: "Stratégie SEO nationale", href: "/referencement-naturel", desc: "Croissance organique durable" },
        { title: "Création site SEO-ready", href: "/creation-site-web", desc: "Site optimisé Google" }
    ];

    // Articles blog connexes diversifiés par type de marché
    const getRelatedBlogPosts = () => {
        const blogByMarket: Record<string, { title: string; href: string; desc: string }[]> = {
            luxury: [
                { title: "Comment dominer Google Maps face aux concurrents", href: "/blog/google-maps-voler-clients-concurrents", desc: "Stratégies SEO local avancées" },
                { title: "L'importance d'un audit SEO", href: "/blog/audit-seo-approfondi-guide-complet", desc: "Diagnostic complet" },
                { title: "Google Business Profile : Guide complet", href: "/blog/google-business-profile-guide-complet", desc: "Optimisation fiche Google" }
            ],
            tech: [
                { title: "Comment créer 50 pages locales en 10 min", href: "/blog/programmatic-seo-50-pages-locales", desc: "Programmatic SEO B2B" },
                { title: "Checklist SEO 2026 : 30 points essentiels", href: "/blog/checklist-seo-2026", desc: "Audit technique complet" },
                { title: "9 erreurs SEO qui coûtent 10 000€/an", href: "/blog/audit-seo-erreurs-qui-coutent-cher", desc: "Corrections prioritaires" }
            ],
            volume: [
                { title: "Checklist SEO 2026 : 30 points essentiels", href: "/blog/checklist-seo-2026", desc: "Audit technique complet" },
                { title: "SEO vs SEA : que choisir ?", href: "/blog/seo-vs-sea-que-choisir", desc: "Comparatif stratégique" },
                { title: "L'importance d'un audit SEO", href: "/blog/audit-seo-approfondi-guide-complet", desc: "Diagnostic complet" }
            ],
            premium: [
                { title: "SEO Local Nice : dominer le marché azuréen", href: "/blog/seo-local-nice", desc: "Guide régional Côte d'Azur" },
                { title: "Google Business Profile : Guide complet", href: "/blog/google-business-profile-guide-complet", desc: "Optimisation fiche Google" },
                { title: "Comment dominer Google Maps", href: "/blog/google-maps-voler-clients-concurrents", desc: "Stratégies avancées" }
            ],
            local: [
                { title: "Pourquoi faire appel à un consultant SEO ?", href: "/blog/pourquoi-consultant-seo", desc: "Les avantages d'un expert SEO" },
                { title: "Comment créer un site visible sur Google", href: "/blog/comment-creer-site-visible-google", desc: "Guide pratique SEO" },
                { title: "L'importance d'un audit SEO", href: "/blog/audit-seo-approfondi-guide-complet", desc: "Diagnostic complet" }
            ]
        };

        return blogByMarket[cityData.context.marketType] || blogByMarket.local;
    };

    const RELATED_BLOG_POSTS = getRelatedBlogPosts();

    // Avantages différenciants
    const ADVANTAGES = [
        { icon: <Shield />, title: "Expertise technique", desc: "Next.js, Core Web Vitals, IA" },
        { icon: <BarChart3 />, title: "Approche ROI", desc: "KPIs business, pas juste des positions" },
        { icon: <MapPin />, title: "Proximité locale", desc: `Basée région ${cityData.department}` },
        { icon: <Award />, title: "Sans engagement long", desc: "3 mois minimum, puis liberté" }
    ];

    return (
        <main className="bg-white min-h-screen">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            {/* Breadcrumb sr-only (JSON-LD est géré par le composant Breadcrumb dans page.tsx) */}
            <nav className="sr-only" aria-label="Fil d'ariane">
                <Link href="/">Accueil</Link> / <Link href="/seo-local">SEO Local</Link> / Consultant SEO {city}
            </nav>

            {/* Hero */}
            <HeroServices
                title={`Consultant SEO ${city} (${zipCode})`}
                subtitle={`Dominez Google à ${city}. Attirez des clients qualifiés ${getDepartmentPreposition(cityData.department)} grâce à une stratégie de référencement local sur-mesure.`}
                image="seo-dashboard"
                category="Référencement Local"
            />

            {/* Bloc AIO-ready : passage citable par ChatGPT / Perplexity / AI Mode Google */}
            <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border-l-4 border-sauge rounded-r-2xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sauge/10 text-sauge rounded-full text-xs font-bold uppercase tracking-wider">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    L'essentiel en 30 secondes
                                </span>
                            </div>
                            <p className="text-base md:text-lg text-ink leading-relaxed">
                                <strong className="font-bold">Un consultant SEO à {city} ({zipCode})</strong> accompagne les entreprises des <strong>{cityData.department}</strong> et de la région <strong>{cityData.region}</strong> pour gagner en visibilité sur Google et Google Maps.
                                Le marché local {city} compte <strong>{cityData.population} habitants</strong> avec une concurrence {cityData.context.competitionLevel === 'extreme' ? 'féroce' : cityData.context.competitionLevel === 'high' ? 'élevée' : cityData.context.competitionLevel === 'medium' ? 'modérée' : 'gérable'} dans les secteurs {cityData.context.businessTypes.slice(0, 3).join(', ').toLowerCase()}.
                                Mission type : audit technique + SEO local ({cityData.landmarks.slice(0, 2).join(', ')} et alentours : {cityData.nearbyAreas.slice(0, 3).join(', ')}) + optimisation Google Business Profile + stratégie contenu géolocalisé.
                                <span className="text-soft"> Tarif sur devis selon périmètre. Premier audit gratuit en 30 secondes via notre <Link href="/outils/audit-seo-gratuit" className="text-sauge font-semibold hover:underline">outil d'audit SEO gratuit</Link>.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction Compacte + Stats - Enrichie avec Context */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10 items-start">
                            {/* Texte enrichi */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                                    Être visible à <span className="text-sauge">{city}</span> : un enjeu stratégique
                                </h2>
                                <div className="prose prose-sm text-soft space-y-3">
                                    <p>{cityData.description}</p>

                                    <div className="bg-gray-50 border-l-4 border-sauge p-4 my-4 rounded-r-lg">
                                        <h4 className="font-bold text-ink text-sm mb-1">Le saviez-vous ?</h4>
                                        <p className="text-xs italic text-ink/80">
                                            "{cityData.context.localInsight}"
                                        </p>
                                    </div>

                                    <p>
                                        À {city}, la compétition est {cityData.context.competitionLevel === 'extreme' ? 'féroce' : 'forte'}.
                                        Vos futurs clients sont des {cityData.context.targetClients}.
                                        <strong className="text-ink"> 46% des recherches Google ont une intention locale.</strong> Si votre entreprise n'apparaît pas quand ils cherchent vos services, vous laissez ces clients à vos concurrents.
                                    </p>

                                    <p>
                                        En tant que <Link href="/consultant-seo" className="text-sauge hover:underline font-semibold">consultante SEO spécialisée</Link> sur le marché {cityData.region}, je vous accompagne pour conquérir les premières positions Google et Google Maps. Une approche personnalisée pour répondre aux défis de {city} :
                                        <ul className="mt-2 space-y-1 list-disc list-inside">
                                            {cityData.context.specificChallenges.map((challenge, i) => (
                                                <li key={i} className="text-xs">{challenge}</li>
                                            ))}
                                        </ul>
                                    </p>
                                </div>

                                {/* Points clés de la ville */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {cityData.keyPoints.map((point, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 bg-sauge/10 text-sauge px-3 py-1.5 rounded-full text-xs font-bold">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stats locales */}
                            <div className="bg-ink text-white p-8 rounded-2xl">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-sauge" />
                                    Le SEO local en chiffres
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">46%</p>
                                        <p className="text-xs text-soft-light mt-1">Recherches locales</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">78%</p>
                                        <p className="text-xs text-soft-light mt-1">Achat sous 24h</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">88%</p>
                                        <p className="text-xs text-soft-light mt-1">Font confiance aux avis</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">x5</p>
                                        <p className="text-xs text-soft-light mt-1">ROI moyen SEO</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-sm text-soft-light mb-4">Population {city} : <strong className="text-white">{cityData.population} hab.</strong></p>
                                    <Button
                                        onClick={openAuditModal}
                                        className="w-full bg-sauge text-white hover:bg-white hover:text-ink rounded-xl py-6 font-bold"
                                    >
                                        Audit Gratuit {city}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Piliers SEO Local - Compact */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                            Les <span className="text-sauge">3 piliers</span> du SEO local à {city}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group"
                        >
                            <MapPin className="w-8 h-8 text-sauge mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold mb-2">Google Business Profile</h3>
                            <p className="text-soft text-sm">
                                Optimisation complète de votre fiche : catégories, photos, posts, avis pour apparaître dans le <strong>Pack Local</strong>.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group"
                        >
                            <Search className="w-8 h-8 text-sauge mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold mb-2">Mots-clés géolocalisés</h3>
                            <p className="text-soft text-sm">
                                Ciblage des requêtes "métier + {city}" qui convertissent <strong>3x plus</strong>. Focus quartiers : {cityData.landmarks.slice(0, 2).join(", ")}.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group"
                        >
                            <Users className="w-8 h-8 text-sauge mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold mb-2">Autorité locale</h3>
                            <p className="text-soft text-sm">
                                Liens depuis partenaires locaux, annuaires pros et presse {cityData.region} pour <strong>asseoir votre crédibilité</strong>.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bloc différenciant selon le type de marché (anti-Doorway Pages) */}
            <MarketInsightBlock
                marketType={cityData.context.marketType}
                cityName={city}
                targetClients={cityData.context.targetClients}
            />

            {/* Outil SEO Interactif */}
            <SEOScoreChecker />

            {/* Méthodologie en timeline compacte */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                            Mon accompagnement SEO à <span className="text-sauge">{city}</span>
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-4">
                        {METHODOLOGY.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-gray-50 p-5 rounded-xl border border-gray-100 group hover:bg-sauge hover:text-white transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-sauge font-bold text-sm shadow-sm mb-3 group-hover:bg-ink group-hover:text-white transition-all">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-soft group-hover:text-white/80 transition-colors">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Avantages - Bande */}
            <section className="py-10 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {ADVANTAGES.map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center text-sauge-light">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-soft-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zones d'intervention - Quartiers */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold text-ink mb-4 text-center">
                            Zones d'intervention à {city} et alentours
                        </h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {cityData.landmarks.map((landmark, i) => (
                                <span key={i} className="bg-white px-3 py-1.5 rounded-full text-xs font-medium text-ink border border-gray-200">
                                    {landmark}
                                </span>
                            ))}
                            {cityData.nearbyAreas.map((area, i) => (
                                <span key={i} className="bg-sauge/10 px-3 py-1.5 rounded-full text-xs font-medium text-ink border border-sauge/20">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services liés - Maillage */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-heading font-bold text-ink">
                            Mes <span className="text-sauge">services</span> à {city}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                        {RELATED_SERVICES.map((service, i) => (
                            <Link key={i} href={service.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`p-5 rounded-xl border transition-all group h-full ${(service as any).isPrimary
                                        ? 'bg-sauge text-white border-sauge hover:bg-ink'
                                        : 'bg-gray-50 border-gray-100 hover:shadow-lg hover:border-sauge/30'
                                        }`}
                                >
                                    <h3 className={`font-bold text-sm mb-1 transition-colors ${(service as any).isPrimary ? 'text-white' : 'text-ink group-hover:text-sauge'
                                        }`}>{service.title}</h3>
                                    <p className={`text-xs ${(service as any).isPrimary ? 'text-white/80' : 'text-soft'}`}>{service.desc}</p>
                                    <span className={`mt-3 inline-flex items-center text-xs font-bold ${(service as any).isPrimary ? 'text-white' : 'text-sauge'
                                        }`}>
                                        Découvrir <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Lien vers consultant SEO */}
                    <div className="text-center mt-8">
                        <Link href="/consultant-seo" className="inline-flex items-center gap-2 text-sauge font-semibold hover:underline">
                            <Users className="w-4 h-4" />
                            Découvrir mon offre de consultante SEO freelance
                        </Link>
                    </div>
                </div>
            </section>

            {customContent}

            {/* Section Blog - Maillage vers Petite-fille */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-heading font-bold text-ink">
                            Articles SEO à lire
                        </h2>
                        <p className="text-soft text-sm mt-2">Conseils et stratégies pour améliorer votre visibilité</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {RELATED_BLOG_POSTS.map((post, i) => (
                            <Link key={i} href={post.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group h-full"
                                >
                                    <h3 className="font-bold text-sm text-ink group-hover:text-sauge transition-colors mb-2">{post.title}</h3>
                                    <p className="text-xs text-soft">{post.desc}</p>
                                    <span className="mt-3 inline-flex items-center text-xs font-bold text-sauge">
                                        Lire l'article <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sauge font-semibold hover:underline">
                            Voir tous les articles du blog SEO
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="card" className="max-w-md mx-auto my-12" />

            {/* FAQ */}
            <FAQ items={FAQ_ITEMS} title={`Questions Fréquentes - SEO ${city}`} />

            {/* Maillage interne enrichi */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Outils gratuits */}
                            <div>
                                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-sauge" />
                                    Outils SEO gratuits
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link href="/outils/audit-seo-gratuit" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Audit SEO gratuit /100
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/outils/testeur-visibilite-ia" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Testeur visibilité IA (GEO)
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/outils/generateur-schema-json-ld" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Générateur Schema JSON-LD
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Articles SEO */}
                            <div>
                                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                                    <FileSearch className="w-4 h-4 text-sauge" />
                                    Articles SEO
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link href="/blog/refonte-site-web-sans-perdre-seo" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Checklist SEO refonte de site
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog/audit-seo-approfondi-guide-complet" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            L'audit SEO : point de départ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog/pourquoi-consultant-seo" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Pourquoi un consultant SEO ?
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Services */}
                            <div>
                                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-sauge" />
                                    Services SEO
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link href="/audit-seo" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Audit SEO complet
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/referencement-naturel" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Référencement naturel
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/creation-site-web" className="text-soft hover:text-sauge transition-colors flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3" />
                                            Création de site web SEO
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Lien vers la page mère SEO local */}
                        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                            <Link href="/seo-local" className="text-sauge font-bold text-sm hover:underline">
                                ← Toutes mes zones d'intervention en France
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Villes voisines - maillage inter-villes intelligent via CITY_NEIGHBORS */}
            <NearbyLinks city={baseCitySlug} variant="full" maxLinks={6} />

            {/* CTA Final Compact */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-ink p-10 rounded-2xl text-white text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                            Vous voulez obtenir plus de demandes locales à <span className="text-sauge-light">{city}</span> ?
                        </h2>
                        <p className="text-soft-light mb-8 max-w-lg mx-auto text-sm">
                            Premier diagnostic SEO local gratuit. Échangeons sur votre marché à {city} et les leviers prioritaires.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-8 py-6 font-bold"
                            >
                                Audit Gratuit
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a
                                href="tel:0661139748"
                                className="inline-flex items-center gap-2 px-8 py-6 rounded-full border-2 border-white/20 text-white hover:bg-white/10 font-bold transition-all"
                            >
                                <Phone className="w-4 h-4" />
                                06 61 13 97 48
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
