/**
 * Données des catégories de prospection - Département 06
 * 3 catégories principales, 14 sous-catégories
 */

import { Category, CategoryId, CityData } from './types';

/**
 * Catégories de prospection
 */
export const PROSPECTION_CATEGORIES: Category[] = [
    // ============================================
    // RESTAURATION
    // ============================================
    {
        id: 'RESTAURATION',
        label: 'Restauration',
        labelPlural: 'Restaurateurs',
        description: 'Restaurants, pizzerias, boulangeries et commerces alimentaires',
        accentColor: '#D97706',
        icon: 'UtensilsCrossed',
        subcategories: [
            {
                slug: 'restaurant',
                label: 'Restaurant',
                labelPlural: 'Restaurants',
                searchQueries: ['restaurant', 'brasserie', 'bistrot', 'resto'],
                metierSlug: 'restaurant',
                estimatedVolume: 8100,
                averageTicket: 35,
                icon: 'UtensilsCrossed'
            },
            {
                slug: 'pizzeria',
                label: 'Pizzeria',
                labelPlural: 'Pizzerias',
                searchQueries: ['pizzeria', 'pizza', 'pizzaiolo'],
                metierSlug: 'restaurant',
                estimatedVolume: 2400,
                averageTicket: 18,
                icon: 'Pizza'
            },
            {
                slug: 'boulangerie',
                label: 'Boulangerie',
                labelPlural: 'Boulangeries',
                searchQueries: ['boulangerie', 'boulanger', 'pain artisanal'],
                metierSlug: 'boulangerie',
                estimatedVolume: 3200,
                averageTicket: 8,
                icon: 'Croissant'
            },
            {
                slug: 'patisserie',
                label: 'Patisserie',
                labelPlural: 'Patisseries',
                searchQueries: ['patisserie', 'patissier', 'gateaux', 'desserts'],
                metierSlug: 'boulangerie',
                estimatedVolume: 1800,
                averageTicket: 15,
                icon: 'Cake'
            },
            {
                slug: 'traiteur',
                label: 'Traiteur',
                labelPlural: 'Traiteurs',
                searchQueries: ['traiteur', 'buffet', 'cocktail', 'reception'],
                metierSlug: 'traiteur',
                estimatedVolume: 1200,
                averageTicket: 250,
                icon: 'ChefHat'
            }
        ],
        messageTemplate: {
            whatsapp: {
                greeting: 'Bonjour ! 👋',
                hook: 'Je viens de voir {{nom}} sur Google avec {{note}}★ et {{avis}} avis - vos clients vous adorent !',
                value: 'Mais quand quelqu\'un cherche "{{subcategory}} {{ville}}" sur Google, vous n\'apparaissez pas en premier... alors que vos concurrents moins bien notes, si.',
                cta: 'J\'ai prepare une analyse gratuite de votre visibilite ici :\n{{url}}\n\nCa prend 2 min a regarder. Vous me dites ce que vous en pensez ?',
                signature: 'Indiana - IndHack\n📞 06 61 13 97 48'
            },
            email: {
                subject: '{{nom}} - Vos {{avis}} avis meritent d\'etre vus sur Google',
                greeting: 'Bonjour,',
                hook: 'Je me permets de vous contacter car j\'ai remarque que {{nom}} a d\'excellentes notes sur Google ({{note}}★ avec {{avis}} avis).',
                value: 'Pourtant, quand je cherche "{{subcategory}} {{ville}}" sur Google, votre etablissement n\'apparait pas dans les premiers resultats.\n\nC\'est dommage, car vos concurrents moins bien notes captent tous les clients qui cherchent en ligne.',
                cta: 'J\'ai prepare une analyse gratuite de votre situation :\n{{url}}\n\nCa prend 2 minutes a regarder. Si vous voulez en discuter, je suis disponible pour un appel de 15 minutes.',
                signature: 'Bien cordialement,\n\nIndiana Aflalo\nConsultante SEO - IndHack\n📞 06 61 13 97 48\n🌐 indhack.com'
            }
        }
    },

    // ============================================
    // SANTÉ
    // ============================================
    {
        id: 'SANTE',
        label: 'Sante',
        labelPlural: 'Professionnels de sante',
        description: 'Dentistes, osteopathes, kinesitherapeutes et psychologues',
        accentColor: '#06B6D4',
        icon: 'Stethoscope',
        subcategories: [
            {
                slug: 'dentiste',
                label: 'Dentiste',
                labelPlural: 'Dentistes',
                searchQueries: ['dentiste', 'cabinet dentaire', 'chirurgien dentiste'],
                metierSlug: 'dentiste',
                estimatedVolume: 6200,
                averageTicket: 120,
                icon: 'Stethoscope'
            },
            {
                slug: 'osteopathe',
                label: 'Osteopathe',
                labelPlural: 'Osteopathes',
                searchQueries: ['osteopathe', 'osteopathie', 'osteo'],
                metierSlug: 'osteopathe',
                estimatedVolume: 2800,
                averageTicket: 60,
                icon: 'Activity'
            },
            {
                slug: 'kinesitherapeute',
                label: 'Kinesitherapeute',
                labelPlural: 'Kinesitherapeutes',
                searchQueries: ['kine', 'kinesitherapeute', 'kinesitherapie', 'massage'],
                metierSlug: 'kinesitherapeute',
                estimatedVolume: 3400,
                averageTicket: 45,
                icon: 'HeartPulse'
            },
            {
                slug: 'psychologue',
                label: 'Psychologue',
                labelPlural: 'Psychologues',
                searchQueries: ['psychologue', 'psy', 'therapie', 'therapeute'],
                metierSlug: 'psychologue',
                estimatedVolume: 2200,
                averageTicket: 70,
                icon: 'Brain'
            }
        ],
        messageTemplate: {
            whatsapp: {
                greeting: 'Bonjour ! 👋',
                hook: 'Je travaille avec des professionnels de sante dans le 06 et j\'ai remarque que votre cabinet {{nom}} a de tres bons retours patients ({{note}}★, {{avis}} avis).',
                value: 'Mais quand quelqu\'un cherche "{{subcategory}} {{ville}}" sur Google pour prendre RDV, vous n\'apparaissez pas en premier - ce sont vos concurrents qui captent ces patients.',
                cta: 'J\'ai prepare une analyse de votre visibilite en ligne ici :\n{{url}}\n\nEst-ce que ca vous interesse d\'en discuter ?',
                signature: 'Indiana - IndHack\n📞 06 61 13 97 48'
            },
            email: {
                subject: '{{nom}} - Visibilite en ligne pour votre cabinet',
                greeting: 'Bonjour,',
                hook: 'Je me permets de vous contacter car j\'accompagne des professionnels de sante dans le 06 sur leur visibilite Google.\n\nJ\'ai remarque que votre cabinet {{nom}} a d\'excellents retours patients ({{note}}★ avec {{avis}} avis).',
                value: 'Cependant, quand un patient potentiel cherche "{{subcategory}} {{ville}}" sur Google, votre cabinet n\'apparait pas dans les premiers resultats.\n\nCela signifie que des patients qui cherchent exactement vos services finissent chez vos confreres mieux references.',
                cta: 'J\'ai prepare une analyse personnalisee de votre situation :\n{{url}}\n\nSi vous souhaitez en discuter, je suis disponible pour un appel de 15 minutes a votre convenance.',
                signature: 'Bien cordialement,\n\nIndiana Aflalo\nConsultante SEO - IndHack\n📞 06 61 13 97 48\n🌐 indhack.com'
            }
        }
    },

    // ============================================
    // ARTISANS
    // ============================================
    {
        id: 'ARTISANS',
        label: 'Artisans',
        labelPlural: 'Artisans du batiment',
        description: 'Plombiers, electriciens, serruriers, peintres et carreleurs',
        accentColor: '#F59E0B',
        icon: 'Wrench',
        subcategories: [
            {
                slug: 'plombier',
                label: 'Plombier',
                labelPlural: 'Plombiers',
                searchQueries: ['plombier', 'plomberie', 'fuite eau', 'depannage plomberie'],
                metierSlug: 'plombier',
                estimatedVolume: 4100,
                averageTicket: 180,
                icon: 'Droplets'
            },
            {
                slug: 'electricien',
                label: 'Electricien',
                labelPlural: 'Electriciens',
                searchQueries: ['electricien', 'electricite', 'panne electrique', 'depannage electricien'],
                metierSlug: 'electricien',
                estimatedVolume: 3600,
                averageTicket: 150,
                icon: 'Zap'
            },
            {
                slug: 'serrurier',
                label: 'Serrurier',
                labelPlural: 'Serruriers',
                searchQueries: ['serrurier', 'serrurerie', 'ouverture porte', 'cle'],
                metierSlug: 'serrurier',
                estimatedVolume: 3200,
                averageTicket: 120,
                icon: 'Key'
            },
            {
                slug: 'peintre',
                label: 'Peintre',
                labelPlural: 'Peintres',
                searchQueries: ['peintre', 'peinture', 'peintre batiment', 'travaux peinture'],
                metierSlug: 'peintre',
                estimatedVolume: 1800,
                averageTicket: 2500,
                icon: 'Paintbrush'
            },
            {
                slug: 'carreleur',
                label: 'Carreleur',
                labelPlural: 'Carreleurs',
                searchQueries: ['carreleur', 'carrelage', 'faience', 'pose carrelage'],
                metierSlug: 'carreleur',
                estimatedVolume: 1200,
                averageTicket: 3000,
                icon: 'Grid3X3'
            }
        ],
        messageTemplate: {
            whatsapp: {
                greeting: 'Bonjour ! 👋',
                hook: 'Je contacte {{nom}} car j\'ai vu que vous avez de tres bons avis clients ({{note}}★, {{avis}} avis) - c\'est rare dans le batiment !',
                value: 'Le probleme : quand quelqu\'un a besoin d\'un {{subcategory}} en urgence a {{ville}} et cherche sur Google, il tombe sur vos concurrents... pas sur vous.',
                cta: 'J\'ai fait une petite analyse gratuite de votre visibilite :\n{{url}}\n\nCa vous dit qu\'on en parle ?',
                signature: 'Indiana - IndHack\n📞 06 61 13 97 48'
            },
            email: {
                subject: '{{nom}} - Vos clients vous cherchent sur Google',
                greeting: 'Bonjour,',
                hook: 'Je me permets de vous contacter car j\'ai remarque que {{nom}} a d\'excellents avis clients ({{note}}★ avec {{avis}} avis).\n\nC\'est assez rare dans le secteur du batiment, et ca merite d\'etre mis en avant.',
                value: 'Le probleme : quand quelqu\'un cherche "{{subcategory}} {{ville}}" sur Google (souvent en urgence), votre entreprise n\'apparait pas dans les premiers resultats.\n\nCe sont vos concurrents - parfois moins bien notes - qui recuperent ces appels.',
                cta: 'J\'ai prepare une analyse gratuite de votre visibilite en ligne :\n{{url}}\n\nSi vous souhaitez en discuter, je suis disponible pour un appel de 15 minutes.',
                signature: 'Bien cordialement,\n\nIndiana Aflalo\nConsultante SEO - IndHack\n📞 06 61 13 97 48\n🌐 indhack.com'
            }
        }
    }
];

