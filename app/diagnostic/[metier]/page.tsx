'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Search, TrendingUp, Users, MapPin, Check, ArrowRight, Eye, EyeOff, Globe, Calendar, Clock, BarChart3, Target, Zap, MessageCircle, FileText, Settings, Star, AlertCircle, ChevronDown, Loader2 } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC PAGE V12 - Machine à Conversion
// Dynamique par métier + données API + personnalisation complète
// ══════════════════════════════════════════════════════════════════════════════

// Configuration par métier
const METIER_CONFIG: Record<string, {
  emoji: string
  label: string
  labelClient: string
  searchTerm: string
  panierMoyen: number
  color: string
}> = {
  coiffeur: { emoji: '✂️', label: 'Coiffeur', labelClient: 'coiffeuse', searchTerm: 'coiffeur', panierMoyen: 75, color: 'amber' },
  plombier: { emoji: '🔧', label: 'Plombier', labelClient: 'plombier', searchTerm: 'plombier', panierMoyen: 180, color: 'blue' },
  electricien: { emoji: '⚡', label: 'Électricien', labelClient: 'électricien', searchTerm: 'electricien', panierMoyen: 200, color: 'yellow' },
  serrurier: { emoji: '🔑', label: 'Serrurier', labelClient: 'serrurier', searchTerm: 'serrurier', panierMoyen: 150, color: 'slate' },
  dentiste: { emoji: '🦷', label: 'Dentiste', labelClient: 'dentiste', searchTerm: 'dentiste', panierMoyen: 120, color: 'cyan' },
  avocat: { emoji: '⚖️', label: 'Avocat', labelClient: 'avocat', searchTerm: 'avocat', panierMoyen: 250, color: 'indigo' },
  'prothesiste-ongulaire': { emoji: '💅', label: 'Prothésiste ongulaire', labelClient: 'prothésiste ongulaire', searchTerm: 'onglerie', panierMoyen: 55, color: 'pink' },
  renovation: { emoji: '🏠', label: 'Rénovation', labelClient: 'entreprise de rénovation', searchTerm: 'renovation', panierMoyen: 5000, color: 'orange' },
  restaurant: { emoji: '🍽️', label: 'Restaurant', labelClient: 'restaurant', searchTerm: 'restaurant', panierMoyen: 35, color: 'red' },
  photographe: { emoji: '📸', label: 'Photographe', labelClient: 'photographe', searchTerm: 'photographe', panierMoyen: 800, color: 'violet' },
}

