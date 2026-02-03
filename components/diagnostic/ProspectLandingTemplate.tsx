'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  MapPin,
  Check,
  ArrowRight,
  Globe,
  Search,
  TrendingUp,
  Layers,
  Zap,
  MessageSquare,
  Eye,
  ChevronDown,
  Phone,
  Calendar,
  Building2,
  Sparkles,
  Target,
  BarChart3,
  Bot,
  Map,
  Clock,
  Users,
  Shield,
  Menu,
  ExternalLink
} from 'lucide-react'
import type { MetierData, KeywordData } from '@/lib/diagnostic-data'
import { getTotalSearchVolume, getEasyWinsCount } from '@/lib/diagnostic-data'

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface ProspectLandingTemplateProps {
  metier: MetierData
  prospect: {
    nom: string
    ville: string
    avis?: number
    note?: number
    quartier?: string
  }
  calendlyUrl?: string
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM - VERT ÉMERAUDE LUXE
// ═══════════════════════════════════════════════════════════════════════════════
//
// Fond: #FDFCF8 (Ivoire chaud)
// Texte Principal: #2D2A26 (Charbon doux)
// Texte Secondaire: #6B6358 (Gris taupe)
// Accent Principal: #0D6B4B (Émeraude luxe)
// Accent Or: #C6A87C (Or antique)
// Fond Secondaire: #F2EBE3 (Lin)
//
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS UI INTERNES
// ─────────────────────────────────────────────────────────────────────────────

function SectionBadge({ children, icon: Icon }: { children: React.ReactNode; icon: any }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D6B4B]/10 text-[#0D6B4B] text-sm font-medium tracking-wide uppercase mb-6">
      <Icon className="w-4 h-4" />
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#2D2A26] leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[#6B6358] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function KeywordPill({ keyword, volume, difficulty }: KeywordData) {
  const difficultyColors = {
    facile: 'bg-green-100 text-green-700 border-green-200',
    moyen: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    difficile: 'bg-red-100 text-red-700 border-red-200',
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#F2EBE3] hover:border-[#0D6B4B]/30 transition-colors">
      <div className="flex items-center gap-3">
        <Search className="w-4 h-4 text-[#0D6B4B]" />
        <span className="text-sm text-[#2D2A26] font-medium">{keyword}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[#0D6B4B]">{volume.toLocaleString('fr-FR')}/mois</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export default function ProspectLandingTemplate({
  metier,
  prospect,
  calendlyUrl = 'https://calendly.com/indhack/decouverte'
}: ProspectLandingTemplateProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalVolume = getTotalSearchVolume(metier)
  const easyWins = getEasyWinsCount(metier)

  // Calcul du potentiel client
  const potentialClients = Math.round((totalVolume * 0.03) * 0.1) // 3% CTR, 10% conversion
  const potentialRevenue = potentialClients * metier.averageTicket

  return (
    <main className="min-h-screen bg-[#FDFCF8] text-[#2D2A26] selection:bg-[#0D6B4B] selection:text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - VALORISATION DU PROSPECT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Image de fond avec overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${metier.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2A26]/95 via-[#2D2A26]/80 to-[#2D2A26]/60" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne texte */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge avis */}
              {prospect.avis && prospect.note && (
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                  <div className="flex -space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(prospect.note!) ? 'text-[#C6A87C] fill-[#C6A87C]' : 'text-white/30'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white">{prospect.avis} avis • {prospect.note}/5</span>
                </div>
              )}

              {/* Nom du prospect */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.1] mb-6">
                {prospect.nom},
                <br />
                <span className="text-[#C6A87C]">{metier.heroTitle}</span>
              </h1>

              <p className="text-xl text-white/80 font-light leading-relaxed mb-4 max-w-lg">
                {metier.heroSubtitle}
              </p>

              <div className="flex items-center gap-2 text-white/60 mb-10">
                <MapPin className="w-5 h-5" />
                <span>{metier.label} à {prospect.ville}{prospect.quartier ? ` • ${prospect.quartier}` : ''}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#0D6B4B] text-white px-8 py-4 rounded-full font-medium text-lg inline-flex items-center justify-center gap-3 hover:bg-[#0A5A3F] transition-all shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Réserver un appel découverte
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => scrollToSection('comprendre')}
                  className="text-white/80 hover:text-white px-8 py-4 rounded-full font-medium text-lg inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 transition-all"
                >
                  Comprendre le problème
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Colonne carte */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-5">
                    <p className="text-white/60 text-sm mb-1">Recherches mensuelles</p>
                    <p className="text-3xl font-serif font-medium text-white">{totalVolume.toLocaleString('fr-FR')}</p>
                    <p className="text-white/40 text-xs mt-1">sur "{metier.label.toLowerCase()} {prospect.ville}"</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-5">
                    <p className="text-white/60 text-sm mb-1">Mots-clés accessibles</p>
                    <p className="text-3xl font-serif font-medium text-[#C6A87C]">{easyWins}</p>
                    <p className="text-white/40 text-xs mt-1">niches peu concurrentielles</p>
                  </div>
                  <div className="col-span-2 bg-[#0D6B4B]/30 rounded-2xl p-5 border border-[#0D6B4B]/50">
                    <p className="text-white/60 text-sm mb-1">Potentiel mensuel estimé</p>
                    <p className="text-3xl font-serif font-medium text-white">+{potentialClients} à {potentialClients * 2} clients</p>
                    <p className="text-[#C6A87C] text-sm mt-1">soit {potentialRevenue.toLocaleString('fr-FR')}€ à {(potentialRevenue * 2).toLocaleString('fr-FR')}€/mois</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-8 h-8 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: COMPRENDRE LE PROBLÈME
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="comprendre" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={Eye}>Le constat</SectionBadge>
            <SectionTitle
              title="Le problème n'est pas votre travail"
              subtitle="Le problème, c'est que personne ne vous trouve quand il vous cherche sur Google."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#FDFCF8] rounded-3xl p-8 md:p-12 border border-[#F2EBE3]"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-serif font-medium text-[#2D2A26] mb-6">
                  {metier.problemStatement}
                </h3>
                <p className="text-[#6B6358] leading-relaxed mb-6">
                  Ce n'est pas une question de talent ou de qualité de service.
                  C'est une question de <strong className="text-[#2D2A26]">visibilité en ligne</strong>.
                </p>
                <p className="text-[#6B6358] leading-relaxed mb-8">
                  Vos concurrents ont compris une chose : aujourd'hui, le client cherche sur Google
                  <strong className="text-[#2D2A26]"> avant</strong> de demander à ses amis.
                  Si vous n'êtes pas là, il ne vous trouvera jamais.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#2D2A26]">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-sm font-bold">1</span>
                    </div>
                    <span>Un client potentiel cherche "{metier.label.toLowerCase()} {prospect.ville}"</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2D2A26]">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-sm font-bold">2</span>
                    </div>
                    <span>Google lui montre vos concurrents, pas vous</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2D2A26]">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-sm font-bold">3</span>
                    </div>
                    <span>Le client appelle le premier résultat. Vous avez perdu.</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F2EBE3]">
                <p className="text-sm text-[#6B6358] uppercase tracking-wide mb-4">Ce que vous perdez potentiellement</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#F2EBE3]">
                    <span className="text-[#6B6358]">Recherches mensuelles locales</span>
                    <span className="font-serif font-medium text-[#2D2A26]">{totalVolume.toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#F2EBE3]">
                    <span className="text-[#6B6358]">Visiteurs potentiels (3% CTR)</span>
                    <span className="font-serif font-medium text-[#2D2A26]">{Math.round(totalVolume * 0.03).toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#F2EBE3]">
                    <span className="text-[#6B6358]">Clients potentiels (10% conv.)</span>
                    <span className="font-serif font-medium text-[#0D6B4B]">{potentialClients} à {potentialClients * 2}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#6B6358]">Chiffre d'affaires manqué</span>
                    <span className="font-serif font-medium text-red-600">{potentialRevenue.toLocaleString('fr-FR')}€ à {(potentialRevenue * 2).toLocaleString('fr-FR')}€/mois</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: À QUOI SERT UN SITE WEB
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F2EBE3]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={Globe}>Votre vitrine digitale</SectionBadge>
            <SectionTitle
              title="À quoi sert vraiment un site web ?"
              subtitle="Ce n'est pas juste une carte de visite. C'est votre commercial qui travaille 24h/24."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-[#F2EBE3]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0D6B4B]/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#0D6B4B]" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-4">
                Disponible 24h/24
              </h3>
              <p className="text-[#6B6358] leading-relaxed">
                Votre site répond aux questions des clients même quand vous dormez.
                Il présente vos services, vos tarifs, vos créations à n'importe quelle heure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-[#F2EBE3]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0D6B4B]/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#0D6B4B]" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-4">
                Crédibilité professionnelle
              </h3>
              <p className="text-[#6B6358] leading-relaxed">
                71% des consommateurs jugent la crédibilité d'une entreprise sur son site web.
                Sans site, vous perdez la confiance avant même le premier contact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-[#F2EBE3]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0D6B4B]/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#0D6B4B]" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-4">
                Acquisition de clients
              </h3>
              <p className="text-[#6B6358] leading-relaxed">
                Un site optimisé attire des clients qualifiés qui cherchent exactement ce que vous proposez.
                Ce sont des clients chauds, prêts à prendre RDV.
              </p>
            </motion.div>
          </div>

          {/* Différence Wix vs Code sur-mesure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-[#F2EBE3]"
          >
            <h3 className="text-2xl font-serif font-medium text-[#2D2A26] mb-8 text-center">
              Pourquoi je ne fais pas de Wix ou WordPress ?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <h4 className="font-medium text-red-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">❌</span> Sites "tout-en-un" (Wix, WordPress, Squarespace)
                </h4>
                <ul className="space-y-2 text-red-600/80 text-sm">
                  <li>• Temps de chargement lent (4-6 secondes)</li>
                  <li>• Code "sale" que Google pénalise</li>
                  <li>• Pas optimisé pour le référencement local</li>
                  <li>• Vous louez, vous ne possédez rien</li>
                  <li>• Templates génériques = vous ressemblez à tout le monde</li>
                </ul>
              </div>
              <div className="p-6 bg-[#E8F5EF] rounded-2xl border border-[#0D6B4B]/20">
                <h4 className="font-medium text-[#0D6B4B] mb-4 flex items-center gap-2">
                  <span className="text-2xl">✓</span> Code sur-mesure (Next.js)
                </h4>
                <ul className="space-y-2 text-[#0D6B4B]/80 text-sm">
                  <li>• Chargement ultra-rapide (&lt;1 seconde)</li>
                  <li>• Code propre que Google adore</li>
                  <li>• Structure optimisée pour le SEO local</li>
                  <li>• Le code vous appartient à 100%</li>
                  <li>• Design unique qui vous ressemble</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: QU'EST-CE QUE LE SEO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={Search}>Référencement naturel</SectionBadge>
            <SectionTitle
              title="Le SEO, c'est quoi exactement ?"
              subtitle="En français : comment faire pour que Google vous montre quand quelqu'un vous cherche."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-medium text-[#2D2A26] mb-6">
                Google est comme un bibliothécaire
              </h3>
              <p className="text-[#6B6358] leading-relaxed mb-6">
                Imaginez Google comme un bibliothécaire qui classe des millions de livres.
                Quand quelqu'un demande "je cherche un bon {metier.label.toLowerCase()} à {prospect.ville}",
                le bibliothécaire va chercher les livres les plus pertinents.
              </p>
              <p className="text-[#6B6358] leading-relaxed mb-6">
                <strong className="text-[#2D2A26]">Le problème :</strong> si votre "livre" (votre site) est mal rangé,
                mal écrit, ou pire, n'existe pas... le bibliothécaire ne vous trouvera jamais.
              </p>
              <p className="text-[#6B6358] leading-relaxed">
                <strong className="text-[#2D2A26]">Le SEO, c'est :</strong> écrire votre livre de la bonne façon,
                le ranger au bon endroit, et mettre les bons mots sur la couverture pour que
                le bibliothécaire vous trouve et vous recommande.
              </p>
            </motion.div>

            {/* Visualisation des mots-clés */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#F2EBE3]"
            >
              <h4 className="font-medium text-[#2D2A26] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0D6B4B]" />
                Ce que les gens cherchent à {prospect.ville}
              </h4>
              <div className="space-y-3">
                {[...metier.keywords.principal, ...metier.keywords.niches.slice(0, 3)].map((kw, i) => (
                  <KeywordPill key={i} {...kw} />
                ))}
              </div>
              <p className="text-xs text-[#6B6358] mt-4 text-center">
                Données estimées basées sur les tendances de recherche locales
              </p>
            </motion.div>
          </div>

          {/* La stratégie des niches */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#2D2A26] rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-serif font-medium mb-4">
                La stratégie des "petits mots-clés"
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Au lieu d'essayer de gagner sur "coiffeur Nice" (très compétitif),
                on cible des dizaines de recherches précises. Et ça change tout.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-2xl p-6">
                <p className="text-[#C6A87C] text-sm uppercase tracking-wide mb-2">Mot-clé large (difficile)</p>
                <p className="text-lg font-medium mb-2">"{metier.label.toLowerCase()} {prospect.ville}"</p>
                <p className="text-white/60 text-sm">{metier.keywords.principal[0]?.volume.toLocaleString('fr-FR') || '2000+'}/mois • Très concurrentiel</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <p className="text-[#C6A87C] text-sm uppercase tracking-wide mb-2">Niches (accessibles)</p>
                <p className="text-lg font-medium mb-2">"{metier.keywords.niches[0]?.keyword}"</p>
                <p className="text-white/60 text-sm">{metier.keywords.niches[0]?.volume.toLocaleString('fr-FR')}/mois • Peu de concurrence</p>
              </div>
              <div className="bg-[#0D6B4B]/50 rounded-2xl p-6 border border-[#0D6B4B]">
                <p className="text-[#C6A87C] text-sm uppercase tracking-wide mb-2">Notre stratégie</p>
                <p className="text-lg font-medium mb-2">Dominer {easyWins} niches</p>
                <p className="text-white/60 text-sm">= Capturer {Math.round(totalVolume * 0.4).toLocaleString('fr-FR')} recherches/mois</p>
              </div>
            </div>

            <p className="text-center text-white/60 text-sm mt-8">
              En étant premier sur 10 petits mots-clés, vous captez plus de clients qu'en étant 5ème sur un gros.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: GOOGLE MAPS / FICHE GMB
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F2EBE3]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={Map}>Google Maps</SectionBadge>
            <SectionTitle
              title="Votre fiche Google : un atout sous-exploité"
              subtitle="La plupart des recherches locales affichent la carte Google en premier. Êtes-vous visible ?"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-medium text-[#2D2A26] mb-6">
                3 entreprises. Des milliers de recherches.
              </h3>
              <p className="text-[#6B6358] leading-relaxed mb-6">
                Quand quelqu'un cherche "{metier.label.toLowerCase()}" sur Google, il voit d'abord
                <strong className="text-[#2D2A26]"> 3 fiches Google Maps</strong>. Pas plus.
              </p>
              <p className="text-[#6B6358] leading-relaxed mb-6">
                Si vous n'êtes pas dans ces 3 positions, vous êtes invisible pour 90% des gens
                qui ne scrollent jamais plus bas.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D6B4B] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D2A26]">Optimisation de votre fiche</p>
                    <p className="text-sm text-[#6B6358]">Photos professionnelles, descriptions optimisées, catégories précises</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D6B4B] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D2A26]">Gestion des avis</p>
                    <p className="text-sm text-[#6B6358]">Stratégie pour obtenir plus d'avis et y répondre intelligemment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D6B4B] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D2A26]">Posts Google réguliers</p>
                    <p className="text-sm text-[#6B6358]">Publications qui montrent à Google que vous êtes actif</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#F2EBE3]"
            >
              {/* Simulation d'une fiche GMB */}
              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-[#0D6B4B] to-[#0A5A3F] flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-white/30" />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-[#2D2A26] text-lg">{prospect.nom}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                    </div>
                    <span className="text-sm text-[#6B6358]">{prospect.avis || '155'} avis</span>
                  </div>
                  <p className="text-sm text-[#6B6358] mt-2">{metier.label} • {prospect.ville}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-[#1A73E8] text-white text-sm py-2 rounded-full">Itinéraire</button>
                    <button className="flex-1 border border-[#1A73E8] text-[#1A73E8] text-sm py-2 rounded-full">Appeler</button>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-[#6B6358] mt-4">
                Votre fiche optimisée = plus de clics, plus d'appels
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: L'IA ET LE FUTUR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={Bot}>Le futur est déjà là</SectionBadge>
            <SectionTitle
              title="ChatGPT, Siri, Alexa... Et vous ?"
              subtitle="Les assistants IA vont révolutionner la façon dont vos clients vous trouvent. Êtes-vous prêt ?"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#2D2A26] to-[#1a1917] rounded-3xl p-8 md:p-12 text-white mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-serif font-medium mb-6">
                  "Siri, trouve-moi un bon {metier.label.toLowerCase()} près de moi"
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  De plus en plus de gens utilisent la voix ou des chatbots IA pour chercher des services.
                  Ces assistants ne lisent pas les sites comme vous et moi.
                </p>
                <p className="text-white/70 leading-relaxed mb-6">
                  Ils analysent le code, les données structurées, et les signaux de confiance.
                  <strong className="text-white"> Si votre site n'est pas optimisé pour eux, ils ne vous recommanderont jamais.</strong>
                </p>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-[#C6A87C] mb-2">Ce que je fais :</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Données structurées Schema.org (lisibles par les IA)</li>
                    <li>• Contenu optimisé pour les requêtes conversationnelles</li>
                    <li>• Architecture qui facilite la compréhension IA</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-[#0D6B4B]/30 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-[#0D6B4B]/50 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-[#0D6B4B] flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white text-[#2D2A26] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    GEO-Ready
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arguments réels sur l'IA */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#F2EBE3]">
              <p className="text-4xl mb-4">🔮</p>
              <h4 className="font-medium text-[#2D2A26] mb-2">Google SGE (Search Generative Experience)</h4>
              <p className="text-sm text-[#6B6358]">
                Google teste déjà des réponses IA dans ses résultats. Les sites non optimisés seront ignorés.
              </p>
            </div>
            <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#F2EBE3]">
              <p className="text-4xl mb-4">🎯</p>
              <h4 className="font-medium text-[#2D2A26] mb-2">Recherche vocale en hausse</h4>
              <p className="text-sm text-[#6B6358]">
                40% des adultes utilisent la recherche vocale quotidiennement. Les requêtes sont plus longues et conversationnelles.
              </p>
            </div>
            <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#F2EBE3]">
              <p className="text-4xl mb-4">⚡</p>
              <h4 className="font-medium text-[#2D2A26] mb-2">Agir maintenant = avantage</h4>
              <p className="text-sm text-[#6B6358]">
                Les premiers à s'adapter seront les mieux positionnés. Vos concurrents attendent. Pas vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: CE QUE JE PROPOSE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#2D2A26]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#C6A87C] text-sm font-medium tracking-wide uppercase mb-6">
              <Target className="w-4 h-4" />
              Ma proposition
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white leading-tight mb-4">
              Un site qui travaille pour vous
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Création + Maintenance mensuelle = Croissance continue
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-serif font-medium text-[#C6A87C] mb-4">
                  Phase 1 : Création de votre site
                </h3>
                <ul className="space-y-3">
                  {[
                    'Site sur-mesure à votre image (pas de template)',
                    'Design moderne et professionnel',
                    'Optimisé mobile (70% des recherches)',
                    'Chargement ultra-rapide (&lt;1 seconde)',
                    'Structure SEO intégrée dès le départ',
                    'Données structurées pour les IA',
                    'Formulaire de contact / Prise de RDV',
                    'Hébergement et nom de domaine inclus',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#0D6B4B] mt-0.5 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-[#C6A87C] mb-4">
                  Phase 2 : Maintenance mensuelle
                </h3>
                <ul className="space-y-3">
                  {[
                    'Création de nouvelles pages SEO (niches locales)',
                    'Rédaction de contenu optimisé',
                    'Optimisation continue de votre fiche Google',
                    'Suivi de vos positions sur les mots-clés',
                    'Rapport mensuel de visibilité',
                    'Modifications et mises à jour illimitées',
                    'Support réactif (réponse sous 24h)',
                    'Veille sur les évolutions Google/IA',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#0D6B4B] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/60 mb-6">
                Les tarifs dépendent de votre projet et de vos objectifs. Discutons-en.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0D6B4B] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0A5A3F] transition-all shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Réserver un appel (gratuit, 20 min)
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: À PROPOS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-10"
          >
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#0D6B4B] flex items-center justify-center text-white text-4xl font-serif shadow-xl">
                I
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium text-[#2D2A26] mb-4">
                Je suis Indiana, fondateur d'IndHack
              </h3>
              <p className="text-[#6B6358] leading-relaxed mb-4">
                Développeur web et consultant SEO basé à Nice. Je travaille avec des artisans,
                commerçants et professions libérales qui veulent être visibles en ligne sans y passer leurs journées.
              </p>
              <p className="text-[#6B6358] leading-relaxed">
                Je ne suis pas une grosse agence avec des commerciaux. Je suis un artisan du web,
                comme vous êtes artisan de votre métier. Je comprends vos enjeux, et je parle votre langue.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="py-16 px-6 bg-[#2D2A26]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-6">
            Prêt(e) à devenir visible ?
          </h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Réservez un appel découverte gratuit de 20 minutes.
            On analyse ensemble votre situation et je vous dis honnêtement si je peux vous aider.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0D6B4B] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0A5A3F] transition-all shadow-lg mb-8"
          >
            <Calendar className="w-5 h-5" />
            Réserver mon appel gratuit
          </a>
          <div className="flex items-center justify-center gap-6 text-white/40 text-sm">
            <a href="tel:+33661139748" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <Phone className="w-4 h-4" />
              06 61 13 97 48
            </a>
            <span>•</span>
            <span>contact@indhack.com</span>
            <span>•</span>
            <span>Nice, France</span>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA FLOTTANT MOBILE
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F2EBE3] md:hidden z-50">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 bg-[#0D6B4B] text-white py-4 rounded-full font-medium"
        >
          <Calendar className="w-5 h-5" />
          Réserver un appel gratuit
        </a>
      </div>

      {/* CTA Desktop flottant */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="fixed bottom-8 right-8 hidden md:block z-50"
      >
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[#0D6B4B] text-white pl-3 pr-6 py-3 rounded-full shadow-2xl hover:bg-[#0A5A3F] transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#0D6B4B]" />
          </div>
          <div className="text-left">
            <p className="text-xs text-white/70">Appel découverte gratuit</p>
            <p className="font-medium">Réserver un créneau</p>
          </div>
        </a>
      </motion.div>

    </main>
  )
}
