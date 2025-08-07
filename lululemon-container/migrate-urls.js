/**
 * URL Migration Script for Lululemon Demo Site
 * Updates asset paths and SDK references in HTML files
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Starting URL migration for Lululemon demo site...');

// Files to migrate
const filesToMigrate = [
    'public/lululemon-cart.html',
    'public/lululemon-cart-crossdomain.html'
];

// URL replacements
const replacements = [
    // Fix image paths
    {
        from: /lululemon-checkout\/public\//g,
        to: '',
        description: 'Fix image paths'
    },
    {
        from: /src="lulu-/g,
        to: 'src="images/lulu-',
        description: 'Fix lulu image paths'
    },
    {
        from: /src="blue-lululemon-/g,
        to: 'src="images/blue-lululemon-',
        description: 'Fix blue lululemon image paths'
    },
    // Update SDK reference to use unified SDK from commerce platform
    {
        from: /<script src="http:\/\/localhost:3003\/assets\/fairs-sdk-enhanced\.js"/g,
        to: '<script src="http://localhost:3000/fairs-sdk-unified.js" data-merchant="lululemon"',
        description: 'Update SDK reference'
    },
    // Add SDK for pages without it (but check if it already exists)
    {
        from: /<\/body>/g,
        to: (match, offset, string) => {
            // Check if SDK is already present
            if (string.includes('fairs-sdk-unified.js')) {
                return match; // Don't add if already exists
            }
            return `    <!-- Fairs SDK -->
    <script src="http://localhost:3000/fairs-sdk-unified.js" data-merchant="lululemon"></script>
</body>`;
        },
        description: 'Add SDK before closing body tag'
    },
    // Fix logo path (but don't double up if already has images/)
    {
        from: /(?<!images\/)lululemon-logo\.png/g,
        to: 'images/lululemon-logo.png',
        description: 'Fix logo path'
    },
    // Update merchant ID references
    {
        from: /merchant['"]\s*:\s*['"]test-merchant['"]/g,
        to: 'merchant: "lululemon"',
        description: 'Update merchant ID'
    },
    {
        from: /merchantId['"]\s*:\s*['"]test-merchant['"]/g,
        to: 'merchantId: "lululemon"',
        description: 'Update merchantId'
    }
];

// Process each file
filesToMigrate.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return;
    }
    
    console.log(`📄 Processing: ${filePath}`);
    let content = fs.readFileSync(fullPath, 'utf8');
    let changesMade = false;
    
    replacements.forEach(replacement => {
        const matches = content.match(replacement.from);
        if (matches) {
            if (typeof replacement.to === 'function') {
                content = content.replace(replacement.from, replacement.to);
            } else {
                content = content.replace(replacement.from, replacement.to);
            }
            console.log(`   ✓ ${replacement.description} (${matches ? matches.length : 1} replacements)`);
            changesMade = true;
        }
    });
    
    // Special handling for the regular cart page
    if (filePath.includes('lululemon-cart.html') && !filePath.includes('crossdomain')) {
        // Check if FAIRS checkout button already exists
        const fairsCheckoutExists = content.includes('window.FairsSDK.modal.open');
        
        if (!fairsCheckoutExists) {
            // Update checkout button to use Fairs SDK
            const checkoutButtonRegex = /document\.querySelector\('\.bg-black'\)\.addEventListener\('click',[\s\S]*?\}\);/;
            if (content.match(checkoutButtonRegex)) {
            content = content.replace(checkoutButtonRegex, `document.querySelector('.bg-black').addEventListener('click', async () => {
            console.log('Initiating FAIRS checkout...');
            
            // Prepare cart data
            const cartData = {
                items: [
                    {
                        id: 'align-tank-top',
                        name: "lululemon Align™ Waist-Length Racerback Tank Top",
                        price: 58.00,
                        quantity: 1,
                        size: "0",
                        color: "Washed Denim",
                        sku: 'LW1CTUS-048432'
                    },
                    {
                        id: 'wunder-under-tight',
                        name: "Wunder Under SmoothCover High-Rise Tight 25\\"",
                        price: 98.00,
                        quantity: 1,
                        size: "0",
                        color: "Washed Denim",
                        sku: 'LW5DQMS-048433'
                    }
                ],
                subtotal: 156.00,
                shipping: 0.00,
                tax: 0.00,
                total: 156.00,
                currency: 'USD'
            };
            
            // Store cart data for checkout
            if (window.FairsSDK && window.FairsSDK.cart) {
                window.FairsSDK.cart.set(cartData);
            }
            
            // Create checkout URL with merchant ID
            const checkoutUrl = 'http://localhost:3003/checkout?merchant=lululemon';
            
            // Open checkout in modal or redirect
            if (window.FairsSDK && window.FairsSDK.modal) {
                // Try to open in modal
                window.FairsSDK.modal.open(checkoutUrl, {
                    width: '100%',
                    height: '100%',
                    onClose: () => {
                        console.log('Checkout modal closed');
                    }
                });
            } else {
                // Fallback to redirect
                window.location.href = checkoutUrl;
            }
        });`);
                console.log('   ✓ Updated FAIRS checkout button');
                changesMade = true;
            }
        } else {
            console.log('   ℹ️  FAIRS checkout already configured');
        }
    }
    
    if (changesMade) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`   ✅ File updated successfully`);
    } else {
        console.log(`   ℹ️  No changes needed`);
    }
});

console.log('\n✅ URL migration completed!');
console.log('\nNext steps:');
console.log('1. Build the Docker container: docker-compose build');
console.log('2. Start the container: docker-compose up -d');
console.log('3. Access the site at: http://localhost:3009/');
console.log('4. Test cross-domain at: http://localhost:3009/crossdomain');