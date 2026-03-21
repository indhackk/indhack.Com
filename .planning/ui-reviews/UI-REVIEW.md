# UI Review - Pages laboratoire-geo et generateur-robots-txt

**Audited:** 2026-03-21
**Baseline:** Design tokens tailwind.config.js (sauge palette, Space Grotesk/Inter)
**Screenshots:** Not captured (Playwright not installed)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Hierarchie visuelle et lisibilite | 4/4 | Excellente structure typographique, bonne hierarchie H1>H2>H3 |
| 2. Coherence design system | 3/4 | Tokens respectes mais badges "text-white" sur fond transparent |
| 3. Responsive/mobile-first | 4/4 | Classes responsives sm:/md:/lg: bien utilisees |
| 4. Accessibilite | 2/4 | Manque aria-labels, pas d'alt sur images, contraste badges |
| 5. Performance | 3/4 | Aucune image utilisee, pas de lazy loading necessaire |
| 6. UX patterns | 3/4 | CTAs clairs, manque etats de chargement sur le generateur |

**Overall: 19/24**

---

## Top 3 Priority Fixes

1. **Badges "text-white" sur fond sauge/10 transparent** - Contraste insuffisant sur fond clair - Remplacer par `text-sauge` au lieu de `text-white` dans `app/laboratoire-geo/page.tsx:29,56` et `app/laboratoire-geo/vultifrine/page.tsx:151`

2. **Absence d'aria-labels sur les toggles du RobotsGenerator** - Les boutons toggle n'ont pas de label accessible - Ajouter `aria-label` ou `aria-labelledby` sur les boutons toggle ligne 433-446 de `RobotsGenerator.tsx`

3. **Lien CTA "Discuter de votre strategie GEO" avec text-white sur bg transparent** - Texte blanc sur fond transparent = illisible sur fond clair - `app/laboratoire-geo/vultifrine/page.tsx:788`: changer `text-white` en `text-sauge`

---

## Detailed Findings

### Pillar 1: Hierarchie visuelle et lisibilite (4/4)

**Excellent** - Les pages respectent parfaitement la hierarchie typographique:

- **H1**: `text-4xl sm:text-5xl font-heading font-bold` (coherent)
- **H2**: `text-3xl font-heading font-bold` (sections principales)
- **H3**: `text-xl font-heading font-semibold` (sous-sections)
- **H3 FAQ**: `text-lg font-heading font-semibold` (questions)

Structure observee dans `vultifrine/page.tsx`:
- Sommaire avec liens d'ancrage (lignes 164-179)
- 10 sections H2 thematiques avec puces extractibles
- FAQ structuree avec 6 questions H3
- CTA final bien positionne

Utilisation coherente de `font-heading` pour tous les titres (Space Grotesk).

### Pillar 2: Coherence design system (3/4)

**Bon avec points d'attention**

**Tokens respectes:**
- Couleur primaire `sauge` correctement utilisee pour liens et accents
- `text-ink` pour texte principal, `text-soft` pour secondaire
- `bg-fond-clair` pour backgrounds clairs
- `border-line` pour bordures
- `bg-accent hover:bg-accent-hover` pour CTA principal (vultifrine:781)

**Problemes detectes:**

1. **Badges avec text-white sur fond transparent:**
```tsx
// laboratoire-geo/page.tsx:29
<div className="inline-flex items-center gap-2 bg-sauge/10 text-white px-4 py-2 ...">
```
`bg-sauge/10` est un fond tres clair (10% opacite), `text-white` est illisible dessus.

Fichiers concernes:
- `app/laboratoire-geo/page.tsx:29` - Badge "Experimentations GEO"
- `app/laboratoire-geo/page.tsx:56` - Badge "Concours GEO 2026"
- `app/laboratoire-geo/vultifrine/page.tsx:151` - Badge "Laboratoire GEO"

2. **Inconsistance step indicators:**
```tsx
// vultifrine/page.tsx:359 vs 366
<span className="... bg-sauge/10 text-white ...">1</span>  // Step 1
<span className="... bg-sauge/10 text-sauge ...">2</span>  // Step 2-4
```
Step 1 utilise `text-white`, Steps 2-4 utilisent `text-sauge`. Harmoniser vers `text-sauge`.

