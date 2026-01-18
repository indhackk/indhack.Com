/**
 * GMB AutoPilot - Geo-SEO Semantic Engine
 * Intelligence sémantique géolocalisée pour maximiser l'impact SEO local
 */

import { GeoKeyword, KeywordSuggestion, CityKeywordProfile } from './types';

// ═══════════════════════════════════════════════════════════════
// BASE DE DONNÉES VILLES FRANÇAISES
// ═══════════════════════════════════════════════════════════════

const FRENCH_CITIES: Record<string, CityKeywordProfile> = {
    'paris': {
        city: 'Paris',
        region: 'Île-de-France',
        population: 2148000,
        primaryKeywords: ['parisien', 'capitale', 'métropole'],
        localExpressions: ['dans le quartier', 'au coeur de Paris', 'en plein Paris'],
        competitors: ['meilleur', 'top', 'numéro 1']
    },
    'marseille': {
        city: 'Marseille',
        region: 'Provence-Alpes-Côte d\'Azur',
        population: 870000,
        primaryKeywords: ['marseillais', 'phocéen', 'provençal'],
        localExpressions: ['sur le Vieux-Port', 'dans la cité phocéenne', 'au soleil de Marseille'],
        competitors: ['authentique', 'traditionnel', 'réputé']
    },
    'lyon': {
        city: 'Lyon',
        region: 'Auvergne-Rhône-Alpes',
        population: 516000,
        primaryKeywords: ['lyonnais', 'rhodanien', 'bouchon'],
        localExpressions: ['dans la capitale des Gaules', 'entre Rhône et Saône', 'au coeur de Lyon'],
        competitors: ['renommé', 'incontournable', 'de référence']
    },
    'toulouse': {
        city: 'Toulouse',
        region: 'Occitanie',
        population: 486000,
        primaryKeywords: ['toulousain', 'occitan', 'ville rose'],
        localExpressions: ['dans la ville rose', 'au pays du cassoulet', 'sous le soleil toulousain'],
        competitors: ['authentique', 'local', 'du terroir']
    },
    'nice': {
        city: 'Nice',
        region: 'Provence-Alpes-Côte d\'Azur',
        population: 342000,
        primaryKeywords: ['niçois', 'azuréen', 'méditerranéen'],
        localExpressions: ['sur la Côte d\'Azur', 'face à la Méditerranée', 'dans la baie des Anges'],
        competitors: ['premium', 'de standing', 'haut de gamme']
    },
    'strasbourg': {
        city: 'Strasbourg',
        region: 'Grand Est',
        population: 284000,
        primaryKeywords: ['strasbourgeois', 'alsacien', 'européen'],
        localExpressions: ['au coeur de l\'Europe', 'dans la capitale alsacienne', 'en Alsace'],
        competitors: ['reconnu', 'certifié', 'de confiance']
    },
    'bordeaux': {
        city: 'Bordeaux',
        region: 'Nouvelle-Aquitaine',
        population: 257000,
        primaryKeywords: ['bordelais', 'girondin', 'aquitain'],
        localExpressions: ['dans la belle endormie', 'au pays des grands crus', 'sur les quais de Bordeaux'],
        competitors: ['prestigieux', 'élégant', 'raffiné']
    },
    'lille': {
        city: 'Lille',
        region: 'Hauts-de-France',
        population: 232000,
        primaryKeywords: ['lillois', 'ch\'ti', 'nordiste'],
        localExpressions: ['dans le Nord', 'au coeur des Flandres', 'dans la capitale des Flandres'],
        competitors: ['chaleureux', 'convivial', 'accueillant']
    },
    'nantes': {
        city: 'Nantes',
        region: 'Pays de la Loire',
        population: 314000,
        primaryKeywords: ['nantais', 'ligérien', 'breton'],
        localExpressions: ['sur les bords de Loire', 'dans la Venise de l\'Ouest', 'au coeur de Nantes'],
        competitors: ['innovant', 'dynamique', 'créatif']
    },
    'montpellier': {
        city: 'Montpellier',
        region: 'Occitanie',
        population: 290000,
        primaryKeywords: ['montpelliérain', 'héraultais', 'occitan'],
        localExpressions: ['sous le soleil du Languedoc', 'dans la surdouée', 'à Montpellier'],
        competitors: ['moderne', 'jeune', 'tendance']
    },
    'rennes': {
        city: 'Rennes',
        region: 'Bretagne',
        population: 216000,
        primaryKeywords: ['rennais', 'breton', 'armoricain'],
        localExpressions: ['en Bretagne', 'dans la capitale bretonne', 'au coeur de Rennes'],
        competitors: ['authentique', 'local', 'de qualité']
    },
    'dijon': {
        city: 'Dijon',
        region: 'Bourgogne-Franche-Comté',
        population: 156000,
        primaryKeywords: ['dijonnais', 'bourguignon', 'ducal'],
        localExpressions: ['en Bourgogne', 'dans la cité des Ducs', 'au pays de la moutarde'],
        competitors: ['traditionnel', 'artisanal', 'du terroir']
    }
};

