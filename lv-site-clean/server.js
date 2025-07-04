const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3008;

// Enable CORS for cross-origin requests
app.use(cors());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Louis Vuitton Clean Integration</title>
            <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; background: #f8f8f8; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #333; margin-bottom: 30px; font-weight: 300; }
                .demo-badge { background: #22c55e; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; margin-left: 10px; }
                a { display: block; padding: 15px 20px; background: #000; color: white; text-decoration: none; border-radius: 4px; transition: background 0.3s; margin-bottom: 15px; }
                a:hover { background: #333; }
                .description { color: #666; font-size: 14px; margin-bottom: 30px; }
                .comparison { background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                .comparison h3 { color: #16a34a; margin: 0 0 10px 0; }
                .comparison p { margin: 5px 0; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Louis Vuitton Clean Integration <span class="demo-badge">MINIMAL</span></h1>
                <div class="comparison">
                    <h3>✅ Clean Integration Benefits</h3>
                    <p><strong>25 lines</strong> vs original 370+ lines</p>
                    <p><strong>Zero</strong> manual SDK duplication</p>
                    <p><strong>Light modal backdrop</strong> by default</p>
                    <p><strong>Automatic</strong> user recognition</p>
                </div>
                <p class="description">Identical visual experience with 95% less code. This demonstrates proper Fairs SDK integration.</p>
                <a href="/cart">🛒 Clean Cart Experience</a>
                <a href="/checkout">🛍️ Clean Checkout Experience</a>
                <a href="/health">🔍 Health Check</a>
            </div>
        </body>
        </html>
    `);
});

// Main checkout page
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lv-checkout-clean.html'));
});

// Cart page
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lv-cart-clean.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'lv-site-clean', 
        port: PORT,
        integration: 'minimal',
        code_lines: '~25',
        routes: {
            '/': 'Landing page',
            '/checkout': 'Clean checkout form'
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏺 Louis Vuitton Clean Integration running on http://localhost:${PORT}`);
    console.log(`🛍️ Clean checkout: http://localhost:${PORT}/checkout`);
    console.log(`📊 Comparison: Original (370+ lines) vs Clean (~25 lines)`);
}); 