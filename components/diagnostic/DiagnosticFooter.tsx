"use client";

import Link from "next/link";
import { Shield, Zap, Clock, Heart } from "lucide-react";

export default function DiagnosticFooter() {
    return (
        <footer className="py-12 bg-black border-t border-white/10">
            <div className="container mx-auto px-4">
                {/* Garanties */}
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Shield className="w-5 h-5 text-sauge" />
                        <span>Propriétaire à 100%</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Zap className="w-5 h-5 text-sauge" />
                        <span>Livraison 2-4 semaines</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-5 h-5 text-sauge" />
                        <span>Support réactif</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Heart className="w-5 h-5 text-sauge" />
                        <span>Made in France</span>
                    </div>
                </div>

                {/* Logo et liens */}
                <div className="text-center">
                    <p className="text-gray-500 mb-4">
                        Ce diagnostic a été créé par{" "}
                        <strong className="text-white">IndHack</strong>
                        {" "}- Agence Web & SEO
                    </p>

                    <div className="flex justify-center gap-6 text-sm text-gray-600">
                        <Link href="/" className="hover:text-sauge transition-colors">
                            Accueil
                        </Link>
                        <Link href="/creation-site-web" className="hover:text-sauge transition-colors">
                            Création de site
                        </Link>
                        <Link href="/referencement-naturel" className="hover:text-sauge transition-colors">
                            SEO
                        </Link>
                        <Link href="/contact" className="hover:text-sauge transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
