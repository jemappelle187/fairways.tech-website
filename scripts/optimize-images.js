const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to optimize
const imagesToOptimize = [
  {
    input: 'public/images/farmer_holds_vegetables.png',
    output: 'public/images/farmer_holds_vegetables.webp',
    maxWidth: 1920, // Max width for background images
    quality: 85
  },
  {
    input: 'public/images/farmer_hold_crop.png',
    output: 'public/images/farmer_hold_crop.webp',
    maxWidth: 1920,
    quality: 85
  },
  {
    input: 'public/images/leaf_background.png',
    output: 'public/images/leaf_background.webp',
    maxWidth: 1920,
    quality: 85
  }
];

async function optimizeImage({ input, output, maxWidth, quality }) {
  try {
    const inputPath = path.join(process.cwd(), input);
    const outputPath = path.join(process.cwd(), output);

    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Input file not found: ${input}`);
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

    console.log(`\n🔄 Optimizing: ${input}`);
    console.log(`   Original size: ${originalSizeMB} MB`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Resize if needed (maintain aspect ratio)
    let resizeOptions = null;
    if (metadata.width > maxWidth) {
      resizeOptions = { width: maxWidth, withoutEnlargement: true };
    }

    // Optimize and convert to WebP
    const pipeline = sharp(inputPath);
    if (resizeOptions) {
      pipeline.resize(resizeOptions);
    }
    
    await pipeline
      .webp({ 
        quality: quality,
        effort: 6 // Higher effort = better compression (0-6)
      })
      .toFile(outputPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSizeMB = (optimizedStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    const savedMB = ((originalStats.size - optimizedStats.size) / (1024 * 1024)).toFixed(2);
    console.log(`   ✅ Optimized size: ${optimizedSizeMB} MB`);
    console.log(`   📉 Reduction: ${reduction}%`);
    console.log(`   💾 Saved: ${savedMB} MB`);

  } catch (error) {
    console.error(`❌ Error optimizing ${input}:`, error.message);
  }
}

async function optimizeAll() {
  console.log('🚀 Starting image optimization...\n');
  
  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log('\n✨ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update code to use .webp versions');
  console.log('   2. Test the optimized images');
  console.log('   3. Consider removing original PNG files if WebP works well');
}

optimizeAll().catch(console.error);
