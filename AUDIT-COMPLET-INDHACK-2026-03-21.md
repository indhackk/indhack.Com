# Audit complet indhack.com — 21 mars 2026

Audit exhaustif couvrant : sécurité, SEO technique, GEO, UX/UI, esthétique, charte graphique et images.

---

## Résumé exécutif

| Domaine | Score | Problèmes critiques | Problèmes hauts | Problèmes moyens |
|---------|-------|---------------------|------------------|-------------------|
| Sécurité | 7/10 | 2 | 5 | 3 |
| SEO technique | 6/10 | 6 | 37 | 4 |
| GEO | 8/10 | 1 | 1 | 1 |
| UX/UI | 7/10 | 1 | 3 | 2 |
| Esthétique & charte | 8/10 | 0 | 2 | 2 |
| Images & assets | 5/10 | 1 | 3 | 2 |

**Total : 10 problèmes critiques, 51 hauts, 14 moyens**

---

## 1. Sécurité

### Critiques

1. **Next.js v14.2.35 — 4 vulnérabilités HIGH connues**
   - DoS via Image Optimizer, HTTP request smuggling, unbounded disk cache
   - **Fichier :** `package.json` ligne 40
   - **Action :** Mettre à jour vers Next.js 16.2.1+

2. **SheetJS (xlsx) — Prototype Pollution + ReDoS sans correctif**
   - **Fichier :** `package.json` ligne 71
   - **Action :** Remplacer par papaparse ou isoler

### Hauts

3. **Exposition d'erreurs détaillées** dans 6 API routes — expose chemins système et stack traces
   - `app/api/audit-seo/route.ts` ligne 561, `app/api/simulateur-visibilite-locale/route.ts` ligne 265
   - **Action :** Mapper à messages génériques en production

4. **Rate limiting en mémoire** — non distribué, reset au redémarrage, contournable
   - `middleware.ts` lignes 5-24
   - **Action :** Migrer vers Upstash Redis

5. **Middleware rate limiting trop généreux** — 100 req/min pour toutes les APIs, basé uniquement sur IP
   - **Action :** Rate limiting par-route

6. **Google OAuth tokens en plaintext** dans cookie (route GMB)
   - `app/api/auth/google/callback/route.ts` lignes 82-91
   - **Action :** Chiffrer avec AES-256-GCM

7. **glob command injection** via dépendance transitive (eslint-config-next)
   - **Action :** `npm audit fix --force`

### Moyens

8. **Validation cookie admin_auth insuffisante** — vérifie format regex uniquement, pas HMAC
9. **Pas de protection CSRF** sur le formulaire de contact
10. **25+ console.log/console.error** en production — fuite potentielle d'infos

### Points positifs sécurité
- Headers de sécurité bien configurés (HSTS, CSP strict)
- Validation et sanitization des formulaires robustes
- Protection SSRF implémentée
- Aucun secret exposé dans le code source
- Timing-safe comparison pour auth

---

## 2. SEO technique

### Critiques

1. **40/46 pages (87 %) sans balise H1** — Problème massif affectant le ranking Google
   - Les pages utilisent probablement des composants client qui rendent le H1 côté JS, mais l'absence de H1 dans le SSR initial est un problème
   - **Action :** Vérifier que chaque page a un H1 visible dans le HTML initial

2. **2 pages sans title tag** : /(gmb-app) et /admin-login
   - **Action :** Ajouter des titles même sur les pages internes (admin)

3. **3 pages sans meta description** : /(gmb-app), /admin-login, /dashboard

4. **17 pages avec title > 60 caractères** (tronqué dans les SERP)
   - Principalement les pages villes : "Consultante SEO Paris (75000) | Experte référencement Île-de-France" = 70 caractères
   - **Action :** Raccourcir à ≤ 60 caractères

5. **15 pages avec description < 120 caractères** (sous-optimisées)
   - **Action :** Enrichir les descriptions entre 120-160 caractères

6. **1 lien cassé** vers `/laboratoire-geo/vultifrine`

### Hauts

7. **Doublon JSON-LD schemas** — Organization + LocalBusiness en double sur la homepage (via layout.tsx global + HomepageSchemas component)
   - **Action :** Dédupliquer

8. **Conflit robots.txt** : CCBot est autorisé mais devrait potentiellement être bloqué (selon stratégie GEO)

9. **3 articles blog** marqués en draft (non publiés mais présents dans le codebase)

10. **Faute de grammaire page Paris** : "des clients qualifiés **des** Paris" → devrait être "**de** Paris"
    - **Fichier :** `app/consultant-seo-paris/page.tsx` ou `components/templates/CityPageTemplateV2.tsx`

