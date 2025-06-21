import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";

// Extend the Window interface to include __fa_cid
declare global {
  interface Window {
    __fa_cid: string;
  }
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Client-side code here
    function createClientId() {
      const signals = [
        navigator.userAgent,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        navigator.language,
        window.devicePixelRatio
      ].join('|');
      let hash = 0;
      for (let i = 0; i < signals.length; i++) {
        const char = signals.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return 'cid_' + Math.abs(hash).toString(36);
    }
    const clientId = createClientId();
    try { localStorage.setItem('fa.cid', clientId); } catch(e) {}
    try { document.cookie = 'fa.cid=' + clientId + '; path=/; SameSite=Lax; max-age=31536000'; } catch(e) {}
    window.__fa_cid = clientId;
  }, []);

  return (
    <div>
      <html lang="en">
        <head>
          <style>{`
            @font-face {
              font-family: 'Futura Book';
              src: url('/fonts/futura-book-webfont.woff2') format('woff2');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            
            html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, button {
              font-family: 'Futura Book', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
              font-weight: 600 !important;
            }
          `}</style>
        </head>
        <body
          style={{
            fontFamily:
              "'Futura Book', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          {/* SDK loader and initialization script */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = '/assets/fairs-sdk.js';
                script.async = true;
                document.body.appendChild(script);
              })();
              (function checkSDKLoaded() {
                if (window.FairsSDK) {
                  window.FairsSDK.init({
                    merchantId: 'glossier-demo',
                    environment: 'development',
                    checkoutButton: '#fairs-checkout-button',
                    testMode: { forceNewUser: true },
                    onCheckoutComplete: function(result) {
                      console.log('Checkout completed:', result);
                    }
                  });
                  console.log('FairsSDK initialized for Glossier');
                } else {
                  setTimeout(checkSDKLoaded, 50);
                }
              })();
            `
          }} />
        </body>
      </html>
    </div>
  );
} 