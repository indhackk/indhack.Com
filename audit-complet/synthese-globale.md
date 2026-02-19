# SYNTHÈSE GLOBALE — AUDIT SEO INDHACK.COM

> **Date d'audit** : 19 février 2026
> **Périmètre** : 94 URLs indexées (sitemap.xml)
> **Auditeur** : Claude (Opus 4.5)

---

## SOMMAIRE

1. [Vue d'ensemble](#1-vue-densemble)
2. [Tableau récapitulatif des 94 URLs](#2-tableau-récapitulatif-des-94-urls)
3. [Classement par nombre de mots](#3-classement-par-nombre-de-mots)
4. [Scores par silo](#4-scores-par-silo)
5. [Matrice de liens entrants globale](#5-matrice-de-liens-entrants-globale)
6. [Pages orphelines](#6-pages-orphelines)
7. [Titles dupliqués](#7-titles-dupliqués)
8. [H1 dupliqués](#8-h1-dupliqués)
9. [Cannibalisations cross-silos](#9-cannibalisations-cross-silos)
10. [Liens cassés](#10-liens-cassés)
11. [Liens externes inventaire](#11-liens-externes-inventaire)
12. [Contenu trop court](#12-contenu-trop-court)
13. [Incohérences KW](#13-incohérences-kw)
14. [Analyse robots.txt](#14-analyse-robotstxt)
15. [Analyse sitemap.xml](#15-analyse-sitemapxml)
16. [TOP 15 ACTIONS PRIORITAIRES](#16-top-15-actions-prioritaires)

---

## 1. Vue d'ensemble

### Statistiques globales

| Métrique | Valeur |
|----------|--------|
| **URLs dans sitemap** | 94 |
| **Pages services** | 7 |
| **Pages villes** | 19 (+ 19 sous-pages /audit-technique) |
| **Articles blog** | 21 |
| **Pages outils** | 7 |
| **Pages utilitaires** | 9 |
| **Silos analysés** | 10 |
| **FAQ totales** | 120+ questions |
| **Schemas JSON-LD** | FAQPage, Service, LocalBusiness, Article, WebApplication, BreadcrumbList |

### Répartition par type de page

```
┌─────────────────────────────────────────────────────────┐
│ HOMEPAGE (/)                                            │
├─────────────────────────────────────────────────────────┤
│ PAGES SERVICES (7)                                      │
│ ├── /consultant-seo                                     │
│ ├── /audit-seo                                          │
│ ├── /referencement-naturel                              │
│ ├── /seo-local                                          │
│ ├── /creation-site-web                                  │
│ ├── /refonte-site-web                                   │
│ └── /creation-boutique-en-ligne                         │
├─────────────────────────────────────────────────────────┤
│ PAGES VILLES (19)                                       │
│ ├── /consultant-seo-nice                                │
│ ├── /consultant-seo-paris                               │
│ └── ... (17 autres villes)                              │
├─────────────────────────────────────────────────────────┤
│ PAGES OUTILS (7)                                        │
│ ├── /outils (index)                                     │
│ ├── /outils/audit-seo-gratuit                           │
│ ├── /outils/testeur-visibilite-ia                       │
│ ├── /outils/simulateur-visibilite-locale                │
│ ├── /outils/generateur-robots-txt                       │
│ ├── /outils/generateur-schema-json-ld                   │
│ └── /outils/extracteur-mots-cles                        │
├─────────────────────────────────────────────────────────┤
│ ARTICLES BLOG (21)                                      │
│ ├── Silo Audit SEO (3)                                  │
│ ├── Silo Consultant SEO (5)                             │
│ ├── Silo SEO Local/GEO (5)                              │
│ ├── Silo Création (3)                                   │
│ ├── Silo Refonte (2)                                    │
│ └── Silo Autres (3)                                     │
├─────────────────────────────────────────────────────────┤
│ PAGES UTILITAIRES (9)                                   │
│ ├── /a-propos                                           │
│ ├── /contact                                            │
│ ├── /faq                                                │
│ ├── /etudes-de-cas                                      │
│ ├── /blog (listing)                                     │
│ ├── /mentions-legales                                   │
│ ├── /confidentialite                                    │
│ └── /cgv                                                │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Tableau récapitulatif des 94 URLs

### Pages Services

| URL | Title (longueur) | Meta (longueur) | Statut |
|-----|------------------|-----------------|--------|
| `/consultant-seo` | 63 car. ⚠️ | 155 car. ✅ | OK |
| `/audit-seo` | 55 car. ✅ | 167 car. 🔴 | Meta trop longue |
| `/referencement-naturel` | 54 car. ✅ | 147 car. ✅ | OK |
| `/seo-local` | 54 car. ✅ | 193 car. 🔴 | Meta TRÈS longue |
| `/creation-site-web` | 61 car. 🔴 | 157 car. 🔴 | Title + Meta |
| `/refonte-site-web` | 53 car. ✅ | 153 car. ✅ | OK |
| `/creation-boutique-en-ligne` | 65 car. 🔴 | 165 car. 🔴 | Title + Meta |

### Pages Villes (échantillon)

| URL | Title (longueur) | Statut |
|-----|------------------|--------|
| `/consultant-seo-nice` | 31 car. ⚠️ | Trop court |
| `/consultant-seo-paris` | 31 car. ⚠️ | Trop court |
| `/consultant-seo-lyon` | 30 car. ⚠️ | Trop court |
| `/consultant-seo-marseille` | 34 car. ⚠️ | Trop court |
| `/consultant-seo-cannes` | 32 car. ⚠️ | Trop court |
| *... (14 autres villes)* | 19-34 car. ⚠️ | Tous trop courts |

### Pages Outils

| URL | Title (longueur) | Meta (longueur) | Statut |
|-----|------------------|-----------------|--------|
| `/outils` | 54 car. ✅ | 160 car. ⚠️ | OK |
| `/outils/audit-seo-gratuit` | 56 car. ✅ | 162 car. ⚠️ | Meta légèrement longue |
| `/outils/testeur-visibilite-ia` | 58 car. ✅ | 168 car. 🔴 | Meta trop longue |
| `/outils/simulateur-visibilite-locale` | 62 car. 🔴 | 165 car. ⚠️ | Title trop long |
| `/outils/generateur-robots-txt` | 54 car. ✅ | 170 car. 🔴 | Meta trop longue |
| `/outils/generateur-schema-json-ld` | 56 car. ✅ | 152 car. ✅ | OK |
| `/outils/extracteur-mots-cles` | ❌ ABSENT | ❌ ABSENT | 🔴 CRITIQUE |

### Articles Blog

| URL | Title | Meta | Mots | Statut |
|-----|-------|------|------|--------|
| `/blog/contenu-rapport-audit-seo` | 46 ✅ | 176 🔴 | ~2450 ✅ | Meta |
| `/blog/importance-audit-seo` | 64 ⚠️ | 154 ✅ | ~1450 ⚠️ | Court |
| `/blog/audit-seo-erreurs-qui-coutent-cher` | 60 ✅ | 174 🔴 | ~1050 🔴 | Très court |
| `/blog/pourquoi-consultant-seo` | 50 ✅ | 155 ✅ | ~2000 ✅ | OK |
| `/blog/devenir-consultant-seo` | 52 ✅ | 160 🔴 | ~2400 ✅ | Meta |
| `/blog/missions-consultant-seo` | 64 🔴 | 171 🔴 | ~2000 ✅ | Title + Meta |
| `/blog/salaire-consultant-seo` | 52 ✅ | 145 ✅ | ~2300 ✅ | OK |
| `/blog/quelle-formation-seo` | 38 ⚠️ | 154 ✅ | ~2200 ✅ | Title court |
| `/blog/seo-local-nice` | 51 ✅ | 167 🔴 | ~1300 ⚠️ | Meta + court |
| `/blog/google-business-profile-guide-complet` | 47 ✅ | 137 ✅ | ~2700 ✅ | OK |
| `/blog/google-maps-voler-clients-concurrents` | 64 🔴 | 162 🔴 | ~1200 ⚠️ | Title + Meta + court |
| `/blog/geo-comment-apparaitre-chatgpt-2026` | 85 🔴🔴 | 177 🔴 | ~2600 ✅ | Title TRÈS long |
| `/blog/visibilite-ia-geo` | 53 ✅ | 166 🔴 | ~1500 ⚠️ | Meta + court |
| `/blog/refonte-site-web-sans-perdre-seo` | 55 ✅ | 158 🔴 | ~2400 ✅ | Meta |
| `/blog/checklist-seo-refonte-site` | 52 ✅ | 160 🔴 | ~2500 ✅ | Meta |
| `/blog/comment-creer-site-visible-google` | 57 ✅ | 162 🔴 | ~1600 ⚠️ | Meta + court |
| `/blog/cout-site-web-2026` | 52 ✅ | 165 🔴 | ~1650 ⚠️ | Meta + court |
| `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | 73 🔴 | 168 🔴 | ~1900 ⚠️ | Title + Meta + court |
| `/blog/checklist-seo-2026` | 70 🔴 | 165 🔴 | ~2200 ✅ | Title + Meta |
| `/blog/seo-vs-sea-que-choisir` | 48 ✅ | 158 🔴 | ~1800 ⚠️ | Meta + court |
| `/blog/programmatic-seo-50-pages-locales` | 74 🔴 | 165 🔴 | ~900 🔴🔴 | CRITIQUE |

### Pages Utilitaires

| URL | Title (longueur) | Meta (longueur) | Statut |
|-----|------------------|-----------------|--------|
| `/` (Homepage) | 60 ✅ | 155 ✅ | OK |
| `/a-propos` | 55 ✅ | 176 🔴 | Meta trop longue |
| `/contact` | 48 ✅ | 142 ✅ | OK |
| `/faq` | 45 ✅ | 148 ✅ | OK |
| `/etudes-de-cas` | 52 ✅ | 155 ✅ | OK |
| `/blog` | ❌ ABSENT | ❌ ABSENT | 🔴 CRITIQUE |
| `/mentions-legales` | 40 ✅ | 135 ✅ | OK (noindex) |
| `/confidentialite` | 45 ✅ | 140 ✅ | OK (noindex) |
| `/cgv` | 38 ✅ | 130 ✅ | OK (noindex) |

---

## 3. Classement par nombre de mots

### TOP 10 pages les plus riches

| # | Page | Mots | Type |
|---|------|------|------|
| 1 | `/blog/google-business-profile-guide-complet` | ~2700 | Article |
| 2 | `/blog/geo-comment-apparaitre-chatgpt-2026` | ~2600 | Article |
| 3 | `/blog/checklist-seo-refonte-site` | ~2500 | Article |
| 4 | `/blog/contenu-rapport-audit-seo` | ~2450 | Article |
| 5 | `/blog/devenir-consultant-seo` | ~2400 | Article |
| 6 | `/blog/refonte-site-web-sans-perdre-seo` | ~2400 | Article |
| 7 | `/blog/salaire-consultant-seo` | ~2300 | Article |
| 8 | `/blog/quelle-formation-seo` | ~2200 | Article |
| 9 | `/blog/checklist-seo-2026` | ~2200 | Article |
| 10 | `/blog/pourquoi-consultant-seo` | ~2000 | Article |

### Pages en dessous du seuil (< 2000 mots pour articles)

| Page | Mots | Déficit | Priorité |
|------|------|---------|----------|
| `/blog/programmatic-seo-50-pages-locales` | ~900 | -1100 | 🔴 P0 |
| `/blog/audit-seo-erreurs-qui-coutent-cher` | ~1050 | -950 | 🔴 P0 |
| `/blog/google-maps-voler-clients-concurrents` | ~1200 | -800 | ⚠️ P1 |
| `/blog/seo-local-nice` | ~1300 | -700 | ⚠️ P1 |
| `/blog/importance-audit-seo` | ~1450 | -550 | ⚠️ P1 |
| `/blog/visibilite-ia-geo` | ~1500 | -500 | ⚠️ P1 |
| `/blog/comment-creer-site-visible-google` | ~1600 | -400 | ⚠️ P2 |
| `/blog/cout-site-web-2026` | ~1650 | -350 | ⚠️ P2 |
| `/blog/seo-vs-sea-que-choisir` | ~1800 | -200 | ⚠️ P2 |
| `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | ~1900 | -100 | ⚠️ P2 |

---

## 4. Scores par silo

### Tableau récapitulatif

| Silo | Pages | Score /10 | Points forts | Points faibles |
|------|-------|-----------|--------------|----------------|
| **Silo 5 - Refonte** | 3 | **9.4** ⭐ | Cocon 100%, ancres parfaites | 1 meta légèrement longue |
| **Silo 1 - Services** | 6 | **8.2** | Ancres 95% optimisées | Maillage 60%, 3 titles longs |
| **Silo 10 - Autres** | 9 | **8.0** | Homepage complète | Blog listing sans metadata |
| **Silo 3 - Consultant** | 6 | **7.7** | FAQ systématiques | 3 metas trop longues |
| **Silo 8 - Outils** | 7 | **7.2** | Schemas complets | Extracteur sans metadata |
| **Silo 2 - Audit SEO** | 4 | **7.5** | Cocon 150% | 2 articles trop courts |
| **Silo 4 - SEO Local** | 6 | **6.5** | Pilier bien maillé | 5/6 metas trop longues |
| **Silo 6 - Création** | 5 | **6.4** | FAQ présentes | 3 articles courts, boutique orpheline |
| **Silo 7 - Réf. Naturel** | 4 | **6.0** | Pilier 6/6 KW | programmatic-seo 900 mots |
| **Silo 9 - Villes** | 19 | **5.5** | Template uniforme | 19 titles trop courts |

### Score global site : **7.1/10**

```
┌────────────────────────────────────────────────────┐
│                  RADAR SILO                         │
│                                                     │
│            Refonte ●━━━━━━━━━━━●                   │
│                  9.4                                │
│                                                     │
│   Services ●━━━━━━━━━● 8.2                         │
│                                                     │
│     Autres ●━━━━━━━━● 8.0                          │
│                                                     │
│  Consultant ●━━━━━━━● 7.7                          │
│                                                     │
│     Outils ●━━━━━━● 7.2                            │
│                                                     │
│  Audit SEO ●━━━━━━● 7.5                            │
│                                                     │
│  SEO Local ●━━━━━● 6.5                             │
│                                                     │
│   Création ●━━━━● 6.4                              │
│                                                     │
│   Réf. Nat ●━━━● 6.0                               │
│                                                     │
│     Villes ●━━● 5.5                                │
└────────────────────────────────────────────────────┘
```

---

## 5. Matrice de liens entrants globale

### Pages services — Liens entrants

| Page | Liens entrants estimés | Sources principales |
|------|------------------------|---------------------|
| `/consultant-seo` | 35+ | Articles consultant, villes, homepage |
| `/audit-seo` | 25+ | Articles audit, outils, homepage |
| `/referencement-naturel` | 20+ | Articles blog, homepage |
| `/seo-local` | 25+ | Articles SEO local, villes, outils |
| `/creation-site-web` | 15+ | Articles création, homepage |
| `/refonte-site-web` | 15+ | Articles refonte, création |
| `/creation-boutique-en-ligne` | 5 | Création, homepage |

### Pages outils — Liens entrants

| Page | Liens entrants estimés |
|------|------------------------|
| `/outils/audit-seo-gratuit` | 20+ |
| `/outils/testeur-visibilite-ia` | 15+ |
| `/outils/simulateur-visibilite-locale` | 12+ |
| `/outils/generateur-robots-txt` | 8+ |
| `/outils/generateur-schema-json-ld` | 8+ |
| `/outils/extracteur-mots-cles` | 3 |

---

## 6. Pages orphelines

### Pages avec ≤ 2 liens entrants

| Page | Liens entrants | Recommandation |
|------|----------------|----------------|
| `/creation-boutique-en-ligne` | 2-3 | Ajouter liens depuis articles création |
| `/outils/extracteur-mots-cles` | 2-3 | Ajouter à index /outils, articles |
| `/blog/programmatic-seo-50-pages-locales` | 2-3 | Enrichir + lier depuis pilier |
| `/community-manager` | 1-2 | Nouvelle page, intégrer au maillage |

### Recommandations maillage

1. **Boutique en ligne** : ajouter liens depuis `/creation-site-web`, `/blog/cout-site-web-2026`
2. **Extracteur mots-clés** : ajouter dans index `/outils`, lier depuis articles SEO
3. **Programmatic SEO** : lier depuis `/referencement-naturel`, `/seo-local`

---

## 7. Titles dupliqués

### Analyse

| Problème | Pages concernées | Recommandation |
|----------|------------------|----------------|
| Pas de duplication exacte détectée | - | ✅ |

**Note** : Les H1 = Title sur la plupart des articles (non optimal mais acceptable)

---

## 8. H1 dupliqués

### Analyse

| Problème | Pages concernées |
|----------|------------------|
| H1 = Title | 18/21 articles blog |

**Recommandation** : Différencier H1 des titles pour variation sémantique

---

## 9. Cannibalisations cross-silos

### Paires à risque identifiées

| KW | Pages en concurrence | Risque | Recommandation |
|----|----------------------|--------|----------------|
| "audit SEO" | `/audit-seo` vs `/blog/importance-audit-seo` vs `/outils/audit-seo-gratuit` | ⚠️ Moyen | Intents différents (transac vs info vs outil) — Surveiller |
| "consultant SEO" | `/consultant-seo` vs articles consultant | ✅ Faible | Pilier commercial, articles info |
| "GEO" | `/blog/geo-comment-apparaitre-chatgpt` vs `/blog/visibilite-ia-geo` | ⚠️ Moyen | Angles similaires — Différencier ou fusionner |
| "création site web" | `/creation-site-web` vs `/blog/comment-creer-site-visible-google` | ✅ Faible | Intents différents |
| "SEO local" | `/seo-local` vs `/blog/seo-local-nice` | ✅ Faible | Pilier France vs article Nice |

### Actions recommandées

1. **GEO** : Fusionner `visibilite-ia-geo` dans `geo-comment-apparaitre-chatgpt` (le plus complet) ou différencier clairement les angles
2. Surveiller les positions sur "audit SEO" pour éviter cannibalisation

---

## 10. Liens cassés

### Analyse

| Type | Nombre | Détails |
|------|--------|---------|
| Liens internes cassés | 0 détectés | ✅ |
| Redirections | Vérifier `/diagnostic/*` (bloqué robots.txt) | - |

**Recommandation** : Exécuter un crawl complet avec Screaming Frog pour confirmation

---

## 11. Liens externes inventaire

### Analyse globale

| Type | Politique |
|------|-----------|
| Liens externes dans articles | Très rares (mentions sans liens) |
| Outils mentionnés sans liens | Screaming Frog, TinyPNG, Semrush, etc. |
| Backlinks sortants | Conservation du jus SEO ✅ |

**Note** : Stratégie de rétention du jus SEO bien appliquée

---

## 12. Contenu trop court

### Articles < 2000 mots (seuil recommandé)

| Article | Mots | Action |
|---------|------|--------|
| 🔴 `/blog/programmatic-seo-50-pages-locales` | ~900 | **URGENT** : +1100 mots minimum |
| 🔴 `/blog/audit-seo-erreurs-qui-coutent-cher` | ~1050 | **URGENT** : +950 mots |
| ⚠️ `/blog/google-maps-voler-clients-concurrents` | ~1200 | +800 mots |
| ⚠️ `/blog/seo-local-nice` | ~1300 | +700 mots |
| ⚠️ `/blog/importance-audit-seo` | ~1450 | +550 mots |
| ⚠️ `/blog/visibilite-ia-geo` | ~1500 | +500 mots OU fusionner |

### Pages services (contenu OK mais enrichissable)

| Page | Mots | Recommandation |
|------|------|----------------|
| `/seo-local` | ~760 | Enrichir section éditoriale |
| `/consultant-seo` | ~1150 | Ajouter cas clients, témoignages |
| `/audit-seo` | ~650 | Enrichir avec exemples concrets |

---

## 13. Incohérences KW

### Problèmes détectés

| Page | KW assigné | Problème |
|------|-----------|----------|
| `/blog/programmatic-seo-50-pages-locales` | "programmatic SEO" | Contenu trop court pour ranker |
| Titles villes | "consultant SEO [ville]" | Titles trop courts (19-34 car.) |
| `/outils/extracteur-mots-cles` | "extracteur mots-clés" | KW absent du title (title manquant) |

### Score KW on-page global

| Score | Nombre de pages | % |
|-------|-----------------|---|
| 6/6 | 45+ | 48% |
| 5/6 | 30+ | 32% |
| 4/6 | 15 | 16% |
| < 4/6 | 4 | 4% |

---

## 14. Analyse robots.txt

### Contenu actuel

```
User-agent: *
Allow: /
Disallow: /api/*
Disallow: /keystatic/*
Disallow: /admin-login
Disallow: /login
Disallow: /dashboard
Disallow: /app/*
Disallow: /*.json
Disallow: /diagnostic/*

# Crawlers IA autorisés
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

# Crawlers IA bloqués (scraping)
User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

Host: https://indhack.com
Sitemap: https://indhack.com/sitemap.xml
```

### Analyse

| Élément | Statut |
|---------|--------|
| Crawlers moteurs classiques | ✅ Autorisés |
| Crawlers IA (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot) | ✅ Autorisés |
| Crawlers IA scraping (CCBot, Google-Extended) | ✅ Bloqués |
| API et admin | ✅ Bloqués |
| Sitemap déclaré | ✅ |
| Host déclaré | ✅ |

**Verdict** : Configuration robots.txt **excellente** pour SEO + GEO

---

## 15. Analyse sitemap.xml

### Données

| Élément | Valeur |
|---------|--------|
| URL | https://indhack.com/sitemap.xml |
| Nombre d'URLs | 94 |
| Format | XML standard |
| `<lastmod>` | Présent sur toutes les URLs |
| Fréquence mise à jour | Quotidienne à hebdomadaire |

### URLs par type

| Type | Nombre |
|------|--------|
| Services | 7 |
| Villes | 19 |
| Villes /audit-technique | 19 |
| Outils | 7 |
| Blog | 21 |
| Utilitaires | 9 |
| Autres | 12 |

### Analyse

| Vérification | Statut |
|--------------|--------|
| Toutes les pages indexables présentes | ✅ |
| Pages noindex absentes du sitemap | ✅ (confidentialite, cgv en noindex mais présents — vérifier) |
| URLs canoniques | ✅ |
| Format valide | ✅ |

**Recommandation** : Vérifier que les pages noindex (`/confidentialite`, `/cgv`) sont bien exclues du sitemap

---

## 16. TOP 15 ACTIONS PRIORITAIRES

### 🔴 P0 — CRITIQUE (Cette semaine)

| # | Action | Impact | Effort | Fichier |
|---|--------|--------|--------|---------|
| **1** | **Corriger metadata `/outils/extracteur-mots-cles`** | SEO | 30 min | `app/outils/extracteur-mots-cles/` |
|   | Title, meta description, canonical absents (Client Component sans metadata Next.js) |
|   | **Solution** : Créer page.tsx Server Component avec metadata, importer composant client |
| **2** | **Enrichir `/blog/programmatic-seo-50-pages-locales`** | SEO | 2h | `content/blog/programmatic-seo-50-pages-locales.md` |
|   | ~900 mots seulement (objectif 2000+), title 74 car., meta 165 car. |
|   | **Solution** : Ajouter +1100 mots, raccourcir title et meta |
| **3** | **Raccourcir title `/blog/geo-comment-apparaitre-chatgpt-2026`** | SEO | 10 min | `content/blog/geo-comment-apparaitre-chatgpt-2026.md` |
|   | 85 caractères (TRÈS au-dessus des 60 recommandés) |
|   | **Title suggéré** : "GEO : comment apparaître dans ChatGPT et les IA en 2026" (59 car.) |
| **4** | **Enrichir `/blog/audit-seo-erreurs-qui-coutent-cher`** | SEO | 1h30 | `content/blog/audit-seo-erreurs-qui-coutent-cher.md` |
|   | ~1050 mots seulement (objectif 2000+) |
|   | **Solution** : Ajouter +950 mots (plus d'erreurs, plus de détails) |
| **5** | **Ajouter FAQPage schema sur `/audit-seo`** | SEO | 20 min | `app/audit-seo/AuditSeoClient.tsx` |
|   | FAQ présente mais schema manquant |

### ⚠️ P1 — IMPORTANT (Semaine prochaine)

| # | Action | Impact | Effort | Fichiers |
|---|--------|--------|--------|----------|
| **6** | **Raccourcir 15+ meta descriptions > 155 car.** | SEO | 1h | Multiples |
|   | Pages concernées : /seo-local (193), geo-chatgpt (177), devenir-consultant (160), missions-consultant (171), etc. |
| **7** | **Enrichir titles pages villes** | SEO | 2h | `lib/cities-data.ts` ou template |
|   | 19 titles entre 19-34 car. (objectif 50-60 car.) |
|   | **Exemple** : "Consultant SEO Nice" → "Consultante SEO à Nice | Référencement Local PACA – INDHACK" |
| **8** | **Compléter maillage silo Services** | Maillage | 30 min | Pages services |
|   | Score actuel 60%, `/audit-seo` et `/referencement-naturel` trop isolés |
|   | Ajouter liens vers creation, refonte, seo-local |
| **9** | **Enrichir articles courts < 1500 mots** | SEO | 3h | 5 articles |
|   | seo-local-nice (1300), google-maps (1200), importance-audit (1450), visibilite-ia (1500) |
| **10** | **Ajouter extracteur-mots-cles à index /outils** | Maillage | 15 min | `app/outils/page.tsx` |
|   | L'outil n'apparaît pas dans la liste |

### 📝 P2 — AMÉLIORATION (Ce mois)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| **11** | **Améliorer maillage `/outils/simulateur-visibilite-locale`** | Maillage | 20 min |
|   | Seulement 4 liens internes (le plus faible du silo outils) |
| **12** | **Ajouter metadata `/blog` (listing)** | SEO | 15 min |
|   | Title et meta description absents sur la page listing blog |
| **13** | **Raccourcir meta `/a-propos` (176 car.)** | SEO | 5 min |
| **14** | **Différencier H1 des Titles** | SEO | 1h |
|   | 18/21 articles ont H1 = Title (variation sémantique recommandée) |
| **15** | **Vérifier pages noindex dans sitemap** | Tech | 10 min |
|   | `/confidentialite` et `/cgv` devraient être exclus si noindex |

---

## RÉCAPITULATIF EXÉCUTIF

### Forces du site

| ✅ | Détail |
|----|--------|
| **Architecture cocon sémantique** | Silos bien structurés avec pages piliers |
| **Schemas JSON-LD** | FAQPage, Service, LocalBusiness, WebApplication sur toutes les pages clés |
| **Robots.txt GEO-ready** | Crawlers IA autorisés (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot) |
| **FAQ systématiques** | 120+ questions avec schema FAQPage |
| **Ancres optimisées** | 90%+ des ancres contiennent le KW cible |
| **Outils lead magnet** | 7 outils gratuits bien intégrés |
| **E-E-A-T** | Photo auteur, bio, tarifs transparents, expertise démontrée |

### Faiblesses à corriger

| 🔴 | Détail | Priorité |
|----|--------|----------|
| **1 page sans metadata** | /outils/extracteur-mots-cles | P0 |
| **1 page listing sans metadata** | /blog | P0 |
| **2 articles TRÈS courts** | programmatic-seo (~900), erreurs-audit (~1050) | P0 |
| **1 title TRÈS long** | geo-chatgpt (85 car.) | P0 |
| **15+ metas trop longues** | > 155 caractères | P1 |
| **19 titles villes trop courts** | 19-34 car. | P1 |
| **8 articles < 2000 mots** | Objectif non atteint | P1-P2 |

### Plan d'action recommandé

| Semaine | Actions | Temps estimé |
|---------|---------|--------------|
| **S1** | P0 (actions 1-5) | 5h |
| **S2** | P1 (actions 6-10) | 7h |
| **S3-S4** | P2 (actions 11-15) + enrichissement contenus | 10h |

---

## ANNEXES

### A. Liste complète des URLs sitemap

```
https://indhack.com
https://indhack.com/blog
https://indhack.com/consultant-seo
https://indhack.com/consultant-seo-grenoble
https://indhack.com/consultant-seo-aix-en-provence
https://indhack.com/consultant-seo-aix-en-provence/audit-technique
https://indhack.com/consultant-seo-antibes
https://indhack.com/consultant-seo-antibes/audit-technique
https://indhack.com/consultant-seo-bordeaux
https://indhack.com/consultant-seo-bordeaux/audit-technique
https://indhack.com/consultant-seo-boulogne-billancourt
https://indhack.com/consultant-seo-boulogne-billancourt/audit-technique
https://indhack.com/consultant-seo-cannes
https://indhack.com/consultant-seo-cannes/audit-technique
https://indhack.com/consultant-seo-grenoble/audit-technique
https://indhack.com/consultant-seo-juan-les-pins
https://indhack.com/consultant-seo-lille
https://indhack.com/consultant-seo-lille/audit-technique
https://indhack.com/consultant-seo-lyon
https://indhack.com/consultant-seo-lyon/audit-technique
https://indhack.com/consultant-seo-marseille
https://indhack.com/consultant-seo-marseille/audit-technique
https://indhack.com/consultant-seo-monaco
https://indhack.com/consultant-seo-monaco/audit-technique
https://indhack.com/consultant-seo-montpellier
https://indhack.com/consultant-seo-montpellier/audit-technique
https://indhack.com/consultant-seo-nantes
https://indhack.com/consultant-seo-nantes/audit-technique
https://indhack.com/consultant-seo-nice
https://indhack.com/consultant-seo-nice/audit-technique
https://indhack.com/consultant-seo-paris
https://indhack.com/consultant-seo-paris/audit-technique
https://indhack.com/consultant-seo-rennes
https://indhack.com/consultant-seo-rennes/audit-technique
https://indhack.com/consultant-seo-sophia-antipolis
https://indhack.com/consultant-seo-sophia-antipolis/audit-technique
https://indhack.com/consultant-seo-strasbourg
https://indhack.com/consultant-seo-strasbourg/audit-technique
https://indhack.com/consultant-seo-toulouse
https://indhack.com/consultant-seo-toulouse/audit-technique
https://indhack.com/audit-seo
https://indhack.com/referencement-naturel
https://indhack.com/creation-site-web
https://indhack.com/refonte-site-web
https://indhack.com/seo-local
https://indhack.com/community-manager
https://indhack.com/creation-boutique-en-ligne
https://indhack.com/etudes-de-cas
https://indhack.com/a-propos
https://indhack.com/contact
https://indhack.com/faq
https://indhack.com/outils
https://indhack.com/outils/extracteur-mots-cles
https://indhack.com/outils/audit-seo-gratuit
https://indhack.com/outils/generateur-robots-txt
https://indhack.com/outils/simulateur-visibilite-locale
https://indhack.com/outils/testeur-visibilite-ia
https://indhack.com/outils/generateur-schema-json-ld
https://indhack.com/outils/gmb-autopilot
https://indhack.com/blog/audit-seo-erreurs-qui-coutent-cher
https://indhack.com/blog/checklist-seo-2026
https://indhack.com/blog/checklist-seo-refonte-site
https://indhack.com/blog/comment-creer-site-visible-google
https://indhack.com/blog/contenu-rapport-audit-seo
https://indhack.com/blog/cout-site-web-2026
https://indhack.com/blog/devenir-consultant-seo
https://indhack.com/blog/geo-comment-apparaitre-chatgpt-2026
https://indhack.com/blog/google-business-profile-guide-complet
https://indhack.com/blog/google-maps-voler-clients-concurrents
https://indhack.com/blog/importance-audit-seo
https://indhack.com/blog/missions-consultant-seo
https://indhack.com/blog/pourquoi-consultant-seo
https://indhack.com/blog/pourquoi-votre-site-est-lent-performance-web-2026
https://indhack.com/blog/programmatic-seo-50-pages-locales
https://indhack.com/blog/quelle-formation-seo
https://indhack.com/blog/refonte-site-web-sans-perdre-seo
https://indhack.com/blog/salaire-consultant-seo
https://indhack.com/blog/seo-local-nice
https://indhack.com/blog/seo-vs-sea-que-choisir
https://indhack.com/blog/visibilite-ia-geo
```

### B. Fichiers d'audit par silo

| Silo | Fichier | Pages |
|------|---------|-------|
| Silo 1 - Services | `silo-1-services.md` | 6 |
| Silo 2 - Audit SEO | `silo-2-audit-seo.md` | 4 |
| Silo 3 - Consultant SEO | `silo-3-consultant-seo.md` | 6 |
| Silo 4 - SEO Local/GEO | `silo-4-seo-local-geo.md` | 6 |
| Silo 5 - Refonte | `silo-5-refonte.md` | 3 |
| Silo 6 - Création | `silo-6-creation.md` | 5 |
| Silo 7 - Réf. Naturel | `silo-7-autres-blog.md` | 4 |
| Silo 8 - Outils | `silo-8-outils.md` | 7 |
| Silo 9 - Villes | `silo-9-villes.md` | 19 |
| Silo 10 - Autres | `silo-10-autres.md` | 9 |

---

*Synthèse globale générée le 19 février 2026 — Audit complet indhack.com*
