/**
 * Configuration des villes voisines pour le maillage interne SEO local
 * Utilisé par le composant NearbyLinks
 */

export const CITY_NEIGHBORS: Record<string, string[]> = {
    // Côte d'Azur
    "nice": ["cannes", "antibes", "monaco", "sophia-antipolis", "menton", "grasse"],
    "cannes": ["nice", "antibes", "grasse", "sophia-antipolis", "frejus", "mandelieu"],
    "antibes": ["nice", "cannes", "sophia-antipolis", "juan-les-pins", "biot"],
    "monaco": ["nice", "menton", "cap-d-ail", "beausoleil"],
    "sophia-antipolis": ["nice", "antibes", "cannes", "grasse", "valbonne"],

    // PACA
    "marseille": ["aix-en-provence", "toulon", "aubagne", "salon-de-provence", "martigues"],
    "aix-en-provence": ["marseille", "toulon", "salon-de-provence", "manosque"],
    "toulon": ["marseille", "aix-en-provence", "hyeres", "la-seyne-sur-mer"],

    // Île-de-France
    "paris": ["boulogne-billancourt", "neuilly-sur-seine", "levallois-perret", "issy-les-moulineaux", "saint-denis"],
    "boulogne-billancourt": ["paris", "neuilly-sur-seine", "issy-les-moulineaux", "sevres"],

    // Auvergne-Rhône-Alpes
    "lyon": ["villeurbanne", "grenoble", "saint-etienne", "annecy", "chambery"],
    "grenoble": ["lyon", "chambery", "valence", "annecy", "voiron"],

    // Occitanie
    "toulouse": ["bordeaux", "montpellier", "pau", "albi", "carcassonne"],
    "montpellier": ["toulouse", "nimes", "perpignan", "beziers", "sete"],

    // Nouvelle-Aquitaine
    "bordeaux": ["toulouse", "la-rochelle", "bayonne", "arcachon", "libourne"],

    // Pays de la Loire & Bretagne
    "nantes": ["rennes", "saint-nazaire", "angers", "la-roche-sur-yon"],
    "rennes": ["nantes", "brest", "saint-malo", "vannes", "lorient"],

    // Hauts-de-France
    "lille": ["roubaix", "dunkerque", "amiens", "valenciennes", "lens"],

    // Grand Est
    "strasbourg": ["metz", "nancy", "mulhouse", "colmar", "haguenau"],
};

/**
 * Obtient les villes voisines d'une ville donnée
 * @param citySlug - Le slug de la ville (ex: "nice", "paris")
 * @returns Liste des slugs des villes voisines
 */
export function getNeighborCities(citySlug: string): string[] {
    return CITY_NEIGHBORS[citySlug] || [];
}

/**
 * Vérifie si deux villes sont voisines
 */
export function areNeighbors(city1: string, city2: string): boolean {
    const neighbors = CITY_NEIGHBORS[city1];
    return neighbors ? neighbors.includes(city2) : false;
}
