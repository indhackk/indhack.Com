'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Redirect with password param - middleware will validate
        router.push(`/keystatic?password=${encodeURIComponent(password)}`);
    };

    return (
        <div className="min-h-screen bg-ink flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#638576]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {/* Logo / Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#638576]/20 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-[#638576]" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            IndHack Admin
                        </h1>
                        <p className="text-white/60 text-sm">
                            Accès réservé
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#638576] focus:ring-2 focus:ring-[#638576]/20 transition-all"
                                    placeholder="Entrez votre mot de passe"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#638576] hover:bg-[#4a6359] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Connexion
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-white/40 text-xs mt-6">
                        © {new Date().getFullYear()} IndHack - Espace sécurisé
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
