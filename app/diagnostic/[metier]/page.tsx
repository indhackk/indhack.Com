'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProspectHero from '@/components/diagnostic/ProspectHero'
import DiagnosticScore from '@/components/diagnostic/DiagnosticScore'
import SitePreview from '@/components/diagnostic/SitePreview'
import ROICalculator from '@/components/diagnostic/ROICalculator'
import InvestmentValue from '@/components/diagnostic/InvestmentValue'
import OffresSection from '@/components/diagnostic/OffresSection'
import DiagnosticCTA from '@/components/diagnostic/DiagnosticCTA'
import DiagnosticFooter from '@/components/diagnostic/DiagnosticFooter'

// Données des métiers avec leurs spécificités
const metiersData: Record<string, {
  label: string
  icon: string
  searchVolume: number
  avgTicket: number
  conversionRate: number
  heroImage: string
  color: string
}> = {
  restaurant: {
    label: 'Restaurant',
    icon: '🍽️',
    searchVolume: 2400,
    avgTicket: 35,
    conversionRate: 8,
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    color: '#D97706'
  },
  pizzeria: {
    label: 'Pizzeria',
    icon: '🍕',
    searchVolume: 1800,
    avgTicket: 25,
    conversionRate: 10,
    heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
    color: '#DC2626'
  },
  plombier: {
    label: 'Plombier',
    icon: '🔧',
    searchVolume: 2900,
    avgTicket: 150,
    conversionRate: 12,
    heroImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200',
    color: '#2563EB'
  },
  electricien: {
    label: 'Électricien',
    icon: '⚡',
    searchVolume: 2200,
    avgTicket: 180,
    conversionRate: 11,
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200',
    color: '#F59E0B'
  },
  coiffeur: {
    label: 'Salon de Coiffure',
    icon: '💇',
    searchVolume: 3200,
    avgTicket: 45,
    conversionRate: 15,
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
    color: '#EC4899'
  },
  garage: {
    label: 'Garage Auto',
    icon: '🚗',
    searchVolume: 1900,
    avgTicket: 320,
    conversionRate: 8,
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200',
    color: '#374151'
  },
  dentiste: {
    label: 'Cabinet Dentaire',
    icon: '🦷',
    searchVolume: 2600,
    avgTicket: 120,
    conversionRate: 6,
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200',
    color: '#06B6D4'
  },
  avocat: {
    label: 'Cabinet d\'Avocat',
    icon: '⚖️',
    searchVolume: 1400,
    avgTicket: 250,
    conversionRate: 5,
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200',
    color: '#1E293B'
  },
  boulangerie: {
    label: 'Boulangerie',
    icon: '🥖',
    searchVolume: 2800,
    avgTicket: 12,
    conversionRate: 20,
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
    color: '#92400E'
  },
  coach: {
    label: 'Coach / Consultant',
    icon: '🎯',
    searchVolume: 1100,
    avgTicket: 150,
    conversionRate: 4,
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    color: '#7C3AED'
  },
  artisan: {
    label: 'Artisan',
    icon: '🛠️',
    searchVolume: 1600,
    avgTicket: 200,
    conversionRate: 9,
    heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200',
    color: '#059669'
  },
  architecte: {
    label: 'Architecte',
    icon: '📐',
    searchVolume: 900,
    avgTicket: 5000,
    conversionRate: 3,
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
    color: '#0F172A'
  },
  photographe: {
    label: 'Photographe',
    icon: '📸',
    searchVolume: 1300,
    avgTicket: 350,
    conversionRate: 6,
    heroImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200',
    color: '#171717'
  },
  fleuriste: {
    label: 'Fleuriste',
    icon: '💐',
    searchVolume: 1500,
    avgTicket: 55,
    conversionRate: 12,
    heroImage: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200',
    color: '#BE185D'
  },
  immobilier: {
    label: 'Agence Immobilière',
    icon: '🏠',
    searchVolume: 4200,
    avgTicket: 8000,
    conversionRate: 2,
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
    color: '#0369A1'
  }
}

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()

  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Entreprise'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const tel = searchParams.get('tel') || ''

  const metierData = metiersData[metier] || metiersData.artisan

  // Calculs ROI basés sur le métier
  const searchVolume = metierData.searchVolume
  const avgTicket = metierData.avgTicket
  const conversionRate = metierData.conversionRate
  const monthlyLoss = Math.round((searchVolume * 0.75 * (conversionRate / 100) * avgTicket) / 12)

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero personnalisé */}
      <ProspectHero
        nom={nom}
        ville={ville}
        metier={metierData}
      />

      {/* Score de visibilité */}
      <DiagnosticScore
        nom={nom}
        ville={ville}
        metier={metierData}
      />

      {/* Aperçu du site */}
      <SitePreview
        nom={nom}
        ville={ville}
        metier={metierData}
        tel={tel}
      />

      {/* Calculateur ROI */}
      <ROICalculator
        nom={nom}
        ville={ville}
        metier={metierData}
        searchVolume={searchVolume}
        avgTicket={avgTicket}
        conversionRate={conversionRate}
        monthlyLoss={monthlyLoss}
      />

      {/* Valeur de l'investissement SEO/GEO */}
      <InvestmentValue metier={metierData.label} ville={ville} />

      {/* Les 3 offres */}
      <OffresSection monthlyLoss={monthlyLoss} />

      {/* CTA Final */}
      <DiagnosticCTA nom={nom} ville={ville} />

      {/* Footer minimaliste */}
      <DiagnosticFooter />
    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Génération du diagnostic...</div>
      </div>
    }>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
