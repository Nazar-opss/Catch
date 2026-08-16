# Catch

**Catch** — пет-проєкт спільноти вигідних пропозицій в Україні. Користувачі можуть знаходити, публікувати та оцінювати знижки, щоб найкращі пропозиції ставали помітнішими для всіх.

**Live Demo:** [catch-brown.vercel.app](https://catch-brown.vercel.app/)

## Можливості

- Стрічка знижок із сортуванням за популярністю, новизною та кількістю обговорень.
- Пошук за назвою й описом пропозиції.
- Фільтрація за категоріями.
- Створення, редагування та видалення знижок.
- Завантаження до 5 зображень у форматах JPEG, PNG або WebP.
- Голосування за/проти та «температура» пропозиції.
- Коментарі з відповідями та голосуванням.
- Збереження пропозицій у профіль.
- Профілі користувачів і налаштування акаунта.
- Реєстрація через email/password та Google OAuth.
- Підтвердження email, відновлення пароля, зміна email і видалення акаунта.
- Світла й темна теми.
- Адмін-панель для керування користувачами та пропозиціями.

## Технології

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui
- **State & Data Fetching:** TanStack Query, TanStack Table
- **Forms & Validation:** Zod, React Hook Form
- **Backend & Database:** PostgreSQL (Neon), Prisma ORM, Kysely (для SQL-запитів)
- **Auth & Services:** Better Auth (OAuth), Cloudinary, Resend

## Попередній перегляд

### Головна сторінка
![Головна сторінка](./public/screenshots/catch_main.png)

### Темна тема
![Темна тема](./public/screenshots/catch_main_dark.png)

### Адаптивна версія
![Мобільна версія](./public/screenshots/catch_mobile.png)

### Форма додавання знижок
![Форма додавання знижок](./public/screenshots/catch_addDeal.png)
![Форма додавання знижок мобільна версія](./public/screenshots/catch_addDeal_mobile.png)

### Сторінка знижки
![Сторінка знижки](./public/screenshots/catch_deal.png)
![Сторінка знижки темна тема](./public/screenshots/catch_deal_dark.png)

## Швидкий старт

### 1. Клонуйте репозиторій

```bash
git clone <URL_репозиторію>
cd catch
```

### 2. Встановіть залежності

```bash
npm install
```

### 3. Налаштуйте змінні середовища

Створіть `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

На Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Заповніть значення у `.env`:

```env
# Authentication
BETTER_AUTH_API_KEY=your_better_auth_api_key
BETTER_AUTH_SECRET=your_better_auth_secret

# OAuth (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Database (Neon/Postgres)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Email (Resend)
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> Для локальної розробки достатньо PostgreSQL. Для production зручно використати Neon.

### 4. Застосуйте міграції та згенеруйте Prisma Client

```bash
npx prisma migrate deploy
npx prisma generate
```

Для створення нової локальної міграції:

```bash
npx prisma migrate dev --name <migration_name>
```

### 5. Запустіть застосунок

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Доступні команди

```bash
npm run dev      # запуск development-сервера
npm run build    # генерація Prisma Client і production-збірка
npm run start    # запуск production-збірки
npm run lint     # перевірка ESLint
```

## API

### `GET /api/deals`

Повертає сторінку пропозицій із cursor-пагінацією.

Підтримувані query-параметри:

| Параметр | Опис |
| --- | --- |
| `q` | Пошуковий запит за назвою та описом |
| `category` | Категорія або `all` |
| `sort` | `hot`, `new` або `discussed` |
| `cursor` | Курсор для наступної сторінки |
| `limit` | Кількість записів, максимум `50` |

Приклад:

```http
GET /api/deals?category=electronics&sort=hot&limit=8
```

Відповідь:

```json
{
  "items": [],
  "nextCursor": "eyJ2IjoxMDAsImlkIjoiLi4uIn0"
}
```

## Категорії

`electronics`, `food`, `clothing`, `home`, `gaming`, `auto`, `beauty`, `sports`, `software`, `kids`, `pets`, `books`, `travel`, `other`.

## Структура проєкту

```text
app/             # маршрути, сторінки та API Next.js
components/      # UI, форми, картки, фільтри та адмін-компоненти
lib/             # server actions, auth, схеми валідації, утиліти
prisma/          # Prisma schema, міграції та Kysely-типи
server/db/       # підключення до PostgreSQL через Kysely
public/          # статичні зображення та іконки магазинів
```

## Безпека

- Не додавайте `.env` до репозиторію.
- Для production встановіть надійний `BETTER_AUTH_SECRET`.
- Налаштуйте дозволені redirect URI у Google OAuth.
- Для листів з власного домену верифікуйте домен у Resend.
- Обмеження на завантаження: до 5 зображень, максимум 5 МБ кожне.

## Статус

Проєкт створено як пет-проєкт і він активно розвивається. Ідеї, баг-репорти та pull request’и вітаються.

## Ліцензія

Цей проєкт створений для портфоліо. Будь ласка, не копіюйте та не використовуйте код без дозволу автора.