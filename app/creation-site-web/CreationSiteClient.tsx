"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { Zap, Code, Layout, Globe, ArrowRight, ShieldCheck, Palette, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import { MapPin } from "lucide-react";

// Maillage local ciblé depuis les pages services : le hub /seo-local porte la liste complète.
const FEATURED_CITIES = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Cannes", slug: "consultant-seo-cannes" },
    { name: "Sophia-Antipolis", slug: "consultant-seo-sophia-antipolis" },
    { name: "Marseille", slug: "consultant-seo-marseille" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Lyon", slug: "consultant-seo-lyon" },
];

const CREATION_FEATURES = [
    {
        icon: <Zap className="w-8 h-8 text-sauge" />,
        title: "Vitesse optimale",
        desc: "Chargement instantané pour une expérience utilisateur parfaite et un meilleur référencement."
    },
    {
        icon: <Globe className="w-8 h-8 text-sauge" />,
        title: "Architecture SEO",
        desc: "Structure et balisage pensés pour le référencement dès la première ligne de code."
    },
    {
        icon: <Layout className="w-8 h-8 text-sauge" />,
        title: "Design conversion",
        desc: "Design épuré et parcours utilisateur pensé pour transformer vos visiteurs en clients."
    },
    {
        icon: <Code className="w-8 h-8 text-sauge" />,
        title: "Technologies modernes",
        desc: "Frameworks ultra-performants pour une évolutivité et une sécurité totales."
    }
];

const CREATION_PROCESS = [
    {
        step: "01",
        title: "Étude et Stratégie",
        desc: "Analyse de vos objectifs business, de votre marché et de vos concurrents pour définir la meilleure approche."
    },
    {
        step: "02",
        title: "Maquettes et Design",
        desc: "Création de maquettes sur-mesure en respectant votre identité visuelle et les bonnes pratiques de conversion."
    },
    {
        step: "03",
        title: "Développement",
        desc: "Intégration pixel-perfect avec des technologies modernes, optimisée pour la vitesse et le référencement."
    },
    {
        step: "04",
        title: "Tests et Optimisation",
        desc: "Vérification complète sur tous les appareils, optimisation des performances et de l'accessibilité."
    },
    {
        step: "05",
        title: "Mise en Ligne",
        desc: "Déploiement sécurisé, configuration du référencement et formation à la gestion du site."
    }
];

const CREATION_FAQ = [
    {
        question: "Pourquoi choisir un site sur-mesure plutôt qu'un modèle ?",
        answer: "Un **site sur-mesure** est conçu pour vos objectifs spécifiques. Il est plus rapide, mieux référencé et offre une expérience unique à vos visiteurs. Les modèles sont limités et souvent lents car surchargés de fonctionnalités inutiles."
    },
    {
        question: "En combien de temps mon site sera-t-il prêt ?",
        answer: "Comptez entre 4 et 8 semaines selon la complexité du projet. Cela inclut la phase de conception, le développement, les tests et les optimisations. Un planning détaillé vous est fourni dès le début."
    },
    {
        question: "Le site sera-t-il facile à modifier moi-même ?",
        answer: "Oui, selon vos besoins je peux intégrer un système de gestion de contenu simple et intuitif. Vous pourrez modifier textes et images sans connaissances techniques. Une formation est incluse."
    },
    {
        question: "Proposez-vous aussi le design graphique ?",
        answer: "Absolument. L'approche est orientée utilisateur : le design doit servir vos objectifs business. Les maquettes sont validées ensemble avant tout développement."
    },
    {
        question: "Mon site sera-t-il bien référencé sur Google ?",
        answer: "C'est la base de tout ce que je construis. Structure optimisée, balises correctes, vitesse de chargement, données structurées : tout est pensé pour le **référencement dès la conception**."
    },
    {
        question: "Combien coûte un site web professionnel ?",
        answer: "Un **site vitrine** démarre à partir de **1 500€**, un **site e-commerce** à partir de **3 000€**. Le tarif dépend de la complexité technique et du design souhaité. Je fournis toujours un devis détaillé après un premier échange."
    },
    {
        question: "Pourquoi ne pas utiliser Wix ou WordPress.com ?",
        answer: "Ces plateformes sont pratiques pour débuter mais **limitées en SEO** : code lourd, personnalisation restreinte, vitesse médiocre. Pour un projet business sérieux, un site sur-mesure offre de bien meilleures performances et un meilleur retour sur investissement."
    },
    {
        question: "Proposez-vous la maintenance du site ?",
        answer: "Oui, je propose des **forfaits de maintenance** qui incluent : mises à jour de sécurité, sauvegardes, monitoring de performance et support prioritaire. C'est facultatif mais recommandé pour garder votre site performant dans le temps."
    }
];

