const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3007;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes for each HTML page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Louis Vuitton Demo Site</title>
            <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; background: #f8f8f8; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #333; margin-bottom: 30px; font-weight: 300; }
                ul { list-style: none; padding: 0; }
                li { margin-bottom: 15px; }
                a { display: block; padding: 15px 20px; background: #000; color: white; text-decoration: none; border-radius: 4px; transition: background 0.3s; }
                a:hover { background: #333; }
                .description { color: #666; font-size: 14px; margin-bottom: 30px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Louis Vuitton Demo Site</h1>
                <p class="description">Containerized HTML demo pages with proper routing and asset management.</p>
                <ul>
                    <li><a href="/test-checkout">🛍️ Product Cart (Test Page)</a></li>
                    <li><a href="/lv-checkout-form-enhanced">💳 Enhanced Checkout Form</a></li>
                    <li><a href="/lv-checkout-form">📝 Standard Checkout Form</a></li>
                    <li><a href="/debug-checkout">🔍 Debug Checkout Modal</a></li>
                </ul>
            </div>
        </body>
        </html>
    `);
});

// 🎯 Primary route - Test page with cart (entry point)
app.get('/test-checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test-1-lv-checkout.html'));
});

// 🎯 Enhanced checkout form (where Proceed to Checkout should go)
app.get('/lv-checkout-form-enhanced', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lv-checkout-form-enhanced.html'));
});

// Standard checkout form
app.get('/lv-checkout-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lv-checkout-form.html'));
});

// Debug checkout modal page
app.get('/debug-checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'debug-checkout.html'));
});

// Legacy route support (for any old links)
app.get('/lv-checkout-form.html', (req, res) => {
    res.redirect('/lv-checkout-form-enhanced');
});

app.get('/lv-checkout-form-enhanced.html', (req, res) => {
    res.redirect('/lv-checkout-form-enhanced');
});

app.get('/test-1-lv-checkout.html', (req, res) => {
    res.redirect('/test-checkout');
});

// Louis Vuitton Promo Code Validation Endpoint
app.post('/fairs/promo-validate', (req, res) => {
    const { code, cartTotal, cartItems, cart_total } = req.body;
    
    // Handle both cartTotal and cart_total for compatibility
    const totalAmount = cartTotal || cart_total || 0;
    
    console.log(`[LV Site] 🎟️ Validating promo code: ${code}`);
    console.log(`[LV Site] 💰 Cart total: $${totalAmount}`);
    console.log(`[LV Site] 🛍️ Cart items: ${cartItems?.length || 0}`);
    
    // Louis Vuitton specific promo codes
    const promoCodes = {
        'LV20': {
            type: 'percentage',
            value: 20,
            description: '20% off your entire order',
            minOrder: 0,
            maxDiscount: 1000
        },
        'LUXURY50': {
            type: 'fixed',
            value: 50,
            description: '$50 off orders over $200',
            minOrder: 200,
            maxDiscount: 50
        },
        'FREESHIP': {
            type: 'shipping',
            value: 0,
            description: 'Free shipping on your order',
            minOrder: 0,
            maxDiscount: 25
        },
        'VIP100': {
            type: 'fixed',
            value: 100,
            description: '$100 off orders over $500',
            minOrder: 500,
            maxDiscount: 100
        }
    };
    
    const promoCode = promoCodes[code.toUpperCase()];
    
    if (!promoCode) {
        return res.json({
            valid: false,
            message: 'Invalid promo code'
        });
    }
    
    // Check minimum order requirement
    if (totalAmount < promoCode.minOrder) {
        return res.json({
            valid: false,
            message: `Minimum order of $${promoCode.minOrder} required for this promo code`
        });
    }
    
    // Calculate discount
    let discount = 0;
    let discountType = promoCode.type;
    
    if (promoCode.type === 'percentage') {
        discount = Math.min((totalAmount * promoCode.value) / 100, promoCode.maxDiscount);
    } else if (promoCode.type === 'fixed') {
        discount = promoCode.value;
    } else if (promoCode.type === 'shipping') {
        discount = promoCode.maxDiscount; // Shipping discount
        discountType = 'shipping';
    }
    
    console.log(`[LV Site] ✅ Promo code valid: ${code} - $${discount} discount`);
    
    res.json({
        valid: true,
        code: code.toUpperCase(),
        discount: discount,
        discountType: discountType,
        description: promoCode.description,
        message: `${promoCode.description} - You saved $${discount.toFixed(2)}!`
    });
});

// Test POST endpoint to verify JSON parsing
app.post('/test-post', (req, res) => {
    console.log('[LV Site] 🧪 Test POST request received');
    console.log('[LV Site] 📦 Request body:', req.body);
    res.json({
        success: true,
        message: 'POST endpoint working',
        received: req.body
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'lv-site', 
        port: PORT,
        routes: {
            '/': 'Landing page',
            '/test-checkout': 'Product cart page',
            '/lv-checkout-form-enhanced': 'Enhanced checkout form',
            '/lv-checkout-form': 'Standard checkout form',
            '/debug-checkout': 'Debug checkout modal'
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏺 Louis Vuitton Demo Site running on http://localhost:${PORT}`);
    console.log(`🛍️ Test cart: http://localhost:${PORT}/test-checkout`);
    console.log(`💳 Enhanced checkout: http://localhost:${PORT}/lv-checkout-form-enhanced`);
    console.log(`📝 Standard checkout: http://localhost:${PORT}/lv-checkout-form`);
}); 