/**
 * Types pour le système de prospection 06
 * Entreprises sans site web - Alpes-Maritimes
 */

// Catégories principales
export type CategoryId = 'RESTAURATION' | 'SANTE' | 'ARTISANS';

// Statut de prospection
export type ProspectStatus = 'new' | 'contacted' | 'responded' | 'converted' | 'rejected';

// Type de téléphone
export type PhoneType = 'mobile' | 'landline' | 'unknown';

// Canal de contact
export type ContactChannel = 'whatsapp' | 'email' | 'sms';

/**
 * Prospect - Une entreprise sans site web
 */
export interface Prospect {
    // Identification
    id: string;                          // SHA-256 hash of name+address
    name: string;                        // "Pizzeria Da Luigi"
    slug: string;                        // "pizzeria-da-luigi"

    // Classification
    category: CategoryId;
    subcategory: string;                 // "pizzeria", "dentiste", "plombier"
    metierSlug: string;                  // Maps to diagnostic-data.ts

    // Location
    ville: string;                       // "Nice"
    quartier?: string;                   // "Vieux Nice"
    address: string;                     // Full address
    zipCode: string;                     // "06000"
    coordinates?: {
        lat: number;
        lng: number;
    };

    // Google Data
    rating: number;                      // 4.5
    reviewCount: number;                 // 155
    hasWebsite: boolean;                 // false (filter criteria)
    placeId?: string;                    // Google Place ID

    // Contact Info
    phone?: string;                      // "06 12 34 56 78"
    phoneType: PhoneType;
    phoneClean?: string;                 // "33612345678" (for wa.me)
    email?: string;
    instagram?: string;
    facebook?: string;

    // Prospection Status
    status: ProspectStatus;
    contactedAt?: string;                // ISO date
    contactMethod?: ContactChannel;
    responseDate?: string;
    notes?: string;

    // Generated URLs
    diagnosticUrl: string;               // Full URL with query params
    whatsappUrl?: string;                // wa.me link with message

    // Metadata
    scrapedAt: string;                   // ISO date
    source: 'google-maps' | 'manual';
    lastUpdated: string;
}

/**
 * Sous-catégorie de métier
 */
export interface Subcategory {
    slug: string;                        // "pizzeria"
    label: string;                       // "Pizzeria"
    labelPlural: string;                 // "Pizzerias"
    searchQueries: string[];             // ["pizzeria", "pizza", "pizzaiolo"]
    metierSlug: string;                  // Link to diagnostic-data.ts
    estimatedVolume: number;             // Monthly search volume (Nice reference)
    averageTicket: number;               // EUR
    icon?: string;                       // Lucide icon name
}

/**
 * Template de message
 */
export interface MessageTemplate {
    whatsapp: {
        greeting: string;
        hook: string;
        value: string;
        cta: string;
        signature: string;
    };
    email: {
        subject: string;
        greeting: string;
        hook: string;
        value: string;
        cta: string;
        signature: string;
    };
}

/**
 * Catégorie principale
 */
export interface Category {
    id: CategoryId;
    label: string;                       // "Restauration"
    labelPlural: string;                 // "Restaurateurs"
    description: string;
    accentColor: string;                 // Hex color
    icon: string;                        // Lucide icon name
    subcategories: Subcategory[];
    messageTemplate: MessageTemplate;
}

/**
 * Données de ville pour estimation volume
 */
export interface CityData {
    name: string;
    slug: string;
    population: number;
    zipCodes: string[];
    isMainCity: boolean;
}

/**
 * Résultat de scraping brut
 */
export interface ScrapedBusiness {
    name: string;
    rating?: number;
    reviewCount?: number;
    address?: string;
    phone?: string;
    website?: string;
    placeId?: string;
    category?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

/**
 * Configuration du scraper
 */
export interface ScraperConfig {
    headless: boolean;
    slowMo: number;
    maxResultsPerSearch: number;
    scrollDelay: number;
    betweenSearchDelay: number;
    cities: string[];
    categories: CategoryId[];
    outputDir: string;
}

/**
 * Base de données prospects
 */
export interface ProspectDatabase {
    version: string;
    generatedAt: string;
    lastUpdated: string;
    statistics: {
        total: number;
        byCategory: Record<CategoryId, number>;
        byCity: Record<string, number>;
        byStatus: Record<ProspectStatus, number>;
    };
    prospects: Prospect[];
}

/**
 * Keyword suggestion from Autocomplete
 */
export interface KeywordSuggestion {
    keyword: string;
    source: 'google-autocomplete' | 'manual';
    baseQuery: string;
    estimatedVolume?: number;
}

/**
 * Export CSV row
 */
export interface CsvExportRow {
    id: string;
    category: string;
    subcategory: string;
    name: string;
    city: string;
    rating: number;
    reviews: number;
    phone: string;
    phoneType: string;
    diagnosticUrl: string;
    whatsappUrl: string;
    emailSubject: string;
    whatsappMessage: string;
    status: string;
}
