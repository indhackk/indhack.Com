import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'public', 'images', 'blog', 'geo-chatgpt-2026.jpg');

// Create the image with SVG
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#6d28d9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4c1d95;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:0" />
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="80" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>

  <!-- Glow effects -->
  <circle cx="200" cy="150" r="300" fill="#a78bfa" opacity="0.15" filter="url(#blur)"/>
  <circle cx="1000" cy="500" r="250" fill="#8b5cf6" opacity="0.2" filter="url(#blur)"/>

  <!-- Grid pattern -->
  <g opacity="0.1">
    ${Array.from({length: 50}, (_, i) => `<line x1="${i * 30}" y1="0" x2="${i * 30}" y2="${height}" stroke="white" stroke-width="0.5"/>`).join('')}
    ${Array.from({length: 25}, (_, i) => `<line x1="0" y1="${i * 30}" x2="${width}" y2="${i * 30}" stroke="white" stroke-width="0.5"/>`).join('')}
  </g>

  <!-- Floating elements - AI nodes -->
  <g opacity="0.6">
    <circle cx="150" cy="200" r="8" fill="white"/>
    <circle cx="300" cy="100" r="5" fill="white"/>
    <circle cx="1050" cy="150" r="6" fill="white"/>
    <circle cx="950" cy="450" r="7" fill="white"/>
    <circle cx="100" cy="500" r="5" fill="white"/>
    <line x1="150" y1="200" x2="300" y2="100" stroke="white" stroke-width="1" opacity="0.3"/>
    <line x1="300" y1="100" x2="1050" y2="150" stroke="white" stroke-width="1" opacity="0.3"/>
  </g>

  <!-- Main content area -->
  <rect x="100" y="180" width="1000" height="280" rx="20" fill="white" opacity="0.1"/>

  <!-- Robot/AI Icon -->
  <g transform="translate(180, 260)">
    <!-- Bot head -->
    <rect x="0" y="20" width="80" height="70" rx="15" fill="white"/>
    <!-- Bot antenna -->
    <circle cx="40" cy="10" r="8" fill="#a78bfa"/>
    <rect x="37" y="10" width="6" height="15" fill="white"/>
    <!-- Bot eyes -->
    <circle cx="25" cy="50" r="10" fill="#7c3aed"/>
    <circle cx="55" cy="50" r="10" fill="#7c3aed"/>
    <circle cx="28" cy="48" r="4" fill="white"/>
    <circle cx="58" cy="48" r="4" fill="white"/>
    <!-- Bot mouth -->
    <rect x="20" y="70" width="40" height="6" rx="3" fill="#7c3aed"/>
  </g>

  <!-- Main title -->
  <text x="300" y="300" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="white">GEO 2026</text>

  <!-- Subtitle -->
  <text x="300" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="white" opacity="0.9">Generative Engine Optimization</text>

  <!-- Description -->
  <text x="300" y="410" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="white" opacity="0.7">Comment apparaître dans ChatGPT, Perplexity et Google AI</text>

  <!-- Brand badges -->
  <g transform="translate(300, 440)">
    <rect x="0" y="0" width="100" height="32" rx="16" fill="white" opacity="0.2"/>
    <text x="50" y="22" font-family="system-ui, sans-serif" font-size="14" fill="white" text-anchor="middle">ChatGPT</text>

    <rect x="115" y="0" width="100" height="32" rx="16" fill="white" opacity="0.2"/>
    <text x="165" y="22" font-family="system-ui, sans-serif" font-size="14" fill="white" text-anchor="middle">Perplexity</text>

    <rect x="230" y="0" width="100" height="32" rx="16" fill="white" opacity="0.2"/>
    <text x="280" y="22" font-family="system-ui, sans-serif" font-size="14" fill="white" text-anchor="middle">Claude</text>

    <rect x="345" y="0" width="100" height="32" rx="16" fill="white" opacity="0.2"/>
    <text x="395" y="22" font-family="system-ui, sans-serif" font-size="14" fill="white" text-anchor="middle">Gemini</text>
  </g>

  <!-- IndHack branding -->
  <g transform="translate(1000, 560)">
    <rect x="0" y="0" width="140" height="40" rx="20" fill="white" opacity="0.15"/>
    <text x="70" y="27" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">IndHack.com</text>
  </g>

  <!-- Decorative corner elements -->
  <path d="M0,0 L80,0 L80,10 L10,10 L10,80 L0,80 Z" fill="white" opacity="0.1"/>
  <path d="M1200,630 L1120,630 L1120,620 L1190,620 L1190,550 L1200,550 Z" fill="white" opacity="0.1"/>
</svg>
`;

async function generateImage() {
  try {
    // Create image from SVG
    const image = sharp(Buffer.from(svg))
      .jpeg({
        quality: 90,
        mozjpeg: true,
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: 'IndHack - Indiana Aflalo 2026',
            Artist: 'Indiana Aflalo',
            ImageDescription: 'GEO Generative Engine Optimization - Comment apparaitre dans ChatGPT Perplexity et Google AI en 2026 - Guide SEO IA',
            Software: 'IndHack SEO Tools',
            Make: 'IndHack',
            Model: 'Blog Article Cover',
          },
          IFD2: {
            UserComment: 'GEO SEO ChatGPT Perplexity Claude Gemini visibilite IA referencement crawlers GPTBot'
          }
        },
        iptc: {
          'Caption': 'GEO 2026 : Comment Rendre Votre Site Visible dans ChatGPT, Perplexity et Google AI',
          'Keywords': ['GEO', 'SEO', 'ChatGPT', 'Perplexity', 'Google AI', 'visibilite IA', 'referencement', 'crawlers IA', 'GPTBot'],
          'Credit': 'IndHack - Indiana Aflalo',
          'Byline': 'Indiana Aflalo',
          'CopyrightNotice': '© 2026 IndHack. Tous droits reserves.',
          'Source': 'https://indhack.com',
        }
      });

    await image.toFile(outputPath);
    console.log(`Image created successfully at: ${outputPath}`);

    // Get image info
    const info = await sharp(outputPath).metadata();
    console.log(`Image dimensions: ${info.width}x${info.height}`);
    console.log(`Format: ${info.format}`);

  } catch (error) {
    console.error('Error creating image:', error);
    process.exit(1);
  }
}

generateImage();
