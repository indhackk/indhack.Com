const fs = require('fs');
const path = require('path');
const glob = require('glob');

function scanDir(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git')) {
            results = results.concat(scanDir(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Look for className containing both bg-sauge and text-sauge
            const matches = content.match(/className="[^"]*?(?:bg-sauge(?:\/\d+)?(?:[^"]*?)text-sauge|text-sauge(?:[^"]*?)bg-sauge(?:\/\d+)?)[^"]*?"/g);
            if (matches) {
                results.push({
                    file: fullPath,
                    matches: [...new Set(matches)]
                });
            }
        }
    }
    return results;
}

const res = scanDir(path.join(process.cwd(), 'app'));
const componentsRes = scanDir(path.join(process.cwd(), 'components'));
const all = [...res, ...componentsRes];

all.forEach(r => {
    console.log(`\n📄 ${r.file}`);
    r.matches.forEach(m => console.log('  ' + m));
});

// Auto-replace text-sauge with text-white in those exact string blocks
let replaceCount = 0;
all.forEach(r => {
    let content = fs.readFileSync(r.file, 'utf8');
    let changed = false;
    r.matches.forEach(m => {
        // Only if it has bg-sauge/ and is NOT hover:text-sauge unless we specify it
        // We replace text-sauge with text-white if it's text-sauge
        const newM = m.replace(/(\s|^|['"])text-sauge(\s|$|['"])/g, "$1text-white$2");
        if (newM !== m) {
            content = content.replace(m, newM);
            changed = true;
            replaceCount++;
        }
    });
    if (changed) {
        fs.writeFileSync(r.file, content);
    }
});
console.log(`\n✅ Replaced ${replaceCount} occurrences.`);
