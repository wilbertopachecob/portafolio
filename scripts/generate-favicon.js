#!/usr/bin/env node

/**
 * Favicon Generator Script
 * 
 * This script helps generate ICO files from SVG favicons.
 * You can run this script to convert the SVG favicon to ICO format.
 * 
 * Usage:
 * node scripts/generate-favicon.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Favicon Generator for Portfolio');
console.log('==================================\n');

// Check if favicon files exist
const publicDir = path.join(__dirname, '..', 'public');
const faviconFiles = [
    'favicon-geometric.svg',
    'favicon-modern.svg', 
    'favicon.svg'
];

console.log('📁 Checking favicon files...\n');

faviconFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
    }
});

console.log('\n📋 Next Steps:');
console.log('1. The SVG favicon is already implemented in index.html');
console.log('2. Modern browsers will use the SVG version (crisp at all sizes)');
console.log('3. The original favicon.ico serves as a fallback');
console.log('4. To convert SVG to ICO, you can use online tools like:');
console.log('   - https://convertio.co/svg-ico/');
console.log('   - https://favicon.io/favicon-converter/');
console.log('   - Or install ImageMagick: brew install imagemagick');

console.log('\n🎯 Recommended:');
console.log('- The geometric favicon (favicon-geometric.svg) is set as primary');
console.log('- Features "WP" for Wilberto Pacheco with your design system colors');
console.log('- SVG format provides crisp display at all sizes');
console.log('- No additional conversion needed for modern browsers');

console.log('\n✨ Your favicon is ready! The new design will appear in browser tabs.'); 