'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, Zap, Crown, ArrowRight } from 'lucide-react'

interface OffresSectionProps {
  monthlyLoss: number
}

const offres = [
  {
    id: 'starter',
    name: 'Starter',
    icon: '🥉',
    tagline: 'Existez sur Google',
    price: 990,
    priceMonthly: null,
    popular: false,
    description: 'Parfait pour les entreprises qui veulent une présence web professionnelle',
    features: [
      { label: 'Site web 5 pages', included: true },
      { label: 'Design premium responsive', included: true },
      { label: 'Hébergement inclus (Vercel)', included: true },
      { label: 'Interface admin simple', included: true },
      { label: 'Certificat SSL (HTTPS)', included: true },
      { label: 'Formulaire de contact', included: true },
      { label: 'Optimisation SEO', included: false },
      { label: 'Rédaction de contenu', included: false },
      { label: 'Fiche Google Maps', included: false },
      { label: 'Suivi mensuel', included: false },
    ],
    cta: 'Choisir Starter',
    guarantee: 'Livraison en 7 jours',
    color: 'from-gray-500/20 to-gray-600/10',
    borderColor: 'border-gray-500/30',
    btnColor: 'bg-white/10 hover:bg-white/20 text-white'
  },
  {
    id: 'croissance',
    name: 'Croissance',
    icon: '🥈',
    tagline: 'Dominez Google',
    price: 1490,
    priceMonthly: 150,
    popular: true,
    description: 'Pour ceux qui veulent apparaître en première page Google',
    features: [
      { label: 'Site web 8 pages + Blog', included: true },
      { label: 'Design premium responsive', included: true },
      { label: 'Hébergement inclus (Vercel)', included: true },
      { label: 'Interface admin complète', included: true },
      { label: 'Optimisation SEO (10 mots-clés)', included: true },
      { label: 'Rédaction SEO optimisée', included: true },
      { label: '2 articles de blog/mois', included: true },
      { label: 'Rapport de positions mensuel', included: true },
      { label: 'Fiche Google Maps', included: false },
      { label: 'Gestion des avis', included: false },
    ],
    cta: 'Choisir Croissance',
    guarantee: 'Page 1 Google en 90 jours ou remboursé',
    color: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/50',
    btnColor: 'bg-blue-500 hover:bg-blue-600 text-white'
  },
  {
    id: 'domination',
    name: 'Domination',
    icon: '🥇',
    tagline: 'Écrasez la concurrence',
    price: 1990,
    priceMonthly: 290,
    popular: false,
    recommended: true,
    description: 'La solution complète pour dominer votre marché local',
    features: [
      { label: 'Tout de Croissance inclus', included: true, highlight: true },
      { label: 'Optimisation SEO (20 mots-clés)', included: true },
      { label: '4 articles de blog/mois', included: true },
      { label: 'Fiche Google Maps optimisée', included: true },
      { label: 'Gestion des avis (réponses IA)', included: true },
      { label: '4 Google Posts/mois', included: true },
      { label: 'QR Code collecte d\'avis', included: true },
      { label: 'Rapport analytics avancé', included: true },
      { label: 'Support prioritaire', included: true },
      { label: 'Coaching SEO trimestriel', included: true },
    ],
    cta: 'Choisir Domination',
    guarantee: 'Page 1 Google en 60 jours ou remboursé',
    color: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/50',
    btnColor: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold'
  }
]

export default function OffresSection({ monthlyLoss }: OffresSectionProps) {
  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm mb-4">
            <Zap className="w-4 h-4" />
            Offres sur-mesure
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choisissez votre niveau de <span className="text-green-400">domination</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vous perdez actuellement ~{monthlyLoss.toLocaleString('fr-FR')}€/mois.
            <br />Récupérez-les avec la bonne stratégie.
          </p>
        </motion.div>

        {/* Grille des offres */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {offres.map((offre, index) => (
            <motion.div
              key={offre.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${offre.color} border ${offre.borderColor} ${offre.popular ? 'md:-mt-4 md:mb-4' : ''
                }`}
            >
              {/* Badge populaire */}
              {offre.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    Le plus populaire
                  </div>
                </div>
              )}

              {/* Badge recommandé */}
              {offre.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-medium flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Recommandé
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-4xl mb-2 block">{offre.icon}</span>
                <h3 className="text-2xl font-bold text-white">{offre.name}</h3>
                <p className="text-gray-400 text-sm">{offre.tagline}</p>
              </div>

              {/* Prix */}
              <div className="text-center mb-6">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-5xl font-bold text-white">{offre.price.toLocaleString('fr-FR')}</span>
                  <span className="text-gray-400 text-lg mb-2">€</span>
                </div>
                {offre.priceMonthly && (
                  <div className="text-gray-400 text-sm">
                    puis <span className="text-white font-medium">{offre.priceMonthly}€</span>/mois
                  </div>
                )}
                {!offre.priceMonthly && (
                  <div className="text-gray-400 text-sm">paiement unique</div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm text-center mb-6">{offre.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {offre.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-sm ${feature.included ? 'text-gray-200' : 'text-gray-500'
                      }`}
                  >
                    {feature.included ? (
                      <Check className={`w-5 h-5 flex-shrink-0 ${'highlight' in feature && feature.highlight ? 'text-amber-400' : 'text-green-400'}`} />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                    <span className={'highlight' in feature && feature.highlight ? 'font-medium text-amber-400' : ''}>{feature.label}</span>
                  </li>
                ))}
              </ul>

              {/* Garantie */}
              <div className="mb-6 p-3 rounded-xl bg-white/5 text-center">
                <span className="text-green-400 text-sm">✓ {offre.guarantee}</span>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium transition-all ${offre.btnColor}`}
              >
                {offre.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note de bas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Tous les prix sont HT. Paiement en 2 ou 3 fois possible.
            <br />
            <span className="text-white">Satisfait ou remboursé pendant 30 jours.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
