#!/usr/bin/env npx ts-node
/**
 * Script de prospection automatisée - Générique
 *
 * Usage:
 *   npx ts-node scripts/prospect.ts coiffeur Nice
 *   npx ts-node scripts/prospect.ts plombier Paris
 *   npx ts-node scripts/prospect.ts "prothésiste ongulaire" Cannes
 *
 * Prérequis: GOOGLE_PLACES_API_KEY dans .env.local
 */

import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Charger .env.local
dotenv.config({ path: '.env.local' })

const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: npx ts-node scripts/prospect.ts <métier> <ville>')
  console.log('Exemple: npx ts-node scripts/prospect.ts coiffeur Nice')
  process.exit(1)
}

const METIER = args[0]
const VILLE = args[1]
const METIER_SLUG = METIER.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')
const BASE_URL = `https://indhack.com/diagnostic/${METIER_SLUG}`

interface Prospect {
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

function generateUrl(name: string, rating: number, reviewCount: number): string {
  return `${BASE_URL}?nom=${encodeURIComponent(name)}&ville=${VILLE}&note=${rating}&avis=${reviewCount}`
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    console.error('❌ GOOGLE_PLACES_API_KEY non définie dans .env.local')
    console.log('')
    console.log('👉 Ajoute cette ligne dans .env.local:')
    console.log('   GOOGLE_PLACES_API_KEY=AIza...')
    console.log('')
    console.log('📋 Pour obtenir une clé:')
    console.log('   1. https://console.cloud.google.com/')
    console.log('   2. Créer un projet')
    console.log('   3. APIs & Services > Library > "Places API" > Enable')
    console.log('   4. APIs & Services > Credentials > Create > API Key')
    process.exit(1)
  }

  console.log('')
  console.log(`🔍 Prospection: ${METIER} à ${VILLE}`)
  console.log('═'.repeat(50))

  // Recherche
  const allPlaces: any[] = []
  let pageToken: string | undefined
  let page = 0

  do {
    if (pageToken) await sleep(2000)
    const results = await searchPlaces(apiKey, `${METIER} ${VILLE}`, pageToken)
    if (results.status !== 'OK' && results.status !== 'ZERO_RESULTS') {
      console.error('❌ Erreur:', results.status)
      process.exit(1)
    }
    if (results.results) {
      allPlaces.push(...results.results)
      page++
      console.log(`   Page ${page}: +${results.results.length} résultats`)
    }
    pageToken = results.next_page_token
  } while (pageToken)

  console.log(`\n📊 ${allPlaces.length} établissements trouvés`)
  console.log('🔎 Analyse des sites web...\n')

  const prospects: Prospect[] = []

  for (let i = 0; i < allPlaces.length; i++) {
    const place = allPlaces[i]
    if (i > 0 && i % 10 === 0) await sleep(500)

    try {
      const details = await getPlaceDetails(apiKey, place.place_id)
      if (!details) continue

      const prospect: Prospect = {
        name: details.name || place.name,
        rating: details.rating || 0,
        reviewCount: details.user_ratings_total || 0,
        address: details.formatted_address || '',
        phone: details.formatted_phone_number,
        website: details.website,
        placeId: place.place_id,
        hasWebsite: !!details.website,
        diagnosticUrl: generateUrl(
          details.name || place.name,
          details.rating || 4.0,
          details.user_ratings_total || 0
        ),
      }

      if (!prospect.hasWebsite && prospect.reviewCount > 0) {
        prospects.push(prospect)
        console.log(`✅ ${prospect.name} - ${prospect.rating}★ (${prospect.reviewCount} avis)`)
      }
    } catch (e) {
      // Ignore errors
    }
  }

  // Trier par popularité
  prospects.sort((a, b) => b.reviewCount - a.reviewCount)

  console.log('')
  console.log('═'.repeat(50))
  console.log(`🎯 ${prospects.length} PROSPECTS SANS SITE WEB`)
  console.log('═'.repeat(50))

  // Sauvegarder
  const outputDir = path.join(process.cwd(), 'scripts', 'output')
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

  const date = new Date().toISOString().split('T')[0]
  const filename = `${METIER_SLUG}-${VILLE.toLowerCase()}-${date}`

  // CSV
  const csv = [
    'Nom,Note,Avis,Téléphone,Adresse,URL',
    ...prospects.map(p => `"${p.name}",${p.rating},${p.reviewCount},"${p.phone || ''}","${p.address}","${p.diagnosticUrl}"`)
  ].join('\n')
  fs.writeFileSync(path.join(outputDir, `${filename}.csv`), csv)

  // JSON
  fs.writeFileSync(path.join(outputDir, `${filename}.json`), JSON.stringify(prospects, null, 2))

  // URLs seules (pour copier-coller rapide)
  const urls = prospects.map(p => p.diagnosticUrl).join('\n')
  fs.writeFileSync(path.join(outputDir, `${filename}-urls.txt`), urls)

  console.log('')
  console.log('📁 Fichiers générés:')
  console.log(`   scripts/output/${filename}.csv`)
  console.log(`   scripts/output/${filename}.json`)
  console.log(`   scripts/output/${filename}-urls.txt`)
  console.log('')

  // Top 10
  console.log('🏆 TOP 10:')
  prospects.slice(0, 10).forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.name}`)
    console.log(`   ⭐ ${p.rating}/5 (${p.reviewCount} avis)`)
    if (p.phone) console.log(`   📞 ${p.phone}`)
    console.log(`   🔗 ${p.diagnosticUrl}`)
  })

  console.log('')
}

main().catch(console.error)
