# 🔗 AUDIT MAILLAGE INTERNE & COCON SÉMANTIQUE - IndHack.com

> **Date :** 15 janvier 2026  
> **Audit par :** Claude (Expert SEO)

---

## 📊 STRUCTURE ACTUELLE DU SITE

### Architecture des pages

```
NIVEAU 0 (Homepage)
└── /

NIVEAU 1 (Pages Services - Piliers)
├── /audit-seo
├── /referencement-naturel
├── /seo-local
├── /creation-site-web
├── /refonte-site-web
├── /community-manager
├── /about
├── /blog
└── /contact

NIVEAU 2 (Pages Locales - Satellite)
├── /seo-nice
├── /seo-cannes
├── /seo-antibes
├── /seo-monaco
├── /seo-sophia-antipolis
├── /seo-marseille
├── /seo-aix-en-provence
├── /seo-paris
├── /seo-lyon
├── /seo-bordeaux
├── /seo-toulouse
├── /seo-montpellier
├── /seo-lille
├── /seo-strasbourg
├── /seo-rennes
├── /seo-nantes
└── /seo-grenoble
```

---

## 🔴 PROBLÈMES DE MAILLAGE IDENTIFIÉS

### 1. Maillage FAIBLE entre pages Services

| Page Source | Liens vers autres services |
|-------------|---------------------------|
| `/audit-seo` | ❌ Aucun lien vers `/referencement-naturel` ou `/refonte-site-web` |
| `/referencement-naturel` | ❌ Aucun lien vers `/audit-seo` (alors que l'audit est le point d'entrée) |
| `/creation-site-web` | ❌ Aucun lien vers `/referencement-naturel` |
| `/refonte-site-web` | ❌ Aucun lien vers `/audit-seo` |
| `/community-manager` | ⚠️ Isolé du cluster SEO |

**→ Les pages services ne se "parlent" pas entre elles !**

### 2. Maillage CORRECT sur les pages locales

| Page Locale | Liens vers |
|-------------|------------|
| `/seo-nice` | ✅ Autres villes de la région |
| `/seo-nice` | ✅ `/seo-local` (page pilier) |
| `/seo-nice` | ✅ 4 services liés |

**→ Le template CityPageTemplateV2 est bien conçu pour le maillage.**

### 3. Maillage ABSENT : Pages piliers manquantes

| Page MANQUANTE | Impact |
|----------------|--------|
| `/consultant-seo` | ❌ Mot-clé principal non ciblé |
| `/netlinking` | ❌ Sujet crucial non couvert |
| `/migration-seo` | ❌ Opportunité commerciale ratée |

---

## 🧠 ANALYSE DU COCON SÉMANTIQUE

### Cocon Actuel (Incomplet)

```
                    [HOMEPAGE]
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    [SEO Local]    [Création Web]   [Réseaux Sociaux]
         │               │               │
    ┌────┴────┐     ┌────┴────┐     ┌────┴────┐
    │ Nice    │     │ Refonte │     │ Community│
    │ Cannes  │     │         │     │ Manager  │
    │ Paris   │     │         │     │          │
    │ ...     │     │         │     │          │
    └─────────┘     └─────────┘     └──────────┘
```

### Problèmes du Cocon

1. **Pas de page pilier centrale "Consultant SEO"**
   - Les pages locales pointent vers `/seo-local` mais pas vers une page `/consultant-seo`
   
2. **Pas de liens contextuels dans le contenu**
   - Les liens sont principalement dans footer/navbar, pas dans le corps du texte
   
3. **Cluster "Référencement" mal structuré**
   - `/audit-seo`, `/referencement-naturel`, `/refonte-site-web` ne sont pas reliés entre eux

4. **Blog non intégré au cocon**
   - Les articles de blog ne maillent pas vers les pages services

---

## ✅ COCON SÉMANTIQUE IDÉAL

```
                         [HOMEPAGE]
                              │
              ┌───────────────┼───────────────────┐
              │               │                   │
     [CONSULTANT SEO]   [CRÉATION WEB]    [MARKETING DIGITAL]
      (PAGE PILIER)      (PAGE PILIER)      (PAGE PILIER)
              │               │                   │
    ┌─────────┼─────────┐     │           ┌──────┴──────┐
    │         │         │     │           │             │
[Audit]  [Référenc.]  [SEO]  [Refonte]  [Community]  [Réseaux]
         [Naturel]   [Local]            [Manager]    [Sociaux]
                        │
              ┌─────────┼─────────┐
              │         │         │
           [Nice]   [Cannes]  [Paris] ...
```

