"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogOut, Star, MessageSquare, TrendingUp, Target,
    Sparkles, CheckCircle2, AlertTriangle, X, RefreshCw,
    Building2, Send, Wand2, BarChart3, Settings, Crown,
    Bell, Search, Zap, Plus, ArrowRight, LayoutGrid,
    ChevronDown, Copy, Check, Shield, Rocket, Package,
    Link2, QrCode, Calendar, Users, FileText, ExternalLink,
    Globe, Wifi, WifiOff, ChevronRight, MoreHorizontal,
    Download, Share2, Eye, PenLine, Trash2, Clock,
    TrendingDown, Minus, Filter, SlidersHorizontal,
    Command, Keyboard, Hash, AtSign, MapPin
} from "lucide-react";
import { useAuth } from "@/lib/gmb/auth-context";
import { useGMBStore, BUSINESS_CATEGORIES } from "@/lib/gmb/use-gmb-store";
import { generateAIResponse } from "@/lib/gmb/ai-response-generator";
import { GMBReview, GMBBusiness, AIResponse } from "@/lib/gmb/types";
import {
    isConnectedToGoogle,
    simulateGoogleConnection,
    getSimulatedConnection,
    disconnectAll,
    SimulatedConnection
} from "@/lib/gmb/google-business-api";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

