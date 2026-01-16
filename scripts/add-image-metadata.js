#!/usr/bin/env node
/**
 * Script pour ajouter des métadonnées EXIF/IPTC/XMP aux images pour le SEO géolocalisé
 * Usage: node scripts/add-image-metadata.js
 */

const fs = require('fs');
const path = require('path');

// Configuration des images de Nice avec leurs métadonnées SEO
const imageConfigs = [
    {
        file: 'nice-seo-hero.png',
        metadata: {
            title: 'Audit SEO Nice - Vue aérienne Promenade des Anglais',
            description: 'Consultante SEO freelance à Nice - Audit technique et référencement naturel sur la Côte d\'Azur',
            keywords: ['audit seo nice', 'consultant seo nice', 'audit gratuit seo nice', 'référencement nice', 'seo nice 06'],
            location: {
                city: 'Nice',
                region: 'Provence-Alpes-Côte d\'Azur',
                country: 'France',
                lat: 43.7102,
                lng: 7.2620
            }
        }
    },
    {
        file: 'nice-workspace.png',
        metadata: {
            title: 'Consultant SEO Nice - Espace de travail Vieux Nice',
            description: 'Expertise SEO freelance à Nice - Stratégie de référencement naturel et audit technique',
            keywords: ['consultant seo nice', 'seo freelance nice', 'expert seo nice', 'agence seo nice', 'référencement naturel nice'],
            location: {
                city: 'Nice',
                region: 'Provence-Alpes-Côte d\'Azur',
                country: 'France',
                lat: 43.6961,
                lng: 7.2756
            }
        }
    },
    {
        file: 'nice-data-flow.png',
        metadata: {
            title: 'Audit Gratuit SEO Nice - Stratégie digitale Hotel Negresco',
            description: 'Audit SEO gratuit à Nice - Analyse technique et optimisation du référencement Google',
            keywords: ['audit gratuit seo nice', 'audit seo nice', 'analyse seo nice', 'diagnostic seo nice', 'audit technique nice'],
            location: {
                city: 'Nice',
                region: 'Provence-Alpes-Côte d\'Azur',
                country: 'France',
                lat: 43.6945,
                lng: 7.2594
            }
        }
    }
];

// Créer un fichier JSON de métadonnées pour chaque image
// Ces métadonnées peuvent être utilisées par le sitemap et les balises meta
function generateMetadataFiles() {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    const metadataDir = path.join(__dirname, '..', 'public', 'images', 'metadata');

    // Créer le dossier metadata s'il n'existe pas
    if (!fs.existsSync(metadataDir)) {
        fs.mkdirSync(metadataDir, { recursive: true });
    }

    imageConfigs.forEach(config => {
        const imagePath = path.join(imagesDir, config.file);

        if (fs.existsSync(imagePath)) {
            // Créer le fichier de métadonnées JSON
            const metadataPath = path.join(metadataDir, `${path.basename(config.file, '.png')}.json`);

            const metadata = {
                ...config.metadata,
                fileName: config.file,
                filePath: `/images/${config.file}`,
                generatedAt: new Date().toISOString(),
                seo: {
                    alt: config.metadata.title,
                    title: config.metadata.title,
                    caption: config.metadata.description,
                    keywords: config.metadata.keywords.join(', ')
                },
                geo: {
                    latitude: config.metadata.location.lat,
                    longitude: config.metadata.location.lng,
                    city: config.metadata.location.city,
                    region: config.metadata.location.region,
                    country: config.metadata.location.country,
                    // Format pour Google Maps
                    googleMapsUrl: `https://www.google.com/maps?q=${config.metadata.location.lat},${config.metadata.location.lng}`
                }
            };

            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
            console.log(`✅ Métadonnées créées pour ${config.file}`);
        } else {
            console.log(`⚠️ Image non trouvée: ${config.file}`);
        }
    });

    // Générer un fichier d'index pour toutes les images
    const indexPath = path.join(metadataDir, 'index.json');
    const index = {
        generatedAt: new Date().toISOString(),
        images: imageConfigs.map(c => ({
            file: c.file,
            path: `/images/${c.file}`,
            metadataPath: `/images/metadata/${path.basename(c.file, '.png')}.json`,
            keywords: c.metadata.keywords,
            location: c.metadata.location.city
        }))
    };
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`\n📋 Index des images créé: ${indexPath}`);
}

// Exécuter
console.log('🖼️  Génération des métadonnées SEO pour les images...\n');
generateMetadataFiles();
console.log('\n✨ Terminé! Les métadonnées sont prêtes pour le SEO géolocalisé.');
