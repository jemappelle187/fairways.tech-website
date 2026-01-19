/**
 * Generate favicons from the new system icon SVG
 * Requires sharp: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceIcon = path.join(__dirname, '../public/images/logo/system/fairways-system-icon.svg');
const outputDir = path.join(__dirname, '../public/images/favicons');

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from new system icon...\n');
  
  // Check if source exists
  if (!fs.existsSync(sourceIcon)) {
    console.error('❌ Source icon not found:', sourceIcon);
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Generate each size
    for (const { name, size } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (32x32)
    const faviconPath = path.join(outputDir, 'favicon.ico');
    await sharp(sourceIcon)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(faviconPath);
    
    console.log(`✅ Generated favicon.ico (32x32)`);

    // Copy to public root
    const rootFaviconIco = path.join(__dirname, '../public/favicon.ico');
    const rootFaviconSvg = path.join(__dirname, '../public/favicon.svg');
    
    fs.copyFileSync(faviconPath, rootFaviconIco);
    console.log(`✅ Copied favicon.ico to public root`);
    
    fs.copyFileSync(sourceIcon, rootFaviconSvg);
    console.log(`✅ Copied favicon.svg to public root`);

    console.log('\n🎉 All favicons generated successfully!');
    console.log('\n📝 Generated files:');
    console.log('  - public/images/favicons/favicon-16x16.png');
    console.log('  - public/images/favicons/favicon-32x32.png');
    console.log('  - public/images/favicons/favicon-192x192.png');
    console.log('  - public/images/favicons/favicon-512x512.png');
    console.log('  - public/images/favicons/android-chrome-192x192.png');
    console.log('  - public/images/favicons/android-chrome-512x512.png');
    console.log('  - public/images/favicons/apple-touch-icon.png');
    console.log('  - public/images/favicons/favicon.ico');
    console.log('  - public/favicon.ico');
    console.log('  - public/favicon.svg');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
