'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Search, ArrowRight, Shield, Globe, Monitor, Smartphone, Check, X, Phone, Menu as MenuIcon } from 'lucide-react'

// --- DATA SPÉCIFIQUE LUCIE MENDES / HALOSCAN 2026 ---
const REAL_DATA = {
  volumeGlobal: 2800,
  competitors: [
    { name: "Le Fil de l'Ame", rank: 3, rating: 4.4, reviews: 82 },
    { name: "Salon Carré d'Or", rank: 4, rating: 4.5, reviews: 110 }
  ],
  opportunites: [
    { keyword: "coiffeur nice nord", volume: 480 },
    { keyword: "coiffeur nice etoile", volume: 390 },
    { keyword: "meilleur coiffeur nice", volume: 720 },
  ]
}

// --- COMPONENTS UTILES ---

function SectionHeading({ title, subtitle, dark = false }: { title: string, subtitle: string, dark?: boolean }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <p className={`text-lg ${dark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed font-light`}>
        {subtitle}
      </p>
    </div>
  )
}

function SimpleCard({ children, title, className = "" }: { children: React.ReactNode, title?: string, className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-8 border border-gray-100 ${className}`}>
      {title && <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif">{title}</h3>}
      {children}
    </div>
  )
}

// --- MAIN PAGE CONTENT ---

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'By Lucie Mendes'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const tel = searchParams.get('tel') || '06 61 13 97 48'

  // États pour le mockup
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900">

      {/* 1. HERO SECTION: SOBRE & ÉLÉGANT */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-[#FDFBF7]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm mb-6 font-medium">
              <Star className="w-3 h-3 fill-amber-800" />
              <span>Excellent : 4.6/5 sur Google</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              {nom},<br />l'art de la coiffure à {ville}.
            </h1>

            <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed max-w-md">
              Vos clients vous adorent. Il est temps que votre image sur internet soit à la hauteur de votre talent en salon.
            </p>

            <button onClick={() => document.getElementById('analyse')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium text-base hover:bg-gray-800 transition-all flex items-center gap-2">
              Voir le diagnostic
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Image Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1200"
              alt="Salon de coiffure"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. ANALYSE SIMPLE (Pas de jargon) */}
      <section id="analyse" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="Ce qu'il se passe sur Google"
            subtitle={`À Nice, environ ${REAL_DATA.volumeGlobal} personnes cherchent un coiffeur chaque mois. Voici où elles vont.`}
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Carte Concurrents */}
            <SimpleCard title="Vos concurrents visibles" className="bg-gray-50 border-0">
              <p className="text-gray-600 mb-6 text-sm">Ces salons apparaissent en premier, même s'ils sont parfois moins bien notés que vous.</p>
              <div className="space-y-4">
                {REAL_DATA.competitors.map((comp, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 font-bold">#{comp.rank}</span>
                      <span className="font-medium text-gray-900">{comp.name}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-xs text-green-700 font-medium">
                      <span>{comp.rating}</span>
                      <Star className="w-3 h-3 fill-green-700" />
                    </div>
                  </div>
                ))}
              </div>
            </SimpleCard>

            {/* Carte Opportunités */}
            <SimpleCard title="Les recherches précises" className="bg-white border border-gray-200">
              <p className="text-gray-600 mb-6 text-sm">Beaucoup de gens cherchent par quartier ou par besoin spécifique. Vous n'êtes pas visible sur ces termes.</p>
              <div className="space-y-0 divide-y divide-gray-100">
                {REAL_DATA.opportunites.map((opp, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <span className="text-gray-700 font-medium">"{opp.keyword}"</span>
                    <span className="text-gray-400 text-sm">{opp.volume} rech./mois</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-amber-600 font-medium text-sm">Potentiel : ~1 500 visiteurs qualifiés / mois</p>
              </div>
            </SimpleCard>
          </div>
        </div>
      </section>

      {/* 3. NOTRE SOLUTION (Éducatif) */}
      <section className="py-20 px-6 bg-[#FDFBF7]">
        <div className="container mx-auto">
          <SectionHeading
            title="Comment on vous rend visible"
            subtitle="Pas de magie. Juste une structure de site intelligente pour couvrir Nice."
          />

          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Votre Site Principal</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Une belle page d'accueil qui présente qui vous êtes, votre salon, et vos tarifs. C'est votre vitrine officielle.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Les Pages Locales</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">On crée des pages dédiées pour chaque recherche : "Coiffeur Nice Nord", "Lissage Nice", etc. Comme ça, Google vous propose à tout le monde.</p>
                  </div>
                </div>
              </div>

              {/* VISUALISATION SIMPLE ARBORESCENCE */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  {/* Lignes connecteurs */}
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-gray-200" viewBox="0 0 200 200">
                    <line x1="100" y1="40" x2="50" y2="160" stroke="currentColor" strokeWidth="2" />
                    <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="2" />
                    <line x1="100" y1="40" x2="150" y2="160" stroke="currentColor" strokeWidth="2" />
                  </svg>

                  <div className="flex flex-col items-center gap-12 relative z-10">
                    <div className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium shadow-lg">
                      Accueil (Nice Centre)
                    </div>
                    <div className="flex gap-4">
                      <span className="bg-white border border-gray-200 px-3 py-2 rounded text-xs text-gray-600 shadow-sm">/nice-nord</span>
                      <span className="bg-white border border-gray-200 px-3 py-2 rounded text-xs text-gray-600 shadow-sm">/etoile</span>
                      <span className="bg-white border border-gray-200 px-3 py-2 rounded text-xs text-gray-600 shadow-sm">/coloriste</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LE MOCKUP (PROPRE) */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="À quoi ça ressemblerait"
            subtitle="Un site moderne, clair et rassurant pour vos clients."
          />

          {/* Toggle View */}
          <div className="flex justify-center gap-4 mb-12">
            <button onClick={() => setViewMode('desktop')} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm font-medium ${viewMode === 'desktop' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Monitor className="w-4 h-4" /> Ordinateur
            </button>
            <button onClick={() => setViewMode('mobile')} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm font-medium ${viewMode === 'mobile' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Smartphone className="w-4 h-4" /> Téléphone
            </button>
          </div>

          <div className="flex justify-center">
            <div className={`transition-all duration-500 shadow-2xl rounded-lg overflow-hidden border border-gray-200 ${viewMode === 'desktop' ? 'w-full max-w-4xl aspect-[16/10]' : 'w-[320px] aspect-[9/19]'}`}>
              {/* Fake Browser/Phone content */}
              <div className="h-full bg-white flex flex-col font-serif">
                {/* Navbar */}
                <div className="bg-white border-b border-gray-50 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                  <div className="font-bold text-lg tracking-tight text-gray-900">By Lucie Mendes</div>
                  {viewMode === 'desktop' ? (
                    <div className="flex gap-6 text-sm font-sans text-gray-500">
                      <span>Le Salon</span>
                      <span>Tarifs</span>
                      <span>Contact</span>
                      <span className="bg-black text-white px-4 py-2 rounded text-xs uppercase tracking-wide">Réserver</span>
                    </div>
                  ) : <MenuIcon className="w-6 h-6 text-gray-800" />}
                </div>

                {/* Hero Site */}
                <div className="relative flex-1 bg-[#FBFBFB] flex items-center justify-center text-center px-4 overflow-hidden">
                  <div className="relative z-10 max-w-lg">
                    <p className="text-gray-400 text-xs font-sans uppercase tracking-[0.2em] mb-4">Coiffure & Soins à Nice</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-8">
                      Sublimer votre beauté naturelle.
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button className="bg-gray-900 text-white px-6 py-3 rounded text-sm font-sans hover:bg-gray-800">Prendre Rendez-vous</button>
                    </div>
                  </div>
                </div>

                {/* Avis Section */}
                <div className="bg-white py-6 border-t border-gray-50 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex text-amber-400 gap-1"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                    <p className="font-sans text-xs text-gray-400">Basé sur 155 avis Google vérifiés.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TARIFS SIMPLIFIÉS */}
      <section className="py-20 px-6 bg-[#FDFBF7]" id="tarifs">
        <div className="container mx-auto">
          <SectionHeading
            title="Nos Tarifs"
            subtitle="Pas de surprise. Tout est inclus."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* OFFRE 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-gray-900 font-bold text-xl mb-2 font-serif">Site Vitrine</h3>
              <p className="text-gray-500 text-sm mb-6">Mise en ligne rapide. Design pro.</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">890€</div>
              <div className="text-sm text-gray-400 mb-8">+ 49€/mois (maintenance & hébergement)</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-4 h-4 text-gray-900" /> Site One-Page Elegant</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-4 h-4 text-gray-900" /> Optimisé mobile</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-4 h-4 text-gray-900" /> Lien Planity de réservation</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-4 h-4 text-gray-900" /> Textes et photos inclus</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-gray-200 text-gray-900 font-medium hover:bg-gray-50">Choisir cette offre</button>
            </div>

            {/* OFFRE 2 (STAR) */}
            <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col relative transform md:-translate-y-4 shadow-xl">
              <div className="absolute top-0 right-0 bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">Le plus pertinent</div>
              <h3 className="font-bold text-xl mb-2 font-serif text-white">Site + Visibilité</h3>
              <p className="text-gray-400 text-sm mb-6">Pour apparaître dans les recherches Google.</p>
              <div className="text-3xl font-bold text-white mb-1">1 490€</div>
              <div className="text-sm text-gray-400 mb-8">+ 149€/mois (référencement)</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-200" /> <strong>Site Complet (5 pages)</strong></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-200" /> <strong>Pages Locales (Quartiers)</strong></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-200" /> Blog actualités (2/mois)</li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-200" /> Rapport mensuel simple</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-amber-200 text-amber-900 font-bold hover:bg-amber-100 transition-colors">Choisir cette offre</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white text-center border-t border-gray-100">
        <p className="text-gray-500 text-sm mb-2">
          Page créée pour <span className="text-gray-900 font-medium">{nom}</span>.
        </p>
        <p className="text-xs text-gray-400">Agence IndHack Nice • 06 61 13 97 48</p>
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
