'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import type { MetierData } from '@/lib/diagnostic-data'

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DIAGNOSTIC DYNAMIQUE - Couleurs adaptees par categorie
// ══════════════════════════════════════════════════════════════════════════════

// Schemas de couleurs par CATEGORIE
interface ColorScheme {
  bg: string           // Fond principal
  bgAlt: string        // Fond alternatif
  bgCard: string       // Fond des cartes
  accent: string       // Couleur d'accent principale
  accentLight: string  // Accent clair (badges, highlights)
  accentDark: string   // Accent fonce (CTA)
  text: string         // Texte principal
  textMuted: string    // Texte secondaire
  textAccent: string   // Texte accent
}

const CATEGORY_COLORS: Record<string, ColorScheme> = {
  // RESTAURATION : tons chauds, appetissants
  RESTAURATION: {
    bg: '#FFFBF7',
    bgAlt: '#FFF5EB',
    bgCard: '#FFFFFF',
    accent: '#D97706',
    accentLight: '#FEF3E7',
    accentDark: '#92400E',
    text: '#2D2A26',
    textMuted: '#78716C',
    textAccent: '#B45309',
  },
  // SANTE : tons froids, professionnels, rassurants
  SANTE: {
    bg: '#F8FDFC',
    bgAlt: '#E6F7F5',
    bgCard: '#FFFFFF',
    accent: '#0D9488',
    accentLight: '#CCFBF1',
    accentDark: '#115E59',
    text: '#1E3A3A',
    textMuted: '#5F7A7A',
    textAccent: '#0F766E',
  },
  // ARTISANS : tons terre, solides, fiables
  ARTISANS: {
    bg: '#FAFAF9',
    bgAlt: '#F5F5F4',
    bgCard: '#FFFFFF',
    accent: '#EA580C',
    accentLight: '#FED7AA',
    accentDark: '#9A3412',
    text: '#1C1917',
    textMuted: '#78716C',
    textAccent: '#C2410C',
  },
  // BEAUTE : tons roses/dores, elegants
  BEAUTE: {
    bg: '#FDFCFB',
    bgAlt: '#F5F0EB',
    bgCard: '#FFFFFF',
    accent: '#D4A574',
    accentLight: '#FEF3E7',
    accentDark: '#8B7355',
    text: '#2D2A26',
    textMuted: '#5C5650',
    textAccent: '#8B7355',
  },
}

// Mapping metier -> categorie
const METIER_CATEGORY: Record<string, string> = {
  // BEAUTE
  coiffeur: 'BEAUTE',
  barbier: 'BEAUTE',
  'prothesiste-ongulaire': 'BEAUTE',
  boutique: 'BEAUTE',
  estheticienne: 'BEAUTE',
  spa: 'BEAUTE',

  // RESTAURATION
  restaurant: 'RESTAURATION',
  boulangerie: 'RESTAURATION',
  patisserie: 'RESTAURATION',
  traiteur: 'RESTAURATION',
  pizzeria: 'RESTAURATION',
  cafe: 'RESTAURATION',
  bar: 'RESTAURATION',
  glacier: 'RESTAURATION',

  // SANTE
  osteopathe: 'SANTE',
  kinesitherapeute: 'SANTE',
  psychologue: 'SANTE',
  dentiste: 'SANTE',
  medecin: 'SANTE',
  infirmier: 'SANTE',
  avocat: 'SANTE', // Pro, serieux
  notaire: 'SANTE',

  // ARTISANS
  peintre: 'ARTISANS',
  carreleur: 'ARTISANS',
  plombier: 'ARTISANS',
  electricien: 'ARTISANS',
  serrurier: 'ARTISANS',
  renovation: 'ARTISANS',
  maconnerie: 'ARTISANS',
  menuisier: 'ARTISANS',
  couvreur: 'ARTISANS',
  chauffagiste: 'ARTISANS',
  climatisation: 'ARTISANS',
  paysagiste: 'ARTISANS',
}

function getColorScheme(metier: string): ColorScheme {
  const category = METIER_CATEGORY[metier] || 'BEAUTE'
  return CATEGORY_COLORS[category]
}

