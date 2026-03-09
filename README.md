# Priyanshi Agarwal Portfolio (Next.js)

Production-ready portfolio built with React and Next.js (App Router).

## Tech stack

- Next.js
- React
- CSS (global styles)

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Build for production

```bash
npm run build
npm run start
```

## Project structure

- `app/layout.js`: Root layout and metadata
- `app/page.js`: Portfolio page content and interactions
- `app/globals.css`: Global styles and responsive behavior
- `app/robots.js`: Robots directives
- `app/sitemap.js`: Sitemap entries

Optional for production metadata:

- `NEXT_PUBLIC_SITE_URL`: your deployed site URL (for sitemap/robots links)

## Deploy

Deploy directly to Vercel:

```bash
npx vercel --prod
```
