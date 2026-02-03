'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { TrendingDown, TrendingUp, Calculator, Euro, Users, Calendar } from 'lucide-react'

interface MetierData {
  label: string
  icon: string
  searchVolume: number
  avgTicket: number
  conversionRate: number
  heroImage: string
  color: string
}

interface ROICalculatorProps {
  nom: string
  ville: string
  metier: MetierData
  searchVolume: number
  avgTicket: number
  conversionRate: number
  monthlyLoss: number
}

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000 }: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now()
      const endTime = startTime + duration

      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.floor(value * easeOut))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString('fr-FR')}{suffix}
    </span>
  )
}

export default function ROICalculator({
  nom,
  ville,
  metier,
  searchVolume,
  avgTicket,
  conversionRate,
  monthlyLoss
}: ROICalculatorProps) {
  const [showProjection, setShowProjection] = useState(false)

  // Calculs
  const monthlySearches = searchVolume
  const top3Clicks = Math.round(monthlySearches * 0.75) // Top 3 capte 75%
  const potentialClients = Math.round(top3Clicks * (conversionRate / 100))
  const potentialRevenue = potentialClients * avgTicket
  const yearlyLoss = monthlyLoss * 12

  // Projection avec site
  const projectedScore = 85
  const projectedClicks = Math.round(monthlySearches * 0.30) // Position 1-3
  const projectedClients = Math.round(projectedClicks * (conversionRate / 100))
  const projectedRevenue = projectedClients * avgTicket
  const yearlyGain = projectedRevenue * 12

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#111] to-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm mb-4">
            <Calculator className="w-4 h-4" />
            Calculateur de perte
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ce que vous perdez <span className="text-red-400">chaque mois</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sans site web optimisé, vos concurrents captent 100% des recherches locales
          </p>
        </motion.div>

        {/* Funnel de conversion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Étape 1: Recherches */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 text-center">
              <div className="text-blue-400 text-sm font-medium mb-2">Recherches mensuelles</div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={monthlySearches} />
              </div>
              <p className="text-gray-400 text-sm">"{metier.label.toLowerCase()} {ville}"</p>
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-gray-600">→</div>
            </div>

            {/* Étape 2: Clics Top 3 */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 text-center">
              <div className="text-purple-400 text-sm font-medium mb-2">Clics vers Top 3</div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={top3Clicks} />
              </div>
              <p className="text-gray-400 text-sm">75% des recherches</p>
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-gray-600">→</div>
            </div>

            {/* Étape 3: Conversions */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 text-center">
              <div className="text-orange-400 text-sm font-medium mb-2">Clients potentiels</div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={potentialClients} />
              </div>
              <p className="text-gray-400 text-sm">{conversionRate}% de conversion</p>
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-gray-600">→</div>
            </div>

            {/* Étape 4: Revenus perdus */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-transparent border border-red-500/30 text-center">
              <div className="text-red-400 text-sm font-medium mb-2">CA mensuel perdu</div>
              <div className="text-4xl font-bold text-red-400 mb-2">
                <AnimatedNumber value={monthlyLoss} suffix=" €" />
              </div>
              <p className="text-gray-400 text-sm">Panier moyen: {avgTicket}€</p>
            </div>
          </div>
        </motion.div>

        {/* Comparaison Avant/Après */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* AVANT - Sans site */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-medium">SITUATION ACTUELLE</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-gray-400 text-sm mb-1">Visibilité Google</div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-white">0</span>
                  <span className="text-gray-400 text-xl">/100</span>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-1">Position moyenne</div>
                <div className="text-3xl font-bold text-red-400">Invisible</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-1">Clients via Google</div>
                <div className="text-3xl font-bold text-white">0 <span className="text-gray-400 text-lg font-normal">/mois</span></div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="text-gray-400 text-sm mb-1">Perte annuelle estimée</div>
                <div className="text-4xl font-bold text-red-400">
                  <AnimatedNumber value={yearlyLoss} prefix="-" suffix=" €" />
                </div>
              </div>
            </div>
          </div>

          {/* APRÈS - Avec site optimisé */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 relative overflow-hidden">
            {!showProjection && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <button
                  onClick={() => setShowProjection(true)}
                  className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  Voir la projection
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-medium">AVEC SITE OPTIMISÉ</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-gray-400 text-sm mb-1">Visibilité Google</div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-white">{showProjection ? projectedScore : '??'}</span>
                  <span className="text-gray-400 text-xl">/100</span>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-1">Position moyenne</div>
                <div className="text-3xl font-bold text-green-400">{showProjection ? 'Top 3' : '???'}</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-1">Clients via Google</div>
                <div className="text-3xl font-bold text-white">
                  {showProjection ? projectedClients : '??'} <span className="text-gray-400 text-lg font-normal">/mois</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="text-gray-400 text-sm mb-1">CA annuel potentiel</div>
                <div className="text-4xl font-bold text-green-400">
                  {showProjection ? (
                    <AnimatedNumber value={yearlyGain} prefix="+" suffix=" €" />
                  ) : (
                    '+?? €'
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROI message */}
        {showProjection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 border border-green-500/30 text-center"
          >
            <div className="text-green-400 font-medium mb-2">RETOUR SUR INVESTISSEMENT</div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pour un investissement de <span className="text-green-400">1 490€</span>, vous récupérez potentiellement{' '}
              <span className="text-green-400">{yearlyGain.toLocaleString('fr-FR')}€</span> la première année
            </div>
            <div className="text-gray-400">
              Soit un ROI de <span className="text-white font-bold">{Math.round((yearlyGain / 1490) * 100)}%</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
