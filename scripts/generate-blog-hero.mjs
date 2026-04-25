#!/usr/bin/env node
/**
 * Génère le hero blog : trophée + ambiance tech GEO
 * Format Open Graph 1200x630
 */

import puppeteer from 'puppeteer';

const HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Première au Concours GEO 2026 - IndHack</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1200px;
  height: 630px;
  font-family: 'Inter', sans-serif;
  background: #1a2520;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Background tech : grid + glow */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(143, 191, 170, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(143, 191, 170, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
}

.glow-1 {
  position: absolute;
  top: -150px;
  right: -150px;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(212, 168, 83, 0.25) 0%, transparent 60%);
  z-index: 1;
}

.glow-2 {
  position: absolute;
  bottom: -200px;
  left: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(46, 94, 78, 0.6) 0%, transparent 60%);
  z-index: 1;
}

/* Lignes de circuit */
.circuit-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(143, 191, 170, 0.4), transparent);
  height: 1px;
  z-index: 2;
}

.circuit-1 { top: 18%; left: 0; width: 30%; }
.circuit-2 { top: 85%; right: 0; width: 35%; }

/* Container principal */
.container {
  position: relative;
  z-index: 10;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 460px;
  padding: 50px 60px;
  gap: 40px;
}

/* Côté gauche : texte */
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #8FBFAA;
  margin-bottom: 18px;
}

.brand-tag::before {
  content: "";
  width: 24px;
  height: 1px;
  background: #8FBFAA;
}

.terminal-prompt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #D4A853;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 62px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  color: #ffffff;
  margin-bottom: 6px;
}

.title-em {
  display: block;
  font-size: 32px;
  font-weight: 500;
  margin-top: 8px;
  color: #8FBFAA;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.subtitle {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 20px;
  max-width: 420px;
}

/* Badges IA */
.ia-badges {
  display: flex;
  gap: 8px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.ia-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(143, 191, 170, 0.1);
  border: 1px solid rgba(143, 191, 170, 0.3);
  padding: 5px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.3px;
}

.ia-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8FBFAA;
  box-shadow: 0 0 8px #8FBFAA;
}

/* Côté droit : trophée */
.right {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trophy-glow {
  position: absolute;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(212, 168, 83, 0.5) 0%, rgba(212, 168, 83, 0.1) 40%, transparent 70%);
  filter: blur(20px);
  z-index: 1;
}

.trophy-container {
  position: relative;
  z-index: 2;
}

.trophy {
  width: 280px;
  height: 320px;
}

