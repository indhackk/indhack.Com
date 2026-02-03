"use client";

import Link from "next/link";
import { Shield, Zap, Clock, Heart } from "lucide-react";

export default function DiagnosticFooter() {
    return (
        <footer className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                {/* Garanties */}
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span>Propriétaire à 100%</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span>Livraison 2 semaines</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>Support réactif</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="w-5 h-5 text-blue-600" />
                        <span>Made in France</span>
                    </div>
                </div>

                {/* Logo et liens */}
                <div className="text-center">
                    <p className="text-gray-500 mb-4">
                        Créé par{" "}
                        <strong className="text-gray-900">IndHack</strong>
                        {" "}- Agence Web Nice
                    </p>

                    <div className="flex justify-center gap-6 text-sm text-gray-500">
                        <Link href="/contact" className="hover:text-blue-600 transition-colors">
                            Nous contacter
                        </Link>
                        <span className="text-gray-300">|</span>
                        <span>06 61 13 97 48</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
