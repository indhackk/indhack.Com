"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { motion } from "framer-motion";
import { MapPin, Star, TrendingUp, Users, ArrowRight, CheckCircle2, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

const LOCAL_SEO_BENEFITS = [
    {
        icon: <MapPin className="w-8 h-8 text-sauge" />,
        title: "Visibilité Géolocalisée",
        desc: "Apparaissez dans le Pack Local de Google pour toutes les recherches 'près de moi'."
    },
    {
        icon: <Star className="w-8 h-8 text-sauge" />,
        title: "Avis et Réputation",
        desc: "Stratégie d'acquisition d'avis Google pour renforcer votre crédibilité."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-sauge" />,
        title: "Trafic Qualifié",
        desc: "78% des recherches locales aboutissent à un achat dans les 24h."
    },
    {
        icon: <Users className="w-8 h-8 text-sauge" />,
        title: "Dominez votre Zone",
        desc: "Devenez la référence locale incontournable de votre secteur."
    }
];

const SEO_LOCAL_PROCESS = [
    {
        step: "01",
        title: "Audit Local",
        desc: "Analyse de votre fiche Google Business Profile, citations locales et concurrence géolocalisée."
    },
    {
        step: "02",
        title: "Optimisation Profil",
        desc: "Configuration experte : catégories, horaires, attributs, photos optimisées, posts réguliers."
    },
    {
        step: "03",
        title: "Citations Locales",
        desc: "Inscription dans les annuaires pertinents avec cohérence des informations partout."
    },
    {
        step: "04",
        title: "Contenu Géolocalisé",
        desc: "Création de pages optimisées pour chaque ville ou quartier que vous ciblez."
    },
    {
        step: "05",
        title: "Stratégie Avis",
        desc: "Mise en place d'un système d'acquisition d'avis clients authentiques."
    },
    {
        step: "06",
        title: "Suivi Mensuel",
        desc: "Tableau de bord : positions locales, visibilité, appels générés, retour sur investissement."
    }
];

// FAQ sans gras dans les questions
const LOCAL_SEO_FAQ = [
    {
        question: "Pourquoi investir dans le référencement local ?",
        answer: "Parce que 46% de toutes les recherches Google ont une intention locale. Si vous avez un point de vente ou une zone d'intervention précise, le SEO local est le levier le plus rentable pour générer du trafic qualifié."
    },
    {
        question: "Quelle différence entre SEO classique et SEO local ?",
        answer: "Le SEO local cible des requêtes géolocalisées comme 'restaurant Paris 11' ou 'plombier Lyon'. Il s'appuie sur votre fiche Google Business Profile, les avis clients et les annuaires locaux."
    },
    {
        question: "Combien de temps pour voir des résultats ?",
        answer: "Les premiers résultats apparaissent entre 2 et 6 semaines après l'optimisation de votre profil Google. C'est beaucoup plus rapide que le SEO classique car la concurrence locale est moins intense."
    },
    {
        question: "Comment améliorer mon classement dans le Pack Local ?",
        answer: "Trois facteurs clés : optimisation complète de Google Business Profile, avis clients réguliers (minimum 5 nouveaux par mois), et citations cohérentes dans les annuaires locaux."
    },
    {
        question: "Le SEO local fonctionne-t-il sans point de vente ?",
        answer: "Oui ! Si vous intervenez dans une zone géographique précise (plombier, coach, consultant...), vous pouvez masquer votre adresse tout en ciblant votre zone de service."
    },
    {
        question: "Combien coûte une prestation de référencement local ?",
        answer: "Les prestations démarrent à 790€ pour un audit local complet + optimisation initiale. Accompagnement mensuel à partir de 490€/mois. Retour sur investissement moyen constaté : x5 à x10."
    }
];

export default function SeoLocalPage() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "IndHack - Référencement Local",
                        "description": "Experte en référencement local Google pour PME et commerces.",
                        "url": "https://indhack.com/seo-local",
                        "telephone": "+33661139748",
                        "priceRange": "€€",
                        "areaServed": { "@type": "Country", "name": "France" },
                        "serviceType": ["Référencement Local", "SEO Local", "Google Business Profile"]
                    })
                }}
            />

            <HeroServices
                title="Référencement Local : Optimisez votre visibilité de proximité"
                subtitle="Ciblez les recherches locales stratégiques. Une approche complète pour capter le trafic qualifié dans votre zone géographique."
                image="seo-dashboard"
                category="SEO Géolocalisé"
            />

            {/* Section Bénéfices */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            La recherche locale est <span className="text-sauge">décisive</span>
                        </h2>
                        <p className="text-lg text-soft">
                            Une grande partie de vos clients potentiels effectuent une recherche locale avant de se déplacer ou de contacter un professionnel.
                            Être visible à ce moment précis est essentiel.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {LOCAL_SEO_BENEFITS.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group text-center h-full flex flex-col items-center"
                            >
                                <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit mx-auto transition-transform duration-300 group-hover:scale-110">
                                    <div className="text-sauge">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-ink mb-3">{benefit.title}</h3>
                                <p className="text-soft text-sm leading-relaxed">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Processus */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Méthodologie</p>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            Ma méthode en <span className="text-sauge">6 étapes</span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {SEO_LOCAL_PROCESS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex gap-6 items-start group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-sauge font-bold text-xl shadow-sm group-hover:bg-sauge group-hover:text-white transition-all">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-ink mb-2">{item.title}</h3>
                                    <p className="text-soft">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Le référencement local <span className="text-sauge">en chiffres</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">46%</p>
                            <p className="text-sm text-white/60">Des recherches sont locales</p>
                        </div>
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">78%</p>
                            <p className="text-sm text-white/60">Aboutissent à un achat en 24h</p>
                        </div>
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">88%</p>
                            <p className="text-sm text-white/60">Font confiance aux avis</p>
                        </div>
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">x5</p>
                            <p className="text-sm text-white/60">Retour sur investissement moyen</p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={LOCAL_SEO_FAQ} title="Questions sur le Référencement Local" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à dominer <span className="text-sauge">votre ville</span> ?
                        </h2>
                        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                            Audit local gratuit : découvrez comment vos concurrents vous dépassent et comment les rattraper.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                            >
                                Audit gratuit
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
