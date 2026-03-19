"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, MessageSquare, Settings, CreditCard, Plus, Search,
    TrendingUp, Star, Clock, Zap, Bell, ChevronDown, Filter, BarChart3, RefreshCw,
    Chrome, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "./BusinessCard";
import { ReviewCard } from "./ReviewCard";
import { ConnectGoogleModal } from "./ConnectGoogleModal";
import { StatsCard } from "./StatsCard";
import { EmptyState } from "./EmptyState";
import { Sidebar, MobileNav } from "./Sidebar";
import { GMBBusiness, GMBReview } from "@/lib/gmb/types";
import { MOCK_BUSINESSES, MOCK_REVIEWS, SUBSCRIPTION_PLANS } from "@/lib/gmb/mock-data";
import {
    getSimulatedConnection,
    isSimulationMode,
    disconnectSimulation,
    disconnectAll
} from "@/lib/gmb/google-business-api";

type Tab = 'dashboard' | 'reviews' | 'settings' | 'billing';

interface DashboardProps {
    onUpgrade?: () => void;
}

export function Dashboard({ onUpgrade }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [businesses, setBusinesses] = useState<GMBBusiness[]>(MOCK_BUSINESSES);
    const [reviews, setReviews] = useState<GMBReview[]>(MOCK_REVIEWS);
    const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'responded'>('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [isHydrated, setIsHydrated] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [isGoogleConnected, setIsGoogleConnected] = useState(false);
    const [connectedEmail, setConnectedEmail] = useState<string | null>(null);

    // Check Google connection status
    useEffect(() => {
        const connection = getSimulatedConnection();
        if (connection) {
            setIsGoogleConnected(true);
            setConnectedEmail(connection.email);
        }
    }, []);

    // Hydratation depuis le localStorage
    useEffect(() => {
        const savedBusinesses = localStorage.getItem('gmb_businesses');
        const savedReviews = localStorage.getItem('gmb_reviews');

        if (savedBusinesses) {
            try {
                setBusinesses(JSON.parse(savedBusinesses));
            } catch (e) {
                console.error("Failed to parse businesses", e);
            }
        }

        if (savedReviews) {
            try {
                setReviews(JSON.parse(savedReviews));
            } catch (e) {
                console.error("Failed to parse reviews", e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Handle Google connection refresh
    const handleGoogleConnected = () => {
        const connection = getSimulatedConnection();
        if (connection) {
            setIsGoogleConnected(true);
            setConnectedEmail(connection.email);
        }
        // Refresh the page to load new data
        window.location.reload();
    };

    // Handle disconnect
    const handleDisconnect = () => {
        disconnectAll();
        setIsGoogleConnected(false);
        setConnectedEmail(null);
        localStorage.removeItem('gmb_businesses');
        localStorage.removeItem('gmb_reviews');
        setBusinesses(MOCK_BUSINESSES);
        setReviews(MOCK_REVIEWS);
    };

    // Sauvegarde auto
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('gmb_businesses', JSON.stringify(businesses));
            localStorage.setItem('gmb_reviews', JSON.stringify(reviews));
        }
    }, [businesses, reviews, isHydrated]);

    // Stats globales
    const totalPending = businesses.reduce((sum, b) => sum + b.pendingReviews, 0);
    const totalResponded = businesses.reduce((sum, b) => sum + b.respondedReviews, 0);
    const avgRating = (businesses.reduce((sum, b) => sum + b.rating, 0) / businesses.length).toFixed(1);

    // Filtrer les avis
    const filteredReviews = reviews.filter(review => {
        if (selectedBusiness && review.businessId !== selectedBusiness) return false;
        if (filterStatus !== 'all' && review.status !== filterStatus) return false;
        if (searchQuery && !review.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !review.author.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Handlers
    const handleRespond = (reviewId: string, response: string) => {
        setReviews(prev => prev.map(r =>
            r.id === reviewId
                ? { ...r, status: 'responded' as const, response, respondedAt: new Date() }
                : r
        ));
        // Mettre à jour les stats de la business
        const review = reviews.find(r => r.id === reviewId);
        if (review) {
            setBusinesses(prev => prev.map(b =>
                b.id === review.businessId
                    ? { ...b, pendingReviews: b.pendingReviews - 1, respondedReviews: b.respondedReviews + 1 }
                    : b
            ));
        }
    };

    const handleSkip = (reviewId: string) => {
        setReviews(prev => prev.map(r =>
            r.id === reviewId ? { ...r, status: 'skipped' as const } : r
        ));
        const review = reviews.find(r => r.id === reviewId);
        if (review) {
            setBusinesses(prev => prev.map(b =>
                b.id === review.businessId
                    ? { ...b, pendingReviews: b.pendingReviews - 1 }
                    : b
            ));
        }
    };

    const handleToggleAutoReply = (businessId: string) => {
        setBusinesses(prev => prev.map(b =>
            b.id === businessId ? { ...b, autoReply: !b.autoReply } : b
        ));
    };

    const tabs = [
        { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'reviews' as Tab, label: 'Avis', icon: MessageSquare, badge: totalPending },
        { id: 'settings' as Tab, label: 'Paramètres', icon: Settings },
        { id: 'billing' as Tab, label: 'Abonnement', icon: CreditCard },
    ];

    return (
        <>
        <ConnectGoogleModal
            isOpen={isConnectModalOpen}
            onClose={() => setIsConnectModalOpen(false)}
            onConnected={handleGoogleConnected}
        />
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-sauge to-sauge/80 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-ink">GMB AutoPilot</h1>
                                <p className="text-xs text-gray-500">by IndHack</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-sauge/10 text-sauge'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    {tab.badge && tab.badge > 0 && (
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell className="w-5 h-5" />
                                {totalPending > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                )}
                            </button>
                            {isGoogleConnected ? (
                                <div className="flex items-center gap-2">
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
                                        <Chrome className="w-4 h-4" />
                                        <span className="max-w-[150px] truncate">{connectedEmail}</span>
                                    </div>
                                    <Button
                                        onClick={() => setIsConnectModalOpen(true)}
                                        className="bg-sauge hover:bg-sauge/90 text-white rounded-xl text-sm"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Ajouter une fiche
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => setIsConnectModalOpen(true)}
                                    className="bg-sauge hover:bg-sauge/90 text-white rounded-xl text-sm"
                                >
                                    <Chrome className="w-4 h-4 mr-1" />
                                    Connecter Google
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <nav className="md:hidden bg-white border-b border-gray-100 px-4 py-2 overflow-x-auto">
                <div className="flex gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-sauge/10 text-sauge'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.badge && tab.badge > 0 && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!isHydrated ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="flex flex-col items-center gap-4">
                            <RefreshCw className="w-10 h-10 text-sauge animate-spin" />
                            <p className="text-soft font-medium">Initialisation de l'agent IA...</p>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                {/* Stats Overview */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatsCard
                                        icon={<MessageSquare className="w-5 h-5 text-amber-600" />}
                                        label="Avis en attente"
                                        value={totalPending}
                                        bgGradient="from-amber-50 to-amber-100/50"
                                        delay={0}
                                    />
                                    <StatsCard
                                        icon={<MessageSquare className="w-5 h-5 text-green-600" />}
                                        label="Réponses ce mois"
                                        value={totalResponded}
                                        change={12}
                                        bgGradient="from-green-50 to-green-100/50"
                                        delay={0.1}
                                    />
                                    <StatsCard
                                        icon={<Star className="w-5 h-5 text-yellow-600" />}
                                        label="Note moyenne"
                                        value={avgRating}
                                        change={3}
                                        bgGradient="from-yellow-50 to-yellow-100/50"
                                        delay={0.2}
                                    />
                                    <StatsCard
                                        icon={<TrendingUp className="w-5 h-5 text-sauge" />}
                                        label="Fiches gérées"
                                        value={businesses.length}
                                        bgGradient="from-sauge/10 to-sauge/20"
                                        delay={0.3}
                                    />
                                </div>

                                {/* Business Cards */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-ink">Vos fiches Google</h2>
                                        <Button variant="outline" className="rounded-xl text-sm">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Connecter une fiche
                                        </Button>
                                    </div>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {businesses.map(business => (
                                            <BusinessCard
                                                key={business.id}
                                                business={business}
                                                isSelected={selectedBusiness === business.id}
                                                onSelect={() => {
                                                    setSelectedBusiness(business.id);
                                                    setActiveTab('reviews');
                                                }}
                                                onToggleAutoReply={() => handleToggleAutoReply(business.id)}
                                            />
                                        ))}
                                    </div>
                                </section>

                                {/* Recent Activity */}
                                <section>
                                    <h2 className="text-xl font-bold text-ink mb-4">Derniers avis en attente</h2>
                                    <div className="space-y-4">
                                        {reviews
                                            .filter(r => r.status === 'pending')
                                            .slice(0, 3)
                                            .map(review => {
                                                const business = businesses.find(b => b.id === review.businessId);
                                                if (!business) return null;
                                                return (
                                                    <ReviewCard
                                                        key={review.id}
                                                        review={review}
                                                        business={business}
                                                        onRespond={handleRespond}
                                                        onSkip={handleSkip}
                                                    />
                                                );
                                            })}
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === 'reviews' && (
                            <motion.div
                                key="reviews"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Filters */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Rechercher un avis..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedBusiness || ''}
                                            onChange={(e) => setSelectedBusiness(e.target.value || null)}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge bg-white"
                                        >
                                            <option value="">Toutes les fiches</option>
                                            {businesses.map(b => (
                                                <option key={b.id} value={b.id}>{b.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'responded')}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge bg-white"
                                        >
                                            <option value="all">Tous</option>
                                            <option value="pending">En attente</option>
                                            <option value="responded">Répondus</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-4">
                                    {filteredReviews.length === 0 ? (
                                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500">Aucun avis trouvé</p>
                                        </div>
                                    ) : (
                                        filteredReviews.map(review => {
                                            const business = businesses.find(b => b.id === review.businessId);
                                            if (!business) return null;
                                            return (
                                                <ReviewCard
                                                    key={review.id}
                                                    review={review}
                                                    business={business}
                                                    onRespond={handleRespond}
                                                    onSkip={handleSkip}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <SettingsPanel businesses={businesses} setBusinesses={setBusinesses} />
                            </motion.div>
                        )}

                        {activeTab === 'billing' && (
                            <motion.div
                                key="billing"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <BillingPanel />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </main>
        </div>
        </>
    );
}

function SettingsPanel({ businesses, setBusinesses }: {
    businesses: GMBBusiness[];
    setBusinesses: React.Dispatch<React.SetStateAction<GMBBusiness[]>>;
}) {
    const [selectedBiz, setSelectedBiz] = useState<string>(businesses[0]?.id || '');
    const business = businesses.find(b => b.id === selectedBiz);
    const connection = getSimulatedConnection();

    const updateBusiness = (updates: Partial<GMBBusiness>) => {
        setBusinesses(prev => prev.map(b =>
            b.id === selectedBiz ? { ...b, ...updates } : b
        ));
    };

    const handleDisconnectGoogle = () => {
        if (confirm('Êtes-vous sûr de vouloir déconnecter votre compte Google ? Toutes vos fiches seront supprimées.')) {
            disconnectAll();
            window.location.reload();
        }
    };

    if (!business) return null;

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-ink mb-2">Paramètres</h2>
                <p className="text-gray-500">Configurez vos préférences de réponse automatique</p>
            </div>

            {/* Google Account Section */}
            {connection && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-semibold text-ink mb-4">Compte Google connecté</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                <Chrome className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-ink">{connection.email}</p>
                                <p className="text-sm text-gray-500">
                                    Connecté le {connection.connectedAt.toLocaleDateString('fr-FR')}
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={handleDisconnectGoogle}
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Déconnecter
                        </Button>
                    </div>
                </div>
            )}

            {/* Business Selector */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiche à configurer
                </label>
                <select
                    value={selectedBiz}
                    onChange={(e) => setSelectedBiz(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge bg-white"
                >
                    {businesses.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>

            {/* Tone Selection */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-ink mb-4">Tonalité des réponses</h3>
                <div className="grid grid-cols-3 gap-3">
                    {(['professional', 'friendly', 'enthusiastic'] as const).map(tone => (
                        <button
                            key={tone}
                            onClick={() => updateBusiness({ tone })}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${business.tone === tone
                                ? 'border-sauge bg-sauge/5'
                                : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            <span className="text-2xl mb-2 block">
                                {tone === 'professional' ? '💼' : tone === 'friendly' ? '😊' : '🎉'}
                            </span>
                            <span className="text-sm font-medium text-ink capitalize">
                                {tone === 'professional' ? 'Professionnel' : tone === 'friendly' ? 'Amical' : 'Enthousiaste'}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-ink mb-2">Mots-clés SEO</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Ces mots-clés seront intégrés naturellement dans vos réponses pour booster votre référencement local
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {business.keywords.map((kw, i) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 bg-sauge/10 text-white text-sm rounded-full flex items-center gap-2"
                        >
                            {kw}
                            <button
                                onClick={() => updateBusiness({
                                    keywords: business.keywords.filter((_, idx) => idx !== i)
                                })}
                                className="hover:text-red-500"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Ajouter un mot-clé..."
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value) {
                                updateBusiness({
                                    keywords: [...business.keywords, e.currentTarget.value]
                                });
                                e.currentTarget.value = '';
                            }
                        }}
                    />
                    <Button className="bg-sauge hover:bg-sauge/90 text-white rounded-xl">
                        Ajouter
                    </Button>
                </div>
            </div>

            {/* Auto-reply */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-ink">Réponse automatique</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            L'IA répondra automatiquement aux nouveaux avis selon vos paramètres
                        </p>
                    </div>
                    <button
                        onClick={() => updateBusiness({ autoReply: !business.autoReply })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${business.autoReply ? 'bg-sauge' : 'bg-gray-300'
                            }`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${business.autoReply ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function BillingPanel() {
    const currentPlan = SUBSCRIPTION_PLANS[1]; // Pro plan

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-ink mb-2">Abonnement</h2>
                <p className="text-gray-500">Gérez votre abonnement GMB AutoPilot</p>
            </div>

            {/* Current Plan */}
            <div className="bg-gradient-to-br from-sauge to-sauge/80 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-white/70 text-sm">Plan actuel</p>
                        <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">{currentPlan.price}€</p>
                        <p className="text-white/70 text-sm">/mois</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-white/20 rounded-full">Actif</span>
                    <span>Prochain renouvellement: 15 février 2026</span>
                </div>
            </div>

            {/* All Plans */}
            <div className="grid md:grid-cols-3 gap-6">
                {SUBSCRIPTION_PLANS.map(plan => (
                    <div
                        key={plan.id}
                        className={`relative bg-white rounded-2xl border-2 p-6 ${plan.popular ? 'border-sauge' : 'border-gray-100'
                            }`}
                    >
                        {plan.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-sauge text-white text-xs font-medium rounded-full">
                                Populaire
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-ink mb-2">{plan.name}</h3>
                        <div className="mb-4">
                            <span className="text-3xl font-bold text-ink">{plan.price}€</span>
                            <span className="text-gray-500">/mois</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 bg-sauge rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button
                            className={`w-full rounded-xl ${plan.id === currentPlan.id
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : plan.popular
                                    ? 'bg-sauge hover:bg-sauge/90 text-white'
                                    : 'bg-gray-100 text-ink hover:bg-gray-200'
                                }`}
                            disabled={plan.id === currentPlan.id}
                        >
                            {plan.id === currentPlan.id ? 'Plan actuel' : plan.price === 0 ? 'Essayer' : 'Choisir'}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Usage Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-ink mb-4">Utilisation ce mois</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Fiches connectées</span>
                            <span className="font-medium text-ink">3 / 3</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sauge rounded-full" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Réponses générées</span>
                            <span className="font-medium text-ink">87 / illimité</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
