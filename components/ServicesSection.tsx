"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    {
        title: "Audit SEO Complet",
        desc: "Analyse approfondie de votre site pour détecter les freins à votre visibilité et cartographier les opportunités de croissance.",
        icon: <Search className="w-8 h-8" />,
        href: "/audit-seo"
    },
    {
        title: "Référencement Naturel",
        desc: "Stratégie sur-mesure pour conquérir les premières positions sur Google et générer un trafic qualifié durable.",
        icon: <TrendingUp className="w-8 h-8" />,
        href: "/referencement-naturel"
    },
    {
        title: "Création de Site Web",
        desc: "Sites rapides, élégants et pensés pour la conversion. Optimisés pour le référencement dès la première ligne de code.",
        icon: <Sparkles className="w-8 h-8" />,
        href: "/creation-site-web"
    },
    {
        title: "Refonte et Migration",
        desc: "Modernisez votre site sans perdre une once de trafic. Sécurisation totale de votre référencement existant.",
        icon: <RefreshCw className="w-8 h-8" />,
        href: "/refonte-site-web"
    }
];

export function ServicesSection() {
    return (
        <section className="py-20 bg-white" id="services">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm"
                    >
                        Expertises
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-ink leading-[1.1] tracking-tight mb-6"
                    >
                        Des solutions qui<br />
                        <span className="text-sauge">transforment votre business</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-soft leading-relaxed"
                    >
                        Accompagnement complet pour propulser votre visibilité et générer une croissance mesurable.
                    </motion.p>
                </div>

                {/* Grid Services - Design Épuré et Magnifique */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <Link
                                href={service.href}
                                className="group block h-full"
                            >
                                <div className="relative h-full bg-gray-50 rounded-3xl p-10 hover:bg-white hover:shadow-2xl hover:shadow-sauge/10 border border-transparent hover:border-sauge/20 transition-all duration-500">

                                    {/* Icône */}
                                    <div className="mb-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-sauge shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                        {service.icon}
                                    </div>

                                    {/* Titre */}
                                    <h3 className="text-2xl font-heading font-bold text-ink mb-4 tracking-tight group-hover:text-sauge transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-soft leading-relaxed mb-8">
                                        {service.desc}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center text-sauge font-bold text-sm group-hover:gap-2 gap-1 transition-all">
                                        <span>Découvrir</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
