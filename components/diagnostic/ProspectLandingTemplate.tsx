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
  Zap,
  Eye,
  ChevronDown,
  Phone,
  Calendar,
  Sparkles,
  Target,
  BarChart3,
  Bot,
  Map,
  FileText,
  PenTool,
  MessageCircle,
  Clock,
  Award,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Smartphone
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
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
// DESIGN SYSTEM - BLANC / CRÈME ÉLÉGANT
// ═══════════════════════════════════════════════════════════════════════════════
//
// Fond Principal: #FFFFFF (Blanc pur)
// Fond Secondaire: #FAFAFA (Gris très clair)
// Fond Accent: #F5F5F5 (Gris doux)
// Texte Principal: #111111 (Noir profond)
// Texte Secondaire: #666666 (Gris moyen)
// Accent: #111111 (Noir - minimaliste)
// Accent Doux: #E5E5E5 (Gris bordure)
//
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS UI
// ─────────────────────────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F5F5F5] text-[#666666] text-xs font-medium tracking-widest uppercase mb-6">
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#111111] leading-tight mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <div className="text-lg text-[#666666] leading-relaxed">
          <ReactMarkdown>{subtitle}</ReactMarkdown>
        </div>
      )}
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalVolume = getTotalSearchVolume(metier)
  const easyWins = getEasyWinsCount(metier)
  const potentialClients = Math.round((totalVolume * 0.03) * 0.1)

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - MINIMALISTE & ÉLÉGANT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col">
        {/* Header minimaliste */}
        <header className="py-6 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-xl font-medium tracking-tight">IndHack</span>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#666666] hover:text-[#111111] transition-colors"
            >
              Prendre rendez-vous
            </a>
          </div>
        </header>

        {/* Hero content */}
        <div className="flex-1 flex items-center px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Texte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                {prospect.avis && prospect.note && (
                  <div className="inline-flex items-center gap-2 mb-8">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(prospect.note!) ? 'text-[#111111] fill-[#111111]' : 'text-[#E5E5E5]'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#666666]">{prospect.avis} avis Google</span>
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] leading-[1.1] mb-6 tracking-tight">
                  {prospect.nom},
                  <br />
                  <span className="font-normal">vos clients vous adorent.</span>
                </h1>

                <div className="text-xl text-[#666666] leading-relaxed mb-4 max-w-lg">
                  <ReactMarkdown>{metier.heroSubtitle}</ReactMarkdown>
                </div>

                <div className="flex items-center gap-2 text-[#999999] text-sm mb-10">
                  <MapPin className="w-4 h-4" />
                  <span>{metier.label} • {prospect.ville}</span>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#111111] text-white px-8 py-4 rounded-full font-medium inline-flex items-center justify-center gap-3 hover:bg-[#333333] transition-all"
                  >
                    Réserver un appel gratuit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => scrollToSection('offres')}
                    className="text-[#666666] hover:text-[#111111] px-8 py-4 font-medium inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    Voir les offres
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="bg-[#FAFAFA] rounded-3xl p-8 border border-[#E5E5E5]">
                  <p className="text-sm text-[#999999] uppercase tracking-widest mb-6">Votre potentiel sur Google</p>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-[#E5E5E5] pb-4">
                      <span className="text-[#666666]">Recherches mensuelles locales</span>
                      <span className="text-3xl font-light">{totalVolume.toLocaleString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-[#E5E5E5] pb-4">
                      <span className="text-[#666666]">Mots-clés accessibles</span>
                      <span className="text-3xl font-light">{easyWins}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[#666666]">Nouveaux clients potentiels/mois</span>
                      <span className="text-3xl font-light">+{potentialClients} à {potentialClients * 2}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: APERÇU DU SITE (MOCKUP)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Votre futur site</SectionBadge>
          <SectionTitle
            title="Un site qui vous ressemble"
            subtitle="Élégant, rapide, optimisé pour convertir vos visiteurs en clients."
          />

          {/* Mockup Desktop + Mobile */}
          <div className="relative">
            {/* Desktop Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-[#E5E5E5]"
            >
              {/* Browser bar */}
              <div className="bg-[#F5F5F5] px-4 py-3 flex items-center gap-2 border-b border-[#E5E5E5]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                  <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                  <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-[#999999] w-64 text-center border border-[#E5E5E5]">
                    {prospect.nom.toLowerCase().replace(/\s+/g, '')}.fr
                  </div>
                </div>
              </div>

              {/* Site content mockup */}
              <div className="p-8 md:p-12">
                {/* Nav */}
                <div className="flex justify-between items-center mb-16">
                  <span className="text-xl font-medium">{prospect.nom}</span>
                  <div className="hidden md:flex items-center gap-8 text-sm text-[#666666]">
                    <span>Prestations</span>
                    <span>Tarifs</span>
                    <span>À propos</span>
                    <span>Contact</span>
                  </div>
                  <div className="bg-[#111111] text-white text-sm px-5 py-2.5 rounded-full">
                    Réserver
                  </div>
                </div>

                {/* Hero mockup */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-sm text-[#999999] uppercase tracking-widest mb-4">{metier.label} • {prospect.ville}</p>
                    <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
                      L'excellence au service de votre {metier.slug === 'coiffeur' ? 'beauté' : metier.slug === 'avocat' ? 'défense' : 'projet'}
                    </h2>
                    <p className="text-[#666666] mb-8">
                      {prospect.avis ? `${prospect.avis} clients satisfaits` : 'Des clients satisfaits'} nous font confiance.
                      Découvrez pourquoi.
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-[#111111] text-white px-6 py-3 rounded-full text-sm">
                        Prendre RDV
                      </div>
                      <div className="border border-[#E5E5E5] px-6 py-3 rounded-full text-sm text-[#666666]">
                        Nos services
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F5F5] relative">
                      <Image
                        src={metier.mockupImage}
                        alt={`Aperçu du site web pour ${prospect.nom} - ${metier.label} à ${prospect.ville}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Floating card */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-[#E5E5E5]">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-[#111111] fill-[#111111]" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{prospect.note || '4.8'}/5</span>
                      </div>
                      <p className="text-xs text-[#999999] mt-1">Google Reviews</p>
                    </div>
                  </div>
                </div>

                {/* Services preview */}
                <div className="mt-20 pt-12 border-t border-[#E5E5E5]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {metier.services.slice(0, 4).map((service, i) => (
                      <div key={i} className="text-center p-4">
                        <div className="w-12 h-12 rounded-full bg-[#F5F5F5] mx-auto mb-3 flex items-center justify-center">
                          <Check className="w-5 h-5 text-[#111111]" />
                        </div>
                        <p className="text-sm font-medium">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute -bottom-12 -right-4 md:right-12 w-48 md:w-64"
            >
              <div className="bg-[#111111] rounded-[2rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[1.5rem] overflow-hidden">
                  {/* Notch */}
                  <div className="bg-[#111111] h-6 flex justify-center items-end pb-1">
                    <div className="w-20 h-4 bg-[#111111] rounded-b-xl" />
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-medium">{prospect.nom}</span>
                      <Menu className="w-4 h-4" />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F5F5] mb-4 relative">
                      <Image
                        src={metier.mockupImage}
                        alt={`Version mobile du site web pour ${prospect.nom}`}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-[#111111] text-white text-xs py-2.5 rounded-full text-center">
                      Réserver
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <div className="mt-32 grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Ultra-rapide', desc: 'Chargement en moins d\'une seconde. Google adore.' },
              { icon: Smartphone, title: '100% Mobile', desc: '70% de vos clients cherchent sur leur téléphone.' },
              { icon: Bot, title: 'Prêt pour l\'IA', desc: 'Optimisé pour ChatGPT, Siri et Google AI.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-[#666666]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: POURQUOI UN SITE + SEO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Comprendre le SEO</SectionBadge>
          <SectionTitle
            title="Google est votre meilleur commercial"
            subtitle="Mais encore faut-il qu'il vous trouve. Voici comment ça marche."
          />

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Explication */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-light mb-6">La stratégie des petits mots-clés</h3>

              <p className="text-[#666666] leading-relaxed mb-6">
                Au lieu de se battre sur <strong className="text-[#111111]">"{metier.label.toLowerCase()} {prospect.ville}"</strong> (très concurrentiel),
                on cible des dizaines de recherches précises où vous pouvez facilement être premier :
              </p>

              <div className="space-y-3 mb-8">
                {metier.keywords.longueTraine.slice(0, 4).map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl">
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-[#999999]" />
                      <span className="text-sm">"{kw.keyword}"</span>
                    </div>
                    <span className="text-xs bg-white px-3 py-1 rounded-full border border-[#E5E5E5]">
                      {kw.volume}/mois
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#111111] text-white rounded-2xl p-6">
                <p className="text-sm opacity-70 mb-2">Résultat de cette stratégie</p>
                <p className="text-lg">
                  Premier sur <strong>{easyWins} mots-clés</strong> = capture de <strong>{Math.round(totalVolume * 0.4).toLocaleString('fr-FR')} recherches/mois</strong>
                </p>
              </div>
            </motion.div>

            {/* Pourquoi les blogs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-light mb-6">Pourquoi les articles de blog sont essentiels</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Chaque article = une nouvelle porte d'entrée</p>
                    <p className="text-sm text-[#666666]">
                      Un article "Prix {metier.keywords.niches[0]?.keyword.split(' ')[0]} {prospect.ville}" capte des clients qui cherchent cette info précise.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Google aime les sites actifs</p>
                    <p className="text-sm text-[#666666]">
                      Un site qui publie régulièrement est mieux référencé qu'un site "mort".
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Effet boule de neige</p>
                    <p className="text-sm text-[#666666]">
                      10 articles/mois = 120 articles/an = 120 mots-clés positionnés = des centaines de visiteurs qualifiés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#FAFAFA] rounded-2xl border border-[#E5E5E5]">
                <p className="text-sm text-[#666666] mb-4">Exemple d'articles que je créerais pour vous :</p>
                <div className="space-y-2">
                  {metier.clientQuestions.slice(0, 3).map((q, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-[#999999]" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: GOOGLE MAPS / GMB
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Google Maps</SectionBadge>
          <SectionTitle
            title="Votre fiche Google : souvent négligée, toujours décisive"
            subtitle="3 entreprises apparaissent sur la carte. Êtes-vous dedans ?"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Fiche GMB mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#E5E5E5]"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl bg-[#F5F5F5] overflow-hidden flex-shrink-0 relative">
                  <Image src={metier.mockupImage} alt={`Fiche Google Business Profile de ${prospect.nom}`} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg">{prospect.nom}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-medium">{prospect.note || '4.8'}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#FBBC04] fill-[#FBBC04]" />
                      ))}
                    </div>
                    <span className="text-sm text-[#666666]">({prospect.avis || '155'})</span>
                  </div>
                  <p className="text-sm text-[#666666] mt-1">{metier.label}</p>
                  <p className="text-sm text-[#1A73E8] mt-1">Ouvert · Ferme à 19:00</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-[#1A73E8] text-white text-sm py-2.5 rounded-full">Itinéraire</button>
                <button className="flex-1 border border-[#1A73E8] text-[#1A73E8] text-sm py-2.5 rounded-full">Appeler</button>
                <button className="flex-1 border border-[#E5E5E5] text-[#666666] text-sm py-2.5 rounded-full">Site web</button>
              </div>
            </motion.div>

            {/* Explication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-light mb-6">Ce que j'optimise sur votre fiche</h3>
              <div className="space-y-4">
                {[
                  { title: 'Photos professionnelles', desc: 'Les fiches avec photos reçoivent 42% de demandes d\'itinéraire en plus' },
                  { title: 'Description optimisée', desc: 'Avec les bons mots-clés pour apparaître dans les recherches' },
                  { title: 'Catégories précises', desc: 'Pour être trouvé sur toutes les recherches pertinentes' },
                  { title: 'Posts Google réguliers', desc: 'Pour montrer à Google que vous êtes actif' },
                  { title: 'Gestion des avis', desc: 'Stratégie pour obtenir plus d\'avis + réponses personnalisées' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-[#666666]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: TARIFS

          Analyse marché 2024-2025 (avec IA qui a baissé les prix) :
          - Site vitrine simple : 500-1500€ (avant: 1000-3000€)
          - Site + SEO basique : 1000-2000€ + 150-300€/mois
          - Pack complet : 1500-2500€ + 250-450€/mois

          Positionnement : légèrement en-dessous
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="offres" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Tarifs</SectionBadge>
          <SectionTitle
            title="Des offres claires, sans surprise"
            subtitle="Choisissez le niveau d'accompagnement qui vous convient."
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

            {/* OFFRE 1: Site Vitrine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#FAFAFA] rounded-2xl p-8 border border-[#E5E5E5] flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-1">Site Vitrine</h3>
                <p className="text-sm text-[#666666]">Votre présence en ligne professionnelle</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light">690€</span>
                </div>
                <p className="text-sm text-[#999999]">Paiement unique</p>
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-8">
                  {[
                    'Site sur-mesure (3-5 pages)',
                    'Design moderne & élégant',
                    'Optimisé mobile',
                    'Chargement ultra-rapide',
                    'Formulaire de contact',
                    'Hébergement 1 an inclus',
                    'Certificat SSL (https)',
                    'Formation utilisation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-white rounded-xl border border-[#E5E5E5] mb-6">
                  <p className="text-xs text-[#999999] mb-1">Idéal pour</p>
                  <p className="text-sm">Avoir une présence pro sans stratégie d'acquisition</p>
                </div>
              </div>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full text-center font-medium border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                Choisir cette offre
              </a>
            </motion.div>

            {/* OFFRE 2: Site + SEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#111111] text-white rounded-2xl p-8 flex flex-col relative"
            >
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-white text-[#111111] text-xs font-medium px-4 py-1 rounded-full">
                  Recommandé
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-1">Site + SEO</h3>
                <p className="text-sm text-white/60">Attirez de nouveaux clients chaque mois</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light">990€</span>
                </div>
                <p className="text-sm text-white/60">puis <span className="text-white">149€/mois</span></p>
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-8">
                  {[
                    'Tout de l\'offre Site Vitrine',
                    '10 articles de blog optimisés/mois',
                    '5-10 mots-clés ciblés selon votre niche',
                    'Rapport mensuel de positions',
                    'Suivi des performances',
                    'Optimisation continue',
                    'Modifications illimitées',
                    'Support prioritaire',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-white/10 rounded-xl mb-6">
                  <p className="text-xs text-white/60 mb-1">Ce que ça donne en 1 an</p>
                  <p className="text-sm">120 articles = 120 portes d'entrée vers votre site</p>
                </div>
              </div>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full text-center font-medium bg-white text-[#111111] hover:bg-[#F5F5F5] transition-colors"
              >
                Choisir cette offre
              </a>
            </motion.div>

            {/* OFFRE 3: Site + SEO + GMB */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#FAFAFA] rounded-2xl p-8 border border-[#E5E5E5] flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-1">Pack Complet</h3>
                <p className="text-sm text-[#666666]">Dominez Google et Google Maps</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light">1 290€</span>
                </div>
                <p className="text-sm text-[#999999]">puis <span className="text-[#111111]">199€/mois</span></p>
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-8">
                  {[
                    'Tout de l\'offre Site + SEO',
                    'Optimisation fiche Google Maps',
                    'Gestion des avis Google',
                    'Réponses personnalisées aux avis',
                    'Posts Google hebdomadaires',
                    'Photos professionnelles (conseils)',
                    'Suivi position Google Maps',
                    'Stratégie multi-quartiers',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-white rounded-xl border border-[#E5E5E5] mb-6">
                  <p className="text-xs text-[#999999] mb-1">Pour qui ?</p>
                  <p className="text-sm">Ceux qui veulent dominer leur zone géographique</p>
                </div>
              </div>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full text-center font-medium border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                Choisir cette offre
              </a>
            </motion.div>
          </div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-[#666666]">
              Paiement en 2 ou 3 fois possible • Sans engagement (résiliable à tout moment) • Satisfait ou remboursé 30 jours
            </p>
          </motion.div>

          {/* Comparatif prix marché */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 bg-[#FAFAFA] rounded-2xl p-8 border border-[#E5E5E5]"
          >
            <h3 className="text-xl font-light mb-6 text-center">Pourquoi ces prix sont compétitifs</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-sm text-[#999999] mb-2">Agences traditionnelles</p>
                <p className="text-2xl font-light line-through text-[#999999]">2 000€ - 5 000€</p>
                <p className="text-xs text-[#666666] mt-1">+ 300€ à 500€/mois</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#999999] mb-2">Freelances premium</p>
                <p className="text-2xl font-light line-through text-[#999999]">1 500€ - 3 000€</p>
                <p className="text-xs text-[#666666] mt-1">+ 200€ à 400€/mois</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#111111] mb-2 font-medium">IndHack</p>
                <p className="text-2xl font-light">690€ - 1 290€</p>
                <p className="text-xs text-[#666666] mt-1">+ 149€ à 199€/mois</p>
              </div>
            </div>
            <p className="text-center text-sm text-[#666666] mt-6">
              J'utilise les dernières technologies (Next.js, IA) pour être efficace et vous faire bénéficier de tarifs justes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: IA ET FUTUR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Le futur du référencement</SectionBadge>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 tracking-tight">
              ChatGPT, Siri, Google AI...
              <br />
              <span className="text-white/60">Et vous ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                De plus en plus de gens demandent à leur téléphone :
                <br />
                <span className="text-white">"Trouve-moi un bon {metier.label.toLowerCase()} près de moi"</span>
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Ces assistants IA ne lisent pas les sites comme vous et moi. Ils analysent le code,
                les données structurées, et les signaux de confiance.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Mon travail :</strong> Construire votre site avec les balises
                et la structure que ces IA comprennent. Quand quelqu'un demandera "{metier.label.toLowerCase()} {prospect.ville}",
                vous serez dans la réponse.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🤖', title: 'Google SGE', desc: 'Réponses IA dans Google' },
                { icon: '🎤', title: 'Recherche vocale', desc: '40% des recherches' },
                { icon: '💬', title: 'ChatGPT', desc: 'Recommandations IA' },
                { icon: '📱', title: 'Siri / Alexa', desc: 'Assistants vocaux' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <p className="font-medium mb-1">{item.title}</p>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: À PROPOS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-[#111111] mx-auto mb-6 flex items-center justify-center text-white text-2xl font-light">
            I
          </div>
          <h3 className="text-2xl font-light mb-4">Indiana • IndHack</h3>
          <p className="text-[#666666] leading-relaxed mb-6 max-w-2xl mx-auto">
            Développeur web et consultant SEO basé à Nice.
            Je travaille avec des artisans, commerçants et professions libérales
            qui veulent être visibles en ligne sans y passer leurs journées.
          </p>
          <p className="text-[#666666] leading-relaxed max-w-2xl mx-auto">
            Je ne suis pas une grosse agence. Je suis un artisan du web comme vous êtes artisan de votre métier.
            Disponible, réactif, humain.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="py-16 px-6 md:px-12 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-light mb-4">
            Prêt(e) à être visible sur Google ?
          </h3>
          <p className="text-[#666666] mb-8 max-w-lg mx-auto">
            Réservez un appel découverte gratuit de 20 minutes.
            Je vous dis honnêtement si je peux vous aider.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full font-medium hover:bg-[#333333] transition-colors mb-8"
          >
            <Calendar className="w-5 h-5" />
            Réserver mon appel gratuit
          </a>
          <div className="flex items-center justify-center gap-6 text-[#999999] text-sm">
            <a href="tel:+33661139748" className="hover:text-[#111111] transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" />
              06 61 13 97 48
            </a>
            <span>•</span>
            <span>contact@indhack.com</span>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA FLOTTANT
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E5E5] md:hidden z-50">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 bg-[#111111] text-white py-4 rounded-full font-medium"
        >
          <Calendar className="w-5 h-5" />
          Réserver un appel gratuit
        </a>
      </div>

      {/* Desktop floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 hidden md:block z-50"
      >
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#111111] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#333333] transition-all"
        >
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Réserver un appel</span>
        </a>
      </motion.div>

    </main>
  )
}
