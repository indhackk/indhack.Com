---
title: "Checklist refonte SEO : 45 points à vérifier [2026]"
description: "Checklist actionnable des 45 points SEO à vérifier avant, pendant et après une refonte de site web. Format condensé prêt à cocher. Par une consultante SEO."
date: "2026-04-21"
dateModified: "2026-04-21"
category: "Refonte"
image: "/images/blog/new_redesign_seo_1772274864650.webp"
imageAlt: "Checklist refonte SEO 2026 : 45 points à cocher avant, pendant et après migration"
author: "Indiana Aflalo"
keywords: ["checklist seo refonte site", "checklist refonte seo", "checklist migration seo", "checklist refonte site web seo", "checklist pré-migration seo", "checklist post-migration seo"]
---

Une refonte de site web sans checklist SEO rigoureuse, c'est **-40 % de trafic organique en moyenne** dans les 90 jours post-lancement (étude Search Engine Journal, 2025). Voici la checklist condensée des **45 points critiques** à cocher avant, pendant et après votre migration.

> **Cette checklist est une version condensée, format outil de travail.** Pour la méthodologie complète avec les explications détaillées et les pièges à éviter, consultez mon [guide complet sur la refonte de site web sans perdre son SEO](/blog/refonte-site-web-sans-perdre-seo).

**Sommaire :**

