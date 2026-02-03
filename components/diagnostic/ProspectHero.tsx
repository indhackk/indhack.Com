'use client'

import { motion } from 'framer-motion'
import { MapPin, AlertTriangle, TrendingDown, Clock } from 'lucide-react'

interface MetierData {
  label: string
  icon: string
  searchVolume: number
  avgTicket: number
  conversionRate: number
  heroImage: string
  color: string
}

interface ProspectHeroProps {
  nom: string
  ville: string
  metier: MetierData
}

export default function ProspectHero({ nom, ville, metier }: ProspectHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background avec image du métier */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${metier.heroImage})` }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0A0A0A]" />

      {/* Effet de particules/grain */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        {/* Badge urgent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-sm font-medium mb-8"
        >
          <AlertTriangle className="w-4 h-4" />
          Diagnostic de visibilité en temps réel
        </motion.div>

        {/* Nom de l'entreprise - LA STAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-4xl md:text-5xl">{metier.icon}</span>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            {nom}
          </h1>
          <div className="flex items-center gap-2 mt-4 text-xl md:text-2xl text-gray-300">
            <MapPin className="w-6 h-6" style={{ color: metier.color }} />
            <span>{metier.label} à <span className="text-white font-semibold">{ville}</span></span>
          </div>
        </motion.div>

        {/* Message d'alerte principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-3xl"
        >
          <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed">
            Actuellement, <span className="text-red-400 font-semibold">vous êtes invisible</span> sur Google.
            <br />
            Vos concurrents captent <span className="text-white font-bold">100% des recherches</span> à votre place.
          </p>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 text-red-400 mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Recherches manquées</span>
            </div>
            <div className="text-4xl font-bold text-white">
              {metier.searchVolume.toLocaleString('fr-FR')}
              <span className="text-lg text-gray-400 font-normal">/mois</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              "{metier.label.toLowerCase()} {ville}"
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 text-orange-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Votre visibilité</span>
            </div>
            <div className="text-4xl font-bold text-white">
              0<span className="text-lg text-gray-400 font-normal">/100</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Sans site web optimisé
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 text-yellow-400 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Temps de lecture</span>
            </div>
            <div className="text-4xl font-bold text-white">
              3<span className="text-lg text-gray-400 font-normal"> min</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Pour comprendre votre situation
            </p>
          </div>
        </motion.div>

        {/* CTA scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#diagnostic"
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Voir le diagnostic complet</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
