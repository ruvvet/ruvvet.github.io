# ruvvet.com

Personal portfolio for Jenny Feng — Vite + React 19 + TypeScript + Tailwind v4 + framer-motion.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in VITE_WEB3FORMS_KEY
npm run dev
```

The dev server runs on http://localhost:5173.

## Build

```bash
npm run build      # type-check + Vite build → dist/
npm run preview    # serve the production build locally
```

## Editing content

All content lives in `src/content/` as typed modules:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, bio, social links, info grid, hero typed phrases |
| `nav.ts` | Sidebar navigation items |
| `skills.ts` | Skill groups + items |
| `resume.ts` | Experience, education, projects |
| `portfolio.ts` | Portfolio items + filters |

Adding a project = one entry. No HTML, no editing components.

## Theming

`src/index.css` defines CSS variables for both `[data-theme="light"]` and `[data-theme="dark"]`. The theme toggle in the sidebar persists to `localStorage`. Initial theme is bootstrapped inline in `index.html` to avoid a flash on load.

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com) (free, no signup, just enter your email and grab a key). Set `VITE_WEB3FORMS_KEY` in `.env.local` for local dev and as a GitHub Actions secret for production builds.

## Deployment

`.github/workflows/deploy.yml` deploys to GitHub Pages via the modern `actions/deploy-pages@v4` flow on every push to `main`. To activate:

1. Move this `app/` content to the root of `ruvvet/ruvvet.github.io` (the existing repo is at `../ruvvet.github.io`).
2. In repo settings → Pages, set Source = **GitHub Actions**.
3. Repo settings → Secrets → Actions: add `VITE_WEB3FORMS_KEY`.
4. Push to `main`. The action builds and deploys automatically.

The `public/CNAME` file preserves the `ruvvet.com` custom domain.

## Updating resume content

The on-page resume is sourced from `C:\Users\Jenny\Documents\jenny_feng_resume.md`. When that file changes, sync `src/content/resume.ts`, `skills.ts`, and `profile.ts` to match.
