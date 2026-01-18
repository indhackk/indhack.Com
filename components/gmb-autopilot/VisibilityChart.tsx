"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, Eye } from "lucide-react";
import { VisibilityDataPoint } from "@/lib/gmb/types";

interface VisibilityChartProps {
    data: VisibilityDataPoint[];
    height?: number;
}

export function VisibilityChart({ data, height = 120 }: VisibilityChartProps) {
    if (!data || data.length === 0) return null;

    // Calculer min/max pour normaliser
    const scores = data.map(d => d.score);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const range = maxScore - minScore || 1;

    // Générer les points du path SVG
    const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((point.score - minScore) / range) * 80 - 10;
        return { x, y, ...point };
    });

    // Créer le path pour la ligne
    const linePath = points.map((point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        return `L ${point.x} ${point.y}`;
    }).join(' ');

    // Créer le path pour l'aire sous la courbe
    const areaPath = `${linePath} L 100 100 L 0 100 Z`;

    // Calculer la tendance
    const lastWeekAvg = points.slice(-7).reduce((sum, p) => sum + p.score, 0) / 7;
    const previousWeekAvg = points.slice(-14, -7).reduce((sum, p) => sum + p.score, 0) / 7;
    const trend = lastWeekAvg - previousWeekAvg;
    const trendPercent = ((trend / previousWeekAvg) * 100).toFixed(1);

    // Score actuel
    const currentScore = points[points.length - 1]?.score || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-sauge/10 rounded-xl">
                            <Eye className="w-5 h-5 text-sauge" />
                        </div>
                        <div>
                            <h4 className="font-bold text-ink">Évolution de la Visibilité</h4>
                            <p className="text-xs text-gray-500">30 derniers jours</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <motion.div
                            className="flex items-center gap-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                            <span className={`text-sm font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {trend >= 0 ? '+' : ''}{trendPercent}%
                            </span>
                        </motion.div>
                        <p className="text-xs text-gray-400">vs semaine précédente</p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="p-4">
                <div className="relative" style={{ height }}>
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        {/* Grille horizontale */}
                        {[20, 40, 60, 80].map(y => (
                            <line
                                key={y}
                                x1="0"
                                y1={y}
                                x2="100"
                                y2={y}
                                stroke="#e5e7eb"
                                strokeWidth="0.3"
                                strokeDasharray="2,2"
                            />
                        ))}

                        {/* Aire sous la courbe avec gradient */}
                        <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#6b8e71" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#6b8e71" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6b8e71" />
                                <stop offset="100%" stopColor="#4a6b4f" />
                            </linearGradient>
                        </defs>

                        <motion.path
                            d={areaPath}
                            fill="url(#areaGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />

                        {/* Ligne principale */}
                        <motion.path
                            d={linePath}
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Point actuel avec pulse */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            <motion.circle
                                cx={points[points.length - 1]?.x}
                                cy={points[points.length - 1]?.y}
                                r="2"
                                fill="#6b8e71"
                                animate={{
                                    r: [2, 3, 2],
                                    opacity: [1, 0.7, 1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2
                                }}
                            />
                            <circle
                                cx={points[points.length - 1]?.x}
                                cy={points[points.length - 1]?.y}
                                r="1"
                                fill="white"
                            />
                        </motion.g>
                    </svg>

                    {/* Score actuel affiché */}
                    <motion.div
                        className="absolute top-2 right-2 bg-sauge text-white px-3 py-1.5 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <p className="text-[10px] opacity-80">Score actuel</p>
                        <p className="text-xl font-bold">{currentScore}</p>
                    </motion.div>
                </div>

                {/* Légende temporelle */}
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Il y a 30j
                    </span>
                    <span>Aujourd'hui</span>
                </div>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-3 border-t border-gray-100">
                <StatItem
                    label="Score moyen"
                    value={Math.round(scores.reduce((a, b) => a + b, 0) / scores.length).toString()}
                    suffix="/100"
                />
                <StatItem
                    label="Avis traités"
                    value={data.reduce((sum, d) => sum + d.reviewsCount, 0).toString()}
                    suffix=" avis"
                />
                <StatItem
                    label="Mots-clés"
                    value={data.reduce((sum, d) => sum + d.keywordsUsed, 0).toString()}
                    suffix=" utilisés"
                />
            </div>
        </motion.div>
    );
}

function StatItem({ label, value, suffix }: { label: string; value: string; suffix: string }) {
    return (
        <motion.div
            className="p-3 text-center border-r border-gray-100 last:border-r-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="font-bold text-ink">
                {value}
                <span className="text-xs font-normal text-gray-400">{suffix}</span>
            </p>
        </motion.div>
    );
}
