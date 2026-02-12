'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Check, Globe, Calendar, Star, TrendingUp, Phone, MessageCircle, ChevronDown, Users, BarChart3, Bot, AlertTriangle, Clock, ArrowRight, Zap } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { MetierData } from '@/lib/diagnostic-data'

// ══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION PAR MÉTIER
// ══════════════════════════════════════════════════════════════════════════════

// Accroches émotionnelles personnalisées par métier
const PROFESSION_HOOKS: Record<string, { hook: string; heroImage?: string }> = {
  coiffeur: { hook: "Vos clientes vous adorent. Google ne le sait pas.", heroImage: "/images/diagnostic/coiffeur-hero.jpg" },
  barbier: { hook: "Vos clients reviennent chaque mois. Google ne le sait pas.", heroImage: "/images/diagnostic/barbier-hero.jpg" },
  restaurant: { hook: "Vos clients adorent votre cuisine. Google ne le sait pas.", heroImage: "/images/diagnostic/restaurant-hero.jpg" },
  boulangerie: { hook: "Vos clients font la queue chaque matin. Google ne le sait pas.", heroImage: "/images/diagnostic/boulangerie-hero.jpg" },
  traiteur: { hook: "Vos événements sont inoubliables. Google ne le sait pas.", heroImage: "/images/diagnostic/traiteur-hero.jpg" },
  osteopathe: { hook: "Vos patients vous recommandent. Google ne le sait pas.", heroImage: "/images/diagnostic/osteopathe-hero.jpg" },
  kinesitherapeute: { hook: "Vos patients progressent grâce à vous. Google ne le sait pas.", heroImage: "/images/diagnostic/kine-hero.jpg" },
  psychologue: { hook: "Vos patients vous font confiance. Google ne le sait pas.", heroImage: "/images/diagnostic/psychologue-hero.jpg" },
  dentiste: { hook: "Vos patients vous recommandent. Google ne le sait pas.", heroImage: "/images/diagnostic/dentiste-hero.jpg" },
  peintre: { hook: "Vos chantiers parlent pour vous. Google ne le sait pas.", heroImage: "/images/diagnostic/peintre-hero.jpg" },
  carreleur: { hook: "Votre travail est impeccable. Google ne le sait pas.", heroImage: "/images/diagnostic/carreleur-hero.jpg" },
  plombier: { hook: "Vos clients vous rappellent pour chaque urgence. Google ne le sait pas.", heroImage: "/images/diagnostic/plombier-hero.jpg" },
  electricien: { hook: "Vos clients vous font confiance. Google ne le sait pas.", heroImage: "/images/diagnostic/electricien-hero.jpg" },
  serrurier: { hook: "Vos clients comptent sur vous dans l'urgence. Google ne le sait pas.", heroImage: "/images/diagnostic/serrurier-hero.jpg" },
  avocat: { hook: "Vos clients vous font confiance pour les défendre. Google ne le sait pas.", heroImage: "/images/diagnostic/avocat-hero.jpg" },
  renovation: { hook: "Vos chantiers transforment les espaces. Google ne le sait pas.", heroImage: "/images/diagnostic/renovation-hero.jpg" },
  boutique: { hook: "Vos clientes reviennent saison après saison. Google ne le sait pas.", heroImage: "/images/diagnostic/boutique-hero.jpg" },
  'prothesiste-ongulaire': { hook: "Vos clientes adorent vos créations. Google ne le sait pas.", heroImage: "/images/diagnostic/nails-hero.jpg" },
}

