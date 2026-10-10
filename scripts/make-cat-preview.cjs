const sharp = require('sharp');
const path = require('path');

async function makePreview() {
  const width = 800;
  const height = 800;
  
  // Create an elegant rich burgundy background with subtle radial gradient
  const bgSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#661722" />
          <stop offset="55%" stop-color="#4a1017" />
          <stop offset="100%" stop-color="#240306" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
    </svg>
  `);
  
  const bg = await sharp(bgSvg).png().toBuffer();
  
  // Resize the cat so it fits with balanced margins
  const catResized = await sharp(path.join(__dirname, '../public/images/cat.jpg'))
    .resize(640, 670, { fit: 'inside' })
    .toBuffer();
    
  // Composite cat onto burgundy background
  const outputPath = path.join(__dirname, '../public/images/cat-preview.jpg');
  await sharp(bg)
    .composite([
      { input: catResized, gravity: 'center' }
    ])
    .jpeg({ quality: 96 })
    .toFile(outputPath);
    
  console.log('cat-preview.jpg created successfully at:', outputPath);
}

makePreview().catch(console.error);
