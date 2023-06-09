FROM node:17-bullseye-slim
ENV NODE_ENV production
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev
RUN cd client && npm ci --omit=dev && NODE_OPTIONS=--openssl-legacy-provider SKIP_PREFLIGHT_CHECK=true npm run build
USER node
CMD ["dumb-init", "npm", "run", "start"]
