const fs = require('fs');
const path = require('path');

// Function to update URLs in a file
function updateAssetUrls(filePath) {
    console.log(`📝 Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changes = 0;

    // Track all replacements
    const replacements = [
        // MAIN IMAGE PATH FIXES - Most important!
        { from: /\/lv-checkout\/public\//g, to: '/assets/images/', desc: 'LV checkout public paths' },
        
        // Additional image paths
        { from: /\/lv-checkout\/public\/images\//g, to: '/assets/images/', desc: 'LV checkout images' },
        { from: /images\//g, to: '/assets/images/', desc: 'Relative images' },
        { from: /\.\.\/images\//g, to: '/assets/images/', desc: 'Parent images' },
        
        // Font paths  
        { from: /\/lv-checkout\/public\/fonts\//g, to: '/assets/fonts/', desc: 'LV checkout fonts' },
        { from: /fonts\//g, to: '/assets/fonts/', desc: 'Relative fonts' },
        { from: /\.\.\/fonts\//g, to: '/assets/fonts/', desc: 'Parent fonts' },
        
        // Payment icons from shared assets
        { from: /\/shared-assets\/images\//g, to: '/assets/images/', desc: 'Shared payment icons' },
        
        // Fix routing - Proceed to Checkout should go to enhanced form
        { from: /window\.location\.href\s*=\s*['"]\/lv-checkout-form\.html['"];?/g, to: "window.location.href = '/lv-checkout-form-enhanced';", desc: 'Enhanced checkout routing' },
        { from: /window\.location\.href\s*=\s*['"]lv-checkout-form\.html['"];?/g, to: "window.location.href = '/lv-checkout-form-enhanced';", desc: 'Enhanced checkout routing (relative)' },
        
        // SDK references - point to main platform
        { from: /src=['"]\.\.\/shared-assets\/fairs-sdk\.js['"]/g, to: 'src="http://localhost:3000/assets/fairs-sdk.js"', desc: 'SDK reference' },
        { from: /src=['"]\/shared-assets\/fairs-sdk\.js['"]/g, to: 'src="http://localhost:3000/assets/fairs-sdk.js"', desc: 'SDK reference (absolute)' },
    ];

    // Apply all replacements
    replacements.forEach(({ from, to, desc }) => {
        const beforeCount = (content.match(from) || []).length;
        content = content.replace(from, to);
        const afterCount = (content.match(from) || []).length;
        const replaced = beforeCount - afterCount;
        
        if (replaced > 0) {
            console.log(`   ✅ ${desc}: ${replaced} replacements`);
            changes += replaced;
        }
    });

    // Write updated content back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`   📊 Total changes: ${changes}\n`);
    
    return changes;
}

// Main execution
console.log('🚀 Starting Louis Vuitton Asset URL Migration\n');

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

let totalChanges = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    totalChanges += updateAssetUrls(filePath);
});

console.log(`🎉 Migration Complete!`);
console.log(`📁 Files processed: ${htmlFiles.length}`);
console.log(`🔧 Total URL changes: ${totalChanges}`);
console.log(`\n🚀 Ready to start server with: npm start`); 