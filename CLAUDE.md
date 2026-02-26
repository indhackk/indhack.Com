# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Deploy
npm run build        # Build for production (runs sitemap + indexing automatically)
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Google Indexing (requires .env.local credentials)
npm run index          # Smart indexing - submit changed pages
npm run index:status   # Check indexing status
npm run index:priority # Priority indexing for important pages
npm run index:force    # Force reindex all pages via Google API
npm run turbo          # Turbo indexing via IndexNow
npm run turbo:all      # Force reindex all pages via IndexNow
```

**Important**: Always run `npm run build` after modifications to verify no errors.

---

## Stack & Architecture

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router, SSG) |
| Styling | Tailwind CSS + custom sage palette |
| Animations | Framer Motion |
| CMS | Keystatic |
| Blog | Markdown + gray-matter |
| Deployment | Vercel |
| Indexing | Google Indexing API + IndexNow |

**~120 pages** générées en SSG au build.

---

## Directory Structure

```
app/                              # Next.js App Router
├── page.tsx                      # Homepage
├── layout.tsx                    # Root layout (fonts, analytics, schemas)
├── globals.css                   # Tailwind + global styles
├── blog/
│   ├── page.tsx                  # Blog listing
│   └── [slug]/page.tsx           # Dynamic blog posts
├── outils/                       # 8 SEO tools
│   ├── audit-seo-gratuit/
│   ├── testeur-visibilite-ia/
│   ├── simulateur-visibilite-locale/
│   ├── generateur-robots-txt/
│   ├── generateur-schema-json-ld/
│   ├── extracteur-mots-cles/
│   └── gmb-autopilot/
├── consultant-seo-[ville]/       # 19 city pages
├── diagnostic/[metier]/          # Dynamic profession diagnostics
└── api/                          # 16 API routes

components/                       # 36+ React components
├── NavbarOptimized.tsx           # Main navigation
├── MegaFooter.tsx                # Footer with internal links
├── Breadcrumb.tsx                # Breadcrumb + JSON-LD
├── ContactForm.tsx               # Contact form
├── FAQ.tsx + FAQSchema.tsx       # FAQ with schema
├── templates/
│   ├── CityPageTemplateV2.tsx    # City page template
│   └── CityServiceTemplate.tsx   # City service template
├── seo/
│   └── JsonLdSchemas.tsx         # All JSON-LD schemas
├── sections/                     # Homepage sections
├── blog/                         # Blog-specific components
├── diagnostic/                   # Diagnostic components
└── ui/                           # shadcn/ui components

content/
└── blog/                         # 21 Markdown articles (.md)

lib/
├── blog.ts                       # Blog parsing (getAllPosts, getPostBySlug)
├── cities-data.ts                # 19 cities data (91KB)
├── city-neighbors.ts             # City proximity for internal linking
├── diagnostic-data.ts            # Profession diagnostics (57KB)
├── validation.ts                 # Form validation
├── cookies.ts                    # Cookie utilities
└── utils.ts                      # General utilities

scripts/                          # 39 automation scripts
├── smart-indexing.js             # Google Indexing API
├── turbo-indexing.js             # IndexNow protocol
├── optimize-blog-images.mjs      # Image optimization
├── generate-city-pages.js        # City content generator
└── analyze-gmb-flaws.mjs         # GMB analysis

