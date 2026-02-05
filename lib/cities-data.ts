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
            hero: { src: "/images/cities/nice-promenade-anglais.jpg", alt: "Promenade des Anglais Nice - Consultante SEO Nice", title: "Audit SEO Nice Côte d'Azur", keywords: ["SEO Nice", "référencement Nice", "consultant SEO Nice 06", "Promenade des Anglais"] },
            workspace: { src: "/images/cities/nice-vieux-nice.jpg", alt: "Vieux-Nice ruelles - Expert SEO Nice", title: "Référencement naturel Nice", keywords: ["audit SEO Nice", "agence SEO Nice", "Vieux Nice"] },
            landmark: { src: "/images/cities/nice-place-massena.jpg", alt: "Place Masséna Nice - SEO local Nice", title: "SEO local Nice 06", keywords: ["SEO local Nice", "Google My Business Nice", "Place Masséna"] }
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
            hero: { src: "/images/cities/cannes-croisette.jpg", alt: "La Croisette Cannes - Consultante SEO Cannes", title: "Audit SEO Cannes 06", keywords: ["SEO Cannes", "référencement Cannes", "consultant SEO Cannes", "La Croisette"] },
            workspace: { src: "/images/cities/cannes-palais-festivals.jpg", alt: "Palais des Festivals Cannes - Expert SEO Cannes", title: "Référencement naturel Cannes", keywords: ["audit SEO Cannes", "Palais des Festivals", "SEO luxe Cannes"] },
            landmark: { src: "/images/cities/cannes-vieux-port.jpg", alt: "Vieux Port Cannes - SEO local Cannes", title: "SEO local Cannes 06", keywords: ["SEO local Cannes", "Vieux Port Cannes", "Le Suquet"] }
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
            hero: { src: "/images/cities/antibes-port-vauban.jpg", alt: "Port Vauban Antibes - Consultante SEO Antibes", title: "Audit SEO Antibes 06", keywords: ["SEO Antibes", "référencement Antibes", "consultant SEO Antibes", "Port Vauban"] },
            workspace: { src: "/images/cities/antibes-vieille-ville.jpg", alt: "Vieille Ville Antibes - Expert SEO Antibes", title: "Référencement naturel Antibes", keywords: ["audit SEO Antibes", "Vieille Ville Antibes", "Juan-les-Pins"] },
            landmark: { src: "/images/cities/antibes-cap.jpg", alt: "Cap d'Antibes - SEO local Antibes", title: "SEO local Antibes 06", keywords: ["SEO local Antibes", "Cap d'Antibes", "yachting Antibes"] }
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
            hero: { src: "/images/cities/monaco-casino.jpg", alt: "Casino Monte-Carlo Monaco - Consultante SEO Monaco", title: "Audit SEO Monaco 98", keywords: ["SEO Monaco", "référencement Monaco", "consultant SEO Monaco", "Monte-Carlo"] },
            workspace: { src: "/images/cities/monaco-port-hercule.jpg", alt: "Port Hercule Monaco - Expert SEO Monaco", title: "Référencement naturel Monaco", keywords: ["audit SEO Monaco", "Port Hercule", "SEO luxe Monaco"] },
            landmark: { src: "/images/cities/monaco-rocher.jpg", alt: "Rocher de Monaco - SEO local Monaco", title: "SEO local Monaco 98", keywords: ["SEO local Monaco", "Rocher Monaco", "Palais Princier"] }
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
            hero: { src: "/images/cities/sophia-antipolis-technopole.jpg", alt: "Technopole Sophia Antipolis - Consultante SEO Sophia Antipolis", title: "Audit SEO Sophia Antipolis 06", keywords: ["SEO Sophia Antipolis", "référencement technopole", "consultant SEO startup", "Silicon Valley Europe"] },
            workspace: { src: "/images/cities/sophia-antipolis-bureaux.jpg", alt: "Bureaux tech Sophia Antipolis - Expert SEO B2B", title: "Référencement SaaS Sophia Antipolis", keywords: ["audit SEO B2B", "SEO startup", "Sophia Antipolis tech"] },
            landmark: { src: "/images/cities/sophia-antipolis-campus.jpg", alt: "Campus Sophia Antipolis - SEO local tech", title: "SEO local Sophia Antipolis 06", keywords: ["SEO local tech", "Skema", "Amadeus SEO"] }
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
            hero: { src: "/images/cities/marseille-vieux-port.jpg", alt: "Vieux Port Marseille - Consultante SEO Marseille", title: "Audit SEO Marseille 13", keywords: ["SEO Marseille", "référencement Marseille", "consultant SEO Marseille", "Vieux Port"] },
            workspace: { src: "/images/cities/marseille-mucem.jpg", alt: "MuCEM Marseille - Expert SEO Marseille", title: "Référencement naturel Marseille", keywords: ["audit SEO Marseille", "MuCEM", "SEO Bouches-du-Rhône"] },
            landmark: { src: "/images/cities/marseille-notre-dame-garde.jpg", alt: "Notre-Dame de la Garde Marseille - SEO local Marseille", title: "SEO local Marseille 13", keywords: ["SEO local Marseille", "Notre-Dame de la Garde", "Bonne Mère"] }
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
            hero: { src: "/images/cities/aix-cours-mirabeau.jpg", alt: "Cours Mirabeau Aix-en-Provence - Consultante SEO Aix", title: "Audit SEO Aix-en-Provence 13", keywords: ["SEO Aix-en-Provence", "référencement Aix", "consultant SEO Aix", "Cours Mirabeau"] },
            workspace: { src: "/images/cities/aix-rotonde.jpg", alt: "La Rotonde Aix-en-Provence - Expert SEO Aix", title: "Référencement naturel Aix-en-Provence", keywords: ["audit SEO Aix", "La Rotonde", "SEO premium Aix"] },
            landmark: { src: "/images/cities/aix-sainte-victoire.jpg", alt: "Montagne Sainte-Victoire - SEO local Aix-en-Provence", title: "SEO local Aix-en-Provence 13", keywords: ["SEO local Aix", "Sainte-Victoire", "Cézanne"] }
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
            hero: { src: "/images/cities/paris-tour-eiffel.jpg", alt: "Tour Eiffel Paris - Consultante SEO Paris", title: "Audit SEO Paris 75", keywords: ["SEO Paris", "référencement Paris", "consultant SEO Paris", "Tour Eiffel"] },
            workspace: { src: "/images/cities/paris-marais.jpg", alt: "Le Marais Paris - Expert SEO Paris", title: "Référencement naturel Paris", keywords: ["audit SEO Paris", "Le Marais", "SEO Île-de-France"] },
            landmark: { src: "/images/cities/paris-sacre-coeur.jpg", alt: "Sacré-Coeur Montmartre - SEO local Paris", title: "SEO local Paris 75", keywords: ["SEO local Paris", "Sacré-Coeur", "Montmartre"] }
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
            hero: { src: "/images/cities/boulogne-seine-musicale.jpg", alt: "Seine Musicale Boulogne-Billancourt - Consultante SEO Boulogne", title: "Audit SEO Boulogne-Billancourt 92", keywords: ["SEO Boulogne-Billancourt", "référencement Boulogne", "consultant SEO 92", "Seine Musicale"] },
            workspace: { src: "/images/cities/boulogne-bureaux.jpg", alt: "Quartier d'affaires Boulogne - Expert SEO corporate", title: "Référencement B2B Boulogne-Billancourt", keywords: ["audit SEO corporate", "SEO B2B Boulogne", "Hauts-de-Seine"] },
            landmark: { src: "/images/cities/boulogne-ile-seguin.jpg", alt: "Île Seguin Boulogne - SEO local Boulogne-Billancourt", title: "SEO local Boulogne-Billancourt 92", keywords: ["SEO local Boulogne", "Île Seguin", "médias TF1"] }
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
            hero: { src: "/images/cities/rennes-parlement.jpg", alt: "Parlement de Bretagne Rennes - Consultante SEO Rennes", title: "Audit SEO Rennes 35", keywords: ["SEO Rennes", "référencement Rennes", "consultant SEO Rennes", "Parlement Bretagne"] },
            workspace: { src: "/images/cities/rennes-republique.jpg", alt: "Place de la République Rennes - Expert SEO Rennes", title: "Référencement naturel Rennes", keywords: ["audit SEO Rennes", "French Tech Rennes", "SEO Bretagne"] },
            landmark: { src: "/images/cities/rennes-thabor.jpg", alt: "Parc du Thabor Rennes - SEO local Rennes", title: "SEO local Rennes 35", keywords: ["SEO local Rennes", "Thabor", "EuroRennes"] }
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
            hero: { src: "/images/cities/nantes-machines.jpg", alt: "Les Machines de l'île Nantes - Consultante SEO Nantes", title: "Audit SEO Nantes 44", keywords: ["SEO Nantes", "référencement Nantes", "consultant SEO Nantes", "Machines de l'île"] },
            workspace: { src: "/images/cities/nantes-chateau.jpg", alt: "Château des Ducs Nantes - Expert SEO Nantes", title: "Référencement naturel Nantes", keywords: ["audit SEO Nantes", "Château des Ducs", "SEO Loire-Atlantique"] },
            landmark: { src: "/images/cities/nantes-passage-pommeraye.jpg", alt: "Passage Pommeraye Nantes - SEO local Nantes", title: "SEO local Nantes 44", keywords: ["SEO local Nantes", "Passage Pommeraye", "centre-ville Nantes"] }
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
            hero: { src: "/images/cities/lyon-fourviere.jpg", alt: "Basilique Fourvière Lyon - Consultante SEO Lyon", title: "Audit SEO Lyon 69", keywords: ["SEO Lyon", "référencement Lyon", "consultant SEO Lyon", "Fourvière"] },
            workspace: { src: "/images/cities/lyon-bellecour.jpg", alt: "Place Bellecour Lyon - Expert SEO Lyon", title: "Référencement naturel Lyon", keywords: ["audit SEO Lyon", "Place Bellecour", "SEO Rhône-Alpes"] },
            landmark: { src: "/images/cities/lyon-confluence.jpg", alt: "Confluence Lyon - SEO local Lyon", title: "SEO local Lyon 69", keywords: ["SEO local Lyon", "Confluence", "Part-Dieu"] }
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
            hero: { src: "/images/cities/grenoble-bastille.jpg", alt: "La Bastille Grenoble - Consultante SEO Grenoble", title: "Audit SEO Grenoble 38", keywords: ["SEO Grenoble", "référencement Grenoble", "consultant SEO Grenoble", "La Bastille"] },
            workspace: { src: "/images/cities/grenoble-alpes.jpg", alt: "Vue Alpes Grenoble - Expert SEO Grenoble", title: "Référencement naturel Grenoble", keywords: ["audit SEO Grenoble", "Alpes", "SEO Isère"] },
            landmark: { src: "/images/cities/grenoble-telepherique.jpg", alt: "Téléphérique Grenoble - SEO local Grenoble", title: "SEO local Grenoble 38", keywords: ["SEO local Grenoble", "Téléphérique", "Europole"] }
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
            hero: { src: "/images/cities/toulouse-capitole.jpg", alt: "Place du Capitole Toulouse - Consultante SEO Toulouse", title: "Audit SEO Toulouse 31", keywords: ["SEO Toulouse", "référencement Toulouse", "consultant SEO Toulouse", "Capitole"] },
            workspace: { src: "/images/cities/toulouse-garonne.jpg", alt: "Quais de Garonne Toulouse - Expert SEO Toulouse", title: "Référencement naturel Toulouse", keywords: ["audit SEO Toulouse", "Garonne", "SEO Occitanie"] },
            landmark: { src: "/images/cities/toulouse-cite-espace.jpg", alt: "Cité de l'Espace Toulouse - SEO local Toulouse", title: "SEO local Toulouse 31", keywords: ["SEO local Toulouse", "Cité de l'Espace", "Airbus"] }
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
            hero: { src: "/images/cities/bordeaux-place-bourse.jpg", alt: "Place de la Bourse Bordeaux - Consultante SEO Bordeaux", title: "Audit SEO Bordeaux 33", keywords: ["SEO Bordeaux", "référencement Bordeaux", "consultant SEO Bordeaux", "Place de la Bourse"] },
            workspace: { src: "/images/cities/bordeaux-miroir-eau.jpg", alt: "Miroir d'eau Bordeaux - Expert SEO Bordeaux", title: "Référencement naturel Bordeaux", keywords: ["audit SEO Bordeaux", "Miroir d'eau", "SEO Gironde"] },
            landmark: { src: "/images/cities/bordeaux-cite-vin.jpg", alt: "Cité du Vin Bordeaux - SEO local Bordeaux", title: "SEO local Bordeaux 33", keywords: ["SEO local Bordeaux", "Cité du Vin", "Pont de Pierre"] }
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
            hero: { src: "/images/cities/montpellier-comedie.jpg", alt: "Place de la Comédie Montpellier - Consultante SEO Montpellier", title: "Audit SEO Montpellier 34", keywords: ["SEO Montpellier", "référencement Montpellier", "consultant SEO Montpellier", "Place de la Comédie"] },
            workspace: { src: "/images/cities/montpellier-antigone.jpg", alt: "Quartier Antigone Montpellier - Expert SEO Montpellier", title: "Référencement naturel Montpellier", keywords: ["audit SEO Montpellier", "Antigone", "SEO Hérault"] },
            landmark: { src: "/images/cities/montpellier-ecusson.jpg", alt: "L'Écusson Montpellier - SEO local Montpellier", title: "SEO local Montpellier 34", keywords: ["SEO local Montpellier", "Écusson", "Port Marianne"] }
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
            hero: { src: "/images/cities/lille-grand-place.jpg", alt: "Grand Place Lille - Consultante SEO Lille", title: "Audit SEO Lille 59", keywords: ["SEO Lille", "référencement Lille", "consultant SEO Lille", "Grand Place"] },
            workspace: { src: "/images/cities/lille-vieux-lille.jpg", alt: "Vieux Lille - Expert SEO Lille", title: "Référencement naturel Lille", keywords: ["audit SEO Lille", "Vieux Lille", "SEO Nord"] },
            landmark: { src: "/images/cities/lille-beffroi.jpg", alt: "Beffroi Lille - SEO local Lille", title: "SEO local Lille 59", keywords: ["SEO local Lille", "Beffroi", "Euralille"] }
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
    },
    "creation-site-web": {
        slug: "creation-site-web",
        title: "Création de Site Web",
        metaTitle: "Création Site Web {city} {deptCode} - Site Optimisé SEO | INDHACK",
        metaDescription: "Création de site web professionnel à {city}. Site vitrine, e-commerce ou sur-mesure optimisé SEO dès la conception. Devis gratuit. ✆ 06 61 13 97 48",
        heroTitle: "Création de Site Web à {city}",
        heroSubtitle: "Je conçois des sites web performants, pensés SEO dès la première ligne de code. Votre site sera visible sur Google dès sa mise en ligne.",
        category: "Création Web",
        parentService: "/creation-site-web",
        h2Sections: [
            {
                title: "Pourquoi créer un site web optimisé SEO ?",
                content: "En tant que <a href=\"/{citySlug}\" class=\"text-sauge font-bold hover:underline\">consultante SEO à {city}</a>, je ne crée pas de simples sites vitrines. Je construis des <strong>machines à générer du trafic organique</strong>.<br/><br/>La majorité des agences web créent d'abord le site, puis « pensent au SEO » ensuite. Résultat : 6 mois de refonte technique, du budget gaspillé, et un site qui rame à se positionner.<br/><br/>Ma méthode est inverse : <strong>le SEO guide chaque décision</strong> — architecture, URLs, temps de chargement, maillage interne. Votre site est conçu pour plaire à Google ET à vos visiteurs.",
                bullets: [
                    "<strong>Architecture SEO-first</strong> : structure d'URLs propre, hiérarchie de pages logique, cocon sémantique intégré",
                    "<strong>Performance maximale</strong> : score PageSpeed 90+ garanti, Core Web Vitals optimisés, temps de chargement < 3s",
                    "<strong>Mobile-first natif</strong> : 70% du trafic est mobile, votre site sera parfait sur tous les écrans",
                    "<strong>Contenu optimisé</strong> : balises title, meta descriptions, Hn structurés, données structurées schema.org",
                    "<strong>Indexation immédiate</strong> : sitemap XML, robots.txt configuré, soumission Search Console le jour J"
                ]
            },
            {
                title: "Les technologies que j'utilise",
                content: "Je travaille avec les <strong>technologies les plus performantes</strong> du marché pour créer des sites rapides, sécurisés et évolutifs.<br/><br/>Pas de WordPress bricolé avec 40 plugins qui ralentissent tout. Je privilégie les solutions modernes qui garantissent <strong>performance et maintenabilité</strong> sur le long terme.",
                bullets: [
                    "<strong>Next.js / React</strong> : le framework utilisé par Netflix, TikTok et Notion. Rendu serveur ultra-rapide, SEO natif parfait",
                    "<strong>Tailwind CSS</strong> : design sur-mesure sans surcharge CSS, sites légers et cohérents",
                    "<strong>Vercel / Netlify</strong> : hébergement edge mondial, HTTPS automatique, déploiements instantanés",
                    "<strong>Headless CMS</strong> : vous gérez votre contenu facilement, sans toucher au code",
                    "<strong>WordPress optimisé</strong> : si vous préférez WordPress, je le configure proprement avec un thème sur-mesure léger"
                ]
            },
            {
                title: "Types de sites que je crée",
                content: "Que vous soyez artisan à {city}, startup tech ou commerce local, je conçois le site adapté à vos besoins et votre budget.",
                bullets: [
                    "<strong>Site vitrine</strong> : présentez votre activité avec un site élégant qui convertit les visiteurs en clients",
                    "<strong>Site e-commerce</strong> : vendez en ligne avec une boutique optimisée pour le SEO et la conversion",
                    "<strong>Landing pages</strong> : pages de vente haute conversion pour vos campagnes marketing",
                    "<strong>Blog professionnel</strong> : positionnez-vous comme expert de votre domaine avec du contenu qui ranke",
                    "<strong>Application web</strong> : portails clients, dashboards, outils métier sur-mesure"
                ]
            },
            {
                title: "Ce qui différencie mes créations",
                content: "À {city} comme ailleurs, les agences web pullulent. La différence avec moi ? <strong>Je suis d'abord SEO, ensuite développeuse</strong>.<br/><br/>Chaque site que je crée est pensé pour performer sur Google. Pas de « on verra le référencement plus tard ». Pas de site joli mais invisible. Vous avez un actif digital qui travaille pour vous 24/7.",
                bullets: [
                    "<strong>Audit de mots-clés préalable</strong> : je définis la stratégie SEO AVANT de coder. Vos pages ciblent les bonnes requêtes dès le départ",
                    "<strong>Maillage interne stratégique</strong> : chaque lien est pensé pour distribuer le PageRank vers vos pages commerciales",
                    "<strong>Formation incluse</strong> : je vous forme à la gestion de votre site et aux bonnes pratiques SEO",
                    "<strong>Suivi de positionnement</strong> : 3 mois de monitoring offerts pour suivre vos premiers résultats Google"
                ]
            }
        ],
        methodology: [
            { step: "01", title: "Stratégie & Mots-clés", desc: "J'analyse votre marché et vos concurrents à {city}. Je définis les <strong>mots-clés stratégiques</strong> que votre site devra cibler. Cette étape conditionne toute l'architecture." },
            { step: "02", title: "Maquettes & Validation", desc: "Je crée les <strong>maquettes UI/UX</strong> de votre site. Vous visualisez le résultat final et validez avant le développement. Modifications illimitées à cette étape." },
            { step: "03", title: "Développement SEO-First", desc: "Je développe votre site avec une <strong>architecture optimisée</strong>, des performances maximales et un code propre. Chaque page est pensée pour ranker." },
            { step: "04", title: "Mise en ligne & Indexation", desc: "Je déploie votre site sur un hébergement performant, configure <strong>Google Search Console</strong>, soumets le sitemap et lance le monitoring de vos positions." }
        ],
        faq: [
            {
                question: "Combien coûte la création d'un site web ?",
                answer: "Le prix dépend de la complexité de votre projet. Un <strong>site vitrine</strong> professionnel démarre autour de <strong>1 500€</strong>. Un <strong>site e-commerce</strong> ou une <strong>application sur-mesure</strong> représente un investissement plus conséquent. Je vous propose toujours un <strong>devis détaillé gratuit</strong> après avoir compris vos besoins. Mon approche SEO-first garantit un <strong>retour sur investissement</strong> supérieur aux sites « classiques »."
            },
            {
                question: "En combien de temps mon site sera-t-il en ligne ?",
                answer: "Comptez <strong>3 à 6 semaines</strong> pour un site vitrine, <strong>6 à 10 semaines</strong> pour un e-commerce. Je préfère travailler sur des délais réalistes plutôt que de bâcler. Chaque étape (stratégie, maquettes, développement, recette) a son importance. Un site bien fait dès le départ vous fait gagner des mois de corrections SEO par la suite."
            },
            {
                question: "Pourquoi ne pas utiliser Wix ou Squarespace ?",
                answer: "Ces plateformes sont pratiques pour débuter, mais <strong>limitées en SEO</strong>. Code lourd, personnalisation restreinte, vitesse de chargement médiocre, structure d'URL imposée... Pour un projet sérieux à {city}, vous avez besoin d'un site <strong>sur-mesure</strong> qui vous appartient totalement et qui peut évoluer avec votre business. C'est un investissement, pas une dépense."
            },
            {
                question: "Mon site sera-t-il visible sur Google immédiatement ?",
                answer: "Dès la mise en ligne, je soumets votre site à <strong>Google Search Console</strong> pour accélérer l'indexation. Les premières pages peuvent apparaître dans Google sous <strong>24 à 72h</strong>. Cependant, le <strong>positionnement</strong> sur des mots-clés compétitifs prend généralement <strong>3 à 6 mois</strong> de travail SEO continu. L'avantage de mon approche : votre site est optimisé dès le départ, donc les résultats arrivent plus vite."
            },
            {
                question: "Puis-je gérer le contenu moi-même ensuite ?",
                answer: "Absolument. Je configure un <strong>système de gestion de contenu</strong> (CMS) intuitif qui vous permet de modifier textes, images et pages sans toucher au code. Je vous fournis également une <strong>formation personnalisée</strong> et une documentation pour que vous soyez autonome. Et je reste disponible si vous avez des questions."
            },
            {
                question: "Proposez-vous la maintenance du site ?",
                answer: "Oui, je propose des <strong>forfaits de maintenance</strong> mensuels qui incluent : mises à jour de sécurité, sauvegardes, monitoring de performance, corrections de bugs, et support prioritaire. C'est facultatif mais recommandé pour garder votre site sécurisé et performant dans le temps. Je peux aussi former votre équipe technique si vous préférez gérer en interne."
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
        metaDescription: "Stratégie de référencement naturel sur-mesure à {city}. Augmentez votre trafic organique de +200% en 6 mois. Audit gratuit. ✆ 06 61 13 97 48",
        heroTitle: "Référencement Naturel à {city}",
        heroSubtitle: "Je développe des stratégies SEO complètes qui propulsent votre site en première page Google. Plus de visibilité, plus de trafic qualifié, plus de clients.",
        category: "SEO",
        parentService: "/referencement-naturel",
        h2Sections: [
            {
                title: "Qu'est-ce que le référencement naturel ?",
                content: "Le <strong>référencement naturel</strong> (ou <strong>SEO</strong> pour Search Engine Optimization) désigne l'ensemble des techniques permettant d'améliorer la <strong>visibilité d'un site web</strong> dans les résultats organiques de Google.<br/><br/>En tant que <a href=\"/{citySlug}\" class=\"text-sauge font-bold hover:underline\">consultante SEO à {city}</a>, je ne vends pas de la « magie Google ». Je travaille sur les <strong>3 piliers fondamentaux</strong> du SEO : la technique, le contenu et la popularité (backlinks).<br/><br/>Mon objectif : faire de votre site une <strong>référence dans votre secteur</strong> aux yeux de Google. Pas avec des astuces court-termistes, mais avec une stratégie durable qui construit votre autorité.",
                bullets: [
                    "<strong>Pilier Technique</strong> : vitesse, mobile-first, indexation, architecture, données structurées",
                    "<strong>Pilier Contenu</strong> : mots-clés stratégiques, cocon sémantique, contenu expert, optimisation on-page",
                    "<strong>Pilier Popularité</strong> : backlinks de qualité, mentions, signaux de confiance externes"
                ]
            },
            {
                title: "Ma stratégie SEO en 4 phases",
                content: "Une <strong>stratégie de référencement naturel</strong> efficace ne s'improvise pas. Je suis une méthodologie éprouvée qui a fait ses preuves auprès de dizaines de clients à {city} et partout en France.",
                bullets: [
                    "<strong>Phase 1 — Audit & Diagnostic</strong> : j'analyse votre site, vos concurrents, votre marché. J'identifie les opportunités et les blocages. C'est la feuille de route de tout le projet.",
                    "<strong>Phase 2 — Fondations Techniques</strong> : je corrige les erreurs techniques qui freinent votre visibilité. Indexation, vitesse, maillage interne, Core Web Vitals.",
                    "<strong>Phase 3 — Stratégie de Contenu</strong> : je définis les mots-clés à cibler, je crée le planning éditorial, j'optimise vos pages existantes et je produis du nouveau contenu SEO.",
                    "<strong>Phase 4 — Netlinking & Autorité</strong> : je développe votre profil de liens avec des backlinks de qualité provenant de sites pertinents dans votre secteur."
                ]
            },
            {
                title: "Pourquoi investir en SEO plutôt qu'en publicité ?",
                content: "Le <strong>SEO</strong> et le <strong>SEA</strong> (publicité Google Ads) sont complémentaires, mais le référencement naturel offre des avantages uniques pour votre business à {city}.",
                bullets: [
                    "<strong>ROI supérieur à long terme</strong> : chaque euro investi en SEO continue de rapporter pendant des années. La pub s'arrête dès que vous coupez le budget.",
                    "<strong>Crédibilité renforcée</strong> : 70% des clics vont sur les résultats organiques. Les internautes font davantage confiance aux sites bien positionnés naturellement.",
                    "<strong>Trafic qualifié durable</strong> : une fois en première page, vous recevez du trafic gratuit 24h/24. C'est un actif digital qui prend de la valeur.",
                    "<strong>Indépendance</strong> : vous ne dépendez plus d'un budget pub mensuel. Votre visibilité ne disparaît pas du jour au lendemain."
                ]
            },
            {
                title: "Résultats que vous pouvez attendre",
                content: "Le <strong>SEO</strong> est un investissement moyen/long terme. Les résultats ne sont pas immédiats, mais ils sont <strong>durables et cumulatifs</strong>. Voici ce que mes clients observent généralement :",
                bullets: [
                    "<strong>Mois 1-3</strong> : corrections techniques, premières optimisations, début d'indexation des nouveaux contenus",
                    "<strong>Mois 3-6</strong> : progression visible sur les mots-clés secondaires, augmentation du trafic organique de 50 à 100%",
                    "<strong>Mois 6-12</strong> : positionnement sur les mots-clés principaux, trafic organique multiplié par 2 à 3, génération de leads régulière",
                    "<strong>Au-delà</strong> : consolidation des positions, expansion vers de nouveaux mots-clés, votre site devient une référence dans votre domaine"
                ]
            },
            {
                title: "Mon approche du SEO local à {city}",
                content: "Si votre clientèle est à {city} et ses environs, le <strong>SEO local</strong> est essentiel. Je combine référencement naturel classique et optimisation géolocalisée pour maximiser votre visibilité locale.",
                bullets: [
                    "<strong>Optimisation Google Business Profile</strong> : fiche complète, catégories pertinentes, posts réguliers, gestion des avis",
                    "<strong>Citations locales</strong> : présence cohérente sur les annuaires locaux de {city} et nationaux",
                    "<strong>Contenu géolocalisé</strong> : pages dédiées à {city} et aux communes environnantes",
                    "<strong>Schema LocalBusiness</strong> : données structurées pour apparaître dans le pack local Google"
                ]
            }
        ],
        methodology: [
            { step: "01", title: "Audit Complet", desc: "J'analyse votre site, vos concurrents et votre marché. Je livre un <strong>rapport d'audit</strong> avec les opportunités SEO prioritaires et une feuille de route claire." },
            { step: "02", title: "Optimisation Technique", desc: "Je corrige les erreurs techniques qui bloquent votre <strong>référencement</strong> : vitesse, indexation, maillage interne, mobile-first, Core Web Vitals." },
            { step: "03", title: "Stratégie de Contenu", desc: "Je définis les <strong>mots-clés stratégiques</strong>, j'optimise vos pages existantes et je crée du contenu expert qui positionne votre site comme référence." },
            { step: "04", title: "Netlinking & Suivi", desc: "Je développe votre <strong>autorité de domaine</strong> avec des backlinks de qualité. Reporting mensuel avec évolution des positions et du trafic." }
        ],
        faq: [
            {
                question: "Combien de temps pour voir des résultats SEO ?",
                answer: "Le <strong>référencement naturel</strong> est un investissement moyen/long terme. Les premiers résultats (corrections techniques, indexation) sont visibles sous <strong>1 à 2 mois</strong>. Les gains de positionnement significatifs arrivent généralement entre <strong>3 et 6 mois</strong>. Pour des mots-clés très concurrentiels, comptez <strong>6 à 12 mois</strong> pour atteindre la première page. Je vous fournis un reporting mensuel pour suivre la progression."
            },
            {
                question: "Garantissez-vous la première position Google ?",
                answer: "Non, et <strong>fuyez quiconque le promet</strong>. Google seul décide des classements, et son algorithme évolue constamment. Ce que je garantis : une <strong>méthodologie rigoureuse</strong>, des optimisations conformes aux guidelines Google, un travail transparent avec reporting mensuel, et une amélioration mesurable de votre visibilité. Mes clients constatent en moyenne une <strong>augmentation de 150 à 300% de leur trafic organique</strong> sur 12 mois."
            },
            {
                question: "Quelle différence entre SEO et SEA ?",
                answer: "Le <strong>SEO</strong> (référencement naturel) travaille sur les résultats organiques de Google — c'est un investissement long terme qui continue de rapporter sans coût par clic. Le <strong>SEA</strong> (Google Ads) affiche des annonces payantes — vous payez chaque clic, et tout s'arrête quand le budget est épuisé. Je recommande généralement de <strong>combiner les deux</strong> : SEA pour des résultats immédiats, SEO pour construire un actif durable."
            },
            {
                question: "Mon site est nouveau, peut-on faire du SEO ?",
                answer: "Absolument, et c'est même <strong>le meilleur moment</strong>. Un site nouveau peut être conçu avec une <strong>architecture SEO optimale</strong> dès le départ, sans dette technique à corriger. Google met quelques mois à faire confiance à un nouveau domaine (« sandbox »), mais un travail SEO précoce permet de sortir de cette période avec des <strong>fondations solides</strong>. Mieux vaut bien faire dès le début que refondre dans 2 ans."
            },
            {
                question: "Travaillez-vous avec des entreprises de tous secteurs ?",
                answer: "Oui, j'accompagne des <strong>entreprises de toutes tailles et tous secteurs</strong> à {city} et partout en France : artisans, commerces locaux, PME, startups tech, e-commerces, professions libérales... Le SEO s'adapte à chaque contexte. J'ai développé une expertise particulière en <strong>SEO local</strong> pour les entreprises qui ciblent une clientèle géographique, et en <strong>SEO B2B</strong> pour la génération de leads."
            },
            {
                question: "Comment mesurez-vous les résultats ?",
                answer: "Je fournis un <strong>reporting mensuel détaillé</strong> qui inclut : évolution des positions sur vos mots-clés cibles, trafic organique (Google Analytics), impressions et clics (Search Console), autorité de domaine, backlinks acquis, et conversions générées. Vous avez une <strong>visibilité totale</strong> sur le travail effectué et les résultats obtenus. Pas de boîte noire."
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
