"use client";

import { motion } from "framer-motion";
import { Star, MapPin, MessageSquare, Clock, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { GMBBusiness } from "@/lib/gmb/types";

interface BusinessCardProps {
    business: GMBBusiness;
    isSelected: boolean;
    onSelect: () => void;
    onToggleAutoReply: () => void;
}

export function BusinessCard({ business, isSelected, onSelect, onToggleAutoReply }: BusinessCardProps) {
    const formatLastSync = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));

        if (minutes < 1) return "À l'instant";
        if (minutes < 60) return `Il y a ${minutes}min`;
        return `Il y a ${Math.floor(minutes / 60)}h`;
    };

    return (
        <motion.div
            onClick={onSelect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                isSelected
                    ? 'border-sauge bg-sauge/5 shadow-lg'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
            }`}
        >
            {/* Connection Status */}
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                business.connected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
            }`} />

            {/* Business Info */}
            <div className="mb-4">
                <h3 className="font-bold text-ink text-lg truncate pr-6">{business.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{business.address}</span>
                </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-yellow-700">{business.rating}</span>
                </div>
                <span className="text-sm text-gray-500">{business.totalReviews} avis</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-medium">En attente</span>
                    </div>
                    <p className="text-2xl font-bold text-ink">{business.pendingReviews}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-medium">Répondus</span>
                    </div>
                    <p className="text-2xl font-bold text-ink">{business.respondedReviews}</p>
                </div>
            </div>

            {/* Auto Reply Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleAutoReply();
                        }}
                        className={`p-1 rounded-lg transition-colors ${
                            business.autoReply ? 'text-sauge' : 'text-gray-400'
                        }`}
                    >
                        {business.autoReply ? (
                            <ToggleRight className="w-6 h-6" />
                        ) : (
                            <ToggleLeft className="w-6 h-6" />
                        )}
                    </button>
                    <span className="text-xs text-gray-500">
                        Auto-réponse {business.autoReply ? 'activée' : 'désactivée'}
                    </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatLastSync(business.lastSync)}
                </div>
            </div>

            {/* Keywords Preview */}
            <div className="mt-4 flex flex-wrap gap-1">
                {business.keywords.slice(0, 3).map((kw, i) => (
                    <span
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                        {kw}
                    </span>
                ))}
                {business.keywords.length > 3 && (
                    <span className="px-2 py-0.5 text-gray-400 text-xs">
                        +{business.keywords.length - 3}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
