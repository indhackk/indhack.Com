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

    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',

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
  // BARBIER
  // ─────────────────────────────────────────────────────────────────────────────
  barbier: {
    slug: 'barbier',
    label: 'Barbier',
    labelPlural: 'Barbiers',

    heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop',

    accentColor: '#1E3A5F', // Bleu masculin élégant

    heroTitle: 'Vos clients reviennent chaque mois.',
    heroSubtitle: 'Mais les nouveaux ne vous trouvent pas sur Google.',
    problemStatement: 'Quand un homme cherche "barbier Nice", ce sont vos concurrents qui apparaissent en premier.',

    keywords: {
      principal: [
        { keyword: 'barbier nice', volume: 1900, difficulty: 'difficile', type: 'principal' },
        { keyword: 'barber shop nice', volume: 1400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'coiffeur homme nice', volume: 880, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'barbe nice', volume: 390, difficulty: 'moyen', type: 'niche' },
        { keyword: 'rasage traditionnel nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'dégradé homme nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'barbier sans rdv nice', volume: 170, difficulty: 'facile', type: 'niche' },
        { keyword: 'coupe homme tendance nice', volume: 140, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'barbier nice centre', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'meilleur barbier nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'barbier nice pas cher', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'barbier ouvert dimanche nice', volume: 70, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Barbier Nice Centre',
      'Barber Shop Nice',
      'Dégradé Homme Nice',
      'Rasage Traditionnel Nice',
      'Meilleur Barbier Nice',
    ],

    clientQuestions: [
      'Prenez-vous sans rendez-vous ?',
      'Faites-vous le rasage à l\'ancienne ?',
      'Êtes-vous ouvert le dimanche ?',
      'Quel est le prix d\'une coupe + barbe ?',
    ],

    services: [
      'Coupe homme',
      'Taille de barbe',
      'Rasage traditionnel',
      'Dégradé',
      'Coloration barbe',
      'Soins visage',
    ],

    averageTicket: 35,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SERRURIER
  // ─────────────────────────────────────────────────────────────────────────────
  serrurier: {
    slug: 'serrurier',
    label: 'Serrurier',
    labelPlural: 'Serruriers',

    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',

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

    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',

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

  // ─────────────────────────────────────────────────────────────────────────────
  // RESTAURANT (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  restaurant: {
    slug: 'restaurant',
    label: 'Restaurant',
    labelPlural: 'Restaurants',

    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',

    accentColor: '#D97706', // Orange chaleureux

    heroTitle: 'Vos clients adorent votre cuisine.',
    heroSubtitle: 'Mais les affamés qui cherchent sur Google ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "restaurant Nice" ou "où manger à Nice", ce sont d\'autres établissements qui apparaissent.',

    keywords: {
      principal: [
        { keyword: 'restaurant nice', volume: 8100, difficulty: 'difficile', type: 'principal' },
        { keyword: 'ou manger nice', volume: 2400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'meilleur restaurant nice', volume: 1900, difficulty: 'difficile', type: 'principal' },
      ],
      niches: [
        { keyword: 'restaurant italien nice', volume: 1400, difficulty: 'moyen', type: 'niche' },
        { keyword: 'restaurant vieux nice', volume: 1200, difficulty: 'moyen', type: 'niche' },
        { keyword: 'restaurant terrasse nice', volume: 880, difficulty: 'moyen', type: 'niche' },
        { keyword: 'restaurant gastronomique nice', volume: 720, difficulty: 'moyen', type: 'niche' },
        { keyword: 'restaurant livraison nice', volume: 590, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'restaurant ouvert dimanche nice', volume: 320, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'restaurant pas cher nice', volume: 480, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'restaurant romantique nice', volume: 210, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'restaurant groupe nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Restaurant Vieux Nice',
      'Restaurant Terrasse Nice',
      'Meilleur Restaurant Nice',
      'Restaurant Livraison Nice',
      'Restaurant Groupe Nice',
    ],

    clientQuestions: [
      'Prenez-vous les réservations en ligne ?',
      'Faites-vous la livraison ?',
      'Êtes-vous ouvert le dimanche ?',
      'Avez-vous une terrasse ?',
    ],

    services: [
      'Déjeuner',
      'Dîner',
      'Terrasse',
      'Livraison',
      'Click & Collect',
      'Privatisation',
      'Menu groupe',
    ],

    averageTicket: 35,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BOULANGERIE (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  boulangerie: {
    slug: 'boulangerie',
    label: 'Boulangerie',
    labelPlural: 'Boulangeries',

    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&h=600&fit=crop',

    accentColor: '#92400E', // Brun pain

    heroTitle: 'Vos clients font la queue chaque matin.',
    heroSubtitle: 'Mais ceux qui cherchent sur Google ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "boulangerie ouverte dimanche" ou "meilleur pain Nice", vous n\'apparaissez pas.',

    keywords: {
      principal: [
        { keyword: 'boulangerie nice', volume: 3200, difficulty: 'difficile', type: 'principal' },
        { keyword: 'boulanger nice', volume: 1400, difficulty: 'moyen', type: 'principal' },
        { keyword: 'patisserie nice', volume: 1800, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'boulangerie artisanale nice', volume: 590, difficulty: 'moyen', type: 'niche' },
        { keyword: 'croissant nice', volume: 480, difficulty: 'facile', type: 'niche' },
        { keyword: 'pain bio nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'gateau anniversaire nice', volume: 720, difficulty: 'moyen', type: 'niche' },
        { keyword: 'boulangerie ouverte dimanche nice', volume: 390, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'meilleure boulangerie nice', volume: 210, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'boulangerie vieux nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'pain au levain nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'boulangerie sans gluten nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Boulangerie Artisanale Nice',
      'Pain Bio Nice',
      'Gâteau Anniversaire Nice',
      'Boulangerie Ouverte Dimanche Nice',
      'Meilleure Boulangerie Nice',
    ],

    clientQuestions: [
      'Êtes-vous ouvert le dimanche ?',
      'Faites-vous les gâteaux de commande ?',
      'Avez-vous du pain sans gluten ?',
      'À quelle heure êtes-vous ouvert ?',
    ],

    services: [
      'Pain artisanal',
      'Viennoiseries',
      'Pâtisseries',
      'Gâteaux sur commande',
      'Sandwichs',
      'Traiteur',
    ],

    averageTicket: 8,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TRAITEUR (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  traiteur: {
    slug: 'traiteur',
    label: 'Traiteur',
    labelPlural: 'Traiteurs',

    heroImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',

    accentColor: '#7C3AED', // Violet événementiel

    heroTitle: 'Vos clients vous recommandent pour leurs événements.',
    heroSubtitle: 'Mais ceux qui organisent leur mariage ou soirée ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "traiteur mariage Nice" ou "buffet entreprise", ce sont vos concurrents qui décrochent.',

    keywords: {
      principal: [
        { keyword: 'traiteur nice', volume: 1200, difficulty: 'moyen', type: 'principal' },
        { keyword: 'traiteur mariage nice', volume: 880, difficulty: 'moyen', type: 'principal' },
        { keyword: 'traiteur evenementiel nice', volume: 480, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'buffet entreprise nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'cocktail dinatoire nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'traiteur anniversaire nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'plateaux repas nice', volume: 170, difficulty: 'facile', type: 'niche' },
        { keyword: 'traiteur italien nice', volume: 140, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'traiteur pas cher nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'traiteur livraison nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'devis traiteur nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Traiteur Mariage Nice',
      'Buffet Entreprise Nice',
      'Cocktail Dinatoire Nice',
      'Traiteur Anniversaire Nice',
      'Plateaux Repas Nice',
    ],

    clientQuestions: [
      'Faites-vous les mariages ?',
      'Quel est le prix par personne ?',
      'Livrez-vous le jour même ?',
      'Proposez-vous des menus végétariens ?',
    ],

    services: [
      'Mariage',
      'Événement entreprise',
      'Anniversaire',
      'Cocktail',
      'Buffet',
      'Plateaux repas',
      'Box déjeuner',
    ],

    averageTicket: 250,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // OSTÉOPATHE (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  osteopathe: {
    slug: 'osteopathe',
    label: 'Ostéopathe',
    labelPlural: 'Ostéopathes',

    heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop',

    accentColor: '#059669', // Vert santé

    heroTitle: 'Vos patients vous recommandent.',
    heroSubtitle: 'Mais ceux qui souffrent cherchent sur Google et ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un a mal au dos et cherche "ostéopathe Nice", ce sont vos confrères qui apparaissent.',

    keywords: {
      principal: [
        { keyword: 'osteopathe nice', volume: 2800, difficulty: 'difficile', type: 'principal' },
        { keyword: 'osteopathie nice', volume: 720, difficulty: 'moyen', type: 'principal' },
        { keyword: 'osteo nice', volume: 1400, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'osteopathe sportif nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'osteopathe bebe nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'osteopathe femme enceinte nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'osteopathe urgence nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'osteopathe dos nice', volume: 170, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'osteopathe nice centre', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'osteopathe rdv rapide nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'tarif osteopathe nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'osteopathe samedi nice', volume: 70, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Ostéopathe Sportif Nice',
      'Ostéopathe Bébé Nice',
      'Ostéopathe Femme Enceinte Nice',
      'Ostéopathe Urgence Nice',
      'Ostéopathe Nice Centre',
    ],

    clientQuestions: [
      'Prenez-vous de nouveaux patients ?',
      'Quel est le tarif d\'une séance ?',
      'Êtes-vous remboursé par la mutuelle ?',
      'Combien de séances sont nécessaires ?',
    ],

    services: [
      'Ostéopathie générale',
      'Ostéopathie sportive',
      'Ostéopathie pédiatrique',
      'Ostéopathie périnatale',
      'Douleurs dorsales',
      'Migraines',
    ],

    averageTicket: 60,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // KINÉSITHÉRAPEUTE (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  kinesitherapeute: {
    slug: 'kinesitherapeute',
    label: 'Kinésithérapeute',
    labelPlural: 'Kinésithérapeutes',

    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',

    accentColor: '#0891B2', // Bleu médical

    heroTitle: 'Vos patients progressent grâce à vous.',
    heroSubtitle: 'Mais ceux qui ont besoin de rééducation ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "kiné Nice" après une opération, ce sont d\'autres cabinets qui apparaissent.',

    keywords: {
      principal: [
        { keyword: 'kine nice', volume: 3400, difficulty: 'difficile', type: 'principal' },
        { keyword: 'kinesitherapeute nice', volume: 1400, difficulty: 'moyen', type: 'principal' },
        { keyword: 'cabinet kine nice', volume: 590, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'kine sportif nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'kine respiratoire nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'kine du sport nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'reeducation nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'massage kine nice', volume: 210, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'kine domicile nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'kine nice centre', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'kine rdv rapide nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'kine post operatoire nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Kiné Sportif Nice',
      'Kiné Respiratoire Nice',
      'Rééducation Nice',
      'Kiné à Domicile Nice',
      'Kiné Nice Centre',
    ],

    clientQuestions: [
      'Prenez-vous de nouveaux patients ?',
      'Faites-vous les visites à domicile ?',
      'Êtes-vous spécialisé sport ?',
      'Quel délai pour un RDV ?',
    ],

    services: [
      'Rééducation',
      'Kinésithérapie sportive',
      'Kinésithérapie respiratoire',
      'Massage thérapeutique',
      'Rééducation post-opératoire',
      'Kinésithérapie à domicile',
    ],

    averageTicket: 45,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PSYCHOLOGUE (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  psychologue: {
    slug: 'psychologue',
    label: 'Psychologue',
    labelPlural: 'Psychologues',

    heroImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&h=600&fit=crop',

    accentColor: '#7C3AED', // Violet apaisant

    heroTitle: 'Vos patients vous font confiance.',
    heroSubtitle: 'Mais ceux qui cherchent de l\'aide ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "psychologue Nice" pour commencer une thérapie, ce sont d\'autres cabinets qui apparaissent.',

    keywords: {
      principal: [
        { keyword: 'psychologue nice', volume: 2200, difficulty: 'difficile', type: 'principal' },
        { keyword: 'psy nice', volume: 1400, difficulty: 'moyen', type: 'principal' },
        { keyword: 'therapeute nice', volume: 590, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'psychologue couple nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'psychologue enfant nice', volume: 480, difficulty: 'moyen', type: 'niche' },
        { keyword: 'psychologue anxiete nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'psychologue depression nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'psychologue tcc nice', volume: 170, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'psychologue nice centre', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'consultation psy nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'tarif psychologue nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'psychologue en ligne nice', volume: 70, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Psychologue Couple Nice',
      'Psychologue Enfant Nice',
      'Psychologue Anxiété Nice',
      'Thérapie Cognitive Nice',
      'Psychologue Nice Centre',
    ],

    clientQuestions: [
      'Prenez-vous de nouveaux patients ?',
      'Quel est le tarif d\'une séance ?',
      'Êtes-vous remboursé ?',
      'Faites-vous les consultations en ligne ?',
    ],

    services: [
      'Thérapie individuelle',
      'Thérapie de couple',
      'Psychologie enfant/ado',
      'TCC',
      'Gestion du stress',
      'Accompagnement deuil',
    ],

    averageTicket: 70,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PEINTRE (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  peintre: {
    slug: 'peintre',
    label: 'Peintre en bâtiment',
    labelPlural: 'Peintres en bâtiment',

    heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',

    accentColor: '#EA580C', // Orange BTP

    heroTitle: 'Vos clients recommandent votre travail.',
    heroSubtitle: 'Mais ceux qui veulent refaire leur intérieur ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "peintre Nice" pour rafraîchir son appartement, ce sont vos concurrents qui décrochent.',

    keywords: {
      principal: [
        { keyword: 'peintre nice', volume: 1800, difficulty: 'difficile', type: 'principal' },
        { keyword: 'peintre batiment nice', volume: 590, difficulty: 'moyen', type: 'principal' },
        { keyword: 'entreprise peinture nice', volume: 480, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'peinture appartement nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'peinture interieure nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'peinture facade nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'peintre decorateur nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'ravalement facade nice', volume: 170, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'peintre pas cher nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'devis peinture nice', volume: 170, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'artisan peintre nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'peintre agree nice', volume: 70, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Peinture Appartement Nice',
      'Peinture Intérieure Nice',
      'Ravalement Façade Nice',
      'Peintre Décorateur Nice',
      'Devis Peinture Nice',
    ],

    clientQuestions: [
      'Faites-vous des devis gratuits ?',
      'Quel délai pour les travaux ?',
      'Êtes-vous assuré ?',
      'Faites-vous les façades ?',
    ],

    services: [
      'Peinture intérieure',
      'Peinture extérieure',
      'Ravalement façade',
      'Papier peint',
      'Décoration',
      'Rénovation',
    ],

    averageTicket: 2500,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CARRELEUR (nouveau pour prospection)
  // ─────────────────────────────────────────────────────────────────────────────
  carreleur: {
    slug: 'carreleur',
    label: 'Carreleur',
    labelPlural: 'Carreleurs',

    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop',
    mockupImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',

    accentColor: '#64748B', // Gris carrelage

    heroTitle: 'Vos clients sont satisfaits de votre travail.',
    heroSubtitle: 'Mais ceux qui refont leur salle de bain ne vous trouvent pas.',
    problemStatement: 'Quand quelqu\'un cherche "carreleur Nice" pour sa rénovation, ce sont vos concurrents qui obtiennent le chantier.',

    keywords: {
      principal: [
        { keyword: 'carreleur nice', volume: 1200, difficulty: 'moyen', type: 'principal' },
        { keyword: 'pose carrelage nice', volume: 590, difficulty: 'moyen', type: 'principal' },
        { keyword: 'carrelage nice', volume: 880, difficulty: 'moyen', type: 'principal' },
      ],
      niches: [
        { keyword: 'carreleur salle de bain nice', volume: 320, difficulty: 'facile', type: 'niche' },
        { keyword: 'faience nice', volume: 280, difficulty: 'facile', type: 'niche' },
        { keyword: 'carreleur cuisine nice', volume: 210, difficulty: 'facile', type: 'niche' },
        { keyword: 'pose parquet nice', volume: 390, difficulty: 'facile', type: 'niche' },
        { keyword: 'carrelage terrasse nice', volume: 170, difficulty: 'facile', type: 'niche' },
      ],
      longueTraine: [
        { keyword: 'carreleur pas cher nice', volume: 140, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'devis carrelage nice', volume: 110, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'artisan carreleur nice', volume: 90, difficulty: 'facile', type: 'longue-traine' },
        { keyword: 'carreleur agree nice', volume: 50, difficulty: 'facile', type: 'longue-traine' },
      ]
    },

    ghostPageExamples: [
      'Carreleur Salle de Bain Nice',
      'Pose Carrelage Nice',
      'Faïence Cuisine Nice',
      'Carrelage Terrasse Nice',
      'Devis Carrelage Nice',
    ],

    clientQuestions: [
      'Faites-vous des devis gratuits ?',
      'Quel délai pour les travaux ?',
      'Posez-vous aussi le parquet ?',
      'Êtes-vous assuré décennale ?',
    ],

    services: [
      'Pose carrelage sol',
      'Faïence murale',
      'Carrelage salle de bain',
      'Carrelage cuisine',
      'Carrelage terrasse',
      'Pose parquet',
    ],

    averageTicket: 3000,
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
