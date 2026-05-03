#!/usr/bin/env node
/**
 * Génère le PDF du brief Codex à partir de .context/CODEX-INIT.md
 * Sortie : /Users/indiana/Desktop/CODEX-INIT-IndHack.pdf
 *
 * Pas besoin du serveur Next.js : on convertit le markdown directement en HTML stylé,
 * puis on rend en PDF via Puppeteer.
 */

import puppeteer from 'puppeteer';
import { marked } from 'marked';
import { readFile, writeFile } from 'fs/promises';

const SOURCE = '/Users/indiana/Desktop/indhack.Com/.context/CODEX-INIT.md';
const OUTPUT = '/Users/indiana/Desktop/CODEX-INIT-IndHack.pdf';

console.log('\nGénération PDF brief Codex\n');
console.log(`  Source : ${SOURCE}`);
console.log(`  Sortie : ${OUTPUT}\n`);

// Lecture du markdown
const md = await readFile(SOURCE, 'utf-8');
const html = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Brief Codex — IndHack</title>
<style>
  @page {
    size: A4;
    margin: 22mm 18mm 22mm 18mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #2A3830;
    max-width: none;
  }
  h1 {
    font-size: 22pt;
    color: #2E5E4E;
    border-bottom: 2px solid #2E5E4E;
    padding-bottom: 8pt;
    margin-top: 32pt;
    margin-bottom: 16pt;
    page-break-before: always;
    page-break-after: avoid;
  }
  h1:first-of-type { page-break-before: auto; }
  h2 {
    font-size: 15pt;
    color: #2E5E4E;
    margin-top: 24pt;
    margin-bottom: 10pt;
    page-break-after: avoid;
  }
  h3 {
    font-size: 12pt;
    color: #2A3830;
    margin-top: 16pt;
    margin-bottom: 8pt;
    page-break-after: avoid;
  }
  p { margin: 6pt 0; text-align: justify; }
  ul, ol { margin: 6pt 0 6pt 18pt; padding: 0; }
  li { margin: 3pt 0; }
  strong { color: #2A3830; font-weight: 700; }
  em { font-style: italic; }
  code {
    background: #F4F6F4;
    padding: 1pt 4pt;
    border-radius: 3pt;
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
    font-size: 9.5pt;
    color: #2E5E4E;
  }
  pre {
    background: #F4F6F4;
    padding: 10pt 12pt;
    border-radius: 5pt;
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
    font-size: 9pt;
    line-height: 1.45;
    overflow-x: auto;
    page-break-inside: avoid;
    border-left: 3px solid #2E5E4E;
  }
  pre code {
    background: transparent;
    padding: 0;
    color: #2A3830;
  }
  blockquote {
    border-left: 3px solid #D4A853;
    background: #FBF8F0;
    padding: 8pt 12pt;
    margin: 10pt 0;
    color: #3D4D46;
    font-style: italic;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  th, td {
    border: 1px solid #E4EBE7;
    padding: 6pt 8pt;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #F4F6F4;
    font-weight: 700;
    color: #2E5E4E;
  }
  hr {
    border: none;
    border-top: 1px solid #E4EBE7;
    margin: 18pt 0;
  }
  a { color: #2E5E4E; text-decoration: underline; }

  /* Première page de garde */
  .cover {
    height: 247mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    page-break-after: always;
    border-bottom: none;
  }
  .cover .label {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 3pt;
    color: #8FBFAA;
    font-weight: 700;
    margin-bottom: 16pt;
  }
  .cover .title {
    font-size: 38pt;
    line-height: 1.1;
    font-weight: 800;
    color: #2A3830;
    margin: 0;
    border: none;
    page-break-before: auto;
  }
  .cover .subtitle {
    font-size: 14pt;
    color: #3D4D46;
    margin-top: 16pt;
    line-height: 1.5;
    max-width: 500pt;
  }
  .cover .meta {
    margin-top: auto;
    font-size: 10pt;
    color: #3D4D46;
    border-top: 1px solid #E4EBE7;
    padding-top: 14pt;
    width: 100%;
  }
</style>
</head>
<body>

<div class="cover">
  <div class="label">Brief de contexte</div>
  <h1 class="title">IndHack — Init Codex</h1>
  <div class="subtitle">
    Document de contexte exhaustif pour Codex sur le projet indhack.com :
    qui est Indiana Aflalo, le concours GEO 2026, l'écosystème business,
    la stack technique, les stratégies SEO et GEO, l'historique des audits,
    les conventions, les pages sensibles, la roadmap.
  </div>
  <div class="meta">
    <strong>Indiana Aflalo</strong> — Consultante SEO &amp; GEO &middot; IndHack &middot; Nice, France<br>
    Site : indhack.com &middot; Email : contact@indhack.com<br>
    Mis à jour : 2 mai 2026
  </div>
</div>

${html}

</body>
</html>`;

// Écrit le HTML temporaire pour debug
await writeFile('/tmp/codex-init.html', fullHtml);

// Lancement Puppeteer
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0', timeout: 60000 });

  console.log('Génération PDF en cours...');

  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '22mm', bottom: '22mm', left: '18mm', right: '18mm' },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:8pt; color:#8FBFAA; width:100%; padding:0 18mm; display:flex; justify-content:space-between;">
        <span>Brief Codex IndHack</span>
        <span>Indiana Aflalo &middot; indhack.com</span>
      </div>`,
    footerTemplate: `
      <div style="font-size:8pt; color:#8FBFAA; width:100%; padding:0 18mm; text-align:center;">
        Page <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>`,
  });

  console.log(`\nPDF généré : ${OUTPUT}\n`);
} finally {
  await browser.close();
}
