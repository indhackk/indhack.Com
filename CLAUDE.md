# CLAUDE.md — IndHack

## Projet

IndHack est le site vitrine d'Indiana Aflalo, consultante SEO freelance basée à Nice (06). Le site sert à :
1. Générer des leads via le référencement naturel (SEO local + informationnel)
2. Montrer l'expertise technique et stratégique d'Indiana
3. Convertir les visiteurs en demandes d'audit gratuit / prise de contact

**URL production** : https://indhack.com
**Stack** : Next.js 14.2 + Vercel
**Hébergement** : Vercel (auto-deploy depuis Git)

## Identité

- **Nom** : IndHack (toujours en camelCase dans les textes marketing — pas INDHACK en full caps, pas Indhack, pas indhack. `indhack` en lowercase uniquement dans le code/URLs)
- **Fondatrice** : Indiana Aflalo
- **Titre** : Consultante SEO & Stratégie Digitale
- **Localisation** : Nice, France (département 06, région PACA / Côte d'Azur)
- **Téléphone** : 06 61 13 97 48
- **Email** : contact@indhack.com
- **Positionnement** : SEO technique + IA (GEO — Generative Engine Optimization) pour PME et commerces locaux du 06 et au-delà

## Build & Development Commands

```bash
npm run dev          # Local development server (localhost:3000)
npm run build        # Production build (always verify after editing)
npm run lint         # ESLint check
npm run postbuild    # Auto-generate sitemaps (runs automatically after build)
git push origin main # Deploy (auto via Vercel)
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14.2 (App Router, Server/Client Components)
- **Styling**: Tailwind CSS with custom color palette (sage green theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Keystatic (headless, file-based at `/keystatic`)
- **3D**: Three.js (BrainCanvas component)
- **Fonts**: Space Grotesk (headings), Inter (body)

### Key Patterns

**Component Architecture**:
- Server components by default in `page.tsx` files
- `"use client"` directive at top of interactive components
- Separate client components (e.g., `ReferencementClient.tsx`) imported by server pages

**SEO Structure (Semantic Cocoon)**:
- **Mère (Mother)**: City hubs → `/consultant-seo-{ville}/`
- **Fille (Daughter)**: Sub-services → `/consultant-seo-{ville}/audit-technique/`
- **Petite-fille (Granddaughter)**: Blog posts linking upward with optimized anchors

### Key File Paths

| Purpose | Path |
|---------|------|
| City data (19 cities) | `/lib/cities-data.ts` |
| Diagnostic professions | `/lib/diagnostic-data.ts` |
| City hub template | `/components/CityPageTemplateV2.tsx` |
| Sub-service template | `/components/CityServiceTemplate.tsx` |
| Route protection | `/middleware.ts` |

## Architecture du site

### Pages locales (SEO local)
Pattern URL : `/consultant-seo-{ville}`
Villes couvertes : Nice, Cannes, Antibes, Sophia-Antipolis, Monaco, Marseille, Aix-en-Provence, Montpellier, Grenoble, Lyon, Paris, Bordeaux, Toulouse, Nantes, Lille, Strasbourg, Rennes, et autres.

**RÈGLE CRITIQUE** : Chaque page locale DOIT avoir du contenu unique. JAMAIS de template copié-collé avec juste le nom de ville qui change. Chaque page doit mentionner :
- Les spécificités économiques de la ville (secteurs dominants, entreprises connues)
- Les quartiers / zones d'activité pertinentes
- Les villes limitrophes (maillage géographique)
- Un angle unique (ex: Sophia = startups tech, Cannes = luxe/événementiel, Antibes = tourisme/commerce)

### Pages services
- `/audit-seo` — Audit SEO technique
- `/creation-site-web` — Création de sites
- `/refonte-site-web` — Refonte SEO-safe
- `/seo-local` — Référencement local

### Blog
Pattern URL : `/blog/{slug}`
Le blog sert à ranker sur des requêtes informationnelles et démontrer l'expertise.

### Outils
Pattern URL : `/outils/{slug}`
Micro-outils SEO intégrés au site pour générer des backlinks et capturer des leads.

## Règles SEO — À TOUJOURS RESPECTER

### Structure HTML
- UNE SEULE balise `<h1>` par page
- Hiérarchie stricte : h1 > h2 > h3 (jamais sauter un niveau)
- Chaque image DOIT avoir un attribut `alt` descriptif
- Les liens internes doivent avoir des ancres descriptives (jamais "cliquez ici")

### Meta tags
- Chaque page DOIT avoir un `<title>` unique (50-60 caractères)
- Chaque page DOIT avoir une `<meta description>` unique (150-160 caractères)
- Ne JAMAIS dupliquer un title ou une meta description

### Schema markup (JSON-LD)
Chaque page locale doit inclure le schema `ProfessionalService` ou `LocalBusiness`.
Les articles de blog doivent inclure le schema `Article` ou `BlogPosting`.
Les pages FAQ doivent inclure le schema `FAQPage`.

### Maillage interne
- Chaque page locale → 2-3 pages villes géographiquement proches
- Chaque page locale → `/audit-seo` ou `/creation-site-web`
- Articles blog → pages services correspondantes + `/contact`
- Homepage → pages villes Côte d'Azur en priorité (Nice, Cannes, Antibes, Sophia)

### Performance
- Images via `next/image` (lazy loading + WebP automatique)
- Viser un score Lighthouse > 90
- Server Components par défaut

### URLs
- Toujours en lowercase
- Tirets (-) comme séparateurs
- Pas de trailing slash
- Pas d'accents

## Données Search Console (janv-fév 2026)

### Métriques globales
- 655 impressions, 24 clics, CTR 3.66%, position moyenne ~55
- Tendance : croissance exponentielle (39/sem → 349/sem)

### Pages prioritaires à optimiser

| Page | Impressions | Position | Priorité |
|------|------------|----------|----------|
| `/blog/contenu-rapport-audit-seo` | 147 | 55.8 | 🔴 P1 |
| `/consultant-seo-sophia-antipolis` | 42 | 50.1 | 🔴 P2 |
| `/consultant-seo-cannes` | 33 | 53.8 | 🟡 P3 |
| `/consultant-seo-antibes` | 28 | 59.2 | 🟡 P4 |

### Quick wins (proches du top 10)
- "pilier technique seo sophia antipolis" → position 9
- "checklist seo refonte site" → position 14
- "extraire mots clés d'un texte" → position 14

## Concurrence locale (Nice / Côte d'Azur)

- L'Anthracite, Florian Zorgnotti, Frédéric Kabouche, Bilkher Diakhaté, AdPremier, CKC-NET, Jean SEO

**Notre avantage** : expertise GEO (Generative Engine Optimization) — optimisation pour les réponses IA.

## Style de rédaction

- Ton : professionnel mais accessible
- VOUVOIEMENT systématique
- Pas de superlatifs creux
- Données concrètes plutôt que promesses vagues
- Phrases courtes et percutantes

## Conventions de code

- **Langue du code** : anglais
- **Langue du contenu** : français
- **Composants** : PascalCase
- **Commits** : anglais, format conventionnel (`feat:`, `fix:`, `content:`)

## Ce qu'il ne faut JAMAIS faire

- ❌ Dupliquer du contenu entre pages locales
- ❌ Créer des pages sans meta title/description uniques
- ❌ Utiliser des images sans alt
- ❌ Casser des URLs existantes sans redirection 301
- ❌ Supprimer des pages qui ont des impressions dans la Search Console

## TODO actuel (par priorité)

1. **P1** : Enrichir `/blog/contenu-rapport-audit-seo` — viser 2500+ mots, schema FAQ
2. **P2** : Enrichir `/consultant-seo-sophia-antipolis` — contenu unique technopole, 1500+ mots
3. **P3** : Enrichir `/consultant-seo-cannes` et `/consultant-seo-antibes` — contenu unique
4. **P4** : Créer article `/blog/checklist-seo-refonte-site` (quick win position 14)
5. **P5** : Renforcer le maillage interne
6. **P6** : Vérifier schemas JSON-LD
7. **P7** : Auditer alt text images
