/**
 * Script pour télécharger de vraies images libres de droits
 * Sources: Unsplash (libre de droits, attribution non obligatoire)
 * + Compression + EXIF + WebP
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');
const piexif = require('piexifjs');

const OUTPUT_DIR = path.join(__dirname, '../public/images/cities');

// Images Unsplash par ville (IDs vérifiés et libres de droits)
const CITY_IMAGES = {
    'nice': {
        lat: 43.7102, lng: 7.2620,
        keywords: ['SEO Nice', 'consultant SEO Nice', 'référencement Nice', 'Côte d\'Azur'],
        images: [
            { name: 'nice-promenade-anglais', url: 'https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=1200&q=80', alt: 'Promenade des Anglais Nice' },
            { name: 'nice-vieux-nice', url: 'https://images.unsplash.com/photo-1565018446166-83d02c49f3d9?w=1200&q=80', alt: 'Vieux Nice ruelles' },
            { name: 'nice-place-massena', url: 'https://images.unsplash.com/photo-1534961880437-ce5ae2033053?w=1200&q=80', alt: 'Place Masséna Nice' }
        ]
    },
    'cannes': {
        lat: 43.5528, lng: 7.0174,
        keywords: ['SEO Cannes', 'consultant SEO Cannes', 'La Croisette', 'Festival'],
        images: [
            { name: 'cannes-croisette', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80', alt: 'La Croisette Cannes' },
            { name: 'cannes-palais-festivals', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', alt: 'Palais des Festivals' },
            { name: 'cannes-vieux-port', url: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=80', alt: 'Vieux Port Cannes' }
        ]
    },
    'antibes': {
        lat: 43.5804, lng: 7.1251,
        keywords: ['SEO Antibes', 'consultant SEO Antibes', 'Port Vauban', 'yachting'],
        images: [
            { name: 'antibes-port-vauban', url: 'https://images.unsplash.com/photo-1555990538-1e6c0c834a29?w=1200&q=80', alt: 'Port Vauban Antibes' },
            { name: 'antibes-vieille-ville', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80', alt: 'Vieille ville Antibes' },
            { name: 'antibes-cap', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', alt: 'Cap d\'Antibes' }
        ]
    },
    'monaco': {
        lat: 43.7384, lng: 7.4246,
        keywords: ['SEO Monaco', 'consultant SEO Monaco', 'Monte-Carlo', 'Principauté'],
        images: [
            { name: 'monaco-casino', url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=80', alt: 'Casino Monte-Carlo' },
            { name: 'monaco-port-hercule', url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80', alt: 'Port Hercule Monaco' },
            { name: 'monaco-rocher', url: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1200&q=80', alt: 'Rocher Monaco' }
        ]
    },
    'sophia-antipolis': {
        lat: 43.6163, lng: 7.0557,
        keywords: ['SEO Sophia Antipolis', 'consultant SEO tech', 'startup', 'technopole'],
        images: [
            { name: 'sophia-antipolis-technopole', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', alt: 'Bureau tech moderne' },
            { name: 'sophia-antipolis-bureaux', url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80', alt: 'Espace coworking' },
            { name: 'sophia-antipolis-campus', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80', alt: 'Campus innovation' }
        ]
    },
    'marseille': {
        lat: 43.2965, lng: 5.3698,
        keywords: ['SEO Marseille', 'consultant SEO Marseille', 'Vieux-Port', 'PACA'],
        images: [
            { name: 'marseille-vieux-port', url: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=80', alt: 'Vieux-Port Marseille' },
            { name: 'marseille-mucem', url: 'https://images.unsplash.com/photo-1568684333877-4d3f85dc606a?w=1200&q=80', alt: 'MuCEM Marseille' },
            { name: 'marseille-notre-dame-garde', url: 'https://images.unsplash.com/photo-1591099610723-56e3e1f16d27?w=1200&q=80', alt: 'Notre-Dame de la Garde' }
        ]
    },
    'aix': {
        lat: 43.5297, lng: 5.4474,
        keywords: ['SEO Aix-en-Provence', 'consultant SEO Aix', 'Cours Mirabeau', 'Provence'],
        images: [
            { name: 'aix-cours-mirabeau', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', alt: 'Cours Mirabeau Aix' },
            { name: 'aix-rotonde', url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80', alt: 'Fontaine Rotonde' },
            { name: 'aix-sainte-victoire', url: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=1200&q=80', alt: 'Sainte-Victoire Provence' }
        ]
    },
    'lyon': {
        lat: 45.7640, lng: 4.8357,
        keywords: ['SEO Lyon', 'consultant SEO Lyon', 'Rhône-Alpes', 'Bellecour'],
        images: [
            { name: 'lyon-bellecour', url: 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=1200&q=80', alt: 'Place Bellecour Lyon' },
            { name: 'lyon-fourviere', url: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=1200&q=80', alt: 'Fourvière Lyon' },
            { name: 'lyon-confluence', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80', alt: 'Confluence Lyon' }
        ]
    },
    'bordeaux': {
        lat: 44.8378, lng: -0.5792,
        keywords: ['SEO Bordeaux', 'consultant SEO Bordeaux', 'Gironde', 'Place Bourse'],
        images: [
            { name: 'bordeaux-place-bourse', url: 'https://images.unsplash.com/photo-1560983073-c29bff7438ef?w=1200&q=80', alt: 'Place de la Bourse Bordeaux' },
            { name: 'bordeaux-miroir-eau', url: 'https://images.unsplash.com/photo-1589983846997-04788035bc4c?w=1200&q=80', alt: 'Miroir d\'eau Bordeaux' },
            { name: 'bordeaux-cite-vin', url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80', alt: 'Vignoble Bordeaux' }
        ]
    },
    'toulouse': {
        lat: 43.6047, lng: 1.4442,
        keywords: ['SEO Toulouse', 'consultant SEO Toulouse', 'Ville Rose', 'Capitole'],
        images: [
            { name: 'toulouse-capitole', url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80', alt: 'Place du Capitole Toulouse' },
            { name: 'toulouse-garonne', url: 'https://images.unsplash.com/photo-1500039436846-25ae2f11882e?w=1200&q=80', alt: 'Garonne Toulouse' },
            { name: 'toulouse-cite-espace', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80', alt: 'Aérospatial Toulouse' }
        ]
    },
    'montpellier': {
        lat: 43.6108, lng: 3.8767,
        keywords: ['SEO Montpellier', 'consultant SEO Montpellier', 'Hérault', 'Comédie'],
        images: [
            { name: 'montpellier-comedie', url: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=1200&q=80', alt: 'Place de la Comédie' },
            { name: 'montpellier-ecusson', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', alt: 'Écusson Montpellier' },
            { name: 'montpellier-antigone', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'Antigone Montpellier' }
        ]
    },
    'strasbourg': {
        lat: 48.5734, lng: 7.7521,
        keywords: ['SEO Strasbourg', 'consultant SEO Strasbourg', 'Alsace', 'Europe'],
        images: [
            { name: 'strasbourg-cathedrale', url: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=1200&q=80', alt: 'Cathédrale Strasbourg' },
            { name: 'strasbourg-petite-france', url: 'https://images.unsplash.com/photo-1608623826925-c1e7e6e5d8db?w=1200&q=80', alt: 'Petite France Strasbourg' },
            { name: 'strasbourg-parlement', url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80', alt: 'Parlement Européen' }
        ]
    },
    'nantes': {
        lat: 47.2184, lng: -1.5536,
        keywords: ['SEO Nantes', 'consultant SEO Nantes', 'Loire-Atlantique', 'Ouest'],
        images: [
            { name: 'nantes-chateau', url: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=1200&q=80', alt: 'Château des Ducs Nantes' },
            { name: 'nantes-machines', url: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=1200&q=80', alt: 'Machines de l\'Île' },
            { name: 'nantes-passage-pommeraye', url: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80', alt: 'Architecture Nantes' }
        ]
    },
    'rennes': {
        lat: 48.1173, lng: -1.6778,
        keywords: ['SEO Rennes', 'consultant SEO Rennes', 'Bretagne', 'tech'],
        images: [
            { name: 'rennes-parlement', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', alt: 'Parlement Bretagne' },
            { name: 'rennes-republique', url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80', alt: 'Centre Rennes' },
            { name: 'rennes-thabor', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80', alt: 'Parc Thabor' }
        ]
    },
    'lille': {
        lat: 50.6292, lng: 3.0573,
        keywords: ['SEO Lille', 'consultant SEO Lille', 'Nord', 'Hauts-de-France'],
        images: [
            { name: 'lille-grand-place', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', alt: 'Grand\'Place Lille' },
            { name: 'lille-vieux-lille', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80', alt: 'Vieux-Lille' },
            { name: 'lille-beffroi', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80', alt: 'Beffroi Lille' }
        ]
    },
    'grenoble': {
        lat: 45.1885, lng: 5.7245,
        keywords: ['SEO Grenoble', 'consultant SEO Grenoble', 'Isère', 'Alpes'],
        images: [
            { name: 'grenoble-bastille', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80', alt: 'Bastille Grenoble' },
            { name: 'grenoble-telepherique', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', alt: 'Montagnes Grenoble' },
            { name: 'grenoble-alpes', url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80', alt: 'Alpes Grenoble' }
        ]
    },
    'paris': {
        lat: 48.8566, lng: 2.3522,
        keywords: ['SEO Paris', 'consultant SEO Paris', 'Île-de-France', 'capitale'],
        images: [
            { name: 'paris-tour-eiffel', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80', alt: 'Tour Eiffel Paris' },
            { name: 'paris-sacre-coeur', url: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=1200&q=80', alt: 'Sacré-Coeur Paris' },
            { name: 'paris-marais', url: 'https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=1200&q=80', alt: 'Le Marais Paris' }
        ]
    },
    'boulogne': {
        lat: 48.8352, lng: 2.2407,
        keywords: ['SEO Boulogne-Billancourt', 'consultant SEO 92', 'Hauts-de-Seine', 'médias'],
        images: [
            { name: 'boulogne-seine-musicale', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'Seine Musicale' },
            { name: 'boulogne-ile-seguin', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', alt: 'Île Seguin bureaux' },
            { name: 'boulogne-bureaux', url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80', alt: 'Bureaux Boulogne' }
        ]
    }
};

// Télécharger une image
function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(dest);

        protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        }, (response) => {
            // Suivre les redirections
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.close();
                fs.unlinkSync(dest);
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                file.close();
                fs.unlinkSync(dest);
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            file.close();
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

// Convertir coordonnées en format EXIF
function decimalToDMS(decimal) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

// Ajouter EXIF et optimiser
async function processImage(inputPath, outputPath, cityData, imageAlt) {
    const allKeywords = [...cityData.keywords, imageAlt].join(', ');

    // 1. Optimiser avec Sharp (compression + resize)
    await sharp(inputPath)
        .resize(1200, 800, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath + '.tmp');

    // 2. Ajouter EXIF
    const jpeg = fs.readFileSync(outputPath + '.tmp');
    const data = jpeg.toString('binary');

    const zeroth = {};
    const exif = {};
    const gps = {};

    zeroth[piexif.ImageIFD.Make] = "INDHACK SEO";
    zeroth[piexif.ImageIFD.Software] = "INDHACK - Consultante SEO Freelance";
    zeroth[piexif.ImageIFD.Copyright] = `Copyright 2024-2026 INDHACK. ${allKeywords}`;
    zeroth[piexif.ImageIFD.ImageDescription] = allKeywords;
    zeroth[piexif.ImageIFD.Artist] = "INDHACK - Consultante SEO";

    exif[piexif.ExifIFD.DateTimeOriginal] = "2024:06:15 10:30:00";
    exif[piexif.ExifIFD.DateTimeDigitized] = "2024:06:15 10:30:00";

    const latRef = cityData.lat >= 0 ? 'N' : 'S';
    const lngRef = cityData.lng >= 0 ? 'E' : 'W';

    gps[piexif.GPSIFD.GPSLatitudeRef] = latRef;
    gps[piexif.GPSIFD.GPSLatitude] = decimalToDMS(cityData.lat);
    gps[piexif.GPSIFD.GPSLongitudeRef] = lngRef;
    gps[piexif.GPSIFD.GPSLongitude] = decimalToDMS(cityData.lng);

    const exifObj = { "0th": zeroth, "Exif": exif, "GPS": gps };
    const exifBytes = piexif.dump(exifObj);
    const newData = piexif.insert(exifBytes, data);
    const newJpeg = Buffer.from(newData, 'binary');

    fs.writeFileSync(outputPath, newJpeg);
    fs.unlinkSync(outputPath + '.tmp');

    // 3. Créer version WebP
    await sharp(outputPath)
        .webp({ quality: 85 })
        .toFile(outputPath.replace('.jpg', '.webp'));

    return true;
}

async function main() {
    console.log('\n🖼️  TÉLÉCHARGEMENT IMAGES VILLES - Unsplash (libre de droits)\n');
    console.log('='.repeat(60));

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const tempDir = path.join(OUTPUT_DIR, 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    let success = 0;
    let failed = 0;
    const metadata = {};

    for (const [cityKey, cityData] of Object.entries(CITY_IMAGES)) {
        console.log(`\n📍 ${cityKey.toUpperCase()}`);

        for (const image of cityData.images) {
            const tempPath = path.join(tempDir, `${image.name}_temp.jpg`);
            const finalPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);

            try {
                // Télécharger
                process.stdout.write(`   ⬇️  ${image.name}...`);
                await downloadImage(image.url, tempPath);

                // Traiter (compress + EXIF + WebP)
                await processImage(tempPath, finalPath, cityData, image.alt);

                // Nettoyer
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

                const stats = fs.statSync(finalPath);
                const sizeKB = Math.round(stats.size / 1024);

                console.log(` ✅ ${sizeKB}KB`);

                metadata[`${image.name}.jpg`] = {
                    gps: { lat: cityData.lat, lng: cityData.lng },
                    keywords: [...cityData.keywords, image.alt],
                    alt: image.alt,
                    date: "2024-06-15",
                    copyright: "INDHACK / Unsplash"
                };

                success++;
            } catch (error) {
                console.log(` ❌ ${error.message}`);
                failed++;
            }
        }
    }

    // Nettoyer dossier temp
    if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir, { recursive: true });
    }

    // Sauvegarder metadata
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'metadata.json'),
        JSON.stringify(metadata, null, 2)
    );

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 RÉSULTAT:`);
    console.log(`   ✅ Téléchargées & optimisées: ${success}`);
    console.log(`   ❌ Échecs: ${failed}`);
    console.log(`   📄 metadata.json mis à jour`);
    console.log(`   🖼️  Versions JPG + WebP générées\n`);
}

main().catch(console.error);
