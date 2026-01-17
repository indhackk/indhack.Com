import { AIResponseConfig } from './types';
import { RESPONSE_TEMPLATES } from './mock-data';

// Générateur de réponses IA simulé (en production, utiliserait OpenAI/Claude API)
export async function generateAIResponse(config: AIResponseConfig): Promise<string> {
    // Simuler un délai de traitement IA
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const { businessName, keywords, tone, reviewText, reviewRating, authorName, includeCallToAction, maxLength } = config;

    // Déterminer le type de réponse basé sur la note
    let templateCategory: 'positive' | 'neutral' | 'negative';
    if (reviewRating >= 4) {
        templateCategory = 'positive';
    } else if (reviewRating === 3) {
        templateCategory = 'neutral';
    } else {
        templateCategory = 'negative';
    }

    // Sélectionner un template aléatoire
    const templates = RESPONSE_TEMPLATES[templateCategory];
    let response = templates[Math.floor(Math.random() * templates.length)];

    // Remplacer les placeholders
    response = response.replace(/{author}/g, authorName);
    response = response.replace(/{business}/g, businessName);

    // Ajouter des éléments personnalisés basés sur le contenu de l'avis
    response = enhanceResponseWithContext(response, reviewText, tone);

    // Intégrer les mots-clés stratégiques
    if (keywords.length > 0) {
        response = integrateKeywords(response, keywords, templateCategory);
    }

    // Ajouter un call-to-action si demandé
    if (includeCallToAction) {
        response = addCallToAction(response, templateCategory, businessName);
    }

    // Ajuster la tonalité
    response = adjustTone(response, tone);

    // Limiter la longueur si nécessaire
    if (maxLength > 0 && response.length > maxLength) {
        response = response.substring(0, maxLength - 3) + '...';
    }

    return response;
}

function enhanceResponseWithContext(response: string, reviewText: string, tone: string): string {
    const lowerText = reviewText.toLowerCase();

    // Détecter des éléments mentionnés dans l'avis pour personnaliser
    const contextualAdditions: string[] = [];

    if (lowerText.includes('service') || lowerText.includes('équipe') || lowerText.includes('personnel')) {
        contextualAdditions.push('Notre équipe sera ravie de vous accueillir à nouveau.');
    }

    if (lowerText.includes('qualité') || lowerText.includes('produit') || lowerText.includes('frais')) {
        contextualAdditions.push('La qualité est au cœur de notre engagement.');
    }

    if (lowerText.includes('prix') || lowerText.includes('rapport qualité')) {
        contextualAdditions.push('Nous veillons à offrir le meilleur rapport qualité-prix.');
    }

    if (lowerText.includes('recommande') || lowerText.includes('reviendrai')) {
        contextualAdditions.push('Votre recommandation est notre plus belle récompense !');
    }

    if (lowerText.includes('attente') || lowerText.includes('temps')) {
        contextualAdditions.push('Nous travaillons à optimiser nos délais.');
    }

    // Ajouter une addition contextuelle aléatoire si disponible
    if (contextualAdditions.length > 0) {
        const addition = contextualAdditions[Math.floor(Math.random() * contextualAdditions.length)];
        response = response.replace(/\.$/, '. ' + addition);
    }

    return response;
}

function integrateKeywords(response: string, keywords: string[], category: 'positive' | 'neutral' | 'negative'): string {
    // Intégrer 1-2 mots-clés de manière naturelle
    const keywordsToUse = keywords.slice(0, 2);

    const keywordPhrases: Record<string, string[]> = {
        'restaurant': ['notre restaurant', 'à notre table'],
        'cuisine': ['notre cuisine', 'nos plats'],
        'coiffeur': ['notre salon', 'nos coiffeurs'],
        'garage': ['notre garage', 'notre atelier'],
        'lyon': ['à Lyon', 'lyonnais'],
        'marseille': ['à Marseille', 'marseillais'],
        'nice': ['à Nice', 'niçois'],
        'paris': ['à Paris', 'parisien'],
        'strasbourg': ['à Strasbourg', 'strasbourgeois'],
        'qualité': ['notre engagement qualité', 'la qualité de nos services'],
        'service': ['notre service', 'notre équipe'],
        'professionnel': ['notre professionnalisme', 'notre équipe professionnelle']
    };

    for (const keyword of keywordsToUse) {
        const keywordLower = keyword.toLowerCase();
        for (const [key, phrases] of Object.entries(keywordPhrases)) {
            if (keywordLower.includes(key)) {
                const phrase = phrases[Math.floor(Math.random() * phrases.length)];
                // Ajouter la phrase naturellement si pas déjà présente
                if (!response.toLowerCase().includes(key)) {
                    response = response.replace(/\.$/, `. Nous sommes fiers de ${phrase}.`);
                    break;
                }
            }
        }
    }

    return response;
}

