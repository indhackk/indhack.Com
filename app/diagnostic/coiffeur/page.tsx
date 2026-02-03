'use client'
// V11 - Personalized Audit Page with Real Haloscan Data

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Star, MapPin, Check, ArrowRight, Sparkles, Crown, Menu,
  Globe, TrendingUp, Search, Users, Target, Zap,
  BarChart3, Eye, MessageCircle, Calendar, Phone,
  AlertTriangle, Award, ShieldCheck, Lightbulb, ChevronDown,
  ExternalLink, Building, Scissors, Heart
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// REAL HALOSCAN DATA - Coiffeur Nice (Source: Haloscan Janvier 2026)
// ═══════════════════════════════════════════════════════════════════════════════
const NICE_COIFFEUR_DATA = {
  // Volume principal
  mainKeyword: { term: 'coiffeur nice', volume: 2800 },

  // Opportunités Quartiers (Ghost Pages)
  quartiers: [
    { term: 'coiffeur nice nord', volume: 480 },
    { term: 'coiffeur nice etoile', volume: 390 },
    { term: 'coiffeur nice ouest', volume: 260 },
    { term: 'coiffeur nice riquier', volume: 170 },
    { term: 'coiffeur nice centre', volume: 110 },
    { term: 'coiffeur nice centre ville', volume: 100 },
  ],

  // Opportunités Services
  services: [
    { term: 'meilleur coiffeur nice', volume: 720 },
    { term: 'coiffeur nice homme', volume: 590 },
    { term: 'coiffeur nice pas cher', volume: 480 },
    { term: 'coiffeur nice sans rdv', volume: 390 },
  ],

  // Concurrents réels (SERP Haloscan)
  competitors: [
    { rank: 1, name: 'Planity', type: 'Annuaire', url: 'planity.com', note: 'Prend des commissions' },
    { rank: 2, name: 'Petit Futé', type: 'Annuaire', url: 'petitfute.com', note: 'Pas votre vitrine' },
    { rank: 3, name: 'Le Fil de l\'Âme', type: 'Salon', url: 'fildelame.fr', note: 'Site propre = Top 3' },
    { rank: 4, name: 'Salon Carré d\'Or', type: 'Salon', url: 'coiffeur-carredor.fr', note: 'Site propre = Top 4' },
    { rank: 5, name: 'Elle Annuaire', type: 'Annuaire', url: 'annuaire-beaute.elle.fr', note: '' },
  ],

  // Sites qui dominent
  dominantSites: [
    { site: 'planity.com', keywords: 221 },
    { site: 'pagesjaunes.fr', keywords: 105 },
    { site: 'beautyplanet.com', keywords: 91 },
    { site: 'petitfute.com', keywords: 71 },
  ]
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function Badge({ children, icon: Icon, variant = 'default' }: { children: React.ReactNode, icon?: any, variant?: 'default' | 'gold' | 'alert' }) {
  const variants = {
    default: 'bg-white border-[#E8E2D9] text-[#8A7A70]',
    gold: 'bg-[#B08D55]/10 border-[#B08D55]/30 text-[#B08D55]',
    alert: 'bg-red-50 border-red-200 text-red-600',
  }
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest font-sans uppercase shadow-sm ${variants[variant]}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle, badge, centered = true }: { title: string, subtitle?: string, badge?: string, centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} max-w-3xl mx-auto relative z-10`}>
      {badge && (
        <div className="mb-4">
          <span className="text-xs font-bold text-[#B08D55] uppercase tracking-[0.2em]">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#3C3633] mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#8A7A70] font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function StatCard({ value, label, icon: Icon, highlight = false }: { value: string, label: string, icon: any, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'bg-[#B08D55]/10 border-[#B08D55]/30' : 'bg-white border-[#E8E2D9]'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${highlight ? 'bg-[#B08D55]/20 text-[#B08D55]' : 'bg-[#F4F1ED] text-[#8A7A70]'}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className={`text-3xl font-serif font-medium ${highlight ? 'text-[#B08D55]' : 'text-[#3C3633]'}`}>{value}</div>
      <div className="text-sm text-[#8A7A70] mt-1">{label}</div>
    </div>
  )
}

function KeywordRow({ term, volume, position = null, isYou = false }: { term: string, volume: number, position?: number | null, isYou?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b border-[#F4F1ED] ${isYou ? 'bg-red-50 -mx-4 px-4 rounded-lg' : ''}`}>
      <div className="flex items-center gap-3">
        {position && (
          <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${position <= 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {position}
          </span>
        )}
        <span className="text-sm text-[#3C3633]">{term}</span>
        {isYou && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium">Vous n'y êtes pas</span>}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#B08D55]">{volume.toLocaleString()}</span>
        <span className="text-xs text-[#8A7A70]">/mois</span>
      </div>
    </div>
  )
}

