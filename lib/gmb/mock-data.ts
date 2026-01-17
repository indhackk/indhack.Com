import { GMBBusiness, GMBReview, SubscriptionPlan } from './types';

export const MOCK_BUSINESSES: GMBBusiness[] = [
    {
        id: 'biz-1',
        name: 'Restaurant Le Provençal',
        address: '15 Rue de la République, 13001 Marseille',
        category: 'Restaurant',
        rating: 4.6,
        totalReviews: 234,
        pendingReviews: 8,
        respondedReviews: 226,
        connected: true,
        lastSync: new Date(),
        keywords: ['restaurant marseille', 'cuisine provençale', 'terrasse', 'fruits de mer'],
        tone: 'friendly',
        autoReply: true
    },
    {
        id: 'biz-2',
        name: 'Garage Auto Plus',
        address: '45 Avenue Jean Jaurès, 69007 Lyon',
        category: 'Garage automobile',
        rating: 4.8,
        totalReviews: 156,
        pendingReviews: 3,
        respondedReviews: 153,
        connected: true,
        lastSync: new Date(),
        keywords: ['garage lyon', 'réparation auto', 'entretien voiture', 'mécanique'],
        tone: 'professional',
        autoReply: true
    },
    {
        id: 'biz-3',
        name: 'Salon Beauté Divine',
        address: '8 Place Bellecour, 69002 Lyon',
        category: 'Salon de coiffure',
        rating: 4.9,
        totalReviews: 89,
        pendingReviews: 2,
        respondedReviews: 87,
        connected: true,
        lastSync: new Date(),
        keywords: ['coiffeur lyon', 'salon beauté', 'coloration', 'coupe femme'],
        tone: 'enthusiastic',
        autoReply: false
    }
];

export const MOCK_REVIEWS: GMBReview[] = [
    {
        id: 'rev-1',
        businessId: 'biz-1',
        author: 'Marie Dupont',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
        rating: 5,
        text: 'Excellent restaurant ! La bouillabaisse était divine et le service impeccable. Je recommande vivement pour un dîner en famille.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
        status: 'pending'
    },
    {
        id: 'rev-2',
        businessId: 'biz-1',
        author: 'Pierre Martin',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
        rating: 4,
        text: 'Très bon repas, cadre agréable. Petit bémol sur le temps d\'attente mais sinon parfait.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
        status: 'pending'
    },
    {
        id: 'rev-3',
        businessId: 'biz-1',
        author: 'Sophie Bernard',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        rating: 3,
        text: 'Cuisine correcte mais les prix sont un peu élevés pour la quantité servie.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'pending'
    },
    {
        id: 'rev-4',
        businessId: 'biz-2',
        author: 'Jean Durand',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
        rating: 5,
        text: 'Super garage ! Ils ont réparé ma voiture rapidement et à un prix très correct. Personnel très professionnel.',
        date: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        status: 'pending'
    },
    {
        id: 'rev-5',
        businessId: 'biz-2',
        author: 'Claire Petit',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claire',
        rating: 5,
        text: 'Excellente expérience ! Révision complète de ma voiture sans mauvaise surprise. Je recommande.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3h ago
        status: 'pending'
    },
    {
        id: 'rev-6',
        businessId: 'biz-3',
        author: 'Isabelle Roy',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabelle',
        rating: 5,
        text: 'Magnifique coloration ! L\'équipe est très à l\'écoute et le résultat est top.',
        date: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
        status: 'pending'
    },
    {
        id: 'rev-7',
        businessId: 'biz-3',
        author: 'Thomas Leroy',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
        rating: 4,
        text: 'Très bon salon, ambiance agréable. La coupe est nickel.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8h ago
        status: 'pending'
    },
    // Avis déjà répondus
    {
        id: 'rev-8',
        businessId: 'biz-1',
        author: 'François Blanc',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Francois',
        rating: 5,
        text: 'Un vrai régal ! Les produits sont frais et la cuisine authentique.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        status: 'responded',
        response: 'Merci infiniment François pour ce retour chaleureux ! Notre équipe met un point d\'honneur à sélectionner les meilleurs produits frais pour notre cuisine provençale. Au plaisir de vous revoir au restaurant Le Provençal ! 🌿',
        respondedAt: new Date(Date.now() - 1000 * 60 * 60 * 47),
        keywords: ['cuisine provençale', 'produits frais', 'restaurant']
    }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        price: 0,
        features: [
            '1 fiche GMB',
            '10 réponses/mois',
            'Réponses IA basiques',
            'Support email'
        ],
        maxBusinesses: 1,
        maxReviewsPerMonth: 10
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 29,
        features: [
            '3 fiches GMB',
            'Réponses illimitées',
            'IA avancée avec mots-clés',
            'Tonalité personnalisable',
            'Réponse automatique',
            'Analytics détaillés',
            'Support prioritaire'
        ],
        maxBusinesses: 3,
        maxReviewsPerMonth: -1, // unlimited
        popular: true
    },
    {
        id: 'agency',
        name: 'Agence',
        price: 79,
        features: [
            '10 fiches GMB',
            'Réponses illimitées',
            'IA premium multi-langues',
            'White label',
            'API access',
            'Rapports automatiques',
            'Account manager dédié'
        ],
        maxBusinesses: 10,
        maxReviewsPerMonth: -1
    }
];

export const RESPONSE_TEMPLATES = {
    positive: [
        "Merci infiniment {author} pour ce magnifique retour ! Votre satisfaction est notre priorité chez {business}. Au plaisir de vous revoir bientôt ! 🌟",
        "Quel plaisir de lire votre avis {author} ! Toute l'équipe de {business} vous remercie chaleureusement. À très vite !",
        "{author}, un grand merci pour ce 5 étoiles ! C'est ce genre de retour qui nous motive chaque jour chez {business}. 💫"
    ],
    neutral: [
        "Merci {author} pour votre retour constructif. Chez {business}, nous travaillons constamment à améliorer nos services. N'hésitez pas à nous contacter directement.",
        "Votre avis compte beaucoup {author}. Nous prenons note de vos remarques et nous engageons à faire encore mieux lors de votre prochaine visite chez {business}."
    ],
    negative: [
        "{author}, nous sommes sincèrement désolés que votre expérience n'ait pas été à la hauteur de vos attentes. Chez {business}, la satisfaction client est primordiale. Contactez-nous pour en discuter.",
        "Merci {author} d'avoir pris le temps de nous faire ce retour. Nous regrettons cette expérience et aimerions comprendre comment nous améliorer. L'équipe {business} vous invite à nous contacter."
    ]
};
