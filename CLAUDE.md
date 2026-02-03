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
- **CMS**: Keystatic (headless, file-based)
- **3D**: Three.js (BrainCanvas component)

### Directory Structure

```
/app                          # Next.js App Router pages
├── api/                      # API routes (contact, audit, auth)
├── diagnostic/[metier]/      # Dynamic prospect landing pages
├── seo-[city]/               # 20+ geographic service pages
│   └── audit-technique/      # Sub-service pages (fille level)
├── blog/                     # Blog with dynamic slugs
└── keystatic/                # CMS admin panel

/components
├── diagnostic/               # Prospect/sales page components
├── ui/                       # Base UI primitives
├── sections/                 # Large reusable sections
├── templates/                # Page templates (CityPageTemplateV2)
└── gmb-autopilot/            # Google My Business dashboard

/lib
├── cities-data.ts            # French cities data (coordinates, zip codes)
├── gmb/                      # GMB automation engine
└── validation.ts             # Form validation schemas

/content                      # Keystatic-managed content
├── blog/                     # Blog posts (MDX)
└── services/                 # Service descriptions
```

### Key Patterns

**Component Architecture**:
- Server components by default in `page.tsx` files
- `"use client"` directive at top of interactive components
- Separate client components (e.g., `ReferencementClient.tsx`) imported by server pages

**SEO Structure (Semantic Cocoon)**:
- **Mère (Mother)**: Service hubs → `/seo-strasbourg/`
- **Fille (Daughter)**: Sub-services → `/seo-strasbourg/audit-technique/`
- **Petite-fille (Granddaughter)**: Blog posts linking upward with optimized anchors

**Data Flow**:
- City data centralized in `/lib/cities-data.ts`
- Geographic pages use `CityPageTemplateV2` for consistency
- JSON-LD schemas (LocalBusiness, Organization) embedded per page

### Styling Conventions

```
Colors:
- fond-sombre, fond-clair (background)
- texte-clair (text)
- sauge (primary green accent)
- ink (dark text)

Fonts:
- Space Grotesk (headings)
- IBM Plex Sans (body)
```

Design: "Dark Premium", "Glassmorphism", "Dynamic"

### Security & Middleware

- Rate limiting: 100 req/min per IP (middleware.ts)
- Admin routes protected: `/keystatic/*`, `/dashboard/*`, `/api/*`
- CSP headers, HSTS, X-Frame-Options configured in next.config.mjs

## Strategic Objectives

### CRITICAL: Semantic Domination (The "Cocoon")
- Structure content using Cluster strategy (Mère > Fille > Petite-fille)
- Mère: High-volume service hubs (e.g., `/services/seo-strasbourg`)
- Fille: Specific sub-niches (e.g., `/services/seo-strasbourg/audit-technique`)
- Petite-fille: Blog posts linking upwards with optimized anchor text
- **BENCHMARKS**: Outperform Eskimoz (structure) and Primelis (technical SEO)

### HIGH: Technical Supremacy
- Target: 100/100 Lighthouse scores everywhere
- Aggressively refactor hydration errors, unused imports, heavy client-side bundles

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
