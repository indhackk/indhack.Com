// Données centralisées des villes pour le SEO Local

export interface CityData {
    name: string;
    slug: string;
    zipCode: string;
    lat: string;
    lng: string;
    region: string;
    department: string;
    population: string;
    description: string;
    keyPoints: string[];
    nearbyAreas: string[];
    landmarks: string[];
}

export const FRENCH_CITIES: CityData[] = [
    // Côte d'Azur (PACA)
    {
        name: "Nice",
        slug: "seo-nice",
        zipCode: "06000",
        lat: "43.7102",
        lng: "7.2620",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        population: "340 000",
        description: "Capitale de la Côte d'Azur, Nice est un marché ultra-dynamique où la concurrence digitale est féroce. Restaurants, hôtels, commerces de luxe, professions libérales : tous se battent pour la visibilité locale.",
        keyPoints: ["Tourisme international", "Économie tertiaire forte", "French Tech Côte d'Azur"],
        nearbyAreas: ["Villefranche-sur-Mer", "Saint-Laurent-du-Var", "Cagnes-sur-Mer", "Beaulieu-sur-Mer"],
        landmarks: ["Promenade des Anglais", "Vieux-Nice", "Port de Nice", "Cimiez"]
    },
    {
        name: "Cannes",
        slug: "seo-cannes",
        zipCode: "06400",
        lat: "43.5528",
        lng: "7.0174",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        population: "74 000",
        description: "Ville du Festival, Cannes attire une clientèle internationale haut de gamme. Immobilier de luxe, événementiel, yachting : le SEO local est stratégique pour capter cette audience premium.",
        keyPoints: ["Événementiel international", "Luxe et prestige", "Tourisme d'affaires"],
        nearbyAreas: ["Le Cannet", "Mougins", "Mandelieu-la-Napoule", "Théoule-sur-Mer"],
        landmarks: ["La Croisette", "Palais des Festivals", "Vieux Port", "Suquet"]
    },
    {
        name: "Antibes",
        slug: "seo-antibes",
        zipCode: "06600",
        lat: "43.5804",
        lng: "7.1251",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        population: "73 000",
        description: "Entre Nice et Cannes, Antibes Juan-les-Pins combine patrimoine historique et yachting de luxe. Une ville où les artisans, restaurateurs et commerces locaux ont tout à gagner à être visibles sur Google.",
        keyPoints: ["Port Vauban (plus grand port de plaisance)", "Patrimoine culturel", "Tourisme balnéaire"],
        nearbyAreas: ["Juan-les-Pins", "Vallauris", "Biot", "Villeneuve-Loubet"],
        landmarks: ["Remparts", "Musée Picasso", "Cap d'Antibes", "Marineland"]
    },
    {
        name: "Monaco",
        slug: "seo-monaco",
        zipCode: "98000",
        lat: "43.7384",
        lng: "7.4246",
        region: "Principauté de Monaco",
        department: "Monaco",
        population: "39 000",
        description: "La Principauté attire une clientèle ultra-fortunée du monde entier. Banques, joailliers, immobilier de prestige : être visible sur Google Monaco, c'est accéder à un marché premium unique.",
        keyPoints: ["Finance et banque privée", "Luxe absolu", "Événements exclusifs (F1, Yacht Show)"],
        nearbyAreas: ["Monte-Carlo", "La Condamine", "Fontvieille", "Moneghetti"],
        landmarks: ["Casino de Monte-Carlo", "Palais Princier", "Port Hercule", "Rocher"]
    },
    {
        name: "Sophia-Antipolis",
        slug: "seo-sophia-antipolis",
        zipCode: "06560",
        lat: "43.6163",
        lng: "7.0557",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        population: "2 500 entreprises",
        description: "Première technopole d'Europe, Sophia Antipolis concentre +2500 entreprises tech, startups et multinationales. Un écosystème B2B où le SEO génère des leads qualifiés à forte valeur.",
        keyPoints: ["Tech & Innovation", "B2B et services aux entreprises", "Startups et scale-ups"],
        nearbyAreas: ["Valbonne", "Mougins", "Biot", "Antibes"],
        landmarks: ["Business Pôle", "INRIA", "Amadeus", "Campus SKEMA"]
    },
    // Marseille et environs
    {
        name: "Marseille",
        slug: "seo-marseille",
        zipCode: "13000",
        lat: "43.2965",
        lng: "5.3698",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Bouches-du-Rhône",
        population: "870 000",
        description: "Deuxième ville de France, Marseille bouillonne d'activité économique. Port international, industrie, services : le potentiel SEO est immense pour dominer ce marché concurrentiel.",
        keyPoints: ["Port international stratégique", "Économie diversifiée", "Capitale culturelle"],
        nearbyAreas: ["Aix-en-Provence", "Aubagne", "Cassis", "La Ciotat"],
        landmarks: ["Vieux Port", "Notre-Dame de la Garde", "Mucem", "Calanques"]
    },
    {
        name: "Aix-en-Provence",
        slug: "seo-aix-en-provence",
        zipCode: "13100",
        lat: "43.5297",
        lng: "5.4474",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Bouches-du-Rhône",
        population: "145 000",
        description: "Ville d'art, d'histoire et de thermalisme, Aix-en-Provence attire touristes et étudiants. Commerces, restaurants, services : un SEO local solide vous démarque de la concurrence.",
        keyPoints: ["Ville universitaire", "Tourisme culturel", "Art de vivre provençal"],
        nearbyAreas: ["Marseille", "Gardanne", "Pertuis", "Salon-de-Provence"],
        landmarks: ["Cours Mirabeau", "Montagne Sainte-Victoire", "Thermes Sextius"]
    },
    // Paris et Île-de-France
    {
        name: "Paris",
        slug: "seo-paris",
        zipCode: "75000",
        lat: "48.8566",
        lng: "2.3522",
        region: "Île-de-France",
        department: "Paris",
        population: "2 200 000",
        description: "Capitale économique et culturelle, Paris concentre les sièges sociaux et une concurrence digitale féroce. Être visible sur Google Paris demande une stratégie SEO pointue et différenciante.",
        keyPoints: ["Capitale économique française", "Concurrence maximale", "Clientèle internationale"],
        nearbyAreas: ["Boulogne-Billancourt", "Neuilly-sur-Seine", "Levallois-Perret", "Issy-les-Moulineaux"],
        landmarks: ["Champs-Élysées", "Marais", "Saint-Germain", "La Défense"]
    },
    {
        name: "Boulogne-Billancourt",
        slug: "seo-boulogne-billancourt",
        zipCode: "92100",
        lat: "48.8396",
        lng: "2.2399",
        region: "Île-de-France",
        department: "Hauts-de-Seine",
        population: "120 000",
        description: "Première ville d'Île-de-France hors Paris, Boulogne-Billancourt est un pôle média et tech majeur. TF1, studios de production, agences : le référencement local y est capital.",
        keyPoints: ["Pôle média et audiovisuel", "Sièges sociaux", "Cadre de vie premium"],
        nearbyAreas: ["Issy-les-Moulineaux", "Sèvres", "Meudon", "Paris 16e"],
        landmarks: ["Île Seguin", "Parc de Saint-Cloud", "Studios Boulogne"]
    },
    // Bretagne
    {
        name: "Rennes",
        slug: "seo-rennes",
        zipCode: "35000",
        lat: "48.1173",
        lng: "-1.6778",
        region: "Bretagne",
        department: "Ille-et-Vilaine",
        population: "220 000",
        description: "Capitale bretonne dynamique, Rennes est un hub numérique et universitaire. Startups, ESN, agences : le référencement local permet de capter une clientèle tech et jeune.",
        keyPoints: ["Pôle numérique Rennes Atalante", "Ville étudiante", "French Tech Rennes"],
        nearbyAreas: ["Saint-Malo", "Cesson-Sévigné", "Bruz", "Vitré"],
        landmarks: ["Parlement de Bretagne", "Place des Lices", "Thabor"]
    },
    {
        name: "Nantes",
        slug: "seo-nantes",
        zipCode: "44000",
        lat: "47.2184",
        lng: "-1.5536",
        region: "Pays de la Loire",
        department: "Loire-Atlantique",
        population: "320 000",
        description: "Métropole créative et innovante, Nantes attire entrepreneurs et familles. Commerce, industrie agroalimentaire, numérique : le SEO local génère un trafic qualifié durable.",
        keyPoints: ["Économie créative", "Industrie navale", "French Tech Nantes"],
        nearbyAreas: ["Saint-Nazaire", "La Baule", "Rezé", "Saint-Herblain"],
        landmarks: ["Machines de l'île", "Château des ducs", "Île de Nantes"]
    },
    // Lyon et Rhône-Alpes
    {
        name: "Lyon",
        slug: "seo-lyon",
        zipCode: "69000",
        lat: "45.7640",
        lng: "4.8357",
        region: "Auvergne-Rhône-Alpes",
        department: "Rhône",
        population: "520 000",
        description: "Deuxième pôle économique français, Lyon combine industrie, gastronomie et innovation. Dans un marché aussi concurrentiel, le SEO local est un levier de croissance incontournable.",
        keyPoints: ["Capitale de la gastronomie", "Pôle chimie-pharma", "French Tech Lyon"],
        nearbyAreas: ["Villeurbanne", "Vénissieux", "Écully", "Caluire"],
        landmarks: ["Vieux Lyon", "Presqu'île", "Part-Dieu", "Confluence"]
    },
    {
        name: "Grenoble",
        slug: "seo-grenoble",
        zipCode: "38000",
        lat: "45.1885",
        lng: "5.7245",
        region: "Auvergne-Rhône-Alpes",
        department: "Isère",
        population: "160 000",
        description: "Capitale des Alpes françaises, Grenoble est un pôle scientifique et tech de premier plan. Startups, labos de recherche, tourisme montagne : le SEO génère des opportunités business uniques.",
        keyPoints: ["Recherche et innovation", "Sports d'hiver", "CEA, CNRS, INRIA"],
        nearbyAreas: ["Meylan", "Saint-Martin-d'Hères", "Échirolles", "Voiron"],
        landmarks: ["Bastille", "Polygone Scientifique", "Minatec"]
    },
    // Sud-Ouest
    {
        name: "Toulouse",
        slug: "seo-toulouse",
        zipCode: "31000",
        lat: "43.6047",
        lng: "1.4442",
        region: "Occitanie",
        department: "Haute-Garonne",
        population: "490 000",
        description: "Capitale européenne de l'aéronautique, Toulouse est une ville dynamique où cohabitent industrie high-tech et art de vivre. Le SEO local cible efficacement cette population active.",
        keyPoints: ["Airbus et aérospatial", "Ville étudiante", "French Tech Toulouse"],
        nearbyAreas: ["Blagnac", "Colomiers", "Tournefeuille", "Muret"],
        landmarks: ["Capitole", "Cité de l'espace", "Saint-Sernin", "Canal du Midi"]
    },
    {
        name: "Bordeaux",
        slug: "seo-bordeaux",
        zipCode: "33000",
        lat: "44.8378",
        lng: "-0.5792",
        region: "Nouvelle-Aquitaine",
        department: "Gironde",
        population: "260 000",
        description: "Métropole du vin et de l'art de vivre, Bordeaux attire entrepreneurs et touristes du monde entier. Le référencement local vous positionne sur ce marché premium en pleine expansion.",
        keyPoints: ["Patrimoine UNESCO", "Œnotourisme", "Économie créative"],
        nearbyAreas: ["Mérignac", "Pessac", "Talence", "Le Bouscat"],
        landmarks: ["Place de la Bourse", "Cité du Vin", "Saint-Pierre", "Darwin"]
    },
    {
        name: "Montpellier",
        slug: "seo-montpellier",
        zipCode: "34000",
        lat: "43.6108",
        lng: "3.8767",
        region: "Occitanie",
        department: "Hérault",
        population: "290 000",
        description: "Ville la plus dynamique démographiquement de France, Montpellier attire jeunes actifs et startups. Un terreau fertile pour le SEO local et l'acquisition de nouveaux clients.",
        keyPoints: ["Croissance démographique record", "Ville étudiante", "Santé et biotech"],
        nearbyAreas: ["Castelnau-le-Lez", "Lattes", "Pérols", "Palavas-les-Flots"],
        landmarks: ["Place de la Comédie", "Antigone", "Faculté de médecine"]
    },
    // Nord et Est
    {
        name: "Lille",
        slug: "seo-lille",
        zipCode: "59000",
        lat: "50.6292",
        lng: "3.0573",
        region: "Hauts-de-France",
        department: "Nord",
        population: "235 000",
        description: "Carrefour européen entre Paris, Londres et Bruxelles, Lille est un hub commercial et logistique majeur. Le SEO local capte une clientèle transfrontalière stratégique.",
        keyPoints: ["Carrefour européen", "Commerce et distribution", "EuraTechnologies"],
        nearbyAreas: ["Roubaix", "Tourcoing", "Villeneuve-d'Ascq", "Marcq-en-Barœul"],
        landmarks: ["Grand Place", "Vieux-Lille", "Euralille", "Citadelle"]
    },
    {
        name: "Strasbourg",
        slug: "seo-strasbourg",
        zipCode: "67000",
        lat: "48.5734",
        lng: "7.7521",
        region: "Grand Est",
        department: "Bas-Rhin",
        population: "285 000",
        description: "Capitale européenne et alsacienne, Strasbourg mêle institutions internationales et PME locales. Le référencement local permet de toucher aussi bien les décideurs que les particuliers.",
        keyPoints: ["Parlement européen", "Carrefour France-Allemagne", "Tourisme culturel"],
        nearbyAreas: ["Schiltigheim", "Illkirch-Graffenstaden", "Lingolsheim", "Kehl (DE)"],
        landmarks: ["Cathédrale", "Petite France", "Quartier européen"]
    }
];

// Helper functions
export function getCityBySlug(slug: string): CityData | undefined {
    return FRENCH_CITIES.find(city => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
    return FRENCH_CITIES.map(city => city.slug);
}

export function getCitiesByRegion(region: string): CityData[] {
    return FRENCH_CITIES.filter(city => city.region === region);
}

export function getNearbyCities(cityName: string, limit = 4): CityData[] {
    const city = FRENCH_CITIES.find(c => c.name === cityName);
    if (!city) return [];

    return FRENCH_CITIES
        .filter(c => c.name !== cityName && c.region === city.region)
        .slice(0, limit);
}

// Services disponibles pour le cocon sémantique
export const SERVICES_FOR_CITIES = [
    { name: "Consultant SEO", slug: "consultant-seo" },
    { name: "Audit SEO", slug: "audit-seo" },
    { name: "Community Manager", slug: "community-manager" },
    { name: "Création de Site Web", slug: "creation-site-web" },
    { name: "Refonte de Site Web", slug: "refonte-site-web" },
    { name: "Référencement Local", slug: "seo-local" }
];
