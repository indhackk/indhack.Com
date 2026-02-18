"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard, MessageSquare, Settings, CreditCard,
    Zap, HelpCircle, LogOut, ChevronRight, ExternalLink
} from "lucide-react";
import Link from "next/link";

type Tab = 'dashboard' | 'reviews' | 'settings' | 'billing';

interface SidebarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    pendingCount: number;
    userEmail?: string | null;
    onDisconnect?: () => void;
}

export function Sidebar({
    activeTab,
    onTabChange,
    pendingCount,
    userEmail,
    onDisconnect
}: SidebarProps) {
    const navItems = [
        {
            id: 'dashboard' as Tab,
            label: 'Dashboard',
            icon: LayoutDashboard,
            shortcut: '⌘1'
        },
        {
            id: 'reviews' as Tab,
            label: 'Avis',
            icon: MessageSquare,
            badge: pendingCount > 0 ? pendingCount : undefined,
            shortcut: '⌘2'
        },
        {
            id: 'settings' as Tab,
            label: 'Paramètres',
            icon: Settings,
            shortcut: '⌘,'
        },
        {
            id: 'billing' as Tab,
            label: 'Abonnement',
            icon: CreditCard,
            shortcut: '⌘B'
        }
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
            {/* Logo */}
            <div className="p-5 border-b border-gray-100">
                <Link href="/outils/gmb-autopilot" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-sauge to-sauge/80 rounded-xl flex items-center justify-center shadow-sm">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-ink">GMB AutoPilot</h1>
                        <p className="text-xs text-gray-400">by IndHack</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group ${
                                isActive
                                    ? 'bg-sauge/10 text-sauge'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-ink'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-sauge rounded-full"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            )}
                            <item.icon className="w-4 h-4" />
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                                    {item.badge}
                                </span>
                            )}
                            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                                {item.shortcut}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Help Section */}
            <div className="p-3 border-t border-gray-100">
                <Link
                    href="https://indhack.com/contact"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-ink transition-all"
                >
                    <HelpCircle className="w-4 h-4" />
                    <span className="flex-1">Aide & Support</span>
                    <ExternalLink className="w-3 h-3" />
                </Link>
            </div>

            {/* User Section */}
            {userEmail && (
                <div className="p-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {userEmail.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-ink truncate">
                                {userEmail}
                            </p>
                            <p className="text-xs text-gray-500">Plan Pro</p>
                        </div>
                        {onDisconnect && (
                            <button
                                onClick={onDisconnect}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="Déconnexion"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </aside>
    );
}

// Mobile Bottom Navigation
export function MobileNav({
    activeTab,
    onTabChange,
    pendingCount
}: {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    pendingCount: number;
}) {
    const navItems = [
        { id: 'dashboard' as Tab, label: 'Home', icon: LayoutDashboard },
        { id: 'reviews' as Tab, label: 'Avis', icon: MessageSquare, badge: pendingCount },
        { id: 'settings' as Tab, label: 'Config', icon: Settings },
        { id: 'billing' as Tab, label: 'Plan', icon: CreditCard }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 lg:hidden safe-area-bottom">
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex flex-col items-center py-3 px-4 relative ${
                                isActive ? 'text-sauge' : 'text-gray-400'
                            }`}
                        >
                            <div className="relative">
                                <item.icon className="w-5 h-5" />
                                {item.badge && item.badge > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] mt-1 font-medium">
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="mobileActiveTab"
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-sauge rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
