"use client";

import { motion } from "framer-motion";
import { Chrome, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    onConnect: () => void;
}

export function EmptyState({ onConnect }: EmptyStateProps) {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg text-center"
            >
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }}
                    className="relative mx-auto mb-8 w-32 h-32"
                >
                    {/* Background rings */}
                    <div className="absolute inset-0 rounded-full bg-sauge/5" />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-2 rounded-full bg-sauge/10"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        className="absolute inset-4 rounded-full bg-sauge/15"
                    />

                    {/* Icon container */}
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-sauge to-sauge/80 flex items-center justify-center shadow-lg shadow-sauge/30">
                        <Chrome className="w-8 h-8 text-white" />
                    </div>
                </motion.div>

                <h2 className="text-2xl font-bold text-ink mb-3">
                    Connectez votre fiche Google
                </h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    Pour commencer à automatiser vos réponses aux avis, connectez votre compte Google My Business.
                </p>

                <Button
                    onClick={onConnect}
                    className="bg-ink hover:bg-ink/90 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-lg shadow-ink/20 transition-all hover:shadow-xl hover:shadow-ink/30 hover:-translate-y-0.5"
                >
                    <Chrome className="w-5 h-5 mr-2" />
                    Connecter Google My Business
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Features list */}
                <div className="mt-12 grid grid-cols-3 gap-4 text-sm">
                    {[
                        { value: "5 min", label: "Setup rapide" },
                        { value: "100%", label: "Sécurisé" },
                        { value: "Illimité", label: "Avis gérés" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="p-4 rounded-xl bg-gray-50"
                        >
                            <p className="font-bold text-ink text-lg">{item.value}</p>
                            <p className="text-gray-500">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
