/**
 * Scraper Google Maps - GRATUIT avec Puppeteer
 * Trouve les entreprises sans site web dans le 06
 *
 * Usage: npx ts-node scripts/prospection-06/scraper-gmaps.ts [options]
 *
 * Options:
 *   --category=RESTAURATION    Catégorie à scraper (RESTAURATION, SANTE, ARTISANS)
 *   --subcategory=pizzeria     Sous-catégorie spécifique (optionnel)
 *   --city=Nice                Ville spécifique (optionnel, défaut: toutes)
 *   --limit=50                 Limite de résultats par recherche (défaut: 30)
 *   --headless=false           Mode visible pour debug (défaut: true)
 *   --test                     Mode test (1 recherche seulement)
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Ajouter le plugin stealth
puppeteer.use(StealthPlugin());

// Types
interface ScrapedBusiness {
    id: string;
    name: string;
    rating: number | null;
    reviewCount: number | null;
    address: string | null;
    phone: string | null;
    hasWebsite: boolean;
    websiteUrl: string | null;
    placeId: string | null;
    category: string | null;
    searchQuery: string;
    city: string;
    scrapedAt: string;
}

interface ScraperConfig {
    headless: boolean;
    maxResultsPerSearch: number;
    scrollDelay: number;
    betweenSearchDelay: number;
    testMode: boolean;
}

// Import des données de catégories
// Note: En mode script, on définit les données directement
const CATEGORIES_DATA = {
    RESTAURATION: {
        subcategories: [
            { slug: 'restaurant', searchQueries: ['restaurant', 'brasserie'] },
            { slug: 'pizzeria', searchQueries: ['pizzeria', 'pizza'] },
            { slug: 'boulangerie', searchQueries: ['boulangerie', 'boulanger'] },
            { slug: 'patisserie', searchQueries: ['patisserie', 'patissier'] },
            { slug: 'traiteur', searchQueries: ['traiteur', 'buffet'] },
        ]
    },
    SANTE: {
        subcategories: [
            { slug: 'dentiste', searchQueries: ['dentiste', 'cabinet dentaire'] },
            { slug: 'osteopathe', searchQueries: ['osteopathe', 'osteopathie'] },
            { slug: 'kinesitherapeute', searchQueries: ['kine', 'kinesitherapeute'] },
            { slug: 'psychologue', searchQueries: ['psychologue', 'psy'] },
        ]
    },
    ARTISANS: {
        subcategories: [
            { slug: 'plombier', searchQueries: ['plombier', 'plomberie'] },
            { slug: 'electricien', searchQueries: ['electricien', 'electricite'] },
            { slug: 'serrurier', searchQueries: ['serrurier', 'serrurerie'] },
            { slug: 'peintre', searchQueries: ['peintre batiment', 'entreprise peinture'] },
            { slug: 'carreleur', searchQueries: ['carreleur', 'pose carrelage'] },
        ]
    }
};

const CITIES_06 = [
    'Nice', 'Cannes', 'Antibes', 'Grasse', 'Cagnes-sur-Mer',
    'Le Cannet', 'Saint-Laurent-du-Var', 'Menton', 'Vallauris',
    'Mandelieu-la-Napoule', 'Mougins', 'Vence', 'Villeneuve-Loubet',
    'Beausoleil', 'Roquebrune-Cap-Martin', 'Carros', 'La Trinite'
];

// Helpers
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(name: string, address: string): string {
    const input = `${name}|${address}`.toLowerCase();
    return crypto.createHash('sha256').update(input).digest('hex').substring(0, 12);
}

function parseArgs(): {
    category?: string;
    subcategory?: string;
    city?: string;
    limit: number;
    headless: boolean;
    testMode: boolean;
} {
    const args = process.argv.slice(2);
    const result = {
        category: undefined as string | undefined,
        subcategory: undefined as string | undefined,
        city: undefined as string | undefined,
        limit: 30,
        headless: true,
        testMode: false
    };

    for (const arg of args) {
        if (arg.startsWith('--category=')) {
            result.category = arg.split('=')[1].toUpperCase();
        } else if (arg.startsWith('--subcategory=')) {
            result.subcategory = arg.split('=')[1].toLowerCase();
        } else if (arg.startsWith('--city=')) {
            result.city = arg.split('=')[1];
        } else if (arg.startsWith('--limit=')) {
            result.limit = parseInt(arg.split('=')[1], 10);
        } else if (arg.startsWith('--headless=')) {
            result.headless = arg.split('=')[1] !== 'false';
        } else if (arg === '--test') {
            result.testMode = true;
        }
    }

    return result;
}

// Scraper principal
class GoogleMapsScraper {
    private browser: any;
    private page: any;
    private config: ScraperConfig;
    private results: ScrapedBusiness[] = [];
    private seenIds = new Set<string>();

    constructor(config: Partial<ScraperConfig> = {}) {
        this.config = {
            headless: config.headless ?? true,
            maxResultsPerSearch: config.maxResultsPerSearch ?? 30,
            scrollDelay: config.scrollDelay ?? 2000,
            betweenSearchDelay: config.betweenSearchDelay ?? 5000,
            testMode: config.testMode ?? false
        };
    }

    async init(): Promise<void> {
        console.log('🚀 Initialisation du navigateur...');

        this.browser = await puppeteer.launch({
            headless: this.config.headless,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--lang=fr-FR'
            ]
        });

        this.page = await this.browser.newPage();

        // Configuration du navigateur
        await this.page.setViewport({ width: 1366, height: 768 });
        await this.page.setExtraHTTPHeaders({
            'Accept-Language': 'fr-FR,fr;q=0.9'
        });

        // Bloquer les images pour accélérer
        await this.page.setRequestInterception(true);
        this.page.on('request', (req: any) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'font') {
                req.abort();
            } else {
                req.continue();
            }
        });

        console.log('✅ Navigateur initialisé');
    }

    async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async searchAndScrape(query: string, city: string): Promise<ScrapedBusiness[]> {
        const searchTerm = `${query} ${city} 06`;
        console.log(`\n🔍 Recherche: "${searchTerm}"`);

        try {
            // Aller sur Google Maps
            const url = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`;
            await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Attendre que les résultats se chargent
            await sleep(3000);

            // Accepter les cookies si présent
            try {
                const acceptButton = await this.page.$('button[aria-label*="Accepter"]');
                if (acceptButton) {
                    await acceptButton.click();
                    await sleep(1000);
                }
            } catch (e) {
                // Pas de popup cookies
            }

            // Scroller pour charger plus de résultats
            const businesses = await this.scrollAndExtract(searchTerm, city);

            return businesses;

        } catch (error) {
            console.error(`❌ Erreur lors de la recherche "${searchTerm}":`, error);
            return [];
        }
    }

    private async scrollAndExtract(searchQuery: string, city: string): Promise<ScrapedBusiness[]> {
        const businesses: ScrapedBusiness[] = [];
        let previousCount = 0;
        let scrollAttempts = 0;
        const maxScrollAttempts = 10;

        while (scrollAttempts < maxScrollAttempts && businesses.length < this.config.maxResultsPerSearch) {
            // Extraire les résultats visibles
            const items = await this.page.$$eval(
                'div[role="feed"] > div > div[jsaction]',
                (elements: Element[]) => {
                    return elements.map((el: Element) => {
                        const nameEl = el.querySelector('.fontHeadlineSmall');
                        const ratingEl = el.querySelector('.MW4etd');
                        const reviewEl = el.querySelector('.UY7F9');
                        const addressEl = el.querySelectorAll('.W4Efsd')[1];

                        // Vérifier si a un lien website
                        const hasWebsite = !!el.querySelector('a[data-value="Site Web"]') ||
                                          !!el.querySelector('a[href*="http"]');

                        return {
                            name: nameEl?.textContent?.trim() || '',
                            rating: ratingEl?.textContent?.trim() || null,
                            reviewCount: reviewEl?.textContent?.replace(/[()]/g, '').trim() || null,
                            address: addressEl?.textContent?.trim() || null,
                            hasWebsite
                        };
                    }).filter(item => item.name);
                }
            ).catch(() => []);

            // Ajouter les nouveaux résultats
            for (const item of items) {
                const id = generateId(item.name, item.address || city);

                if (!this.seenIds.has(id) && item.name) {
                    this.seenIds.add(id);

                    const business: ScrapedBusiness = {
                        id,
                        name: item.name,
                        rating: item.rating ? parseFloat(item.rating.replace(',', '.')) : null,
                        reviewCount: item.reviewCount ? parseInt(item.reviewCount.replace(/\s/g, ''), 10) : null,
                        address: item.address,
                        phone: null, // On récupérera après si besoin
                        hasWebsite: item.hasWebsite,
                        websiteUrl: null,
                        placeId: null,
                        category: null,
                        searchQuery,
                        city,
                        scrapedAt: new Date().toISOString()
                    };

                    businesses.push(business);
                }
            }

            console.log(`   📊 ${businesses.length} entreprises trouvées`);

            // Vérifier si on a atteint la limite ou plus de nouveaux résultats
            if (businesses.length >= this.config.maxResultsPerSearch) {
                break;
            }

            if (businesses.length === previousCount) {
                scrollAttempts++;
            } else {
                scrollAttempts = 0;
                previousCount = businesses.length;
            }

            // Scroller
            await this.page.evaluate(() => {
                const feed = document.querySelector('div[role="feed"]');
                if (feed) {
                    feed.scrollTop += 500;
                }
            });

            await sleep(this.config.scrollDelay + randomDelay(500, 1500));
        }

        return businesses;
    }

    async getPhoneNumber(business: ScrapedBusiness): Promise<string | null> {
        // Pour obtenir le téléphone, on doit cliquer sur l'entreprise
        // C'est plus lent mais nécessaire pour avoir les contacts
        try {
            // Chercher l'élément par nom
            const element = await this.page.$(`[aria-label*="${business.name}"]`);
            if (!element) return null;

            await element.click();
            await sleep(2000);

            // Extraire le téléphone
            const phone = await this.page.$eval(
                'button[data-tooltip="Copier le numéro de téléphone"]',
                (el: Element) => el.textContent?.trim() || null
            ).catch(() => null);

            // Retourner à la liste
            await this.page.goBack();
            await sleep(1000);

            return phone;

        } catch (error) {
            return null;
        }
    }

    async scrapeCategory(
        categoryId: keyof typeof CATEGORIES_DATA,
        specificSubcategory?: string,
        specificCity?: string
    ): Promise<ScrapedBusiness[]> {
        const category = CATEGORIES_DATA[categoryId];
        if (!category) {
            console.error(`❌ Catégorie inconnue: ${categoryId}`);
            return [];
        }

        const subcategories = specificSubcategory
            ? category.subcategories.filter(s => s.slug === specificSubcategory)
            : category.subcategories;

        const cities = specificCity
            ? [specificCity]
            : CITIES_06;

        console.log(`\n📁 Catégorie: ${categoryId}`);
        console.log(`   Sous-catégories: ${subcategories.map(s => s.slug).join(', ')}`);
        console.log(`   Villes: ${cities.length} villes`);
        console.log(`   Mode: ${this.config.testMode ? 'TEST (1 recherche)' : 'COMPLET'}`);

        for (const subcategory of subcategories) {
            for (const city of cities) {
                for (const query of subcategory.searchQueries) {
                    const results = await this.searchAndScrape(query, city);

                    // Ajouter les métadonnées
                    for (const business of results) {
                        business.category = subcategory.slug;
                    }

                    this.results.push(...results);

                    // Délai entre les recherches
                    await sleep(this.config.betweenSearchDelay + randomDelay(1000, 3000));

                    // Mode test: une seule recherche
                    if (this.config.testMode) {
                        console.log('\n🧪 Mode test: arrêt après 1 recherche');
                        return this.results;
                    }
                }
            }
        }

        return this.results;
    }

    getResults(): ScrapedBusiness[] {
        return this.results;
    }

    getResultsWithoutWebsite(): ScrapedBusiness[] {
        return this.results.filter(b => !b.hasWebsite);
    }
}

// Fonction pour sauvegarder les résultats
function saveResults(
    results: ScrapedBusiness[],
    filename: string,
    outputDir: string
): void {
    // Créer le dossier si nécessaire
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const basePath = path.join(outputDir, `${filename}-${timestamp}`);

    // JSON
    fs.writeFileSync(
        `${basePath}.json`,
        JSON.stringify({
            generatedAt: new Date().toISOString(),
            total: results.length,
            withoutWebsite: results.filter(r => !r.hasWebsite).length,
            results
        }, null, 2)
    );

    // CSV
    const csvHeaders = 'id,name,rating,reviews,address,phone,hasWebsite,category,city,searchQuery,scrapedAt\n';
    const csvRows = results.map(r =>
        `"${r.id}","${r.name?.replace(/"/g, '""')}",${r.rating || ''},${r.reviewCount || ''},"${r.address?.replace(/"/g, '""') || ''}","${r.phone || ''}",${r.hasWebsite},"${r.category || ''}","${r.city}","${r.searchQuery}","${r.scrapedAt}"`
    ).join('\n');

    fs.writeFileSync(`${basePath}.csv`, csvHeaders + csvRows);

    // Filtré (sans site uniquement) - JSON
    const withoutWebsite = results.filter(r => !r.hasWebsite);
    fs.writeFileSync(
        `${basePath}-sans-site.json`,
        JSON.stringify({
            generatedAt: new Date().toISOString(),
            total: withoutWebsite.length,
            results: withoutWebsite
        }, null, 2)
    );

    console.log(`\n💾 Résultats sauvegardés:`);
    console.log(`   - ${basePath}.json (${results.length} entreprises)`);
    console.log(`   - ${basePath}.csv`);
    console.log(`   - ${basePath}-sans-site.json (${withoutWebsite.length} sans site)`);
}

// Main
async function main() {
    const args = parseArgs();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('   SCRAPER GOOGLE MAPS - PROSPECTION 06');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\nConfiguration:`);
    console.log(`  Catégorie: ${args.category || 'TOUTES'}`);
    console.log(`  Sous-catégorie: ${args.subcategory || 'TOUTES'}`);
    console.log(`  Ville: ${args.city || 'TOUTES (17 villes)'}`);
    console.log(`  Limite/recherche: ${args.limit}`);
    console.log(`  Mode headless: ${args.headless}`);
    console.log(`  Mode test: ${args.testMode}`);

    const scraper = new GoogleMapsScraper({
        headless: args.headless,
        maxResultsPerSearch: args.limit,
        testMode: args.testMode
    });

    try {
        await scraper.init();

        const categoriesToScrape = args.category
            ? [args.category as keyof typeof CATEGORIES_DATA]
            : Object.keys(CATEGORIES_DATA) as (keyof typeof CATEGORIES_DATA)[];

        for (const categoryId of categoriesToScrape) {
            await scraper.scrapeCategory(categoryId, args.subcategory, args.city);
        }

        const results = scraper.getResults();
        const withoutWebsite = scraper.getResultsWithoutWebsite();

        console.log('\n═══════════════════════════════════════════════════════════');
        console.log('   RÉSULTATS');
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`\n📊 Total entreprises trouvées: ${results.length}`);
        console.log(`🎯 Entreprises SANS SITE WEB: ${withoutWebsite.length}`);

        // Sauvegarder
        const outputDir = path.join(__dirname, '..', '..', 'data', 'prospection');
        const filename = args.category ? `prospects-${args.category.toLowerCase()}` : 'prospects-06';

        saveResults(results, filename, outputDir);

    } catch (error) {
        console.error('❌ Erreur fatale:', error);
    } finally {
        await scraper.close();
    }
}

// Exécuter
main().catch(console.error);
