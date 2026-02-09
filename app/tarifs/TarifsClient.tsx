"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    CheckCircle2,
    ArrowRight,
    Phone,
    Search,
    TrendingUp,
    Globe,
    Zap,
    Shield,
    Clock,
    Star
} from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";

const PRICING = [
    {
        name: "Audit SEO Complet",
        price: "490",
        suffix: "€",
        description: "Le point de départ indispensable",
        popular: false,
        features: [
            "Audit technique complet (indexation, vitesse, Core Web Vitals)",
            "Analyse sémantique et mots-clés",
            "Benchmark concurrentiel (3 concurrents)",
            "Profil de backlinks",
            "Roadmap priorisée par impact",
            "Présentation des résultats (1h)",
            "Livraison sous 10 jours"
        ],
        cta: "Commander un audit",
        link: "/audit-seo"
    },
    {
        name: "Accompagnement SEO",
        price: "890",
        suffix: "€/mois",
        description: "Croissance durable et mesurable",
        popular: true,
        features: [
            "Audit initial inclus",
            "Optimisations techniques mensuelles",
            "Rédaction SEO (2-4 contenus/mois)",
            "Suivi des positions et reporting",
            "Netlinking ciblé",
            "Support prioritaire",
            "Point mensuel stratégique (1h)",
            "Engagement minimum 3 mois"
        ],
        cta: "Démarrer l'accompagnement",
        link: "/referencement-naturel"
    },
    {
        name: "Création de Site + SEO",
        price: "2 490",
        suffix: "€",
        description: "Site performant dès le départ",
        popular: false,
        features: [
            "Site vitrine jusqu'à 10 pages",
            "Design sur-mesure responsive",
            "Architecture SEO optimisée",
            "Intégration Google Analytics & Search Console",
            "Formation à la gestion du site",
            "Hébergement 1ère année offert",
            "Maintenance 3 mois incluse",
            "Livraison sous 4-6 semaines"
        ],
        cta: "Lancer mon projet",
        link: "/creation-site-web"
    }
];

const FAQ = [
    {
        question: "Comment se déroule le paiement ?",
        answer: "L'audit SEO est payable à la commande. L'accompagnement mensuel est facturé en début de mois. Pour la création de site, un acompte de 40% est demandé au démarrage, le solde à la livraison."
    },
    {
        question: "Proposez-vous des facilités de paiement ?",
        answer: "Oui, pour les projets importants (>3000€), je propose un paiement en 2 ou 3 fois sans frais. N'hésitez pas à en discuter lors de notre premier échange."
    },
    {
        question: "Y a-t-il un engagement minimum pour l'accompagnement ?",
        answer: "L'engagement minimum est de 3 mois. Le SEO demande du temps pour porter ses fruits. Après cette période initiale, vous pouvez arrêter avec un préavis d'un mois."
    },
    {
        question: "Les tarifs incluent-ils la TVA ?",
        answer: "Les tarifs affichés sont HT. TVA non applicable (article 293 B du CGI - auto-entrepreneur)."
    },
    {
        question: "Que se passe-t-il si le projet est plus complexe ?",
        answer: "Ces tarifs sont des bases. Un devis personnalisé gratuit vous est systématiquement proposé après analyse de votre projet. Aucune surprise sur la facture finale."
    },
    {
        question: "Proposez-vous des forfaits sur-mesure ?",
        answer: "Absolument. Chaque entreprise a des besoins spécifiques. Contactez-moi pour un devis adapté : accompagnement intensif, formation d'équipe, refonte SEO..."
    }
];

const GUARANTEES = [
    { icon: <Shield className="w-6 h-6" />, title: "Transparence totale", desc: "Pas de frais cachés" },
    { icon: <Clock className="w-6 h-6" />, title: "Réponse 24h", desc: "Devis rapide" },
    { icon: <Star className="w-6 h-6" />, title: "Satisfaction", desc: "Ajustements inclus" },
    { icon: <Zap className="w-6 h-6" />, title: "Résultats mesurables", desc: "Reporting clair" }
];

