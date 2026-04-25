#!/usr/bin/env node
/**
 * Génère l'image hero pour l'article blog "Première au Concours GEO 2026"
 * Design éditorial cohérent avec la couverture du livre blanc PDF.
 * Format Open Graph 1200x630, JPEG (pour préserver les EXIF natifs)
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Première au Concours GEO 2026 - IndHack</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1200px;
  height: 630px;
  font-family: 'Inter', sans-serif;
  background: #F4F1EC;
  color: #2A3830;
  position: relative;
  overflow: hidden;
}

.bande-sauge {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 14px;
  background: #2E5E4E;
  z-index: 2;
}

.glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 50%;
  background: radial-gradient(ellipse at top right, rgba(212, 168, 83, 0.20) 0%, transparent 60%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 3;
  padding: 60px 70px 50px 90px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Space Grotesk', sans-serif;
}

.brand-line {
  width: 24px;
  height: 1px;
  background: #2E5E4E;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #2E5E4E;
}

.edition {
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #6b7280;
  font-weight: 500;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 26px;
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #2E5E4E;
  font-weight: 600;
}

.badge-tag {
  background: #2E5E4E;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 3px;
}

.divider {
  width: 18px;
  height: 1px;
  background: #2E5E4E;
}

.title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 76px;
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -2.5px;
  color: #1f2a26;
  margin-bottom: 12px;
  max-width: 920px;
}

.title-em {
  display: block;
  font-size: 44px;
  font-weight: 500;
  margin-top: 8px;
  color: #2E5E4E;
  letter-spacing: -1.2px;
  line-height: 1;
}

.subtitle {
  font-size: 17px;
  line-height: 1.45;
  color: #4b5650;
  max-width: 720px;
  margin-top: 22px;
  margin-bottom: 30px;
}

.stats {
  display: flex;
  align-items: stretch;
  gap: 30px;
  padding-top: 22px;
  border-top: 1px solid rgba(46, 94, 78, 0.25);
  margin-top: auto;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: #2E5E4E;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-lbl {
  font-size: 11px;
  color: #4b5650;
  letter-spacing: 0.3px;
  line-height: 1.3;
}

.sep {
  width: 1px;
  background: rgba(46, 94, 78, 0.18);
}

.author-line {
  position: absolute;
  bottom: 30px;
  right: 70px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
  z-index: 4;
}

.author-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  color: #1f2a26;
  font-size: 14px;
}

.author-domain {
  font-style: italic;
}
</style>
</head>
<body>
  <div class="bande-sauge"></div>
  <div class="glow"></div>

  <div class="container">
    <div class="top-bar">
      <div class="brand">
        <div class="brand-line"></div>
        <div class="brand-name">IndHack</div>
      </div>
      <div class="edition">Avril 2026 · Étude de cas</div>
    </div>

    <div class="badge">
      <span class="badge-tag">N° 01</span>
      <span class="divider"></span>
      <span>Generative Engine Optimization</span>
    </div>

    <h1 class="title">
      Première
      <span class="title-em">au premier Concours GEO de France</span>
    </h1>

    <p class="subtitle">
      139 citations cumulées sur ChatGPT, Claude, Gemini, Perplexity et Mistral.
      Méthode complète en sept piliers, douze canaux orchestrés, trois mois d'existence du domaine.
    </p>

    <div class="stats">
      <div class="stat">
        <span class="stat-num">139</span>
        <span class="stat-lbl">mentions cumulées<br>finale 17 avril 2026</span>
      </div>
      <div class="sep"></div>
      <div class="stat">
        <span class="stat-num">154</span>
        <span class="stat-lbl">pic du concours<br>15 avril 2026</span>
      </div>
      <div class="sep"></div>
      <div class="stat">
        <span class="stat-num">5 IA</span>
        <span class="stat-lbl">ChatGPT, Claude<br>Gemini, Perplexity, Mistral</span>
      </div>
      <div class="sep"></div>
      <div class="stat">
        <span class="stat-num">3 mois</span>
        <span class="stat-lbl">âge du domaine<br>indhack.com</span>
      </div>
    </div>
  </div>

  <div class="author-line">
    <span class="author-name">Indiana Aflalo</span>
    <span>·</span>
    <span class="author-domain">indhack.com</span>
  </div>
</body>
</html>`;

const OUTPUT_JPG = '/Users/indiana/Desktop/indhack.Com/public/images/blog/concours-geo-greenred-2026-premiere-place.jpg';

console.log('🎨 Génération hero blog...');

const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.setContent(HTML, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
        path: OUTPUT_JPG,
        type: 'jpeg',
        quality: 92,
        clip: { x: 0, y: 0, width: 1200, height: 630 },
    });

    console.log(`✅ Image JPEG générée : ${OUTPUT_JPG}`);
} finally {
    await browser.close();
}
