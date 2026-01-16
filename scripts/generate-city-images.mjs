#!/usr/bin/env node
/**
 * Script de génération des images de villes avec métadonnées EXIF géolocalisées
 * Usage: node scripts/generate-city-images.mjs
 *
 * Ce script:
 * 1. Télécharge des images de villes depuis Unsplash
 * 2. Ajoute les métadonnées EXIF (GPS, keywords, copyright)
 * 3. Optimise et convertit en WebP
 */

import { exiftool } from 'exiftool-vendored';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import https from 'https';

// Configuration des villes avec coordonnées GPS
const CITIES_CONFIG = [
    // Côte d'Azur
    { name: "nice", lat: 43.7102, lng: 7.2620, search: "nice france promenade", images: ["promenade-anglais", "vieux-nice", "place-massena"] },
    { name: "cannes", lat: 43.5528, lng: 7.0174, search: "cannes france croisette", images: ["croisette", "palais-festivals", "vieux-port"] },
    { name: "antibes", lat: 43.5804, lng: 7.1251, search: "antibes france port", images: ["port-vauban", "vieille-ville", "cap"] },
    { name: "monaco", lat: 43.7384, lng: 7.4246, search: "monaco monte carlo", images: ["casino", "port-hercule", "rocher"] },
    { name: "sophia-antipolis", lat: 43.6163, lng: 7.0557, search: "sophia antipolis tech park", images: ["technopole", "bureaux", "campus"] },
    // PACA
    { name: "marseille", lat: 43.2965, lng: 5.3698, search: "marseille france vieux port", images: ["vieux-port", "mucem", "notre-dame-garde"] },
    { name: "aix", lat: 43.5297, lng: 5.4474, search: "aix en provence cours mirabeau", images: ["cours-mirabeau", "rotonde", "sainte-victoire"] },
    // Paris & IDF
    { name: "paris", lat: 48.8566, lng: 2.3522, search: "paris france eiffel", images: ["tour-eiffel", "marais", "sacre-coeur"] },
    { name: "boulogne", lat: 48.8396, lng: 2.2399, search: "boulogne billancourt seine musicale", images: ["seine-musicale", "bureaux", "ile-seguin"] },
    // Bretagne & Pays de Loire
    { name: "rennes", lat: 48.1173, lng: -1.6778, search: "rennes france parlement bretagne", images: ["parlement", "republique", "thabor"] },
    { name: "nantes", lat: 47.2184, lng: -1.5536, search: "nantes france machines ile", images: ["machines", "chateau", "passage-pommeraye"] },
    // Rhône-Alpes
    { name: "lyon", lat: 45.7640, lng: 4.8357, search: "lyon france fourviere", images: ["fourviere", "bellecour", "confluence"] },
    { name: "grenoble", lat: 45.1885, lng: 5.7245, search: "grenoble france bastille alpes", images: ["bastille", "alpes", "telepherique"] },
    // Sud-Ouest
    { name: "toulouse", lat: 43.6047, lng: 1.4442, search: "toulouse france capitole", images: ["capitole", "garonne", "cite-espace"] },
    { name: "bordeaux", lat: 44.8378, lng: -0.5792, search: "bordeaux france place bourse", images: ["place-bourse", "miroir-eau", "cite-vin"] },
    { name: "montpellier", lat: 43.6108, lng: 3.8767, search: "montpellier france comedie", images: ["comedie", "antigone", "ecusson"] },
    // Nord & Est
    { name: "lille", lat: 50.6292, lng: 3.0573, search: "lille france grand place", images: ["grand-place", "vieux-lille", "beffroi"] },
    { name: "strasbourg", lat: 48.5734, lng: 7.7521, search: "strasbourg france cathedrale petite france", images: ["cathedrale", "petite-france", "parlement"] }
];

const OUTPUT_DIR = './public/images/cities';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Télécharger une image depuis une URL
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.open(filepath, 'w').then(handle => {
            https.get(url, (response) => {
                if (response.statusCode === 301 || response.statusCode === 302) {
                    downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                    return;
                }
                const chunks = [];
                response.on('data', chunk => chunks.push(chunk));
                response.on('end', () => {
                    handle.write(Buffer.concat(chunks)).then(() => {
                        handle.close();
                        resolve(filepath);
                    });
                });
                response.on('error', reject);
            }).on('error', reject);
        });
    });
}

