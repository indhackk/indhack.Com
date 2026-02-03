import { NextRequest, NextResponse } from 'next/server'

// ══════════════════════════════════════════════════════════════════════════════
// API SEO DATA - Récupère les vraies données de mots-clés
// Compatible avec : DataForSEO, SEMrush, Haloscan
// ══════════════════════════════════════════════════════════════════════════════

// Cache en mémoire pour éviter les appels répétés (durée: 24h)
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 heures

// Données de fallback par métier (utilisées si l'API n'est pas configurée)
const FALLBACK_DATA: Record<string, any> = {
  coiffeur: {
    totalVolume: 8200,
    keywords: [
      { keyword: 'coiffeur', volume: 2800, difficulty: 85, cpc: 1.2 },
      { keyword: 'coiffeuse', volume: 1900, difficulty: 80, cpc: 1.1 },
      { keyword: 'salon coiffure', volume: 1200, difficulty: 70, cpc: 0.9 },
      { keyword: 'balayage', volume: 390, difficulty: 45, cpc: 0.8 },
      { keyword: 'coloriste', volume: 480, difficulty: 50, cpc: 0.85 },
      { keyword: 'lissage brésilien', volume: 320, difficulty: 35, cpc: 0.7 },
      { keyword: 'coiffeur mariage', volume: 210, difficulty: 30, cpc: 1.5 },
      { keyword: 'mèches', volume: 280, difficulty: 40, cpc: 0.75 },
    ],
    questions: [
      'Quel est le prix d\'un balayage ?',
      'Comment entretenir sa coloration ?',
      'Quelle coupe pour mon visage ?',
      'Combien coûte un lissage brésilien ?',
      'Comment choisir son coiffeur ?',
    ],
    averageTicket: 75,
    conversionRate: 0.03,
  },
  plombier: {
    totalVolume: 6800,
    keywords: [
      { keyword: 'plombier', volume: 4100, difficulty: 90, cpc: 8.5 },
      { keyword: 'plombier urgence', volume: 1800, difficulty: 85, cpc: 12.0 },
      { keyword: 'fuite eau', volume: 480, difficulty: 60, cpc: 6.0 },
      { keyword: 'débouchage', volume: 720, difficulty: 55, cpc: 5.5 },
      { keyword: 'chauffe eau', volume: 390, difficulty: 50, cpc: 4.0 },
    ],
    questions: [
      'Comment déboucher un évier ?',
      'Prix intervention plombier urgence ?',
      'Comment réparer une fuite ?',
      'Quel plombier choisir ?',
    ],
    averageTicket: 180,
    conversionRate: 0.05,
  },
  electricien: {
    totalVolume: 5100,
    keywords: [
      { keyword: 'electricien', volume: 3600, difficulty: 88, cpc: 7.0 },
      { keyword: 'electricien urgence', volume: 890, difficulty: 82, cpc: 10.0 },
      { keyword: 'panne électrique', volume: 320, difficulty: 55, cpc: 5.0 },
      { keyword: 'installation électrique', volume: 480, difficulty: 60, cpc: 4.5 },
    ],
    questions: [
      'Comment trouver un bon électricien ?',
      'Prix mise aux normes électrique ?',
      'Que faire en cas de panne ?',
    ],
    averageTicket: 200,
    conversionRate: 0.04,
  },
  avocat: {
    totalVolume: 7200,
    keywords: [
      { keyword: 'avocat', volume: 4800, difficulty: 92, cpc: 15.0 },
      { keyword: 'avocat divorce', volume: 880, difficulty: 75, cpc: 12.0 },
      { keyword: 'avocat droit travail', volume: 590, difficulty: 70, cpc: 10.0 },
      { keyword: 'avocat pénal', volume: 480, difficulty: 68, cpc: 11.0 },
    ],
    questions: [
      'Comment choisir son avocat ?',
      'Combien coûte un avocat divorce ?',
      'Ai-je droit à l\'aide juridictionnelle ?',
    ],
    averageTicket: 250,
    conversionRate: 0.02,
  },
  dentiste: {
    totalVolume: 9500,
    keywords: [
      { keyword: 'dentiste', volume: 6200, difficulty: 95, cpc: 5.0 },
      { keyword: 'dentiste urgence', volume: 720, difficulty: 70, cpc: 8.0 },
      { keyword: 'implant dentaire', volume: 590, difficulty: 65, cpc: 6.0 },
      { keyword: 'blanchiment dentaire', volume: 480, difficulty: 50, cpc: 4.0 },
    ],
    questions: [
      'Comment trouver un dentiste qui prend des nouveaux patients ?',
      'Prix implant dentaire ?',
      'Est-ce que le blanchiment abîme les dents ?',
    ],
    averageTicket: 120,
    conversionRate: 0.03,
  },
  serrurier: {
    totalVolume: 5400,
    keywords: [
      { keyword: 'serrurier', volume: 3200, difficulty: 88, cpc: 15.0 },
      { keyword: 'serrurier urgence', volume: 1400, difficulty: 85, cpc: 20.0 },
      { keyword: 'ouverture porte', volume: 590, difficulty: 60, cpc: 12.0 },
      { keyword: 'changement serrure', volume: 320, difficulty: 50, cpc: 8.0 },
    ],
    questions: [
      'Prix ouverture de porte claquée ?',
      'Comment éviter les arnaques serrurier ?',
      'Serrurier agréé assurance ?',
    ],
    averageTicket: 150,
    conversionRate: 0.06,
  },
  'prothesiste-ongulaire': {
    totalVolume: 4200,
    keywords: [
      { keyword: 'onglerie', volume: 1400, difficulty: 70, cpc: 1.5 },
      { keyword: 'prothésiste ongulaire', volume: 880, difficulty: 55, cpc: 1.2 },
      { keyword: 'pose ongles', volume: 720, difficulty: 50, cpc: 1.0 },
      { keyword: 'manucure', volume: 1100, difficulty: 65, cpc: 1.3 },
      { keyword: 'nail art', volume: 280, difficulty: 40, cpc: 0.8 },
    ],
    questions: [
      'Combien coûte une pose complète ?',
      'Gel ou résine, que choisir ?',
      'Comment faire tenir ses ongles plus longtemps ?',
    ],
    averageTicket: 55,
    conversionRate: 0.04,
  },
  renovation: {
    totalVolume: 4800,
    keywords: [
      { keyword: 'rénovation', volume: 2100, difficulty: 85, cpc: 4.0 },
      { keyword: 'rénovation appartement', volume: 720, difficulty: 70, cpc: 3.5 },
      { keyword: 'rénovation salle de bain', volume: 480, difficulty: 55, cpc: 3.0 },
      { keyword: 'rénovation cuisine', volume: 390, difficulty: 50, cpc: 2.8 },
    ],
    questions: [
      'Quel budget pour rénover un appartement ?',
      'Comment trouver un bon artisan ?',
      'Combien de temps pour rénover une salle de bain ?',
    ],
    averageTicket: 5000,
    conversionRate: 0.01,
  },
  restaurant: {
    totalVolume: 12000,
    keywords: [
      { keyword: 'restaurant', volume: 8000, difficulty: 95, cpc: 2.0 },
      { keyword: 'restaurant italien', volume: 1200, difficulty: 60, cpc: 1.5 },
      { keyword: 'restaurant japonais', volume: 980, difficulty: 58, cpc: 1.4 },
      { keyword: 'brunch', volume: 650, difficulty: 50, cpc: 1.2 },
    ],
    questions: [
      'Meilleur restaurant de la ville ?',
      'Restaurant ouvert le dimanche ?',
      'Restaurant avec terrasse ?',
    ],
    averageTicket: 35,
    conversionRate: 0.02,
  },
  photographe: {
    totalVolume: 3200,
    keywords: [
      { keyword: 'photographe', volume: 1800, difficulty: 75, cpc: 2.5 },
      { keyword: 'photographe mariage', volume: 720, difficulty: 60, cpc: 3.0 },
      { keyword: 'photographe portrait', volume: 320, difficulty: 45, cpc: 2.0 },
      { keyword: 'shooting photo', volume: 280, difficulty: 40, cpc: 1.8 },
    ],
    questions: [
      'Combien coûte un photographe mariage ?',
      'Comment choisir son photographe ?',
      'Combien de photos pour un mariage ?',
    ],
    averageTicket: 800,
    conversionRate: 0.03,
  },
}

