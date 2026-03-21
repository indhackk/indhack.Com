# Audit SEO Technique - Actions Immédiates
**Date**: 21 mars 2026

---

## 🔴 CRITIQUE - À faire immédiatement

### 1. H1 Tags (40/46 pages = 87% du site)
**Sévérité**: CRITIQUE
**Impact**: Très élevé sur le ranking Google

87% des pages du site n'ont PAS de H1 tag. C'est un problème massif.

#### Pages affectées (40):
Pratiquement toutes les pages sauf 6:
- /(gmb-app)
- /a-propos à /seo-local (voir liste complète en annexe)

#### Solution:
1. Créer un composant réutilisable `<PageHeading>`
2. Ajouter `<h1>` unique sur chaque page
3. H1 doit être DIFFÉRENT du title tag
4. Placer le H1 au début du contenu principal

#### Exemple:
```tsx
export function PageHeading({ children }) {
  return (
    <h1 className="text-4xl font-bold mb-6 text-ink">
      {children}
    </h1>
  );
}
```

---

### 2. Meta Titles Manquants (2 pages)
**Fichiers**:
- `app/(gmb-app)/page.tsx` ou `app/(gmb-app)/layout.tsx`
- `app/admin-login/page.tsx` ou `app/admin-login/layout.tsx`

**Solution**:
Ajouter dans le layout.tsx:
```tsx
export const metadata: Metadata = {
  title: "GMB App - Gestion Google Business Profile",
  description: "...",
};
```

---

### 3. Meta Descriptions Manquantes (3 pages)
**Fichiers**:
- `app/(gmb-app)/layout.tsx`
- `app/admin-login/layout.tsx`
- `app/dashboard/layout.tsx`

**Solution**:
Ajouter `description: "..."` dans metadata (120-160 caractères)

---

## 🟠 HAUTE - À faire dans les 3 jours

### 4. Titles Trop Longs (17 pages)
**Toutes les pages villes + 2 autres**

Tous les titles >60 caractères doivent être raccourcis.

#### Exemple pour les villes:
Actuel: `"Consultante SEO Aix-en-Provence (13100) | Experte référencement PACA"` (68 chars)
Proposé: `"SEO Aix-en-Provence | Audit & Référencement – IndHack"` (57 chars)

---

### 5. Descriptions Trop Courtes (15 pages)
**Minimum 120 caractères requis**

Pages concernées:
- /audit-seo (91 chars)
- /blog (91 chars)
- /consultant-ia (24 chars) ← URGENTE
- /faq (56 chars)
- /laboratoire-geo (13 chars) ← URGENTE

---

### 6. Conflit robots.txt
**Fichier**: `public/robots.txt` ligne 51-52

```
User-agent: CCBot
Allow: /
```

Doit être:
```
User-agent: CCBot
Disallow: /
```

**Raison**: CCBot est le crawler de Common Crawl qui scrape sans attribution. next-sitemap.config.js le bloque correctement, mais robots.txt le permet. Contradiction.

---

### 7. Articles Blog en Draft (3)
**Fichiers**:
- `content/blog/etude-de-cas-geo-vultifrine.md`
- `content/blog/etude-restaurants-cote-azur-2026-resume.md`
- `content/blog/google-core-update-mars-2026-impact-seo.md`

**Action**: Publier (remplacer `draft: true` par `draft: false`) OU supprimer complètement.

---

### 8. Lien Cassé (1)
**Lien**: `/laboratoire-geo/vultifrine`
**Problème**: La page n'existe pas

**Options**:
A) Créer `app/laboratoire-geo/vultifrine/page.tsx`
B) Ajouter redirect dans `next.config.mjs`
```js
{
  source: '/laboratoire-geo/vultifrine',
  destination: '/blog/etude-de-cas-geo-vultifrine',
  permanent: true
}
```

---

## 🟡 MOYENNE - À faire dans la semaine

### 9. Doublon JSON-LD Schemas
**Fichiers**:
- `app/layout.tsx` (lignes 78-197)
- `components/seo/JsonLdSchemas.tsx`

La homepage a 4 schemas au lieu de 2 (doublon Organization + LocalBusiness).

**Solution**: Supprimer les schemas de `app/layout.tsx`, les garder uniquement dans `components/seo/JsonLdSchemas.tsx`.

---

### 10. Descriptions Trop Longues (2)
- `/a-propos` (180 chars → max 160)
- `/checklist-geo` (169 chars → max 160)

---

### 11. Article Sans Keywords (1)
**Fichier**: `content/blog/definition-seo-guide-complet.md`

Ajouter au frontmatter:
```yaml
keywords: [definition SEO, qu'est-ce que le SEO, référencement naturel...]
```

---

## 🟢 BASSE - À faire ensuite

### 12. Majuscules Françaises (2)
- ❌ "GMB AutoPilot - Réponses Automatiques aux Avis Google"
- ✅ "GMB AutoPilot - réponses automatiques aux avis Google"

- ❌ "GEO en 2026 : Comment Apparaître dans ChatGPT..."
- ✅ "GEO en 2026 : comment apparaître dans ChatGPT..."

---

## ✅ OK - Pas d'action requise

- ✓ Canonical URLs: Parfait
- ✓ Redirections: 77 redirections correctes
- ✓ OpenGraph: À jour
- ✓ Sitemap: Auto-généré correctement
- ✓ Blog Metadata: Bon (sauf 3 drafts + 1 sans keywords)

---

## 📊 Résumé Chiffres

| Catégorie | Critique | Haute | Moyenne | Basse | Total |
|-----------|----------|-------|---------|-------|-------|
| H1 Tags | 40 | - | - | - | 40 |
| Titles | 2 | 17 | - | - | 19 |
| Descriptions | 3 | 15 | 2 | - | 20 |
| Robots.txt | - | 1 | - | - | 1 |
| Blog | - | 3 | 1 | - | 4 |
| Links | - | 1 | - | - | 1 |
| JSON-LD | - | - | 1 | - | 1 |
| Typography | - | - | - | 2 | 2 |
| **TOTAL** | **45** | **37** | **4** | **2** | **88** |

---

## 🎯 Ordre d'Exécution Recommandé

### Semaine 1:
1. ✅ Ajouter H1 tags (40 pages) - Priorité absolue
2. ✅ Ajouter titles/descriptions manquants (5 pages)
3. ✅ Raccourcir titles >60 chars (17 pages)

### Semaine 2:
4. ✅ Allonger descriptions <120 chars (15 pages)
5. ✅ Corriger robots.txt (1 ligne)
6. ✅ Publier/supprimer drafts (3 articles)

### Semaine 3:
7. ✅ Corriger lien cassé (1)
8. ✅ Dédupliquer schemas (2 fichiers)
9. ✅ Finitions (keywords, majuscules)

---

## 📝 Notes Finales

- **Ne pas faire de modifications jusqu'à avoir lu l'audit complet** (fichier AUDIT_SEO_2026_03_21.txt)
- **Tester après chaque modification** avec `npm run build`
- **Priorité absolue**: H1 tags (87% du site affecté)
- **Effort total estimé**: 3-4 jours pour tout corriger
- **Audit à renouveler après corrections pour vérifier les gains**