function CompetitorCard({ rank, name, type, note, hasWebsite = true }: { rank: number, name: string, type: string, note?: string, hasWebsite?: boolean }) {
  const isAnnuaire = type === 'Annuaire'
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border ${isAnnuaire ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
      <span className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${rank <= 3 ? 'bg-[#B08D55] text-white' : 'bg-gray-200 text-gray-600'}`}>
        #{rank}
      </span>
      <div className="flex-1">
        <div className="font-medium text-[#3C3633]">{name}</div>
        <div className="text-xs text-[#8A7A70]">{type} {note && `• ${note}`}</div>
      </div>
      {!isAnnuaire && hasWebsite && (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">A un site</span>
      )}
      {isAnnuaire && (
        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Annuaire</span>
      )}
    </div>
  )
}

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="border border-[#E8E2D9] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F9F7F5] transition-colors"
      >
        <span className="text-lg font-serif font-medium text-[#3C3633]">{title}</span>
        <ChevronDown className={`w-5 h-5 text-[#B08D55] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-[#6D635C] font-light leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent() {
  const searchParams = useSearchParams()

  // Dynamic data from URL
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const avis = parseInt(searchParams.get('avis') || '155')
  const note = parseFloat(searchParams.get('note') || '4.6')
  const quartier = searchParams.get('quartier')?.replace(/\+/g, ' ') || 'Centre'

  // Calculated values
  const totalMonthlySearches = NICE_COIFFEUR_DATA.mainKeyword.volume +
    NICE_COIFFEUR_DATA.quartiers.reduce((sum, q) => sum + q.volume, 0) +
    NICE_COIFFEUR_DATA.services.reduce((sum, s) => sum + s.volume, 0)

  const avgTicket = 65 // Coiffeur moyen
  const conversionRate = 0.02 // 2% conversion rate conservateur
  const potentialNewClients = Math.round(NICE_COIFFEUR_DATA.mainKeyword.volume * conversionRate)
  const potentialRevenue = potentialNewClients * avgTicket * 12 // Annuel

  return (
    <main className="min-h-screen bg-[#F9F7F5] text-[#3C3633] font-sans selection:bg-[#B08D55] selection:text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 1: HERO PERSONNALISÉ
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex items-center pt-20 pb-20 px-6 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#B08D55]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B08D55]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 bg-[#B08D55]/10 rounded-t-[8rem] rounded-b-[2rem] transform rotate-2" />
            <div className="absolute inset-0 rounded-t-[8rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-[8px] border-white">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200"
                alt={`Salon ${nom}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Rating badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Star className="w-4 h-4 text-[#B08D55] fill-[#B08D55]" />
                <span className="font-bold text-[#3C3633]">{note}</span>
                <span className="text-sm text-[#8A7A70]">/ 5</span>
              </div>

              {/* Reviews count */}
              <div className="absolute top-6 right-6 bg-[#B08D55] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                {avis} avis
              </div>

              {/* Location badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-xl border border-[#E8E2D9] flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-[#B08D55]" />
                <span className="font-medium text-[#3C3633]">{nom}</span>
                <span className="text-[#8A7A70]">•</span>
                <span className="text-[#8A7A70]">{ville}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex flex-wrap gap-3">
              <Badge icon={Crown} variant="gold">Excellence {note}/5</Badge>
              <Badge icon={AlertTriangle} variant="alert">Sans site web</Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-medium text-[#3C3633] mb-6 leading-[1.1]">
              {nom},<br />
              <span className="text-[#B08D55]">{avis} clientes</span> vous adorent.<br />
              Mais Google ne le sait pas.
            </h1>

            <p className="text-xl text-[#6D635C] font-light leading-relaxed mb-8 max-w-lg">
              Chaque mois, <strong className="text-[#B08D55]">{NICE_COIFFEUR_DATA.mainKeyword.volume.toLocaleString()} personnes</strong> cherchent
              un coiffeur à {ville}. Votre talent mérite d'être trouvé.
            </p>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E8E2D9] mb-8">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F4F1ED]">
                <BarChart3 className="w-4 h-4 text-[#B08D55]" />
                <span className="text-sm font-bold text-[#B08D55] uppercase tracking-wider">Votre marché à {ville}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-serif font-medium text-[#3C3633]">{NICE_COIFFEUR_DATA.mainKeyword.volume.toLocaleString()}</div>
                  <div className="text-xs text-[#8A7A70]">Recherches/mois</div>
                </div>
                <div className="text-center border-x border-[#F4F1ED]">
                  <div className="text-2xl font-serif font-medium text-green-600">+{potentialNewClients}</div>
                  <div className="text-xs text-[#8A7A70]">Clients potentiels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif font-medium text-[#B08D55]">{(potentialRevenue / 1000).toFixed(0)}k€</div>
                  <div className="text-xs text-[#8A7A70]">CA additionnel/an</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/contact-indhack/30min"
                target="_blank"
                className="inline-flex group bg-[#3C3633] text-white px-8 py-4 rounded-full font-medium text-lg items-center justify-center gap-3 hover:bg-[#B08D55] transition-all shadow-xl hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Réserver mon appel gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:0661139748"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#E8E2D9] text-[#3C3633] hover:bg-white transition-colors"
              >
                <Phone className="w-5 h-5 text-[#B08D55]" />
                06 61 13 97 48
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 2: POURQUOI UN SITE WEB ?
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white border-t border-[#E8E2D9]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            badge="La réalité du marché"
            title="Pourquoi avoir un site web en 2026 ?"
            subtitle="Vous avez une fiche Google, des réseaux sociaux... Mais ça ne suffit plus. Voici pourquoi."
          />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Sans site */}
            <div className="p-8 rounded-2xl bg-red-50 border border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-serif font-medium text-red-800">Sans site web</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-red-700">
                  <span className="text-red-400">✗</span>
                  <span>Vous dépendez de Planity qui prend des <strong>commissions sur chaque RDV</strong></span>
                </li>
                <li className="flex gap-3 text-red-700">
                  <span className="text-red-400">✗</span>
                  <span>Vos clientes voient <strong>vos concurrents</strong> sur les annuaires</span>
                </li>
                <li className="flex gap-3 text-red-700">
                  <span className="text-red-400">✗</span>
                  <span>Pas de <strong>preuves de votre expertise</strong> (galerie, témoignages)</span>
                </li>
                <li className="flex gap-3 text-red-700">
                  <span className="text-red-400">✗</span>
                  <span>Google vous <strong>classe moins bien</strong> que ceux qui ont un site</span>
                </li>
                <li className="flex gap-3 text-red-700">
                  <span className="text-red-400">✗</span>
                  <span>Vous <strong>n'existez pas</strong> pour ChatGPT et les IA</span>
                </li>
              </ul>
            </div>

            {/* Avec site */}
            <div className="p-8 rounded-2xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-serif font-medium text-green-800">Avec votre site</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-green-700">
                  <span className="text-green-500">✓</span>
                  <span>RDV <strong>sans commission</strong>, directement chez vous</span>
                </li>
                <li className="flex gap-3 text-green-700">
                  <span className="text-green-500">✓</span>
                  <span>Votre <strong>vitrine personnelle</strong> qui vous appartient à vie</span>
                </li>
                <li className="flex gap-3 text-green-700">
                  <span className="text-green-500">✓</span>
                  <span><strong>Galerie photos</strong>, avis, tarifs : tout au même endroit</span>
                </li>
                <li className="flex gap-3 text-green-700">
                  <span className="text-green-500">✓</span>
                  <span>Google vous <strong>fait confiance</strong> = meilleur classement</span>
                </li>
                <li className="flex gap-3 text-green-700">
                  <span className="text-green-500">✓</span>
                  <span><strong>ChatGPT vous recommande</strong> aux utilisateurs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Témoignage visuel */}
          <div className="bg-[#F9F7F5] p-8 rounded-2xl border border-[#E8E2D9]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#B08D55]/20 flex items-center justify-center flex-shrink-0">
                <Scissors className="w-8 h-8 text-[#B08D55]" />
              </div>
              <div>
                <p className="text-lg text-[#3C3633] italic mb-4">
                  "Je voyais des clientes dire qu'elles avaient découvert le salon 'par hasard' sur Planity.
                  Maintenant avec mon site, elles me trouvent directement sur Google et arrivent en sachant déjà
                  ce que je fais. Elles réservent sans hésiter."
                </p>
                <p className="text-sm text-[#B08D55] font-medium">— Témoignage type d'une coiffeuse à Nice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 3: VOS VRAIS CONCURRENTS (Données Haloscan)
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F9F7F5]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            badge="Analyse concurrentielle"
            title="Voici qui prend vos clients"
            subtitle={`Sur Google, voici le top 5 pour "coiffeur ${ville.toLowerCase()}". Vous n'y êtes pas.`}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* SERP Results */}
            <div>
              <h3 className="text-sm font-bold text-[#B08D55] uppercase tracking-wider mb-6">Résultats Google pour "coiffeur nice"</h3>
              <div className="space-y-3">
                {NICE_COIFFEUR_DATA.competitors.map((comp) => (
                  <CompetitorCard
                    key={comp.rank}
                    rank={comp.rank}
                    name={comp.name}
                    type={comp.type}
                    note={comp.note}
                    hasWebsite={comp.type === 'Salon'}
                  />
                ))}

                {/* Votre position */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-red-100 border-2 border-red-300 border-dashed">
                  <span className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center bg-red-500 text-white">
                    ?
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-red-800">{nom}</div>
                    <div className="text-xs text-red-600">Pas dans le top 70 • Sans site web</div>
                  </div>
                  <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-medium">Invisible</span>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div>
              <h3 className="text-sm font-bold text-[#B08D55] uppercase tracking-wider mb-6">Ce que ça signifie</h3>

              <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <Lightbulb className="w-6 h-6 text-[#B08D55] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#3C3633] mb-2">Le Fil de l'Âme & Salon Carré d'Or vous passent devant</h4>
                    <p className="text-sm text-[#6D635C]">
                      Ces salons sont en <strong>position 3 et 4</strong> sur Google.
                      Leur secret ? Ils ont un <strong>site web professionnel</strong>.
                      Pourtant, vous avez une meilleure note ({note}/5 vs ~4.3/5 en moyenne).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#B08D55]/10 p-6 rounded-2xl border border-[#B08D55]/20">
                <h4 className="font-medium text-[#B08D55] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  L'opportunité
                </h4>
                <p className="text-sm text-[#3C3633] mb-4">
                  Avec votre note de <strong>{note}/5</strong> et vos <strong>{avis} avis</strong>,
                  vous avez tous les arguments pour être en top 3.
                  Il vous manque juste la <strong>vitrine technique</strong> qui prouve à Google que vous êtes sérieuse.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#B08D55] font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Potentiel : Top 5 sous 3-6 mois
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 4: SEO EXPLIQUÉ SIMPLEMENT
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white border-t border-[#E8E2D9]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            badge="Le SEO, c'est quoi ?"
            title="Comment Google décide qui apparaît en premier"
            subtitle="Pas de jargon technique, juste l'essentiel pour comprendre."
          />

          <div className="space-y-6 max-w-3xl mx-auto">
            <Accordion title="🔍 Google est comme un annuaire intelligent" defaultOpen={true}>
              <p className="mb-4">
                Quand une personne tape "coiffeur Nice" sur Google, celui-ci parcourt <strong>tous les sites du web</strong>
                pour trouver les réponses les plus pertinentes.
              </p>
              <p className="mb-4">
                <strong>Le problème :</strong> Si vous n'avez pas de site, Google ne peut pas vous trouver.
                Il va donc montrer vos concurrents qui, eux, ont un site.
              </p>
              <p className="text-[#B08D55] font-medium">
                → Avoir un site, c'est exister aux yeux de Google.
              </p>
            </Accordion>

            <Accordion title="⭐ Pourquoi vos avis Google ne suffisent pas">
              <p className="mb-4">
                Votre fiche Google My Business ({note}/5, {avis} avis) est excellente ! Mais elle ne sert qu'au "Local Pack"
                (les 3 résultats avec la carte).
              </p>
              <p className="mb-4">
                <strong>Le souci :</strong> 60% des clics vont aux résultats "classiques" en dessous.
                Et là, ce sont les sites web qui gagnent.
              </p>
              <p className="text-[#B08D55] font-medium">
                → Un site web + votre fiche Google = double présence, double chance.
              </p>
            </Accordion>

            <Accordion title="🎯 C'est quoi les 'mots-clés' ?">
              <p className="mb-4">
                Un mot-clé, c'est simplement ce que les gens tapent sur Google. Par exemple :
              </p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#B08D55]">•</span>
                  <span>"coiffeur nice" = {NICE_COIFFEUR_DATA.mainKeyword.volume.toLocaleString()} recherches/mois</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#B08D55]">•</span>
                  <span>"meilleur coiffeur nice" = 720 recherches/mois</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#B08D55]">•</span>
                  <span>"coiffeur nice centre" = 110 recherches/mois</span>
                </li>
              </ul>
              <p className="text-[#B08D55] font-medium">
                → Mon travail : faire en sorte que VOTRE site apparaisse quand les gens cherchent ces mots.
              </p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 5: GEO (Generative Engine Optimization)
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3C3633] to-[#5A5243] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge icon={Sparkles} variant="gold">Nouveauté 2026</Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-medium mt-6 mb-6">
              ChatGPT recommande des coiffeurs.<br />
              <span className="text-[#B08D55]">Êtes-vous sur sa liste ?</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              De plus en plus de personnes demandent à ChatGPT ou Perplexity :
              "Quel est le meilleur coiffeur à Nice ?". Si vous n'avez pas de site, l'IA ne vous connaît pas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Simulation ChatGPT */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white/80">Conversation avec ChatGPT</span>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-white/60 mb-1">Utilisateur</p>
                  <p className="text-white">"Quel coiffeur me recommandes-tu à Nice ?"</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-green-400 mb-1">ChatGPT</p>
                  <p className="text-white">
                    "À Nice, je vous recommande <strong className="text-green-400">Le Fil de l'Âme</strong> (quartier Libération)
                    ou le <strong className="text-green-400">Salon Carré d'Or</strong>. Ils ont de bonnes notes et des sites web
                    détaillant leurs prestations..."
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                <p className="text-sm text-red-200">
                  <strong>{nom}</strong> n'est pas mentionné. Pourquoi ? Pas de site web = pas de données pour l'IA.
                </p>
              </div>
            </div>

            {/* Explication */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-serif mb-6">Le GEO : être visible pour les IA</h3>
              <p className="text-white/70 mb-6">
                <strong className="text-white">GEO</strong> = Generative Engine Optimization.
                C'est la nouvelle discipline qui consiste à optimiser votre présence pour que les IA
                (ChatGPT, Perplexity, Google Gemini) vous recommandent.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#B08D55]" />
                  <span>Un site web avec des infos structurées</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#B08D55]" />
                  <span>Des avis Google bien gérés</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#B08D55]" />
                  <span>Du contenu qui répond aux questions des clients</span>
                </li>
              </ul>
              <p className="mt-6 text-[#B08D55] font-medium">
                → Je crée des sites pensés pour Google ET pour les IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 6: GMB (Google My Business) Optimization
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white border-t border-[#E8E2D9]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            badge="Votre fiche Google"
            title="Optimiser votre fiche Google My Business"
            subtitle={`Vous avez déjà ${avis} avis et ${note}/5. C'est génial ! Mais on peut faire encore mieux.`}
          />

          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              value={`${note}`}
              label="Note actuelle"
              icon={Star}
              highlight={true}
            />
            <StatCard
              value={`${avis}`}
              label="Avis Google"
              icon={MessageCircle}
            />
            <StatCard
              value="Top 3"
              label="Objectif Local Pack"
              icon={Target}
            />
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Ce qu'on peut améliorer */}
            <div className="bg-[#F9F7F5] p-8 rounded-2xl border border-[#E8E2D9]">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#B08D55]" />
                Ce que j'optimise sur votre fiche
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#3C3633]">Description SEO</strong>
                    <p className="text-sm text-[#6D635C]">Texte optimisé avec les bons mots-clés pour {ville}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#3C3633]">Catégories précises</strong>
                    <p className="text-sm text-[#6D635C]">Salon de coiffure, Coloriste, Coiffeur visagiste...</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#3C3633]">Photos optimisées</strong>
                    <p className="text-sm text-[#6D635C]">Noms de fichiers, géolocalisation, légendes</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#3C3633]">Lien vers votre site</strong>
                    <p className="text-sm text-[#6D635C]">Google valorise les fiches avec un site web</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Réponse aux avis */}
            <div className="bg-[#F9F7F5] p-8 rounded-2xl border border-[#E8E2D9]">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#B08D55]" />
                Gestion des avis (Pack L'Écosystème)
              </h3>
              <p className="text-[#6D635C] mb-6">
                Répondre aux avis booste votre classement. Avec mon offre "Écosystème",
                je rédige des réponses professionnelles et SEO-friendly à chaque nouvel avis.
              </p>

              <div className="bg-white p-4 rounded-xl border border-[#E8E2D9]">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-[#B08D55] fill-[#B08D55]" />
                  <Star className="w-4 h-4 text-[#B08D55] fill-[#B08D55]" />
                  <Star className="w-4 h-4 text-[#B08D55] fill-[#B08D55]" />
                  <Star className="w-4 h-4 text-[#B08D55] fill-[#B08D55]" />
                  <Star className="w-4 h-4 text-[#B08D55] fill-[#B08D55]" />
                  <span className="text-sm text-[#8A7A70] ml-2">Marie L.</span>
                </div>
                <p className="text-sm text-[#3C3633] italic mb-3">"Super balayage, Lucie est vraiment à l'écoute !"</p>
                <div className="border-t border-[#F4F1ED] pt-3">
                  <p className="text-xs text-[#B08D55] font-medium mb-1">Réponse de {nom}</p>
                  <p className="text-sm text-[#6D635C]">
                    "Merci Marie pour votre confiance ! Ravie que votre balayage vous plaise.
                    À très bientôt dans notre salon de coiffure à {ville} ✨"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 7: OPPORTUNITÉS MOTS-CLÉS (Ghost Pages)
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F9F7F5]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            badge="Vos opportunités"
            title="Les recherches que vous perdez chaque mois"
            subtitle="Données réelles Haloscan — chaque ligne est un mot-clé où des clients potentiels vous cherchent."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quartiers */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8E2D9]">
              <h3 className="text-lg font-serif font-medium text-[#3C3633] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B08D55]" />
                Recherches par quartier
              </h3>
              <div className="space-y-1">
                {NICE_COIFFEUR_DATA.quartiers.map((q) => (
                  <KeywordRow key={q.term} term={q.term} volume={q.volume} isYou={true} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#B08D55]/10 rounded-xl">
                <p className="text-sm text-[#3C3633]">
                  <strong>Total :</strong> {NICE_COIFFEUR_DATA.quartiers.reduce((s, q) => s + q.volume, 0).toLocaleString()} recherches/mois
                  pour les quartiers de {ville}.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8E2D9]">
              <h3 className="text-lg font-serif font-medium text-[#3C3633] mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#B08D55]" />
                Recherches par intention
              </h3>
              <div className="space-y-1">
                {NICE_COIFFEUR_DATA.services.map((s) => (
                  <KeywordRow key={s.term} term={s.term} volume={s.volume} isYou={true} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#B08D55]/10 rounded-xl">
                <p className="text-sm text-[#3C3633]">
                  <strong>Avec "meilleur coiffeur nice" (720/mois)</strong>,
                  vous avez un avantage : votre note de {note}/5 est un argument fort.
                </p>
              </div>
            </div>
          </div>

          {/* Ghost Pages Explanation */}
          <div className="mt-12 bg-gradient-to-br from-[#3C3633] to-[#5A5243] p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-serif font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#B08D55]" />
              Ma stratégie "Pages Fantômes"
            </h3>
            <p className="text-white/80 mb-6">
              Avec l'offre <strong className="text-white">L'Écosystème</strong>, je crée des pages spécifiques
              pour chaque mot-clé à fort potentiel. Exemple :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="text-[#B08D55] font-medium mb-1">Page 1</p>
                <p className="text-white">/coiffeur-nice-nord</p>
                <p className="text-white/60 text-sm">Cible : 480 prospects/mois</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="text-[#B08D55] font-medium mb-1">Page 2</p>
                <p className="text-white">/meilleur-coiffeur-nice</p>
                <p className="text-white/60 text-sm">Cible : 720 prospects/mois</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="text-[#B08D55] font-medium mb-1">Page 3</p>
                <p className="text-white">/coiffeur-nice-sans-rdv</p>
                <p className="text-white/60 text-sm">Cible : 390 prospects/mois</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 8: ROI CALCULATOR
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white border-t border-[#E8E2D9]">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle
            badge="Le calcul"
            title="Combien de clients pouvez-vous gagner ?"
            subtitle="Un calcul simple et conservateur basé sur les données réelles."
          />

          <div className="bg-[#F9F7F5] p-8 rounded-2xl border border-[#E8E2D9]">
            <div className="space-y-6">
              {/* Recherches */}
              <div className="flex items-center justify-between py-4 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B08D55]/20 flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3C3633]">Recherches "coiffeur nice" /mois</p>
                    <p className="text-sm text-[#8A7A70]">Données Haloscan 2026</p>
                  </div>
                </div>
                <span className="text-2xl font-serif font-medium text-[#3C3633]">{NICE_COIFFEUR_DATA.mainKeyword.volume.toLocaleString()}</span>
              </div>

              {/* Taux de clic */}
              <div className="flex items-center justify-between py-4 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B08D55]/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3C3633]">Taux de clic position Top 5</p>
                    <p className="text-sm text-[#8A7A70]">Moyenne du marché</p>
                  </div>
                </div>
                <span className="text-2xl font-serif font-medium text-[#3C3633]">~5%</span>
              </div>

              {/* Visiteurs */}
              <div className="flex items-center justify-between py-4 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B08D55]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3C3633]">Visiteurs potentiels /mois</p>
                    <p className="text-sm text-[#8A7A70]">2 800 × 5%</p>
                  </div>
                </div>
                <span className="text-2xl font-serif font-medium text-[#3C3633]">140</span>
              </div>

              {/* Conversion */}
              <div className="flex items-center justify-between py-4 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B08D55]/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3C3633]">Taux de conversion (conservateur)</p>
                    <p className="text-sm text-[#8A7A70]">Prise de RDV</p>
                  </div>
                </div>
                <span className="text-2xl font-serif font-medium text-[#3C3633]">10%</span>
              </div>

              {/* Nouveaux clients */}
              <div className="flex items-center justify-between py-4 bg-green-50 -mx-8 px-8 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Nouveaux clients /mois</p>
                    <p className="text-sm text-green-600">140 × 10%</p>
                  </div>
                </div>
                <span className="text-3xl font-serif font-medium text-green-600">+14</span>
              </div>

              {/* CA */}
              <div className="flex items-center justify-between py-4 bg-[#B08D55]/10 -mx-8 px-8 rounded-xl mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B08D55]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3C3633]">CA additionnel annuel</p>
                    <p className="text-sm text-[#8A7A70]">14 clients × {avgTicket}€ × 12 mois</p>
                  </div>
                </div>
                <span className="text-3xl font-serif font-medium text-[#B08D55]">+{(14 * avgTicket * 12).toLocaleString()}€</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-[#8A7A70] mt-6">
            * Calcul conservateur. Avec les pages quartiers et services, le potentiel est 2-3× supérieur.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 9: MOCKUP SITE
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-[#F4F1ED] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <SectionTitle
            badge="Votre futur site"
            title="Une vitrine qui vous ressemble"
            subtitle="Design premium, mobile-first, optimisé pour Google et les IA."
            centered={true}
          />

          <div className="relative mx-auto w-[320px] md:w-[360px] h-[720px] bg-[#1a1a1a] rounded-[55px] p-[10px] shadow-[0_50px_100px_-20px_rgba(176,141,85,0.3)] border border-[#333]">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-3xl z-30"></div>

            {/* Screen */}
            <div className="w-full h-full bg-white rounded-[45px] overflow-hidden flex flex-col relative text-left">
              {/* Navbar */}
              <div className="absolute top-0 left-0 right-0 pt-12 px-6 pb-4 flex justify-between items-center z-20 bg-gradient-to-b from-white via-white/80 to-transparent">
                <span className="font-serif font-bold text-lg tracking-tight text-[#3C3633]">{nom}</span>
                <Menu className="w-6 h-6 text-[#3C3633]" />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F9F7F5] pt-0">
                {/* Hero Image */}
                <div className="h-[400px] w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=600"
                    className="w-full h-full object-cover"
                    alt="Coiffure"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F9F7F5] to-transparent h-32" />
                  <div className="absolute bottom-8 left-6">
                    <span className="text-xs bg-[#B08D55] text-white px-2 py-1 rounded mb-2 inline-block">Experte Balayage</span>
                    <h2 className="text-3xl font-serif text-[#3C3633] leading-none">Révélez votre beauté à {ville}.</h2>
                  </div>
                </div>

                <div className="px-6 py-6 pb-20">
                  <p className="text-sm text-[#6D635C] leading-relaxed mb-6 font-light">
                    "{nom}, votre coiffeuse de confiance au cœur de {ville}. Prenez le temps de vous révéler."
                  </p>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8E2D9] mb-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F4F1ED] flex items-center justify-center text-[#B08D55]">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-[#3C3633]">{note}/5 Excellence</div>
                      <div className="text-xs text-[#8A7A70]">Basé sur {avis} avis Google</div>
                    </div>
                  </div>

                  <button className="w-full bg-[#3C3633] text-[#F9F7F5] py-4 rounded-xl font-medium shadow-lg mb-4">
                    Prendre Rendez-vous
                  </button>
                  <p className="text-xs text-center text-[#999]">Sans commission · Direct Salon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 10: LES OFFRES
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white relative z-10" id="offres">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            badge="Tarifs transparents"
            title="Plus qu'un coût, un investissement"
            subtitle="Prix justes, en dessous du marché. L'IA me permet de vous offrir un travail d'agence pour une fraction du prix."
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            {/* OFFRE 1: L'ESSENTIEL */}
            <div className="p-8 border border-[#E8E2D9] rounded-2xl bg-[#F9F7F5] flex flex-col hover:border-[#B08D55]/50 transition-colors">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-2">L'Essentiel</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">690€</div>
              <p className="text-xs text-[#8A7A70] mb-6 font-sans">Paiement unique • Pas d'abonnement</p>

              <div className="border-t border-[#E8E2D9] py-6 space-y-3 flex-1">
                <p className="font-bold text-sm text-[#3C3633]">Votre vitrine digitale :</p>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Site Premium 3 pages</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Design sur-mesure</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Optimisation fiche Google</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Hébergement 1 an inclus</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> SSL (cadenas sécurité)</li>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-xs text-[#8A7A70] mb-3">Idéal pour : exister sur Google</p>
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-[#E8E2D9] bg-white text-[#3C3633] rounded-lg text-sm font-medium hover:bg-[#F4F1ED] transition-colors">
                  En savoir plus
                </a>
              </div>
            </div>

            {/* OFFRE 2: L'ÉCOSYSTÈME */}
            <div className="p-8 border-2 border-[#B08D55] rounded-2xl bg-white relative shadow-2xl flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#B08D55] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider uppercase">Recommandé</div>

              <h3 className="text-xl font-serif font-medium text-[#B08D55] mb-2">L'Écosystème</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">990€</div>
              <p className="text-xs text-[#B08D55] mb-6 font-sans">+ 149€/mois (SEO actif)</p>

              <div className="border-t border-[#F4F1ED] py-6 space-y-3 flex-1">
                <p className="font-bold text-sm text-[#3C3633]">Tout L'Essentiel, PLUS :</p>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> <strong>Stratégie SEO locale</strong></li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Pages Quartiers (Ghost Pages)</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> 1 article blog SEO/mois</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Réponses aux avis Google</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Mises à jour illimitées</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Rapport mensuel</li>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-xs text-[#B08D55] mb-3">Idéal pour : dominer Google à {ville}</p>
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 bg-[#3C3633] text-white rounded-lg text-sm font-medium hover:bg-[#5A5243] transition-colors shadow-lg">
                  Réserver un appel
                </a>
              </div>
            </div>

            {/* OFFRE 3: LE PACK DOMINANT */}
            <div className="p-8 border border-[#E8E2D9] rounded-2xl bg-[#F9F7F5] flex flex-col hover:border-[#B08D55]/50 transition-colors">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-2">Le Pack Dominant</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">1 290€</div>
              <p className="text-xs text-[#8A7A70] mb-6 font-sans">+ 199€/mois (Direction complète)</p>

              <div className="border-t border-[#E8E2D9] py-6 space-y-3 flex-1">
                <p className="font-bold text-sm text-[#3C3633]">L'Écosystème, PLUS :</p>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Shooting photo pro</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> 1 Reel/Short vidéo par mois</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Gestion réseaux sociaux</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Visibilité multi-canal</li>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-xs text-[#8A7A70] mb-3">Idéal pour : être N°1 à {ville}</p>
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-[#E8E2D9] bg-white text-[#3C3633] rounded-lg text-sm font-medium hover:bg-[#F4F1ED] transition-colors">
                  En savoir plus
                </a>
              </div>
            </div>

          </div>

          {/* Comparaison marché */}
          <div className="mt-12 bg-[#F9F7F5] p-6 rounded-2xl border border-[#E8E2D9] max-w-3xl mx-auto">
            <h4 className="font-medium text-[#3C3633] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#B08D55]" />
              Comparé au marché
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-[#8A7A70] mb-1">Agence traditionnelle</p>
                <p className="text-lg font-medium text-[#3C3633] line-through">2 500€ - 5 000€</p>
              </div>
              <div>
                <p className="text-sm text-[#8A7A70] mb-1">Freelance moyen</p>
                <p className="text-lg font-medium text-[#3C3633] line-through">1 500€ - 2 500€</p>
              </div>
              <div className="bg-[#B08D55]/10 rounded-xl p-3 -my-2">
                <p className="text-sm text-[#B08D55] mb-1">IndHack</p>
                <p className="text-lg font-medium text-[#B08D55]">690€ - 1 290€</p>
              </div>
            </div>
            <p className="text-sm text-[#8A7A70] mt-4 text-center">
              Grâce à l'IA, je peux vous offrir un travail d'agence pour une fraction du prix.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 11: FAQ
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F9F7F5]">
        <div className="container mx-auto max-w-3xl">
          <SectionTitle
            badge="Questions fréquentes"
            title="Vos questions, mes réponses"
          />

          <div className="space-y-4">
            <Accordion title="Combien de temps avant d'avoir des résultats ?">
              <p>
                Votre site est en ligne sous <strong>7-10 jours</strong>. Pour le SEO, comptez 2-3 mois pour voir
                les premières améliorations de positionnement, et 4-6 mois pour des résultats solides.
                C'est un investissement qui se rentabilise sur le long terme.
              </p>
            </Accordion>

            <Accordion title="Je ne suis pas douée en informatique, c'est compliqué ?">
              <p>
                Pas du tout ! Je m'occupe de tout : création, mise en ligne, optimisation.
                Vous n'avez rien à faire techniquement. Je vous envoie juste un formulaire simple
                pour récolter vos infos (textes, photos), et je fais le reste.
              </p>
            </Accordion>

            <Accordion title="Et si je veux arrêter l'abonnement ?">
              <p>
                Aucun engagement. Votre site vous appartient. Si vous arrêtez l'abonnement "Écosystème",
                vous gardez le site (juste sans les mises à jour SEO mensuelles).
                Vous payez juste l'hébergement (environ 10€/mois).
              </p>
            </Accordion>

            <Accordion title="Pourquoi c'est moins cher qu'une agence ?">
              <p>
                Parce que j'utilise l'IA pour automatiser 80% du travail technique (code, optimisation, rapports).
                Je passe mon temps sur ce qui compte : la stratégie, le design, et la personnalisation pour VOTRE salon.
                Pas de bureaux, pas de salariés, pas de charges. Juste du résultat.
              </p>
            </Accordion>

            <Accordion title="Est-ce que je peux modifier mon site moi-même ?">
              <p>
                Avec l'offre "Écosystème" et "Pack Dominant", toutes les modifications sont incluses :
                envoyez-moi un message, je fais le changement sous 24-48h.
                Si vous voulez vraiment modifier vous-même, je peux vous installer un éditeur simple (option).
              </p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SECTION 12: CTA FINAL
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3C3633] to-[#5A5243] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-6">
            {nom}, vos {avis} clientes<br />méritent de vous trouver sur Google.
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Réservez un appel de 30 minutes. Je vous montre exactement comment atteindre le top 5 Google
            pour "coiffeur {ville.toLowerCase()}". Sans engagement, sans bullshit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/contact-indhack/30min"
              target="_blank"
              className="inline-flex group bg-[#B08D55] text-white px-10 py-5 rounded-full font-medium text-lg items-center justify-center gap-3 hover:bg-[#C9A66B] transition-all shadow-xl hover:scale-105"
            >
              <Calendar className="w-6 h-6" />
              Réserver mon appel gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-sm text-white/50 mt-8">
            Ou appelez-moi directement : <a href="tel:0661139748" className="text-[#B08D55] hover:underline">06 61 13 97 48</a>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <footer className="py-12 bg-white text-center border-t border-[#E8E2D9] relative z-10">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#F4F1ED] overflow-hidden border-2 border-white shadow-md flex items-center justify-center">
            <span className="font-serif font-bold text-[#B08D55]">IH</span>
          </div>
        </div>
        <p className="text-[#3C3633] font-serif font-medium text-lg mb-2">IndHack • {ville}</p>
        <p className="text-[#6D635C] text-sm mb-8">Artisan du Web pour Artisans du Réel.</p>
        <p className="text-xs text-[#CCC]">06 61 13 97 48 • contact@indhack.com</p>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FLOATING CTA
      ═══════════════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="bg-[#3C3633] text-white pl-2 pr-6 py-2 rounded-full font-medium shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform border border-[#5A5243]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#B08D55] overflow-hidden border-2 border-white flex items-center justify-center">
              <span className="text-xs font-bold">IH</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-[#B08D55] uppercase tracking-wider font-bold">Dispo maintenant</span>
            <span className="block text-sm">On en parle ?</span>
          </div>
        </a>
      </div>

    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function CoiffeurPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F7F5]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
