"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-fond-clair to-white flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Visual */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-black text-sauge/10 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-sauge/10 flex items-center justify-center">
                            <Search className="w-12 h-12 text-sauge" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                    Page introuvable
                </h2>
                <p className="text-soft text-lg mb-8 max-w-md mx-auto">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                    Pas de panique, je peux vous aider à trouver ce que vous cherchez.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button asChild className="bg-sauge hover:bg-sauge/90 text-white rounded-full px-8 py-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Retour à l'accueil
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full px-8 py-6 border-ink/20">
                        <Link href="/contact" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Me contacter
                        </Link>
                    </Button>
                </div>

                {/* Helpful Links */}
                <div className="border-t border-gray-200 pt-8">
                    <p className="text-sm text-soft mb-4">Pages populaires :</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/consultant-seo"
                            className="text-sm text-sauge hover:underline"
                        >
                            Consultant SEO
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/audit-seo"
                            className="text-sm text-sauge hover:underline"
                        >
                            Audit SEO
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/creation-site-web"
                            className="text-sm text-sauge hover:underline"
                        >
                            Création de site
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/blog"
                            className="text-sm text-sauge hover:underline"
                        >
                            Blog SEO
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/seo-local"
                            className="text-sm text-sauge hover:underline"
                        >
                            SEO Local
                        </Link>
                    </div>
                </div>

                {/* Back link */}
                <button
                    onClick={() => typeof window !== 'undefined' && window.history.back()}
                    className="mt-8 text-sm text-soft hover:text-ink flex items-center gap-2 mx-auto transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Revenir à la page précédente
                </button>
            </div>
        </main>
    );
}
