# Vite inlines VITE_* values at build time, so they are build args, e.g.
#   docker build --build-arg VITE_DOMAIN=https://example.com \
#     --build-arg VITE_PROXY_ORIGIN=https://proxy.example.com .
# Secrets (RESEND_API_KEY, SESSION_SECRET, ...) are runtime env vars only.

FROM node:24-slim AS base
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . .
ARG VITE_DOMAIN
ARG VITE_PROXY_ORIGIN
ENV VITE_DOMAIN=$VITE_DOMAIN \
    VITE_PROXY_ORIGIN=$VITE_PROXY_ORIGIN \
    VITE_NODE_ENV=production
RUN test -n "$VITE_DOMAIN" && test -n "$VITE_PROXY_ORIGIN" \
    || (echo "VITE_DOMAIN and VITE_PROXY_ORIGIN build args are required" && exit 1)
RUN pnpm build

# The proxy serves Scramjet from node_modules, so production deps ship too.
FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --prod

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production \
    VITE_NODE_ENV=production \
    PORT=3000
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY package.json prod-server.js ./
COPY proxy ./proxy
USER node
EXPOSE 3000
CMD ["node", "prod-server.js"]
