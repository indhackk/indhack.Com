// Données centralisées des villes pour le SEO Local

export interface CityImage {
    src: string;
    alt: string;
    title: string;
    keywords: string[];
}

export interface CityImages {
    hero: CityImage;      // Image principale de la ville
    workspace: CityImage; // Ambiance locale / bureau
    landmark: CityImage;  // Monument emblématique
}

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
    images: CityImages;
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
        description: "À Nice, la Promenade des Anglais n'est pas le seul endroit où il faut être vu. Google est la nouvelle rue piétonne. Si votre entreprise n'est pas dans le Top 3, vous êtes invisible pour 340 000 clients locaux. IndHack transforme votre site en machine à capturer ce trafic.",
        keyPoints: ["Capturez le trafic local", "Dominez vos concurrents niçois", "Augmentez votre CA instantanément"],
        nearbyAreas: ["Villefranche-sur-Mer", "Saint-Laurent-du-Var", "Cagnes-sur-Mer", "Beaulieu-sur-Mer"],
        landmarks: ["Promenade des Anglais", "Vieux-Nice", "Port de Nice", "Place Masséna"],
        images: {
            hero: { src: "/images/cities/nice-promenade-anglais.webp", alt: "Promenade des Anglais Nice - Consultante SEO Nice", title: "Audit SEO Nice Côte d'Azur", keywords: ["SEO Nice", "référencement Nice", "consultant SEO Nice 06", "Promenade des Anglais"] },
            workspace: { src: "/images/cities/nice-vieux-nice.webp", alt: "Vieux-Nice ruelles - Expert SEO Nice", title: "Référencement naturel Nice", keywords: ["audit SEO Nice", "agence SEO Nice", "Vieux Nice"] },
            landmark: { src: "/images/cities/nice-place-massena.webp", alt: "Place Masséna Nice - SEO local Nice", title: "SEO local Nice 06", keywords: ["SEO local Nice", "Google My Business Nice", "Place Masséna"] }
        }
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
        description: "Immobilier, Luxe, Événementiel : À Cannes, chaque clic vaut de l'or. Vos concurrents internationaux investissent massivement. Ne laissez pas les agences parisiennes voler vos clients locaux. IndHack déploie une stratégie SEO d'élite pour le marché cannois.",
        keyPoints: ["Ciblez une clientèle VIP", "SEO Immobilier & Luxe", "Visibilité internationale"],
        nearbyAreas: ["Le Cannet", "Mougins", "Mandelieu-la-Napoule", "Théoule-sur-Mer"],
        landmarks: ["La Croisette", "Palais des Festivals", "Vieux Port", "Le Suquet"],
        images: {
            hero: { src: "/images/cities/cannes-croisette.webp", alt: "La Croisette Cannes - Consultante SEO Cannes", title: "Audit SEO Cannes 06", keywords: ["SEO Cannes", "référencement Cannes", "consultant SEO Cannes", "La Croisette"] },
            workspace: { src: "/images/cities/cannes-palais-festivals.webp", alt: "Palais des Festivals Cannes - Expert SEO Cannes", title: "Référencement naturel Cannes", keywords: ["audit SEO Cannes", "Palais des Festivals", "SEO luxe Cannes"] },
            landmark: { src: "/images/cities/cannes-vieux-port.webp", alt: "Vieux Port Cannes - SEO local Cannes", title: "SEO local Cannes 06", keywords: ["SEO local Cannes", "Vieux Port Cannes", "Le Suquet"] }
        }
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
        description: "Entre les remparts et le yachting, le business à Antibes est féroce. Les artisans et commerçants locaux qui ignorent Google Maps perdent 40% de leur CA potentiel. IndHack vous remet au centre de la carte.",
        keyPoints: ["Optimisation Google Maps", "SEO Yachting & Services", "Acquisition de leads locaux"],
        nearbyAreas: ["Juan-les-Pins", "Vallauris", "Biot", "Villeneuve-Loubet"],
        landmarks: ["Port Vauban", "Vieille Ville", "Cap d'Antibes", "Marché Provençal"],
        images: {
            hero: { src: "/images/cities/antibes-port-vauban.webp", alt: "Port Vauban Antibes - Consultante SEO Antibes", title: "Audit SEO Antibes 06", keywords: ["SEO Antibes", "référencement Antibes", "consultant SEO Antibes", "Port Vauban"] },
            workspace: { src: "/images/cities/antibes-vieille-ville.webp", alt: "Vieille Ville Antibes - Expert SEO Antibes", title: "Référencement naturel Antibes", keywords: ["audit SEO Antibes", "Vieille Ville Antibes", "Juan-les-Pins"] },
            landmark: { src: "/images/cities/antibes-cap.webp", alt: "Cap d'Antibes - SEO local Antibes", title: "SEO local Antibes 06", keywords: ["SEO local Antibes", "Cap d'Antibes", "yachting Antibes"] }
        }
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
        description: "Le m² digital le plus cher du monde. À Monaco, l'approximatif ne fonctionne pas. Vous devez être visible auprès des Family Offices, Banques et Services de Luxe. IndHack vous positionne là où l'argent circule : en haut de la page 1.",
        keyPoints: ["Stratégie Ultra-Premium", "E-réputation Monaco", "SEO Multilingue (EN/FR/IT/RU)"],
        nearbyAreas: ["Monte-Carlo", "La Condamine", "Fontvieille", "Beausoleil"],
        landmarks: ["Place du Casino", "Port Hercule", "Carré d'Or", "Rocher"],
        images: {
            hero: { src: "/images/cities/monaco-casino.webp", alt: "Casino Monte-Carlo Monaco - Consultante SEO Monaco", title: "Audit SEO Monaco 98", keywords: ["SEO Monaco", "référencement Monaco", "consultant SEO Monaco", "Monte-Carlo"] },
            workspace: { src: "/images/cities/monaco-port-hercule.webp", alt: "Port Hercule Monaco - Expert SEO Monaco", title: "Référencement naturel Monaco", keywords: ["audit SEO Monaco", "Port Hercule", "SEO luxe Monaco"] },
            landmark: { src: "/images/cities/monaco-rocher.webp", alt: "Rocher de Monaco - SEO local Monaco", title: "SEO local Monaco 98", keywords: ["SEO local Monaco", "Rocher Monaco", "Palais Princier"] }
        }
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
        description: "La Silicon Valley de l'Europe ne pardonne pas l'incompétence technique. Startups, SaaS, ESN : votre SEO doit être aussi performant que votre code. Audit technique pointu et acquisition B2B par IndHack.",
        keyPoints: ["SEO Technique B2B", "Génération de Leads SaaS", "Visibilité Tech & Innovation"],
        nearbyAreas: ["Valbonne", "Mougins", "Biot", "Antibes"],
        landmarks: ["Place Sophie Laffitte", "Skema", "Amadeus", "Carrefour des Entreprises"],
        images: {
            hero: { src: "/images/cities/sophia-antipolis-technopole.webp", alt: "Technopole Sophia Antipolis - Consultante SEO Sophia Antipolis", title: "Audit SEO Sophia Antipolis 06", keywords: ["SEO Sophia Antipolis", "référencement technopole", "consultant SEO startup", "Silicon Valley Europe"] },
            workspace: { src: "/images/cities/sophia-antipolis-bureaux.webp", alt: "Bureaux tech Sophia Antipolis - Expert SEO B2B", title: "Référencement SaaS Sophia Antipolis", keywords: ["audit SEO B2B", "SEO startup", "Sophia Antipolis tech"] },
            landmark: { src: "/images/cities/sophia-antipolis-campus.webp", alt: "Campus Sophia Antipolis - SEO local tech", title: "SEO local Sophia Antipolis 06", keywords: ["SEO local tech", "Skema", "Amadeus SEO"] }
        }
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
        description: "Marseille est un chaos organisé où seuls les plus visibles survivent. Dans cette jungle digitale, IndHack est votre machette. Nous coupons court à la concurrence pour placer votre business tout en haut.",
        keyPoints: ["Volume de recherche massif", "Concurrence agressive", "Stratégie de guérilla SEO"],
        nearbyAreas: ["Aix-en-Provence", "Aubagne", "Cassis", "La Ciotat"],
        landmarks: ["Vieux Port", "Vélodrome", "La Major", "Prado"],
        images: {
            hero: { src: "/images/cities/marseille-vieux-port.webp", alt: "Vieux Port Marseille - Consultante SEO Marseille", title: "Audit SEO Marseille 13", keywords: ["SEO Marseille", "référencement Marseille", "consultant SEO Marseille", "Vieux Port"] },
            workspace: { src: "/images/cities/marseille-mucem.webp", alt: "MuCEM Marseille - Expert SEO Marseille", title: "Référencement naturel Marseille", keywords: ["audit SEO Marseille", "MuCEM", "SEO Bouches-du-Rhône"] },
            landmark: { src: "/images/cities/marseille-notre-dame-garde.webp", alt: "Notre-Dame de la Garde Marseille - SEO local Marseille", title: "SEO local Marseille 13", keywords: ["SEO local Marseille", "Notre-Dame de la Garde", "Bonne Mère"] }
        }
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
        description: "Ville bourgeoise, clientèle exigeante. À Aix, l'image de marque est tout. Votre site doit refléter votre prestige. IndHack allie esthétique UX et puissance SEO pour séduire la clientèle aixoise.",
        keyPoints: ["SEO Image de Marque", "Ciblage CSP+", "Conversion haut de gamme"],
        nearbyAreas: ["Marseille", "Gardanne", "Venelles", "Les Milles"],
        landmarks: ["Cours Mirabeau", "Rotonde", "Quartier Mazarin", "Sainte-Victoire"],
        images: {
            hero: { src: "/images/cities/aix-cours-mirabeau.webp", alt: "Cours Mirabeau Aix-en-Provence - Consultante SEO Aix", title: "Audit SEO Aix-en-Provence 13", keywords: ["SEO Aix-en-Provence", "référencement Aix", "consultant SEO Aix", "Cours Mirabeau"] },
            workspace: { src: "/images/cities/aix-rotonde.webp", alt: "La Rotonde Aix-en-Provence - Expert SEO Aix", title: "Référencement naturel Aix-en-Provence", keywords: ["audit SEO Aix", "La Rotonde", "SEO premium Aix"] },
            landmark: { src: "/images/cities/aix-sainte-victoire.webp", alt: "Montagne Sainte-Victoire - SEO local Aix-en-Provence", title: "SEO local Aix-en-Provence 13", keywords: ["SEO local Aix", "Sainte-Victoire", "Cézanne"] }
        }
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
        description: "Paris est l'arène finale. Ici, on ne joue pas, on se bat. Chaque mot-clé est une guerre de tranchées. IndHack vous donne les armes lourdes : Netlinking, Contenu, Technique. Prêt à détrôner les géants ?",
        keyPoints: ["Guerre des mots-clés", "Netlinking Puissant", "Audit Technique Avancé"],
        nearbyAreas: ["Boulogne", "Neuilly", "La Défense", "Levallois"],
        landmarks: ["Tour Eiffel", "Louvre", "Champs-Élysées", "La Défense"],
        images: {
            hero: { src: "/images/cities/paris-tour-eiffel.webp", alt: "Tour Eiffel Paris - Consultante SEO Paris", title: "Audit SEO Paris 75", keywords: ["SEO Paris", "référencement Paris", "consultant SEO Paris", "Tour Eiffel"] },
            workspace: { src: "/images/cities/paris-marais.webp", alt: "Le Marais Paris - Expert SEO Paris", title: "Référencement naturel Paris", keywords: ["audit SEO Paris", "Le Marais", "SEO Île-de-France"] },
            landmark: { src: "/images/cities/paris-sacre-coeur.webp", alt: "Sacré-Coeur Montmartre - SEO local Paris", title: "SEO local Paris 75", keywords: ["SEO local Paris", "Sacré-Coeur", "Montmartre"] }
        }
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
        description: "QG des médias et grands groupes. Pour exister à Boulogne, il faut être irréprochable. IndHack optimise votre présence corporate pour rassurer les décideurs et partenaires.",
        keyPoints: ["SEO Corporate", "Gestion E-Réputation", "Visibilité B2B"],
        nearbyAreas: ["Paris 16", "Issy-les-Moulineaux", "Saint-Cloud", "Sèvres"],
        landmarks: ["La Seine Musicale", "Siège TF1", "Hôtel de Ville", "Longchamp"],
        images: {
            hero: { src: "/images/cities/boulogne-seine-musicale.webp", alt: "Seine Musicale Boulogne-Billancourt - Consultante SEO Boulogne", title: "Audit SEO Boulogne-Billancourt 92", keywords: ["SEO Boulogne-Billancourt", "référencement Boulogne", "consultant SEO 92", "Seine Musicale"] },
            workspace: { src: "/images/cities/boulogne-bureaux.webp", alt: "Quartier d'affaires Boulogne - Expert SEO corporate", title: "Référencement B2B Boulogne-Billancourt", keywords: ["audit SEO corporate", "SEO B2B Boulogne", "Hauts-de-Seine"] },
            landmark: { src: "/images/cities/boulogne-ile-seguin.webp", alt: "Île Seguin Boulogne - SEO local Boulogne-Billancourt", title: "SEO local Boulogne-Billancourt 92", keywords: ["SEO local Boulogne", "Île Seguin", "médias TF1"] }
        }
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
        description: "Terre de tech et d'innovation. À Rennes, si vous n'êtes pas digital, vous êtes mort. IndHack vous propulse au cœur de la French Tech bretonne avec un SEO propre, rapide et efficace.",
        keyPoints: ["SEO Startup & Tech", "Acquisition Lead Gen", "Performance Web"],
        nearbyAreas: ["Cesson-Sévigné", "Saint-Grégoire", "Chantepie", "Bruz"],
        landmarks: ["Parlement", "Gare EuroRennes", "Le Mabilay", "Roazhon Park"],
        images: {
            hero: { src: "/images/cities/rennes-parlement.webp", alt: "Parlement de Bretagne Rennes - Consultante SEO Rennes", title: "Audit SEO Rennes 35", keywords: ["SEO Rennes", "référencement Rennes", "consultant SEO Rennes", "Parlement Bretagne"] },
            workspace: { src: "/images/cities/rennes-republique.webp", alt: "Place de la République Rennes - Expert SEO Rennes", title: "Référencement naturel Rennes", keywords: ["audit SEO Rennes", "French Tech Rennes", "SEO Bretagne"] },
            landmark: { src: "/images/cities/rennes-thabor.webp", alt: "Parc du Thabor Rennes - SEO local Rennes", title: "SEO local Rennes 35", keywords: ["SEO local Rennes", "Thabor", "EuroRennes"] }
        }
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
        description: "L'effervescence nantaise demande de l'agilité. Votre site doit être aussi créatif et dynamique que la ville. IndHack booste votre trafic avec des stratégies SEO qui sortent du lot.",
        keyPoints: ["SEO Créatif", "Visibilité locale forte", "Trafic qualifié"],
        nearbyAreas: ["Saint-Herblain", "Rezé", "Orvault", "Carquefou"],
        landmarks: ["Les Machines", "Château des Ducs", "Tour Bretagne", "Passage Pommeraye"],
        images: {
            hero: { src: "/images/cities/nantes-machines.webp", alt: "Les Machines de l'île Nantes - Consultante SEO Nantes", title: "Audit SEO Nantes 44", keywords: ["SEO Nantes", "référencement Nantes", "consultant SEO Nantes", "Machines de l'île"] },
            workspace: { src: "/images/cities/nantes-chateau.webp", alt: "Château des Ducs Nantes - Expert SEO Nantes", title: "Référencement naturel Nantes", keywords: ["audit SEO Nantes", "Château des Ducs", "SEO Loire-Atlantique"] },
            landmark: { src: "/images/cities/nantes-passage-pommeraye.webp", alt: "Passage Pommeraye Nantes - SEO local Nantes", title: "SEO local Nantes 44", keywords: ["SEO local Nantes", "Passage Pommeraye", "centre-ville Nantes"] }
        }
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
        description: "De la Part-Dieu à Confluence, le business ne s'arrête jamais. Pour capter les lyonnais, fini le bricolage. IndHack met en place une infrastructure SEO solide pour sécuriser votre croissance.",
        keyPoints: ["SEO E-commerce et Services", "Maillage local puissant", "Conversion"],
        nearbyAreas: ["Villeurbanne", "Bron", "Vénissieux", "Caluire"],
        landmarks: ["Fourvière", "Place Bellecour", "Parc de la Tête d'Or", "Les Halles"],
        images: {
            hero: { src: "/images/cities/lyon-fourviere.webp", alt: "Basilique Fourvière Lyon - Consultante SEO Lyon", title: "Audit SEO Lyon 69", keywords: ["SEO Lyon", "référencement Lyon", "consultant SEO Lyon", "Fourvière"] },
            workspace: { src: "/images/cities/lyon-bellecour.webp", alt: "Place Bellecour Lyon - Expert SEO Lyon", title: "Référencement naturel Lyon", keywords: ["audit SEO Lyon", "Place Bellecour", "SEO Rhône-Alpes"] },
            landmark: { src: "/images/cities/lyon-confluence.webp", alt: "Confluence Lyon - SEO local Lyon", title: "SEO local Lyon 69", keywords: ["SEO local Lyon", "Confluence", "Part-Dieu"] }
        }
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
        description: "Au pied des montagnes, l'excellence scientifique impose ses règles. Votre SEO doit être chirurgical. IndHack analyse, optimise et positionne votre site avec la précision d'un ingénieur.",
        keyPoints: ["SEO Technique", "Audit de structure", "Contenu Expert"],
        nearbyAreas: ["Meylan", "Echirolles", "Saint-Martin-d'Hères", "Sassenage"],
        landmarks: ["La Bastille", "Téléphérique", "Caserne de Bonne", "Europole"],
        images: {
            hero: { src: "/images/cities/grenoble-bastille.webp", alt: "La Bastille Grenoble - Consultante SEO Grenoble", title: "Audit SEO Grenoble 38", keywords: ["SEO Grenoble", "référencement Grenoble", "consultant SEO Grenoble", "La Bastille"] },
            workspace: { src: "/images/cities/grenoble-alpes.webp", alt: "Vue Alpes Grenoble - Expert SEO Grenoble", title: "Référencement naturel Grenoble", keywords: ["audit SEO Grenoble", "Alpes", "SEO Isère"] },
            landmark: { src: "/images/cities/grenoble-telepherique.webp", alt: "Téléphérique Grenoble - SEO local Grenoble", title: "SEO local Grenoble 38", keywords: ["SEO local Grenoble", "Téléphérique", "Europole"] }
        }
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
        description: "La Ville Rose est un géant économique. Ne restez pas dans l'ombre d'Airbus. IndHack fait décoller votre visibilité avec des techniques de référencement propulsées par la data.",
        keyPoints: ["Décollage trafic", "Visibilité régionale", "Data-Driven SEO"],
        nearbyAreas: ["Blagnac", "Colomiers", "Balma", "L'Union"],
        landmarks: ["Capitole", "Quais de Garonne", "Cité de l'Espace", "Airbus"],
        images: {
            hero: { src: "/images/cities/toulouse-capitole.webp", alt: "Place du Capitole Toulouse - Consultante SEO Toulouse", title: "Audit SEO Toulouse 31", keywords: ["SEO Toulouse", "référencement Toulouse", "consultant SEO Toulouse", "Capitole"] },
            workspace: { src: "/images/cities/toulouse-garonne.webp", alt: "Quais de Garonne Toulouse - Expert SEO Toulouse", title: "Référencement naturel Toulouse", keywords: ["audit SEO Toulouse", "Garonne", "SEO Occitanie"] },
            landmark: { src: "/images/cities/toulouse-cite-espace.webp", alt: "Cité de l'Espace Toulouse - SEO local Toulouse", title: "SEO local Toulouse 31", keywords: ["SEO local Toulouse", "Cité de l'Espace", "Airbus"] }
        }
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
        description: "Élégance et Business. À Bordeaux, on achète ce qui inspire confiance. IndHack polit votre autorité digitale pour que Google (et vos clients) vous voient comme le Grand Cru de votre secteur.",
        keyPoints: ["Autorité de domaine", "Confiance et Preuve Sociale", "SEO Local Premium"],
        nearbyAreas: ["Mérignac", "Pessac", "Talence", "Bègles"],
        landmarks: ["Place de la Bourse", "Miroir d'eau", "Pont de Pierre", "Cité du Vin"],
        images: {
            hero: { src: "/images/cities/bordeaux-place-bourse.webp", alt: "Place de la Bourse Bordeaux - Consultante SEO Bordeaux", title: "Audit SEO Bordeaux 33", keywords: ["SEO Bordeaux", "référencement Bordeaux", "consultant SEO Bordeaux", "Place de la Bourse"] },
            workspace: { src: "/images/cities/bordeaux-miroir-eau.webp", alt: "Miroir d'eau Bordeaux - Expert SEO Bordeaux", title: "Référencement naturel Bordeaux", keywords: ["audit SEO Bordeaux", "Miroir d'eau", "SEO Gironde"] },
            landmark: { src: "/images/cities/bordeaux-cite-vin.webp", alt: "Cité du Vin Bordeaux - SEO local Bordeaux", title: "SEO local Bordeaux 33", keywords: ["SEO local Bordeaux", "Cité du Vin", "Pont de Pierre"] }
        }
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
        description: "Jeune, rapide, digitale. Montpellier va vite. Si votre site est lent ou mal référencé, vous êtes déjà oublié. IndHack optimise la vitesse et la pertinence pour capturer cette audience volatile.",
        keyPoints: ["Optimisation Mobile First", "Vitesse de chargement", "SEO Local Jeune"],
        nearbyAreas: ["Lattes", "Castelnau", "Juvignac", "Mauguio"],
        landmarks: ["L'Écusson", "Place de la Comédie", "Antigone", "Port Marianne"],
        images: {
            hero: { src: "/images/cities/montpellier-comedie.webp", alt: "Place de la Comédie Montpellier - Consultante SEO Montpellier", title: "Audit SEO Montpellier 34", keywords: ["SEO Montpellier", "référencement Montpellier", "consultant SEO Montpellier", "Place de la Comédie"] },
            workspace: { src: "/images/cities/montpellier-antigone.webp", alt: "Quartier Antigone Montpellier - Expert SEO Montpellier", title: "Référencement naturel Montpellier", keywords: ["audit SEO Montpellier", "Antigone", "SEO Hérault"] },
            landmark: { src: "/images/cities/montpellier-ecusson.webp", alt: "L'Écusson Montpellier - SEO local Montpellier", title: "SEO local Montpellier 34", keywords: ["SEO local Montpellier", "Écusson", "Port Marianne"] }
        }
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
        description: "Carrefour de l'Europe. La concurrence vient de partout (Paris, Bruxelles, Londres). Votre SEO doit être international et local à la fois. IndHack construit votre forteresse digitale.",
        keyPoints: ["SEO Cross-border", "Commerce & Retail", "Visibilité Européenne"],
        nearbyAreas: ["Roubaix", "Tourcoing", "Marcq-en-Barœul", "La Madeleine"],
        landmarks: ["Grand Place", "Beffroi", "Citadelle", "Euralille"],
        images: {
            hero: { src: "/images/cities/lille-grand-place.webp", alt: "Grand Place Lille - Consultante SEO Lille", title: "Audit SEO Lille 59", keywords: ["SEO Lille", "référencement Lille", "consultant SEO Lille", "Grand Place"] },
            workspace: { src: "/images/cities/lille-vieux-lille.webp", alt: "Vieux Lille - Expert SEO Lille", title: "Référencement naturel Lille", keywords: ["audit SEO Lille", "Vieux Lille", "SEO Nord"] },
            landmark: { src: "/images/cities/lille-beffroi.webp", alt: "Beffroi Lille - SEO local Lille", title: "SEO local Lille 59", keywords: ["SEO local Lille", "Beffroi", "Euralille"] }
        }
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
        description: "Rigueur et efficacité. Strasbourg ne tolère pas l'amateurisme. IndHack audite, corrige et propulse votre site avec une méthodologie carrée. Résultats mesurables, croissance durable.",
        keyPoints: ["SEO Structuré", "Reporting précis", "Croissance long terme"],
        nearbyAreas: ["Schiltigheim", "Illkirch", "Bischheim", "Kehl"],
        landmarks: ["Cathédrale", "Petite France", "Parlement Européen", "Neustadt"],
        images: {
            hero: { src: "/images/cities/strasbourg-cathedrale.webp", alt: "Cathédrale Strasbourg - Consultante SEO Strasbourg", title: "Audit SEO Strasbourg 67", keywords: ["SEO Strasbourg", "référencement Strasbourg", "consultant SEO Strasbourg", "Cathédrale"] },
            workspace: { src: "/images/cities/strasbourg-petite-france.webp", alt: "Petite France Strasbourg - Expert SEO Strasbourg", title: "Référencement naturel Strasbourg", keywords: ["audit SEO Strasbourg", "Petite France", "SEO Grand Est"] },
            landmark: { src: "/images/cities/strasbourg-parlement.webp", alt: "Parlement Européen Strasbourg - SEO local Strasbourg", title: "SEO local Strasbourg 67", keywords: ["SEO local Strasbourg", "Parlement Européen", "Neustadt"] }
        }
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

