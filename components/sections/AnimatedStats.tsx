"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

const STATS = [
    {
        icon: <TrendingUp className="w-8 h-8" />,
        value: 150,
        suffix: "+",
        label: "Sites optimisés",
        description: "Projets SEO réussis"
    },
    {
        icon: <Users className="w-8 h-8" />,
        value: 98,
        suffix: "%",
        label: "Clients satisfaits",
        description: "Taux de recommandation"
    },
    {
        icon: <Award className="w-8 h-8" />,
        value: 8,
        suffix: " ans",
        label: "D'expérience",
        description: "En référencement naturel"
    },
    {
        icon: <Clock className="w-8 h-8" />,
        value: 48,
        suffix: "h",
        label: "Temps de réponse",
        description: "Audit livré sous 48h"
    }
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);

            // Easing function pour une animation plus naturelle
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

interface AnimatedStatsProps {
    title?: string;
    subtitle?: string;
    variant?: "light" | "dark";
}

export function AnimatedStats({
    title = "Des résultats concrets",
    subtitle = "Une expertise SEO qui se mesure",
    variant = "dark"
}: AnimatedStatsProps) {
    const isDark = variant === "dark";

    return (
        <section className={`py-20 ${isDark ? "bg-ink" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`text-sm font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? "text-sauge" : "text-sauge"
                            }`}
                    >
                        {subtitle}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`text-3xl md:text-4xl font-heading font-bold ${isDark ? "text-white" : "text-ink"
                            }`}
                    >
                        {title}
                    </motion.h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1 }}
                            className={`text-center p-6 md:p-8 rounded-3xl border ${isDark
                                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                                    : "bg-white border-gray-100 hover:border-sauge/30 hover:shadow-xl"
                                } transition-all duration-300`}
                        >
                            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDark ? "bg-sauge/20 text-sauge" : "bg-sauge/10 text-sauge"
                                }`}>
                                {stat.icon}
                            </div>

                            <div className={`text-4xl md:text-5xl font-bold mb-2 ${isDark ? "text-white" : "text-ink"
                                }`}>
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>

                            <p className={`font-bold mb-1 ${isDark ? "text-white" : "text-ink"}`}>
                                {stat.label}
                            </p>
                            <p className={`text-sm ${isDark ? "text-white/50" : "text-soft"}`}>
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