// ═══════════════════════════════════════════════════════════════
// CATÉGORIES MÉTIERS ET MOTS-CLÉS ASSOCIÉS
// ═══════════════════════════════════════════════════════════════

const BUSINESS_CATEGORIES: Record<string, {
    keywords: string[];
    actions: string[];
    qualities: string[];
    services: string[];
}> = {
    'Restaurant': {
        keywords: ['restaurant', 'cuisine', 'gastronomie', 'repas', 'menu', 'chef'],
        actions: ['déguster', 'savourer', 'découvrir', 'réserver'],
        qualities: ['délicieux', 'savoureux', 'raffiné', 'authentique', 'fait maison'],
        services: ['terrasse', 'livraison', 'traiteur', 'privatisation', 'menu du jour']
    },
    'Garage automobile': {
        keywords: ['garage', 'mécanique', 'réparation', 'entretien', 'auto'],
        actions: ['réparer', 'entretenir', 'diagnostiquer', 'contrôler'],
        qualities: ['professionnel', 'rapide', 'fiable', 'transparent', 'expert'],
        services: ['vidange', 'pneus', 'freins', 'climatisation', 'contrôle technique']
    },
    'Salon de coiffure': {
        keywords: ['coiffeur', 'salon', 'coiffure', 'coupe', 'styliste'],
        actions: ['coiffer', 'colorer', 'styliser', 'transformer'],
        qualities: ['tendance', 'expert', 'créatif', 'à l\'écoute', 'talentueux'],
        services: ['coloration', 'balayage', 'coupe homme', 'coupe femme', 'lissage']
    },
    'Boulangerie': {
        keywords: ['boulangerie', 'pain', 'pâtisserie', 'viennoiserie', 'artisan'],
        actions: ['déguster', 'savourer', 'découvrir', 'commander'],
        qualities: ['artisanal', 'frais', 'croustillant', 'fait maison', 'traditionnel'],
        services: ['pain spéciaux', 'gâteaux', 'commandes', 'traiteur sucré']
    },
    'Hôtel': {
        keywords: ['hôtel', 'hébergement', 'séjour', 'chambre', 'nuit'],
        actions: ['séjourner', 'réserver', 'découvrir', 'profiter'],
        qualities: ['confortable', 'accueillant', 'élégant', 'calme', 'bien situé'],
        services: ['petit-déjeuner', 'spa', 'parking', 'wifi', 'room service']
    },
    'Plombier': {
        keywords: ['plombier', 'plomberie', 'dépannage', 'installation', 'sanitaire'],
        actions: ['réparer', 'installer', 'dépanner', 'intervenir'],
        qualities: ['rapide', 'professionnel', 'ponctuel', 'efficace', 'disponible'],
        services: ['urgences', 'débouchage', 'chauffe-eau', 'fuite', 'installation']
    },
    'Dentiste': {
        keywords: ['dentiste', 'cabinet dentaire', 'soins dentaires', 'orthodontie'],
        actions: ['soigner', 'traiter', 'conseiller', 'accompagner'],
        qualities: ['doux', 'attentionné', 'expert', 'moderne', 'rassurant'],
        services: ['détartrage', 'implants', 'blanchiment', 'urgences', 'orthodontie']
    },
    'Avocat': {
        keywords: ['avocat', 'cabinet', 'conseil juridique', 'droit'],
        actions: ['défendre', 'conseiller', 'accompagner', 'représenter'],
        qualities: ['compétent', 'réactif', 'à l\'écoute', 'expérimenté', 'disponible'],
        services: ['consultation', 'contentieux', 'médiation', 'conseil', 'rédaction']
    },
    'default': {
        keywords: ['service', 'qualité', 'professionnel', 'entreprise'],
        actions: ['accompagner', 'conseiller', 'aider', 'servir'],
        qualities: ['professionnel', 'fiable', 'réactif', 'à l\'écoute'],
        services: ['conseil', 'accompagnement', 'sur-mesure', 'devis gratuit']
    }
};

// ═══════════════════════════════════════════════════════════════
// MOTEUR DE SUGGESTIONS GEO-SEO
// ═══════════════════════════════════════════════════════════════

/**
 * Extrait la ville d'une adresse
 */
function extractCityFromAddress(address: string): string {
    // Pattern: code postal + ville
    const match = address.match(/\d{5}\s+([A-Za-zÀ-ÿ\s-]+)/);
    if (match) {
        return match[1].trim().toLowerCase();
    }

    // Fallback: chercher une ville connue
    const addressLower = address.toLowerCase();
    for (const city of Object.keys(FRENCH_CITIES)) {
        if (addressLower.includes(city)) {
            return city;
        }
    }

    return '';
}

