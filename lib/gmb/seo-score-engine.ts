/**
 * GMB AutoPilot - SEO Impact Score Engine
 * Calcule l'impact SEO des réponses avec suggestions d'optimisation
 */

import { SEOImpactScore, SEOSuggestion, GeoKeyword } from './types';

// ═══════════════════════════════════════════════════════════════
// PARAMÈTRES D'OPTIMISATION SEO
// ═══════════════════════════════════════════════════════════════

const SEO_CONFIG = {
    idealResponseLength: { min: 150, max: 300 },
    maxKeywords: 3,
    ctaBonus: 15,
    localKeywordBonus: 20,
    naturalIntegrationThreshold: 70
};

// ═══════════════════════════════════════════════════════════════
// CALCULATEUR DE SCORE SEO
// ═══════════════════════════════════════════════════════════════

/**
 * Calcule le score SEO complet d'une réponse
 */
export function calculateSEOScore(
    response: string,
    targetKeywords: GeoKeyword[],
    usedKeywords: string[],
    businessCity: string
): SEOImpactScore {
    const breakdown = {
        keywordRelevance: calculateKeywordRelevance(response, targetKeywords, usedKeywords),
        keywordPlacement: calculateKeywordPlacement(response, usedKeywords),
        naturalIntegration: calculateNaturalIntegration(response, usedKeywords),
        localSEO: calculateLocalSEO(response, businessCity, targetKeywords),
        responseLength: calculateLengthScore(response),
        callToAction: detectCallToAction(response)
    };

    // Calcul du score global pondéré
    const weights = {
        keywordRelevance: 0.25,
        keywordPlacement: 0.15,
        naturalIntegration: 0.20,
        localSEO: 0.20,
        responseLength: 0.10,
        callToAction: 0.10
    };

    const overall = Math.round(
        Object.entries(breakdown).reduce((sum, [key, value]) => {
            return sum + value * weights[key as keyof typeof weights];
        }, 0)
    );

    // Générer les suggestions
    const suggestions = generateSuggestions(breakdown, response, targetKeywords, businessCity);

    // Calculer le boost de visibilité projeté
    const projectedVisibilityBoost = calculateVisibilityBoost(overall, usedKeywords.length);

    return {
        overall,
        breakdown,
        suggestions,
        projectedVisibilityBoost
    };
}

/**
 * Calcule la pertinence des mots-clés utilisés
 */
function calculateKeywordRelevance(
    response: string,
    targetKeywords: GeoKeyword[],
    usedKeywords: string[]
): number {
    if (usedKeywords.length === 0) return 20;

    let relevanceSum = 0;
    const responseLower = response.toLowerCase();

    for (const used of usedKeywords) {
        const target = targetKeywords.find(
            t => t.keyword.toLowerCase() === used.toLowerCase()
        );

        if (target) {
            // Score basé sur la pertinence du mot-clé cible
            relevanceSum += target.relevanceScore;
        } else {
            // Mot-clé non ciblé mais présent
            relevanceSum += 40;
        }
    }

    // Normaliser
    const avgRelevance = relevanceSum / usedKeywords.length;

    // Bonus si on a utilisé des mots-clés primaires
    const hasPrimary = usedKeywords.some(used =>
        targetKeywords.find(t =>
            t.keyword.toLowerCase() === used.toLowerCase() && t.type === 'primary'
        )
    );

    return Math.min(100, Math.round(avgRelevance + (hasPrimary ? 15 : 0)));
}

/**
 * Calcule le score de placement des mots-clés
 */
function calculateKeywordPlacement(response: string, usedKeywords: string[]): number {
    if (usedKeywords.length === 0) return 30;

    const responseLower = response.toLowerCase();
    const words = responseLower.split(/\s+/);
    const totalWords = words.length;

    let placementScore = 0;
    let keywordsFound = 0;

    for (const keyword of usedKeywords) {
        const keywordLower = keyword.toLowerCase();
        const position = responseLower.indexOf(keywordLower);

        if (position === -1) continue;

        keywordsFound++;

        // Position relative (0-1)
        const relativePosition = position / response.length;

        // Les mots-clés au début et milieu sont plus valorisés
        if (relativePosition < 0.3) {
            placementScore += 100; // Début = optimal
        } else if (relativePosition < 0.6) {
            placementScore += 80; // Milieu = bon
        } else {
            placementScore += 50; // Fin = acceptable
        }
    }

    if (keywordsFound === 0) return 30;

    return Math.round(placementScore / keywordsFound);
}

/**
 * Calcule le score d'intégration naturelle
 */