/* Stats flottants autour du trophée */
.stat-bubble {
  position: absolute;
  background: rgba(26, 37, 32, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 168, 83, 0.5);
  border-radius: 12px;
  padding: 10px 14px;
  z-index: 5;
  font-family: 'Space Grotesk', sans-serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.stat-bubble-num {
  font-size: 22px;
  font-weight: 700;
  color: #D4A853;
  line-height: 1;
  display: block;
  margin-bottom: 2px;
}

.stat-bubble-lbl {
  font-size: 9px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.stat-1 { top: 35px; left: -10px; }
.stat-2 { top: 100px; right: -20px; }
.stat-3 { bottom: 95px; left: -10px; }
.stat-4 { bottom: 30px; right: -20px; }

/* Footer */
.footer {
  position: absolute;
  bottom: 28px;
  left: 60px;
  right: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
}

.footer-author {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0;
}

.footer-domain { color: #8FBFAA; }

/* Particles */
.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #D4A853;
  border-radius: 50%;
  box-shadow: 0 0 10px #D4A853;
  z-index: 3;
}
.p-1 { top: 25%; left: 8%; }
.p-2 { top: 65%; left: 15%; }
.p-3 { top: 30%; right: 45%; }
.p-4 { bottom: 25%; left: 30%; opacity: 0.6; }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="circuit-line circuit-1"></div>
  <div class="circuit-line circuit-2"></div>

  <div class="particle p-1"></div>
  <div class="particle p-2"></div>
  <div class="particle p-3"></div>
  <div class="particle p-4"></div>

  <div class="container">
    <div class="left">
      <div class="brand-tag">IndHack · Generative Engine Optimization</div>
      <div class="terminal-prompt">$ rank --concours-geo-greenred-2026 --result</div>
      <h1 class="title">
        Première
        <span class="title-em">au premier Concours GEO de France</span>
      </h1>
      <p class="subtitle">
        139 citations IA cumulées sur ChatGPT, Claude, Gemini, Perplexity et Mistral. Avec un domaine de trois mois, sans black hat.
      </p>

      <div class="ia-badges">
        <span class="ia-badge"><span class="ia-dot"></span>ChatGPT</span>
        <span class="ia-badge"><span class="ia-dot"></span>Claude</span>
        <span class="ia-badge"><span class="ia-dot"></span>Mistral</span>
        <span class="ia-badge"><span class="ia-dot"></span>Perplexity</span>
        <span class="ia-badge"><span class="ia-dot"></span>Gemini</span>
      </div>
    </div>

    <div class="right">
      <div class="trophy-glow"></div>
      <div class="trophy-container">
        <svg class="trophy" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
          <!-- Définitions -->
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#F4D17A"/>
              <stop offset="35%" stop-color="#D4A853"/>
              <stop offset="65%" stop-color="#B8842D"/>
              <stop offset="100%" stop-color="#8B6420"/>
            </linearGradient>
            <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F8E090"/>
              <stop offset="50%" stop-color="#D4A853"/>
              <stop offset="100%" stop-color="#9B7530"/>
            </linearGradient>
            <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3A3025"/>
              <stop offset="100%" stop-color="#1A1410"/>
            </linearGradient>
          </defs>

          <!-- Anses du trophée (gauche) -->
          <path d="M 40 70 Q 15 75 15 110 Q 15 140 40 145 L 40 130 Q 30 128 30 110 Q 30 85 40 85 Z"
                fill="url(#goldGrad)" stroke="#8B6420" stroke-width="1"/>
          <!-- Anses du trophée (droite) -->
          <path d="M 160 70 Q 185 75 185 110 Q 185 140 160 145 L 160 130 Q 170 128 170 110 Q 170 85 160 85 Z"
                fill="url(#goldGrad)" stroke="#8B6420" stroke-width="1"/>

          <!-- Coupe principale -->
          <path d="M 40 60 L 40 130 Q 40 165 70 175 L 130 175 Q 160 165 160 130 L 160 60 Z"
                fill="url(#goldGradLight)" stroke="#8B6420" stroke-width="1.5"/>

          <!-- Reflet sur la coupe -->
          <path d="M 50 70 L 50 125 Q 50 145 65 152 L 65 75 Z"
                fill="rgba(255, 255, 255, 0.25)"/>

          <!-- Ouverture rebord -->
          <ellipse cx="100" cy="60" rx="60" ry="8" fill="url(#goldGrad)" stroke="#8B6420" stroke-width="1"/>
          <ellipse cx="100" cy="60" rx="56" ry="5" fill="#1a2520"/>

          <!-- "1" gravé -->
          <text x="100" y="125" text-anchor="middle" font-family="Space Grotesk, sans-serif"
                font-size="54" font-weight="700" fill="#1a2520" letter-spacing="-2">1</text>

          <!-- Pied du trophée (tige) -->
          <rect x="92" y="175" width="16" height="20" fill="url(#goldGrad)" stroke="#8B6420" stroke-width="1"/>

          <!-- Base du trophée -->
          <rect x="60" y="195" width="80" height="14" rx="2" fill="url(#baseGrad)" stroke="#000" stroke-width="0.5"/>
          <rect x="55" y="209" width="90" height="20" rx="3" fill="url(#baseGrad)" stroke="#000" stroke-width="0.5"/>

          <!-- Plaque dorée sur la base -->
          <rect x="68" y="214" width="64" height="10" rx="1" fill="url(#goldGrad)" stroke="#8B6420" stroke-width="0.5"/>
          <text x="100" y="221" text-anchor="middle" font-family="JetBrains Mono, monospace"
                font-size="6" font-weight="700" fill="#1a1410" letter-spacing="0.5">GEO 2026</text>

          <!-- Étoiles décoratives -->
          <g fill="#F4D17A" opacity="0.9">
            <circle cx="100" cy="85" r="3"/>
            <circle cx="100" cy="85" r="1.5" fill="#FFFFFF"/>
          </g>
        </svg>
      </div>

      <!-- Stats flottants -->
      <div class="stat-bubble stat-1">
        <span class="stat-bubble-num">139</span>
        <span class="stat-bubble-lbl">Mentions</span>
      </div>
      <div class="stat-bubble stat-2">
        <span class="stat-bubble-num">154</span>
        <span class="stat-bubble-lbl">Pic 15 avr.</span>
      </div>
      <div class="stat-bubble stat-3">
        <span class="stat-bubble-num">5 IA</span>
        <span class="stat-bubble-lbl">ChatGPT à Mistral</span>
      </div>
      <div class="stat-bubble stat-4">
        <span class="stat-bubble-num">3 mois</span>
        <span class="stat-bubble-lbl">Âge domaine</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>
      <span class="footer-author">Indiana Aflalo</span>
      <span> · indhack.com</span>
    </div>
    <div>EDITION 01 · AVRIL 2026</div>
  </div>
</body>
</html>`;

const OUTPUT_JPG = '/Users/indiana/Desktop/indhack.Com/public/images/blog/concours-geo-greenred-2026-premiere-place.jpg';

console.log('🏆 Génération hero blog (tech + trophée)...');

const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.setContent(HTML, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({
        path: OUTPUT_JPG,
        type: 'jpeg',
        quality: 92,
        clip: { x: 0, y: 0, width: 1200, height: 630 },
    });

    console.log(`✅ Image générée : ${OUTPUT_JPG}`);
} finally {
    await browser.close();
}
