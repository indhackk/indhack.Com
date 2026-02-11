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
        slug: "consultant-seo-nice",
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
            hero: { src: "/images/cities/nice-promenade-anglais.jpg", alt: "Promenade des Anglais Nice - Consultante SEO Nice", title: "Audit SEO Nice Côte d'Azur", keywords: ["SEO Nice", "référencement Nice", "consultant SEO Nice 06", "Promenade des Anglais"] },
            workspace: { src: "/images/cities/nice-vieux-nice.jpg", alt: "Vieux-Nice ruelles - Expert SEO Nice", title: "Référencement naturel Nice", keywords: ["audit SEO Nice", "agence SEO Nice", "Vieux Nice"] },
            landmark: { src: "/images/cities/nice-place-massena.jpg", alt: "Place Masséna Nice - SEO local Nice", title: "SEO local Nice 06", keywords: ["SEO local Nice", "Google My Business Nice", "Place Masséna"] }
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
        population: "74 000",
        description: "Immobilier, Luxe, Événementiel : À Cannes, chaque clic vaut de l'or. Vos concurrents internationaux investissent massivement. Ne laissez pas les agences parisiennes voler vos clients locaux. IndHack déploie une stratégie SEO d'élite pour le marché cannois.",
        keyPoints: ["Ciblez une clientèle VIP", "SEO Immobilier & Luxe", "Visibilité internationale"],
        nearbyAreas: ["Le Cannet", "Mougins", "Mandelieu-la-Napoule", "Théoule-sur-Mer"],
        landmarks: ["La Croisette", "Palais des Festivals", "Vieux Port", "Le Suquet"],
        images: {
            hero: { src: "/images/cities/cannes-croisette.jpg", alt: "La Croisette Cannes - Consultante SEO Cannes", title: "Audit SEO Cannes 06", keywords: ["SEO Cannes", "référencement Cannes", "consultant SEO Cannes", "La Croisette"] },
            workspace: { src: "/images/cities/cannes-palais-festivals.jpg", alt: "Palais des Festivals Cannes - Expert SEO Cannes", title: "Référencement naturel Cannes", keywords: ["audit SEO Cannes", "Palais des Festivals", "SEO luxe Cannes"] },
            landmark: { src: "/images/cities/cannes-vieux-port.jpg", alt: "Vieux Port Cannes - SEO local Cannes", title: "SEO local Cannes 06", keywords: ["SEO local Cannes", "Vieux Port Cannes", "Le Suquet"] }
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
        population: "73 000",
        description: "Entre les remparts et le yachting, le business à Antibes est féroce. Les artisans et commerçants locaux qui ignorent Google Maps perdent 40% de leur CA potentiel. IndHack vous remet au centre de la carte.",
        keyPoints: ["Optimisation Google Maps", "SEO Yachting & Services", "Acquisition de leads locaux"],
        nearbyAreas: ["Juan-les-Pins", "Vallauris", "Biot", "Villeneuve-Loubet"],
        landmarks: ["Port Vauban", "Vieille Ville", "Cap d'Antibes", "Marché Provençal"],
        images: {
            hero: { src: "/images/cities/antibes-port-vauban.jpg", alt: "Port Vauban Antibes - Consultante SEO Antibes", title: "Audit SEO Antibes 06", keywords: ["SEO Antibes", "référencement Antibes", "consultant SEO Antibes", "Port Vauban"] },
            workspace: { src: "/images/cities/antibes-vieille-ville.jpg", alt: "Vieille Ville Antibes - Expert SEO Antibes", title: "Référencement naturel Antibes", keywords: ["audit SEO Antibes", "Vieille Ville Antibes", "Juan-les-Pins"] },
            landmark: { src: "/images/cities/antibes-cap.jpg", alt: "Cap d'Antibes - SEO local Antibes", title: "SEO local Antibes 06", keywords: ["SEO local Antibes", "Cap d'Antibes", "yachting Antibes"] }
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
        population: "39 000",
        description: "Le m² digital le plus cher du monde. À Monaco, l'approximatif ne fonctionne pas. Vous devez être visible auprès des Family Offices, Banques et Services de Luxe. IndHack vous positionne là où l'argent circule : en haut de la page 1.",
        keyPoints: ["Stratégie Ultra-Premium", "E-réputation Monaco", "SEO Multilingue (EN/FR/IT/RU)"],
        nearbyAreas: ["Monte-Carlo", "La Condamine", "Fontvieille", "Beausoleil"],
        landmarks: ["Place du Casino", "Port Hercule", "Carré d'Or", "Rocher"],
        images: {
            hero: { src: "/images/cities/monaco-casino.jpg", alt: "Casino Monte-Carlo Monaco - Consultante SEO Monaco", title: "Audit SEO Monaco 98", keywords: ["SEO Monaco", "référencement Monaco", "consultant SEO Monaco", "Monte-Carlo"] },
            workspace: { src: "/images/cities/monaco-port-hercule.jpg", alt: "Port Hercule Monaco - Expert SEO Monaco", title: "Référencement naturel Monaco", keywords: ["audit SEO Monaco", "Port Hercule", "SEO luxe Monaco"] },
            landmark: { src: "/images/cities/monaco-rocher.jpg", alt: "Rocher de Monaco - SEO local Monaco", title: "SEO local Monaco 98", keywords: ["SEO local Monaco", "Rocher Monaco", "Palais Princier"] }
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
        population: "2 500 entreprises",
        description: "La Silicon Valley de l'Europe ne pardonne pas l'incompétence technique. Startups, SaaS, ESN : votre SEO doit être aussi performant que votre code. Audit technique pointu et acquisition B2B par IndHack.",
        keyPoints: ["SEO Technique B2B", "Génération de Leads SaaS", "Visibilité Tech & Innovation"],
        nearbyAreas: ["Valbonne", "Mougins", "Biot", "Antibes"],
        landmarks: ["Place Sophie Laffitte", "Skema", "Amadeus", "Carrefour des Entreprises"],
        images: {
            hero: { src: "/images/cities/sophia-antipolis-technopole.jpg", alt: "Technopole Sophia Antipolis - Consultante SEO Sophia Antipolis", title: "Audit SEO Sophia Antipolis 06", keywords: ["SEO Sophia Antipolis", "référencement technopole", "consultant SEO startup", "Silicon Valley Europe"] },
            workspace: { src: "/images/cities/sophia-antipolis-bureaux.jpg", alt: "Bureaux tech Sophia Antipolis - Expert SEO B2B", title: "Référencement SaaS Sophia Antipolis", keywords: ["audit SEO B2B", "SEO startup", "Sophia Antipolis tech"] },
            landmark: { src: "/images/cities/sophia-antipolis-campus.jpg", alt: "Campus Sophia Antipolis - SEO local tech", title: "SEO local Sophia Antipolis 06", keywords: ["SEO local tech", "Skema", "Amadeus SEO"] }
        }
    },
    // Marseille et environs
    {
        name: "Marseille",
        slug: "consultant-seo-marseille",
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
            hero: { src: "/images/cities/marseille-vieux-port.jpg", alt: "Vieux Port Marseille - Consultante SEO Marseille", title: "Audit SEO Marseille 13", keywords: ["SEO Marseille", "référencement Marseille", "consultant SEO Marseille", "Vieux Port"] },
            workspace: { src: "/images/cities/marseille-mucem.jpg", alt: "MuCEM Marseille - Expert SEO Marseille", title: "Référencement naturel Marseille", keywords: ["audit SEO Marseille", "MuCEM", "SEO Bouches-du-Rhône"] },
            landmark: { src: "/images/cities/marseille-notre-dame-garde.jpg", alt: "Notre-Dame de la Garde Marseille - SEO local Marseille", title: "SEO local Marseille 13", keywords: ["SEO local Marseille", "Notre-Dame de la Garde", "Bonne Mère"] }
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
        population: "145 000",
        description: "Ville bourgeoise, clientèle exigeante. À Aix, l'image de marque est tout. Votre site doit refléter votre prestige. IndHack allie esthétique UX et puissance SEO pour séduire la clientèle aixoise.",
        keyPoints: ["SEO Image de Marque", "Ciblage CSP+", "Conversion haut de gamme"],
        nearbyAreas: ["Marseille", "Gardanne", "Venelles", "Les Milles"],
        landmarks: ["Cours Mirabeau", "Rotonde", "Quartier Mazarin", "Sainte-Victoire"],
        images: {
            hero: { src: "/images/cities/aix-cours-mirabeau.jpg", alt: "Cours Mirabeau Aix-en-Provence - Consultante SEO Aix", title: "Audit SEO Aix-en-Provence 13", keywords: ["SEO Aix-en-Provence", "référencement Aix", "consultant SEO Aix", "Cours Mirabeau"] },
            workspace: { src: "/images/cities/aix-rotonde.jpg", alt: "La Rotonde Aix-en-Provence - Expert SEO Aix", title: "Référencement naturel Aix-en-Provence", keywords: ["audit SEO Aix", "La Rotonde", "SEO premium Aix"] },
            landmark: { src: "/images/cities/aix-sainte-victoire.jpg", alt: "Montagne Sainte-Victoire - SEO local Aix-en-Provence", title: "SEO local Aix-en-Provence 13", keywords: ["SEO local Aix", "Sainte-Victoire", "Cézanne"] }
        }
    },
    // Paris et Île-de-France
    {
        name: "Paris",
        slug: "consultant-seo-paris",
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
            hero: { src: "/images/cities/paris-tour-eiffel.jpg", alt: "Tour Eiffel Paris - Consultante SEO Paris", title: "Audit SEO Paris 75", keywords: ["SEO Paris", "référencement Paris", "consultant SEO Paris", "Tour Eiffel"] },
            workspace: { src: "/images/cities/paris-marais.jpg", alt: "Le Marais Paris - Expert SEO Paris", title: "Référencement naturel Paris", keywords: ["audit SEO Paris", "Le Marais", "SEO Île-de-France"] },
            landmark: { src: "/images/cities/paris-sacre-coeur.jpg", alt: "Sacré-Coeur Montmartre - SEO local Paris", title: "SEO local Paris 75", keywords: ["SEO local Paris", "Sacré-Coeur", "Montmartre"] }
        }
    },
    {
        name: "Boulogne-Billancourt",
        slug: "consultant-seo-boulogne-billancourt",
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
            hero: { src: "/images/cities/boulogne-seine-musicale.jpg", alt: "Seine Musicale Boulogne-Billancourt - Consultante SEO Boulogne", title: "Audit SEO Boulogne-Billancourt 92", keywords: ["SEO Boulogne-Billancourt", "référencement Boulogne", "consultant SEO 92", "Seine Musicale"] },
            workspace: { src: "/images/cities/boulogne-bureaux.jpg", alt: "Quartier d'affaires Boulogne - Expert SEO corporate", title: "Référencement B2B Boulogne-Billancourt", keywords: ["audit SEO corporate", "SEO B2B Boulogne", "Hauts-de-Seine"] },
            landmark: { src: "/images/cities/boulogne-ile-seguin.jpg", alt: "Île Seguin Boulogne - SEO local Boulogne-Billancourt", title: "SEO local Boulogne-Billancourt 92", keywords: ["SEO local Boulogne", "Île Seguin", "médias TF1"] }
        }
    },
    // Bretagne
    {
        name: "Rennes",
        slug: "consultant-seo-rennes",
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
            hero: { src: "/images/cities/rennes-parlement.jpg", alt: "Parlement de Bretagne Rennes - Consultante SEO Rennes", title: "Audit SEO Rennes 35", keywords: ["SEO Rennes", "référencement Rennes", "consultant SEO Rennes", "Parlement Bretagne"] },
            workspace: { src: "/images/cities/rennes-republique.jpg", alt: "Place de la République Rennes - Expert SEO Rennes", title: "Référencement naturel Rennes", keywords: ["audit SEO Rennes", "French Tech Rennes", "SEO Bretagne"] },
            landmark: { src: "/images/cities/rennes-thabor.jpg", alt: "Parc du Thabor Rennes - SEO local Rennes", title: "SEO local Rennes 35", keywords: ["SEO local Rennes", "Thabor", "EuroRennes"] }
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
        population: "320 000",
        description: "L'effervescence nantaise demande de l'agilité. Votre site doit être aussi créatif et dynamique que la ville. IndHack booste votre trafic avec des stratégies SEO qui sortent du lot.",
        keyPoints: ["SEO Créatif", "Visibilité locale forte", "Trafic qualifié"],
        nearbyAreas: ["Saint-Herblain", "Rezé", "Orvault", "Carquefou"],
        landmarks: ["Les Machines", "Château des Ducs", "Tour Bretagne", "Passage Pommeraye"],
        images: {
            hero: { src: "/images/cities/nantes-machines.jpg", alt: "Les Machines de l'île Nantes - Consultante SEO Nantes", title: "Audit SEO Nantes 44", keywords: ["SEO Nantes", "référencement Nantes", "consultant SEO Nantes", "Machines de l'île"] },
            workspace: { src: "/images/cities/nantes-chateau.jpg", alt: "Château des Ducs Nantes - Expert SEO Nantes", title: "Référencement naturel Nantes", keywords: ["audit SEO Nantes", "Château des Ducs", "SEO Loire-Atlantique"] },
            landmark: { src: "/images/cities/nantes-passage-pommeraye.jpg", alt: "Passage Pommeraye Nantes - SEO local Nantes", title: "SEO local Nantes 44", keywords: ["SEO local Nantes", "Passage Pommeraye", "centre-ville Nantes"] }
        }
    },
    // Lyon et Rhône-Alpes
    {
        name: "Lyon",
        slug: "consultant-seo-lyon",
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
            hero: { src: "/images/cities/lyon-fourviere.jpg", alt: "Basilique Fourvière Lyon - Consultante SEO Lyon", title: "Audit SEO Lyon 69", keywords: ["SEO Lyon", "référencement Lyon", "consultant SEO Lyon", "Fourvière"] },
            workspace: { src: "/images/cities/lyon-bellecour.jpg", alt: "Place Bellecour Lyon - Expert SEO Lyon", title: "Référencement naturel Lyon", keywords: ["audit SEO Lyon", "Place Bellecour", "SEO Rhône-Alpes"] },
            landmark: { src: "/images/cities/lyon-confluence.jpg", alt: "Confluence Lyon - SEO local Lyon", title: "SEO local Lyon 69", keywords: ["SEO local Lyon", "Confluence", "Part-Dieu"] }
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
        population: "160 000",
        description: "Au pied des montagnes, l'excellence scientifique impose ses règles. Votre SEO doit être chirurgical. IndHack analyse, optimise et positionne votre site avec la précision d'un ingénieur.",
        keyPoints: ["SEO Technique", "Audit de structure", "Contenu Expert"],
        nearbyAreas: ["Meylan", "Echirolles", "Saint-Martin-d'Hères", "Sassenage"],
        landmarks: ["La Bastille", "Téléphérique", "Caserne de Bonne", "Europole"],
        images: {
            hero: { src: "/images/cities/grenoble-bastille.jpg", alt: "La Bastille Grenoble - Consultante SEO Grenoble", title: "Audit SEO Grenoble 38", keywords: ["SEO Grenoble", "référencement Grenoble", "consultant SEO Grenoble", "La Bastille"] },
            workspace: { src: "/images/cities/grenoble-alpes.jpg", alt: "Vue Alpes Grenoble - Expert SEO Grenoble", title: "Référencement naturel Grenoble", keywords: ["audit SEO Grenoble", "Alpes", "SEO Isère"] },
            landmark: { src: "/images/cities/grenoble-telepherique.jpg", alt: "Téléphérique Grenoble - SEO local Grenoble", title: "SEO local Grenoble 38", keywords: ["SEO local Grenoble", "Téléphérique", "Europole"] }
        }
    },
    // Sud-Ouest
    {
        name: "Toulouse",
        slug: "consultant-seo-toulouse",
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
            hero: { src: "/images/cities/toulouse-capitole.jpg", alt: "Place du Capitole Toulouse - Consultante SEO Toulouse", title: "Audit SEO Toulouse 31", keywords: ["SEO Toulouse", "référencement Toulouse", "consultant SEO Toulouse", "Capitole"] },
            workspace: { src: "/images/cities/toulouse-garonne.jpg", alt: "Quais de Garonne Toulouse - Expert SEO Toulouse", title: "Référencement naturel Toulouse", keywords: ["audit SEO Toulouse", "Garonne", "SEO Occitanie"] },
            landmark: { src: "/images/cities/toulouse-cite-espace.jpg", alt: "Cité de l'Espace Toulouse - SEO local Toulouse", title: "SEO local Toulouse 31", keywords: ["SEO local Toulouse", "Cité de l'Espace", "Airbus"] }
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
        population: "260 000",
        description: "Élégance et Business. À Bordeaux, on achète ce qui inspire confiance. IndHack polit votre autorité digitale pour que Google (et vos clients) vous voient comme le Grand Cru de votre secteur.",
        keyPoints: ["Autorité de domaine", "Confiance et Preuve Sociale", "SEO Local Premium"],
        nearbyAreas: ["Mérignac", "Pessac", "Talence", "Bègles"],
        landmarks: ["Place de la Bourse", "Miroir d'eau", "Pont de Pierre", "Cité du Vin"],
        images: {
            hero: { src: "/images/cities/bordeaux-place-bourse.jpg", alt: "Place de la Bourse Bordeaux - Consultante SEO Bordeaux", title: "Audit SEO Bordeaux 33", keywords: ["SEO Bordeaux", "référencement Bordeaux", "consultant SEO Bordeaux", "Place de la Bourse"] },
            workspace: { src: "/images/cities/bordeaux-miroir-eau.jpg", alt: "Miroir d'eau Bordeaux - Expert SEO Bordeaux", title: "Référencement naturel Bordeaux", keywords: ["audit SEO Bordeaux", "Miroir d'eau", "SEO Gironde"] },
            landmark: { src: "/images/cities/bordeaux-cite-vin.jpg", alt: "Cité du Vin Bordeaux - SEO local Bordeaux", title: "SEO local Bordeaux 33", keywords: ["SEO local Bordeaux", "Cité du Vin", "Pont de Pierre"] }
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
        population: "290 000",
        description: "Jeune, rapide, digitale. Montpellier va vite. Si votre site est lent ou mal référencé, vous êtes déjà oublié. IndHack optimise la vitesse et la pertinence pour capturer cette audience volatile.",
        keyPoints: ["Optimisation Mobile First", "Vitesse de chargement", "SEO Local Jeune"],
        nearbyAreas: ["Lattes", "Castelnau", "Juvignac", "Mauguio"],
        landmarks: ["L'Écusson", "Place de la Comédie", "Antigone", "Port Marianne"],
        images: {
            hero: { src: "/images/cities/montpellier-comedie.jpg", alt: "Place de la Comédie Montpellier - Consultante SEO Montpellier", title: "Audit SEO Montpellier 34", keywords: ["SEO Montpellier", "référencement Montpellier", "consultant SEO Montpellier", "Place de la Comédie"] },
            workspace: { src: "/images/cities/montpellier-antigone.jpg", alt: "Quartier Antigone Montpellier - Expert SEO Montpellier", title: "Référencement naturel Montpellier", keywords: ["audit SEO Montpellier", "Antigone", "SEO Hérault"] },
            landmark: { src: "/images/cities/montpellier-ecusson.jpg", alt: "L'Écusson Montpellier - SEO local Montpellier", title: "SEO local Montpellier 34", keywords: ["SEO local Montpellier", "Écusson", "Port Marianne"] }
        }
    },
    // Nord et Est
    {
        name: "Lille",
        slug: "consultant-seo-lille",
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
            hero: { src: "/images/cities/lille-grand-place.jpg", alt: "Grand Place Lille - Consultante SEO Lille", title: "Audit SEO Lille 59", keywords: ["SEO Lille", "référencement Lille", "consultant SEO Lille", "Grand Place"] },
            workspace: { src: "/images/cities/lille-vieux-lille.jpg", alt: "Vieux Lille - Expert SEO Lille", title: "Référencement naturel Lille", keywords: ["audit SEO Lille", "Vieux Lille", "SEO Nord"] },
            landmark: { src: "/images/cities/lille-beffroi.jpg", alt: "Beffroi Lille - SEO local Lille", title: "SEO local Lille 59", keywords: ["SEO local Lille", "Beffroi", "Euralille"] }
        }
    },
    {
        name: "Strasbourg",
        slug: "consultant-seo-strasbourg",
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
            hero: { src: "/images/cities/strasbourg-cathedrale.jpg", alt: "Cathédrale Strasbourg - Consultante SEO Strasbourg", title: "Audit SEO Strasbourg 67", keywords: ["SEO Strasbourg", "référencement Strasbourg", "consultant SEO Strasbourg", "Cathédrale"] },
            workspace: { src: "/images/cities/strasbourg-petite-france.jpg", alt: "Petite France Strasbourg - Expert SEO Strasbourg", title: "Référencement naturel Strasbourg", keywords: ["audit SEO Strasbourg", "Petite France", "SEO Grand Est"] },
            landmark: { src: "/images/cities/strasbourg-parlement.jpg", alt: "Parlement Européen Strasbourg - SEO local Strasbourg", title: "SEO local Strasbourg 67", keywords: ["SEO local Strasbourg", "Parlement Européen", "Neustadt"] }
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
        metaDescription: "Consultante SEO freelance à {city} ({deptCode}). Mon audit technique révèle ce qui bloque votre visibilité Google près de {landmark1}. Diagnostic gratuit.",
        heroTitle: "Audit Technique SEO à {city}",
        heroSubtitle: "Votre entreprise à {city} mérite d'être visible sur Google. J'analyse l'infrastructure technique de votre site pour identifier ce qui freine votre référencement dans le {deptCode}.",
        category: "Audit Technique",
        parentService: "/audit-seo",
        h2Sections: [
            {
                title: "Audit technique SEO à {city} : mon approche",
                content: "En tant que <a href=\"/{citySlug}\" class=\"text-sauge font-bold hover:underline\">consultante SEO à {city}</a> et <a href=\"/consultant-seo\" class=\"text-sauge font-bold hover:underline\">experte en référencement naturel</a>, j'accompagne les entreprises du {department} avec des <strong>audits techniques</strong> sur-mesure.<br/><br/>Que vous soyez basé près de {landmark1} ou dans les environs de {nearbyAreas}, votre site doit performer techniquement pour attirer les {population} habitants de {city} qui recherchent vos services sur Google.<br/><br/>L'<strong>audit technique SEO</strong> est la radiographie de votre site. Il révèle ce qui empêche Google de crawler et positionner vos pages correctement. Ma méthode va au-delà des rapports automatisés : je priorise par <strong>impact business réel</strong>.",
                bullets: [
                    "Analyse approfondie de l'<strong>indexation</strong> via <strong>Google Search Console</strong> : pages indexées, exclues, erreurs de couverture pour les recherches \"{city}\"",
                    "<strong>Crawl complet</strong> avec <strong>Screaming Frog</strong> : budget crawl, erreurs 4xx/5xx, redirections — optimisé pour le référencement local {deptCode}",
                    "Mesure des <strong>Core Web Vitals</strong> : <strong>LCP</strong>, <strong>FID</strong>, <strong>CLS</strong> — critères essentiels pour surpasser vos concurrents à {city}",
                    "Audit du <strong>maillage interne</strong> : structure d'URL, profondeur de page, distribution du <strong>PageRank</strong> vers vos pages stratégiques",
                    "Vérification des <strong>balises meta</strong> optimisées pour {city} : title, description, hiérarchie Hn, données structurées <strong>LocalBusiness</strong>"
                ]
            },
            {
                title: "Les 6 piliers de mon audit technique à {city}",
                content: "Mon approche d'<strong>audit technique SEO</strong> pour les entreprises de {city} et {region} est structurée autour de 6 piliers essentiels. Chaque recommandation est priorisée selon son <strong>impact réel</strong> sur votre visibilité locale.<br/><br/>Mon expertise de consultante freelance dans le {deptCode} me permet d'aller au-delà des outils : je comprends les spécificités du marché de {city} et je traduis cette connaissance en actions concrètes.",
                bullets: [
                    "<strong>Indexation Google</strong> : Vos pages ciblant {city} sont-elles indexées ? J'identifie les problèmes de <strong>noindex</strong>, <strong>canonical</strong> et <strong>crawl budget</strong> gaspillé.",
                    "<strong>Crawlabilité</strong> : Google accède-t-il à votre contenu stratégique ? Je détecte les blocages <strong>robots.txt</strong>, erreurs JavaScript et <strong>pages orphelines</strong>.",
                    "<strong>Vitesse de chargement</strong> : Les <strong>Core Web Vitals</strong> sont un facteur de ranking direct. J'optimise pour les connexions mobiles utilisées autour de {landmark2}.",
                    "<strong>Architecture du site</strong> : <strong>Profondeur de page</strong>, <strong>maillage interne</strong>, <strong>cocon sémantique</strong> adapté à votre activité dans le {department}.",
                    "<strong>Balisage HTML</strong> : <strong>Balises title</strong> intégrant {city}, <strong>meta descriptions</strong> incitatives, structure <strong>Hn</strong> cohérente.",
                    "<strong>Mobile-First</strong> : Google indexe la version mobile. Je vérifie le <strong>responsive design</strong> et l'<strong>UX mobile</strong> pour les utilisateurs de {city}."
                ]
            },
            {
                title: "Pourquoi choisir mon expertise à {city} ?",
                content: "Contrairement aux agences qui délèguent à des juniors, <strong>je réalise personnellement chaque audit</strong>. Vous travaillez directement avec moi, sans intermédiaire.<br/><br/>Les outils automatisés génèrent des centaines d'alertes sans contexte local. Mon expertise du marché de {city} et de {region} me permet de distinguer les <strong>erreurs critiques</strong> des faux positifs.<br/><br/>J'accompagne des entreprises de {city}, {nearbyAreas} et tout le {department} avec une approche sur-mesure. Pas de packages standardisés : une <strong>stratégie adaptée</strong> à votre contexte, vos concurrents locaux et vos objectifs de croissance.",
            },
            {
                title: "Erreurs techniques fréquentes à {city}",
                content: "Au fil de mes missions auprès d'entreprises de {city}, {nearbyAreas} et plus largement en {region}, j'ai identifié les problèmes techniques récurrents :",
                bullets: [
                    "<strong>Pages zombies</strong> : contenus obsolètes qui diluent votre <strong>crawl budget</strong> et votre autorité sur les requêtes \"{city}\"",
                    "<strong>Contenu dupliqué</strong> : balises <strong>canonical</strong> mal configurées, versions HTTP/HTTPS ou www/non-www accessibles",
                    "<strong>Vitesse catastrophique</strong> : images non optimisées, JavaScript render-blocking — problème critique pour le mobile dans le {deptCode}",
                    "<strong>Maillage interne défaillant</strong> : pages importantes à 4+ clics, liens cassés, <strong>ancres</strong> non optimisées pour le SEO local",
                    "<strong>Mobile non optimisé</strong> : texte trop petit, éléments cliquables trop proches — 70% des recherches \"{city}\" sont mobiles",
                    "<strong>Données structurées absentes</strong> : pas de <strong>schema.org LocalBusiness</strong> pour apparaître dans le Pack Local de {city}"
                ]
            }
        ],
        methodology: [
            { step: "01", title: "Crawl Complet", desc: "J'analyse votre site avec <strong>Screaming Frog</strong> pour identifier les erreurs techniques, pages orphelines et problèmes de structure affectant votre visibilité à {city}." },
            { step: "02", title: "Analyse Search Console", desc: "J'exploite vos données <strong>Google Search Console</strong> : couverture d'indexation, performances sur les requêtes \"{city}\", CTR et positions moyennes." },
            { step: "03", title: "Core Web Vitals", desc: "Je mesure <strong>LCP</strong>, <strong>FID</strong> et <strong>CLS</strong> sur vos pages clés avec <strong>PageSpeed Insights</strong> pour optimiser l'expérience mobile dans le {deptCode}." },
            { step: "04", title: "Rapport & Roadmap", desc: "Je livre un <strong>rapport de 20+ pages</strong> avec recommandations priorisées pour dominer Google à {city}. Actions concrètes et résultats mesurables." }
        ],
        faq: [
            {
                question: "Comment se déroule un audit technique SEO à {city} ?",
                answer: "L'<strong>audit technique</strong> pour votre entreprise de {city} commence par un <strong>crawl complet</strong> avec <strong>Screaming Frog</strong>. J'analyse vos données <strong>Google Search Console</strong>, je mesure les <strong>Core Web Vitals</strong>, et j'examine votre <strong>maillage interne</strong>. Le livrable est un rapport détaillé avec des <strong>recommandations priorisées</strong> adaptées au marché de {city} et {region}. Premier diagnostic gratuit."
            },
            {
                question: "Quels outils utilisez-vous pour auditer les sites de {city} ?",
                answer: "J'utilise une <strong>stack professionnelle</strong> complète : <strong>Screaming Frog</strong> pour le crawl, <strong>Google Search Console</strong> pour l'indexation, <strong>PageSpeed Insights</strong> pour les <strong>Core Web Vitals</strong>, <strong>Ahrefs</strong> pour les backlinks. Pour les entreprises de {city}, j'analyse aussi votre positionnement sur les requêtes locales type \"{city} + votre activité\"."
            },
            {
                question: "Combien coûte un audit technique SEO à {city} ?",
                answer: "Le tarif dépend de la taille de votre site et de vos objectifs. Pour une PME de {city}, comptez entre <strong>500€ et 1500€</strong> pour un audit complet. Je propose un <strong>diagnostic gratuit</strong> de 30 minutes pour évaluer vos besoins et vous donner une estimation précise adaptée à votre situation dans le {deptCode}."
            },
            {
                question: "L'audit technique suffit-il pour être visible à {city} ?",
                answer: "L'<strong>audit technique</strong> est la <strong>fondation indispensable</strong>, mais le SEO repose sur 3 piliers : technique, contenu et popularité. Pour dominer les recherches à {city}, il faut ensuite optimiser votre contenu pour les requêtes locales et obtenir des <strong>backlinks</strong> de sites du {department} et de {region}."
            },
            {
                question: "Intervenez-vous sur site à {city} ?",
                answer: "Je travaille principalement à distance avec des outils collaboratifs efficaces. Pour les entreprises de {city} et {nearbyAreas}, je propose des <strong>rendez-vous en visio</strong> ou en présentiel selon les besoins. L'essentiel est la qualité de l'audit et du suivi, pas la présence physique."
            },
            {
                question: "Mon entreprise à {city} a un petit site, l'audit est-il utile ?",
                answer: "Même un <strong>site vitrine</strong> de quelques pages peut avoir des problèmes techniques critiques qui bloquent votre visibilité à {city} : vitesse, balises meta dupliquées, mobile non optimisé, absence de <strong>schema.org LocalBusiness</strong>. Un audit rapide identifie les quick wins pour dominer les recherches \"{city} + votre métier\"."
            }
        ],
        semanticKeywords: [
            "Screaming Frog", "Google Search Console", "Core Web Vitals", "LCP", "FID", "CLS",
            "budget crawl", "indexation Google", "maillage interne", "balises meta", "robots.txt",
            "sitemap XML", "erreurs 404", "redirections 301", "vitesse de chargement", "mobile-first",
            "données structurées", "schema.org", "profondeur de page", "cocon sémantique", "audit de logs",
            "PageSpeed Insights", "Lighthouse", "crawlabilité", "pages orphelines", "canonical"
        ]
    },
    "creation-site-web": {
        slug: "creation-site-web",
        title: "Création de Site Web",
        metaTitle: "Création Site Web {city} {deptCode} - Site Optimisé SEO | INDHACK",
        metaDescription: "Création de site web professionnel à {city} ({deptCode}). Site vitrine, e-commerce optimisé SEO pour les entreprises près de {landmark1}. Devis gratuit.",
        heroTitle: "Création de Site Web à {city}",
        heroSubtitle: "Votre entreprise à {city} mérite un site web qui génère des clients. Je conçois des sites performants, pensés SEO dès la première ligne de code pour dominer les recherches dans le {deptCode}.",
        category: "Création Web",
        parentService: "/creation-site-web",
        h2Sections: [
            {
                title: "Création de site web optimisé SEO à {city}",
                content: "En tant que <a href=\"/{citySlug}\" class=\"text-sauge font-bold hover:underline\">spécialiste SEO à {city}</a> et <a href=\"/consultant-seo\" class=\"text-sauge font-bold hover:underline\">consultante en référencement</a>, je ne crée pas de simples sites vitrines. Je construis des <strong>machines à générer du trafic organique</strong> pour les entreprises du {department}.<br/><br/>Que vous soyez basé près de {landmark1} ou dans les environs de {nearbyAreas}, les {population} habitants de {city} doivent pouvoir vous trouver sur Google.<br/><br/>Ma méthode est inverse aux agences web classiques : <strong>le SEO guide chaque décision</strong> — architecture, URLs, performances. Votre site est conçu pour plaire à Google ET aux clients de {city}.",
                bullets: [
                    "<strong>Architecture SEO-first</strong> : structure d'URLs optimisée pour {city}, hiérarchie de pages logique, cocon sémantique intégré",
                    "<strong>Performance maximale</strong> : score PageSpeed 90+ garanti, Core Web Vitals optimisés pour les connexions mobiles du {deptCode}",
                    "<strong>Mobile-first natif</strong> : 70% des recherches \"{city}\" sont mobiles — votre site sera parfait sur tous les écrans",
                    "<strong>SEO local intégré</strong> : schema.org LocalBusiness, optimisation pour le Pack Local de {city}",
                    "<strong>Indexation immédiate</strong> : sitemap, robots.txt, soumission Search Console le jour J pour être visible à {city} rapidement"
                ]
            },
            {
                title: "Technologies modernes pour votre site à {city}",
                content: "Je travaille avec les <strong>technologies les plus performantes</strong> du marché pour créer des sites rapides et évolutifs pour les entreprises de {city} et {region}.<br/><br/>Pas de WordPress bricolé avec 40 plugins. Je privilégie les solutions modernes qui garantissent <strong>performance et maintenabilité</strong> sur le long terme.",
                bullets: [
                    "<strong>Next.js / React</strong> : framework utilisé par Netflix et TikTok. Rendu serveur ultra-rapide, SEO natif parfait pour les requêtes \"{city}\"",
                    "<strong>Tailwind CSS</strong> : design sur-mesure sans surcharge CSS, sites légers adaptés à votre image de marque",
                    "<strong>Vercel / Netlify</strong> : hébergement edge mondial avec serveurs proches de {region}, HTTPS automatique",
                    "<strong>Headless CMS</strong> : vous gérez votre contenu facilement depuis {city}, sans toucher au code",
                    "<strong>WordPress optimisé</strong> : si vous préférez WordPress, je le configure proprement pour le SEO local"
                ]
            },
            {
                title: "Sites web pour entreprises de {city}",
                content: "Que vous soyez artisan près de {landmark1}, startup tech ou commerce local à {city}, je conçois le site adapté à votre activité dans le {deptCode}.",
                bullets: [
                    "<strong>Site vitrine</strong> : présentez votre activité aux {population} habitants de {city} avec un site élégant qui convertit",
                    "<strong>Site e-commerce</strong> : vendez en ligne aux clients de {city}, {nearbyAreas} et toute la {region}",
                    "<strong>Landing pages</strong> : pages de vente haute conversion ciblant \"{city} + votre métier\"",
                    "<strong>Blog professionnel</strong> : positionnez-vous comme expert dans le {department} avec du contenu qui ranke",
                    "<strong>Application web</strong> : portails clients, dashboards, outils métier pour votre équipe à {city}"
                ]
            },
            {
                title: "Pourquoi me choisir à {city} ?",
                content: "À {city} et dans tout le {deptCode}, les agences web pullulent. La différence ? <strong>Je suis d'abord SEO, ensuite développeuse</strong>.<br/><br/>Chaque site que je crée est pensé pour performer sur Google dans votre zone : {city}, {nearbyAreas}. Pas de site joli mais invisible. Vous avez un actif digital qui travaille pour vous 24/7 et attire des clients du {department}.",
                bullets: [
                    "<strong>Audit de mots-clés préalable</strong> : je cible les requêtes des habitants de {city} et {region} dès le départ",
                    "<strong>Maillage interne stratégique</strong> : distribution optimale du PageRank vers vos pages commerciales ciblant {city}",
                    "<strong>Formation incluse</strong> : je vous forme à la gestion de votre site depuis {city}",
                    "<strong>Suivi de positionnement</strong> : 3 mois de monitoring offerts sur les requêtes \"{city} + votre activité\""
                ]
            }
        ],
        methodology: [
            { step: "01", title: "Stratégie & Mots-clés", desc: "J'analyse votre marché et vos concurrents à {city}. Je définis les <strong>mots-clés stratégiques</strong> ciblant le {deptCode} et {region}. Cette étape conditionne toute l'architecture." },
            { step: "02", title: "Maquettes & Validation", desc: "Je crée les <strong>maquettes UI/UX</strong> de votre site. Vous visualisez le résultat et validez avant le développement. Modifications illimitées à cette étape." },
            { step: "03", title: "Développement SEO-First", desc: "Je développe votre site avec une <strong>architecture optimisée</strong> pour {city}, des performances maximales et un code propre. Chaque page cible vos clients locaux." },
            { step: "04", title: "Mise en ligne & Indexation", desc: "Je déploie votre site, configure <strong>Google Search Console</strong>, soumets le sitemap et lance le monitoring de vos positions sur les requêtes \"{city}\"." }
        ],
        faq: [
            {
                question: "Combien coûte un site web à {city} ?",
                answer: "Pour une entreprise de {city}, un <strong>site vitrine</strong> professionnel démarre autour de <strong>1 500€</strong>. Un <strong>site e-commerce</strong> représente un investissement plus conséquent. Je vous propose un <strong>devis gratuit</strong> après avoir compris vos besoins. Mon approche SEO-first garantit un <strong>ROI supérieur</strong> car votre site génère des clients dès sa mise en ligne."
            },
            {
                question: "Délai de création pour un site à {city} ?",
                answer: "Comptez <strong>3 à 6 semaines</strong> pour un site vitrine, <strong>6 à 10 semaines</strong> pour un e-commerce. Je travaille à distance avec des outils collaboratifs efficaces. Pour les entreprises de {city} et {nearbyAreas}, je propose des <strong>rendez-vous en visio</strong> ou en présentiel selon les besoins."
            },
            {
                question: "Pourquoi pas Wix ou Squarespace pour mon site à {city} ?",
                answer: "Ces plateformes sont <strong>limitées en SEO local</strong>. Code lourd, vitesse médiocre, structure d'URL imposée... Pour être visible à {city} et devancer vos concurrents du {deptCode}, vous avez besoin d'un site <strong>sur-mesure</strong> qui vous appartient et qui cible les requêtes \"{city} + votre métier\"."
            },
            {
                question: "Mon site sera-t-il visible à {city} rapidement ?",
                answer: "Dès la mise en ligne, je soumets votre site à <strong>Google Search Console</strong>. Les premières pages apparaissent sous <strong>24 à 72h</strong>. Le positionnement sur des requêtes compétitives comme \"{city} + votre métier\" prend <strong>3 à 6 mois</strong>. L'avantage : votre site est optimisé dès le départ pour les recherches locales dans le {deptCode}."
            },
            {
                question: "Puis-je gérer mon site depuis {city} ?",
                answer: "Absolument. Je configure un <strong>CMS intuitif</strong> pour que vous puissiez modifier textes, images et pages depuis {city} sans toucher au code. <strong>Formation personnalisée</strong> et documentation incluses. Je reste disponible pour les questions."
            },
            {
                question: "Maintenance du site pour les entreprises de {city} ?",
                answer: "Je propose des <strong>forfaits de maintenance</strong> mensuels : mises à jour de sécurité, sauvegardes, monitoring de performance, support prioritaire. Facultatif mais recommandé pour garder votre site performant dans le temps. Support à distance ou en présentiel pour les entreprises de {city} et {nearbyAreas}."
            }
        ],
        semanticKeywords: [
            "création site web", "création site internet", "agence web", "développeur web",
            "site vitrine", "site e-commerce", "landing page", "refonte site",
            "Next.js", "React", "WordPress", "Tailwind CSS", "responsive design",
            "Core Web Vitals", "PageSpeed", "mobile-first", "UX design", "UI design",
            "hébergement web", "nom de domaine", "HTTPS", "SSL", "Vercel",
            "CMS", "gestion de contenu", "blog professionnel", "SEO technique"
        ]
    },
    "referencement-naturel": {
        slug: "referencement-naturel",
        title: "Référencement Naturel",
        metaTitle: "Référencement Naturel {city} {deptCode} - Expert SEO | INDHACK",
        metaDescription: "Stratégie de référencement naturel sur-mesure à {city} ({deptCode}). Augmentez votre trafic organique de +200% en 6 mois près de {landmark1}. Audit gratuit.",
        heroTitle: "Référencement Naturel à {city}",
        heroSubtitle: "Votre entreprise à {city} mérite d'être en première page Google. Je développe des stratégies SEO sur-mesure pour les {population} habitants du {deptCode} qui recherchent vos services.",
        category: "SEO",
        parentService: "/referencement-naturel",
        h2Sections: [
            {
                title: "Référencement naturel à {city} : mon approche",
                content: "Le <strong>référencement naturel</strong> (ou <strong>SEO</strong>) désigne l'ensemble des techniques pour améliorer votre <strong>visibilité sur Google</strong> dans le {deptCode}.<br/><br/>En tant que <a href=\"/{citySlug}\" class=\"text-sauge font-bold hover:underline\">experte SEO à {city}</a> et <a href=\"/consultant-seo\" class=\"text-sauge font-bold hover:underline\">consultante en référencement naturel</a>, j'accompagne les entreprises du {department} avec une méthodologie éprouvée.<br/><br/>Que vous soyez basé près de {landmark1} ou dans les environs de {nearbyAreas}, mon objectif : faire de votre site une <strong>référence locale</strong> aux yeux de Google et des {population} habitants de {city}.",
                bullets: [
                    "<strong>Pilier Technique</strong> : vitesse, mobile-first, indexation, architecture optimisée pour les recherches \"{city}\"",
                    "<strong>Pilier Contenu</strong> : mots-clés stratégiques ciblant le {deptCode}, cocon sémantique, contenu expert local",
                    "<strong>Pilier Popularité</strong> : backlinks de qualité depuis des sites de {region} et nationaux"
                ]
            },
            {
                title: "Stratégie SEO en 4 phases pour {city}",
                content: "Une <strong>stratégie de référencement naturel</strong> efficace à {city} ne s'improvise pas. Ma méthodologie a fait ses preuves auprès de dizaines de clients dans le {department} et toute la {region}.",
                bullets: [
                    "<strong>Phase 1 — Audit & Diagnostic</strong> : j'analyse votre site, vos concurrents à {city}, les opportunités locales dans le {deptCode}. C'est la feuille de route du projet.",
                    "<strong>Phase 2 — Fondations Techniques</strong> : je corrige les erreurs qui freinent votre visibilité à {city}. Indexation, vitesse, maillage interne, Core Web Vitals.",
                    "<strong>Phase 3 — Stratégie de Contenu</strong> : je définis les mots-clés ciblant {city} et {nearbyAreas}, j'optimise vos pages et je crée du contenu SEO local.",
                    "<strong>Phase 4 — Netlinking & Autorité</strong> : je développe votre profil de liens avec des backlinks de sites du {department} et nationaux pertinents."
                ]
            },
            {
                title: "SEO vs publicité pour votre entreprise à {city}",
                content: "Le <strong>SEO</strong> et le <strong>SEA</strong> (Google Ads) sont complémentaires, mais le référencement naturel offre des avantages uniques pour les entreprises de {city} et du {deptCode}.",
                bullets: [
                    "<strong>ROI supérieur à long terme</strong> : chaque euro investi en SEO continue de rapporter pendant des années auprès des clients de {city}",
                    "<strong>Crédibilité renforcée</strong> : 70% des clics vont sur les résultats organiques. Les habitants de {city} font davantage confiance aux sites bien positionnés",
                    "<strong>Trafic qualifié durable</strong> : une fois en première page pour \"{city} + votre métier\", vous recevez du trafic gratuit 24h/24",
                    "<strong>Indépendance</strong> : vous ne dépendez plus d'un budget pub. Votre visibilité à {city} est acquise durablement."
                ]
            },
            {
                title: "Résultats SEO pour les entreprises de {city}",
                content: "Le <strong>SEO</strong> est un investissement moyen/long terme. Les résultats sont <strong>durables et cumulatifs</strong>. Voici ce que mes clients de {city}, {nearbyAreas} et du {department} observent :",
                bullets: [
                    "<strong>Mois 1-3</strong> : corrections techniques, premières optimisations, indexation des contenus ciblant {city}",
                    "<strong>Mois 3-6</strong> : progression sur les requêtes \"{city} + votre métier\", trafic organique +50 à 100%",
                    "<strong>Mois 6-12</strong> : première page sur vos mots-clés principaux à {city}, trafic ×2 à ×3, leads réguliers",
                    "<strong>Au-delà</strong> : consolidation des positions sur {city} et expansion vers {nearbyAreas} et tout le {deptCode}"
                ]
            },
            {
                title: "SEO local : dominez {city} sur Google",
                content: "Si votre clientèle est à {city}, {nearbyAreas} et dans le {deptCode}, le <strong>SEO local</strong> est essentiel. Je combine référencement naturel et optimisation géolocalisée pour maximiser votre visibilité auprès des {population} habitants.",
                bullets: [
                    "<strong>Optimisation Google Business Profile</strong> : fiche complète pour apparaître dans le Pack Local de {city}, gestion des avis",
                    "<strong>Citations locales</strong> : présence cohérente sur les annuaires de {city}, {department} et nationaux",
                    "<strong>Contenu géolocalisé</strong> : pages dédiées à {city}, {nearbyAreas} et aux communes du {deptCode}",
                    "<strong>Schema LocalBusiness</strong> : données structurées avec adresse près de {landmark1} pour le Pack Local"
                ]
            }
        ],
        methodology: [
            { step: "01", title: "Audit Complet", desc: "J'analyse votre site, vos concurrents à {city} et dans le {deptCode}. Je livre un <strong>rapport d'audit</strong> avec les opportunités SEO locales prioritaires." },
            { step: "02", title: "Optimisation Technique", desc: "Je corrige les erreurs qui bloquent votre <strong>référencement</strong> à {city} : vitesse, indexation, maillage, Core Web Vitals pour les connexions mobiles du {deptCode}." },
            { step: "03", title: "Stratégie de Contenu", desc: "Je définis les <strong>mots-clés stratégiques</strong> ciblant {city} et {nearbyAreas}, j'optimise vos pages et crée du contenu expert local." },
            { step: "04", title: "Netlinking & Suivi", desc: "Je développe votre <strong>autorité</strong> avec des backlinks de sites de {region} et nationaux. Reporting mensuel avec positions sur les requêtes \"{city}\"." }
        ],
        faq: [
            {
                question: "Délai pour être visible à {city} sur Google ?",
                answer: "Le <strong>référencement naturel</strong> à {city} est un investissement moyen/long terme. Les premiers résultats sont visibles sous <strong>1 à 2 mois</strong>. Les gains significatifs sur \"{city} + votre métier\" arrivent entre <strong>3 et 6 mois</strong>. Pour des requêtes très concurrentielles dans le {deptCode}, comptez <strong>6 à 12 mois</strong>. Reporting mensuel pour suivre votre progression."
            },
            {
                question: "Garantissez-vous la première page à {city} ?",
                answer: "Non, et <strong>fuyez quiconque le promet</strong>. Google seul décide des classements. Ce que je garantis : une <strong>méthodologie rigoureuse</strong>, des optimisations conformes aux guidelines, un reporting transparent, et une amélioration mesurable de votre visibilité à {city}. Mes clients du {department} constatent en moyenne <strong>+150 à 300% de trafic organique</strong> sur 12 mois."
            },
            {
                question: "SEO ou Google Ads pour mon entreprise à {city} ?",
                answer: "Le <strong>SEO</strong> travaille sur les résultats organiques — investissement long terme qui rapporte sans coût par clic. Le <strong>SEA</strong> (Google Ads) affiche des annonces payantes. Je recommande de <strong>combiner les deux</strong> pour les entreprises de {city} : SEA pour des résultats immédiats, SEO pour construire un actif durable dans le {deptCode}."
            },
            {
                question: "Mon site à {city} est nouveau, peut-on faire du SEO ?",
                answer: "Absolument, c'est <strong>le meilleur moment</strong>. Un site nouveau peut être conçu avec une <strong>architecture SEO optimale</strong> pour {city} dès le départ. Google met quelques mois à faire confiance (« sandbox »), mais un travail SEO précoce permet de sortir avec des <strong>fondations solides</strong> pour dominer le {deptCode}."
            },
            {
                question: "Travaillez-vous avec tous les secteurs à {city} ?",
                answer: "J'accompagne des <strong>entreprises de tous secteurs</strong> à {city}, {nearbyAreas} et dans le {department} : artisans, commerces, PME, startups, e-commerces, professions libérales... Expertise particulière en <strong>SEO local</strong> pour les entreprises ciblant les {population} habitants de {city}."
            },
            {
                question: "Comment mesurez-vous les résultats à {city} ?",
                answer: "Je fournis un <strong>reporting mensuel</strong> : positions sur vos mots-clés ciblant {city}, trafic organique (Analytics), impressions et clics (Search Console), autorité de domaine, backlinks acquis dans le {department}. <strong>Visibilité totale</strong> sur le travail et les résultats."
            }
        ],
        semanticKeywords: [
            "référencement naturel", "SEO", "Search Engine Optimization", "positionnement Google",
            "stratégie SEO", "audit SEO", "optimisation SEO", "consultant SEO",
            "mots-clés", "cocon sémantique", "contenu SEO", "backlinks", "netlinking",
            "autorité de domaine", "Domain Authority", "trafic organique", "SERP",
            "Google Search Console", "Google Analytics", "Core Web Vitals", "mobile-first",
            "SEO local", "référencement local", "Google Business Profile", "SEO on-page"
        ]
    }
};