data/
├── gmb-study-cote-azur-2026.json # GMB study data
└── gmb-study-key-stats.json      # GMB statistics
```

---

## Key Patterns

### Page Structure
```
app/[page-name]/
├── page.tsx              # Server Component (metadata, data fetching)
└── [Name]Client.tsx      # Client Component (interactivity, hooks)
```

### Blog Posts
Markdown in `content/blog/` with frontmatter:
```yaml
title: string           # 50-60 chars
description: string     # 140-155 chars
date: string            # ISO format
category: string
image: string           # /images/blog/...
author: string
keywords: [array]
draft: boolean          # Optional, filters out if true
```

### City Pages
Static pages from `lib/cities-data.ts`. Each city has: name, slug, zipCode, population, description, keyPoints, images, context. Neighboring cities linked via `lib/city-neighbors.ts`.

### JSON-LD Schemas
Injected via components (never in markdown):
- Organization (global)
- BlogPosting (articles)
- LocalBusiness/ProfessionalService (cities)
- FAQPage (FAQ sections)
- BreadcrumbList (navigation)

---

## Design Tokens

### Fonts (tailwind.config.js)

| Token | Font | Usage |
|-------|------|-------|
| `heading` | Space Grotesk | H1, H2, H3, H4 |
| `body` / `sans` | Inter | Body text |

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `sauge` | #2E5E4E | Primary brand, links, CTAs |
| `sauge-light` | #8FBFAA | Light variant (dark backgrounds) |
| `ink` | #2A3830 | Main text |
| `soft` | #3D4D46 | Secondary text |
| `line` | #E4EBE7 | Borders |
| `accent` | #D4A853 | Gold CTA buttons |
| `accent-hover` | #C49A47 | Hover state |
| `fond-sombre` | #394843 | Dark backgrounds |
| `fond-clair` | #FAFBFA | Light backgrounds |

---

## URL Structure

```
/                              → Homepage
/consultant-seo                → Page mère Expertise
/audit-seo                     → Service
/referencement-naturel         → Service
/seo-local                     → Page mère SEO local
/creation-site-web             → Service
/refonte-site-web              → Service
/creation-boutique-en-ligne    → Service
/consultant-seo-[ville]        → 19 city pages (Nice, Paris, Lyon, etc.)
/outils                        → Page mère Outils
/outils/[slug]                 → 8 tools
/blog                          → Blog listing
/blog/[slug]                   → 21 articles
/diagnostic/[metier]           → Profession diagnostics
/a-propos                      → About
/contact                       → Contact
/faq                           → FAQ
/etudes-de-cas                 → Case studies
/mentions-legales              → Legal
/confidentialite               → Privacy
/cgv                           → Terms
```

---

## Règles typographiques françaises (OBLIGATOIRE)

### Majuscules dans les titres

En français, on ne met PAS de majuscule à chaque mot.

**Règle** : majuscule uniquement au premier mot + noms propres.

```
❌ "Comment Voler Les Clients De Vos Concurrents Sur Google Maps"
✅ "Comment voler les clients de vos concurrents sur Google Maps"