### Moyens

11. **Majuscules françaises incorrectes** dans 2 titles (règle typographique française non respectée)
12. **2 descriptions > 160 caractères** (trop longues, tronquées)
13. **1 article sans keywords** dans le frontmatter

### Points positifs SEO
- Canonical URLs parfaits sur toutes les pages
- 77 redirections 301 bien configurées
- Sitemap auto-généré correctement
- OpenGraph à jour
- Blog metadata globalement bon

---

## 3. GEO (Generative Engine Optimization)

### Critique

1. **`/diagnostic/*` bloqué dans robots.txt pour tous les crawlers** (y compris IA)
   - 10+ pages de diagnostic métier (avocat, coiffeur, dentiste, plombier...) invisibles aux IA
   - **Impact :** Perte estimée 5-10 % du potentiel de visibilité IA
   - **Action :** Débloquer pour les crawlers IA ou ajouter JSON-LD SearchAction

### Haut

2. **25/33 articles blog (76 %) sans dateModified explicite**
   - Le fallback utilise la date de publication, mais les IA (surtout Perplexity) favorisent le "freshness signal"
   - **Action :** Ajouter dateModified sur tous les articles de 2026

### Moyen

3. **Bytespider absent du robots.txt** (mentionné dans llms.txt mais pas dans robots.txt)
   - **Action :** Ajouter `User-agent: Bytespider` pour cohérence

### Points positifs GEO (score 80/100)
- llms.txt complet et bien structuré (204 lignes + version full 1 421 lignes)
- 10 articles GEO/IA de haute qualité avec sources primaires citées
- Contenu Q&R structuré systématiquement (FAQ avec schema)
- Ton d'expert première personne avec données chiffrées
- E-E-A-T signals forts (Person schema, credentials, about page)
- Outil testeur IA unique et fonctionnel
- Schemas JSON-LD riches et variés (9 types)

---

## 4. UX/UI & accessibilité

### Critique

1. **Contraste insuffisant sur les animations fade-in** — Quand les sections apparaissent en scrollant, le contenu est temporairement à très faible opacité (opacity: 0 → 1). Sur certains écrans, les cartes services et la FAQ restent "fantômes" plusieurs secondes
   - Visible sur screenshots : section Expertises avec texte quasi invisible avant que l'animation ne se déclenche
   - **Action :** Augmenter l'opacité initiale de 0 à 0.3 minimum, ou réduire la durée

### Hauts

2. **Section "Testez votre performance SEO"** — le titre et le sous-titre ont un contraste très faible sur le fond vert sombre (texte gris clair sur fond-sombre)
   - **Action :** Augmenter le contraste du texte dans SEOScoreChecker

3. **Section CTA "RAPIDE / EFFICACE / RENTABLE"** — mots presque invisibles sur fond sombre
   - **Action :** Augmenter opacité ou changer couleur

4. **Bouton CTA flottant "Audit Gratuit"** avec pastille rouge en bas à droite — peut masquer du contenu sur mobile
   - **Action :** Vérifier qu'il ne couvre pas de liens importants sur petit écran

### Moyens

5. **Pas de breadcrumb visible** sur la homepage (mais bien présent sur les pages internes)
6. **Pas de "back to top"** button sur les longues pages

### Points positifs UX
- Navigation claire et cohérente avec mega menu
- CTAs bien placés (header + hero + floating + footer)
- Parcours de conversion fluide : audit gratuit → contact → téléphone
- Formulaire de contact bien structuré avec validation

---

## 5. Esthétique & charte graphique

### Hauts

1. **Incohérence de style des boutons CTA** dans la section About :
   - "DÉCOUVRIR LE PARCOURS" et "ME CONTACTER" sont en style grisé/muted au lieu du style accent doré ou sauge habituel
   - **Action :** Uniformiser avec les CTA du reste du site (accent doré ou sauge)

