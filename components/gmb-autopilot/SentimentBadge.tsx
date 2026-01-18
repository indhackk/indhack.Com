"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ThumbsUp, ThumbsDown, Minus, ShieldAlert, Info } from "lucide-react";
import { SentimentAnalysis } from "@/lib/gmb/types";

interface SentimentBadgeProps {
    sentiment: SentimentAnalysis;
    showDetails?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function SentimentBadge({ sentiment, showDetails = false, size = 'md' }: SentimentBadgeProps) {
    const config = {
        positive: {
            icon: ThumbsUp,
            label: 'Positif',
            color: 'bg-green-100 text-green-700 border-green-200',
            iconColor: 'text-green-500',
            gradient: 'from-green-500 to-emerald-600'
        },
        neutral: {
            icon: Minus,
            label: 'Neutre',
            color: 'bg-gray-100 text-gray-700 border-gray-200',
            iconColor: 'text-gray-500',
            gradient: 'from-gray-400 to-gray-500'
        },
        negative: {
            icon: ThumbsDown,
            label: 'Négatif',
            color: 'bg-orange-100 text-orange-700 border-orange-200',
            iconColor: 'text-orange-500',
            gradient: 'from-orange-500 to-red-500'
        },
        critical: {
            icon: ShieldAlert,
            label: 'Critique',
            color: 'bg-red-100 text-red-700 border-red-200',
            iconColor: 'text-red-500',
            gradient: 'from-red-500 to-red-700'
        }
    };

    const { icon: Icon, label, color, iconColor, gradient } = config[sentiment.label];

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-1.5 text-sm gap-1.5',
        lg: 'px-4 py-2 text-base gap-2'
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    if (!showDetails) {
        return (
            <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-flex items-center ${sizeClasses[size]} rounded-full border font-medium ${color}`}
            >
                <Icon className={iconSizes[size]} />
                <span>{label}</span>
                <span className="opacity-60">({sentiment.confidence}%)</span>
            </motion.span>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
        >
            {/* Header */}
            <div className={`p-3 bg-gradient-to-r ${gradient} bg-opacity-10`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-white/80 ${iconColor}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-white text-shadow">{label}</p>
                            <p className="text-xs text-white/80">Confiance: {sentiment.confidence}%</p>
                        </div>
                    </div>
                    {sentiment.requiresEmpathy && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full"
                        >
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                            <span className="text-xs font-medium text-amber-700">Empathie requise</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Emotions breakdown */}
            <div className="p-3 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Info className="w-3 h-3" />
                    <span>Analyse émotionnelle</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    <EmotionBar emotion="Joie" value={sentiment.emotions.joy} color="bg-green-500" />
                    <EmotionBar emotion="Satisfaction" value={sentiment.emotions.satisfaction} color="bg-blue-500" />
                    <EmotionBar emotion="Frustration" value={sentiment.emotions.frustration} color="bg-yellow-500" />
                    <EmotionBar emotion="Déception" value={sentiment.emotions.disappointment} color="bg-orange-500" />
                    <EmotionBar emotion="Colère" value={sentiment.emotions.anger} color="bg-red-500" />
                </div>

                {/* Urgency & Suggested tone */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Urgence:</span>
                        <UrgencyBadge urgency={sentiment.urgency} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Ton suggéré:</span>
                        <ToneBadge tone={sentiment.suggestedTone} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function EmotionBar({ emotion, value, color }: { emotion: string; value: number; color: string }) {
    return (
        <div className="text-center">
            <div className="h-12 bg-gray-100 rounded-lg overflow-hidden flex items-end mb-1">
                <motion.div
                    className={`w-full ${color}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(4, value)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
            <span className="text-[10px] text-gray-500 leading-tight block">{emotion}</span>
            <span className="text-[10px] font-medium text-gray-700">{value}%</span>
        </div>
    );
}

function UrgencyBadge({ urgency }: { urgency: 'low' | 'medium' | 'high' }) {
    const config = {
        low: { label: 'Basse', color: 'bg-green-100 text-green-700' },
        medium: { label: 'Moyenne', color: 'bg-yellow-100 text-yellow-700' },
        high: { label: 'Haute', color: 'bg-red-100 text-red-700' }
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config[urgency].color}`}>
            {config[urgency].label}
        </span>
    );
}

function ToneBadge({ tone }: { tone: 'empathetic' | 'apologetic' | 'grateful' | 'professional' }) {
    const labels = {
        empathetic: 'Empathique',
        apologetic: 'Apologétique',
        grateful: 'Reconnaissant',
        professional: 'Professionnel'
    };

    return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-sauge/10 text-sauge">
            {labels[tone]}
        </span>
    );
}

// Composant pour affichage inline du badge de validation
export function ValidationRequiredBadge({ reason }: { reason?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg"
        >
            <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
                <AlertTriangle className="w-5 h-5 text-amber-500" />
            </motion.div>
            <div>
                <p className="text-sm font-medium text-amber-800">Validation humaine requise</p>
                {reason && <p className="text-xs text-amber-600">{reason}</p>}
            </div>
        </motion.div>
    );
}
