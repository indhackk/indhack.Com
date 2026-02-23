#!/usr/bin/env node
/**
 * Conversion SVG → WebP pour les images blog
 * Utilise sharp (déjà installé dans le projet)
 */

import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);
const imagesDir = join(projectRoot, 'public/images/blog');

const images = [
    {
        svg: 'definition-seo-guide-complet.svg',
        webp: 'definition-seo-guide-complet.webp',
        name: 'Article 1 - Définition SEO'
    },
    {
        svg: 'prix-creation-site-internet-2026.svg',
        webp: 'prix-creation-site-internet-2026.webp',
        name: 'Article 2 - Prix création site'
    }
];

async function convertSvgToWebp(svgPath, webpPath, name) {
    console.log(`\n📷 ${name}`);

    if (!existsSync(svgPath)) {
        console.log(`   ❌ SVG non trouvé: ${svgPath}`);
        return false;
    }

    try {
        const svgBuffer = readFileSync(svgPath);

        await sharp(svgBuffer, { density: 150 })
            .resize(1200, 630, { fit: 'fill' })
            .webp({ quality: 85 })
            .toFile(webpPath);

        console.log(`   ✅ Créé: ${webpPath.split('/').pop()}`);
        return true;
    } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log('  CONVERSION SVG → WebP (1200x630)');
    console.log('='.repeat(60));

    let success = 0;

    for (const img of images) {
        const svgPath = join(imagesDir, img.svg);
        const webpPath = join(imagesDir, img.webp);

        if (await convertSvgToWebp(svgPath, webpPath, img.name)) {
            success++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`  ✅ ${success}/${images.length} images converties`);
    console.log('='.repeat(60));

    console.log('\n📌 Prochaine étape (EXIF) - exécuter dans Terminal.app:');
    console.log('   brew install exiftool');
    console.log('   ./scripts/optimize-blog-images-exif.sh');
}

main().catch(console.error);
