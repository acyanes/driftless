# Dockerfile for sync-engine application
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY packages/package.json packages/pnpm-lock.yaml ./
COPY packages/tsconfig.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY packages/server/ ./server/
COPY packages/sync/ ./sync/

# Build TypeScript
RUN pnpm exec tsc --project tsconfig.json

# Expose port for HTTP server
EXPOSE 3001

# Start the application
CMD ["node", "server/dist/index.js"]