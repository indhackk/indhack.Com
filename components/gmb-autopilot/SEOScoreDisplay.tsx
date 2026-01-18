"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Target, MapPin, Zap, Info, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SEOImpactScore, SEOSuggestion } from "@/lib/gmb/types";

interface SEOScoreDisplayProps {
    score: SEOImpactScore;
    compact?: boolean;
}

export function SEOScoreDisplay({ score, compact = false }: SEOScoreDisplayProps) {
    const [showDetails, setShowDetails] = useState(false);

    const getScoreColor = (value: number) => {
        if (value >= 80) return 'text-green-500';
        if (value >= 60) return 'text-yellow-500';
        if (value >= 40) return 'text-orange-500';
        return 'text-red-500';
    };

    const getScoreGradient = (value: number) => {
        if (value >= 80) return 'from-green-500 to-emerald-600';
        if (value >= 60) return 'from-yellow-500 to-amber-600';
        if (value >= 40) return 'from-orange-500 to-red-500';
        return 'from-red-500 to-red-700';
    };

    const getGrade = (value: number) => {
        if (value >= 85) return 'A';
        if (value >= 70) return 'B';
        if (value >= 55) return 'C';
        if (value >= 40) return 'D';
        return 'F';
    };

    if (compact) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
            >
                <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${getScoreGradient(score.overall)} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className={`text-sm font-bold ${getScoreColor(score.overall)}`}>
                            {score.overall}
                        </span>
                    </div>
                </div>
                <div className="text-xs">
                    <p className="font-medium text-ink">SEO Score</p>
                    <p className="text-green-600">+{score.projectedVisibilityBoost}% visibilité</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 overflow-hidden"
        >
            {/* Header avec score principal */}
            <div className="p-4 bg-gradient-to-r from-sauge/5 to-transparent">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Score circulaire animé */}
                        <motion.div
                            className="relative"
                            initial={{ rotate: -90 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <svg className="w-20 h-20 transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="#e5e7eb"
                                    strokeWidth="6"
                                    fill="none"
                                />
                                <motion.circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="url(#scoreGradient)"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: "0, 226" }}
                                    animate={{
                                        strokeDasharray: `${(score.overall / 100) * 226}, 226`
                                    }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                />
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={score.overall >= 70 ? '#10b981' : '#f59e0b'} />
                                        <stop offset="100%" stopColor={score.overall >= 70 ? '#059669' : '#d97706'} />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    className={`text-2xl font-bold ${getScoreColor(score.overall)}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {score.overall}
                                </motion.span>
                                <span className="text-xs text-gray-400">/ 100</span>
                            </div>
                        </motion.div>

                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-ink">SEO Impact Score</h4>
                                <motion.span
                                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                        score.overall >= 70 ? 'bg-green-100 text-green-700' :
                                            score.overall >= 50 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                    }`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7, type: "spring" }}
                                >
                                    Grade {getGrade(score.overall)}
                                </motion.span>
                            </div>
                            <motion.div
                                className="flex items-center gap-1 text-sm text-green-600"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <TrendingUp className="w-4 h-4" />
                                <span>+{score.projectedVisibilityBoost}% visibilité estimée</span>
                            </motion.div>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => setShowDetails(!showDetails)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showDetails ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Détails animés */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 border-t border-gray-100 space-y-4">
                            {/* Breakdown des scores */}
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(score.breakdown).map(([key, value], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                            {key === 'keywordRelevance' && <Target className="w-4 h-4 text-sauge" />}
                                            {key === 'localSEO' && <MapPin className="w-4 h-4 text-blue-500" />}
                                            {key === 'naturalIntegration' && <Zap className="w-4 h-4 text-yellow-500" />}
                                            {key === 'callToAction' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                            {!['keywordRelevance', 'localSEO', 'naturalIntegration', 'callToAction'].includes(key) &&
                                                <Info className="w-4 h-4 text-gray-400" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-600 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <span className={`text-xs font-medium ${getScoreColor(value)}`}>
                                                    {value}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(value)}`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${value}%` }}
                                                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Suggestions */}
                            {score.suggestions.length > 0 && (
                                <div className="pt-3 border-t border-gray-100">
                                    <h5 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                                        Suggestions d'amélioration
                                    </h5>
                                    <div className="space-y-2">
                                        {score.suggestions.map((suggestion, index) => (
                                            <SuggestionItem key={index} suggestion={suggestion} index={index} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SuggestionItem({ suggestion, index }: { suggestion: SEOSuggestion; index: number }) {
    const priorityColors = {
        high: 'border-red-200 bg-red-50',
        medium: 'border-yellow-200 bg-yellow-50',
        low: 'border-gray-200 bg-gray-50'
    };

    const priorityLabels = {
        high: 'Prioritaire',
        medium: 'Recommandé',
        low: 'Optionnel'
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`p-3 rounded-lg border ${priorityColors[suggestion.priority]}`}
        >
            <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-gray-700">{suggestion.message}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-green-600 font-medium">+{suggestion.impact}pts</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                            suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-600'
                    }`}>
                        {priorityLabels[suggestion.priority]}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
