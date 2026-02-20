const fs = require('fs');
const data = require('./seo_report.json');

let md = '| URL | Title (nb car.) | Meta Desc (nb car.) | H1 | Title ≠ H1 ? | Problème ? |\n';
md += '|---|---|---|---|---|---|\n';

const titles = new Set();
const descs = new Set();
const dupTitles = new Set();
const dupDescs = new Set();

data.forEach(p => {
  if (p.title && titles.has(p.title)) dupTitles.add(p.title);
  if (p.desc && descs.has(p.desc)) dupDescs.add(p.desc);
  titles.add(p.title);
  descs.add(p.desc);
});

data.forEach(p => {
  let notes = [];
  if (!p.title) notes.push('Title manquant');
  else if (p.title.length > 61) notes.push(`Title trop long (${p.title.length})`); // Using 60 as per prompt, giving 1 char tolerance
  if (dupTitles.has(p.title) && p.title) notes.push('Title dupliqué');

  if (!p.desc) notes.push('Desc manquante');
  else if (p.desc.length > 165) notes.push(`Desc trop longue (${p.desc.length})`);
  if (dupDescs.has(p.desc) && p.desc) notes.push('Desc dupliquée');

  if (!p.h1) notes.push('H1 manquant');
  
  if (p.title && p.h1 && p.title.toLowerCase().trim() === p.h1.toLowerCase().trim()) {
      // notes.push('Title == H1 (optimisation possible)');
  }
  
  const prob = notes.length > 0 ? "🔴 " + notes.join(', ') : "✅ OK";
  const titleDiffH1 = (p.title !== p.h1) ? "Oui" : "Non";
  
  md += `| ${p.url} | ${p.title ? `"${p.title.replace(/\|/g, '-')}" (${p.title.length})` : 'Aucun'} | ${p.desc ? `"${p.desc.replace(/\|/g, '-')}" (${p.desc.length})` : 'Aucune'} | ${p.h1 ? `"${p.h1.replace(/\|/g, '-')}"` : 'Aucun'} | ${titleDiffH1} | ${prob} |\n`;
});

fs.writeFileSync('seo_table.md', md);
console.log('Saved to seo_table.md');
