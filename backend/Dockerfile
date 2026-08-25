# Build stage — compile TypeScript for a lean production image
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Runtime
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# Persistent volumes should mount here in production
RUN mkdir -p data uploads
EXPOSE 3000
CMD ["node", "dist/server.js"]