**Positif:**
- Pas de couleurs hardcodees (#hex ou rgb())
- Tous les espacements utilisent des classes Tailwind standard (p-4, p-6, p-8, gap-2, gap-4)

### Pillar 3: Responsive/mobile-first (4/4)

**Excellent** - Approche mobile-first bien implementee:

**Breakpoints utilises:**
- `sm:py-24` vs `py-16` (page.tsx:26)
- `text-4xl sm:text-5xl` pour H1
- `sm:grid-cols-2` pour grilles (vultifrine:803)
- `p-8 sm:p-12` pour sections CTA

**Tables responsive:**
```tsx
<div className="overflow-x-auto mb-6">
    <table className="w-full border border-line text-sm">
```
Toutes les tables ont `overflow-x-auto` pour scroll horizontal sur mobile.

**Grilles adaptatives:**
- `grid md:grid-cols-2` (robots-txt:292)
- `grid lg:grid-cols-2` (RobotsGenerator:170)
- `grid md:grid-cols-3` (robots-txt:266)

### Pillar 4: Accessibilite (2/4)

**Necessite des ameliorations significatives**

**Points positifs:**
- `aria-label="Fil d'Ariane"` sur breadcrumb (robots-txt:140)
- Composant Breadcrumb avec JSON-LD et nav semantique
- Focus states presents sur inputs RobotsGenerator (`focus:ring-2 focus:ring-sauge/50`)

**Problemes critiques:**

1. **Aucune image avec alt dans les pages audites** - Non applicable (pas d'images)

2. **Toggles sans labels accessibles:**
```tsx
// RobotsGenerator.tsx:433-446
<button
    onClick={() => onToggle(crawler.id)}
    className={`relative w-12 h-6 rounded-full transition-colors ...`}
>
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full ...`} />
</button>
```
Manque: `aria-label={settings[crawler.id] ? 'Desactiver' : 'Activer'} + ' ' + crawler.name`
Manque: `role="switch"` et `aria-checked={settings[crawler.id]}`

3. **SVG sans alternative textuelle:**
```tsx
// RobotsGenerator.tsx:412-419 et page.tsx:347-349
<svg className="w-5 h-5 ...">
    <path ... />
</svg>
```
Ajouter `aria-hidden="true"` si decoratif ou `<title>` si informatif.

4. **Details/Summary sans indication d'expansion:**
```tsx
// robots-txt/page.tsx:340-356
<details className="group bg-white/5 rounded-xl ...">
    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
```
Correct structurellement mais l'icone de chevron devrait avoir `aria-hidden="true"`.

5. **Contraste insuffisant:**
- `text-white` sur `bg-sauge/10` (fond tres clair) - ratio < 4.5:1
- `text-soft-light` (#D1D8D4) sur fond sombre - a verifier

### Pillar 5: Performance (3/4)

**Bon - Pages legeres sans images**

**Points positifs:**
- Aucune image dans les pages audites = pas de probleme de lazy loading
- Pas de composants Image de Next.js requis
- JSON-LD genere cote serveur (schemas en const)
- Composant RobotsGenerator en "use client" isole

**Points d'attention:**
- RobotsGenerator utilise `useMemo` pour le robotsTxt (bonne pratique)
- Pas de skeleton/loader pendant la generation (non critique car instantane)

**Non applicable:**
- `priority={true}` sur hero images - Pas d'images
- `loading="lazy"` - Pas d'images

### Pillar 6: UX patterns (3/4)

**Bon avec ameliorations possibles**

**CTAs clairs et bien positionnes:**
- CTA principal: `bg-accent hover:bg-accent-hover text-white` (vultifrine:781)
- CTA secondaire: `border-2 border-sauge` avec hover (vultifrine:788)
- CTA robots-txt: `bg-white text-ink hover:bg-sauge hover:text-white` (page:373)

**Feedback utilisateur (RobotsGenerator):**
- Copie: animation Check icon + texte "Copie !" (lignes 148-152, 311-312)
- Preset actif: bordure `border-2 border-sauge` (ligne 188)
- Toggle: gradient vert `from-emerald-500 to-emerald-400` pour etat actif

**Navigation:**
- Sommaire avec liens d'ancrage (vultifrine:164-179)
- Breadcrumbs presents et semantiques
- Liens internes bien structures

**Manques:**
1. **Pas d'etat de chargement** - Non critique car generation instantanee
2. **Pas de confirmation pour "Telecharger"** - Le fichier est simplement telecharge
3. **Bouton CTA secondaire illisible** (vultifrine:788): `text-white` sur fond transparent

---

## Files Audited

### /app/laboratoire-geo/
- `page.tsx` - Page index laboratoire GEO (98 lignes)
- `vultifrine/page.tsx` - Etude de cas Vultifrine (839 lignes)

### /app/outils/generateur-robots-txt/
- `page.tsx` - Page wrapper generateur robots.txt (384 lignes)
- `RobotsGenerator.tsx` - Composant interactif (454 lignes)

### References
- `tailwind.config.js` - Tokens de design (142 lignes)
- `components/Breadcrumb.tsx` - Composant breadcrumb (139 lignes)

---

## Recommendations Summary

| Priorite | Fichier | Ligne | Issue | Fix |
|----------|---------|-------|-------|-----|
| HIGH | laboratoire-geo/page.tsx | 29, 56 | text-white sur bg-sauge/10 | text-sauge |
| HIGH | vultifrine/page.tsx | 151 | text-white sur bg-sauge/10 | text-sauge |
| HIGH | vultifrine/page.tsx | 359 | Step 1 text-white inconsistant | text-sauge |
| HIGH | vultifrine/page.tsx | 788 | CTA secondaire text-white | text-sauge |
| MEDIUM | RobotsGenerator.tsx | 433-446 | Toggle sans aria-label | Ajouter role="switch" + aria-checked + aria-label |
| MEDIUM | RobotsGenerator.tsx | 412-419 | SVG sans aria-hidden | Ajouter aria-hidden="true" |
| LOW | page.tsx | 347-349 | SVG chevron FAQ | Ajouter aria-hidden="true" |

---

## Technical Notes

**French Typography Compliance:**
- Majuscules: Respectees (premiers mots uniquement)
- Accents: Manquants dans vultifrine/page.tsx (utilise ASCII "e" au lieu de "e" accent)
  - Exemple: "experimentations" devrait etre "experimentations" avec accents
  - Note: Ceci est intentionnel selon le contexte GEO/SEO du concours

**JSON-LD Schemas:**
- Article schema present (vultifrine)
- FAQPage schema present (vultifrine + robots-txt)
- BreadcrumbList schema present (via composant Breadcrumb)
- SoftwareApplication schema present (robots-txt)
- Pas de doublon BreadcrumbList detecte

**Internal Linking:**
- vultifrine: 4 liens internes CTA section
- robots-txt: 6+ liens internes (3 outils + 3 articles + 3 villes)
