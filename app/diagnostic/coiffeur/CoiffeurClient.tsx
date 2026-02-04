'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Star, Users } from 'lucide-react'

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
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  return (
    <main className="min-h-screen bg-[#FDFCFB]">

      {/* ════════ HERO ════════ */}
      <section className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
          <div className="inline-flex items-center gap-2 bg-[#F5F0EB] rounded-full px-4 py-2 w-fit mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-[#8B7355] text-sm font-medium">Analyse pour {nom}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2A26] leading-[1.1] mb-8">
            Vos clientes<br />
            vous adorent.<br />
            <span className="font-semibold text-[#8B7355]">Google ne le sait pas.</span>
          </h1>

          <div className="space-y-6 text-[#5C5650] text-lg leading-relaxed mb-10 max-w-lg">
            <p>
              <strong className="text-[#2D2A26]">{note} étoiles</strong> et <strong className="text-[#2D2A26]">{avis} avis</strong> sur votre fiche Google.
              C'est la preuve que vous faites du bon travail.
            </p>
            <p>
              Le problème ? Quand une internaute cherche <strong className="text-[#2D2A26]">"balayage {ville}"</strong>,
              <strong className="text-[#2D2A26]"> "coloriste {ville}"</strong> ou <strong className="text-[#2D2A26]">"lissage brésilien {ville}"</strong> sur Google,
              elle ne tombe pas sur vous. Elle tombe sur vos concurrents.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-[#8B7355]">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-[#8B7355]" />
              <span>{note}/5 sur Google</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{avis} avis</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{ville}</span>
            </div>
          </div>
        </div>

        <div className="relative h-[50vh] lg:h-auto">
          <Image
            src="/images/nice-seo-hero.png"
            alt={`Salon de coiffure ${nom}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent lg:bg-gradient-to-r lg:from-[#FDFCFB] lg:via-transparent lg:to-transparent"></div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#F5F0EB]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Chaque mois à {ville}</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Des clientes cherchent un salon.<br />
              <span className="font-semibold">Elles ne vous trouvent pas.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-light text-[#2D2A26] mb-2">2 800</p>
              <p className="text-[#8B7355] text-sm">recherches <strong>"coiffeur {ville}"</strong></p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-light text-[#2D2A26] mb-2">320</p>
              <p className="text-[#8B7355] text-sm">recherches <strong>"lissage brésilien"</strong></p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-light text-[#2D2A26] mb-2">260</p>
              <p className="text-[#8B7355] text-sm">recherches <strong>"coloriste {ville}"</strong></p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-light text-[#2D2A26] mb-2">210</p>
              <p className="text-[#8B7355] text-sm">recherches <strong>"balayage {ville}"</strong></p>
            </div>
          </div>

          <p className="text-center text-[#5C5650] text-lg max-w-2xl mx-auto">
            Ces chiffres sont réels. <strong className="text-[#2D2A26]">Sans site internet, vous êtes invisible pour elles.</strong>
          </p>
        </div>
      </section>

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-white" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Tarifs indicatifs</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Des formules claires,<br />
              <span className="font-semibold">sans surprise</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#FDFCFB] rounded-3xl p-8 border border-[#E8E0D8]">
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-2">Site Vitrine</h3>
              <p className="text-[#8B7355] text-sm mb-6">Votre présence en ligne</p>
              <div className="mb-8">
                <p className="text-sm text-[#8B7355]">à partir de</p>
                <p className="text-4xl font-light text-[#2D2A26]">690€</p>
              </div>
            </div>

            <div className="bg-[#8B7355] text-white rounded-3xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#2D2A26] text-white text-xs font-semibold px-4 py-1.5 rounded-full">Recommandé</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 pt-2">Site + Visibilité</h3>
              <p className="text-white/70 text-sm mb-6">Être trouvée sur Google</p>
              <div className="mb-8">
                <p className="text-sm text-white/70">Tarif site +</p>
                <p className="text-4xl font-light">180€<span className="text-lg text-white/70">/mois</span></p>
              </div>
            </div>

            <div className="bg-[#FDFCFB] rounded-3xl p-8 border border-[#E8E0D8]">
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-2">Accompagnement Complet</h3>
              <p className="text-[#8B7355] text-sm mb-6">Visibilité maximale</p>
              <div className="mb-8">
                <p className="text-sm text-[#8B7355]">Tarif site +</p>
                <p className="text-4xl font-light text-[#2D2A26]">290€<span className="text-lg text-[#8B7355]">/mois</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES SEO - VILLES ════════ */}
      <section className="py-16 px-8 md:px-16 bg-[#F5F0EB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-light text-[#2D2A26] mb-2">
              Consultante SEO dans votre ville
            </h2>
            <p className="text-[#5C5650]">
              J'accompagne les salons de coiffure partout en France
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group bg-white hover:bg-[#8B7355]/10 rounded-xl p-4 text-center transition-all shadow-sm hover:shadow-md"
              >
                <MapPin className="w-5 h-5 text-[#8B7355]/50 group-hover:text-[#8B7355] mx-auto mb-2 transition-colors" />
                <span className="text-[#5C5650] group-hover:text-[#8B7355] font-medium text-sm transition-colors">
                  SEO {city.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/seo-local"
              className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#2D2A26] font-medium transition-colors"
            >
              Voir toutes mes zones d'intervention
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ LIENS INTERNES - SERVICES ════════ */}
      <section className="py-12 px-8 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-[#2D2A26] mb-2">Mes expertises</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/audit-seo" className="bg-[#FDFCFB] border border-[#E8E0D8] hover:border-[#8B7355] rounded-full px-5 py-2.5 text-sm text-[#5C5650] hover:text-[#8B7355] transition-all">
              Audit SEO
            </Link>
            <Link href="/referencement-naturel" className="bg-[#FDFCFB] border border-[#E8E0D8] hover:border-[#8B7355] rounded-full px-5 py-2.5 text-sm text-[#5C5650] hover:text-[#8B7355] transition-all">
              Référencement Naturel
            </Link>
            <Link href="/creation-site-web" className="bg-[#FDFCFB] border border-[#E8E0D8] hover:border-[#8B7355] rounded-full px-5 py-2.5 text-sm text-[#5C5650] hover:text-[#8B7355] transition-all">
              Création de Site Web
            </Link>
            <Link href="/seo-local" className="bg-[#FDFCFB] border border-[#E8E0D8] hover:border-[#8B7355] rounded-full px-5 py-2.5 text-sm text-[#5C5650] hover:text-[#8B7355] transition-all">
              SEO Local
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#8B7355]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">On en discute ?</h2>
          <p className="text-white/70 text-lg mb-10">
            30 minutes pour parler de <span className="text-white font-medium">{nom}</span> et voir ce qu'on peut faire ensemble.
          </p>
          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#2D2A26] px-8 py-4 rounded-full font-medium hover:bg-[#F5F0EB] transition-colors text-lg"
          >
            Réserver un appel gratuit
          </a>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70">
            <a href="tel:0661139748" className="hover:text-white transition-colors">06 61 13 97 48</a>
            <a href="mailto:contact@indhack.com" className="hover:text-white transition-colors">contact@indhack.com</a>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-8 px-6 bg-[#2D2A26]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
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

export default function CoiffeurClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCFB]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
