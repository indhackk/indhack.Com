/**
 * Télécharge des images professionnelles (SEO, bureau, réunions)
 * avec EXIF géolocalisé pour chaque ville
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const piexif = require('piexifjs');

const OUTPUT_DIR = path.join(__dirname, '../public/images/cities');
const DELAY_MS = 1500;

// Images professionnelles Pexels (URLs vérifiées et fonctionnelles)
const PRO_IMAGES = {
    // Images de travail SEO / ordinateur
    seo_laptop: [
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260',    // laptop analytics
        'https://images.pexels.com/photos/67112/pexels-photo-67112.jpeg?auto=compress&cs=tinysrgb&w=1260',      // macbook desk
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260',  // coding laptop
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260',  // dev screen
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260',    // code screen
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260',  // woman laptop
    ],
    // Images bureau / workspace
    office: [
        'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260',  // open office
        'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260',    // modern office
        'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260',  // desk setup
        'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260',  // home office
        'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260',  // team work
        'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1260',  // brainstorm
    ],
    // Images réunion / client
    meeting: [
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260',  // business meeting
        'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260',  // team collab
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260',  // discussion
        'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260',  // presentation
        'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1260',  // startup team
        'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260',  // workshop
    ]
};

// Villes avec leurs données
const CITIES = [
    { key: 'nice', name: 'Nice', lat: 43.7102, lng: 7.2620, dept: '06', region: 'Côte d\'Azur' },
    { key: 'cannes', name: 'Cannes', lat: 43.5528, lng: 7.0174, dept: '06', region: 'Côte d\'Azur' },
    { key: 'antibes', name: 'Antibes', lat: 43.5804, lng: 7.1251, dept: '06', region: 'Côte d\'Azur' },
    { key: 'monaco', name: 'Monaco', lat: 43.7384, lng: 7.4246, dept: '98', region: 'Monaco' },
    { key: 'sophia-antipolis', name: 'Sophia Antipolis', lat: 43.6163, lng: 7.0557, dept: '06', region: 'technopole' },
    { key: 'marseille', name: 'Marseille', lat: 43.2965, lng: 5.3698, dept: '13', region: 'PACA' },
    { key: 'aix', name: 'Aix-en-Provence', lat: 43.5297, lng: 5.4474, dept: '13', region: 'Provence' },
    { key: 'lyon', name: 'Lyon', lat: 45.7640, lng: 4.8357, dept: '69', region: 'Rhône-Alpes' },
    { key: 'bordeaux', name: 'Bordeaux', lat: 44.8378, lng: -0.5792, dept: '33', region: 'Gironde' },
    { key: 'toulouse', name: 'Toulouse', lat: 43.6047, lng: 1.4442, dept: '31', region: 'Occitanie' },
    { key: 'montpellier', name: 'Montpellier', lat: 43.6108, lng: 3.8767, dept: '34', region: 'Hérault' },
    { key: 'strasbourg', name: 'Strasbourg', lat: 48.5734, lng: 7.7521, dept: '67', region: 'Alsace' },
    { key: 'nantes', name: 'Nantes', lat: 47.2184, lng: -1.5536, dept: '44', region: 'Loire-Atlantique' },
    { key: 'rennes', name: 'Rennes', lat: 48.1173, lng: -1.6778, dept: '35', region: 'Bretagne' },
    { key: 'lille', name: 'Lille', lat: 50.6292, lng: 3.0573, dept: '59', region: 'Nord' },
    { key: 'grenoble', name: 'Grenoble', lat: 45.1885, lng: 5.7245, dept: '38', region: 'Isère' },
    { key: 'paris', name: 'Paris', lat: 48.8566, lng: 2.3522, dept: '75', region: 'Île-de-France' },
    { key: 'boulogne', name: 'Boulogne-Billancourt', lat: 48.8352, lng: 2.2407, dept: '92', region: 'Hauts-de-Seine' }
];

// Mapping ville -> images
const CITY_IMAGE_MAP = {
    'nice': { images: ['seo_laptop:0', 'office:0', 'meeting:0'], suffix: ['promenade-anglais', 'vieux-nice', 'place-massena'] },
    'cannes': { images: ['seo_laptop:1', 'office:1', 'meeting:1'], suffix: ['croisette', 'palais-festivals', 'vieux-port'] },
    'antibes': { images: ['seo_laptop:2', 'office:2', 'meeting:2'], suffix: ['port-vauban', 'vieille-ville', 'cap'] },
    'monaco': { images: ['seo_laptop:3', 'office:3', 'meeting:3'], suffix: ['casino', 'port-hercule', 'rocher'] },
    'sophia-antipolis': { images: ['seo_laptop:4', 'office:4', 'meeting:4'], suffix: ['technopole', 'bureaux', 'campus'] },
    'marseille': { images: ['seo_laptop:5', 'office:5', 'meeting:5'], suffix: ['vieux-port', 'mucem', 'notre-dame-garde'] },
    'aix': { images: ['seo_laptop:0', 'office:0', 'meeting:0'], suffix: ['cours-mirabeau', 'rotonde', 'sainte-victoire'] },
    'lyon': { images: ['seo_laptop:1', 'office:1', 'meeting:1'], suffix: ['bellecour', 'fourviere', 'confluence'] },
    'bordeaux': { images: ['seo_laptop:2', 'office:2', 'meeting:2'], suffix: ['place-bourse', 'miroir-eau', 'cite-vin'] },
    'toulouse': { images: ['seo_laptop:3', 'office:3', 'meeting:3'], suffix: ['capitole', 'garonne', 'cite-espace'] },
    'montpellier': { images: ['seo_laptop:4', 'office:4', 'meeting:4'], suffix: ['comedie', 'ecusson', 'antigone'] },
    'strasbourg': { images: ['seo_laptop:5', 'office:5', 'meeting:5'], suffix: ['cathedrale', 'petite-france', 'parlement'] },
    'nantes': { images: ['seo_laptop:0', 'office:0', 'meeting:0'], suffix: ['chateau', 'machines', 'passage-pommeraye'] },
    'rennes': { images: ['seo_laptop:1', 'office:1', 'meeting:1'], suffix: ['parlement', 'republique', 'thabor'] },
    'lille': { images: ['seo_laptop:2', 'office:2', 'meeting:2'], suffix: ['grand-place', 'vieux-lille', 'beffroi'] },
    'grenoble': { images: ['seo_laptop:3', 'office:3', 'meeting:3'], suffix: ['bastille', 'telepherique', 'alpes'] },
    'paris': { images: ['seo_laptop:4', 'office:4', 'meeting:4'], suffix: ['tour-eiffel', 'sacre-coeur', 'marais'] },
    'boulogne': { images: ['seo_laptop:5', 'office:5', 'meeting:5'], suffix: ['seine-musicale', 'ile-seguin', 'bureaux'] }
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function getImageUrl(ref) {
    const [cat, idx] = ref.split(':');
    return PRO_IMAGES[cat][parseInt(idx)];
}

function decimalToDMS(decimal) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': 'image/*',
                'Referer': 'https://www.pexels.com/'
            }
        }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlinkSync(dest);
                downloadImage(res.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlinkSync(dest);
                reject(new Error(`HTTP ${res.statusCode}`));
                return;
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (e) => {
            file.close();
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            reject(e);
        });
    });
}

async function processImage(inputPath, outputPath, city, imageType) {
    const keywords = [
        `consultant SEO ${city.name}`,
        `SEO ${city.name}`,
        `référencement ${city.name}`,
        `agence SEO ${city.dept}`,
        city.region,
        imageType === 'seo_laptop' ? 'audit SEO' : imageType === 'office' ? 'bureau consultant' : 'réunion client'
    ].join(', ');

    // Resize & compress
    await sharp(inputPath)
        .resize(1200, 800, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 82, progressive: true })
        .toFile(outputPath + '.tmp');

    // Add EXIF
    const jpeg = fs.readFileSync(outputPath + '.tmp');
    const data = jpeg.toString('binary');

    const zeroth = {};
    const exif = {};
    const gps = {};

    zeroth[piexif.ImageIFD.Make] = "INDHACK";
    zeroth[piexif.ImageIFD.Model] = `Consultant SEO ${city.name}`;
    zeroth[piexif.ImageIFD.Software] = "INDHACK - Consultante SEO Freelance";
    zeroth[piexif.ImageIFD.Copyright] = `INDHACK SEO ${city.name} - ${keywords}`;
    zeroth[piexif.ImageIFD.ImageDescription] = keywords;
    zeroth[piexif.ImageIFD.Artist] = `INDHACK - SEO ${city.name}`;

    exif[piexif.ExifIFD.DateTimeOriginal] = "2024:06:15 10:30:00";
    exif[piexif.ExifIFD.DateTimeDigitized] = "2024:06:15 10:30:00";

    gps[piexif.GPSIFD.GPSLatitudeRef] = city.lat >= 0 ? 'N' : 'S';
    gps[piexif.GPSIFD.GPSLatitude] = decimalToDMS(city.lat);
    gps[piexif.GPSIFD.GPSLongitudeRef] = city.lng >= 0 ? 'E' : 'W';
    gps[piexif.GPSIFD.GPSLongitude] = decimalToDMS(city.lng);

    const exifBytes = piexif.dump({ "0th": zeroth, "Exif": exif, "GPS": gps });
    const newData = piexif.insert(exifBytes, data);
    fs.writeFileSync(outputPath, Buffer.from(newData, 'binary'));
    fs.unlinkSync(outputPath + '.tmp');

    // WebP version
    await sharp(outputPath)
        .webp({ quality: 82 })
        .toFile(outputPath.replace('.jpg', '.webp'));
}

async function main() {
    console.log('\n🖼️  IMAGES PRO SEO - Ordinateurs, bureaux, réunions\n');
    console.log('   Avec EXIF géolocalisé pour chaque ville\n');
    console.log('='.repeat(60));

    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const tempDir = path.join(OUTPUT_DIR, 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    let success = 0, failed = 0;
    const metadata = {};

    for (const city of CITIES) {
        const mapping = CITY_IMAGE_MAP[city.key];
        if (!mapping) continue;

        console.log(`\n📍 ${city.name.toUpperCase()}`);

        for (let i = 0; i < mapping.images.length; i++) {
            const imageRef = mapping.images[i];
            const suffix = mapping.suffix[i];
            const imageName = `${city.key}-${suffix}`;
            const url = getImageUrl(imageRef);
            const imageType = imageRef.split(':')[0];

            const tempPath = path.join(tempDir, `${imageName}_temp.jpg`);
            const finalPath = path.join(OUTPUT_DIR, `${imageName}.jpg`);

            try {
                process.stdout.write(`   ⬇️  ${imageName}...`);
                await downloadImage(url, tempPath);

                const stats = fs.statSync(tempPath);
                if (stats.size < 5000) throw new Error('Fichier trop petit');

                await processImage(tempPath, finalPath, city, imageType);
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

                const finalStats = fs.statSync(finalPath);
                console.log(` ✅ ${Math.round(finalStats.size / 1024)}KB`);

                metadata[`${imageName}.jpg`] = {
                    gps: { lat: city.lat, lng: city.lng },
                    city: city.name,
                    keywords: [`SEO ${city.name}`, `consultant SEO ${city.dept}`, city.region],
                    type: imageType,
                    license: 'Pexels (free commercial)'
                };

                success++;
                await sleep(DELAY_MS);
            } catch (e) {
                console.log(` ❌ ${e.message}`);
                failed++;
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                await sleep(DELAY_MS);
            }
        }
    }

    try { fs.rmSync(tempDir, { recursive: true }); } catch (e) {}

    fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 RÉSULTAT: ${success} succès, ${failed} échecs`);
    console.log(`   📄 metadata.json + JPG + WebP avec EXIF GPS\n`);
}

main().catch(console.error);
