#!/usr/bin/env npx ts-node
/**
 * Prospection 06 - SEO Local
 *
 * Scrape Google Places API pour trouver les entreprises SANS SITE
 * Génère un fichier HTML avec boutons WhatsApp prêts à cliquer
 *
 * Usage:
 *   npx ts-node scripts/prospect-06-local.ts
 *   npx ts-node scripts/prospect-06-local.ts --category=RESTAURATION
 *   npx ts-node scripts/prospect-06-local.ts --category=ARTISANS --city=Nice
 */

import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION - SEO LOCAL
// ═══════════════════════════════════════════════════════════════════════════

// Requêtes SEO Local : métier + ville, service + ville
const CATEGORIES: Record<string, {
    color: string;
    metierSlug: string;
    queries: string[];
    slugMap: Record<string, string>;
}> = {
    RESTAURATION: {
        color: '#D97706',
        metierSlug: 'restaurant',
        queries: [
            'restaurant',
            'pizzeria',
            'boulangerie',
            'patisserie',
            'traiteur'
        ],
        slugMap: {
            'restaurant': 'restaurant',
            'pizzeria': 'restaurant',
            'boulangerie': 'boulangerie',
            'patisserie': 'boulangerie',
            'traiteur': 'traiteur'
        }
    },
    SANTE: {
        color: '#06B6D4',
        metierSlug: 'dentiste',
        queries: [
            'dentiste',
            'osteopathe',
            'kinesitherapeute',
            'psychologue'
        ],
        slugMap: {
            'dentiste': 'dentiste',
            'osteopathe': 'osteopathe',
            'kinesitherapeute': 'kinesitherapeute',
            'psychologue': 'psychologue'
        }
    },
    ARTISANS: {
        color: '#F59E0B',
        metierSlug: 'plombier',
        queries: [
            'plombier',
            'electricien',
            'serrurier',
            'peintre batiment',
            'carreleur'
        ],
        slugMap: {
            'plombier': 'plombier',
            'electricien': 'electricien',
            'serrurier': 'serrurier',
            'peintre batiment': 'peintre',
            'carreleur': 'carreleur'
        }
    }
}

// Villes du 06 - principales d'abord
const VILLES_06 = [
    'Nice',
    'Cannes',
    'Antibes',
    'Grasse',
    'Menton',
    'Cagnes-sur-Mer',
    'Le Cannet',
    'Saint-Laurent-du-Var'
]

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface Lead {
    name: string
    mobile: string
    city: string
    note: string
    avis: string
    url: string
    category: string
    subcategory: string
}

interface Prospect {
    name: string
    rating: number
    reviewCount: number
    address: string
    phone?: string
    website?: string
    placeId: string
}

// ═══════════════════════════════════════════════════════════════════════════
// API GOOGLE PLACES
// ═══════════════════════════════════════════════════════════════════════════

async function searchPlaces(apiKey: string, query: string, pageToken?: string): Promise<any> {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    const params = new URLSearchParams({
        query,
        key: apiKey,
        language: 'fr',
    })
    if (pageToken) params.append('pagetoken', pageToken)
    const response = await fetch(`${baseUrl}?${params}`)
    return response.json()
}

