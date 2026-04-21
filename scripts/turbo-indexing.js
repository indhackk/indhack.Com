#!/usr/bin/env node
/**
 * TURBO INDEXING - indhack.com
 *
 * Techniques multiples pour forcer l'indexation :
 * 1. IndexNow (Bing/Yandex - instantané)
 * 2. Google Ping (sitemap)
 * 3. Bing Webmaster API
 *
 * Usage:
 *   node scripts/turbo-indexing.js              # Soumet toutes les URLs non-indexées
 *   node scripts/turbo-indexing.js --all        # Soumet tout
 *   node scripts/turbo-indexing.js --url URL    # Soumet une URL spécifique
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const SITE_URL = 'https://indhack.com';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const INDEXNOW_KEY_PATH = path.join(__dirname, '../public');

// Générer une clé IndexNow si elle n'existe pas
function getOrCreateIndexNowKey() {
    const keyFile = path.join(INDEXNOW_KEY_PATH, 'indexnow-key.txt');

    if (fs.existsSync(keyFile)) {
        return fs.readFileSync(keyFile, 'utf8').trim();
    }

    // Générer une clé aléatoire (format: 32 caractères hex)
    const key = crypto.randomBytes(16).toString('hex');
    fs.writeFileSync(keyFile, key);

    // Créer aussi le fichier de vérification
    fs.writeFileSync(path.join(INDEXNOW_KEY_PATH, `${key}.txt`), key);

    console.log(`🔑 Clé IndexNow générée: ${key}`);
    console.log(`   Fichiers créés dans /public/`);

    return key;
}

// Extraire les URLs du sitemap
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

// Faire une requête HTTP/HTTPS
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;

        const reqOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: options.headers || {},
            timeout: 10000
        };

        const req = client.request(reqOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout'));
        });

        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

// 1. IndexNow - Bing/Yandex (instantané)
// Note: Microsoft confirme que soumettre à UN SEUL endpoint IndexNow suffit,
// la redistribution vers tous les participants est automatique.
async function submitToIndexNow(urls, key) {
    console.log('\n📡 INDEXNOW (Bing/Yandex)');
    console.log('   Notification instantanée aux moteurs de recherche\n');

    const endpoints = [
        { name: 'Bing', url: 'https://www.bing.com/indexnow' },
        { name: 'Yandex', url: 'https://yandex.com/indexnow' },
        // IndexNow.org redistribue — pas besoin d'appeler d'autres endpoints
    ];

    const payload = JSON.stringify({
        host: 'indhack.com',
        key: key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: urls.slice(0, 10000) // Max 10000 URLs par requête
    });

    for (const endpoint of endpoints) {
        try {
            const response = await makeRequest(endpoint.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload)
                },
                body: payload
            });

            if (response.status === 200 || response.status === 202) {
                console.log(`   ✅ ${endpoint.name}: ${urls.length} URLs soumises`);
            } else if (response.status === 422) {
                console.log(`   ⚠️  ${endpoint.name}: Clé non vérifiée (déploie d'abord)`);
            } else {
                console.log(`   ❌ ${endpoint.name}: Erreur ${response.status}`);
            }
        } catch (error) {
            console.log(`   ❌ ${endpoint.name}: ${error.message}`);
        }
    }
}

// ⚠️ Endpoints Google Ping (déprécié juin 2023, retourne 404) et
//    Bing Ping (déprécié mai 2022, retourne 410) ont été supprimés.
//    Google et Bing recommandent IndexNow + sitemap dans robots.txt.

// 2. Générer les liens pour partage social (aide au crawl)
function generateSocialLinks(urls) {
    console.log('\n📱 LIENS POUR PARTAGE SOCIAL');
    console.log('   Partager sur les réseaux aide le crawler à découvrir les pages\n');

    const priorityUrls = urls.slice(0, 5);

    priorityUrls.forEach(url => {
        const encoded = encodeURIComponent(url);
        console.log(`   ${url}`);
        console.log(`   → Twitter: https://twitter.com/intent/tweet?url=${encoded}`);
        console.log(`   → LinkedIn: https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`);
        console.log('');
    });
}

// 5. Générer le code pour Web 2.0 stacking
function generateWeb20Instructions(urls) {
    console.log('\n📝 WEB 2.0 STACKING (technique pro)');
    console.log('   Créer une page sur Blogger/Medium avec ces liens, puis soumettre via Search Console\n');

    const linksHtml = urls.slice(0, 20).map(url => {
        const title = url.replace('https://indhack.com/', '').replace(/-/g, ' ').replace(/\//g, ' - ') || 'Accueil';
        return `<p><a href="${url}" target="_blank">${title}</a></p>`;
    }).join('\n');

    console.log('   --- Copie ce HTML sur Blogger.com ---');
    console.log('');
    console.log(linksHtml);
    console.log('');
    console.log('   --- Ensuite ---');
    console.log('   1. Crée un blog sur blogger.com');
    console.log('   2. Colle ce HTML dans un article');
    console.log('   3. Ajoute le blog dans Search Console');
    console.log('   4. Soumets le sitemap du blog');
    console.log('   5. Google crawle le blog → découvre tes liens → indexe tes pages');
}

async function main() {
    const args = process.argv.slice(2);
    const submitAll = args.includes('--all');
    const specificUrlIndex = args.indexOf('--url');
    const specificUrl = specificUrlIndex !== -1 ? args[specificUrlIndex + 1] : null;
    const showWeb20 = args.includes('--web20');

    console.log('🚀 TURBO INDEXING - indhack.com');
    console.log('   Méthodes multiples pour forcer l\'indexation\n');
    console.log('='.repeat(60));

    // Récupérer ou créer la clé IndexNow
    const indexNowKey = getOrCreateIndexNowKey();

    // Récupérer les URLs
    let urls = extractUrlsFromSitemap();

    if (specificUrl) {
        urls = [specificUrl];
    } else if (!submitAll) {
        // Par défaut, on prend les 50 plus importantes
        urls = urls.slice(0, 50);
    }

    console.log(`\n📊 ${urls.length} URLs à soumettre`);

    // Exécuter toutes les techniques actives (Google/Bing ping supprimés — dépréciés)
    await submitToIndexNow(urls, indexNowKey);

    if (showWeb20) {
        generateWeb20Instructions(urls);
    }

    generateSocialLinks(urls);

    console.log('\n' + '='.repeat(60));
    console.log('✅ TURBO INDEXING TERMINÉ\n');
    console.log('📋 Prochaines étapes:');
    console.log('   1. Déploie le site (pour que les fichiers IndexNow soient accessibles)');
    console.log('   2. Partage 2-3 liens sur Twitter/LinkedIn');
    console.log('   3. Dans Search Console: Inspecter URL → Demander indexation');
    console.log('   4. Attends 24-48h pour Bing, 1-7 jours pour Google');
    console.log('\n💡 Relance ce script après chaque déploiement !');
}

main().catch(console.error);
