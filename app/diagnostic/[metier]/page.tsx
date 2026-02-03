'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Search, MapPin, Check, Globe, Calendar, Star, TrendingUp, Phone, MessageCircle, ChevronDown, ChevronUp, ExternalLink, Sparkles, Users, BarChart3, Bot, AlertTriangle } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC PAGE - Version Propre & Pédagogique
// Dernière mise à jour: 2026-02-03
// ══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">

      {/* ════════ HEADER HERO AVEC PHOTO SALON ════════ */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Background Image - Photo salon coiffure élégant */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
            alt="Salon de coiffure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm">Analyse personnalisée</span>
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Et si <span className="font-medium">{nom}</span><br />
              était visible sur Google ?
            </h1>

            {/* Sous-titre */}
            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Aujourd'hui, vos {avis} clientes satisfaites vous trouvent par le bouche-à-oreille.
              Mais chaque mois, <strong className="text-white">2 800 personnes</strong> cherchent un coiffeur à {ville} sur Google.
              <br /><br />
              Elles ne vous trouvent pas.
            </p>

            {/* Infos salon */}
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>{note}/5 sur Google</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{avis} avis clients</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>22 rue Hôtel des Postes, {ville}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ════════ SECTION : POURQUOI UN SITE INTERNET ? ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Pourquoi créer un site internet<br />
              <span className="font-medium">pour {nom} ?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Vous avez une excellente réputation. Mais sans site web, vous passez à côté d'une partie importante de votre clientèle potentielle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Être trouvée sur Google
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quand quelqu'un tape "coloriste Nice" ou "lissage brésilien Nice" sur Google,
                il voit une liste de résultats. Sans site web, vous n'apparaissez pas dans cette liste.
                Vous êtes invisible pour tous ces clients potentiels.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Posséder votre vitrine digitale
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instagram et les fiches Google, c'est bien. Mais ce sont des plateformes qui ne vous appartiennent pas.
                Un site web, c'est votre espace. Vous y présentez vos services, vos tarifs,
                vos réalisations — comme vous le voulez.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Attirer de nouvelles clientes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Un site bien fait attire des visiteurs en continu, 24h/24. Ces visiteurs découvrent
                votre travail, lisent vos avis, et prennent rendez-vous. C'est un commercial
                qui travaille pour vous sans jamais s'arrêter.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Inspirer confiance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                En 2025, un professionnel sans site web paraît moins crédible. Un site soigné
                rassure les nouvelles clientes. Ça montre que vous prenez votre métier au sérieux,
                que vous êtes établie, professionnelle.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ SECTION : APERÇU DE VOTRE FUTUR SITE ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Voici ce que pourrait être<br />
              <span className="font-medium">votre site internet</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Un aperçu du site que je pourrais créer pour {nom}
            </p>
          </div>

          {/* Mockup du site */}
          <div className="relative">
            {/* Browser frame */}
            <div className="bg-gray-200 rounded-t-2xl px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-gray-500 text-center">
                byluciermendes.fr
              </div>
            </div>

            {/* Site preview */}
            <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">

              {/* Hero du site fictif */}
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80"
                  alt="Salon By Lucie Mendes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Header fictif */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                  <div className="text-white font-medium text-xl">
                    By Lucie Mendes
                  </div>
                  <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm">
                    <span>Services</span>
                    <span>Galerie</span>
                    <span>Tarifs</span>
                    <span>Contact</span>
                    <span className="bg-white text-gray-900 px-4 py-2 rounded-full">Réserver</span>
                  </nav>
                </div>

                {/* Contenu hero fictif */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-3">Salon de coiffure · Nice Centre</p>
                  <h3 className="text-3xl md:text-4xl text-white font-light mb-4">
                    L'expertise colorimétrie<br />
                    <span className="font-medium">au cœur de Nice</span>
                  </h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm mb-6">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      4.6/5 · 155 avis
                    </span>
                    <span>22 rue Hôtel des Postes</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium">
                      Prendre rendez-vous
                    </span>
                    <span className="border border-white/30 text-white px-6 py-3 rounded-full">
                      Découvrir le salon
                    </span>
                  </div>
                </div>
              </div>

              {/* Services fictifs */}
              <div className="p-8 md:p-12 border-t border-gray-100">
                <h4 className="text-xl font-medium text-gray-900 mb-6">Nos expertises</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Coloration', 'Lissage brésilien', 'Balayage', 'Soins Tokio'].map((service) => (
                    <div key={service} className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-gray-900 font-medium text-sm">{service}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            * Aperçu non contractuel. Le design final sera créé sur-mesure selon vos préférences.
          </p>

        </div>
      </section>

      {/* ════════ SECTION : QU'EST-CE QUE LE SEO ? ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Comprendre le référencement
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Le SEO, c'est quoi ?
            </h2>
            <p className="text-gray-500 text-lg">
              Et pourquoi c'est important pour votre salon.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">

            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">1</span>
                Google classe les sites par pertinence
              </h3>
              <p className="text-gray-600 leading-relaxed mb-0">
                Quand quelqu'un tape "coiffeur Nice" dans Google, il y a des milliers de résultats possibles.
                Google les classe du plus pertinent au moins pertinent. Les 10 premiers résultats de la première page
                récupèrent <strong>90% des clics</strong>. Le SEO (Search Engine Optimization), c'est l'ensemble des techniques
                pour apparaître dans ces premiers résultats.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">2</span>
                Les mots-clés : ce que les gens cherchent
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Un mot-clé, c'est une recherche que les gens tapent dans Google. Voici quelques exemples
                pour votre secteur à {ville} :
              </p>
              <div className="grid md:grid-cols-2 gap-3 not-prose">
                {[
                  { keyword: 'coiffeur nice', volume: '2 800/mois' },
                  { keyword: 'coloriste nice', volume: '260/mois' },
                  { keyword: 'lissage brésilien nice', volume: '320/mois' },
                  { keyword: 'balayage nice', volume: '210/mois' },
                  { keyword: 'meilleur coiffeur nice', volume: '140/mois' },
                  { keyword: 'coiffeur nice centre', volume: '180/mois' },
                ].map((kw) => (
                  <div key={kw.keyword} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-gray-900">"{kw.keyword}"</span>
                    <span className="text-gray-500 text-sm">{kw.volume}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4 mb-0">
                Ces chiffres sont réels, issus d'outils professionnels (Haloscan, SEMrush).
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">3</span>
                Comment on fait pour apparaître ?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pour que Google vous classe bien, il faut :
              </p>
              <ul className="space-y-3 not-prose">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600"><strong className="text-gray-900">Un site web</strong> — Sans site, vous ne pouvez pas apparaître dans les résultats organiques.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600"><strong className="text-gray-900">Du contenu optimisé</strong> — Des pages qui parlent de vos services avec les bons mots-clés.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600"><strong className="text-gray-900">Un site rapide et mobile</strong> — Google pénalise les sites lents ou mal affichés sur téléphone.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600"><strong className="text-gray-900">De la régularité</strong> — Publier du contenu régulièrement montre à Google que votre site est actif.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ SECTION : GOOGLE MY BUSINESS ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Votre fiche Google
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Google My Business :<br />
              <span className="font-medium">comment je vous aide</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Vous avez déjà une fiche Google avec {note}★ et {avis} avis. C'est une excellente base.
              Mais elle peut être optimisée pour attirer plus de clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Ce que je fais pour votre fiche
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Optimisation complète</strong>
                    <p className="text-gray-500 text-sm">Description, catégories, services, horaires — tout est passé en revue.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Posts réguliers</strong>
                    <p className="text-gray-500 text-sm">Comme Instagram, mais pour Google. Ça montre que votre salon est actif.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Gestion des avis</strong>
                    <p className="text-gray-500 text-sm">Réponses professionnelles aux avis positifs et négatifs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Photos mises à jour</strong>
                    <p className="text-gray-500 text-sm">Des photos récentes et de qualité attirent plus de clics.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                L'objectif : le "Pack Local"
              </h3>
              <p className="text-gray-600 mb-6">
                Quand quelqu'un cherche "coiffeur nice" sur Google, il voit d'abord une carte avec 3 résultats.
                C'est le "Pack Local". C'est la zone la plus cliquée de Google pour les recherches locales.
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-sm text-gray-500 mb-3">Exemple de Pack Local</p>
                <div className="space-y-3">
                  {['Salon A', 'Salon B', 'Salon C'].map((salon, i) => (
                    <div key={salon} className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center font-medium">{i + 1}</span>
                      <span className="text-gray-700">{salon}</span>
                      <span className="text-gray-400">· 4.{5 - i}★</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200 mt-3">
                    <p className="text-sm text-emerald-600 font-medium">
                      Objectif : placer {nom} dans ce top 3
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ SECTION : GEO / IA ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              L'ère de l'IA
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              ChatGPT, Gemini, Perplexity :<br />
              <span className="font-medium">le nouveau Google</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              De plus en plus de gens utilisent des IA pour trouver des recommandations.
              "Quel est le meilleur coiffeur à Nice ?" — c'est une question qu'on pose maintenant à ChatGPT.
            </p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              Comment les IA trouvent leurs réponses ?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              ChatGPT, Gemini et Perplexity parcourent le web pour trouver des informations.
              Ils privilégient les entreprises qui ont :
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Un site web</h4>
                <p className="text-gray-500 text-sm">
                  Sans site, l'IA n'a pas de source fiable pour parler de vous.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Du contenu structuré</h4>
                <p className="text-gray-500 text-sm">
                  Des pages claires sur vos services, votre localisation, vos spécialités.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Une bonne réputation</h4>
                <p className="text-gray-500 text-sm">
                  Vos {avis} avis avec {note}★ sont un atout majeur pour les IA.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Ce que je fais pour le GEO</h3>
                <p className="text-gray-400">GEO = Generative Engine Optimization (optimisation pour les IA)</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Je structure votre site et votre contenu pour qu'il soit facilement compréhensible par les IA.
              Balises techniques, données structurées, contenu clair — tout est fait pour que quand quelqu'un
              demande "Quel coiffeur pour un lissage brésilien à Nice ?", l'IA pense à vous.
            </p>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : URGENCE ════════ */}
      <section className="py-24 px-6 md:px-12 bg-rose-50">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-rose-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                Pourquoi ne pas attendre ?
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Le référencement, c'est un travail qui prend du temps. Les résultats ne sont pas immédiats —
                  il faut généralement 3 à 6 mois pour commencer à voir des effets significatifs.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Pendant ce temps, vos concurrents qui ont déjà un site continuent de capter les clientes
                  qui vous cherchent. Plus vous attendez, plus ils prennent de l'avance.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Et avec l'essor des IA comme ChatGPT et Gemini, la donne change encore plus vite.
                  Les entreprises qui n'ont pas de présence en ligne structurée deviennent tout simplement
                  invisibles pour cette nouvelle génération de recherche.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Aujourd'hui</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                      Invisible sur Google
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                      Inexistante pour les IA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                      2 800 recherches/mois qui ne vous trouvent pas
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Dans 6 mois avec un site</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Visible sur les recherches locales
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Référencée par les IA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      De nouvelles clientes chaque mois
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : QUI SUIS-JE ════════ */}
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
                j'ai travaillé en agence avant de me lancer en indépendante.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Aujourd'hui, j'accompagne les indépendants et les petites entreprises
                de la Côte d'Azur dans leur visibilité en ligne. Mon approche :
                des stratégies concrètes, des résultats mesurables, pas de jargon inutile.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Je ne fais pas de promesses en l'air. Je vous explique ce qui est réaliste,
                ce qui prend du temps, et on avance ensemble.
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

      {/* ════════ SECTION : TARIFS ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50" id="tarifs">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Mes tarifs
            </h2>
            <p className="text-gray-500 text-lg">
              Des formules adaptées à vos besoins, sans engagement sur les accompagnements mensuels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Formule 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Site Vitrine</h3>
              <p className="text-gray-500 text-sm mb-6">Votre présence en ligne</p>

              <div className="mb-8">
                <p className="text-sm text-gray-500">à partir de</p>
                <p className="text-4xl font-light text-gray-900">690<span className="text-lg">€</span></p>
              </div>

              <ul className="space-y-3 mb-8">
                {['Site 5-7 pages sur-mesure', 'Design à votre image', 'Mobile & tablette', 'Bouton réservation', 'Hébergement 1 an'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formule 2 - Recommandée */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-gray-900 text-xs font-medium px-4 py-1.5 rounded-full">
                  Recommandé
                </span>
              </div>

              <h3 className="text-xl font-medium mb-2 pt-2">Site + SEO</h3>
              <p className="text-gray-400 text-sm mb-6">Être trouvée sur Google</p>

              <div className="mb-8">
                <p className="text-sm text-gray-400">à partir de</p>
                <p className="text-4xl font-light">990<span className="text-lg">€</span></p>
                <p className="text-sm text-gray-400">puis <span className="text-white">190€</span>/mois</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['Tout Site Vitrine +', '10 articles SEO/mois', 'Pages services optimisées', 'Suivi positions Google', 'Rapport mensuel'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formule 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Accompagnement Total</h3>
              <p className="text-gray-500 text-sm mb-6">SEO + GMB + GEO</p>

              <div className="mb-8">
                <p className="text-sm text-gray-500">à partir de</p>
                <p className="text-4xl font-light text-gray-900">1 290<span className="text-lg">€</span></p>
                <p className="text-sm text-gray-500">puis <span className="text-gray-900">290€</span>/mois</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['Tout Site + SEO +', '20 articles/mois', 'Gestion Google My Business', 'Optimisation pour les IA', 'Support WhatsApp'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Sans engagement sur les formules mensuelles. Le site vous appartient.
          </p>

        </div>
      </section>

      {/* ════════ SECTION : CTA CALENDLY ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            On en discute ?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Réservez un appel de 30 minutes. Je vous explique concrètement ce qu'on peut faire
            pour <span className="text-white">{nom}</span>, sans engagement.
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
          <span>IndHack · Consultante SEO · Nice</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>

    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
