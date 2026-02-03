// ═══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC DATA - Données pour tous les métiers
// Chaque métier a ses propres mots-clés, volumes de recherche, images, etc.
// ═══════════════════════════════════════════════════════════════════════════════

export interface KeywordData {
  keyword: string
  volume: number // Volume mensuel estimé
  difficulty: 'facile' | 'moyen' | 'difficile'
  type: 'principal' | 'niche' | 'longue-traine'
}

export interface MetierData {
  // Identifiant
  slug: string
  label: string
  labelPlural: string

  // Images
  heroImage: string
  mockupImage: string

  // Couleur d'accent pour ce métier
  accentColor: string

  // Copywriting
  heroTitle: string
  heroSubtitle: string
  problemStatement: string

  // Mots-clés avec volumes (données réalistes basées sur SEMrush/Ubersuggest)
  keywords: {
    principal: KeywordData[]
    niches: KeywordData[]
    longueTraine: KeywordData[]
  }

  // Exemples de pages fantômes spécifiques au métier
  ghostPageExamples: string[]

  // Questions fréquentes des clients
  clientQuestions: string[]

  // Services/prestations typiques
  services: string[]

  // Panier moyen estimé
  averageTicket: number
}

// ═══════════════════════════════════════════════════════════════════════════════
// DONNÉES PAR MÉTIER
// ═══════════════════════════════════════════════════════════════════════════════