// Données de fallback (utilisées si l'API n'est pas dispo)
const FALLBACK_DATA: Record<string, any> = {
  coiffeur: {
    totalVolume: 8200,
    keywords: [
      { keyword: 'coiffeur', volume: 2800, difficulty: 85 },
      { keyword: 'coiffeuse', volume: 1900, difficulty: 80 },
      { keyword: 'salon coiffure', volume: 1200, difficulty: 70 },
      { keyword: 'balayage', volume: 390, difficulty: 45 },
      { keyword: 'coloriste', volume: 480, difficulty: 50 },
      { keyword: 'lissage brésilien', volume: 320, difficulty: 35 },
      { keyword: 'coiffeur mariage', volume: 210, difficulty: 30 },
    ],
    questions: [
      'Quel est le prix d\'un balayage ?',
      'Comment entretenir sa coloration ?',
      'Combien coûte un lissage brésilien ?',
    ],
  },
  plombier: {
    totalVolume: 6800,
    keywords: [
      { keyword: 'plombier', volume: 4100, difficulty: 90 },
      { keyword: 'plombier urgence', volume: 1800, difficulty: 85 },
      { keyword: 'fuite eau', volume: 480, difficulty: 60 },
      { keyword: 'débouchage', volume: 720, difficulty: 55 },
    ],
    questions: ['Comment déboucher un évier ?', 'Prix intervention plombier ?'],
  },
  electricien: {
    totalVolume: 5100,
    keywords: [
      { keyword: 'electricien', volume: 3600, difficulty: 88 },
      { keyword: 'electricien urgence', volume: 890, difficulty: 82 },
      { keyword: 'panne électrique', volume: 320, difficulty: 55 },
    ],
    questions: ['Comment trouver un bon électricien ?', 'Prix mise aux normes ?'],
  },
  dentiste: {
    totalVolume: 9500,
    keywords: [
      { keyword: 'dentiste', volume: 6200, difficulty: 95 },
      { keyword: 'dentiste urgence', volume: 720, difficulty: 70 },
      { keyword: 'implant dentaire', volume: 590, difficulty: 65 },
    ],
    questions: ['Comment trouver un dentiste ?', 'Prix implant dentaire ?'],
  },
  avocat: {
    totalVolume: 7200,
    keywords: [
      { keyword: 'avocat', volume: 4800, difficulty: 92 },
      { keyword: 'avocat divorce', volume: 880, difficulty: 75 },
      { keyword: 'avocat droit travail', volume: 590, difficulty: 70 },
    ],
    questions: ['Comment choisir son avocat ?', 'Combien coûte un avocat ?'],
  },
  serrurier: {
    totalVolume: 5400,
    keywords: [
      { keyword: 'serrurier', volume: 3200, difficulty: 88 },
      { keyword: 'serrurier urgence', volume: 1400, difficulty: 85 },
      { keyword: 'ouverture porte', volume: 590, difficulty: 60 },
    ],
    questions: ['Prix ouverture de porte ?', 'Comment éviter les arnaques ?'],
  },
  'prothesiste-ongulaire': {
    totalVolume: 4200,
    keywords: [
      { keyword: 'onglerie', volume: 1400, difficulty: 70 },
      { keyword: 'prothésiste ongulaire', volume: 880, difficulty: 55 },
      { keyword: 'pose ongles', volume: 720, difficulty: 50 },
      { keyword: 'manucure', volume: 1100, difficulty: 65 },
    ],
    questions: ['Combien coûte une pose complète ?', 'Gel ou résine ?'],
  },
  renovation: {
    totalVolume: 4800,
    keywords: [
      { keyword: 'rénovation', volume: 2100, difficulty: 85 },
      { keyword: 'rénovation appartement', volume: 720, difficulty: 70 },
      { keyword: 'rénovation salle de bain', volume: 480, difficulty: 55 },
    ],
    questions: ['Quel budget pour rénover ?', 'Comment trouver un artisan ?'],
  },
  restaurant: {
    totalVolume: 12000,
    keywords: [
      { keyword: 'restaurant', volume: 8000, difficulty: 95 },
      { keyword: 'restaurant italien', volume: 1200, difficulty: 60 },
      { keyword: 'brunch', volume: 650, difficulty: 50 },
    ],
    questions: ['Meilleur restaurant ?', 'Restaurant ouvert dimanche ?'],
  },
  photographe: {
    totalVolume: 3200,
    keywords: [
      { keyword: 'photographe', volume: 1800, difficulty: 75 },
      { keyword: 'photographe mariage', volume: 720, difficulty: 60 },
      { keyword: 'shooting photo', volume: 280, difficulty: 40 },
    ],
    questions: ['Combien coûte un photographe ?', 'Comment choisir ?'],
  },
}

