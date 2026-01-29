FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app

FROM base AS dependencies
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY libs/engine/package.json ./libs/engine/
COPY applications/web/package.json ./applications/web/
RUN pnpm install --frozen-lockfile --prod=false

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build --filter=web

FROM base AS production
COPY --from=build /app/applications/web/build ./applications/web/build
COPY --from=build /app/libs/engine ./libs/engine
COPY applications/web/package.json ./applications/web/
COPY libs/engine/package.json ./libs/engine/
RUN pnpm install --frozen-lockfile --prod --prefix applications/web --prefix libs/engine

COPY wait-for-redis.sh /usr/local/bin/wait-for-redis.sh
RUN chmod +x /usr/local/bin/wait-for-redis.sh

WORKDIR /app/applications/web
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -f http://localhost:3000 || exit 1
CMD ["wait-for-redis.sh", "redis:6379", "pnpm", "start"]