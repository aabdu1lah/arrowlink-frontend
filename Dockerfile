# Stage 1: Dependency Installation
FROM node:20-alpine AS dependency-installer
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Code Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dependency-installer /app/node_modules ./node_modules
COPY . .
# We removed the ARG and ENV from here. The build doesn't need to know the URL.
RUN npm run build

# Stage 3: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]