// Sub-services for semantic cocoon (Fille Tier 2)
export interface CityServiceData {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    category: string;
    parentService: string;
    h2Sections: {
        title: string;
        content: string;
        bullets?: string[];
    }[];
    methodology: {
        step: string;
        title: string;
        desc: string;
    }[];
    faq: {
        question: string;
        answer: string;
    }[];
    semanticKeywords: string[];
}

export const CITY_SERVICES: Record<string, CityServiceData> = {
    "audit-technique": {
        slug: "audit-technique",
        title: "Audit Technique SEO",
        metaTitle: "Audit Technique SEO {city} {deptCode} - INDHACK - Consultante SEO",
        metaDescription: "Consultante SEO freelance à {city}. Mon audit technique révèle ce qui bloque votre visibilité Google : indexation, vitesse, maillage. Diagnostic gratuit.",
        heroTitle: "Audit Technique SEO à {city}",
        heroSubtitle: "En tant que consultante SEO indépendante, j'analyse l'infrastructure technique de votre site pour identifier précisément ce qui freine votre visibilité sur Google.",
        category: "Audit Technique",
        parentService: "/audit-seo",
        h2Sections: [
            {
                title: "Qu'est-ce qu'un audit technique SEO ?",
                content: "En tant que <a href=\"/{citySlug}\" class=\"text-sauge font-bold hover:underline\">consultante SEO à {city}</a>, je réalise des <strong>audits techniques</strong> qui vont bien au-delà des rapports automatisés.<br/><br/>L'<strong>audit technique SEO</strong> est la radiographie de votre site web. Il révèle tout ce qui empêche <strong>Google</strong> de crawler, indexer et positionner vos pages correctement. Sans fondations techniques solides, même le meilleur contenu reste invisible.<br/><br/>Ma méthode combine analyse automatisée et expertise humaine. Je ne me contente pas de lister des erreurs : je les priorise par <strong>impact business réel</strong> pour que vous sachiez exactement où investir vos efforts.",
                bullets: [
                    "Analyse approfondie de l'<strong>indexation</strong> via <strong>Google Search Console</strong> : pages indexées, exclues, erreurs de couverture",
                    "<strong>Crawl complet</strong> avec <strong>Screaming Frog</strong> pour cartographier le <strong>budget crawl</strong>, les erreurs 4xx/5xx et les redirections en chaîne",
                    "Mesure précise des <strong>Core Web Vitals</strong> : <strong>LCP</strong> (chargement), <strong>FID</strong> (interactivité), <strong>CLS</strong> (stabilité visuelle)",
                    "Audit du <strong>maillage interne</strong> : structure d'URL, profondeur de page, distribution du <strong>PageRank</strong> interne",
                    "Vérification des <strong>balises meta</strong> : title, description, hiérarchie des <strong>balises Hn</strong>, données structurées <strong>schema.org</strong>",
                    "Analyse du fichier <strong>robots.txt</strong>, <strong>sitemap XML</strong> et configuration du <strong>canonical</strong>"
                ]
            },
            {
                title: "Ma méthode : les 6 piliers de l'audit technique",
                content: "Mon approche d'<strong>audit technique SEO</strong> est structurée autour de 6 piliers essentiels. Je ne me contente pas de générer une liste d'erreurs automatique — je priorise chaque recommandation selon son <strong>impact réel</strong> sur votre visibilité et votre business.<br/><br/>Mon expertise de consultante freelance me permet d'aller au-delà des outils : je comprends comment Google évalue techniquement un site, et je traduis cette connaissance en actions concrètes pour votre équipe.",
                bullets: [
                    "<strong>Indexation Google</strong> : Vos pages sont-elles dans l'index ? Combien sont exclues et pourquoi ? J'identifie les problèmes de <strong>noindex</strong>, <strong>canonical</strong> et <strong>crawl budget</strong> gaspillé.",
                    "<strong>Crawlabilité</strong> : Google peut-il accéder facilement à tout votre contenu stratégique ? Je détecte les blocages dans le <strong>robots.txt</strong>, les erreurs de navigation JavaScript et les <strong>pages orphelines</strong>.",
                    "<strong>Vitesse de chargement</strong> : Les <strong>Core Web Vitals</strong> sont un facteur de ranking direct. J'analyse le temps de chargement, l'optimisation des images, la minification du code et les ressources bloquantes.",
                    "<strong>Architecture du site</strong> : <strong>Profondeur de page</strong>, <strong>maillage interne</strong>, <strong>cocon sémantique</strong>. Une bonne architecture aide Google à comprendre la hiérarchie de votre contenu.",
                    "<strong>Balisage HTML</strong> : <strong>Balises title</strong> uniques et optimisées, <strong>meta descriptions</strong> incitatives, structure <strong>Hn</strong> cohérente, <strong>données structurées</strong> pour les rich snippets.",
                    "<strong>Mobile-First</strong> : Google indexe en priorité la version mobile. Je vérifie le <strong>responsive design</strong>, l'<strong>UX mobile</strong> et l'absence de contenu masqué."
                ]
            },
            {
                title: "Pourquoi me confier votre audit technique ?",
                content: "Contrairement aux agences qui délèguent à des juniors, <strong>je réalise personnellement chaque audit</strong>. Vous travaillez directement avec moi, sans intermédiaire.<br/><br/>Les outils automatisés génèrent des centaines d'alertes, mais toutes ne sont pas égales. Mon expertise me permet de distinguer les <strong>erreurs critiques</strong> qui bloquent vraiment votre référencement des faux positifs sans impact.<br/><br/>À {city}, j'accompagne des entreprises de toutes tailles avec une approche sur-mesure. Je ne vends pas de packages standardisés : je construis une <strong>stratégie adaptée</strong> à votre contexte, vos ressources et vos objectifs.",
            },
            {
                title: "Les erreurs que je détecte le plus souvent",
                content: "Au fil de mes missions de <strong>consultante SEO</strong> à {city} et partout en France, j'ai identifié les problèmes techniques récurrents qui sabotent la visibilité de la majorité des sites :",
                bullets: [
                    "<strong>Pages zombies</strong> : des centaines de pages à faible valeur ajoutée qui diluent votre <strong>crawl budget</strong> et votre autorité de domaine",
                    "<strong>Contenu dupliqué</strong> : balises <strong>canonical</strong> mal configurées, versions HTTP/HTTPS ou www/non-www accessibles",
                    "<strong>Vitesse catastrophique</strong> : images non optimisées, JavaScript render-blocking, absence de cache navigateur, hébergement sous-dimensionné",
                    "<strong>Maillage interne anarchique</strong> : pages importantes à 4+ clics de la homepage, liens cassés internes, <strong>ancres</strong> non optimisées",
                    "<strong>Mobile non optimisé</strong> : texte trop petit, éléments cliquables trop proches, contenu plus large que l'écran",
                    "<strong>Données structurées absentes</strong> : pas de <strong>schema.org</strong> pour les FAQ, avis, produits, LocalBusiness..."
                ]
            }
        ],
        methodology: [
            { step: "01", title: "Crawl Complet", desc: "J'analyse l'intégralité de votre site avec <strong>Screaming Frog</strong> pour identifier les erreurs techniques, pages orphelines, redirections en chaîne et problèmes de structure." },
            { step: "02", title: "Analyse Search Console", desc: "Je plonge dans vos données <strong>Google Search Console</strong> : couverture d'indexation, erreurs signalées, performances réelles sur Google, requêtes et CTR." },
            { step: "03", title: "Core Web Vitals", desc: "Je mesure <strong>LCP</strong>, <strong>FID</strong> et <strong>CLS</strong> sur vos pages clés avec <strong>PageSpeed Insights</strong> et <strong>Lighthouse</strong> pour identifier les freins à l'UX et au ranking." },
            { step: "04", title: "Rapport & Roadmap", desc: "Je livre un <strong>rapport de 20+ pages</strong> avec recommandations priorisées par impact SEO. Vous savez exactement quoi corriger en premier pour des résultats rapides." }
        ],
        faq: [
            {
                question: "Comment se déroule un audit technique SEO ?",
                answer: "L'<strong>audit technique</strong> commence par un <strong>crawl complet</strong> de votre site avec des outils professionnels comme <strong>Screaming Frog</strong>. J'analyse ensuite vos données <strong>Google Search Console</strong>, je mesure les <strong>Core Web Vitals</strong>, et j'examine votre <strong>maillage interne</strong>. Le livrable est un rapport détaillé avec des <strong>recommandations priorisées</strong> par impact sur votre visibilité. Je propose un premier diagnostic gratuit pour évaluer vos besoins spécifiques."
            },
            {
                question: "Quels outils utilisez-vous pour l'audit technique ?",
                answer: "J'utilise une <strong>stack professionnelle</strong> complète : <strong>Screaming Frog</strong> pour le crawl technique, <strong>Google Search Console</strong> pour les données d'indexation, <strong>PageSpeed Insights</strong> et <strong>Lighthouse</strong> pour les <strong>Core Web Vitals</strong>, <strong>Ahrefs</strong> pour l'analyse du profil de liens, et si nécessaire des outils d'<strong>analyse de logs serveur</strong> pour comprendre comment Googlebot crawle réellement votre site."
            },
            {
                question: "Combien de temps dure un audit technique complet ?",
                answer: "Comptez <strong>5 à 10 jours ouvrés</strong> selon la taille et la complexité de votre site. Un <strong>audit technique SEO</strong> sérieux demande une analyse minutieuse pour ne rien manquer. Je préfère prendre le temps de faire un travail exhaustif plutôt que de livrer un rapport superficiel généré automatiquement. La qualité de l'analyse est directement proportionnelle aux résultats que vous obtiendrez."
            },
            {
                question: "L'audit technique suffit-il pour améliorer mon SEO ?",
                answer: "L'<strong>audit technique</strong> est la <strong>fondation indispensable</strong>, mais le <strong>SEO</strong> repose sur <strong>3 piliers</strong> : technique, contenu et popularité (<strong>backlinks</strong>). Je recommande généralement de commencer par corriger les erreurs techniques majeures qui bloquent l'indexation, puis de travailler sur l'<strong>optimisation sémantique</strong> du contenu et enfin sur l'<strong>acquisition de liens</strong>. C'est un travail progressif et complémentaire."
            },
            {
                question: "Pouvez-vous implémenter les corrections après l'audit ?",
                answer: "Absolument. Je propose un <strong>accompagnement à la mise en œuvre</strong> des recommandations, soit en formant votre équipe technique aux bonnes pratiques <strong>SEO</strong>, soit en pilotant directement les corrections avec vos développeurs. L'<strong>audit</strong> n'est utile que s'il est suivi d'<strong>actions concrètes</strong>. Je peux également assurer un suivi mensuel pour mesurer l'impact des corrections."
            },
            {
                question: "Mon site est petit, ai-je vraiment besoin d'un audit technique ?",
                answer: "Même un <strong>site vitrine</strong> de quelques pages peut avoir des problèmes techniques critiques : <strong>vitesse de chargement</strong> catastrophique, <strong>balises meta</strong> dupliquées, <strong>mobile</strong> non optimisé, absence de <strong>données structurées</strong>. Ces erreurs peuvent vous coûter des positions précieuses sur <strong>Google</strong>. Un audit rapide permet d'identifier les quick wins qui auront un impact immédiat sur votre <strong>référencement local</strong> à {city}."
            }
        ],
        semanticKeywords: [
            "Screaming Frog", "Google Search Console", "Core Web Vitals", "LCP", "FID", "CLS",
            "budget crawl", "indexation Google", "maillage interne", "balises meta", "robots.txt",
            "sitemap XML", "erreurs 404", "redirections 301", "vitesse de chargement", "mobile-first",
            "données structurées", "schema.org", "profondeur de page", "cocon sémantique", "audit de logs",
            "PageSpeed Insights", "Lighthouse", "crawlabilité", "pages orphelines", "canonical"
        ]
    }
};
