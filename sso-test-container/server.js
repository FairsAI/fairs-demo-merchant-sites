/**
 * SSO Test Suite Server
 * Serves multiple "merchant" domains on different ports for cross-domain testing
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Create separate Express apps for each test merchant
const createMerchantApp = (merchantId, merchantName) => {
  const app = express();
  
  // Configure CORS for cross-domain testing
  app.use(cors({
    origin: true, // Allow all origins for testing
    credentials: true
  }));
  
  // Middleware
  app.use(express.json());
  // Serve merchant-specific files first (higher priority)
  app.use(express.static(path.join(__dirname, 'public', merchantId)));
  // Then serve shared files as fallback
  app.use(express.static(path.join(__dirname, 'public', 'shared')));
  
  // Set merchant context
  app.use((req, res, next) => {
    res.locals.merchantId = merchantId;
    res.locals.merchantName = merchantName;
    next();
  });
  
  // Health check
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      merchant: merchantId,
      merchantName: merchantName,
      timestamp: new Date().toISOString()
    });
  });
  
  // Merchant info endpoint
  app.get('/api/merchant-info', (req, res) => {
    res.json({
      merchantId: merchantId,
      merchantName: merchantName,
      ssoEnabled: true,
      crossMerchantEnabled: true
    });
  });
  
  return app;
};

// Create main test suite app
const mainApp = express();
mainApp.use(cors({ origin: true, credentials: true }));
mainApp.use(express.json());
mainApp.use(express.static(path.join(__dirname, 'public', 'shared')));

// Main landing page
mainApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'shared', 'index.html'));
});

// Health check for main app
mainApp.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'sso-test-suite',
    merchants: ['merchant-a', 'merchant-b', 'merchant-c']
  });
});

// Create merchant apps
const merchantA = createMerchantApp('merchant-a', 'Test Merchant A');
const merchantB = createMerchantApp('merchant-b', 'Test Merchant B');
const merchantC = createMerchantApp('merchant-c', 'Test Merchant C');

// Start servers on different ports
const PORT_MAIN = process.env.PORT_MAIN || 3000;
const PORT_A = process.env.PORT_A || 3001;
const PORT_B = process.env.PORT_B || 3002;
const PORT_C = process.env.PORT_C || 3003;

mainApp.listen(PORT_MAIN, () => {
  console.log(`🚀 SSO Test Suite Main running on port ${PORT_MAIN}`);
  console.log(`   Access at: http://localhost:${PORT_MAIN}`);
});

merchantA.listen(PORT_A, () => {
  console.log(`🏪 Merchant A running on port ${PORT_A}`);
  console.log(`   Access at: http://localhost:${PORT_A}`);
});

merchantB.listen(PORT_B, () => {
  console.log(`🏬 Merchant B running on port ${PORT_B}`);
  console.log(`   Access at: http://localhost:${PORT_B}`);
});

merchantC.listen(PORT_C, () => {
  console.log(`🏭 Merchant C running on port ${PORT_C}`);
  console.log(`   Access at: http://localhost:${PORT_C}`);
});

console.log('\n📋 SSO Test Scenarios:');
console.log('1. Single Merchant: Start at Merchant A');
console.log('2. Cross-Merchant: Authenticate at A, then visit B');
console.log('3. Multi-Merchant: Test across all three merchants');
console.log('\n✅ Ready for SSO testing!');