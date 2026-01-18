import { GMBBusiness, GMBReview, SubscriptionPlan, VisibilityDataPoint } from './types';

// ═══════════════════════════════════════════════════════════════
// HELPER: Generate Visibility Trend
// ═══════════════════════════════════════════════════════════════

function generateVisibilityTrend(baseScore: number = 65): VisibilityDataPoint[] {
    const points: VisibilityDataPoint[] = [];
    const now = Date.now();

    for (let i = 30; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        const variation = (Math.random() - 0.5) * 10;
        const trend = (30 - i) * 0.2; // Tendance haussière

        points.push({
            date,
            score: Math.min(100, Math.max(0, Math.round(baseScore + variation + trend))),
            reviewsCount: Math.floor(Math.random() * 5),
            keywordsUsed: Math.floor(3 + Math.random() * 5)
        });
    }

    return points;
}

// ═══════════════════════════════════════════════════════════════
// MOCK BUSINESSES
// ═══════════════════════════════════════════════════════════════

export const MOCK_BUSINESSES: GMBBusiness[] = [
    {
        id: 'biz-1',
        name: 'Restaurant Le Provençal',
        address: '15 Rue de la République, 13001 Marseille',
        city: 'Marseille',
        postalCode: '13001',
        category: 'Restaurant',
        rating: 4.6,
        totalReviews: 234,
        pendingReviews: 8,
        respondedReviews: 226,
        connected: true,
        lastSync: new Date(),
        keywords: ['restaurant marseille', 'cuisine provençale', 'terrasse', 'fruits de mer'],
        tone: 'friendly',
        autoReply: true,
        seoScore: 78,
        visibilityTrend: generateVisibilityTrend(72)
    },
    {
        id: 'biz-2',
        name: 'Garage Auto Plus',
        address: '45 Avenue Jean Jaurès, 69007 Lyon',
        city: 'Lyon',
        postalCode: '69007',
        category: 'Garage automobile',
        rating: 4.8,
        totalReviews: 156,
        pendingReviews: 3,
        respondedReviews: 153,
        connected: true,
        lastSync: new Date(),
        keywords: ['garage lyon', 'réparation auto', 'entretien voiture', 'mécanique'],
        tone: 'professional',
        autoReply: true,
        seoScore: 85,
        visibilityTrend: generateVisibilityTrend(80)
    },
    {
        id: 'biz-3',
        name: 'Salon Beauté Divine',
        address: '8 Place Bellecour, 69002 Lyon',
        city: 'Lyon',
        postalCode: '69002',
        category: 'Salon de coiffure',
        rating: 4.9,
        totalReviews: 89,
        pendingReviews: 2,
        respondedReviews: 87,
        connected: true,
        lastSync: new Date(),
        keywords: ['coiffeur lyon', 'salon beauté', 'coloration', 'coupe femme'],
        tone: 'enthusiastic',
        autoReply: false,
        seoScore: 72,
        visibilityTrend: generateVisibilityTrend(68)
    }
];

// ═══════════════════════════════════════════════════════════════
// MOCK REVIEWS - With Various Sentiment Levels
// ═══════════════════════════════════════════════════════════════

