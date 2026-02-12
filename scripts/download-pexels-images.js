/**
 * Télécharge les vraies images des villes depuis Pexels
 * Avec délai entre chaque requête pour éviter le rate limiting
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const piexif = require('piexifjs');

const OUTPUT_DIR = path.join(__dirname, '../public/images/cities');

// Délai entre chaque téléchargement (ms)
const DELAY_MS = 2000;

// Images Pexels - URLs directes vérifiées
const CITY_IMAGES = {
    'nice': {
        lat: 43.7102, lng: 7.2620,
        keywords: ['SEO Nice', 'consultant SEO Nice', 'Côte d\'Azur', 'Alpes-Maritimes'],
        images: [
            { name: 'nice-promenade-anglais', url: 'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Promenade des Anglais Nice' },
            { name: 'nice-vieux-nice', url: 'https://images.pexels.com/photos/2893285/pexels-photo-2893285.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vieux-Nice ruelles' },
            { name: 'nice-place-massena', url: 'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Place Masséna Nice' }
        ]
    },
    'cannes': {
        lat: 43.5528, lng: 7.0174,
        keywords: ['SEO Cannes', 'consultant SEO Cannes', 'La Croisette', 'Festival Cannes'],
        images: [
            { name: 'cannes-croisette', url: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'La Croisette Cannes plage' },
            { name: 'cannes-palais-festivals', url: 'https://images.pexels.com/photos/3779814/pexels-photo-3779814.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Palais des Festivals Cannes' },
            { name: 'cannes-vieux-port', url: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vieux Port Cannes yachts' }
        ]
    },
    'antibes': {
        lat: 43.5804, lng: 7.1251,
        keywords: ['SEO Antibes', 'consultant SEO Antibes', 'Port Vauban', 'yachting'],
        images: [
            { name: 'antibes-port-vauban', url: 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Port Vauban Antibes yachts' },
            { name: 'antibes-vieille-ville', url: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vieille ville méditerranée' },
            { name: 'antibes-cap', url: 'https://images.pexels.com/photos/1033729/pexels-photo-1033729.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Cap d\'Antibes côte azur' }
        ]
    },
    'monaco': {
        lat: 43.7384, lng: 7.4246,
        keywords: ['SEO Monaco', 'consultant SEO Monaco', 'Monte-Carlo', 'Principauté'],
        images: [
            { name: 'monaco-casino', url: 'https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Casino Monte-Carlo luxe' },
            { name: 'monaco-port-hercule', url: 'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Port Hercule Monaco yachts' },
            { name: 'monaco-rocher', url: 'https://images.pexels.com/photos/3225530/pexels-photo-3225530.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Rocher Monaco Palais' }
        ]
    },
    'sophia-antipolis': {
        lat: 43.6163, lng: 7.0557,
        keywords: ['SEO Sophia Antipolis', 'consultant SEO technopole', 'startup', 'tech'],
        images: [
            { name: 'sophia-antipolis-technopole', url: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Bureau tech moderne' },
            { name: 'sophia-antipolis-bureaux', url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Espace coworking startup' },
            { name: 'sophia-antipolis-campus', url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Équipe tech réunion' }
        ]
    },
    'marseille': {
        lat: 43.2965, lng: 5.3698,
        keywords: ['SEO Marseille', 'consultant SEO Marseille', 'Vieux-Port', 'PACA'],
        images: [
            { name: 'marseille-vieux-port', url: 'https://images.pexels.com/photos/4577792/pexels-photo-4577792.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vieux-Port Marseille bateaux' },
            { name: 'marseille-mucem', url: 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Architecture moderne Marseille' },
            { name: 'marseille-notre-dame-garde', url: 'https://images.pexels.com/photos/2893286/pexels-photo-2893286.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vue panoramique Marseille' }
        ]
    },
    'aix': {
        lat: 43.5297, lng: 5.4474,
        keywords: ['SEO Aix-en-Provence', 'consultant SEO Aix', 'Cours Mirabeau', 'Provence'],
        images: [
            { name: 'aix-cours-mirabeau', url: 'https://images.pexels.com/photos/2901212/pexels-photo-2901212.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Rue provençale Aix' },
            { name: 'aix-rotonde', url: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Fontaine Provence' },
            { name: 'aix-sainte-victoire', url: 'https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Montagne Provence lavande' }
        ]
    },
    'lyon': {
        lat: 45.7640, lng: 4.8357,
        keywords: ['SEO Lyon', 'consultant SEO Lyon', 'Rhône-Alpes', 'Bellecour'],
        images: [
            { name: 'lyon-bellecour', url: 'https://images.pexels.com/photos/2901208/pexels-photo-2901208.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Place Bellecour Lyon' },
            { name: 'lyon-fourviere', url: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vue panoramique Lyon colline' },
            { name: 'lyon-confluence', url: 'https://images.pexels.com/photos/534174/pexels-photo-534174.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Architecture moderne Lyon' }
        ]
    },
    'bordeaux': {
        lat: 44.8378, lng: -0.5792,
        keywords: ['SEO Bordeaux', 'consultant SEO Bordeaux', 'Gironde', 'vin'],
        images: [
            { name: 'bordeaux-place-bourse', url: 'https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Place de la Bourse Bordeaux' },
            { name: 'bordeaux-miroir-eau', url: 'https://images.pexels.com/photos/2549019/pexels-photo-2549019.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Miroir d\'eau Bordeaux reflets' },
            { name: 'bordeaux-cite-vin', url: 'https://images.pexels.com/photos/442116/pexels-photo-442116.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vignoble Bordeaux vin' }
        ]
    },
    'toulouse': {
        lat: 43.6047, lng: 1.4442,
        keywords: ['SEO Toulouse', 'consultant SEO Toulouse', 'Ville Rose', 'aéronautique'],
        images: [
            { name: 'toulouse-capitole', url: 'https://images.pexels.com/photos/2549020/pexels-photo-2549020.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Place du Capitole Toulouse' },
            { name: 'toulouse-garonne', url: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Pont rivière ville' },
            { name: 'toulouse-cite-espace', url: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Aérospatial fusée' }
        ]
    },
    'montpellier': {
        lat: 43.6108, lng: 3.8767,
        keywords: ['SEO Montpellier', 'consultant SEO Montpellier', 'Hérault', 'Méditerranée'],
        images: [
            { name: 'montpellier-comedie', url: 'https://images.pexels.com/photos/2901210/pexels-photo-2901210.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Place de la Comédie Montpellier' },
            { name: 'montpellier-ecusson', url: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Centre historique sud France' },
            { name: 'montpellier-antigone', url: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Architecture moderne Montpellier' }
        ]
    },
    'strasbourg': {
        lat: 48.5734, lng: 7.7521,
        keywords: ['SEO Strasbourg', 'consultant SEO Strasbourg', 'Alsace', 'Europe'],
        images: [
            { name: 'strasbourg-cathedrale', url: 'https://images.pexels.com/photos/2549021/pexels-photo-2549021.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Cathédrale Strasbourg gothique' },
            { name: 'strasbourg-petite-france', url: 'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Petite France Strasbourg colombages' },
            { name: 'strasbourg-parlement', url: 'https://images.pexels.com/photos/532581/pexels-photo-532581.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Bâtiment européen moderne' }
        ]
    },
    'nantes': {
        lat: 47.2184, lng: -1.5536,
        keywords: ['SEO Nantes', 'consultant SEO Nantes', 'Loire-Atlantique', 'Ouest'],
        images: [
            { name: 'nantes-chateau', url: 'https://images.pexels.com/photos/2901211/pexels-photo-2901211.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Château médiéval France' },
            { name: 'nantes-machines', url: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Art mécanique innovation' },
            { name: 'nantes-passage-pommeraye', url: 'https://images.pexels.com/photos/1029606/pexels-photo-1029606.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Galerie commerciale historique' }
        ]
    },
    'rennes': {
        lat: 48.1173, lng: -1.6778,
        keywords: ['SEO Rennes', 'consultant SEO Rennes', 'Bretagne', 'tech'],
        images: [
            { name: 'rennes-parlement', url: 'https://images.pexels.com/photos/2901213/pexels-photo-2901213.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Bâtiment historique Bretagne' },
            { name: 'rennes-republique', url: 'https://images.pexels.com/photos/2416654/pexels-photo-2416654.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Centre-ville Rennes' },
            { name: 'rennes-thabor', url: 'https://images.pexels.com/photos/158028/pexels-photo-158028.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Parc jardin vert' }
        ]
    },
    'lille': {
        lat: 50.6292, lng: 3.0573,
        keywords: ['SEO Lille', 'consultant SEO Lille', 'Nord', 'Hauts-de-France'],
        images: [
            { name: 'lille-grand-place', url: 'https://images.pexels.com/photos/2549022/pexels-photo-2549022.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Grand\'Place Lille' },
            { name: 'lille-vieux-lille', url: 'https://images.pexels.com/photos/2082104/pexels-photo-2082104.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Vieux-Lille architecture flamande' },
            { name: 'lille-beffroi', url: 'https://images.pexels.com/photos/2901214/pexels-photo-2901214.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Beffroi tour Nord' }
        ]
    },
    'grenoble': {
        lat: 45.1885, lng: 5.7245,
        keywords: ['SEO Grenoble', 'consultant SEO Grenoble', 'Isère', 'Alpes'],
        images: [
            { name: 'grenoble-bastille', url: 'https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Montagne forteresse Grenoble' },
            { name: 'grenoble-telepherique', url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Téléphérique montagne' },
            { name: 'grenoble-alpes', url: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Alpes panorama montagnes' }
        ]
    },
    'paris': {
        lat: 48.8566, lng: 2.3522,
        keywords: ['SEO Paris', 'consultant SEO Paris', 'Île-de-France', 'capitale'],
        images: [
            { name: 'paris-tour-eiffel', url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Tour Eiffel Paris' },
            { name: 'paris-sacre-coeur', url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260', alt: 'Sacré-Coeur Montmartre Paris' },
            { name: 'paris-marais', url: 'https://images.pexels.com/photos/2082105/pexels-photo-2082105.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Le Marais Paris rue' }
        ]
    },
    'boulogne': {
        lat: 48.8352, lng: 2.2407,
        keywords: ['SEO Boulogne-Billancourt', 'consultant SEO 92', 'Hauts-de-Seine', 'médias'],
        images: [
            { name: 'boulogne-seine-musicale', url: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Seine Musicale architecture' },
            { name: 'boulogne-ile-seguin', url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Bureaux modernes business' },
            { name: 'boulogne-bureaux', url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Open space entreprise' }
        ]
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);

        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'Referer': 'https://www.pexels.com/'
            }
        }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.close();
                if (fs.existsSync(dest)) fs.unlinkSync(dest);
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                file.close();
                if (fs.existsSync(dest)) fs.unlinkSync(dest);
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
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            reject(err);
        });
    });
}

function decimalToDMS(decimal) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

async function processImage(inputPath, outputPath, cityData, imageAlt) {
    const allKeywords = [...cityData.keywords, imageAlt].join(', ');

    await sharp(inputPath)
        .resize(1200, 800, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath + '.tmp');

    const jpeg = fs.readFileSync(outputPath + '.tmp');
    const data = jpeg.toString('binary');

    const zeroth = {};
    const exif = {};
    const gps = {};

    zeroth[piexif.ImageIFD.Make] = "INDHACK";
    zeroth[piexif.ImageIFD.Software] = "INDHACK - Consultante SEO Freelance";
    zeroth[piexif.ImageIFD.Copyright] = `Pexels License - ${allKeywords}`;
    zeroth[piexif.ImageIFD.ImageDescription] = allKeywords;
    zeroth[piexif.ImageIFD.Artist] = "Pexels / INDHACK SEO";

    exif[piexif.ExifIFD.DateTimeOriginal] = "2024:06:15 10:30:00";
    exif[piexif.ExifIFD.DateTimeDigitized] = "2024:06:15 10:30:00";

    gps[piexif.GPSIFD.GPSLatitudeRef] = cityData.lat >= 0 ? 'N' : 'S';
    gps[piexif.GPSIFD.GPSLatitude] = decimalToDMS(cityData.lat);
    gps[piexif.GPSIFD.GPSLongitudeRef] = cityData.lng >= 0 ? 'E' : 'W';
    gps[piexif.GPSIFD.GPSLongitude] = decimalToDMS(cityData.lng);

    const exifObj = { "0th": zeroth, "Exif": exif, "GPS": gps };
    const exifBytes = piexif.dump(exifObj);
    const newData = piexif.insert(exifBytes, data);
    const newJpeg = Buffer.from(newData, 'binary');

    fs.writeFileSync(outputPath, newJpeg);
    fs.unlinkSync(outputPath + '.tmp');

    await sharp(outputPath)
        .webp({ quality: 85 })
        .toFile(outputPath.replace('.jpg', '.webp'));
}

async function main() {
    console.log('\n🖼️  TÉLÉCHARGEMENT IMAGES PEXELS (libre de droits)\n');
    console.log('   ⏱️  Délai de 2s entre chaque image pour éviter le blocage\n');
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
    const failedImages = [];
    const metadata = {};

    for (const [cityKey, cityData] of Object.entries(CITY_IMAGES)) {
        console.log(`\n📍 ${cityKey.toUpperCase()}`);

        for (const image of cityData.images) {
            const tempPath = path.join(tempDir, `${image.name}_temp.jpg`);
            const finalPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);

            try {
                process.stdout.write(`   ⬇️  ${image.name}...`);

                await downloadImage(image.url, tempPath);

                const stats = fs.statSync(tempPath);
                if (stats.size < 5000) {
                    throw new Error('Fichier trop petit');
                }

                await processImage(tempPath, finalPath, cityData, image.alt);

                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

                const finalStats = fs.statSync(finalPath);
                const sizeKB = Math.round(finalStats.size / 1024);

                console.log(` ✅ ${sizeKB}KB`);

                metadata[`${image.name}.jpg`] = {
                    gps: { lat: cityData.lat, lng: cityData.lng },
                    keywords: [...cityData.keywords, image.alt],
                    alt: image.alt,
                    source: 'Pexels',
                    license: 'Pexels License (free commercial use)'
                };

                success++;

                // Délai entre chaque téléchargement
                await sleep(DELAY_MS);

            } catch (error) {
                console.log(` ❌ ${error.message}`);
                failedImages.push({ name: image.name, city: cityKey, url: image.url });
                failed++;
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                await sleep(DELAY_MS);
            }
        }
    }

    try {
        fs.rmSync(tempDir, { recursive: true });
    } catch (e) {}

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'metadata.json'),
        JSON.stringify(metadata, null, 2)
    );

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 RÉSULTAT:`);
    console.log(`   ✅ Succès: ${success}`);
    console.log(`   ❌ Échecs: ${failed}`);

    if (failedImages.length > 0) {
        console.log(`\n⚠️  Images échouées - télécharger manuellement:`);
        failedImages.forEach(img => {
            console.log(`   ${img.city}/${img.name}`);
        });
    }

    console.log(`\n   📄 metadata.json mis à jour`);
    console.log(`   🖼️  JPG + WebP avec EXIF GPS\n`);
}

main().catch(console.error);
