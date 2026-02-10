
const fs = require('fs');
const path = require('path');

const BLOG_DIR = './content/blog';
const IMAGES_DIR = './public/images/blog';

function getFrontMatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    const frontmatter = {};
    const lines = match[1].split('\n');
    for (const line of lines) {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            frontmatter[key] = value;
        }
    }
    return frontmatter;
}

if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`Creating images directory: ${IMAGES_DIR}`);
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const files = fs.readdirSync(BLOG_DIR);
const missingImages = [];

files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const fm = getFrontMatter(content);

    // Check if image field exists
    if (!fm.image) {
        missingImages.push({
            file: file,
            title: fm.title || file.replace('.md', ''),
            reason: 'No image field',
            suggestedPath: `/images/blog/${file.replace('.md', '.jpg')}`
        });
    } else {
        // Check if image file exists
        const imagePath = path.join('./public', fm.image);
        if (!fs.existsSync(imagePath)) {
            missingImages.push({
                file: file,
                title: fm.title,
                reason: 'Image file missing',
                imagePath: fm.image,
                suggestedPath: fm.image
            });
        }
    }
});

console.log(JSON.stringify(missingImages, null, 2));
