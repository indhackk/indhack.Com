# INSTRUCTIONS POUR CLAUDE CODE — INDHACK.COM SEO OVERHAUL
# ============================================================
# Ce fichier est le brief technique à donner à Claude Code.
# Copie-colle ce fichier dans Claude Code ou mets-le à la racine du projet.
# Lance les tâches UNE PAR UNE dans l'ordre.
# ============================================================

## CONTEXTE
- Site : indhack.com (Next.js)
- Problème : 1 page indexée sur 62, 0 backlinks, 0 trafic
- Cause principale : maillage interne inexistant + URLs mal optimisées
- Document stratégique complet : plan-seo-indhack-definitif.docx (joint)

---

## TÂCHE 1 — REDIRECTIONS 301 (CRITIQUE, FAIRE EN PREMIER)
```
Analyse le routing du site Next.js (app/ ou pages/).
Toutes les pages /seo-[ville] doivent être redirigées en 301 vers /consultant-seo-[ville].

Exemples :
/seo-nice → /consultant-seo-nice
/seo-paris → /consultant-seo-paris
/seo-cannes → /consultant-seo-cannes
/seo-lyon → /consultant-seo-lyon
/seo-marseille → /consultant-seo-marseille
/seo-toulouse → /consultant-seo-toulouse
/seo-bordeaux → /consultant-seo-bordeaux
/seo-montpellier → /consultant-seo-montpellier
/seo-nantes → /consultant-seo-nantes
/seo-lille → /consultant-seo-lille
/seo-strasbourg → /consultant-seo-strasbourg
/seo-rennes → /consultant-seo-rennes
/seo-grenoble → /consultant-seo-grenoble
/seo-antibes → /consultant-seo-antibes
/seo-monaco → /consultant-seo-monaco
/seo-sophia-antipolis → /consultant-seo-sophia-antipolis
/seo-aix-en-provence → /consultant-seo-aix-en-provence
/seo-boulogne-billancourt → /consultant-seo-boulogne-billancourt

Implémente via next.config.js redirects[] ou middleware.
Mets aussi à jour TOUS les liens internes du site qui pointent vers /seo-[ville] pour qu'ils pointent vers /consultant-seo-[ville].
Mets à jour le sitemap.xml.
```

---

## TÂCHE 2 — FOOTER ENRICHI (TOUTES LES PAGES)
```
Modifie le composant Footer pour qu'il contienne 4 colonnes :

COLONNE 1 — "Expertises SEO" :
- Consultante SEO Freelance → /consultant-seo
- Audit SEO Complet → /audit-seo
- Référencement Naturel → /referencement-naturel
- SEO Local → /seo-local
- Création de Site Web → /creation-site-web
- Refonte de Site Web → /refonte-site-web
- Création Boutique E-commerce → /creation-boutique-en-ligne

COLONNE 2 — "SEO Local France" (top 20 villes) :
- Nice → /consultant-seo-nice
- Paris → /consultant-seo-paris
- Lyon → /consultant-seo-lyon
- Marseille → /consultant-seo-marseille
- Toulouse → /consultant-seo-toulouse
- Bordeaux → /consultant-seo-bordeaux
- Nantes → /consultant-seo-nantes
- Montpellier → /consultant-seo-montpellier
- Lille → /consultant-seo-lille
- Strasbourg → /consultant-seo-strasbourg
- Rennes → /consultant-seo-rennes
- Grenoble → /consultant-seo-grenoble
- Cannes → /consultant-seo-cannes
- Antibes → /consultant-seo-antibes
- Monaco → /consultant-seo-monaco
- Sophia-Antipolis → /consultant-seo-sophia-antipolis
- Aix-en-Provence → /consultant-seo-aix-en-provence
- Toulon → /consultant-seo-toulon
- Rouen → /consultant-seo-rouen
- Dijon → /consultant-seo-dijon

COLONNE 3 — "Ressources" :
- Blog SEO → /blog
- Études de cas → /etudes-de-cas
- Tarifs → /tarifs
- FAQ → /faq
- À propos → /a-propos

COLONNE 4 — "Contact" :
- 06 61 13 97 48
- contact@indhack.com
- Liens réseaux sociaux si existants

Design : sobre, liens en texte blanc/gris sur fond sombre, bien lisibles pour Google.
```