/**
 * Génère des mots-clés géolocalisés dynamiques
 */
export function generateGeoKeywords(
    businessCategory: string,
    address: string,
    existingKeywords: string[] = []
): GeoKeyword[] {
    const city = extractCityFromAddress(address);
    const cityProfile = FRENCH_CITIES[city];
    const categoryData = BUSINESS_CATEGORIES[businessCategory] || BUSINESS_CATEGORIES['default'];

    const geoKeywords: GeoKeyword[] = [];

    // 1. Mot-clé principal: "Meilleur [Métier] à [Ville]"
    if (cityProfile) {
        geoKeywords.push({
            keyword: `meilleur ${categoryData.keywords[0]} ${cityProfile.city}`,
            type: 'primary',
            searchVolume: Math.floor(1000 + cityProfile.population / 100),
            difficulty: 'hard',
            relevanceScore: 95,
            city: cityProfile.city
        });

        // 2. Mot-clé secondaire: "[Métier] [Ville]"
        geoKeywords.push({
            keyword: `${categoryData.keywords[0]} ${cityProfile.city}`,
            type: 'primary',
            searchVolume: Math.floor(2000 + cityProfile.population / 50),
            difficulty: 'medium',
            relevanceScore: 90,
            city: cityProfile.city
        });

        // 3. Long-tail: "[Métier] [adjectif local] à [Ville]"
        geoKeywords.push({
            keyword: `${categoryData.keywords[0]} ${cityProfile.primaryKeywords[0]}`,
            type: 'long-tail',
            searchVolume: Math.floor(200 + cityProfile.population / 500),
            difficulty: 'easy',
            relevanceScore: 85,
            city: cityProfile.city
        });

        // 4. Mots-clés de service localisés
        categoryData.services.slice(0, 2).forEach(service => {
            geoKeywords.push({
                keyword: `${service} ${cityProfile.city}`,
                type: 'secondary',
                searchVolume: Math.floor(100 + cityProfile.population / 1000),
                difficulty: 'easy',
                relevanceScore: 75,
                city: cityProfile.city
            });
        });

        // 5. Expression locale
        geoKeywords.push({
            keyword: cityProfile.localExpressions[0],
            type: 'local',
            searchVolume: 50,
            difficulty: 'easy',
            relevanceScore: 70,
            city: cityProfile.city
        });
    }

    // Ajouter les mots-clés existants s'ils ne sont pas déjà présents
    existingKeywords.forEach(kw => {
        if (!geoKeywords.find(gk => gk.keyword.toLowerCase() === kw.toLowerCase())) {
            geoKeywords.push({
                keyword: kw,
                type: 'secondary',
                searchVolume: 100,
                difficulty: 'medium',
                relevanceScore: 60
            });
        }
    });

    return geoKeywords.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Génère des suggestions de mots-clés avec exemples d'intégration
 */
export function generateKeywordSuggestions(
    businessCategory: string,
    city: string,
    reviewContent: string
): KeywordSuggestion[] {
    const cityLower = city.toLowerCase();
    const cityProfile = FRENCH_CITIES[cityLower];
    const categoryData = BUSINESS_CATEGORIES[businessCategory] || BUSINESS_CATEGORIES['default'];

    const suggestions: KeywordSuggestion[] = [];

    if (!cityProfile) {
        // Suggestions génériques si ville non trouvée
        suggestions.push({
            keyword: `${categoryData.keywords[0]} professionnel`,
            type: 'secondary',
            reason: 'Renforce votre expertise métier',
            estimatedImpact: 15,
            example: `Chez nous, le ${categoryData.keywords[0]} professionnel est notre signature.`
        });
        return suggestions;
    }

    // 1. Suggestion primaire géolocalisée
    suggestions.push({
        keyword: `${categoryData.keywords[0]} ${cityProfile.city}`,
        type: 'primary',
        reason: `Cible les recherches locales de ${cityProfile.city}`,
        estimatedImpact: 35,
        example: `Merci de faire confiance à notre ${categoryData.keywords[0]} ${cityProfile.city.toLowerCase()} !`
    });

    // 2. Suggestion avec adjectif local
    suggestions.push({
        keyword: categoryData.qualities[0],
        type: 'secondary',
        reason: `Met en avant la qualité ${categoryData.qualities[0]} de vos services`,
        estimatedImpact: 20,
        example: `Notre service ${categoryData.qualities[0]} fait notre réputation.`
    });

    // 3. Expression locale naturelle
    suggestions.push({
        keyword: cityProfile.localExpressions[0],
        type: 'local',
        reason: `Ancre votre entreprise ${cityProfile.localExpressions[0]}`,
        estimatedImpact: 15,
        example: `Situés ${cityProfile.localExpressions[0]}, nous sommes ravis de vous accueillir.`
    });

    // 4. Service spécifique
    const reviewLower = reviewContent.toLowerCase();
    const mentionedService = categoryData.services.find(s =>
        reviewLower.includes(s.toLowerCase())
    );

    if (mentionedService) {
        suggestions.push({
            keyword: `${mentionedService} ${cityProfile.city}`,
            type: 'long-tail',
            reason: `Le client a mentionné ce service, capitalisez dessus`,
            estimatedImpact: 25,
            example: `Notre ${mentionedService} à ${cityProfile.city} est reconnu pour sa qualité.`
        });
    }

    return suggestions.sort((a, b) => b.estimatedImpact - a.estimatedImpact);
}

/**
 * Intègre les mots-clés de manière naturelle dans une réponse
 * (Natural Language Integration)
 */
export function integrateKeywordsNaturally(
    baseResponse: string,
    keywords: GeoKeyword[],
    maxKeywords: number = 3
): { response: string; usedKeywords: string[]; naturalScore: number } {
    let response = baseResponse;
    const usedKeywords: string[] = [];
    let naturalScore = 100;

    // Trier par pertinence
    const sortedKeywords = keywords
        .filter(kw => kw.type !== 'local') // Les locaux seront traités séparément
        .slice(0, maxKeywords);

    // Patterns d'intégration naturelle
    const integrationPatterns = [
        {
            pattern: /\.$(?!.*\.$)/,
            template: (kw: string) => `. Fiers d'être reconnus comme ${kw}.`,
            scoreImpact: -5
        },
        {
            pattern: /merci/i,
            template: (kw: string) => `Merci de faire confiance à notre équipe de ${kw}`,
            scoreImpact: -3
        },
        {
            pattern: /revoir|bientôt/i,
            template: (kw: string) => `Au plaisir de vous retrouver pour du ${kw} de qualité`,
            scoreImpact: -2
        }
    ];

    for (const keyword of sortedKeywords) {
        // Vérifier si le mot-clé n'est pas déjà présent
        if (response.toLowerCase().includes(keyword.keyword.toLowerCase())) {
            usedKeywords.push(keyword.keyword);
            continue;
        }

        // Trouver le meilleur pattern d'intégration
        let integrated = false;
        for (const pattern of integrationPatterns) {
            if (pattern.pattern.test(response) && !integrated) {
                // Intégrer de manière contextuelle
                const keywordPart = keyword.keyword.split(' ')[0]; // Premier mot
                if (keyword.type === 'primary' && keyword.city) {
                    // Pour les mots-clés primaires avec ville
                    response = response.replace(
                        /\.\s*$/,
                        `. À bientôt chez votre ${keywordPart} à ${keyword.city} !`
                    );
                } else {
                    // Intégration plus subtile
                    response = response.replace(
                        /\.\s*$/,
                        `. Notre engagement ${keywordPart} fait notre force.`
                    );
                }
                usedKeywords.push(keyword.keyword);
                naturalScore += pattern.scoreImpact;
                integrated = true;
                break;
            }
        }

        // Si aucun pattern ne match, ajouter à la fin de manière élégante
        if (!integrated && usedKeywords.length < 2) {
            const suffix = keyword.city
                ? ` Votre satisfaction à ${keyword.city} est notre priorité.`
                : ` Nous mettons un point d'honneur sur la qualité.`;
            response = response.replace(/\.\s*$/, '.' + suffix);
            usedKeywords.push(keyword.keyword);
            naturalScore -= 10;
        }
    }

    // Ajouter une expression locale si disponible
    const localKeyword = keywords.find(kw => kw.type === 'local');
    if (localKeyword && !response.toLowerCase().includes(localKeyword.keyword.toLowerCase())) {
        // Intégrer subtilement
        response = response.replace(
            /chez (nous|notre)/i,
            `chez nous ${localKeyword.keyword}`
        );
        if (response.includes(localKeyword.keyword)) {
            usedKeywords.push(localKeyword.keyword);
            naturalScore -= 2;
        }
    }

    // Normaliser le score
    naturalScore = Math.max(0, Math.min(100, naturalScore));

    return {
        response,
        usedKeywords,
        naturalScore
    };
}

/**
 * Récupère le profil d'une ville
 */
export function getCityProfile(city: string): CityKeywordProfile | null {
    return FRENCH_CITIES[city.toLowerCase()] || null;
}

/**
 * Liste toutes les villes supportées
 */
export function getSupportedCities(): string[] {
    return Object.keys(FRENCH_CITIES).map(k => FRENCH_CITIES[k].city);
}

/**
 * Récupère les données de catégorie métier
 */
export function getCategoryData(category: string) {
    return BUSINESS_CATEGORIES[category] || BUSINESS_CATEGORIES['default'];
}
