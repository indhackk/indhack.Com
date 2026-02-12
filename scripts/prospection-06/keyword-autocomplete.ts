/**
 * Fetcher Google Autocomplete - GRATUIT
 * Récupère les suggestions de mots-clés pour chaque métier + ville
 *
 * Usage: npx ts-node scripts/prospection-06/keyword-autocomplete.ts [options]
 *
 * Options:
 *   --category=RESTAURATION    Catégorie spécifique
 *   --city=Nice                Ville spécifique
 *   --output=keywords.json     Fichier de sortie
 */

import * as fs from 'fs';
import * as path from 'path';

// Types
interface KeywordSuggestion {
    keyword: string;
    baseQuery: string;
    subcategory: string;
    city: string;
    position: number;
    estimatedVolume: number;
}

interface KeywordReport {
    generatedAt: string;
    totalKeywords: number;
    byCategory: Record<string, number>;
    byCity: Record<string, number>;
    keywords: KeywordSuggestion[];
}

// Données
const CATEGORIES_QUERIES: Record<string, string[]> = {
    RESTAURATION: [
        'restaurant', 'pizzeria', 'boulangerie', 'patisserie', 'traiteur',
        'ou manger', 'meilleur restaurant', 'restaurant livraison'
    ],
    SANTE: [
        'dentiste', 'osteopathe', 'kine', 'psychologue',
        'medecin', 'cabinet medical', 'rdv docteur'
    ],
    ARTISANS: [
        'plombier', 'electricien', 'serrurier', 'peintre', 'carreleur',
        'depannage', 'urgence', 'travaux'
    ]
};

const CITIES = [
    'Nice', 'Cannes', 'Antibes', 'Grasse', 'Menton',
    'Cagnes-sur-Mer', 'Le Cannet', 'Saint-Laurent-du-Var'
];

// Population pour estimation de volume
const CITY_POPULATIONS: Record<string, number> = {
    'Nice': 340000,
    'Cannes': 74000,
    'Antibes': 73000,
    'Grasse': 51000,
    'Menton': 28000,
    'Cagnes-sur-Mer': 50000,
    'Le Cannet': 42000,
    'Saint-Laurent-du-Var': 30000
};

// Helpers
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch Google Autocomplete suggestions
 * API publique, gratuite, pas de clé nécessaire
 */
async function fetchAutocomplete(query: string): Promise<string[]> {
    try {
        const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&hl=fr`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Erreur HTTP: ${response.status}`);
            return [];
        }

        const data = await response.json();
        // Format retourné: ["query", ["suggestion1", "suggestion2", ...]]
        return data[1] || [];

    } catch (error) {
        console.error(`Erreur fetch autocomplete pour "${query}":`, error);
        return [];
    }
}

/**
 * Estime le volume de recherche basé sur la position et la population
 */
function estimateVolume(position: number, cityPopulation: number): number {
    // Les premières suggestions ont plus de volume
    const baseVolume = cityPopulation / 100; // ~1% de la pop cherche
    const positionMultiplier = Math.max(0.1, 1 - (position * 0.15));

    return Math.round(baseVolume * positionMultiplier);
}

/**
 * Génère les variantes de requêtes pour un terme de base
 */
function generateQueryVariants(baseTerm: string, city: string): string[] {
    return [
        `${baseTerm} ${city}`,
        `${baseTerm} ${city} avis`,
        `meilleur ${baseTerm} ${city}`,
        `${baseTerm} pas cher ${city}`,
        `${baseTerm} ${city} ouvert`,
        `bon ${baseTerm} ${city}`,
    ];
}

/**
 * Fetch tous les keywords pour une catégorie
 */
async function fetchCategoryKeywords(
    categoryId: string,
    cities: string[]
): Promise<KeywordSuggestion[]> {
    const queries = CATEGORIES_QUERIES[categoryId] || [];
    const keywords: KeywordSuggestion[] = [];
    const seen = new Set<string>();

    console.log(`\n📁 Catégorie: ${categoryId}`);
    console.log(`   Termes: ${queries.length}`);
    console.log(`   Villes: ${cities.length}`);

    for (const city of cities) {
        const population = CITY_POPULATIONS[city] || 50000;

        for (const baseTerm of queries) {
            const variants = generateQueryVariants(baseTerm, city);

            for (const query of variants) {
                console.log(`   🔍 ${query}`);

                const suggestions = await fetchAutocomplete(query);

                for (let i = 0; i < suggestions.length; i++) {
                    const keyword = suggestions[i].toLowerCase().trim();

                    if (!seen.has(keyword)) {
                        seen.add(keyword);

                        keywords.push({
                            keyword,
                            baseQuery: query,
                            subcategory: baseTerm,
                            city,
                            position: i,
                            estimatedVolume: estimateVolume(i, population)
                        });
                    }
                }

                // Rate limiting - important!
                await sleep(300 + Math.random() * 200);
            }
        }
    }

    return keywords;
}

/**
 * Parse les arguments CLI
 */
function parseArgs(): {
    category?: string;
    city?: string;
    output: string;
} {
    const args = process.argv.slice(2);
    const result = {
        category: undefined as string | undefined,
        city: undefined as string | undefined,
        output: 'keywords-06'
    };

    for (const arg of args) {
        if (arg.startsWith('--category=')) {
            result.category = arg.split('=')[1].toUpperCase();
        } else if (arg.startsWith('--city=')) {
            result.city = arg.split('=')[1];
        } else if (arg.startsWith('--output=')) {
            result.output = arg.split('=')[1];
        }
    }

    return result;
}

/**
 * Sauvegarde les résultats
 */
function saveResults(keywords: KeywordSuggestion[], filename: string): void {
    const outputDir = path.join(__dirname, '..', '..', 'data', 'prospection');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Stats
    const byCategory: Record<string, number> = {};
    const byCity: Record<string, number> = {};

    for (const kw of keywords) {
        byCategory[kw.subcategory] = (byCategory[kw.subcategory] || 0) + 1;
        byCity[kw.city] = (byCity[kw.city] || 0) + 1;
    }

    const report: KeywordReport = {
        generatedAt: new Date().toISOString(),
        totalKeywords: keywords.length,
        byCategory,
        byCity,
        keywords: keywords.sort((a, b) => b.estimatedVolume - a.estimatedVolume)
    };

    const outputPath = path.join(outputDir, `${filename}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(`\n💾 Sauvegardé: ${outputPath}`);
    console.log(`   Total keywords: ${keywords.length}`);
}

// Main
async function main() {
    const args = parseArgs();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('   GOOGLE AUTOCOMPLETE - KEYWORD RESEARCH');
    console.log('═══════════════════════════════════════════════════════════');

    const categories = args.category
        ? [args.category]
        : Object.keys(CATEGORIES_QUERIES);

    const cities = args.city
        ? [args.city]
        : CITIES;

    const allKeywords: KeywordSuggestion[] = [];

    for (const categoryId of categories) {
        const keywords = await fetchCategoryKeywords(categoryId, cities);
        allKeywords.push(...keywords);
    }

    saveResults(allKeywords, args.output);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('   TERMINÉ');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\n✅ ${allKeywords.length} mots-clés extraits`);

    // Top 10
    console.log('\n📈 Top 10 mots-clés par volume estimé:');
    const sorted = allKeywords.sort((a, b) => b.estimatedVolume - a.estimatedVolume);
    for (let i = 0; i < Math.min(10, sorted.length); i++) {
        console.log(`   ${i + 1}. "${sorted[i].keyword}" - ~${sorted[i].estimatedVolume}/mois`);
    }
}

main().catch(console.error);