export const metiersData: Record<string, MetierData> = {

  // ─────────────────────────────────────────────────────────────────────────────
  // COIFFEUR / COIFFEUSE
  // ─────────────────────────────────────────────────────────────────────────────
  coiffeur: {
    slug: 'coiffeur',
    label: 'Coiffeur',
    labelPlural: 'Coiffeurs',

    heroImage: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=600',

    accentColor: '#C6A87C', // Or antique (luxe coiffure)

    heroTitle: 'Vos clientes vous adorent.',
    heroSubtitle: 'C\'est Google qui ne vous rend pas encore justice.',
    problemStatement: 'Quand une Niçoise cherche "coiffeuse Nice", ce sont des salons moins bien notés qui apparaissent en premier.',

    keywords: {
      principal: [
        { keyword: 'coiffeur nice', volume: 2800, difficulty: 'difficile', type: 'principal' },
        { keyword: 'coiffeuse nice', volume: 1900, difficulty: 'difficile', type: 'principal' },
        { keyword: 'salon de coiffure nice', volume: 1200, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'coloriste nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'balayage nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'lissage brésilien nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'coiffeur homme nice', volume: 590, difficulty: 'moyen', type: 'niche' },
        { keyword: 'coiffeur mariage nice', volume: 210, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'coiffeur nice centre', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'coiffeur nice pas cher', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'meilleur coloriste nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'coiffeur ouvert lundi nice', volume: 70, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'coiffeur jean médecin', volume: 50, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'coiffeur hôtel des postes nice', volume: 20, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Coloriste Nice',
      'Balayage Nice Centre',
      'Lissage Brésilien Nice',
      'Coiffeur Jean Médecin',
      'Coiffeur Mariage Nice',
    ],

    clientQuestions: [
      'Combien coûte une coloration ?',
      'Faites-vous les mariages ?',
      'Êtes-vous ouvert le lundi ?',
      'Prenez-vous les enfants ?',
    ],

    services: [
      'Coupe femme',
      'Coupe homme',
      'Coloration',
      'Balayage / Mèches',
      'Lissage brésilien',
      'Coiffure mariage',
      'Soins capillaires',
    ],

    averageTicket: 75,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SERRURIER
  // ─────────────────────────────────────────────────────────────────────────────
  serrurier: {
    slug: 'serrurier',
    label: 'Serrurier',
    labelPlural: 'Serruriers',

    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600',

    accentColor: '#3B82F6', // Bleu confiance

    heroTitle: 'Vos clients vous font confiance.',
    heroSubtitle: 'Il est temps que Google fasse de même.',
    problemStatement: 'Quand quelqu\'un se retrouve enfermé dehors et cherche "serrurier urgence", vous n\'apparaissez pas.',

    keywords: {
      principal: [
        { keyword: 'serrurier nice', volume: 3200, difficulty: 'difficile', type: 'principal' },
        { keyword: 'serrurier urgence nice', volume: 1400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'serrurerie nice', volume: 720, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'ouverture porte nice', volume: 590, difficulty: 'moyen', type: 'niche' },
        { keyword: 'changement serrure nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'serrurier 24h nice', volume: 280, difficulty: 'moyen', type: 'niche' },
        { keyword: 'blindage porte nice', volume: 170, difficulty: 'facile', type: 'niche' },
        { keyword: 'double clé nice', volume: 140, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'serrurier nice pas cher', volume: 220, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'serrurier nice dimanche', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'serrurier nice centre', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'serrurier agréé assurance nice', volume: 60, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Serrurier Urgence Nice',
      'Ouverture Porte Claquée Nice',
      'Changement Serrure Nice',
      'Serrurier 24h/24 Nice',
      'Blindage Porte Nice',
    ],

    clientQuestions: [
      'Combien coûte une ouverture de porte ?',
      'Intervenez-vous le dimanche ?',
      'Êtes-vous agréé assurance ?',
      'Quel délai d\'intervention ?',
    ],

    services: [
      'Ouverture de porte',
      'Changement de serrure',
      'Installation serrure 3 points',
      'Blindage de porte',
      'Double de clés',
      'Dépannage urgence 24h/24',
    ],

    averageTicket: 150,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PLOMBIER
  // ─────────────────────────────────────────────────────────────────────────────
  plombier: {
    slug: 'plombier',
    label: 'Plombier',
    labelPlural: 'Plombiers',

    heroImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600',

    accentColor: '#0EA5E9', // Bleu eau

    heroTitle: 'Vos clients recommandent votre travail.',
    heroSubtitle: 'Mais les nouveaux ne vous trouvent pas en ligne.',
    problemStatement: 'Quand quelqu\'un a une fuite et cherche "plombier urgence", ce sont vos concurrents qui décrochent.',

    keywords: {
      principal: [
        { keyword: 'plombier nice', volume: 4100, difficulty: 'difficile', type: 'principal' },
        { keyword: 'plombier urgence nice', volume: 1800, difficulty: 'difficile', type: 'principal' },
        { keyword: 'plomberie nice', volume: 890, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'fuite eau nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'débouchage nice', volume: 720, difficulty: 'moyen', type: 'niche' },
        { keyword: 'chauffe eau nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'plombier chauffagiste nice', volume: 320, difficulty: 'moyen', type: 'niche' },
        { keyword: 'installation sanitaire nice', volume: 170, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'plombier nice pas cher', volume: 280, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'plombier nice dimanche', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'réparation fuite nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'plombier devis gratuit nice', volume: 70, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Plombier Urgence Nice',
      'Débouchage Canalisation Nice',
      'Réparation Fuite Nice',
      'Installation Chauffe-Eau Nice',
      'Plombier Nice Centre',
    ],

    clientQuestions: [
      'Intervenez-vous en urgence ?',
      'Combien coûte un débouchage ?',
      'Faites-vous des devis gratuits ?',
      'Travaillez-vous le week-end ?',
    ],

    services: [
      'Dépannage urgence',
      'Réparation fuite',
      'Débouchage canalisation',
      'Installation sanitaire',
      'Chauffe-eau / Ballon',
      'Plomberie générale',
    ],

    averageTicket: 180,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ÉLECTRICIEN
  // ─────────────────────────────────────────────────────────────────────────────
  electricien: {
    slug: 'electricien',
    label: 'Électricien',
    labelPlural: 'Électriciens',

    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600',

    accentColor: '#F59E0B', // Jaune électrique

    heroTitle: 'Vos clients savent que vous êtes fiable.',
    heroSubtitle: 'Les autres ne vous trouvent pas encore.',
    problemStatement: 'Quand quelqu\'un cherche "électricien urgence panne", ce sont d\'autres qui interviennent.',

    keywords: {
      principal: [
        { keyword: 'electricien nice', volume: 3600, difficulty: 'difficile', type: 'principal' },
        { keyword: 'electricien urgence nice', volume: 890, difficulty: 'difficile', type: 'principal' },
        { keyword: 'electricité nice', volume: 590, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'panne électrique nice', volume: 320, difficulty: 'moyen', type: 'niche' },
        { keyword: 'installation électrique nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'tableau électrique nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'mise aux normes électrique nice', volume: 170, difficulty: 'facile', type: 'niche' },
        { keyword: 'domotique nice', volume: 260, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'electricien nice pas cher', volume: 190, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'electricien agree nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'depannage electrique nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Électricien Urgence Nice',
      'Dépannage Électrique Nice',
      'Installation Tableau Électrique Nice',
      'Mise aux Normes Nice',
      'Électricien Nice Centre',
    ],

    clientQuestions: [
      'Intervenez-vous pour les pannes ?',
      'Faites-vous les mises aux normes ?',
      'Êtes-vous certifié ?',
      'Quel délai pour un devis ?',
    ],

    services: [
      'Dépannage électrique',
      'Installation électrique',
      'Mise aux normes',
      'Tableau électrique',
      'Éclairage LED',
      'Domotique',
    ],

    averageTicket: 200,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PROTHÉSISTE ONGULAIRE
  // ─────────────────────────────────────────────────────────────────────────────
  'prothesiste-ongulaire': {
    slug: 'prothesiste-ongulaire',
    label: 'Prothésiste ongulaire',
    labelPlural: 'Prothésistes ongulaires',

    heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',

    accentColor: '#EC4899', // Rose élégant

    heroTitle: 'Vos clientes adorent vos créations.',
    heroSubtitle: 'Mais elles vous ont trouvé par hasard, pas sur Google.',
    problemStatement: 'Quand une femme cherche "pose ongles Nice", vos concurrentes apparaissent avant vous.',

    keywords: {
      principal: [
        { keyword: 'onglerie nice', volume: 1400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'prothesiste ongulaire nice', volume: 880, difficulty: 'moyen', type: 'principal' },
        { keyword: 'pose ongles nice', volume: 720, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'manucure nice', volume: 1100, difficulty: 'difficile', type: 'niche' },
        { keyword: 'gel uv nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'nail art nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'faux ongles nice', volume: 390, difficulty: 'moyen', type: 'niche' },
        { keyword: 'french manucure nice', volume: 170, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'pose ongles gel nice centre', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'onglerie pas cher nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'remplissage ongles nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'nail art mariage nice', volume: 50, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Pose Gel UV Nice',
      'Nail Art Nice Centre',
      'Manucure Nice',
      'French Manucure Nice',
      'Ongles Mariage Nice',
    ],

    clientQuestions: [
      'Combien coûte une pose complète ?',
      'Faites-vous le nail art ?',
      'Combien de temps ça dure ?',
      'Proposez-vous la dépose ?',
    ],

    services: [
      'Pose gel UV',
      'Pose résine',
      'Nail art',
      'French manucure',
      'Remplissage',
      'Manucure classique',
    ],

    averageTicket: 55,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DENTISTE
  // ─────────────────────────────────────────────────────────────────────────────
  dentiste: {
    slug: 'dentiste',
    label: 'Dentiste',
    labelPlural: 'Dentistes',

    heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600',

    accentColor: '#06B6D4', // Cyan médical

    heroTitle: 'Vos patients vous recommandent.',
    heroSubtitle: 'Mais les nouveaux patients vont chez ceux qui sont visibles en ligne.',
    problemStatement: 'Quand quelqu\'un cherche "dentiste urgence" ou "dentiste nouveau patient", vous n\'apparaissez pas.',

    keywords: {
      principal: [
        { keyword: 'dentiste nice', volume: 6200, difficulty: 'difficile', type: 'principal' },
        { keyword: 'chirurgien dentiste nice', volume: 1400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'cabinet dentaire nice', volume: 890, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'dentiste urgence nice', volume: 720, difficulty: 'moyen', type: 'niche' },
        { keyword: 'implant dentaire nice', volume: 590, difficulty: 'moyen', type: 'niche' },
        { keyword: 'blanchiment dentaire nice', volume: 480, difficulty: 'facile', type: 'niche' },
        { keyword: 'orthodontiste nice', volume: 880, difficulty: 'moyen', type: 'niche' },
        { keyword: 'dentiste enfant nice', volume: 390, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'dentiste qui prend nouveaux patients nice', volume: 260, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'dentiste nice centre', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'dentiste rdv rapide nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'dentiste samedi nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Dentiste Urgence Nice',
      'Implant Dentaire Nice',
      'Blanchiment Dentaire Nice',
      'Dentiste Nouveaux Patients Nice',
      'Dentiste Nice Centre',
    ],

    clientQuestions: [
      'Prenez-vous de nouveaux patients ?',
      'Quel délai pour un RDV urgence ?',
      'Êtes-vous conventionné ?',
      'Faites-vous les implants ?',
    ],

    services: [
      'Soins dentaires',
      'Implantologie',
      'Blanchiment',
      'Orthodontie',
      'Prothèses dentaires',
      'Urgences dentaires',
    ],

    averageTicket: 120,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // AVOCAT
  // ─────────────────────────────────────────────────────────────────────────────
  avocat: {
    slug: 'avocat',
    label: 'Avocat',
    labelPlural: 'Avocats',

    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600',

    accentColor: '#1E3A5F', // Bleu juridique

    heroTitle: 'Vos clients vous font confiance pour les défendre.',
    heroSubtitle: 'Mais en ligne, vous êtes invisible face à vos confrères.',
    problemStatement: 'Quand quelqu\'un cherche un avocat dans votre spécialité, ce sont d\'autres cabinets qui apparaissent.',

    keywords: {
      principal: [
        { keyword: 'avocat nice', volume: 4800, difficulty: 'difficile', type: 'principal' },
        { keyword: 'cabinet avocat nice', volume: 720, difficulty: 'moyen', type: 'principal' },
        { keyword: 'avocat barreau nice', volume: 390, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'avocat divorce nice', volume: 880, difficulty: 'moyen', type: 'niche' },
        { keyword: 'avocat droit du travail nice', volume: 590, difficulty: 'moyen', type: 'niche' },
        { keyword: 'avocat pénal nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'avocat immobilier nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'avocat famille nice', volume: 540, difficulty: 'moyen', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'avocat consultation gratuite nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'avocat aide juridictionnelle nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'meilleur avocat divorce nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Avocat Divorce Nice',
      'Avocat Droit du Travail Nice',
      'Avocat Pénal Nice',
      'Avocat Immobilier Nice',
      'Consultation Avocat Nice',
    ],

    clientQuestions: [
      'Quelle est votre spécialité ?',
      'Proposez-vous une première consultation ?',
      'Acceptez-vous l\'aide juridictionnelle ?',
      'Quels sont vos honoraires ?',
    ],

    services: [
      'Droit de la famille',
      'Droit du travail',
      'Droit pénal',
      'Droit immobilier',
      'Droit des affaires',
      'Consultation juridique',
    ],

    averageTicket: 200,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RÉNOVATION TOUT CORPS D'ÉTAT
  // ─────────────────────────────────────────────────────────────────────────────
  renovation: {
    slug: 'renovation',
    label: 'Entreprise de rénovation',
    labelPlural: 'Entreprises de rénovation',

    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=600',

    accentColor: '#D97706', // Orange BTP

    heroTitle: 'Vos chantiers parlent pour vous.',
    heroSubtitle: 'Mais sur Google, personne ne les voit.',
    problemStatement: 'Quand quelqu\'un cherche "rénovation appartement Nice", ce sont d\'autres entreprises qui décrochent les devis.',

    keywords: {
      principal: [
        { keyword: 'renovation nice', volume: 2100, difficulty: 'difficile', type: 'principal' },
        { keyword: 'entreprise renovation nice', volume: 880, difficulty: 'moyen', type: 'principal' },
        { keyword: 'travaux renovation nice', volume: 590, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'renovation appartement nice', volume: 720, difficulty: 'moyen', type: 'niche' },
        { keyword: 'renovation maison nice', volume: 540, difficulty: 'moyen', type: 'niche' },
        { keyword: 'renovation salle de bain nice', volume: 480, difficulty: 'facile', type: 'niche' },
        { keyword: 'renovation cuisine nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'peintre nice', volume: 1400, difficulty: 'difficile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'renovation complete appartement nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'devis renovation nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'artisan renovation nice', volume: 210, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'renovation clé en main nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Rénovation Appartement Nice',
      'Rénovation Salle de Bain Nice',
      'Rénovation Cuisine Nice',
      'Peinture Intérieure Nice',
      'Rénovation Clé en Main Nice',
    ],

    clientQuestions: [
      'Faites-vous des devis gratuits ?',
      'Quel délai pour les travaux ?',
      'Êtes-vous assuré décennale ?',
      'Travaillez-vous avec des architectes ?',
    ],

    services: [
      'Rénovation complète',
      'Rénovation salle de bain',
      'Rénovation cuisine',
      'Peinture intérieure',
      'Carrelage',
      'Plâtrerie',
      'Électricité',
      'Plomberie',
    ],

    averageTicket: 5000,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MAGASIN DE VÊTEMENTS
  // ─────────────────────────────────────────────────────────────────────────────
  boutique: {
    slug: 'boutique',
    label: 'Boutique de vêtements',
    labelPlural: 'Boutiques de vêtements',

    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200',
    mockupImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600',

    accentColor: '#8B5CF6', // Violet mode

    heroTitle: 'Vos clientes reviennent saison après saison.',
    heroSubtitle: 'Mais les nouvelles passent devant sans vous voir.',
    problemStatement: 'Quand quelqu\'un cherche "boutique vêtements Nice", ce sont vos concurrents ou les grandes enseignes qui apparaissent.',

    keywords: {
      principal: [
        { keyword: 'boutique vetement nice', volume: 1900, difficulty: 'difficile', type: 'principal' },
        { keyword: 'magasin vetement nice', volume: 1400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'boutique mode nice', volume: 720, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'boutique femme nice', volume: 590, difficulty: 'moyen', type: 'niche' },
        { keyword: 'vetement homme nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'boutique créateur nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'friperie nice', volume: 720, difficulty: 'moyen', type: 'niche' },
        { keyword: 'robe soirée nice', volume: 320, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'boutique vieux nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'boutique jean médecin', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'magasin robe mariage nice', volume: 210, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Boutique Femme Nice Centre',
      'Robes de Soirée Nice',
      'Boutique Créateur Nice',
      'Mode Femme Nice',
      'Vêtements Homme Nice',
    ],

    clientQuestions: [
      'Quelles marques avez-vous ?',
      'Faites-vous les retouches ?',
      'Avez-vous un site e-commerce ?',
      'Quels sont vos horaires ?',
    ],

    services: [
      'Prêt-à-porter femme',
      'Prêt-à-porter homme',
      'Accessoires',
      'Robes de soirée',
      'Tenues de cérémonie',
      'Conseil en style',
    ],

    averageTicket: 120,
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

export function getMetierData(slug: string): MetierData | null {
  return metiersData[slug] || null
}

export function getAllMetierSlugs(): string[] {
  return Object.keys(metiersData)
}

export function getTotalSearchVolume(metier: MetierData): number {
  const allKeywords = [
    ...metier.keywords.principal,
    ...metier.keywords.niches,
    ...metier.keywords.longueTraine
  ]
  return allKeywords.reduce((sum, kw) => sum + kw.volume, 0)
}

export function getEasyWinsCount(metier: MetierData): number {
  const allKeywords = [
    ...metier.keywords.principal,
    ...metier.keywords.niches,
    ...metier.keywords.longueTraine
  ]
  return allKeywords.filter(kw => kw.difficulty === 'facile').length
}
