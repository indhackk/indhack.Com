"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { motion } from "framer-motion";
import { RefreshCw, ShieldCheck, Zap, BarChart3, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

const REFONTE_FEATURES = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-sauge" />,
        title: "Sécurisation du SEO",
        desc: "Plan de redirection 301 strict pour conserver 100% de votre historique de positionnement."
    },
    {
        icon: <Zap className="w-8 h-8 text-sauge" />,
        title: "Optimisation performance web",
        desc: "Un nouveau site qui charge à la vitesse de l'éclair pour plaire aux algorithmes de Google."
    },
    {
        icon: <RefreshCw className="w-8 h-8 text-sauge" />,
        title: "Migration Sémantique",
        desc: "Refonte de l'arborescence pour une structure plus cohérente et plus puissante."
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-sauge" />,
        title: "Suivi Post-Lancement",
        desc: "Monitoring temps réel des KPIs pour rectifier instantanément la moindre baisse de trafic."
    }
];

const REFONTE_FAQ = [
    {
        question: "Vais-je perdre mon trafic actuel lors d'une refonte ?",
        answer: "Sans expertise, le risque est de <strong>80% de perte de trafic</strong>. Avec mon accompagnement, l'objectif est une <strong>migration neutre ou positive</strong>. Je sécurise chaque URL via un plan de redirection chirurgical."
    },
    {
        question: "Dois-je modifier mes contenus lors de la refonte ?",
        answer: "C'est le moment idéal pour faire un <strong>élagage sémantique</strong>. On conserve ce qui ranke, on optimise ce qui sous-performe, et on supprime les pages inutiles qui pénalisent votre budget de crawl."
    },
    {
        question: "Combien de temps faut-il pour voir les résultats après une refonte ?",
        answer: "Google met généralement <strong>4 à 8 semaines</strong> pour ré-indexer totalement une nouvelle structure. Pendant cette phase, le suivi technique est quotidien pour s'assurer que le passage des bots se fait sans accroc."
    }
];

export default function RefonteSitePage() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Refonte de Site Web SEO",
                        "description": "Refonte de site web avec migration SEO sécurisée et optimisation technique.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "serviceType": "Web Design & SEO Migration",
                        "areaServed": "France"
                    })
                }}
            />

            <HeroServices
                title="Refonte de site web : Sécurisez votre héritage SEO"
                subtitle="Ne prenez pas le risque de tout perdre. Je pilote la migration technique et sémantique de votre nouveau site pour une transition 100% invisible pour Google."
                image="creation-site"
                category="Expertise Technique"
            />

            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-heading font-bold text-ink mb-6 uppercase tracking-tighter"
                        >
                            Une migration sans <span className="text-sauge">accroc</span>
                        </motion.h2>
                        <p className="text-xl text-soft leading-relaxed">
                            Une refonte graphique c'est bien. Une refonte qui conserve vos <strong>positions SEO</strong>, c'est vital.
                            J'interviens comme garde-fou technique entre votre agence web et vos résultats.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {REFONTE_FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-sauge/20 hover:shadow-xl transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-4">{feature.title}</h3>
                                <p className="text-soft leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <p className="text-sauge font-bold tracking-widest uppercase mb-4">La Méthode</p>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                                Refondre son site sans <br />
                                sacrifier son <span className="text-sauge">acquisition</span>.
                            </h2>
                            <div className="space-y-6">
                                <ProcessItem num="01" title="Audit Pré-Refonte" text="Identification des pages top performers et des 'quick wins' sémantiques." />
                                <ProcessItem num="02" title="Mapping de Redirection" text="Établissement du plan de redirection 301 pour éviter les erreurs 404 en masse." />
                                <ProcessItem num="03" title="Recettage Technique" text="Analyse du site en pré-production pour valider le balisage et la performance." />
                                <ProcessItem num="04" title="Go-Live & Suivi" text="Surveillance accrue de la Search Console et rafraîchissement manuel de l'index." />
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/seo-dashboard.png"
                                    alt="Monitoring SEO"
                                    width={800}
                                    height={600}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ items={REFONTE_FAQ} title="Questions sur la refonte SEO" />

            {/* Final CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <RefreshCw className="w-40 h-40 text-sauge" />
                        </div>
                        <h2 className="text-4xl font-heading font-bold text-ink mb-6 uppercase tracking-tighter">
                            Vous lancez votre nouveau site <span className="text-sauge">bientôt</span> ?
                        </h2>
                        <p className="text-xl text-soft mb-12 max-w-2xl mx-auto">
                            Ne laissez pas la technique au hasard. Sécurisez votre trafic dès aujourd'hui.
                        </p>
                        <Button
                            onClick={openAuditModal}
                            size="lg"
                            className="bg-sauge text-white hover:bg-ink rounded-full px-12 py-8 text-xl font-bold shadow-xl shadow-sauge/20"
                        >
                            PILOTER MON PROJET
                            <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </section>

        </main>
    );
}

function ProcessItem({ num, title, text }: { num: string; title: string, text: string }) {
    return (
        <div className="flex gap-6 items-start pb-8 border-b border-white/10 last:border-0">
            <span className="text-2xl font-bold text-sauge/50">{num}</span>
            <div>
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
