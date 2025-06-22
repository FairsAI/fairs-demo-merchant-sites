# Louis Vuitton Demo Site Container

A containerized version of the Louis Vuitton HTML demo site with proper Express.js server, asset management, and routing.

## 🏗️ Architecture

- **Express.js Server** on port 3007
- **Static Asset Serving** with `/assets/` prefix
- **Clean URL Routing** without `.html` extensions
- **Health Check Endpoints** for monitoring
- **Docker Support** with multi-stage builds

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Run URL migration (fixes asset paths)
node migrate-urls.js

# Start development server
npm run dev

# Or start production server
npm start
```

### Docker Deployment
```bash
# Build container
docker build -t lv-demo-site .

# Run container
docker run -p 3007:3007 lv-demo-site

# Or use docker-compose
docker-compose up
```

## 📍 Routes

| Route | Description | File |
|-------|-------------|------|
| `/` | Landing page with navigation | Generated HTML |
| `/test-checkout` | Product cart page (entry point) | `test-1-lv-checkout.html` |
| `/lv-checkout-form-enhanced` | Enhanced checkout form | `lv-checkout-form-enhanced.html` |
| `/lv-checkout-form` | Standard checkout form | `lv-checkout-form.html` |
| `/health` | Health check endpoint | JSON response |

### Legacy Route Support
- `/lv-checkout-form.html` → redirects to `/lv-checkout-form-enhanced`
- `/lv-checkout-form-enhanced.html` → redirects to `/lv-checkout-form-enhanced`
- `/test-1-lv-checkout.html` → redirects to `/test-checkout`

## 🎯 Key Features

### ✅ Fixed Routing Issue
The "Proceed to Checkout" button now correctly routes to the enhanced checkout form:
```javascript
// Before: window.location.href = '/lv-checkout-form.html';
// After:  window.location.href = '/lv-checkout-form-enhanced';
```

### 📁 Asset Management
- **Images**: `/assets/images/` (product images, logos, payment icons)
- **Fonts**: `/assets/fonts/` (custom typography)
- **Scripts**: References to main platform SDK

### 🔗 Integration Ready
- **CORS Enabled** for cross-origin requests
- **Health Checks** for load balancer integration
- **Docker Networking** with `fairs-network`
- **Service Discovery** compatible

## 🛠️ Development

### File Structure
```
lv-site-container/
├── server.js              # Express server
├── package.json           # Dependencies
├── migrate-urls.js        # Asset URL migration
├── Dockerfile            # Container build
├── docker-compose.yml    # Orchestration
└── public/               # Static files
    ├── *.html           # HTML pages
    └── assets/          # Images, fonts, etc.
```

### URL Migration
The `migrate-urls.js` script automatically fixes:
- Image paths: `images/` → `/assets/images/`
- Font paths: `fonts/` → `/assets/fonts/`
- Routing: Enhanced checkout form targeting
- SDK references: Point to main platform

### Testing
```bash
# Health check
curl http://localhost:3007/health

# Test main routes
curl -I http://localhost:3007/test-checkout
curl -I http://localhost:3007/lv-checkout-form-enhanced

# Test assets
curl -I http://localhost:3007/assets/images/lv-logo.png
```

## 🐳 Docker Integration

### Standalone Mode
```bash
docker-compose up lv-demo-site
```

### With Full Platform
```bash
docker-compose --profile standalone up
```

### Environment Variables
- `PORT`: Server port (default: 3007)
- `NODE_ENV`: Environment mode

## 🔍 Monitoring

### Health Check Response
```json
{
  "status": "healthy",
  "service": "lv-site",
  "port": 3007,
  "routes": {
    "/": "Landing page",
    "/test-checkout": "Product cart page",
    "/lv-checkout-form-enhanced": "Enhanced checkout form",
    "/lv-checkout-form": "Standard checkout form"
  }
}
```

### Logs
- Access logs via Express middleware
- Error handling with proper HTTP status codes
- Docker logs available via `docker logs lv-demo-site`

## 🔗 Integration Points

### Main Platform
- SDK loaded from `http://localhost:3000/assets/fairs-sdk.js`
- API calls to checkout service endpoints
- Shared payment processing integration

### Microservices Network
- Identity Service: User authentication
- Payment Service: Transaction processing
- Checkout Service: Order management

## 🚀 Deployment Checklist

- [x] ✅ Express server configured
- [x] ✅ Asset URLs migrated
- [x] ✅ Routing fixed (enhanced checkout)
- [x] ✅ Docker container built
- [x] ✅ Health checks working
- [x] ✅ CORS enabled
- [x] ✅ Static assets served correctly
- [x] ✅ Legacy route redirects
- [x] ✅ Documentation complete

## 📞 Support

For issues or questions about the Louis Vuitton demo site container:
1. Check health endpoint: `/health`
2. Review server logs
3. Verify asset paths in migration script
4. Test routes individually

---

**Container Status**: ✅ **READY FOR DEPLOYMENT** 