2. **Titre "ORGANIQUE ENTRE DE BONNES MAINS"** — Le mot "ORGANIQUE" est en gris très clair (#texte-moyen), quasi invisible sur fond blanc. Effet "reveal" qui fonctionne mal visuellement
   - **Action :** Augmenter le contraste du titre About ou supprimer l'effet de transparence

### Moyens

3. **Espacement incohérent** entre les sections hero → trust signals → services : le gap après le hero est très grand (espace vide visible)
4. **Les tags de catégorie blog** (IA & SEO, SEO Technique, etc.) ont des couleurs différentes sans logique cohérente apparente

### Points positifs charte
- Palette sauge cohérente et professionnelle
- Typographie Space Grotesk / Inter bien utilisée
- Design globalement élégant et moderne
- Le 3D cerveau dans le hero est un différenciateur
- Footer complet avec excellent maillage

---

## 6. Images & assets

### Critique

1. **194 images orphelines** dans `/public/images/` — non référencées dans le code
   - 45 images blog orphelines, 128 images villes, 54 images city-optimized
   - **Impact :** Gaspillage de stockage et bande passante Vercel
   - **Action :** Auditer et supprimer les images non utilisées (économie > 50 Mo estimée)

### Hauts

2. **11 fichiers PNG > 200 Ko avec doublons WebP existants**
   - `nice-seo-hero.png` (1.1 Mo), `nice-premium-indhack.png` (916 Ko), `nice-workspace.png` (652 Ko), + 8 autres
   - **Économie potentielle : 7.2 Mo** si suppression des PNG redondants
   - **Action :** Supprimer les PNG quand le WebP existe déjà

3. **6 PNG blog > 200 Ko sans version WebP**
   - `new_programmatic_seo_*.png` (760 Ko), `new_definition_seo_*.png` (756 Ko), etc.
   - **Économie potentielle : 3.8 Mo** si conversion en WebP
   - **Action :** Convertir en WebP

4. **Favicon surdimensionné** : `app/icon.png` fait 308 Ko (devrait être < 50 Ko)
   - **Action :** Compresser et redimensionner

### Moyens

5. **18 images hero blog en JPG** au lieu de WebP (56 % des articles)
   - **Action :** Convertir progressivement en WebP pour cohérence

6. **1 fichier backup oublié** : `vitesse-performance-blog-seo.jpg_original` (44 Ko)
   - **Action :** Supprimer

### Points positifs images
- Aucun alt tag manquant ou vide — tous correctement remplis
- OG images dynamiques bien configurées via API
- Toutes les images référencées en frontmatter existent (aucun lien cassé)

---

## Plan d'action par priorité

### Semaine 1 — Urgences

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Mettre à jour Next.js vers v16+ | Sécurité critique | Moyen |
| 2 | Ajouter H1 visible sur toutes les pages | SEO critique | Moyen |
| 3 | Raccourcir les meta titles > 60 caractères | SEO haute | Faible |
| 4 | Supprimer les 11 PNG avec doublons WebP | Performance | Faible |
| 5 | Corriger "des Paris" → "de Paris" | Crédibilité | Faible |

### Semaine 2 — Optimisations hautes

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 6 | Mapper les erreurs API à messages génériques | Sécurité haute | Faible |
| 7 | Débloquer /diagnostic/* pour crawlers IA | GEO critique | Faible |
| 8 | Ajouter dateModified sur tous les articles blog | GEO haut | Faible |
| 9 | Améliorer le contraste des sections sombres (SEOScoreChecker, CTA) | UX haute | Faible |
| 10 | Uniformiser les boutons CTA section About | Esthétique | Faible |

### Semaine 3 — Optimisations moyennes

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 11 | Migrer rate limiting vers Upstash Redis | Sécurité haute | Moyen |
| 12 | Chiffrer tokens OAuth GMB | Sécurité haute | Moyen |
| 13 | Convertir les 6 PNG blog en WebP | Performance | Faible |
| 14 | Compresser favicon (308 Ko → < 50 Ko) | Performance | Faible |
| 15 | Nettoyer les 194 images orphelines | Hygiène | Moyen |

### Semaine 4 — Polish

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 16 | Enrichir les 15 meta descriptions < 120 caractères | SEO | Faible |
| 17 | Dédupliquer JSON-LD schemas homepage | SEO | Faible |
| 18 | Ajouter Bytespider au robots.txt | GEO | Faible |
| 19 | Convertir les 18 JPG blog hero en WebP | Performance | Moyen |
| 20 | Ajouter protection CSRF formulaire contact | Sécurité | Moyen |

---

## Conclusion

Le site indhack.com est techniquement solide avec une excellente base SEO et une stratégie GEO pionnière en France. Les principaux axes d'amélioration sont :

1. **Sécurité** — la mise à jour de Next.js est urgente (4 vulnérabilités HIGH connues)
2. **SEO** — le problème de H1 manquants sur 87 % des pages est le frein n°1 au ranking
3. **Images** — 194 images orphelines et 11 Mo de PNG redondants à nettoyer
4. **UX** — les animations fade-in créent des "zones fantômes" temporaires qui nuisent à la lisibilité

Après corrections, le site devrait passer de ~75/100 à ~92/100 en score global.
