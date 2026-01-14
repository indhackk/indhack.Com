"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { ArrowRight } from "lucide-react";

interface HeroServicesProps {
    title: string;
    subtitle: string;
    category: string;
    image: string;
}

export function HeroServices({ title, subtitle, category, image }: HeroServicesProps) {
    const { openAuditModal } = useModal();

    return (
        <section className="relative pt-40 pb-24 bg-ink overflow-hidden min-h-[80vh] flex items-center">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sauge/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-sauge animate-pulse" />
                            <span className="text-sauge font-black text-xs uppercase tracking-[0.2em]">{category}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[0.9] uppercase tracking-tighter mb-8">
                            {title}
                        </h1>

                        <p className="text-xl lg:text-2xl text-white/60 leading-relaxed max-w-xl mb-12">
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-8 font-black tracking-wider shadow-2xl shadow-sauge/20 transition-all group"
                            >
                                DEMANDER UN AUDIT PRO
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                            <Image
                                src={image.startsWith('/') ? image : `/images/${image}.png`}
                                alt={title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-700" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
