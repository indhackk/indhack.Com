#!/usr/bin/env node
/**
 * Étude GMB Côte d'Azur 2026
 * Script de collecte de données pour l'article data-journalism
 *
 * Usage: node scripts/gmb-study-cote-azur.mjs
 * Requires: SERPER_API_KEY in .env.local
 */

import { config } from 'dotenv';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

// Load environment variables
config({ path: '.env.local' });

const SERPER_API_KEY = process.env.SERPER_API_KEY;

if (!SERPER_API_KEY) {
    console.error('❌ SERPER_API_KEY non trouvée dans .env.local');
    process.exit(1);
}

// Configuration de l'étude
const STUDY_CONFIG = {
    name: "État des lieux Google My Business - Restaurateurs Côte d'Azur 2026",
    date: new Date().toISOString().split('T')[0],
    cities: [
        { name: "Nice", department: "06", population: 342669 },
        { name: "Cannes", department: "06", population: 74545 },
        { name: "Antibes", department: "06", population: 72999 },
        { name: "Monaco", department: "98", population: 39150 },
        { name: "Menton", department: "06", population: 30231 },
        { name: "Grasse", department: "06", population: 50396 },
        { name: "Cagnes-sur-Mer", department: "06", population: 52178 },
        { name: "Saint-Tropez", department: "83", population: 4166 },
        { name: "Fréjus", department: "83", population: 54458 },
        { name: "Mandelieu-la-Napoule", department: "06", population: 22714 },
    ],
    queries: [
        "restaurant",
        "restaurant gastronomique",
        "pizzeria",
        "brasserie",
    ],
    resultsPerQuery: 20, // Serper places returns up to 20 results
};

