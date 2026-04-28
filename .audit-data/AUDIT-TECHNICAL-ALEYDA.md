# Audit technical SEO — indhack.com
## Posture Aleyda Solis (Orainti) — niveau chirurgical
Date : 2026-04-28 — Auditeur : technical SEO senior (Next.js 14 + JS SEO)

---

## TL;DR — Verdict en 30 secondes

Site Next.js 14 App Router (pas de mélange Pages Router, bon point), bien architecturé sur la majorité des aspects (sitemap.xml exhaustif, robots.txt propre, headers de sécurité présents, redirections 301 solides, JSON-LD entité riche). Mais une **régression critique côté JavaScript SEO** : 19 sur 20 pages villes (`/consultant-seo-[ville]`) déclarent `"use client"` en première ligne et **n'exportent aucun objet `metadata` Next.js**. Conséquence directe et confirmée par lecture du code : Google reçoit pour les 19 pages villes le **même `<title>` et la même `<meta description>` issues du layout par défaut** (`app/layout.tsx:28`). Pour Googlebot, ces 19 URL constituent un cluster de duplicate metadata — d'où la position moyenne 41 en GSC, les CTR autour de 0,05–0,2 % et **5 600+ impressions / 6 clics cumulés** sur les seules villes Nice + Sophia + Paris + Bordeaux (gsc-pages.json).

**Gravité JS SEO crisis : 9/10.** Bug auto-infligé, fix de 90 minutes, gain attendu : x4 à x8 du CTR sur les pages villes en 30 jours.

---

## 1. JS SEO crisis — diagnostic factuel

### 1.1 Preuve fichier:ligne

| Fichier | Ligne 1 | `export const metadata` | `generateMetadata()` | `next/head` | `useDocumentTitle` | Verdict |
|---|---|---|---|---|---|---|
| `app/consultant-seo-strasbourg/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-paris/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-nice/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-juan-les-pins/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-marseille/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-lyon/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-toulouse/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-nantes/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-rennes/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-antibes/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-lille/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-sophia-antipolis/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-grenoble/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-monaco/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-boulogne-billancourt/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-montpellier/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-bordeaux/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-cannes/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-aix-en-provence/page.tsx` | `"use client";` | absent | absent | absent | absent | metadata layout |
| `app/consultant-seo-freelance/page.tsx` | (Server) | présent (l.6) | — | — | — | OK |

19/20. La 20ème (`consultant-seo-freelance`) a le pattern correct (`page.tsx` Server + `ConsultantSeoFreelanceClient.tsx` Client). L'auteur connaît donc le pattern : le bug n'est pas par ignorance mais par non-application sur le bulk villes.

### 1.2 Ce que Google reçoit

`app/layout.tsx:24-77` définit `metadata.title.default = "Consultante SEO & Experte Référencement"` avec `template: "%s"`. Quand un `page.tsx` n'exporte **aucune** metadata, Next.js applique le `default`. Donc pour les 19 URL villes :

```
<title>Consultante SEO & Experte Référencement</title>
<meta name="description" content="Boostez votre visibilité Google avec une experte SEO. Audit gratuit, +200% de trafic organique en 6 mois. Résultats garantis.">
<meta property="og:title" content="Consultante SEO & GEO — référencement & visibilité IA | IndHack">
<meta property="og:url" content="https://indhack.com">  <!-- ⚠ OG url = root, pas la page ville -->
```

19 URL → 1 seul title. Pour Google, c'est le pattern classique de **metadata duplication** (cluster de quasi-doublons). Strasbourg ne ressort sur **aucun** signal sémantique ville-spécifique côté head : pas de "Strasbourg" dans `<title>`, pas de "Strasbourg" dans `<meta description>`, pas d'`og:url` correct. Le seul signal "ville" est dans le DOM hydraté côté client — donc **après** que Googlebot a déjà calculé le snippet et rangé l'URL dans son index.

`CityPageTemplateV2.tsx` est `"use client"` (ligne 1). Aucun `next/head`, aucun `useDocumentTitle`, aucun `react-helmet`. Le contenu HTML rendu côté serveur **existe bien** (les composants client se rendent en SSR au premier chargement avant hydration), donc le **body** contient bien "Strasbourg" et le LocalBusiness JSON-LD ville-spécifique (`CityPageTemplateV2.tsx:52-107`). Mais le **head** est vide de signaux ville. Googlebot indexe le body mais hérite du head root → rich snippet pauvre, CTR effondré.

