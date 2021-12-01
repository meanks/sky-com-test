FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm run build
COPY . .
FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app .
ENV PORT=5000 NODE_ENV='production'
CMD ["npm", "start"]