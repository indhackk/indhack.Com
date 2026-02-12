/**
 * Script pour ajouter les métadonnées EXIF aux images des villes
 * - Coordonnées GPS
 * - Mots-clés SEO
 * - Date de création
 * - Copyright
 */

const fs = require('fs');
const path = require('path');
const piexif = require('piexifjs');

// Données des villes avec coordonnées GPS et mots-clés
const CITIES_METADATA = {
    'nice': {
        lat: 43.7102, lng: 7.2620,
        keywords: ['SEO Nice', 'consultant SEO Nice', 'référencement Nice', 'Côte d\'Azur', 'Alpes-Maritimes'],
        images: {
            'nice-promenade-anglais': ['Promenade des Anglais', 'Nice seafront', 'SEO Nice 06'],
            'nice-vieux-nice': ['Vieux-Nice', 'old town Nice', 'référencement local Nice'],
            'nice-place-massena': ['Place Masséna Nice', 'centre-ville Nice', 'SEO local 06']
        }
    },
    'cannes': {
        lat: 43.5528, lng: 7.0174,
        keywords: ['SEO Cannes', 'consultant SEO Cannes', 'référencement Cannes', 'La Croisette', 'Festival'],
        images: {
            'cannes-croisette': ['La Croisette Cannes', 'Cannes seafront', 'SEO luxe Cannes'],
            'cannes-palais-festivals': ['Palais des Festivals', 'Festival de Cannes', 'SEO événementiel'],
            'cannes-vieux-port': ['Vieux Port Cannes', 'Le Suquet', 'SEO local Cannes']
        }
    },
    'antibes': {
        lat: 43.5804, lng: 7.1251,
        keywords: ['SEO Antibes', 'consultant SEO Antibes', 'référencement Antibes', 'Juan-les-Pins', 'yachting'],
        images: {
            'antibes-port-vauban': ['Port Vauban Antibes', 'plus grand port Europe', 'SEO yachting'],
            'antibes-vieille-ville': ['Vieille ville Antibes', 'remparts Antibes', 'SEO local Antibes'],
            'antibes-cap': ['Cap d\'Antibes', 'presqu\'île Antibes', 'SEO luxe Antibes']
        }
    },
    'monaco': {
        lat: 43.7384, lng: 7.4246,
        keywords: ['SEO Monaco', 'consultant SEO Monaco', 'référencement Monaco', 'Monte-Carlo', 'Principauté'],
        images: {
            'monaco-casino': ['Casino Monte-Carlo', 'Place du Casino', 'SEO luxe Monaco'],
            'monaco-port-hercule': ['Port Hercule Monaco', 'F1 Monaco', 'SEO Monaco 98'],
            'monaco-rocher': ['Rocher de Monaco', 'Palais Princier', 'SEO local Monaco']
        }
    },
    'sophia-antipolis': {
        lat: 43.6163, lng: 7.0557,
        keywords: ['SEO Sophia Antipolis', 'consultant SEO technopole', 'référencement startup', 'Silicon Valley Europe'],
        images: {
            'sophia-antipolis-technopole': ['Technopole Sophia Antipolis', 'parc tech', 'SEO B2B'],
            'sophia-antipolis-bureaux': ['Bureaux Sophia Antipolis', 'coworking tech', 'SEO startup'],
            'sophia-antipolis-campus': ['Campus Sophia Antipolis', 'innovation', 'SEO SaaS']
        }
    },
    'marseille': {
        lat: 43.2965, lng: 5.3698,
        keywords: ['SEO Marseille', 'consultant SEO Marseille', 'référencement Marseille', 'Vieux-Port', 'PACA'],
        images: {
            'marseille-vieux-port': ['Vieux-Port Marseille', 'port historique', 'SEO Marseille 13'],
            'marseille-mucem': ['MuCEM Marseille', 'musée civilisations', 'SEO culture Marseille'],
            'marseille-notre-dame-garde': ['Notre-Dame de la Garde', 'Bonne Mère', 'SEO local Marseille']
        }
    },
    'aix': {
        lat: 43.5297, lng: 5.4474,
        keywords: ['SEO Aix-en-Provence', 'consultant SEO Aix', 'référencement Aix', 'Cours Mirabeau', 'Provence'],
        images: {
            'aix-cours-mirabeau': ['Cours Mirabeau Aix', 'centre historique', 'SEO Aix 13'],
            'aix-rotonde': ['Fontaine de la Rotonde', 'place Aix', 'SEO local Aix'],
            'aix-sainte-victoire': ['Montagne Sainte-Victoire', 'Cézanne', 'SEO Provence']
        }
    },
    'lyon': {
        lat: 45.7640, lng: 4.8357,
        keywords: ['SEO Lyon', 'consultant SEO Lyon', 'référencement Lyon', 'Rhône-Alpes', 'gastronomie'],
        images: {
            'lyon-bellecour': ['Place Bellecour Lyon', 'plus grande place Europe', 'SEO Lyon 69'],
            'lyon-fourviere': ['Fourvière Lyon', 'basilique', 'SEO local Lyon'],
            'lyon-confluence': ['Confluence Lyon', 'quartier moderne', 'SEO innovation Lyon']
        }
    },
    'bordeaux': {
        lat: 44.8378, lng: -0.5792,
        keywords: ['SEO Bordeaux', 'consultant SEO Bordeaux', 'référencement Bordeaux', 'Gironde', 'vin'],
        images: {
            'bordeaux-place-bourse': ['Place de la Bourse Bordeaux', 'miroir d\'eau', 'SEO Bordeaux 33'],
            'bordeaux-miroir-eau': ['Miroir d\'eau Bordeaux', 'quais', 'SEO local Bordeaux'],
            'bordeaux-cite-vin': ['Cité du Vin Bordeaux', 'oenotourisme', 'SEO tourisme Bordeaux']
        }
    },
    'toulouse': {
        lat: 43.6047, lng: 1.4442,
        keywords: ['SEO Toulouse', 'consultant SEO Toulouse', 'référencement Toulouse', 'Ville Rose', 'aéronautique'],
        images: {
            'toulouse-capitole': ['Place du Capitole Toulouse', 'centre historique', 'SEO Toulouse 31'],
            'toulouse-garonne': ['Garonne Toulouse', 'Pont-Neuf', 'SEO local Toulouse'],
            'toulouse-cite-espace': ['Cité de l\'Espace', 'aérospatial', 'SEO tech Toulouse']
        }
    },
    'montpellier': {
        lat: 43.6108, lng: 3.8767,
        keywords: ['SEO Montpellier', 'consultant SEO Montpellier', 'référencement Montpellier', 'Hérault', 'Méditerranée'],
        images: {
            'montpellier-comedie': ['Place de la Comédie', 'Oeuf Montpellier', 'SEO Montpellier 34'],
            'montpellier-ecusson': ['Écusson Montpellier', 'centre historique', 'SEO local Montpellier'],
            'montpellier-antigone': ['Antigone Montpellier', 'quartier moderne', 'SEO innovation Montpellier']
        }
    },
    'strasbourg': {
        lat: 48.5734, lng: 7.7521,
        keywords: ['SEO Strasbourg', 'consultant SEO Strasbourg', 'référencement Strasbourg', 'Alsace', 'Europe'],
        images: {
            'strasbourg-cathedrale': ['Cathédrale Strasbourg', 'gothique', 'SEO Strasbourg 67'],
            'strasbourg-petite-france': ['Petite France Strasbourg', 'quartier historique', 'SEO local Strasbourg'],
            'strasbourg-parlement': ['Parlement Européen', 'institutions', 'SEO Europe Strasbourg']
        }
    },
    'nantes': {
        lat: 47.2184, lng: -1.5536,
        keywords: ['SEO Nantes', 'consultant SEO Nantes', 'référencement Nantes', 'Loire-Atlantique', 'Ouest'],
        images: {
            'nantes-chateau': ['Château des Ducs Nantes', 'histoire Bretagne', 'SEO Nantes 44'],
            'nantes-machines': ['Machines de l\'Île', 'éléphant mécanique', 'SEO créatif Nantes'],
            'nantes-passage-pommeraye': ['Passage Pommeraye', 'galerie 19e', 'SEO local Nantes']
        }
    },
    'rennes': {
        lat: 48.1173, lng: -1.6778,
        keywords: ['SEO Rennes', 'consultant SEO Rennes', 'référencement Rennes', 'Bretagne', 'tech'],
        images: {
            'rennes-parlement': ['Parlement de Bretagne', 'justice Rennes', 'SEO Rennes 35'],
            'rennes-republique': ['Place de la République', 'centre Rennes', 'SEO local Rennes'],
            'rennes-thabor': ['Parc du Thabor', 'jardin botanique', 'SEO nature Rennes']
        }
    },
    'lille': {
        lat: 50.6292, lng: 3.0573,
        keywords: ['SEO Lille', 'consultant SEO Lille', 'référencement Lille', 'Nord', 'Hauts-de-France'],
        images: {
            'lille-grand-place': ['Grand\'Place Lille', 'Vieille Bourse', 'SEO Lille 59'],
            'lille-vieux-lille': ['Vieux-Lille', 'quartier historique', 'SEO local Lille'],
            'lille-beffroi': ['Beffroi Lille', 'UNESCO', 'SEO patrimoine Lille']
        }
    },
    'grenoble': {
        lat: 45.1885, lng: 5.7245,
        keywords: ['SEO Grenoble', 'consultant SEO Grenoble', 'référencement Grenoble', 'Isère', 'Alpes'],
        images: {
            'grenoble-bastille': ['Bastille Grenoble', 'téléphérique', 'SEO Grenoble 38'],
            'grenoble-telepherique': ['Téléphérique Grenoble', 'bulles', 'SEO local Grenoble'],
            'grenoble-alpes': ['Alpes Grenoble', 'montagnes', 'SEO outdoor Grenoble']
        }
    },
    'paris': {
        lat: 48.8566, lng: 2.3522,
        keywords: ['SEO Paris', 'consultant SEO Paris', 'référencement Paris', 'Île-de-France', 'capitale'],
        images: {
            'paris-tour-eiffel': ['Tour Eiffel Paris', 'monument iconique', 'SEO Paris 75'],
            'paris-sacre-coeur': ['Sacré-Coeur Montmartre', 'basilique Paris', 'SEO local Paris'],
            'paris-marais': ['Le Marais Paris', 'quartier historique', 'SEO tendance Paris']
        }
    },
    'boulogne': {
        lat: 48.8352, lng: 2.2407,
        keywords: ['SEO Boulogne-Billancourt', 'consultant SEO Boulogne', 'référencement 92', 'Hauts-de-Seine', 'médias'],
        images: {
            'boulogne-seine-musicale': ['Seine Musicale', 'île Seguin', 'SEO Boulogne 92'],
            'boulogne-ile-seguin': ['Île Seguin', 'Renault', 'SEO local Boulogne'],
            'boulogne-bureaux': ['Bureaux Boulogne', 'business district', 'SEO entreprise 92']
        }
    }
};

