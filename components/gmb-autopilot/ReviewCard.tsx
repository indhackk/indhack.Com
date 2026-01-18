"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star, Clock, MessageSquare, Sparkles, Check, X, RefreshCw, Send,
    ChevronDown, ChevronUp, Wand2, ShieldCheck, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GMBReview, GMBBusiness, AIResponse } from "@/lib/gmb/types";
import { generateAIResponse } from "@/lib/gmb/ai-response-generator";
import { SEOScoreDisplay } from "./SEOScoreDisplay";
import { SentimentBadge, ValidationRequiredBadge } from "./SentimentBadge";
import Image from "next/image";

interface ReviewCardProps {
    review: GMBReview;
    business: GMBBusiness;
    onRespond: (reviewId: string, response: string, aiResponse?: AIResponse) => void;
    onSkip: (reviewId: string) => void;
    onValidate?: (reviewId: string) => void;
}

export function ReviewCard({ review, business, onRespond, onSkip, onValidate }: ReviewCardProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedResponse, setEditedResponse] = useState("");
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [showSentimentDetails, setShowSentimentDetails] = useState(false);

    const handleGenerateResponse = async () => {
        setIsGenerating(true);
        try {
            const response = await generateAIResponse({
                businessName: business.name,
                businessCity: business.city,
                businessCategory: business.category,
                keywords: business.keywords,
                tone: business.tone,
                reviewText: review.text,
                reviewRating: review.rating,
                authorName: review.author.split(' ')[0],
                includeCallToAction: true,
                maxLength: 500
            });
            setAiResponse(response);
            setEditedResponse(response.text);
        } catch (error) {
            console.error("Erreur génération:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSelectAlternative = (text: string) => {
        setEditedResponse(text);
        setShowAlternatives(false);
    };

    const handleSendResponse = () => {
        // Si validation requise, on passe en mode validation
        if (aiResponse?.metadata.requiresValidation && onValidate) {
            onValidate(review.id);
        }
        onRespond(review.id, editedResponse || aiResponse?.text || '', aiResponse || undefined);
        setAiResponse(null);
        setEditedResponse("");
    };

    const formatDate = (date: Date | string) => {
        const now = new Date();
        const dateObj = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObj.getTime())) return "Récemment";

        const diff = now.getTime() - dateObj.getTime();
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

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return 'bg-green-100 text-green-700';
        if (rating === 3) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
        >
            {/* Header */}
            <div className="p-5 border-b border-gray-50">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-sauge/20 to-sauge/40"
                            whileHover={{ scale: 1.05 }}
                        >
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
                        </motion.div>
                        <div>
                            <h4 className="font-semibold text-ink">{review.author}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <motion.div
                                    className="flex"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {renderStars(review.rating)}
                                </motion.div>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(review.date)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Rating badge */}
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`px-2 py-1 rounded-lg text-sm font-bold ${getRatingColor(review.rating)}`}
                        >
                            {review.rating}/5
                        </motion.span>
                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                review.status === 'pending'
                                    ? 'bg-amber-100 text-amber-700'
                                    : review.status === 'awaiting_validation'
                                        ? 'bg-purple-100 text-purple-700'
                                        : review.status === 'responded'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {review.status === 'pending' ? 'En attente' :
                                review.status === 'awaiting_validation' ? 'Validation requise' :
                                    review.status === 'responded' ? 'Répondu' : 'Ignoré'}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Review Content */}
            <div className="p-5">
                <p className="text-gray-700 leading-relaxed">{review.text}</p>

                {/* Sentiment Analysis Preview (si disponible) */}
                {review.sentiment && (
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <button
                            onClick={() => setShowSentimentDetails(!showSentimentDetails)}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                        >
                            <SentimentBadge sentiment={review.sentiment} size="sm" />
                            {showSentimentDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <AnimatePresence>
                            {showSentimentDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-3 overflow-hidden"
                                >
                                    <SentimentBadge sentiment={review.sentiment} showDetails />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Response Area - Pending */}
            {review.status === 'pending' && (
                <div className="p-5 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                    <AnimatePresence mode="wait">
                        {!aiResponse ? (
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
                                    className="bg-gradient-to-r from-sauge to-sauge/80 hover:from-sauge/90 hover:to-sauge/70 text-white rounded-xl flex-1 h-12 shadow-lg shadow-sauge/20"
                                >
                                    {isGenerating ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            >
                                                <Wand2 className="w-5 h-5 mr-2" />
                                            </motion.div>
                                            Analyse & Génération IA...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Générer une réponse IA optimisée
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => onSkip(review.id)}
                                    variant="outline"
                                    className="rounded-xl border-gray-200 h-12 w-12"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {/* Validation Warning */}
                                {aiResponse.metadata.requiresValidation && (
                                    <ValidationRequiredBadge reason={aiResponse.metadata.validationReason} />
                                )}

                                {/* Sentiment Analysis */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-sauge" />
                                        <span className="text-sm font-medium text-sauge">Réponse générée par IA</span>
                                        <span className="text-xs text-gray-400">
                                            ({aiResponse.metadata.processingTimeMs}ms)
                                        </span>
                                    </div>
                                    <SentimentBadge sentiment={aiResponse.metadata.sentiment} size="sm" />
                                </div>

                                {/* Response Text */}
                                {isEditing ? (
                                    <motion.textarea
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        value={editedResponse}
                                        onChange={(e) => setEditedResponse(e.target.value)}
                                        className="w-full p-4 border border-sauge/30 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge resize-none bg-white"
                                        rows={5}
                                    />
                                ) : (
                                    <motion.div
                                        onClick={() => setIsEditing(true)}
                                        className="p-4 bg-white rounded-xl border border-gray-200 text-sm text-gray-700 cursor-text hover:border-sauge/30 transition-all hover:shadow-sm"
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        {editedResponse || aiResponse.text}
                                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                            <span>Cliquez pour modifier</span>
                                            <span className="text-sauge">•</span>
                                            <span>Score naturel: {aiResponse.metadata.naturalLanguageScore}%</span>
                                        </p>
                                    </motion.div>
                                )}

                                {/* SEO Score Display */}
                                <SEOScoreDisplay score={aiResponse.metadata.seoImpact} />

                                {/* Alternatives */}
                                {aiResponse.alternativeVersions.length > 0 && (
                                    <div>
                                        <button
                                            onClick={() => setShowAlternatives(!showAlternatives)}
                                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-2"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            <span>Voir {aiResponse.alternativeVersions.length} alternatives</span>
                                            {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                        <AnimatePresence>
                                            {showAlternatives && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="space-y-2 overflow-hidden"
                                                >
                                                    {aiResponse.alternativeVersions.map((alt, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            onClick={() => handleSelectAlternative(alt)}
                                                            className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-sauge/5 hover:border-sauge/20 border border-transparent transition-all"
                                                        >
                                                            {alt}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}

                                {/* Keywords Used */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-gray-500">Mots-clés intégrés:</span>
                                    {aiResponse.metadata.usedKeywords.map((kw, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="px-2 py-0.5 bg-gradient-to-r from-sauge/10 to-sauge/5 text-sauge text-xs rounded-full border border-sauge/20"
                                        >
                                            {kw}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2">
                                    <Button
                                        onClick={handleSendResponse}
                                        className={`flex-1 rounded-xl h-11 ${
                                            aiResponse.metadata.requiresValidation
                                                ? 'bg-amber-500 hover:bg-amber-600'
                                                : 'bg-green-600 hover:bg-green-700'
                                        } text-white shadow-lg`}
                                    >
                                        {aiResponse.metadata.requiresValidation ? (
                                            <>
                                                <ShieldCheck className="w-4 h-4 mr-2" />
                                                Valider et Publier
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Publier la réponse
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={handleGenerateResponse}
                                        variant="outline"
                                        className="rounded-xl border-gray-200 h-11"
                                        disabled={isGenerating}
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setAiResponse(null);
                                            setEditedResponse("");
                                        }}
                                        variant="outline"
                                        className="rounded-xl border-gray-200 h-11"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Awaiting Validation */}
            {review.status === 'awaiting_validation' && (
                <div className="p-5 bg-gradient-to-br from-purple-50 to-white border-t border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-purple-800">En attente de validation</span>
                    </div>
                    {review.response && (
                        <p className="text-sm text-purple-700 bg-white p-3 rounded-lg border border-purple-100">
                            {review.response}
                        </p>
                    )}
                    {onValidate && (
                        <div className="flex gap-2 mt-3">
                            <Button
                                onClick={() => onValidate(review.id)}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Valider et Publier
                            </Button>
                            <Button
                                onClick={() => onSkip(review.id)}
                                variant="outline"
                                className="rounded-xl"
                            >
                                Rejeter
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Already Responded */}
            {review.status === 'responded' && review.response && (
                <div className="p-5 bg-gradient-to-br from-green-50 to-white border-t border-green-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                            <Check className="w-4 h-4" />
                            Réponse publiée
                        </div>
                        {review.seoImpact && (
                            <SEOScoreDisplay score={review.seoImpact} compact />
                        )}
                    </div>
                    <p className="text-sm text-green-800 bg-white p-3 rounded-lg border border-green-100">
                        {review.response}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        {review.respondedAt && (
                            <p className="text-xs text-green-600">
                                {formatDate(review.respondedAt)}
                            </p>
                        )}
                        {review.keywords && review.keywords.length > 0 && (
                            <div className="flex items-center gap-1">
                                {review.keywords.slice(0, 3).map((kw, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