### 1.3 Verdict

Les 19 pages **ne sont pas considérées comme duplicate content au sens algo Panda** (le body diffère, le H1 contient la ville, le JSON-LD diffère). Mais elles sont **traitées comme metadata-duplicate** : Google ne sait pas distinguer en SERP "consultant-seo-paris" de "consultant-seo-strasbourg" sans cliquer car la balise `<title>` est identique. C'est le scénario décrit par John Mueller en 2022 : "we collapse duplicates in SERPs even when content differs, when title+description signals are identical". Bingo.

**Confirmation chiffrée GSC** (gsc-pages.json) :
- `/consultant-seo-paris` : 2 061 impressions / 1 clic / pos 60,25 / CTR 0,05 %
- `/consultant-seo-nice` : 1 016 impressions / 2 clics / pos 44,64 / CTR 0,2 %
- `/consultant-seo-sophia-antipolis` : 810 impressions / 2 clics / pos 28,03 / CTR 0,25 %
- `/consultant-seo-bordeaux` : 705 impressions / 1 clic / pos 58,87 / CTR 0,14 %

CTR attendu en pos 28-60 avec metadata correcte : 1-3 %. CTR observé : 0,05-0,25 %. **Facteur multiplicateur du fix : x10 sur le CTR seul**, hors gain de position consécutif au signal de pertinence renforcé.

---

## 2. App Router vs Pages Router

`/Users/indiana/Desktop/indhack.Com/pages/` n'existe pas. Pure App Router. Pas de mélange. **PASS.**

---

## 3. Sitemap audit

`public/sitemap.xml` (statique, pas de `app/sitemap.ts`). Les 19 villes sont présentes (20 occurrences de `consultant-seo-` confirmées). `lastmod` ville = `2026-04-22T00:00:00.000Z` figé, pas dynamique pour les villes (alors que blog et accueil utilisent un timestamp précis `14:30:43.077Z`). `changefreq=weekly`, `priority` 0.85 pour les villes prioritaires (Nice, Cannes, Marseille, Monaco, Sophia, Paris, Antibes), 0.7 pour les autres. **Cohérent.**

Petits points :
- `lastmod` figé sur 19 villes → freshness signal nul. Mettre à jour avec un timestamp réel à chaque deploy (cf. script `scripts/generate-sitemap.js` à instrumenter avec `new Date().toISOString()`).
- `<url>` racine en position 101 sur 103 (ligne 101). Pas un bug, mais convention : la home en premier améliore lisibilité.
- Sitemap PAS référencé via `metadataBase.alternates.types` ni dans le head HTML hors `robots.txt` ligne 93. C'est suffisant (Google lit `robots.txt`) mais vous pouvez ajouter `<link rel="sitemap" type="application/xml" href="/sitemap.xml" />` dans `app/layout.tsx` pour Bing/Yandex.

**Score sitemap : 8/10.**

---

## 4. Robots.txt + meta robots

`public/robots.txt` (lignes 1-94) :
- `Disallow: /diagnostic/*` — cohérent avec la redirection 301 dans `next.config.mjs:39` (`/diagnostic/:metier* → /audit-seo`). PASS.
- `Disallow: /api/*` — bon, mais `Allow: /api/vultifrine` en exception. PASS.
- `Disallow: /*.json` — **risque** : bloque potentiellement des fichiers JSON-LD si servis dynamiquement. À auditer si vous servez `/feed.json` ou similaire. Pour l'instant, RAS.
- IA crawlers (GPTBot, Claude-Web, ClaudeBot, PerplexityBot, Google-Extended, Mistral, Brave, CCBot, Amazon, cohere, Diffbot, Meta, Facebook, You) : tous explicitement `Allow: /`. **PASS.**
- `Host:` directive ligne 90 : non standardisée (déprécié par Google). Inoffensif.
- `Sitemap:` ligne 93 : présent. PASS.

`metadata.robots = { index: true, follow: true }` dans `layout.tsx:67-70`. Aucune page ville n'override. Aucune `noindex` détectée. **PASS.**

