/**
 * GMB AutoPilot - Advanced AI Response Generator
 * Génération de réponses avec Geo-SEO, Sentiment Analysis, et Natural Language Integration
 */

import { AIResponseConfig, AIResponse, AIResponseMetadata, GeoKeyword, SentimentAnalysis } from './types';
import { RESPONSE_TEMPLATES, EMPATHY_PHRASES } from './mock-data';
import { analyzeSentiment, requiresHumanValidation } from './sentiment-engine';
import { generateGeoKeywords, integrateKeywordsNaturally, getCategoryData } from './geo-seo-engine';
import { calculateSEOScore } from './seo-score-engine';

// ═══════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════

/**
 * Génère une réponse IA complète avec analyse et optimisation
 */
export async function generateAIResponse(config: AIResponseConfig): Promise<AIResponse> {
    const startTime = Date.now();

    // Simuler un délai de traitement IA réaliste
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

    // 1. Analyser le sentiment de l'avis
    const sentiment = analyzeSentiment(config.reviewText, config.reviewRating);

    // 2. Générer les mots-clés géolocalisés
    const geoKeywords = config.geoKeywords || generateGeoKeywords(
        config.businessCategory,
        `${config.businessCity}`,
        config.keywords
    );

    // 3. Sélectionner et personnaliser le template de base
    let baseResponse = selectTemplate(sentiment, config);

    // 4. Enrichir avec le contexte de l'avis
    baseResponse = enrichWithContext(baseResponse, config, sentiment);

    // 5. Intégrer les mots-clés de manière naturelle
    const { response: enhancedResponse, usedKeywords, naturalScore } = integrateKeywordsNaturally(
        baseResponse,
        geoKeywords,
        3
    );

    // 6. Ajouter l'empathie si nécessaire
    let finalResponse = sentiment.requiresEmpathy
        ? addEmpathy(enhancedResponse, sentiment)
        : enhancedResponse;

    // 7. Ajouter le call-to-action si demandé
    if (config.includeCallToAction) {
        finalResponse = addCallToAction(finalResponse, sentiment, config.businessName);
    }

    // 8. Ajuster la tonalité finale
    finalResponse = adjustTone(finalResponse, config.tone, sentiment);

    // 9. Respecter la limite de longueur
    if (config.maxLength && config.maxLength > 0 && finalResponse.length > config.maxLength) {
        finalResponse = truncateGracefully(finalResponse, config.maxLength);
    }

    // 10. Calculer le score SEO
    const seoImpact = calculateSEOScore(
        finalResponse,
        geoKeywords,
        usedKeywords,
        config.businessCity
    );

    // 11. Déterminer si validation humaine requise
    const validationCheck = requiresHumanValidation(sentiment);

    // 12. Générer des versions alternatives
    const alternativeVersions = await generateAlternatives(config, sentiment, geoKeywords);

    const processingTimeMs = Date.now() - startTime;

    // Construire les métadonnées
    const metadata: AIResponseMetadata = {
        sentiment,
        seoImpact,
        usedKeywords,
        naturalLanguageScore: naturalScore,
        requiresValidation: validationCheck.required,
        validationReason: validationCheck.reason || undefined,
        generatedAt: new Date(),
        processingTimeMs
    };

    return {
        text: finalResponse,
        metadata,
        alternativeVersions
    };
}

// ═══════════════════════════════════════════════════════════════
// TEMPLATE SELECTION
// ═══════════════════════════════════════════════════════════════

function selectTemplate(sentiment: SentimentAnalysis, config: AIResponseConfig): string {
    const { label } = sentiment;

    // Sélectionner la catégorie de template appropriée
    let templates: string[];
    if (label === 'critical') {
        templates = RESPONSE_TEMPLATES.critical;
    } else if (label === 'negative') {
        templates = RESPONSE_TEMPLATES.negative;
    } else if (label === 'neutral') {
        templates = RESPONSE_TEMPLATES.neutral;
    } else {
        templates = RESPONSE_TEMPLATES.positive;
    }

    // Sélectionner aléatoirement un template
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Remplacer les placeholders de base
    return template
        .replace(/{author}/g, config.authorName)
        .replace(/{business}/g, config.businessName);
}

