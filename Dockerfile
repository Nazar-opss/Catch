# Етап 1:
# Встановлення залежностей
FROM node:20-alpine AS deps
WORKDIR /app

# Копієм файли, які необхідні для встановлення пакетів
COPY package.json package-lock.json ./
RUN npm ci

# Етап 2:
FROM node:20-alpine AS builder
WORKDIR /app
# Копіюєм папку node_modules з попереднього етапу
COPY --from=deps /app/node_modules ./node_modules

# Копієм весь код у контейенр
COPY . .

# Експортуємо змінні тільки на час виконання цієї команди
RUN export DATABASE_URL="postgresql://fake:fake@localhost:5432/fake" && \
    export RESEND_API_KEY="re_fake123456789" && \
    export BETTER_AUTH_SECRET="fake_secret_for_build_123456789" && \
    export BETTER_AUTH_URL="http://localhost:3000" && \
    export NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dp7fjjb6i" && \
    npx prisma generate && npm run build

# Етап 3:
FROM node:20-alpine AS runner
WORKDIR /app

# Встановлюєм змінну середовища для продакшену
ENV NODE_ENV=production

# Копіюєм публічні файли
COPY --from=builder --chown=node:node /app/public ./public

# Копіюєм standalone-папку та статику
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000
CMD ["node", "server.js"]