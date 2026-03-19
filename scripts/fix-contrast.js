const fs = require('fs');
const path = require('path');

function scanDir(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git')) {
            results = results.concat(scanDir(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            results.push(fullPath);
        }
    }
    return results;
}

const files = scanDir(path.join(process.cwd(), 'app/outils'))
    .concat(scanDir(path.join(process.cwd(), 'app/rapport')))
    .concat(scanDir(path.join(process.cwd(), 'app/etude')));

let replaceCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Check occurrences of bg-sauge/[0-9]+ and text-sauge in className
    // e.g., bg-sauge/10 text-sauge -> text-white
    const regex = /(bg-sauge\/\d+\s+[^"']*?|text-sauge\s+[^"']*?)text-sauge([^"']*?bg-sauge\/\d+)?/g;
    
    // Simpler: Just replace `text-sauge` with `text-white` in tool pages because they are mostly dark mode.
    // Wait, let's just make it precise for the occurrences found earlier.
    const occurrences = [
        'bg-sauge/20 text-sauge',
        'text-sauge bg-sauge/10',
        'bg-sauge/10 text-sauge',
        'text-sauge hover:text-sauge', // sometimes it's like hover:text-white
        'hover:text-sauge',
        'color: "text-sauge"'
    ];

    if (file.includes('RapportClient.tsx')) {
        content = content.replace('color: "text-sauge"', 'color: "text-white"');
        changed = true;
    }

    if (file.includes('SchemaGenerator.tsx')) {
        content = content.replace(/text-sauge/g, 'text-white');
        changed = true;
    }

    if (file.includes('BarometreClientContent.tsx')) {
        content = content.replace(/text-sauge bg-sauge\/10/g, 'text-sauge-light bg-sauge/10');
        changed = true;
    }

    // Tools pages generally should use text-sauge-light or text-white 
    // instead of text-sauge when backgrounds are dark (bg-sauge/x)
    if (content.includes('bg-sauge/10 text-sauge')) {
        content = content.replace(/bg-sauge\/10 text-sauge/g, 'bg-sauge/10 text-white');
        changed = true;
    }
    if (content.includes('bg-sauge/20 text-sauge')) {
        content = content.replace(/bg-sauge\/20 text-sauge/g, 'bg-sauge/20 text-white');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        replaceCount++;
    }
});

console.log(`Replaced in ${replaceCount} files.`);
