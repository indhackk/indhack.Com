"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
    return (
        <section className="py-16 bg-white overflow-hidden" id="about-teaser">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Image - Épurée et Premium */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative max-w-sm mx-auto flex justify-center"
                    >
                        <div className="relative group w-full">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-sauge/20 transition-all duration-700">
                                <Image
                                    src="/images/indiana-aflalo.jpg"
                                    alt="Indiana Aflalo - Consultante SEO Freelance"
                                    width={400}
                                    height={500}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Expertise & Rigueur</p>

                        <h2 className="text-4xl lg:text-5xl font-heading font-bold tracking-tighter text-ink mb-8 leading-[0.95] uppercase">
                            Votre succès organique <br />
                            entre de bonnes <span className="text-sauge">mains</span>.
                        </h2>

                        <div className="space-y-6 text-lg text-soft leading-relaxed mb-10">
                            <p>
                                Diplômée d'un double master en <strong>stratégie digitale</strong> et expérience utilisateur, <strong>j'accompagne</strong> des entreprises ambitieuses dans leur conquête des premières places sur Google.
                            </p>
                            <p>
                                Une méthodologie axée sur la <strong>performance technique</strong>, la pertinence sémantique et l'optimisation pour les nouveaux moteurs de recherche alimentés par intelligence artificielle.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/a-propos">
                                <Button className="bg-accent text-white hover:bg-accent-hover shadow-xl shadow-accent/20 transition-all rounded-full px-10 py-7 font-bold tracking-wider group uppercase hover:-translate-y-0.5">
                                    DÉCOUVRIR LE PARCOURS
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-10 py-7 font-bold tracking-wider transition-all uppercase">
                                    ME CONTACTER
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