// Rubriques mockup par métier (navigation du futur site)
const MOCKUP_TABS: Record<string, string[]> = {
  coiffeur: ['Services', 'Galerie', 'Tarifs', 'Réserver'],
  barbier: ['Services', 'Galerie', 'Tarifs', 'Réserver'],
  restaurant: ['Notre carte', 'Réservation', 'Photos', 'Livraison'],
  boulangerie: ['Nos pains', 'Pâtisseries', 'Horaires', 'Contact'],
  traiteur: ['Nos prestations', 'Menu', 'Devis', 'Contact'],
  osteopathe: ['Spécialités', 'Tarifs', 'Prendre RDV', 'Contact'],
  kinesitherapeute: ['Spécialités', 'Tarifs', 'Prendre RDV', 'Contact'],
  psychologue: ['Approche', 'Tarifs', 'Prendre RDV', 'Contact'],
  dentiste: ['Soins', 'Tarifs', 'Prendre RDV', 'Contact'],
  peintre: ['Réalisations', 'Services', 'Devis gratuit', 'Contact'],
  carreleur: ['Réalisations', 'Services', 'Devis gratuit', 'Contact'],
  plombier: ['Urgences', 'Services', 'Devis', 'Contact'],
  electricien: ['Dépannage', 'Services', 'Devis', 'Contact'],
  serrurier: ['Urgences 24h', 'Services', 'Tarifs', 'Contact'],
  avocat: ['Spécialités', 'Honoraires', 'Consultation', 'Contact'],
  renovation: ['Réalisations', 'Services', 'Devis', 'Contact'],
  boutique: ['Nouveautés', 'Collections', 'Horaires', 'Contact'],
  'prothesiste-ongulaire': ['Prestations', 'Galerie', 'Tarifs', 'Réserver'],
}

// Accroches du mockup par métier
const MOCKUP_TAGLINES: Record<string, string> = {
  coiffeur: "Votre beauté, notre passion",
  barbier: "L'art du barbier depuis 2010",
  restaurant: "Une cuisine authentique et généreuse",
  boulangerie: "Artisan boulanger depuis 3 générations",
  traiteur: "Des saveurs qui marquent vos événements",
  osteopathe: "Retrouvez votre équilibre naturel",
  kinesitherapeute: "Votre rééducation, notre expertise",
  psychologue: "Un espace d'écoute bienveillant",
  dentiste: "Votre sourire, notre priorité",
  peintre: "La qualité dans chaque détail",
  carreleur: "Un savoir-faire artisanal",
  plombier: "Intervention rapide, travail soigné",
  electricien: "Votre sécurité électrique",
  serrurier: "24h/24, toujours disponible",
  avocat: "Défendre vos intérêts avec rigueur",
  renovation: "Transformer votre espace de vie",
  boutique: "Des pièces uniques pour votre style",
  'prothesiste-ongulaire': "Sublimez vos mains",
}

// Images de mockup par métier (template style)
const MOCKUP_IMAGES: Record<string, string> = {
  restaurant: "/images/mockups/restaurant-mockup.jpg",
  boulangerie: "/images/mockups/boulangerie-mockup.jpg",
  coiffeur: "/images/mockups/coiffeur-mockup.jpg",
  barbier: "/images/mockups/barbier-mockup.jpg",
  osteopathe: "/images/mockups/sante-mockup.jpg",
  kinesitherapeute: "/images/mockups/sante-mockup.jpg",
  psychologue: "/images/mockups/sante-mockup.jpg",
  dentiste: "/images/mockups/dentiste-mockup.jpg",
  peintre: "/images/mockups/artisan-mockup.jpg",
  carreleur: "/images/mockups/artisan-mockup.jpg",
  plombier: "/images/mockups/artisan-mockup.jpg",
  electricien: "/images/mockups/artisan-mockup.jpg",
  serrurier: "/images/mockups/artisan-mockup.jpg",
  traiteur: "/images/mockups/traiteur-mockup.jpg",
}

