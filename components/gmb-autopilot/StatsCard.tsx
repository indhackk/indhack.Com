"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    change?: number;
    bgGradient?: string;
    delay?: number;
}

export function StatsCard({
    icon,
    label,
    value,
    change,
    bgGradient = "from-gray-50 to-gray-100/50",
    delay = 0
}: StatsCardProps) {
    const getTrendIcon = () => {
        if (!change) return null;
        if (change > 0) return <TrendingUp className="w-3 h-3" />;
        if (change < 0) return <TrendingDown className="w-3 h-3" />;
        return <Minus className="w-3 h-3" />;
    };

    const getTrendColor = () => {
        if (!change) return "text-gray-500";
        if (change > 0) return "text-green-600 bg-green-50";
        if (change < 0) return "text-red-600 bg-red-50";
        return "text-gray-500 bg-gray-50";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} rounded-2xl p-5 border border-gray-100 hover:border-gray-200 transition-colors group`}
        >
            {/* Subtle hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/80 shadow-sm">
                        {icon}
                    </div>
                    {change !== undefined && (
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getTrendColor()}`}>
                            {getTrendIcon()}
                            {Math.abs(change)}%
                        </span>
                    )}
                </div>

                <div className="mt-4">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 0.2 }}
                        className="text-3xl font-bold text-ink tracking-tight"
                    >
                        {value}
                    </motion.p>
                    <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
            </div>
        </motion.div>
    );
}

// Compact version for smaller spaces
export function StatsCardCompact({
    icon,
    label,
    value,
    iconBg = "bg-gray-100"
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    iconBg?: string;
}) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-colors">
            <div className={`p-2 rounded-lg ${iconBg}`}>
                {icon}
            </div>
            <div>
                <p className="text-lg font-bold text-ink">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
}