async function getPlaceDetails(apiKey: string, placeId: string): Promise<any> {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json'
    const params = new URLSearchParams({
        place_id: placeId,
        key: apiKey,
        fields: 'name,rating,user_ratings_total,formatted_address,formatted_phone_number,website',
        language: 'fr',
    })
    const response = await fetch(`${baseUrl}?${params}`)
    const data = await response.json()
    return data.result
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function cleanPhoneForWhatsApp(phone: string): string {
    let cleaned = phone.replace(/\D/g, '')
    if (cleaned.startsWith('0')) {
        cleaned = '33' + cleaned.substring(1)
    }
    if (!cleaned.startsWith('33')) {
        cleaned = '33' + cleaned
    }
    return cleaned
}

function generateDiagnosticUrl(metierSlug: string, name: string, city: string, rating: number, reviews: number): string {
    return `https://indhack.com/diagnostic/${metierSlug}?nom=${encodeURIComponent(name)}&ville=${city}&note=${rating}&avis=${reviews}`
}

function getMetierSlug(categoryId: string, query: string): string {
    const category = CATEGORIES[categoryId]
    if (!category) return 'restaurant'
    return category.slugMap[query] || category.metierSlug
}

// ═══════════════════════════════════════════════════════════════════════════
// SCRAPER PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

async function scrapeCategory(
    apiKey: string,
    categoryId: string,
    cities: string[]
): Promise<Lead[]> {
    const category = CATEGORIES[categoryId as keyof typeof CATEGORIES]
    const leads: Lead[] = []
    const seenPlaceIds = new Set<string>()

    console.log(`\n📁 Catégorie: ${categoryId}`)
    console.log(`   Requêtes: ${category.queries.join(', ')}`)
    console.log(`   Villes: ${cities.join(', ')}`)

    for (const query of category.queries) {
        for (const city of cities) {
            const searchQuery = `${query} ${city} 06`
            console.log(`\n   🔍 "${searchQuery}"`)

            try {
                // Recherche
                const results = await searchPlaces(apiKey, searchQuery)
                if (results.status !== 'OK' && results.status !== 'ZERO_RESULTS') {
                    console.log(`      ❌ Erreur: ${results.status}`)
                    continue
                }

                const places = results.results || []
                console.log(`      📊 ${places.length} résultats`)

                // Détails pour chaque place
                for (const place of places) {
                    if (seenPlaceIds.has(place.place_id)) continue
                    seenPlaceIds.add(place.place_id)

                    await sleep(100) // Rate limiting

                    try {
                        const details = await getPlaceDetails(apiKey, place.place_id)
                        if (!details) continue

                        // Filtrer : pas de site ET a un téléphone ET a des avis
                        const hasWebsite = !!details.website
                        const hasPhone = !!details.formatted_phone_number
                        const hasReviews = (details.user_ratings_total || 0) > 0
                        const rating = details.rating || 0

                        if (!hasWebsite && hasPhone && hasReviews && rating >= 4.0) {
                            const metierSlug = getMetierSlug(categoryId, query)

                            const lead: Lead = {
                                name: details.name,
                                mobile: cleanPhoneForWhatsApp(details.formatted_phone_number),
                                city: city,
                                note: rating.toFixed(1),
                                avis: (details.user_ratings_total || 0).toString(),
                                url: generateDiagnosticUrl(
                                    metierSlug,
                                    details.name,
                                    city,
                                    rating,
                                    details.user_ratings_total || 0
                                ),
                                category: categoryId,
                                subcategory: query
                            }

                            leads.push(lead)
                            console.log(`      ✅ ${lead.name} - ${lead.note}★ (${lead.avis} avis) 📞`)
                        }
                    } catch (e) {
                        // Ignore
                    }
                }

                await sleep(500) // Pause entre les recherches

            } catch (e) {
                console.log(`      ❌ Erreur: ${e}`)
            }
        }
    }

    // Trier par nombre d'avis (les plus populaires en premier)
    leads.sort((a, b) => parseInt(b.avis) - parseInt(a.avis))

    return leads
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATION HTML
// ═══════════════════════════════════════════════════════════════════════════

function generateWhatsAppHTML(leads: Lead[], categoryId: string): string {
    const category = CATEGORIES[categoryId as keyof typeof CATEGORIES]
    const color = category?.color || '#25D366'

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prospection ${categoryId} - ${leads.length} leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${color};
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-dim: #94a3b8;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
        }
        .container { width: 100%; max-width: 800px; }
        header { text-align: center; margin-bottom: 3rem; }
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--primary) 0%, #34d399 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .stats {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: var(--card-bg);
            padding: 1rem 2rem;
            border-radius: 1rem;
            border: 1px solid #334155;
            text-align: center;
        }
        .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
        .stat-label { color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; }
        .lead-card {
            background: var(--card-bg);
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid #334155;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        .lead-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--primary);
        }
        .lead-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
        }
        .lead-name { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .lead-info { color: var(--text-dim); font-size: 1rem; margin-bottom: 0.5rem; }
        .badge {
            background: ${color}22;
            color: var(--primary);
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .message-box {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            font-size: 0.95rem;
            line-height: 1.6;
            white-space: pre-wrap;
            color: #cbd5e1;
        }
        .actions { display: flex; gap: 1rem; }
        button {
            flex: 1;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
        }
        .btn-primary {
            background: #25D366;
            color: white;
        }
        .btn-primary:hover {
            background: #22c55e;
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(37, 211, 102, 0.3);
        }
        .btn-secondary { background: #334155; color: white; }
        .btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #334155;
            border-radius: 4px;
            margin-top: 2rem;
            overflow: hidden;
        }
        .progress-inner {
            height: 100%;
            background: var(--primary);
            width: 0%;
            transition: width 0.5s ease;
        }
        .hidden { display: none; }
        .finished { text-align: center; padding: 3rem; }
        .subcategory-tag {
            background: #334155;
            color: var(--text-dim);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Prospection ${categoryId} 🚀</h1>
            <p style="color: var(--text-dim)">Entreprises SANS SITE - Cliquez pour envoyer sur WhatsApp</p>
        </header>

        <div class="stats">
            <div class="stat-card">
                <span class="stat-value" id="count-total">${leads.length}</span>
                <span class="stat-label">Total Leads</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="count-sent">0</span>
                <span class="stat-label">Envoyés</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="count-remaining">${leads.length}</span>
                <span class="stat-label">Restants</span>
            </div>
        </div>

        <div id="prospect-card" class="lead-card">
            <div class="lead-header">
                <div>
                    <h2 class="lead-name" id="lead-name">Chargement...</h2>
                    <div class="lead-info" id="lead-city">Ville</div>
                </div>
                <div>
                    <div class="badge" id="lead-note">5.0★</div>
                    <span class="subcategory-tag" id="lead-subcategory">métier</span>
                </div>
            </div>

            <div class="message-box" id="lead-message">Message...</div>

            <div class="actions">
                <button class="btn-secondary" onclick="prevLead()" id="btn-prev" disabled>← Précédent</button>
                <button class="btn-primary" onclick="sendLead()" id="btn-send">📱 ENVOYER WHATSAPP</button>
                <button class="btn-secondary" onclick="nextLead()" id="btn-next">Suivant →</button>
            </div>

            <div class="progress-bar">
                <div class="progress-inner" id="progress-bar"></div>
            </div>
        </div>

        <div id="finished-card" class="lead-card hidden finished">
            <h2>🎉 Terminé !</h2>
            <p>Tu as parcouru tous les prospects.</p>
            <button class="btn-primary" onclick="reset()">Recommencer</button>
        </div>
    </div>

    <script>
        const leads = ${JSON.stringify(leads, null, 2)};

        let currentIndex = 0;
        const sentList = new Set();

        function getMessage(lead) {
            return \`Bonjour ! 👋

Je me permets de vous contacter car je suis tombée sur votre fiche Google et j'ai remarqué que vous aviez d'excellents avis (\${lead.note}★ avec \${lead.avis} avis) !

Je travaille avec des \${lead.subcategory}s dans le 06 et j'ai fait un rapide audit personnalisé pour \${lead.name}.

L'idée n'est pas de vous déranger - c'est un diagnostic gratuit qui montre comment vous pourriez capter plus de clients à \${lead.city} grâce à votre réputation.

Votre audit gratuit est ici :
\${lead.url}

Bonne journée !
Indiana - IndHack
📞 06 61 13 97 48\`;
        }

        function updateUI() {
            if (currentIndex >= leads.length) {
                document.getElementById('prospect-card').classList.add('hidden');
                document.getElementById('finished-card').classList.remove('hidden');
                return;
            }

            const lead = leads[currentIndex];
            document.getElementById('lead-name').textContent = lead.name;
            document.getElementById('lead-city').textContent = lead.city + ' • ' + lead.mobile.replace(/^33/, '0').replace(/(\\d{2})(?=\\d)/g, '$1 ');
            document.getElementById('lead-note').textContent = lead.note + '★ (' + lead.avis + ' avis)';
            document.getElementById('lead-subcategory').textContent = lead.subcategory;
            document.getElementById('lead-message').textContent = getMessage(lead);

            document.getElementById('count-sent').textContent = sentList.size;
            document.getElementById('count-remaining').textContent = leads.length - currentIndex;

            const progress = (currentIndex / leads.length) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';

            document.getElementById('btn-prev').disabled = currentIndex === 0;
        }

        function sendLead() {
            const lead = leads[currentIndex];
            const msg = getMessage(lead);
            const url = \`https://wa.me/\${lead.mobile}?text=\${encodeURIComponent(msg)}\`;

            window.open(url, '_blank');
            sentList.add(currentIndex);

            setTimeout(() => nextLead(), 1000);
        }

        function nextLead() {
            if (currentIndex < leads.length) {
                currentIndex++;
                updateUI();
            }
        }

        function prevLead() {
            if (currentIndex > 0) {
                currentIndex--;
                updateUI();
            }
        }

        function reset() {
            currentIndex = 0;
            sentList.clear();
            document.getElementById('prospect-card').classList.remove('hidden');
            document.getElementById('finished-card').classList.add('hidden');
            updateUI();
        }

        updateUI();
    </script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

function parseArgs(): { category?: string; city?: string } {
    const args = process.argv.slice(2)
    const result: { category?: string; city?: string } = {}

    for (const arg of args) {
        if (arg.startsWith('--category=')) {
            result.category = arg.split('=')[1].toUpperCase()
        } else if (arg.startsWith('--city=')) {
            result.city = arg.split('=')[1]
        }
    }

    return result
}

async function main() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!apiKey) {
        console.error('❌ GOOGLE_PLACES_API_KEY non définie dans .env.local')
        process.exit(1)
    }

    const args = parseArgs()

    console.log('')
    console.log('═══════════════════════════════════════════════════════════')
    console.log('   PROSPECTION 06 - SEO LOCAL')
    console.log('   Entreprises SANS SITE avec téléphone')
    console.log('═══════════════════════════════════════════════════════════')

    const categories = args.category ? [args.category] : Object.keys(CATEGORIES)
    const cities = args.city ? [args.city] : VILLES_06

    const allLeads: Lead[] = []

    for (const categoryId of categories) {
        if (!CATEGORIES[categoryId as keyof typeof CATEGORIES]) {
            console.log(`\n❌ Catégorie inconnue: ${categoryId}`)
            continue
        }

        const leads = await scrapeCategory(apiKey, categoryId, cities)
        allLeads.push(...leads)

        // Générer HTML par catégorie
        if (leads.length > 0) {
            const outputDir = path.join(process.cwd(), 'scripts', 'output')
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

            const date = new Date().toISOString().split('T')[0]
            const filename = `prospect-${categoryId.toLowerCase()}-${date}.html`
            const filepath = path.join(outputDir, filename)

            fs.writeFileSync(filepath, generateWhatsAppHTML(leads, categoryId))
            console.log(`\n💾 Généré: scripts/output/${filename} (${leads.length} leads)`)
        }
    }

    // Stats finales
    console.log('')
    console.log('═══════════════════════════════════════════════════════════')
    console.log('   RÉSULTATS')
    console.log('═══════════════════════════════════════════════════════════')
    console.log(`\n🎯 Total: ${allLeads.length} leads SANS SITE avec téléphone`)

    // Par catégorie
    const byCategory: Record<string, number> = {}
    for (const lead of allLeads) {
        byCategory[lead.category] = (byCategory[lead.category] || 0) + 1
    }
    for (const [cat, count] of Object.entries(byCategory)) {
        console.log(`   ${cat}: ${count} leads`)
    }

    // Par ville
    const byCity: Record<string, number> = {}
    for (const lead of allLeads) {
        byCity[lead.city] = (byCity[lead.city] || 0) + 1
    }
    console.log('\n📍 Par ville:')
    for (const [city, count] of Object.entries(byCity).sort((a, b) => b[1] - a[1])) {
        console.log(`   ${city}: ${count}`)
    }

    // Générer HTML global si plusieurs catégories
    if (categories.length > 1 && allLeads.length > 0) {
        const outputDir = path.join(process.cwd(), 'scripts', 'output')
        const date = new Date().toISOString().split('T')[0]
        const filename = `prospect-06-all-${date}.html`
        const filepath = path.join(outputDir, filename)

        fs.writeFileSync(filepath, generateWhatsAppHTML(allLeads, 'ALL'))
        console.log(`\n📁 Fichier global: scripts/output/${filename}`)
    }

    console.log('\n✅ Ouvre le fichier HTML et clique sur "ENVOYER WHATSAPP" pour chaque lead !')
}

main().catch(console.error)
