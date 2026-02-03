'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Search, MapPin, Check, ArrowRight, Eye, Globe, Calendar, Clock, FileText, Star, TrendingUp, Target, Phone, MessageCircle, Users, Zap, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC PAGE - Version Luxe & Éducative
// Design organique, explications complètes, tarifs personnalisés
// ══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  const [openSection, setOpenSection] = useState<string | null>(null)

  // Données RÉELLES Haloscan pour By Lucie Mendes
  const keywordsData = [
    { keyword: 'coiffeur nice', volume: 2800, difficulty: 'Très concurrentiel', type: 'principal', cpc: '1.20€' },
    { keyword: 'coiffure nice', volume: 590, difficulty: 'Concurrentiel', type: 'principal', cpc: '0.90€' },
    { keyword: 'coloriste nice', volume: 260, difficulty: 'Accessible', type: 'niche', cpc: '0.85€' },
    { keyword: 'meilleur coloriste nice', volume: 140, difficulty: 'Accessible', type: 'niche', cpc: '1.10€' },
    { keyword: 'coiffeur coloriste nice', volume: 110, difficulty: 'Accessible', type: 'niche', cpc: '0.95€' },
    { keyword: 'lissage brésilien nice', volume: 320, difficulty: 'Facile', type: 'longtail', cpc: '0.70€' },
    { keyword: 'lissage japonais nice', volume: 50, difficulty: 'Facile', type: 'longtail', cpc: '0.55€' },
    { keyword: 'lissage au tanin nice', volume: 50, difficulty: 'Facile', type: 'longtail', cpc: '0.50€' },
    { keyword: 'soin tokio nice', volume: 50, difficulty: 'Facile', type: 'longtail', cpc: '0.45€' },
    { keyword: 'balayage nice', volume: 20, difficulty: 'Facile', type: 'longtail', cpc: '0.60€' },
  ]

  // Questions que se posent les internautes (pour le blog)
  const questionsInternautes = [
    { question: 'Quelle est la différence entre lissage brésilien et japonais ?', volume: 880 },
    { question: 'Combien coûte un lissage brésilien à Nice ?', volume: 320 },
    { question: 'Comment entretenir son lissage brésilien ?', volume: 590 },
    { question: 'Le lissage au tanin abîme-t-il les cheveux ?', volume: 210 },
    { question: 'Quel est le meilleur coloriste de Nice ?', volume: 140 },
    { question: 'Comment choisir sa couleur de cheveux ?', volume: 720 },
    { question: 'Balayage ou mèches : que choisir ?', volume: 480 },
    { question: 'Combien de temps dure un balayage ?', volume: 260 },
    { question: 'Comment réparer des cheveux abîmés par la décoloration ?', volume: 390 },
    { question: 'Soin Tokio Inkarami : c\'est quoi ?', volume: 170 },
  ]

  const totalVolume = keywordsData.reduce((sum, kw) => sum + kw.volume, 0)
  const easyKeywords = keywordsData.filter(kw => kw.difficulty === 'Facile' || kw.difficulty === 'Accessible')
  const easyVolume = easyKeywords.reduce((sum, kw) => sum + kw.volume, 0)

  return (
    <main className="min-h-screen bg-[#FDFCFA]">

      {/* ════════ EN-TÊTE ÉLÉGANT ════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCFA]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-light tracking-tight text-[#1a1a1a]">
              ind<span className="font-semibold">hack</span>
            </span>
          </div>
          <div className="text-sm text-[#8B8680] font-light">
            Audit réalisé le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* ════════ HERO - ÉLÉGANT & PERSONNEL ════════ */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto">

          {/* Titre éditorial */}
          <div className="mb-16">
            <p className="text-[#8B8680] text-sm uppercase tracking-[0.2em] mb-6">
              Analyse personnalisée
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-[1.1] mb-8">
              <span className="font-serif italic">{nom}</span>
              <br />
              <span className="text-[#8B8680]">mérite d'être trouvé.</span>
            </h1>
          </div>

          {/* Carte du salon */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/40 via-transparent to-rose-100/30 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop&crop=center"
                    alt={nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-2 text-sm text-[#1a1a1a]">
                      <MapPin className="w-4 h-4 text-[#C4A77D]" />
                      {ville}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-[#1a1a1a]">
                      <Star className="w-4 h-4 text-[#C4A77D] fill-[#C4A77D]" />
                      {note}/5 · {avis} avis
                    </span>
                  </div>
                  <p className="text-lg text-[#1a1a1a] leading-relaxed">
                    Vos clientes vous adorent — {avis} avis avec une note de {note}/5, c'est remarquable.
                    <span className="block mt-3 text-[#8B8680]">
                      Mais quand une Niçoise cherche une coloriste ou un lissage brésilien sur Google...
                      elle ne vous trouve pas.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ LE CONSTAT - DONNÉES RÉELLES ════════ */}
      <section className="py-20 px-8 bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C4A77D] text-sm uppercase tracking-[0.2em] mb-4">
              Les chiffres réels
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Ce que les Niçoises cherchent<br />
              <span className="font-serif italic">chaque mois</span>
            </h2>
            <p className="text-[#8B8680] max-w-xl mx-auto">
              Données issues d'outils SEO professionnels (Haloscan, SEMrush).
              Ce ne sont pas des estimations — ce sont les vraies recherches Google.
            </p>
          </div>

          {/* Chiffre principal */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="text-7xl md:text-8xl font-light text-white">
                {totalVolume.toLocaleString()}
              </span>
              <span className="text-2xl text-[#C4A77D] ml-2">+</span>
            </div>
            <p className="text-[#8B8680] text-lg mt-4">
              recherches mensuelles liées à la coiffure à {ville}
            </p>
          </div>

          {/* Tableau élégant */}
          <div className="bg-[#242424] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#333] text-xs uppercase tracking-wider text-[#8B8680]">
              <div className="col-span-5">Recherche</div>
              <div className="col-span-2 text-right">Volume</div>
              <div className="col-span-3 text-center">Difficulté</div>
              <div className="col-span-2 text-right">CPC*</div>
            </div>
            {keywordsData.map((kw, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-[#333]/50 last:border-0 hover:bg-[#2a2a2a] transition-colors"
              >
                <div className="col-span-5 font-light">"{kw.keyword}"</div>
                <div className="col-span-2 text-right">
                  <span className="font-medium text-white">{kw.volume}</span>
                  <span className="text-[#666] text-sm">/mois</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    kw.difficulty === 'Facile' ? 'bg-emerald-500/20 text-emerald-400' :
                    kw.difficulty === 'Accessible' ? 'bg-blue-500/20 text-blue-400' :
                    kw.difficulty === 'Concurrentiel' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {kw.difficulty}
                  </span>
                </div>
                <div className="col-span-2 text-right text-[#8B8680]">{kw.cpc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#666] mt-4 text-right">
            * CPC = Coût par clic si vous faisiez de la pub Google Ads
          </p>

        </div>
      </section>

      {/* ════════ SECTION ÉDUCATIVE : QU'EST-CE QUE LE SEO ? ════════ */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <p className="text-[#C4A77D] text-sm uppercase tracking-[0.2em] mb-4">
              Comprendre les bases
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-6">
              Le SEO, c'est quoi<br />
              <span className="font-serif italic">concrètement ?</span>
            </h2>
          </div>

          {/* Explication SEO */}
          <div className="space-y-8">

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-[#C4A77D]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#1a1a1a] mb-3">
                    SEO = être trouvé sur Google
                  </h3>
                  <p className="text-[#666] leading-relaxed mb-4">
                    Quand quelqu'un tape "lissage brésilien Nice" dans Google, il y a 10 résultats sur la première page.
                    <strong className="text-[#1a1a1a]"> 75% des gens ne vont jamais sur la page 2.</strong>
                  </p>
                  <p className="text-[#666] leading-relaxed">
                    Le SEO (Search Engine Optimization), c'est l'ensemble des techniques pour faire apparaître
                    votre site dans ces 10 premiers résultats. C'est comme avoir la meilleure vitrine sur
                    l'avenue la plus passante — sauf que l'avenue, c'est Google.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#1a1a1a] mb-3">
                    Comment ça marche ?
                  </h3>
                  <p className="text-[#666] leading-relaxed mb-4">
                    Google envoie des "robots" qui visitent tous les sites du monde. Ces robots analysent :
                  </p>
                  <ul className="space-y-2 text-[#666]">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center text-xs font-medium text-[#1a1a1a] flex-shrink-0">1</span>
                      <span><strong className="text-[#1a1a1a]">Le contenu</strong> — Avez-vous une page qui parle de "lissage brésilien" ?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center text-xs font-medium text-[#1a1a1a] flex-shrink-0">2</span>
                      <span><strong className="text-[#1a1a1a]">La qualité</strong> — Cette page est-elle complète, utile, bien écrite ?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center text-xs font-medium text-[#1a1a1a] flex-shrink-0">3</span>
                      <span><strong className="text-[#1a1a1a]">La technique</strong> — Le site est-il rapide ? Mobile-friendly ?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center text-xs font-medium text-[#1a1a1a] flex-shrink-0">4</span>
                      <span><strong className="text-[#1a1a1a]">La réputation</strong> — D'autres sites renvoient-ils vers vous ?</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8 border border-amber-200/50">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock className="w-6 h-6 text-[#C4A77D]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#1a1a1a] mb-3">
                    Pourquoi c'est un travail mensuel ?
                  </h3>
                  <p className="text-[#666] leading-relaxed">
                    Google met à jour son classement en permanence. Un site qui publie régulièrement du contenu
                    de qualité est "récompensé" par de meilleures positions. C'est comme l'exercice physique :
                    <strong className="text-[#1a1a1a]"> les résultats viennent avec la régularité, pas en une fois.</strong>
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ SECTION ÉDUCATIVE : GOOGLE MY BUSINESS ════════ */}
      <section className="py-24 px-8 bg-[#F8F7F5]">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <p className="text-[#C4A77D] text-sm uppercase tracking-[0.2em] mb-4">
              Votre fiche Google
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-6">
              Google My Business :<br />
              <span className="font-serif italic">votre vitrine gratuite</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-4">
                C'est quoi GMB ?
              </h3>
              <p className="text-[#666] leading-relaxed mb-4">
                Google My Business, c'est la fiche qui apparaît à droite quand on cherche votre nom,
                ou sur Google Maps. Vous l'avez déjà (avec {note}★ et {avis} avis).
              </p>
              <p className="text-[#666] leading-relaxed">
                <strong className="text-[#1a1a1a]">Le problème :</strong> une fiche GMB non optimisée, c'est
                comme avoir une belle boutique avec une vitrine sale. Vous existez, mais vous n'attirez pas l'œil.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-4">
                L'optimiser, ça veut dire quoi ?
              </h3>
              <ul className="space-y-3 text-[#666]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Photos pro mises à jour régulièrement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Posts hebdomadaires (comme Instagram, mais pour Google)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Réponses aux avis (positifs ET négatifs)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Services et prestations détaillés avec prix</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Questions/réponses anticipées</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 bg-[#1a1a1a] text-white rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-8 h-8 text-[#C4A77D]" />
              <h3 className="text-xl font-medium">Pourquoi c'est crucial ?</h3>
            </div>
            <p className="text-[#aaa] leading-relaxed">
              Une fiche GMB bien optimisée peut vous faire apparaître dans le "pack local" — ces 3 résultats
              avec la carte qui apparaissent en haut de Google pour les recherches locales. C'est la zone
              la plus cliquée, et elle est gratuite (contrairement aux pubs).
            </p>
          </div>

        </div>
      </section>

      {/* ════════ SECTION ÉDUCATIVE : LE GEO-TARGETING ════════ */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <p className="text-[#C4A77D] text-sm uppercase tracking-[0.2em] mb-4">
              La stratégie locale
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-6">
              Le SEO Local :<br />
              <span className="font-serif italic">dominer votre zone</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)] mb-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#1a1a1a] mb-4">
                  Pourquoi cibler géographiquement ?
                </h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  "Coiffeur" = 450 000 recherches/mois en France. Impossible de se positionner.
                  <br />
                  "Coiffeur Nice" = 2 800 recherches/mois. Difficile mais faisable.
                  <br />
                  <strong className="text-[#1a1a1a]">"Coloriste Nice" = 260 recherches/mois. Accessible.</strong>
                </p>
                <p className="text-[#666] leading-relaxed">
                  La stratégie : on cible d'abord les petits mots-clés locaux (votre quartier, vos services spécifiques + ville),
                  puis on "remonte" progressivement vers les plus gros.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F8F7F5] rounded-xl p-6">
              <div className="text-4xl font-light text-[#1a1a1a] mb-2">1</div>
              <h4 className="font-medium text-[#1a1a1a] mb-2">Les niches</h4>
              <p className="text-sm text-[#666]">
                "Lissage brésilien Nice", "Soin Tokio Nice"...
                Peu de volume mais peu de concurrence.
              </p>
            </div>
            <div className="bg-[#F8F7F5] rounded-xl p-6">
              <div className="text-4xl font-light text-[#1a1a1a] mb-2">2</div>
              <h4 className="font-medium text-[#1a1a1a] mb-2">Les quartiers</h4>
              <p className="text-sm text-[#666]">
                "Coiffeur Vieux Nice", "Coloriste Cimiez"...
                Ultra-local, très facile à prendre.
              </p>
            </div>
            <div className="bg-[#F8F7F5] rounded-xl p-6">
              <div className="text-4xl font-light text-[#1a1a1a] mb-2">3</div>
              <h4 className="font-medium text-[#1a1a1a] mb-2">La remontée</h4>
              <p className="text-sm text-[#666]">
                En étant partout sur les petits, Google vous
                fait remonter sur les gros.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : LA STRATÉGIE BLOG ════════ */}
      <section className="py-24 px-8 bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C4A77D] text-sm uppercase tracking-[0.2em] mb-4">
              La stratégie contenu
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Répondre aux questions<br />
              <span className="font-serif italic">que vos clientes se posent</span>
            </h2>
            <p className="text-[#8B8680] max-w-2xl mx-auto">
              Chaque mois, des milliers de femmes à Nice tapent des questions dans Google.
              En y répondant via des articles de blog, vous captez ce trafic.
            </p>
          </div>

          {/* Questions + volumes */}
          <div className="bg-[#242424] rounded-2xl overflow-hidden mb-12">
            <div className="px-6 py-4 border-b border-[#333]">
              <h3 className="font-medium flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#C4A77D]" />
                Questions les plus recherchées
              </h3>
            </div>
            <div className="divide-y divide-[#333]/50">
              {questionsInternautes.slice(0, 6).map((q, i) => (
                <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors">
                  <span className="text-[#ddd] font-light">"{q.question}"</span>
                  <span className="text-[#8B8680] text-sm">{q.volume}/mois</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#C4A77D]/20 to-[#C4A77D]/5 rounded-2xl p-8 border border-[#C4A77D]/20">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#C4A77D] flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#1a1a1a]" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">
                  Ce que je propose pour vous : 20 articles/mois
                </h3>
                <p className="text-[#aaa] leading-relaxed mb-4">
                  Chaque article répond à une question précise que vos clientes tapent dans Google.
                  Au bout de 6 mois, vous avez 120 pages qui travaillent pour vous 24h/24.
                </p>
                <ul className="space-y-2 text-[#aaa] text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C4A77D]" />
                    Articles rédigés par un humain (pas de ChatGPT basique)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C4A77D]" />
                    Optimisés SEO avec les bons mots-clés
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C4A77D]" />
                    Liens internes vers vos pages services
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ CE QUE VOUS PERDEZ SANS SITE ════════ */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <p className="text-red-500 text-sm uppercase tracking-[0.2em] mb-4">
              Le coût de l'inaction
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-6">
              Chaque mois sans site,<br />
              <span className="font-serif italic">c'est de l'argent perdu</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-red-100">

            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-[#666]">Recherches "faciles" à capter</span>
                <span className="font-medium text-[#1a1a1a]">{easyVolume}/mois</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-[#666]">Si 5% visitent votre site</span>
                <span className="font-medium text-[#1a1a1a]">{Math.round(easyVolume * 0.05)} visites</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-[#666]">Si 10% de ces visites prennent RDV</span>
                <span className="font-medium text-[#1a1a1a]">{Math.round(easyVolume * 0.05 * 0.10)} clientes</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-[#666]">Avec un panier moyen de 75€</span>
                <span className="font-medium text-[#1a1a1a]">{Math.round(easyVolume * 0.05 * 0.10 * 75)}€</span>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 text-center">
              <p className="text-red-800 text-lg mb-2">
                Estimation du manque à gagner mensuel
              </p>
              <p className="text-4xl font-light text-red-600">
                ~{Math.round(easyVolume * 0.05 * 0.10 * 75)}€ à {Math.round(easyVolume * 0.08 * 0.12 * 75)}€/mois
              </p>
              <p className="text-red-600/70 text-sm mt-2">
                Qui vont chez vos concurrents visibles sur Google
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ TARIFS PERSONNALISÉS POUR CE CLIENT ════════ */}
      <section className="py-24 px-8 bg-[#F8F7F5]" id="offres">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C4A77D] text-sm uppercase tracking-[0.2em] mb-4">
              Proposition sur-mesure
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-4">
              Votre investissement<br />
              <span className="font-serif italic">pour {nom}</span>
            </h2>
            <p className="text-[#8B8680] max-w-xl mx-auto">
              Tarifs adaptés à votre situation : pas de site actuellement,
              fort potentiel sur les recherches locales "lissage" et "coloriste".
            </p>
          </div>

          {/* Grille tarifaire personnalisée */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">

            {/* Formule 1 : Site seul */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <div className="mb-6">
                <h3 className="text-xl font-medium text-[#1a1a1a] mb-1">Le Site</h3>
                <p className="text-[#8B8680] text-sm">Votre vitrine professionnelle</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light text-[#1a1a1a]">690</span>
                  <span className="text-lg text-[#8B8680]">€</span>
                </div>
                <p className="text-sm text-[#8B8680]">paiement unique</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Site multi-pages sur-mesure (5-7 pages)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Design élégant à votre image</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Responsive mobile & tablette</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Intégration réservation (Planity, etc.)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Hébergement 1 an inclus</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-[#8B8680]">
                  Idéal si vous voulez juste une présence en ligne professionnelle,
                  sans travail SEO continu.
                </p>
              </div>
            </div>

            {/* Formule 2 : Site + SEO - RECOMMANDÉ */}
            <div className="relative bg-[#1a1a1a] text-white rounded-2xl p-8 shadow-[0_8px_50px_rgba(0,0,0,0.15)] lg:-my-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#C4A77D] text-[#1a1a1a] text-xs font-medium px-4 py-1.5 rounded-full">
                  Recommandé
                </span>
              </div>

              <div className="mb-6 pt-2">
                <h3 className="text-xl font-medium mb-1">Site + Visibilité</h3>
                <p className="text-[#8B8680] text-sm">Le site + le travail SEO mensuel</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light">990</span>
                  <span className="text-lg text-[#8B8680]">€</span>
                </div>
                <p className="text-sm text-[#8B8680]">
                  puis <span className="text-white font-medium">190€</span>/mois
                </p>
                <p className="text-xs text-[#666]">sans engagement</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#aaa] text-sm">Tout le pack "Le Site" +</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#aaa] text-sm"><strong className="text-white">10 articles SEO/mois</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#aaa] text-sm">Pages services optimisées (lissage, coloration...)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#aaa] text-sm">Suivi positions Google</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#aaa] text-sm">Rapport mensuel détaillé</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#333]">
                <p className="text-xs text-[#666]">
                  Le minimum pour vraiment apparaître sur Google et
                  concurrencer les salons visibles.
                </p>
              </div>
            </div>

            {/* Formule 3 : Accompagnement complet */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <div className="mb-6">
                <h3 className="text-xl font-medium text-[#1a1a1a] mb-1">Accompagnement Total</h3>
                <p className="text-[#8B8680] text-sm">SEO intensif + GMB + tout</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light text-[#1a1a1a]">1 290</span>
                  <span className="text-lg text-[#8B8680]">€</span>
                </div>
                <p className="text-sm text-[#8B8680]">
                  puis <span className="text-[#1a1a1a] font-medium">290€</span>/mois
                </p>
                <p className="text-xs text-[#8B8680]">sans engagement</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Tout le pack "Site + Visibilité" +</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm"><strong className="text-[#1a1a1a]">20 articles SEO/mois</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Gestion complète Google My Business</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Posts GMB hebdomadaires</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Réponses aux avis Google</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C4A77D] flex-shrink-0 mt-0.5" />
                  <span className="text-[#666] text-sm">Support WhatsApp prioritaire</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-[#8B8680]">
                  Pour dominer votre zone géographique et
                  devenir LA référence coloriste/lissage à Nice.
                </p>
              </div>
            </div>

          </div>

          {/* Maintenance site */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)] mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-medium text-[#1a1a1a] mb-2">
                  Maintenance site seul (après la 1ère année)
                </h4>
                <p className="text-[#8B8680] text-sm">
                  Hébergement, sécurité, mises à jour techniques, petites modifications.
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-light text-[#1a1a1a]">29€</span>
                <span className="text-[#8B8680]">/mois</span>
              </div>
            </div>
          </div>

          {/* Comparatif marché */}
          <div className="bg-[#1a1a1a] text-white rounded-2xl p-8">
            <h4 className="text-center text-[#8B8680] text-sm uppercase tracking-wider mb-8">
              Pour comparer avec le marché
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-light text-red-400 mb-2">50-100€/mois</div>
                <div className="text-xs text-[#666]">
                  Simplebo, WebGazelle<br/>
                  <span className="text-red-400/70">(site loué, jamais à vous)</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-light text-amber-400 mb-2">1 500-3 000€</div>
                <div className="text-xs text-[#666]">
                  Freelance moyen<br/>
                  <span className="text-amber-400/70">(site seul, pas de SEO)</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-light text-amber-400 mb-2">5 000€+</div>
                <div className="text-xs text-[#666]">
                  Agence web<br/>
                  <span className="text-amber-400/70">(+ 300-500€/mois pour SEO)</span>
                </div>
              </div>
              <div className="bg-emerald-500/10 rounded-xl p-4 -m-2">
                <div className="text-2xl font-light text-emerald-400 mb-2">990€ + 190€/mois</div>
                <div className="text-xs text-emerald-400/70">
                  IndHack<br/>
                  (site à vous + SEO complet)
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ FAQ ÉDUCATIVE ════════ */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Combien de temps avant de voir des résultats ?",
                a: "Le site est en ligne sous 2-3 semaines. Pour le SEO, comptez 2-3 mois pour voir les premières positions sur les mots-clés faciles (lissage, balayage...), et 4-6 mois pour les plus concurrentiels (coiffeur Nice, coloriste Nice). C'est un marathon, pas un sprint — mais une fois en place, ça travaille pour vous pendant des années."
              },
              {
                q: "Je peux arrêter l'accompagnement SEO quand je veux ?",
                a: "Oui, sans engagement. Le site reste à vous, vous pouvez arrêter le SEO mensuel quand vous le souhaitez. Mais attention : sans contenu régulier, vos positions se dégradent progressivement (6-12 mois)."
              },
              {
                q: "C'est quoi exactement un 'article SEO' ?",
                a: "C'est un article de blog optimisé pour répondre à une question que vos clientes tapent dans Google. Par exemple : 'Quelle est la différence entre lissage brésilien et japonais ?'. L'article est rédigé par un humain, pas du texte IA basique, et intègre les bons mots-clés pour que Google le trouve."
              },
              {
                q: "Mon site m'appartient vraiment ?",
                a: "Oui, contrairement aux solutions type Simplebo où vous louez votre site. Ici, le site est développé sur-mesure, hébergé à votre nom, et si vous arrêtez notre collaboration, vous gardez tout (code, contenu, domaine)."
              },
              {
                q: "Je n'y connais rien en technique, c'est un problème ?",
                a: "Pas du tout. Je gère toute la partie technique. Vous n'avez rien à installer, rien à configurer. Vous recevez un rapport mensuel clair avec vos positions Google et l'évolution de votre trafic."
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenSection(openSection === `faq-${i}` ? null : `faq-${i}`)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#1a1a1a] pr-4">{item.q}</span>
                  {openSection === `faq-${i}` ? (
                    <ChevronUp className="w-5 h-5 text-[#8B8680] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#8B8680] flex-shrink-0" />
                  )}
                </button>
                {openSection === `faq-${i}` && (
                  <div className="px-6 pb-5 text-[#666] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════ CTA FINAL ════════ */}
      <section className="py-24 px-8 bg-[#1a1a1a] text-white">
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Envie d'en discuter ?
          </h2>
          <p className="text-[#8B8680] text-lg mb-10 leading-relaxed">
            Réservez un appel de 30 minutes. Je vous explique concrètement
            ce qu'on peut faire pour <span className="text-white">{nom}</span>.
            <br />
            <span className="text-[#666]">Pas de commercial, pas de pression — juste une discussion.</span>
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#C4A77D] text-[#1a1a1a] px-10 py-5 rounded-full font-medium hover:bg-[#d4b78d] transition-colors text-lg"
          >
            <Calendar className="w-5 h-5" />
            Réserver un appel gratuit
          </a>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#666]">
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

      {/* ════════ FOOTER MINIMAL ════════ */}
      <footer className="py-8 px-8 bg-[#151515]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#666]">
          <span>IndHack · Visibilité web pour indépendants</span>
          <span>© {new Date().getFullYear()} · Tous droits réservés</span>
        </div>
      </footer>

    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCFA]" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
