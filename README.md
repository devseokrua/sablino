# Садиба «Саблінська»

Адаптивний сайт-візитка заміської садиби.  
Мета — показати будинки, альтанки, умови проживання, галерею та контакти.

Проєкт не є booking engine: без онлайн-бронювання, кабінету та оплати.

## Features

- головна сторінка: Hero, About, Houses, Gallery, CTA, Contacts
- детальні сторінки будинків та альтанок
- сторінка “Умови проживання”
- sticky CTA для швидкого контакту
- light/dark theme
- styled loading та 404
- SEO metadata, `robots.txt`, `sitemap.xml`
- контент у JSON-файлах

## Tech Stack

- Next.js App Router
- React
- TypeScript
- CSS Modules
- JSON data files
- Vercel

## Installation

```sh
npm install
cp .env.example .env.local
npm run dev
```

Відкрити:

```txt
http://localhost:3000
```

## Environment

```env
NEXT_PUBLIC_SITE_URL=https://sablino.vercel.app
```

Для локальної розробки:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Routes

```txt
/
/conditions
/houses/gulyai-hata
/houses/hnizdechko
/houses/plyazhna-1
/houses/plyazhna-2
/houses/soniachna
/houses/tykha
/houses/altanka-velyka
/houses/altanky-mali
/robots.txt
/sitemap.xml
```

## Project Structure

```txt
src/
├── app/
│   ├── conditions/
│   ├── houses/[slug]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   └── theme/
├── config/
├── data/
├── types/
└── utils/
```

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

Deploy: Vercel.  
Перед деплоєм додати `NEXT_PUBLIC_SITE_URL` у Vercel Environment Variables.

## Note

Основний сценарій сайту — ознайомлення з садибою та швидкий контакт через дзвінок або контактну секцію.
