#!/usr/bin/env node
/**
 * Analyse des failles GMB des restaurants du Top Google
 */

import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('./data/gmb-study-cote-azur-2026.json', 'utf8'));

let allRestaurants = [];
for (const cityName of Object.keys(data.citiesData)) {
    const cityData = data.citiesData[cityName];
    if (cityData.restaurants) {
        allRestaurants = allRestaurants.concat(cityData.restaurants);
    }
}

console.log('=== ANALYSE DES', allRestaurants.length, 'RESTAURANTS DU TOP GOOGLE ===\n');

// 1. Analyser les types de websites
const withWebsite = allRestaurants.filter(r => r.website);
const noWebsite = allRestaurants.filter(r => !r.website);

const facebookSites = withWebsite.filter(r => r.website.includes('facebook.com'));
const instagramSites = withWebsite.filter(r => r.website.includes('instagram.com'));
const ubereats = withWebsite.filter(r =>
    r.website.includes('ubereats') ||
    r.website.includes('deliveroo') ||
    r.website.includes('just-eat')
);
const tripAdvisor = withWebsite.filter(r => r.website.includes('tripadvisor'));

const realSites = withWebsite.filter(r => {
    const url = r.website.toLowerCase();
    return !url.includes('facebook.com') &&
           !url.includes('instagram.com') &&
           !url.includes('ubereats') &&
           !url.includes('deliveroo') &&
           !url.includes('just-eat') &&
           !url.includes('tripadvisor');
});

