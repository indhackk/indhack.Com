'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search, MapPin, Check, Globe, Calendar, Star, TrendingUp, Phone, MessageCircle, ChevronDown, Users, BarChart3, Bot, AlertTriangle, Sparkles, Zap, Code, Rocket, Heart, Shield } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC COIFFEUR - Version Clean & Vendeuse
// Template réutilisable pour tous les salons de coiffure sans site
// ══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent() {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  // Calculs pour personnalisation
  const noteNum = parseFloat(note)
  const avisNum = parseInt(avis)
  const isExcellent = noteNum >= 4.5
  const hasLotsOfReviews = avisNum >= 100

  return (
    <main className="min-h-screen bg-white">

      {/* ════════ HERO IMMERSIF ════════ */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
            alt="Salon de coiffure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24">
          <div className="max-w-2xl">

            {/* Badge discret */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm">Analyse personnalisée pour {nom}</span>
            </div>

            {/* Accroche principale */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
              <span className="font-light">Et si vos futures clientes</span>
              <br />
              <span className="font-semibold">vous trouvaient sur Google ?</span>
            </h1>

            {/* Contexte flatteur */}
            <div className="space-y-6 mb-12">
              <p className="text-xl text-white/90 leading-relaxed">
                {isExcellent && hasLotsOfReviews ? (
                  <>
                    <strong className="text-white">{note}/5 étoiles</strong> et <strong className="text-white">{avis} avis</strong> sur Google —
                    vos clientes ne tarissent pas d'éloges. Ce niveau de satisfaction, c'est rare.
                    C'est le signe d'un vrai savoir-faire.
                  </>
                ) : (
                  <>
                    <strong className="text-white">{note}/5 étoiles</strong> sur Google —
                    vos clientes apprécient votre travail, et ça se voit.
                  </>
                )}
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Le problème ? Cette réputation reste invisible pour toutes celles qui ne vous connaissent pas encore.
                <br /><br />
                Chaque mois, <strong className="text-white">2 800 personnes</strong> tapent "coiffeur {ville}" dans Google.
                <br />
                <span className="text-amber-300">Elles ne vous trouvent pas.</span>
              </p>
            </div>

            {/* Infos salon */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{note}/5 sur Google</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{avis} avis clients</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{ville}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-wider">Découvrir</span>
          <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ════════ LE PROBLÈME ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-20">
            <span className="text-rose-500 text-sm font-medium uppercase tracking-wider">Le constat</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-6">
              Sans site web, vous êtes
              <span className="font-semibold"> invisible</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Une fiche Google et un compte Instagram, c'est bien. Mais ce n'est plus suffisant en 2025.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-rose-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Introuvable sur Google
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quand quelqu'un cherche "coloriste {ville}" ou "lissage brésilien {ville}",
                vous n'apparaissez nulle part. Vos concurrents avec un site prennent toute la place.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-violet-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Inexistante pour les IA
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ChatGPT, Gemini, Perplexity... De plus en plus de gens demandent des recommandations aux IA.
                Sans site structuré, elles ne peuvent pas parler de vous.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Pas de vitrine à vous
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instagram peut fermer votre compte. Google peut modifier sa fiche.
                Un site web, c'est VOTRE espace, que personne ne peut vous enlever.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Des clientes qui vont ailleurs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ces 2 800 recherches mensuelles, ce sont des femmes prêtes à prendre RDV.
                Aujourd'hui, elles atterrissent chez vos concurrents.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ APERÇU DU FUTUR SITE ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Projection</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-6">
              Votre site pourrait ressembler
              <span className="font-semibold"> à ça</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Un aperçu de ce que je peux créer pour {nom}
            </p>
          </div>

          {/* Browser Mockup */}
          <div className="relative">
            {/* Ombre décorative */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 via-violet-100 to-rose-100 rounded-[2rem] blur-2xl opacity-40" />

            {/* Browser frame */}
            <div className="relative bg-gray-100 rounded-t-2xl px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center">
                {nom.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.fr
              </div>
            </div>

            {/* Site preview */}
            <div className="relative bg-white rounded-b-2xl shadow-2xl overflow-hidden border border-gray-200">

              {/* Hero du site fictif */}
              <div className="relative h-[450px] md:h-[550px]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80"
                  alt={nom}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Header fictif */}
                <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex items-center justify-between">
                  <div className="text-white font-medium text-xl tracking-tight">
                    {nom}
                  </div>
                  <nav className="hidden md:flex items-center gap-8 text-white/70 text-sm">
                    <span className="hover:text-white transition-colors cursor-pointer">Prestations</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Galerie</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Tarifs</span>
                    <span className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                      Réserver
                    </span>
                  </nav>
                </div>

                {/* Contenu hero */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-4">Salon de coiffure · {ville}</p>
                  <h3 className="text-3xl md:text-5xl text-white font-light mb-6 leading-tight">
                    L'expertise coloration
                    <br />
                    <span className="font-medium">au cœur de {ville}</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm mb-8">
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {note}/5 · {avis} avis
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {ville} Centre
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <span className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                      Prendre rendez-vous
                    </span>
                    <span className="border border-white/30 text-white px-8 py-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
                      Découvrir le salon
                    </span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="p-8 md:p-12">
                <h4 className="text-xl font-medium text-gray-900 mb-8">Nos expertises</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Coloration', 'Lissage brésilien', 'Balayage', 'Soins Tokio'].map((service) => (
                    <div key={service} className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-5 text-center transition-colors cursor-pointer">
                      <p className="text-gray-900 font-medium">{service}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Aperçu indicatif — le design final sera créé sur-mesure selon vos envies
          </p>

        </div>
      </section>

      {/* ════════ POURQUOI MOI ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-20">
            <span className="text-emerald-500 text-sm font-medium uppercase tracking-wider">Ma différence</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-6">
              Pas un site Wix.
              <span className="font-semibold"> Un vrai site.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Développé en code</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pas de constructeur type Wix ou WordPress. Du vrai code, optimisé, léger.
                Résultat : un site ultra-rapide (100/100 sur Google PageSpeed).
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Le site est à vous</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Contrairement aux solutions en location (Simplebo, Wix...), vous êtes propriétaire.
                Si on arrête de travailler ensemble, vous gardez tout.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Optimisé SEO & IA</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Structure technique pensée pour Google ET pour les IA (ChatGPT, Gemini).
                Vous êtes visible partout où vos clientes cherchent.
              </p>
            </div>

          </div>

          {/* Comparatif rapide */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
            <h4 className="font-medium text-gray-900 mb-6 text-center">En résumé</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Wix / Simplebo</p>
                <ul className="space-y-3">
                  {[
                    'Site loué (jamais vraiment à vous)',
                    'Templates génériques',
                    'Lent à charger',
                    '50-100€/mois à vie',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-500 text-sm">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-500 uppercase tracking-wider mb-4">Avec moi</p>
                <ul className="space-y-3">
                  {[
                    'Site 100% à vous (code + hébergement)',
                    'Design sur-mesure unique',
                    'Ultra-rapide (code optimisé)',
                    'Paiement unique + accompagnement optionnel',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ SEO EXPLIQUÉ ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-20">
            <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Le SEO expliqué</span>
            <h2 className="text-3xl md:text-4xl font-light mt-4 mb-6">
              Comment on fait pour apparaître
              <span className="font-semibold"> sur Google ?</span>
            </h2>
          </div>

          <div className="space-y-6">

            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-6">
                <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">1</span>
                <div>
                  <h3 className="text-xl font-medium mb-3">Un site avec les bons mots-clés</h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    Google analyse le contenu de votre site. Si quelqu'un tape "lissage brésilien {ville}"
                    et que vous avez une page dédiée à ce service, vous avez des chances d'apparaître.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { kw: `coiffeur ${ville.toLowerCase()}`, vol: '2 800' },
                      { kw: `lissage brésilien ${ville.toLowerCase()}`, vol: '320' },
                      { kw: `coloriste ${ville.toLowerCase()}`, vol: '260' },
                      { kw: `balayage ${ville.toLowerCase()}`, vol: '210' },
                    ].map((item) => (
                      <div key={item.kw} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                        <span className="text-white/80 text-sm">"{item.kw}"</span>
                        <span className="text-blue-400 text-xs">{item.vol}/mois</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-6">
                <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">2</span>
                <div>
                  <h3 className="text-xl font-medium mb-3">Du contenu régulier</h3>
                  <p className="text-white/70 leading-relaxed">
                    Google privilégie les sites qui publient régulièrement. Des articles de blog répondant
                    aux questions que se posent vos clientes ("Quelle différence entre balayage et mèches ?")
                    vous font remonter dans les résultats.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-6">
                <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">3</span>
                <div>
                  <h3 className="text-xl font-medium mb-3">Une fiche Google optimisée</h3>
                  <p className="text-white/70 leading-relaxed">
                    Vous avez déjà une fiche Google avec {note}★. C'est un excellent point de départ.
                    En l'optimisant (description, posts réguliers, réponses aux avis), on peut viser
                    le "Pack Local" — ces 3 résultats avec la carte qui apparaissent en haut de Google.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ L'URGENCE ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-3xl mx-auto text-center">

          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-10 h-10 text-rose-500" />
          </div>

          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Plus vous attendez,
            <span className="font-semibold"> plus vos concurrents avancent</span>
          </h2>

          <div className="text-gray-600 text-lg leading-relaxed space-y-4 mb-12">
            <p>
              Le référencement prend du temps — généralement 3 à 6 mois pour voir des résultats significatifs.
            </p>
            <p>
              Pendant ce temps, les salons qui ont déjà un site continuent de capter
              les clientes qui vous cherchent.
            </p>
            <p className="font-medium text-gray-900">
              Chaque mois sans site, ce sont des dizaines de clientes potentielles
              qui atterrissent ailleurs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
              <p className="text-rose-500 font-medium mb-3">Aujourd'hui</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                  Invisible sur Google
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                  Inexistante pour ChatGPT
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                  Dépendante des plateformes
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
              <p className="text-emerald-500 font-medium mb-3">Dans 6 mois</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Visible sur les recherches locales
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Recommandée par les IA
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Propriétaire de votre vitrine
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ QUI SUIS-JE ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div>
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Qui suis-je</span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-8">
                Je suis Indiana,
                <br />
                <span className="font-semibold">consultante SEO à {ville}</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Double master en stratégie digitale et expérience utilisateur.
                  Après quelques années en agence, j'ai choisi l'indépendance pour
                  accompagner les entrepreneurs de la Côte d'Azur.
                </p>
                <p>
                  Mon approche : pas de jargon, pas de promesses en l'air.
                  Je vous explique ce qui est réaliste, ce qui prend du temps,
                  et on construit ensemble.
                </p>
                <p className="font-medium text-gray-900">
                  Mon objectif : que vous soyez autonome, avec un site qui vous appartient vraiment.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 via-violet-100 to-rose-100 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">IA</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Indiana Aflalo</h3>
                    <p className="text-gray-500 text-sm">Consultante SEO · {ville}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>Double master digital & UX</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>Développement en code (Next.js)</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>Spécialisée SEO local Côte d'Azur</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gray-50" id="tarifs">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Investissement</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-6">
              Des formules
              <span className="font-semibold"> adaptées à vos besoins</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Vous êtes propriétaire du site. Sans engagement sur les accompagnements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Formule 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Site Vitrine</h3>
                <p className="text-gray-500 text-sm">Votre présence en ligne professionnelle</p>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-1">à partir de</p>
                <p className="text-4xl font-light text-gray-900">690<span className="text-lg">€</span></p>
                <p className="text-sm text-gray-400 mt-1">paiement unique</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Site 5-7 pages sur-mesure',
                  'Design unique à votre image',
                  'Développé en code (ultra-rapide)',
                  'Responsive mobile & tablette',
                  'Bouton réservation intégré',
                  'Vous êtes propriétaire du site',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400">
                Hébergement à votre charge (~5€/mois sur Vercel ou autre)
              </p>
            </div>

            {/* Formule 2 - Recommandée */}
            <div className="relative bg-gray-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Recommandé
                </span>
              </div>

              <div className="mb-8 pt-2">
                <h3 className="text-xl font-semibold mb-2">Site + Visibilité</h3>
                <p className="text-gray-400 text-sm">Être trouvée sur Google</p>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">à partir de</p>
                <p className="text-4xl font-light">990<span className="text-lg">€</span></p>
                <p className="text-sm text-gray-400 mt-1">puis <span className="text-white font-medium">190€</span>/mois</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Tout le pack Site Vitrine',
                  '10 articles SEO/mois',
                  'Pages services optimisées',
                  'Optimisation fiche Google',
                  'Suivi des positions Google',
                  'Rapport mensuel clair',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500">
                Sans engagement — arrêtez quand vous voulez
              </p>
            </div>

            {/* Formule 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accompagnement Complet</h3>
                <p className="text-gray-500 text-sm">SEO + Google My Business + IA</p>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-1">à partir de</p>
                <p className="text-4xl font-light text-gray-900">1 290<span className="text-lg">€</span></p>
                <p className="text-sm text-gray-400 mt-1">puis <span className="text-gray-900 font-medium">290€</span>/mois</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Tout le pack Site + Visibilité',
                  '20 articles SEO/mois',
                  'Gestion complète Google My Business',
                  'Posts GMB hebdomadaires',
                  'Réponses aux avis Google',
                  'Optimisation pour ChatGPT/Gemini',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400">
                Sans engagement — arrêtez quand vous voulez
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ CTA FINAL ════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Envie d'en discuter ?
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            30 minutes pour vous expliquer concrètement ce qu'on peut faire
            pour <span className="text-white font-medium">{nom}</span>.
            <br />
            <span className="text-gray-500">Sans engagement, sans pression commerciale.</span>
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

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500">
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

      {/* ════════ MINI FOOTER ════════ */}
      <div className="py-6 px-6 bg-gray-950 text-center">
        <p className="text-gray-600 text-sm">
          IndHack · Consultante SEO · {ville} · {new Date().getFullYear()}
        </p>
      </div>

    </main>
  )
}

export default function CoiffeurDiagnosticPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
