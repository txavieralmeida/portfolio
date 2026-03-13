# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm start            # Serve production build
npm run lint         # ESLint

# Generate static PDF exports (requires build first)
npm run build && node scripts/generate-cv-pdf.mjs
```

## Architecture

Single-page multilingual CV/portfolio. Next.js 16 App Router, client-rendered, statically pre-rendered per locale.

**Request flow:** `src/proxy.ts` (next-intl middleware) → `src/app/[locale]/layout.tsx` (server: messages + metadata) → `src/app/[locale]/page.tsx` (client: `getCvData(locale)` → sections).

**Two separate i18n layers:**
- `src/messages/{locale}.json` — UI strings (labels, headings). Accessed via `useTranslations(namespace)`.
- `src/data/cv-data.{locale}.ts` — CV content (jobs, education, projects). Accessed via `getCvData(locale)`.

Locales: `en` (default, no URL prefix), `pt`, `fr`, `it`, `sv`. Adding a locale requires: `src/i18n/config.ts`, a new `cv-data.{locale}.ts`, a new `messages/{locale}.json`, and an entry in `src/i18n/date-locales.ts`.

**Middleware** is `src/proxy.ts` — Next.js 16 uses this filename via next-intl's `createMiddleware`. Do not rename to `middleware.ts`.

**Static generation** — `generateStaticParams()` lives in `[locale]/layout.tsx` and reads from `src/i18n/config.ts`.

## Key Constraints

**Particle system (`src/components/particles/`):**
- `useEffect` applying theme color/blending to `materialRef` in `particle-scene.tsx` must include `count` in deps — on mount `count=0` so `materialRef.current` is null; without `count`, the material theme never applies.
- `ParticleScene` (Canvas wrapper) must NOT call `useTheme()` — causes re-renders that break WebGL context init. Only the inner `Particles` component may call it.
- Particle portrait is `dynamic(..., { ssr: false })` with a WebGL capability check and `<img>` fallback.

**ESLint rules (non-standard):**
- `react-hooks/set-state-in-effect` — use `useSyncExternalStore` for mounted checks, not `useEffect(() => setState(true), [])`.
- `react-hooks/refs` — never read `.current` during render (JSX, `useMemo`); only in effects, event handlers, and `useFrame`.

**Theming:** `<html suppressHydrationWarning>` is intentional — next-themes injects a pre-hydration script that sets the `dark` class, causing a safe mismatch.

## CVData Shape

Defined in `src/types/cv.ts`, resolved by `getCvData(locale)` in `src/data/cv-data.ts`:

```typescript
{ personal, socials[], experience[], education[], projects[], interests[], skills: Record<string, string[]> }
```

Projects with `featured: true` sort first. Screenshots go in `public/images/projects/`.

## PDF

`/[locale]/cv-print` is a print-optimized HTML page (A4, two-column). The "Download CV" button links here. `scripts/generate-cv-pdf.mjs` uses Puppeteer to render it and write static files to `public/cv*.pdf`. `src/lib/pdf/cv-document.tsx` (@react-pdf/renderer) exists as an alternative but is not actively used.