/**
 * GMB AutoPilot - Advanced Sentiment Analysis Engine
 * Analyse émotionnelle et éthique pour des réponses appropriées
 */

import { SentimentAnalysis, EmotionBreakdown } from './types';

// ═══════════════════════════════════════════════════════════════
// DICTIONNAIRES D'ÉMOTIONS
// ═══════════════════════════════════════════════════════════════

const EMOTION_LEXICON = {
    joy: {
        words: [
            'excellent', 'parfait', 'super', 'génial', 'top', 'magnifique',
            'merveilleux', 'fantastique', 'incroyable', 'exceptionnel',
            'extraordinaire', 'formidable', 'sublime', 'divin', 'magique',
            'adoré', 'aimé', 'ravi', 'enchanté', 'comblé', 'heureux',
            'content', 'satisfait', 'impressionné', 'épaté', 'bluffé'
        ],
        weight: 1.2
    },
    satisfaction: {
        words: [
            'bien', 'bon', 'correct', 'convenable', 'agréable', 'sympa',
            'chouette', 'nickel', 'impeccable', 'propre', 'soigné',
            'professionnel', 'efficace', 'rapide', 'ponctuel', 'fiable',
            'recommande', 'conseille', 'reviendrai', 'retournerai'
        ],
        weight: 0.8
    },
    frustration: {
        words: [
            'attente', 'long', 'lent', 'tardif', 'retard', 'patience',
            'difficile', 'compliqué', 'laborieux', 'pénible', 'embêtant',
            'agaçant', 'énervant', 'frustrant', 'dérangeant', 'gênant'
        ],
        weight: 0.6
    },
    disappointment: {
        words: [
            'déçu', 'décevant', 'dommage', 'regrettable', 'malheureusement',
            'hélas', 'bof', 'moyen', 'passable', 'insuffisant', 'manque',
            'absent', 'oublié', 'négligé', 'bâclé', 'médiocre'
        ],
        weight: 0.8
    },
    anger: {
        words: [
            'nul', 'horrible', 'catastrophe', 'désastre', 'scandale',
            'honteux', 'inadmissible', 'inacceptable', 'révoltant',
            'arnaque', 'voleur', 'menteur', 'incompétent', 'impoli',
            'irrespectueux', 'malpoli', 'agressif', 'fuyez', 'éviter',
            'pire', 'jamais', 'plus jamais', 'ne reviendrai pas'
        ],
        weight: 1.5
    }
};

// Intensificateurs
const INTENSIFIERS = {
    positive: ['très', 'vraiment', 'tellement', 'extrêmement', 'absolument', 'totalement'],
    negative: ['pas', 'ne...pas', 'aucun', 'jamais', 'plus', 'sans']
};

// Phrases critiques nécessitant attention
const CRITICAL_PHRASES = [
    'ne reviendrai pas',
    'plus jamais',
    'fuyez',
    'à éviter',
    'je déconseille',
    'arnaque',
    'scandale',
    'honteux',
    'j\'exige',
    'remboursement',
    'porter plainte',
    'signaler'
];

// ═══════════════════════════════════════════════════════════════
// ANALYSEUR DE SENTIMENT PRINCIPAL
// ═══════════════════════════════════════════════════════════════

/**
 * Analyse complète du sentiment d'un avis
 */
export function analyzeSentiment(text: string, rating: number): SentimentAnalysis {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);

    // Calculer les émotions
    const emotions = analyzeEmotions(lowerText, words);

    // Calculer le score global
    const { score, confidence } = calculateSentimentScore(emotions, rating);

    // Déterminer le label
    const label = determineSentimentLabel(score, emotions, lowerText);

    // Évaluer l'urgence
    const urgency = evaluateUrgency(emotions, lowerText, rating);

    // Déterminer si l'empathie est requise
    const requiresEmpathy = shouldRequireEmpathy(emotions, label, lowerText);

    // Suggérer le ton approprié
    const suggestedTone = suggestTone(label, urgency, requiresEmpathy);

    return {
        score,
        label,
        confidence,
        emotions,
        urgency,
        requiresEmpathy,
        suggestedTone
    };
}

/**
 * Analyse les émotions présentes dans le texte
 */
function analyzeEmotions(text: string, words: string[]): EmotionBreakdown {
    const emotions: EmotionBreakdown = {
        joy: 0,
        satisfaction: 0,
        frustration: 0,
        disappointment: 0,
        anger: 0
    };

    // Pour chaque catégorie d'émotion
    for (const [emotion, data] of Object.entries(EMOTION_LEXICON)) {
        let count = 0;

        for (const word of data.words) {
            // Compter les occurrences
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                count += matches.length;
            }
        }

        // Vérifier les intensificateurs
        let multiplier = 1;
        for (const intensifier of INTENSIFIERS.positive) {
            if (text.includes(intensifier)) {
                multiplier *= 1.3;
            }
        }

        // Vérifier les négations
        for (const negation of INTENSIFIERS.negative) {
            const negPattern = new RegExp(`${negation}\\s+\\w+`, 'gi');
            if (negPattern.test(text)) {
                // Inverser les émotions positives si négation
                if (emotion === 'joy' || emotion === 'satisfaction') {
                    multiplier *= -0.5;
                }
            }
        }

        // Calculer le score normalisé (0-100)
        emotions[emotion as keyof EmotionBreakdown] = Math.min(100,
            Math.max(0, count * data.weight * multiplier * 20)
        );
    }

    return emotions;
}

/**
 * Calcule le score de sentiment global
 */