---

## TÂCHE 3 — FIL D'ARIANE (BREADCRUMBS) SUR TOUTES LES PAGES
```
Crée un composant <Breadcrumb /> réutilisable.

Exemples de fils d'Ariane :
- /consultant-seo → Accueil > Consultante SEO Freelance
- /consultant-seo-nice → Accueil > SEO Local > Consultante SEO Nice
- /audit-seo → Accueil > Audit SEO
- /blog/[slug] → Accueil > Blog > [Titre article]
- /creation-site-web → Accueil > Création de Site Web

Ajoute le schema JSON-LD BreadcrumbList sur chaque page.
Le breadcrumb doit être cliquable (chaque niveau est un lien).
Place-le en haut de chaque page, juste sous le header.
```

---

## TÂCHE 4 — SCHEMAS JSON-LD
```
Ajoute les schemas structured data suivants :

SUR TOUTES LES PAGES :
- Organization : name "IndHack", url "https://indhack.com", telephone, email, logo
- BreadcrumbList (via le composant breadcrumb)

SUR LA PAGE D'ACCUEIL (/) :
- LocalBusiness / ProfessionalService :
  name, address (Nice), telephone, url, openingHours, areaServed: ["Nice", "France"]
- WebSite avec SearchAction

SUR CHAQUE PAGE SERVICE (/consultant-seo, /audit-seo, etc.) :
- Service : serviceType, provider (Organization), areaServed
- FAQPage si la page a une section FAQ

SUR CHAQUE PAGE LOCALE (/consultant-seo-[ville]) :
- ProfessionalService : avec areaServed = [ville spécifique]
- FAQPage
- Service

SUR CHAQUE ARTICLE BLOG :
- Article : headline, author, datePublished, dateModified, image
```

---

## TÂCHE 5 — MAILLAGE INTERNE DANS LE CORPS DES PAGES
```
C'est la tâche la plus IMPORTANTE pour le SEO.

Pour CHAQUE page existante, ajoute des liens contextuels dans le CORPS du texte (pas juste le menu/footer).

RÈGLES :
- Minimum 5 liens internes par page
- Les liens doivent être dans des phrases naturelles, pas dans des listes
- Varier les ancres de lien (ne pas toujours utiliser la même ancre)

PAGES SERVICES → doivent contenir :
- Liens vers les 6 autres services dans le texte
- Liens vers 10+ pages villes dans une section "Disponible dans votre ville"
- Liens vers 3-5 articles de blog
- Lien vers /etudes-de-cas et /tarifs
- Lien vers /contact (CTA)

PAGES LOCALES (/consultant-seo-[ville]) → doivent contenir :
- Lien vers /consultant-seo dans le 1er paragraphe
- Liens vers /audit-seo, /referencement-naturel, /seo-local, /creation-site-web, /refonte-site-web
- Liens vers 3-5 VILLES VOISINES (voir carte de proximité ci-dessous)
- Liens vers /etudes-de-cas et /contact
- Liens vers 2-3 articles de blog

CARTE DE PROXIMITÉ DES VILLES VOISINES :
- Nice ↔ Cannes, Antibes, Monaco, Sophia-Antipolis, Menton, Grasse
- Cannes ↔ Nice, Antibes, Grasse, Sophia-Antipolis
- Antibes ↔ Nice, Cannes, Sophia-Antipolis
- Monaco ↔ Nice, Menton
- Paris ↔ Boulogne-Billancourt, Neuilly, Levallois
- Lyon ↔ Grenoble, Saint-Étienne, Villeurbanne
- Marseille ↔ Aix-en-Provence, Toulon, Aubagne
- Toulouse ↔ Bordeaux, Montpellier
- Bordeaux ↔ Toulouse, La Rochelle, Bayonne
- Montpellier ↔ Toulouse, Nîmes
- Nantes ↔ Rennes, Angers, Saint-Nazaire
- Lille ↔ Roubaix, Dunkerque, Amiens
- Strasbourg ↔ Metz, Nancy, Mulhouse, Colmar
- Rennes ↔ Nantes, Brest, Saint-Malo
```

---