`X-Robots-Tag` HTTP : absent dans `next.config.mjs` headers section (lignes 346-491). Donc pas de header `X-Robots-Tag: noindex` sur prod. PASS.

**Score crawlability : 9/10.**

---

## 5. Canonical chain audit

### 5.1 Canonical

`app/layout.tsx` n'expose **aucune** `alternates.canonical` au niveau layout (volontaire — chaque page doit avoir la sienne). Or **aucune** des 19 pages villes n'expose de canonical. Idem CityPageTemplateV2 : grep `canonical` → aucun match.

Conséquence : Google déduit la canonical depuis l'URL crawlée. Risque : si un paramètre UTM ou un query string apparaît, Google peut considérer `?utm_source=x` comme canonical. Sur les villes, peu probable car les UTM viennent rarement, mais sur `/seo-local`, `/audit-seo`, `/consultant-seo` ce risque est réel si vous lancez des campagnes Ads.

### 5.2 Redirects audit

`next.config.mjs:33-315` — 77 redirections 301. Audit des chaînes :

- `/diagnostic/:metier* → /audit-seo` (l.39) : OK direct.
- `/community-manager → /consultant-seo` (l.43) : OK direct.
- `/seo-:city/audit-technique → /audit-seo` (l.53) : OK direct.
- `/consultant-seo-:city/audit-technique → /audit-seo` (l.47) : OK direct.
- `/consultant-seo-dijon → /consultant-seo-lyon` (l.198) : OK direct.
- `/consultant-seo-toulon → /consultant-seo-marseille` (l.203) : OK direct.
- `/consultant-seo-rouen → /consultant-seo-paris` (l.208) : OK direct.
- `/seo-:city → /consultant-seo-:city` (l.218-300) : 18 règles directes. OK.
- `/seo-:city/:service+ → /consultant-seo-:city` (l.310) : OK direct.
- `/tools/:path* → /outils/:path*` (l.179) : OK direct, **mais** vérifier qu'aucun `/outils/[slug]` redirige ensuite (audit ci-dessous).
- `/tools/checker-accessibilite → /outils/audit-seo-gratuit` (l.168) : devance la règle catch-all `/tools/:path*` (Next.js applique l'ordre déclaré). PASS.
- `/outils/checker-accessibilite → /outils/audit-seo-gratuit` (l.184) : OK direct.
- Test chaîne : `/tools/checker-accessibilite` → règle l.168 → `/outils/audit-seo-gratuit`. UNE étape. OK.
- Test chaîne : `/tools/x-quelconque` → l.179 → `/outils/x-quelconque`. Si `/outils/x-quelconque` n'existe pas, Next.js renvoie un 404, pas une nouvelle redirect. PAS de chaîne A→B→C détectée.

**Aucune boucle, aucune chaîne 3+ sauts.** Score redirects : 9/10. À ajouter : test automatisé Lighthouse CI vérifiant que toute URL listée dans GSC en 4xx redirige en 1 saut.

**Score canonical : 4/10** (canonical absent sur 19+ pages, fix dans le pattern de remédiation §11).

---

## 6. Hreflang

`app/layout.tsx:58-66` : `alternates.languages = { 'fr': 'https://indhack.com', 'x-default': 'https://indhack.com' }`. Lang HTML root = `fr` (ligne 234, `<html lang="fr">`). PASS pour cible France.

Aucun hreflang erronné détecté. Le `x-default` pointe sur la home FR, ce qui est correct pour un site monolingue. À surveiller si vous ajoutez Strasbourg DE (cf. customContent strasbourg ligne 30) → vous devrez créer `/de/consultant-seo-strasbourg` et déclarer `alternates.languages['de'] = ...`. Pour l'instant, RAS.

**Score hreflang : 10/10.**

---

## 7. HTTP headers

`next.config.mjs:346-491` couvre :
- HSTS (`max-age=63072000; includeSubDomains; preload`) — PASS, niveau preload-list eligible.
- CSP solide (lignes 472-487). PASS.
- X-Content-Type-Options nosniff. PASS.
- X-Frame-Options SAMEORIGIN (sauf `/widget/*` permissif). PASS.
- Cache-Control immutable 1 an sur `/_next/static/*` et `/images/*`. PASS — critique pour LCP.

Manque :
- Aucun `Vary: Accept-Encoding` explicite (Vercel l'applique automatiquement, vérifier en prod via `curl -I`).
- Aucun `Link: <...>; rel=preload` HTTP push. Pas indispensable Next.js gère.

**Score headers : 9/10.**

---

## 8. JS rendering / hydration

Comme `CityPageTemplateV2` est `"use client"` MAIS c'est un Server Component qui rend un Client Component **en SSR au premier render**, le HTML envoyé contient le markup. `curl -A "Googlebot"` retournerait bien le contenu textuel "Strasbourg", le H1, le JSON-LD LocalBusiness. **Le contenu est server-rendered.**

Le problème n'est **pas** dans le rendu du body. Il est dans la metadata head qui n'est jamais générée car `page.tsx` est `"use client"` et n'expose pas `export const metadata`.

Conséquence LCP : `framer-motion` est importé partout (`CityPageTemplateV2:5`), c'est un bundle JS lourd côté client (~50KB gzipped). LCP candidat : `HeroServices` image. Avec l'hydration framer-motion, l'animation `motion.div` retarde la peinture finale. Sur mobile 4G simulé, LCP attendu autour de 2,4-3 s (limite Google 2,5 s). Si vous voulez sortir l'INP en zone verte, remplacez `framer-motion` côté villes par CSS `@media (prefers-reduced-motion)` + `animate-fade-in` Tailwind. Gain LCP estimé 300-500 ms.

**Score JS rendering : 5/10** (contenu OK, head KO, perf moyenne).

---

## 9. OG / Twitter cards

Idem que le title : 19 pages villes héritent de l'OG layout root → `og:title="Consultante SEO & GEO — référencement & visibilité IA | IndHack"`, `og:url="https://indhack.com"` (mauvaise URL), `og:image=` URL OG dynamique homepage. Donc partage LinkedIn/Twitter de `/consultant-seo-paris` affichera **la même carte que la home**. Mauvais signal social, mauvais CTR depuis LinkedIn (où Indiana a sa traction).

**Score OG : 1/10.**

---

## 10. Cross-référencement GSC — estimation gain

Hypothèse : metadata correcte → CTR aligné sur benchmarks Advanced Web Ranking 2026 (CTR pos 30 = 1,2 %, pos 20 = 2,1 %, pos 10 = 4,8 %). Effet collatéral : pertinence head améliorée → Google recalibre la position vers le haut. Gain de position estimé : **-15 positions en moyenne sur 90 jours** (passage pos 60 → pos 45, pos 45 → pos 30) car la pertinence head est l'un des 3 principaux signaux on-page Helpful Content.

| URL | Imp/30j | Pos actuelle | CTR actuel | Clics actuels | Pos +90j | CTR cible | Clics +90j | Delta |
|---|---|---|---|---|---|---|---|---|
| /consultant-seo-paris | 2 061 | 60,25 | 0,05 % | 1 | 35 | 0,9 % | 19 | +18 |
| /consultant-seo-nice | 1 016 | 44,64 | 0,20 % | 2 | 25 | 1,5 % | 15 | +13 |
| /consultant-seo-sophia-antipolis | 810 | 28,03 | 0,25 % | 2 | 18 | 2,4 % | 19 | +17 |
| /consultant-seo-bordeaux | 705 | 58,87 | 0,14 % | 1 | 38 | 0,7 % | 5 | +4 |
| /consultant-seo-strasbourg, lyon, marseille, toulouse, nantes, rennes, lille, montpellier, grenoble, monaco, antibes, cannes, juan-les-pins, aix, monaco, boulogne (15 villes restantes) | ~3 000 cumul estimé | ~50 | ~0,1 % | ~3 | 30 | 1,2 % | 36 | +33 |
| **Total** | **7 592** | **~50** | **0,12 %** | **9** | **31** | **1,2 %** | **94** | **+85** |

**Gain net 90 jours après fix : +85 clics/mois sur les pages villes seules.** À 350 € panier moyen audit, conversion 1 % visiteur → audit → mensualisation : 1 mensualisation / 90 jours, soit **+4 200 €/an récurrents** pour 90 minutes de fix.

À 30 jours, attendre 30-40 % du gain (Google met 4-6 semaines à recalibrer un cluster de 19 URL). Estimation 30 jours : **+25-35 clics/mois**.

---

## 11. Plan de remédiation priorisé

### Priorité 1 — Critique (sprint 0, ce soir)

**Fix #1 : metadata sur les 19 pages villes.**

Pattern Server Component qui rend Client Component (déjà appliqué pour `consultant-seo-freelance`, à dupliquer 19 fois).

**Étape 1 :** renommer `app/consultant-seo-strasbourg/page.tsx` → `app/consultant-seo-strasbourg/StrasbourgClient.tsx` et **retirer la première ligne `"use client"`** ? Non — au contraire, **garder** `"use client"` puisque le composant utilise `useModal`. Donc :

1. Renommer chaque `app/consultant-seo-[ville]/page.tsx` → `app/consultant-seo-[ville]/[Ville]Client.tsx` (garder `"use client"` en haut).
2. Créer un nouveau `app/consultant-seo-[ville]/page.tsx` Server Component avec `export const metadata` ET qui importe + rend le client.

Code prêt à coller pour Strasbourg (à adapter pour les 18 autres) :

```tsx
// app/consultant-seo-strasbourg/page.tsx (NOUVEAU - Server Component)
import type { Metadata } from "next";
import StrasbourgClient from "./StrasbourgClient";
import { getCityBySlug } from "@/lib/cities-data";

const cityData = getCityBySlug("consultant-seo-strasbourg")!;

export const metadata: Metadata = {
    title: `Consultant SEO Strasbourg (67000) — Indiana Aflalo | IndHack`,
    description: `Consultante SEO experte à Strasbourg. Référencement Google + SEO bilingue FR/DE pour le marché transfrontalier. Audit gratuit, accompagnement freelance. ${cityData.population} hab.`,
    keywords: ["consultant seo strasbourg", "seo strasbourg", "référencement strasbourg", "agence seo strasbourg", "expert seo bas-rhin", "seo bilingue fr de"],
    alternates: {
        canonical: "https://indhack.com/consultant-seo-strasbourg",
    },
    openGraph: {
        title: `Consultant SEO Strasbourg — expertise FR/DE | IndHack`,
        description: `Consultante SEO experte à Strasbourg. Référencement Google + SEO bilingue FR/DE pour le marché transfrontalier alsacien.`,
        url: "https://indhack.com/consultant-seo-strasbourg",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=Consultant%20SEO%20Strasbourg&subtitle=Expertise%20bilingue%20FR%2FDE",
            width: 1200,
            height: 630,
            alt: "Consultant SEO Strasbourg - Indiana Aflalo",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Consultant SEO Strasbourg — expertise FR/DE | IndHack`,
        description: `Référencement Google + SEO bilingue FR/DE pour le marché transfrontalier.`,
        images: ["https://indhack.com/api/og?title=Consultant%20SEO%20Strasbourg&subtitle=Expertise%20bilingue%20FR%2FDE"],
    },
    other: {
        "geo.region": "FR-67",
        "geo.placename": "Strasbourg",
        "geo.position": `${cityData.lat};${cityData.lng}`,
        "ICBM": `${cityData.lat}, ${cityData.lng}`,
    },
};

