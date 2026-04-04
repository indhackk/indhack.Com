// Données centralisées des villes pour le SEO Local
// CONTENU 100% UNIQUE PAR VILLE - Optimisé SEO avec maillage interne

export interface CityImage {
    src: string;
    alt: string;
    title: string;
    keywords: string[];
}

export interface CityImages {
    hero: CityImage;
    workspace: CityImage;
    landmark: CityImage;
}

// Nouveau: Contexte unique par ville
export interface CityContext {
    marketType: "luxury" | "tech" | "volume" | "local" | "premium";
    competitionLevel: "extreme" | "high" | "medium" | "moderate";
    targetClients: string;
    localInsight: string;
    specificChallenges: string[];
    businessTypes: string[];
}

export interface CityData {
    name: string;
    slug: string;
    zipCode: string;
    lat: string;
    lng: string;
    region: string;
    department: string;
    deptCode: string;
    population: string;
    description: string;
    keyPoints: string[];
    nearbyAreas: string[];
    landmarks: string[];
    images: CityImages;
    context: CityContext;
}

export const FRENCH_CITIES: CityData[] = [
    // CÔTE D'AZUR - MARCHÉ LUXE & TOURISME
    {
        name: "Nice",
        slug: "consultant-seo-nice",
        zipCode: "06000",
        lat: "43.7102",
        lng: "7.2620",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        deptCode: "06",
        population: "340 000",
        description: "À Nice, la bataille digitale se joue quartier par quartier. Sur le Vieux-Nice, les restaurants de la rue Pairolière affrontent Booking et TheFork pour capter le touriste. Du côté de Cimiez, les cliniques et cabinets médicaux se disputent les requêtes santé. À l'Arénas, le pôle d'affaires Nice Méridia fait monter les enchères sur le B2B. Et avec 14 millions de touristes par an (OCA 2025), chaque position perdue sur Google coûte des milliers d'euros de chiffre d'affaires. IndHack connaît ces micro-marchés niçois.",
        keyPoints: ["14 millions de touristes/an (70 % de recherches mobiles en EN/IT)", "Micro-marchés : Vieux-Nice, Cimiez, Libération, Arénas", "Booking/TheFork captent 80 % des clics tourisme"],
        nearbyAreas: ["Villefranche-sur-Mer", "Saint-Laurent-du-Var", "Cagnes-sur-Mer", "Beaulieu-sur-Mer"],
        landmarks: ["Promenade des Anglais", "Vieux-Nice", "Port de Nice", "Place Masséna"],
        images: {
            hero: { src: "/images/cities/nice-promenade-anglais.jpg", alt: "Consultante SEO Nice Promenade des Anglais", title: "Audit SEO Nice Côte d'Azur", keywords: ["SEO Nice", "référencement Nice", "consultant SEO Nice 06"] },
            workspace: { src: "/images/cities/nice-vieux-nice.jpg", alt: "Expert SEO Nice Vieux-Nice", title: "Référencement naturel Nice", keywords: ["audit SEO Nice", "agence SEO Nice"] },
            landmark: { src: "/images/cities/nice-place-massena.jpg", alt: "SEO local Nice Place Masséna", title: "SEO local Nice 06", keywords: ["SEO local Nice", "Google My Business Nice"] }
        },
        context: {
            marketType: "luxury",
            competitionLevel: "high",
            targetClients: "hôteliers du Vieux-Nice et de la Promenade, restaurateurs de Cimiez et du port, agences immobilières (Engel & Völkers, Barnes) et cliniques privées de Cimiez",
            localInsight: "70 % des recherches sont mobiles en anglais ou italien (touristes des croisières Costa et MSC au port). Le marché local Nice est segmenté : Vieux-Nice = restauration/tourisme, Cimiez = santé/médical, Arénas/Nice Méridia = B2B tech, Libération = artisans",
            specificChallenges: ["SEO multilingue FR/EN/IT obligatoire", "Booking et TheFork captent les clics tourisme", "Concurrence des chaînes Accor/Marriott sur les requêtes hôtelières"],
            businessTypes: ["Hôtellerie", "Restauration", "Immobilier luxe", "Santé/Cliniques"]
        }
    },
    {
        name: "Cannes",
        slug: "consultant-seo-cannes",
        zipCode: "06400",
        lat: "43.5528",
        lng: "7.0174",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        deptCode: "06",
        population: "74 000",
        description: "Cannes ne vit pas que du Festival : le MIPIM (immobilier), le MAPIC (retail) et les Lions de la Créativité génèrent 4 pics de recherche par an. Sur la Croisette, les agences immobilières (John Taylor, Michaël Zingraf) se battent pour des requêtes à 15 €/clic sur Google Ads. Au Suquet, les restaurateurs perdent face aux agrégateurs. Et sur le marché du yachting au Port Canto, la concurrence se joue en anglais, entre Antibes et Monaco. IndHack connaît le calendrier événementiel cannois et adapte la stratégie à chaque pic.",
        keyPoints: ["4 événements mondiaux/an (Festival, MIPIM, MAPIC, Lions)", "CPC immobilier à 15 €+ sur Google Ads", "Yachting : marché anglophone Port Canto"],
        nearbyAreas: ["Le Cannet", "Mougins", "Mandelieu-la-Napoule", "Théoule-sur-Mer"],
        landmarks: ["La Croisette", "Palais des Festivals", "Vieux Port", "Le Suquet"],
        images: {
            hero: { src: "/images/cities/cannes-croisette.jpg", alt: "Consultante SEO Cannes La Croisette", title: "Audit SEO Cannes 06", keywords: ["SEO Cannes", "référencement Cannes", "consultant SEO Cannes"] },
            workspace: { src: "/images/cities/cannes-palais-festivals.jpg", alt: "Expert SEO Cannes Palais des Festivals", title: "Référencement naturel Cannes", keywords: ["audit SEO Cannes", "SEO luxe Cannes"] },
            landmark: { src: "/images/cities/cannes-vieux-port.jpg", alt: "SEO local Cannes Vieux Port", title: "SEO local Cannes 06", keywords: ["SEO local Cannes", "Le Suquet"] }
        },
        context: {
            marketType: "luxury",
            competitionLevel: "extreme",
            targetClients: "agences immobilières de la Croisette (John Taylor, Michaël Zingraf), yachtbrokers du Port Canto, hôtels 5 étoiles (Carlton, Martinez) et prestataires MIPIM/MAPIC",
            localInsight: "Le calendrier SEO cannois est dicté par les salons : MIPIM (mars), Festival (mai), MAPIC (novembre). Chaque événement génère un pic de requêtes spécifique — 'immobilier Cannes' explose en mars, 'restaurant étoilé Cannes' en mai. La stratégie doit anticiper ces pics 2-3 mois avant",
            specificChallenges: ["CPC immobilier à 15 €+, le plus élevé de PACA", "Requêtes yachting 100 % anglophone", "Les OTA captent le trafic hôtelier (Booking, Expedia)"],
            businessTypes: ["Immobilier prestige", "Yachting", "Événementiel B2B", "Restauration gastronomique"]
        }
    },
    {
        name: "Antibes",
        slug: "consultant-seo-antibes",
        zipCode: "06600",
        lat: "43.5804",
        lng: "7.1251",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        deptCode: "06",
        population: "73 000",
        description: "Port Vauban, premier port de plaisance d'Europe : le yachting antibois génère des millions de recherches par an. Mais la vieille ville et ses artisans se battent contre les algorithmes des grandes plateformes. IndHack redonne du pouvoir au commerce local face aux géants du web.",
        keyPoints: ["Port Vauban & yachting", "Tourisme et artisanat local", "Proximité Juan-les-Pins"],
        nearbyAreas: ["Juan-les-Pins", "Vallauris", "Biot", "Villeneuve-Loubet"],
        landmarks: ["Port Vauban", "Vieille Ville", "Cap d'Antibes", "Marché Provençal"],
        images: {
            hero: { src: "/images/cities/antibes-port-vauban.jpg", alt: "Consultante SEO Antibes Port Vauban", title: "Audit SEO Antibes 06", keywords: ["SEO Antibes", "référencement Antibes"] },
            workspace: { src: "/images/cities/antibes-vieille-ville.jpg", alt: "Expert SEO Antibes Vieille Ville", title: "Référencement naturel Antibes", keywords: ["audit SEO Antibes", "Juan-les-Pins"] },
            landmark: { src: "/images/cities/antibes-cap.jpg", alt: "SEO local Antibes Cap d'Antibes", title: "SEO local Antibes 06", keywords: ["SEO local Antibes", "yachting Antibes"] }
        },
        context: {
            marketType: "premium",
            competitionLevel: "high",
            targetClients: "professionnels du yachting, artisans du Vieil Antibes, restaurateurs et boutiques du Marché Provençal",
            localInsight: "Les recherches 'yacht services Antibes' représentent un marché de plusieurs millions d'euros par an",
            specificChallenges: ["Double marché luxe/local", "Saisonnalité marquée", "Concurrence Juan-les-Pins"],
            businessTypes: ["Yachting", "Artisanat", "Restauration", "Commerce local"]
        }
    },
    {
        name: "Juan-les-Pins",
        slug: "consultant-seo-juan-les-pins",
        zipCode: "06160",
        lat: "43.5667",
        lng: "7.1083",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        deptCode: "06",
        population: "15 000",
        description: "Juan-les-Pins, c'est le Saint-Tropez de la Côte d'Azur accessible : plages privées, clubs de nuit légendaires et le festival Jazz à Juan qui attire 70 000 visiteurs chaque été. Ici, la saison dure 4 mois mais génère le CA d'une année. Être invisible sur Google en juin, c'est perdre sa saison. IndHack positionne les établissements AVANT l'afflux estival.",
        keyPoints: ["Jazz à Juan (70 000 visiteurs)", "Nightlife & beach clubs", "Pic saisonnier été"],
        nearbyAreas: ["Antibes", "Golfe-Juan", "Vallauris", "Cannes"],
        landmarks: ["Plage de Juan", "Pinède Gould", "Casino Eden", "Port Gallice"],
        images: {
            hero: { src: "/images/cities/juan-les-pins-plage.jpg", alt: "Consultant SEO Juan-les-Pins plage", title: "SEO Juan-les-Pins 06", keywords: ["SEO Juan-les-Pins", "référencement Juan-les-Pins"] },
            workspace: { src: "/images/cities/juan-les-pins-festival.jpg", alt: "Expert SEO Juan-les-Pins Jazz", title: "Référencement naturel Juan-les-Pins", keywords: ["audit SEO Juan-les-Pins", "Jazz à Juan"] },
            landmark: { src: "/images/cities/juan-les-pins-pinede.jpg", alt: "SEO local Juan-les-Pins Pinède", title: "SEO local Juan-les-Pins 06", keywords: ["SEO local Juan-les-Pins", "beach club"] }
        },
        context: {
            marketType: "premium",
            competitionLevel: "high",
            targetClients: "gérants de plages privées, hôteliers saisonniers, restaurateurs, clubs de nuit et organisateurs d'événements",
            localInsight: "75% du CA annuel se fait entre juin et septembre — le référencement doit être prêt AVANT la saison",
            specificChallenges: ["Ultra-saisonnalité (4 mois)", "Concurrence Cannes et Saint-Tropez", "Clientèle jeune et internationale"],
            businessTypes: ["Beach clubs", "Hôtellerie", "Nightlife", "Restauration estivale"]
        }
    },
    {
        name: "Monaco",
        slug: "consultant-seo-monaco",
        zipCode: "98000",
        lat: "43.7384",
        lng: "7.4246",
        region: "Principauté de Monaco",
        department: "Monaco",
        deptCode: "98",
        population: "39 000",
        description: "Monaco : 2km², 39 000 habitants, mais un PIB par habitant record mondial. Ici, l'approximatif n'existe pas. Family offices, banques privées, services de conciergerie ultra-premium : vos clients potentiels recherchent l'excellence. IndHack positionne votre expertise là où l'argent circule : en page 1.",
        keyPoints: ["Clientèle UHNWI", "Exigence absolue", "Multilinguisme obligatoire"],
        nearbyAreas: ["Monte-Carlo", "La Condamine", "Fontvieille", "Beausoleil"],
        landmarks: ["Place du Casino", "Port Hercule", "Carré d'Or", "Rocher"],
        images: {
            hero: { src: "/images/cities/monaco-casino.jpg", alt: "Consultante SEO Monaco Casino Monte-Carlo", title: "Audit SEO Monaco 98", keywords: ["SEO Monaco", "référencement Monaco"] },
            workspace: { src: "/images/cities/monaco-port-hercule.jpg", alt: "Expert SEO Monaco Port Hercule", title: "Référencement naturel Monaco", keywords: ["audit SEO Monaco", "SEO luxe Monaco"] },
            landmark: { src: "/images/cities/monaco-rocher.jpg", alt: "SEO local Monaco Rocher", title: "SEO local Monaco 98", keywords: ["SEO local Monaco", "Palais Princier"] }
        },
        context: {
            marketType: "luxury",
            competitionLevel: "extreme",
            targetClients: "family offices, banques privées, cabinets d'avocats fiscalistes, services de conciergerie et gestionnaires de patrimoine",
            localInsight: "Le trafic de recherche est 60% en anglais, 20% en français, 10% en russe et italien — SEO multilingue obligatoire",
            specificChallenges: ["Volume de recherche faible mais ultra-qualifié", "Clients internationaux exigeants", "Réputation en ligne critique"],
            businessTypes: ["Gestion de patrimoine", "Services juridiques", "Conciergerie luxe", "Immobilier prestige"]
        }
    },
    {
        name: "Sophia-Antipolis",
        slug: "consultant-seo-sophia-antipolis",
        zipCode: "06560",
        lat: "43.6163",
        lng: "7.0557",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Alpes-Maritimes",
        deptCode: "06",
        population: "2 500 entreprises",
        description: "Sophia-Antipolis n'est pas un quartier d'Antibes, c'est un écosystème à part : 2 500 entreprises, 40 000 emplois, et des acteurs comme Amadeus (n°1 mondial de la réservation), SAP, NXP Semiconductors, Galderma ou Accenture. Le W3C et l'ETSI y définissent les standards du web. Ici, votre concurrent SEO n'est pas le plombier du coin — c'est une scale-up B2B avec un budget marketing à 6 chiffres. IndHack parle le langage SaaS, product-led growth et content marketing B2B.",
        keyPoints: ["2 500 entreprises (Amadeus, SAP, NXP, Galderma, ETSI, W3C)", "Compétition B2B SaaS à budgets marketing 6 chiffres", "SEO content marketing long cycle de vente (6-12 mois)"],
        nearbyAreas: ["Valbonne", "Mougins", "Biot", "Antibes"],
        landmarks: ["Place Sophie Laffitte", "SKEMA", "Amadeus", "INRIA"],
        images: {
            hero: { src: "/images/cities/sophia-antipolis-technopole.jpg", alt: "Consultante SEO Sophia Antipolis Technopole", title: "Audit SEO Sophia Antipolis", keywords: ["SEO Sophia Antipolis", "référencement technopole"] },
            workspace: { src: "/images/cities/sophia-antipolis-bureaux.jpg", alt: "Expert SEO B2B Sophia Antipolis", title: "Référencement SaaS Sophia", keywords: ["audit SEO B2B", "SEO startup"] },
            landmark: { src: "/images/cities/sophia-antipolis-campus.jpg", alt: "SEO local Sophia Antipolis Campus", title: "SEO local tech 06", keywords: ["SEO local tech", "SKEMA"] }
        },
        context: {
            marketType: "tech",
            competitionLevel: "high",
            targetClients: "startups SaaS de la French Tech Côte d'Azur, ESN (Atos, Capgemini, Sopra Steria), éditeurs de logiciels, scale-ups health-tech (Galderma) et laboratoires INRIA/CNRS",
            localInsight: "Le contenu B2B à Sophia doit être ultra-technique : les décideurs sont des CTO et VP Engineering. Un article de blog générique ne convertit pas — il faut des case studies, des benchmarks et du content marketing éducatif type product-led growth. Le cycle de conversion moyen est de 6-12 mois",
            specificChallenges: ["Contenu technique de niveau CTO requis (pas de vulgarisation)", "Budgets marketing des scale-ups US (HubSpot, Datadog) écrasent les SERP", "Lead gen B2B long cycle nécessite nurturing SEO"],
            businessTypes: ["SaaS", "Health-tech", "Semiconducteurs", "Recherche (INRIA, ETSI)"]
        }
    },
    // GRANDES MÉTROPOLES - MARCHÉ VOLUME & CONCURRENCE
    {
        name: "Marseille",
        slug: "consultant-seo-marseille",
        zipCode: "13000",
        lat: "43.2965",
        lng: "5.3698",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Bouches-du-Rhône",
        deptCode: "13",
        population: "870 000",
        description: "Marseille, 2e ville de France, 870 000 habitants : ici, chaque secteur est saturé en SEO. Au Vieux-Port et cours Julien, les restaurants se battent contre Uber Eats et TheFork. À Euroméditerranée — plus grand projet de rénovation urbaine d'Europe — le B2B tech explose avec le pôle médias de La Belle de Mai (France TV, INA). Du Prado aux quartiers Nord, le SEO local hyperciblé par arrondissement est la seule stratégie viable. IndHack déploie des stratégies par micro-marché marseillais.",
        keyPoints: ["Euroméditerranée : pôle tech/médias en croissance (La Belle de Mai)", "Saturation SEO sur les requêtes restauration et santé", "SEO local par arrondissement : seule stratégie viable"],
        nearbyAreas: ["Aix-en-Provence", "Aubagne", "Cassis", "La Ciotat"],
        landmarks: ["Vieux-Port", "Notre-Dame de la Garde", "MuCEM", "Stade Vélodrome"],
        images: {
            hero: { src: "/images/cities/marseille-vieux-port.jpg", alt: "Consultante SEO Marseille Vieux-Port", title: "Audit SEO Marseille 13", keywords: ["SEO Marseille", "référencement Marseille"] },
            workspace: { src: "/images/cities/marseille-mucem.jpg", alt: "Expert SEO Marseille MuCEM", title: "Référencement naturel Marseille", keywords: ["audit SEO Marseille", "SEO Bouches-du-Rhône"] },
            landmark: { src: "/images/cities/marseille-notre-dame-garde.jpg", alt: "SEO local Marseille Notre-Dame de la Garde", title: "SEO local Marseille 13", keywords: ["SEO local Marseille", "Bonne Mère"] }
        },
        context: {
            marketType: "volume",
            competitionLevel: "extreme",
            targetClients: "PME d'Euroméditerranée, restaurateurs du Vieux-Port et du cours Julien, professionnels de santé de la Timone et du Prado, commerces des Terrasses du Port",
            localInsight: "Marseille fonctionne en micro-marchés : Vieux-Port = tourisme/restauration, Euroméditerranée = B2B/tech/médias, Castellane-Prado = santé/professions libérales, La Valentine = commerce de détail. Les 'près de moi' représentent 45 % des recherches mobiles à Marseille — la fiche Google Business Profile par arrondissement est critique",
            specificChallenges: ["Saturation absolue sur restauration et santé", "Uber Eats/TheFork captent les clics food", "Réputation Google (avis) décisive en local"],
            businessTypes: ["Commerce", "Restauration", "Santé", "Tech/Médias (La Belle de Mai)"]
        }
    },
    {
        name: "Aix-en-Provence",
        slug: "consultant-seo-aix-en-provence",
        zipCode: "13100",
        lat: "43.5297",
        lng: "5.4474",
        region: "Provence-Alpes-Côte d'Azur",
        department: "Bouches-du-Rhône",
        deptCode: "13",
        population: "145 000",
        description: "Aix-en-Provence : ville d'art, d'eau et... de startups. Le pôle d'activités attire les entreprises tech tandis que le centre historique reste le royaume des commerces de charme. IndHack navigue entre ces deux mondes pour positionner votre entreprise sur le Cours Mirabeau du digital.",
        keyPoints: ["Mix tech et patrimoine", "Clientèle étudiante", "Tourisme culturel"],
        nearbyAreas: ["Les Milles", "Venelles", "Meyreuil", "Gardanne"],
        landmarks: ["Cours Mirabeau", "Fontaine de la Rotonde", "Montagne Sainte-Victoire", "Atelier Cézanne"],
        images: {
            hero: { src: "/images/cities/aix-cours-mirabeau.jpg", alt: "Consultante SEO Aix-en-Provence Cours Mirabeau", title: "Audit SEO Aix-en-Provence", keywords: ["SEO Aix-en-Provence", "référencement Aix"] },
            workspace: { src: "/images/cities/aix-rotonde.jpg", alt: "Expert SEO Aix Fontaine Rotonde", title: "Référencement naturel Aix", keywords: ["audit SEO Aix", "Provence"] },
            landmark: { src: "/images/cities/aix-sainte-victoire.jpg", alt: "SEO local Aix Sainte-Victoire", title: "SEO local Aix 13", keywords: ["SEO local Aix", "Cézanne"] }
        },
        context: {
            marketType: "premium",
            competitionLevel: "high",
            targetClients: "commerces du centre historique, startups du pôle d'activités, professions libérales et prestataires tourisme",
            localInsight: "40 000 étudiants génèrent un comportement de recherche spécifique — opportunité pour la restauration et les services",
            specificChallenges: ["Concurrence Marseille proche", "Saisonnalité touristique", "Centre-ville vs zones d'activités"],
            businessTypes: ["Commerce centre-ville", "Tech/Startup", "Professions libérales", "Tourisme"]
        }
    },
    {
        name: "Lyon",
        slug: "consultant-seo-lyon",
        zipCode: "69000",
        lat: "45.7640",
        lng: "4.8357",
        region: "Auvergne-Rhône-Alpes",
        department: "Rhône",
        deptCode: "69",
        population: "520 000",
        description: "Lyon, deuxième pôle économique français : de la Part-Dieu à Confluence, le business ne dort jamais. Gastronomie, industrie pharma, tech, textile... Chaque secteur a ses champions SEO. Pour émerger dans cette métropole exigeante, il faut une stratégie calibrée. IndHack vous la construit.",
        keyPoints: ["Deuxième marché français", "Secteurs diversifiés", "Innovation et tradition"],
        nearbyAreas: ["Villeurbanne", "Vénissieux", "Bron", "Caluire-et-Cuire"],
        landmarks: ["Place Bellecour", "Fourvière", "Confluence", "Part-Dieu"],
        images: {
            hero: { src: "/images/cities/lyon-bellecour.jpg", alt: "Consultante SEO Lyon Place Bellecour", title: "Audit SEO Lyon 69", keywords: ["SEO Lyon", "référencement Lyon"] },
            workspace: { src: "/images/cities/lyon-fourviere.jpg", alt: "Expert SEO Lyon Fourvière", title: "Référencement naturel Lyon", keywords: ["audit SEO Lyon", "SEO Rhône"] },
            landmark: { src: "/images/cities/lyon-confluence.jpg", alt: "SEO local Lyon Confluence", title: "SEO local Lyon 69", keywords: ["SEO local Lyon", "Confluence"] }
        },
        context: {
            marketType: "volume",
            competitionLevel: "extreme",
            targetClients: "PME industrielles, restaurateurs étoilés, laboratoires pharmaceutiques, startups tech et commerces des pentes",
            localInsight: "Le secteur gastronomie représente 15% des recherches locales — les bouchons lyonnais se battent sur Google",
            specificChallenges: ["Marché ultra-concurrentiel", "Diversité sectorielle complexe", "Exigence qualité lyonnaise"],
            businessTypes: ["Industrie", "Gastronomie", "Pharma/Santé", "Tech"]
        }
    },
    {
        name: "Bordeaux",
        slug: "consultant-seo-bordeaux",
        zipCode: "33000",
        lat: "44.8378",
        lng: "-0.5792",
        region: "Nouvelle-Aquitaine",
        department: "Gironde",
        deptCode: "33",
        population: "260 000",
        description: "Bordeaux a muté en 10 ans : de belle endormie à métropole tech attractive. La LGV a amené les Parisiens, les startups ont fleuri à Darwin. Mais le vin reste roi. IndHack vous aide à exister dans cet écosystème unique où tradition et innovation se côtoient.",
        keyPoints: ["Dynamisme économique", "Écosystème vin", "Tech en croissance"],
        nearbyAreas: ["Mérignac", "Pessac", "Talence", "Bègles"],
        landmarks: ["Place de la Bourse", "Miroir d'eau", "Cité du Vin", "Darwin"],
        images: {
            hero: { src: "/images/cities/bordeaux-place-bourse.jpg", alt: "Consultante SEO Bordeaux Place de la Bourse", title: "Audit SEO Bordeaux 33", keywords: ["SEO Bordeaux", "référencement Bordeaux"] },
            workspace: { src: "/images/cities/bordeaux-miroir-eau.jpg", alt: "Expert SEO Bordeaux Miroir d'eau", title: "Référencement naturel Bordeaux", keywords: ["audit SEO Bordeaux", "Gironde"] },
            landmark: { src: "/images/cities/bordeaux-cite-vin.jpg", alt: "SEO local Bordeaux Cité du Vin", title: "SEO local Bordeaux 33", keywords: ["SEO local Bordeaux", "oenotourisme"] }
        },
        context: {
            marketType: "premium",
            competitionLevel: "high",
            targetClients: "domaines viticoles, startups tech, agences immobilières et commerces du centre historique",
            localInsight: "Les recherches 'vin Bordeaux' et 'oenotourisme' sont trustées par les grands châteaux — il faut une stratégie de niche",
            specificChallenges: ["Secteur vin ultra-concurrentiel", "Arrivée massive de Parisiens", "Montée des prix immobiliers"],
            businessTypes: ["Vin/Oenotourisme", "Tech/Startup", "Immobilier", "Commerce"]
        }
    },
    {
        name: "Toulouse",
        slug: "consultant-seo-toulouse",
        zipCode: "31000",
        lat: "43.6047",
        lng: "1.4442",
        region: "Occitanie",
        department: "Haute-Garonne",
        deptCode: "31",
        population: "490 000",
        description: "Toulouse, capitale de l'aéronautique : Airbus, Thales, les sous-traitants... Un écosystème B2B titanesque. Mais la Ville Rose, c'est aussi les étudiants, les restos du Capitole, les commerces de Saint-Cyprien. IndHack maîtrise ces deux mondes.",
        keyPoints: ["Pôle aéronautique mondial", "Vie étudiante intense", "Croissance démographique forte"],
        nearbyAreas: ["Blagnac", "Colomiers", "Tournefeuille", "Balma"],
        landmarks: ["Place du Capitole", "Pont Neuf", "Cité de l'Espace", "Basilique Saint-Sernin"],
        images: {
            hero: { src: "/images/cities/toulouse-capitole.jpg", alt: "Consultante SEO Toulouse Place du Capitole", title: "Audit SEO Toulouse 31", keywords: ["SEO Toulouse", "référencement Toulouse"] },
            workspace: { src: "/images/cities/toulouse-garonne.jpg", alt: "Expert SEO Toulouse Garonne", title: "Référencement naturel Toulouse", keywords: ["audit SEO Toulouse", "Haute-Garonne"] },
            landmark: { src: "/images/cities/toulouse-cite-espace.jpg", alt: "SEO local Toulouse Cité de l'Espace", title: "SEO local Toulouse 31", keywords: ["SEO local Toulouse", "aérospatial"] }
        },
        context: {
            marketType: "tech",
            competitionLevel: "high",
            targetClients: "sous-traitants aéronautiques, ESN, startups, restaurateurs du centre et commerces de quartier",
            localInsight: "Les donneurs d'ordres aéronautiques recherchent leurs fournisseurs en ligne — le SEO B2B est stratégique",
            specificChallenges: ["Double marché B2B/B2C", "Concurrence ESN intense", "Croissance démographique rapide"],
            businessTypes: ["Aéronautique", "ESN/Tech", "Commerce", "Restauration"]
        }
    },
    {
        name: "Montpellier",
        slug: "consultant-seo-montpellier",
        zipCode: "34000",
        lat: "43.6108",
        lng: "3.8767",
        region: "Occitanie",
        department: "Hérault",
        deptCode: "34",
        population: "290 000",
        description: "Montpellier, la surdouée du Sud : croissance démographique record, pôle santé d'excellence, startups florissantes. La Comédie bruisse de vie, Antigone de modernité. Mais cette croissance attire aussi la concurrence. IndHack vous fait gagner la course au clic.",
        keyPoints: ["Croissance record", "Pôle médical d'excellence", "Dynamisme startup"],
        nearbyAreas: ["Castelnau-le-Lez", "Lattes", "Pérols", "Saint-Jean-de-Védas"],
        landmarks: ["Place de la Comédie", "Écusson", "Antigone", "Faculté de Médecine"],
        images: {
            hero: { src: "/images/cities/montpellier-comedie.jpg", alt: "Consultante SEO Montpellier Place de la Comédie", title: "Audit SEO Montpellier 34", keywords: ["SEO Montpellier", "référencement Montpellier"] },
            workspace: { src: "/images/cities/montpellier-ecusson.jpg", alt: "Expert SEO Montpellier Écusson", title: "Référencement naturel Montpellier", keywords: ["audit SEO Montpellier", "Hérault"] },
            landmark: { src: "/images/cities/montpellier-antigone.jpg", alt: "SEO local Montpellier Antigone", title: "SEO local Montpellier 34", keywords: ["SEO local Montpellier", "Antigone"] }
        },
        context: {
            marketType: "local",
            competitionLevel: "high",
            targetClients: "professionnels de santé, startups santé/biotech, commerces de l'Écusson et prestataires tourisme",
            localInsight: "Le CHU et la Fac de Médecine génèrent un volume de recherches santé énorme — opportunité pour le paramédical",
            specificChallenges: ["Croissance démographique = concurrence accrue", "Saturation secteur médical", "Saisonnalité balnéaire"],
            businessTypes: ["Santé/Médical", "Biotech", "Commerce", "Tourisme"]
        }
    },
    // VILLES RÉGIONALES - MARCHÉS LOCAUX SPÉCIFIQUES
    {
        name: "Strasbourg",
        slug: "consultant-seo-strasbourg",
        zipCode: "67000",
        lat: "48.5734",
        lng: "7.7521",
        region: "Grand Est",
        department: "Bas-Rhin",
        deptCode: "67",
        population: "285 000",
        description: "Strasbourg, capitale européenne : entre France et Allemagne, la ville joue sur deux tableaux. Le Parlement européen attire un business institutionnel, la Petite France les touristes. IndHack optimise votre visibilité sur ces deux marchés linguistiques.",
        keyPoints: ["Carrefour européen", "Bilinguisme FR/DE", "Institutions internationales"],
        nearbyAreas: ["Schiltigheim", "Illkirch", "Lingolsheim", "Hoenheim"],
        landmarks: ["Cathédrale Notre-Dame", "Petite France", "Parlement Européen", "Place Kléber"],
        images: {
            hero: { src: "/images/cities/strasbourg-cathedrale.jpg", alt: "Consultante SEO Strasbourg Cathédrale", title: "Audit SEO Strasbourg 67", keywords: ["SEO Strasbourg", "référencement Strasbourg"] },
            workspace: { src: "/images/cities/strasbourg-petite-france.jpg", alt: "Expert SEO Strasbourg Petite France", title: "Référencement naturel Strasbourg", keywords: ["audit SEO Strasbourg", "Alsace"] },
            landmark: { src: "/images/cities/strasbourg-parlement.jpg", alt: "SEO local Strasbourg Parlement Européen", title: "SEO local Strasbourg 67", keywords: ["SEO local Strasbourg", "Europe"] }
        },
        context: {
            marketType: "local",
            competitionLevel: "medium",
            targetClients: "entreprises transfrontalières, commerces de la Grande Île, prestataires tourisme et professionnels des institutions",
            localInsight: "30% des recherches sont en allemand — le SEO bilingue est un avantage concurrentiel majeur",
            specificChallenges: ["SEO bilingue FR/DE obligatoire", "Concurrence allemande", "Marché institutionnel spécifique"],
            businessTypes: ["International/Export", "Tourisme", "Commerce local", "Institutionnel"]
        }
    },
    {
        name: "Nantes",
        slug: "consultant-seo-nantes",
        zipCode: "44000",
        lat: "47.2184",
        lng: "-1.5536",
        region: "Pays de la Loire",
        department: "Loire-Atlantique",
        deptCode: "44",
        population: "320 000",
        description: "Nantes, la créative : des Machines de l'Île au Web2Day, la ville cultive l'innovation. L'écosystème tech grandit, les agences digitales pullulent. Pour se démarquer à Nantes, il faut de l'audace et de la méthode. IndHack apporte les deux.",
        keyPoints: ["Écosystème créatif", "Tech en croissance", "Qualité de vie attractive"],
        nearbyAreas: ["Saint-Herblain", "Rezé", "Orvault", "Vertou"],
        landmarks: ["Château des Ducs", "Machines de l'Île", "Passage Pommeraye", "Île de Nantes"],
        images: {
            hero: { src: "/images/cities/nantes-chateau.jpg", alt: "Consultante SEO Nantes Château des Ducs", title: "Audit SEO Nantes 44", keywords: ["SEO Nantes", "référencement Nantes"] },
            workspace: { src: "/images/cities/nantes-machines.jpg", alt: "Expert SEO Nantes Machines de l'Île", title: "Référencement naturel Nantes", keywords: ["audit SEO Nantes", "Loire-Atlantique"] },
            landmark: { src: "/images/cities/nantes-passage-pommeraye.jpg", alt: "SEO local Nantes Passage Pommeraye", title: "SEO local Nantes 44", keywords: ["SEO local Nantes", "créatif"] }
        },
        context: {
            marketType: "local",
            competitionLevel: "medium",
            targetClients: "startups créatives, agences digitales, commerces de centre-ville et prestataires événementiels",
            localInsight: "La scène tech nantaise est soudée — les recommandations comptent autant que le SEO",
            specificChallenges: ["Concurrence agences digitales locale", "Marché en forte croissance", "Attractivité = nouveaux entrants"],
            businessTypes: ["Digital/Créatif", "Tech", "Commerce", "Événementiel"]
        }
    },
    {
        name: "Rennes",
        slug: "consultant-seo-rennes",
        zipCode: "35000",
        lat: "48.1173",
        lng: "-1.6778",
        region: "Bretagne",
        department: "Ille-et-Vilaine",
        deptCode: "35",
        population: "220 000",
        description: "Rennes, capitale bretonne et pôle tech : French Tech, cybersécurité, agrotech... La ville forme et retient ses talents. Les ESN et startups se disputent les développeurs ET les clients. IndHack vous aide à capter ce marché tech breton en pleine ébullition.",
        keyPoints: ["French Tech Rennes", "Cybersécurité", "Bassin d'emploi tech"],
        nearbyAreas: ["Cesson-Sévigné", "Saint-Grégoire", "Chantepie", "Bruz"],
        landmarks: ["Parlement de Bretagne", "Place de la République", "Parc du Thabor", "Les Champs Libres"],
        images: {
            hero: { src: "/images/cities/rennes-parlement.jpg", alt: "Consultante SEO Rennes Parlement de Bretagne", title: "Audit SEO Rennes 35", keywords: ["SEO Rennes", "référencement Rennes"] },
            workspace: { src: "/images/cities/rennes-republique.jpg", alt: "Expert SEO Rennes Place de la République", title: "Référencement naturel Rennes", keywords: ["audit SEO Rennes", "Bretagne"] },
            landmark: { src: "/images/cities/rennes-thabor.jpg", alt: "SEO local Rennes Parc du Thabor", title: "SEO local Rennes 35", keywords: ["SEO local Rennes", "tech"] }
        },
        context: {
            marketType: "tech",
            competitionLevel: "medium",
            targetClients: "ESN, startups cybersécurité, éditeurs de logiciels et professionnels du recrutement tech",
            localInsight: "La guerre des talents tech fait rage — le SEO marque employeur est stratégique pour les ESN",
            specificChallenges: ["Concurrence recrutement tech", "Écosystème soudé", "Marque employeur critique"],
            businessTypes: ["ESN", "Cybersécurité", "Recrutement", "Agrotech"]
        }
    },
    {
        name: "Lille",
        slug: "consultant-seo-lille",
        zipCode: "59000",
        lat: "50.6292",
        lng: "3.0573",
        region: "Hauts-de-France",
        department: "Nord",
        deptCode: "59",
        population: "235 000",
        description: "Lille, carrefour de l'Europe du Nord : à 1h de Paris, Londres et Bruxelles. Le commerce et la grande distribution sont rois, l'e-commerce explose. IndHack vous positionne sur ce marché transfrontalier où la proximité de la Belgique change la donne.",
        keyPoints: ["Carrefour européen", "Commerce et grande distribution", "E-commerce puissant"],
        nearbyAreas: ["Roubaix", "Tourcoing", "Villeneuve-d'Ascq", "Marcq-en-Barœul"],
        landmarks: ["Grand'Place", "Vieux-Lille", "Beffroi", "Euralille"],
        images: {
            hero: { src: "/images/cities/lille-grand-place.jpg", alt: "Consultante SEO Lille Grand'Place", title: "Audit SEO Lille 59", keywords: ["SEO Lille", "référencement Lille"] },
            workspace: { src: "/images/cities/lille-vieux-lille.jpg", alt: "Expert SEO Lille Vieux-Lille", title: "Référencement naturel Lille", keywords: ["audit SEO Lille", "Nord"] },
            landmark: { src: "/images/cities/lille-beffroi.jpg", alt: "SEO local Lille Beffroi", title: "SEO local Lille 59", keywords: ["SEO local Lille", "Hauts-de-France"] }
        },
        context: {
            marketType: "volume",
            competitionLevel: "high",
            targetClients: "e-commerçants, enseignes retail, grossistes et commerces transfrontaliers",
            localInsight: "La proximité belge crée un marché unique — les recherches cross-border sont une opportunité",
            specificChallenges: ["Concurrence e-commerce massive", "Marché transfrontalier complexe", "Pression grande distribution"],
            businessTypes: ["E-commerce", "Retail", "Distribution", "Commerce transfrontalier"]
        }
    },
    {
        name: "Grenoble",
        slug: "consultant-seo-grenoble",
        zipCode: "38000",
        lat: "45.1885",
        lng: "5.7245",
        region: "Auvergne-Rhône-Alpes",
        department: "Isère",
        deptCode: "38",
        population: "160 000",
        description: "Grenoble, capitale des Alpes et de l'innovation : CEA, CNRS, startup deeptech... La recherche scientifique irrigue l'économie. Le ski génère un tourisme massif. IndHack maîtrise ce double marché tech pointu et tourisme outdoor.",
        keyPoints: ["Pôle recherche mondial", "Tourisme montagne", "Innovation deeptech"],
        nearbyAreas: ["Saint-Martin-d'Hères", "Échirolles", "Fontaine", "Meylan"],
        landmarks: ["Fort de la Bastille", "Téléphérique", "Musée de Grenoble", "Parc Paul Mistral"],
        images: {
            hero: { src: "/images/cities/grenoble-bastille.jpg", alt: "Consultante SEO Grenoble Bastille", title: "Audit SEO Grenoble 38", keywords: ["SEO Grenoble", "référencement Grenoble"] },
            workspace: { src: "/images/cities/grenoble-telepherique.jpg", alt: "Expert SEO Grenoble Téléphérique", title: "Référencement naturel Grenoble", keywords: ["audit SEO Grenoble", "Isère"] },
            landmark: { src: "/images/cities/grenoble-alpes.jpg", alt: "SEO local Grenoble Alpes", title: "SEO local Grenoble 38", keywords: ["SEO local Grenoble", "montagne"] }
        },
        context: {
            marketType: "tech",
            competitionLevel: "medium",
            targetClients: "startups deeptech, laboratoires de recherche, prestataires ski et équipementiers outdoor",
            localInsight: "Les recherches 'station ski + nom' représentent un volume énorme en hiver — saisonnalité forte",
            specificChallenges: ["Double marché tech/tourisme", "Saisonnalité ski prononcée", "Concurrence stations alpines"],
            businessTypes: ["Deeptech", "Recherche", "Outdoor/Ski", "Tourisme montagne"]
        }
    },
    {
        name: "Paris",
        slug: "consultant-seo-paris",
        zipCode: "75000",
        lat: "48.8566",
        lng: "2.3522",
        region: "Île-de-France",
        department: "Paris",
        deptCode: "75",
        population: "2 100 000",
        description: "Paris, 2,1 millions d'habitants et la concurrence SEO la plus féroce de France. Dans le Sentier (2e arrondissement), les startups French Tech se battent pour les mêmes requêtes SaaS. Rue de Rivoli et dans le Marais, les commerces affrontent les géants e-commerce sur chaque clic. À Station F (13e), les scale-ups lèvent des millions mais oublient le SEO organique. Et côté professions libérales, un avocat du 8e paie jusqu'à 50 €/clic en Google Ads. La stratégie gagnante à Paris : micro-cibler par arrondissement et conquérir les requêtes longue-traîne que les gros budgets ignorent.",
        keyPoints: ["CPC moyen 5-50 €/clic selon secteur (le plus élevé de France)", "Stratégie par arrondissement = la seule viable en local", "French Tech (Sentier, Station F) : concurrence SaaS mondiale"],
        nearbyAreas: ["Boulogne-Billancourt", "Neuilly-sur-Seine", "Levallois-Perret", "Montreuil"],
        landmarks: ["Tour Eiffel", "Champs-Élysées", "Montmartre", "Le Marais"],
        images: {
            hero: { src: "/images/cities/paris-tour-eiffel.jpg", alt: "Consultante SEO Paris Tour Eiffel", title: "Audit SEO Paris 75", keywords: ["SEO Paris", "référencement Paris"] },
            workspace: { src: "/images/cities/paris-sacre-coeur.jpg", alt: "Expert SEO Paris Montmartre", title: "Référencement naturel Paris", keywords: ["audit SEO Paris", "Île-de-France"] },
            landmark: { src: "/images/cities/paris-marais.jpg", alt: "SEO local Paris Le Marais", title: "SEO local Paris 75", keywords: ["SEO local Paris", "capitale"] }
        },
        context: {
            marketType: "volume",
            competitionLevel: "extreme",
            targetClients: "startups French Tech du Sentier et de Station F, PME du Marais et de République, avocats et notaires du 8e, commerces de Rivoli et des Halles, cabinets médicaux du 16e",
            localInsight: "Le SEO parisien par arrondissement est la seule stratégie rentable : 'avocat divorce 8e' convertit 10x mieux que 'avocat divorce Paris'. Les professionnels libéraux du 8e et 16e paient 30-50 €/clic en Ads — le SEO organique est leur seule issue. Côté e-commerce, la concurrence Amazon/Fnac rend le SEO product impossible sans une stratégie de contenu éducatif",
            specificChallenges: ["CPC parmi les plus élevés d'Europe (50 €/clic en juridique)", "Amazon, Fnac, Doctolib captent les SERP génériques", "SEO par arrondissement + longue-traîne = seule stratégie viable"],
            businessTypes: ["French Tech / SaaS", "Professions libérales (avocats, notaires)", "Commerce haut de gamme", "Santé / Médical"]
        }
    },
    {
        name: "Boulogne-Billancourt",
        slug: "consultant-seo-boulogne-billancourt",
        zipCode: "92100",
        lat: "48.8352",
        lng: "2.2407",
        region: "Île-de-France",
        department: "Hauts-de-Seine",
        deptCode: "92",
        population: "120 000",
        description: "Boulogne-Billancourt, première ville du 92 : TF1, Canal+, les sièges sociaux s'alignent. Médias, production audiovisuelle, agences de com... IndHack vous positionne dans cet écosystème médiatique exigeant où l'image est reine.",
        keyPoints: ["Capitale des médias", "Sièges sociaux majeurs", "Proximité Paris"],
        nearbyAreas: ["Issy-les-Moulineaux", "Sèvres", "Saint-Cloud", "Meudon"],
        landmarks: ["Seine Musicale", "Île Seguin", "Tour TF1", "Parc de Saint-Cloud"],
        images: {
            hero: { src: "/images/cities/boulogne-seine-musicale.jpg", alt: "Consultante SEO Boulogne-Billancourt Seine Musicale", title: "Audit SEO Boulogne 92", keywords: ["SEO Boulogne-Billancourt", "référencement 92"] },
            workspace: { src: "/images/cities/boulogne-ile-seguin.jpg", alt: "Expert SEO Boulogne Île Seguin", title: "Référencement naturel Boulogne", keywords: ["audit SEO Boulogne", "Hauts-de-Seine"] },
            landmark: { src: "/images/cities/boulogne-bureaux.jpg", alt: "SEO local Boulogne bureaux", title: "SEO local Boulogne 92", keywords: ["SEO local Boulogne", "médias"] }
        },
        context: {
            marketType: "premium",
            competitionLevel: "high",
            targetClients: "agences de production, sociétés de médias, agences de communication et prestataires audiovisuels",
            localInsight: "L'écosystème médias génère des recherches B2B spécifiques — 'production vidéo Boulogne' est ultra-qualifié",
            specificChallenges: ["Marché B2B médias spécifique", "Concurrence agences parisiennes", "Clients exigeants"],
            businessTypes: ["Médias", "Production audiovisuelle", "Communication", "Agences"]
        }
    }
];

