#!/usr/bin/env node
/**
 * Nettoyage CSV restaurants PACA pour data.gouv.fr
 * - Supprime les lignes corrompues (catégorie = numéro de téléphone)
 * - Retire les doublons
 * - Nettoie les URLs (tracking params)
 * - Formate selon les standards data.gouv
 */

import fs from 'fs';
import path from 'path';

const INPUT_FILE = 'public/data/restaurants_visibilite_paca.csv';
const OUTPUT_FILE = 'public/data/restaurants_visibilite_paca_clean.csv';

// Lire le fichier
const content = fs.readFileSync(INPUT_FILE, 'utf-8');
const lines = content.split('\n');

// Headers data.gouv friendly (snake_case, sans accents)
const newHeaders = [
  'nom_restaurant',
  'ville',
  'categorie',
  'note_google',
  'nombre_avis',
  'possede_site_web',
  'url_site_web',
  'score_completude_profil',
  'google_maps_cid'
];

// Parse CSV (gestion des guillemets)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Normaliser les guillemets et apostrophes (avec Unicode explicite)
function normalizeQuotes(str) {
  return str
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')  // Guillemets doubles courbes → droits
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")               // Apostrophes courbes → droites
    .replace(/\u00A0/g, ' ');                                  // Espaces insécables → normaux
}

// Nettoyer URL (supprimer tracking params)
function cleanURL(url) {
  if (!url || url === '') return '';

  try {
    const parsed = new URL(url);

    // Supprimer les params de tracking courants
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      'igsh', 'igshid', 'ref', 'fbclid', 'gclid'
    ];

    trackingParams.forEach(param => parsed.searchParams.delete(param));

    // Reconstruire l'URL propre
    let cleanUrl = parsed.origin + parsed.pathname;
    if (parsed.searchParams.toString()) {
      cleanUrl += '?' + parsed.searchParams.toString();
    }

    // Supprimer le slash final sauf pour la racine
    if (cleanUrl.endsWith('/') && parsed.pathname !== '/') {
      cleanUrl = cleanUrl.slice(0, -1);
    }

    return cleanUrl;
  } catch {
    return url; // Retourner tel quel si URL invalide
  }
}

// Détecter si une ligne est corrompue (catégorie = numéro de téléphone)
function isCorruptedLine(fields) {
  if (fields.length < 3) return true;

  const categorie = fields[2] || '';

  // Catégorie contient un numéro de téléphone (format 04 xx ou 06 xx ou 07 xx)
  if (/0[4-7]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}/.test(categorie)) return true;

  // Catégorie contient des guillemets d'avis
  if (categorie.includes('""') && categorie.length > 50) return true;

  // Catégorie anormalement longue (contient probablement une adresse ou avis)
  if (categorie.length > 60) return true;

  // Catégorie contient "Av." ou "Rue" (adresse)
  if (/\bAv\.|Rue\b/i.test(categorie)) return true;

  // Nombre d'avis = 0 ET score faible (données incomplètes)
  const avis = parseInt(fields[4]) || 0;
  const score = parseInt(fields[7]) || 0;
  if (avis === 0 && score <= 5) return true;

  return false;
}

// Valider une catégorie
function isValidCategory(cat) {
  const validCategories = [
    'Française', 'Italienne', 'Méditerranéenne', 'Pizza', 'Brasserie',
    'Restaurant', 'Gastronomie française', 'Cuisine gastronomique',
    'Fruits de mer', 'Grecque', 'Microbrasserie', 'Bar', 'Bistro',
    'Plats familiaux', 'Plats provençaux', 'Bar à tapas', 'Brunch',
    'Cuisine française moderne', 'Restaurant de poisson', 'Pizzas à emporter',
    'Petites portions à partager', 'Service de cuisinier à domicile',
    'Restaurant de cuisine fusion', 'Bar à bières'
  ];

  return validCategories.some(v => cat.includes(v)) || cat.length < 40;
}

// Traitement
const cleanedRows = [];
const seenCIDs = new Set();
let skippedCorrupted = 0;
let skippedDuplicates = 0;

