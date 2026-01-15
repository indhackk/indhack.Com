"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { ArrowRight, Phone, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

const BrainCanvas = dynamic(() => import("@/components/BrainCanvas"), {
    ssr: false,
});

export function Hero() {
    const { openAuditModal } = useModal();
    const [showBrain, setShowBrain] = useState(false);

    useEffect(() => {
        // 🚀 PERFORMANCE: Only load 3D on desktop to save mobile data & performance
        if (window.matchMedia("(min-width: 768px)").matches) {
            setShowBrain(true);
        }
    }, []);

    return (
        <section className="relative bg-ink text-white overflow-hidden min-h-screen flex items-center">
            {/* Background Aura */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sauge/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-sauge/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24">
                {/* Value Proposition */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center lg:text-left space-y-8"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight text-white"
                    >
                        N°1 sur Google.<br />
                        <span className="text-sauge">Ou Rien.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-body text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    >
                        Arrêtez de payer pour des clics. Construisez un empire digital durable. IndHack transforme votre site anonyme en une <strong className="text-white">Machine de Guerre SEO</strong> qui capture vos clients avant vos concurrents.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6"
                    >
                        <Button
                            onClick={openAuditModal}
                            className="bg-sauge text-ink hover:bg-white hover:text-ink hover:scale-105 shadow-2xl shadow-sauge/30 rounded-full h-16 px-10 text-base font-bold transition-all duration-300 border-2 border-transparent hover:border-sauge"
                        >
                            Audit Gratuit
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        <a
                            href="tel:0661139748"
                            aria-label="Appeler le 06 61 13 97 48"
                            className="flex items-center justify-center gap-3 h-16 px-10 rounded-full border-2 border-white/20 text-white hover:border-sauge hover:bg-white/5 transition-all duration-300 group"
                        >
                            <Phone className="w-5 h-5 group-hover:text-sauge transition-colors" />
                            <span className="font-bold text-base">06 61 13 97 48</span>
                        </a>
                    </motion.div>

                </motion.div>

                {/* 3D Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="h-[400px] lg:h-[650px] w-full relative group cursor-grab active:cursor-grabbing"
                >
                    {showBrain && <BrainCanvas />}

                    {/* Interaction Hint - Only show if brain is shown? Or maybe easier to just hide it on mobile via CSS anyway */}
                    {showBrain && (
                        <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-40 transition-opacity flex items-center gap-2 pointer-events-none">
                            <MousePointer2 className="w-4 h-4" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Interagissez</span>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
