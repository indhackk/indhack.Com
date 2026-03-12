import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://indhack.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

interface IndexNowResult {
    endpoint: string;
    status: 'success' | 'error';
    statusCode?: number;
    message?: string;
}

// Soumettre à IndexNow (Bing, Yandex, Seznam — se propagent mutuellement)
async function submitToIndexNow(urls: string[]): Promise<IndexNowResult[]> {
    const endpoints = [
        { name: 'Bing', url: 'https://www.bing.com/indexnow' },
        { name: 'Yandex', url: 'https://yandex.com/indexnow' },
        { name: 'IndexNow.org', url: 'https://api.indexnow.org/indexnow' }
    ];

    const payload = JSON.stringify({
        host: 'indhack.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 10000)
    });

    const results: IndexNowResult[] = [];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: payload
            });

            if (response.status === 200 || response.status === 202) {
                results.push({
                    endpoint: endpoint.name,
                    status: 'success',
                    statusCode: response.status,
                    message: `${urls.length} URLs soumises`
                });
            } else {
                results.push({
                    endpoint: endpoint.name,
                    status: 'error',
                    statusCode: response.status,
                    message: `Erreur HTTP ${response.status}`
                });
            }
        } catch (error) {
            results.push({
                endpoint: endpoint.name,
                status: 'error',
                message: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }

    return results;
}

// Ping Google Sitemap
async function pingGoogleSitemap(): Promise<{ success: boolean; status?: number }> {
    try {
        const response = await fetch(
            `https://www.google.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`
        );
        return { success: response.status === 200, status: response.status };
    } catch {
        return { success: false };
    }
}

// Ping Bing Sitemap
async function pingBingSitemap(): Promise<{ success: boolean; status?: number }> {
    try {
        const response = await fetch(
            `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`
        );
        return { success: response.status === 200, status: response.status };
    } catch {
        return { success: false };
    }
}

// TOUTES les URLs du site — dynamique avec les articles de blog
function getAllSiteUrls(): string[] {
    const blogPosts = getAllPosts();

    const pages = [
        // Pages prioritaires
        '/',
        '/audit-seo',
        '/consultant-seo',
        '/referencement-naturel',
        '/creation-site-web',
        '/refonte-site-web',
        '/seo-local',
        // Services secondaires
        '/consultant-geo',
        '/consultant-ia',
        '/audit-seo',
        '/community-manager',
        '/creation-boutique-en-ligne',
        // 19 pages villes
        '/consultant-seo-nice',
        '/consultant-seo-cannes',
        '/consultant-seo-sophia-antipolis',
        '/consultant-seo-antibes',
        '/consultant-seo-monaco',
        '/consultant-seo-marseille',
        '/consultant-seo-aix-en-provence',
        '/consultant-seo-juan-les-pins',
        '/consultant-seo-paris',
        '/consultant-seo-lyon',
        '/consultant-seo-grenoble',
        '/consultant-seo-bordeaux',
        '/consultant-seo-toulouse',
        '/consultant-seo-nantes',
        '/consultant-seo-rennes',
        '/consultant-seo-montpellier',
        '/consultant-seo-strasbourg',
        '/consultant-seo-lille',
        '/consultant-seo-boulogne-billancourt',
        // 8 outils gratuits
        '/outils',
        '/outils/audit-seo-gratuit',
        '/outils/testeur-visibilite-ia',
        '/outils/generateur-robots-txt',
        '/outils/generateur-schema-json-ld',
        '/outils/extracteur-mots-cles',
        '/outils/simulateur-visibilite-locale',
        '/outils/gmb-autopilot',
        // Ressources
        '/glossaire-seo',
        '/blog',
        '/faq',
        '/a-propos',
        '/contact',
        '/etudes-de-cas',
        '/etudes/restaurants-cote-azur-google-2026',
        '/partenaires',
    ];

    // Articles de blog dynamiques
    const blogUrls = blogPosts.filter(p => !p.draft).map(p => `/blog/${p.slug}`);

    return [...pages, ...blogUrls].map(path => `${SITE_URL}${path}`);
}

export async function GET() {
    return NextResponse.json({
        message: 'IndexNow API - POST pour soumettre des URLs',
        endpoints: {
            POST: {
                description: 'Soumettre des URLs à IndexNow + ping sitemaps',
                body: {
                    urls: 'string[] (optionnel - utilise le sitemap par défaut)',
                    pingSitemaps: 'boolean (optionnel, défaut: true)'
                }
            }
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({}));
        const urls: string[] = body.urls || getAllSiteUrls();
        const pingSitemaps = body.pingSitemaps !== false;

        const results: {
            indexnow: IndexNowResult[];
            googlePing?: { success: boolean; status?: number };
            bingPing?: { success: boolean; status?: number };
            urlCount: number;
            timestamp: string;
        } = {
            indexnow: await submitToIndexNow(urls),
            urlCount: urls.length,
            timestamp: new Date().toISOString()
        };

        if (pingSitemaps) {
            results.googlePing = await pingGoogleSitemap();
            results.bingPing = await pingBingSitemap();
        }

        const successCount = results.indexnow.filter(r => r.status === 'success').length;

        return NextResponse.json({
            success: successCount > 0,
            message: `${successCount}/${results.indexnow.length} endpoints IndexNow OK`,
            results
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            },
            { status: 500 }
        );
    }
}
