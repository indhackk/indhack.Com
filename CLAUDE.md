# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun install          # Install dependencies (prefer bun over npm)
bun run dev          # Local development server (localhost:3000)
bun run build        # Production build (always verify after editing)
bun run lint         # ESLint check
bun run postbuild    # Auto-generate sitemaps (runs automatically after build)
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14.2 (App Router, Server/Client Components)
- **Styling**: Tailwind CSS with custom color palette (sage green theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Keystatic (headless, file-based at `/keystatic`)
- **3D**: Three.js (BrainCanvas component)

### Key Patterns

**Component Architecture**:
- Server components by default in `page.tsx` files
- `"use client"` directive at top of interactive components
- Separate client components (e.g., `ReferencementClient.tsx`) imported by server pages

**SEO Structure (Semantic Cocoon)**:
- **Mère (Mother)**: City hubs → `/seo-strasbourg/` (use `CityPageTemplateV2`)
- **Fille (Daughter)**: Sub-services → `/seo-strasbourg/audit-technique/` (use `CityServiceTemplate`)
- **Petite-fille (Granddaughter)**: Blog posts linking upward with optimized anchors

**City Pages**:
- All city data in `/lib/cities-data.ts` (FRENCH_CITIES array with coordinates, images, descriptions)
- Service data for sub-pages in CITY_SERVICES object (same file)
- Helper functions: `getCityBySlug()`, `getAllCitySlugs()`, `getCitiesByRegion()`
- JSON-LD LocalBusiness schema embedded per page

**Keystatic CMS** (`keystatic.config.ts`):
- Collections: posts, pages, cities, cityServices, services
- Singletons: settings, homepage, navigation
- Content stored in `/content/` directory

**GMB Autopilot SaaS** (`/(gmb-app)/` route group):
- Isolated layout with separate navbar/footer via `ConditionalLayout.tsx`
- State management: Zustand store at `/lib/gmb/use-gmb-store.ts`
- AI engines: `/lib/gmb/sentiment-engine.ts`, `/lib/gmb/seo-score-engine.ts`, `/lib/gmb/ai-response-generator.ts`
- Dashboard views: reviews, responses, analytics, posts, settings

**Diagnostic Lead Pages** (`/diagnostic/[metier]/`):
- Dynamic profession-specific landing pages (avocat, coiffeur, electricien, etc.)
- Data layer: `/lib/diagnostic-data.ts` (keyword volumes, client questions, ROI data)
- Components: `ProspectLandingTemplate`, `ROICalculator`, `DiagnosticScore`, `InvestmentValue`

### Styling

```
Custom colors (tailwind.config.js):
- fond-sombre (#394843), fond-clair (#FAFBFA) - backgrounds
- sauge (#638576) - primary green accent
- ink (#2A3830) - dark text

Fonts:
- Space Grotesk (font-heading)
- IBM Plex Sans (font-body, font-sans)
```

**Layout Strategy**:
- Main site, GMB SaaS, and Keystatic have separate layouts
- `ConditionalLayout.tsx` switches navbar/footer based on route path
- GMB routes: `/(gmb-app)/app/*` get isolated SaaS UI

### Security

- Rate limiting: 100 req/min per IP (`middleware.ts`)
- Admin routes protected via ADMIN_PASSWORD env var: `/keystatic/*`, `/dashboard/*`
- CSP, HSTS, X-Frame-Options in `next.config.mjs`
- WordPress redirect cleanup (301s for legacy URLs)

### Key File Paths

| Purpose | Path |
|---------|------|
| City data (19 cities) | `/lib/cities-data.ts` |
| Diagnostic professions | `/lib/diagnostic-data.ts` |
| City hub template | `/components/CityPageTemplateV2.tsx` |
| Sub-service template | `/components/CityServiceTemplate.tsx` |
| GMB state store | `/lib/gmb/use-gmb-store.ts` |
| Route protection | `/middleware.ts` |

## Strategic Objectives

### CRITICAL: Semantic Cocoon
- Mère > Fille > Petite-fille hierarchy for SEO siloing
- Mère: `/seo-[city]/` (19 French cities)
- Fille: `/seo-[city]/audit-technique/` (sub-services per city)
- Internal links must flow upward with optimized anchors

### HIGH: Technical Supremacy
- Target: 100/100 Lighthouse scores
- Fix hydration errors, unused imports, heavy client bundles

## Custom Commands

| Command | Description |
|---------|-------------|
| `/audit` | Full recursive scan of /app and /components. List files violating Semantic Cocoon or with <95 Performance score |
| `/autofix` | Execute fixes for linting, types, and dead code WITHOUT asking for confirmation |
| `/cocoon` | Map internal links. Propose JSON structure for ideal "Siloing" based on target keywords |

## Rules

1. **NEVER break the build** - Always verify `bun run build` after editing
2. **Use bun** for package management
3. **Tailwind CSS only** - No CSS modules or styled-components
4. **Voice**: Interactive, Agentic, Proactive - Don't ask "how should I do this?", ask "I plan to do X, Y, Z to fix this, proceed?"
