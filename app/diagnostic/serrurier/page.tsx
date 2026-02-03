'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProspectLandingTemplate from '@/components/diagnostic/ProspectLandingTemplate'
import { getMetierData } from '@/lib/diagnostic-data'

function SerrurierContent() {
  const searchParams = useSearchParams()

  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Entreprise'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const quartier = searchParams.get('quartier')?.replace(/\+/g, ' ') || undefined
  const avis = searchParams.get('avis') ? parseInt(searchParams.get('avis')!) : undefined
  const note = searchParams.get('note') ? parseFloat(searchParams.get('note')!) : undefined

  const metier = getMetierData('serrurier')

  if (!metier) {
    return <div>Métier non trouvé</div>
  }

  return (
    <ProspectLandingTemplate
      metier={metier}
      prospect={{
        nom,
        ville,
        quartier,
        avis,
        note,
      }}
      calendlyUrl="https://calendly.com/indhack/decouverte"
    />
  )
}

export default function SerrurierPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCF8]" />}>
      <SerrurierContent />
    </Suspense>
  )
}
