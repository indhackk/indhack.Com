/**
 * Script pour optimiser les images du blog avec données EXIF
 * - Compression SEO
 * - Métadonnées EXIF (GPS pour articles locaux, keywords, date)
 * - Conversion en JPEG optimisé
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BLOG_IMAGES_DIR = './public/images/blog';

// Configuration des images par article
const BLOG_IMAGES_CONFIG = [
    {
        slug: 'seo-local-nice',
        source: './public/images/cities/nice-promenade-anglais.jpg',
        output: 'seo-local-nice.jpg',
        keyword: 'SEO Local Nice - Consultant SEO Côte d\'Azur',
        description: 'Vue panoramique de Nice, Promenade des Anglais - SEO Local Nice',
        date: '2026:01:20 10:00:00',
        // GPS Nice: 43.7102° N, 7.2620° E
        gps: {
            latitude: 43.7102,
            longitude: 7.2620,
            latitudeRef: 'N',
            longitudeRef: 'E'
        }
    },
    {
        slug: 'pourquoi-consultant-seo',
        source: './public/images/partnership.png',
        output: 'pourquoi-consultant-seo.jpg',
        keyword: 'Consultant SEO - Expert Référencement Naturel',
        description: 'Partenariat stratégique avec un consultant SEO professionnel',
        date: '2026:02:04 09:00:00',
        gps: null
    },
    {
        slug: 'devenir-consultant-seo',
        source: './public/images/croissance-seo.png',
        output: 'devenir-consultant-seo.jpg',
        keyword: 'Devenir Consultant SEO - Carrière Référencement',
        description: 'Croissance de carrière dans le métier de consultant SEO',
        date: '2026:02:02 11:00:00',
        gps: null
    },
    {
        slug: 'salaire-consultant-seo',
        source: './public/images/seo-dashboard.png',
        output: 'salaire-consultant-seo.jpg',
        keyword: 'Salaire Consultant SEO - Rémunération Expert SEO',
        description: 'Dashboard de performance SEO et indicateurs salariaux',
        date: '2026:01:25 14:00:00',
        gps: null
    },
    {
        slug: 'importance-audit-seo',
        source: './public/images/audit-seo.png',
        output: 'importance-audit-seo.jpg',
        keyword: 'Audit SEO - Analyse Site Web',
        description: 'Audit SEO complet pour améliorer le référencement naturel',
        date: '2026:01:15 08:30:00',
        gps: null
    },
    {
        slug: 'comment-creer-site-visible-google',
        source: './public/images/creation-site.png',
        output: 'creer-site-visible-google.jpg',
        keyword: 'Créer Site Internet Visible Google - Référencement Site Web',
        description: 'Création de site web optimisé pour le référencement Google',
        date: '2026:02:04 15:00:00',
        gps: null
    },
    {
        slug: 'quelle-formation-seo',
        source: './public/images/ai-brain.png',
        output: 'formation-seo.jpg',
        keyword: 'Formation SEO - Apprendre le Référencement Naturel',
        description: 'Formation SEO professionnelle et certification référencement',
        date: '2026:02:03 10:30:00',
        gps: null
    },
    {
        slug: 'missions-consultant-seo',
        source: './public/images/seo-dashboard.png',
        output: 'missions-consultant-seo.jpg',
        keyword: 'Missions Consultant SEO - Travail Expert Référencement',
        description: 'Les missions principales d\'un consultant SEO professionnel',
        date: '2026:02:01 16:00:00',
        gps: null
    },
    {
        slug: 'visibilite-ia-geo',
        source: './public/images/ai-brain.png',
        output: 'geo-ia-seo.jpg',
        keyword: 'GEO - Generative Engine Optimization - SEO IA',
        description: 'Optimisation pour les moteurs de recherche IA - ChatGPT Gemini',
        date: '2026:01:28 12:00:00',
        gps: null
    }
];

// Convertir coordonnées décimales en format EXIF (degrés, minutes, secondes)
function decimalToDMS(decimal) {
    const degrees = Math.floor(Math.abs(decimal));
    const minutesDecimal = (Math.abs(decimal) - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;

    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

async function processImage(config) {
    const { source, output, keyword, description, date, gps } = config;
    const outputPath = path.join(BLOG_IMAGES_DIR, output);

    // Vérifier si le fichier source existe
    if (!fs.existsSync(source)) {
        console.warn(`⚠️  Source non trouvée: ${source}`);
        return false;
    }

    try {
        // Traiter l'image avec sharp
        const image = sharp(source);
        const metadata = await image.metadata();

        // Calculer les nouvelles dimensions (max 1200px largeur, ratio préservé)
        const maxWidth = 1200;
        let width = metadata.width;
        let height = metadata.height;

        if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = Math.round(height * ratio);
        }

        // Créer les métadonnées EXIF
        const exifData = {
            IFD0: {
                ImageDescription: description,
                Make: 'IndHack SEO',
                Model: 'Professional SEO Image',
                Software: 'IndHack Image Optimizer',
                Artist: 'Indiana Aflalo - Consultante SEO',
                Copyright: '© 2026 IndHack.com - Tous droits réservés'
            },
            Exif: {
                DateTimeOriginal: date,
                UserComment: keyword
            }
        };

        // Ajouter GPS si présent
        if (gps) {
            exifData.GPS = {
                GPSLatitudeRef: gps.latitudeRef,
                GPSLatitude: decimalToDMS(gps.latitude),
                GPSLongitudeRef: gps.longitudeRef,
                GPSLongitude: decimalToDMS(gps.longitude)
            };
        }

        // Convertir et optimiser en JPEG
        await image
            .resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 85,
                progressive: true,
                mozjpeg: true
            })
            .withMetadata({
                exif: {
                    IFD0: {
                        ImageDescription: description,
                        Copyright: '© 2026 IndHack.com'
                    }
                }
            })
            .toFile(outputPath);

        // Vérifier la taille du fichier
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);

        console.log(`✅ ${output} - ${sizeKB}KB (${width}x${height})${gps ? ' [GPS]' : ''}`);
        return true;

    } catch (error) {
        console.error(`❌ Erreur pour ${source}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🖼️  Optimisation des images du blog avec EXIF...\n');

    // Créer le dossier si nécessaire
    if (!fs.existsSync(BLOG_IMAGES_DIR)) {
        fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });
    }

    let success = 0;
    let failed = 0;

    for (const config of BLOG_IMAGES_CONFIG) {
        const result = await processImage(config);
        if (result) {
            success++;
        } else {
            failed++;
        }
    }

    console.log(`\n📊 Résultat: ${success} images optimisées, ${failed} erreurs`);
    console.log('\n📝 Nouvelles images dans:', BLOG_IMAGES_DIR);
}

main().catch(console.error);
