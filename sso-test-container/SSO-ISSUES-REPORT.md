# SSO Test Suite Issues Report

## Overview
The SSO test suite is successfully built and running on ports 3020-3023, but there are several critical issues preventing proper SSO functionality.

## Issues Found

### 1. Content Security Policy Blocking iFrames (CRITICAL)
**Problem**: The API Orchestrator has restrictive CSP headers that prevent iframe-based SSO authentication.

**Details**:
- CSP header includes: `frame-ancestors: 'none'`
- Also sets: `X-Frame-Options: DENY`
- Location: `/shared/security-middleware/src/security-headers.js` and `/fairs-api-orchestrator/server-enhanced.js`

**Impact**: The iframe strategy for cross-domain SSO fails with:
```
Refused to frame 'http://localhost:4000/' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'".
```

**Solution**: Update CSP configuration to allow specific trusted domains for SSO:
```javascript
'frame-ancestors': ["'self'", "http://localhost:3020", "http://localhost:3021", "http://localhost:3022", "http://localhost:3023"]
```

### 2. Missing SSO Strategy Endpoint (CRITICAL)
**Problem**: The `/api/v1/auth/sso/strategy` endpoint returns 400 Bad Request.

**Details**:
- SDK attempts to call: `POST http://localhost:4000/api/v1/auth/sso/strategy`
- Response: 400 Bad Request with "Unknown error"

**Impact**: SDK cannot determine which authentication strategy to use for cross-domain SSO.

**Solution**: Implement the missing endpoint in the auth service to return appropriate SSO strategies based on browser capabilities.

### 3. CSRF Protection Status
**Current State**: CSRF protection is properly implemented in the SDK:
- CSRF tokens are fetched and included in all state-changing requests
- Token refresh and retry logic is implemented
- No bypass code found in the production SDK

**Recommendation**: Ensure CSRF protection remains enabled for production security.

## Test Results

### Single Merchant Flow (Merchant A)
- ✅ OTP sending works
- ✅ OTP verification works
- ✅ Authentication token stored
- ❌ SSO session creation fails due to missing strategy endpoint

### Cross-Merchant Flow (Merchant B)
- ❌ Cannot authenticate due to iframe blocking
- ❌ Cannot exchange tokens due to missing SSO session
- ❌ Strategy endpoint returns 400 error

### Browser Console Errors
1. CSP violation preventing iframe loading
2. 400 errors on strategy endpoint
3. Timeout on iframe initialization (5 seconds)

## Recommendations

### Immediate Actions
1. **Fix CSP Headers**: Update API Orchestrator to allow iframe embedding from trusted domains
2. **Implement Strategy Endpoint**: Add the missing `/api/v1/auth/sso/strategy` endpoint
3. **Test CORS Configuration**: Ensure all test domains are in ALLOWED_ORIGINS

### Security Considerations
1. **Maintain CSRF Protection**: Keep CSRF tokens enabled in production
2. **Restrict Frame Origins**: Only allow specific trusted domains in frame-ancestors
3. **Use HTTPS in Production**: All SSO flows should use HTTPS to prevent token interception

### Testing Improvements
1. Add health check endpoints to verify SSO hub availability
2. Implement better error messages for debugging
3. Add logging for SSO authentication attempts

## Next Steps
1. Fix the CSP configuration in the API Orchestrator
2. Implement the missing SSO strategy endpoint
3. Re-test the complete SSO flow
4. Update documentation with working examples

## Test Environment
- SSO Test Suite: Running on ports 3020-3023
- API Orchestrator: Port 4000
- Auth Service: Port 3005
- SDK Version: 3.0.1 (with checkout fix applied)