function calculateSentimentScore(emotions: EmotionBreakdown, rating: number): {
    score: number;
    confidence: number;
} {
    // Score basé sur les émotions (-1 à 1)
    const positiveScore = (emotions.joy * 1.2 + emotions.satisfaction * 0.8) / 100;
    const negativeScore = (emotions.anger * 1.5 + emotions.disappointment * 1 + emotions.frustration * 0.5) / 100;

    let emotionScore = (positiveScore - negativeScore) / 2;
    emotionScore = Math.max(-1, Math.min(1, emotionScore));

    // Score basé sur la note (1-5 → -1 à 1)
    const ratingScore = (rating - 3) / 2;

    // Combiner les scores (émotions + note)
    const combinedScore = emotionScore * 0.6 + ratingScore * 0.4;

    // Calculer la confiance basée sur la cohérence
    const coherence = 1 - Math.abs(emotionScore - ratingScore);
    const textLength = Object.values(emotions).reduce((a, b) => a + b, 0);
    const lengthFactor = Math.min(1, textLength / 50);

    const confidence = Math.round((coherence * 0.7 + lengthFactor * 0.3) * 100);

    return {
        score: Math.round(combinedScore * 100) / 100,
        confidence: Math.max(30, confidence)
    };
}

/**
 * Détermine le label du sentiment
 */
function determineSentimentLabel(
    score: number,
    emotions: EmotionBreakdown,
    text: string
): SentimentAnalysis['label'] {
    // Vérifier les phrases critiques
    for (const phrase of CRITICAL_PHRASES) {
        if (text.includes(phrase)) {
            return 'critical';
        }
    }

    // Si colère très élevée → critique
    if (emotions.anger > 50) {
        return 'critical';
    }

    // Classification standard
    if (score > 0.3) return 'positive';
    if (score > -0.2) return 'neutral';
    if (score > -0.5) return 'negative';
    return 'critical';
}

/**
 * Évalue le niveau d'urgence de la réponse
 */
function evaluateUrgency(
    emotions: EmotionBreakdown,
    text: string,
    rating: number
): SentimentAnalysis['urgency'] {
    // Urgence haute si:
    // - Colère > 40
    // - Note = 1
    // - Phrases critiques
    if (
        emotions.anger > 40 ||
        rating === 1 ||
        CRITICAL_PHRASES.some(p => text.includes(p))
    ) {
        return 'high';
    }

    // Urgence moyenne si:
    // - Déception > 30
    // - Note ≤ 2
    // - Frustration > 40
    if (
        emotions.disappointment > 30 ||
        rating <= 2 ||
        emotions.frustration > 40
    ) {
        return 'medium';
    }

    return 'low';
}

/**
 * Détermine si l'empathie est requise
 */
function shouldRequireEmpathy(
    emotions: EmotionBreakdown,
    label: SentimentAnalysis['label'],
    text: string
): boolean {
    // Empathie obligatoire pour:
    // - Sentiment critique ou négatif
    // - Déception notable
    // - Mentions de problèmes personnels
    const personalIssueKeywords = [
        'déçu', 'triste', 'malheureux', 'frustré', 'énervé',
        'problème', 'difficulté', 'mauvaise expérience'
    ];

    return (
        label === 'critical' ||
        label === 'negative' ||
        emotions.disappointment > 25 ||
        emotions.anger > 20 ||
        personalIssueKeywords.some(kw => text.includes(kw))
    );
}

/**
 * Suggère le ton approprié pour la réponse
 */
function suggestTone(
    label: SentimentAnalysis['label'],
    urgency: SentimentAnalysis['urgency'],
    requiresEmpathy: boolean
): SentimentAnalysis['suggestedTone'] {
    if (label === 'critical') {
        return 'apologetic';
    }

    if (requiresEmpathy || label === 'negative') {
        return 'empathetic';
    }

    if (label === 'positive') {
        return 'grateful';
    }

    return 'professional';
}

/**
 * Vérifie si la validation humaine est requise
 */
export function requiresHumanValidation(sentiment: SentimentAnalysis): {
    required: boolean;
    reason: string;
} {
    if (sentiment.label === 'critical') {
        return {
            required: true,
            reason: 'Avis critique nécessitant une attention particulière'
        };
    }

    if (sentiment.urgency === 'high') {
        return {
            required: true,
            reason: 'Urgence élevée détectée - validation recommandée'
        };
    }

    if (sentiment.label === 'negative' && sentiment.emotions.anger > 30) {
        return {
            required: true,
            reason: 'Émotion de colère détectée - vérification requise'
        };
    }

    if (sentiment.confidence < 50) {
        return {
            required: true,
            reason: 'Confiance faible dans l\'analyse - validation conseillée'
        };
    }

    return {
        required: false,
        reason: ''
    };
}

/**
 * Génère un résumé lisible de l'analyse
 */
export function getSentimentSummary(sentiment: SentimentAnalysis): string {
    const labelMap = {
        positive: '😊 Positif',
        neutral: '😐 Neutre',
        negative: '😔 Négatif',
        critical: '🚨 Critique'
    };

    const urgencyMap = {
        low: 'basse',
        medium: 'moyenne',
        high: 'haute'
    };

    const toneMap = {
        empathetic: 'empathique',
        apologetic: 'apologétique',
        grateful: 'reconnaissant',
        professional: 'professionnel'
    };

    return `${labelMap[sentiment.label]} (confiance: ${sentiment.confidence}%) | ` +
        `Urgence: ${urgencyMap[sentiment.urgency]} | ` +
        `Ton suggéré: ${toneMap[sentiment.suggestedTone]}`;
}

/**
 * Extrait les émotions dominantes
 */
export function getDominantEmotions(emotions: EmotionBreakdown): {
    emotion: string;
    score: number;
}[] {
    return Object.entries(emotions)
        .map(([emotion, score]) => ({ emotion, score }))
        .filter(e => e.score > 10)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}
