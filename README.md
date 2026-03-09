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

## How to Update and Deploy Your Site

Whenever you make changes to your code and want to see them live on your website, follow these simple steps using your terminal:

1. **Stage your changes:**
   Tell Git to track all the modified files:
   ```bash
   git add .
   ```

2. **Commit your changes:**
   Save your files to your local repository with a clear message describing what you changed:
   ```bash
   git commit -m "Describe your changes here, e.g., Updated contact info"
   ```

3. **Push to GitHub:**
   Upload your saved changes to the `main` branch on GitHub:
   ```bash
   git push
   ```
   *(Note: Whenever it asks for your password, always paste your **Personal Access Token** instead of your GitHub account password).*

**That's it!** 🎉 
Because we have set up GitHub Actions, pushing to the `main` branch will *automatically* trigger a new build and deployment process. 

### Monitor Your Deployment
Want to watch it happen? 
1. Open your repository on GitHub.
2. Click on the **Actions** tab at the top.
3. You will see a new workflow running. Once it turns green, your site is updated on the live URL!

**Live URL:** [https://priyanshiag25.github.io/Frontend-Portfolio/](https://priyanshiag25.github.io/Frontend-Portfolio/)