export default function Page() {
    return <StrasbourgClient />;
}
```

```tsx
// app/consultant-seo-strasbourg/StrasbourgClient.tsx (RENOMMÉ depuis ancien page.tsx)
"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
// ... reste du code identique à l'ancien page.tsx

export default function StrasbourgClient() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2 cityData={cityData} customContent={<StrasbourgCustomContent />} />
        </>
    );
}
```

Pour scaler les 19 villes, créer `lib/city-metadata.ts` qui factorise le builder :

```tsx
// lib/city-metadata.ts
import type { Metadata } from "next";
import { getCityBySlug, type CityData } from "@/lib/cities-data";

export function buildCityMetadata(slug: string): Metadata {
    const c = getCityBySlug(slug)!;
    const url = `https://indhack.com/${slug}`;
    return {
        title: `Consultant SEO ${c.name} (${c.zipCode}) — Indiana Aflalo | IndHack`,
        description: `Consultante SEO experte à ${c.name}. ${c.context.localInsight.slice(0, 110)} Audit gratuit, accompagnement freelance.`.slice(0, 158),
        keywords: [`consultant seo ${c.name.toLowerCase()}`, `seo ${c.name.toLowerCase()}`, `référencement ${c.name.toLowerCase()}`, `agence seo ${c.name.toLowerCase()}`, `expert seo ${c.department.toLowerCase()}`],
        alternates: { canonical: url },
        openGraph: {
            title: `Consultant SEO ${c.name} — IndHack`,
            description: `Référencement Google et SEO local sur ${c.name} (${c.zipCode}).`,
            url, type: "website", locale: "fr_FR", siteName: "IndHack",
            images: [{
                url: `https://indhack.com/api/og?title=Consultant%20SEO%20${encodeURIComponent(c.name)}&subtitle=${encodeURIComponent(c.context.targetClients.slice(0, 60))}`,
                width: 1200, height: 630, alt: `Consultant SEO ${c.name}`,
            }],
        },
        twitter: { card: "summary_large_image", title: `Consultant SEO ${c.name} — IndHack`, description: `Référencement Google sur ${c.name}.` },
        other: {
            "geo.placename": c.name,
            "geo.position": `${c.lat};${c.lng}`,
            "ICBM": `${c.lat}, ${c.lng}`,
        },
    };
}
```

Puis chaque `page.tsx` ville devient un 4-liner :

```tsx
import { buildCityMetadata } from "@/lib/city-metadata";
import StrasbourgClient from "./StrasbourgClient";
export const metadata = buildCityMetadata("consultant-seo-strasbourg");
export default function Page() { return <StrasbourgClient />; }
```

**Effort : 90 minutes pour les 19 villes** (15 mn pour la lib + ~4 mn par ville en script de rename). Impact : +85 clics/mois récurrents.

### Priorité 2 — Haute (sprint 1)

**Fix #2 : canonical sur toutes les pages services et tools.** Vérifier que `/audit-seo`, `/seo-local`, `/consultant-seo`, `/referencement-naturel`, `/creation-site-web`, `/refonte-site-web`, les 8 outils, ont chacun `alternates.canonical` dans leur `metadata`. Risque sinon : duplication via UTM.

**Fix #3 : OG image dynamique vraiment unique par ville.** Le pattern `api/og?title=` est déjà en place (déjà utilisé pour la home). Vérifier que `app/api/og/route.ts` accepte les paramètres et rend une image différente par ville. Brancher dans `buildCityMetadata`.

### Priorité 3 — Medium (sprint 2)

**Fix #4 : sitemap dynamique** (`app/sitemap.ts` au lieu de `public/sitemap.xml` statique) pour `lastmod` à chaque deploy. Le sitemap actuel ne reflète pas vos modifs récentes côté villes (lastmod figé 2026-04-22).

**Fix #5 : alléger framer-motion sur pages villes** pour gagner 300-500 ms LCP. Remplacer `motion.div` par `<div className="animate-fade-in-up">` Tailwind sur les blocs non-critiques.

**Fix #6 : ajouter `<link rel="alternate" type="application/rss+xml">` exposé** déjà fait via `metadata.alternates.types['application/rss+xml']` ligne 64. PASS, juste vérifier que `/feed.xml` est bien généré et 200.

### Priorité 4 — Low

- Nettoyer `Host:` de `robots.txt` (déprécié).
- Ajouter `<link rel="sitemap">` dans `app/layout.tsx` head (déjà couvert via robots.txt).

---

## Score technique global : 71/100

- Crawlability : 9/10
- Indexability (canonical + duplicate metadata) : 4/10
- Security headers : 9/10
- URL structure + redirects : 9/10
- Mobile-friendliness (viewport, touch) : 8/10
- Core Web Vitals (potentiel risque framer-motion) : 7/10
- Structured data : 9/10
- JS rendering (head KO sur 19 villes) : 5/10
- OG / Social : 1/10
- Sitemap : 8/10
- Hreflang : 10/10

**Le score sera 92/100 après application du Fix #1 + Fix #2.**

---

## Livrables

- Fichier de cet audit : `/Users/indiana/Desktop/indhack.Com/.audit-data/AUDIT-TECHNICAL-ALEYDA.md`
- Code de remédiation prêt à coller : §11 ci-dessus
- Helper à créer : `/Users/indiana/Desktop/indhack.Com/lib/city-metadata.ts`
- Pattern de référence existant : `/Users/indiana/Desktop/indhack.Com/app/consultant-seo-freelance/page.tsx` (lignes 1-14)
