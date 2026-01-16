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
        description: "À Nice, la Promenade des Anglais n'est pas le seul endroit où il faut être vu. Google est la nouvelle rue piétonne. Si votre entreprise n'est pas dans le Top 3, vous êtes invisible pour 340 000 clients locaux. IndHack transforme votre site en machine à capturer ce trafic.",
        keyPoints: ["Capturez le trafic local", "Dominez vos concurrents niçois", "Augmentez votre CA instantanément"],
        nearbyAreas: ["Villefranche-sur-Mer", "Saint-Laurent-du-Var", "Cagnes-sur-Mer", "Beaulieu-sur-Mer"],
        landmarks: ["Promenade des Anglais", "Vieux-Nice", "Port de Nice", "Place Masséna"]
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
        landmarks: ["La Croisette", "Palais des Festivals", "Vieux Port", "Le Suquet"]
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
        landmarks: ["Port Vauban", "Vieille Ville", "Cap d'Antibes", "Marché Provençal"]
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
        landmarks: ["Place du Casino", "Port Hercule", "Carré d'Or", "Rocher"]
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
        landmarks: ["Place Sophie Laffitte", "Skema", "Amadeus", "Carrefour des Entreprises"]
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
        landmarks: ["Vieux Port", "Vélodrome", "La Major", "Prado"]
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
        landmarks: ["Cours Mirabeau", "Rotonde", "Quartier Mazarin", "Sainte-Victoire"]
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
        landmarks: ["Tour Eiffel", "Louvre", "Champs-Élysées", "La Défense"]
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
        landmarks: ["La Seine Musicale", "Siège TF1", "Hôtel de Ville", "Longchamp"]
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
        landmarks: ["Parlement", "Gare EuroRennes", "Le Mabilay", "Roazhon Park"]
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
        landmarks: ["Les Machines", "Château des Ducs", "Tour Bretagne", "Passage Pommeraye"]
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
        landmarks: ["Fourvière", "Place Bellecour", "Parc de la Tête d'Or", "Les Halles"]
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
        landmarks: ["La Bastille", "Téléphérique", "Caserne de Bonne", "Europole"]
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
        landmarks: ["Capitole", "Quais de Garonne", "Cité de l'Espace", "Airbus"]
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
        landmarks: ["Place de la Bourse", "Miroir d'eau", "Pont de Pierre", "Cité du Vin"]
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
        landmarks: ["L'Écusson", "Place de la Comédie", "Antigone", "Port Marianne"]
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
        landmarks: ["Grand Place", "Beffroi", "Citadelle", "Euralille"]
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
        landmarks: ["Cathédrale", "Petite France", "Parlement Européen", "Neustadt"]
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
