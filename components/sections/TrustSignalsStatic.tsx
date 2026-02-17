import { Shield, Zap, Award, HeartHandshake } from "lucide-react";

const TRUST_POINTS = [
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Expertise Certifiée",
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Résultats Mesurables",
    },
    {
        icon: <HeartHandshake className="w-6 h-6" />,
        title: "Relation Directe",
    },
    {
        icon: <Award className="w-6 h-6" />,
        title: "Méthode Éprouvée",
    }
];

export function TrustSignalsStatic() {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {TRUST_POINTS.map((point, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 animate-fade-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="p-2 bg-sauge/10 rounded-lg text-sauge">
                                {point.icon}
                            </div>
                            <span className="font-medium text-ink text-sm">
                                {point.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