export default function CreationSiteClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Création de Site Web SEO",
                        "description": "Création de sites web ultra-rapides et optimisés pour le référencement naturel.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "serviceType": "Web Design & Development",
                        "areaServed": "France"
                    })
                }}
            />

            <HeroServices
                title="Création de Site Web : Performance et Référencement"
                subtitle="Des sites ultra-rapides, sécurisés et pensés pour le référencement dès la première ligne de code. Transformez votre présence web en machine d'acquisition."
                image="creation-site"
                category="Développement Web"
            />

            {/* Features */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6"
                        >
                            Un site qui <span className="text-sauge">convertit</span>
                        </motion.h2>
                        <p className="text-lg text-soft leading-relaxed">
                            Chaque élément est optimisé. Pas de simple vitrine, mais un <strong>actif digital rentable</strong> qui plaît autant à vos clients qu'aux moteurs de recherche.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {CREATION_FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-sauge/30 transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-sauge group-hover:scale-110 transition-all duration-300">
                                    <div className="group-hover:text-white transition-colors">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-ink mb-3">{feature.title}</h3>
                                <p className="text-soft text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Processus</p>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            De l'idée au <span className="text-sauge">site en ligne</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {CREATION_PROCESS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-sauge/10 flex items-center justify-center text-sauge font-bold text-xl group-hover:bg-sauge group-hover:text-white transition-all">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
                                    <p className="text-soft">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ce qui est inclus */}
            <section className="py-16 md:py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">
                            Ce qui est <span className="text-sauge">inclus</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <Palette className="w-8 h-8 text-sauge mx-auto mb-4" />
                                <h4 className="font-bold mb-2">Design sur-mesure</h4>
                                <p className="text-soft-light text-sm">Maquettes uniques validées avant développement</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <Smartphone className="w-8 h-8 text-sauge mx-auto mb-4" />
                                <h4 className="font-bold mb-2">Responsive Design</h4>
                                <p className="text-soft-light text-sm">Parfait sur mobile, tablette et ordinateur</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <ShieldCheck className="w-8 h-8 text-sauge mx-auto mb-4" />
                                <h4 className="font-bold mb-2">Sécurité et SSL</h4>
                                <p className="text-soft-light text-sm">Certificat HTTPS et protections avancées</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/blog/prix-creation-site-internet-2026" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Prix création site internet 2026
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Guide complet des tarifs : site vitrine, e-commerce, sur-mesure.
                                </p>
                            </Link>
                            <Link href="/blog/comment-creer-site-visible-google" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Comment créer un site visible sur Google
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Les bonnes pratiques pour un site optimisé dès la conception.
                                </p>
                            </Link>
                            <Link href="/blog/pourquoi-votre-site-est-lent-performance-web-2026" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Site lent = clients perdus
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Pourquoi la vitesse impacte vos conversions et comment y remédier.
                                </p>
                            </Link>
                            <Link href="/blog/refonte-site-web-sans-perdre-seo" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Guide</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Refonte sans perdre son SEO
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Le guide complet pour refondre votre site sans perdre vos positions.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section SEO Local - Maillage */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Création de site web <span className="text-sauge">optimisé SEO</span> dans votre ville
                        </h2>
                        <p className="text-soft mb-8">
                            Basée sur la Côte d'Azur, j'accompagne des entrepreneurs et PME partout en France.
                            Chaque site que je crée est pensé pour le <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link> et
                            intègre une stratégie de <Link href="/seo-local" className="text-sauge hover:underline">SEO local</Link> adaptée à votre zone de chalandise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {FEATURED_CITIES.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${city.slug}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-sauge hover:text-white rounded-full text-sm font-medium transition-all"
                                >
                                    <MapPin className="w-3 h-3" />
                                    {city.name}
                                </Link>
                            ))}
                            <Link
                                href="/seo-local"
                                className="px-4 py-2 bg-ink text-white rounded-full text-sm font-medium hover:bg-sauge transition-all"
                            >
                                Toutes les villes →
                            </Link>
                        </div>
                        <p className="text-sm text-soft">
                            Besoin d'un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO</Link> avant de créer votre site ?
                            Ou d'une <Link href="/refonte-site-web" className="text-sauge hover:underline">refonte</Link> de votre site existant ?
                            <Link href="/contact" className="text-sauge hover:underline ml-1">Contactez-moi</Link> pour en discuter.
                        </p>
                    </div>
                </div>
            </section>

            {/* Outils SEO Gratuits */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                        Testez vos performances <span className="text-sauge">gratuitement</span>
                    </h2>
                    <p className="text-soft mb-8 max-w-2xl mx-auto">
                        Avant de vous engager, utilisez mes outils d'analyse pour faire un état des lieux de votre site.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/outils" className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-ink font-bold hover:border-sauge hover:text-sauge transition-colors bg-gray-50">
                            <span className="mr-2">🛠️</span> Voir tous les outils SEO
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <FAQ items={CREATION_FAQ} title="Questions sur la Création de Site" />

            {/* Services complémentaires */}
            <RelatedServices currentService="creation-site-web" />

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="default" />

            {/* CTA */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à <span className="text-sauge">lancer</span> votre projet ?
                        </h2>
                        <p className="text-lg text-soft-light mb-10 max-w-xl mx-auto">
                            Discutons de votre projet et voyons comment créer un site qui génère des résultats.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                            >
                                Discuter du projet
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link href="/contact">
                                <Button
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                                >
                                    Me contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
