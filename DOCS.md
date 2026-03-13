# Portfolio — LLM Reference

## Commands
```bash
npm run dev / build / start / lint
node scripts/generate-cv-pdf.mjs   # requires `npm run build` first; outputs public/cv*.pdf
```

---

## Architecture

Request flow: `proxy.ts` (middleware) → `[locale]/layout.tsx` (server: load messages, metadata) → `[locale]/page.tsx` (client: `getCvData(locale)` → render sections).

**Two i18n layers — keep them separate:**
| Layer | Files | Contains |
|---|---|---|
| UI strings | `src/messages/{locale}.json` | Labels, headings, aria text |
| CV content | `src/data/cv-data.{locale}.ts` | Jobs, education, projects, bio |

**Namespaces** in messages: `metadata` `navbar` `hero` `about` `timeline` `projects` `footer` `theme` `language` `pdf`

---

## CVData shape (`src/types/cv.ts`)

```typescript
CVData {
  personal:   { name, title, bio, email, phone, location, profileImage, website }
  socials:    { platform, url, label }[]
  experience: { role, company, dateStart, dateEnd, responsibilities[], technologies[], logo }[]
  education:  { degree, institution, field, dateStart, dateEnd, description, logo }[]
  projects:   { title, description, image, technologies[], liveUrl?, repoUrl?, featured }[]
  interests:  { icon, title, description }[]
  skills:     Record<string, string[]>   // category → items
}
```

`getCvData(locale)` in `src/data/cv-data.ts` resolves locale → correct file.

---

## Adding Content

**New project:** add to `projects[]` in every `cv-data.{locale}.ts`; place image in `public/images/projects/`. Set `featured: true` to sort first.

**New locale:**
1. `src/i18n/config.ts` → add to `locales` array
2. Create `src/data/cv-data.{locale}.ts`
3. Create `src/messages/{locale}.json`
4. Add entry to `src/i18n/date-locales.ts`
5. Add locale label to `language` namespace in all existing message files

**Particle portrait images** (`public/images/halftone *.png`):
- `halftone dark.png` — black bg, bright dots
- `halftone light.png` — white bg, dark dots
- ~400×450 px; tune `threshold` (30) and `step` (2) in `use-portrait-particles.ts`

**App version in footer:** bump `version` in `package.json` — `NEXT_PUBLIC_APP_VERSION` is injected by `next.config.ts`.

---

## Constraints & Gotchas

**`proxy.ts` not `middleware.ts`** — Next.js 16 middleware entry point is `src/proxy.ts` via `createMiddleware` from next-intl. Do not rename.

**Particle theme effect: `count` must be a dep** — In `particle-scene.tsx`, the `useEffect` applying theme color/blending to `materialRef` needs `count` in deps. On mount, `count=0` so `materialRef.current` is null; the effect must re-run when particles load. Without it, material theme is never applied.

**`ParticleScene` must NOT call `useTheme()`** — Only the inner `Particles` component calls `useTheme()`. Calling it on the Canvas wrapper causes re-renders that interfere with WebGL context initialization.

**WebGL + SSR** — Particle portrait uses `dynamic(..., { ssr: false })` and checks WebGL availability at mount. Falls back to a plain `<img>`.

**ESLint: no `setState` in mount effect** — `react-hooks/set-state-in-effect` is active. Use `useSyncExternalStore` for mounted checks, not `useEffect(() => setState(true), [])`.

**ESLint: no ref reads during render** — `react-hooks/refs` is active. Never read `.current` in JSX, `useMemo`, or render body. Only in `useEffect`, event handlers, and `useFrame`.

**`<html suppressHydrationWarning>`** — next-themes injects a blocking script that sets the `dark` class before React hydrates; the mismatch is intentional and safe to suppress.

**`generateStaticParams()` is in `[locale]/layout.tsx`** (not page.tsx). It reads from `src/i18n/config.ts`, so adding a locale there auto-includes it in static generation.

**PDF generation** — Puppeteer renders `/[locale]/cv-print` at A4 (794×1123 px), first page only. The `cv-print` page is a static HTML layout; `@react-pdf/renderer` (`src/lib/pdf/cv-document.tsx`) exists as an alternative but is not actively used.

**Particle shader uniforms:**
| Uniform | Value |
|---|---|
| `uScale` | `viewport.width * 0.40` |
| `uDensity` | `viewport.factor` (px/world-unit) |
| `uScroll` | scroll progress 0→1 over hero height |
| `uMouse` | world-space cursor position |
| `uColor` | `#bbbbbb` dark / `#000000` light |

Blending: additive (dark mode glow) / normal (light mode opaque).