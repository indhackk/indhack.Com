"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Award, HeartHandshake, CheckCircle } from "lucide-react";

const TRUST_POINTS = [
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Expertise certifiée",
        description: "Formation continue, certifications Google"
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Résultats mesurables",
        description: "KPIs clairs, reporting transparent"
    },
    {
        icon: <HeartHandshake className="w-6 h-6" />,
        title: "Relation directe",
        description: "Pas d'intermédiaire, je suis votre contact unique"
    },
    {
        icon: <Award className="w-6 h-6" />,
        title: "Méthode éprouvée",
        description: "+150 projets SEO menés à bien"
    }
];

const BADGES = [
    "Google Analytics",
    "Search Console",
    "Screaming Frog",
    "Ahrefs",
    "SEMrush",
    "Core Web Vitals"
];

interface TrustSignalsProps {
    variant?: "compact" | "full";
}

export function TrustSignals({ variant = "full" }: TrustSignalsProps) {
    if (variant === "compact") {
        return (
            <section className="py-12 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                        {TRUST_POINTS.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="p-2 bg-sauge/10 rounded-lg text-sauge">
                                    {point.icon}
                                </div>
                                <span className="font-medium text-ink text-sm">
                                    {point.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-sm font-bold tracking-[0.2em] uppercase text-sauge mb-4"
                    >
                        Pourquoi me faire confiance
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6"
                    >
                        Une approche <span className="text-sauge">différente</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-soft max-w-2xl mx-auto"
                    >
                        Consultante SEO indépendante, je mets mon expertise à votre service
                        avec transparence et engagement.
                    </motion.p>
                </div>

                {/* Trust Points Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {TRUST_POINTS.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 bg-gray-50 rounded-2xl hover:bg-ink transition-all duration-300"
                        >
                            <div className="p-3 bg-sauge/10 group-hover:bg-sauge/20 rounded-xl w-fit mb-4 text-sauge transition-colors">
                                {point.icon}
                            </div>
                            <h3 className="font-bold text-ink group-hover:text-white mb-2 transition-colors">
                                {point.title}
                            </h3>
                            <p className="text-sm text-soft group-hover:text-white/60 transition-colors">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Tools & Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-gray-50 rounded-3xl p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">
                                Outils & Technologies
                            </h3>
                            <p className="text-soft text-sm">
                                J'utilise les meilleurs outils du marché pour des analyses précises.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {BADGES.map((badge, i) => (
                                <motion.span
                                    key={badge}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-ink"
                                >
                                    <CheckCircle className="w-4 h-4 text-sauge" />
                                    {badge}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
