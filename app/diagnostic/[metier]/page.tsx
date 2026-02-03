'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Smartphone, Check, ArrowRight, Code2, Cpu, MessageCircle, ShieldCheck, Zap, Menu } from 'lucide-react'

// --- DESIGN SYSTEM CONFIG ---
// Couleurs : Noir Encre (#1A1A1A), Or/Sable (#D4B996), Fond Crème (#FAFAF9)
// Fonts : Serif (Titres), Sans (Texte)

// --- COMPOSANTS UI ---

function Badge({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAE8E4] border border-[#D6D3CD] text-[#5A5854] text-xs font-medium tracking-wide font-sans uppercase">
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} max-w-4xl mx-auto`}>
      <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#666] font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function BentoCard({ title, children, icon: Icon, highlight = false }: { title: string, children: React.ReactNode, icon: any, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col ${highlight ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#E5E5E5] text-[#1A1A1A] hover:border-[#D4B996]'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${highlight ? 'bg-white/10 text-[#D4B996]' : 'bg-[#FAFAF9] text-[#1A1A1A]'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`text-xl font-serif font-bold mb-4 ${highlight ? 'text-white' : 'text-[#1A1A1A]'}`}>{title}</h3>
      <div className={`text-sm leading-relaxed ${highlight ? 'text-gray-300' : 'text-gray-600'}`}>
        {children}
      </div>
    </div>
  )
}

// --- CONTENU PRINCIPAL ---

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'By Lucie Mendes'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const tel = searchParams.get('tel') || '06 61 13 97 48'

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1A1A1A] font-sans selection:bg-[#D4B996] selection:text-white">

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Badge icon={MapPin}>Audit pour {nom} • 22 Rue de l'Hôtel des Postes, {ville}</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium text-[#1A1A1A] mb-8 leading-[1.1]">
              Lucie,<br />
              votre salon mérite mieux que d'être <span className="italic text-[#D4B996]">invisible.</span>
            </h1>

            <p className="text-xl text-[#666] font-light leading-relaxed mb-10 max-w-xl">
              Vous avez l'excellence (<span className="font-semibold text-[#1A1A1A]">4.6/5 sur 155 avis</span>).
              Mais sur Google, ce sont vos concurrents moins bien notés qui récupèrent les <span className="font-semibold text-[#1A1A1A]">2 800 recherches mensuelles</span> à {ville}.
            </p>

            <button onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/5">
              Voir la réalité technique
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Image Subtle / Abstract */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 bg-[#D4B996]/10 rounded-t-full rounded-b-full transform rotate-3 scale-95" />
            <div className="absolute inset-0 rounded-t-full rounded-b-full overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=1000&auto=format&fit=crop"
                alt="Coiffure Art"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-[#FAFAF9] max-w-xs">
              <div className="flex text-[#D4B996] mb-2">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="font-serif text-lg italic text-[#1A1A1A]">"Une expertise rare."</p>
              <p className="text-xs text-[#999] mt-2 font-sans uppercase tracking-wider">Avis Google</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: EXPERTISE TECHNIQUE */}
      <section id="expertise" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Pourquoi un 'joli site' ne suffit plus en 2026."
            subtitle="Le web a changé. Avoir un site Wix ou Wordpress ne suffit plus pour exister face aux nouvelles technologies."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <BentoCard title="Google est devenu aveugle" icon={Code2}>
              Google ne "regarde" pas votre site, il lit le <strong>CODE</strong>.
              La plupart des sites actuels (Wix, etc.) génèrent un code lourd et illisible.
              <br /><br />
              <strong>Mon approche :</strong> J'utilise <span className="bg-[#FAFAF9] px-1 border border-[#E5E5E5] rounded text-xs font-mono">Next.js</span>, une technologie qui sert à Google un code pur, optimisé pour être compris et indexé instantanément.
            </BentoCard>

            <BentoCard title="La Révolution IA (GEO)" icon={Cpu} highlight={true}>
              Bientôt, vos clients ne chercheront plus sur Google, ils demanderont à ChatGPT : <em>"Trouve-moi un coloriste expert à Nice"</em>.
              <br /><br />
              Si votre site n'a pas les <strong>données structurées</strong> (Schema.org) pour parler à l'IA, <strong>vous n'existerez pas.</strong> Mon infrastructure est "AI-Ready" dès le premier jour.
            </BentoCard>

            <BentoCard title="Stratégie de Réponses" icon={MessageCircle}>
              Je n'écris pas juste "Coiffeur Nice" sur une page. C'est inefficace.
              <br /><br />
              <strong>Mon approche :</strong> Je crée des pages qui répondent aux <strong>vraies questions</strong> : <em>"Prix lissage brésilien Nice"</em>, <em>"Coiffeur ouvert lundi"</em>, <em>"Rattrapage couleur"</em>. C'est la seule façon de capturer 100% du trafic local qualifié.
            </BentoCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: MOCKUP IPHONE */}
      <section className="py-24 px-6 bg-[#FAFAF9] overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center">
          <SectionTitle
            title="La Preuve par l'Image"
            subtitle="Voici à quoi ressemble une interface conçue pour convertir."
            centered={true}
          />

          <div className="relative mx-auto w-[320px] md:w-[380px] h-[750px] bg-[#1A1A1A] rounded-[50px] p-4 shadow-2xl border-[8px] border-[#1A1A1A] ring-1 ring-gray-200">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col relative text-left">
              {/* Navbar */}
              <div className="pt-12 px-6 pb-4 flex justify-between items-center bg-white sticky top-0 z-10">
                <span className="font-serif font-bold text-lg">{nom}</span>
                <Menu className="w-6 h-6 text-[#1A1A1A]" />
              </div>

              {/* Hero Mobile */}
              <div className="px-6 pt-4 pb-8 bg-[#FAFAF9]">
                <p className="text-xs font-bold text-[#D4B996] uppercase tracking-[0.2em] mb-4">Coloriste Expert • Nice</p>
                <h2 className="text-3xl font-serif text-[#1A1A1A] leading-tight mb-6">L'Art de la Coloration à Nice.</h2>
                <img
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=600"
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-6 shadow-sm"
                  alt="Salon"
                />
                <div className="bg-[#1A1A1A] text-white text-center py-4 rounded-lg font-medium shadow-lg">
                  Prendre Rendez-vous
                </div>
              </div>

              {/* Review */}
              <div className="px-6 py-8 bg-white border-t border-gray-100">
                <div className="flex gap-1 text-[#D4B996] mb-3">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-serif italic text-gray-600 mb-4">
                  "Je n'ai jamais eu un résultat aussi naturel. Lucie comprend exactement ce qu'on veut, même quand on ne sait pas l'expliquer. Magicienne."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">SM</div>
                  <span className="text-xs font-bold text-gray-900">Sarah Maazouz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OFFRES */}
      <section className="py-24 px-6 bg-white" id="offres">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Investir dans votre Actif Digital"
            subtitle="Trois niveaux d'accompagnement pour transformer votre présence en ligne."
          />

          <div className="grid md:grid-cols-3 gap-8 items-start">

            {/* OFFRE 1 */}
            <div className="p-8 border border-[#E5E5E5] rounded-2xl bg-[#FAFAF9]">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">Le Socle</h3>
              <div className="text-3xl font-bold mb-1 font-serif">990€</div>
              <p className="text-xs text-[#999] mb-8 font-sans">Paiement unique</p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Site Vitrine Haute Performance</li>
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Code Next.js (Google Native)</li>
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Design Premium Sur-mesure</li>
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Propriétaire à 100%</li>
              </ul>
              <button className="w-full py-3 border border-[#E5E5E5] bg-white text-[#1A1A1A] rounded-lg text-sm font-bold hover:bg-[#F0F0F0] transition-colors">Choisir Le Socle</button>
            </div>

            {/* OFFRE 2 (HERO) */}
            <div className="p-8 border border-[#D4B996] rounded-2xl bg-[#1A1A1A] text-white relative shadow-2xl transform md:-translate-y-6">
              <div className="absolute top-0 right-0 bg-[#D4B996] text-[#1A1A1A] text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider uppercase">Recommandé</div>

              <h3 className="text-xl font-serif font-bold text-[#D4B996] mb-2">L'Expansion</h3>
              <div className="text-3xl font-bold mb-1 font-serif">1 490€</div>
              <p className="text-xs text-gray-400 mb-8 font-sans">+ 149€/mois (Maintenance & SEO)</p>

              <p className="text-sm text-gray-300 mb-6 italic border-b border-gray-800 pb-4">
                "La stratégie complète pour capter les clients de votre zone."
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#D4B996]" /> <span className="font-bold">Stratégie Sémantique Complète</span></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#D4B996]" /> <span className="font-bold">Inclus tout le Socle (Site Pro)</span></li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#D4B996]" /> Cluster "Réponses aux Questions"</li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#D4B996]" /> Visibilité Quartiers (Carré d'Or...)</li>
                <li className="flex gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#D4B996]" /> Maintenance technique incluse</li>
              </ul>
              <button className="w-full py-3 bg-[#D4B996] text-[#1A1A1A] rounded-lg text-sm font-bold hover:bg-[#C4A986] transition-colors shadow-lg shadow-[#D4B996]/20">Démarrer l'Expansion</button>
            </div>

            {/* OFFRE 3 */}
            <div className="p-8 border border-[#E5E5E5] rounded-2xl bg-[#FAFAF9]">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">L'Autorité</h3>
              <div className="text-3xl font-bold mb-1 font-serif">Sur Devis</div>
              <p className="text-xs text-[#999] mb-8 font-sans">ou forfait 290€/mois</p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Domination Totale & IA</li>
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Optimisation GEO (ChatGPT Ready)</li>
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Gestion GMB (Avis & Posts)</li>
                <li className="flex gap-3 text-sm text-[#555]"><Check className="w-4 h-4 text-[#1A1A1A]" /> Support Prioritaire</li>
              </ul>
              <button className="w-full py-3 border border-[#E5E5E5] bg-white text-[#1A1A1A] rounded-lg text-sm font-bold hover:bg-[#F0F0F0] transition-colors">Me contacter</button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER & CTA FLOTTANT */}
      <footer className="py-12 bg-white text-center border-t border-gray-200">
        <p className="text-[#1A1A1A] font-serif font-bold text-lg mb-2">IndHack</p>
        <p className="text-[#666] text-sm">Consultant SEO & Tech à Nice. Pas d'agence, pas de blabla. Juste des résultats.</p>
      </footer>

      {/* Flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#1A1A1A] text-white px-6 py-4 rounded-full font-medium shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B996] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4B996]"></span>
          </span>
          Réserver mon audit avec Indiana
        </button>
      </div>

    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF9]" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
