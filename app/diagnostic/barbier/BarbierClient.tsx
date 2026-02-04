'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'

// Villes pour les liens internes SEO
const FEATURED_CITIES = [
  { name: 'Nice', slug: 'seo-nice' },
  { name: 'Cannes', slug: 'seo-cannes' },
  { name: 'Antibes', slug: 'seo-antibes' },
  { name: 'Monaco', slug: 'seo-monaco' },
  { name: 'Marseille', slug: 'seo-marseille' },
  { name: 'Paris', slug: 'seo-paris' },
]

function DiagnosticContent() {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Barbershop'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  return (
    <main className="min-h-screen bg-[#1A1A1A]">

      {/* ════════ HERO ════════ */}
      <section className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
          <div className="inline-flex items-center gap-2 bg-[#2A2A2A] rounded-full px-4 py-2 w-fit mb-8">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span className="text-[#B8A68F] text-sm font-medium">Analyse pour {nom}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-8">
            Vos clients<br />
            vous adorent.<br />
            <span className="font-semibold text-[#C9A66B]">Google ne le sait pas.</span>
          </h1>

          <div className="space-y-6 text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-lg">
            <p>
              <strong className="text-white">{note} étoiles</strong> et <strong className="text-white">{avis} avis</strong> sur votre fiche Google.
              C'est la preuve que vous faites du bon travail.
            </p>
            <p>
              Le problème ? Quand un internaute cherche <strong className="text-white">"barbier {ville}"</strong>,
              <strong className="text-white"> "barber {ville}"</strong> ou <strong className="text-white">"coiffeur homme {ville}"</strong> sur Google,
              il ne tombe pas sur vous. Il tombe sur vos concurrents.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-[#B8A68F]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>{note}/5 sur Google</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{ville}</span>
            </div>
          </div>
        </div>

        <div className="relative h-[50vh] lg:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=85"
            alt={`Barbershop ${nom}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-[#1A1A1A] lg:via-transparent lg:to-transparent"></div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Chaque mois à {ville}</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Des clients cherchent un barbier.<br />
              <span className="font-semibold">Ils ne vous trouvent pas.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-16">
            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">1 900</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"barber {ville}"</strong></p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">1 000</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"barbier {ville}"</strong></p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">880</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"coiffeur homme"</strong></p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">260</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"coiffeur barbier"</strong></p>
            </div>
          </div>

          <p className="text-center text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Ces chiffres sont réels. <strong className="text-white">Sans site internet, vous êtes invisible pour eux.</strong>
          </p>
        </div>
      </section>

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#1A1A1A]" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Tarifs indicatifs</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Des formules claires,<br />
              <span className="font-semibold">sans surprise</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111111] rounded-3xl p-8 border border-[#2A2A2A]">
              <h3 className="text-xl font-semibold text-white mb-2">Site Vitrine</h3>
              <p className="text-[#B8A68F] text-sm mb-6">Votre présence en ligne</p>
              <div className="mb-8">
                <p className="text-sm text-[#B8A68F]">à partir de</p>
                <p className="text-4xl font-light text-white">690€</p>
              </div>
            </div>

            <div className="bg-[#C9A66B] text-[#1A1A1A] rounded-3xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-[#1A1A1A] text-xs font-semibold px-4 py-1.5 rounded-full">Recommandé</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 pt-2">Site + Visibilité</h3>
              <p className="text-[#3D3528] text-sm mb-6">Être trouvé sur Google</p>
              <div className="mb-8">
                <p className="text-sm text-[#3D3528]">Tarif site +</p>
                <p className="text-4xl font-light">180€<span className="text-lg text-[#3D3528]">/mois</span></p>
              </div>
            </div>

            <div className="bg-[#111111] rounded-3xl p-8 border border-[#2A2A2A]">
              <h3 className="text-xl font-semibold text-white mb-2">Accompagnement Complet</h3>
              <p className="text-[#B8A68F] text-sm mb-6">Visibilité maximale</p>
              <div className="mb-8">
                <p className="text-sm text-[#B8A68F]">Tarif site +</p>
                <p className="text-4xl font-light text-white">290€<span className="text-lg text-[#B8A68F]">/mois</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES SEO - VILLES ════════ */}
      <section className="py-16 px-8 md:px-16 bg-[#111111] border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-light text-white mb-2">
              Consultante SEO dans votre ville
            </h2>
            <p className="text-[#A0A0A0]">
              J'accompagne les barbiers partout en France
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group bg-[#1A1A1A] hover:bg-[#C9A66B]/10 rounded-xl p-4 text-center transition-all border border-[#2A2A2A] hover:border-[#C9A66B]/30"
              >
                <MapPin className="w-5 h-5 text-[#A0A0A0] group-hover:text-[#C9A66B] mx-auto mb-2 transition-colors" />
                <span className="text-[#A0A0A0] group-hover:text-[#C9A66B] font-medium text-sm transition-colors">
                  SEO {city.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/seo-local"
              className="inline-flex items-center gap-2 text-[#C9A66B] hover:text-white font-medium transition-colors"
            >
              Voir toutes mes zones d'intervention
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES - SERVICES ════════ */}
      <section className="py-12 px-8 md:px-16 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-white mb-2">Mes expertises</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/audit-seo" className="bg-[#111111] border border-[#2A2A2A] hover:border-[#C9A66B] rounded-full px-5 py-2.5 text-sm text-[#A0A0A0] hover:text-[#C9A66B] transition-all">
              Audit SEO
            </Link>
            <Link href="/referencement-naturel" className="bg-[#111111] border border-[#2A2A2A] hover:border-[#C9A66B] rounded-full px-5 py-2.5 text-sm text-[#A0A0A0] hover:text-[#C9A66B] transition-all">
              Référencement Naturel
            </Link>
            <Link href="/creation-site-web" className="bg-[#111111] border border-[#2A2A2A] hover:border-[#C9A66B] rounded-full px-5 py-2.5 text-sm text-[#A0A0A0] hover:text-[#C9A66B] transition-all">
              Création de Site Web
            </Link>
            <Link href="/seo-local" className="bg-[#111111] border border-[#2A2A2A] hover:border-[#C9A66B] rounded-full px-5 py-2.5 text-sm text-[#A0A0A0] hover:text-[#C9A66B] transition-all">
              SEO Local
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#C9A66B]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] mb-6">On en discute ?</h2>
          <p className="text-[#3D3528] text-lg mb-10">
            30 minutes pour parler de <span className="text-[#1A1A1A] font-medium">{nom}</span> et voir ce qu'on peut faire ensemble.
          </p>
          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors text-lg"
          >
            Réserver un appel gratuit
          </a>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#3D3528]">
            <a href="tel:0661139748" className="hover:text-[#1A1A1A] transition-colors">06 61 13 97 48</a>
            <a href="mailto:contact@indhack.com" className="hover:text-[#1A1A1A] transition-colors">contact@indhack.com</a>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-8 px-6 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A0A0A0]">
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

export default function BarbierClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