// ═══════════════════════════════════════════════════════════════
// CONTEXT ENRICHMENT
// ═══════════════════════════════════════════════════════════════

function enrichWithContext(
    response: string,
    config: AIResponseConfig,
    sentiment: SentimentAnalysis
): string {
    const lowerText = config.reviewText.toLowerCase();
    const categoryData = getCategoryData(config.businessCategory);

    // Détecter les éléments mentionnés pour personnaliser
    const contextualEnhancements: string[] = [];

    // Détecter les mentions de service/équipe
    if (lowerText.match(/service|équipe|personnel|accueil|staff/)) {
        if (sentiment.label === 'positive' || sentiment.label === 'neutral') {
            contextualEnhancements.push('Notre équipe sera ravie de vous accueillir à nouveau.');
        }
    }

    // Détecter les mentions de qualité
    if (lowerText.match(/qualité|produit|frais|excellent|parfait/)) {
        contextualEnhancements.push(`La qualité ${categoryData.qualities[0]} est au cœur de notre engagement.`);
    }

    // Détecter les mentions de prix
    if (lowerText.match(/prix|tarif|cher|abordable|rapport/)) {
        if (sentiment.label === 'negative' || sentiment.label === 'neutral') {
            contextualEnhancements.push('Nous veillons à maintenir un rapport qualité-prix transparent.');
        }
    }

    // Détecter les recommandations
    if (lowerText.match(/recommande|conseille|reviendrai|retournerai/)) {
        contextualEnhancements.push('Votre recommandation est notre plus belle récompense.');
    }

    // Détecter les problèmes d'attente
    if (lowerText.match(/attente|temps|long|lent|rapide/)) {
        if (sentiment.label === 'negative' || sentiment.label === 'neutral') {
            contextualEnhancements.push('Nous travaillons à optimiser nos délais de service.');
        }
    }

    // Ajouter une amélioration contextuelle si disponible
    if (contextualEnhancements.length > 0) {
        const enhancement = contextualEnhancements[Math.floor(Math.random() * contextualEnhancements.length)];
        response = response.replace(/\.$/, '. ' + enhancement);
    }

    return response;
}

// ═══════════════════════════════════════════════════════════════
// EMPATHY ADDITION
// ═══════════════════════════════════════════════════════════════

function addEmpathy(response: string, sentiment: SentimentAnalysis): string {
    if (sentiment.label !== 'negative' && sentiment.label !== 'critical') {
        return response;
    }

    // Sélectionner des phrases empathiques appropriées
    const acknowledgment = EMPATHY_PHRASES.acknowledgment[
        Math.floor(Math.random() * EMPATHY_PHRASES.acknowledgment.length)
    ];

    // Pour les cas critiques, ajouter une prise de responsabilité
    if (sentiment.label === 'critical' || sentiment.emotions.anger > 40) {
        const responsibility = EMPATHY_PHRASES.responsibility[
            Math.floor(Math.random() * EMPATHY_PHRASES.responsibility.length)
        ];
        return `${acknowledgment}. ${responsibility}. ${response}`;
    }

    return `${acknowledgment}. ${response}`;
}

// ═══════════════════════════════════════════════════════════════
// CALL TO ACTION
// ═══════════════════════════════════════════════════════════════

function addCallToAction(
    response: string,
    sentiment: SentimentAnalysis,
    businessName: string
): string {
    const ctaByLabel = {
        positive: [
            `N'hésitez pas à revenir nous voir bientôt !`,
            `Au plaisir de vous retrouver chez ${businessName} !`,
            `Retrouvez-nous sur Google pour ne rien manquer !`
        ],
        neutral: [
            `Notre équipe reste à votre disposition.`,
            `Contactez-nous pour toute question.`,
            `N'hésitez pas à nous faire part de vos suggestions.`
        ],
        negative: [
            `Contactez-nous directement pour en discuter.`,
            `Notre responsable serait ravi d'échanger avec vous.`,
            `Nous aimerions avoir l'opportunité de nous rattraper.`
        ],
        critical: [
            `Nous vous invitons à nous contacter au plus vite.`,
            `Notre direction souhaite vous joindre personnellement.`,
            `Merci de nous contacter pour résoudre cette situation.`
        ]
    };

    const ctas = ctaByLabel[sentiment.label];
    const cta = ctas[Math.floor(Math.random() * ctas.length)];

    return response.trim() + ' ' + cta;
}

