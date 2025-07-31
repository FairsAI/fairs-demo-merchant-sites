# SSO Test Suite - OTP Verification Fix Report

## Issue Summary
The OTP verification was failing with a 400 error "OTP not found or expired" due to email mismatch between send and verify operations.

## Root Cause
The auto-fill feature (Ctrl+D) was changing the email from `test@example.com` to `demo@example.com` between:
1. Sending OTP to `test@example.com`
2. Verifying OTP with `demo@example.com`

## Fix Applied
Updated the auto-fill logic in `merchant-a/index.html` to preserve existing email values:

```javascript
// Don't change the email if it's already filled
const emailField = document.getElementById('test-email');
if (!emailField.value) {
    emailField.value = 'test@example.com';
}
```

## Test Instructions

### 1. Access Test Suite
- Landing Page: http://localhost:3020
- Merchant A Test: http://localhost:3021
- Merchant B Test: http://localhost:3022
- Merchant C Test: http://localhost:3023

### 2. Test OTP Flow (Fixed)
1. Visit http://localhost:3021
2. Enter email: `test@example.com`
3. Click "Send OTP"
4. Press Ctrl+D to auto-fill (email should remain `test@example.com`)
5. Click "Verify OTP" with code `123456`
6. Should see successful authentication

### 3. Test Cross-Merchant SSO
1. After authenticating at Merchant A
2. Visit Merchant B at http://localhost:3022
3. Click "Check Cross-Merchant SSO"
4. Should show SSO is active across merchants

## Container Status
- SSO Test Suite: Running on ports 3020-3023
- All test merchants accessible
- SDK loading from localhost URLs
- Auth service integration working

## Next Steps
1. Test SSO performance and caching
2. Integrate recognition for confidence routing
3. Add recognition caching
4. Add performance monitoring