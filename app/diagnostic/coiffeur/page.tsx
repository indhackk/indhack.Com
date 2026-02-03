'use client'
// V12 - Expert Tone + Premium Design + Real Haloscan Data

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, MapPin, Check, ArrowRight, Sparkles, Crown, Menu,
  Globe, TrendingUp, Search, Users, Target, Zap,
  BarChart3, Eye, MessageCircle, Calendar, Phone,
  AlertTriangle, Award, ShieldCheck, Lightbulb, ChevronDown,
  ExternalLink, Scissors, Heart, X, Clock, Shield,
  ArrowUpRight, BadgeCheck, Flame, Lock
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// HALOSCAN DATA - Coiffeur Nice (Source: Haloscan Janvier 2026)
// ═══════════════════════════════════════════════════════════════════════════════
const MARKET_DATA = {
  mainKeyword: { term: 'coiffeur nice', volume: 2800 },
  quartiers: [
    { term: 'coiffeur nice nord', volume: 480 },
    { term: 'coiffeur nice etoile', volume: 390 },
    { term: 'coiffeur nice ouest', volume: 260 },
    { term: 'coiffeur nice riquier', volume: 170 },
    { term: 'coiffeur nice centre', volume: 110 },
  ],
  services: [
    { term: 'meilleur coiffeur nice', volume: 720 },
    { term: 'coiffeur nice homme', volume: 590 },
    { term: 'coiffeur nice pas cher', volume: 480 },
    { term: 'coiffeur nice sans rdv', volume: 390 },
  ],
  competitors: [
    { rank: 1, name: 'Planity', type: 'Annuaire', threat: 'Prend 2-5% par RDV' },
    { rank: 2, name: 'Petit Futé', type: 'Annuaire', threat: 'Pas votre vitrine' },
    { rank: 3, name: 'Le Fil de l\'Âme', type: 'Concurrent', threat: 'A un site = Top 3' },
    { rank: 4, name: 'Salon Carré d\'Or', type: 'Concurrent', threat: 'A un site = Top 4' },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'danger' | 'success' }) {
  const styles = {
    default: 'bg-white/80 backdrop-blur border-white/50 text-[#3C3633]',
    gold: 'bg-gradient-to-r from-[#B08D55] to-[#D4AF37] border-[#B08D55]/50 text-white',
    danger: 'bg-red-500/10 border-red-500/30 text-red-600',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${styles[variant]}`}>
      {children}
    </span>
  )
}

function Section({ children, className = '', dark = false }: { children: React.ReactNode, className?: string, dark?: boolean }) {
  return (
    <section className={`py-20 md:py-28 px-5 md:px-8 ${dark ? 'bg-[#1C1917] text-white' : 'bg-white'} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

function SectionHeader({ badge, title, subtitle }: { badge?: string, title: string, subtitle?: string }) {
  return (
    <div className="text-center mb-16 max-w-3xl mx-auto">
      {badge && (
        <motion.div {...fadeInUp} className="mb-4">
          <span className="text-[11px] font-bold text-[#B08D55] uppercase tracking-[0.25em]">{badge}</span>
        </motion.div>
      )}
      <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-5">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p {...fadeInUp} className="text-lg text-[#8A8A8A] font-light leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

function MetricCard({ value, label, trend, icon: Icon }: { value: string, label: string, trend?: string, icon: any }) {
  return (
    <div className="bg-gradient-to-br from-white to-[#FAFAFA] p-6 rounded-2xl border border-[#E5E5E5] hover:border-[#B08D55]/30 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-[#B08D55]/10 flex items-center justify-center group-hover:bg-[#B08D55]/20 transition-colors">
          <Icon className="w-5 h-5 text-[#B08D55]" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-serif font-medium text-[#1C1917] mb-1">{value}</div>
      <div className="text-sm text-[#8A8A8A]">{label}</div>
    </div>
  )
}

function Accordion({ title, children, icon }: { title: string, children: React.ReactNode, icon?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white hover:border-[#B08D55]/30 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="flex-1 font-medium text-[#1C1917]">{title}</span>
        <ChevronDown className={`w-5 h-5 text-[#B08D55] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-[#6B6B6B] leading-relaxed border-t border-[#F5F5F5] pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent() {
  const searchParams = useSearchParams()

  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const avis = parseInt(searchParams.get('avis') || '155')
  const note = parseFloat(searchParams.get('note') || '4.6')

  // Calculs ROI
  const avgTicket = 65
  const clickRate = 0.05
  const convRate = 0.10
  const monthlyVisitors = Math.round(MARKET_DATA.mainKeyword.volume * clickRate)
  const monthlyClients = Math.round(monthlyVisitors * convRate)
  const yearlyRevenue = monthlyClients * avgTicket * 12

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1C1917] font-sans antialiased">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — L'accroche qui fait mal
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center py-20 px-5 md:px-8 overflow-hidden bg-gradient-to-b from-[#F5F3F0] to-[#FAFAFA]">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#B08D55]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#B08D55]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          {/* Left — Content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="gold">
                <Star className="w-3 h-3 fill-current" /> {note}/5 — {avis} avis
              </Badge>
              <Badge variant="danger">
                <AlertTriangle className="w-3 h-3" /> Invisible sur Google
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.05] mb-6">
              {nom},<br />
              <span className="text-[#B08D55]">{MARKET_DATA.mainKeyword.volume.toLocaleString()}</span> clients<br />
              vous cherchent.<br />
              <span className="text-[#8A8A8A] text-[0.7em]">Chaque mois.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
              Votre note est excellente. Vos clientes vous adorent.
              Mais <strong className="text-[#1C1917]">sans site web</strong>, Google vous ignore
              et <strong className="text-[#1C1917]">Planity encaisse</strong> à votre place.
            </p>

            {/* Mini SERP */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 mb-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-[#8A8A8A] mb-4 pb-3 border-b border-[#F5F5F5]">
                <Search className="w-4 h-4" />
                <span>Résultats Google pour "coiffeur nice"</span>
              </div>
              <div className="space-y-2">
                {MARKET_DATA.competitors.slice(0, 3).map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${c.type === 'Annuaire' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {c.rank}
                    </span>
                    <span className="flex-1 font-medium">{c.name}</span>
                    <span className="text-xs text-[#8A8A8A]">{c.threat}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 text-sm bg-red-50 -mx-3 px-3 py-2 rounded-lg border border-red-100">
                  <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center bg-red-500 text-white">?</span>
                  <span className="flex-1 font-medium text-red-700">{nom}</span>
                  <span className="text-xs text-red-500 font-medium">Introuvable</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://calendly.com/contact-indhack/30min"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-[#1C1917] text-white px-7 py-4 rounded-full font-medium hover:bg-[#B08D55] transition-all hover:scale-[1.02] shadow-lg shadow-black/10"
              >
                <Calendar className="w-5 h-5" />
                Réserver un audit gratuit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:0661139748"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#E5E5E5] text-[#1C1917] hover:bg-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#B08D55]" />
                06 61 13 97 48
              </a>
            </div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative mx-auto w-[300px] h-[620px] bg-[#1C1917] rounded-[3rem] p-2 shadow-2xl shadow-black/20 border border-[#333]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1C1917] rounded-b-2xl z-10" />
                <div className="w-full h-full bg-[#F9F7F5] rounded-[2.5rem] overflow-hidden">
                  {/* Screen content */}
                  <div className="relative h-full">
                    <img
                      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800"
                      alt="Salon"
                      className="w-full h-[55%] object-cover"
                    />
                    <div className="absolute top-[50%] left-0 right-0 h-20 bg-gradient-to-t from-[#F9F7F5] to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium shadow">
                        <Star className="w-3.5 h-3.5 text-[#B08D55] fill-[#B08D55]" />
                        {note}
                      </div>
                      <div className="bg-[#B08D55] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow">
                        {avis} avis
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-medium mb-2">{nom}</h3>
                      <p className="text-sm text-[#8A8A8A] mb-4">Votre coiffeuse experte à {ville}</p>
                      <button className="w-full bg-[#1C1917] text-white py-3.5 rounded-xl font-medium">
                        Prendre RDV
                      </button>
                      <p className="text-[10px] text-center text-[#8A8A8A] mt-2">Sans commission</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-16 top-1/4 bg-white rounded-xl shadow-xl p-4 border border-[#E5E5E5] animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-600">+{monthlyClients}</div>
                    <div className="text-xs text-[#8A8A8A]">clients/mois</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-10 bottom-1/4 bg-white rounded-xl shadow-xl p-4 border border-[#E5E5E5] animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B08D55]/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#B08D55]">+{(yearlyRevenue/1000).toFixed(0)}k€</div>
                    <div className="text-xs text-[#8A8A8A]">CA/an potentiel</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — Le problème (sans site)
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section className="bg-[#FAFAFA]">
        <SectionHeader
          badge="Le constat"
          title="Sans site web, vous perdez sur tous les fronts"
          subtitle="Une fiche Google et Instagram ne suffisent plus. Voici ce que vous laissez sur la table."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Lock,
              title: "Prisonnier des plateformes",
              desc: "Planity, Treatwell... Ils prennent 2-5% sur chaque RDV. Sur 100 clientes/mois à 65€, ça fait 130-325€ de commissions perdues.",
              color: "red"
            },
            {
              icon: Eye,
              title: "Invisible sur Google",
              desc: `${MARKET_DATA.mainKeyword.volume.toLocaleString()} recherches/mois pour "coiffeur nice". Sans site, vous n'apparaissez dans aucun résultat organique.`,
              color: "orange"
            },
            {
              icon: MessageCircle,
              title: "Absent des IA",
              desc: "ChatGPT, Perplexity, Google Gemini... Ces IA recommandent des salons avec un site. Sans site = pas de données = pas de recommandation.",
              color: "purple"
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-[#E5E5E5] hover:border-red-200 hover:bg-red-50/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-5 group-hover:bg-red-200 transition-colors`}>
                <item.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparaison visuelle */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <X className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-red-800">Aujourd'hui</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Dépendance aux annuaires (commissions)",
                "Google vous classe après vos concurrents",
                "Pas de vitrine pour montrer votre travail",
                "Les IA ne vous connaissent pas",
                "Vos avis Google ne suffisent pas à ranker",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-red-700">
                  <X className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-8 h-8 text-emerald-500" />
              <h3 className="text-xl font-semibold text-emerald-800">Avec votre site</h3>
            </div>
            <ul className="space-y-3">
              {[
                "RDV directs, 0% de commission",
                "Présence sur Google + Local Pack",
                "Galerie, avis, tarifs : tout centralisé",
                "ChatGPT et Perplexity vous recommandent",
                "Un actif digital qui vous appartient",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-emerald-700">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — Analyse concurrentielle
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section dark>
        <SectionHeader
          badge="Données Haloscan 2026"
          title="Vos concurrents ont compris"
          subtitle="Le Fil de l'Âme et Salon Carré d'Or sont en top 5. Leur secret ? Un site web."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* SERP Analysis */}
          <div>
            <h3 className="text-sm font-bold text-[#B08D55] uppercase tracking-wider mb-6">Classement Google "coiffeur nice"</h3>
            <div className="space-y-3">
              {MARKET_DATA.competitors.map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    c.type === 'Annuaire'
                      ? 'bg-orange-500/10 border-orange-500/20'
                      : 'bg-emerald-500/10 border-emerald-500/20'
                  }`}
                >
                  <span className={`w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center ${
                    c.rank <= 2 ? 'bg-[#B08D55] text-white' : 'bg-white/20'
                  }`}>
                    #{c.rank}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-white/60">{c.type}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    c.type === 'Annuaire' ? 'bg-orange-500/20 text-orange-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {c.type === 'Annuaire' ? 'Annuaire' : 'A un site'}
                  </span>
                </div>
              ))}
              {/* You */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/20 border-2 border-red-500/40 border-dashed">
                <span className="w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center bg-red-500">?</span>
                <div className="flex-1">
                  <div className="font-medium text-red-300">{nom}</div>
                  <div className="text-xs text-red-400">Non classé (pas de site)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-[#B08D55]" />
                <h4 className="text-lg font-semibold">L'analyse</h4>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                <strong className="text-white">Le Fil de l'Âme</strong> et <strong className="text-white">Salon Carré d'Or</strong> ont
                des notes inférieures à la vôtre ({note}/5). Mais ils sont devant vous.
              </p>
              <p className="text-white/70 mb-6 leading-relaxed">
                La différence ? <strong className="text-white">Ils ont un site web professionnel</strong>.
                Google interprète ça comme un signal de crédibilité.
              </p>
              <div className="bg-[#B08D55]/20 rounded-xl p-4 border border-[#B08D55]/30">
                <div className="flex items-center gap-2 text-[#B08D55] font-medium">
                  <Target className="w-5 h-5" />
                  Objectif réaliste : Top 5 en 4-6 mois
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — Les opportunités (mots-clés)
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          badge="Opportunités identifiées"
          title="Les requêtes que vous ne captez pas"
          subtitle="Chaque ligne = des clients potentiels qui cherchent un coiffeur comme vous."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Quartiers */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-5 border-b border-[#F5F5F5] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#B08D55]" />
              <h3 className="font-semibold">Par quartier</h3>
            </div>
            <div className="p-5 space-y-3">
              {MARKET_DATA.quartiers.map((q, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                  <span className="text-sm">{q.term}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#B08D55]">{q.volume}</span>
                    <span className="text-xs text-[#8A8A8A]">/mois</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#B08D55]/5 border-t border-[#B08D55]/10">
              <p className="text-sm text-[#B08D55] font-medium">
                Total : {MARKET_DATA.quartiers.reduce((s, q) => s + q.volume, 0).toLocaleString()} recherches/mois
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-5 border-b border-[#F5F5F5] flex items-center gap-2">
              <Search className="w-5 h-5 text-[#B08D55]" />
              <h3 className="font-semibold">Par intention</h3>
            </div>
            <div className="p-5 space-y-3">
              {MARKET_DATA.services.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                  <span className="text-sm">{s.term}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#B08D55]">{s.volume}</span>
                    <span className="text-xs text-[#8A8A8A]">/mois</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-emerald-50 border-t border-emerald-100">
              <p className="text-sm text-emerald-700 font-medium">
                "meilleur coiffeur nice" → Votre note de {note}/5 est un atout majeur
              </p>
            </div>
          </div>
        </div>

        {/* Ghost Pages Strategy */}
        <div className="bg-gradient-to-br from-[#1C1917] to-[#2C2926] rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-[#B08D55]" />
            <h3 className="text-xl font-semibold">Stratégie "Pages Locales"</h3>
          </div>
          <p className="text-white/70 mb-6">
            Je crée des pages optimisées pour chaque mot-clé à fort potentiel. Résultat : vous apparaissez sur plusieurs requêtes simultanément.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { url: '/coiffeur-nice-nord', volume: 480 },
              { url: '/meilleur-coiffeur-nice', volume: 720 },
              { url: '/coiffeur-nice-sans-rdv', volume: 390 },
            ].map((page, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <code className="text-[#B08D55] text-sm">{page.url}</code>
                <p className="text-white/60 text-sm mt-1">→ {page.volume} prospects/mois</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — ROI Calculator
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAFAFA]">
        <SectionHeader
          badge="Projection"
          title="Le calcul est simple"
          subtitle="Estimation conservatrice basée sur les données Haloscan."
        />

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm">
            {[
              { label: 'Recherches "coiffeur nice" /mois', value: MARKET_DATA.mainKeyword.volume.toLocaleString(), icon: Search },
              { label: 'Taux de clic Top 5 (conservateur)', value: '5%', icon: Eye },
              { label: 'Visiteurs potentiels /mois', value: monthlyVisitors.toString(), icon: Users },
              { label: 'Taux de conversion (prise de RDV)', value: '10%', icon: Target },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-5 border-b border-[#F5F5F5]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#B08D55]/10 flex items-center justify-center">
                    <row.icon className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <span className="text-[#6B6B6B]">{row.label}</span>
                </div>
                <span className="text-xl font-serif font-medium">{row.value}</span>
              </div>
            ))}

            {/* Results */}
            <div className="bg-emerald-50 p-5 border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-emerald-700 font-medium">Nouveaux clients /mois</span>
                </div>
                <span className="text-2xl font-serif font-medium text-emerald-600">+{monthlyClients}</span>
              </div>
            </div>

            <div className="bg-[#B08D55]/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#B08D55]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#B08D55]" />
                  </div>
                  <div>
                    <span className="text-[#1C1917] font-medium">CA additionnel /an</span>
                    <p className="text-xs text-[#8A8A8A]">{monthlyClients} × {avgTicket}€ × 12 mois</p>
                  </div>
                </div>
                <span className="text-3xl font-serif font-medium text-[#B08D55]">+{yearlyRevenue.toLocaleString()}€</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-[#8A8A8A] mt-6">
            * Calcul basé sur le mot-clé principal uniquement. Avec les pages locales, le potentiel est 2-3× supérieur.
          </p>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — Les offres
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          badge="Investissement"
          title="Des prix justes, sans surprise"
          subtitle="L'IA me permet de vous offrir un travail d'agence pour une fraction du prix."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Essentiel */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 hover:border-[#B08D55]/30 hover:shadow-lg transition-all flex flex-col">
            <h3 className="text-xl font-semibold mb-2">L'Essentiel</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-serif font-medium">690€</span>
            </div>
            <p className="text-sm text-[#8A8A8A] mb-6">Paiement unique</p>

            <div className="border-t border-[#F5F5F5] pt-6 space-y-3 flex-1">
              {[
                'Site vitrine 3 pages',
                'Design premium responsive',
                'Optimisation fiche Google',
                'Hébergement 1 an inclus',
                'Certificat SSL sécurisé',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#B08D55] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/contact-indhack/30min"
              target="_blank"
              className="mt-8 block w-full text-center py-3 border border-[#E5E5E5] rounded-xl font-medium hover:bg-[#F5F5F5] transition-colors"
            >
              En savoir plus
            </a>
          </div>

          {/* Écosystème */}
          <div className="bg-[#1C1917] text-white rounded-2xl p-8 relative shadow-xl flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 right-6 bg-[#B08D55] text-white text-[10px] font-bold px-3 py-1.5 rounded-b-lg uppercase tracking-wider">
              Recommandé
            </div>

            <h3 className="text-xl font-semibold text-[#B08D55] mb-2">L'Écosystème</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-serif font-medium">990€</span>
            </div>
            <p className="text-sm text-white/60 mb-6">+ 149€/mois (SEO actif)</p>

            <div className="border-t border-white/10 pt-6 space-y-3 flex-1">
              {[
                'Tout L\'Essentiel inclus',
                'Stratégie SEO locale complète',
                'Pages quartiers optimisées',
                '1 article blog /mois',
                'Réponses aux avis Google',
                'Mises à jour illimitées',
                'Rapport de performance mensuel',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#B08D55] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/contact-indhack/30min"
              target="_blank"
              className="mt-8 block w-full text-center py-3 bg-[#B08D55] rounded-xl font-medium hover:bg-[#C9A66B] transition-colors"
            >
              Réserver un appel
            </a>
          </div>

          {/* Pack Dominant */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 hover:border-[#B08D55]/30 hover:shadow-lg transition-all flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Pack Dominant</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-serif font-medium">1 290€</span>
            </div>
            <p className="text-sm text-[#8A8A8A] mb-6">+ 199€/mois</p>

            <div className="border-t border-[#F5F5F5] pt-6 space-y-3 flex-1">
              {[
                'Tout L\'Écosystème inclus',
                'Shooting photo professionnel',
                '1 Reel/Short vidéo par mois',
                'Gestion réseaux sociaux',
                'Visibilité multi-plateforme',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#B08D55] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/contact-indhack/30min"
              target="_blank"
              className="mt-8 block w-full text-center py-3 border border-[#E5E5E5] rounded-xl font-medium hover:bg-[#F5F5F5] transition-colors"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Market comparison */}
        <div className="bg-[#F5F3F0] rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#B08D55]" />
            <span className="font-semibold">Comparé au marché</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-[#8A8A8A] mb-1">Agence</p>
              <p className="font-medium line-through text-[#8A8A8A]">3 000€ - 8 000€</p>
            </div>
            <div>
              <p className="text-sm text-[#8A8A8A] mb-1">Freelance</p>
              <p className="font-medium line-through text-[#8A8A8A]">1 500€ - 3 000€</p>
            </div>
            <div className="bg-[#B08D55]/10 rounded-xl py-2 -my-2">
              <p className="text-sm text-[#B08D55] mb-1">IndHack</p>
              <p className="font-medium text-[#B08D55]">690€ - 1 290€</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — FAQ
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section className="bg-[#FAFAFA]">
        <SectionHeader
          badge="Questions fréquentes"
          title="Ce que vous voulez savoir"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion title="Combien de temps pour voir des résultats ?" icon="⏱️">
            <p>
              Votre site est en ligne sous <strong>7-10 jours</strong>. Pour le SEO, comptez 2-3 mois pour les premières améliorations,
              et 4-6 mois pour des positions stables en top 10. C'est un investissement moyen-terme qui génère du trafic gratuit et qualifié.
            </p>
          </Accordion>

          <Accordion title="Je n'y connais rien en informatique, c'est compliqué ?" icon="💻">
            <p>
              Zéro technique de votre côté. Je vous envoie un questionnaire simple (infos, photos), et je m'occupe de tout :
              création, mise en ligne, optimisation, maintenance. Vous vous concentrez sur votre métier.
            </p>
          </Accordion>

          <Accordion title="Et si je veux arrêter l'abonnement ?" icon="🔓">
            <p>
              Aucun engagement minimum. Le site vous appartient. Si vous arrêtez l'abonnement "Écosystème",
              vous gardez le site (sans les mises à jour SEO mensuelles). Hébergement seul : ~10€/mois.
            </p>
          </Accordion>

          <Accordion title="Pourquoi c'est moins cher qu'une agence ?" icon="🤖">
            <p>
              J'utilise l'IA pour automatiser 80% du travail technique (code, optimisation, rapports).
              Je me concentre sur la stratégie et la personnalisation. Pas de bureaux, pas de salariés = économies répercutées sur vous.
            </p>
          </Accordion>

          <Accordion title="Comment ça marche avec ChatGPT et les IA ?" icon="🧠">
            <p>
              Les IA comme ChatGPT ou Perplexity puisent leurs infos sur le web. Si vous avez un site bien structuré
              avec des infos claires (services, localisation, avis), elles peuvent vous recommander quand quelqu'un demande
              "quel coiffeur à Nice ?". Sans site = invisibilité totale.
            </p>
          </Accordion>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section dark className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-6 max-w-3xl mx-auto leading-tight">
            {nom}, vos {avis} clientes<br />méritent de vous trouver.
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            30 minutes. Gratuit. Sans engagement.
            Je vous montre exactement comment atteindre le top 5 Google.
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#B08D55] text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-[#C9A66B] transition-all hover:scale-[1.02] shadow-xl"
          >
            <Calendar className="w-6 h-6" />
            Réserver mon audit gratuit
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="text-sm text-white/40 mt-8">
            Ou appelez directement : <a href="tel:0661139748" className="text-[#B08D55] hover:underline">06 61 13 97 48</a>
          </p>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="py-10 bg-white border-t border-[#E5E5E5] text-center">
        <div className="w-12 h-12 rounded-full bg-[#1C1917] mx-auto mb-4 flex items-center justify-center">
          <span className="text-[#B08D55] font-bold">IH</span>
        </div>
        <p className="font-semibold text-[#1C1917] mb-1">IndHack • {ville}</p>
        <p className="text-sm text-[#8A8A8A] mb-4">Expert SEO local & création web</p>
        <p className="text-xs text-[#CCCCCC]">06 61 13 97 48 • contact@indhack.com</p>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════════
          FLOATING CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://calendly.com/contact-indhack/30min"
          target="_blank"
          className="flex items-center gap-3 bg-[#1C1917] text-white pl-3 pr-5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-transform border border-white/10"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#B08D55] flex items-center justify-center">
              <span className="text-xs font-bold text-white">IH</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#1C1917] rounded-full animate-pulse" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-[#B08D55] uppercase tracking-wider font-semibold">Dispo maintenant</span>
            <span className="block text-sm font-medium">On en parle ?</span>
          </div>
        </a>
      </div>

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </main>
  )
}

export default function CoiffeurPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