// Fonction pour appeler DataForSEO (à activer quand tu as les credentials)
async function fetchFromDataForSEO(metier: string, ville: string): Promise<any> {
  const apiLogin = process.env.DATAFORSEO_LOGIN
  const apiPassword = process.env.DATAFORSEO_PASSWORD

  if (!apiLogin || !apiPassword) {
    return null // Retourne null si pas configuré, on utilisera les fallback
  }

  try {
    const credentials = Buffer.from(`${apiLogin}:${apiPassword}`).toString('base64')

    // Appel API pour les volumes de mots-clés
    const response = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        keywords: [
          `${metier} ${ville}`,
          `${metier} ${ville} avis`,
          `meilleur ${metier} ${ville}`,
        ],
        location_code: 2250, // France
        language_code: 'fr',
      }]),
    })

    if (!response.ok) {
      console.error('DataForSEO error:', response.status)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('DataForSEO fetch error:', error)
    return null
  }
}

// Fonction pour appeler SEMrush (alternative)
async function fetchFromSEMrush(metier: string, ville: string): Promise<any> {
  const apiKey = process.env.SEMRUSH_API_KEY

  if (!apiKey) {
    return null
  }

  try {
    const keyword = `${metier} ${ville}`
    const response = await fetch(
      `https://api.semrush.com/?type=phrase_all&key=${apiKey}&phrase=${encodeURIComponent(keyword)}&database=fr`
    )

    if (!response.ok) {
      return null
    }

    const text = await response.text()
    // Parse SEMrush CSV response
    // ... parsing logic
    return null // Implement based on your needs
  } catch (error) {
    console.error('SEMrush fetch error:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const metier = searchParams.get('metier') || 'coiffeur'
  const ville = searchParams.get('ville') || 'Nice'

  const cacheKey = `${metier}-${ville.toLowerCase()}`

  // Vérifier le cache
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data)
  }

  // Essayer les APIs en ordre de priorité
  let apiData = null

  // 1. DataForSEO
  apiData = await fetchFromDataForSEO(metier, ville)

  // 2. SEMrush (fallback)
  if (!apiData) {
    apiData = await fetchFromSEMrush(metier, ville)
  }

  // 3. Données de fallback si aucune API n'est configurée
  const fallback = FALLBACK_DATA[metier] || FALLBACK_DATA.coiffeur

  // Construire la réponse
  const responseData = {
    metier,
    ville,
    source: apiData ? 'api' : 'fallback',
    data: apiData || {
      ...fallback,
      keywords: fallback.keywords.map((kw: any) => ({
        ...kw,
        keyword: `${kw.keyword} ${ville.toLowerCase()}`,
      })),
    },
    generatedAt: new Date().toISOString(),
  }

  // Mettre en cache
  cache.set(cacheKey, { data: responseData, timestamp: Date.now() })

  return NextResponse.json(responseData)
}

export async function POST(request: NextRequest) {
  // Endpoint pour forcer un refresh des données
  const body = await request.json()
  const { metier, ville } = body

  const cacheKey = `${metier}-${ville.toLowerCase()}`
  cache.delete(cacheKey)

  // Re-fetch
  const response = await GET(request)
  return response
}
