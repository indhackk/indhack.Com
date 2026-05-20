"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

// Variations d'ancres pour le maillage interne vers la page d'accueil
// Mots-clés cibles homepage : consultant SEO, experte SEO, SEO Nice, référencement
// Ancres = variations sémantiques (pas exact match, mais liées au champ lexical)
const ANCHOR_VARIATIONS = [
    { text: "Votre experte SEO indépendante", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Consultante SEO indépendante", icon: <Home className="w-4 h-4" /> },
    { text: "Spécialiste SEO & acquisition", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Experte en référencement Google", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Accompagnement SEO personnalisé", icon: <Home className="w-4 h-4" /> },
    { text: "Votre consultante SEO dédiée", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Expert SEO Côte d'Azur", icon: <Home className="w-4 h-4" /> },
    { text: "Stratégie SEO sur-mesure", icon: <Sparkles className="w-4 h-4" /> },
];

interface HomepageBacklinkProps {
    variant?: "default" | "minimal" | "card";
    className?: string;
    // Permet de forcer un index spécifique pour les tests
    forceIndex?: number;
}

// Fonction de hachage déterministe basée sur le pathname
// Fonctionne de manière isomorphique (SSR + client)
function hashPathname(path: string): number {
    let hash = 0;
    for (let i = 0; i < path.length; i++) {
        hash = ((hash << 5) - hash) + path.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash) % ANCHOR_VARIATIONS.length;
}

export function HomepageBacklink({ variant = "default", className = "", forceIndex }: HomepageBacklinkProps) {
    // usePathname est isomorphique : même valeur SSR et client = pas de mismatch d'hydratation
    const pathname = usePathname();

    // Calcul déterministe de l'index : Googlebot voit la même ancre que le client
    const anchorIndex = forceIndex ?? hashPathname(pathname);
    const anchor = ANCHOR_VARIATIONS[anchorIndex];

    if (variant === "minimal") {
        return (
            <Link
                href="/"
                className={`inline-flex items-center gap-2 text-sauge hover:text-ink transition-colors font-medium ${className}`}
            >
                <ArrowLeft className="w-4 h-4" />
                <span>{anchor.text}</span>
            </Link>
        );
    }

    if (variant === "card") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`rounded-2xl border border-line bg-white p-5 shadow-sm ${className}`}
            >
                <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sauge/10 text-sauge">
                        {anchor.icon}
                    </span>
                    <span className="text-sm font-bold text-ink">IndHack</span>
                </div>
                <p className="text-soft text-sm leading-relaxed mb-4">
                    Revenir à la page mère pour situer l'accompagnement SEO, le contenu et la visibilité IA dans une stratégie complète.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sauge font-bold hover:text-ink transition-colors"
                >
                    {anchor.text}
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
            </motion.div>
        );
    }

    // Default variant
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`py-8 border-t border-gray-100 ${className}`}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                    <span className="text-soft text-sm">
                        Vous cherchez une stratégie SEO complète ?
                    </span>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-sauge/10 hover:bg-sauge text-sauge hover:text-white px-5 py-2.5 rounded-full transition-all font-bold text-sm"
                    >
                        {anchor.icon}
                        <span>{anchor.text}</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