// Populations des villes pour adapter les volumes
const CITY_POPULATIONS: Record<string, number> = {
  'nice': 340000,
  'cannes': 74000,
  'antibes': 73000,
  'grasse': 51000,
  'cagnes-sur-mer': 50000,
  'le cannet': 42000,
  'menton': 30000,
  'vallauris': 28000,
  'mandelieu-la-napoule': 23000,
  'mougins': 19000,
  'vence': 19000,
  'villeneuve-loubet': 15000,
  'beausoleil': 14000,
  'roquebrune-cap-martin': 13000,
  'carros': 12000,
  'la trinité': 11000,
  'saint-laurent-du-var': 30000,
  'marseille': 870000,
  'paris': 2150000,
  'lyon': 520000,
  'toulouse': 480000,
  'bordeaux': 260000,
  'montpellier': 290000,
  'strasbourg': 280000,
  'nantes': 310000,
  'lille': 230000,
  'monaco': 39000,
}

// Population de référence (Nice pour les volumes de base)
const REFERENCE_POPULATION = 340000

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════

function estimateVolumeForCity(baseVolume: number, cityName: string): number {
  const citySlug = cityName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const population = CITY_POPULATIONS[citySlug] || 50000
  const ratio = population / REFERENCE_POPULATION
  // Boost pour les petites villes (recherches plus locales)
  const localBoost = 1 + (0.15 * (1 - ratio))
  return Math.round(baseVolume * ratio * localBoost)
}

