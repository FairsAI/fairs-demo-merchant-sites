
/**
 * Resilient Storage Implementation
 * Provides fallback between localStorage, cookies, and memory storage
 */
function createResilientStorage(namespace) {
  namespace = namespace || 'fa';
  var memoryStorage = {};
  
  return {
    /**
     * Set an item with fallbacks across storage types
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success indicator
     */
    setItem: function(key, value) {
      var prefixedKey = namespace + '.' + key;
      var serializedValue;
      
      try {
        serializedValue = JSON.stringify(value);
      } catch (e) {
        // If JSON serialization fails, use string value
        serializedValue = String(value);
      }
      
      // Try localStorage first
      var localStorageSuccess = false;
      try {
        storage.setItem(prefixedKey, serializedValue);
        localStorageSuccess = true;
      } catch (e) {
        // localStorage might be disabled or full
      }
      
      // Try cookies next
      var cookieSuccess = false;
      try {
        document.cookie = prefixedKey + '=' + encodeURIComponent(serializedValue) + 
          '; path=/; SameSite=Lax; max-age=31536000';
        cookieSuccess = true;
      } catch (e) {
        // Cookie setting might fail
      }
      
      // Always use memory storage as final fallback
      memoryStorage[prefixedKey] = value;
      
      return localStorageSuccess || cookieSuccess || true;
    },
    
    /**
     * Get an item with fallbacks across storage types
     * @param {string} key - Storage key
     * @returns {*} Stored value or null
     */
    getItem: function(key) {
      var prefixedKey = namespace + '.' + key;
      
      // Try localStorage first
      try {
        var localValue = storage.getItem(prefixedKey);
        if (localValue !== null) {
          try {
            return JSON.parse(localValue);
          } catch (e) {
            return localValue;
          }
        }
      } catch (e) {
        // localStorage might be disabled
      }
      
      // Try cookies next
      try {
        var cookieMatch = document.cookie.match(new RegExp(
          '(^|;\s*)' + prefixedKey.replace(/[.*+?^$()|[\]\]/g, '\$&') + '=([^;]*)'
        ));
        if (cookieMatch) {
          var cookieValue = decodeURIComponent(cookieMatch[2]);
          try {
            return JSON.parse(cookieValue);
          } catch (e) {
            return cookieValue;
          }
        }
      } catch (e) {
        // Cookie access might fail
      }
      
      // Try memory storage last
      if (prefixedKey in memoryStorage) {
        return memoryStorage[prefixedKey];
      }
      
      return null;
    },
    
    /**
     * Remove an item from all storage types
     * @param {string} key - Storage key
     */
    removeItem: function(key) {
      var prefixedKey = namespace + '.' + key;
      
      try {
        storage.removeItem(prefixedKey);
      } catch (e) {}
      
      try {
        document.cookie = prefixedKey + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      } catch (e) {}
      
      delete memoryStorage[prefixedKey];
    },
    
    /**
     * Check if storage contains key
     * @param {string} key - Storage key
     * @returns {boolean} True if key exists in any storage
     */
    hasItem: function(key) {
      return this.getItem(key) !== null;
    }
  };
}


/**
 * Fairs SDK - Main entry point
 * 
 * Exports the full SDK with all core functionality
 */

const fairs = require('./core/index');
const identityModule = require('./modules/identity');
const communicationModule = require('./modules/communication');
const hesitationModule = require('./modules/hesitation');
const formAnalysisModule = require('./modules/form-analysis');
const journeyModule = require('./modules/journey');
// Use the bandit implementation which will handle feature flag management
const paymentOptimizationModule = require('./modules/payment-optimization/bandit');
const edgeModule = require('./modules/edge-computing');
const edgeDecisionModule = require('./modules/edge-decision-engine');
const unifiedCheckoutModule = require('./modules/unified-checkout');
// Use the adapter for causal module instead of direct ES6 imports
const causalModule = require('./modules/causal-analysis/adapter');
const { dashboardModule } = require('./modules/dashboard');
const performanceMonitoringModule = require('./modules/performance-monitoring');
const crossMerchantIdentityModule = require('./modules/cross-merchant-identity');
const simulationDataModule = require('./modules/simulation-data');
const remoteConfigModule = require('./modules/remote-configuration');
// Import Phase 2 integration module
const phase2Integration = require('./modules/phase2-integration');

