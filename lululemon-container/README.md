# Lululemon Demo Site Container

A containerized Lululemon demo site for testing cross-merchant recognition and checkout flows with the Fairs platform.

## Features

- Fully containerized Node.js/Express server
- Merchant endpoints for checkout integration
- Cross-domain testing capabilities
- Universal ID recognition support
- Integration with Fairs SDK v3

## Ports

- **3009**: Lululemon demo site (this container)
- **3007**: Louis Vuitton demo site (for cross-merchant testing)
- **3000**: Commerce platform (SDK source)
- **3003**: Checkout service
- **3008**: Merchant integration service
- **4000**: API orchestrator

## Quick Start

### Build and run the container:

```bash
# Build the container
docker-compose build

# Start the container
docker-compose up -d

# View logs
docker-compose logs -f
```

### Access the site:

- Main cart page: http://localhost:3009/
- Cross-domain test: http://localhost:3009/crossdomain
- Health check: http://localhost:3009/health

## Merchant Endpoints

The container implements these endpoints for checkout integration:

- `POST /fairs/cart-data` - Returns cart items with SKUs and prices
- `POST /fairs/shipping-tax` - Calculates shipping options and tax
- `POST /fairs/promo-validate` - Validates promo codes
- `POST /fairs/order-create` - Creates order on merchant side

## Cross-Merchant Testing

Test Universal ID recognition between merchants:

1. Visit Louis Vuitton demo: http://localhost:3007/
2. Complete a checkout or enter phone number
3. Visit Lululemon demo: http://localhost:3009/
4. Enter the same phone number
5. User should be recognized with express checkout option

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3009)
- `NODE_ENV`: Environment (production/development)
- `MERCHANT_ID`: Merchant identifier (default: lululemon)

### CORS Origins

The server allows requests from:
- Commerce platform (3000)
- Checkout service (3003)
- Merchant integration (3008)
- API orchestrator (4000)
- LV demo (3007)

## File Structure

```
lululemon-container/
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Docker compose configuration
├── package.json           # Node dependencies
├── server.js              # Express server with merchant endpoints
├── migrate-urls.js        # URL migration script
└── public/
    ├── lululemon-cart.html           # Main cart page
    ├── lululemon-cart-crossdomain.html # Cross-domain test page
    ├── images/            # Product and brand images
    └── fonts/             # Calibre fonts
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run migration script
npm run migrate

# Start development server
npm run dev
```

### Testing Merchant Endpoints

```bash
# Test cart data endpoint
curl -X POST http://localhost:3009/fairs/cart-data \
  -H "Content-Type: application/json"

# Test shipping/tax calculation
curl -X POST http://localhost:3009/fairs/shipping-tax \
  -H "Content-Type: application/json" \
  -d '{
    "cart": {"totals": {"subtotal": 156.00}},
    "shipping_address": {"state": "CA"}
  }'
```

## Troubleshooting

### Container won't start
- Check if port 3009 is already in use: `docker ps | grep 3009`
- Check logs: `docker-compose logs`

### SDK not loading
- Ensure commerce platform is running on port 3000
- Check browser console for CORS errors
- Verify SDK URL: http://localhost:3000/fairs-sdk-unified.js

### Cross-merchant recognition not working
- Ensure both demo sites are using the same SDK source
- Check that merchant IDs are different (lululemon vs louis-vuitton)
- Verify Universal ID system is enabled in Identity Service

## Integration with Main Platform

To add this container to the main docker-compose:

```yaml
lululemon-demo:
  build: ./demo-merchant-sites/lululemon-container
  container_name: lululemon-demo-site
  ports:
    - "3009:3009"
  environment:
    - NODE_ENV=production
    - MERCHANT_ID=lululemon
  networks:
    - fairs-network
```