// ═══════════════════════════════════════════════════════════════
// TONE ADJUSTMENT
// ═══════════════════════════════════════════════════════════════

function adjustTone(
    response: string,
    tone: AIResponseConfig['tone'],
    sentiment: SentimentAnalysis
): string {
    // Ne pas modifier le ton pour les avis critiques - rester professionnel
    if (sentiment.label === 'critical') {
        // S'assurer qu'il n'y a pas d'emojis pour les cas critiques
        response = removeEmojis(response);
        return response;
    }

    switch (tone) {
        case 'enthusiastic':
            // Ajouter de l'enthousiasme uniquement pour les avis positifs
            if (sentiment.label === 'positive') {
                if (!response.includes('!')) {
                    response = response.replace(/\.(\s|$)/g, '! ');
                }
                // Ajouter un emoji subtil
                const emojis = ['✨', '🙏', '💫'];
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                if (!hasEmoji(response)) {
                    response = response.trim() + ' ' + emoji;
                }
            }
            break;

        case 'friendly':
            // Ton chaleureux mais mesuré
            if (sentiment.label === 'positive' && !hasEmoji(response) && Math.random() > 0.5) {
                response = response.trim() + ' 🙏';
            }
            break;

        case 'professional':
            // Retirer tous les emojis et uniformiser la ponctuation
            response = removeEmojis(response);
            response = response.replace(/!+/g, '.');
            break;
    }

    return response.trim();
}

// ═══════════════════════════════════════════════════════════════
// ALTERNATIVES GENERATION
// ═══════════════════════════════════════════════════════════════

async function generateAlternatives(
    config: AIResponseConfig,
    sentiment: SentimentAnalysis,
    geoKeywords: GeoKeyword[]
): Promise<string[]> {
    const alternatives: string[] = [];

    // Générer 2 versions alternatives
    for (let i = 0; i < 2; i++) {
        let altResponse = selectTemplate(sentiment, config);
        altResponse = enrichWithContext(altResponse, config, sentiment);

        // Utiliser des mots-clés différents
        const shuffledKeywords = [...geoKeywords].sort(() => Math.random() - 0.5);
        const { response } = integrateKeywordsNaturally(altResponse, shuffledKeywords, 2);

        if (sentiment.requiresEmpathy) {
            alternatives.push(addEmpathy(response, sentiment));
        } else {
            alternatives.push(response);
        }
    }

    return alternatives;
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function hasEmoji(text: string): boolean {
    // Détection basique des emojis courants (sans regex unicode)
    const commonEmojis = ['✨', '💫', '🙏', '❤️', '👏', '🌟', '😊', '🎉', '💪', '🔥'];
    return commonEmojis.some(emoji => text.includes(emoji));
}

function removeEmojis(text: string): string {
    // Supprimer les emojis courants
    const emojisToRemove = ['✨', '💫', '🙏', '❤️', '👏', '🌟', '😊', '🎉', '💪', '🔥', '⭐', '💯'];
    let result = text;
    for (const emoji of emojisToRemove) {
        result = result.split(emoji).join('');
    }
    return result.replace(/\s+/g, ' ').trim();
}

function truncateGracefully(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    // Chercher la dernière phrase complète
    const truncated = text.substring(0, maxLength - 3);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastExclamation = truncated.lastIndexOf('!');
    const lastQuestion = truncated.lastIndexOf('?');

    const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);

    if (lastSentenceEnd > maxLength * 0.6) {
        return text.substring(0, lastSentenceEnd + 1);
    }

    return truncated + '...';
}

// ═══════════════════════════════════════════════════════════════
// QUICK ANALYSIS EXPORTS
// ═══════════════════════════════════════════════════════════════

export { analyzeSentiment } from './sentiment-engine';
export { generateGeoKeywords, generateKeywordSuggestions } from './geo-seo-engine';
export { calculateSEOScore, generateSEOReport } from './seo-score-engine';
export { requiresHumanValidation } from './sentiment-engine';
