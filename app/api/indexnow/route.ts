import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://indhack.com';
const INDEXNOW_KEY = '2833efbc9758eea39a5f2bc6e3f191cb';

interface IndexNowResult {
    endpoint: string;
    status: 'success' | 'error';
    statusCode?: number;
    message?: string;
}

// Soumettre à IndexNow
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
                    'Content-Type': 'application/json',
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

// Extraire URLs du sitemap (version simplifiée pour l'API)
function getUrlsFromSitemap(): string[] {
    // URLs principales du site
    return [
        'https://indhack.com/',
        'https://indhack.com/consultant-seo',
        'https://indhack.com/audit-seo',
        'https://indhack.com/referencement-naturel',
        'https://indhack.com/seo-local',
        'https://indhack.com/creation-site-web',
        'https://indhack.com/refonte-site-web',
        'https://indhack.com/creation-boutique-en-ligne',
        'https://indhack.com/tarifs',
        'https://indhack.com/etudes-de-cas',
        'https://indhack.com/contact',
        'https://indhack.com/a-propos',
        'https://indhack.com/blog',
        // Villes principales
        'https://indhack.com/consultant-seo-nice',
        'https://indhack.com/consultant-seo-paris',
        'https://indhack.com/consultant-seo-lyon',
        'https://indhack.com/consultant-seo-marseille',
        'https://indhack.com/consultant-seo-cannes',
        'https://indhack.com/consultant-seo-bordeaux',
        'https://indhack.com/consultant-seo-toulouse',
        'https://indhack.com/consultant-seo-montpellier',
        'https://indhack.com/consultant-seo-nantes',
        'https://indhack.com/consultant-seo-lille',
        'https://indhack.com/consultant-seo-strasbourg',
        'https://indhack.com/consultant-seo-rennes',
    ];
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
        const urls: string[] = body.urls || getUrlsFromSitemap();
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