function calculateNaturalIntegration(response: string, usedKeywords: string[]): number {
    if (usedKeywords.length === 0) return 50;

    let naturalScore = 100;
    const responseLower = response.toLowerCase();

    // Patterns à éviter (intégration forcée)
    const badPatterns = [
        /mots[- ]?cl[ée]s?/i,
        /seo/i,
        /référencement/i,
        /(\w+)\s+à\s+\w+\s+à\s+\w+/i, // Répétition de "à"
        /(\w+)\.\s*\1/i, // Mot répété immédiatement
    ];

    // Pénalité pour patterns non naturels
    for (const pattern of badPatterns) {
        if (pattern.test(response)) {
            naturalScore -= 20;
        }
    }

    // Vérifier la fluidité autour des mots-clés
    for (const keyword of usedKeywords) {
        const keywordLower = keyword.toLowerCase();
        const index = responseLower.indexOf(keywordLower);

        if (index > 0) {
            // Vérifier le contexte avant
            const charBefore = response[index - 1];
            if (charBefore !== ' ' && charBefore !== '\'' && charBefore !== '-') {
                naturalScore -= 10;
            }
        }

        // Vérifier si le mot-clé est dans une phrase complète
        const sentenceEnd = response.indexOf('.', index);
        const sentenceStart = response.lastIndexOf('.', index);
        const sentence = response.substring(
            sentenceStart === -1 ? 0 : sentenceStart + 1,
            sentenceEnd === -1 ? response.length : sentenceEnd
        );

        // Une phrase trop courte avec un mot-clé = forcé
        if (sentence.trim().split(/\s+/).length < 5 && sentence.includes(keyword)) {
            naturalScore -= 10;
        }
    }

    // Bonus si les mots-clés sont dans des structures grammaticales variées
    const structures = {
        possession: /notre|votre|nos|vos/i,
        location: /à|chez|dans|sur/i,
        quality: /de qualité|professionnel|expert/i
    };

    let structureVariety = 0;
    for (const keyword of usedKeywords) {
        const keywordContext = getKeywordContext(response, keyword, 30);
        for (const [, pattern] of Object.entries(structures)) {
            if (pattern.test(keywordContext)) {
                structureVariety++;
                break;
            }
        }
    }

    naturalScore += Math.min(15, structureVariety * 5);

    return Math.max(0, Math.min(100, naturalScore));
}

/**
 * Récupère le contexte autour d'un mot-clé
 */
function getKeywordContext(text: string, keyword: string, radius: number): string {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase());
    if (index === -1) return '';

    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + keyword.length + radius);

    return text.substring(start, end);
}

/**
 * Calcule le score SEO local
 */
function calculateLocalSEO(
    response: string,
    businessCity: string,
    targetKeywords: GeoKeyword[]
): number {
    let score = 40; // Score de base
    const responseLower = response.toLowerCase();
    const cityLower = businessCity.toLowerCase();

    // Mention de la ville
    if (responseLower.includes(cityLower)) {
        score += 25;
    }

    // Mots-clés locaux utilisés
    const localKeywords = targetKeywords.filter(k => k.type === 'local');
    for (const local of localKeywords) {
        if (responseLower.includes(local.keyword.toLowerCase())) {
            score += 15;
        }
    }

    // Expressions géolocalisées
    const localExpressions = [
        `à ${businessCity}`,
        `de ${businessCity}`,
        `${cityLower}`,
        'chez nous',
        'notre établissement',
        'notre équipe locale'
    ];

    for (const expr of localExpressions) {
        if (responseLower.includes(expr.toLowerCase())) {
            score += 5;
        }
    }

    return Math.min(100, score);
}

/**
 * Calcule le score basé sur la longueur de la réponse
 */
function calculateLengthScore(response: string): number {
    const length = response.length;
    const { min, max } = SEO_CONFIG.idealResponseLength;

    if (length < 50) return 20; // Trop court
    if (length < min) return 40 + ((length - 50) / (min - 50)) * 30; // En dessous de l'idéal
    if (length <= max) return 100; // Parfait
    if (length <= max * 1.5) return 80; // Un peu long
    return 60; // Trop long
}

/**
 * Détecte la présence d'un call-to-action
 */
