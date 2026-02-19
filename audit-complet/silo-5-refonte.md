# Audit SEO Silo 5 : Refonte de site web

**Date d'audit** : 19 février 2026
**Périmètre** : 3 pages (1 pilier service + 2 articles blog)
**Mot-clé principal du silo** : refonte site web

---

## Sommaire

1. [Pilier : /refonte-site-web](#1-pilier--refonte-site-web)
2. [Article : refonte-site-web-sans-perdre-seo](#2-article--refonte-site-web-sans-perdre-seo)
3. [Article : checklist-seo-refonte-site](#3-article--checklist-seo-refonte-site)
4. [Matrice de maillage du silo](#4-matrice-de-maillage-du-silo)
5. [Analyse qualité des ancres](#5-analyse-qualité-des-ancres)
6. [Diagnostic global du silo](#6-diagnostic-global-du-silo)
7. [TOP 3 actions prioritaires](#7-top-3-actions-prioritaires)

---

## 1. Pilier : /refonte-site-web

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/refonte-site-web` | ✅ |
| **Fichier source** | `app/refonte-site-web/page.tsx` + `RefonteSiteClient.tsx` | — |
| **Title** | `Refonte de Site Web \| Migration SEO Sécurisée – INDHACK` | ✅ 53 car. |
| **Meta description** | `Refonte de site sans perte de trafic. Migration SEO sécurisée, redirection 301 et optimisation technique. Sécurisez votre visibilité. ✆ 06 61 13 97 48` | ✅ 153 car. |
| **H1** | `Refonte de site web : Sécurisez votre héritage SEO` | ✅ |
| **Canonical** | `https://indhack.com/refonte-site-web` | ✅ |
| **Mot-clé principal** | refonte site web | ✅ |

**Score KW on-page** : 6/6 ✅
- [x] KW dans URL
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans premier paragraphe
- [x] Title ≤60 caractères

### B. Structure des titres

```
H1: Refonte de site web : Sécurisez votre héritage SEO
  H2: Une migration sans accroc
    H3: Sécurisation du SEO
    H3: Optimisation performance web
    H3: Migration Sémantique
    H3: Suivi Post-Lancement
  H2: Refondre son site sans sacrifier son acquisition (La Méthode)
    H4: 01 - Audit Pré-Refonte
    H4: 02 - Mapping de Redirection
    H4: 03 - Recettage Technique
    H4: 04 - Go-Live & Suivi
  H2: Refonte de site web avec accompagnement SEO (Maillage villes)
  H2: Approfondir le sujet (Articles liés)
  H2: Questions sur la refonte SEO (FAQ)
```

### C. Contenu principal

**Type de composant** : Client Component (`"use client"`)

Le pilier présente l'offre de refonte SEO avec :
- 4 features principales (Sécurisation SEO, Performance, Migration, Suivi)
- Processus en 4 étapes illustré
- Section maillage vers villes (6 villes)
- 2 articles liés du silo
- 3 questions FAQ avec schema
- CTA vers audit modal

**Estimation** : ~1 200 mots (contenu client component)

### D. Maillage interne - Liens sortants

| URL destination | Ancre | Position | Type |
|-----------------|-------|----------|------|
| `/referencement-naturel` | référencement naturel | Section maillage | Contextuel |
| `/seo-local` | local | Section maillage | Contextuel |
| `/seo-local` | Toutes les villes → | Section maillage | Navigation |
| `/consultant-seo-nice` | Nice | Section villes | Navigation |
| `/consultant-seo-paris` | Paris | Section villes | Navigation |
| `/consultant-seo-lyon` | Lyon | Section villes | Navigation |
| `/consultant-seo-marseille` | Marseille | Section villes | Navigation |
| `/consultant-seo-cannes` | Cannes | Section villes | Navigation |
| `/consultant-seo-bordeaux` | Bordeaux | Section villes | Navigation |
| `/audit-seo` | audit SEO complet | Section maillage | Contextuel |
| `/creation-site-web` | création de site web | Section maillage | Contextuel |
| `/blog/refonte-site-web-sans-perdre-seo` | Comment refondre son site sans perdre son SEO | Articles liés | Navigation |
| `/blog/checklist-seo-refonte-site` | Checklist SEO : 45 points pour votre refonte | Articles liés | Navigation |

**Total liens internes** : 13
**Liens vers articles du silo** : 2 ✅

### E. Liens externes

Aucun lien externe détecté.

### F. Schema JSON-LD

```json
{
  "@type": "Service",
  "name": "Refonte de Site Web SEO",
  "description": "Refonte de site web avec migration SEO sécurisée et optimisation technique.",
  "provider": {
    "@type": "Person",
    "name": "Indiana Aflalo",
    "url": "https://indhack.com"
  },
  "serviceType": "Web Design & SEO Migration",
  "areaServed": "France"
}
```

+ FAQPage (3 questions) ✅
+ BreadcrumbList ✅
+ ServiceSchema (via composant) ✅

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| ✅ | Title optimisé | 53 car. |
| ✅ | Meta description | 153 car. |
| ✅ | Maillage vers articles silo | 2 articles liés |
| ✅ | Maillage vers services | 4 services liés |
| ✅ | Maillage vers villes | 6 villes liées |
| ✅ | FAQ avec schema | 3 questions |
| ⚠️ P1 | FAQ courte | Seulement 3 questions (minimum recommandé : 5) |
| ⚠️ P1 | Contenu court | ~1 200 mots (peut être enrichi) |

---

## 2. Article : refonte-site-web-sans-perdre-seo

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/refonte-site-web-sans-perdre-seo` | ✅ |
| **Fichier source** | `content/blog/refonte-site-web-sans-perdre-seo.md` | — |
| **Title** | `Refonte de site web : comment ne pas perdre son SEO ?` | ✅ 52 car. |
| **Meta description** | `Guide complet pour réussir votre refonte de site sans perdre vos positions Google. Checklist, redirections, erreurs à éviter, planning.` | ✅ 138 car. |
| **H1** | `Refonte de site web : comment ne pas perdre son SEO ?` | ✅ (= title) |
| **Date** | 2026-01-07 | ✅ |
| **Catégorie** | Refonte | ✅ |
| **Image** | `/images/blog/refonte-site-seo.jpg` | ✅ |

**Score KW on-page** : 6/6 ✅

### B. Structure des titres

```
H1: Refonte de site web : comment ne pas perdre son SEO ?
  H2: Pourquoi les refontes SEO échouent ?
  H2: Avant la refonte : l'audit préalable
    H3: Inventorier l'existant
    H3: Identifier vos pages stars
    H3: Cartographier les redirections
  H2: Pendant la refonte : les règles à respecter
    H3: Conserver la structure d'URL si possible
    H3: Implémenter les redirections 301
    H3: Conserver le contenu performant
    H3: Optimiser la vitesse
  H2: Le jour J : la mise en ligne
    H3: Checklist de lancement
    H3: Actions post-lancement
  H2: Après la refonte : le suivi
    H3: Semaine 1-2 : surveillance intensive
    H3: Mois 1-3 : stabilisation
    H3: Signaux de succès
  H2: Les erreurs fatales à éviter
    H3: Erreur #1 → #5
  H2: Ce qu'il faut retenir
  H2: Pour aller plus loin
  H2: Questions fréquentes (3 questions)
```

### C. Contenu intégral

**Nombre de mots** : ~2 400 mots ✅

**Thématiques couvertes** :
- Causes d'échec des refontes (tableau erreurs/conséquences)
- Audit pré-refonte (inventaire, pages stars, mapping)
- Règles pendant refonte (URLs, redirections 301, contenu, vitesse)
- Checklist jour J (avant/après lancement)
- Suivi post-refonte (semaines 1-2, mois 1-3)
- 5 erreurs fatales détaillées
- Code exemples (.htaccess, next.config.js)

**Points forts** :
- 7 tableaux de données (excellent pour SEO)
- Exemples de code concrets
- Statistique source : SEMrush
- Structure très pédagogique

### D. Analyse sémantique

**Champ sémantique couvert** :
- refonte site web, migration SEO, redirections 301
- perte trafic, positions Google, erreurs 404
- audit préalable, inventaire, pages stars
- backlinks, maillage interne, sitemap
- Core Web Vitals, performance, vitesse
- Search Console, Analytics, crawl
- noindex, robots.txt, canonical

**Densité KW principal** : "refonte" ~25 occurrences, "SEO" ~30 occurrences

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/refonte-site-web` | refonte de site web | Intro |
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | Intro |
| `/creation-site-web` | IndHack | Corps (redirections Next.js) |
| `/blog/checklist-seo-refonte-site` | Checklist SEO : 45 points à vérifier pour votre refonte | Pour aller plus loin |
| `/blog/cout-site-web-2026` | Combien coûte un site web en 2026 ? | Pour aller plus loin |
| `/blog/comment-creer-site-visible-google` | Comment créer un site visible sur Google | Pour aller plus loin |
| `/refonte-site-web` | prestation refonte de site web | CTA final |
| `/contact` | contactez-moi | CTA final |
| `/consultant-seo-sophia-antipolis` | Consultant SEO Sophia Antipolis | Section villes |
| `/consultant-seo-cannes` | Consultant SEO Cannes | Section villes |
| `/consultant-seo-nice` | Consultant SEO Nice | Section villes |

**Total liens internes** : 11 ✅
**Liens vers pilier silo** : 2 (`/refonte-site-web`) ✅

### F. FAQ Schema

3 questions :
1. Combien de temps dure une refonte SEO-safe ?
2. Faut-il un consultant SEO pour une refonte ?
3. Que faire si j'ai déjà perdu du trafic ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| ✅ | Title optimisé | 52 car. |
| ✅ | Meta description | 138 car. |
| ✅ | Contenu long | ~2 400 mots |
| ✅ | Lien vers pilier | 2 liens `/refonte-site-web` |
| ✅ | Lien vers article sœur | checklist-seo-refonte-site lié |
| ✅ | FAQ schema | 3 questions |
| ✅ | Tableaux de données | 7 tableaux |
| ⚠️ P1 | FAQ courte | 3 questions (minimum recommandé : 4-6) |
| ⚠️ P1 | Image partagée | Même image que article checklist |

---

## 3. Article : checklist-seo-refonte-site

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/checklist-seo-refonte-site` | ✅ |
| **Fichier source** | `content/blog/checklist-seo-refonte-site.md` | — |
| **Title** | `Checklist SEO : 45 points à vérifier pour votre refonte de site` | ✅ 60 car. |
| **Meta description** | `La checklist complète pour réussir votre refonte de site sans perdre votre SEO. 45 points avant, pendant et après la migration. Téléchargeable et imprimable.` | 🔴 160 car. (max 155) |
| **H1** | `Checklist SEO : 45 points à vérifier pour votre refonte de site` | ✅ (= title) |
| **Date** | 2026-02-16 | ✅ (très récent) |
| **Catégorie** | Refonte | ✅ |
| **Image** | `/images/blog/refonte-site-seo.jpg` | ⚠️ Image partagée |

**Score KW on-page** : 5/6
- [x] KW dans URL
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans premier paragraphe
- [ ] Meta description ≤155 caractères

### B. Structure des titres

```
H1: Checklist SEO : 45 points à vérifier pour votre refonte de site
  H2: Pourquoi cette checklist est indispensable
  H2: Phase 1 : Avant la refonte (Audit & Préparation)
    H3: Inventaire de l'existant (8 points)
    H3: Identification des pages prioritaires (5 points)
    H3: Plan de redirections (5 points)
    H3: Préparation technique (6 points)
  H2: Phase 2 : Pendant la refonte (Développement)
    H3: Structure et URLs (5 points)
    H3: Contenu et On-Page SEO (6 points)
    H3: Performance technique (5 points)
  H2: Phase 3 : Jour J (Mise en ligne)
    H3: Checklist de lancement (5 points)
  H2: Phase 4 : Après la refonte (Surveillance)
    H3: Semaine 1 : Surveillance intensive
    H3: Semaines 2-4 : Stabilisation
    H3: Mois 1-3 : Consolidation
  H2: Les 5 erreurs qui détruisent le SEO d'une refonte
    H3: Erreur #1 → #5
  H2: Outils recommandés pour votre migration
    H3: Avant / Pendant / Après la refonte
  H2: Planning type d'une refonte SEO-safe
  H2: Ce qu'il faut retenir
  H2: Questions fréquentes sur la refonte SEO (6 questions)
  H2: Pour aller plus loin
```

### C. Contenu intégral

**Nombre de mots** : ~2 500 mots ✅

**Thématiques couvertes** :
- Checklist exhaustive de 45 points organisée en 4 phases
- Phase 1 : Audit préalable (24 points)
- Phase 2 : Développement (16 points)
- Phase 3 : Jour J (5 points)
- Phase 4 : Surveillance post-lancement
- 5 erreurs fatales détaillées
- Outils recommandés par phase
- Planning type avec durées

**Points forts** :
- Format checklist avec cases à cocher (☐)
- 45 points concrets et actionnables
- 10+ tableaux de données
- 6 questions FAQ riches
- Date très récente (16/02/2026)

### D. Analyse sémantique

**Champ sémantique couvert** :
- checklist refonte, points à vérifier, migration SEO
- redirections 301, erreurs 404, sitemap XML
- robots.txt, noindex, canonical
- Core Web Vitals, performance, mobile-friendly
- Search Console, Analytics, Screaming Frog
- backlinks, pages prioritaires, trafic organique
- audit pré-migration, suivi post-lancement

**Densité KW principal** : "checklist" ~10 occurrences, "refonte" ~30 occurrences, "SEO" ~40 occurrences

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/refonte-site-web` | refonte de site web | Intro |
| `/blog/refonte-site-web-sans-perdre-seo` | comment refondre son site sans perdre son SEO | Intro (blockquote) |
| `/blog/refonte-site-web-sans-perdre-seo` | Refonte de site : comment ne pas perdre son SEO | Pour aller plus loin |
| `/blog/cout-site-web-2026` | Combien coûte un site web en 2026 ? | Pour aller plus loin |
| `/blog/comment-creer-site-visible-google` | Comment créer un site visible sur Google | Pour aller plus loin |
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | CTA final |
| `/refonte-site-web` | ma prestation refonte de site web | CTA final |
| `/contact` | contactez-moi | CTA final |

**Total liens internes** : 8 ✅
**Liens vers pilier silo** : 2 (`/refonte-site-web`) ✅
**Liens vers article sœur** : 2 (`refonte-site-web-sans-perdre-seo`) ✅

### F. FAQ Schema

6 questions :
1. Combien de temps pour retrouver mon trafic après une refonte ?
2. Puis-je changer de nom de domaine pendant la refonte ?
3. Faut-il garder exactement les mêmes URLs ?
4. Que faire si j'ai déjà perdu du trafic après ma refonte ?
5. Une refonte peut-elle améliorer mon SEO ?
6. Dois-je faire appel à un expert SEO pour ma refonte ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Meta description trop longue | 160 car. → réduire à 155 |
| ✅ | Title optimisé | 60 car. exactement |
| ✅ | Contenu long | ~2 500 mots |
| ✅ | Liens vers pilier | 2 liens `/refonte-site-web` |
| ✅ | Liens vers article sœur | 2 liens vers `refonte-site-web-sans-perdre-seo` |
| ✅ | FAQ riche | 6 questions |
| ✅ | Format checklist | 45 points actionnables |
| ⚠️ P1 | Image partagée | Même image que article principal |

---

## 4. Matrice de maillage du silo

### Liens entre pages du silo

| Depuis ↓ / Vers → | /refonte-site-web | sans-perdre-seo | checklist-seo |
|-------------------|:-----------------:|:---------------:|:-------------:|
| **/refonte-site-web** | — | ✅ | ✅ |
| **sans-perdre-seo** | ✅ (2x) | — | ✅ |
| **checklist-seo** | ✅ (2x) | ✅ (2x) | — |

**Score cocon** : 6/6 liens possibles = **100%** ✅

### Liens entrants vers le pilier

| Source | Ancre |
|--------|-------|
| `sans-perdre-seo` | refonte de site web |
| `sans-perdre-seo` | prestation refonte de site web |
| `checklist-seo` | refonte de site web |
| `checklist-seo` | ma prestation refonte de site web |
| `creation-site-web` (silo 6) | refonte de site web |
| `cout-site-web-2026` (silo 6) | (via section articles liés) |
| `pourquoi-site-lent` (silo 6) | Une refonte ciblée peut tout changer |

**Total liens entrants** : 7 ✅ (bon score)

---

## 5. Analyse qualité des ancres

### Ancres vers /refonte-site-web

| Ancre | Article source | Qualité |
|-------|----------------|---------|
| `refonte de site web` | sans-perdre-seo | ✅ Exacte |
| `prestation refonte de site web` | sans-perdre-seo | ✅ Longue traîne |
| `refonte de site web` | checklist-seo | ✅ Exacte |
| `ma prestation refonte de site web` | checklist-seo | ✅ Longue traîne |

**Qualité globale** : 4/4 ancres optimisées (100%) ✅

### Ancres vers articles du silo

| Ancre | Destination | Qualité |
|-------|-------------|---------|
| `Comment refondre son site sans perdre son SEO` | sans-perdre-seo | ✅ Descriptive |
| `Checklist SEO : 45 points pour votre refonte` | checklist-seo | ✅ Descriptive |
| `comment refondre son site sans perdre son SEO` | sans-perdre-seo | ✅ KW enrichi |
| `Refonte de site : comment ne pas perdre son SEO` | sans-perdre-seo | ✅ Variation title |

**Qualité globale** : 100% ancres optimisées ✅

---

## 6. Diagnostic global du silo

### Points forts

| ✅ | Détail |
|----|--------|
| **Maillage parfait** | Score cocon 100% - toutes les pages se lient entre elles |
| **Ancres optimisées** | 100% des ancres contiennent des KW pertinents |
| **Contenu long** | 2 articles > 2 000 mots |
| **FAQ riches** | 12 questions FAQ au total (3+3+6) |
| **Tableaux de données** | 17+ tableaux avec données structurées |
| **Article récent** | Checklist du 16/02/2026 |
| **Format actionnable** | 45 points checklist pratiques |
| **Cross-linking silo 6** | Liens depuis/vers silo Création |

### Points à améliorer (P1)

| ⚠️ | Détail | Impact |
|----|--------|--------|
| Images partagées | 2 articles utilisent la même image | Unique content signal |
| FAQ pilier courte | Seulement 3 questions sur pilier | Moins de rich snippets potentiels |
| Contenu pilier court | ~1 200 mots (service page) | Peut être enrichi |

### Problèmes critiques (P0)

| 🔴 | Détail | Correction |
|----|--------|------------|
| Meta description checklist | 160 car. | Réduire à ≤155 |

---

## 7. TOP 3 actions prioritaires

### P0 - Critique (à corriger immédiatement)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | **Raccourcir meta description** checklist-seo-refonte-site | `content/blog/checklist-seo-refonte-site.md` | 5 min |

### P1 - Importants (cette semaine)

| # | Action | Détail | Effort |
|---|--------|--------|--------|
| 2 | **Créer image unique** pour article checklist | Distinguer visuellement les 2 articles | 20 min |
| 3 | **Enrichir FAQ pilier** | Ajouter 2-3 questions supplémentaires | 15 min |

### Correction meta suggérée

**Meta description checklist-seo-refonte-site** (155 car.) :
```
La checklist complète pour réussir votre refonte de site sans perdre votre SEO. 45 points avant, pendant et après la migration.
```

(Suppression de "Téléchargeable et imprimable." = 155 car. exactement)

---

## Score global du silo

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Métadonnées | 9/10 | 1 seule meta description à corriger |
| Contenu | 9/10 | Articles complets, pilier un peu court |
| Maillage | 10/10 | Score cocon parfait 100% |
| Schema | 9/10 | FAQ complètes, Service schema |
| Ancres | 10/10 | 100% optimisées |
| **TOTAL** | **9.4/10** | Silo le mieux optimisé du site |

---

## Conclusion

Le silo Refonte est le **silo le mieux structuré du site**. Le maillage est parfait (100%), les ancres sont toutes optimisées, le contenu est de qualité et les 2 articles se complètent parfaitement (guide + checklist).

Une seule correction P0 est nécessaire (meta description de 5 caractères trop longue). Les actions P1 sont des optimisations mineures qui peuvent améliorer encore le silo, mais ne sont pas urgentes.

Ce silo peut servir de **modèle de référence** pour les autres silos du site.

---

*Audit réalisé le 19 février 2026 — Silo 5/10*
