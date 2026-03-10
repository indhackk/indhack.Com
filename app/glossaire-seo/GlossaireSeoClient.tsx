"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface GlossaryTerm {
    term: string;
    slug: string;
    definition: string;
    links?: { label: string; href: string }[];
    category: "seo-technique" | "seo-contenu" | "seo-local" | "geo-ia" | "analytics" | "strategie";
}

const CATEGORIES = {
    "seo-technique": { label: "SEO Technique", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    "seo-contenu": { label: "SEO Contenu", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    "seo-local": { label: "SEO Local", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    "geo-ia": { label: "GEO & IA", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    analytics: { label: "Analytics", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    strategie: { label: "Stratégie", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
};

const GLOSSARY_TERMS: GlossaryTerm[] = [
    {
        term: "Algorithme Google",
        slug: "algorithme-google",
        definition:
            "Système complexe utilisé par Google pour classer les pages web dans ses résultats de recherche. Il prend en compte plus de 200 facteurs de classement, dont la pertinence du contenu, la qualité des backlinks, l'expérience utilisateur et les Core Web Vitals.",
        links: [
            { label: "Comprendre le SEO", href: "/blog/definition-seo-guide-complet" },
            { label: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit" },
        ],
        category: "seo-technique",
    },
    {
        term: "Audit SEO",
        slug: "audit-seo",
        definition:
            "Analyse complète d'un site web pour identifier les problèmes techniques, sémantiques et d'autorité qui freinent son référencement naturel. Un audit SEO couvre généralement le crawl, l'indexation, la vitesse, le contenu, les backlinks et la structure du site.",
        links: [
            { label: "Faire un audit SEO", href: "/audit-seo" },
            { label: "Contenu d'un rapport d'audit", href: "/blog/contenu-rapport-audit-seo" },
            { label: "9 erreurs SEO coûteuses", href: "/blog/audit-seo-erreurs-qui-coutent-cher" },
            { label: "Outil audit gratuit", href: "/outils/audit-seo-gratuit" },
        ],
        category: "seo-technique",
    },
    {
        term: "Backlink",
        slug: "backlink",
        definition:
            "Lien hypertexte pointant d'un site externe vers le vôtre. Les backlinks de qualité (provenant de sites à forte autorité et pertinents thématiquement) sont l'un des facteurs de classement les plus importants. On parle aussi de liens entrants ou inbound links.",
        links: [
            { label: "Référencement naturel", href: "/referencement-naturel" },
        ],
        category: "strategie",
    },
    {
        term: "Balise Title",
        slug: "balise-title",
        definition:
            "Élément HTML (<title>) qui définit le titre d'une page web. C'est le texte bleu cliquable affiché dans les résultats Google. La balise title est l'un des facteurs on-page les plus importants pour le SEO : elle doit contenir le mot-clé principal et inciter au clic.",
        links: [
            { label: "Checklist SEO 2026", href: "/blog/checklist-seo-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "Balise Meta Description",
        slug: "balise-meta-description",
        definition:
            "Attribut HTML qui fournit un résumé de la page (max ~155 caractères). Bien qu'elle ne soit pas un facteur de classement direct, une meta description optimisée augmente le taux de clic (CTR) dans les résultats de recherche.",
        links: [
            { label: "Checklist SEO complète", href: "/blog/checklist-seo-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "Canonical (URL)",
        slug: "canonical-url",
        definition:
            "Balise HTML (<link rel='canonical'>) qui indique à Google quelle est la version principale d'une page quand plusieurs URLs présentent un contenu similaire. Elle évite les problèmes de contenu dupliqué.",
        links: [
            { label: "Refonte sans perte SEO", href: "/blog/refonte-site-web-sans-perdre-seo" },
        ],
        category: "seo-technique",
    },
    {
        term: "ChatGPT",
        slug: "chatgpt",
        definition:
            "Agent conversationnel développé par OpenAI, basé sur les modèles GPT. ChatGPT est devenu un moteur de réponse utilisé par des millions de personnes. Être cité par ChatGPT est un enjeu majeur du GEO (Generative Engine Optimization).",
        links: [
            { label: "Apparaître sur ChatGPT", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
            { label: "Tester sa visibilité IA", href: "/outils/testeur-visibilite-ia" },
        ],
        category: "geo-ia",
    },
    {
        term: "Contenu Dupliqué",
        slug: "contenu-duplique",
        definition:
            "Contenu identique ou très similaire accessible sur plusieurs URLs différentes (interne ou externe). Le contenu dupliqué peut diluer le ranking et empêcher Google d'indexer la bonne version de la page.",
        links: [
            { label: "Erreurs SEO coûteuses", href: "/blog/audit-seo-erreurs-qui-coutent-cher" },
        ],
        category: "seo-technique",
    },
    {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        definition:
            "Ensemble de métriques Google mesurant l'expérience utilisateur : LCP (Largest Contentful Paint, vitesse de chargement), INP (Interaction to Next Paint, réactivité) et CLS (Cumulative Layout Shift, stabilité visuelle). Facteur de classement depuis 2021.",
        links: [
            { label: "Pourquoi votre site est lent", href: "/blog/pourquoi-votre-site-est-lent-performance-web-2026" },
            { label: "Audit de performance", href: "/outils/audit-seo-gratuit" },
        ],
        category: "seo-technique",
    },
    {
        term: "Crawl / Crawling",
        slug: "crawl",
        definition:
            "Processus par lequel les robots des moteurs de recherche (Googlebot, Bingbot, GPTBot) parcourent les pages web en suivant les liens pour découvrir et analyser le contenu. L'optimisation du crawl budget est essentielle pour les gros sites.",
        links: [
            { label: "Configurer le robots.txt", href: "/outils/generateur-robots-txt" },
        ],
        category: "seo-technique",
    },
    {
        term: "CTR (Click-Through Rate)",
        slug: "ctr",
        definition:
            "Taux de clic : pourcentage d'utilisateurs qui cliquent sur votre lien par rapport au nombre total d'affichages dans les résultats de recherche. Un CTR élevé indique que votre title et meta description sont attractifs.",
        links: [
            { label: "Guide SEO complet", href: "/blog/definition-seo-guide-complet" },
        ],
        category: "analytics",
    },
    {
        term: "Données Structurées (Schema.org)",
        slug: "donnees-structurees",
        definition:
            "Balisage JSON-LD ajouté au code HTML pour aider les moteurs de recherche à comprendre le contenu : FAQ, avis, recettes, événements, entreprises locales. Les données structurées déclenchent des rich snippets (résultats enrichis) et améliorent la visibilité IA.",
        links: [
            { label: "Générateur Schema JSON-LD", href: "/outils/generateur-schema-json-ld" },
            { label: "Guide GEO", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "E-E-A-T",
        slug: "eeat",
        definition:
            "Experience, Expertise, Authoritativeness, Trustworthiness. Critères utilisés par les Quality Raters de Google pour évaluer la qualité du contenu. Un E-E-A-T fort (auteur identifié, sources citées, expertise démontrée) améliore le classement, surtout pour les sujets YMYL.",
        links: [
            { label: "Référencement naturel", href: "/referencement-naturel" },
        ],
        category: "strategie",
    },
    {
        term: "Featured Snippet",
        slug: "featured-snippet",
        definition:
            "Encadré en position 0 de Google qui affiche directement la réponse à une question. Structurer son contenu avec des listes, tableaux ou définitions claires augmente les chances d'obtenir un featured snippet.",
        links: [
            { label: "Stratégie de contenu", href: "/referencement-naturel" },
        ],
        category: "strategie",
    },
    {
        term: "GEO (Generative Engine Optimization)",
        slug: "geo",
        definition:
            "Discipline émergente visant à optimiser la visibilité d'un site dans les moteurs de réponse IA (ChatGPT, Perplexity, Claude, Gemini). Le GEO combine des techniques SEO classiques avec des optimisations spécifiques : fichier llms.txt, données structurées, contenu citable, autorité thématique.",
        links: [
            { label: "Guide GEO complet", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
            { label: "SEO vs GEO", href: "/blog/seo-vs-geo-differences" },
            { label: "Tester sa visibilité IA", href: "/outils/testeur-visibilite-ia" },
            { label: "Consultant GEO", href: "/consultant-geo" },
        ],
        category: "geo-ia",
    },
    {
        term: "Google Business Profile (GBP)",
        slug: "google-business-profile",
        definition:
            "Fiche d'établissement gratuite de Google (anciennement Google My Business) qui permet aux entreprises locales d'apparaître dans Google Maps et le Local Pack. Essentiel pour le SEO local : photos, avis, horaires, posts.",
        links: [
            { label: "Guide GBP complet", href: "/blog/google-business-profile-guide-complet" },
            { label: "Google Maps stratégie", href: "/blog/google-maps-voler-clients-concurrents" },
            { label: "GMB Autopilot", href: "/outils/gmb-autopilot" },
            { label: "SEO Local", href: "/seo-local" },
        ],
        category: "seo-local",
    },
    {
        term: "Google Search Console",
        slug: "google-search-console",
        definition:
            "Outil gratuit de Google qui permet de surveiller les performances de son site dans les résultats de recherche : impressions, clics, position moyenne, erreurs d'indexation, Core Web Vitals, et soumission de sitemaps.",
        links: [
            { label: "Importance de l'audit SEO", href: "/blog/importance-audit-seo" },
        ],
        category: "analytics",
    },
    {
        term: "GPTBot",
        slug: "gptbot",
        definition:
            "Robot de crawl d'OpenAI (user-agent: GPTBot) qui parcourt le web pour enrichir les modèles GPT et ChatGPT. Autoriser GPTBot via le robots.txt est essentiel pour la visibilité GEO. Environ 21% des 1000 plus gros sites bloquent GPTBot.",
        links: [
            { label: "Configurer le robots.txt", href: "/outils/generateur-robots-txt" },
            { label: "Guide GEO", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
        ],
        category: "geo-ia",
    },
    {
        term: "Indexation",
        slug: "indexation",
        definition:
            "Processus par lequel Google ajoute une page web à son index après l'avoir crawlée et analysée. Une page non indexée est invisible dans les résultats de recherche. On peut vérifier l'indexation via la Search Console ou la commande site:mondomaine.com.",
        links: [
            { label: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit" },
        ],
        category: "seo-technique",
    },
    {
        term: "Intention de Recherche",
        slug: "intention-de-recherche",
        definition:
            "L'objectif qu'un utilisateur cherche à atteindre avec sa requête. Les 4 types : informationnelle (apprendre), navigationnelle (trouver un site), transactionnelle (acheter) et commerciale (comparer). Aligner le contenu sur l'intention est crucial pour le SEO.",
        links: [
            { label: "Extracteur de mots-clés", href: "/outils/extracteur-mots-cles" },
            { label: "Guide SEO complet", href: "/blog/definition-seo-guide-complet" },
        ],
        category: "strategie",
    },
    {
        term: "Keyword (Mot-clé)",
        slug: "keyword",
        definition:
            "Terme ou expression saisi par les utilisateurs dans un moteur de recherche. La recherche de mots-clés (keyword research) est la base de toute stratégie SEO : identifier les requêtes à cibler en fonction du volume, de la concurrence et de l'intention.",
        links: [
            { label: "Extracteur de mots-clés", href: "/outils/extracteur-mots-cles" },
        ],
        category: "strategie",
    },
    {
        term: "Link Building / Netlinking",
        slug: "link-building",
        definition:
            "Stratégie d'acquisition de liens entrants (backlinks) depuis des sites tiers. Techniques : guest posting, linkable assets, broken link building, digital PR. La qualité prime sur la quantité : un lien d'un site d'autorité vaut plus que 100 liens de sites de faible qualité.",
        links: [
            { label: "Référencement naturel", href: "/referencement-naturel" },
        ],
        category: "strategie",
    },
    {
        term: "llms.txt",
        slug: "llms-txt",
        definition:
            "Fichier texte placé à la racine d'un site (comme robots.txt) qui aide les LLM à comprendre la structure et le contenu du site. C'est un standard émergent du GEO : il liste les pages principales, les services et les informations de citation.",
        links: [
            { label: "Guide llms.txt complet", href: "/blog/llms-txt-guide-complet" },
            { label: "Configurer le robots.txt", href: "/outils/generateur-robots-txt" },
        ],
        category: "geo-ia",
    },
    {
        term: "Local Pack",
        slug: "local-pack",
        definition:
            "Bloc de 3 résultats locaux affichés dans Google avec une carte, pour les requêtes à intention locale (ex: 'restaurant sushi Nice'). Apparaître dans le Local Pack dépend de la proximité, la pertinence et la proéminence (avis, citations).",
        links: [
            { label: "SEO Local", href: "/seo-local" },
            { label: "Google Maps stratégie", href: "/blog/google-maps-voler-clients-concurrents" },
        ],
        category: "seo-local",
    },
    {
        term: "Long Tail (Longue Traîne)",
        slug: "long-tail",
        definition:
            "Requêtes de recherche très spécifiques, composées de 3+ mots (ex: 'consultant seo spécialisé e-commerce nice'). Moins de volume que les requêtes courtes, mais taux de conversion plus élevé et concurrence plus faible.",
        links: [
            { label: "Extracteur de mots-clés", href: "/outils/extracteur-mots-cles" },
            { label: "Programmatic SEO", href: "/blog/programmatic-seo-50-pages-locales" },
        ],
        category: "strategie",
    },
    {
        term: "Maillage Interne",
        slug: "maillage-interne",
        definition:
            "Stratégie de liens internes reliant les pages d'un même site entre elles. Un bon maillage interne distribue le PageRank, facilite le crawl, renforce la structure sémantique et améliore l'UX. Technique : silos thématiques, hubs de contenu, liens contextuels.",
        links: [
            { label: "Audit SEO technique", href: "/audit-seo" },
            { label: "Checklist SEO", href: "/blog/checklist-seo-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "NAP (Name, Address, Phone)",
        slug: "nap",
        definition:
            "Les informations de base d'une entreprise locale : Nom, Adresse, Téléphone. La cohérence du NAP sur tous les annuaires et citations (Google Business Profile, Pages Jaunes, Yelp) est un facteur clé du SEO local.",
        links: [
            { label: "SEO Local", href: "/seo-local" },
            { label: "Simulateur visibilité locale", href: "/outils/simulateur-visibilite-locale" },
        ],
        category: "seo-local",
    },
    {
        term: "Nofollow / Dofollow",
        slug: "nofollow-dofollow",
        definition:
            "Attributs HTML des liens. Un lien dofollow transmet du PageRank (jus SEO), tandis qu'un lien nofollow (rel='nofollow') indique à Google de ne pas suivre ce lien. Les liens sponsorisés doivent porter l'attribut rel='sponsored'.",
        links: [
            { label: "Référencement naturel", href: "/referencement-naturel" },
        ],
        category: "seo-technique",
    },
    {
        term: "PageRank",
        slug: "pagerank",
        definition:
            "Algorithme historique de Google qui mesure l'importance d'une page web en fonction de la qualité et de la quantité des liens qui pointent vers elle. Bien que Google n'affiche plus le PageRank publiquement, le concept reste central dans l'algorithme de classement.",
        links: [
            { label: "Guide SEO", href: "/blog/definition-seo-guide-complet" },
        ],
        category: "seo-technique",
    },
    {
        term: "Perplexity",
        slug: "perplexity",
        definition:
            "Moteur de recherche IA qui synthétise des réponses à partir de sources web avec des citations. Perplexity a 45 millions d'utilisateurs et une croissance de 800% en 2024. Être cité par Perplexity est un objectif clé du GEO.",
        links: [
            { label: "Apparaître sur Perplexity", href: "/blog/apparaitre-sur-perplexity" },
            { label: "Tester sa visibilité IA", href: "/outils/testeur-visibilite-ia" },
        ],
        category: "geo-ia",
    },
    {
        term: "Programmatic SEO",
        slug: "programmatic-seo",
        definition:
            "Technique de création automatisée de pages web à grande échelle à partir de templates et de données structurées. Exemples : pages villes, fiches produits, comparateurs. Chaque page cible un mot-clé long tail spécifique.",
        links: [
            { label: "Guide Programmatic SEO", href: "/blog/programmatic-seo-50-pages-locales" },
            { label: "Pages villes IndHack", href: "/consultant-seo-nice" },
        ],
        category: "strategie",
    },
    {
        term: "Redirection 301",
        slug: "redirection-301",
        definition:
            "Redirection permanente qui transfère ~90% du PageRank de l'ancienne URL vers la nouvelle. Essentielle lors d'une refonte de site ou d'un changement de domaine pour ne pas perdre le référencement acquis.",
        links: [
            { label: "Refonte sans perte SEO", href: "/blog/refonte-site-web-sans-perdre-seo" },
        ],
        category: "seo-technique",
    },
    {
        term: "Référencement Local",
        slug: "referencement-local",
        definition:
            "Ensemble de techniques SEO visant à améliorer la visibilité d'une entreprise dans les résultats de recherche géolocalisés : Google Maps, Local Pack, recherches 'près de moi'. Inclut l'optimisation du Google Business Profile, les citations NAP et les avis clients.",
        links: [
            { label: "SEO Local", href: "/seo-local" },
            { label: "SEO local à Nice", href: "/blog/seo-local-nice" },
            { label: "Simulateur visibilité", href: "/outils/simulateur-visibilite-locale" },
        ],
        category: "seo-local",
    },
    {
        term: "Référencement Naturel (SEO)",
        slug: "referencement-naturel",
        definition:
            "L'ensemble des techniques visant à améliorer le positionnement d'un site web dans les résultats organiques (non payants) des moteurs de recherche. Le SEO se divise en 3 piliers : technique, contenu et popularité (backlinks).",
        links: [
            { label: "Nos services SEO", href: "/referencement-naturel" },
            { label: "Définition SEO complète", href: "/blog/definition-seo-guide-complet" },
            { label: "SEO vs SEA", href: "/blog/seo-vs-sea-que-choisir" },
        ],
        category: "strategie",
    },
    {
        term: "Rich Snippet",
        slug: "rich-snippet",
        definition:
            "Résultat de recherche enrichi qui affiche des informations supplémentaires (étoiles, prix, FAQ, images) grâce aux données structurées Schema.org. Les rich snippets augmentent significativement le CTR.",
        links: [
            { label: "Générateur Schema JSON-LD", href: "/outils/generateur-schema-json-ld" },
        ],
        category: "seo-technique",
    },
    {
        term: "Robots.txt",
        slug: "robots-txt",
        definition:
            "Fichier texte à la racine d'un site qui donne des directives aux robots de crawl (Googlebot, GPTBot, etc.). Il indique quelles pages crawler ou ignorer. Stratégique pour le GEO : autoriser ou bloquer les crawlers IA comme GPTBot, PerplexityBot, Claude-Web.",
        links: [
            { label: "Générateur robots.txt", href: "/outils/generateur-robots-txt" },
            { label: "Guide GEO", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "SEA (Search Engine Advertising)",
        slug: "sea",
        definition:
            "Publicité payante sur les moteurs de recherche (Google Ads, Bing Ads). Contrairement au SEO qui vise les résultats organiques, le SEA achète des positions via un système d'enchères au CPC (Coût Par Clic).",
        links: [
            { label: "SEO vs SEA", href: "/blog/seo-vs-sea-que-choisir" },
        ],
        category: "strategie",
    },
    {
        term: "SEO Local",
        slug: "seo-local",
        definition:
            "Optimisation du référencement pour les recherches géolocalisées. Comprend l'optimisation du Google Business Profile, les citations NAP, les avis clients, les pages locales et le markup LocalBusiness.",
        links: [
            { label: "Services SEO Local", href: "/seo-local" },
            { label: "Guide GBP", href: "/blog/google-business-profile-guide-complet" },
            { label: "Simulateur local", href: "/outils/simulateur-visibilite-locale" },
        ],
        category: "seo-local",
    },
    {
        term: "SEO On-Page",
        slug: "seo-on-page",
        definition:
            "Optimisations faites directement sur les pages du site : balises title, meta description, structure Hn, maillage interne, optimisation des images, contenu de qualité, données structurées. C'est le pilier le plus accessible du SEO.",
        links: [
            { label: "Checklist SEO", href: "/blog/checklist-seo-2026" },
            { label: "Audit SEO", href: "/audit-seo" },
        ],
        category: "seo-technique",
    },
    {
        term: "SEO Off-Page",
        slug: "seo-off-page",
        definition:
            "Actions d'optimisation en dehors du site : acquisition de backlinks, digital PR, mentions de marque, réseaux sociaux. L'objectif est de construire l'autorité et la crédibilité du domaine aux yeux de Google.",
        links: [
            { label: "Référencement naturel", href: "/referencement-naturel" },
        ],
        category: "strategie",
    },
    {
        term: "SEO Technique",
        slug: "seo-technique",
        definition:
            "Optimisation de l'infrastructure technique d'un site : vitesse de chargement, architecture, crawlabilité, indexation, sécurité HTTPS, responsive design, Core Web Vitals. La base technique doit être solide avant d'investir dans le contenu.",
        links: [
            { label: "Audit SEO technique", href: "/audit-seo" },
            { label: "Performance web", href: "/blog/pourquoi-votre-site-est-lent-performance-web-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "SERP (Search Engine Results Page)",
        slug: "serp",
        definition:
            "Page de résultats d'un moteur de recherche. La SERP Google comprend : résultats organiques, annonces payantes, featured snippets, Local Pack, People Also Ask, vidéos, images, et Knowledge Panel.",
        links: [
            { label: "Guide SEO", href: "/blog/definition-seo-guide-complet" },
        ],
        category: "analytics",
    },
    {
        term: "Sitemap XML",
        slug: "sitemap-xml",
        definition:
            "Fichier XML listant toutes les URLs d'un site que l'on souhaite voir indexées par les moteurs de recherche. Le sitemap facilite la découverte des pages et doit être soumis via Google Search Console.",
        links: [
            { label: "Checklist SEO", href: "/blog/checklist-seo-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "Taux de Rebond (Bounce Rate)",
        slug: "taux-de-rebond",
        definition:
            "Pourcentage de visiteurs qui quittent un site après avoir vu une seule page. Un taux de rebond élevé peut indiquer un problème de pertinence, de vitesse ou d'UX. Google utilise les signaux comportementaux comme facteur de classement indirect.",
        links: [
            { label: "Performance web", href: "/blog/pourquoi-votre-site-est-lent-performance-web-2026" },
        ],
        category: "analytics",
    },
    {
        term: "Trust Flow / Citation Flow",
        slug: "trust-flow",
        definition:
            "Métriques de Majestic qui évaluent la qualité (Trust Flow) et la quantité (Citation Flow) des backlinks d'un domaine. Un Trust Flow élevé indique des liens de sites de confiance ; un ratio TF/CF proche de 1 est idéal.",
        links: [
            { label: "Audit SEO", href: "/audit-seo" },
        ],
        category: "analytics",
    },
    {
        term: "UX (Expérience Utilisateur)",
        slug: "ux",
        definition:
            "Qualité de l'expérience vécue par un utilisateur sur un site web. Google intègre des signaux UX dans son algorithme : temps de chargement, facilité de navigation, responsive design, interactivité. Un bon UX améliore le SEO et le taux de conversion.",
        links: [
            { label: "Création de site optimisé", href: "/creation-site-web" },
            { label: "Performance web", href: "/blog/pourquoi-votre-site-est-lent-performance-web-2026" },
        ],
        category: "seo-technique",
    },
    {
        term: "Visibilité IA",
        slug: "visibilite-ia",
        definition:
            "Capacité d'un site web à être cité, recommandé ou référencé par les moteurs de réponse IA (ChatGPT, Perplexity, Claude, Gemini). La visibilité IA dépend de l'autorité du domaine, la qualité du contenu, les données structurées et l'accessibilité aux crawlers IA.",
        links: [
            { label: "Testeur visibilité IA", href: "/outils/testeur-visibilite-ia" },
            { label: "Audit IA", href: "/audit-ia" },
            { label: "SEO vs GEO", href: "/blog/seo-vs-geo-differences" },
        ],
        category: "geo-ia",
    },
    {
        term: "YMYL (Your Money Your Life)",
        slug: "ymyl",
        definition:
            "Catégorie de pages Google traitant de sujets pouvant impacter la santé, les finances ou la sécurité des utilisateurs. Google applique des standards E-E-A-T particulièrement stricts sur ces pages : santé, finance, juridique, actualités.",
        links: [
            { label: "Guide SEO complet", href: "/blog/definition-seo-guide-complet" },
        ],
        category: "strategie",
    },
    {
        term: "Zero-Click Search",
        slug: "zero-click-search",
        definition:
            "Recherche Google où l'utilisateur obtient sa réponse directement dans la SERP (featured snippet, Knowledge Panel, Local Pack) sans cliquer sur aucun résultat. En 2025, plus de 60% des recherches Google sont zero-click. Le GEO et les featured snippets sont des stratégies de réponse.",
        links: [
            { label: "SEO vs GEO", href: "/blog/seo-vs-geo-differences" },
            { label: "Guide GEO", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
        ],
        category: "geo-ia",
    },
    {
        term: "Consultant SEO",
        slug: "consultant-seo",
        definition:
            "Professionnel spécialisé dans l'optimisation du référencement naturel. Un consultant SEO audite les sites, élabore des stratégies de visibilité, optimise le contenu et les aspects techniques, et suit les performances. Peut être freelance ou en agence.",
        links: [
            { label: "Devenir consultant SEO", href: "/blog/devenir-consultant-seo" },
            { label: "Salaire consultant SEO", href: "/blog/salaire-consultant-seo" },
            { label: "Nos services", href: "/consultant-seo" },
            { label: "Pourquoi un consultant SEO", href: "/blog/pourquoi-consultant-seo" },
        ],
        category: "strategie",
    },
    {
        term: "Refonte de Site Web",
        slug: "refonte-site-web",
        definition:
            "Reconstruction complète ou partielle d'un site web : design, structure, technologie, contenu. La refonte est risquée pour le SEO si les redirections 301, les canonical URLs et la structure ne sont pas planifiées. Peut entraîner une perte de 30-80% du trafic si mal gérée.",
        links: [
            { label: "Checklist refonte SEO", href: "/blog/refonte-site-web-sans-perdre-seo" },
            { label: "Service refonte", href: "/refonte-site-web" },
        ],
        category: "strategie",
    },
    {
        term: "Formation SEO",
        slug: "formation-seo",
        definition:
            "Parcours d'apprentissage du référencement naturel. Les formations SEO couvrent généralement les 3 piliers (technique, contenu, popularité), les outils (Search Console, Semrush, Ahrefs) et les tendances actuelles comme le GEO.",
        links: [
            { label: "Quelle formation choisir", href: "/blog/quelle-formation-seo" },
            { label: "Devenir consultant SEO", href: "/blog/devenir-consultant-seo" },
        ],
        category: "strategie",
    },
    {
        term: "AIO (AI Overview / AI Overviews)",
        slug: "aio",
        definition:
            "Réponses générées par l'IA de Google affichées en haut des résultats de recherche. Les AI Overviews synthétisent le contenu de plusieurs sources pour répondre directement aux requêtes. Être cité dans une AIO nécessite un contenu E-E-A-T fort et des données structurées.",
        links: [
            { label: "SEO vs GEO", href: "/blog/seo-vs-geo-differences" },
            { label: "Visibilité IA", href: "/outils/testeur-visibilite-ia" },
        ],
        category: "geo-ia",
    },
    {
        term: "Création de Site Web",
        slug: "creation-site-web",
        definition:
            "Processus de conception et développement d'un site internet. Pour un bon référencement dès le départ, la création doit intégrer le SEO technique (architecture, vitesse, responsive), le contenu optimisé et les données structurées.",
        links: [
            { label: "Créer un site visible", href: "/blog/comment-creer-site-visible-google" },
            { label: "Prix création 2026", href: "/blog/prix-creation-site-internet-2026" },
            { label: "Service création", href: "/creation-site-web" },
        ],
        category: "strategie",
    },
    {
        term: "Domain Authority (DA) / Authority Score",
        slug: "domain-authority",
        definition:
            "Métrique (échelle 0-100) créée par des outils SEO (Moz, Semrush) pour estimer la capacité d'un domaine à se classer dans Google. Basée sur la qualité et quantité des backlinks. Ce n'est pas un facteur Google officiel, mais un bon indicateur comparatif.",
        links: [
            { label: "Audit SEO", href: "/audit-seo" },
            { label: "Référencement naturel", href: "/referencement-naturel" },
        ],
        category: "analytics",
    },
    {
        term: "PerplexityBot",
        slug: "perplexitybot",
        definition:
            "Robot de crawl de Perplexity AI qui parcourt le web pour alimenter les réponses de son moteur de recherche IA. Autoriser PerplexityBot dans le robots.txt est essentiel pour apparaître dans les citations de Perplexity.",
        links: [
            { label: "Apparaître sur Perplexity", href: "/blog/apparaitre-sur-perplexity" },
            { label: "Générateur robots.txt", href: "/outils/generateur-robots-txt" },
        ],
        category: "geo-ia",
    },
    {
        term: "Cocon Sémantique",
        slug: "cocon-semantique",
        definition:
            "Architecture de contenu où les pages sont organisées en silos thématiques avec un maillage interne optimisé. Inventé par Laurent Bourrelly, le cocon sémantique structure le site autour de pages mères (piliers) et pages filles liées par des liens contextuels.",
        links: [
            { label: "Référencement naturel", href: "/referencement-naturel" },
            { label: "Audit SEO", href: "/audit-seo" },
        ],
        category: "seo-contenu",
    },
    {
        term: "Contenu Citable",
        slug: "contenu-citable",
        definition:
            "Contenu formaté pour être facilement cité par les moteurs IA : statistiques sourcées, définitions claires, listes structurées, études originales. La recherche Princeton GEO (2024) montre que le contenu citable augmente la visibilité IA de 30 à 40%.",
        links: [
            { label: "Guide GEO", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
            { label: "SEO vs GEO", href: "/blog/seo-vs-geo-differences" },
        ],
        category: "geo-ia",
    },
];

export default function GlossaireSeoClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

    const filteredTerms = useMemo(() => {
        let terms = GLOSSARY_TERMS;
        if (activeCategory) {
            terms = terms.filter((t) => t.category === activeCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            terms = terms.filter(
                (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
            );
        }
        return terms.sort((a, b) => a.term.localeCompare(b.term, "fr"));
    }, [searchQuery, activeCategory]);

    const letters = useMemo(() => {
        const letterSet = new Set(filteredTerms.map((t) => t.term[0].toUpperCase()));
        return Array.from(letterSet).sort((a, b) => a.localeCompare(b, "fr"));
    }, [filteredTerms]);

    const toggleTerm = (slug: string) => {
        setExpandedTerms((prev) => {
            const next = new Set(prev);
            if (next.has(slug)) {
                next.delete(slug);
            } else {
                next.add(slug);
            }
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Hero */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-medium mb-6">
                            +{GLOSSARY_TERMS.length} définitions
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Glossaire SEO & GEO
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                            Tous les termes du référencement naturel et de la visibilité IA expliqués simplement.
                            De A/B Testing à Zero-Click Search.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-lg mx-auto mb-8">
                            <input
                                type="text"
                                placeholder="Rechercher un terme SEO..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                            />
                            <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        {/* Category filters */}
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                                    !activeCategory
                                        ? "bg-white/10 text-white border-white/20"
                                        : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-600"
                                }`}
                            >
                                Tous ({GLOSSARY_TERMS.length})
                            </button>
                            {Object.entries(CATEGORIES).map(([key, { label, color }]) => {
                                const count = GLOSSARY_TERMS.filter((t) => t.category === key).length;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                                            activeCategory === key
                                                ? color
                                                : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-600"
                                        }`}
                                    >
                                        {label} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Alphabet nav */}
            <div className="sticky top-16 z-30 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-white/5 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-1">
                        {letters.map((letter) => (
                            <a
                                key={letter}
                                href={`#letter-${letter}`}
                                className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                {letter}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Terms */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {letters.map((letter) => {
                        const termsForLetter = filteredTerms.filter(
                            (t) => t.term[0].toUpperCase() === letter
                        );
                        return (
                            <div key={letter} id={`letter-${letter}`} className="mb-10">
                                <h2 className="text-2xl font-bold text-purple-400 mb-4 pl-2 border-l-4 border-purple-500">
                                    {letter}
                                </h2>
                                <div className="space-y-3">
                                    {termsForLetter.map((term) => {
                                        const isExpanded = expandedTerms.has(term.slug);
                                        return (
                                            <div
                                                key={term.slug}
                                                id={term.slug}
                                                className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all"
                                            >
                                                <button
                                                    onClick={() => toggleTerm(term.slug)}
                                                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-lg font-semibold text-white">
                                                            {term.term}
                                                        </h3>
                                                        <span
                                                            className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                                                                CATEGORIES[term.category].color
                                                            }`}
                                                        >
                                                            {CATEGORIES[term.category].label}
                                                        </span>
                                                    </div>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                                                            isExpanded ? "rotate-180" : ""
                                                        }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>
                                                {isExpanded && (
                                                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                                                        <p className="text-gray-300 leading-relaxed mb-4">
                                                            {term.definition}
                                                        </p>
                                                        {term.links && term.links.length > 0 && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {term.links.map((link) => (
                                                                    <Link
                                                                        key={link.href}
                                                                        href={link.href}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-medium border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                                                                    >
                                                                        <svg
                                                                            className="w-3.5 h-3.5"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                                            />
                                                                        </svg>
                                                                        {link.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {filteredTerms.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">
                                Aucun terme trouvé pour &ldquo;{searchQuery}&rdquo;
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Besoin d&apos;un audit SEO complet ?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Testez votre site gratuitement avec nos outils ou demandez un audit détaillé avec plan
                        d&apos;action personnalisé.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/outils/audit-seo-gratuit"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all"
                        >
                            Audit SEO gratuit
                        </Link>
                        <Link
                            href="/outils/testeur-visibilite-ia"
                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
                        >
                            Tester ma visibilité IA
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
