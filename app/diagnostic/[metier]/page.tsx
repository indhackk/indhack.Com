'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Search, ArrowRight, Shield, Globe, Monitor, Smartphone, Check, X, Phone, Menu as MenuIcon, Cpu, Database, Share2, Layers, Zap, Code as CodeIcon, TrendingUp } from 'lucide-react'

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
    { keyword: "prix lissage brésilien nice", volume: 210 },
    { keyword: "coiffeur ouvert lundi nice", volume: 150 },
  ]
}

// --- COMPONENTS UTILES ---

function SectionHeading({ title, subtitle, dark = false }: { title: string, subtitle: string, dark?: boolean }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className={`text-3xl md:text-5xl font-serif font-bold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <p className={`text-lg md:text-xl ${dark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed font-light`}>
        {subtitle}
      </p>
    </div>
  )
}

function TechCard({ children, title, icon: Icon, className = "" }: { children: React.ReactNode, title: string, icon: any, className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-white mb-6">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">{title}</h3>
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
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* 1. HERO SECTION: EXPERTISE TECHNIQUE */}
      <section className="relative min-h-[85vh] flex items-center bg-gray-50 border-b border-gray-200">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-8">
              <Cpu className="w-3 h-3" />
              Analyse Technique : {nom}
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-8 leading-[1.1]">
              Votre talent est visible.<br />
              <span className="text-gray-400">Votre code est invisible.</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed max-w-lg">
              Google est un robot aveugle. Il ne voit pas la beauté de vos coupes. Il lit le code.
              Aujourd'hui, votre code est muet. Nous allons lui donner la parole.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => document.getElementById('tech-educ')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gray-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20">
                Comprendre la stratégie
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Visualisation Code/Data */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-[#1E1E1E] rounded-xl shadow-2xl p-6 font-mono text-sm leading-relaxed overflow-hidden border border-gray-800">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-500 text-xs ml-2">google-bot-crawler.js</span>
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">const</span> <span className="text-yellow-400">analyzeSite</span> = <span className="text-blue-400">async</span> (url) ={'>'} {'{'}<br />
                &nbsp;&nbsp;<span className="text-green-400">// ANALYSE ACTUELLE</span><br />
                &nbsp;&nbsp;<span className="text-purple-400">if</span> (!structuredData) <span className="text-blue-400">return</span> <span className="text-red-400">"INCONNU"</span>;<br />
                <br />
                &nbsp;&nbsp;<span className="text-green-400">// OBJECTIF INDHACK</span><br />
                &nbsp;&nbsp;<span className="text-blue-400">return</span> {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;entity: <span className="text-orange-400">"Coiffeur Premium"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;location: <span className="text-orange-400">"{ville}"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;rating: <span className="text-blue-400">4.6</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;expertise: [<span className="text-orange-400">"Coloriste"</span>, <span className="text-orange-400">"Lissage"</span>]<br />
                &nbsp;&nbsp;{'}'};<br />
                {'}'}
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Stats Card Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-green-100 p-3 rounded-full text-green-700">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Potentiel Trafic</div>
                <div className="text-2xl font-bold text-gray-900">2 800/mois</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LE FUTUR DU WEB (GEO & AI) */}
      <section id="tech-educ" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="Pourquoi 90% des sites sont déjà obsolètes"
            subtitle="Le web change. Google change. L'IA arrive. Voici comment nous préparons votre entreprise pour les 5 prochaines années."
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <TechCard title="Le Code Parle à Google" icon={CodeIcon}>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Les sites classiques (Wix, etc.) génèrent un code "sale". Google peine à les comprendre.<br /><br />
                <strong className="text-gray-900">Notre approche :</strong> Nous utilisons <span className="bg-gray-100 px-1 rounded font-mono text-xs">Next.js</span> et <span className="bg-gray-100 px-1 rounded font-mono text-xs">JSON-LD</span> (le langage natif de Google) pour lui dire exactement qui vous êtes. Résultat : une indexation immédiate et précise.
              </p>
            </TechCard>

            <TechCard title="Cluster de Réponses" icon={Share2}>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Avoir un blog ne suffit plus. Il faut répondre aux <strong>intentions</strong> réelles.<br /><br />
                <strong className="text-gray-900">Notre approche :</strong> Notre algo détecte les questions exactes : <em>"Coiffeur ouvert lundi ?"</em>, <em>"Prix lissage Nice ?"</em>. Nous créons automatiquement les pages qui répondent à ces questions précises.
              </p>
            </TechCard>

            <TechCard title="GEO (IA Ready)" icon={Zap} className="border-blue-200 bg-blue-50/30">
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Demain, vos clients demanderont à ChatGPT : <em>"Trouve-moi le meilleur coloriste à Nice"</em>.<br /><br />
                <strong className="text-gray-900">Notre approche :</strong> Nous structurons vos données (Prix, Avis, Services) pour qu'elles soient lisibles par les IA. C'est votre assurance vie numérique.
              </p>
            </TechCard>
          </div>
        </div>
      </section>

      {/* 3. LE MOCKUP COMPLET (AVEC BLOG/CONSEILS) */}
      <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto">
          <SectionHeading
            title="L'Expérience IndHack"
            subtitle="Pas juste une jolie image. Une machine à convertir."
            dark={true}
          />

          {/* Toggle View */}
          <div className="flex justify-center gap-4 mb-12">
            <button onClick={() => setViewMode('desktop')} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm font-medium border ${viewMode === 'desktop' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-700'}`}>
              <Monitor className="w-4 h-4" /> Desktop
            </button>
            <button onClick={() => setViewMode('mobile')} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm font-medium border ${viewMode === 'mobile' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-700'}`}>
              <Smartphone className="w-4 h-4" /> Mobile
            </button>
          </div>

          <div className="flex justify-center">
            <div className={`transition-all duration-500 bg-white rounded-lg overflow-hidden shadow-2xl ${viewMode === 'desktop' ? 'w-full max-w-5xl' : 'w-[320px]'}`}>
              {/* Header Site Mockup */}
              <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center text-gray-900">
                <div className="font-serif font-bold text-xl tracking-tight">By Lucie Mendes</div>
                {viewMode === 'desktop' && (
                  <div className="flex gap-6 text-sm font-medium text-gray-500">
                    <span className="text-gray-900">Accueil</span>
                    <span>Nos Conseils</span>
                    <span>Tarifs</span>
                    <span className="bg-black text-white px-4 py-2 rounded">Réserver</span>
                  </div>
                )}
                {viewMode === 'mobile' && <MenuIcon className="w-5 h-5" />}
              </div>

              {/* Hero Site Mockup */}
              <div className="relative bg-[#F5F5F0] py-16 px-6 text-center">
                <p className="text-amber-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">Experte Coloriste • Nice Centre</p>
                <h2 className="text-gray-900 font-serif text-4xl md:text-5xl mb-6">Sublimez vos cheveux.</h2>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-900 mb-8">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.6/5 sur Google (155 avis)</span>
                </div>
                <div className="flex justify-center gap-4">
                  <button className="bg-gray-900 text-white px-6 py-3 rounded text-sm font-medium">Prendre RDV</button>
                </div>
              </div>

              {/* Blog/Questions Section Mockup (PREUVE DE VALEUR) */}
              <div className="bg-white py-12 px-8">
                <div className="flex justify-between items-end mb-8">
                  <h3 className="text-gray-900 font-serif text-2xl">Nos conseils d'experte</h3>
                  {viewMode === 'desktop' && <span className="text-gray-400 text-sm border-b border-gray-300">Voir tous les articles</span>}
                </div>
                <div className={`grid ${viewMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {[
                    { title: "Quel prix pour un lissage brésilien à Nice ?", cat: "Tarifs" },
                    { title: "Comment rattraper une couleur ratée ?", cat: "Expertise" },
                    { title: "Soins cheveux après le soleil : notre routine", cat: "Saison" }
                  ].map((art, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <span className="text-xs text-amber-600 font-bold uppercase tracking-wide">{art.cat}</span>
                      <h4 className="text-gray-900 font-bold leading-tight mt-1 group-hover:text-amber-700 transition-colors">{art.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LES 3 OFFRES (STRUCTURE TECH) */}
      <section className="py-24 px-6 bg-[#FDFBF7]" id="tarifs">
        <div className="container mx-auto">
          <SectionHeading
            title="Investir dans votre Infrastructure"
            subtitle="Choisissez votre niveau de puissance digitale."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">

            {/* OFFRE 1: LE SOCLE */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="mb-6">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">L'ESSENTIEL</div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Le Socle</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">890€</span>
                </div>
                <span className="text-gray-500 text-sm block mt-1">+ 49€/mois (Maintenance)</span>
              </div>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed border-b border-gray-100 pb-8">
                Une infrastructure technique saine, rapide, et propriétaire. Idéal pour débuter proprement sans dépendre de plateformes fermées.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-gray-900 flex-shrink-0" /> <strong>Code Next.js Clean</strong></li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-gray-900 flex-shrink-0" /> Site One-Page Ultra-Rapide</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-gray-900 flex-shrink-0" /> Propriété 100% (Pas de location)</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-gray-900 flex-shrink-0" /> Hébergement Haute Perf.</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-gray-300 text-gray-900 font-bold hover:bg-gray-50 transition-colors">Sélectionner Le Socle</button>
            </div>

            {/* OFFRE 2: L'EXPANSION (HERO) */}
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl ring-1 ring-gray-900 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">STRATÉGIE RECOMMANDÉE</div>
              <div className="mb-6">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">CROISSANCE</div>
                <h3 className="text-2xl font-serif font-bold text-white">L'Expansion</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">1 490€</span>
                </div>
                <span className="text-gray-400 text-sm block mt-1">+ 149€/mois (SEO Actif)</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed border-b border-gray-800 pb-8">
                Déploiement de clusters de contenu pour capter le trafic local. On ne fait pas "2 articles", on répond aux questions de vos clients.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> <strong>Site Complet (5 Pages)</strong></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> <strong>Maillage "Quartiers Nice"</strong></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> <strong>Cluster "Questions Clients"</strong></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Rapport Sémantique Mensuel</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50">Démarrer l'Expansion</button>
            </div>

            {/* OFFRE 3: L'AUTORITÉ */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="mb-6">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">DOMINATION</div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">L'Autorité</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">1 990€</span>
                </div>
                <span className="text-gray-500 text-sm block mt-1">+ 290€/mois (Full Service)</span>
              </div>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed border-b border-gray-100 pb-8">
                L'assurance vie numérique. Préparation pour l'IA (GEO), gestion complète de votre réputation et optimisation continue.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-purple-600 flex-shrink-0" /> <strong>Optimisé GEO (IA Ready)</strong></li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-purple-600 flex-shrink-0" /> Gestion Google Maps (Avis/Posts)</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-purple-600 flex-shrink-0" /> Données Structurées Avancées</li>
                <li className="flex gap-3 text-sm text-gray-700"><Check className="w-5 h-5 text-purple-600 flex-shrink-0" /> Support Tech Prioritaire</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-gray-300 text-gray-900 font-bold hover:bg-gray-50 transition-colors">Viser l'Autorité</button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white text-center border-t border-gray-100">
        <p className="text-gray-500 text-sm mb-2">
          Analyse technique générée pour <span className="text-gray-900 font-medium">{nom}</span>.
        </p>
        <p className="text-xs text-gray-400 font-mono">IndHack Next.js Branch • v4.2.0 • Nice HQ</p>
      </footer>
    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" /></div>}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
