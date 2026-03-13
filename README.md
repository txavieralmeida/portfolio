# Tiago Almeida — Portfolio

Personal portfolio and interactive CV. Built with Next.js 16 App Router, fully multilingual (EN / PT / FR / IT / SV), with a WebGL particle portrait, dark/light theme, and a print-optimised PDF CV.

Live at: **https://tiago-almeida.dev** (set `NEXT_PUBLIC_SITE_URL` to your domain)

---

## Stack

| Layer      | Choice                               |
| ---------- | ------------------------------------ |
| Framework  | Next.js 16 (App Router, Turbopack)   |
| Styling    | Tailwind CSS v4 + shadcn/ui          |
| Animation  | motion/react (Framer Motion v11)     |
| 3D / WebGL | three.js + @react-three/fiber v9     |
| i18n       | next-intl v4                         |
| Theme      | next-themes                          |
| PDF        | Puppeteer (screenshot of `/cv-print`) |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Set your production URL in `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## Commands

```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build
npm start          # Serve production build
npm run lint       # ESLint

# Generate static PDF CVs (requires a running build)
npm run build && node scripts/generate-cv-pdf.mjs
```

---

## Project Structure

```
src/
  app/
    [locale]/
      layout.tsx        # Per-locale metadata, ThemeProvider, NextIntlClientProvider
      page.tsx          # Main CV page (client component)
      cv-print/         # Print-optimised A4 CV layout
    robots.ts           # robots.txt (generated)
    sitemap.ts          # sitemap.xml (generated)
  components/
    layout/             # Navbar, LanguageSwitcher, ThemeToggle
    sections/           # Hero, About, Timeline, Projects, Footer
    particles/          # WebGL particle portrait (R3F)
  data/
    cv-data.{en,pt,fr,it,sv}.ts   # Per-locale CV content
  messages/
    {en,pt,fr,it,sv}.json         # UI strings
  i18n/                 # next-intl config, routing, date locales
  types/cv.ts           # CVData type
scripts/
  generate-cv-pdf.mjs   # Puppeteer PDF generator
public/
  images/               # Profile photo, project screenshots, logos
  cv*.pdf               # Generated PDF CVs
```

---

## Adding a Locale

1. Add the locale code to `src/i18n/config.ts`
2. Create `src/data/cv-data.{locale}.ts`
3. Create `src/messages/{locale}.json`
4. Add an entry in `src/i18n/date-locales.ts`

---

## SEO

- Per-locale `<title>`, `<meta description>`, Open Graph and Twitter Card tags — see `src/app/[locale]/layout.tsx`
- `hreflang` alternate links for all locales
- `sitemap.xml` auto-generated at `/sitemap.xml`
- `robots.txt` auto-generated at `/robots.txt`

---

## PDF CV

The "Download CV" button links to `/{locale}/cv-print`, a print-optimised HTML page styled for A4.
Run `node scripts/generate-cv-pdf.mjs` after a build to produce static `public/cv*.pdf` files.

---

## License

Personal portfolio — not for redistribution.