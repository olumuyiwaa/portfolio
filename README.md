# Portfolio

Personal portfolio built with Next.js 14 (App Router) and Tailwind CSS.

## Edit your content
- `src/lib/projects.js` — projects and skills (one place for all content)
- `src/lib/siteConfig.js` — name, role, description
- `.env.local` — copy `.env.example`; set site URL and contact email

## Add your images
Until a path is set, project cards show a tinted cover with the project's initials, services show a line icon (the home page no longer uses service images), and the hero and about portraits are hidden (the hero shows a stack panel instead).
- `src/lib/siteConfig.js`: `IMAGES.hero` and `IMAGES.about`
- `src/lib/projects.js`: `image` and `gallery` per project, `image` per service, `avatar` per testimonial
- Put files in `public/images` and use paths like `/images/projects/cleansera.jpg`

## Contact form
The form posts to `/api/contact`, which emails you through [Resend](https://resend.com). Set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) in `.env.local` or your host's environment. With no key it falls back to opening the visitor's mail app.

## Run
```
npm install
npm run dev
npm run build
npm run lint
```
Deploys as-is to Vercel, Render or Netlify.
# portfolio

## Private site activity dashboard

`/insights` shows visitors, page views, top pages, referrers, countries, devices,
outbound clicks and live activity. It is not linked anywhere, is excluded from the
sitemap, sends `noindex` headers and sits behind a password.

Setup (Netlify: Site configuration, Environment variables, then redeploy):

- `MONGODB_URI`: your MongoDB connection string. On Atlas, allow network access from
  anywhere (0.0.0.0/0), since Netlify functions have no fixed IP.
- `ANALYTICS_PASSWORD`: the password for the page.
- `ANALYTICS_SECRET` (optional): a long random string.
- `MONGODB_DB` (optional): defaults to `portfolio`.

How it works: a small client component posts page views and outbound clicks to
`/api/track`, which stores them in the `events` collection. No cookies and no IP
addresses are stored; a visitor is an anonymous daily hash, and events expire after
400 days. Country comes from Netlify's geo header. Open `/insights` once in each
browser you use to exclude your own visits (a toggle at the bottom reverses it).
Tracking only runs in production builds.
