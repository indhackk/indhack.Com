// Types pour GMB AutoPilot SaaS - Version Premium

// ═══════════════════════════════════════════════════════════════
// CORE BUSINESS TYPES
// ═══════════════════════════════════════════════════════════════

export interface GMBBusiness {
    id: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    category: string;
    rating: number;
    totalReviews: number;
    pendingReviews: number;
    respondedReviews: number;
    connected: boolean;
    lastSync: Date;
    keywords: string[];
    tone: 'professional' | 'friendly' | 'enthusiastic';
    autoReply: boolean;
    seoScore: number; // 0-100
    visibilityTrend: VisibilityDataPoint[];
}

export interface VisibilityDataPoint {
    date: Date;
    score: number;
    reviewsCount: number;
    keywordsUsed: number;
}

export interface GMBReview {
    id: string;
    businessId: string;
    author: string;
    authorImage?: string;
    rating: number;
    text: string;
    date: Date;
    status: 'pending' | 'responded' | 'skipped' | 'awaiting_validation';
    response?: string;
    respondedAt?: Date;
    keywords?: string[];
    sentiment?: SentimentAnalysis;
    seoImpact?: SEOImpactScore;
    requiresHumanValidation?: boolean;
    validatedBy?: string;
    validatedAt?: Date;
}

// ═══════════════════════════════════════════════════════════════
// SENTIMENT ANALYSIS (Éthique)
// ═══════════════════════════════════════════════════════════════

export interface SentimentAnalysis {
    score: number; // -1 to 1
    label: 'positive' | 'neutral' | 'negative' | 'critical';
    confidence: number; // 0-100
    emotions: EmotionBreakdown;
    urgency: 'low' | 'medium' | 'high';
    requiresEmpathy: boolean;
    suggestedTone: 'empathetic' | 'apologetic' | 'grateful' | 'professional';
}

export interface EmotionBreakdown {
    joy: number;
    satisfaction: number;
    frustration: number;
    disappointment: number;
    anger: number;
}

// ═══════════════════════════════════════════════════════════════
// SEO IMPACT SCORING
// ═══════════════════════════════════════════════════════════════

export interface SEOImpactScore {
    overall: number; // 0-100
    breakdown: {
        keywordRelevance: number;
        keywordPlacement: number;
        naturalIntegration: number;
        localSEO: number;
        responseLength: number;
        callToAction: number;
    };
    suggestions: SEOSuggestion[];
    projectedVisibilityBoost: number; // percentage
}

export interface SEOSuggestion {
    type: 'keyword' | 'structure' | 'local' | 'cta';
    priority: 'low' | 'medium' | 'high';
    message: string;
    impact: number; // potential score gain
}

// ═══════════════════════════════════════════════════════════════
// GEO-SEO KEYWORDS ENGINE
// ═══════════════════════════════════════════════════════════════

export interface GeoKeyword {
    keyword: string;
    type: 'primary' | 'secondary' | 'long-tail' | 'local';
    searchVolume: number; // estimated monthly searches
    difficulty: 'easy' | 'medium' | 'hard';
    relevanceScore: number; // 0-100
    city?: string;
}

export interface KeywordSuggestion {
    keyword: string;
    type: GeoKeyword['type'];
    reason: string;
    estimatedImpact: number;
    example: string; // How it would fit in a response
}

export interface CityKeywordProfile {
    city: string;
    region: string;
    population: number;
    primaryKeywords: string[];
    localExpressions: string[];
    competitors: string[];
}

// ═══════════════════════════════════════════════════════════════
// AI RESPONSE GENERATION
// ═══════════════════════════════════════════════════════════════

export interface AIResponseConfig {
    businessName: string;
    businessCity: string;
    businessCategory: string;
    keywords: string[];
    tone: 'professional' | 'friendly' | 'enthusiastic';
    reviewText: string;
    reviewRating: number;
    authorName: string;
    includeCallToAction?: boolean;
    maxLength?: number;
    forcedEmpathy?: boolean;
    geoKeywords?: GeoKeyword[];
}

export interface AIResponse {
    text: string;
    metadata: AIResponseMetadata;
    alternativeVersions: string[];
}

export interface AIResponseMetadata {
    sentiment: SentimentAnalysis;
    seoImpact: SEOImpactScore;
    usedKeywords: string[];
    naturalLanguageScore: number; // How natural the keyword integration is
    requiresValidation: boolean;
    validationReason?: string;
    generatedAt: Date;
    processingTimeMs: number;
}

// ═══════════════════════════════════════════════════════════════
// SUBSCRIPTION & BILLING
// ═══════════════════════════════════════════════════════════════

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
    maxBusinesses: number;
    maxReviewsPerMonth: number;
    popular?: boolean;
    badge?: string;
}

export interface UserSubscription {
    planId: string;
    status: 'active' | 'trial' | 'expired' | 'cancelled';
    startDate: Date;
    endDate: Date;
    businesses: number;
    reviewsThisMonth: number;
}

// ═══════════════════════════════════════════════════════════════
// RESPONSE TEMPLATES
// ═══════════════════════════════════════════════════════════════

export interface ResponseTemplate {
    id: string;
    name: string;
    rating: number;
    template: string;
    keywords: string[];
    sentiment: SentimentAnalysis['label'];
}

// ═══════════════════════════════════════════════════════════════
// ANALYTICS & METRICS
// ═══════════════════════════════════════════════════════════════

export interface BusinessAnalytics {
    businessId: string;
    period: 'day' | 'week' | 'month';
    metrics: {
        totalResponses: number;
        avgSEOScore: number;
        avgResponseTime: number;
        keywordsUsed: string[];
        sentimentBreakdown: {
            positive: number;
            neutral: number;
            negative: number;
        };
        visibilityTrend: VisibilityDataPoint[];
    };
}

// ═══════════════════════════════════════════════════════════════
// LOCAL STORAGE PERSISTENCE
// ═══════════════════════════════════════════════════════════════

export interface GMBAppState {
    businesses: GMBBusiness[];
    reviews: GMBReview[];
    subscription: UserSubscription;
    settings: AppSettings;
    lastUpdated: Date;
}

export interface AppSettings {
    defaultTone: AIResponseConfig['tone'];
    autoReplyEnabled: boolean;
    requireValidationForNegative: boolean;
    notificationsEnabled: boolean;
    geoKeywordsEnabled: boolean;
}