function addCallToAction(response: string, category: 'positive' | 'neutral' | 'negative', businessName: string): string {
    const ctaPositive = [
        `N'hésitez pas à revenir nous voir bientôt !`,
        `Au plaisir de vous revoir chez ${businessName} !`,
        `Retrouvez-nous sur nos réseaux sociaux pour ne rien manquer !`
    ];

    const ctaNeutral = [
        `Contactez-nous pour toute question.`,
        `Notre équipe reste à votre disposition.`,
        `N'hésitez pas à nous faire part de vos suggestions.`
    ];

    const ctaNegative = [
        `Contactez-nous directement pour en discuter.`,
        `Notre responsable serait ravi d'échanger avec vous.`,
        `Nous aimerions avoir l'opportunité de nous rattraper.`
    ];

    let ctas: string[];
    switch (category) {
        case 'positive':
            ctas = ctaPositive;
            break;
        case 'neutral':
            ctas = ctaNeutral;
            break;
        case 'negative':
            ctas = ctaNegative;
            break;
    }

    const cta = ctas[Math.floor(Math.random() * ctas.length)];
    return response + ' ' + cta;
}

function adjustTone(response: string, tone: 'professional' | 'friendly' | 'enthusiastic'): string {
    switch (tone) {
        case 'enthusiastic':
            // Ajouter des emojis et de l'enthousiasme
            if (!response.includes('!')) {
                response = response.replace(/\./g, '!');
            }
            const emojis = ['✨', '🌟', '💫', '🙏', '❤️', '👏'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            if (!/[^\x00-\x7F]/.test(response)) {
                response += ' ' + emoji;
            }
            break;

        case 'friendly':
            // Ton chaleureux mais sans excès
            if (!response.includes('🙏') && Math.random() > 0.5) {
                response += ' 🙏';
            }
            break;

        case 'professional':
            // Retirer les emojis si présents, ton formel
            response = response.replace(/[^\x00-\x7F]/g, '').trim();
            response = response.replace(/!+/g, '.');
            break;
    }

    return response;
}

// Analyser le sentiment d'un avis
export function analyzeSentiment(text: string): { score: number; label: 'positive' | 'neutral' | 'negative' } {
    const positiveWords = ['excellent', 'parfait', 'super', 'génial', 'top', 'magnifique', 'recommande', 'merci', 'bravo', 'qualité', 'satisfait', 'agréable', 'professionnel'];
    const negativeWords = ['déçu', 'mauvais', 'nul', 'horrible', 'cher', 'lent', 'attente', 'problème', 'jamais', 'erreur', 'arnaque', 'éviter'];

    const lowerText = text.toLowerCase();
    let score = 0;

    for (const word of positiveWords) {
        if (lowerText.includes(word)) score += 1;
    }

    for (const word of negativeWords) {
        if (lowerText.includes(word)) score -= 1;
    }

    // Normaliser entre -1 et 1
    const normalizedScore = Math.max(-1, Math.min(1, score / 3));

    let label: 'positive' | 'neutral' | 'negative';
    if (normalizedScore > 0.2) label = 'positive';
    else if (normalizedScore < -0.2) label = 'negative';
    else label = 'neutral';

    return { score: normalizedScore, label };
}

// Suggérer des mots-clés à intégrer basé sur l'activité
export function suggestKeywords(businessCategory: string, location: string): string[] {
    const categoryKeywords: Record<string, string[]> = {
        'Restaurant': ['restaurant', 'cuisine', 'menu', 'terrasse', 'repas', 'gastronomie', 'chef'],
        'Garage automobile': ['garage', 'mécanique', 'réparation', 'entretien', 'voiture', 'auto'],
        'Salon de coiffure': ['coiffeur', 'salon', 'coupe', 'coloration', 'beauté', 'styliste'],
        'Boulangerie': ['boulangerie', 'pain', 'viennoiseries', 'pâtisserie', 'artisan'],
        'Hôtel': ['hôtel', 'séjour', 'chambre', 'accueil', 'confort', 'réservation'],
        'default': ['service', 'qualité', 'professionnel', 'expérience']
    };

    const keywords = categoryKeywords[businessCategory] || categoryKeywords['default'];

    // Ajouter le mot-clé de localisation
    if (location) {
        const cityMatch = location.match(/\d{5}\s+(\w+)/);
        if (cityMatch) {
            keywords.push(cityMatch[1].toLowerCase());
        }
    }

    return keywords;
}
