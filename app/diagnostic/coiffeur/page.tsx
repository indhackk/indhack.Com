'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  MapPin,
  Check,
  ArrowRight,
  Sparkles,
  Globe,
  Search,
  TrendingUp,
  Eye,
  EyeOff,
  Layers,
  Zap,
  Shield,
  Clock,
  Phone,
  ChevronDown,
  Quote,
  Building2,
  Users,
  Target,
  Rocket
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM - VERT ÉMERAUDE LUXE (Pas Matrix, pas Hacker - LUXE & CONFIANCE)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Palette:
// - Fond Principal: #FAFBF9 (Blanc cassé naturel)
// - Fond Secondaire: #F5F7F4 (Gris-vert très doux)
// - Texte Principal: #1A2E1F (Vert très foncé, presque noir)
// - Texte Secondaire: #4A5D4F (Vert gris moyen)
// - Accent Émeraude: #0D6B4B (Émeraude profond - LUXE)
// - Accent Émeraude Light: #E8F5EF (Émeraude pâle pour backgrounds)
// - Or Accent: #B8860B (Or antique pour highlights)
// ═══════════════════════════════════════════════════════════════════════════════

function CoiffeurLandingContent() {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'By Lucie Mendes'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'

  const [activeOffer, setActiveOffer] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#FAFBF9] text-[#1A2E1F] selection:bg-[#0D6B4B] selection:text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO - VALORISATION & ACCROCHE
          Objectif: Flatter, créer la connexion, montrer qu'on les connaît
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Fond subtil avec motif */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFBF9] via-[#F5F7F4] to-[#E8F5EF] opacity-80" />

        {/* Cercle décoratif émeraude */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#0D6B4B]"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge personnalisé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#E8F5EF] border border-[#0D6B4B]/20 mb-10"
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#B8860B] fill-[#B8860B]" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#0D6B4B]">155 avis • 4.6/5 sur Google</span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-[#1A2E1F] leading-[1.1] mb-8"
          >
            {nom},<br />
            <span className="text-[#0D6B4B]">vos clientes vous adorent.</span>
          </motion.h1>

          {/* Sous-titre empathique */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#4A5D4F] font-light leading-relaxed max-w-2xl mx-auto mb-6"
          >
            155 avis élogieux au quartier Hôtel des Postes.
            <br className="hidden md:block" />
            C'est Google qui ne vous rend pas encore justice.
          </motion.p>

          {/* Le problème, exposé avec tact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8F5EF] max-w-2xl mx-auto mb-10"
          >
            <p className="text-lg text-[#1A2E1F] leading-relaxed">
              Aujourd'hui, quand une Niçoise tape{' '}
              <span className="font-medium text-[#0D6B4B] bg-[#E8F5EF] px-2 py-0.5 rounded">"coiffeuse Nice"</span>{' '}
              ou{' '}
              <span className="font-medium text-[#0D6B4B] bg-[#E8F5EF] px-2 py-0.5 rounded">"coloriste Nice"</span>,
              <br className="hidden md:block" />
              ce sont des salons <span className="underline decoration-[#B8860B] underline-offset-4">moins bien notés que vous</span> qui apparaissent.
            </p>
          </motion.div>

          {/* CTA principal */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => scrollToSection('solution')}
            className="group bg-[#0D6B4B] text-white px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-3 hover:bg-[#0A5A3F] transition-all duration-300 shadow-lg shadow-[#0D6B4B]/20"
          >
            Voir comment changer ça
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#0D6B4B]/40"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: LE PROBLÈME ILLUSTRÉ
          Objectif: Créer l'urgence sans être agressif
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="solution" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Titre de section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-[#0D6B4B] text-sm font-medium tracking-wide uppercase mb-4">
              <Eye className="w-4 h-4" />
              Le constat
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#1A2E1F] leading-tight">
              Votre talent mérite d'être vu
            </h2>
          </motion.div>

          {/* Comparaison visuelle */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Aujourd'hui (problème) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-[#FEF2F2] rounded-3xl p-8 border border-red-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <EyeOff className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-red-600 font-medium">Aujourd'hui</span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-[#1A2E1F] mb-4">
                  Sans site web optimisé
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-[#4A5D4F]">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-sm">×</span>
                    </div>
                    <span>Vos concurrents captent les <strong>2 800 recherches/mois</strong> sur "coiffeur Nice"</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5D4F]">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-sm">×</span>
                    </div>
                    <span>Les nouvelles clientes ne vous trouvent pas</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5D4F]">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-sm">×</span>
                    </div>
                    <span>Vos 155 avis ne travaillent pas pour vous sur le web</span>
                  </li>
                </ul>

                {/* Chiffre choc */}
                <div className="mt-8 p-4 bg-white rounded-xl border border-red-100">
                  <p className="text-sm text-[#4A5D4F] mb-1">Estimation des clientes perdues chaque mois</p>
                  <p className="text-3xl font-serif font-medium text-red-600">~15 à 25 nouvelles clientes</p>
                </div>
              </div>
            </motion.div>

            {/* Demain (solution) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-[#E8F5EF] rounded-3xl p-8 border border-[#0D6B4B]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#0D6B4B] flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[#0D6B4B] font-medium">Avec IndHack</span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-[#1A2E1F] mb-4">
                  Votre salon en première page
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-[#4A5D4F]">
                    <div className="w-6 h-6 rounded-full bg-[#0D6B4B] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Vous apparaissez quand on cherche <strong>"coiffeuse Nice"</strong></span>
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5D4F]">
                    <div className="w-6 h-6 rounded-full bg-[#0D6B4B] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Vos avis 5 étoiles sont mis en avant</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5D4F]">
                    <div className="w-6 h-6 rounded-full bg-[#0D6B4B] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Des nouvelles clientes vous découvrent chaque semaine</span>
                  </li>
                </ul>

                {/* Chiffre positif */}
                <div className="mt-8 p-4 bg-white rounded-xl border border-[#0D6B4B]/20">
                  <p className="text-sm text-[#4A5D4F] mb-1">Potentiel de croissance avec un bon référencement</p>
                  <p className="text-3xl font-serif font-medium text-[#0D6B4B]">+20 à 40% de nouvelles clientes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: LA MÉTHODE "PAGES FANTÔMES" (Ghost Pages)
          Objectif: Expliquer l'abonnement mensuel de façon sexy
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F5F7F4]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#0D6B4B] text-sm font-medium tracking-wide uppercase mb-4">
              <Layers className="w-4 h-4" />
              Notre méthode exclusive
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#1A2E1F] leading-tight mb-6">
              La stratégie des "Pages Fantômes"
            </h2>
            <p className="text-xl text-[#4A5D4F] max-w-2xl mx-auto">
              Pourquoi l'abonnement mensuel est un <strong>investissement</strong>, pas une dépense.
            </p>
          </motion.div>

          {/* Explication visuelle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E8F5EF]"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Texte explicatif */}
              <div>
                <h3 className="text-2xl font-serif font-medium text-[#1A2E1F] mb-6">
                  Imaginez votre salon comme un immeuble.
                </h3>

                <div className="space-y-6 text-[#4A5D4F]">
                  <p className="leading-relaxed">
                    Aujourd'hui, vous n'avez qu'<strong>une seule porte d'entrée</strong> : votre fiche Google Maps.
                    Si quelqu'un ne vous connaît pas déjà, il ne vous trouve pas.
                  </p>

                  <p className="leading-relaxed">
                    Avec notre méthode, chaque mois, on crée de <strong>nouvelles portes invisibles</strong>
                    dans votre site. Des pages qui n'apparaissent pas dans votre menu, mais que Google adore :
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0D6B4B]" />
                      <span>"Lissage brésilien Nice"</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0D6B4B]" />
                      <span>"Coiffeur Hôtel des Postes"</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0D6B4B]" />
                      <span>"Coloriste balayage Nice centre"</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0D6B4B]" />
                      <span>"Salon coiffure ouvert lundi Nice"</span>
                    </li>
                  </ul>

                  <p className="leading-relaxed font-medium text-[#1A2E1F]">
                    C'est de l'immobilier digital. Chaque page est un terrain que vous occupez.
                    Vos concurrents ne pourront plus s'y installer.
                  </p>
                </div>
              </div>

              {/* Illustration visuelle */}
              <div className="relative">
                <div className="bg-[#F5F7F4] rounded-2xl p-6">
                  {/* Représentation de pages */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border border-[#E8F5EF] shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0D6B4B] flex items-center justify-center">
                          <Globe className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1A2E1F]">bylucemendes.fr</p>
                          <p className="text-xs text-[#4A5D4F]">Page d'accueil</p>
                        </div>
                      </div>
                    </div>

                    {/* Pages fantômes */}
                    {[
                      { title: 'Coloriste Nice', month: 'Mois 1' },
                      { title: 'Lissage Nice', month: 'Mois 2' },
                      { title: 'Coiffeur Jean Médecin', month: 'Mois 3' },
                      { title: 'Balayage Nice', month: 'Mois 4' },
                    ].map((page, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl p-4 border border-[#0D6B4B]/20 shadow-sm ml-6 relative"
                      >
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-[#0D6B4B]/30" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#E8F5EF] flex items-center justify-center">
                              <Search className="w-4 h-4 text-[#0D6B4B]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#1A2E1F]">{page.title}</p>
                              <p className="text-xs text-[#0D6B4B]">Page fantôme</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-[#B8860B] bg-[#FEF7EC] px-2 py-1 rounded-full">
                            {page.month}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <p className="mt-6 text-center text-sm text-[#4A5D4F]">
                    Chaque page capte de nouvelles recherches Google
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: POURQUOI MON CODE EST MEILLEUR (Tech vulgarisée)
          Objectif: Justifier le prix vs Wix
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#0D6B4B] text-sm font-medium tracking-wide uppercase mb-4">
              <Zap className="w-4 h-4" />
              La différence technique
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#1A2E1F] leading-tight mb-6">
              Pourquoi pas Wix ou WordPress ?
            </h2>
            <p className="text-xl text-[#4A5D4F] max-w-2xl mx-auto">
              La vraie raison pour laquelle Google vous mettra en avant.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Argument 1: Vitesse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#F5F7F4] rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0D6B4B] flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1A2E1F] mb-4">
                Vitesse de chargement
              </h3>
              <p className="text-[#4A5D4F] leading-relaxed mb-4">
                Imaginez deux restaurants : l'un sert en 2 secondes, l'autre en 10.
                Lequel recommandez-vous ?
              </p>
              <p className="text-[#4A5D4F] leading-relaxed">
                Google pense pareil. Un site Wix met <strong>4-5 secondes</strong> à charger.
                Le mien : <strong>moins d'une seconde</strong>. Google le voit et vous récompense.
              </p>
            </motion.div>

            {/* Argument 2: IA Ready */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F5F7F4] rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0D6B4B] flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1A2E1F] mb-4">
                Prêt pour l'IA
              </h3>
              <p className="text-[#4A5D4F] leading-relaxed mb-4">
                Demain, vos clientes demanderont à Siri ou ChatGPT :
                <em>"Trouve-moi une bonne coloriste à Nice."</em>
              </p>
              <p className="text-[#4A5D4F] leading-relaxed">
                Mon code parle directement aux IA grâce à des "balises" spéciales.
                Votre salon sera dans leurs réponses. Wix ? Non.
              </p>
            </motion.div>

            {/* Argument 3: Propriété */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#F5F7F4] rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0D6B4B] flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1A2E1F] mb-4">
                C'est vraiment à vous
              </h3>
              <p className="text-[#4A5D4F] leading-relaxed mb-4">
                Avec Wix, vous louez. Si vous arrêtez de payer, tout disparaît.
              </p>
              <p className="text-[#4A5D4F] leading-relaxed">
                Avec moi, <strong>le code vous appartient</strong>.
                Vous pouvez le reprendre, le faire évoluer.
                C'est un actif que vous construisez.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: LES OFFRES
          Objectif: Présenter les 3 offres de manière sexy
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="offres" className="py-24 px-6 bg-[#1A2E1F]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#B8860B] text-sm font-medium tracking-wide uppercase mb-4">
              <Target className="w-4 h-4" />
              Choisissez votre formule
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
              Un investissement, pas une dépense
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Chaque euro investi travaille pour ramener des clientes.
              Faites le calcul.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

            {/* OFFRE 1: LE SOCLE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">Le Socle</h3>
                <p className="text-white/60 text-sm">Votre vitrine professionnelle</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-serif font-medium text-white">890</span>
                  <span className="text-xl text-white/60">€</span>
                </div>
                <p className="text-white/40 text-sm mt-1">Paiement unique</p>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Un site élégant qui vous ressemble. Parfait pour rassurer vos clientes actuelles
                et avoir une présence professionnelle en ligne.
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Site vitrine moderne (3 pages)',
                  'Design sur-mesure à votre image',
                  'Optimisé mobile',
                  'Formulaire de contact',
                  'Hébergement 1 an inclus',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[#0D6B4B] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+33661139748"
                className="w-full py-4 rounded-full text-center font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Choisir Le Socle
              </a>
            </motion.div>

            {/* OFFRE 2: L'EXPANSION (STAR) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0D6B4B] rounded-3xl p-8 border-2 border-[#B8860B] flex flex-col relative md:-translate-y-4 shadow-2xl shadow-[#0D6B4B]/30"
            >
              {/* Badge recommandé */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-[#B8860B] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-white" />
                  Recommandé
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">L'Expansion</h3>
                <p className="text-white/80 text-sm">La machine à nouvelles clientes</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-serif font-medium text-white">1 490</span>
                  <span className="text-xl text-white/60">€</span>
                </div>
                <p className="text-[#B8860B] font-medium text-sm mt-1">+ 149€/mois de croissance</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <p className="text-white/90 text-sm leading-relaxed">
                  <strong>C'est ici que la magie opère.</strong> Chaque mois, on crée des pages fantômes
                  pour capturer de nouvelles recherches. Vous grandissez sans rien faire.
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Tout du pack Le Socle',
                  '2 pages fantômes/mois (SEO local)',
                  'Optimisation Google Maps',
                  'Rédaction de contenu mensuelle',
                  'Rapport de visibilité chaque mois',
                  'Modifications illimitées',
                  'Support prioritaire',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm">
                    <Check className="w-4 h-4 text-[#B8860B] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+33661139748"
                className="w-full py-4 rounded-full text-center font-medium bg-white text-[#0D6B4B] hover:bg-[#F5F7F4] transition-colors shadow-lg"
              >
                Démarrer ma croissance
              </a>
            </motion.div>

            {/* OFFRE 3: L'AUTORITÉ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">L'Autorité</h3>
                <p className="text-white/60 text-sm">Devenez LA référence de Nice</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-medium text-white">Sur Devis</span>
                </div>
                <p className="text-white/40 text-sm mt-1">Pour les ambitions XXL</p>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Vous voulez dominer totalement votre zone ? Gestion de vos avis,
                photos professionnelles, stratégie multi-quartiers. On en parle.
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Tout du pack L\'Expansion',
                  'Stratégie de contenu avancée',
                  'Gestion des avis Google (IA)',
                  'Optimisation multi-quartiers',
                  'Session photo professionnelle',
                  'Suivi personnalisé mensuel',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[#0D6B4B] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+33661139748"
                className="w-full py-4 rounded-full text-center font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                En discuter
              </a>
            </motion.div>
          </div>

          {/* Note rassurante */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/50 text-sm">
              Paiement en 2 ou 3 fois possible. Sans engagement sur l'abonnement (résiliable à tout moment).
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: CALCUL ROI RAPIDE
          Objectif: Montrer que c'est rentable
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#F5F7F4]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E8F5EF]"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1A2E1F] mb-4">
                Faisons un calcul simple
              </h2>
              <p className="text-[#4A5D4F]">Avec le pack L'Expansion</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-[#F5F7F4] rounded-2xl p-6">
                <p className="text-sm text-[#4A5D4F] mb-2">Investissement mensuel</p>
                <p className="text-3xl font-serif font-medium text-[#1A2E1F]">149€/mois</p>
              </div>
              <div className="bg-[#E8F5EF] rounded-2xl p-6">
                <p className="text-sm text-[#0D6B4B] mb-2">Panier moyen d'une nouvelle cliente</p>
                <p className="text-3xl font-serif font-medium text-[#0D6B4B]">~80€</p>
              </div>
            </div>

            <div className="bg-[#1A2E1F] rounded-2xl p-8 text-center">
              <p className="text-white/80 mb-4">
                Il suffit de <strong className="text-[#B8860B]">2 nouvelles clientes par mois</strong> pour rentabiliser votre investissement.
              </p>
              <p className="text-3xl font-serif font-medium text-white">
                Et on parle de 15 à 25 clientes potentielles capturées.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: À PROPOS DE MOI
          Objectif: Créer la confiance, montrer que je suis humain
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
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-[#E8F5EF] border-4 border-white shadow-xl overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Indiana&background=0D6B4B&color=fff&size=160"
                  alt="Indiana - IndHack"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Texte */}
            <div>
              <h3 className="text-2xl font-serif font-medium text-[#1A2E1F] mb-4">
                Je suis Indiana, fondateur d'IndHack
              </h3>
              <p className="text-[#4A5D4F] leading-relaxed mb-4">
                Je ne suis pas une grosse agence. Je suis un développeur passionné qui travaille
                avec des artisans et commerçants de talent comme vous.
              </p>
              <p className="text-[#4A5D4F] leading-relaxed mb-4">
                Mon métier ? Traduire votre excellence dans le langage de Google.
                Je ne fais pas de sites "jolis mais vides". Je construis des machines
                à visibilité qui travaillent pour vous 24h/24.
              </p>
              <p className="text-[#1A2E1F] font-medium">
                Basé à Nice. Disponible. Réactif. Humain.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER SIMPLE
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 bg-[#1A2E1F]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-serif text-2xl mb-6">
            Prête à être visible sur Google ?
          </p>

          <a
            href="tel:+33661139748"
            className="inline-flex items-center gap-3 bg-[#0D6B4B] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0A5A3F] transition-colors mb-8"
          >
            <Phone className="w-5 h-5" />
            06 61 13 97 48
          </a>

          <p className="text-white/50 text-sm">
            IndHack • Nice • contact@indhack.com
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA FLOTTANT MOBILE
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E8F5EF] md:hidden z-50"
      >
        <a
          href="tel:+33661139748"
          className="w-full flex items-center justify-center gap-3 bg-[#0D6B4B] text-white py-4 rounded-full font-medium"
        >
          <Phone className="w-5 h-5" />
          Appeler maintenant
        </a>
      </motion.div>

      {/* CTA Desktop flottant */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="fixed bottom-8 right-8 hidden md:block z-50"
      >
        <a
          href="tel:+33661139748"
          className="flex items-center gap-4 bg-[#0D6B4B] text-white pl-3 pr-6 py-3 rounded-full shadow-2xl shadow-[#0D6B4B]/30 hover:bg-[#0A5A3F] transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <Phone className="w-5 h-5 text-[#0D6B4B]" />
          </div>
          <div className="text-left">
            <p className="text-xs text-white/70">Parlons de votre salon</p>
            <p className="font-medium">06 61 13 97 48</p>
          </div>
        </a>
      </motion.div>

    </main>
  )
}

export default function CoiffeurPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFBF9]" />}>
      <CoiffeurLandingContent />
    </Suspense>
  )
}