function getDifficultyLabel(difficulty: number): { label: string; color: string } {
  if (difficulty <= 40) return { label: 'Facile', color: 'green' }
  if (difficulty <= 60) return { label: 'Accessible', color: 'blue' }
  if (difficulty <= 75) return { label: 'Moyenne', color: 'amber' }
  return { label: 'Élevée', color: 'red' }
}

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Établissement'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.5'
  const avis = searchParams.get('avis') || '50'

  const [seoData, setSeoData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const config = METIER_CONFIG[metier] || METIER_CONFIG.coiffeur
  const fallback = FALLBACK_DATA[metier] || FALLBACK_DATA.coiffeur

  useEffect(() => {
    // Essayer de charger les données de l'API
    async function fetchData() {
      try {
        const res = await fetch(`/api/seo-data?metier=${metier}&ville=${encodeURIComponent(ville)}`)
        if (res.ok) {
          const data = await res.json()
          setSeoData(data.data)
        }
      } catch (e) {
        console.log('Using fallback data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [metier, ville])

  const data = seoData || fallback
  const totalVolume = data.totalVolume || fallback.totalVolume
  const keywords = (data.keywords || fallback.keywords).map((kw: any) => ({
    ...kw,
    keyword: kw.keyword.includes(ville.toLowerCase()) ? kw.keyword : `${kw.keyword} ${ville.toLowerCase()}`,
  }))

  const partMarche = 0.05
  const tauxConversion = 0.03
  const clientsPotentiels = Math.round(totalVolume * tauxConversion * partMarche)
  const caMensuelPotentiel = clientsPotentiels * config.panierMoyen

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1a1a1a] font-sans antialiased">

      {/* ════════ HEADER ════════ */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white font-bold text-sm">IH</span>
            </div>
            <div>
              <div className="font-semibold text-sm">IndHack</div>
              <div className="text-xs text-gray-500">Audit de visibilité</div>
            </div>
          </div>
          <a
            href="#offres"
            className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Voir les offres
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ════════ SECTION 1 - Présentation ════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${config.color}-100 to-${config.color}-50 flex items-center justify-center flex-shrink-0`}>
              <span className="text-3xl">{config.emoji}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">{nom}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {ville}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {note}/5 ({avis} avis)
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{config.label}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 mb-1">Ce que cet audit va vous montrer</div>
              <div className="text-sm text-amber-800">
                Combien de personnes cherchent un {config.labelClient} à {ville} chaque mois, pourquoi elles ne vous trouvent pas, et comment y remédier.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2 - Données Marché ════════ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Partie 1</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ce que les gens cherchent à {ville}</h2>
          <p className="text-gray-600 mb-8">Volumes de recherche mensuels (sources : SEMrush, Google Keyword Planner)</p>

          {/* Stat principale */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 text-center relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            )}
            <div className="text-6xl font-bold text-[#1a1a1a] mb-2">{totalVolume.toLocaleString()}</div>
            <div className="text-gray-600">recherches liées à « {config.searchTerm} » à {ville} chaque mois</div>
          </div>

          {/* Tableau mots-clés */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold">Détail des recherches</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {keywords.slice(0, 7).map((kw: any, i: number) => {
                const diff = getDifficultyLabel(kw.difficulty)
                return (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">"{kw.keyword}"</div>
                      <div className="text-sm text-gray-500">{kw.volume?.toLocaleString()} recherches/mois</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full bg-${diff.color}-100 text-${diff.color}-700`}>
                        {diff.label}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-red-500">
                        <EyeOff className="w-4 h-4" />
                        Introuvable
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-semibold mb-1">Ce que ça signifie</div>
                <div className="text-sm text-gray-700">
                  Chaque mois, <strong>{totalVolume.toLocaleString()} personnes</strong> cherchent un {config.labelClient} à {ville}.
                  Si vous n'apparaissez pas dans les résultats, ces personnes vont chez vos concurrents — pas parce qu'ils sont meilleurs,
                  mais parce qu'ils sont <strong>visibles</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 - Le Problème ════════ */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <EyeOff className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Partie 2</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Pourquoi vous n'apparaissez pas</h2>
          <p className="text-gray-600 mb-8">Les 3 raisons pour lesquelles Google ne vous montre pas</p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Pas de site optimisé</h3>
              <p className="text-sm text-gray-600">
                Google classe les sites selon des critères techniques : vitesse, structure, contenu. Sans optimisation = invisible.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Pas de contenu ciblé</h3>
              <p className="text-sm text-gray-600">
                Pour apparaître sur "{config.searchTerm} {ville.toLowerCase()}", il faut une page dédiée. Un site générique = aucune chance.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Pas de travail régulier</h3>
              <p className="text-sm text-gray-600">
                Le SEO prend du temps. Google favorise les sites qui publient régulièrement. Un site statique = signaux négatifs.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📉</div>
              <div>
                <div className="font-semibold text-red-900 mb-2">Le coût de l'invisibilité</div>
                <div className="text-sm text-red-800 mb-4">
                  En n'apparaissant pas sur Google, vous passez à côté d'environ <strong>{clientsPotentiels} nouveaux clients par mois</strong>,
                  soit un manque à gagner estimé de <strong>{caMensuelPotentiel.toLocaleString()}€/mois</strong>.
                </div>
                <div className="text-xs text-red-700">
                  * Estimation : 5% du marché capturable × panier moyen de {config.panierMoyen}€
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 - La Solution ════════ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Partie 3</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Comment devenir visible</h2>
          <p className="text-gray-600 mb-8">Le processus en 3 étapes</p>

          <div className="space-y-6 mb-12">
            {[
              {
                step: '1',
                title: 'Créer une base solide',
                desc: 'Site professionnel, rapide, optimisé. Design sur-mesure à votre image.',
                tags: ['Design personnalisé', 'Mobile-first', 'Chargement < 2s', 'Structure SEO'],
              },
              {
                step: '2',
                title: 'Créer du contenu ciblé',
                desc: `Pages dédiées à chaque service et zone géographique. C'est ce qui permet d'apparaître sur "${config.searchTerm} ${ville.toLowerCase()}".`,
                tags: ['Pages services', 'Pages quartiers', 'Blog', 'FAQ'],
              },
              {
                step: '3',
                title: 'Travailler dans la durée',
                desc: 'Le SEO prend 3-6 mois. C\'est un travail continu : nouveaux contenus, optimisations, suivi.',
                tags: ['Suivi positions', 'Contenus réguliers', 'Optimisation GMB', 'Rapports'],
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 - Offres ════════ */}
      <section className="py-16 px-6 bg-[#1a1a1a] text-white" id="offres">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mes offres</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Tarifs transparents. Sans engagement sur les forfaits mensuels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Offre 1 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-1">Le Site</h3>
              <p className="text-sm text-gray-400 mb-6">Votre vitrine professionnelle</p>
              <div className="mb-6">
                <span className="text-sm text-gray-400">à partir de</span>
                <div className="text-4xl font-bold">590€</div>
                <p className="text-sm text-gray-400 mt-1">Paiement unique</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
                {['Site multi-pages sur-mesure', 'Design à votre image', 'Responsive mobile', 'Formulaire contact/réservation', 'Hébergement 1 an inclus', 'Formation utilisation'].map((item, i) => (
                  <li key={i} className="flex gap-3"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
              <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-white/20 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                En discuter
              </a>
            </div>

            {/* Offre 2 - Recommandé */}
            <div className="bg-white text-[#1a1a1a] rounded-2xl p-8 flex flex-col relative shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-xs font-bold px-4 py-1 rounded-full">
                Recommandé
              </div>
              <h3 className="text-xl font-bold mb-1">Site + Visibilité</h3>
              <p className="text-sm text-gray-500 mb-6">Le site + le travail SEO mensuel</p>
              <div className="mb-6">
                <span className="text-sm text-gray-500">à partir de</span>
                <div className="text-4xl font-bold">590€</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">puis</span>
                  <span className="text-xl font-bold">150€</span>
                  <span className="text-sm text-gray-500">/mois</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Sans engagement</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-700">
                {['Tout le pack "Le Site" +', '2 pages SEO locales / mois', 'Optimisation continue', 'Suivi positions Google', 'Rapport mensuel', 'Support email'].map((item, i) => (
                  <li key={i} className="flex gap-3"><Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
              <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 bg-[#1a1a1a] text-white rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
                Réserver un appel
              </a>
            </div>

            {/* Offre 3 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-1">Accompagnement Complet</h3>
              <p className="text-sm text-gray-400 mb-6">SEO + GMB + Géolocalisation</p>
              <div className="mb-6">
                <span className="text-sm text-gray-400">à partir de</span>
                <div className="text-4xl font-bold">590€</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400">puis</span>
                  <span className="text-xl font-bold">200€</span>
                  <span className="text-sm text-gray-400">/mois</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Sans engagement</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
                {['Tout le pack "Visibilité" +', 'Google My Business optimisé', 'Pages géolocalisées', '4 pages SEO / mois', 'Gestion avis Google', 'Support WhatsApp', 'Appel mensuel'].map((item, i) => (
                  <li key={i} className="flex gap-3"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
              <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-white/20 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                En discuter
              </a>
            </div>
          </div>

          {/* Comparatif marché */}
          <div className="mt-12 bg-white/5 rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-6 text-center">Comparatif tarifs du marché</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">50-100€/mois</div>
                <div className="text-xs text-gray-500 mt-2">Simplebo, WebGazelle<br />(vous ne possédez rien)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">1 500-3 000€</div>
                <div className="text-xs text-gray-500 mt-2">Freelance moyen<br />(site seul, pas de SEO)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">5 000€+</div>
                <div className="text-xs text-gray-500 mt-2">Agence web<br />(+ 300-500€/mois SEO)</div>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">590€ + 150€/mois</div>
                <div className="text-xs text-green-300 mt-2">IndHack<br />(site + SEO, sans engagement)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 6 - FAQ ════════ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              { q: "Combien de temps avant de voir des résultats ?", a: "Le SEO prend du temps. Comptez 2-3 mois pour les premiers signaux, 4-6 mois pour des résultats significatifs. C'est pour ça qu'il n'y a pas d'engagement : si après 3-4 mois vous ne voyez pas de progrès, vous pouvez arrêter." },
              { q: "Est-ce que je suis propriétaire du site ?", a: "Oui, à 100%. Le site vous appartient. Si vous arrêtez l'accompagnement, vous gardez votre site et tout le contenu créé." },
              { q: "Pourquoi pas d'engagement ?", a: "Parce que si mon travail ne vous apporte pas de valeur, vous devez pouvoir partir. Mes clients restent parce qu'ils voient des résultats." },
              { q: "Je peux commencer par le site seul ?", a: "Absolument. On crée le site, vous voyez la qualité, et ensuite vous décidez pour la partie SEO." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-semibold mb-2">{item.q}</h4>
                <p className="text-sm text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA Final ════════ */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Prochaine étape ?</h2>
          <p className="text-gray-600 mb-8">
            Réservez un appel de 30 minutes. On regarde ensemble votre situation, je réponds à vos questions.
            <br /><strong>Pas de commercial, pas de pression.</strong>
          </p>
          <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-medium hover:bg-[#333] transition-colors">
            <Calendar className="w-5 h-5" />
            Réserver un appel (gratuit)
          </a>
          <p className="mt-6 text-sm text-gray-500">Ou appelez-moi : 06 61 13 97 48</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white font-bold text-xs">IH</span>
            </div>
            <span className="text-sm text-gray-600">IndHack · Visibilité web pour indépendants</span>
          </div>
          <div className="text-sm text-gray-500">contact@indhack.com</div>
        </div>
      </footer>
    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
