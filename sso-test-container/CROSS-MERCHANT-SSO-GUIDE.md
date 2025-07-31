# Cross-Merchant SSO Testing Guide

## Overview
Cross-merchant SSO allows users authenticated at one merchant to seamlessly access other merchants without re-authenticating. This works through URL-based token exchange since localStorage is isolated between different ports/domains.

## Test Flow

### Step 1: Authenticate at Merchant A (http://localhost:3021)
1. Visit http://localhost:3021
2. Enter email: `test@example.com`
3. Click "Send OTP"
4. Enter code: `123456`
5. Click "Verify OTP"
6. Verify you see "SSO is active" status

### Step 2: Visit Merchant B (http://localhost:3022)
1. Open a new tab and visit http://localhost:3022
2. Notice that you're NOT automatically authenticated (localStorage is isolated)
3. You'll see "Not authenticated" status

### Step 3: Trigger Cross-Domain Authentication
1. On Merchant B, click the yellow **"Trigger Cross-Domain Auth"** button
2. This will:
   - Check for SSO sessions on other merchants
   - Generate an exchange token
   - Redirect you back to Merchant B with the token
   - Exchange the token for a local session

### Step 4: Verify Cross-Merchant SSO
After the redirect completes:
1. You should see "SSO is active" on Merchant B
2. Click "Check Cross-Merchant SSO" to verify merchant access
3. You can now checkout at Merchant B without re-authenticating

## How It Works

### URL Exchange Strategy
Since localStorage is isolated between different origins (ports), the SDK uses URL-based token exchange:

1. **Token Generation**: When you click "Trigger Cross-Domain Auth", the SDK:
   - Detects you have auth on Merchant A
   - Calls `/api/v1/auth/sso/generate-exchange` to create a temporary token
   - Gets a short-lived exchange token (30 seconds)

2. **Redirect**: The SDK redirects to:
   ```
   http://localhost:3022?sso_exchange=TOKEN&merchant=test-merchant-b
   ```

3. **Token Exchange**: On page load, the SDK:
   - Detects the `sso_exchange` parameter
   - Calls `/api/v1/auth/sso/url-exchange` to exchange the token
   - Receives new auth tokens for Merchant B
   - Stores them in localStorage
   - Cleans the URL to remove the token

## Troubleshooting

### "No SSO session to exchange"
- Make sure you're authenticated at Merchant A first
- Check that your auth token hasn't expired (15 minutes)

### "Token already used"
- Exchange tokens are single-use
- Refresh the page and try again

### "Token expired"
- Exchange tokens expire in 30 seconds
- The redirect should happen automatically and quickly

## Console Messages to Expect

### On Merchant A (after auth):
```
[FairsSDK] OTP verification successful, SSO session created
[FairsSDK] SSO tokens stored successfully
```

### On Merchant B (during cross-domain auth):
```
[FairsSDK] No local auth found, checking for cross-domain SSO...
[FairsSDK] Trying url_exchange strategy
[FairsSDK] URL exchange successful
[FairsSDK] SSO session restored via URL exchange
```

## Testing Other Merchants

You can test the same flow with:
- Merchant C: http://localhost:3023
- Any merchant that implements the SSO protocol

## Key Points

1. **Isolation**: Each port/domain has isolated localStorage
2. **Exchange Required**: Cross-domain auth requires explicit action (security feature)
3. **Token Lifetime**: Exchange tokens are very short-lived (30 seconds)
4. **One-Time Use**: Each exchange token can only be used once
5. **Merchant Access**: After exchange, the user has access to both merchants