// Convertir coordonnées décimales en format EXIF (degrés, minutes, secondes)
function decimalToDMS(decimal) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;

    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

// Créer les données EXIF pour une image
function createExifData(cityKey, imageName, cityData) {
    const imageKeywords = cityData.images[imageName] || [];
    const allKeywords = [...cityData.keywords, ...imageKeywords].join(', ');

    const now = new Date();
    const dateString = now.toISOString().replace(/[-:]/g, '').split('.')[0];

    const zeroth = {};
    const exif = {};
    const gps = {};

    // Informations de base
    zeroth[piexif.ImageIFD.Make] = "INDHACK SEO";
    zeroth[piexif.ImageIFD.Model] = "Professional SEO Photography";
    zeroth[piexif.ImageIFD.Software] = "INDHACK - Consultante SEO";
    zeroth[piexif.ImageIFD.Copyright] = `Copyright 2024-2026 INDHACK. ${allKeywords}`;
    zeroth[piexif.ImageIFD.ImageDescription] = allKeywords;
    zeroth[piexif.ImageIFD.Artist] = "INDHACK - Consultante SEO Freelance";

    // Date
    exif[piexif.ExifIFD.DateTimeOriginal] = "2024:01:15 10:30:00";
    exif[piexif.ExifIFD.DateTimeDigitized] = "2024:01:15 10:30:00";

    // GPS
    const latRef = cityData.lat >= 0 ? 'N' : 'S';
    const lngRef = cityData.lng >= 0 ? 'E' : 'W';

    gps[piexif.GPSIFD.GPSLatitudeRef] = latRef;
    gps[piexif.GPSIFD.GPSLatitude] = decimalToDMS(cityData.lat);
    gps[piexif.GPSIFD.GPSLongitudeRef] = lngRef;
    gps[piexif.GPSIFD.GPSLongitude] = decimalToDMS(cityData.lng);
    gps[piexif.GPSIFD.GPSAltitude] = [10, 1];
    gps[piexif.GPSIFD.GPSAltitudeRef] = 0;

    return { "0th": zeroth, "Exif": exif, "GPS": gps };
}