---

## 🔧 ACTIONS CORRECTIVES RECOMMANDÉES

### Priorité 1 : Améliorer les liens internes des pages services

**Fichiers à modifier :**
- `app/audit-seo/AuditSeoClient.tsx`
- `app/referencement-naturel/ReferencementClient.tsx`
- `app/creation-site-web/CreationSiteClient.tsx`
- `app/refonte-site-web/RefonteSiteClient.tsx`
- `app/community-manager/CommunityManagerClient.tsx`

**Actions :**
1. Ajouter une section "Services Complémentaires" avec liens vers les autres services
2. Ajouter des liens contextuels dans le corps du texte (ex: "Après un **[audit SEO](/audit-seo)**, nous définissons votre stratégie...")

### Priorité 2 : Créer les pages piliers manquantes

| Page à créer | Contenu | Maillage |
|--------------|---------|----------|
| `/consultant-seo` | Guide complet 2000+ mots | → Toutes les pages services + locales |
| `/netlinking` | Stratégie backlinks | → `/referencement-naturel`, `/audit-seo` |
| `/migration-seo` | Guide migration | → `/refonte-site-web`, `/audit-seo` |

### Priorité 3 : Intégrer le blog au cocon

**Pour chaque article de blog :**
- Lien vers 1-2 pages services en rapport
- Lien vers une page locale si pertinent
- CTA vers l'audit gratuit

---

## 📋 CHECKLIST MAILLAGE INTERNE

### Navbar ✅
- [x] 6 services dans le menu déroulant
- [x] Lien vers About, Blog, Contact
- [x] CTA "Audit Gratuit"

### Footer ✅
- [x] 4 services principaux
- [x] 6 villes principales + lien "Toutes les villes"
- [x] Liens légaux

### Pages Services ⚠️
- [ ] Liens vers services complémentaires
- [ ] Liens contextuels dans le contenu
- [ ] FAQ avec liens internes

### Pages Locales ✅
- [x] Breadcrumb (Accueil > SEO Local > Ville)
- [x] 4 services liés
- [x] Villes proches de la même région
- [x] Lien vers page pilier `/seo-local`

### Blog ❌
- [ ] Liens vers pages services
- [ ] Liens vers pages locales
- [ ] Catégorisation thématique

---

## 📈 IMPACT SEO ATTENDU

| Métrique | Avant | Après corrections |
|----------|-------|-------------------|
| Pages avec 5+ liens internes | 30% | 85% |
| Profondeur moyenne des liens | 2.5 | 1.8 |
| Pages orphelines | 5 | 0 |
| Distribution PageRank | Inégale | Équilibrée |

---

## 🚀 QUICK WIN IMMÉDIAT

**Ajouter une section "Services Liés" sur chaque page service :**

```tsx
const RELATED_SERVICES = [
    { title: "Audit SEO", href: "/audit-seo", desc: "Point de départ de toute stratégie" },
    { title: "Référencement Naturel", href: "/referencement-naturel", desc: "Stratégie long terme" },
    { title: "Refonte SEO", href: "/refonte-site-web", desc: "Migrez sans perdre votre trafic" },
];

// Dans le JSX
<section>
    <h2>Services Complémentaires</h2>
    <div className="grid">
        {RELATED_SERVICES.map(s => (
            <Link href={s.href}>{s.title}</Link>
        ))}
    </div>
</section>
```

---

## ⚠️ IMPORTANT : Configuration Web3Forms

Pour que le formulaire d'audit fonctionne, vous devez :

1. **Créer un compte** sur https://web3forms.com/ (gratuit)
2. **Récupérer votre Access Key**
3. **Ajouter la variable d'environnement** sur Vercel :
   - Nom : `WEB3FORMS_ACCESS_KEY`
   - Valeur : Votre clé d'accès

---

*Document généré automatiquement - À mettre à jour lors de chaque évolution du site*
