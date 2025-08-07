/**
 * LULULEMON DEMO MERCHANT ENDPOINTS
 * Production-ready implementation following industry standards
 * Based on Bolt/Shopify patterns - combined shipping+tax calculation
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',  // Commerce platform (SDK)
        'http://localhost:3003',  // Checkout service
        'http://localhost:3008',  // Merchant integration service
        'http://localhost:4000',  // API orchestrator
        'http://localhost:3007',  // LV demo (for testing)
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// ========================================
// MERCHANT ENDPOINTS (Industry Standard)
// ========================================

/**
 * HEALTH CHECK
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        merchant: 'lululemon',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

/**
 * FAIRS HEALTH CHECK
 */
app.get('/fairs/health', (req, res) => {
    res.json({
        status: 'healthy',
        merchant: 'lululemon',
        endpoints: ['cart-data', 'shipping-tax', 'promo-validate', 'order-create'],
        timestamp: new Date().toISOString()
    });
});

/**
 * CART DATA - Final product info with availability
 */
app.post('/fairs/cart-data', (req, res) => {
    try {
        console.log('🛒 Lululemon Cart Data Request');

        // Return Lululemon cart data
        res.json({
            success: true,
            cart: {
                items: [
                    {
                        id: 'align-tank-top',
                        name: 'lululemon Align™ Waist-Length Racerback Tank Top',
                        price: 5800,  // Price in cents ($58.00)
                        quantity: 1,
                        sku: 'LW1CTUS-048432',
                        category: 'womens-tanks',
                        color: 'Washed Denim',
                        size: '0',
                        inStock: true,
                        image: 'http://localhost:3009/images/lulu-top.webp'
                    },
                    {
                        id: 'wunder-under-tight',
                        name: 'Wunder Under SmoothCover High-Rise Tight 25"',
                        price: 9800,  // Price in cents ($98.00)
                        quantity: 1,
                        sku: 'LW5DQMS-048433',
                        category: 'womens-leggings',
                        color: 'Washed Denim',
                        size: '0',
                        inStock: true,
                        image: 'http://localhost:3009/images/lulu-bottom.webp'
                    }
                ],
                totals: {
                    subtotal: 15600,  // Subtotal in cents ($156.00)
                    currency: 'USD',
                    itemCount: 2
                }
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Cart data error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve cart data'
        });
    }
});

/**
 * SHIPPING + TAX CALCULATION - Combined endpoint (industry standard)
 */
app.post('/fairs/shipping-tax', (req, res) => {
    try {
        const { cart, shipping_address } = req.body;
        
        console.log('🚚 Lululemon Shipping+Tax Calculation:', {
            cartTotal: cart?.totals?.subtotal || 0,
            destination: shipping_address?.state || 'Unknown'
        });

        // Lululemon's shipping rates
        const shippingOptions = [
            {
                id: 'standard',
                name: 'Standard Shipping',
                price: 0.00,  // Free shipping on orders over $150
                delivery_estimate: '5-7 business days',
                description: 'Free on orders over $150'
            },
            {
                id: 'express',
                name: 'Express Shipping', 
                price: 15.00,
                delivery_estimate: '2-3 business days',
                description: 'Express delivery'
            },
            {
                id: 'priority',
                name: 'Priority Shipping',
                price: 25.00,
                delivery_estimate: 'Next business day',
                description: 'Priority overnight delivery'
            }
        ];

        // Calculate tax based on state (simplified)
        const stateTaxRates = {
            'CA': 0.0925,  // California
            'NY': 0.08,    // New York
            'TX': 0.0625,  // Texas
            'FL': 0.06,    // Florida
            'WA': 0.065,   // Washington
            'OR': 0,       // Oregon (no sales tax)
            'MT': 0,       // Montana (no sales tax)
            'NH': 0,       // New Hampshire (no sales tax)
            'DE': 0,       // Delaware (no sales tax)
            'AK': 0        // Alaska (no state sales tax)
        };

        const state = shipping_address?.state || 'CA';
        const taxRate = stateTaxRates[state] || 0.07; // Default 7%
        const subtotal = cart?.totals?.subtotal || 15600;  // Subtotal in cents
        const taxAmount = subtotal * taxRate;

        res.json({
            success: true,
            shipping_options: shippingOptions,
            tax: {
                rate: taxRate,
                amount: parseFloat(taxAmount.toFixed(2)),
                description: `${state} Sales Tax`
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Shipping/tax error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to calculate shipping and tax'
        });
    }
});

/**
 * PROMO CODE VALIDATION
 */
app.post('/fairs/promo-validate', (req, res) => {
    try {
        const { promo_code, cart } = req.body;
        
        console.log('🎟️ Lululemon Promo Validation:', promo_code);

        // Sample promo codes
        const promoCodes = {
            'SWEAT20': {
                type: 'percentage',
                value: 20,
                description: '20% off your order',
                minimum_purchase: 100
            },
            'FREESHIP': {
                type: 'free_shipping',
                value: 0,
                description: 'Free standard shipping',
                minimum_purchase: 0
            },
            'SAVE10': {
                type: 'fixed',
                value: 10,
                description: '$10 off your order',
                minimum_purchase: 50
            }
        };

        const promo = promoCodes[promo_code?.toUpperCase()];
        
        if (!promo) {
            return res.json({
                success: false,
                error: 'Invalid promo code'
            });
        }

        const subtotal = cart?.totals?.subtotal || 0;
        
        if (subtotal < promo.minimum_purchase) {
            return res.json({
                success: false,
                error: `Minimum purchase of $${promo.minimum_purchase} required`
            });
        }

        let discount = 0;
        if (promo.type === 'percentage') {
            discount = subtotal * (promo.value / 100);
        } else if (promo.type === 'fixed') {
            discount = promo.value;
        }

        res.json({
            success: true,
            promo: {
                code: promo_code.toUpperCase(),
                type: promo.type,
                value: promo.value,
                discount: parseFloat(discount.toFixed(2)),
                description: promo.description
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Promo validation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to validate promo code'
        });
    }
});

/**
 * ORDER CREATION
 */
app.post('/fairs/order-create', (req, res) => {
    try {
        const { cart, customer, shipping_address, payment_method, shipping_option } = req.body;
        
        console.log('📦 Lululemon Order Creation');

        // Generate order ID
        const orderId = `LULU-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create order response
        res.json({
            success: true,
            order: {
                id: orderId,
                status: 'confirmed',
                merchant: 'lululemon',
                customer_email: customer?.email || shipping_address?.email,
                items: cart?.items || [],
                totals: {
                    subtotal: cart?.totals?.subtotal || 0,
                    shipping: shipping_option?.price || 0,
                    tax: cart?.tax || 0,
                    total: (cart?.totals?.subtotal || 0) + (shipping_option?.price || 0) + (cart?.tax || 0)
                },
                shipping_address,
                shipping_method: shipping_option,
                created_at: new Date().toISOString(),
                confirmation_url: `http://localhost:3009/order-confirmation/${orderId}`
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Order creation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create order'
        });
    }
});

// ========================================
// STATIC FILE SERVING
// ========================================

// Serve the main cart page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lululemon-cart.html'));
});

// Serve the cross-domain test page
app.get('/crossdomain', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lululemon-cart-crossdomain.html'));
});

// Health check for Docker
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'lululemon-demo-site',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ================================================
    🏃‍♀️ Lululemon Demo Site Started
    ================================================
    Port: ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    Merchant ID: lululemon
    
    Endpoints:
    - Main: http://localhost:${PORT}/
    - Cross-domain: http://localhost:${PORT}/crossdomain
    - Health: http://localhost:${PORT}/health
    
    Merchant Endpoints:
    - Cart Data: POST /fairs/cart-data
    - Shipping/Tax: POST /fairs/shipping-tax
    - Promo: POST /fairs/promo-validate
    - Order: POST /fairs/order-create
    ================================================
    `);
});