type View = 'dashboard' | 'reviews' | 'responses' | 'analytics' | 'requests' | 'posts' | 'settings';

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function DashboardPage() {
    const router = useRouter();
    const { user, isLoading: authLoading, logout, isAuthenticated, completeOnboarding } = useAuth();
    const store = useGMBStore();

    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showAddBusiness, setShowAddBusiness] = useState(false);
    const [googleConnection, setGoogleConnection] = useState<SimulatedConnection | null>(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Check Google connection
    useEffect(() => {
        const conn = getSimulatedConnection();
        setGoogleConnection(conn);
    }, []);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setShowCommandPalette(true);
            }
            if (e.key === 'Escape') {
                setShowCommandPalette(false);
                setShowConnectModal(false);
                setShowAddBusiness(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const handleGoogleConnect = (email: string) => {
        const conn = simulateGoogleConnection(email);
        setGoogleConnection(conn);
        setShowConnectModal(false);
        if (!user?.onboardingCompleted) {
            completeOnboarding();
        }
    };

    const handleGoogleDisconnect = () => {
        disconnectAll();
        setGoogleConnection(null);
        store.resetState();
    };

    // Loading
    if (authLoading || store.isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 animate-pulse" />
                        <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </div>
                    <p className="text-zinc-500 text-sm">Chargement...</p>
                </motion.div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white flex">
            {/* Command Palette */}
            <AnimatePresence>
                {showCommandPalette && (
                    <CommandPalette
                        onClose={() => setShowCommandPalette(false)}
                        onNavigate={setCurrentView}
                        onAddBusiness={() => { setShowCommandPalette(false); setShowAddBusiness(true); }}
                    />
                )}
            </AnimatePresence>

            {/* Connect Modal */}
            <AnimatePresence>
                {showConnectModal && (
                    <ConnectGoogleModal
                        onClose={() => setShowConnectModal(false)}
                        onConnect={handleGoogleConnect}
                    />
                )}
            </AnimatePresence>

            {/* Add Business Modal */}
            <AnimatePresence>
                {showAddBusiness && (
                    <AddBusinessModal
                        onClose={() => setShowAddBusiness(false)}
                        onAdd={(business) => {
                            store.addBusiness(business);
                            setShowAddBusiness(false);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 72 : 260 }}
                className="h-screen sticky top-0 border-r border-zinc-800/50 bg-[#0a0a0b] flex flex-col"
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        {!sidebarCollapsed && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <span className="font-semibold text-white">GMB AutoPilot</span>
                                <span className="ml-2 px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-medium rounded">PRO</span>
                            </motion.div>
                        )}
                    </div>
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                    </button>
                </div>

                {/* Search */}
                {!sidebarCollapsed && (
                    <div className="p-3">
                        <button
                            onClick={() => setShowCommandPalette(true)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-left transition-colors group"
                        >
                            <Search className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" />
                            <span className="flex-1 text-sm text-zinc-500">Rechercher...</span>
                            <kbd className="px-1.5 py-0.5 bg-zinc-800 text-zinc-500 text-[10px] rounded font-mono">⌘K</kbd>
                        </button>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    <NavItem
                        icon={<LayoutGrid className="w-5 h-5" />}
                        label="Dashboard"
                        active={currentView === 'dashboard'}
                        onClick={() => setCurrentView('dashboard')}
                        collapsed={sidebarCollapsed}
                    />
                    <NavItem
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="Avis"
                        active={currentView === 'reviews'}
                        onClick={() => setCurrentView('reviews')}
                        collapsed={sidebarCollapsed}
                        badge={store.stats.totalPending}
                    />
                    <NavItem
                        icon={<Sparkles className="w-5 h-5" />}
                        label="Réponses IA"
                        active={currentView === 'responses'}
                        onClick={() => setCurrentView('responses')}
                        collapsed={sidebarCollapsed}
                    />
                    <NavItem
                        icon={<BarChart3 className="w-5 h-5" />}
                        label="Analytics"
                        active={currentView === 'analytics'}
                        onClick={() => setCurrentView('analytics')}
                        collapsed={sidebarCollapsed}
                    />

                    {!sidebarCollapsed && (
                        <div className="pt-4 pb-2">
                            <span className="px-3 text-[11px] font-medium text-zinc-600 uppercase tracking-wider">Outils</span>
                        </div>
                    )}

                    <NavItem
                        icon={<Link2 className="w-5 h-5" />}
                        label="Demander des avis"
                        active={currentView === 'requests'}
                        onClick={() => setCurrentView('requests')}
                        collapsed={sidebarCollapsed}
                    />
                    <NavItem
                        icon={<Calendar className="w-5 h-5" />}
                        label="Posts planifiés"
                        active={currentView === 'posts'}
                        onClick={() => setCurrentView('posts')}
                        collapsed={sidebarCollapsed}
                    />
                    <NavItem
                        icon={<Settings className="w-5 h-5" />}
                        label="Paramètres"
                        active={currentView === 'settings'}
                        onClick={() => setCurrentView('settings')}
                        collapsed={sidebarCollapsed}
                    />
                </nav>

                {/* Connection Status */}
                <div className="p-3 border-t border-zinc-800/50">
                    {googleConnection ? (
                        <div className={`flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`}>
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Wifi className="w-4 h-4 text-emerald-400" />
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-emerald-400">Connecté</p>
                                    <p className="text-[11px] text-zinc-500 truncate">{googleConnection.email}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowConnectModal(true)}
                            className={`w-full flex items-center gap-3 p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
                        >
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                <WifiOff className="w-4 h-4 text-zinc-500" />
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 text-left">
                                    <p className="text-xs font-medium text-white">Connecter Google</p>
                                    <p className="text-[11px] text-zinc-500">Lier votre fiche GMB</p>
                                </div>
                            )}
                        </button>
                    )}
                </div>

                {/* User */}
                <div className="p-3 border-t border-zinc-800/50">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 p-2 hover:bg-zinc-900 rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        {!sidebarCollapsed && (
                            <>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-white">{user?.name}</p>
                                    <p className="text-[11px] text-zinc-500">{user?.plan} plan</p>
                                </div>
                                <LogOut className="w-4 h-4 text-zinc-500" />
                            </>
                        )}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen">
                {/* Header */}
                <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-6 sticky top-0 bg-[#0a0a0b]/80 backdrop-blur-xl z-30">
                    <div>
                        <h1 className="text-lg font-semibold text-white">
                            {currentView === 'dashboard' && 'Dashboard'}
                            {currentView === 'reviews' && 'Gestion des avis'}
                            {currentView === 'responses' && 'Réponses IA'}
                            {currentView === 'analytics' && 'Analytics'}
                            {currentView === 'requests' && 'Demander des avis'}
                            {currentView === 'posts' && 'Posts planifiés'}
                            {currentView === 'settings' && 'Paramètres'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {googleConnection && (
                            <button
                                onClick={() => setShowAddBusiness(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Ajouter
                            </button>
                        )}

                        <button className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            {store.stats.totalPending > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                            )}
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {!googleConnection ? (
                            <NotConnectedState key="not-connected" onConnect={() => setShowConnectModal(true)} />
                        ) : (
                            <>
                                {currentView === 'dashboard' && (
                                    <DashboardView key="dashboard" store={store} onAddBusiness={() => setShowAddBusiness(true)} />
                                )}
                                {currentView === 'reviews' && (
                                    <ReviewsView key="reviews" store={store} />
                                )}
                                {currentView === 'responses' && (
                                    <ResponsesView key="responses" store={store} />
                                )}
                                {currentView === 'analytics' && (
                                    <AnalyticsView key="analytics" store={store} />
                                )}
                                {currentView === 'requests' && (
                                    <RequestsView key="requests" store={store} />
                                )}
                                {currentView === 'posts' && (
                                    <PostsView key="posts" />
                                )}
                                {currentView === 'settings' && (
                                    <SettingsView key="settings" store={store} googleConnection={googleConnection} onDisconnect={handleGoogleDisconnect} />
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION ITEM
// ═══════════════════════════════════════════════════════════════

function NavItem({ icon, label, active, onClick, collapsed, badge }: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
    collapsed: boolean;
    badge?: number;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                active
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            } ${collapsed ? 'justify-center' : ''}`}
        >
            <span className={active ? 'text-emerald-400' : ''}>{icon}</span>
            {!collapsed && (
                <>
                    <span className="flex-1 text-left text-sm font-medium">{label}</span>
                    {badge !== undefined && badge > 0 && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                            {badge}
                        </span>
                    )}
                </>
            )}
        </button>
    );
}

// ═══════════════════════════════════════════════════════════════
// COMMAND PALETTE
// ═══════════════════════════════════════════════════════════════

function CommandPalette({ onClose, onNavigate, onAddBusiness }: {
    onClose: () => void;
    onNavigate: (view: View) => void;
    onAddBusiness: () => void;
}) {
    const [query, setQuery] = useState('');

    const commands = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4" />, action: () => { onNavigate('dashboard'); onClose(); } },
        { id: 'reviews', label: 'Voir les avis', icon: <MessageSquare className="w-4 h-4" />, action: () => { onNavigate('reviews'); onClose(); } },
        { id: 'add', label: 'Ajouter un établissement', icon: <Plus className="w-4 h-4" />, action: onAddBusiness },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, action: () => { onNavigate('analytics'); onClose(); } },
        { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" />, action: () => { onNavigate('settings'); onClose(); } },
    ];

    const filtered = query
        ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
        : commands;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
                    <Search className="w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher une commande..."
                        className="flex-1 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
                        autoFocus
                    />
                    <kbd className="px-2 py-1 bg-zinc-800 text-zinc-500 text-xs rounded">ESC</kbd>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                    {filtered.map((cmd) => (
                        <button
                            key={cmd.id}
                            onClick={cmd.action}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            <span className="text-zinc-500">{cmd.icon}</span>
                            <span className="text-sm">{cmd.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// CONNECT GOOGLE MODAL
// ═══════════════════════════════════════════════════════════════

function ConnectGoogleModal({ onClose, onConnect }: {
    onClose: () => void;
    onConnect: (email: string) => void;
}) {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'email' | 'connecting' | 'success'>('email');

    const handleConnect = async () => {
        if (!email) return;
        setStep('connecting');
        await new Promise(r => setTimeout(r, 2000));
        setStep('success');
        await new Promise(r => setTimeout(r, 1000));
        onConnect(email);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
            >
                {step === 'email' && (
                    <div className="p-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <svg className="w-10 h-10" viewBox="0 0 24 24">
                                    <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-white text-center mb-2">
                            Connecter Google Business Profile
                        </h2>
                        <p className="text-sm text-zinc-400 text-center mb-6">
                            Entrez l&apos;email associé à votre fiche Google Business
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Email Google</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@gmail.com"
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                                />
                            </div>

                            <button
                                onClick={handleConnect}
                                disabled={!email}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors"
                            >
                                Connecter
                            </button>
                        </div>

                        <p className="text-xs text-zinc-500 text-center mt-4">
                            En connectant, vous autorisez GMB AutoPilot à accéder à vos avis Google.
                        </p>
                    </div>
                )}

                {step === 'connecting' && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zinc-800 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <RefreshCw className="w-8 h-8 text-emerald-400" />
                            </motion.div>
                        </div>
                        <p className="text-white font-medium">Connexion en cours...</p>
                        <p className="text-sm text-zinc-500 mt-2">Authentification avec Google</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-12 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/20 flex items-center justify-center"
                        >
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </motion.div>
                        <p className="text-white font-medium">Connecté avec succès !</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// ADD BUSINESS MODAL
// ═══════════════════════════════════════════════════════════════

function AddBusinessModal({ onClose, onAdd }: {
    onClose: () => void;
    onAdd: (business: Omit<GMBBusiness, 'id' | 'lastSync' | 'seoScore' | 'visibilityTrend' | 'pendingReviews' | 'respondedReviews' | 'connected'>) => void;
}) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<string>(BUSINESS_CATEGORIES[0]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            name,
            category,
            address: `${address}, ${postalCode} ${city}`,
            city,
            postalCode,
            rating: 4.5,
            totalReviews: 0,
            keywords: [`${category.toLowerCase()} ${city.toLowerCase()}`],
            tone: 'friendly',
            autoReply: true
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
                <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-lg font-semibold text-white">Ajouter un établissement</h2>
                    <p className="text-sm text-zinc-500 mt-1">Renseignez les informations de votre fiche</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Nom</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Restaurant Le Gourmet"
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Catégorie</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        >
                            {BUSINESS_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Adresse</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="15 Rue de la Paix"
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Code postal</label>
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                placeholder="67000"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Ville</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                placeholder="Strasbourg"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-zinc-400 hover:text-white font-medium transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// NOT CONNECTED STATE
// ═══════════════════════════════════════════════════════════════

function NotConnectedState({ onConnect }: { onConnect: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-20"
        >
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center">
                <Globe className="w-10 h-10 text-zinc-500" />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-3">
                Connectez votre Google Business Profile
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Pour commencer à gérer vos avis et booster votre SEO local, connectez votre compte Google Business.
            </p>

            <button
                onClick={onConnect}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-medium rounded-lg transition-colors"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Connecter avec Google
            </button>

            <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                    { icon: <Zap className="w-6 h-6" />, title: "Réponses IA", desc: "Générez des réponses optimisées SEO en 1 clic" },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "+40% visibilité", desc: "Améliorez votre classement Google local" },
                    { icon: <Shield className="w-6 h-6" />, title: "Sécurisé", desc: "Vos données restent confidentielles" },
                ].map((feature, i) => (
                    <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                        <p className="text-sm text-zinc-500">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════

function DashboardView({ store, onAddBusiness }: { store: ReturnType<typeof useGMBStore>; onAddBusiness: () => void }) {
    if (store.isEmpty) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-zinc-500" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Aucun établissement</h2>
                <p className="text-zinc-400 mb-6">Ajoutez votre premier établissement pour commencer</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onAddBusiness}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter
                    </button>
                    <button
                        onClick={() => store.loadDemoData()}
                        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Package className="w-4 h-4" />
                        Charger démo
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Avis en attente" value={store.stats.totalPending} trend={-12} icon={<MessageSquare className="w-5 h-5" />} color="amber" />
                <StatCard label="Réponses envoyées" value={store.stats.totalResponded} trend={23} icon={<CheckCircle2 className="w-5 h-5" />} color="emerald" />
                <StatCard label="Note moyenne" value={store.stats.avgRating.toFixed(1)} suffix="/5" icon={<Star className="w-5 h-5" />} color="yellow" />
                <StatCard label="Score SEO" value={store.stats.avgSeoScore} suffix="%" trend={5} icon={<Target className="w-5 h-5" />} color="blue" />
            </div>

            {/* Businesses */}
            <div className="grid grid-cols-3 gap-4">
                {store.businesses.map((biz) => (
                    <BusinessCard key={biz.id} business={biz} store={store} />
                ))}
                <button
                    onClick={onAddBusiness}
                    className="p-6 border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-3 text-zinc-500 hover:text-zinc-400 transition-colors min-h-[200px]"
                >
                    <Plus className="w-8 h-8" />
                    <span className="font-medium">Ajouter</span>
                </button>
            </div>

            {/* Pending Reviews */}
            {store.pendingReviews.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Avis à traiter</h3>
                        <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full">
                            {store.stats.totalPending} en attente
                        </span>
                    </div>
                    <div className="space-y-3">
                        {store.pendingReviews.slice(0, 3).map((review) => {
                            const biz = store.businesses.find(b => b.id === review.businessId);
                            return biz ? <ReviewRow key={review.id} review={review} business={biz} store={store} /> : null;
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// STAT CARD
// ═══════════════════════════════════════════════════════════════

function StatCard({ label, value, suffix, trend, icon, color }: {
    label: string;
    value: number | string;
    suffix?: string;
    trend?: number;
    icon: React.ReactNode;
    color: 'amber' | 'emerald' | 'yellow' | 'blue';
}) {
    const colors = {
        amber: 'bg-amber-500/10 text-amber-400',
        emerald: 'bg-emerald-500/10 text-emerald-400',
        yellow: 'bg-yellow-500/10 text-yellow-400',
        blue: 'bg-blue-500/10 text-blue-400',
    };

    return (
        <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <p className="text-2xl font-semibold text-white">{value}{suffix}</p>
            <p className="text-sm text-zinc-500 mt-1">{label}</p>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// BUSINESS CARD
// ═══════════════════════════════════════════════════════════════

function BusinessCard({ business, store }: { business: GMBBusiness; store: ReturnType<typeof useGMBStore> }) {
    return (
        <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/20">
                        <Building2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="font-medium text-white">{business.name}</h4>
                        <p className="text-xs text-zinc-500">{business.category}</p>
                    </div>
                </div>
                <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-white">{business.rating}</span>
                </div>
                <span className="text-sm text-zinc-500">{business.totalReviews} avis</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-zinc-800/50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-amber-400">{business.pendingReviews}</p>
                    <p className="text-xs text-zinc-500">En attente</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-emerald-400">{business.seoScore}%</p>
                    <p className="text-xs text-zinc-500">Score SEO</p>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// REVIEW ROW
// ═══════════════════════════════════════════════════════════════

function ReviewRow({ review, business, store }: { review: GMBReview; business: GMBBusiness; store: ReturnType<typeof useGMBStore> }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [response, setResponse] = useState<AIResponse | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const res = await generateAIResponse({
                businessName: business.name,
                businessCity: business.city || 'Paris',
                businessCategory: business.category,
                keywords: business.keywords,
                tone: business.tone,
                reviewText: review.text,
                reviewRating: review.rating,
                authorName: review.author.split(' ')[0],
                includeCallToAction: true,
                maxLength: 500
            });
            setResponse(res);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSend = () => {
        if (response) {
            store.respondToReview(review.id, response.text, response.metadata.usedKeywords, response.metadata.seoImpact, response.metadata.sentiment);
            setResponse(null);
        }
    };

    return (
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-medium">
                    {review.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{review.author}</span>
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`} />
                            ))}
                        </div>
                        <span className="text-xs text-zinc-500">• {business.name}</span>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2">{review.text}</p>

                    {response && (
                        <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <p className="text-sm text-emerald-300">{response.text}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-emerald-400">Score SEO: {response.metadata.seoImpact.overall}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {!response ? (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {isGenerating ? 'Génération...' : 'Générer'}
                        </button>
                    ) : (
                        <>
                            <button onClick={handleSend} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Envoyer
                            </button>
                            <button onClick={() => setResponse(null)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg">
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// OTHER VIEWS (simplified for brevity)
// ═══════════════════════════════════════════════════════════════

function ReviewsView({ store }: { store: ReturnType<typeof useGMBStore> }) {
    const [filter, setFilter] = useState<'all' | 'pending' | 'responded'>('pending');
    const reviews = filter === 'pending' ? store.pendingReviews : filter === 'responded' ? store.respondedReviews : [...store.pendingReviews, ...store.respondedReviews];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center gap-2">
                {(['pending', 'responded', 'all'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === f ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
                    >
                        {f === 'pending' ? 'En attente' : f === 'responded' ? 'Traités' : 'Tous'}
                        {f === 'pending' && <span className="ml-2 px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">{store.stats.totalPending}</span>}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {reviews.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">Aucun avis</div>
                ) : (
                    reviews.map((review) => {
                        const biz = store.businesses.find(b => b.id === review.businessId);
                        return biz ? <ReviewRow key={review.id} review={review} business={biz} store={store} /> : null;
                    })
                )}
            </div>
        </motion.div>
    );
}

function ResponsesView({ store }: { store: ReturnType<typeof useGMBStore> }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Réponses générées" value={store.stats.totalResponded} icon={<Sparkles className="w-5 h-5" />} color="emerald" />
                <StatCard label="Score SEO moyen" value={store.stats.avgSeoScore} suffix="%" icon={<Target className="w-5 h-5" />} color="blue" />
                <StatCard label="Temps économisé" value="2.5h" icon={<Clock className="w-5 h-5" />} color="amber" />
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Dernières réponses</h3>
                {store.respondedReviews.length === 0 ? (
                    <p className="text-zinc-500 text-center py-8">Aucune réponse envoyée</p>
                ) : (
                    <div className="space-y-3">
                        {store.respondedReviews.slice(0, 5).map((review) => (
                            <div key={review.id} className="p-4 bg-zinc-800/50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium text-white">{review.author}</span>
                                    <div className="flex">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-emerald-400">{review.response}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function AnalyticsView({ store }: { store: ReturnType<typeof useGMBStore> }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Score SEO" value={store.stats.avgSeoScore} suffix="%" trend={5} icon={<Target className="w-5 h-5" />} color="emerald" />
                <StatCard label="Note moyenne" value={store.stats.avgRating.toFixed(1)} suffix="/5" icon={<Star className="w-5 h-5" />} color="yellow" />
                <StatCard label="Total avis" value={store.pendingReviews.length + store.respondedReviews.length} icon={<MessageSquare className="w-5 h-5" />} color="blue" />
                <StatCard label="Taux réponse" value={store.stats.totalResponded > 0 ? Math.round((store.stats.totalResponded / (store.stats.totalPending + store.stats.totalResponded)) * 100) : 0} suffix="%" icon={<CheckCircle2 className="w-5 h-5" />} color="amber" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Répartition des notes</h3>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = [...store.pendingReviews, ...store.respondedReviews].filter(r => r.rating === rating).length;
                            const total = store.pendingReviews.length + store.respondedReviews.length;
                            const pct = total > 0 ? (count / total) * 100 : 0;
                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="w-4 text-sm text-zinc-500">{rating}</span>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                    </div>
                                    <span className="w-8 text-sm text-zinc-500 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Mots-clés SEO</h3>
                    <div className="flex flex-wrap gap-2">
                        {store.businesses.flatMap(b => b.keywords).slice(0, 10).map((kw, i) => (
                            <span key={i} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-sm rounded-lg">{kw}</span>
                        ))}
                        {store.businesses.flatMap(b => b.keywords).length === 0 && <p className="text-zinc-500">Aucun mot-clé</p>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function RequestsView({ store }: { store: ReturnType<typeof useGMBStore> }) {
    const [selectedBiz, setSelectedBiz] = useState(store.businesses[0]?.id || '');
    const business = store.businesses.find(b => b.id === selectedBiz);

    if (store.isEmpty) {
        return <div className="text-center py-20 text-zinc-500">Ajoutez un établissement pour générer des liens</div>;
    }

    const reviewUrl = business ? `https://g.page/${business.name.replace(/\s+/g, '-').toLowerCase()}/review` : '';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Lien de demande d&apos;avis</h3>

                <select
                    value={selectedBiz}
                    onChange={(e) => setSelectedBiz(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white mb-4"
                >
                    {store.businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>

                <div className="flex gap-2">
                    <input type="text" value={reviewUrl} readOnly className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300" />
                    <button
                        onClick={() => navigator.clipboard.writeText(reviewUrl)}
                        className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        Copier
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
                    <QrCode className="w-32 h-32 mx-auto text-white mb-4" />
                    <p className="text-zinc-400 text-sm">Scannez pour laisser un avis</p>
                    <button className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg flex items-center gap-2 mx-auto">
                        <Download className="w-4 h-4" />
                        Télécharger QR
                    </button>
                </div>

                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h4 className="font-medium text-white mb-4">Partager</h4>
                    <div className="space-y-3">
                        {['Email', 'SMS', 'WhatsApp', 'Facebook'].map((platform) => (
                            <button key={platform} className="w-full p-3 bg-zinc-800 hover:bg-zinc-700 text-white text-left rounded-lg flex items-center gap-3">
                                <Share2 className="w-4 h-4 text-zinc-500" />
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PostsView() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-zinc-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Posts planifiés</h2>
            <p className="text-zinc-400 mb-6">Planifiez vos publications Google Business</p>
            <span className="px-4 py-2 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full">Bientôt disponible</span>
        </motion.div>
    );
}

function SettingsView({ store, googleConnection, onDisconnect }: {
    store: ReturnType<typeof useGMBStore>;
    googleConnection: SimulatedConnection | null;
    onDisconnect: () => void;
}) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
            {/* Google Connection */}
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Connexion Google</h3>
                {googleConnection && (
                    <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Wifi className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="font-medium text-white">{googleConnection.email}</p>
                                <p className="text-sm text-zinc-500">Connecté</p>
                            </div>
                        </div>
                        <button onClick={onDisconnect} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium rounded-lg">
                            Déconnecter
                        </button>
                    </div>
                )}
            </div>

            {/* Reset */}
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                <h3 className="font-semibold text-red-400 mb-2">Zone de danger</h3>
                <p className="text-sm text-zinc-400 mb-4">Réinitialiser toutes les données</p>
                <button onClick={() => store.resetState()} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium rounded-lg">
                    Réinitialiser
                </button>
            </div>
        </motion.div>
    );
}