export const MOCK_REVIEWS: GMBReview[] = [
    // Avis 5 étoiles - Positif enthousiaste
    {
        id: 'rev-1',
        businessId: 'biz-1',
        author: 'Marie Dupont',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
        rating: 5,
        text: 'Excellent restaurant ! La bouillabaisse était divine et le service impeccable. Je recommande vivement pour un dîner en famille. L\'équipe est adorable !',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: 'pending'
    },
    // Avis 4 étoiles - Positif avec nuance
    {
        id: 'rev-2',
        businessId: 'biz-1',
        author: 'Pierre Martin',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
        rating: 4,
        text: 'Très bon repas, cadre agréable et cuisine savoureuse. Petit bémol sur le temps d\'attente un peu long mais sinon parfait.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 5),
        status: 'pending'
    },
    // Avis 3 étoiles - Neutre/Mitigé
    {
        id: 'rev-3',
        businessId: 'biz-1',
        author: 'Sophie Bernard',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        rating: 3,
        text: 'Cuisine correcte mais les prix sont un peu élevés pour la quantité servie. Dommage car le cadre est sympa.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: 'pending'
    },
    // Avis 2 étoiles - Négatif (nécessite validation)
    {
        id: 'rev-3b',
        businessId: 'biz-1',
        author: 'Lucas Moreau',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
        rating: 2,
        text: 'Déçu par ma visite. Service lent, plat tiède et addition salée. Je m\'attendais à mieux vu les avis.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 36),
        status: 'pending'
    },
    // Avis 1 étoile - Critique (validation obligatoire)
    {
        id: 'rev-3c',
        businessId: 'biz-1',
        author: 'Anne-Marie Petit',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnneMarie',
        rating: 1,
        text: 'Catastrophe ! Attente interminable, serveur désagréable et nourriture froide. Je ne reviendrai jamais. À éviter absolument.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        status: 'pending'
    },
    // Avis positifs garage
    {
        id: 'rev-4',
        businessId: 'biz-2',
        author: 'Jean Durand',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
        rating: 5,
        text: 'Super garage ! Ils ont réparé ma voiture rapidement et à un prix très correct. Personnel très professionnel et transparent sur les réparations.',
        date: new Date(Date.now() - 1000 * 60 * 30),
        status: 'pending'
    },
    {
        id: 'rev-5',
        businessId: 'biz-2',
        author: 'Claire Petit',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claire',
        rating: 5,
        text: 'Excellente expérience ! Révision complète de ma voiture sans mauvaise surprise. Explications claires et prix honnêtes. Je recommande.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 3),
        status: 'pending'
    },
    // Avis salon coiffure
    {
        id: 'rev-6',
        businessId: 'biz-3',
        author: 'Isabelle Roy',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabelle',
        rating: 5,
        text: 'Magnifique coloration ! L\'équipe est très à l\'écoute et le résultat est top. Ambiance zen et accueillante.',
        date: new Date(Date.now() - 1000 * 60 * 45),
        status: 'pending'
    },
    {
        id: 'rev-7',
        businessId: 'biz-3',
        author: 'Thomas Leroy',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
        rating: 4,
        text: 'Très bon salon, ambiance agréable et équipe sympathique. La coupe est nickel mais un peu cher.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 8),
        status: 'pending'
    },
    // Avis déjà répondu
    {
        id: 'rev-8',
        businessId: 'biz-1',
        author: 'François Blanc',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Francois',
        rating: 5,
        text: 'Un vrai régal ! Les produits sont frais et la cuisine authentique. Service au top.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        status: 'responded',
        response: 'Merci infiniment François pour ce magnifique retour ! Notre équipe met un point d\'honneur à sélectionner les meilleurs produits frais pour notre cuisine provençale. Au plaisir de vous revoir au Restaurant Le Provençal à Marseille !',
        respondedAt: new Date(Date.now() - 1000 * 60 * 60 * 47),
        keywords: ['cuisine provençale', 'produits frais', 'restaurant marseille'],
        sentiment: {
            score: 0.9,
            label: 'positive',
            confidence: 95,
            emotions: { joy: 80, satisfaction: 70, frustration: 0, disappointment: 0, anger: 0 },
            urgency: 'low',
            requiresEmpathy: false,
            suggestedTone: 'grateful'
        },
        seoImpact: {
            overall: 85,
            breakdown: {
                keywordRelevance: 90,
                keywordPlacement: 80,
                naturalIntegration: 85,
                localSEO: 95,
                responseLength: 75,
                callToAction: 80
            },
            suggestions: [],
            projectedVisibilityBoost: 4.2
        }
    }
];

