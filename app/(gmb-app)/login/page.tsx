"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User, CheckCircle2, Sparkles, ChevronRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/gmb/auth-context";
import Image from "next/image";

type AuthMode = 'login' | 'register';

export default function LoginPage() {
    const router = useRouter();
    const { login, register, isAuthenticated, isLoading: authLoading } = useAuth();

    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push('/app/dashboard');
        }
    }, [authLoading, isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            if (mode === 'login') {
                const success = await login(email, password);
                if (success) {
                    router.push("/app/dashboard");
                } else {
                    setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
                }
            } else {
                const result = await register(email, password, name);
                if (result.success) {
                    setSuccess("Compte créé avec succès ! Redirection...");
                    setTimeout(() => router.push("/app/dashboard"), 1000);
                } else {
                    setError(result.error || "Erreur lors de l'inscription.");
                }
            }
        } catch {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        { icon: <Zap className="w-5 h-5" />, text: "Réponses IA en 2 secondes" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "+40% de visibilité SEO" },
        { icon: <Shield className="w-5 h-5" />, text: "Validation humaine intelligente" },
    ];

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <p className="text-slate-500 text-sm">Chargement...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
            {/* Left Side - Branding */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 relative overflow-hidden"
            >
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl" />
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Image
                                    src="/images/logo-indhack.webp"
                                    alt="IndHack"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-xl">GMB AutoPilot</h2>
                                <p className="text-white/60 text-xs">by IndHack</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-10"
                    >
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                            Automatisez vos<br />
                            <span className="text-white/80">réponses Google</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-md">
                            L&apos;IA qui gère vos avis clients et booste votre référencement local.
                        </p>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 mb-12"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-center gap-3 text-white/90"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <span className="font-medium">{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    >
                        <p className="text-white/90 italic mb-4">
                            &ldquo;Gain de temps énorme ! Mes réponses sont maintenant optimisées SEO et mon classement Google a grimpé.&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
                                M
                            </div>
                            <div>
                                <p className="text-white font-medium">Marie D.</p>
                                <p className="text-white/60 text-sm">Restauratrice, Strasbourg</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:hidden flex justify-center mb-8"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Image
                                src="/images/logo-indhack.webp"
                                alt="IndHack"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Mode Toggle */}
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                                mode === 'login'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                                mode === 'register'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Créer un compte
                        </button>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left mb-8">
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                            {mode === 'login' ? 'Content de vous revoir' : 'Bienvenue'}
                        </h1>
                        <p className="text-slate-500">
                            {mode === 'login'
                                ? 'Accédez à votre tableau de bord'
                                : 'Créez votre compte en quelques secondes'
                            }
                        </p>
                    </div>

                    {/* Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="mb-6"
                            >
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="mb-6"
                            >
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    <p className="text-sm text-emerald-600">{success}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field (Register only) */}
                        <AnimatePresence>
                            {mode === 'register' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Nom complet
                                    </label>
                                    <div className={`relative rounded-xl transition-all duration-200 ${
                                        focusedField === 'name'
                                            ? 'ring-2 ring-emerald-500 ring-offset-2'
                                            : ''
                                    }`}>
                                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                                            focusedField === 'name' ? 'text-emerald-500' : 'text-slate-400'
                                        }`} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="John Doe"
                                            required={mode === 'register'}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-colors"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Adresse email
                            </label>
                            <div className={`relative rounded-xl transition-all duration-200 ${
                                focusedField === 'email'
                                    ? 'ring-2 ring-emerald-500 ring-offset-2'
                                    : ''
                            }`}>
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                                    focusedField === 'email' ? 'text-emerald-500' : 'text-slate-400'
                                }`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="vous@entreprise.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Mot de passe
                            </label>
                            <div className={`relative rounded-xl transition-all duration-200 ${
                                focusedField === 'password'
                                    ? 'ring-2 ring-emerald-500 ring-offset-2'
                                    : ''
                            }`}>
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                                    focusedField === 'password' ? 'text-emerald-500' : 'text-slate-400'
                                }`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={mode === 'register' ? "Minimum 6 caractères" : "••••••••"}
                                    required
                                    minLength={mode === 'register' ? 6 : undefined}
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password (Login only) */}
                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                    Mot de passe oublié ?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </span>
                        </motion.button>
                    </form>

                    {/* Quick Access */}
                    {mode === 'login' && (
                        <>
                            <div className="my-8 flex items-center gap-4">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-sm text-slate-400">ou</span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>

                            <button
                                onClick={() => {
                                    setEmail('indiana@indhack.com');
                                    setPassword('Indiana2024!');
                                }}
                                className="w-full py-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-5 h-5 text-emerald-500" />
                                Connexion rapide (Compte Indiana)
                            </button>
                        </>
                    )}

                    {/* Credentials Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100"
                    >
                        <p className="text-sm font-medium text-slate-700 mb-2">Tes identifiants :</p>
                        <div className="space-y-1 text-sm text-slate-600">
                            <p><span className="font-mono bg-white px-2 py-0.5 rounded">indiana@indhack.com</span></p>
                            <p><span className="font-mono bg-white px-2 py-0.5 rounded">Indiana2024!</span></p>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <p className="text-center text-slate-400 text-sm mt-8">
                        En continuant, vous acceptez nos{" "}
                        <a href="#" className="text-emerald-600 hover:underline">CGU</a>
                        {" "}et{" "}
                        <a href="#" className="text-emerald-600 hover:underline">Politique de confidentialité</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
