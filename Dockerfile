FROM node:18-alpine as production-dependencies
WORKDIR /app
COPY package.json package.json
RUN npm install --production

FROM node:18-alpine as build-dependencies
WORKDIR /app
COPY package.json package.json
RUN npm install --production

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=build-dependencies /app/node_modules node_modules
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=production-dependencies /app .
COPY --from=builder /app/dist /app/dist
CMD [ "node", "dist/index.js" ]
