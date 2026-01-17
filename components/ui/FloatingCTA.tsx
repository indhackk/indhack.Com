"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle, Calendar } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";

export function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const { openAuditModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            // Affiche après 400px de scroll
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 400 && !isDismissed);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
    };

    const handleAuditClick = () => {
        openAuditModal();
        setIsExpanded(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    {/* Version compacte (bouton principal) */}
                    {!isExpanded && (
                        <motion.button
                            onClick={() => setIsExpanded(true)}
                            className="group relative flex items-center gap-3 bg-sauge text-white px-6 py-4 rounded-full shadow-2xl shadow-sauge/30 hover:shadow-sauge/50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-bold">Audit Gratuit</span>
                        </motion.button>
                    )}

                    {/* Version étendue (menu d'actions) */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-72"
                            >
                                {/* Header */}
                                <div className="bg-ink text-white p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">Besoin d'aide ?</p>
                                        <p className="text-xs text-white/60">Réponse sous 24h</p>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Actions */}
                                <div className="p-4 space-y-3">
                                    <button
                                        onClick={handleAuditClick}
                                        className="w-full flex items-center gap-3 p-3 bg-sauge/10 hover:bg-sauge text-ink hover:text-white rounded-xl transition-all group"
                                    >
                                        <div className="p-2 bg-sauge/20 group-hover:bg-white/20 rounded-lg">
                                            <Calendar className="w-5 h-5 text-sauge group-hover:text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">Audit SEO Gratuit</p>
                                            <p className="text-xs opacity-60">15 min d'analyse</p>
                                        </div>
                                    </button>

                                    <a
                                        href="tel:0661139748"
                                        className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-ink hover:text-white rounded-xl transition-all group"
                                    >
                                        <div className="p-2 bg-gray-100 group-hover:bg-white/20 rounded-lg">
                                            <Phone className="w-5 h-5 text-ink group-hover:text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">Appeler maintenant</p>
                                            <p className="text-xs opacity-60">06 61 13 97 48</p>
                                        </div>
                                    </a>
                                </div>

                                {/* Footer - Fermer */}
                                <div className="border-t border-gray-100 p-3">
                                    <button
                                        onClick={handleDismiss}
                                        className="w-full text-xs text-soft hover:text-ink transition-colors"
                                    >
                                        Ne plus afficher
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
