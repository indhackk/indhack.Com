#!/usr/bin/env node
/**
 * Smart Google Indexing - indhack.com
 *
 * Indexe intelligemment sans gaspiller le quota (200/jour)
 *
 * Usage:
 *   node scripts/smart-indexing.js                    # Indexe les pages non-indexées
 *   node scripts/smart-indexing.js --force            # Force ré-indexation de tout
 *   node scripts/smart-indexing.js --url URL          # Indexe une URL spécifique
 *   node scripts/smart-indexing.js --status           # Affiche le statut
 *   node scripts/smart-indexing.js --priority         # Indexe seulement les pages prioritaires
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const HISTORY_PATH = path.join(__dirname, 'indexing-history.json');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// Quota Google : 200 requêtes/jour - on garde une marge
const DAILY_LIMIT = 180;

// URLs prioritaires (pages les plus importantes)
const PRIORITY_URLS = [
    'https://indhack.com',
    'https://indhack.com/consultant-seo',
    'https://indhack.com/audit-seo',
    'https://indhack.com/referencement-naturel',
    'https://indhack.com/seo-local',
    'https://indhack.com/creation-site-web',
    'https://indhack.com/seo-nice',
    'https://indhack.com/seo-paris',
    'https://indhack.com/seo-marseille',
    'https://indhack.com/seo-lyon',
    'https://indhack.com/blog',
];

// Charger l'historique d'indexation
function loadHistory() {
    if (fs.existsSync(HISTORY_PATH)) {
        return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
    }
    return { indexed: {}, dailyCount: 0, lastReset: new Date().toDateString() };
}

// Sauvegarder l'historique
function saveHistory(history) {
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

// Reset le compteur quotidien si nouveau jour
function checkDailyReset(history) {
    const today = new Date().toDateString();
    if (history.lastReset !== today) {
        history.dailyCount = 0;
        history.lastReset = today;
        console.log('🔄 Nouveau jour - quota reset\n');
    }
    return history;
}

async function getAuthClient() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error('❌ Fichier google-credentials.json manquant !');
        console.log('\n📋 Instructions :');
        console.log('1. Va sur https://console.cloud.google.com');
        console.log('2. Active "Indexing API" dans ton projet');
        console.log('3. Crée un Service Account');
        console.log('4. Télécharge le JSON et place-le dans scripts/google-credentials.json');
        console.log('5. IMPORTANT: Ajoute l\'email du service account comme PROPRIÉTAIRE dans Search Console');
        console.log('\n   Email à ajouter: id-indexing-bot@indhack-indexing-486422.iam.gserviceaccount.com');
        process.exit(1);
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });
    return auth.getClient();
}

async function indexUrl(authClient, url, history) {
    // Vérifier quota
    if (history.dailyCount >= DAILY_LIMIT) {
        console.log(`⚠️  Quota atteint (${DAILY_LIMIT}/jour). Réessaie demain.`);
        return { success: false, quotaExceeded: true };
    }

    const indexing = google.indexing({ version: 'v3', auth: authClient });

    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED',
            },
        });

        history.dailyCount++;
        history.indexed[url] = {
            lastIndexed: new Date().toISOString(),
            success: true
        };

        console.log(`✅ ${url}`);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMsg = error.message || 'Unknown error';

        // Gérer les erreurs spécifiques
        if (errorMsg.includes('Quota exceeded')) {
            console.log(`⚠️  Quota Google dépassé. Réessaie demain.`);
            return { success: false, quotaExceeded: true };
        }

        if (errorMsg.includes('Permission denied') || errorMsg.includes('403')) {
            console.log(`❌ ${url}`);
            console.log(`   → Permission refusée. Vérifie que le service account est PROPRIÉTAIRE dans Search Console.`);
            return { success: false, permissionDenied: true };
        }

        console.log(`❌ ${url} - ${errorMsg}`);
        history.indexed[url] = {
            lastIndexed: new Date().toISOString(),
            success: false,
            error: errorMsg
        };
        return { success: false, error: errorMsg };
    }
}

function extractUrlsFromSitemap() {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error('❌ Sitemap non trouvé. Lance "npm run build" d\'abord.');
        process.exit(1);
    }

    const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;

    while ((match = regex.exec(sitemap)) !== null) {
        urls.push(match[1]);
    }

    return urls;
}

function getUrlsToIndex(allUrls, history, forceAll = false, priorityOnly = false) {
    if (forceAll) {
        return priorityOnly ? PRIORITY_URLS : allUrls;
    }

    if (priorityOnly) {
        // Retourne les URLs prioritaires non indexées ou indexées il y a plus de 7 jours
        return PRIORITY_URLS.filter(url => {
            const record = history.indexed[url];
            if (!record) return true;
            if (!record.success) return true;

            const daysSinceIndexed = (Date.now() - new Date(record.lastIndexed).getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceIndexed > 7;
        });
    }

    // Retourne les URLs jamais indexées ou en échec
    return allUrls.filter(url => {
        const record = history.indexed[url];
        if (!record) return true;
        if (!record.success) return true;
        return false;
    });
}

function showStatus(history, allUrls) {
    console.log('📊 STATUT INDEXATION\n');
    console.log(`📅 Aujourd'hui: ${history.dailyCount}/${DAILY_LIMIT} requêtes utilisées`);
    console.log(`📄 Total pages dans sitemap: ${allUrls.length}`);

    const indexed = Object.entries(history.indexed).filter(([_, v]) => v.success).length;
    const failed = Object.entries(history.indexed).filter(([_, v]) => !v.success).length;
    const notIndexed = allUrls.length - indexed - failed;

    console.log(`\n✅ Indexées avec succès: ${indexed}`);
    console.log(`❌ En échec: ${failed}`);
    console.log(`⏳ Jamais demandées: ${notIndexed}`);

    if (failed > 0) {
        console.log('\n❌ Pages en échec:');
        Object.entries(history.indexed)
            .filter(([_, v]) => !v.success)
            .forEach(([url, v]) => {
                console.log(`   ${url}`);
                if (v.error) console.log(`      → ${v.error}`);
            });
    }

    console.log('\n💡 Commandes:');
    console.log('   node scripts/smart-indexing.js           # Indexer les nouvelles pages');
    console.log('   node scripts/smart-indexing.js --priority # Indexer pages prioritaires');
    console.log('   node scripts/smart-indexing.js --force    # Tout ré-indexer');
    console.log('   node scripts/smart-indexing.js --url URL  # Indexer une URL');
}

async function main() {
    const args = process.argv.slice(2);
    const forceAll = args.includes('--force');
    const priorityOnly = args.includes('--priority');
    const showStatusOnly = args.includes('--status');
    const specificUrlIndex = args.indexOf('--url');
    const specificUrl = specificUrlIndex !== -1 ? args[specificUrlIndex + 1] : null;

    console.log('🚀 Smart Indexing - indhack.com\n');

    let history = loadHistory();
    history = checkDailyReset(history);

    const allUrls = extractUrlsFromSitemap();

    if (showStatusOnly) {
        showStatus(history, allUrls);
        return;
    }

    const authClient = await getAuthClient();

    let urlsToIndex = [];

    if (specificUrl) {
        urlsToIndex = [specificUrl];
        console.log(`🎯 Indexation d'une URL spécifique\n`);
    } else {
        urlsToIndex = getUrlsToIndex(allUrls, history, forceAll, priorityOnly);

        if (urlsToIndex.length === 0) {
            console.log('✨ Toutes les pages sont déjà indexées !');
            console.log(`\n💡 Utilise --force pour ré-indexer ou --status pour voir le détail.`);
            return;
        }

        console.log(`📊 ${urlsToIndex.length} pages à indexer`);
        console.log(`📅 Quota restant: ${DAILY_LIMIT - history.dailyCount} requêtes\n`);

        // Limiter au quota restant
        const remaining = DAILY_LIMIT - history.dailyCount;
        if (urlsToIndex.length > remaining) {
            console.log(`⚠️  Limitation à ${remaining} pages (quota)\n`);
            urlsToIndex = urlsToIndex.slice(0, remaining);
        }
    }

    let results = { success: 0, failed: 0 };

    for (const url of urlsToIndex) {
        const result = await indexUrl(authClient, url, history);

        if (result.quotaExceeded || result.permissionDenied) {
            break; // Arrêter si quota dépassé ou permission refusée
        }

        if (result.success) {
            results.success++;
        } else {
            results.failed++;
        }

        // Sauvegarder après chaque requête
        saveHistory(history);

        // Pause de 500ms entre les requêtes
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Succès: ${results.success}`);
    console.log(`❌ Échecs: ${results.failed}`);
    console.log(`📅 Quota utilisé aujourd'hui: ${history.dailyCount}/${DAILY_LIMIT}`);

    if (results.success > 0) {
        console.log('\n⏱️  Google indexe généralement sous 24-48h');
    }

    saveHistory(history);
}

main().catch(console.error);
