const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3007;

// Enable CORS for cross-origin requests
app.use(cors());

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