1. [Avant la refonte — 18 points](#avant-la-refonte-18-points)
2. [Pendant la refonte — 14 points](#pendant-la-refonte-14-points)
3. [Après la refonte — 13 points](#apres-la-refonte-13-points)
4. [FAQ](#faq)

---

## Avant la refonte — 18 points

### Audit du site existant (8 points)

- [ ] **1.** Export complet du sitemap actuel (XML + CSV pour analyse)
- [ ] **2.** Crawl complet du site avec Screaming Frog ou équivalent (URLs, title, meta, H1, codes réponse)
- [ ] **3.** Export de toutes les URLs indexées dans Google Search Console (Couverture → Valides)
- [ ] **4.** Inventaire des URLs avec backlinks entrants (Ahrefs, Majestic ou Semrush)
- [ ] **5.** Liste des top 50 pages par trafic organique (Search Console, 12 derniers mois)
- [ ] **6.** Liste des top 100 requêtes par impressions (Search Console)
- [ ] **7.** Capture des positions Google actuelles sur 50 mots-clés prioritaires (outil de suivi)
- [ ] **8.** Audit de l'[accessibilité IA avec testeur de visibilité IA](/outils/testeur-visibilite-ia) pour baseline GEO

### Préparation du plan (10 points)

- [ ] **9.** Cartographie des redirections 301 : ancien URL → nouveau URL (tableau exhaustif)
- [ ] **10.** Validation qu'AUCUN 301 ne pointe vers une URL inexistante (tester chaque destination)
- [ ] **11.** Vérification qu'aucun 301 ne crée de chaîne (A → B → C interdit)
- [ ] **12.** Plan de conservation des meta title et description des pages à fort trafic
- [ ] **13.** Plan de conservation des images alt et noms de fichiers
- [ ] **14.** Plan de conservation des H1 et structure Hn des pages piliers
- [ ] **15.** Validation que le nouveau CMS ne génère pas d'URLs dupliquées (UTM, filtres, pagination)
- [ ] **16.** Préparation du nouveau robots.txt (avec bonnes règles GPTBot/Claude-Web si GEO — [voir le générateur](/outils/generateur-robots-txt))
- [ ] **17.** Préparation du nouveau fichier llms.txt pour l'optimisation GEO
- [ ] **18.** Vérification que les données structurées Schema.org seront préservées ou améliorées

## Pendant la refonte — 14 points

### Environnement de staging (6 points)

- [ ] **19.** Site de staging bloqué par `Disallow: /` **ET** authentification HTTP (double barrière)
- [ ] **20.** Meta robots `noindex, nofollow` sur chaque page de staging
- [ ] **21.** Exclusion du staging dans Google Search Console (ne pas soumettre par erreur)
- [ ] **22.** Tests des 301 sur staging avant mise en prod (au moins 50 URLs représentatives)
- [ ] **23.** Validation HTTPS complet (certificat SSL, pas de mixed content)
- [ ] **24.** Tests Core Web Vitals sur staging (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1)

### Jour de la mise en production (8 points)

- [ ] **25.** Bascule DNS pendant une période de faible trafic (nuit, weekend, fériés pour du B2C)
- [ ] **26.** Activation des 301 synchronisée avec la bascule DNS
- [ ] **27.** Suppression du `Disallow: /` du robots.txt (double-check crucial)
- [ ] **28.** Suppression des meta `noindex` sur toutes les pages publiques
- [ ] **29.** Génération et soumission du nouveau sitemap.xml à GSC et Bing Webmaster
- [ ] **30.** Ping IndexNow pour accélérer la découverte (Bing, Yandex redistribuent)
- [ ] **31.** Demande d'indexation manuelle dans GSC pour les 10 pages les plus stratégiques
- [ ] **32.** Annonce de la refonte sur LinkedIn/Twitter pour accélérer la découverte des crawlers

## Après la refonte — 13 points

### Surveillance 48h (5 points)

- [ ] **33.** Monitoring des codes réponse HTTP (aucun 5xx, 4xx tolérés uniquement sur erreurs volontaires)
- [ ] **34.** Vérification que les 301 fonctionnent avec `curl -I` ou Screaming Frog sur l'ensemble de la liste
- [ ] **35.** Tests des pages piliers dans 3 navigateurs (mobile et desktop)
- [ ] **36.** Vérification que les schémas JSON-LD sont présents et valides (Google Rich Results Test)
- [ ] **37.** Contrôle du trafic organique dans Google Analytics 4 (alarme si chute > 30 %)

### Surveillance 30 jours (5 points)

- [ ] **38.** Monitoring quotidien des positions Google sur les 50 mots-clés prioritaires
- [ ] **39.** Contrôle hebdomadaire des pages indexées dans GSC (Couverture → Valides)
- [ ] **40.** Correction immédiate des 404 qui apparaissent dans GSC (Couverture → Erreurs 404)
- [ ] **41.** Vérification du rapport « Amélioration » dans GSC (Core Web Vitals, mobile, AMP)
- [ ] **42.** Audit SEO post-migration avec [l'outil d'audit SEO gratuit](/outils/audit-seo-gratuit) pour baseline

### Consolidation 90 jours (3 points)

- [ ] **43.** Campagne de backlinks pour remplacer les liens qui pointent vers les anciennes URLs
- [ ] **44.** Vérification que le trafic organique a récupéré ≥ 90 % de son niveau pré-migration
- [ ] **45.** Documentation des leçons apprises pour la prochaine refonte

---

## FAQ

**Cette checklist convient-elle aussi pour une migration CMS (WordPress vers Next.js) ?**
Oui, les 45 points sont agnostiques du CMS. La migration CMS ajoute 2 points spécifiques : exporter le contenu dans un format intermédiaire (Markdown, JSON) et tester que les caractères spéciaux (accents, emoji, guillemets français) sont préservés. Si vous faites une migration CMS, mon [guide complet refonte sans perdre le SEO](/blog/refonte-site-web-sans-perdre-seo) détaille ces étapes spécifiques.

**Combien de temps prend une refonte SEO complète en suivant cette checklist ?**
Pour un site de 50-100 pages : compter 2-3 semaines de préparation avant, 1 journée pour la bascule, 90 jours de monitoring post-lancement. Pour 500+ pages, doubler les délais de préparation.

**Quelle est l'erreur la plus fréquente lors d'une refonte SEO ?**
Oublier de retirer le `Disallow: /` du robots.txt après la bascule en production. J'ai vu **3 sites clients perdre 80 % de leur trafic pendant 6-8 semaines** à cause de cette seule erreur. Point 27 de la checklist : double-check obligatoire.

---

**Besoin d'un accompagnement pour votre refonte SEO ?** [Contactez-moi](/contact) pour un devis d'audit pré-migration et d'accompagnement complet. Je prends en charge la cartographie des 301, la surveillance post-lancement et la récupération des positions perdues.
