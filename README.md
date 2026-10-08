# Portfolio

Personal portfolio built with Next.js 14 (App Router) and Tailwind CSS.

## Edit your content
- `src/lib/projects.js` — projects and skills (one place for all content)
- `src/lib/siteConfig.js` — name, role, description
- `.env.local` — copy `.env.example`; set site URL and contact email

## Add your images
Every image slot renders a blank placeholder until a path is set.
- `src/lib/siteConfig.js`: `IMAGES.hero` and `IMAGES.about`
- `src/lib/projects.js`: `image` and `gallery` per project, `image` per service, `avatar` per testimonial
- Put files in `public/images` and use paths like `/images/projects/cleansera.jpg`

## Run
```
npm install
npm run dev
npm run build
```
Deploys as-is to Vercel, Render or Netlify.
# portfolio
