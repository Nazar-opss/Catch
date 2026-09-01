# Етап 1:
# Встановлення залежностей
FROM node:20-alpine AS deps
WORKDIR /app

# Копієм файли, які необхідні для встановлення пакетів
COPY package.json package-lock.json ./
RUN npm install

# Етап 2:
FROM node:20-alpine AS builder
WORKDIR /app
# Копіюєм папку node_modules з попереднього етапу
COPY --from=deps /app/node_modules ./node_modules

# Копієм весь код у контейенр
COPY . .

# Запускаєм компіляцію проекту
RUN npm run build

# Етап 3:
FROM node:20-alpine AS runner
WORKDIR /app

# Встановлюєм змінну середовища для продакшену
ENV NODE_ENV=production

# Копіюєм публічні файли
COPY --from=builder /app/public ./public

# Копіюєм standalone-папку та статику
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node

EXPOSE 3000
CMD ["node", "server.js"]