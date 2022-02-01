FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm run build
RUN chmod +x ./dist/index.js

FROM mcr.microsoft.com/playwright:v1.18.1
WORKDIR /app
ENV NODE_ENV=production
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY --from=builder /app/dist ./dist
RUN ln -s /app/dist/index.js /usr/local/bin/foundry-publish

CMD ["foundry-publish"]
