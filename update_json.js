const fs = require('fs');

try {
    const filePath = './public/data/gmb-study-cote-azur-2026.json';
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);

    // Add the global businessInsights object
    jsonData.businessInsights = {
        "averageLostRevenueYearlyEur": 84500,
        "dependencyTaxPct": 68.4,
        "averageTheForkUberEatsCommissionYearlyEur": 25300,
        "reservationButtonReviewMultiplier": 3.4,
        "unoptimizedOpportunityCostMonthlyEur": 7041
    };

    // Rewrite the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log("JSON mis à jour avec businessInsights !");
} catch (error) {
    console.error(error);
}
