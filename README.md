# Fund Management System Demo

A static React + TypeScript demo for GitHub Pages. Displayed employees and reference records are fictional. No API, database, keys, or company sign-in is required.

## Run locally

Requires Node.js 22.12+ and npm. Run **npm ci**, then **npm run dev**.

Select a demo user and sign in with **password123** (already filled in). Explore requestor, department head, accounting, cashier, custodian, or admin. Changes stay in memory while switching users through Logout; refresh to restore sample data. Each visitor has an independent session.

The demo includes cash advance liquidation, transfers, reviews, cashier returns, petty cash requests, and sample reference dropdowns. Admin editing and accounting report exports remain backend-only. Sample attachment filenames illustrate records; they are not downloadable documents.

## Publish on GitHub Pages

1. Create a repository and add these files, including the hidden **.github** directory. Exclude node_modules, dist, logs, local environment files, and the database directory (.gitignore handles this when using Git).
2. Push to **main** or **master**.
3. Open **Settings > Pages**, then choose **GitHub Actions** as the build source.
4. Open **Actions > Deploy demo to GitHub Pages** and run it if the first push happened before Pages was enabled.
5. Open the deployment URL shown by the workflow or Pages settings.

The workflow installs dependencies, builds dist, and deploys it. Relative assets support any repository name and custom domains. Hash routing (for example, /repository/#/dashboard) supports direct links and refreshes on static hosting.

To check the production build locally, run **npm run build**, then **npm run preview**.

Deployment setup follows [Vite's GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages).