// Helper functions
export function getCityBySlug(slug: string): CityData | undefined {
    return FRENCH_CITIES.find(city => city.slug === slug || city.slug === `consultant-seo-${slug}`);
}

export function getAllCitySlugs(): string[] {
    return FRENCH_CITIES.map(city => city.slug);
}

export function getCitiesByRegion(region: string): CityData[] {
    return FRENCH_CITIES.filter(city => city.region === region);
}

export function getNearbyCities(cityName: string, limit: number = 4): CityData[] {
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

// Interface pour les services
export interface CityServiceData {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    category: string;
    parentService: string;
    getContent: (city: CityData) => {
        h2Sections: { title: string; content: string; bullets?: string[] }[];
        methodology: { step: string; title: string; desc: string }[];
        faq: { question: string; answer: string }[];
    };
    semanticKeywords: string[];
}

// Fonction pour générer les liens internes avec ancres variées
// IMPORTANT: Pour audit-technique, utiliser des ancres axées "audit" et non "consultant SEO [ville]"
// afin d'éviter la cannibalisation avec la page mère
function getInternalLinks(city: CityData, serviceType: string): { motherLink: string; homeLink: string; auditLink: string } {
    // Ancres spécifiques pour audit-technique (éviter cannibalisation)
    if (serviceType === "audit-technique") {
        return {
            motherLink: `<a href="/${city.slug}" class="text-sauge font-semibold hover:underline">mes services SEO à ${city.name}</a>`,
            homeLink: `<a href="/audit-seo" class="text-sauge font-semibold hover:underline">audit SEO complet</a>`,
            auditLink: `<a href="/audit-seo" class="text-sauge font-semibold hover:underline">diagnostic SEO approfondi</a>`
        };
    }

    // Ancres pour les autres services
    const anchors = {
        mother: [
            `experte SEO ${city.name}`,
            `spécialiste référencement ${city.name}`,
            `accompagnement SEO ${city.name}`
        ],
        home: [
            "experte en référencement naturel",
            "spécialiste SEO",
            "stratégie de visibilité Google"
        ]
    };

    const serviceIndex = serviceType === "creation-site-web" ? 0 : 1;
    const motherAnchor = anchors.mother[serviceIndex % anchors.mother.length];
    const homeAnchor = anchors.home[serviceIndex % anchors.home.length];

    return {
        motherLink: `<a href="/${city.slug}" class="text-sauge font-semibold hover:underline">${motherAnchor}</a>`,
        homeLink: `<a href="/consultant-seo" class="text-sauge font-semibold hover:underline">${homeAnchor}</a>`,
        auditLink: `<a href="/audit-seo" class="text-sauge font-semibold hover:underline">audit SEO</a>`
    };
}

// SERVICES AVEC CONTENU 100% UNIQUE PAR VILLE
export const CITY_SERVICES: Record<string, CityServiceData> = {
    "audit-technique": {
        slug: "audit-technique",
        title: "Audit Technique SEO",
        metaTitle: "Audit Technique SEO {city} - Diagnostic Complet | INDHACK",
        metaDescription: "Audit technique SEO à {city}. Diagnostic complet de votre site : indexation, vitesse, mobile. Recommandations priorisées par impact business.",
        heroTitle: "Audit Technique SEO à {city}",
        heroSubtitle: "Diagnostic technique complet pour les entreprises de {city}",
        category: "Audit Technique",
        parentService: "/audit-seo",
        getContent: (city: CityData) => {
            const links = getInternalLinks(city, "audit-technique");
            const isLuxury = city.context.marketType === "luxury" || city.context.marketType === "premium";
            const isTech = city.context.marketType === "tech";
            const isVolume = city.context.marketType === "volume";

            // Contenu adapté au type de marché
            let approachContent = "";
            let challengesContent = "";
            let whyMeContent = "";
            let errorsContent = "";

            if (isLuxury) {
                approachContent = `Mon <strong>audit technique SEO à ${city.name}</strong> offre un diagnostic complet adapté aux exigences des ${city.context.targetClients}.<br/><br/>Sur un marché premium où ${city.context.localInsight.toLowerCase()}, la moindre <strong>erreur d'indexation</strong> se paie cash. Un <strong>temps de chargement</strong> supérieur à 2 secondes ? Vos prospects fortunés sont déjà chez votre concurrent. Une page bloquée par le <strong>robots.txt</strong> ? C'est du chiffre d'affaires qui s'évapore.<br/><br/>Mon <strong>diagnostic technique</strong> va au-delà des outils automatisés comme Screaming Frog ou PageSpeed. J'analyse les <strong>Core Web Vitals</strong> (LCP, CLS, INP), le crawl de votre site, le <strong>maillage interne</strong>, les <strong>données structurées schema.org</strong> et l'indexation via Google Search Console.`;

                challengesContent = `Le marché ${city.name} a ses exigences propres. ${city.context.specificChallenges.join(". ")}. Mon <strong>audit de référencement</strong> intègre ces spécificités :<br/><br/>J'analyse votre site sous l'angle de votre clientèle ${city.context.targetClients.split(",")[0]} : <strong>vitesse de chargement</strong> perçue, qualité d'affichage via Lighthouse, <strong>mobile-first indexing</strong>. Chaque recommandation est priorisée par <strong>impact business</strong> autant que sur votre positionnement Google.`;

                whyMeContent = `Les agences facturent des audits standards entre <strong>3 000€ et 8 000€</strong> sans comprendre les subtilités d'un marché premium comme ${city.name}. Elles appliquent des grilles génériques inadaptées à votre clientèle.<br/><br/>Je propose un <strong>diagnostic SEO sur-mesure (sur devis)</strong> avec un tarif ajusté à la taille de votre site (à partir de 150€). Premier <strong>audit technique gratuit</strong> pour évaluer vos erreurs d'indexation et vos <strong>redirections 301/404</strong>.`;

                errorsContent = `Après des dizaines d'<strong>audits techniques SEO</strong> pour des entreprises de ${city.name} et ${city.nearbyAreas.slice(0, 2).join(", ")}, j'ai identifié les <strong>erreurs de crawl</strong> récurrentes sur ce marché premium`;
            } else if (isTech) {
                approachContent = `Mon <strong>audit technique SEO à ${city.name}</strong> est conçu pour les ${city.context.targetClients} qui exigent une expertise pointue.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Votre site doit être techniquement irréprochable pour générer des leads B2B qualifiés. Mon <strong>diagnostic SEO</strong> va au-delà des outils classiques : j'analyse le <strong>rendering JavaScript</strong>, l'impact de votre stack sur le <strong>crawl budget</strong>, les <strong>temps de réponse serveur</strong>.<br/><br/>SPA/SSR, API-first, <strong>sitemap dynamique</strong>... Je maîtrise les problématiques techniques des sites modernes et je traduis mes recommandations <strong>Core Web Vitals</strong> en tickets actionnables pour vos développeurs.`;

                challengesContent = `L'écosystème tech de ${city.name} a ses spécificités. ${city.context.specificChallenges.join(". ")}.<br/><br/>Mon <strong>audit de référencement</strong> intègre ces réalités : analyse du <strong>maillage interne</strong> pour les cycles de vente longs, vérification de l'<strong>indexation</strong> du contenu éducatif, <strong>données structurées schema.org</strong> (TechArticle, FAQ, SoftwareApplication). Je livre un diagnostic technique aligné avec vos enjeux B2B.`;

                whyMeContent = `Les agences généralistes ne comprennent pas vos enjeux. Elles confondent site vitrine et application SaaS, e-commerce B2C et génération de leads B2B.<br/><br/>Les grandes agences tech facturent entre <strong>5 000€ et 15 000€</strong> des audits parfois surdimensionnés. Je propose un <strong>diagnostic technique sur devis</strong> avec analyse <strong>PageSpeed/Lighthouse</strong>, vérification des <strong>erreurs 404</strong> et optimisation du <strong>robots.txt</strong>.`;

                errorsContent = `Après avoir réalisé des <strong>audits SEO techniques</strong> pour des dizaines de sites tech à ${city.name}, ${city.nearbyAreas[0]} et dans tout le ${city.department}, j'ai identifié les <strong>erreurs d'indexation</strong> récurrentes`;
            } else if (isVolume) {
                approachContent = `Mon <strong>audit technique SEO à ${city.name}</strong> est optimisé pour un marché hyper-concurrentiel où chaque détail compte.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Avec ${city.population} habitants et une concurrence féroce, les <strong>erreurs d'indexation</strong> sont fatales. Pendant que votre <strong>sitemap</strong> est mal configuré, vos concurrents captent vos clients potentiels.<br/><br/>Mon <strong>diagnostic technique</strong> identifie rapidement les quick wins : <strong>Core Web Vitals</strong> à corriger, pages bloquées par le <strong>robots.txt</strong>, <strong>redirections 301</strong> manquantes, <strong>vitesse de chargement</strong> à optimiser via PageSpeed.`;

                challengesContent = `${city.name} est un champ de bataille digital. ${city.context.specificChallenges.join(". ")}.<br/><br/>Mon <strong>audit de référencement</strong> intègre la réalité du terrain : analyse du <strong>crawl</strong> avec Screaming Frog, vérification de l'<strong>indexation Google</strong> via Search Console, optimisation des <strong>balises meta</strong> et title. Focus sur le Pack Local qui capte 40% des clics. Pas de théorie, des <strong>corrections techniques concrètes</strong>.`;

                whyMeContent = `À ${city.name}, les agences facturent cher pour des audits génériques. Entre <strong>2 000€ et 6 000€</strong> pour des PDF de 100 pages que personne ne lit.<br/><br/>Je propose un <strong>diagnostic SEO technique sur devis</strong> focalisé sur vos enjeux réels : analyse des <strong>erreurs 404</strong>, vérification du <strong>maillage interne</strong>, test <strong>mobile-first</strong>. L'objectif : corriger les blocages d'<strong>indexation</strong> rapidement.`;

                errorsContent = `Sur un marché aussi concurrentiel que ${city.name}, j'ai identifié les <strong>erreurs techniques</strong> qui coûtent le plus cher aux entreprises locales`;
            } else {
                // Marché local standard
                approachContent = `Mon <strong>audit technique SEO à ${city.name}</strong> est un diagnostic complet adapté aux ${city.context.targetClients}.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Les ${city.population} habitants de votre zone de chalandise recherchent vos services sur Google. Mon <strong>analyse technique</strong> identifie ce qui bloque votre <strong>indexation</strong> : <strong>erreurs de crawl</strong>, <strong>temps de chargement</strong> excessifs, <strong>balises meta</strong> manquantes.<br/><br/>Pas de jargon inutile. Je priorise les corrections par impact : <strong>Core Web Vitals</strong>, <strong>robots.txt</strong>, <strong>sitemap XML</strong>, <strong>maillage interne</strong>. Des recommandations actionnables pour améliorer votre visibilité locale.`;

                challengesContent = `Le marché ${city.name} a ses particularités. ${city.context.specificChallenges.join(". ")}.<br/><br/>Mon <strong>diagnostic SEO</strong> prend en compte ces spécificités : vérification de l'<strong>indexation Google</strong> via Search Console, analyse des <strong>données structurées</strong> LocalBusiness, optimisation des <strong>balises title</strong> pour "${city.name} + votre activité", audit du <strong>maillage interne</strong> vers ${city.nearbyAreas.slice(0, 2).join(" et ")}.`;

                whyMeContent = `Les agences digitales de ${city.region} facturent leurs audits entre <strong>1 500€ et 4 000€</strong>, souvent pour des rapports standardisés sans véritable <strong>analyse technique</strong>.<br/><br/>Je propose un <strong>diagnostic SEO personnalisé (sur devis)</strong> : crawl complet avec Screaming Frog, mesure <strong>PageSpeed/Lighthouse</strong>, vérification des <strong>erreurs 404</strong> et <strong>redirections</strong>. Premier audit technique gratuit pour identifier vos priorités.`;

                errorsContent = `Au fil de mes <strong>audits SEO techniques</strong> auprès d'entreprises de ${city.name} et ${city.nearbyAreas.slice(0, 2).join(", ")}, j'ai identifié les <strong>erreurs de crawl</strong> les plus fréquentes`;
            }

            // Bullets adaptées au contexte
            const auditBullets = isLuxury ? [
                `<strong>Expérience premium</strong> : temps de chargement, qualité d'affichage des visuels haute définition, fluidité sur appareils haut de gamme`,
                `<strong>SEO multilingue</strong> : hreflang, indexation des versions linguistiques, ciblage géographique international`,
                `<strong>Données structurées</strong> : schema.org adapté aux recherches premium (LocalBusiness, Product, Review)`,
                `<strong>Mobile-first luxe</strong> : Core Web Vitals optimisés, UX irréprochable sur iPhone dernière génération`,
                `<strong>Réputation en ligne</strong> : gestion des avis, présence sur les plateformes de référence du secteur`
            ] : isTech ? [
                `<strong>Architecture technique</strong> : analyse du rendering JavaScript, performance API, cache CDN`,
                `<strong>Crawl budget</strong> : optimisation pour les sites à fort volume de pages, gestion des facettes`,
                `<strong>Core Web Vitals</strong> : LCP, FID, CLS avec focus sur les applications complexes`,
                `<strong>Données structurées</strong> : schema.org SoftwareApplication, TechArticle, FAQ pour le contenu éducatif`,
                `<strong>SEO technique B2B</strong> : architecture de contenu pour les cycles de vente longs, landing pages produit`
            ] : [
                `<strong>Indexation locale</strong> : vérification de l'indexation de vos pages ciblant ${city.name} via Google Search Console`,
                `<strong>Vitesse de chargement</strong> : Core Web Vitals (LCP, FID, CLS) essentiels pour le mobile`,
                `<strong>SEO local</strong> : schema.org LocalBusiness, cohérence NAP, présence sur Google Business Profile`,
                `<strong>Architecture</strong> : profondeur de page, maillage interne, structure d'URL optimisée pour ${city.deptCode}`,
                `<strong>Balisage</strong> : balises title et meta intégrant ${city.name}, hiérarchie Hn, données structurées`
            ];

            const errorBullets = isLuxury ? [
                `<strong>Visuels non optimisés</strong> : images de plusieurs Mo qui ruinent l'expérience sur mobile 4G`,
                `<strong>Absence de version multilingue</strong> : perte de la clientèle internationale qui recherche en anglais`,
                `<strong>Données structurées manquantes</strong> : pas de rich snippets dans les SERP, visibilité réduite`,
                `<strong>Mobile négligé</strong> : site conçu pour desktop alors que 70% du trafic est mobile`,
                `<strong>Vitesse catastrophique</strong> : serveur lent, pas de CDN, JS render-blocking`
            ] : isTech ? [
                `<strong>JavaScript mal indexé</strong> : contenu invisible pour Google car rendu côté client uniquement`,
                `<strong>Architecture SPA non optimisée</strong> : URLs non crawlables, historique de navigation cassé`,
                `<strong>Contenu dupliqué</strong> : pages de documentation identiques, canonical mal configuré`,
                `<strong>Absence de contenu indexable</strong> : application trop orientée produit, pas de contenu SEO`,
                `<strong>Performances applicatives</strong> : bundle JS trop lourd, pas de code splitting`
            ] : [
                `<strong>Pages non indexées</strong> : noindex accidentel, erreurs de crawl bloquant vos pages stratégiques`,
                `<strong>Vitesse insuffisante</strong> : images non compressées, CSS/JS render-blocking, serveur lent`,
                `<strong>Mobile défaillant</strong> : texte illisible, boutons trop petits, viewport mal configuré`,
                `<strong>Maillage interne cassé</strong> : liens morts, pages orphelines, profondeur excessive`,
                `<strong>SEO local absent</strong> : pas de schema LocalBusiness, Google Business Profile non optimisé`
            ];

            return {
                h2Sections: [
                    {
                        title: `Audit technique SEO à ${city.name} : mon approche`,
                        content: approachContent,
                        bullets: auditBullets
                    },
                    {
                        title: `Les défis SEO spécifiques à ${city.name}`,
                        content: challengesContent
                    },
                    {
                        title: `Pourquoi choisir mon expertise à ${city.name} ?`,
                        content: whyMeContent
                    },
                    {
                        title: `Erreurs techniques fréquentes à ${city.name}`,
                        content: errorsContent,
                        bullets: errorBullets
                    }
                ],
                methodology: [
                    { step: "01", title: "Diagnostic initial", desc: `Analyse de votre situation actuelle à ${city.name} : positionnement, concurrence locale, état technique. Gratuit et sans engagement.` },
                    { step: "02", title: "Crawl & analyse", desc: `Crawl complet de votre site, analyse Search Console, mesure des Core Web Vitals. Focus sur les enjeux de ${city.name}.` },
                    { step: "03", title: "Rapport priorisé", desc: `Livrable actionnable avec recommandations classées par impact business. Pas de PDF de 100 pages, des actions concrètes.` },
                    { step: "04", title: "Accompagnement", desc: `Je reste disponible pour accompagner la mise en œuvre et valider les corrections. Suivi des résultats inclus.` }
                ],
                faq: [
                    {
                        question: `Comment se déroule un audit technique à ${city.name} ?`,
                        answer: `Je commence par un échange gratuit pour comprendre votre activité et vos enjeux à ${city.name}. Ensuite, je réalise un crawl complet de votre site, j'analyse vos données Search Console et je mesure vos performances. Le livrable est un <strong>rapport priorisé par impact business</strong> avec des recommandations actionnables adaptées à votre marché local.`
                    },
                    {
                        question: `Quel investissement pour un audit SEO à ${city.name} ?`,
                        answer: `Les agences de ${city.region} facturent généralement entre <strong>2 000€ et 6 000€</strong> pour des audits standardisés. Je propose un diagnostic personnalisé <strong>sur devis</strong> ajusté à la taille de votre site et à vos enjeux réels. Premier échange gratuit pour évaluer vos besoins.`
                    },
                    {
                        question: `L'audit technique suffit-il pour être visible à ${city.name} ?`,
                        answer: `L'audit technique est la <strong>fondation indispensable</strong>. Sans elle, vos efforts SEO sont construits sur du sable. Mais le référencement repose sur 3 piliers : technique, contenu et popularité. Pour dominer les recherches à ${city.name}, il faudra ensuite travailler votre contenu et vos backlinks.`
                    },
                    {
                        question: `Travaillez-vous à distance ou sur site à ${city.name} ?`,
                        answer: `Je travaille principalement à distance avec des outils collaboratifs efficaces. Pour les entreprises de ${city.name} et ${city.nearbyAreas.slice(0, 2).join(", ")}, je propose des <strong>visios régulières</strong> et je peux me déplacer pour les projets d'envergure. L'essentiel est la qualité du travail et du suivi.`
                    }
                ]
            };
        },
        semanticKeywords: [
            "Screaming Frog", "Google Search Console", "Core Web Vitals", "LCP", "FID", "CLS",
            "budget crawl", "indexation Google", "maillage interne", "balises meta", "robots.txt",
            "sitemap XML", "erreurs 404", "redirections 301", "vitesse de chargement", "mobile-first"
        ]
    },

    "creation-site-web": {
        slug: "creation-site-web",
        title: "Création de Site Web",
        metaTitle: "Création Site Web {city} - Site Optimisé SEO | INDHACK",
        metaDescription: "Création de site web professionnel à {city}. Sites vitrines et e-commerce pensés SEO dès la conception. Visibilité Google garantie.",
        heroTitle: "Création de Site Web à {city}",
        heroSubtitle: "Sites web performants pour les entreprises de {city}",
        category: "Création Web",
        parentService: "/creation-site-web",
        getContent: (city: CityData) => {
            const links = getInternalLinks(city, "creation-site-web");
            const isLuxury = city.context.marketType === "luxury" || city.context.marketType === "premium";
            const isTech = city.context.marketType === "tech";

            let mainContent = "";
            let techContent = "";
            let typesContent = "";
            let whyMeContent = "";

            if (isLuxury) {
                mainContent = `En tant que ${links.motherLink} et ${links.homeLink}, je crée des sites web à la hauteur des exigences de votre clientèle à ${city.name}.<br/><br/>Sur un marché où ${city.context.localInsight.toLowerCase()}, votre site est votre première impression. Il doit transpirer le <strong>professionnalisme et l'exclusivité</strong> que vos clients attendent. Pas de template générique : un site sur-mesure, pensé SEO dès la première ligne de code.<br/><br/>Ma différence ? Je ne crée pas de "beaux sites". Je crée des <strong>machines à générer des contacts qualifiés</strong> qui apparaissent en première page Google quand vos prospects recherchent vos services.`;

                techContent = `Pour les ${city.context.targetClients}, j'utilise des technologies premium qui garantissent performances et image de marque. Next.js pour la vitesse et le SEO natif, design sur-mesure sans template, hébergement haute disponibilité. Votre site sera aussi irréprochable que le service que vous proposez.`;

                typesContent = `Que vous soyez ${city.context.businessTypes[0].toLowerCase()} ou ${city.context.businessTypes[1].toLowerCase()} à ${city.name}, je conçois le site adapté à votre activité premium`;

                whyMeContent = `Les agences web de ${city.region} facturent entre <strong>5 000€ et 20 000€</strong> pour des sites premium, parfois plus pour du sur-mesure. Mais combien génèrent réellement des clients ?<br/><br/>Je propose une approche différente : un <strong>investissement maîtrisé (sur devis)</strong> dans un site conçu pour performer sur Google. Pas de budget faramineux pour un site vitrine invisible. Chaque euro investi doit revenir multiplié.`;
            } else if (isTech) {
                mainContent = `En tant que ${links.motherLink} et ${links.homeLink}, je crée des sites web pensés pour la génération de leads B2B à ${city.name}.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Votre site ne doit pas juste être "joli" — il doit convertir des visiteurs en leads qualifiés sur un cycle de vente de 6 à 12 mois. Architecture de contenu éducatif, landing pages produit optimisées, intégration CRM native.<br/><br/>Je parle le même langage que vos équipes dev. Pas de WordPress bricolé : des stacks modernes (Next.js, Headless CMS) qui scalent et se maintiennent facilement.`;

                techContent = `Pour les ${city.context.targetClients}, je privilégie les technologies qui font sens : Next.js/React pour la performance et le SEO, Tailwind pour un design système maintenable, Headless CMS pour l'autonomie de vos équipes. Le code est propre, documenté, prêt à scaler.`;

                typesContent = `Startups SaaS, ESN, éditeurs de logiciels à ${city.name} — je conçois des sites adaptés à vos enjeux B2B`;

                whyMeContent = `Les agences tech facturent entre <strong>10 000€ et 50 000€</strong> des sites parfois surdimensionnés pour vos besoins réels.<br/><br/>Je propose une approche pragmatique : un site qui fait le job, évolutif, avec un <strong>budget rationnel (sur devis)</strong>. On commence lean, on itère sur les résultats. Pas de feature creep ni de dette technique.`;
            } else {
                mainContent = `En tant que ${links.motherLink} et ${links.homeLink}, je crée des sites web qui génèrent des clients pour les entreprises de ${city.name}.<br/><br/>Vos ${city.population} clients potentiels vous cherchent sur Google. Mon approche est simple : créer un site qui apparaît quand ils recherchent "${city.name} + votre activité". Pas un site qui prend la poussière, mais un <strong>outil commercial actif 24/7</strong>.<br/><br/>Je suis d'abord SEO, ensuite développeuse. Chaque page est conçue pour ranker et convertir. C'est ça, la différence avec les agences web classiques.`;

                techContent = `Je privilégie des technologies modernes et performantes : Next.js pour la vitesse et le SEO, design responsive natif, hébergement optimisé. Pas de WordPress surchargé de plugins qui rame. Un site rapide, sécurisé, facile à gérer depuis ${city.name}.`;

                typesContent = `Que vous soyez ${city.context.businessTypes[0].toLowerCase()} ou ${city.context.businessTypes[1].toLowerCase()} à ${city.name}, je conçois le site adapté à votre activité`;

                whyMeContent = `Les agences de ${city.region} facturent entre <strong>2 000€ et 8 000€</strong> des sites vitrines classiques, parfois plus pour de l'e-commerce.<br/><br/>Mais combien de ces sites génèrent vraiment des clients ? Je propose un <strong>investissement sur-mesure (sur devis)</strong> avec une garantie de résultat : un site visible sur Google dans votre zone. Premier échange gratuit pour définir vos besoins.`;
            }

            const typesBullets = isLuxury ? [
                `<strong>Site vitrine premium</strong> : design sur-mesure, visuels haute définition, expérience utilisateur irréprochable`,
                `<strong>Site multilingue</strong> : versions FR/EN/IT avec SEO dédié pour chaque marché linguistique`,
                `<strong>Landing pages haut de gamme</strong> : pages de conversion ciblant votre clientèle premium`,
                `<strong>Portail client</strong> : espace sécurisé pour vos clients VIP avec fonctionnalités exclusives`
            ] : isTech ? [
                `<strong>Site produit SaaS</strong> : landing pages conversion, pricing, documentation, blog technique`,
                `<strong>Site corporate tech</strong> : présentation entreprise, cas clients, recrutement, blog thought leadership`,
                `<strong>Documentation technique</strong> : portail docs intégré au site marketing, SEO optimisé`,
                `<strong>Application web</strong> : dashboard clients, portail partenaires, outils internes`
            ] : [
                `<strong>Site vitrine local</strong> : présentez votre activité aux habitants de ${city.name} avec un site qui convertit`,
                `<strong>Site e-commerce</strong> : vendez en ligne à ${city.name}, ${city.nearbyAreas[0]} et toute la ${city.region}`,
                `<strong>Landing page métier</strong> : page de conversion ciblant "${city.name} + votre métier"`,
                `<strong>Blog professionnel</strong> : positionnez-vous comme expert local avec du contenu qui ranke`
            ];

            return {
                h2Sections: [
                    {
                        title: `Création de site web optimisé SEO à ${city.name}`,
                        content: mainContent,
                        bullets: [
                            `<strong>Architecture SEO-first</strong> : chaque page est conçue pour ranker sur les requêtes pertinentes à ${city.name}`,
                            `<strong>Performance maximale</strong> : score PageSpeed 90+ garanti, Core Web Vitals optimisés`,
                            `<strong>Mobile-first natif</strong> : 70% des recherches sont mobiles, votre site sera parfait sur tous les écrans`,
                            `<strong>SEO local intégré</strong> : schema.org LocalBusiness, optimisation Pack Local Google`,
                            `<strong>Indexation rapide</strong> : sitemap, Search Console, tout est configuré pour être visible vite`
                        ]
                    },
                    {
                        title: `Technologies modernes pour ${city.name}`,
                        content: techContent,
                        bullets: [
                            `<strong>Next.js / React</strong> : framework utilisé par Netflix et TikTok, SEO natif parfait`,
                            `<strong>Tailwind CSS</strong> : design sur-mesure sans surcharge, sites ultra-légers`,
                            `<strong>Hébergement edge</strong> : serveurs proches de ${city.region}, HTTPS automatique`,
                            `<strong>CMS intuitif</strong> : vous gérez votre contenu facilement, sans toucher au code`
                        ]
                    },
                    {
                        title: `Sites web pour ${city.context.targetClients.split(",")[0]}`,
                        content: typesContent,
                        bullets: typesBullets
                    },
                    {
                        title: `Pourquoi créer votre site avec moi à ${city.name} ?`,
                        content: whyMeContent,
                        bullets: [
                            `<strong>SEO intégré</strong> : pas de site invisible, votre site ranke dès sa mise en ligne`,
                            `<strong>Tarif transparent</strong> : devis détaillé, pas de mauvaise surprise`,
                            `<strong>Formation incluse</strong> : vous êtes autonome pour gérer votre site`,
                            `<strong>Suivi 3 mois offert</strong> : je monitore vos positions sur "${city.name} + votre activité"`
                        ]
                    }
                ],
                methodology: [
                    { step: "01", title: "Stratégie & mots-clés", desc: `J'analyse votre marché à ${city.name}, vos concurrents, et je définis les mots-clés stratégiques. Cette étape conditionne toute l'architecture.` },
                    { step: "02", title: "Maquettes & validation", desc: `Je crée les maquettes de votre site. Vous visualisez le résultat et validez avant développement. Modifications illimitées.` },
                    { step: "03", title: "Développement SEO-first", desc: `Je développe votre site avec une architecture optimisée pour ${city.name}. Performances maximales, code propre.` },
                    { step: "04", title: "Mise en ligne & suivi", desc: `Je déploie, configure Search Console, et lance le monitoring de vos positions. Suivi 3 mois inclus.` }
                ],
                faq: [
                    {
                        question: `Quel budget pour un site web à ${city.name} ?`,
                        answer: `Les agences de ${city.region} facturent entre <strong>2 000€ et 10 000€</strong> selon la complexité. Je propose un <strong>tarif sur devis</strong> adapté à vos besoins réels. Un site vitrine efficace ne nécessite pas forcément un gros budget. Premier échange gratuit pour définir votre projet.`
                    },
                    {
                        question: `Combien de temps pour créer un site à ${city.name} ?`,
                        answer: `Comptez <strong>3 à 6 semaines</strong> pour un site vitrine, <strong>6 à 10 semaines</strong> pour un e-commerce. Je travaille à distance avec des outils collaboratifs efficaces. Pour les entreprises de ${city.name}, je propose des visios régulières pour suivre l'avancement.`
                    },
                    {
                        question: `Mon site sera-t-il visible sur Google à ${city.name} ?`,
                        answer: `C'est ma garantie. Chaque site que je crée est conçu pour ranker sur vos requêtes stratégiques à ${city.name}. SEO intégré dès la conception, pas en afterthought. Je vous montre les résultats avec un suivi de positionnement sur 3 mois.`
                    },
                    {
                        question: `Proposez-vous la maintenance après création ?`,
                        answer: `Oui, je propose des <strong>forfaits de maintenance</strong> mensuels : mises à jour de sécurité, sauvegardes, monitoring, support prioritaire. Facultatif mais recommandé pour garder votre site performant et sécurisé.`
                    }
                ]
            };
        },
        semanticKeywords: [
            "création site web", "site vitrine", "site e-commerce", "responsive design", "Next.js",
            "WordPress", "SEO", "référencement", "Google", "mobile-first", "Core Web Vitals"
        ]
    },

    "referencement-naturel": {
        slug: "referencement-naturel",
        title: "Référencement Naturel",
        metaTitle: "Référencement Naturel {city} - Stratégie SEO | INDHACK",
        metaDescription: "Stratégie de référencement naturel à {city}. Augmentez votre trafic organique et vos conversions avec une approche SEO sur-mesure.",
        heroTitle: "Référencement Naturel à {city}",
        heroSubtitle: "Stratégie SEO complète pour les entreprises de {city}",
        category: "SEO",
        parentService: "/referencement-naturel",
        getContent: (city: CityData) => {
            const links = getInternalLinks(city, "referencement-naturel");
            const isLuxury = city.context.marketType === "luxury" || city.context.marketType === "premium";
            const isTech = city.context.marketType === "tech";
            const isVolume = city.context.marketType === "volume";

            let strategyContent = "";
            let localSeoContent = "";
            let resultsContent = "";
            let whyMeContent = "";

            if (isLuxury) {
                strategyContent = `En tant que ${links.motherLink} et ${links.homeLink}, je déploie des stratégies SEO calibrées pour les marchés premium.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Votre référencement doit refléter cette réalité : ciblage de mots-clés à fort potentiel commercial, contenu d'expertise qui positionne votre autorité, présence sur les requêtes multilingues de votre clientèle internationale.<br/><br/>Mon approche SEO pour le luxe est différente : moins de volume, plus de <strong>qualité et de conversion</strong>. Un lead sur une requête premium vaut cent clics génériques.`;

                localSeoContent = `Le SEO local à ${city.name} pour une clientèle premium a ses codes. Il ne s'agit pas simplement d'apparaître sur "restaurant ${city.name}" mais de dominer les requêtes à forte intention d'achat : "meilleur restaurant gastronomique ${city.name}", "villa prestige ${city.landmarks[0]}"...<br/><br/>J'optimise votre présence Google Business Profile avec des photos professionnelles, des avis gérés, et une cohérence parfaite avec votre site. Le Pack Local est souvent le premier point de contact avec vos futurs clients.`;

                resultsContent = `Sur un marché premium comme ${city.name}, le SEO est un investissement à moyen terme. ${city.context.specificChallenges[0]} implique une stratégie de différenciation plutôt que de volume.`;

                whyMeContent = `Les agences SEO parisiennes facturent entre <strong>2 000€ et 5 000€/mois</strong> pour des accompagnements premium, souvent sans comprendre les subtilités de votre marché local.<br/><br/>Je propose un accompagnement sur-mesure avec un <strong>investissement adapté (sur devis)</strong> à vos enjeux réels. Premier audit de positionnement gratuit.`;
            } else if (isTech) {
                strategyContent = `En tant que ${links.motherLink} et ${links.homeLink}, je conçois des stratégies SEO adaptées aux enjeux B2B tech.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Le SEO B2B est différent du B2C : cycles de décision longs, contenus éducatifs, ciblage de personas techniques. Mon approche intègre ces spécificités pour générer des leads qualifiés, pas du trafic vide.<br/><br/>Content marketing technique, thought leadership, landing pages produit optimisées — je construis une <strong>machine d'acquisition organique</strong> qui travaille pour vous 24/7.`;

                localSeoContent = `Le SEO local B2B à ${city.name} cible des requêtes spécifiques : "ESN ${city.name}", "développeur ${city.deptCode}", "startup ${city.landmarks[0]}"... Ces recherches ont un volume faible mais une intention business forte.<br/><br/>J'optimise également votre présence sur les plateformes B2B (LinkedIn, Malt, etc.) et je travaille votre SEO marque employeur pour attirer les talents dans un marché tendu.`;

                resultsContent = `En SEO B2B, les résultats se mesurent en leads qualifiés plus qu'en volume de trafic. Sur un marché tech comme ${city.name}, visez <strong>10-20 leads qualifiés par mois</strong> plutôt que 10 000 visiteurs qui ne convertissent pas.`;

                whyMeContent = `Les agences SEO généralistes ne comprennent pas les enjeux tech. Les agences spécialisées B2B facturent entre <strong>3 000€ et 8 000€/mois</strong>.<br/><br/>Je propose un accompagnement pragmatique avec un <strong>budget rationnel (sur devis)</strong> et des KPIs qui comptent : leads générés, pas vanity metrics.`;
            } else if (isVolume) {
                strategyContent = `En tant que ${links.motherLink} et ${links.homeLink}, je déploie des stratégies SEO de conquête pour les marchés concurrentiels.<br/><br/>À ${city.name}, ${city.context.localInsight.toLowerCase()}. Avec ${city.population} habitants et une concurrence féroce, le SEO est une guerre de positions. Chaque place gagnée sur Google se traduit en parts de marché. Ma stratégie est offensive : audit compétitif, identification des failles adverses, contenu de conquête.<br/><br/>Pas de SEO "doucement on verra" — des <strong>actions concrètes pour prendre des positions</strong>.`;

                localSeoContent = `À ${city.name}, le SEO local fait la différence entre les entreprises qui survivent et celles qui prospèrent. Le Pack Local capte 40% des clics sur les requêtes locales. Si vous n'y êtes pas, vous êtes invisible pour les ${city.population} habitants qui cherchent vos services.<br/><br/>J'optimise votre Google Business Profile, je travaille vos avis clients, et je construis votre présence locale sur les annuaires qui comptent. Objectif : dominer le Pack Local sur vos requêtes stratégiques.`;

                resultsContent = `Sur un marché aussi concurrentiel que ${city.name}, attendez-vous à des résultats progressifs mais durables. Les premiers effets sont visibles en 2-3 mois, les résultats significatifs en 6 mois.`;

                whyMeContent = `Les agences SEO de ${city.region} facturent entre <strong>1 000€ et 3 000€/mois</strong> pour des accompagnements souvent standardisés.<br/><br/>Je propose une stratégie offensive avec un <strong>investissement adapté (sur devis)</strong> à votre capacité et vos objectifs. On définit ensemble les KPIs et on mesure les résultats.`;
            } else {
                strategyContent = `En tant que ${links.motherLink} et ${links.homeLink}, je construis des stratégies SEO adaptées aux entreprises locales.<br/><br/>Les ${city.population} habitants de ${city.name} et des environs recherchent vos services sur Google. Ma mission : vous rendre visible quand ils tapent "${city.name} + votre métier". Une stratégie simple, efficace, centrée sur les <strong>résultats business</strong>.<br/><br/>Pas de jargon SEO inutile ni de promesses irréalistes. Un plan d'action clair pour prendre des positions sur vos requêtes stratégiques.`;

                localSeoContent = `Le SEO local à ${city.name} repose sur 3 piliers : un site optimisé pour les requêtes locales, une fiche Google Business Profile impeccable, et des avis clients qui rassurent. Je travaille ces 3 axes en parallèle pour maximiser votre visibilité dans le Pack Local.<br/><br/>J'optimise également votre présence sur les villes proches (${city.nearbyAreas.slice(0, 2).join(", ")}) pour élargir votre zone de chalandise sans diluer vos efforts.`;

                resultsContent = `Le SEO est un investissement moyen terme. Premiers effets visibles en 2-3 mois, résultats significatifs en 4-6 mois. Mais contrairement au SEA, ces résultats sont durables.`;

                whyMeContent = `Les agences de ${city.region} facturent entre <strong>500€ et 2 000€/mois</strong> pour des accompagnements SEO, parfois sans résultats tangibles.<br/><br/>Je propose un accompagnement transparent <strong>sur devis</strong> avec des <strong>objectifs mesurables</strong>. On définit ensemble vos KPIs et je vous montre les résultats mois après mois.`;
            }

            return {
                h2Sections: [
                    {
                        title: `Stratégie de référencement naturel à ${city.name}`,
                        content: strategyContent,
                        bullets: [
                            `<strong>Audit de positionnement</strong> : analyse de votre visibilité actuelle sur les requêtes "${city.name}"`,
                            `<strong>Étude de mots-clés</strong> : identification des requêtes stratégiques pour votre activité à ${city.name}`,
                            `<strong>Analyse concurrentielle</strong> : benchmark de vos concurrents locaux et identification des opportunités`,
                            `<strong>Plan d'action priorisé</strong> : roadmap SEO avec actions classées par impact et effort`,
                            `<strong>Suivi mensuel</strong> : reporting transparent sur l'évolution de vos positions et de votre trafic`
                        ]
                    },
                    {
                        title: `SEO local : dominez Google à ${city.name}`,
                        content: localSeoContent,
                        bullets: [
                            `<strong>Google Business Profile</strong> : optimisation complète de votre fiche pour le Pack Local`,
                            `<strong>Citations locales</strong> : présence cohérente sur les annuaires qui comptent pour ${city.name}`,
                            `<strong>Avis clients</strong> : stratégie d'acquisition et de gestion de vos avis Google`,
                            `<strong>Contenu local</strong> : pages ciblant ${city.name}, ${city.nearbyAreas[0]} et les zones environnantes`,
                            `<strong>Schema LocalBusiness</strong> : données structurées pour apparaître dans les rich snippets`
                        ]
                    },
                    {
                        title: `Résultats SEO attendus à ${city.name}`,
                        content: resultsContent,
                        bullets: [
                            `<strong>Mois 1-2</strong> : audit, stratégie, premiers quick wins techniques`,
                            `<strong>Mois 3-4</strong> : montée progressive sur les requêtes ciblées ${city.name}`,
                            `<strong>Mois 5-6</strong> : positions consolidées, augmentation du trafic qualifié`,
                            `<strong>Au-delà</strong> : expansion vers ${city.nearbyAreas.slice(0, 2).join(", ")} et tout le ${city.deptCode}`
                        ]
                    },
                    {
                        title: `Pourquoi me confier votre SEO à ${city.name} ?`,
                        content: whyMeContent,
                        bullets: [
                            `<strong>Expertise locale</strong> : je connais le marché ${city.name} et ses spécificités`,
                            `<strong>Résultats mesurables</strong> : reporting transparent, KPIs définis ensemble`,
                            `<strong>Approche sur-mesure</strong> : pas de package standardisé, une stratégie adaptée`,
                            `<strong>Tarif juste</strong> : investissement proportionné à vos enjeux et votre budget`
                        ]
                    }
                ],
                methodology: [
                    { step: "01", title: "Audit & stratégie", desc: `Analyse de votre situation, étude de mots-clés, benchmark concurrentiel. Je définis une stratégie adaptée au marché ${city.name}.` },
                    { step: "02", title: "Optimisation technique", desc: `Correction des erreurs techniques identifiées, amélioration des performances, optimisation mobile.` },
                    { step: "03", title: "Contenu & maillage", desc: `Optimisation de vos contenus existants, création de nouvelles pages ciblant ${city.name}, amélioration du maillage interne.` },
                    { step: "04", title: "Suivi & ajustements", desc: `Monitoring des positions, reporting mensuel, ajustements de stratégie selon les résultats.` }
                ],
                faq: [
                    {
                        question: `Combien de temps pour voir des résultats SEO à ${city.name} ?`,
                        answer: `Le SEO est un investissement moyen terme. Premiers effets visibles en <strong>2-3 mois</strong>, résultats significatifs en <strong>4-6 mois</strong>. Mais contrairement aux publicités, ces résultats sont durables et s'accumulent avec le temps.`
                    },
                    {
                        question: `Quel budget SEO pour une entreprise à ${city.name} ?`,
                        answer: `Les agences de ${city.region} facturent généralement entre <strong>500€ et 3 000€/mois</strong>. Je propose un accompagnement <strong>sur devis</strong> avec un <strong>investissement adapté</strong> à votre situation et vos objectifs. Premier échange gratuit pour définir vos besoins.`
                    },
                    {
                        question: `Le SEO fonctionne-t-il pour tous les secteurs à ${city.name} ?`,
                        answer: `Oui, le SEO fonctionne pour tous les secteurs à ${city.name}. Les ${city.context.businessTypes.slice(0, 3).join(", ")} sont tous recherchés sur Google. La stratégie s'adapte à votre secteur, votre concurrence et vos objectifs.`
                    },
                    {
                        question: `Que se passe-t-il si j'arrête le SEO ?`,
                        answer: `Contrairement aux publicités qui s'arrêtent instantanément, les effets du SEO perdurent. Vos positions acquises se maintiennent plusieurs mois, parfois années. C'est un actif digital qui continue de travailler pour vous.`
                    }
                ]
            };
        },
        semanticKeywords: [
            "référencement naturel", "SEO", "Google", "positionnement", "visibilité",
            "trafic organique", "mots-clés", "backlinks", "netlinking", "contenu SEO",
            "SEO local", "Google Business Profile", "Pack Local", "avis clients"
        ]
    }
};

// Interface pour les données de service résolues (sans fonction, sérialisable pour Client Components)
export interface ResolvedCityServiceData {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    category: string;
    parentService: string;
    semanticKeywords: string[];
    h2Sections: { title: string; content: string; bullets?: string[] }[];
    methodology: { step: string; title: string; desc: string }[];
    faq: { question: string; answer: string }[];
}

// Fonction pour obtenir le contenu d'un service pour une ville spécifique
// Retourne des données sérialisables (sans fonctions) pour les Client Components
export function getServiceContent(serviceSlug: string, citySlug: string): ResolvedCityServiceData | null {
    const service = CITY_SERVICES[serviceSlug];
    const city = getCityBySlug(citySlug);

    if (!service || !city) return null;

    const content = service.getContent(city);

    // Remplacer les placeholders dans les métadonnées
    const metaTitle = service.metaTitle
        .replace(/{city}/g, city.name)
        .replace(/{deptCode}/g, city.deptCode);

    const metaDescription = service.metaDescription
        .replace(/{city}/g, city.name)
        .replace(/{deptCode}/g, city.deptCode);

    const heroTitle = service.heroTitle.replace(/{city}/g, city.name);
    const heroSubtitle = service.heroSubtitle.replace(/{city}/g, city.name);

    // Retourner sans la fonction getContent (non sérialisable)
    return {
        slug: service.slug,
        title: service.title,
        metaTitle,
        metaDescription,
        heroTitle,
        heroSubtitle,
        category: service.category,
        parentService: service.parentService,
        semanticKeywords: service.semanticKeywords,
        ...content
    };
}
