"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";

export function CTASection() {
    const { openAuditModal } = useModal();

    return (
        <section className="py-16 bg-ink text-white overflow-hidden relative">
            {/* Minimalist Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Powerful Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sauge/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 mb-8">
                        <Sparkles className="w-4 h-4 text-sauge" />
                        <span className="text-sauge font-bold text-xs uppercase tracking-[0.2em]">Accélérez votre croissance</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 uppercase tracking-tighter leading-[0.95]">
                        Parlons enfin de votre <br />
                        <span className="text-sauge">Performance Business</span>.
                    </h2>

                    <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Le SEO est un moteur de revenus, pas un coût. <br />
                        Échangeons sur votre stratégie lors d'un audit offert.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            size="lg"
                            onClick={openAuditModal}
                            className="bg-white text-ink hover:bg-sauge hover:text-white rounded-full px-12 py-9 text-xl font-bold shadow-2xl shadow-white/20 group transition-all hover:-translate-y-0.5"
                        >
                            DÉBUTER L'AUDIT
                            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-ink rounded-full px-12 py-9 text-xl font-bold transition-all"
                            >
                                <Send className="mr-3 w-6 h-6" />
                                ME CONTACTER
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-10 opacity-30">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold italic">RAPIDE</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold italic">EFFICACE</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold italic">RENTABLE</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
