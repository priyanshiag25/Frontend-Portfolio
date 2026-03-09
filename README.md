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

## Free hosting on GitHub Pages

This repo is configured for automatic GitHub Pages deployment using Actions.

1. Push this project to your GitHub repo's `main` branch.
2. In GitHub repo settings, open `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. The workflow `.github/workflows/deploy-gh-pages.yml` will publish the site.

Expected URL:

- `https://priyanshiag25.github.io/Frontend-Portfolio/`