// Skip header
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const fields = parseCSVLine(line);

  // Vérifier corruption
  if (isCorruptedLine(fields)) {
    console.log(`⚠️  Ligne ${i + 1} corrompue, ignorée: ${fields[0]?.substring(0, 30)}...`);
    skippedCorrupted++;
    continue;
  }

  // Vérifier doublon (par CID)
  const cid = fields[8];
  if (cid && seenCIDs.has(cid)) {
    console.log(`⚠️  Doublon ignoré: ${fields[0]} (CID: ${cid})`);
    skippedDuplicates++;
    continue;
  }
  if (cid) seenCIDs.add(cid);

  // Nettoyer les champs
  const cleanedRow = [
    normalizeQuotes(fields[0]?.replace(/"/g, '') || ''),  // nom
    normalizeQuotes(fields[1]?.replace(/"/g, '') || ''),  // ville
    normalizeQuotes(fields[2]?.replace(/"/g, '') || ''),  // categorie
    parseFloat(fields[3]) || '',                          // note (nombre)
    parseInt(fields[4]) || 0,                             // avis (entier)
    fields[5] === 'Oui' ? 'true' : 'false',              // booléen pour data.gouv
    cleanURL(fields[6]?.replace(/"/g, '')),               // url nettoyée
    parseInt(fields[7]) || '',                            // score
    fields[8]?.replace(/"/g, '')                          // cid
  ];

  cleanedRows.push(cleanedRow);
}

// Trier par ville puis par note décroissante
cleanedRows.sort((a, b) => {
  if (a[1] !== b[1]) return a[1].localeCompare(b[1], 'fr');
  return (b[3] || 0) - (a[3] || 0);
});

// Générer le CSV final
const csvContent = [
  newHeaders.join(','),
  ...cleanedRows.map(row =>
    row.map(field => {
      const str = String(field);
      // Échapper si contient virgule, guillemet ou retour à la ligne
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',')
  )
].join('\n') + '\n';  // Newline finale obligatoire

fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf-8');

console.log('\n✅ CSV nettoyé généré avec succès!');
console.log(`📊 ${cleanedRows.length} restaurants conservés`);
console.log(`🗑️  ${skippedCorrupted} lignes corrompues supprimées`);
console.log(`🔄 ${skippedDuplicates} doublons supprimés`);
console.log(`📁 Fichier: ${OUTPUT_FILE}`);

// Générer aussi un fichier de métadonnées pour data.gouv
const metadata = {
  title: "Visibilité des restaurants en région PACA sur Google Maps",
  description: "Analyse de la présence numérique des restaurants de la région Provence-Alpes-Côte d'Azur sur Google Maps. Données collectées en mars 2026.",
  publisher: "Indiana Music - Consultant SEO",
  license: "ODbL-1.0",
  frequency: "annual",
  temporal_coverage: "2026",
  spatial_coverage: "Région PACA (France)",
  columns: {
    nom_restaurant: "Nom de l'établissement tel qu'affiché sur Google Maps",
    ville: "Commune d'implantation",
    categorie: "Catégorie de cuisine principale",
    note_google: "Note moyenne Google (sur 5)",
    nombre_avis: "Nombre total d'avis Google",
    possede_site_web: "Présence d'un site web référencé (true/false)",
    url_site_web: "URL du site web si existant",
    score_completude_profil: "Score de complétude du profil Google Business (sur 10)",
    google_maps_cid: "Identifiant unique Google Maps (CID)"
  },
  stats: {
    total_restaurants: cleanedRows.length,
    villes: [...new Set(cleanedRows.map(r => r[1]))].length,
    note_moyenne: (cleanedRows.reduce((sum, r) => sum + (r[3] || 0), 0) / cleanedRows.length).toFixed(2),
    taux_site_web: ((cleanedRows.filter(r => r[5] === 'true').length / cleanedRows.length) * 100).toFixed(1) + '%'
  }
};

fs.writeFileSync(
  'public/data/restaurants_visibilite_paca_metadata.json',
  JSON.stringify(metadata, null, 2),
  'utf-8'
);

console.log(`📋 Métadonnées: public/data/restaurants_visibilite_paca_metadata.json`);
