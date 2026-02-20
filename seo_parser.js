const fs = require('fs');
const path = require('path');
const glob = require('glob'); // npm i glob might be needed or write recursive readdir

const files = [];
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.next')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('page.tsx') || dirFile.endsWith('page.jsx') || dirFile.endsWith('.md') || dirFile.endsWith('.mdx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const appDir = path.join(process.cwd(), 'app');
const blogDir = path.join(process.cwd(), 'content/blog');
const allFiles = [...walkSync(appDir), ...walkSync(blogDir)];

const results = [];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let url = file.replace(process.cwd(), '');
  url = url.replace('/app', '').replace('/content/blog', '/blog').replace('/page.tsx', '').replace('.mdx', '').replace('.md', '');
  if (url === '') url = '/';

  let title = '';
  let desc = '';
  let h1 = '';

  // Extract Title
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) title = titleMatch[1];
    
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    if (descMatch) desc = descMatch[1];
    
    // H1 like # Title or h1 in mdx
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) h1 = h1Match[1];
  } else {
    // page.tsx
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) title = titleMatch[1];
    else {
      // try <title>
      const titleTag = content.match(/<title>([^<]+)<\/title>/i);
      if (titleTag) title = titleTag[1];
    }
    
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    if (descMatch) desc = descMatch[1];
    else {
      const descTag = content.match(/name="description"\s+content=["']([^"']+)["']/i);
      if (descTag) desc = descTag[1];
    }

    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) h1 = h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  }

  results.push({ url, title, titleLen: title.length, descLen: desc.length, h1, diff: title !== h1 });
});

fs.writeFileSync('seo_report.json', JSON.stringify(results, null, 2));
console.log('Saved to seo_report.json. Processed ' + results.length + ' files.');