function formatVolume(volume: number): string {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1).replace('.0', '')}k`
  }
  return volume.toString()
}

// ══════════════════════════════════════════════════════════════════════════════
// VILLES POUR LIENS SEO
// ══════════════════════════════════════════════════════════════════════════════

const FEATURED_CITIES = [
  { name: 'Nice', slug: 'seo-nice' },
  { name: 'Cannes', slug: 'seo-cannes' },
  { name: 'Antibes', slug: 'seo-antibes' },
  { name: 'Monaco', slug: 'seo-monaco' },
  { name: 'Marseille', slug: 'seo-marseille' },
  { name: 'Paris', slug: 'seo-paris' },
]

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════

interface DiagnosticClientProps {
  metier: string
  metierData: MetierData
}

export default function DiagnosticClient({ metier, metierData }: DiagnosticClientProps) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Commerce'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Récupérer les données personnalisées
  const professionHook = PROFESSION_HOOKS[metier] || { hook: "Vos clients vous font confiance. Google ne le sait pas." }
  const mockupTabs = MOCKUP_TABS[metier] || ['Accueil', 'Services', 'Contact', 'À propos']
  const mockupTagline = MOCKUP_TAGLINES[metier] || "L'excellence au service de nos clients"

  // Calculer les volumes adaptés à la ville
  const mainKeyword = metierData.keywords.principal[0]
  const adaptedKeywords = metierData.keywords.principal.map(kw => ({
    ...kw,
    keyword: kw.keyword.replace('nice', ville.toLowerCase()).replace('Nice', ville),
    volume: estimateVolumeForCity(kw.volume, ville)
  }))
  const totalVolume = adaptedKeywords.reduce((sum, kw) => sum + kw.volume, 0)

  return (
    <main className="min-h-screen bg-white">

      {/* ════════ SECTION 1 — HERO PERSONNALISÉ ════════ */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={professionHook.heroImage || metierData.heroImage}
            alt={`${metierData.label} - Diagnostic SEO`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm">Analyse pour <strong>{nom}</strong></span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
              {professionHook.hook}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-medium">{note}/5</span>
                <span className="text-white/60">sur Google</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span>{ville}</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <p className="text-lg text-white/90 font-medium mb-2">
                {metierData.label} · {nom}
              </p>
              <p className="text-white/70">
                {avis} avis clients · Noté {note}/5 sur Google
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ════════ SECTION 2 — VOLUMES DE RECHERCHE ADAPTÉS À LA VILLE ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Chaque mois à <span className="font-medium">{ville}</span>
            </h2>
            <p className="text-xl text-gray-500">
              Des clients cherchent un {metierData.label.toLowerCase()}. Ils ne vous trouvent pas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {adaptedKeywords.slice(0, 3).map((kw, i) => (
              <div key={kw.keyword} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="text-4xl font-light text-gray-900 mb-2">
                  {formatVolume(kw.volume)}
                </div>
                <p className="text-gray-500 text-sm">
                  recherches/mois
                </p>
                <p className="text-gray-700 font-medium mt-4">
                  "{kw.keyword}"
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
            <p className="text-amber-800">
              <strong>{formatVolume(totalVolume)} recherches/mois</strong> pour des {metierData.labelPlural.toLowerCase()} à {ville}.
              <br />
              <span className="text-amber-700">Sans site optimisé, ces clients vont chez vos concurrents.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — POURQUOI C'EST IMPORTANT (4 blocs adaptés) ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Pourquoi créer un site internet<br />
              <span className="font-medium">pour {nom} ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Être trouvé sur Google</h3>
              <p className="text-gray-600 leading-relaxed">
                Quand quelqu'un tape "{metierData.label.toLowerCase()} {ville}" sur Google, il voit une liste de résultats.
                Sans site web optimisé, {nom} n'apparaît pas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Inspirer confiance</h3>
              <p className="text-gray-600 leading-relaxed">
                En 2026, un {metierData.label.toLowerCase()} sans site web paraît moins crédible.
                Un site soigné rassure les nouveaux clients de {ville} et montre votre professionnalisme.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Travailler 24h/24</h3>
              <p className="text-gray-600 leading-relaxed">
                Votre site présente vos services aux habitants de {ville} même quand vous dormez.
                C'est un commercial qui travaille pour {nom} sans jamais s'arrêter.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Posséder votre espace</h3>
              <p className="text-gray-600 leading-relaxed">
                Instagram et Google My Business ne vous appartiennent pas.
                Votre site web, c'est l'espace de {nom}, avec vos règles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 — MOCKUP DU FUTUR SITE ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Votre futur site pourrait<br />
              <span className="font-medium">ressembler à ça</span>
            </h2>
            <p className="text-gray-500">
              Un site personnalisé pour {nom}, optimisé pour {ville}
            </p>
          </div>

          {/* Browser Mockup */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-gray-500 font-mono">
                {nom.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.fr
              </div>
            </div>

            {/* Site Content */}
            <div className="relative">
              {/* Navigation */}
              <nav className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <div className="font-semibold text-gray-900 text-lg">{nom}</div>
                <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                  {mockupTabs.map((tab) => (
                    <span key={tab} className="hover:text-gray-900 cursor-pointer">{tab}</span>
                  ))}
                </div>
                <div className="md:hidden text-gray-600">
                  <div className="w-6 h-0.5 bg-gray-600 mb-1.5" />
                  <div className="w-6 h-0.5 bg-gray-600 mb-1.5" />
                  <div className="w-4 h-0.5 bg-gray-600" />
                </div>
              </nav>

              {/* Hero Section of Mockup */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src={MOCKUP_IMAGES[metier] || metierData.heroImage}
                    alt={`Site web ${metierData.label}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 text-center px-6">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-3">{nom}</h3>
                  <p className="text-white/80">{mockupTagline}</p>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {mockupTabs.includes('Réserver') || mockupTabs.includes('Prendre RDV') ? 'Prendre RDV' : 'Nous contacter'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 text-center py-6 bg-gray-50 border-t border-gray-100">
                <div>
                  <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-medium">{note}</span>
                  </div>
                  <p className="text-xs text-gray-500">{avis} avis</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-gray-700 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium text-sm">{ville}</span>
                  </div>
                  <p className="text-xs text-gray-500">Localisation</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                    <Check className="w-4 h-4" />
                    <span className="font-medium text-sm">Ouvert</span>
                  </div>
                  <p className="text-xs text-gray-500">Aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Aperçu indicatif · Le design final sera adapté à votre identité
          </p>
        </div>
      </section>

      {/* ════════ SECTION 5 — STRATÉGIE 1 MOT-CLÉ = 1 PAGE ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Stratégie SEO
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              1 mot-clé = 1 page<br />
              <span className="font-medium">La méthode qui fonctionne</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Voici les pages que nous créerions pour {nom} à {ville}.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Pages optimisées pour {nom}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {metierData.ghostPageExamples.map((page) => {
                const adaptedPage = page.replace('Nice', ville)
                return (
                  <div key={page} className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{adaptedPage}</p>
                      <p className="text-sm text-gray-500">Page dédiée</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Chaque page cible un mot-clé précis que vos clients tapent sur Google.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 6 — ACCOMPAGNEMENT (4 ÉTAPES) ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Comment ça se passe ?
            </h2>
            <p className="text-gray-500 text-lg">
              Un accompagnement simple et transparent pour {nom}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-medium">1</div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 pt-2">Appel découverte</h3>
              <p className="text-gray-600">
                30 minutes pour comprendre votre activité de {metierData.label.toLowerCase()}, vos objectifs à {ville} et vos besoins.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-medium">2</div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 pt-2">Audit & proposition</h3>
              <p className="text-gray-600">
                J'analyse votre marché à {ville} et je vous propose une stratégie adaptée à {nom}.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-medium">3</div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 pt-2">Création du site</h3>
              <p className="text-gray-600">
                Design sur-mesure, contenus optimisés, mise en ligne de votre nouveau site.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-medium">4</div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 pt-2">Suivi & optimisation</h3>
              <p className="text-gray-600">
                Référencement continu, suivi des positions, ajustements pour maximiser vos résultats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 7 — QUI SUIS-JE ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-6">
                <span>IndHack · Nice</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Je suis Indiana,<br />
                <span className="font-medium">consultante SEO</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Après un double master en stratégie digitale et expérience utilisateur,
                j'accompagne les {metierData.labelPlural.toLowerCase()} et indépendants dans leur visibilité en ligne.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mon approche : des stratégies concrètes, des résultats mesurables, pas de jargon inutile.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 via-rose-50 to-violet-100 rounded-3xl blur-2xl opacity-60" />
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xl">IA</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Indiana Aflalo</h3>
                    <p className="text-gray-500 text-sm">Consultante SEO · Nice</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Double master stratégie digitale & UX</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Expérience en agence digitale</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Spécialisée SEO local Côte d'Azur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 8 — TARIFS ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Tarifs transparents</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Des formules claires, adaptées à votre budget. Sans engagement.
            </p>
          </div>

          {/* Disclaimer AVANT les tarifs */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-12 text-center">
            <p className="text-amber-800">
              <strong>Ces tarifs sont des points de départ</strong> pour vous donner une idée.
              <br />
              Le prix final sera ajusté après notre échange, en fonction de vos besoins spécifiques et de l'audit détaillé de {nom}.
            </p>
          </div>

          {/* 3 CARDS TARIFS */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* CARD 1 — Site Vitrine */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Site Vitrine</h3>
              <p className="text-gray-500 text-sm mb-6">Votre présence en ligne</p>
              <div className="mb-8">
                <p className="text-sm text-gray-500">à partir de</p>
                <p className="text-4xl font-light text-gray-900">490<span className="text-lg">€</span></p>
                <p className="text-sm text-gray-500">paiement unique</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Site sur-mesure à votre image</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Adapté mobile et tablette</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Bouton de réservation</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Vous êtes propriétaire du site</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Hébergement 1ère année inclus</span>
                </li>
              </ul>
            </div>

            {/* CARD 2 — Site + Visibilité (POPULAIRE) */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 shadow-lg relative border-2 border-amber-400">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-full">Populaire</span>
              </div>
              <h3 className="text-xl font-medium mb-1 pt-2">Site + Visibilité</h3>
              <p className="text-gray-400 text-sm mb-6">Être trouvé sur Google</p>
              <div className="mb-8">
                <p className="text-sm text-gray-400">à partir de</p>
                <p className="text-4xl font-light">150<span className="text-lg">€</span><span className="text-lg text-gray-400">/mois</span></p>
                <p className="text-sm text-gray-400">+ création du site</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-amber-400 mt-1">·</span>
                  <span>Site vitrine sur-mesure</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-amber-400 mt-1">·</span>
                  <span>Pages optimisées pour vos mots-clés</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-amber-400 mt-1">·</span>
                  <span>Fiche Google optimisée</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-amber-400 mt-1">·</span>
                  <span>Contenu adapté à votre activité</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-amber-400 mt-1">·</span>
                  <span>Rapport mensuel simple et clair</span>
                </li>
                <li className="flex items-start gap-3 text-white text-sm font-medium">
                  <span className="text-amber-400 mt-1">·</span>
                  <span>Sans engagement</span>
                </li>
              </ul>
            </div>

            {/* CARD 3 — Accompagnement Complet */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Accompagnement Complet</h3>
              <p className="text-gray-500 text-sm mb-6">Visibilité maximale</p>
              <div className="mb-8">
                <p className="text-sm text-gray-500">à partir de</p>
                <p className="text-4xl font-light text-gray-900">250<span className="text-lg">€</span><span className="text-lg text-gray-500">/mois</span></p>
                <p className="text-sm text-gray-500">+ création du site</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Tout le pack Visibilité</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Gestion complète fiche Google</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Réponses aux avis optimisées</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Visibilité dans les réponses IA</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Support WhatsApp direct</span>
                </li>
                <li className="flex items-start gap-3 text-gray-900 text-sm font-medium">
                  <span className="text-gray-400 mt-1">·</span>
                  <span>Sans engagement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Texte sous les cards */}
          <div className="text-center mt-10">
            <p className="text-gray-500 max-w-2xl mx-auto">
              Chaque commerce est différent. Ces tarifs sont des points de départ —
              je vous propose un devis détaillé et transparent après notre échange.
              <br />
              <strong className="text-gray-700">Pas de surprise, pas de frais cachés.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES SEO - VILLES ════════ */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-light text-gray-900 mb-2">
              Consultante SEO dans votre ville
            </h2>
            <p className="text-gray-500">
              J'accompagne les {metierData.labelPlural.toLowerCase()} partout en France
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group bg-gray-50 hover:bg-sauge/10 rounded-xl p-4 text-center transition-all hover:shadow-md"
              >
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-sauge mx-auto mb-2 transition-colors" />
                <span className="text-gray-700 group-hover:text-sauge font-medium text-sm transition-colors">
                  SEO {city.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/seo-local"
              className="inline-flex items-center gap-2 text-sauge hover:text-ink font-medium transition-colors"
            >
              Voir toutes mes zones d'intervention
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES - SERVICES ════════ */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Mes expertises</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/audit-seo" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Audit SEO
            </Link>
            <Link href="/referencement-naturel" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Référencement Naturel
            </Link>
            <Link href="/creation-site-web" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Création de Site Web
            </Link>
            <Link href="/seo-local" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              SEO Local
            </Link>
            <Link href="/community-manager" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Community Manager
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 9 — CTA CALENDLY ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">On en discute ?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Réservez un appel de 30 minutes. Je vous explique concrètement ce qu'on peut faire
            pour <span className="text-white">{nom}</span> à {ville}, sans engagement.
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-full font-medium hover:bg-gray-100 transition-colors text-lg"
          >
            <Calendar className="w-5 h-5" />
            Réserver un appel gratuit
          </a>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500">
            <a href="tel:0661139748" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              06 61 13 97 48
            </a>
            <a href="mailto:contact@indhack.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              contact@indhack.com
            </a>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-8 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">IndHack · Consultante SEO · Nice</Link>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>

    </main>
  )
}
