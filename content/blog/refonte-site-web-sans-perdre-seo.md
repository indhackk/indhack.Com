---
title: "Checklist SEO refonte site : 45 points à vérifier [2026]"
description: "Checklist : 45 points SEO à vérifier avant, pendant et après votre refonte. Redirections, 404, robots.txt. Gardez vos positions."
date: "2026-02-16"
category: "Refonte"
image: "/images/blog/new_redesign_seo_1772274864650.png"
imageAlt: "Checklist refonte site web : 45 points SEO pour éviter la perte de positions Google"
author: "Indiana Aflalo"
keywords: ["refonte site web SEO", "checklist seo refonte site", "migration SEO", "redirections 301", "perdre positions Google", "refonte sans perdre référencement", "checklist migration", "audit pre-migration", "plan de redirection", "erreurs 404", "perte de positionnement", "robots.txt migration"]
---

Une refonte de site web mal préparée peut **anéantir des années de travail SEO** en quelques jours. J'ai vu des entreprises subir une perte de positionnement de 80% du jour au lendemain à cause d'erreurs évitables : plan de redirection absent, erreurs 404 massives, robots.txt bloquant l'indexation.

En tant que consultante SEO spécialiste en [refonte de site web](/refonte-site-web), je vous livre la **méthode complète** pour réussir votre migration SEO sans sacrifier vos positions Google. Un audit pré-migration rigoureux, un plan de redirection exhaustif, et une surveillance post-lancement sont les clés du succès. Avant de commencer, testez votre site actuel avec notre [outil d'audit SEO gratuit](/outils/audit-seo-gratuit).

> **Cet article inclut une checklist complète de 45 points** à vérifier avant, pendant et après votre refonte. Téléchargeable gratuitement, vous pouvez l'utiliser comme référence tout au long de votre projet de migration.

## Pourquoi les refontes SEO échouent ?

Une refonte mal préparée peut faire perdre 50 à 80 % du trafic organique en quelques jours (source : études de cas SEMrush). La plupart des agences web se concentrent sur le design et les fonctionnalités. Le SEO est traité **après coup**, quand le site est déjà en ligne. Résultat :

| Erreur | Conséquence |
|--------|-------------|
| URLs modifiées sans redirections | Pages introuvables, erreurs 404 |
| Structure de site changée | Google perd ses repères |
| Contenu supprimé ou modifié | Perte des positions acquises |
| Temps de chargement dégradé | Core Web Vitals dans le rouge |
| Balises meta oubliées | Indexation compromise |

**La bonne nouvelle** : avec une préparation rigoureuse, vous pouvez refondre votre site ET améliorer votre SEO.

---

## Phase 1 : Avant la refonte — audit et préparation

### Inventorier l'existant

Avant de toucher à quoi que ce soit, documentez **tout** ce qui fonctionne :

| Élément à auditer | Outil recommandé |
|-------------------|------------------|
| **Liste des URLs** | Screaming Frog (crawl complet) |
| **Positions actuelles** | Ahrefs, SEMrush ou Search Console |
| **Trafic par page** | Google Analytics |
| **Backlinks** | Ahrefs, Majestic |
| **Structure de liens internes** | Screaming Frog |

#### Checklist inventaire

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 1 | **Crawl complet du site actuel** réalisé (Screaming Frog, Sitebulb) | ☐ |
| 2 | **Export de toutes les URLs** du site (avec statuts HTTP) | ☐ |
| 3 | **Liste des pages indexées** extraite de Google Search Console | ☐ |
| 4 | **Positions actuelles** sur les mots-clés principaux documentées | ☐ |
| 5 | **Trafic par page** exporté depuis Google Analytics (12 derniers mois) | ☐ |
| 6 | **Pages de conversion** identifiées (celles qui génèrent des leads/ventes) | ☐ |
| 7 | **Backlinks** exportés (Ahrefs, Majestic, Search Console) | ☐ |
| 8 | **Données structurées** actuelles listées (FAQ, Article, LocalBusiness...) | ☐ |

### Identifier vos pages stars

Toutes vos pages n'ont pas la même valeur. Identifiez les **20% qui génèrent 80% du trafic** :

- Pages les plus visitées (Analytics)
- Pages les mieux positionnées (Search Console)
- Pages qui reçoivent des backlinks (Ahrefs)
- Pages qui convertissent (Analytics → Conversions)

Ces pages sont **prioritaires** : elles ne doivent subir aucune régression.

#### Checklist pages prioritaires

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 9 | **Top 20 pages par trafic** identifiées | ☐ |
| 10 | **Top 20 pages par positions** (mots-clés stratégiques) identifiées | ☐ |
| 11 | **Pages avec backlinks** listées (ne jamais supprimer sans redirect) | ☐ |
| 12 | **Pages de conversion** marquées comme prioritaires | ☐ |
| 13 | **Contenu evergreen** identifié (articles qui rankent depuis longtemps) | ☐ |

### Cartographier les redirections

Créez un **tableau de correspondance** entre anciennes et nouvelles URLs. C'est LE document le plus important de votre migration.

| Ancienne URL | Nouvelle URL | Statut |
|--------------|--------------|--------|
| /services/plomberie | /plomberie | Redirect 301 |
| /blog/article-1 | /blog/article-1 | Identique |
| /contact.html | /contact | Redirect 301 |
| /page-obsolete | - | Supprimée (410) |

**Règle d'or** : chaque ancienne URL doit avoir une destination.

#### Checklist redirections

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 14 | **Tableau de correspondance** créé (ancienne URL → nouvelle URL) | ☐ |
| 15 | **Chaque ancienne URL** a une destination définie | ☐ |
| 16 | **Pages à supprimer** identifiées (410) vs pages à rediriger (301) | ☐ |
| 17 | **Règles regex** préparées pour les patterns d'URL récurrents | ☐ |
| 18 | **Redirections testées** sur environnement de staging | ☐ |

### Préparation technique

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 19 | **Environnement de staging** configuré (bloqué aux robots) | ☐ |
| 20 | **Nouveau sitemap XML** préparé | ☐ |
| 21 | **Robots.txt** du nouveau site vérifié | ☐ |
| 22 | **Balises canonical** planifiées pour chaque page | ☐ |
| 23 | **Données structurées** prévues sur le nouveau site | ☐ |
| 24 | **Tracking Analytics** configuré sur le nouveau site | ☐ |

---

## Phase 2 : Pendant la refonte — développement

### Conserver la structure d'URL si possible

Le mieux est de **garder les mêmes URLs**. Si vous devez les modifier :

- Gardez une logique similaire
- Évitez les URLs trop longues ou avec paramètres
- Utilisez des mots-clés pertinents
- Pas d'accents, pas de majuscules, tirets uniquement

| Avant | Après (bon) | Après (mauvais) |
|-------|-------------|-----------------|
| /plombier-nice | /plombier-nice | /services/plomberie-chauffage-nice-06 |
| /blog/seo-2024 | /blog/seo-2025 | /actualites/article-42 |

#### Checklist structure et URLs

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 25 | **URLs identiques** conservées quand c'est possible | ☐ |
| 26 | **Nouvelles URLs** propres (lowercase, tirets, pas d'accents) | ☐ |
| 27 | **Hiérarchie d'URL** logique et cohérente | ☐ |
| 28 | **Pas de paramètres** inutiles dans les URLs | ☐ |
| 29 | **Trailing slash** cohérent (avec ou sans, mais pas les deux) | ☐ |

### Implémenter les redirections 301

Les redirections 301 indiquent à Google que la page a **définitivement** changé d'adresse. Le "jus SEO" est transféré à hauteur de ~90%.

```
# Exemple .htaccess
Redirect 301 /ancienne-page /nouvelle-page
```

Pour Next.js (le framework que j'utilise chez [IndHack](/creation-site-web)) :

```javascript
// next.config.js
async redirects() {
  return [
    {
      source: '/ancienne-page',
      destination: '/nouvelle-page',
      permanent: true, // 301
    },
  ]
}
```

### Conserver le contenu performant

Ne réécrivez pas les pages qui rankent bien. Si vous devez modifier le contenu :

- **Gardez** les mots-clés principaux aux mêmes endroits
- **Gardez** la structure Hn (H1, H2, H3...)
- **Gardez** les paragraphes clés qui matchent l'intention de recherche
- **Améliorez** plutôt que de remplacer

#### Checklist contenu et on-page SEO

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 30 | **Contenu des pages prioritaires** conservé à l'identique | ☐ |
| 31 | **Balises title** migrées (ou améliorées) | ☐ |
| 32 | **Meta descriptions** migrées | ☐ |
| 33 | **Structure Hn** (H1, H2, H3) respectée | ☐ |
| 34 | **Attributs alt** des images conservés | ☐ |
| 35 | **Maillage interne** recréé (liens entre pages) | ☐ |

### Optimiser la vitesse

Une refonte est l'occasion d'**améliorer les performances** :

| Objectif | Seuil recommandé |
|----------|-----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s |
| **INP** (Interaction to Next Paint) | < 200ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |
| **TTFB** (Time To First Byte) | < 800ms |

Technologies performantes :
- Next.js, Nuxt.js (rendu serveur)
- Images optimisées (WebP, lazy loading)
- CDN (Cloudflare, Vercel Edge)
- Cache agressif

#### Checklist performance technique

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 36 | **Core Web Vitals** testés sur staging (LCP < 2.5s, CLS < 0.1) | ☐ |
| 37 | **Images optimisées** (WebP, lazy loading, dimensions définies) | ☐ |
| 38 | **CSS/JS** minifiés et différés si possible | ☐ |
| 39 | **HTTPS** actif avec redirections HTTP → HTTPS | ☐ |
| 40 | **Mobile-friendly** vérifié (test Google) | ☐ |

---

## Phase 3 : Le jour J — mise en ligne

### Checklist de lancement

Avant de basculer en production :

| # | Point à vérifier | ✓ |
|---|-----------------|---|
| 41 | **Redirections 301** actives et fonctionnelles | ☐ |
| 42 | **Robots.txt** autorise l'indexation | ☐ |
| 43 | **Sitemap XML** soumis dans Search Console | ☐ |
| 44 | **Balises noindex** retirées (si présentes sur staging) | ☐ |
| 45 | **Test de crawl** post-lancement réalisé | ☐ |

### Actions post-lancement

Dans les 24h suivant la mise en ligne :

1. **Soumettre le nouveau sitemap** dans Search Console
2. **Demander l'indexation** des pages principales
3. **Vérifier les erreurs 404** dans Search Console
4. **Tester les Core Web Vitals** sur PageSpeed Insights
5. **Vérifier le suivi Analytics** (trafic bien mesuré ?)

---

## Phase 4 : Après la refonte — surveillance

### Semaine 1-2 : surveillance intensive

Vérifiez **quotidiennement** pendant la première semaine :

| Métrique | Où vérifier | Alerte si... |
|----------|-------------|--------------|
| **Erreurs 404** | Search Console → Pages | > 10 nouvelles erreurs/jour |
| **Trafic organique** | Analytics | Chute > 20% |
| **Pages indexées** | Search Console → Indexation | Diminution soudaine |
| **Core Web Vitals** | Search Console → Expérience | Passage au rouge |
| **Positions clés** | Ahrefs / SEMrush | Chute > 5 positions |

### Semaines 2-4 : stabilisation

Google met **2 à 4 semaines** pour réévaluer complètement un site après une refonte. Une légère baisse de trafic est normale.

| Situation | Réaction |
|-----------|----------|
| **Baisse < 15%** | Normal, surveiller |
| **Baisse 15-30%** | Vérifier les redirections et erreurs |
| **Baisse > 30%** | Audit urgent, problème majeur |

- Corriger immédiatement toute erreur 404 détectée
- Demander l'indexation des pages importantes via Search Console
- Surveiller le comportement du trafic
- Vérifier que les backlinks pointent vers les bonnes pages

### Mois 1-3 : consolidation

Une refonte réussie se traduit par :

- Trafic qui revient au niveau initial sous 4-6 semaines
- Amélioration des Core Web Vitals
- Taux de rebond stable ou en baisse
- Pas de chute de positions sur vos mots-clés principaux

---

## Les 5 erreurs fatales qui détruisent le SEO d'une refonte

### Erreur #1 : Lancer sans redirections

**Ce qui se passe** : Toutes les anciennes URLs retournent 404. Google désindexe ces pages. Les backlinks pointent vers du vide.

**Impact** : Perte de 50-100% du trafic organique.

**Comment l'éviter** : Préparer le tableau de redirections AVANT le développement. Tester sur staging.

### Erreur #2 : Noindex ou robots.txt bloquant

**Ce qui se passe** : Le nouveau site est invisible pour Google. Souvent un oubli de la config staging.

**Impact** : Désindexation complète du site.

**Comment l'éviter** : Vérifier robots.txt et meta robots sur CHAQUE template avant la mise en ligne.

### Erreur #3 : Supprimer du contenu qui ranke

**Ce qui se passe** : Une page qui génère du trafic est supprimée "parce qu'elle est vieille".

**Impact** : Perte des positions et du trafic associés.

**Comment l'éviter** : Auditer le trafic par page. Ne jamais supprimer sans vérifier les données.

### Erreur #4 : Chaînes de redirections

**Ce qui se passe** : Page A → Page B → Page C → Page D. Trop de sauts.

**Impact** : Perte de "jus SEO" à chaque redirection. Temps de chargement dégradé.

**Comment l'éviter** : Toujours rediriger directement vers la destination finale. Pas de chaînes.

### Erreur #5 : Oublier les données structurées

**Ce qui se passe** : Les rich snippets (FAQ, avis, recettes...) disparaissent des résultats Google.

**Impact** : Baisse du CTR, perte de visibilité SERP.

**Comment l'éviter** : Lister toutes les données structurées actuelles. Les migrer sur le nouveau site.

---

## Outils recommandés pour une migration SEO-safe

### Avant la refonte

| Outil | Usage | Prix |
|-------|-------|------|
| **Screaming Frog** | Crawl complet, export URLs | Gratuit (500 URLs) / £199/an |
| **Google Search Console** | Pages indexées, performances | Gratuit |
| **Google Analytics** | Trafic par page, conversions | Gratuit |
| **Ahrefs / SEMrush** | Backlinks, positions | À partir de $99/mois |

### Pendant la refonte

| Outil | Usage |
|-------|-------|
| **Redirect Path** (extension Chrome) | Vérifier les redirections |
| **PageSpeed Insights** | Tester les Core Web Vitals |
| **Mobile-Friendly Test** | Vérifier la compatibilité mobile |
| **Rich Results Test** | Valider les données structurées |

### Après la refonte

| Outil | Usage |
|-------|-------|
| **Google Search Console** | Surveiller erreurs et indexation |
| **Screaming Frog** | Crawl post-lancement |
| **Rank tracker** | Suivre les positions clés |

---

## Planning type d'une refonte SEO-safe

| Phase | Durée indicative | Actions clés |
|-------|------------------|--------------|
| **Audit préalable** | 1-2 semaines | Crawl, export données, identification pages prioritaires |
| **Plan de migration** | 1 semaine | Tableau redirections, plan technique |
| **Développement** | Variable | Intégration SEO continue, tests staging |
| **Recette SEO** | 3-5 jours | Vérification checklist complète |
| **Mise en ligne** | 1 jour | Lancement + soumission sitemap |
| **Surveillance** | 4-6 semaines | Monitoring quotidien puis hebdomadaire |

---

## Ce qu'il faut retenir

Une refonte réussie côté SEO repose sur :

1. **Audit pré-migration exhaustif** de l'existant avant de commencer
2. **Plan de redirection 301** complet et testé (éviter les chaînes de redirections)
3. **Conservation** du contenu performant et du maillage interne
4. **Amélioration** des performances techniques (Core Web Vitals, mobile-first)
5. **Surveillance intensive** post-lancement (erreurs 404, perte de positionnement)

---

## Questions fréquentes

**Combien de temps pour retrouver mon trafic après une refonte ?**

Avec une migration bien préparée et un plan de redirection solide, le trafic revient au niveau initial en 4 à 6 semaines. Une légère baisse temporaire (10-15%) est normale pendant que Google réévalue le site. Si la baisse dépasse 30% après 2 semaines, il y a probablement un problème technique à corriger d'urgence (erreurs 404, chaînes de redirections, robots.txt bloquant).

**Combien de temps dure une refonte SEO-safe ?**

Comptez 2 à 4 semaines pour l'audit pré-migration et la préparation du plan de redirection, puis le temps de développement (variable selon la taille du site), et 4 à 6 semaines de surveillance post-lancement. Une refonte bien préparée prend plus de temps, mais évite des mois de récupération SEO et une perte de positionnement catastrophique.

**Puis-je changer de nom de domaine pendant la refonte ?**

Oui, mais c'est une migration plus complexe. En plus des redirections 301 classiques, il faut utiliser l'outil "Changement d'adresse" dans Google Search Console. Comptez 2-3 mois avant de retrouver vos positions. Je recommande de dissocier les deux : d'abord la refonte, puis le changement de domaine (ou l'inverse).

**Faut-il garder exactement les mêmes URLs ?**

C'est l'idéal si vos URLs actuelles sont propres. Mais si elles sont mal structurées (paramètres, accents, trop longues), la refonte est l'occasion de les améliorer. L'important est d'avoir un plan de redirection 301 parfait : chaque ancienne URL doit pointer vers sa nouvelle destination sans créer de chaîne de redirections.

**Faut-il un consultant SEO pour une refonte ?**

Pour un petit site vitrine (moins de 20 pages), cette checklist peut suffire si vous êtes rigoureux. Pour un site e-commerce ou un blog avec beaucoup de contenu, l'accompagnement d'un expert réduit drastiquement les risques de perte de positionnement. Le coût d'un consultant est bien inférieur à la perte de trafic d'une migration ratée.

**Que faire si j'ai déjà perdu du trafic après ma refonte ?**

Agissez vite : vérifiez les erreurs 404 dans Search Console, contrôlez que robots.txt n'est pas bloquant, testez toutes les redirections 301 avec l'extension Redirect Path. Corrigez chaque problème détecté et demandez une réindexation. Plus vous intervenez rapidement, plus la récupération sera rapide.

**Une refonte peut-elle améliorer mon SEO ?**

Absolument. Si votre ancien site était lent, mal structuré ou avec un contenu thin, une refonte bien menée peut améliorer vos positions. Les Core Web Vitals (LCP, INP, CLS) sont un facteur de ranking : un nouveau site rapide et mobile-first peut surpasser l'ancien. L'important est de ne rien perdre pendant la transition grâce à un audit pré-migration rigoureux.

---

## Pour aller plus loin

- [Combien coûte un site web en 2026 ?](/blog/prix-creation-site-internet-2026) — Budget pour votre refonte
- [Comment créer un site visible sur Google](/blog/comment-creer-site-visible-google) — Les fondamentaux si vous repartez de zéro

---

**Vous planifiez une refonte ?** Testez d'abord votre site actuel avec notre [outil d'audit SEO gratuit](/outils/audit-seo-gratuit). Puis découvrez [ma prestation refonte de site web](/refonte-site-web) ou [contactez-moi](/contact) pour un diagnostic gratuit.

**Services par ville :**
- [Consultant SEO Sophia Antipolis](/consultant-seo-sophia-antipolis) — Refontes tech et SaaS
- [Consultant SEO Cannes](/consultant-seo-cannes) — Refontes luxe et prestige
- [Consultant SEO Nice](/consultant-seo-nice) — Refontes tous secteurs

---

**Tags** : #refonte-site #checklist-seo #migration-seo #redirections-301 #core-web-vitals #seo-technique
