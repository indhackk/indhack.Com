/**
 * Script de génération Excel pour l'audit SEO indhack.com
 * Exécuter avec: node scripts/generate-audit-excel.js
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// ============================================================================
// DONNÉES DE L'AUDIT
// ============================================================================

// Feuille 1: Vue d'ensemble des silos
const silosData = [
  ['Silo', 'Pages', 'Score /10', 'Points forts', 'Points faibles'],
  ['Silo 5 - Refonte', 3, 9.4, 'Cocon 100%, ancres parfaites', '1 meta légèrement longue'],
  ['Silo 1 - Services', 6, 8.2, 'Ancres 95% optimisées', 'Maillage 60%, 3 titles longs'],
  ['Silo 10 - Autres', 9, 8.0, 'Homepage complète', 'Blog listing sans metadata'],
  ['Silo 3 - Consultant', 6, 7.7, 'FAQ systématiques', '3 metas trop longues'],
  ['Silo 8 - Outils', 7, 7.2, 'Schemas complets', 'Extracteur sans metadata'],
  ['Silo 2 - Audit SEO', 4, 7.5, 'Cocon 150%', '2 articles trop courts'],
  ['Silo 4 - SEO Local', 6, 6.5, 'Pilier bien maillé', '5/6 metas trop longues'],
  ['Silo 6 - Création', 5, 6.4, 'FAQ présentes', '3 articles courts, boutique orpheline'],
  ['Silo 7 - Réf. Naturel', 4, 6.0, 'Pilier 6/6 KW', 'programmatic-seo 900 mots'],
  ['Silo 9 - Villes', 19, 5.5, 'Template uniforme', '19 titles trop courts'],
];

// Feuille 2: Toutes les URLs
const urlsData = [
  ['URL', 'Type', 'Silo', 'Title (car.)', 'Title Statut', 'Meta (car.)', 'Meta Statut', 'Mots', 'Mots Statut', 'Score KW /6', 'Problèmes'],

  // SERVICES
  ['/', 'Homepage', 'Autres', 60, 'OK', 155, 'OK', 800, 'OK', 6, ''],
  ['/consultant-seo', 'Service', 'Services', 63, 'Warning', 155, 'OK', 1150, 'Court', 6, 'Title légèrement long'],
  ['/audit-seo', 'Service', 'Services', 55, 'OK', 167, 'Trop long', 650, 'Court', 5, 'Meta trop longue, FAQPage schema manquant'],
  ['/referencement-naturel', 'Service', 'Services', 54, 'OK', 147, 'OK', 900, 'OK', 6, ''],
  ['/seo-local', 'Service', 'Services', 54, 'OK', 193, 'TRÈS long', 760, 'Court', 6, 'Meta TRÈS longue (193 car.)'],
  ['/creation-site-web', 'Service', 'Services', 61, 'Trop long', 157, 'Trop long', 850, 'OK', 5, 'Title + Meta trop longs'],
  ['/refonte-site-web', 'Service', 'Services', 53, 'OK', 153, 'OK', 900, 'OK', 6, ''],
  ['/creation-boutique-en-ligne', 'Service', 'Création', 65, 'Trop long', 165, 'Trop long', 750, 'OK', 5, 'Orpheline, Title + Meta trop longs'],

  // OUTILS
  ['/outils', 'Index outils', 'Outils', 54, 'OK', 160, 'OK', 600, 'Court', 5, ''],
  ['/outils/audit-seo-gratuit', 'Outil', 'Outils', 56, 'OK', 162, 'Warning', 800, 'Court', 6, 'Meta légèrement longue'],
  ['/outils/testeur-visibilite-ia', 'Outil', 'Outils', 58, 'OK', 168, 'Trop long', 1800, 'OK', 6, 'Meta trop longue'],
  ['/outils/simulateur-visibilite-locale', 'Outil', 'Outils', 62, 'Trop long', 165, 'Warning', 700, 'Court', 5, 'Title trop long, maillage faible (4 liens)'],
  ['/outils/generateur-robots-txt', 'Outil', 'Outils', 54, 'OK', 170, 'Trop long', 1200, 'OK', 6, 'Meta trop longue'],
  ['/outils/generateur-schema-json-ld', 'Outil', 'Outils', 56, 'OK', 152, 'OK', 900, 'OK', 6, ''],
  ['/outils/extracteur-mots-cles', 'Outil', 'Outils', 0, 'ABSENT', 0, 'ABSENT', 650, 'Court', 2, 'CRITIQUE: Metadata absentes'],

  // ARTICLES BLOG - AUDIT SEO
  ['/blog/contenu-rapport-audit-seo', 'Article', 'Audit SEO', 46, 'OK', 176, 'Trop long', 2450, 'OK', 6, 'Meta trop longue'],
  ['/blog/importance-audit-seo', 'Article', 'Audit SEO', 64, 'Warning', 154, 'OK', 1450, 'Court', 5, 'Title légèrement long, contenu court'],
  ['/blog/audit-seo-erreurs-qui-coutent-cher', 'Article', 'Audit SEO', 60, 'OK', 174, 'Trop long', 1050, 'TRÈS court', 5, 'CRITIQUE: ~1050 mots seulement'],

  // ARTICLES BLOG - CONSULTANT SEO
  ['/blog/pourquoi-consultant-seo', 'Article', 'Consultant', 50, 'OK', 155, 'OK', 2000, 'OK', 5, 'H1 = Title'],
  ['/blog/devenir-consultant-seo', 'Article', 'Consultant', 52, 'OK', 160, 'Trop long', 2400, 'OK', 6, 'Meta trop longue'],
  ['/blog/missions-consultant-seo', 'Article', 'Consultant', 64, 'Trop long', 171, 'Trop long', 2000, 'OK', 5, 'Title + Meta trop longs'],
  ['/blog/salaire-consultant-seo', 'Article', 'Consultant', 52, 'OK', 145, 'OK', 2300, 'OK', 6, ''],
  ['/blog/quelle-formation-seo', 'Article', 'Consultant', 38, 'Court', 154, 'OK', 2200, 'OK', 5, 'Title court (38 car.)'],

  // ARTICLES BLOG - SEO LOCAL / GEO
  ['/blog/seo-local-nice', 'Article', 'SEO Local', 51, 'OK', 167, 'Trop long', 1300, 'Court', 6, 'Meta trop longue, contenu court'],
  ['/blog/google-business-profile-guide-complet', 'Article', 'SEO Local', 47, 'OK', 137, 'OK', 2700, 'OK', 6, ''],
  ['/blog/google-maps-voler-clients-concurrents', 'Article', 'SEO Local', 64, 'Trop long', 162, 'Trop long', 1200, 'Court', 5, 'Title + Meta + contenu court'],
  ['/blog/geo-comment-apparaitre-chatgpt-2026', 'Article', 'SEO Local', 85, 'TRÈS long', 177, 'Trop long', 2600, 'OK', 4, 'CRITIQUE: Title 85 car.'],
  ['/blog/visibilite-ia-geo', 'Article', 'SEO Local', 53, 'OK', 166, 'Trop long', 1500, 'Court', 6, 'Meta trop longue, contenu court'],

  // ARTICLES BLOG - REFONTE
  ['/blog/refonte-site-web-sans-perdre-seo', 'Article', 'Refonte', 55, 'OK', 158, 'Trop long', 2400, 'OK', 6, 'Meta légèrement longue'],
  ['/blog/checklist-seo-refonte-site', 'Article', 'Refonte', 52, 'OK', 160, 'Trop long', 2500, 'OK', 6, 'Meta légèrement longue'],

  // ARTICLES BLOG - CRÉATION
  ['/blog/comment-creer-site-visible-google', 'Article', 'Création', 57, 'OK', 162, 'Trop long', 1600, 'Court', 5, 'Meta trop longue, contenu court'],
  ['/blog/cout-site-web-2026', 'Article', 'Création', 52, 'OK', 165, 'Trop long', 1650, 'Court', 5, 'Meta trop longue, contenu court'],
  ['/blog/pourquoi-votre-site-est-lent-performance-web-2026', 'Article', 'Création', 73, 'Trop long', 168, 'Trop long', 1900, 'Court', 4, 'Title + Meta + contenu court'],

  // ARTICLES BLOG - AUTRES
  ['/blog/checklist-seo-2026', 'Article', 'Réf. Naturel', 70, 'Trop long', 165, 'Trop long', 2200, 'OK', 5, 'Title + Meta trop longs'],
  ['/blog/seo-vs-sea-que-choisir', 'Article', 'Réf. Naturel', 48, 'OK', 158, 'Trop long', 1800, 'Court', 5, 'Meta trop longue, contenu court'],
  ['/blog/programmatic-seo-50-pages-locales', 'Article', 'Réf. Naturel', 74, 'Trop long', 165, 'Trop long', 900, 'CRITIQUE', 4, 'CRITIQUE: ~900 mots, Title 74 car.'],

  // PAGES VILLES
  ['/consultant-seo-nice', 'Ville', 'Villes', 31, 'Court', 178, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-paris', 'Ville', 'Villes', 31, 'Court', 177, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-lyon', 'Ville', 'Villes', 30, 'Court', 175, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-marseille', 'Ville', 'Villes', 34, 'Court', 180, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-cannes', 'Ville', 'Villes', 32, 'Court', 176, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-antibes', 'Ville', 'Villes', 32, 'Court', 176, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-sophia-antipolis', 'Ville', 'Villes', 40, 'Court', 182, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-monaco', 'Ville', 'Villes', 32, 'Court', 176, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-bordeaux', 'Ville', 'Villes', 34, 'Court', 178, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-toulouse', 'Ville', 'Villes', 34, 'Court', 178, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-lille', 'Ville', 'Villes', 31, 'Court', 175, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-nantes', 'Ville', 'Villes', 32, 'Court', 176, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-rennes', 'Ville', 'Villes', 32, 'Court', 176, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-strasbourg', 'Ville', 'Villes', 35, 'Court', 179, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-montpellier', 'Ville', 'Villes', 36, 'Court', 180, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-grenoble', 'Ville', 'Villes', 34, 'Court', 178, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-aix-en-provence', 'Ville', 'Villes', 40, 'Court', 184, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-boulogne-billancourt', 'Ville', 'Villes', 42, 'Court', 186, 'Trop long', 1500, 'OK', 5, 'Title trop court'],
  ['/consultant-seo-juan-les-pins', 'Ville', 'Villes', 38, 'Court', 182, 'Trop long', 1500, 'OK', 5, 'Title trop court'],

  // PAGES UTILITAIRES
  ['/a-propos', 'Utilitaire', 'Autres', 55, 'OK', 176, 'Trop long', 800, 'OK', 5, 'Meta trop longue'],
  ['/contact', 'Utilitaire', 'Autres', 48, 'OK', 142, 'OK', 300, 'OK', 5, ''],
  ['/faq', 'Utilitaire', 'Autres', 45, 'OK', 148, 'OK', 1200, 'OK', 5, ''],
  ['/etudes-de-cas', 'Utilitaire', 'Autres', 52, 'OK', 155, 'OK', 600, 'OK', 5, ''],
  ['/blog', 'Listing', 'Autres', 0, 'ABSENT', 0, 'ABSENT', 200, 'OK', 0, 'CRITIQUE: Metadata absentes'],
  ['/mentions-legales', 'Légal', 'Autres', 40, 'OK', 135, 'OK', 500, 'OK', 0, 'noindex OK'],
  ['/confidentialite', 'Légal', 'Autres', 45, 'OK', 140, 'OK', 800, 'OK', 0, 'noindex OK'],
  ['/cgv', 'Légal', 'Autres', 38, 'OK', 130, 'OK', 1000, 'OK', 0, 'noindex OK'],
];

// Feuille 3: TOP 15 Actions prioritaires
const actionsData = [
  ['#', 'Priorité', 'Action', 'Impact', 'Effort', 'Fichier'],
  [1, 'P0', 'Corriger metadata /outils/extracteur-mots-cles', 'SEO', '30 min', 'app/outils/extracteur-mots-cles/'],
  [2, 'P0', 'Enrichir /blog/programmatic-seo (+1100 mots)', 'SEO', '2h', 'content/blog/programmatic-seo-50-pages-locales.md'],
  [3, 'P0', 'Raccourcir title geo-chatgpt (85→60 car.)', 'SEO', '10 min', 'content/blog/geo-comment-apparaitre-chatgpt-2026.md'],
  [4, 'P0', 'Enrichir /blog/audit-seo-erreurs (+950 mots)', 'SEO', '1h30', 'content/blog/audit-seo-erreurs-qui-coutent-cher.md'],
  [5, 'P0', 'Ajouter FAQPage schema sur /audit-seo', 'SEO', '20 min', 'app/audit-seo/AuditSeoClient.tsx'],
  [6, 'P1', 'Raccourcir 15+ meta descriptions > 155 car.', 'SEO', '1h', 'Multiples'],
  [7, 'P1', 'Enrichir titles pages villes (19-34→50-60 car.)', 'SEO', '2h', 'lib/cities-data.ts'],
  [8, 'P1', 'Compléter maillage silo Services (60%→90%)', 'Maillage', '30 min', 'Pages services'],
  [9, 'P1', 'Enrichir articles courts < 1500 mots', 'SEO', '3h', '5 articles'],
  [10, 'P1', 'Ajouter extracteur-mots-cles à index /outils', 'Maillage', '15 min', 'app/outils/page.tsx'],
  [11, 'P2', 'Améliorer maillage simulateur-local', 'Maillage', '20 min', 'app/outils/simulateur-visibilite-locale/'],
  [12, 'P2', 'Ajouter metadata /blog (listing)', 'SEO', '15 min', 'app/blog/page.tsx'],
  [13, 'P2', 'Raccourcir meta /a-propos (176 car.)', 'SEO', '5 min', 'app/a-propos/page.tsx'],
  [14, 'P2', 'Différencier H1 des Titles (18 articles)', 'SEO', '1h', 'content/blog/*.md'],
  [15, 'P2', 'Vérifier pages noindex dans sitemap', 'Tech', '10 min', 'next.config.mjs'],
];

// Feuille 4: Contenu trop court
const contenuCourtData = [
  ['URL', 'Mots actuels', 'Objectif', 'Déficit', 'Priorité'],
  ['/blog/programmatic-seo-50-pages-locales', 900, 2000, -1100, 'P0 CRITIQUE'],
  ['/blog/audit-seo-erreurs-qui-coutent-cher', 1050, 2000, -950, 'P0 CRITIQUE'],
  ['/blog/google-maps-voler-clients-concurrents', 1200, 2000, -800, 'P1'],
  ['/blog/seo-local-nice', 1300, 2000, -700, 'P1'],
  ['/blog/importance-audit-seo', 1450, 2000, -550, 'P1'],
  ['/blog/visibilite-ia-geo', 1500, 2000, -500, 'P1'],
  ['/blog/comment-creer-site-visible-google', 1600, 2000, -400, 'P2'],
  ['/blog/cout-site-web-2026', 1650, 2000, -350, 'P2'],
  ['/blog/seo-vs-sea-que-choisir', 1800, 2000, -200, 'P2'],
  ['/blog/pourquoi-votre-site-est-lent-performance-web-2026', 1900, 2000, -100, 'P2'],
];

// Feuille 5: Metadata trop longues
const metaLonguesData = [
  ['URL', 'Type', 'Title (car.)', 'Max Title', 'Meta (car.)', 'Max Meta', 'Problème'],
  ['/blog/geo-comment-apparaitre-chatgpt-2026', 'Article', 85, 60, 177, 155, 'Title TRÈS long + Meta'],
  ['/blog/programmatic-seo-50-pages-locales', 'Article', 74, 60, 165, 155, 'Title + Meta'],
  ['/blog/pourquoi-votre-site-est-lent-performance-web-2026', 'Article', 73, 60, 168, 155, 'Title + Meta'],
  ['/blog/checklist-seo-2026', 'Article', 70, 60, 165, 155, 'Title + Meta'],
  ['/creation-boutique-en-ligne', 'Service', 65, 60, 165, 155, 'Title + Meta'],
  ['/blog/missions-consultant-seo', 'Article', 64, 60, 171, 155, 'Title + Meta'],
  ['/blog/google-maps-voler-clients-concurrents', 'Article', 64, 60, 162, 155, 'Title + Meta'],
  ['/seo-local', 'Service', 54, 60, 193, 155, 'Meta TRÈS longue'],
  ['/blog/contenu-rapport-audit-seo', 'Article', 46, 60, 176, 155, 'Meta'],
  ['/outils/generateur-robots-txt', 'Outil', 54, 60, 170, 155, 'Meta'],
  ['/outils/testeur-visibilite-ia', 'Outil', 58, 60, 168, 155, 'Meta'],
  ['/audit-seo', 'Service', 55, 60, 167, 155, 'Meta'],
  ['/blog/seo-local-nice', 'Article', 51, 60, 167, 155, 'Meta'],
  ['/blog/visibilite-ia-geo', 'Article', 53, 60, 166, 155, 'Meta'],
];

// Feuille 6: Maillage inter-services
const maillageData = [
  ['Depuis ↓ / Vers →', 'consultant-seo', 'audit-seo', 'referencement', 'seo-local', 'creation', 'refonte'],
  ['/consultant-seo', '-', '✅', '✅', '✅', '✅', '✅'],
  ['/audit-seo', '✅', '-', '✅', '❌', '❌', '❌'],
  ['/referencement-naturel', '✅', '❌', '-', '✅', '❌', '❌'],
  ['/seo-local', '✅', '✅', '✅', '-', '❌', '❌'],
  ['/creation-site-web', '❌', '✅', '✅', '✅', '-', '✅'],
  ['/refonte-site-web', '❌', '✅', '✅', '✅', '✅', '-'],
];

// ============================================================================
// GÉNÉRATION DU FICHIER EXCEL
// ============================================================================

function generateExcel() {
  const wb = XLSX.utils.book_new();

  // Feuille 1: Silos
  const ws1 = XLSX.utils.aoa_to_sheet(silosData);
  ws1['!cols'] = [{ wch: 20 }, { wch: 8 }, { wch: 10 }, { wch: 35 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(wb, ws1, 'Silos');

  // Feuille 2: Toutes les URLs
  const ws2 = XLSX.utils.aoa_to_sheet(urlsData);
  ws2['!cols'] = [
    { wch: 50 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
    { wch: 12 }, { wch: 12 }, { wch: 8 }, { wch: 12 }, { wch: 10 }, { wch: 50 }
  ];
  XLSX.utils.book_append_sheet(wb, ws2, 'URLs (94)');

  // Feuille 3: Actions prioritaires
  const ws3 = XLSX.utils.aoa_to_sheet(actionsData);
  ws3['!cols'] = [{ wch: 5 }, { wch: 8 }, { wch: 50 }, { wch: 10 }, { wch: 10 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, ws3, 'TOP 15 Actions');

  // Feuille 4: Contenu court
  const ws4 = XLSX.utils.aoa_to_sheet(contenuCourtData);
  ws4['!cols'] = [{ wch: 50 }, { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(wb, ws4, 'Contenu court');

  // Feuille 5: Metadata longues
  const ws5 = XLSX.utils.aoa_to_sheet(metaLonguesData);
  ws5['!cols'] = [{ wch: 50 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, ws5, 'Metadata longues');

  // Feuille 6: Maillage
  const ws6 = XLSX.utils.aoa_to_sheet(maillageData);
  ws6['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, ws6, 'Maillage Services');

  // Sauvegarder
  const outputPath = path.join(process.cwd(), 'public', 'audit-seo-indhack.xlsx');
  XLSX.writeFile(wb, outputPath);

  console.log('✅ Fichier Excel généré: public/audit-seo-indhack.xlsx');
  console.log('');
  console.log('📊 Contenu du fichier:');
  console.log('   - Silos: Vue d\'ensemble des 10 silos avec scores');
  console.log('   - URLs (94): Toutes les pages avec metadata et statuts');
  console.log('   - TOP 15 Actions: Actions prioritaires P0/P1/P2');
  console.log('   - Contenu court: Articles < 2000 mots');
  console.log('   - Metadata longues: Titles et metas à corriger');
  console.log('   - Maillage Services: Matrice de liens inter-services');

  return outputPath;
}

// Exécuter
generateExcel();
