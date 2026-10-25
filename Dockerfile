# ===================================================
# Stage 1: Build the React Frontend
# ===================================================
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend/ ./
ENV CI=false
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# ===================================================
# Stage 2: Production Server Runner
# ===================================================
FROM node:18-alpine

WORKDIR /app

# Copy root server dependencies
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy backend application source
COPY . .

# Copy compiled frontend from Stage 1 into the expected directory
COPY --from=frontend-builder /app/frontend/build ./frontend/build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]