function detectCallToAction(response: string): number {
    const ctaPatterns = [
        /à bientôt/i,
        /au plaisir/i,
        /n['']hésitez pas/i,
        /contactez[-\s]?nous/i,
        /appelez[-\s]?nous/i,
        /retrouvez[-\s]?nous/i,
        /rendez[-\s]?vous/i,
        /réservez/i,
        /découvrez/i,
        /visitez/i
    ];

    let ctaScore = 0;
    for (const pattern of ctaPatterns) {
        if (pattern.test(response)) {
            ctaScore = 100;
            break;
        }
    }

    // Bonus pour CTA avec action concrète
    const strongCTAs = [
        /réservez (dès )?maintenant/i,
        /appelez[-\s]?nous au/i,
        /contactez[-\s]?nous pour/i
    ];

    for (const pattern of strongCTAs) {
        if (pattern.test(response)) {
            ctaScore = 100;
            break;
        }
    }

    return ctaScore;
}

/**
 * Génère des suggestions d'amélioration
 */
function generateSuggestions(
    breakdown: SEOImpactScore['breakdown'],
    response: string,
    targetKeywords: GeoKeyword[],
    businessCity: string
): SEOSuggestion[] {
    const suggestions: SEOSuggestion[] = [];

    // Suggestion sur les mots-clés
    if (breakdown.keywordRelevance < 60) {
        const primaryKeyword = targetKeywords.find(k => k.type === 'primary');
        if (primaryKeyword) {
            suggestions.push({
                type: 'keyword',
                priority: 'high',
                message: `Intégrez le mot-clé "${primaryKeyword.keyword}" pour améliorer votre visibilité`,
                impact: 25
            });
        }
    }

    // Suggestion sur le SEO local
    if (breakdown.localSEO < 60) {
        suggestions.push({
            type: 'local',
            priority: 'high',
            message: `Mentionnez "${businessCity}" pour renforcer votre référencement local`,
            impact: 20
        });
    }

    // Suggestion sur l'intégration naturelle
    if (breakdown.naturalIntegration < 70) {
        suggestions.push({
            type: 'structure',
            priority: 'medium',
            message: 'Reformulez pour une intégration plus naturelle des mots-clés',
            impact: 15
        });
    }

    // Suggestion sur le CTA
    if (breakdown.callToAction < 50) {
        suggestions.push({
            type: 'cta',
            priority: 'medium',
            message: 'Ajoutez un appel à l\'action (ex: "Au plaisir de vous revoir !")',
            impact: 10
        });
    }

    // Suggestion sur la longueur
    if (breakdown.responseLength < 60) {
        if (response.length < 100) {
            suggestions.push({
                type: 'structure',
                priority: 'low',
                message: 'Enrichissez votre réponse pour un meilleur impact SEO (150-300 caractères)',
                impact: 10
            });
        } else if (response.length > 400) {
            suggestions.push({
                type: 'structure',
                priority: 'low',
                message: 'Condensez votre réponse pour plus d\'efficacité (150-300 caractères)',
                impact: 5
            });
        }
    }

    return suggestions.sort((a, b) => b.impact - a.impact);
}

/**
 * Calcule le boost de visibilité projeté
 */
function calculateVisibilityBoost(overallScore: number, keywordCount: number): number {
    // Formule basée sur le score et le nombre de mots-clés
    const baseBoost = (overallScore / 100) * 5; // Max 5%
    const keywordBoost = Math.min(keywordCount * 0.5, 2); // Max 2%

    return Math.round((baseBoost + keywordBoost) * 10) / 10;
}

/**
 * Génère un rapport SEO détaillé
 */
export function generateSEOReport(score: SEOImpactScore): {
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    summary: string;
    details: string[];
} {
    const grade = getGrade(score.overall);

    const gradeMessages = {
        A: 'Excellent ! Votre réponse est optimisée pour le SEO local.',
        B: 'Bien ! Quelques améliorations possibles pour maximiser l\'impact.',
        C: 'Correct. Des optimisations recommandées pour de meilleurs résultats.',
        D: 'À améliorer. Votre réponse manque d\'optimisation SEO.',
        F: 'Critique. Réponse non optimisée, impact SEO minimal.'
    };

    const details: string[] = [];

    // Ajouter les détails basés sur le breakdown
    if (score.breakdown.keywordRelevance >= 70) {
        details.push('Mots-clés pertinents bien intégrés');
    }
    if (score.breakdown.localSEO >= 70) {
        details.push('Bon référencement local');
    }
    if (score.breakdown.naturalIntegration >= 70) {
        details.push('Intégration naturelle des mots-clés');
    }
    if (score.breakdown.callToAction >= 80) {
        details.push('Call-to-action efficace');
    }

    // Ajouter la projection
    if (score.projectedVisibilityBoost > 0) {
        details.push(`Boost de visibilité estimé: +${score.projectedVisibilityBoost}%`);
    }

    return {
        grade,
        summary: gradeMessages[grade],
        details
    };
}

/**
 * Convertit un score en note lettre
 */
function getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'F';
}
