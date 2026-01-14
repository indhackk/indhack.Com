const fs = require('fs');
const path = require('path');

/**
 * Script de génération automatique de pages villes SEO
 * 
 * USAGE:
 * 1. Modifier le fichier cities-data.csv avec vos données
 * 2. Exécuter: node scripts/generate-city-pages.js
 * 
 * FORMAT CSV:
 * ville,codePostal,description
 * "Grasse","06130","Description personnalisée pour Grasse..."
 */

// Configuration
const CITIES_CSV_PATH = path.join(__dirname, 'cities-data.csv');
const APP_DIR = path.join(__dirname, '..', 'app');
const CITY_DATA_PATH = path.join(__dirname, '..', 'components', 'templates', 'CityPageTemplate.tsx');

// Coordonnées GPS des villes (à enrichir)
const CITY_COORDINATES = {
    "Nice": { lat: "43.7102", lng: "7.2620" },
    "Cannes": { lat: "43.5528", lng: "7.0174" },
    "Antibes": { lat: "43.5804", lng: "7.1251" },
    "Monaco": { lat: "43.7384", lng: "7.4246" },
    "Grasse": { lat: "43.6590", lng: "6.9226" },
    "Menton": { lat: "43.7766", lng: "7.4997" },
    "Fréjus": { lat: "43.4332", lng: "6.7370" },
    "Saint-Tropez": { lat: "43.2727", lng: "6.6406" },
    "Toulon": { lat: "43.1242", lng: "5.9280" },
    "Marseille": { lat: "43.2965", lng: "5.3698" },
    "Aix-en-Provence": { lat: "43.5297", lng: "5.4474" },
    "Sophia-Antipolis": { lat: "43.6163", lng: "7.0557" },
    "Cagnes-sur-Mer": { lat: "43.6645", lng: "7.1482" },
    "Saint-Laurent-du-Var": { lat: "43.6656", lng: "7.1890" },
    "Vence": { lat: "43.7223", lng: "7.1119" },
    "Mougins": { lat: "43.6006", lng: "6.9956" },
    "Le Cannet": { lat: "43.5775", lng: "7.0194" },
    "Mandelieu": { lat: "43.5461", lng: "6.9375" },
    "Vallauris": { lat: "43.5806", lng: "7.0531" },
};

// Template de page ville
function generatePageContent(city, zipCode, description) {
    // Slug pour l'URL (ex: "Saint-Tropez" -> "saint-tropez")
    const slug = city.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever accents
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return `import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultante SEO ${city} | Experte Référencement Freelance",
    description: "${description.substring(0, 155)}...",
    alternates: {
        canonical: "https://indhack.com/seo-${slug}"
    },
    openGraph: {
        title: "Consultante SEO ${city} | Indiana Aflalo - IndHack",
        description: "Dominez les résultats Google à ${city}. Référencement local, audit SEO et stratégie digitale sur-mesure.",
        url: "https://indhack.com/seo-${slug}",
    }
};

export default function Seo${city.replace(/[^a-zA-Z]/g, '')}Page() {
    return (
        <CityPageTemplate
            city="${city}"
            zipCode="${zipCode}"
            description="${description.replace(/"/g, '\\"')}"
        />
    );
}
`;
}

// Parser CSV simple
function parseCSV(content) {
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

    return lines.slice(1).map(line => {
        // Gérer les virgules dans les guillemets
        const values = [];
        let current = '';
        let inQuotes = false;

        for (const char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim().replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim().replace(/^"|"$/g, ''));

        const obj = {};
        headers.forEach((header, i) => {
            obj[header] = values[i] || '';
        });
        return obj;
    });
}

// Fonction principale
async function generateCityPages() {
    console.log('🚀 Génération des pages villes SEO...\n');

    // Vérifier si le fichier CSV existe
    if (!fs.existsSync(CITIES_CSV_PATH)) {
        console.log('📄 Fichier cities-data.csv non trouvé. Création du fichier exemple...');

        const exampleCSV = `ville,codePostal,description
"Grasse","06130","Capitale mondiale du parfum, Grasse est une ville où l'artisanat d'excellence côtoie le tourisme. Pour attirer les visiteurs en quête d'expériences olfactives ou les professionnels du secteur, un référencement local optimisé est indispensable."
"Menton","06500","Aux portes de l'Italie, Menton attire une clientèle franco-italienne exigeante. Que vous soyez dans l'hôtellerie, la restauration ou les services, dominer Google à Menton vous ouvre un marché transfrontalier unique sur la Côte d'Azur."
"Fréjus","83600","Entre patrimoine romain et plages méditerranéennes, Fréjus est une destination touristique majeure du Var. Artisans, restaurateurs et commerçants locaux ont tout intérêt à se positionner en première page Google pour capter ce flux touristique."
"Cagnes-sur-Mer","06800","Entre Nice et Antibes, Cagnes-sur-Mer combine charme provençal et dynamisme économique. Le SEO local vous permet de vous démarquer dans cette zone très concurrentielle de la Côte d'Azur."
"Vence","06140","Village d'art et d'histoire, Vence attire amateurs de culture et touristes. Pour les galeries, artisans et commerces, être visible sur Google est essentiel pour capter cette clientèle qualifiée."`;

        fs.writeFileSync(CITIES_CSV_PATH, exampleCSV);
        console.log('✅ Fichier exemple créé: scripts/cities-data.csv');
        console.log('📝 Modifiez ce fichier puis relancez le script.\n');
        return;
    }

    // Lire et parser le CSV
    const csvContent = fs.readFileSync(CITIES_CSV_PATH, 'utf-8');
    const cities = parseCSV(csvContent);

    console.log(`📍 ${cities.length} ville(s) trouvée(s) dans le CSV\n`);

    let created = 0;
    let skipped = 0;

    for (const city of cities) {
        const { ville, codePostal, description } = city;

        if (!ville || !codePostal || !description) {
            console.log(`⚠️  Ligne ignorée: données incomplètes`);
            skipped++;
            continue;
        }

        // Créer le slug
        const slug = ville.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const dirPath = path.join(APP_DIR, `seo-${slug}`);
        const filePath = path.join(dirPath, 'page.tsx');

        // Vérifier si la page existe déjà
        if (fs.existsSync(filePath)) {
            console.log(`⏭️  ${ville}: page existante, ignorée`);
            skipped++;
            continue;
        }

        // Créer le dossier
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Générer et écrire le contenu
        const content = generatePageContent(ville, codePostal, description);
        fs.writeFileSync(filePath, content);

        console.log(`✅ ${ville} (${codePostal}): /seo-${slug}`);
        created++;
    }

    console.log('\n📊 Résumé:');
    console.log(`   ✅ Pages créées: ${created}`);
    console.log(`   ⏭️  Pages ignorées: ${skipped}`);
    console.log('\n💡 N\'oubliez pas de:');
    console.log('   1. Ajouter les coordonnées GPS dans CITY_DATA du CityPageTemplate');
    console.log('   2. Ajouter les nouvelles villes dans le Footer');
    console.log('   3. Relancer le build pour générer le sitemap');
}

// Exécution
generateCityPages().catch(console.error);
