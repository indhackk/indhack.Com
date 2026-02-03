'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Smartphone, Check, ArrowRight, Sparkles, Heart, Crown, MessageCircle, Menu, User } from 'lucide-react'

// --- DESIGN SYSTEM V6 (WARMTH & EMPATHY) ---
// Couleurs : 
// - Fond Principal : #FDFCF8 (Ivoire chaud)
// - Texte Principal : #2D2A26 (Charbon doux, moins dur que le noir)
// - Accent Luxe : #C6A87C (Or Antique)
// - Accent Doux : #F2EBE3 (Lin)

// --- COMPOSANTS UI ---

function Badge({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2EBE3] border border-[#E6DCD3] text-[#5A5243] text-xs font-medium tracking-wide font-sans uppercase">
      {Icon && <Icon className="w-3 h-3 text-[#C6A87C]" />}
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} max-w-3xl mx-auto`}>
      <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#2D2A26] mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#6B6358] font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function WarmCard({ title, children, icon: Icon, highlight = false }: { title: string, children: React.ReactNode, icon: any, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col ${highlight ? 'bg-[#2D2A26] text-[#FDFCF8] border-[#2D2A26] shadow-xl' : 'bg-white border-[#F2EBE3] text-[#2D2A26] hover:border-[#C6A87C]/30 shadow-sm'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl shadow-inner ${highlight ? 'bg-white/10 text-[#FDFCF8]' : 'bg-[#F9F5F0] text-[#C6A87C]'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={`text-xl font-serif font-medium mb-4 ${highlight ? 'text-[#C6A87C]' : 'text-[#2D2A26]'}`}>{title}</h3>
      <div className={`text-sm leading-relaxed font-light ${highlight ? 'text-[#E6DCD3]' : 'text-[#6B6358]'}`}>
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

  return (
    <main className="min-h-screen bg-[#FDFCF8] text-[#2D2A26] font-sans selection:bg-[#C6A87C] selection:text-white">

      {/* SECTION 1: HERO (VALORISATION) */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 px-6 overflow-hidden">
        {/* Background doux focalisé */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F2EBE3]/30 rounded-l-[100px] hidden lg:block -z-10" />

        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Badge icon={Crown}>Analyse pour {nom}</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#2D2A26] mb-8 leading-[1.1]">
              4.6/5 sur Google...<br />
              <span className="text-[#C6A87C] italic">Vous avez déjà fait le plus dur.</span>
            </h1>

            <p className="text-xl text-[#6B6358] font-light leading-relaxed mb-10 max-w-lg">
              Vos clientes vous adorent, et ça se voit. C'est Google qui ne vous rend pas justice.
              <br /><br />
              Aujourd'hui, quand on cherche "Coiffeur {ville}", <strong>ce sont des salons moins bien notés que vous qui apparaissent en premier.</strong> C'est dommage, non ?
            </p>

            <button onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-[#2D2A26] text-[#FDFCF8] px-8 py-4 rounded-full font-medium text-lg flex items-center gap-3 hover:bg-[#403B35] transition-all shadow-xl shadow-[#2D2A26]/10">
              Voir comment reprendre votre place
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Image Chaleureuse */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[550px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl rotate-3">
              <img
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1200"
                alt="Salon Ambiance"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Note Flottante */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#F2EBE3] flex gap-4 items-center animate-bounce-slow">
              <div className="bg-[#F9F5F0] p-3 rounded-full text-[#C6A87C]">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="font-serif text-[#2D2A26] font-medium">Vos clients vous cherchent.</p>
                <p className="text-xs text-[#999] mt-1">~2 800 recherches/mois à {ville}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: LA TRADUCTION (PÉDAGOGIE) */}
      <section id="solution" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Pourquoi votre site actuel est muet"
            subtitle="Pas de jargon ici. Juste la mécanique de Google expliquée simplement."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <WarmCard title="Le problème de la langue" icon={MessageCircle}>
              Imaginez arriver en Chine et parler Français. Personne ne vous comprend.
              <br /><br />
              Les sites classiques (Wix, etc.) parlent "Design". Google parle "Code".
              <strong>Ma mission :</strong> Traduire votre excellence dans la langue maternelle de Google pour qu'il vous mette enfin en avant.
            </WarmCard>

            <WarmCard title="Le futur assistant (IA)" icon={Sparkles} highlight={true}>
              Demain, vos clientes ne taperont plus sur un clavier. Elles demanderont à leur téléphone : <em>"Trouve-moi le meilleur coloriste à {ville}"</em>.
              <br /><br />
              Si votre site n'est pas prêt pour ça, l'IA ne vous verra pas. Je prépare votre salon pour être la réponse n°1 de ces assistants.
            </WarmCard>

            <WarmCard title="Tisser votre toile" icon={MapPin}>
              Avoir une seule page "Accueil", c'est comme avoir une seule entrée.
              <br /><br />
              <strong>Ma méthode :</strong> On crée des dizaines de "petites entrées" cachées qui répondent aux questions précises : <em>"Prix mèches"</em>, <em>"Coiffeur lundi"</em>. C'est comme ça qu'on capture tout le quartier.
            </WarmCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: MOCKUP "WHAOU" */}
      <section className="py-24 px-6 bg-[#F9F5F0] overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center">
          <SectionTitle
            title="Votre nouvelle vitrine"
            subtitle="Imaginez un site qui reflète enfin la qualité de votre travail."
            centered={true}
          />

          <div className="relative mx-auto w-[320px] md:w-[380px] h-[750px] bg-[#2D2A26] rounded-[50px] p-3 shadow-2xl border-[4px] border-[#403B35]">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-20"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col relative text-left">
              {/* Navbar */}
              <div className="pt-14 px-6 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-[#F2EBE3]">
                <span className="font-serif font-bold text-lg tracking-tight">{nom}</span>
                <Menu className="w-6 h-6 text-[#2D2A26]" />
              </div>

              {/* Hero Mobile */}
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="px-6 py-8 bg-[#FDFCF8]">
                  <p className="text-[10px] font-bold text-[#C6A87C] uppercase tracking-[0.2em] mb-4">L'Excellence à {ville}</p>
                  <h2 className="text-3xl font-serif text-[#2D2A26] leading-tight mb-6">Sublimez vos cheveux, simplement.</h2>

                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden mb-6 shadow-md relative">
                    <img
                      src="https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=600"
                      className="w-full h-full object-cover"
                      alt="Coiffure"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-[#2D2A26]">
                      Coloration & Soin
                    </div>
                  </div>

                  <div className="bg-[#2D2A26] text-[#FDFCF8] text-center py-4 rounded-xl font-medium shadow-lg mb-8">
                    Prendre Rendez-vous
                  </div>

                  <div className="border-t border-[#F2EBE3] pt-8">
                    <div className="flex gap-1 text-[#C6A87C] mb-3 justify-center">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-sm font-serif italic text-center text-[#6B6358] mb-2">
                      "J'ai enfin trouvé ma coiffeuse. Lucie écoute vraiment."
                    </p>
                    <p className="text-xs text-center font-bold text-[#2D2A26] uppercase tracking-wide">Sophie, Cliente depuis 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OFFRES (INVESTISSEMENT) */}
      <section className="py-24 px-6 bg-white" id="offres">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Investir dans votre propre fonds de commerce"
            subtitle="Fini de payer pour des pubs éphémères. Ici, vous construisez quelque chose qui vous appartient."
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            {/* OFFRE 1 */}
            <div className="p-8 border border-[#F2EBE3] rounded-2xl bg-[#FDFCF8] flex flex-col">
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-2">Le Socle Propre</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#2D2A26]">890€</div>
              <p className="text-xs text-[#999] mb-8 font-sans">une seule fois</p>

              <p className="text-sm text-[#6B6358] mb-8 leading-relaxed">
                Pour remplacer proprement votre présence actuelle. Un site rapide, élégant, qui vous appartient à 100%.
              </p>
              <div className="mt-auto">
                <button className="w-full py-3 border border-[#E6DCD3] bg-white text-[#2D2A26] rounded-lg text-sm font-medium hover:bg-[#F2EBE3] transition-colors">Choisir Le Socle</button>
              </div>
            </div>

            {/* OFFRE 2 (STAR) */}
            <div className="p-8 border border-[#C6A87C] rounded-2xl bg-[#FDFCF8] relative shadow-2xl flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#C6A87C] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider uppercase">Le plus malin</div>

              <h3 className="text-xl font-serif font-medium text-[#C6A87C] mb-2">L'Expansion</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#2D2A26]">1 490€</div>
              <p className="text-xs text-[#C6A87C] mb-8 font-sans">+ 149€/mois (Votre croissance)</p>

              <p className="text-sm text-[#6B6358] mb-6 italic border-b border-[#F2EBE3] pb-4">
                Ce n'est pas une "charge". C'est de l'acquisition.
                Chaque mois, on crée des nouvelles pages pour aller chercher des clients qui ne vous connaissent pas encore.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">Site Complet & Design</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">Rédaction mensuelle (Blog/FAQ)</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">Visibilité sur vos quartiers</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">On s'occupe de tout (Tech)</span></li>
              </ul>
              <div className="mt-auto">
                <button className="w-full py-3 bg-[#2D2A26] text-white rounded-lg text-sm font-medium hover:bg-[#403B35] transition-colors shadow-lg shadow-[#2D2A26]/20">Démarrer ma croissance</button>
              </div>
            </div>

            {/* OFFRE 3 */}
            <div className="p-8 border border-[#F2EBE3] rounded-2xl bg-[#FDFCF8] flex flex-col">
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-2">L'Autorité</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#2D2A26]">Sur Devis</div>
              <p className="text-xs text-[#999] mb-8 font-sans">Pour aller plus loin</p>

              <p className="text-sm text-[#6B6358] mb-8 leading-relaxed">
                Si vous voulez aller encore plus loin : gestion intégrale de vos avis Google, photos, et optimisation pour l'Intelligence Artificielle.
              </p>
              <div className="mt-auto">
                <button className="w-full py-3 border border-[#E6DCD3] bg-white text-[#2D2A26] rounded-lg text-sm font-medium hover:bg-[#F2EBE3] transition-colors">En discuter</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER & CTA FLOTTANT HUMAIN */}
      <footer className="py-12 bg-white text-center border-t border-[#F2EBE3]">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#F2EBE3] overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Indiana&background=C6A87C&color=fff" alt="Indiana" />
          </div>
        </div>
        <p className="text-[#2D2A26] font-serif font-medium text-lg mb-2">IndHack Nice</p>
        <p className="text-[#666] text-sm mb-8">Fait avec ❤️ à Nice par Indiana. Pas d'agence, juste de l'artisanat.</p>
        <p className="text-xs text-[#CCC]">06 61 13 97 48 • contact@indhack.com</p>
      </footer>

      {/* Flottant Humain */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#2D2A26] text-white pl-2 pr-6 py-2 rounded-full font-medium shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform border border-[#403B35]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#C6A87C] overflow-hidden border-2 border-white">
              <img src="https://ui-avatars.com/api/?name=Indiana&background=C6A87C&color=fff" alt="Indiana" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-[#C6A87C] uppercase tracking-wider font-bold">Un doute ?</span>
            <span className="block text-sm">On en parle 5 min ?</span>
          </div>
        </button>
      </div>

    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCF8]" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
