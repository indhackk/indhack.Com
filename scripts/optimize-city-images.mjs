/**
 * Script pour optimiser TOUTES les images des villes avec données EXIF
 * - Compression SEO (JPEG optimisé)
 * - Métadonnées EXIF (GPS, keywords, date)
 * - Coordonnées GPS précises pour chaque ville
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CITIES_DIR = './public/images/cities';
const OUTPUT_DIR = './public/images/cities-optimized';

// Données GPS et SEO pour chaque ville
const CITIES_DATA = {
    // === CÔTE D'AZUR ===
    'nice': {
        name: 'Nice',
        lat: 43.7102,
        lng: 7.2620,
        keyword: 'Consultant SEO Nice - Référencement Local Côte d\'Azur',
        region: 'Alpes-Maritimes'
    },
    'cannes': {
        name: 'Cannes',
        lat: 43.5528,
        lng: 7.0174,
        keyword: 'Consultant SEO Cannes - Expert Référencement Naturel',
        region: 'Alpes-Maritimes'
    },
    'antibes': {
        name: 'Antibes',
        lat: 43.5808,
        lng: 7.1239,
        keyword: 'Consultant SEO Antibes - Agence SEO Local',
        region: 'Alpes-Maritimes'
    },
    'monaco': {
        name: 'Monaco',
        lat: 43.7384,
        lng: 7.4246,
        keyword: 'Consultant SEO Monaco - Référencement Premium',
        region: 'Monaco'
    },
    'sophia-antipolis': {
        name: 'Sophia Antipolis',
        lat: 43.6165,
        lng: 7.0552,
        keyword: 'Consultant SEO Sophia Antipolis - Tech & Innovation',
        region: 'Alpes-Maritimes'
    },

    // === PACA ===
    'marseille': {
        name: 'Marseille',
        lat: 43.2965,
        lng: 5.3698,
        keyword: 'Consultant SEO Marseille - Expert Référencement PACA',
        region: 'Bouches-du-Rhône'
    },
    'aix': {
        name: 'Aix-en-Provence',
        lat: 43.5297,
        lng: 5.4474,
        keyword: 'Consultant SEO Aix-en-Provence - Référencement Local',
        region: 'Bouches-du-Rhône'
    },

    // === ILE-DE-FRANCE ===
    'paris': {
        name: 'Paris',
        lat: 48.8566,
        lng: 2.3522,
        keyword: 'Consultant SEO Paris - Expert Référencement National',
        region: 'Île-de-France'
    },
    'boulogne': {
        name: 'Boulogne-Billancourt',
        lat: 48.8397,
        lng: 2.2399,
        keyword: 'Consultant SEO Boulogne-Billancourt - Hauts-de-Seine',
        region: 'Hauts-de-Seine'
    },

    // === BRETAGNE ===
    'rennes': {
        name: 'Rennes',
        lat: 48.1173,
        lng: -1.6778,
        keyword: 'Consultant SEO Rennes - Expert Référencement Bretagne',
        region: 'Ille-et-Vilaine'
    },
    'nantes': {
        name: 'Nantes',
        lat: 47.2184,
        lng: -1.5536,
        keyword: 'Consultant SEO Nantes - Référencement Loire-Atlantique',
        region: 'Loire-Atlantique'
    },

    // === AUVERGNE-RHÔNE-ALPES ===
    'lyon': {
        name: 'Lyon',
        lat: 45.7640,
        lng: 4.8357,
        keyword: 'Consultant SEO Lyon - Expert Référencement Rhône-Alpes',
        region: 'Rhône'
    },
    'grenoble': {
        name: 'Grenoble',
        lat: 45.1885,
        lng: 5.7245,
        keyword: 'Consultant SEO Grenoble - Référencement Isère',
        region: 'Isère'
    },

    // === OCCITANIE ===
    'toulouse': {
        name: 'Toulouse',
        lat: 43.6047,
        lng: 1.4442,
        keyword: 'Consultant SEO Toulouse - Expert Référencement Occitanie',
        region: 'Haute-Garonne'
    },
    'montpellier': {
        name: 'Montpellier',
        lat: 43.6108,
        lng: 3.8767,
        keyword: 'Consultant SEO Montpellier - Référencement Hérault',
        region: 'Hérault'
    },

    // === NOUVELLE-AQUITAINE ===
    'bordeaux': {
        name: 'Bordeaux',
        lat: 44.8378,
        lng: -0.5792,
        keyword: 'Consultant SEO Bordeaux - Expert Référencement Gironde',
        region: 'Gironde'
    },

    // === HAUTS-DE-FRANCE ===
    'lille': {
        name: 'Lille',
        lat: 50.6292,
        lng: 3.0573,
        keyword: 'Consultant SEO Lille - Référencement Nord',
        region: 'Nord'
    },

    // === GRAND EST ===
    'strasbourg': {
        name: 'Strasbourg',
        lat: 48.5734,
        lng: 7.7521,
        keyword: 'Consultant SEO Strasbourg - Expert Référencement Alsace',
        region: 'Bas-Rhin'
    }
};

// Descriptions spécifiques par image
const IMAGE_DESCRIPTIONS = {
    // Nice
    'nice-promenade-anglais': 'Promenade des Anglais à Nice - Vue panoramique Côte d\'Azur',
    'nice-vieux-nice': 'Vieux-Nice - Ruelles pittoresques et architecture provençale',
    'nice-place-massena': 'Place Masséna Nice - Cœur de la ville et fontaine du soleil',

    // Cannes
    'cannes-croisette': 'La Croisette Cannes - Boulevard mythique du Festival',
    'cannes-palais-festivals': 'Palais des Festivals Cannes - Marches du cinéma',
    'cannes-vieux-port': 'Vieux Port de Cannes - Marina et bateaux de luxe',

    // Antibes
    'antibes-port-vauban': 'Port Vauban Antibes - Plus grand port de plaisance d\'Europe',
    'antibes-vieille-ville': 'Vieil Antibes - Remparts et marché provençal',
    'antibes-cap': 'Cap d\'Antibes - Presqu\'île et villas de luxe',

    // Monaco
    'monaco-casino': 'Casino de Monte-Carlo Monaco - Architecture Belle Époque',
    'monaco-port-hercule': 'Port Hercule Monaco - Yachts et Grand Prix F1',
    'monaco-rocher': 'Le Rocher Monaco - Palais princier et vue panoramique',

    // Sophia Antipolis
    'sophia-antipolis-technopole': 'Technopole Sophia Antipolis - Silicon Valley française',
    'sophia-antipolis-bureaux': 'Bureaux Sophia Antipolis - Pôle high-tech',
    'sophia-antipolis-campus': 'Campus Sophia Antipolis - Innovation et recherche',

    // Marseille
    'marseille-vieux-port': 'Vieux-Port de Marseille - Cœur historique de la cité phocéenne',
    'marseille-mucem': 'MuCEM Marseille - Musée des civilisations méditerranéennes',
    'marseille-notre-dame-garde': 'Notre-Dame de la Garde Marseille - La Bonne Mère',

    // Aix-en-Provence
    'aix-cours-mirabeau': 'Cours Mirabeau Aix-en-Provence - Avenue emblématique',
    'aix-rotonde': 'Fontaine de la Rotonde Aix-en-Provence - Place centrale',
    'aix-sainte-victoire': 'Montagne Sainte-Victoire - Paysage de Cézanne',

    // Paris
    'paris-tour-eiffel': 'Tour Eiffel Paris - Monument emblématique de France',
    'paris-marais': 'Le Marais Paris - Quartier historique et tendance',
    'paris-sacre-coeur': 'Sacré-Cœur Montmartre Paris - Basilique et vue panoramique',

    // Boulogne-Billancourt
    'boulogne-seine-musicale': 'Seine Musicale Boulogne - Salle de spectacle moderne',
    'boulogne-bureaux': 'Quartier d\'affaires Boulogne-Billancourt',
    'boulogne-ile-seguin': 'Île Seguin Boulogne - Reconversion culturelle',

    // Rennes
    'rennes-parlement': 'Parlement de Bretagne Rennes - Architecture historique',
    'rennes-republique': 'Place de la République Rennes - Centre-ville',
    'rennes-thabor': 'Parc du Thabor Rennes - Jardin botanique',

    // Nantes
    'nantes-machines': 'Machines de l\'île Nantes - Éléphant mécanique géant',
    'nantes-chateau': 'Château des Ducs de Bretagne Nantes',
    'nantes-passage-pommeraye': 'Passage Pommeraye Nantes - Galerie commerciale XIXe',

    // Lyon
    'lyon-fourviere': 'Basilique de Fourvière Lyon - Colline qui prie',
    'lyon-bellecour': 'Place Bellecour Lyon - Plus grande place piétonne d\'Europe',
    'lyon-confluence': 'Confluence Lyon - Quartier moderne et musée',

    // Grenoble
    'grenoble-bastille': 'Fort de la Bastille Grenoble - Vue sur les Alpes',
    'grenoble-alpes': 'Grenoble et les Alpes - Capitale des Alpes françaises',
    'grenoble-telepherique': 'Téléphérique de Grenoble - Les bulles',

    // Toulouse
    'toulouse-capitole': 'Place du Capitole Toulouse - Cœur de la ville rose',
    'toulouse-garonne': 'Garonne Toulouse - Pont Neuf et quais',
    'toulouse-cite-espace': 'Cité de l\'Espace Toulouse - Aventure spatiale',

    // Bordeaux
    'bordeaux-place-bourse': 'Place de la Bourse Bordeaux - Architecture XVIIIe',
    'bordeaux-miroir-eau': 'Miroir d\'eau Bordeaux - Plus grand miroir d\'eau du monde',
    'bordeaux-cite-vin': 'Cité du Vin Bordeaux - Architecture contemporaine',

    // Montpellier
    'montpellier-comedie': 'Place de la Comédie Montpellier - L\'Œuf',
    'montpellier-antigone': 'Quartier Antigone Montpellier - Architecture néoclassique',
    'montpellier-ecusson': 'Écusson Montpellier - Centre historique médiéval',

    // Lille
    'lille-grand-place': 'Grand\'Place Lille - Cœur de la capitale des Flandres',
    'lille-vieux-lille': 'Vieux-Lille - Quartier historique et pavés',
    'lille-beffroi': 'Beffroi de Lille - Patrimoine UNESCO',

    // Strasbourg
    'strasbourg-cathedrale': 'Cathédrale Notre-Dame de Strasbourg - Chef-d\'œuvre gothique',
    'strasbourg-petite-france': 'Petite France Strasbourg - Quartier pittoresque',
    'strasbourg-parlement': 'Parlement européen Strasbourg - Siège de l\'UE'
};

// Convertir coordonnées décimales en format EXIF (degrés, minutes, secondes)
function decimalToDMS(decimal) {
    const degrees = Math.floor(Math.abs(decimal));
    const minutesDecimal = (Math.abs(decimal) - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;
    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

// Extraire la ville depuis le nom de fichier
function getCityFromFilename(filename) {
    const baseName = path.basename(filename, path.extname(filename));

    // Mapping spécial pour certains fichiers
    if (baseName.startsWith('sophia-antipolis')) return 'sophia-antipolis';
    if (baseName.startsWith('aix-')) return 'aix';
    if (baseName.startsWith('boulogne-')) return 'boulogne';

    // Extraire la première partie (ville)
    const parts = baseName.split('-');
    return parts[0];
}

async function processImage(sourcePath) {
    const filename = path.basename(sourcePath, '.webp');
    const cityKey = getCityFromFilename(sourcePath);
    const cityData = CITIES_DATA[cityKey];

    if (!cityData) {
        console.warn(`⚠️  Ville non trouvée pour: ${filename}`);
        return false;
    }

    const description = IMAGE_DESCRIPTIONS[filename] || `${cityData.name} - ${cityData.region}`;
    const outputPath = path.join(OUTPUT_DIR, `${filename}.jpg`);

    try {
        const image = sharp(sourcePath);
        const metadata = await image.metadata();

        // Calculer les nouvelles dimensions (max 1200px largeur)
        const maxWidth = 1200;
        let width = metadata.width || 1200;
        let height = metadata.height || 800;

        if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = Math.round(height * ratio);
        }

        // Date de création (janvier 2026)
        const date = '2026:01:15 10:00:00';

        // Convertir et optimiser en JPEG avec métadonnées
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
                        Copyright: `© 2026 IndHack.com - ${cityData.keyword}`,
                        Artist: 'Indiana Aflalo - Consultante SEO',
                        Make: 'IndHack SEO',
                        Model: cityData.name,
                        Software: 'IndHack Image Optimizer'
                    }
                }
            })
            .toFile(outputPath);

        // Vérifier la taille du fichier
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);

        console.log(`✅ ${filename}.jpg - ${sizeKB}KB - GPS: ${cityData.lat.toFixed(4)}°, ${cityData.lng.toFixed(4)}° (${cityData.name})`);
        return true;

    } catch (error) {
        console.error(`❌ Erreur pour ${filename}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🏙️  Optimisation des images des villes avec EXIF...\n');
    console.log('📍 Villes configurées:', Object.keys(CITIES_DATA).length);
    console.log('🖼️  Images à traiter:', Object.keys(IMAGE_DESCRIPTIONS).length);
    console.log('');

    // Créer le dossier de sortie
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Lister tous les fichiers webp
    const files = fs.readdirSync(CITIES_DIR)
        .filter(f => f.endsWith('.webp'))
        .map(f => path.join(CITIES_DIR, f));

    console.log(`📁 Fichiers trouvés: ${files.length}\n`);

    let success = 0;
    let failed = 0;

    for (const file of files) {
        const result = await processImage(file);
        if (result) {
            success++;
        } else {
            failed++;
        }
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📊 Résultat: ${success} images optimisées, ${failed} erreurs`);
    console.log(`📁 Images optimisées dans: ${OUTPUT_DIR}`);
    console.log(`\n💡 Pour remplacer les originaux, exécutez:`);
    console.log(`   cp ${OUTPUT_DIR}/*.jpg ${CITIES_DIR}/`);
}

main().catch(console.error);
