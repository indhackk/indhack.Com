"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    Zap,
    Search,
    CreditCard,
    Truck,
    Shield,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Globe,
    Smartphone,
    Lock,
    TrendingUp,
    MapPin,
    Package,
    Star
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

const ECOMMERCE_FEATURES = [
    {
        icon: <ShoppingCart className="w-8 h-8 text-sauge" />,
        title: "Catalogue optimisé SEO",
        desc: "Structure de catégories et fiches produits pensées pour le référencement et la conversion."
    },
    {
        icon: <Zap className="w-8 h-8 text-sauge" />,
        title: "Performance maximale",
        desc: "Temps de chargement < 2 secondes. Core Web Vitals optimisés pour les utilisateurs et Google."
    },
    {
        icon: <CreditCard className="w-8 h-8 text-sauge" />,
        title: "Paiement sécurisé",
        desc: "Intégration des solutions de paiement leaders : Stripe, PayPal, cartes bancaires."
    },
    {
        icon: <Smartphone className="w-8 h-8 text-sauge" />,
        title: "Mobile-First",
        desc: "60% des achats se font sur mobile. Votre boutique sera parfaite sur tous les écrans."
    }
];

const PLATFORMS = [
    {
        name: "WooCommerce",
        desc: "Solution flexible basée sur WordPress. Idéal pour les boutiques sur-mesure avec beaucoup de contenu.",
        pros: ["Flexibilité totale", "SEO natif WordPress", "Coûts maîtrisés"],
        ideal: "PME, artisans, contenu riche"
    },
    {
        name: "Shopify",
        desc: "Plateforme SaaS clé en main. Parfait pour lancer rapidement avec un budget maîtrisé.",
        pros: ["Rapidité de mise en ligne", "Fiabilité hébergement", "Apps marketplace"],
        ideal: "Startups, dropshipping, lancement rapide"
    },
    {
        name: "PrestaShop",
        desc: "Solution open-source française. Pour les projets avec des besoins techniques spécifiques.",
        pros: ["Open-source", "Communauté française", "Fonctionnalités natives"],
        ideal: "Grands catalogues, B2B"
    }
];

const ECOMMERCE_PROCESS = [
    {
        step: "01",
        title: "Cahier des Charges",
        desc: "Définition de votre offre, cible, fonctionnalités et objectifs business."
    },
    {
        step: "02",
        title: "Architecture SEO",
        desc: "Structure des catégories optimisée pour le référencement et l'expérience utilisateur."
    },
    {
        step: "03",
        title: "Design & Maquettes",
        desc: "Design sur-mesure orienté conversion avec tunnel d'achat optimisé."
    },
    {
        step: "04",
        title: "Développement",
        desc: "Intégration technique avec performance et SEO au cœur du développement."
    },
    {
        step: "05",
        title: "Contenus & Produits",
        desc: "Rédaction des fiches produits SEO et import du catalogue."
    },
    {
        step: "06",
        title: "Tests & Lancement",
        desc: "Tests complets, formation à l'administration et mise en production."
    }
];