// Hooks personnalises par metier
const PROFESSION_HOOKS: Record<string, { line1: string; line2: string; line3: string }> = {
  coiffeur: { line1: "Vos clients", line2: "vous adorent.", line3: "Google ne le sait pas." },
  barbier: { line1: "Vos clients", line2: "reviennent chaque mois.", line3: "Google ne le sait pas." },
  restaurant: { line1: "Vos clients", line2: "adorent votre cuisine.", line3: "Google ne le sait pas." },
  boulangerie: { line1: "Vos clients", line2: "font la queue chaque matin.", line3: "Google ne le sait pas." },
  traiteur: { line1: "Vos événements", line2: "sont inoubliables.", line3: "Google ne le sait pas." },
  osteopathe: { line1: "Vos patients", line2: "vous recommandent.", line3: "Google ne le sait pas." },
  kinesitherapeute: { line1: "Vos patients", line2: "progressent grâce à vous.", line3: "Google ne le sait pas." },
  psychologue: { line1: "Vos patients", line2: "vous font confiance.", line3: "Google ne le sait pas." },
  dentiste: { line1: "Vos patients", line2: "vous recommandent.", line3: "Google ne le sait pas." },
  peintre: { line1: "Vos chantiers", line2: "parlent pour vous.", line3: "Google ne le sait pas." },
  carreleur: { line1: "Votre travail", line2: "est impeccable.", line3: "Google ne le sait pas." },
  plombier: { line1: "Vos clients", line2: "vous rappellent pour chaque urgence.", line3: "Google ne le sait pas." },
  electricien: { line1: "Vos clients", line2: "savent que vous êtes fiable.", line3: "Google ne le sait pas." },
  serrurier: { line1: "Vos clients", line2: "comptent sur vous dans l'urgence.", line3: "Google ne le sait pas." },
  avocat: { line1: "Vos clients", line2: "vous font confiance.", line3: "Google ne le sait pas." },
  renovation: { line1: "Vos chantiers", line2: "transforment les espaces.", line3: "Google ne le sait pas." },
  boutique: { line1: "Vos clientes", line2: "reviennent saison après saison.", line3: "Google ne le sait pas." },
  'prothesiste-ongulaire': { line1: "Vos clientes", line2: "adorent vos créations.", line3: "Google ne le sait pas." },
}

// Mots-clés exemples pour le hero par métier
const HERO_KEYWORDS: Record<string, string[]> = {
  coiffeur: ['balayage', 'coloriste', 'lissage brésilien'],
  barbier: ['barbier', 'coupe homme', 'barbe'],
  restaurant: ['restaurant', 'où manger', 'terrasse'],
  boulangerie: ['boulangerie', 'pain artisanal', 'croissant'],
  traiteur: ['traiteur mariage', 'buffet', 'cocktail'],
  osteopathe: ['ostéopathe', 'mal de dos', 'ostéo sportif'],
  kinesitherapeute: ['kiné', 'rééducation', 'kiné sportif'],
  psychologue: ['psychologue', 'thérapie', 'psy couple'],
  dentiste: ['dentiste', 'implant dentaire', 'blanchiment'],
  peintre: ['peintre', 'peinture appartement', 'ravalement'],
  carreleur: ['carreleur', 'pose carrelage', 'faïence'],
  plombier: ['plombier urgence', 'fuite eau', 'débouchage'],
  electricien: ['électricien', 'dépannage électrique', 'panne'],
  serrurier: ['serrurier urgence', 'ouverture porte', 'serrure'],
  avocat: ['avocat divorce', 'avocat travail', 'consultation'],
  renovation: ['rénovation appartement', 'travaux', 'rénovation cuisine'],
  boutique: ['boutique vêtements', 'mode femme', 'créateur'],
  'prothesiste-ongulaire': ['pose ongles', 'manucure', 'nail art'],
}