// Fonction pour appeler l'API Serper Places
async function searchPlaces(query, city) {
    const searchQuery = `${query} ${city}`;

    try {
        const response = await fetch("https://google.serper.dev/places", {
            method: "POST",
            headers: {
                "X-API-KEY": SERPER_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q: searchQuery,
                gl: "fr",
                hl: "fr",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Erreur API pour "${searchQuery}":`, response.status, errorText);
            return null;
        }

        const data = await response.json();
        return {
            query: searchQuery,
            city,
            places: data.places || [],
            searchInfo: data.searchParameters,
        };
    } catch (error) {
        console.error(`❌ Erreur réseau pour "${searchQuery}":`, error.message);
        return null;
    }
}

// Fonction pour analyser la qualité d'un profil GMB
function analyzeGMBProfile(place) {
    const analysis = {
        hasRating: !!place.rating,
        rating: place.rating || 0,
        hasReviews: (place.reviews || place.ratingCount || 0) > 0,
        reviewCount: place.reviews || place.ratingCount || 0,
        hasAddress: !!place.address,
        hasPhone: !!place.phone || !!place.phoneNumber,
        hasWebsite: !!place.website,
        hasCategory: !!place.category || !!place.type,
        hasHours: !!place.openingHours || !!place.hours,
        hasPhotos: (place.thumbnails?.length || 0) > 0 || !!place.thumbnail,
        // Score de complétude (sur 10)
        completenessScore: 0,
        // Flags de problèmes
        issues: [],
    };

    // Calculer le score de complétude
    let score = 0;
    if (analysis.hasRating) score += 1;
    if (analysis.rating >= 4.0) score += 1;
    if (analysis.hasReviews) score += 1;
    if (analysis.reviewCount >= 10) score += 1;
    if (analysis.reviewCount >= 50) score += 1;
    if (analysis.hasAddress) score += 1;
    if (analysis.hasPhone) score += 1;
    if (analysis.hasWebsite) score += 1;
    if (analysis.hasCategory) score += 1;
    if (analysis.hasHours) score += 1;

    analysis.completenessScore = score;

    // Identifier les problèmes
    if (!analysis.hasReviews || analysis.reviewCount < 5) {
        analysis.issues.push("Peu ou pas d'avis");
    }
    if (analysis.rating < 4.0 && analysis.hasRating) {
        analysis.issues.push("Note inférieure à 4/5");
    }
    if (!analysis.hasWebsite) {
        analysis.issues.push("Pas de site web");
    }
    if (!analysis.hasPhone) {
        analysis.issues.push("Pas de téléphone");
    }

    return analysis;
}

// Fonction pour collecter les données
async function collectData() {
    console.log('🔍 Début de la collecte de données GMB...\n');

    const allResults = {
        metadata: {
            studyName: STUDY_CONFIG.name,
            date: STUDY_CONFIG.date,
            totalCities: STUDY_CONFIG.cities.length,
            queries: STUDY_CONFIG.queries,
        },
        citiesData: {},
        globalStats: {
            totalRestaurants: 0,
            avgRating: 0,
            avgReviews: 0,
            withWebsite: 0,
            withPhone: 0,
            withGoodRating: 0, // >= 4.0
            withManyReviews: 0, // >= 50
            profileQuality: {
                excellent: 0, // score 8-10
                good: 0,      // score 6-7
                medium: 0,    // score 4-5
                poor: 0,      // score 0-3
            }
        }
    };

    const uniqueRestaurants = new Map(); // Pour éviter les doublons

    for (const city of STUDY_CONFIG.cities) {
        console.log(`\n📍 Collecte pour ${city.name}...`);

        const cityData = {
            cityInfo: city,
            restaurants: [],
            stats: {
                total: 0,
                avgRating: 0,
                avgReviews: 0,
                withWebsite: 0,
                withPhone: 0,
                profileQuality: { excellent: 0, good: 0, medium: 0, poor: 0 }
            }
        };

        for (const query of STUDY_CONFIG.queries) {
            console.log(`   🔎 Recherche: "${query} ${city.name}"...`);

            const result = await searchPlaces(query, city.name);

            if (result && result.places) {
                console.log(`   ✓ ${result.places.length} résultats trouvés`);

                for (const place of result.places) {
                    // Créer une clé unique pour éviter les doublons
                    const key = `${place.title || place.name}-${place.address || ''}`.toLowerCase();

                    if (!uniqueRestaurants.has(key)) {
                        const analysis = analyzeGMBProfile(place);

                        const restaurantData = {
                            name: place.title || place.name,
                            address: place.address,
                            city: city.name,
                            rating: place.rating,
                            reviews: place.reviews || place.ratingCount || 0,
                            phone: place.phone || place.phoneNumber,
                            website: place.website,
                            category: place.category || place.type,
                            cid: place.cid,
                            analysis,
                        };

                        uniqueRestaurants.set(key, restaurantData);
                        cityData.restaurants.push(restaurantData);
                    }
                }
            }

            // Pause pour respecter les rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Calculer les stats de la ville
        if (cityData.restaurants.length > 0) {
            const restaurants = cityData.restaurants;
            cityData.stats.total = restaurants.length;

            const withRating = restaurants.filter(r => r.analysis.hasRating);
            cityData.stats.avgRating = withRating.length > 0
                ? (withRating.reduce((sum, r) => sum + r.rating, 0) / withRating.length).toFixed(2)
                : 0;

            cityData.stats.avgReviews = (restaurants.reduce((sum, r) => sum + r.reviews, 0) / restaurants.length).toFixed(1);
            cityData.stats.withWebsite = restaurants.filter(r => r.analysis.hasWebsite).length;
            cityData.stats.withPhone = restaurants.filter(r => r.analysis.hasPhone).length;

            // Qualité des profils
            for (const r of restaurants) {
                const score = r.analysis.completenessScore;
                if (score >= 8) cityData.stats.profileQuality.excellent++;
                else if (score >= 6) cityData.stats.profileQuality.good++;
                else if (score >= 4) cityData.stats.profileQuality.medium++;
                else cityData.stats.profileQuality.poor++;
            }
        }

        allResults.citiesData[city.name] = cityData;
        console.log(`   📊 ${cityData.stats.total} restaurants uniques pour ${city.name}`);
    }

    // Calculer les stats globales
    const allRestaurants = Array.from(uniqueRestaurants.values());
    allResults.globalStats.totalRestaurants = allRestaurants.length;

    const withRating = allRestaurants.filter(r => r.analysis.hasRating);
    allResults.globalStats.avgRating = withRating.length > 0
        ? (withRating.reduce((sum, r) => sum + r.rating, 0) / withRating.length).toFixed(2)
        : 0;

    allResults.globalStats.avgReviews = (allRestaurants.reduce((sum, r) => sum + r.reviews, 0) / allRestaurants.length).toFixed(1);
    allResults.globalStats.withWebsite = allRestaurants.filter(r => r.analysis.hasWebsite).length;
    allResults.globalStats.withPhone = allRestaurants.filter(r => r.analysis.hasPhone).length;
    allResults.globalStats.withGoodRating = allRestaurants.filter(r => r.rating >= 4.0).length;
    allResults.globalStats.withManyReviews = allRestaurants.filter(r => r.reviews >= 50).length;

    for (const r of allRestaurants) {
        const score = r.analysis.completenessScore;
        if (score >= 8) allResults.globalStats.profileQuality.excellent++;
        else if (score >= 6) allResults.globalStats.profileQuality.good++;
        else if (score >= 4) allResults.globalStats.profileQuality.medium++;
        else allResults.globalStats.profileQuality.poor++;
    }

    return allResults;
}

// Fonction pour générer le rapport
function generateReport(data) {
    const stats = data.globalStats;
    const pctWithWebsite = ((stats.withWebsite / stats.totalRestaurants) * 100).toFixed(1);
    const pctPoorProfile = ((stats.profileQuality.poor / stats.totalRestaurants) * 100).toFixed(1);
    const pctExcellent = ((stats.profileQuality.excellent / stats.totalRestaurants) * 100).toFixed(1);

    console.log('\n' + '═'.repeat(60));
    console.log('📊 RÉSULTATS DE L\'ÉTUDE GMB CÔTE D\'AZUR 2026');
    console.log('═'.repeat(60));
    console.log(`\n📅 Date: ${data.metadata.date}`);
    console.log(`🏙️  Villes analysées: ${data.metadata.totalCities}`);
    console.log(`🍽️  Restaurants analysés: ${stats.totalRestaurants}`);
    console.log('\n--- STATISTIQUES GLOBALES ---');
    console.log(`⭐ Note moyenne: ${stats.avgRating}/5`);
    console.log(`💬 Nombre moyen d'avis: ${stats.avgReviews}`);
    console.log(`🌐 Avec site web: ${stats.withWebsite} (${pctWithWebsite}%)`);
    console.log(`📱 Avec téléphone: ${stats.withPhone}`);
    console.log(`\n--- QUALITÉ DES PROFILS GMB ---`);
    console.log(`✅ Excellent (8-10/10): ${stats.profileQuality.excellent} (${pctExcellent}%)`);
    console.log(`👍 Bon (6-7/10): ${stats.profileQuality.good}`);
    console.log(`⚠️  Moyen (4-5/10): ${stats.profileQuality.medium}`);
    console.log(`❌ Faible (0-3/10): ${stats.profileQuality.poor} (${pctPoorProfile}%)`);

    console.log('\n--- DÉTAIL PAR VILLE ---');
    for (const [cityName, cityData] of Object.entries(data.citiesData)) {
        const s = cityData.stats;
        const pctPoor = s.total > 0 ? ((s.profileQuality.poor / s.total) * 100).toFixed(0) : 0;
        console.log(`\n📍 ${cityName}: ${s.total} restaurants`);
        console.log(`   ⭐ Note moy: ${s.avgRating} | 💬 Avis moy: ${s.avgReviews}`);
        console.log(`   ❌ Profils faibles: ${s.profileQuality.poor} (${pctPoor}%)`);
    }

    console.log('\n' + '═'.repeat(60));

    // Statistiques clés pour l'article
    const keyStats = {
        headline: `${pctPoorProfile}% des restaurateurs de la Côte d'Azur sont invisibles sur Google`,
        subheadline: `Étude exclusive sur ${stats.totalRestaurants} établissements dans ${data.metadata.totalCities} villes`,
        keyNumbers: {
            totalAnalyzed: stats.totalRestaurants,
            poorProfiles: stats.profileQuality.poor,
            pctPoor: pctPoorProfile,
            withoutWebsite: stats.totalRestaurants - stats.withWebsite,
            pctWithoutWebsite: (100 - parseFloat(pctWithWebsite)).toFixed(1),
            avgRating: stats.avgRating,
            avgReviews: stats.avgReviews,
        },
        byCity: Object.entries(data.citiesData).map(([name, d]) => ({
            city: name,
            total: d.stats.total,
            avgRating: d.stats.avgRating,
            poorProfiles: d.stats.profileQuality.poor,
            pctPoor: d.stats.total > 0 ? ((d.stats.profileQuality.poor / d.stats.total) * 100).toFixed(0) : 0,
        })),
    };

    return keyStats;
}

// Exécution principale
async function main() {
    console.log('🚀 Lancement de l\'étude GMB Côte d\'Azur 2026\n');
    console.log('Configuration:');
    console.log(`- ${STUDY_CONFIG.cities.length} villes`);
    console.log(`- ${STUDY_CONFIG.queries.length} types de recherche`);
    console.log(`- Requêtes: ${STUDY_CONFIG.queries.join(', ')}\n`);

    try {
        const data = await collectData();
        const keyStats = generateReport(data);

        // Sauvegarder les données brutes
        const outputPath = path.join(process.cwd(), 'data', 'gmb-study-cote-azur-2026.json');
        const dataDir = path.dirname(outputPath);

        // Créer le dossier data si nécessaire
        if (!existsSync(dataDir)) {
            const { mkdirSync } = await import('fs');
            mkdirSync(dataDir, { recursive: true });
        }

        writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`\n💾 Données sauvegardées: ${outputPath}`);

        // Sauvegarder les stats clés
        const statsPath = path.join(process.cwd(), 'data', 'gmb-study-key-stats.json');
        writeFileSync(statsPath, JSON.stringify(keyStats, null, 2));
        console.log(`📈 Stats clés: ${statsPath}`);

        console.log('\n✅ Étude terminée avec succès !');

    } catch (error) {
        console.error('\n❌ Erreur lors de l\'étude:', error);
        process.exit(1);
    }
}

main();
