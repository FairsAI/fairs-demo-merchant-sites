FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S testuser -u 1001 && \
    chown -R testuser:nodejs /app

USER testuser

# Expose all test ports
EXPOSE 3000 3001 3002 3003

# Start the server
CMD ["npm", "start"]