// ═══════════════════════════════════════════════════════════════
// SUBSCRIPTION PLANS
// ═══════════════════════════════════════════════════════════════

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
        maxReviewsPerMonth: 10,
        badge: 'Gratuit'
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 29,
        features: [
            '3 fiches GMB',
            'Réponses illimitées',
            'IA avancée + Geo-SEO',
            'Analyse de sentiment',
            'SEO Impact Score',
            'Mots-clés dynamiques',
            'Validation éthique',
            'Analytics détaillés',
            'Support prioritaire'
        ],
        maxBusinesses: 3,
        maxReviewsPerMonth: -1,
        popular: true,
        badge: 'Populaire'
    },
    {
        id: 'agency',
        name: 'Agence',
        price: 79,
        features: [
            '10 fiches GMB',
            'Réponses illimitées',
            'IA premium multi-langues',
            'API access complet',
            'White label',
            'Rapports automatiques PDF',
            'Account manager dédié',
            'Formation équipe',
            'SLA 99.9%'
        ],
        maxBusinesses: 10,
        maxReviewsPerMonth: -1,
        badge: 'Pro'
    }
];

// ═══════════════════════════════════════════════════════════════
// RESPONSE TEMPLATES BY SENTIMENT
// ═══════════════════════════════════════════════════════════════

export const RESPONSE_TEMPLATES = {
    positive: [
        "Merci infiniment {author} pour ce magnifique retour ! Votre satisfaction est notre priorité chez {business}. Au plaisir de vous revoir bientôt !",
        "Quel plaisir de lire votre avis {author} ! Toute l'équipe de {business} vous remercie chaleureusement. À très vite !",
        "{author}, un grand merci pour ces étoiles ! C'est ce genre de retour qui nous motive chaque jour chez {business}."
    ],
    neutral: [
        "Merci {author} pour votre retour constructif. Chez {business}, nous travaillons constamment à améliorer nos services. N'hésitez pas à nous contacter directement.",
        "Votre avis compte beaucoup {author}. Nous prenons note de vos remarques et nous engageons à faire encore mieux lors de votre prochaine visite chez {business}."
    ],
    negative: [
        "{author}, nous sommes sincèrement navrés que votre expérience n'ait pas été à la hauteur de vos attentes. Chez {business}, votre satisfaction est primordiale. Nous aimerions comprendre ce qui s'est passé.",
        "Merci {author} d'avoir pris le temps de nous faire ce retour. Nous regrettons cette expérience et aimerions vous proposer un échange direct pour améliorer les choses."
    ],
    critical: [
        "{author}, nous sommes profondément désolés de lire votre témoignage. Ce que vous décrivez ne reflète absolument pas nos standards. Nous prenons votre retour très au sérieux et souhaitons vous contacter personnellement pour résoudre cette situation.",
        "Cher(e) {author}, nous accusons réception de votre avis avec la plus grande attention. Cette situation est inacceptable et nous en sommes vraiment navrés. Notre responsable souhaite vous joindre dans les plus brefs délais."
    ]
};

// ═══════════════════════════════════════════════════════════════
// EMPATHETIC PHRASES FOR NEGATIVE REVIEWS
// ═══════════════════════════════════════════════════════════════

export const EMPATHY_PHRASES = {
    acknowledgment: [
        "Nous comprenons votre déception",
        "Votre frustration est tout à fait légitime",
        "Nous entendons votre mécontentement",
        "Nous sommes vraiment navrés de cette situation"
    ],
    responsibility: [
        "Nous prenons l'entière responsabilité de cette situation",
        "Cette expérience ne reflète pas nos valeurs",
        "Nous n'aurions jamais dû vous faire vivre cela",
        "Nous assumons pleinement ce dysfonctionnement"
    ],
    resolution: [
        "Nous souhaitons vous proposer une solution",
        "Permettez-nous de nous rattraper",
        "Nous aimerions échanger directement avec vous",
        "Notre équipe est à votre disposition pour trouver une solution"
    ]
};
