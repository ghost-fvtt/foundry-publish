# SPDX-FileCopyrightText: 2022 Johannes Loher
#
# SPDX-License-Identifier: MIT

FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm ci --ignore-scripts
RUN npm run build
RUN chmod +x ./dist/index.js

FROM node:lts
WORKDIR /app
ENV NODE_ENV=production
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app/dist ./dist
RUN ln -s /app/dist/index.js /usr/local/bin/foundry-publish

CMD ["foundry-publish"]