❌ "Le Vrai Coût D'un Site Mal Conçu"
✅ "Le vrai coût d'un site mal conçu"
```

S'applique à : H1-H4, `<title>`, `og:title`, ancres, breadcrumbs.

### Autres règles

- Espace insécable avant : ; ! ? » et après «
- Guillemets français « » (pas "")
- Nombres : 1 000, 10 000 (espace séparateur)
- Pourcentages : 53 % (avec espace)

---

## Architecture SEO : cocon sémantique

```
HOMEPAGE (/)
├── PAGE MÈRE : /consultant-seo
│   └── /audit-seo, /referencement-naturel
├── PAGE MÈRE : /seo-local
│   └── /consultant-seo-nice, /consultant-seo-paris... (19 villes)
├── PAGE MÈRE : /creation-site-web
│   └── /refonte-site-web, /creation-boutique-en-ligne
├── PAGE MÈRE : /outils
│   └── 8 outils
├── PAGE MÈRE : /blog
│   └── 21 articles
└── Support : /a-propos, /contact, /faq, /mentions-legales
```

| Type | Rôle SEO |
|------|----------|
| Homepage | Distribue le jus vers les pages mères |
| Page mère | Concentre l'autorité sur un thème |
| Page fille | Cible un mot-clé longue-traîne |
| Article blog | Trafic informationnel, liens vers services |
| Outil | Lead magnet, backlinks |

---

## Maillage interne — RÈGLES D'OR

### Principes

1. Chaque page fille DOIT lier vers sa page mère (et inversement)
2. Les pages sœurs se lient entre elles
3. Les articles DOIVENT lier vers services ET outils
4. JAMAIS de lien orphelin (minimum 3 liens internes reçus)

### Article de blog → minimum 7-10 liens :

| Destination | Minimum |
|-------------|---------|
| Page service liée | 1-2 |
| Outils pertinents | 1-2 |
| Autres articles EXISTANTS | 2-3 |
| /contact ou CTA | 1 |

### Page ville → DOIT contenir :

| Destination | Minimum |
|-------------|---------|
| /seo-local (page mère) | 1 |
| /consultant-seo | 1 |
| Villes voisines | 2-3 |
| Articles blog SEO local | 2-3 |
| Outils | 1-2 |

### Règles des ancres

```
❌ "Cliquez ici", "En savoir plus"
✅ "notre outil d'audit SEO gratuit"
✅ "guide complet Google Business Profile"
```

### INTERDIT

- Liens vers pages qui N'EXISTENT PAS (vérifier les slugs)
- Article avec moins de 5 liens internes
- Article sans lien vers outil ET autre article

---

## Standards de contenu blog

### Structure obligatoire

1. Title tag (50-60 car., mot-clé en début)
2. Meta description (140-155 car.)
3. H1 (différent du title)
4. Chapô (1-2 phrases, italique, bordure gauche)
5. Image hero (WebP, alt descriptif)
6. Sommaire (liens d'ancrage vers H2)
7. Corps avec H2 > H3 > H4
8. Liens internes (7-10 minimum)
9. FAQ avec schema FAQPage (3-6 questions)
10. Section "Articles complémentaires" (3 articles EXISTANTS)

### Longueur minimale

| Type | Minimum | Idéal |
|------|---------|-------|
| Informationnel | 2 000 | 2 500-3 000 |
| Guide complet | 3 000 | 4 000-5 000 |
| Comparatif | 2 500 | 3 000-4 000 |
| Local | 1 500 | 2 000-2 500 |

### JSON-LD (géré par composants, PAS dans markdown)

- BlogPosting/Article
- FAQPage (si FAQ présente)
- BreadcrumbList (UN SEUL, pas de doublon)

---

## SEO technique

### Core Web Vitals — Objectifs

| Métrique | Objectif |
|----------|----------|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | 0 |
| PageSpeed Mobile | 90+ |

### Images

- Format WebP uniquement
- Toujours `width`, `height`, `alt`
- Hero : `priority={true}`
- Corps : `loading="lazy"`

### Redirections

**77 redirections 301** configurées dans `next.config.mjs` :
- Cleanup WordPress (/wp-admin, /wp-login.php, /feed)
- Standardisation URLs villes (/seo-[city] → /consultant-seo-[city])
- Redirections villes supprimées (Dijon → Lyon, Toulon → Marseille)

---

## GEO — Generative Engine Optimization

### Optimisations pour les IA (ChatGPT, Perplexity, Claude)

- Répondre à des questions précises (format Q&R)
- Citer des sources avec données chiffrées
- Ton d'expert, première personne, cas concrets
- Schema JSON-LD riche
- dateModified toujours à jour
- Contenu E-E-A-T

### Outil dédié

`/outils/testeur-visibilite-ia` — teste la visibilité par 8 crawlers IA.
Toujours lier vers cet outil quand on parle de GEO.

---

## Mapping thématique des liens

| Type d'article | DOIT lier vers |
|----------------|---------------|
| SEO local / Google Maps | /seo-local, /outils/simulateur-visibilite-locale, /outils/audit-seo-gratuit |
| GBP | /seo-local, /outils/simulateur-visibilite-locale |
| Performance web | /creation-site-web, /refonte-site-web, /outils/audit-seo-gratuit |
| GEO / IA | /outils/testeur-visibilite-ia, /referencement-naturel, /outils/generateur-robots-txt |
| Audit SEO | /audit-seo, /outils/audit-seo-gratuit |
| Création site | /creation-site-web, /refonte-site-web |

---

## Checklist avant déploiement

### Nouvel article

- [ ] Title ≤ 60 car., mot-clé en début
- [ ] Meta description 140-155 car.
- [ ] H1 différent du title
- [ ] Image hero WebP avec alt
- [ ] Minimum 2 000 mots
- [ ] 7+ liens internes (services, outils, articles EXISTANTS)
- [ ] AUCUN lien vers URL inexistante
- [ ] FAQ avec schema (3-6 questions)
- [ ] Section "Articles complémentaires" (3 articles EXISTANTS)
- [ ] Typo française respectée
- [ ] `npm run build` passe sans erreur

### Modification

- [ ] Liens ajoutés pointent vers pages existantes
- [ ] Ancres contiennent mots-clés pertinents
- [ ] `npm run build` passe sans erreur

---

## Rappels critiques

1. **TOUJOURS vérifier qu'un slug existe avant de créer un lien**
2. **TOUJOURS respecter les majuscules françaises**
3. **JAMAIS de JSON-LD en texte brut dans le markdown**
4. **JAMAIS de BreadcrumbList en double**
5. **JAMAIS d'article sans liens vers outils ET autres articles**
6. **TOUJOURS `npm run build` après modification**
7. **Minimum 2 000 mots par article**
8. **PageSpeed mobile ≥ 90**
