// Types pour GMB AutoPilot SaaS

export interface GMBBusiness {
    id: string;
    name: string;
    address: string;
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
}

export interface GMBReview {
    id: string;
    businessId: string;
    author: string;
    authorImage?: string;
    rating: number;
    text: string;
    date: Date;
    status: 'pending' | 'responded' | 'skipped';
    response?: string;
    respondedAt?: Date;
    keywords?: string[];
}

export interface ResponseTemplate {
    id: string;
    name: string;
    rating: number; // 1-5 stars
    template: string;
    keywords: string[];
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
    maxBusinesses: number;
    maxReviewsPerMonth: number;
    popular?: boolean;
}

export interface UserSubscription {
    planId: string;
    status: 'active' | 'trial' | 'expired' | 'cancelled';
    startDate: Date;
    endDate: Date;
    businesses: number;
    reviewsThisMonth: number;
}

export interface AIResponseConfig {
    businessName: string;
    keywords: string[];
    tone: 'professional' | 'friendly' | 'enthusiastic';
    reviewText: string;
    reviewRating: number;
    authorName: string;
    includeCallToAction: boolean;
    maxLength: number;
}
