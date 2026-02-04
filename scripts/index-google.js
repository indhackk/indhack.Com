#!/usr/bin/env node
/**
 * Script d'indexation Google - indhack.com
 *
 * Usage:
 *   node scripts/index-google.js                    # Indexe toutes les pages du sitemap
 *   node scripts/index-google.js https://url.com   # Indexe une URL spécifique
 *
 * Prérequis:
 *   1. Fichier credentials JSON dans scripts/google-credentials.json
 *   2. npm install googleapis
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// URLs prioritaires à indexer en premier
const PRIORITY_URLS = [
    'https://indhack.com',
    'https://indhack.com/consultant-seo',
    'https://indhack.com/audit-seo',
    'https://indhack.com/referencement-naturel',
    'https://indhack.com/seo-nice',
    'https://indhack.com/seo-paris',
    'https://indhack.com/creation-site-web',
    'https://indhack.com/consultant-seo-freelance',
];

async function getAuthClient() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error('❌ Fichier credentials manquant !');
        console.log('\n📋 Instructions :');
        console.log('1. Va sur https://console.cloud.google.com');
        console.log('2. Crée un projet et active "Indexing API"');
        console.log('3. Crée un Service Account et télécharge le JSON');
        console.log('4. Renomme-le "google-credentials.json" et place-le dans scripts/');
        console.log('5. Ajoute l\'email du service account comme propriétaire dans Search Console');
        process.exit(1);
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });
    return auth.getClient();
}

async function indexUrl(authClient, url) {
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED',
            },
        });

        console.log(`✅ ${url}`);
        return { url, success: true, data: response.data };
    } catch (error) {
        console.log(`❌ ${url} - ${error.message}`);
        return { url, success: false, error: error.message };
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

async function main() {
    console.log('🚀 Indexation Google - indhack.com\n');

    const authClient = await getAuthClient();
    const specificUrl = process.argv[2];

    let urlsToIndex = [];

    if (specificUrl) {
        // Indexer une URL spécifique
        urlsToIndex = [specificUrl];
    } else {
        // Indexer tout le sitemap
        const sitemapUrls = extractUrlsFromSitemap();

        // Priorité aux URLs importantes
        urlsToIndex = [
            ...PRIORITY_URLS.filter(url => sitemapUrls.includes(url)),
            ...sitemapUrls.filter(url => !PRIORITY_URLS.includes(url))
        ];
    }

    console.log(`📊 ${urlsToIndex.length} URLs à indexer\n`);

    const results = { success: 0, failed: 0 };

    for (const url of urlsToIndex) {
        const result = await indexUrl(authClient, url);
        if (result.success) {
            results.success++;
        } else {
            results.failed++;
        }

        // Pause de 1 seconde entre chaque requête (quota Google)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Succès: ${results.success}`);
    console.log(`❌ Échecs: ${results.failed}`);
    console.log(`📈 Total: ${urlsToIndex.length} URLs`);
    console.log('\n⏱️  Indexation prévue sous 24-48h');
}

main().catch(console.error);
