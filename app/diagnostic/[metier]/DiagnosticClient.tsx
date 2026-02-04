'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Check, Globe, Calendar, Star, TrendingUp, Phone, MessageCircle, ChevronDown, Users, BarChart3, Bot, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { MetierData } from '@/lib/diagnostic-data'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC CLIENT - Contenu interactif
// ══════════════════════════════════════════════════════════════════════════════

interface DiagnosticClientProps {
  metier: string
  metierData: MetierData
}

// Villes pour les liens internes SEO
const FEATURED_CITIES = [
  { name: 'Nice', slug: 'seo-nice' },
  { name: 'Cannes', slug: 'seo-cannes' },
  { name: 'Antibes', slug: 'seo-antibes' },
  { name: 'Monaco', slug: 'seo-monaco' },
  { name: 'Marseille', slug: 'seo-marseille' },
  { name: 'Paris', slug: 'seo-paris' },
]

export default function DiagnosticClient({ metier, metierData }: DiagnosticClientProps) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Récupérer le volume de recherche principal
  const mainKeyword = metierData.keywords.principal[0]
  const totalVolume = metierData.keywords.principal.reduce((sum, kw) => sum + kw.volume, 0)

  return (
    <main className="min-h-screen bg-white">

      {/* ════════ HEADER HERO ════════ */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={metierData.heroImage}
            alt={`${metierData.label} - Diagnostic SEO`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm">Analyse personnalisée</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Et si <span className="font-medium">{nom}</span><br />
              était visible sur Google ?
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Aujourd'hui, vos {avis} clients satisfaits vous trouvent par le bouche-à-oreille.
              Mais chaque mois, <strong className="text-white">{totalVolume.toLocaleString()} personnes</strong> cherchent un {metierData.label.toLowerCase()} à {ville} sur Google.
              <br /><br />
              Elles ne vous trouvent pas.
            </p>

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
                <span>{ville}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ════════ POURQUOI UN SITE INTERNET ════════ */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Pourquoi créer un site internet<br />
              <span className="font-medium">pour {nom} ?</span>
            </h2>
            <div className="text-gray-500 text-lg max-w-2xl mx-auto">
              <ReactMarkdown>{metierData.problemStatement}</ReactMarkdown>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Être trouvé sur Google</h3>
              <p className="text-gray-600 leading-relaxed">
                Quand quelqu'un tape "{mainKeyword?.keyword}" sur Google, il voit une liste de résultats.
                Sans site web, vous n'apparaissez pas. Vous êtes invisible.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Posséder votre vitrine digitale</h3>
              <p className="text-gray-600 leading-relaxed">
                Instagram et Google My Business, c'est bien. Mais ce sont des plateformes qui ne vous appartiennent pas.
                Un site web, c'est votre espace, avec vos règles.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Attirer de nouveaux clients</h3>
              <p className="text-gray-600 leading-relaxed">
                Un site bien fait attire des visiteurs en continu, 24h/24. C'est un commercial qui travaille
                pour vous sans jamais s'arrêter.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Inspirer confiance</h3>
              <p className="text-gray-600 leading-relaxed">
                En 2026, un professionnel sans site web paraît moins crédible. Un site soigné
                rassure les nouveaux clients et montre votre sérieux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MOTS-CLÉS DE VOTRE SECTEUR ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Comprendre le référencement
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Ce que les gens cherchent
            </h2>
            <p className="text-gray-500 text-lg">
              Voici les vraies recherches Google dans votre secteur à {ville}.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Mots-clés principaux</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[...metierData.keywords.principal, ...metierData.keywords.niches.slice(0, 4)].map((kw) => (
                <div key={kw.keyword} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                  <span className="text-gray-900">"{kw.keyword}"</span>
                  <span className="text-gray-500 text-sm">{kw.volume.toLocaleString()}/mois</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Données issues d'outils professionnels (SEMrush, Haloscan). Ces recherches sont réelles.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ GEO / IA ════════ */}
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
              "Quel est le meilleur {metierData.label.toLowerCase()} à {ville} ?" — on pose maintenant cette question à ChatGPT.
            </p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Comment les IA trouvent leurs réponses ?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Un site web</h4>
                <p className="text-gray-500 text-sm">Sans site, l'IA n'a pas de source fiable pour parler de vous.</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Contenu structuré</h4>
                <p className="text-gray-500 text-sm">Des pages claires sur vos services et votre localisation.</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Bonne réputation</h4>
                <p className="text-gray-500 text-sm">Vos {avis} avis avec {note}★ sont un atout majeur.</p>
              </div>
            </div>
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
              <p className="text-gray-600 leading-relaxed mb-6">
                Le référencement prend du temps. Les résultats apparaissent en 3 à 6 mois.
                Pendant ce temps, vos concurrents qui ont déjà un site captent les clients qui vous cherchent.
              </p>

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
                      Inexistant pour les IA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                      {totalVolume.toLocaleString()} recherches/mois qui ne vous trouvent pas
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
                      Référencé par les IA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      De nouveaux clients chaque mois
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ QUI SUIS-JE ════════ */}
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
                j'accompagne les indépendants et PME dans leur visibilité en ligne.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mon approche : des stratégies concrètes, des résultats mesurables, pas de jargon inutile.
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

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Mes tarifs</h2>
            <p className="text-gray-500 text-lg">
              Des formules adaptées à vos besoins, sans engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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

            <div className="bg-gray-900 text-white rounded-2xl p-8 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-gray-900 text-xs font-medium px-4 py-1.5 rounded-full">Recommandé</span>
              </div>
              <h3 className="text-xl font-medium mb-2 pt-2">Site + SEO</h3>
              <p className="text-gray-400 text-sm mb-6">Être trouvé sur Google</p>
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
        </div>
      </section>

      {/* ════════ LIENS INTERNES SEO - VILLES ════════ */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-light text-gray-900 mb-2">
              Consultante SEO dans votre ville
            </h2>
            <p className="text-gray-500">
              J'accompagne les {metierData.labelPlural.toLowerCase()} partout en France
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group bg-gray-50 hover:bg-sauge/10 rounded-xl p-4 text-center transition-all hover:shadow-md"
              >
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-sauge mx-auto mb-2 transition-colors" />
                <span className="text-gray-700 group-hover:text-sauge font-medium text-sm transition-colors">
                  SEO {city.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/seo-local"
              className="inline-flex items-center gap-2 text-sauge hover:text-ink font-medium transition-colors"
            >
              Voir toutes mes zones d'intervention
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES - SERVICES ════════ */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Mes expertises</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/audit-seo" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Audit SEO
            </Link>
            <Link href="/referencement-naturel" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Référencement Naturel
            </Link>
            <Link href="/creation-site-web" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Création de Site Web
            </Link>
            <Link href="/seo-local" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              SEO Local
            </Link>
            <Link href="/community-manager" className="bg-white border border-gray-200 hover:border-sauge rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-sauge transition-all">
              Community Manager
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ CTA CALENDLY ════════ */}
      <section className="py-24 px-6 md:px-12 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">On en discute ?</h2>
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
          <Link href="/" className="hover:text-white transition-colors">IndHack · Consultante SEO · Nice</Link>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>

    </main>
  )
}