// Tabs mockup par métier
const MOCKUP_TABS: Record<string, string[]> = {
  coiffeur: ['Prestations', 'Galerie', 'Tarifs', 'Réserver'],
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

// Taglines mockup
const MOCKUP_TAGLINES: Record<string, string> = {
  coiffeur: "Votre experte coloration",
  barbier: "L'art du barbier",
  restaurant: "Une cuisine authentique",
  boulangerie: "Artisan boulanger",
  traiteur: "Vos événements, notre passion",
  osteopathe: "Retrouvez votre équilibre",
  kinesitherapeute: "Votre rééducation, notre expertise",
  psychologue: "Un espace d'écoute",
  dentiste: "Votre sourire, notre priorité",
  peintre: "La qualité dans chaque détail",
  carreleur: "Un savoir-faire artisanal",
  plombier: "Intervention rapide",
  electricien: "Votre sécurité électrique",
  serrurier: "24h/24, toujours disponible",
  avocat: "Défendre vos intérêts",
  renovation: "Transformer votre espace",
  boutique: "Des pièces uniques",
  'prothesiste-ongulaire': "Sublimez vos mains",
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
}

const REFERENCE_POPULATION = 340000

function estimateVolumeForCity(baseVolume: number, cityName: string): number {
  const citySlug = cityName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const population = CITY_POPULATIONS[citySlug] || 50000
  const ratio = population / REFERENCE_POPULATION
  const localBoost = 1 + (0.15 * (1 - ratio))
  return Math.round(baseVolume * ratio * localBoost)
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════

interface DiagnosticClientProps {
  metier: string
  metierData: MetierData
}

function DiagnosticContent({ metier, metierData }: DiagnosticClientProps) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Commerce'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  // COULEURS DYNAMIQUES par categorie
  const colors = getColorScheme(metier)

  // Recuperer les donnees personnalisees
  const hooks = PROFESSION_HOOKS[metier] || { line1: "Vos clients", line2: "vous font confiance.", line3: "Google ne le sait pas." }
  const heroKeywords = HERO_KEYWORDS[metier] || ['votre service', 'votre activite', 'votre expertise']
  const mockupTabs = MOCKUP_TABS[metier] || ['Accueil', 'Services', 'Tarifs', 'Contact']
  const mockupTagline = MOCKUP_TAGLINES[metier] || "L'excellence au service de nos clients"

  // Calculer les volumes adaptes a la ville
  const adaptedKeywords = metierData.keywords.principal.slice(0, 4).map(kw => ({
    ...kw,
    keyword: kw.keyword.replace(/nice/gi, ville),
    volume: estimateVolumeForCity(kw.volume, ville)
  }))

  // Combiner avec niches pour avoir 4 stats
  const nicheKeywords = metierData.keywords.niches.slice(0, 2).map(kw => ({
    ...kw,
    keyword: kw.keyword.replace(/nice/gi, ville),
    volume: estimateVolumeForCity(kw.volume, ville)
  }))

  const statsKeywords = [...adaptedKeywords.slice(0, 2), ...nicheKeywords.slice(0, 2)]

  return (
    <main className="min-h-screen" style={{ backgroundColor: colors.bg }}>

      {/* ════════ HERO - Texte gauche / Image droite ════════ */}
      <section className="min-h-screen grid lg:grid-cols-2">

        {/* Colonne gauche - Texte */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 w-fit mb-8" style={{ backgroundColor: colors.accentLight }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }}></span>
            <span className="text-sm font-medium" style={{ color: colors.textAccent }}>Analyse pour {nom}</span>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8" style={{ color: colors.text }}>
            {hooks.line1}<br />
            {hooks.line2}<br />
            <span className="font-semibold" style={{ color: colors.accent }}>{hooks.line3}</span>
          </h1>

          {/* Texte */}
          <div className="space-y-6 text-lg leading-relaxed mb-10 max-w-lg" style={{ color: colors.textMuted }}>
            <p>
              <strong style={{ color: colors.text }}>{note} etoiles</strong> et <strong style={{ color: colors.text }}>{avis} avis</strong> sur votre fiche Google.
              C'est la preuve que vous faites du bon travail.
            </p>
            <p>
              Le probleme ? Quand un internaute cherche <strong style={{ color: colors.text }}>"{heroKeywords[0]} {ville}"</strong>,
              <strong style={{ color: colors.text }}> "{heroKeywords[1]} {ville}"</strong> ou <strong style={{ color: colors.text }}>"{heroKeywords[2]} {ville}"</strong> sur Google,
              il ne tombe pas sur vous.
            </p>
            <p>
              Il tombe sur vos concurrents. Ceux qui ont un site internet.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm" style={{ color: colors.textAccent }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>{note}/5 sur Google</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{ville}</span>
            </div>
          </div>

        </div>

        {/* Colonne droite - Image */}
        <div className="relative h-[50vh] lg:h-auto">
          <Image
            src={metierData.heroImage}
            alt={`${metierData.label} ${nom}`}
            fill
            className="object-cover"
            priority
            unoptimized={metierData.heroImage.startsWith('http')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
          <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(to right, ${colors.bg}, transparent, transparent)` }}></div>
        </div>

      </section>

      {/* ════════ LE CONSTAT EN CHIFFRES ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bgCard }}>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>Chaque mois a {ville}</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: colors.text }}>
              Des clients cherchent un {metierData.label.toLowerCase()}.<br />
              <span className="font-semibold">Ils ne vous trouvent pas.</span>
            </h2>
          </div>

          {/* Grille de stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {statsKeywords.map((kw) => (
              <div key={kw.keyword} className="rounded-2xl p-6 text-center" style={{ backgroundColor: colors.bg }}>
                <p className="text-4xl font-light mb-2" style={{ color: colors.text }}>{kw.volume}</p>
                <p className="text-sm" style={{ color: colors.textAccent }}>recherches <strong>"{kw.keyword}"</strong></p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
            Ces chiffres sont reels. Ce sont des internautes qui tapent ces mots dans Google,
            prets a vous contacter. <strong style={{ color: colors.text }}>Sans site internet, vous etes invisible pour eux.</strong>
          </p>

          <div className="mt-12 rounded-2xl p-6 text-center" style={{ backgroundColor: colors.accentLight }}>
            <p className="font-medium" style={{ color: colors.textAccent }}>
              Chaque jour sans site, ce sont des clients potentiels qui vont chez vos concurrents.
              <br />
              <span style={{ color: colors.text }}>Pas parce qu'ils sont meilleurs - mais parce qu'ils sont visibles.</span>
            </p>
          </div>

        </div>
      </section>

      {/* ════════ POURQUOI UN SITE ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>Pourquoi c'est important</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: colors.text }}>
              Un site internet, c'est votre<br />
              <span className="font-semibold">vitrine ouverte 24h/24</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Carte 1 */}
            <div className="rounded-3xl p-10 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                Etre trouve sur Google
              </h3>
              <p className="leading-relaxed" style={{ color: colors.textMuted }}>
                Quand un internaute cherche <strong style={{ color: colors.text }}>"{heroKeywords[0]} {ville}"</strong> ou
                <strong style={{ color: colors.text }}> "{heroKeywords[1]} {ville}"</strong>,
                un site web vous permet d'apparaitre dans les resultats.
              </p>
            </div>

            {/* Carte 2 */}
            <div className="rounded-3xl p-10 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                Inspirer confiance
              </h3>
              <p className="leading-relaxed" style={{ color: colors.textMuted }}>
                Un internaute decouvre votre travail et veut en savoir plus.
                Un site pro avec vos <strong style={{ color: colors.text }}>photos, tarifs et avis</strong> rassure et incite a vous contacter.
              </p>
            </div>

            {/* Carte 3 */}
            <div className="rounded-3xl p-10 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                Travailler pour vous H24
              </h3>
              <p className="leading-relaxed" style={{ color: colors.textMuted }}>
                Votre site attire des visiteurs meme quand vous dormez.
                Le dimanche soir, un internaute peut vous decouvrir et
                <strong style={{ color: colors.text }}> vous contacter pour la semaine</strong>.
              </p>
            </div>

            {/* Carte 4 */}
            <div className="rounded-3xl p-10 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                Posseder votre espace
              </h3>
              <p className="leading-relaxed" style={{ color: colors.textMuted }}>
                Instagram peut changer ses regles demain. Votre site, c'est <strong style={{ color: colors.text }}>votre propriete</strong>.
                Personne ne peut vous l'enlever ou vous faire payer des commissions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ APERCU DU SITE ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>Ce que vous aurez</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: colors.text }}>
              Un site professionnel<br />
              <span className="font-semibold">qui travaille pour vous</span>
            </h2>
          </div>

          {/* Mockup navigateur ameliore */}
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200" style={{ backgroundColor: colors.bgCard }}>

            {/* Barre navigateur */}
            <div className="bg-gradient-to-b from-[#F8F8F8] to-[#EFEFEF] px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-gray-500 text-center mx-8 border border-gray-200 shadow-inner">
                <span className="text-green-600">https://</span>{nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.fr
              </div>
            </div>

            {/* Site simule - structure realiste */}
            <div style={{ backgroundColor: colors.bgCard }}>

              {/* Header du site fictif */}
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.accentDark }}>
                    <span className="text-white font-bold text-sm">{nom.charAt(0)}</span>
                  </div>
                  <span className="font-semibold" style={{ color: colors.text }}>{nom}</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                  {mockupTabs.slice(0, 3).map((tab) => (
                    <span key={tab} className="cursor-pointer" style={{ color: colors.textMuted }}>{tab}</span>
                  ))}
                  <span className="text-white px-4 py-2 rounded-lg font-medium text-sm" style={{ backgroundColor: colors.accentDark }}>{mockupTabs[3] || 'Contact'}</span>
                </div>
              </div>

              {/* Hero du site fictif */}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-fit mb-4" style={{ backgroundColor: colors.accentLight, color: colors.accentDark }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }}></span>
                    Ouvert aujourd'hui
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                    {mockupTagline}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                    {metierData.label} a {ville}. {note} etoiles sur Google avec {avis} avis clients.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-white px-5 py-2.5 rounded-lg font-medium text-sm" style={{ backgroundColor: colors.accentDark }}>
                      {mockupTabs.includes('Reserver') || mockupTabs.includes('Prendre RDV') ? 'Reserver en ligne' : 'Demander un devis'}
                    </span>
                    <span className="border px-5 py-2.5 rounded-lg font-medium text-sm" style={{ borderColor: colors.textMuted, color: colors.textMuted }}>
                      06 XX XX XX XX
                    </span>
                  </div>
                </div>
                <div className="relative h-[250px] md:h-auto">
                  <Image
                    src={metierData.mockupImage}
                    alt={`${metierData.label} ${ville}`}
                    fill
                    className="object-cover"
                    unoptimized={metierData.mockupImage.startsWith('http')}
                  />
                </div>
              </div>

              {/* Section services du site fictif */}
              <div className="border-t border-gray-100 p-6 md:p-8" style={{ backgroundColor: colors.bgAlt }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {metierData.services.slice(0, 4).map((service, i) => (
                    <div key={service} className="p-4 rounded-xl text-center shadow-sm" style={{ backgroundColor: colors.bgCard }}>
                      <div className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: colors.accentLight }}>
                        <span className="font-semibold text-sm" style={{ color: colors.textAccent }}>{i + 1}</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer du site fictif */}
              <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between text-xs" style={{ color: colors.textMuted }}>
                <span>{nom} - {ville}</span>
                <div className="flex items-center gap-4">
                  <span>Mentions legales</span>
                  <span>Contact</span>
                </div>
              </div>

            </div>

          </div>

          {/* Points cles sous le mockup */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-5 h-5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: colors.text }}>Adapte mobile</h4>
              <p className="text-sm" style={{ color: colors.textMuted }}>60% des recherches se font sur telephone</p>
            </div>
            <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-5 h-5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: colors.text }}>Ultra rapide</h4>
              <p className="text-sm" style={{ color: colors.textMuted }}>Chargement en moins de 2 secondes</p>
            </div>
            <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: colors.accentLight }}>
                <svg className="w-5 h-5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: colors.text }}>Modifiable</h4>
              <p className="text-sm" style={{ color: colors.textMuted }}>Vous pouvez modifier vos infos facilement</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ COMMENT ÇA MARCHE - PÉDAGOGIE SEO ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bgCard }}>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>La strategie</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: colors.text }}>
              Comment on vous rend<br />
              <span className="font-semibold">visible sur Google ?</span>
            </h2>
          </div>

          {/* Explication pédagogique */}
          <div className="rounded-3xl p-8 md:p-12 mb-12" style={{ backgroundColor: colors.bgAlt }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Le principe est simple :</h3>
            <div className="space-y-4 leading-relaxed" style={{ color: colors.textMuted }}>
              <p>
                <strong style={{ color: colors.text }}>1 mot-cle = 1 page dediee sur votre site.</strong>
              </p>
              <p>
                Quand un internaute tape <strong style={{ color: colors.text }}>"{heroKeywords[0]} {ville}"</strong> dans Google,
                on veut que Google affiche <strong style={{ color: colors.text }}>votre page</strong> qui parle specifiquement
                de ce service.
              </p>
              <p>
                Plus vous avez de pages qui repondent aux recherches des gens,
                plus vous avez de chances d'apparaitre. C'est mathematique.
              </p>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6 text-center" style={{ color: colors.text }}>Exemple concret pour {nom} :</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {metierData.ghostPageExamples.slice(0, 4).map((page) => {
                const adaptedPage = page.replace(/Nice/gi, ville)
                const matchingKw = [...metierData.keywords.principal, ...metierData.keywords.niches]
                  .find(kw => page.toLowerCase().includes(kw.keyword.split(' ')[0].toLowerCase()))
                const volume = matchingKw ? estimateVolumeForCity(matchingKw.volume, ville) : 100

                return (
                  <div key={page} className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: colors.bg }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: colors.text }}>Page "{adaptedPage}"</p>
                      <p className="text-sm" style={{ color: colors.textAccent }}>→ cible {volume} recherches/mois</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
              Le tarif SEO depend du <strong style={{ color: colors.text }}>nombre de mots-cles</strong> que vous souhaitez cibler.
              Plus on cree de pages, plus on capte de recherches.
            </p>
          </div>

        </div>
      </section>

      {/* ════════ CE QUE JE FAIS POUR VOUS ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>Mon accompagnement</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: colors.text }}>
              Je m'occupe de tout.<br />
              <span className="font-semibold">Vous vous concentrez sur votre metier.</span>
            </h2>
          </div>

          <div className="space-y-6">

            <div className="flex items-start gap-6 p-6 rounded-2xl" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent }}>
                <span className="text-white font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Je cree votre site sur-mesure</h3>
                <p style={{ color: colors.textMuted }}>
                  Un site <strong style={{ color: colors.text }}>rapide et elegant</strong>, avec vos photos,
                  vos services, vos tarifs. Pret a l'emploi, vous n'avez rien a faire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-2xl" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent }}>
                <span className="text-white font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Je vous rends visible sur Google</h3>
                <p style={{ color: colors.textMuted }}>
                  J'optimise votre site pour que vous apparaissiez quand quelqu'un cherche
                  <strong style={{ color: colors.text }}> "{heroKeywords[0]} {ville}"</strong>, <strong style={{ color: colors.text }}>"{heroKeywords[1]} {ville}"</strong>, etc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-2xl" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent }}>
                <span className="text-white font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>J'optimise votre fiche Google</h3>
                <p style={{ color: colors.textMuted }}>
                  Votre fiche avec <strong style={{ color: colors.text }}>{note} et {avis} avis</strong> est un atout.
                  Je l'optimise pour qu'elle ressorte encore mieux dans les resultats.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-2xl" style={{ backgroundColor: colors.bgCard }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent }}>
                <span className="text-white font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Le site est a vous</h3>
                <p style={{ color: colors.textMuted }}>
                  Contrairement aux solutions ou vous louez votre site, ici <strong style={{ color: colors.text }}>vous etes proprietaire</strong>.
                  Si on arrete de travailler ensemble, vous gardez tout.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ QUI SUIS-JE ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="order-2 md:order-1">
              <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>Votre interlocutrice</p>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: colors.text }}>
                Indiana Aflalo<br />
                <span className="font-semibold">Consultante digitale</span>
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: colors.textMuted }}>
                <p>
                  Apres plusieurs annees en agence digitale, j'ai cree ma propre structure pour
                  accompagner les commerces locaux. <strong style={{ color: colors.text }}>C'est devenu une vraie passion.</strong>
                </p>
                <p>
                  Diplomee d'un <strong style={{ color: colors.text }}>double master en strategie digitale</strong>,
                  j'aime voir mes clients gagner en visibilite et decrocher de nouveaux rendez-vous.
                </p>
                <p>
                  Mon approche : des <strong style={{ color: colors.text }}>explications simples</strong>,
                  des actions concretes, et des resultats mesurables.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm shadow-sm" style={{ backgroundColor: colors.bgCard, color: colors.textMuted }}>SEO Local</span>
                <span className="px-4 py-2 rounded-full text-sm shadow-sm" style={{ backgroundColor: colors.bgCard, color: colors.textMuted }}>Creation de sites</span>
                <span className="px-4 py-2 rounded-full text-sm shadow-sm" style={{ backgroundColor: colors.bgCard, color: colors.textMuted }}>Google Business</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <Image
                  src="/images/indiana-aflalo.jpg"
                  alt="Indiana Aflalo - Consultante digitale"
                  width={320}
                  height={400}
                  className="w-full max-w-xs mx-auto rounded-3xl shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 rounded-2xl p-4 shadow-lg" style={{ backgroundColor: colors.bgCard }}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium" style={{ color: colors.text }}>Basee dans le 06</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.bgCard }} id="tarifs">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: colors.textAccent }}>Tarifs indicatifs</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: colors.text }}>
              Des formules claires,<br />
              <span className="font-semibold">sans surprise</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
              Ces tarifs donnent un ordre d'idee de ce type de travail. On peut affiner ensemble lors d'un echange,
              selon vos besoins et sur quels mots-cles vous souhaitez etre visible.
            </p>
            <p className="mt-3 max-w-2xl mx-auto text-sm" style={{ color: colors.textAccent }}>
              C'est un <strong>investissement qui se renforce avec le temps</strong> : plus votre site vieillit et accumule du contenu,
              plus Google lui fait confiance. Ce que vous construisez aujourd'hui devient de plus en plus precieux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Formule 1 */}
            <div className="rounded-3xl p-8" style={{ backgroundColor: colors.bg }}>
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Site Vitrine</h3>
              <p className="text-sm mb-6" style={{ color: colors.textAccent }}>Votre presence en ligne</p>

              <div className="mb-8">
                <p className="text-sm" style={{ color: colors.textAccent }}>a partir de</p>
                <p className="text-4xl font-light" style={{ color: colors.text }}>490€</p>
                <p className="text-sm" style={{ color: colors.textAccent }}>paiement unique</p>
              </div>

              <ul className="space-y-3 text-sm" style={{ color: colors.textMuted }}>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Site 5-7 pages sur-mesure
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Design a votre image
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Adapte mobile et tablette
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Bouton de reservation
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Vous etes proprietaire
                </li>
              </ul>
            </div>

            {/* Formule 2 - Recommandée */}
            <div className="text-white rounded-3xl p-8 relative" style={{ backgroundColor: colors.accentDark }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-white text-xs font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: colors.accent }}>
                  Recommande
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 pt-2">Site + Visibilite</h3>
              <p className="text-sm mb-6 opacity-70">Etre trouve sur Google</p>

              <div className="mb-8">
                <p className="text-sm opacity-70 mb-1">Tarif site +</p>
                <p className="text-4xl font-light">150€<span className="text-lg opacity-70">/mois</span></p>
              </div>

              <ul className="space-y-3 text-sm opacity-90">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Site vitrine sur-mesure
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  1 mot-cle principal + longues traines
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Contenu valide avant publication
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Optimisation fiche Google
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Rapport mensuel
                </li>
              </ul>

              <p className="text-xs mt-6 opacity-70">Sans engagement</p>
            </div>

            {/* Formule 3 */}
            <div className="rounded-3xl p-8" style={{ backgroundColor: colors.bg }}>
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Accompagnement Complet</h3>
              <p className="text-sm mb-6" style={{ color: colors.textAccent }}>Visibilite maximale</p>

              <div className="mb-8">
                <p className="text-sm mb-1" style={{ color: colors.textAccent }}>Tarif site +</p>
                <p className="text-4xl font-light" style={{ color: colors.text }}>250€<span className="text-lg" style={{ color: colors.textAccent }}>/mois</span></p>
              </div>

              <ul className="space-y-3 text-sm" style={{ color: colors.textMuted }}>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Tout Site + Visibilite
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  2-3 mots-cles + longues traines
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Gestion fiche Google optimisee SEO
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Reponses aux avis optimisees SEO
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Posts Google avec mots-cles
                </li>
              </ul>

              <p className="text-xs mt-6" style={{ color: colors.textAccent }}>Sans engagement</p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ CTA FINAL ════════ */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: colors.accentDark }}>
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            On en discute ?
          </h2>
          <p className="text-lg mb-10 text-white/70">
            30 minutes pour parler de <span className="text-white">{nom}</span> et voir
            ce qu'on peut faire ensemble. Sans engagement.
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity text-lg"
            style={{ backgroundColor: colors.accent }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Reserver un appel gratuit
          </a>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70">
            <a href="tel:0661139748" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              06 61 13 97 48
            </a>
            <a href="mailto:contact@indhack.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              contact@indhack.com
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}

export default function DiagnosticClient({ metier, metierData }: DiagnosticClientProps) {
  const colors = getColorScheme(metier)
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: colors.bg }} />}>
      <DiagnosticContent metier={metier} metierData={metierData} />
    </Suspense>
  )
}