## TÂCHE 6 — CRÉER LES PAGES MANQUANTES
```
Crée ces pages si elles n'existent pas encore :

1. /etudes-de-cas — Page études de cas
   - 2-3 cas clients (même anonymisés)
   - Structure : contexte → problème → solution → résultats (avec chiffres)
   - Liens vers les services utilisés
   - CTA vers /contact

2. /tarifs — Page tarifs
   - 3 offres claires :
     * Audit SEO : à partir de 490€
     * Accompagnement SEO mensuel : à partir de 890€/mois
     * Création de site web + SEO : à partir de 2 490€
   - FAQ sur les tarifs
   - CTA vers /contact

3. /creation-boutique-en-ligne — Page service e-commerce
   - Structure identique aux autres pages services
   - 2500+ mots
   - Maillage vers les autres services + villes + blog
   - FAQ + schema FAQPage
```

---

## TÂCHE 7 — OPTIMISER LES BALISES TITLE ET META DESCRIPTION
```
Mets à jour les balises <title> et <meta description> de TOUTES les pages :

/ → title: "Consultante SEO & Experte Référencement Naturel | INDHACK"
     meta: "Consultante SEO freelance spécialisée en référencement naturel, SEO local et création de site web. Audit SEO gratuit. Nice & toute la France."

/consultant-seo → title: "Consultante SEO Freelance | Experte Référencement Naturel – INDHACK"
/audit-seo → title: "Audit SEO Complet | Diagnostic & Plan d'Action – INDHACK"
/referencement-naturel → title: "Référencement Naturel | Stratégie SEO Sur-Mesure – INDHACK"
/seo-local → title: "SEO Local | Dominez Google Maps & le Pack Local – INDHACK"
/creation-site-web → title: "Création de Site Web Optimisé SEO | Sites Performants – INDHACK"
/refonte-site-web → title: "Refonte de Site Web | Migration SEO Sécurisée – INDHACK"
/creation-boutique-en-ligne → title: "Création Boutique en Ligne | E-commerce SEO – INDHACK"

/consultant-seo-nice → title: "Consultante SEO Nice | Experte Référencement Nice – INDHACK"
/consultant-seo-paris → title: "Consultante SEO Paris | Freelance Référencement Paris"
/consultant-seo-lyon → title: "Consultante SEO Lyon | Experte Référencement Lyon"
(etc. pour chaque ville : "Consultante SEO [Ville] | Référencement [Ville] – INDHACK")

Chaque meta description doit :
- Faire 150-160 caractères
- Contenir le mot-clé principal
- Contenir un CTA ("Audit gratuit", "Contactez-moi")
- Être UNIQUE par page
```

---

## TÂCHE 8 — SITEMAP.XML
```
Vérifie que le sitemap.xml :
- Contient TOUTES les pages du site (services, villes, blog, pages légales)
- Utilise les nouvelles URLs /consultant-seo-[ville] (pas les anciennes /seo-[ville])
- Inclut <lastmod> avec la vraie date de dernière modification
- Inclut <priority> : 1.0 pour accueil, 0.9 pour services, 0.8 pour villes, 0.7 pour blog
- Est accessible à https://indhack.com/sitemap.xml
- Est référencé dans robots.txt
```

---

## TÂCHE 9 — ROBOTS.TXT
```
Vérifie/crée robots.txt :

User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://indhack.com/sitemap.xml
```

---

## ORDRE D'EXÉCUTION RECOMMANDÉ :
1. Tâche 1 (redirections 301) — URGENT
2. Tâche 7 (titles/meta) — URGENT
3. Tâche 2 (footer) — URGENT
4. Tâche 3 (breadcrumbs)
5. Tâche 5 (maillage interne) — LE PLUS IMPORTANT
6. Tâche 4 (schemas JSON-LD)
7. Tâche 6 (pages manquantes)
8. Tâche 8 (sitemap)
9. Tâche 9 (robots.txt)

---

## NOTES IMPORTANTES POUR CLAUDE CODE :
- Ne supprime AUCUN contenu existant. Ajoute, enrichis, lie.
- Chaque modification doit préserver le design/style existant.
- Teste que les redirections 301 fonctionnent (pas 302).
- Vérifie que le sitemap se génère correctement après les changements.
- Après chaque tâche, fais un build (npm run build) pour vérifier qu'il n'y a pas d'erreurs.
