"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, MessageSquare, Sparkles, Check, X, RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GMBReview, GMBBusiness } from "@/lib/gmb/types";
import { generateAIResponse } from "@/lib/gmb/ai-response-generator";
import Image from "next/image";

interface ReviewCardProps {
    review: GMBReview;
    business: GMBBusiness;
    onRespond: (reviewId: string, response: string) => void;
    onSkip: (reviewId: string) => void;
}

export function ReviewCard({ review, business, onRespond, onSkip }: ReviewCardProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedResponse, setGeneratedResponse] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedResponse, setEditedResponse] = useState("");

    const handleGenerateResponse = async () => {
        setIsGenerating(true);
        try {
            const response = await generateAIResponse({
                businessName: business.name,
                keywords: business.keywords,
                tone: business.tone,
                reviewText: review.text,
                reviewRating: review.rating,
                authorName: review.author.split(' ')[0],
                includeCallToAction: true,
                maxLength: 500
            });
            setGeneratedResponse(response);
            setEditedResponse(response);
        } catch (error) {
            console.error("Erreur génération:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSendResponse = () => {
        onRespond(review.id, editedResponse || generatedResponse);
        setGeneratedResponse("");
        setEditedResponse("");
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return "Il y a moins d'1h";
        if (hours < 24) return `Il y a ${hours}h`;
        if (days === 1) return "Hier";
        return `Il y a ${days} jours`;
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
        >
            {/* Header */}
            <div className="p-5 border-b border-gray-50">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-sauge/20 to-sauge/40">
                            {review.authorImage ? (
                                <Image
                                    src={review.authorImage}
                                    alt={review.author}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sauge font-bold text-lg">
                                    {review.author.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-semibold text-ink">{review.author}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(review.date)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        review.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : review.status === 'responded'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                    }`}>
                        {review.status === 'pending' ? 'En attente' : review.status === 'responded' ? 'Répondu' : 'Ignoré'}
                    </div>
                </div>
            </div>

            {/* Review Content */}
            <div className="p-5">
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>

            {/* Response Area */}
            {review.status === 'pending' && (
                <div className="p-5 bg-gray-50 border-t border-gray-100">
                    <AnimatePresence mode="wait">
                        {!generatedResponse ? (
                            <motion.div
                                key="generate"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <Button
                                    onClick={handleGenerateResponse}
                                    disabled={isGenerating}
                                    className="bg-sauge hover:bg-sauge/90 text-white rounded-xl flex-1"
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Génération IA...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Générer une réponse IA
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => onSkip(review.id)}
                                    variant="outline"
                                    className="rounded-xl border-gray-200"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-2 text-sm text-sauge font-medium">
                                    <MessageSquare className="w-4 h-4" />
                                    Réponse générée par IA
                                </div>

                                {isEditing ? (
                                    <textarea
                                        value={editedResponse}
                                        onChange={(e) => setEditedResponse(e.target.value)}
                                        className="w-full p-4 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge resize-none"
                                        rows={4}
                                    />
                                ) : (
                                    <div
                                        onClick={() => setIsEditing(true)}
                                        className="p-4 bg-white rounded-xl border border-gray-200 text-sm text-gray-700 cursor-text hover:border-sauge/30 transition-colors"
                                    >
                                        {generatedResponse}
                                        <p className="text-xs text-gray-400 mt-2">Cliquez pour modifier</p>
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={handleSendResponse}
                                        className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex-1"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Publier la réponse
                                    </Button>
                                    <Button
                                        onClick={handleGenerateResponse}
                                        variant="outline"
                                        className="rounded-xl border-gray-200"
                                        disabled={isGenerating}
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setGeneratedResponse("");
                                            setEditedResponse("");
                                        }}
                                        variant="outline"
                                        className="rounded-xl border-gray-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Keywords Preview */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-gray-500">Mots-clés intégrés:</span>
                                    {business.keywords.slice(0, 3).map((kw, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 bg-sauge/10 text-sauge text-xs rounded-full"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Already Responded */}
            {review.status === 'responded' && review.response && (
                <div className="p-5 bg-green-50 border-t border-green-100">
                    <div className="flex items-center gap-2 text-sm text-green-700 font-medium mb-2">
                        <Check className="w-4 h-4" />
                        Réponse publiée
                    </div>
                    <p className="text-sm text-green-800">{review.response}</p>
                    {review.respondedAt && (
                        <p className="text-xs text-green-600 mt-2">
                            {formatDate(review.respondedAt)}
                        </p>
                    )}
                </div>
            )}
        </motion.div>
    );
}
