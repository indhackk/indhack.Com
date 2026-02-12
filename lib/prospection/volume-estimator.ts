/**
 * Estimateur de volumes de recherche - GRATUIT
 * Basé sur Google Autocomplete + formules population-based
 */

import { CITIES_06 } from './categories-data';
import { KeywordSuggestion } from './types';

// Population de référence (Nice)
const REFERENCE_POPULATION = 340000;

/**
 * Estime le volume de recherche pour une ville
 * basé sur le volume de Nice et la population
 */
export function estimateVolumeForCity(
    baseVolumeNice: number,
    cityPopulation: number
): number {
    // Ratio de population
    const populationRatio = cityPopulation / REFERENCE_POPULATION;

    // Facteur de correction : les petites villes ont proportionnellement
    // plus de recherches locales (les gens cherchent plus "local")
    const localSearchBoost = 1 + (0.15 * (1 - populationRatio));

    return Math.round(baseVolumeNice * populationRatio * localSearchBoost);
}

/**
 * Estime les volumes pour toutes les villes du 06
 */
export function estimateVolumesAllCities(baseVolumeNice: number): Record<string, number> {
    const volumes: Record<string, number> = {};

    for (const city of CITIES_06) {
        volumes[city.slug] = estimateVolumeForCity(baseVolumeNice, city.population);
    }

    return volumes;
}

/**
 * Google Autocomplete API - GRATUIT, pas de clé nécessaire
 * Retourne les suggestions de recherche Google
 */
export async function getGoogleAutocomplete(query: string): Promise<string[]> {
    try {
        // API publique Google Suggest (utilisée par Firefox)
        const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&hl=fr`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Autocomplete error: ${response.status}`);
            return [];
        }

        const data = await response.json();
        // Format: ["query", ["suggestion1", "suggestion2", ...]]
        return data[1] || [];
    } catch (error) {
        console.error('Autocomplete fetch error:', error);
        return [];
    }
}

/**
 * Récupère les suggestions de mots-clés pour un métier + ville
 */
export async function getKeywordSuggestions(
    subcategory: string,
    city: string
): Promise<KeywordSuggestion[]> {
    const queries = [
        `${subcategory} ${city}`,
        `${subcategory} ${city} avis`,
        `meilleur ${subcategory} ${city}`,
        `${subcategory} pas cher ${city}`,
        `${subcategory} ${city} ouvert`,
        `${subcategory} urgence ${city}`,
        `bon ${subcategory} ${city}`,
        `${subcategory} recommande ${city}`
    ];

    const suggestions: KeywordSuggestion[] = [];
    const seen = new Set<string>();

    for (const baseQuery of queries) {
        const results = await getGoogleAutocomplete(baseQuery);

        for (const keyword of results) {
            const normalized = keyword.toLowerCase().trim();
            if (!seen.has(normalized)) {
                seen.add(normalized);
                suggestions.push({
                    keyword: normalized,
                    source: 'google-autocomplete',
                    baseQuery
                });
            }
        }

        // Rate limiting - attendre entre les requêtes
        await sleep(300);
    }

    return suggestions;
}

/**
 * Estime le volume d'un mot-clé basé sur sa "popularité" relative
 * Plus le mot-clé apparaît tôt dans les suggestions, plus il a de volume
 */
export function estimateKeywordVolume(
    suggestion: KeywordSuggestion,
    baseVolume: number,
    position: number
): number {
    // Les premières suggestions ont généralement plus de volume
    // Position 0 = ~80% du volume de base
    // Position 4+ = ~20% du volume de base
    const positionMultiplier = Math.max(0.2, 1 - (position * 0.15));

    // Les variantes longue-traîne ont moins de volume
    const wordCount = suggestion.keyword.split(' ').length;
    const longTailMultiplier = wordCount <= 2 ? 1 : Math.max(0.3, 1 - (wordCount - 2) * 0.15);

    return Math.round(baseVolume * positionMultiplier * longTailMultiplier);
}

/**
 * Calcule le potentiel SEO total pour un métier dans une ville
 */
export function calculateSEOPotential(
    baseVolumeNice: number,
    cityPopulation: number,
    conversionRate: number = 0.03,  // 3% CTR moyen position 1
    closeRate: number = 0.10         // 10% conversion lead → client
): {
    monthlySearches: number;
    estimatedClicks: number;
    potentialLeads: number;
    potentialClients: number;
} {
    const monthlySearches = estimateVolumeForCity(baseVolumeNice, cityPopulation);
    const estimatedClicks = Math.round(monthlySearches * conversionRate);
    const potentialLeads = Math.round(estimatedClicks * 0.5); // 50% des clics = leads
    const potentialClients = Math.round(potentialLeads * closeRate);

    return {
        monthlySearches,
        estimatedClicks,
        potentialLeads,
        potentialClients
    };
}

/**
 * Génère un rapport de potentiel SEO pour une entreprise
 */
export function generateSEOReport(
    subcategory: string,
    city: string,
    baseVolumeNice: number,
    averageTicket: number
): {
    keywords: string[];
    totalVolume: number;
    potentialRevenue: number;
    competitorAdvantage: string;
} {
    const cityData = CITIES_06.find(c => c.name.toLowerCase() === city.toLowerCase());
    const population = cityData?.population || 50000;

    const potential = calculateSEOPotential(baseVolumeNice, population);

    return {
        keywords: [
            `${subcategory} ${city}`,
            `meilleur ${subcategory} ${city}`,
            `${subcategory} ${city} avis`,
            `${subcategory} pas cher ${city}`
        ],
        totalVolume: potential.monthlySearches,
        potentialRevenue: potential.potentialClients * averageTicket * 12, // Annuel
        competitorAdvantage: `${potential.potentialClients} clients/mois que vos concurrents captent actuellement`
    };
}

// Utility
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Export un index de toutes les fonctions
 */
export const VolumeEstimator = {
    estimateVolumeForCity,
    estimateVolumesAllCities,
    getGoogleAutocomplete,
    getKeywordSuggestions,
    estimateKeywordVolume,
    calculateSEOPotential,
    generateSEOReport
};
