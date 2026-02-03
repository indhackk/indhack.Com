/**
 * Script de prospection automatisée - Coiffeurs sans site web
 *
 * Usage: npx ts-node scripts/prospect-coiffeurs.ts
 *
 * Prérequis:
 * 1. Créer une clé API Google Cloud: https://console.cloud.google.com/
 * 2. Activer "Places API" dans la console
 * 3. Ajouter la clé dans .env.local: GOOGLE_PLACES_API_KEY=ta_clé
 */

import * as fs from 'fs'
import * as path from 'path'

// Configuration
const VILLE = 'Nice'
const METIER = 'coiffeur'
const BASE_URL = 'https://indhack.com/diagnostic/coiffeur'

interface Salon {
  name: string
  rating: number
  reviewCount: number
  address: string
  phone?: string
  website?: string
  placeId: string
  hasWebsite: boolean
  diagnosticUrl: string
}

async function searchPlaces(apiKey: string, query: string, pageToken?: string): Promise<any> {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
  const params = new URLSearchParams({
    query,
    key: apiKey,
    language: 'fr',
  })

  if (pageToken) {
    params.append('pagetoken', pageToken)
  }

  const response = await fetch(`${baseUrl}?${params}`)
  return response.json()
}

async function getPlaceDetails(apiKey: string, placeId: string): Promise<any> {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json'
  const params = new URLSearchParams({
    place_id: placeId,
    key: apiKey,
    fields: 'name,rating,user_ratings_total,formatted_address,formatted_phone_number,website,place_id',
    language: 'fr',
  })

  const response = await fetch(`${baseUrl}?${params}`)
  const data = await response.json()
  return data.result
}

function generateDiagnosticUrl(name: string, ville: string, rating: number, reviewCount: number): string {
  const encodedName = encodeURIComponent(name)
  return `${BASE_URL}?nom=${encodedName}&ville=${ville}&note=${rating}&avis=${reviewCount}`
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  // Charger la clé API depuis .env.local ou variable d'environnement
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    console.error('❌ GOOGLE_PLACES_API_KEY non définie!')
    console.log('')
    console.log('📋 Comment obtenir une clé API Google Places:')
    console.log('1. Va sur https://console.cloud.google.com/')
    console.log('2. Crée un nouveau projet (ou utilise un existant)')
    console.log('3. Active "Places API" dans APIs & Services > Library')
    console.log('4. Va dans APIs & Services > Credentials')
    console.log('5. Clique "Create Credentials" > "API Key"')
    console.log('6. Copie la clé et ajoute-la dans .env.local:')
    console.log('   GOOGLE_PLACES_API_KEY=AIza...')
    console.log('')
    console.log('💰 Coût estimé: ~0.017€ par établissement (~17€ pour 1000)')
    process.exit(1)
  }

  console.log(`🔍 Recherche des ${METIER}s à ${VILLE}...`)
  console.log('')

  const allPlaces: any[] = []
  let pageToken: string | undefined
  let pageCount = 0

  // Récupérer tous les résultats (Google renvoie max 60 résultats en 3 pages)
  do {
    if (pageToken) {
      // Google demande d'attendre 2s entre les pages
      await sleep(2000)
    }

    const searchResults = await searchPlaces(apiKey, `${METIER} ${VILLE}`, pageToken)

    if (searchResults.status !== 'OK' && searchResults.status !== 'ZERO_RESULTS') {
      console.error('❌ Erreur API:', searchResults.status, searchResults.error_message)
      process.exit(1)
    }

    if (searchResults.results) {
      allPlaces.push(...searchResults.results)
      pageCount++
      console.log(`   Page ${pageCount}: ${searchResults.results.length} résultats`)
    }

    pageToken = searchResults.next_page_token
  } while (pageToken)

  console.log('')
  console.log(`📊 Total trouvé: ${allPlaces.length} établissements`)
  console.log('')
  console.log('🔎 Récupération des détails (site web, téléphone)...')

  const salons: Salon[] = []
  const salonsWithoutWebsite: Salon[] = []

  for (let i = 0; i < allPlaces.length; i++) {
    const place = allPlaces[i]

    // Pause pour respecter les limites de l'API
    if (i > 0 && i % 10 === 0) {
      await sleep(1000)
    }

    try {
      const details = await getPlaceDetails(apiKey, place.place_id)

      if (!details) continue

      const salon: Salon = {
        name: details.name || place.name,
        rating: details.rating || place.rating || 0,
        reviewCount: details.user_ratings_total || 0,
        address: details.formatted_address || place.formatted_address || '',
        phone: details.formatted_phone_number,
        website: details.website,
        placeId: place.place_id,
        hasWebsite: !!details.website,
        diagnosticUrl: generateDiagnosticUrl(
          details.name || place.name,
          VILLE,
          details.rating || place.rating || 4.0,
          details.user_ratings_total || 0
        ),
      }

      salons.push(salon)

      if (!salon.hasWebsite) {
        salonsWithoutWebsite.push(salon)
        console.log(`   ✅ ${salon.name} - ${salon.rating}★ (${salon.reviewCount} avis) - PAS DE SITE`)
      } else {
        console.log(`   ⏭️  ${salon.name} - a un site web`)
      }

    } catch (error) {
      console.error(`   ❌ Erreur pour ${place.name}:`, error)
    }
  }

  console.log('')
  console.log('═'.repeat(60))
  console.log('')
  console.log(`📈 RÉSULTATS:`)
  console.log(`   Total analysé: ${salons.length}`)
  console.log(`   Avec site web: ${salons.length - salonsWithoutWebsite.length}`)
  console.log(`   SANS site web: ${salonsWithoutWebsite.length} 🎯`)
  console.log('')

  // Trier par nombre d'avis (les plus populaires en premier)
  salonsWithoutWebsite.sort((a, b) => b.reviewCount - a.reviewCount)

  // Générer le fichier CSV
  const csvHeader = 'Nom,Note,Avis,Adresse,Téléphone,URL Diagnostic'
  const csvRows = salonsWithoutWebsite.map(s =>
    `"${s.name}",${s.rating},${s.reviewCount},"${s.address}","${s.phone || ''}","${s.diagnosticUrl}"`
  )
  const csvContent = [csvHeader, ...csvRows].join('\n')

  const outputDir = path.join(process.cwd(), 'scripts', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const csvPath = path.join(outputDir, `prospects-${METIER}-${VILLE.toLowerCase()}-${timestamp}.csv`)
  fs.writeFileSync(csvPath, csvContent, 'utf-8')

  // Générer aussi un JSON pour usage programmatique
  const jsonPath = path.join(outputDir, `prospects-${METIER}-${VILLE.toLowerCase()}-${timestamp}.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(salonsWithoutWebsite, null, 2), 'utf-8')

  console.log(`📁 Fichiers générés:`)
  console.log(`   ${csvPath}`)
  console.log(`   ${jsonPath}`)
  console.log('')

  // Afficher les top prospects
  console.log('🏆 TOP 10 PROSPECTS (par nombre d\'avis):')
  console.log('')
  salonsWithoutWebsite.slice(0, 10).forEach((s, i) => {
    console.log(`${i + 1}. ${s.name}`)
    console.log(`   ⭐ ${s.rating}/5 (${s.reviewCount} avis)`)
    console.log(`   📍 ${s.address}`)
    if (s.phone) console.log(`   📞 ${s.phone}`)
    console.log(`   🔗 ${s.diagnosticUrl}`)
    console.log('')
  })
}

// Exécuter
main().catch(console.error)