// Ajouter EXIF à une image JPEG
function addExifToJpeg(inputPath, outputPath, exifData) {
    try {
        const jpeg = fs.readFileSync(inputPath);
        const data = jpeg.toString('binary');

        const exifBytes = piexif.dump(exifData);

        // Essayer d'insérer les EXIF
        let newData;
        try {
            // Si l'image a déjà des EXIF, les supprimer d'abord
            const removed = piexif.remove(data);
            newData = piexif.insert(exifBytes, removed);
        } catch (e) {
            // Sinon, insérer directement
            newData = piexif.insert(exifBytes, data);
        }

        const newJpeg = Buffer.from(newData, 'binary');
        fs.writeFileSync(outputPath, newJpeg);

        return true;
    } catch (error) {
        console.error(`Erreur pour ${inputPath}:`, error.message);
        return false;
    }
}

// Fonction principale
async function main() {
    const imagesDir = path.join(__dirname, '../public/images/cities');
    const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

    console.log(`\n🖼️  AJOUT MÉTADONNÉES EXIF - ${files.length} images JPG\n`);
    console.log('=' .repeat(60));

    let success = 0;
    let failed = 0;
    const metadata = {};

    for (const file of files) {
        const baseName = file.replace('.jpg', '');

        // Trouver la ville correspondante
        let cityKey = null;
        let cityData = null;

        for (const [key, data] of Object.entries(CITIES_METADATA)) {
            if (data.images && data.images[baseName]) {
                cityKey = key;
                cityData = data;
                break;
            }
        }

        if (!cityData) {
            console.log(`⚠️  ${file} - Pas de métadonnées définies`);
            failed++;
            continue;
        }

        const inputPath = path.join(imagesDir, file);
        const exifData = createExifData(cityKey, baseName, cityData);

        if (addExifToJpeg(inputPath, inputPath, exifData)) {
            const imageKeywords = cityData.images[baseName] || [];
            console.log(`✅ ${file}`);
            console.log(`   📍 GPS: ${cityData.lat}, ${cityData.lng}`);
            console.log(`   🏷️  ${imageKeywords.join(', ')}`);

            metadata[file] = {
                gps: { lat: cityData.lat, lng: cityData.lng },
                keywords: [...cityData.keywords, ...imageKeywords],
                date: "2024-01-15",
                copyright: "INDHACK"
            };

            success++;
        } else {
            failed++;
        }
    }

    // Sauvegarder le fichier metadata.json
    const metadataPath = path.join(imagesDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    console.log('\n' + '=' .repeat(60));
    console.log(`\n📊 RÉSULTAT:`);
    console.log(`   ✅ Succès: ${success}`);
    console.log(`   ❌ Échecs: ${failed}`);
    console.log(`   📄 metadata.json généré\n`);
}

main().catch(console.error);
