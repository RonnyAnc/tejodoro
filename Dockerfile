FROM node:16.3.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production app
FROM node:16.3.0-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "run", "start"]