console.log('📊 ANALYSE DES SITES WEB');
console.log('='.repeat(50));
console.log('Total restaurants:', allRestaurants.length);
console.log('');
console.log('Avec un lien "website":', withWebsite.length, '(' + ((withWebsite.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('SANS aucun lien:', noWebsite.length, '(' + ((noWebsite.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('');
console.log('Parmi ceux avec "website":');
console.log('  - Lien Facebook:', facebookSites.length);
console.log('  - Lien Instagram:', instagramSites.length);
console.log('  - Lien plateformes (UberEats, Deliveroo...):', ubereats.length);
console.log('  - Lien TripAdvisor:', tripAdvisor.length);
console.log('  - VRAI site web propre:', realSites.length, '(' + ((realSites.length/allRestaurants.length)*100).toFixed(1) + '% du total)');
console.log('');

// Stats finales website
const noRealWebsite = allRestaurants.length - realSites.length;
const pctNoRealWebsite = ((noRealWebsite/allRestaurants.length)*100).toFixed(1);
console.log('🚨 STAT CLEF 1: SANS VRAI SITE WEB');
console.log('   (Pas de site OU juste FB/Insta/plateformes)');
console.log('   Nombre:', noRealWebsite, '/', allRestaurants.length);
console.log('   Pourcentage:', pctNoRealWebsite + '%');
console.log('');

// 2. Notes élevées mais peu d'avis (suspicion de faux avis)
console.log('📊 ANALYSE DES AVIS SUSPECTS');
console.log('='.repeat(50));

// Note >= 4.5 mais < 5 avis
const veryFewReviews = allRestaurants.filter(r =>
    r.rating >= 4.5 && r.reviews < 5 && r.rating
);
const pctVeryFew = ((veryFewReviews.length/allRestaurants.length)*100).toFixed(1);

// Note >= 4.5 mais < 10 avis
const fewReviews = allRestaurants.filter(r =>
    r.rating >= 4.5 && r.reviews < 10 && r.rating
);
const pctFew = ((fewReviews.length/allRestaurants.length)*100).toFixed(1);

// Note >= 4.8 mais < 20 avis (très suspect)
const suspicious = allRestaurants.filter(r =>
    r.rating >= 4.8 && r.reviews < 20 && r.rating
);
const pctSuspicious = ((suspicious.length/allRestaurants.length)*100).toFixed(1);

console.log('🚨 STAT CLEF 2: PROFILS SUSPECTS (note trop belle)');
console.log('');
console.log('>=4.5★ avec <5 avis:', veryFewReviews.length, '(' + pctVeryFew + '%)');
console.log('>=4.5★ avec <10 avis:', fewReviews.length, '(' + pctFew + '%)');
console.log('>=4.8★ avec <20 avis:', suspicious.length, '(' + pctSuspicious + '%)');
console.log('');
console.log('Exemples de profils suspects (>=4.8★, <20 avis):');
suspicious.slice(0, 10).forEach(r => {
    console.log('  -', r.name, '(' + r.city + '):', r.rating + '★,', r.reviews, 'avis');
});
console.log('');

// 3. Faible engagement (peu d'avis malgré visibilité)
console.log('📊 ANALYSE DE L\'ENGAGEMENT');
console.log('='.repeat(50));

const under50 = allRestaurants.filter(r => r.reviews < 50);
const under100 = allRestaurants.filter(r => r.reviews < 100);
const under20 = allRestaurants.filter(r => r.reviews < 20);

console.log('🚨 STAT CLEF 3: FAIBLE ENGAGEMENT (malgré visibilité Top Google)');
console.log('');
console.log('Moins de 20 avis:', under20.length, '(' + ((under20.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('Moins de 50 avis:', under50.length, '(' + ((under50.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('Moins de 100 avis:', under100.length, '(' + ((under100.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('');

// 4. Note basse malgré visibilité
console.log('📊 ANALYSE DES NOTES BASSES');
console.log('='.repeat(50));

const under4 = allRestaurants.filter(r => r.rating && r.rating < 4);
const under4_3 = allRestaurants.filter(r => r.rating && r.rating < 4.3);

console.log('Restaurants avec note < 4★:', under4.length, '(' + ((under4.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('Restaurants avec note < 4.3★:', under4_3.length, '(' + ((under4_3.length/allRestaurants.length)*100).toFixed(1) + '%)');
console.log('');
console.log('Exemples de restos mal notés mais visibles:');
under4.slice(0, 5).forEach(r => {
    console.log('  -', r.name, '(' + r.city + '):', r.rating + '★,', r.reviews, 'avis');
});
console.log('');

// 5. Résumé par ville
console.log('📊 DÉTAIL PAR VILLE');
console.log('='.repeat(50));

for (const cityName of Object.keys(data.citiesData)) {
    const cityData = data.citiesData[cityName];
    const restos = cityData.restaurants || [];
    if (restos.length > 0) {
        const noWeb = restos.filter(r => !r.website).length;
        const fakeWeb = restos.filter(r => {
            if (!r.website) return true;
            const url = r.website.toLowerCase();
            return url.includes('facebook.com') || url.includes('instagram.com');
        }).length;
        const suspectCity = restos.filter(r => r.rating >= 4.8 && r.reviews < 20).length;

        console.log(cityName + ' (' + restos.length + ' restos):');
        console.log('   Sans site: ' + noWeb + ' (' + ((noWeb/restos.length)*100).toFixed(0) + '%)');
        console.log('   Site = réseaux sociaux: ' + (fakeWeb - noWeb));
        console.log('   Profils suspects (>=4.8★ <20 avis): ' + suspectCity);
        console.log('');
    }
}

// 6. JSON pour la page
console.log('='.repeat(50));
console.log('📋 DONNÉES POUR LA PAGE (copier/coller):');
console.log('='.repeat(50));

const keyStats = {
    totalAnalyzed: allRestaurants.length,
    noRealWebsite: {
        count: noRealWebsite,
        pct: pctNoRealWebsite
    },
    noWebsiteAtAll: {
        count: noWebsite.length,
        pct: ((noWebsite.length/allRestaurants.length)*100).toFixed(1)
    },
    suspiciousProfiles: {
        count: suspicious.length,
        pct: pctSuspicious,
        criteria: ">=4.8★ avec <20 avis"
    },
    lowEngagement: {
        under50: {
            count: under50.length,
            pct: ((under50.length/allRestaurants.length)*100).toFixed(1)
        }
    }
};

console.log(JSON.stringify(keyStats, null, 2));