/**
 * Villes du département 06 avec populations
 */
export const CITIES_06: CityData[] = [
    { name: 'Nice', slug: 'nice', population: 340000, zipCodes: ['06000', '06100', '06200', '06300'], isMainCity: true },
    { name: 'Cannes', slug: 'cannes', population: 74000, zipCodes: ['06400'], isMainCity: true },
    { name: 'Antibes', slug: 'antibes', population: 73000, zipCodes: ['06600', '06160'], isMainCity: true },
    { name: 'Grasse', slug: 'grasse', population: 51000, zipCodes: ['06130'], isMainCity: false },
    { name: 'Cagnes-sur-Mer', slug: 'cagnes-sur-mer', population: 50000, zipCodes: ['06800'], isMainCity: false },
    { name: 'Le Cannet', slug: 'le-cannet', population: 42000, zipCodes: ['06110'], isMainCity: false },
    { name: 'Saint-Laurent-du-Var', slug: 'saint-laurent-du-var', population: 30000, zipCodes: ['06700'], isMainCity: false },
    { name: 'Menton', slug: 'menton', population: 28000, zipCodes: ['06500'], isMainCity: false },
    { name: 'Vallauris', slug: 'vallauris', population: 26000, zipCodes: ['06220'], isMainCity: false },
    { name: 'Mandelieu-la-Napoule', slug: 'mandelieu-la-napoule', population: 22000, zipCodes: ['06210'], isMainCity: false },
    { name: 'Mougins', slug: 'mougins', population: 19000, zipCodes: ['06250'], isMainCity: false },
    { name: 'Vence', slug: 'vence', population: 18000, zipCodes: ['06140'], isMainCity: false },
    { name: 'Villeneuve-Loubet', slug: 'villeneuve-loubet', population: 14000, zipCodes: ['06270'], isMainCity: false },
    { name: 'Beausoleil', slug: 'beausoleil', population: 14000, zipCodes: ['06240'], isMainCity: false },
    { name: 'Roquebrune-Cap-Martin', slug: 'roquebrune-cap-martin', population: 12000, zipCodes: ['06190'], isMainCity: false },
    { name: 'Carros', slug: 'carros', population: 12000, zipCodes: ['06510'], isMainCity: false },
    { name: 'La Trinite', slug: 'la-trinite', population: 10000, zipCodes: ['06340'], isMainCity: false }
];

/**
 * Helper functions
 */

export function getCategoryById(id: CategoryId): Category | undefined {
    return PROSPECTION_CATEGORIES.find(c => c.id === id);
}

export function getSubcategoryBySlug(categoryId: CategoryId, slug: string) {
    const category = getCategoryById(categoryId);
    return category?.subcategories.find(s => s.slug === slug);
}

export function getAllSubcategories() {
    return PROSPECTION_CATEGORIES.flatMap(c =>
        c.subcategories.map(s => ({ ...s, categoryId: c.id }))
    );
}

export function getCityByName(name: string): CityData | undefined {
    return CITIES_06.find(c => c.name.toLowerCase() === name.toLowerCase());
}

export function getMainCities(): CityData[] {
    return CITIES_06.filter(c => c.isMainCity);
}

export function getTotalPopulation06(): number {
    return CITIES_06.reduce((sum, city) => sum + city.population, 0);
}