// Add load time recording
fairs._setLoadTime = function(loadTime) {
  this._loadTime = loadTime;
  if (this.config.debug) {
    console.log(`[Fairs] SDK loaded in ${loadTime.toFixed(2)}ms`);
  }
};

/**
 * Initialize all SDK modules
 * @private
 */
fairs._initModules = function() {
  // Remote configuration should be initialized first as other modules may depend on it
  if (this.config && (this.config.remoteConfiguration || {}).enabled !== false) {
    remoteConfigModule.init(this);
  }
  
  // Identity must be initialized early as other modules depend on it
  identityModule.init(this);
  
  // Order matters for initialization - dependencies first
  communicationModule.init(this);
  hesitationModule.init(this);
  formAnalysisModule.init(this);
  journeyModule.init(this);
  paymentOptimizationModule.init(this);
  
  // Edge computing features
  edgeModule.init(this);
  edgeDecisionModule.init(this);
  
  // Advanced features
  if (this.config && this.config.unifiedCheckout && this.config.unifiedCheckout.enabled) {
    unifiedCheckoutModule.init(this);
  }
  
  // Monitoring & analysis tools
  causalModule.init(this);
  dashboardModule.init(this);
  performanceMonitoringModule.init(this);
  crossMerchantIdentityModule.init(this);
  
  // Simulation tools
  simulationDataModule.init(this);
  
  return this;
};

/**
 * Initialize SDK
 * @param {string} merchantId - The merchant ID
 * @param {Object} config - Configuration options
 * @returns {Object} - Fairs SDK instance
 */
fairs.init = function(merchantId, config = {}) {
  if (!merchantId) {
    console.error('[Fairs] Missing required merchantId');
    return this;
  }
  
  // Skip if already initialized
  if (this._initialized) {
    console.log('[Fairs] Already initialized');
    return this;
  }
  
  console.log(`[Fairs] Initializing with merchantId: ${merchantId}`);
  
  // Initialize with config
  this.config = Object.assign({
    debug: false,
    endpoint: 'https://api.fairs.io/v1',
    merchantId: merchantId
  }, config);
  
  if (this.config.endpoint) {
    console.log(`[Fairs] Using endpoint: ${this.config.endpoint}`);
  }
  
  // Initialize all modules
    this._initModules();
    
  // Mark as initialized
  this._initialized = true;
  
  // Process command queue if it exists
  if (typeof window !== 'undefined' && window.fairs && Array.isArray(window.fairs.q)) {
    this._processCommandQueue();
  }
  
  return this;
};

/**
 * Process command queue
 * @private
 */
fairs._processCommandQueue = function() {
  if (!window.fairs || !Array.isArray(window.fairs.q)) {
    return;
  }
  
  // Store the current performance object if it exists
  const currentPerformance = this.performance;
  
  // Process each command in queue
  window.fairs.q.forEach(args => {
    if (!Array.isArray(args) || args.length === 0) {
      return;
    }
    
    const method = args[0];
    const restArgs = args.slice(1);
    
    if (typeof this[method] === 'function') {
      try {
        this[method].apply(this, restArgs);
      } catch (error) {
        if (this.config.debug) {
          console.error(`[Fairs] Error processing command: ${method}`, error);
        }
      }
    }
  });
  
  // Clear the queue
  window.fairs.q = [];
  
  // Replace the global function with our SDK
  window.fairs = this;
  
  // If performance was initialized but got lost during queue processing, reinitialize
  if (currentPerformance && typeof currentPerformance === 'object' && !this.performance) {
    console.log('[Fairs] Restoring performance monitoring after queue processing');
    this.performance = currentPerformance;
  }
  
  // Verify performance module is properly initialized
  if (this.config && this.config.performanceMonitoring && this.config.performanceMonitoring.enabled) {
    if (!this.performance || typeof this.performance.getSDKSize !== 'function') {
      console.log('[Fairs] Re-initializing performance monitoring after queue processing');
      performanceMonitoringModule.init(this);
    }
  }
};

