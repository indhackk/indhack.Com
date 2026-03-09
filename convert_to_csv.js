const fs = require('fs');

try {
    const rawData = fs.readFileSync('./public/data/gmb-study-cote-azur-2026.json', 'utf8');
    const jsonData = JSON.parse(rawData);

    const cities = jsonData.cities || {};

    // Define CSV headers
    const headers = [
        "Nom du Restaurant",
        "Ville",
        "Catégorie",
        "Note Google",
        "Nombre d'Avis",
        "Possède un Site Web",
        "Site Web URL",
        "Score de Complétude Profil (sur 10)",
        "Google Maps CID"
    ];

    let csvContent = headers.join(',') + '\n';

    // Escape CSV value helper
    const escapeCSV = (value) => {
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
    };

    // Loop through cities and restaurants
    for (const [cityName, cityData] of Object.entries(cities)) {
        if (cityData.restaurants && Array.isArray(cityData.restaurants)) {
            cityData.restaurants.forEach(restaurant => {
                const row = [
                    escapeCSV(restaurant.name),
                    escapeCSV(restaurant.city || cityName),
                    escapeCSV(restaurant.category),
                    escapeCSV(restaurant.rating),
                    escapeCSV(restaurant.reviews),
                    restaurant.analysis?.hasWebsite ? 'Oui' : 'Non',
                    escapeCSV(restaurant.website),
                    escapeCSV(restaurant.analysis?.completenessScore),
                    escapeCSV(restaurant.cid)
                ];
                csvContent += row.join(',') + '\n';
            });
        }
    }

    // Write the CSV file
    const outputPath = './public/data/restaurants_visibilite_paca.csv';
    fs.writeFileSync(outputPath, csvContent, 'utf8');
    console.log(`Le fichier CSV a été généré avec succès dans : ${outputPath}`);

} catch (error) {
    console.error("Erreur lors de la génération du CSV :", error);
}