// Créer une image placeholder avec Sharp si pas d'API Unsplash
async function createPlaceholderImage(cityName, imageName, width = 800, height = 600) {
    const colors = {
        'nice': '#0891b2', 'cannes': '#f59e0b', 'antibes': '#10b981', 'monaco': '#dc2626',
        'sophia-antipolis': '#6366f1', 'marseille': '#0284c7', 'aix': '#d97706',
        'paris': '#1e40af', 'boulogne': '#4f46e5', 'rennes': '#059669', 'nantes': '#0d9488',
        'lyon': '#be123c', 'grenoble': '#047857', 'toulouse': '#db2777', 'bordeaux': '#7c2d12',
        'montpellier': '#c026d3', 'lille': '#b91c1c', 'strasbourg': '#1d4ed8'
    };

    const color = colors[cityName] || '#638576';
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">
                ${cityName.toUpperCase()}
            </text>
            <text x="50%" y="58%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.7">
                ${imageName}
            </text>
            <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.5">
                INDHACK - Consultante SEO
            </text>
        </svg>
    `;

    return Buffer.from(svg);
}

// Ajouter les métadonnées EXIF à une image
async function addExifMetadata(filepath, cityConfig, imageName, keywords) {
    try {
        await exiftool.write(filepath, {
            // GPS Coordinates (géolocalisation)
            GPSLatitude: cityConfig.lat,
            GPSLatitudeRef: cityConfig.lat >= 0 ? 'N' : 'S',
            GPSLongitude: Math.abs(cityConfig.lng),
            GPSLongitudeRef: cityConfig.lng >= 0 ? 'E' : 'W',

            // Keywords SEO (invisibles mais indexables)
            'XMP:Subject': keywords,
            'IPTC:Keywords': keywords,
            'XMP:TagsList': keywords,

            // Copyright & Attribution
            Copyright: '© INDHACK - Indiana Aflalo - Consultante SEO',
            Artist: 'INDHACK - Indiana Aflalo',
            Creator: 'INDHACK',

            // Description SEO
            ImageDescription: `${imageName} - SEO ${cityConfig.name} - Consultante référencement ${cityConfig.name}`,
            'XMP:Description': `Image SEO optimisée pour ${cityConfig.name} - Audit technique, référencement naturel`,

            // Title
            'XMP:Title': `SEO ${cityConfig.name.charAt(0).toUpperCase() + cityConfig.name.slice(1)} - INDHACK`,
            ObjectName: `seo-${cityConfig.name}-${imageName}`,

            // Software & Processing
            Software: 'INDHACK SEO Image Processor',
            ProcessingSoftware: 'Sharp + ExifTool',

            // Date
            DateCreated: new Date().toISOString().split('T')[0].replace(/-/g, ':'),
        }, ['-overwrite_original']);

        console.log(`  ✓ EXIF ajouté: ${filepath}`);
    } catch (error) {
        console.error(`  ✗ Erreur EXIF ${filepath}:`, error.message);
    }
}

// Traiter une ville complète
async function processCity(cityConfig) {
    console.log(`\n📍 Traitement de ${cityConfig.name.toUpperCase()}...`);

    for (const imageName of cityConfig.images) {
        const filename = `${cityConfig.name}-${imageName}`;
        const tempPath = path.join(OUTPUT_DIR, `${filename}-temp.png`);
        const finalPath = path.join(OUTPUT_DIR, `${filename}.webp`);

        // Vérifier si l'image existe déjà
        try {
            await fs.access(finalPath);
            console.log(`  ⏭ ${filename}.webp existe déjà, skip...`);
            continue;
        } catch {}

        // Créer l'image placeholder
        console.log(`  🖼 Création de ${filename}...`);
        const svgBuffer = await createPlaceholderImage(cityConfig.name, imageName);

        // Convertir SVG en PNG puis en WebP optimisé
        await sharp(svgBuffer)
            .resize(800, 600, { fit: 'cover' })
            .png()
            .toFile(tempPath);

        // Ajouter les métadonnées EXIF au PNG
        const keywords = [
            `SEO ${cityConfig.name}`,
            `référencement ${cityConfig.name}`,
            `consultant SEO ${cityConfig.name}`,
            `audit SEO ${cityConfig.name}`,
            imageName.replace(/-/g, ' '),
            'INDHACK',
            'Indiana Aflalo',
            'consultante SEO freelance'
        ];

        await addExifMetadata(tempPath, cityConfig, imageName, keywords);

        // Convertir en WebP optimisé (les métadonnées seront préservées)
        await sharp(tempPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(finalPath);

        // Supprimer le fichier temporaire
        await fs.unlink(tempPath);

        console.log(`  ✅ ${filename}.webp créé avec succès`);
    }
}

// Générer le fichier de métadonnées JSON pour vérification
async function generateMetadataJson() {
    const metadata = {};

    for (const city of CITIES_CONFIG) {
        metadata[city.name] = {
            coordinates: { lat: city.lat, lng: city.lng },
            images: city.images.map(img => ({
                filename: `${city.name}-${img}.webp`,
                path: `/images/cities/${city.name}-${img}.webp`,
                keywords: [
                    `SEO ${city.name}`,
                    `référencement ${city.name}`,
                    `consultant SEO ${city.name}`,
                    img.replace(/-/g, ' ')
                ]
            }))
        };
    }

    await fs.writeFile(
        path.join(OUTPUT_DIR, 'metadata.json'),
        JSON.stringify(metadata, null, 2)
    );

    console.log('\n📋 metadata.json généré');
}

// Main
async function main() {
    console.log('🚀 Génération des images de villes avec métadonnées EXIF...\n');
    console.log('📂 Dossier de sortie:', OUTPUT_DIR);

    // Créer le dossier de sortie
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Traiter chaque ville
    for (const city of CITIES_CONFIG) {
        await processCity(city);
    }

    // Générer le fichier de métadonnées
    await generateMetadataJson();

    // Fermer exiftool
    await exiftool.end();

    console.log('\n✨ Génération terminée!');
    console.log(`📊 ${CITIES_CONFIG.length} villes × 3 images = ${CITIES_CONFIG.length * 3} images générées`);
}

main().catch(console.error);