const ECOMMERCE_FAQ = [
    {
        question: "Combien coûte une boutique en ligne ?",
        answer: "Une boutique e-commerce professionnelle démarre à partir de **3 500€** pour une solution WooCommerce (jusqu'à 50 produits). Les prix varient selon la complexité : catalogue important, fonctionnalités spécifiques (B2B, abonnements, marketplace), design sur-mesure. Je vous fournis un **devis détaillé gratuit** après analyse de votre projet."
    },
    {
        question: "Quelle plateforme choisir : WooCommerce, Shopify ou PrestaShop ?",
        answer: "**WooCommerce** si vous voulez flexibilité et contrôle total, avec un bon potentiel SEO. **Shopify** si vous voulez lancer vite avec un budget prévisible (abonnement mensuel). **PrestaShop** pour les gros catalogues ou besoins B2B spécifiques. Je vous conseille la meilleure option selon votre contexte."
    },
    {
        question: "Comment le SEO est-il intégré à la boutique ?",
        answer: "Le SEO est pensé dès la conception : **architecture des catégories** optimisée, URLs propres, balises méta personnalisables, **fiches produits structurées** (Schema.org Product), vitesse de chargement optimisée, et maillage interne automatisé. C'est un avantage concurrentiel majeur dès le lancement."
    },
    {
        question: "Puis-je gérer ma boutique moi-même après la livraison ?",
        answer: "Absolument. L'administration est conçue pour être **simple et intuitive**. Vous pourrez ajouter/modifier des produits, gérer les commandes et suivre vos ventes. Une formation complète est incluse dans chaque projet, avec documentation personnalisée."
    },
    {
        question: "Quels moyens de paiement peuvent être intégrés ?",
        answer: "Tous les moyens de paiement standard : **Stripe** (CB, Apple Pay, Google Pay), **PayPal**, virement, chèque. Pour des besoins spécifiques (Alma pour le paiement fractionné, cryptomonnaies, etc.), c'est possible avec des modules additionnels."
    },
    {
        question: "Gérez-vous la logistique et les transporteurs ?",
        answer: "J'intègre les **transporteurs de votre choix** : Colissimo, Chronopost, Mondial Relay, DPD, etc. Calcul automatique des frais de port selon le poids/destination, suivi des colis, notifications clients. Connexion possible avec votre logiciel de gestion de stock."
    },
    {
        question: "En combien de temps ma boutique sera-t-elle en ligne ?",
        answer: "Comptez **6 à 10 semaines** pour une boutique e-commerce complète. Cela dépend de la taille du catalogue, des fonctionnalités et de votre réactivité pour valider les étapes. Un planning détaillé vous est fourni au démarrage."
    },
    {
        question: "Proposez-vous la maintenance après la mise en ligne ?",
        answer: "Oui, je propose des **forfaits de maintenance** incluant : mises à jour de sécurité, sauvegardes, monitoring, support technique et petites évolutions. C'est fortement recommandé pour un site e-commerce qui doit rester performant et sécurisé."
    }
];

const FEATURED_CITIES = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Lyon", slug: "consultant-seo-lyon" },
    { name: "Marseille", slug: "consultant-seo-marseille" },
    { name: "Bordeaux", slug: "consultant-seo-bordeaux" },
    { name: "Toulouse", slug: "consultant-seo-toulouse" },
];

