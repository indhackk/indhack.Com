/**
 * Configuration des villes voisines pour le maillage interne SEO local
 * Utilisé par le composant NearbyLinks
 */

// Voisinages : on garde les villes géographiquement proches même si elles n'existent
// pas comme pages IndHack (le filter dans NearbyLinks les ignore), puis on ajoute en
// queue des villes IndHack stratégiques pour garantir un maillage minimal de 3 liens
// vers des pages existantes — y compris pour les villes "isolées" (Lille, Strasbourg).
export const CITY_NEIGHBORS: Record<string, string[]> = {
    // Côte d'Azur — toutes voisines entre elles, maillage dense
    "nice": ["cannes", "antibes", "monaco", "sophia-antipolis", "juan-les-pins", "menton", "grasse"],
    "cannes": ["nice", "antibes", "sophia-antipolis", "juan-les-pins", "monaco", "grasse", "frejus"],
    "antibes": ["nice", "cannes", "sophia-antipolis", "juan-les-pins", "monaco", "biot"],
    "monaco": ["nice", "antibes", "cannes", "sophia-antipolis", "menton", "cap-d-ail"],
    "sophia-antipolis": ["nice", "antibes", "cannes", "juan-les-pins", "monaco", "grasse", "valbonne"],
    "juan-les-pins": ["antibes", "nice", "cannes", "sophia-antipolis", "monaco"],

    // PACA — Aix/Marseille connectées avec Côte d'Azur
    "marseille": ["aix-en-provence", "monaco", "nice", "cannes", "toulon", "aubagne"],
    "aix-en-provence": ["marseille", "monaco", "nice", "cannes", "toulon", "salon-de-provence"],

    // Île-de-France
    "paris": ["boulogne-billancourt", "lille", "rennes", "nantes", "neuilly-sur-seine", "levallois-perret"],
    "boulogne-billancourt": ["paris", "lille", "rennes", "nantes", "neuilly-sur-seine"],

    // Auvergne-Rhône-Alpes
    "lyon": ["grenoble", "marseille", "aix-en-provence", "strasbourg", "villeurbanne"],
    "grenoble": ["lyon", "marseille", "aix-en-provence", "strasbourg", "chambery"],

    // Occitanie
    "toulouse": ["bordeaux", "montpellier", "marseille", "pau", "albi"],
    "montpellier": ["toulouse", "marseille", "aix-en-provence", "nimes", "perpignan"],

    // Nouvelle-Aquitaine
    "bordeaux": ["toulouse", "nantes", "rennes", "montpellier", "la-rochelle"],

    // Pays de la Loire & Bretagne
    "nantes": ["rennes", "bordeaux", "paris", "boulogne-billancourt", "saint-nazaire"],
    "rennes": ["nantes", "paris", "boulogne-billancourt", "bordeaux", "brest"],

    // Hauts-de-France — fallback Paris/Boulogne (villes IndHack les plus proches géographiquement)
    "lille": ["paris", "boulogne-billancourt", "rennes", "nantes", "roubaix", "dunkerque"],

    // Grand Est — fallback Paris/Lyon/Grenoble
    "strasbourg": ["paris", "lyon", "grenoble", "boulogne-billancourt", "metz", "nancy", "mulhouse"],
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