export default function TarifsClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-ink text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <p className="text-sauge font-medium mb-4 text-sm uppercase tracking-wider">
                                Tarifs Transparents
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Des <span className="text-sauge">tarifs clairs</span>,
                                <br />pas de mauvaises surprises
                            </h1>
                            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Investissez dans votre visibilité avec des forfaits adaptés à chaque besoin.
                                Devis gratuit et personnalisé pour chaque projet.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    onClick={openAuditModal}
                                    className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold"
                                >
                                    Devis Gratuit
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <a href="tel:0661139748">
                                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        06 61 13 97 48
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Guarantees */}
            <section className="py-10 bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {GUARANTEES.map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-sauge/10 flex items-center justify-center text-sauge">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-ink text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-soft">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {PRICING.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative rounded-3xl p-8 ${
                                    plan.popular
                                        ? "bg-ink text-white ring-4 ring-sauge scale-105"
                                        : "bg-white border border-gray-200"
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sauge text-white text-xs font-bold px-4 py-1 rounded-full">
                                        POPULAIRE
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className={`text-xl font-heading font-bold mb-2 ${plan.popular ? "text-white" : "text-ink"}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm mb-4 ${plan.popular ? "text-white/70" : "text-soft"}`}>
                                        {plan.description}
                                    </p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-sm ${plan.popular ? "text-white/60" : "text-soft"}`}>à partir de</span>
                                    </div>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-ink"}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-lg ${plan.popular ? "text-white/60" : "text-soft"}`}>
                                            {plan.suffix}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-sauge" : "text-sauge"}`} />
                                            <span className={plan.popular ? "text-white/90" : "text-soft"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={plan.link}>
                                    <Button
                                        className={`w-full rounded-xl py-6 font-semibold ${
                                            plan.popular
                                                ? "bg-sauge text-white hover:bg-white hover:text-ink"
                                                : "bg-ink text-white hover:bg-sauge"
                                        }`}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-soft mb-4">
                            Ces tarifs sont indicatifs. Chaque projet est unique et mérite un devis personnalisé.
                        </p>
                        <Link href="/etudes-de-cas" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                            Voir les résultats obtenus
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Other Services */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Autres prestations sur <span className="text-sauge">devis</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                <Globe className="w-8 h-8 text-sauge mb-4" />
                                <h3 className="font-bold text-ink mb-2">Refonte de Site + Migration SEO</h3>
                                <p className="text-soft text-sm mb-4">
                                    Refonte complète avec conservation de votre référencement.
                                    Plan de redirection, audit pré-migration, suivi post-lancement.
                                </p>
                                <Link href="/refonte-site-web" className="text-sauge font-semibold text-sm hover:underline">
                                    En savoir plus →
                                </Link>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                <TrendingUp className="w-8 h-8 text-sauge mb-4" />
                                <h3 className="font-bold text-ink mb-2">SEO Local Intensif</h3>
                                <p className="text-soft text-sm mb-4">
                                    Pack complet pour dominer les recherches locales.
                                    Google Business Profile, citations, avis, pages locales.
                                </p>
                                <Link href="/seo-local" className="text-sauge font-semibold text-sm hover:underline">
                                    En savoir plus →
                                </Link>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                <Search className="w-8 h-8 text-sauge mb-4" />
                                <h3 className="font-bold text-ink mb-2">Formation SEO</h3>
                                <p className="text-soft text-sm mb-4">
                                    Formation personnalisée pour votre équipe.
                                    De 1 jour à 3 jours selon le niveau souhaité.
                                </p>
                                <Link href="/contact" className="text-sauge font-semibold text-sm hover:underline">
                                    Me contacter →
                                </Link>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                <Zap className="w-8 h-8 text-sauge mb-4" />
                                <h3 className="font-bold text-ink mb-2">Création E-commerce</h3>
                                <p className="text-soft text-sm mb-4">
                                    Boutique en ligne optimisée SEO dès la conception.
                                    WooCommerce ou Shopify selon vos besoins.
                                </p>
                                <Link href="/creation-boutique-en-ligne" className="text-sauge font-semibold text-sm hover:underline">
                                    En savoir plus →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-ink mb-12 text-center">
                            Questions sur les <span className="text-sauge">tarifs</span>
                        </h2>
                        <div className="space-y-6">
                            {FAQ.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gray-50 p-6 rounded-2xl"
                                >
                                    <h3 className="font-bold text-ink mb-2">{faq.question}</h3>
                                    <p className="text-soft">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à investir dans votre <span className="text-sauge">visibilité</span> ?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                            Premier échange gratuit pour comprendre vos besoins et vous proposer la meilleure solution.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold"
                            >
                                Demander un Devis
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link href="/contact">
                                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                    Me contacter
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Schema FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <HomepageBacklink variant="default" />
        </main>
    );
}
