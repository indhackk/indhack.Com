#!/usr/bin/env node
/**
 * Génère le PDF du livre blanc GEO 2026 à partir de la page /livre-blanc-geo-2026
 * Sortie : /Users/indiana/Desktop/Livre-blanc-GEO-2026-indhack.pdf
 *
 * Approche en 2 passes pour masquer header/footer puppeteer sur la couverture :
 *   1. PDF page 1 uniquement (la cover, sans header/footer)
 *   2. PDF pages 2 à N (contenu, avec header/footer paginé)
 *   3. Merge des 2 PDFs
 *
 * Pré requis : le serveur Next.js doit tourner sur http://localhost:3099
 */

import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { writeFile, readFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';

const URL = process.env.LIVRE_BLANC_URL || 'http://localhost:3099/livre-blanc-geo-2026';
const OUTPUT_PATH = process.env.OUTPUT_PATH || '/Users/indiana/Desktop/Livre-blanc-GEO-2026-indhack.pdf';
const TMP_COVER = '/tmp/livre-blanc-cover.pdf';
const TMP_BODY = '/tmp/livre-blanc-body.pdf';

console.log('\n📚 Génération PDF livre blanc GEO 2026\n');
console.log(`   URL source : ${URL}`);
console.log(`   Destination : ${OUTPUT_PATH}\n`);

const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800, deviceScaleFactor: 2 });

    console.log('⏳ Chargement de la page...');
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 120000 });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 1500));
    await page.emulateMediaType('print');

    // ════════════════════════════════════════════════════════════
    // PASSE 1 : génère le PDF COMPLET (52 pages avec header/footer)
    // On récupérera la première page (cover) sans header/footer en
    // utilisant un second PDF généré sans header.
    // ════════════════════════════════════════════════════════════
    console.log('🖨️  Génération PDF complet (body)...');

    const headerTemplate = `
        <div style="width: 100%; font-size: 8pt; color: #6b7280; padding: 0 18mm; font-family: 'Helvetica', sans-serif; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #2E5E4E; font-weight: 600;">Livre blanc GEO 2026 · Indiana Aflalo</span>
            <span style="font-style: italic;">indhack.com</span>
        </div>
    `;

    const footerTemplate = `
        <div style="width: 100%; font-size: 8pt; color: #6b7280; padding: 0 18mm; font-family: 'Helvetica', sans-serif; display: flex; justify-content: space-between; align-items: center;">
            <span>© 2026 Laboratoire IndHack · CC BY 4.0</span>
            <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>
    `;

    await page.pdf({
        path: TMP_BODY,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate,
        margin: { top: '22mm', bottom: '20mm', left: '18mm', right: '18mm' },
    });

    // ════════════════════════════════════════════════════════════
    // PASSE 2 : génère la COVER seule, sans header/footer
    // ════════════════════════════════════════════════════════════
    console.log('🖨️  Génération couverture (sans pagination)...');

    await page.pdf({
        path: TMP_COVER,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
        pageRanges: '1',
    });

    // ════════════════════════════════════════════════════════════
    // PASSE 3 : merge les deux PDFs
    // ════════════════════════════════════════════════════════════
    console.log('📎 Assemblage final...');

    const coverBytes = await readFile(TMP_COVER);
    const bodyBytes = await readFile(TMP_BODY);

    const coverDoc = await PDFDocument.load(coverBytes);
    const bodyDoc = await PDFDocument.load(bodyBytes);

    const finalDoc = await PDFDocument.create();
    finalDoc.setTitle('Livre blanc GEO 2026');
    finalDoc.setAuthor('Indiana Aflalo');
    finalDoc.setSubject('Retour d\'expérience de la gagnante du Concours GEO GreenRed 2026');
    finalDoc.setKeywords(['GEO', 'Generative Engine Optimization', 'Concours GEO GreenRed 2026', 'IndHack', 'Indiana Aflalo']);
    finalDoc.setProducer('IndHack Laboratoire GEO');
    finalDoc.setCreator('Indiana Aflalo · indhack.com');
    finalDoc.setCreationDate(new Date('2026-04-24'));
    finalDoc.setModificationDate(new Date('2026-04-24'));

    // Ajoute la cover (page 1) sans header/footer
    const [coverPage] = await finalDoc.copyPages(coverDoc, [0]);
    finalDoc.addPage(coverPage);

    // Ajoute les pages 2 à N du body (skip page 1 car redondante avec cover)
    const bodyPageIndices = bodyDoc.getPages().map((_, i) => i).slice(1);
    const bodyPages = await finalDoc.copyPages(bodyDoc, bodyPageIndices);
    bodyPages.forEach(p => finalDoc.addPage(p));

    const finalBytes = await finalDoc.save();
    await writeFile(OUTPUT_PATH, finalBytes);

    // Nettoyage
    await unlink(TMP_COVER).catch(() => { });
    await unlink(TMP_BODY).catch(() => { });

    if (existsSync(OUTPUT_PATH)) {
        console.log(`\n✅ PDF généré avec succès`);
        console.log(`   📄 ${OUTPUT_PATH}`);
        console.log(`   📊 ${finalDoc.getPageCount()} pages\n`);
    } else {
        throw new Error('PDF non créé malgré succès apparent');
    }
} catch (err) {
    console.error('\n❌ Erreur de génération PDF :', err.message);
    console.error(err.stack);
    process.exit(1);
} finally {
    await browser.close();
}
