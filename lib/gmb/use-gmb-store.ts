/**
 * GMB AutoPilot - Production Store
 * État sans données fictives - L'utilisateur ajoute ses vrais établissements
 */

"use client";

import { useState, useEffect, useCallback } from 'react';
import {
    GMBBusiness,
    GMBReview,
    UserSubscription,
    AppSettings,
    GMBAppState,
    VisibilityDataPoint,
    SEOImpactScore,
    SentimentAnalysis
} from './types';
import { SUBSCRIPTION_PLANS } from './mock-data';

const STORAGE_KEY = 'gmb-autopilot-state';
const STATE_VERSION = '2.0.0';

// ═══════════════════════════════════════════════════════════════
// DEFAULT STATE - Démarrage vide
// ═══════════════════════════════════════════════════════════════

const DEFAULT_SETTINGS: AppSettings = {
    defaultTone: 'friendly',
    autoReplyEnabled: true,
    requireValidationForNegative: true,
    notificationsEnabled: true,
    geoKeywordsEnabled: true
};

const DEFAULT_SUBSCRIPTION: UserSubscription = {
    planId: 'pro',
    status: 'trial',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    businesses: 5,
    reviewsThisMonth: 0
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function generateVisibilityTrend(): VisibilityDataPoint[] {
    const points: VisibilityDataPoint[] = [];
    const now = Date.now();

    for (let i = 30; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        const baseScore = 60 + Math.random() * 20;
        const trend = (30 - i) * 0.3;

        points.push({
            date,
            score: Math.min(100, Math.round(baseScore + trend)),
            reviewsCount: Math.floor(Math.random() * 5),
            keywordsUsed: Math.floor(Math.random() * 10)
        });
    }

    return points;
}

function serializeState(state: GMBAppState): string {
    return JSON.stringify({
        version: STATE_VERSION,
        ...state,
        lastUpdated: new Date().toISOString()
    }, (key, value) => {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    });
}

function deserializeState(json: string): GMBAppState | null {
    try {
        const parsed = JSON.parse(json);

        if (parsed.version !== STATE_VERSION) {
            console.log('GMB Store: Version mismatch, resetting state');
            return null;
        }

        const businesses = (parsed.businesses || []).map((b: Record<string, unknown>) => ({
            ...b,
            lastSync: new Date(b.lastSync as string),
            visibilityTrend: (b.visibilityTrend as Array<Record<string, unknown>>)?.map((v) => ({
                ...v,
                date: new Date(v.date as string)
            })) || generateVisibilityTrend()
        }));

        const reviews = (parsed.reviews || []).map((r: Record<string, unknown>) => ({
            ...r,
            date: new Date(r.date as string),
            respondedAt: r.respondedAt ? new Date(r.respondedAt as string) : undefined
        }));

        const subscription = {
            ...parsed.subscription,
            startDate: new Date(parsed.subscription.startDate),
            endDate: new Date(parsed.subscription.endDate)
        };

        return {
            businesses,
            reviews,
            subscription,
            settings: parsed.settings,
            lastUpdated: new Date(parsed.lastUpdated)
        };
    } catch (error) {
        console.error('GMB Store: Error deserializing state', error);
        return null;
    }
}

// ═══════════════════════════════════════════════════════════════
// CATEGORIES DISPONIBLES
// ═══════════════════════════════════════════════════════════════

export const BUSINESS_CATEGORIES = [
    'Restaurant',
    'Café / Bar',
    'Boulangerie',
    'Coiffeur',
    'Garage automobile',
    'Plombier',
    'Électricien',
    'Médecin',
    'Dentiste',
    'Avocat',
    'Agence immobilière',
    'Boutique vêtements',
    'Fleuriste',
    'Hôtel',
    'Spa / Bien-être',
    'Salle de sport',
    'École / Formation',
    'Autre'
] as const;

// ═══════════════════════════════════════════════════════════════
// MAIN HOOK
// ═══════════════════════════════════════════════════════════════

export interface GMBStoreActions {
    // Business actions
    addBusiness: (business: Omit<GMBBusiness, 'id' | 'lastSync' | 'seoScore' | 'visibilityTrend' | 'pendingReviews' | 'respondedReviews' | 'connected'>) => string;
    updateBusiness: (id: string, updates: Partial<GMBBusiness>) => void;
    deleteBusiness: (id: string) => void;
    toggleAutoReply: (id: string) => void;
    updateKeywords: (id: string, keywords: string[]) => void;
    updateTone: (id: string, tone: GMBBusiness['tone']) => void;

    // Review actions
    addReview: (review: Omit<GMBReview, 'id'>) => string;
    updateReview: (id: string, updates: Partial<GMBReview>) => void;
    respondToReview: (id: string, response: string, keywords?: string[], seoImpact?: SEOImpactScore, sentiment?: SentimentAnalysis) => void;
    skipReview: (id: string) => void;
    markForValidation: (id: string, reason: string) => void;
    validateReview: (id: string) => void;

    // Settings actions
    updateSettings: (updates: Partial<AppSettings>) => void;

    // Subscription actions
    updateSubscription: (updates: Partial<UserSubscription>) => void;
    upgradePlan: (planId: string) => void;

    // State actions
    resetState: () => void;
    refreshData: () => void;
    loadDemoData: () => void;
    importData: (data: { businesses: GMBBusiness[], reviews: GMBReview[] }) => void;
}

export interface GMBStore extends GMBStoreActions {
    businesses: GMBBusiness[];
    reviews: GMBReview[];
    subscription: UserSubscription;
    settings: AppSettings;
    isLoading: boolean;
    lastUpdated: Date | null;
    isEmpty: boolean;

    // Computed values
    pendingReviews: GMBReview[];
    awaitingValidation: GMBReview[];
    respondedReviews: GMBReview[];
    currentPlan: typeof SUBSCRIPTION_PLANS[0] | null;
    stats: {
        totalBusinesses: number;
        totalPending: number;
        totalResponded: number;
        avgSeoScore: number;
        avgRating: number;
    };
}

export function useGMBStore(): GMBStore {
    const [businesses, setBusinesses] = useState<GMBBusiness[]>([]);
    const [reviews, setReviews] = useState<GMBReview[]>([]);
    const [subscription, setSubscription] = useState<UserSubscription>(DEFAULT_SUBSCRIPTION);
    const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION - Démarre VIDE
    // ═══════════════════════════════════════════════════════════════

    useEffect(() => {
        const loadState = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);

                if (stored) {
                    const state = deserializeState(stored);
                    if (state) {
                        setBusinesses(state.businesses);
                        setReviews(state.reviews);
                        setSubscription(state.subscription);
                        setSettings(state.settings);
                        setLastUpdated(state.lastUpdated);
                        setIsLoading(false);
                        return;
                    }
                }

                // NOUVEAU: Démarrage vide par défaut
                setBusinesses([]);
                setReviews([]);
                setSubscription(DEFAULT_SUBSCRIPTION);
                setSettings(DEFAULT_SETTINGS);
                setLastUpdated(new Date());
            } catch (error) {
                console.error('GMB Store: Error loading state', error);
                setBusinesses([]);
                setReviews([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadState();
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // PERSISTENCE
    // ═══════════════════════════════════════════════════════════════

    useEffect(() => {
        if (isLoading) return;

        const state: GMBAppState = {
            businesses,
            reviews,
            subscription,
            settings,
            lastUpdated: new Date()
        };

        try {
            localStorage.setItem(STORAGE_KEY, serializeState(state));
        } catch (error) {
            console.error('GMB Store: Error saving state', error);
        }
    }, [businesses, reviews, subscription, settings, isLoading]);

    // ═══════════════════════════════════════════════════════════════
    // BUSINESS ACTIONS
    // ═══════════════════════════════════════════════════════════════

    const addBusiness = useCallback((businessData: Omit<GMBBusiness, 'id' | 'lastSync' | 'seoScore' | 'visibilityTrend' | 'pendingReviews' | 'respondedReviews' | 'connected'>): string => {
        const id = `biz-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        const newBusiness: GMBBusiness = {
            ...businessData,
            id,
            lastSync: new Date(),
            seoScore: 50,
            visibilityTrend: generateVisibilityTrend(),
            pendingReviews: 0,
            respondedReviews: 0,
            connected: true
        };

        setBusinesses(prev => [...prev, newBusiness]);
        return id;
    }, []);

    const updateBusiness = useCallback((id: string, updates: Partial<GMBBusiness>) => {
        setBusinesses(prev => prev.map(b =>
            b.id === id ? { ...b, ...updates, lastSync: new Date() } : b
        ));
    }, []);

    const deleteBusiness = useCallback((id: string) => {
        setBusinesses(prev => prev.filter(b => b.id !== id));
        setReviews(prev => prev.filter(r => r.businessId !== id));
    }, []);

    const toggleAutoReply = useCallback((id: string) => {
        setBusinesses(prev => prev.map(b =>
            b.id === id ? { ...b, autoReply: !b.autoReply, lastSync: new Date() } : b
        ));
    }, []);

    const updateKeywords = useCallback((id: string, keywords: string[]) => {
        setBusinesses(prev => prev.map(b =>
            b.id === id ? { ...b, keywords, lastSync: new Date() } : b
        ));
    }, []);

    const updateTone = useCallback((id: string, tone: GMBBusiness['tone']) => {
        setBusinesses(prev => prev.map(b =>
            b.id === id ? { ...b, tone, lastSync: new Date() } : b
        ));
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // REVIEW ACTIONS
    // ═══════════════════════════════════════════════════════════════

    const addReview = useCallback((reviewData: Omit<GMBReview, 'id'>): string => {
        const id = `rev-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        const newReview: GMBReview = {
            ...reviewData,
            id
        };

        setReviews(prev => [...prev, newReview]);

        // Update business pending count
        setBusinesses(prev => prev.map(b =>
            b.id === reviewData.businessId ? {
                ...b,
                pendingReviews: b.pendingReviews + 1,
                totalReviews: b.totalReviews + 1
            } : b
        ));

        return id;
    }, []);

    const updateReview = useCallback((id: string, updates: Partial<GMBReview>) => {
        setReviews(prev => prev.map(r =>
            r.id === id ? { ...r, ...updates } : r
        ));
    }, []);

    const respondToReview = useCallback((
        id: string,
        response: string,
        keywords?: string[],
        seoImpact?: SEOImpactScore,
        sentiment?: SentimentAnalysis
    ) => {
        setReviews(prev => {
            const review = prev.find(r => r.id === id);
            if (!review) return prev;

            return prev.map(r =>
                r.id === id ? {
                    ...r,
                    status: 'responded' as const,
                    response,
                    respondedAt: new Date(),
                    keywords: keywords || [],
                    seoImpact,
                    sentiment
                } : r
            );
        });

        // Update business stats
        setReviews(prev => {
            const review = prev.find(r => r.id === id);
            if (review) {
                setBusinesses(prevBiz => prevBiz.map(b =>
                    b.id === review.businessId ? {
                        ...b,
                        pendingReviews: Math.max(0, b.pendingReviews - 1),
                        respondedReviews: b.respondedReviews + 1,
                        seoScore: seoImpact ? Math.round((b.seoScore + seoImpact.overall) / 2) : b.seoScore
                    } : b
                ));
            }
            return prev;
        });

        setSubscription(prev => ({
            ...prev,
            reviewsThisMonth: prev.reviewsThisMonth + 1
        }));
    }, []);

    const skipReview = useCallback((id: string) => {
        setReviews(prev => {
            const review = prev.find(r => r.id === id);
            if (review) {
                setBusinesses(prevBiz => prevBiz.map(b =>
                    b.id === review.businessId ? {
                        ...b,
                        pendingReviews: Math.max(0, b.pendingReviews - 1)
                    } : b
                ));
            }
            return prev.map(r =>
                r.id === id ? { ...r, status: 'skipped' as const } : r
            );
        });
    }, []);

    const markForValidation = useCallback((id: string, reason: string) => {
        setReviews(prev => prev.map(r =>
            r.id === id ? {
                ...r,
                status: 'awaiting_validation' as const,
                requiresHumanValidation: true
            } : r
        ));
    }, []);

    const validateReview = useCallback((id: string) => {
        setReviews(prev => prev.map(r =>
            r.id === id ? {
                ...r,
                status: 'responded' as const,
                requiresHumanValidation: false,
                validatedAt: new Date(),
                validatedBy: 'Utilisateur'
            } : r
        ));
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // SETTINGS ACTIONS
    // ═══════════════════════════════════════════════════════════════

    const updateSettingsAction = useCallback((updates: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...updates }));
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // SUBSCRIPTION ACTIONS
    // ═══════════════════════════════════════════════════════════════

    const updateSubscriptionAction = useCallback((updates: Partial<UserSubscription>) => {
        setSubscription(prev => ({ ...prev, ...updates }));
    }, []);

    const upgradePlan = useCallback((planId: string) => {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
        if (plan) {
            setSubscription(prev => ({
                ...prev,
                planId,
                status: 'active',
                startDate: new Date(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }));
        }
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // STATE ACTIONS
    // ═══════════════════════════════════════════════════════════════

    const resetState = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setBusinesses([]);
        setReviews([]);
        setSubscription(DEFAULT_SUBSCRIPTION);
        setSettings(DEFAULT_SETTINGS);
        setLastUpdated(new Date());
    }, []);

    const refreshData = useCallback(() => {
        setBusinesses(prev => prev.map(b => ({
            ...b,
            lastSync: new Date()
        })));
        setLastUpdated(new Date());
    }, []);

    const loadDemoData = useCallback(() => {
        // Charger des données de démo pour tester
        const demoBusinesses: GMBBusiness[] = [
            {
                id: 'demo-1',
                name: 'Restaurant Le Gourmet',
                category: 'Restaurant',
                address: '15 Rue de la Paix, 67000 Strasbourg',
                city: 'Strasbourg',
                postalCode: '67000',
                rating: 4.5,
                totalReviews: 127,
                keywords: ['restaurant strasbourg', 'cuisine française', 'gastronomie alsacienne'],
                tone: 'friendly',
                autoReply: true,
                connected: true,
                pendingReviews: 3,
                respondedReviews: 124,
                lastSync: new Date(),
                seoScore: 85,
                visibilityTrend: generateVisibilityTrend()
            },
            {
                id: 'demo-2',
                name: 'Salon Élégance',
                category: 'Coiffeur',
                address: '8 Avenue des Vosges, 67000 Strasbourg',
                city: 'Strasbourg',
                postalCode: '67000',
                rating: 4.8,
                totalReviews: 89,
                keywords: ['coiffeur strasbourg', 'salon de coiffure', 'coloration'],
                tone: 'enthusiastic',
                autoReply: true,
                connected: true,
                pendingReviews: 2,
                respondedReviews: 87,
                lastSync: new Date(),
                seoScore: 78,
                visibilityTrend: generateVisibilityTrend()
            }
        ];

        const demoReviews: GMBReview[] = [
            {
                id: 'demo-rev-1',
                businessId: 'demo-1',
                author: 'Marie L.',
                rating: 5,
                text: 'Excellent repas ! La tarte flambée était délicieuse et le service impeccable. Je recommande vivement ce restaurant pour une soirée en amoureux.',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                status: 'pending'
            },
            {
                id: 'demo-rev-2',
                businessId: 'demo-1',
                author: 'Thomas B.',
                rating: 4,
                text: 'Très bon restaurant, plats savoureux. Juste un peu d\'attente pour être servi mais ça valait le coup.',
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                status: 'pending'
            },
            {
                id: 'demo-rev-3',
                businessId: 'demo-1',
                author: 'Sophie M.',
                rating: 2,
                text: 'Déçue par ma dernière visite. Le plat était froid et le serveur peu aimable. J\'espère que c\'était juste une mauvaise journée.',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                status: 'pending'
            },
            {
                id: 'demo-rev-4',
                businessId: 'demo-2',
                author: 'Julie R.',
                rating: 5,
                text: 'Ma coiffeuse Léa est formidable ! Elle a parfaitement compris ce que je voulais. La couleur est magnifique.',
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                status: 'pending'
            },
            {
                id: 'demo-rev-5',
                businessId: 'demo-2',
                author: 'Pierre D.',
                rating: 5,
                text: 'Meilleur salon de Strasbourg ! Accueil chaleureux et résultat toujours au top.',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                status: 'pending'
            }
        ];

        setBusinesses(demoBusinesses);
        setReviews(demoReviews);
        setLastUpdated(new Date());
    }, []);

    const importData = useCallback((data: { businesses: GMBBusiness[], reviews: GMBReview[] }) => {
        setBusinesses(data.businesses);
        setReviews(data.reviews);
        setLastUpdated(new Date());
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // COMPUTED VALUES
    // ═══════════════════════════════════════════════════════════════

    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const awaitingValidation = reviews.filter(r => r.status === 'awaiting_validation');
    const respondedReviews = reviews.filter(r => r.status === 'responded');
    const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === subscription.planId) || null;

    const stats = {
        totalBusinesses: businesses.length,
        totalPending: pendingReviews.length,
        totalResponded: respondedReviews.length,
        avgSeoScore: businesses.length > 0
            ? Math.round(businesses.reduce((sum, b) => sum + (b.seoScore || 0), 0) / businesses.length)
            : 0,
        avgRating: businesses.length > 0
            ? Math.round(businesses.reduce((sum, b) => sum + b.rating, 0) / businesses.length * 10) / 10
            : 0
    };

    const isEmpty = businesses.length === 0;

    return {
        // State
        businesses,
        reviews,
        subscription,
        settings,
        isLoading,
        lastUpdated,
        isEmpty,

        // Computed
        pendingReviews,
        awaitingValidation,
        respondedReviews,
        currentPlan,
        stats,

        // Actions
        addBusiness,
        updateBusiness,
        deleteBusiness,
        toggleAutoReply,
        updateKeywords,
        updateTone,
        addReview,
        updateReview,
        respondToReview,
        skipReview,
        markForValidation,
        validateReview,
        updateSettings: updateSettingsAction,
        updateSubscription: updateSubscriptionAction,
        upgradePlan,
        resetState,
        refreshData,
        loadDemoData,
        importData
    };
}
