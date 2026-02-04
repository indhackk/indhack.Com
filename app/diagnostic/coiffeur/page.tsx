import { Metadata } from 'next'
import CoiffeurClient from './CoiffeurClient'

export const metadata: Metadata = {
  title: "Diagnostic SEO Coiffeur | Visibilité Google pour Salons de Coiffure",
  description: "Audit SEO gratuit pour coiffeurs et salons de coiffure. Découvrez comment apparaître en 1ère page Google quand vos clients cherchent 'coiffeur', 'coloriste' ou 'balayage' dans votre ville.",
  alternates: {
    canonical: "https://indhack.com/diagnostic/coiffeur"
  },
  openGraph: {
    title: "Diagnostic SEO Coiffeur | Votre visibilité Google analysée",
    description: "Êtes-vous visible sur Google ? Audit SEO gratuit pour salons de coiffure. Découvrez votre potentiel de croissance.",
    url: "https://indhack.com/diagnostic/coiffeur",
    type: "website",
    images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CoiffeurDiagnosticPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Diagnostic SEO pour Coiffeurs",
    "description": "Audit SEO gratuit et personnalisé pour salons de coiffure. Découvrez comment améliorer votre visibilité sur Google.",
    "url": "https://indhack.com/diagnostic/coiffeur",
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
      <CoiffeurClient />
    </>
  )
}
