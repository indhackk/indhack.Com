'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { X, Check, AlertCircle, Globe, MapPin, Star, Search } from 'lucide-react'

interface MetierData {
  label: string
  icon: string
  searchVolume: number
  avgTicket: number
  conversionRate: number
  heroImage: string
  color: string
}

interface DiagnosticScoreProps {
  nom: string
  ville: string
  metier: MetierData
}

function AnimatedScore({ targetScore, color }: { targetScore: number; color: string }) {
  const [score, setScore] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setScore(prev => {
            if (prev >= targetScore) {
              clearInterval(interval)
              return targetScore
            }
            return prev + 1
          })
        }, 30)
        return () => clearInterval(interval)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isInView, targetScore])

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getScoreColor = (s: number) => {
    if (s < 30) return '#EF4444'
    if (s < 60) return '#F59E0B'
    return '#10B981'
  }

  return (
    <div ref={ref} className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="45"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r="45"
          stroke={getScoreColor(score)}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          style={{ strokeDasharray: circumference }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-sm text-gray-400">/100</span>
      </div>
    </div>
  )
}

function ChecklistItem({ label, status, delay }: { label: string; status: 'error' | 'warning' | 'success'; delay: number }) {
  const icons = {
    error: <X className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
    success: <Check className="w-5 h-5 text-green-400" />
  }

  const bgColors = {
    error: 'bg-red-500/10 border-red-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
    success: 'bg-green-500/10 border-green-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex items-center gap-3 p-4 rounded-xl border ${bgColors[status]}`}
    >
      {icons[status]}
      <span className="text-gray-200">{label}</span>
    </motion.div>
  )
}

export default function DiagnosticScore({ nom, ville, metier }: DiagnosticScoreProps) {
  const concurrentFictif = `${metier.label} Express ${ville}`

  return (
    <section id="diagnostic" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Titre section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm mb-4">
            Analyse automatique
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Votre Score de Visibilité
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comparaison avec vos concurrents qui apparaissent en première page Google
          </p>
        </motion.div>

        {/* Comparaison des scores */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* VOUS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-medium">VOTRE SITUATION</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-8">{nom}</h3>

            <div className="flex justify-center mb-8">
              <AnimatedScore targetScore={8} color="#EF4444" />
            </div>

            <div className="space-y-3">
              <ChecklistItem label="Site web" status="error" delay={0.1} />
              <ChecklistItem label="Référencement Google" status="error" delay={0.2} />
              <ChecklistItem label="Fiche Google Maps optimisée" status="warning" delay={0.3} />
              <ChecklistItem label="Avis clients visibles" status="warning" delay={0.4} />
              <ChecklistItem label="Version mobile" status="error" delay={0.5} />
            </div>
          </motion.div>

          {/* CONCURRENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-green-400 font-medium">CONCURRENT #1 SUR GOOGLE</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-8">{concurrentFictif}</h3>

            <div className="flex justify-center mb-8">
              <AnimatedScore targetScore={87} color="#10B981" />
            </div>

            <div className="space-y-3">
              <ChecklistItem label="Site web professionnel" status="success" delay={0.3} />
              <ChecklistItem label="Référencement Google" status="success" delay={0.4} />
              <ChecklistItem label="Fiche Google Maps optimisée" status="success" delay={0.5} />
              <ChecklistItem label="52 avis clients (4.7★)" status="success" delay={0.6} />
              <ChecklistItem label="Version mobile optimisée" status="success" delay={0.7} />
            </div>
          </motion.div>
        </div>

        {/* Simulation recherche Google */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-3xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Simulation de recherche Google</span>
          </div>

          {/* Barre de recherche fictive */}
          <div className="flex items-center gap-3 p-4 rounded-full bg-white mb-8 max-w-2xl">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-gray-700 font-medium">{metier.label.toLowerCase()} {ville}</span>
          </div>

          {/* Résultats fictifs */}
          <div className="space-y-4">
            {/* Résultat 1 - Concurrent */}
            <div className="p-4 rounded-xl bg-white/5 border-l-4 border-green-500">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-1">
                <Globe className="w-4 h-4" />
                www.{metier.label.toLowerCase().replace(/ /g, '-')}-express-{ville.toLowerCase()}.fr
              </div>
              <h4 className="text-lg font-medium text-blue-400 hover:underline cursor-pointer">
                {concurrentFictif} - {metier.label} à {ville} | ⭐ 4.7/5
              </h4>
              <p className="text-gray-400 text-sm mt-1">
                Votre {metier.label.toLowerCase()} de confiance à {ville}. Devis gratuit en 24h. Intervention rapide...
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> 52 avis</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ville}</span>
              </div>
            </div>

            {/* Résultat 2 - Autre concurrent */}
            <div className="p-4 rounded-xl bg-white/5 border-l-4 border-green-500/50">
              <div className="flex items-center gap-2 text-green-400/70 text-sm mb-1">
                <Globe className="w-4 h-4" />
                www.pro-{metier.label.toLowerCase().replace(/ /g, '')}-06.fr
              </div>
              <h4 className="text-lg font-medium text-blue-400/80">
                Pro {metier.label} {ville} - Expert depuis 2010
              </h4>
              <p className="text-gray-500 text-sm mt-1">
                {metier.label} professionnel à {ville} et alentours. Certifié...
              </p>
            </div>

            {/* Résultat 3 - VOUS (absent) */}
            <div className="p-4 rounded-xl bg-red-500/5 border-l-4 border-red-500 border-dashed">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-1">
                <X className="w-4 h-4" />
                {nom} - NON TROUVÉ
              </div>
              <h4 className="text-lg font-medium text-gray-500">
                Votre entreprise n'apparaît pas dans les résultats
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                Les {metier.searchVolume.toLocaleString('fr-FR')} personnes qui recherchent "{metier.label.toLowerCase()} {ville}" chaque mois ne vous trouvent pas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
