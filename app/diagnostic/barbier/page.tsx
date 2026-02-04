import { Metadata } from 'next'
import BarbierClient from './BarbierClient'

export const metadata: Metadata = {
  title: "Diagnostic SEO Barbier | Visibilité Google pour Barbershops",
  description: "Audit SEO gratuit pour barbiers et barbershops. Découvrez comment apparaître en 1ère page Google quand vos clients cherchent 'barbier' ou 'barber' dans votre ville.",
  alternates: {
    canonical: "https://indhack.com/diagnostic/barbier"
  },
  openGraph: {
    title: "Diagnostic SEO Barbier | Votre visibilité Google analysée",
    description: "Êtes-vous visible sur Google ? Audit SEO gratuit pour barbershops. Découvrez votre potentiel de croissance.",
    url: "https://indhack.com/diagnostic/barbier",
    type: "website",
    images: ["https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BarbierDiagnosticPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Diagnostic SEO pour Barbiers",
    "description": "Audit SEO gratuit et personnalisé pour barbershops. Découvrez comment améliorer votre visibilité sur Google.",
    "url": "https://indhack.com/diagnostic/barbier",
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
      "priceCurrency": "EUR"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BarbierClient />
    </>
  )
}