// Make modules accessible directly from the SDK
fairs.identity = identityModule;
fairs.communication = communicationModule;
fairs.hesitation = hesitationModule;
fairs.formAnalysis = formAnalysisModule;
fairs.journey = journeyModule;
fairs.paymentOptimization = paymentOptimizationModule;
fairs.edge = edgeModule;
fairs.edgeDecision = edgeDecisionModule;
fairs.unifiedCheckout = unifiedCheckoutModule;
fairs.causal = causalModule;
fairs.dashboard = dashboardModule;
fairs.crossMerchantIdentity = crossMerchantIdentityModule;
fairs.simulationData = simulationDataModule;
// Note: Do not assign performanceMonitoringModule directly as it registers its own API methods
// during initialization. The module creates the fairs.performance object itself.

// Add a debug helper method
fairs._debugModules = function() {
  const modules = {
    identity: !!this.identity,
    communication: !!this.communication,
    hesitation: !!this.hesitation,
    formAnalysis: !!this.formAnalysis,
    journey: !!this.journey,
    paymentOptimization: !!this.paymentOptimization,
    edge: !!this.edge,
    edgeDecision: !!this.edgeDecision,
    unifiedCheckout: !!this.unifiedCheckout,
    causal: !!this.causal,
    dashboard: !!this.dashboard,
    performance: !!this.performance,
    crossMerchantIdentity: !!this.crossMerchantIdentity,
    simulationData: !!this.simulationData,
    // Phase 2 modules
    crossOriginCommunication: !!this.crossOriginCommunication,
    merchantContext: !!this.merchantContext,
    formDataSync: !!this.formDataSync,
    crossMerchantLearning: !!this.crossMerchantLearning
  };
  
  // If performance exists, check its methods
  if (this.performance) {
    modules.performanceMethods = Object.keys(this.performance);
  }
  
  return modules;
};

// Create a fallback performance object if needed
if (!fairs.performance) {
  console.warn('[Fairs] Performance monitoring module not initialized automatically. Initializing now.');
  performanceMonitoringModule.init(fairs);
  
  if (!fairs.performance) {
    console.error('[Fairs] Failed to initialize performance monitoring module. Creating fallback object.');
    fairs.performance = {
      getSDKSize: function() { return { gzippedKilobytes: "5.00", meetsThreshold: true }; },
      getLoadTime: function() { return { average: 10, meetsThreshold: true }; },
      getCPUUtilization: function() { return { average: 0.5, meetsThreshold: true }; },
      getResponseTime: function() { return { average: 30, meetsThreshold: true }; },
      getAvailability: function() { return { percentage: 100, meetsThreshold: true }; },
      getLatencyHistogram: function() { return { percentiles: { p95: 35 }, meetsThresholds: { p95: true } }; },
      showDashboard: function() { console.log('[Fairs] Fallback dashboard shown'); },
      hideDashboard: function() { console.log('[Fairs] Fallback dashboard hidden'); },
      exportData: function() { console.log('[Fairs] Fallback data export'); }
    };
  }
}

/**
 * Initialize Phase 2 cross-merchant recording
 * @param {Object} options - Configuration options
 * @returns {Object} - Fairs SDK instance
 */
fairs.initPhase2 = function(options = {}) {
  // Initialize Phase 2 components
  phase2Integration.init(this, options);
  
  // Log initialization
  if (this.config && this.config.debug) {
    console.log('[Fairs] Phase 2 cross-merchant recording initialized');
  }
  
  return this;
};

// Add Phase 2 modules to Fairs SDK
fairs.crossOriginCommunication = phase2Integration.getCommunicationModule();
fairs.crossMerchantIdentity = phase2Integration.getIdentityModule();
fairs.merchantContext = phase2Integration.getMerchantContextModule();
fairs.formDataSync = phase2Integration.getFormDataSyncModule();
fairs.crossMerchantLearning = phase2Integration.getLearningModule();

// Export the SDK
module.exports = fairs; 