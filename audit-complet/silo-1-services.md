# Audit SEO Silo 1 : Services (Pages Piliers)

**Date d'audit** : 19 février 2026
**Périmètre** : 6 pages piliers services
**Note** : Ces pages ont été analysées en détail dans leurs silos respectifs. Ce document fournit une vue d'ensemble et la matrice de maillage inter-services.

---

## Sommaire

1. [Inventaire des pages piliers](#1-inventaire-des-pages-piliers)
2. [Tableau récapitulatif des métadonnées](#2-tableau-récapitulatif-des-métadonnées)
3. [Matrice de maillage inter-services](#3-matrice-de-maillage-inter-services)
4. [Analyse des ancres entre piliers](#4-analyse-des-ancres-entre-piliers)
5. [Cohérence sémantique](#5-cohérence-sémantique)
6. [Diagnostic global](#6-diagnostic-global)
7. [Actions prioritaires](#7-actions-prioritaires)

---

## 1. Inventaire des pages piliers

| # | Service | URL | Silo de rattachement | Fichier audit détaillé |
|---|---------|-----|---------------------|------------------------|
| 1 | Consultant SEO | `/consultant-seo` | Silo 3 | `silo-3-consultant-seo.md` |
| 2 | Audit SEO | `/audit-seo` | Silo 2 | `silo-2-audit-seo.md` |
| 3 | Référencement Naturel | `/referencement-naturel` | Silo 7 | `silo-7-autres-blog.md` |
| 4 | SEO Local | `/seo-local` | Silo 4 | `silo-4-seo-local-geo.md` |
| 5 | Création Site Web | `/creation-site-web` | Silo 6 | `silo-6-creation.md` |
| 6 | Refonte Site Web | `/refonte-site-web` | Silo 5 | `silo-5-refonte.md` |

---

## 2. Tableau récapitulatif des métadonnées

### Titles

| Service | Title | Longueur | Statut |
|---------|-------|----------|--------|
| Consultant SEO | `Consultante SEO Freelance \| Experte Référencement – INDHACK` | 59 car. | ✅ |
| Audit SEO | `Audit SEO Complet \| Diagnostic Référencement Expert – INDHACK` | 61 car. | 🔴 |
| Référencement Naturel | `Référencement Naturel \| Stratégie SEO Sur-Mesure – INDHACK` | 54 car. | ✅ |
| SEO Local | `SEO Local à Nice & en France \| Dominez Google Maps – INDHACK` | 62 car. | 🔴 |
| Création Site Web | `Création de Site Web Optimisé SEO \| Sites Performants – INDHACK` | 61 car. | 🔴 |
| Refonte Site Web | `Refonte de Site Web \| Migration SEO Sécurisée – INDHACK` | 53 car. | ✅ |

**Bilan** : 3/6 titles conformes (≤60 car.)

### Meta descriptions

| Service | Description | Longueur | Statut |
|---------|-------------|----------|--------|
| Consultant SEO | Consultante SEO freelance spécialisée acquisition de trafic... | 152 car. | ✅ |
| Audit SEO | Audit SEO complet de votre site web... | 155 car. | ✅ |
| Référencement Naturel | Stratégies SEO sur-mesure pour atteindre la 1ère page... | 147 car. | ✅ |
| SEO Local | Expert SEO local à Nice et dans toute la France... | 193 car. | 🔴 |
| Création Site Web | Sites WordPress et Next.js ultra-rapides... | 157 car. | 🔴 |
| Refonte Site Web | Refonte de site sans perte de trafic... | 153 car. | ✅ |

**Bilan** : 4/6 meta descriptions conformes (≤155 car.)

### Score KW on-page

| Service | Score /6 | Points manquants |
|---------|----------|------------------|
| Consultant SEO | 6/6 | — |
| Audit SEO | 5/6 | Title >60 car. |
| Référencement Naturel | 6/6 | — |
| SEO Local | 4/6 | Title >60 car., Meta >155 car. |
| Création Site Web | 5/6 | Title >60 car. |
| Refonte Site Web | 6/6 | — |

---

## 3. Matrice de maillage inter-services

### Liens depuis → vers

| Depuis ↓ / Vers → | consultant-seo | audit-seo | referencement | seo-local | creation | refonte |
|-------------------|:--------------:|:---------:|:-------------:|:---------:|:--------:|:-------:|
| **/consultant-seo** | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| **/audit-seo** | ✅ | — | ✅ | ❌ | ❌ | ❌ |
| **/referencement-naturel** | ✅ | ❌ | — | ✅ | ❌ | ❌ |
| **/seo-local** | ✅ | ✅ | ✅ | — | ❌ | ❌ |
| **/creation-site-web** | ❌ | ✅ | ✅ | ✅ | — | ✅ |
| **/refonte-site-web** | ❌ | ✅ | ✅ | ✅ | ✅ | — |

**Score de maillage** : 18/30 liens possibles = **60%**

### Analyse par service

| Service | Liens sortants vers autres services | Liens entrants depuis autres services |
|---------|-------------------------------------|---------------------------------------|
| `/consultant-seo` | 5/5 (100%) | 3/5 (60%) |
| `/audit-seo` | 2/5 (40%) | 4/5 (80%) |
| `/referencement-naturel` | 2/5 (40%) | 4/5 (80%) |
| `/seo-local` | 3/5 (60%) | 4/5 (80%) |
| `/creation-site-web` | 4/5 (80%) | 2/5 (40%) |
| `/refonte-site-web` | 4/5 (80%) | 2/5 (40%) |

### Problèmes identifiés

1. **`/audit-seo` trop isolé en sortants** : ne lie pas vers seo-local, creation, refonte
2. **`/referencement-naturel` trop isolé en sortants** : ne lie pas vers audit, creation, refonte
3. **`/creation-site-web` peu cité** : seulement 2 liens entrants
4. **`/refonte-site-web` peu cité** : seulement 2 liens entrants

---

## 4. Analyse des ancres entre piliers

### Ancres utilisées vers /consultant-seo

| Depuis | Ancre | Qualité |
|--------|-------|---------|
| /referencement-naturel | Mon expertise consultant SEO | ✅ Descriptive |
| /seo-local | consultant SEO | ✅ Exacte |
| /audit-seo | consultant SEO | ✅ Exacte |

### Ancres utilisées vers /audit-seo

| Depuis | Ancre | Qualité |
|--------|-------|---------|
| /consultant-seo | audit SEO | ✅ Exacte |
| /seo-local | audit SEO | ✅ Exacte |
| /creation-site-web | audit SEO | ✅ Exacte |
| /refonte-site-web | audit SEO complet | ✅ Enrichie |

### Ancres utilisées vers /referencement-naturel

| Depuis | Ancre | Qualité |
|--------|-------|---------|
| /consultant-seo | référencement naturel | ✅ Exacte |
| /audit-seo | référencement naturel | ✅ Exacte |
| /seo-local | référencement naturel | ✅ Exacte |
| /refonte-site-web | référencement naturel | ✅ Exacte |

### Ancres utilisées vers /seo-local

| Depuis | Ancre | Qualité |
|--------|-------|---------|
| /consultant-seo | SEO local | ✅ Exacte |
| /referencement-naturel | SEO local | ✅ Exacte |
| /creation-site-web | SEO local | ✅ Exacte |
| /refonte-site-web | local | ⚠️ Trop générique |

### Ancres utilisées vers /creation-site-web

| Depuis | Ancre | Qualité |
|--------|-------|---------|
| /refonte-site-web | création de site web | ✅ Exacte |
| /consultant-seo | création de site web | ✅ Exacte |

### Ancres utilisées vers /refonte-site-web

| Depuis | Ancre | Qualité |
|--------|-------|---------|
| /creation-site-web | refonte de site web | ✅ Exacte |
| /consultant-seo | refonte de site web | ✅ Exacte |

**Qualité globale des ancres** : 95% optimisées ✅

---

## 5. Cohérence sémantique

### Positionnement de chaque pilier

| Service | Mot-clé principal | Position dans le funnel |
|---------|-------------------|------------------------|
| `/consultant-seo` | consultant SEO freelance | TOFU (notoriété) |
| `/referencement-naturel` | référencement naturel | TOFU (notoriété) |
| `/seo-local` | SEO local | MOFU (considération) |
| `/audit-seo` | audit SEO | MOFU (considération) |
| `/creation-site-web` | création site web | BOFU (décision) |
| `/refonte-site-web` | refonte site web | BOFU (décision) |

### Cohérence du parcours utilisateur

```
TOFU (Notoriété)
├── /consultant-seo → "Qui est l'expert ?"
└── /referencement-naturel → "Qu'est-ce que le SEO ?"
    ↓
MOFU (Considération)
├── /seo-local → "Solution pour mon business local"
└── /audit-seo → "Diagnostic de ma situation"
    ↓
BOFU (Décision)
├── /creation-site-web → "Je crée un nouveau site"
└── /refonte-site-web → "Je refais mon site existant"
```

### Recommandation de parcours idéal

1. Entrée par `/consultant-seo` ou `/referencement-naturel`
2. Exploration via `/seo-local` ou `/audit-seo`
3. Conversion via `/creation-site-web` ou `/refonte-site-web`
4. Contact via `/contact`

---

## 6. Diagnostic global

### Points forts

| ✅ | Détail |
|----|--------|
| Ancres optimisées | 95% des ancres contiennent les KW cibles |
| Consultant-seo hub | Lie vers tous les autres services |
| FAQ riches | Toutes les pages ont des FAQ schema |
| Schema Service | Toutes les pages ont ServiceSchema |
| Cohérence funnel | Parcours TOFU → MOFU → BOFU logique |

### Points à améliorer (P1)

| ⚠️ | Détail | Impact |
|----|--------|--------|
| Maillage 60% | Score cocon incomplet | Distribution jus SEO suboptimale |
| Audit-seo isolé | Ne lie que 2 autres services | Perte de jus sortant |
| Creation peu citée | Seulement 2 liens entrants | Page sous-alimentée |

### Problèmes critiques (P0)

| 🔴 | Service | Problème | Correction |
|----|---------|----------|------------|
| Audit SEO | Title 61 car. | `Audit SEO Complet \| Diagnostic Expert – INDHACK` (50 car.) |
| SEO Local | Title 62 car. + Meta 193 car. | `SEO Local Nice & France \| Google Maps – INDHACK` (48 car.) + Meta 155 car. |
| Création Site | Title 61 car. + Meta 157 car. | `Création Site Web Optimisé SEO – INDHACK` (44 car.) + Meta 155 car. |

---

## 7. Actions prioritaires

### P0 - Métadonnées (immédiat)

| # | Service | Action | Effort |
|---|---------|--------|--------|
| 1 | `/audit-seo` | Raccourcir title à 60 car. | 5 min |
| 2 | `/seo-local` | Raccourcir title + meta | 10 min |
| 3 | `/creation-site-web` | Raccourcir title + meta | 10 min |

### P1 - Maillage (cette semaine)

| # | Action | Détail | Effort |
|---|--------|--------|--------|
| 4 | **Compléter maillage `/audit-seo`** | Ajouter liens vers seo-local, creation, refonte | 15 min |
| 5 | **Compléter maillage `/referencement-naturel`** | Ajouter liens vers audit, creation, refonte | 15 min |
| 6 | **Renforcer `/creation-site-web`** | Ajouter liens entrants depuis audit et referencement | 10 min |
| 7 | **Renforcer `/refonte-site-web`** | Ajouter liens entrants depuis audit et referencement | 10 min |

### Suggestions de liens à ajouter

**Dans `/audit-seo`**, ajouter dans la section appropriée :
```
- Pour les entreprises locales, l'audit inclut une analyse de votre [SEO local](/seo-local)
- Suite à l'audit, je peux vous accompagner en [création de site web](/creation-site-web) ou [refonte SEO](/refonte-site-web)
```

**Dans `/referencement-naturel`**, ajouter :
```
- Commencez par un [audit SEO complet](/audit-seo) pour identifier vos priorités
- Besoin d'un nouveau site ? Découvrez ma [création de site optimisé](/creation-site-web)
- Site existant à améliorer ? Ma [refonte SEO](/refonte-site-web) préserve vos positions
```

---

## Score global du silo

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Métadonnées | 7/10 | 3 titles + 2 metas à corriger |
| Maillage inter-services | 6/10 | Score 60%, audit et ref-nat isolés |
| Ancres | 9/10 | 95% optimisées |
| Schema | 10/10 | Tous les services ont ServiceSchema + FAQ |
| Cohérence funnel | 9/10 | Parcours logique TOFU → MOFU → BOFU |
| **TOTAL** | **8.2/10** | Piliers solides, maillage à compléter |

---

## Annexe : Détail par service

### Liens sortants par page

**`/consultant-seo`** (5/5 = 100%)
- → /audit-seo ✅
- → /referencement-naturel ✅
- → /seo-local ✅
- → /creation-site-web ✅
- → /refonte-site-web ✅

**`/audit-seo`** (2/5 = 40%)
- → /consultant-seo ✅
- → /referencement-naturel ✅
- → /seo-local ❌
- → /creation-site-web ❌
- → /refonte-site-web ❌

**`/referencement-naturel`** (2/5 = 40%)
- → /consultant-seo ✅
- → /audit-seo ❌
- → /seo-local ✅
- → /creation-site-web ❌
- → /refonte-site-web ❌

**`/seo-local`** (3/5 = 60%)
- → /consultant-seo ✅
- → /audit-seo ✅
- → /referencement-naturel ✅
- → /creation-site-web ❌
- → /refonte-site-web ❌

**`/creation-site-web`** (4/5 = 80%)
- → /consultant-seo ❌
- → /audit-seo ✅
- → /referencement-naturel ✅
- → /seo-local ✅
- → /refonte-site-web ✅

**`/refonte-site-web`** (4/5 = 80%)
- → /consultant-seo ❌
- → /audit-seo ✅
- → /referencement-naturel ✅
- → /seo-local ✅
- → /creation-site-web ✅

---

*Audit réalisé le 19 février 2026 — Silo 1/10 (synthèse)*