export default function CreationBoutiqueClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Création de Boutique en Ligne",
                        "description": "Création de boutiques e-commerce optimisées pour le SEO et la conversion. WooCommerce, Shopify, PrestaShop.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "serviceType": "E-commerce Development",
                        "areaServed": "France"
                    })
                }}
            />

            <HeroServices
                title="Boutique en Ligne : Vendez Plus, Vendez Mieux"
                subtitle="Créez une boutique e-commerce performante, optimisée pour le référencement et conçue pour convertir. Du premier visiteur à la première vente, chaque élément compte."
                image="creation-site"
                category="E-commerce"
            />

            {/* Introduction SEO */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none"
                        >
                            <h2 className="text-3xl font-heading font-bold text-ink mb-6">
                                Pourquoi créer une <span className="text-sauge">boutique en ligne optimisée SEO</span> ?
                            </h2>
                            <p className="text-soft text-lg leading-relaxed mb-6">
                                En France, le <strong>e-commerce représente plus de 150 milliards d'euros</strong> de chiffre d'affaires annuel.
                                Pourtant, la majorité des boutiques en ligne peinent à attirer des visiteurs autrement que par la publicité payante.
                                La différence entre une boutique rentable et un gouffre financier ? <strong>Le référencement naturel</strong>.
                            </p>
                            <p className="text-soft text-lg leading-relaxed mb-6">
                                Une boutique en ligne bien référencée génère du trafic gratuit et qualifié 24h/24, 7j/7.
                                Contrairement aux publicités qui s'arrêtent dès que vous coupez le budget, le SEO est un <strong>investissement qui s'apprécie avec le temps</strong>.
                                Chaque page produit bien optimisée devient une porte d'entrée vers votre catalogue.
                            </p>
                            <p className="text-soft text-lg leading-relaxed">
                                En tant que <Link href="/consultant-seo" className="text-sauge hover:underline">consultante SEO</Link> spécialisée en e-commerce,
                                je conçois des boutiques pensées pour le <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link> dès le premier clic.
                                Architecture, performance, contenus : chaque élément est optimisé pour attirer des acheteurs, pas juste des visiteurs.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                            Ce qui fait la <span className="text-sauge">différence</span>
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Une boutique e-commerce n'est pas qu'un simple catalogue en ligne.
                            C'est une machine à vendre qui doit performer sur tous les fronts.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {ECOMMERCE_FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group"
                            >
                                <div className="mb-6 p-4 bg-sauge/10 rounded-2xl w-fit group-hover:bg-sauge group-hover:scale-110 transition-all duration-300">
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

            {/* Platforms */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                            Quelle plateforme pour <span className="text-sauge">votre boutique</span> ?
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Je travaille avec les meilleures solutions du marché et vous conseille
                            celle qui correspond le mieux à votre projet.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {PLATFORMS.map((platform, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
                            >
                                <h3 className="text-xl font-bold text-ink mb-3">{platform.name}</h3>
                                <p className="text-soft text-sm mb-4">{platform.desc}</p>
                                <ul className="space-y-2 mb-4">
                                    {platform.pros.map((pro, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-soft">
                                            <CheckCircle2 className="w-4 h-4 text-sauge" />
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-sauge font-semibold">
                                    Idéal pour : {platform.ideal}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold mb-4">
                            De l'idée à la <span className="text-sauge">première vente</span>
                        </h2>
                        <p className="text-lg text-soft-light max-w-2xl mx-auto">
                            Un processus structuré pour garantir le succès de votre boutique.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {ECOMMERCE_PROCESS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 p-6 rounded-2xl border border-white/10"
                            >
                                <span className="text-3xl font-bold text-sauge/50">{item.step}</span>
                                <h3 className="text-lg font-bold mt-2 mb-2">{item.title}</h3>
                                <p className="text-soft-light text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ce qui est inclus */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-ink mb-8 text-center">
                            Ce qui est <span className="text-sauge">inclus</span> dans chaque projet
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Design sur-mesure</h4>
                                        <p className="text-soft text-sm">Maquettes personnalisées validées avant développement</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Responsive Design</h4>
                                        <p className="text-soft text-sm">Parfait sur mobile, tablette et desktop</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">SEO intégré</h4>
                                        <p className="text-soft text-sm">Architecture et optimisations SEO natives</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Paiements sécurisés</h4>
                                        <p className="text-soft text-sm">Stripe, PayPal et CB intégrés</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Transporteurs</h4>
                                        <p className="text-soft text-sm">Intégration des livraisons (Colissimo, Mondial Relay...)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Analytics</h4>
                                        <p className="text-soft text-sm">Google Analytics 4, Search Console, tableau de bord</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Formation</h4>
                                        <p className="text-soft text-sm">Formation complète à la gestion de votre boutique</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-ink">Support</h4>
                                        <p className="text-soft text-sm">3 mois de support technique inclus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section SEO Local - Maillage */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Création de boutique e-commerce <span className="text-sauge">partout en France</span>
                        </h2>
                        <p className="text-soft mb-8">
                            Que vous soyez à Nice, Paris ou ailleurs, je vous accompagne dans la création
                            de votre boutique en ligne. Le travail peut se faire entièrement à distance
                            ou avec des rendez-vous en présentiel selon votre localisation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {FEATURED_CITIES.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${city.slug}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-sauge hover:text-white rounded-full text-sm font-medium transition-all border border-gray-100"
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
                            Besoin d'un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO</Link> de votre boutique existante ?
                            Ou d'une <Link href="/refonte-site-web" className="text-sauge hover:underline">refonte complète</Link> ?
                            <Link href="/contact" className="text-sauge hover:underline ml-1">Contactez-moi</Link> pour en discuter.
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Ressources pour votre <span className="text-sauge">e-commerce</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/blog/prix-creation-site-internet-2026" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Prix création site internet 2026
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Guide complet des tarifs : WooCommerce, Shopify, sur-mesure.
                                </p>
                            </Link>
                            <Link href="/blog/comment-creer-site-visible-google" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Comment créer une boutique visible sur Google
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Les bonnes pratiques SEO pour l'e-commerce.
                                </p>
                            </Link>
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/etudes-de-cas" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                Voir les études de cas e-commerce
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={ECOMMERCE_FAQ} title="Questions sur la Création de Boutique en Ligne" />

            <RelatedServices currentService="creation-boutique-en-ligne" />

            <HomepageBacklink variant="default" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à <span className="text-sauge">vendre en ligne</span> ?
                        </h2>
                        <p className="text-lg text-soft-light mb-10 max-w-xl mx-auto">
                            Discutons de votre projet et voyons ensemble comment créer une boutique qui génère des ventes.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                            >
                                Devis Gratuit
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
