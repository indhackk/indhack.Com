import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getMetierData, metiersData } from '@/lib/diagnostic-data'
import DiagnosticClient from './DiagnosticClient'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC PAGE - Version SEO Optimisée
// Métadonnées générées côté serveur pour indexation Google
// ══════════════════════════════════════════════════════════════════════════════

interface PageProps {
  params: { metier: string }
}

// Métiers qui ont leurs propres pages statiques dédiées (dans /diagnostic/[metier]/page.tsx)
// Ne PAS les générer ici pour éviter les conflits de routes
const EXCLUDED_METIERS = ['barbier', 'coiffeur']

export async function generateStaticParams() {
  return Object.keys(metiersData)
    .filter((metier) => !EXCLUDED_METIERS.includes(metier))
    .map((metier) => ({
      metier,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Ne pas générer de métadonnées pour les métiers avec pages dédiées
  if (EXCLUDED_METIERS.includes(params.metier)) {
    return {
      title: 'Diagnostic SEO | INDHACK',
      description: 'Diagnostic SEO gratuit pour votre entreprise',
    }
  }

  const metierData = getMetierData(params.metier)

  if (!metierData) {
    return {
      title: 'Diagnostic SEO | INDHACK',
      description: 'Diagnostic SEO gratuit pour votre entreprise',
    }
  }

  const { label, labelPlural } = metierData

  return {
    title: `Diagnostic SEO ${label} | Visibilité Google pour ${labelPlural}`,
    description: `Audit SEO gratuit et personnalisé pour ${labelPlural}. Découvrez comment apparaître en 1ère page Google et attirer plus de clients. Analyse offerte par Indiana Aflalo, consultante SEO.`,
    alternates: {
      canonical: `https://indhack.com/diagnostic/${params.metier}`
    },
    openGraph: {
      title: `Diagnostic SEO ${label} | Votre visibilité Google analysée`,
      description: `Êtes-vous visible sur Google ? Audit SEO gratuit pour ${labelPlural}. Découvrez votre potentiel de croissance.`,
      url: `https://indhack.com/diagnostic/${params.metier}`,
      type: 'website',
      images: [metierData.heroImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Diagnostic SEO ${label}`,
      description: `Audit SEO gratuit pour ${labelPlural}. Découvrez comment dominer Google dans votre secteur.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function DiagnosticPage({ params }: PageProps) {
  // Rediriger vers les pages statiques dédiées si elles existent
  if (EXCLUDED_METIERS.includes(params.metier)) {
    notFound()
  }

  const metierData = getMetierData(params.metier)

  if (!metierData) {
    notFound()
  }

  // Schema.org pour les pages diagnostic
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Diagnostic SEO pour ${metierData.labelPlural}`,
    "description": `Audit SEO gratuit et personnalisé pour ${metierData.labelPlural}. Découvrez comment améliorer votre visibilité sur Google.`,
    "url": `https://indhack.com/diagnostic/${params.metier}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "IndHack",
      "telephone": "+33661139748",
      "email": "contact@indhack.com"
    },
    "offers": {
      "@type": "Offer",
      "name": "Diagnostic SEO Gratuit",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <DiagnosticClient metier={params.metier} metierData={metierData} />
      </Suspense>
    </>
  )
}
