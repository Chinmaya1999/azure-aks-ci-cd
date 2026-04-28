# Stage 1: Build React application
FROM node:18-alpine AS builder

WORKDIR /app

# Create .npmrc for faster installation
RUN echo "fetch-timeout=600000" > ~/.npmrc && \
    echo "fetch-retry-mintimeout=20000" >> ~/.npmrc && \
    echo "fetch-retry-maxtimeout=120000" >> ~/.npmrc

# Copy package files
COPY package*.json ./

# Install dependencies with optimizations
RUN npm install --legacy-peer-deps --no-fund --no-audit --no-optional --prefer-offline --omit=dev 2>&1 | tail -20

# Copy source code
COPY public ./public
COPY src ./src

# Build React app
RUN CI=true npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
