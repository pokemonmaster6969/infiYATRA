# Phase 0: Repository and Performance Audit

Audit date: 2026-10-23  
Scope: current working tree on `feature/perf-data-admin`; no application code changed during Phase 0.

## Executive Summary

The project is a React/Vite single-page application with Tailwind CSS, React Router, Framer Motion, and an Express API backed by a local JSON file. The public site currently falls back to browser `localStorage` when the API is offline. There is no durable database, protected admin API, or production-ready admin authentication.

The most important performance finding is the public media payload: 50 JPEG/JPG files total approximately 126.75 MB, including several 5-7 MB images. The latest production bundle is 546.56 KB JavaScript (155.38 KB gzip) plus 68.94 KB CSS (11.99 KB gzip). Vite warns that the JavaScript chunk exceeds 500 KB.

The most important delivery/security findings are an unauthenticated admin API, a client-side admin bypass, public access to lead records, stale/uneven package data, and a tax-bill-looking PDF under `public/assets`, which is directly web-accessible. Confirm whether that document is meant to be public before deployment.

## Stack and Structure

| Area | Current implementation |
| --- | --- |
| Frontend | React 18, TypeScript 5.6, Vite 6.4 |
| Routing | React Router DOM 7, client-side routes in `src/App.tsx` |
| Styling | Tailwind CSS 3.4 and global CSS in `src/index.css` |
| Animation | Framer Motion 11; transitions, carousel, and viewport-triggered reveals |
| Icons | Lucide React |
| SEO metadata | `react-helmet-async` on several routes |
| API | Express 5 in `server.js`, proxied by Vite to `localhost:3001` |
| Current persistence | `db.json` plus browser `localStorage`; no managed database |
| Deployment | Vercel SPA rewrite in `vercel.json`; the Express server is not configured as a Vercel function |
| Build | `npm run build` runs `tsc -b && vite build`; no lint or test script is defined |

Main folders: `src/components` (shared shell and home sections), `src/pages` (public, account, and admin routes), `src/lib` (trip data, API fallback, and haptics), `public/assets` (images and other public files), and root-level Express/data/config/report files.

The repository also contains presentation/report-generation artifacts and a legacy `infiland.tsx`; these are not the Vite application entry point. The current entry is `src/main.tsx`.

## Existing Routes and Completeness

| Route or area | State observed |
| --- | --- |
| `/` | Home hero, featured packages, stats, destinations, reasons, testimonials, and planning CTA. Hero rotates automatically. The hero itself has no search input. |
| `/discover` | Search, trip-type/category filters, sort, spotlight, package cards, and loading/empty states. It uses the 20-item TypeScript fallback. |
| `/trip/:id` | Trip information, gallery, itinerary, captain, and WhatsApp booking. Data shape is much smaller than the requested full package schema. |
| `/cruise` | Cruise category listing and static cabin/inclusion content. No cruise-specific data model or separate cruise-detail route. |
| `/customize` | Multi-field inquiry form with quick destinations, client state, JSON API/local fallback, confirmation, and WhatsApp link. It is not a short 3-step flow and has no spam protection or inline validation system. |
| `/corporate` | Hero, static photo gallery/testimonials, and a form saved as a custom-trip record. Most presentation content is hard-coded. |
| `/himachal`, `/bali` | Static destination landing pages and itinerary content. Some booking actions were previously presentation-only; current worktree has WhatsApp links for the primary CTA. |
| `/about`, `/community`, `/wishlist` | Static pages; wishlist has no persistence or saved-package behavior. |
| `/login`, `/dashboard` | Prototype local-storage user login and a static dashboard; no production identity/session backend. |
| `/admin/login`, `/admin/dashboard`, `/admin/hero`, `/admin/edit/:id`, `/admin/new` | Admin UI exists, but access control is not security-enforced and is bypassable. Package and hero editing are supported by unauthenticated API calls. |
| `/backup` | Legacy video concept page. It references `/assets/best.mp4`, which is absent. It is not linked from the main navigation. |

There is no `/packages` alias, `/cruises` listing/detail pair, destinations index, contact, FAQ, terms, privacy, cancellation-policy, or catch-all 404 route. Blog is absent. There is no sitemap, robots file, canonical metadata, JSON-LD, analytics configuration, `.env.example`, or admin `noindex` handling. Several routes have unique title/description metadata, but coverage is incomplete.

## Data and API Findings

- `src/lib/trips.ts` defines 20 typed-but-limited `Trip` entries; the structure does not include slug, separate day/night duration, per-day activities/meals/stays, exclusions, FAQs, policy/SEO fields, or departure records.
- `db.json` contains 9 trips, 5 hero slides, and 0 custom-trip leads. When the API returns a non-empty trips array, `getTrips()` uses those 9 records instead of the 20-item fallback.
- The local app at `http://localhost:5176/` returned HTTP 200. `/api/trips` returned HTTP 503 because the Express process on port 3001 was not running; the browser consequently uses local fallback data.
- Express reads and writes the whole JSON file synchronously. API routes accept trip, hero-slide, and custom-lead reads/writes/deletes without authentication, authorization, schema validation, or rate limiting. `cors()` allows any origin. Lead PII is available through an unauthenticated GET route.
- The Vite proxy targets a localhost Express server. `vercel.json` rewrites non-API paths to `index.html` but does not deploy the Express API.
- Admin login has a prefilled `admin123` password and a one-click login path. Other admin access checks use `sessionStorage`; these are UI gates, not server-side security.
- `src/App.tsx` statically imports the admin dashboard, trip editor, hero editor, and admin login. They are included in the public route graph rather than lazily loaded under `/admin`.

## Performance Baseline

### Lighthouse

| Metric | Result |
| --- | --- |
| Lighthouse mobile Performance / Accessibility / Best Practices / SEO | Not measured: Lighthouse CLI is not installed and no local Chrome/Edge executable is available to the terminal. |
| Lighthouse desktop | Not measured for the same tooling limitation. |
| Slow-3G / CPU-throttled run | Not measured. |

Do not treat the browser-native sample below as a Lighthouse score or a throttled production result.

### Local Browser Sample

Measured using the integrated browser against the local Vite development server at a 390 x 844 CSS-pixel mobile viewport, warm browser/cache, and no network or CPU throttling. The effective document width was 382 CSS pixels because of the browser viewport/s scrollbar.

| Measurement | Observed |
| --- | ---: |
| Navigation response end | 60 ms |
| DOM content loaded | 479 ms |
| Window load event | 884 ms |
| Largest Contentful Paint | 1,152 ms |
| Cumulative Layout Shift | 0.0285 |
| Long tasks observed | 212 ms, 126 ms, 55 ms |
| Horizontal overflow | None at this viewport |
| Resource transfer bytes | Browser reported 0 for all cached/local resources; unusable as a network payload measurement |

These are local development observations, not a representative production score. INP was not measured; long-task duration is not an INP substitute.

### Built Payload and Static Media

| Asset class | Raw size | Gzip size |
| --- | ---: | ---: |
| Main JavaScript chunk | 546.56 KB | 155.38 KB |
| Main CSS | 68.94 KB | 11.99 KB |
| HTML shell | 1.65 KB | 0.79 KB |
| Public JPG/JPEG media | 126.75 MB across 50 files | Not measured |

Public media also includes a 5.69 MB DNG, a 0.31 MB PDF, and a 0.29 MB GLB. Largest image examples include `tree.jpg` (~7.17 MB), `neom-STV2s3FYw7Y-unsplash.jpg` (~6.86 MB), `bali.jpg` (~5.91 MB), and `Ladakh2.jpg` (~5.71 MB). The PDF filename `taxbill1dukan24-25-26.pdf` looks potentially sensitive; all files in `public` are served publicly.

### Root Causes and Risks

1. **Very large source images.** Most local photos are full-size JPEG/JPG, with no generated responsive variants, AVIF/WebP pipeline, or intrinsic dimensions. The current helper optimizes Unsplash URLs only; local assets are returned unchanged.
2. **Large shared JavaScript chunk.** Route components are imported eagerly, including all admin screens. Three.js, React Three Fiber, Drei, and Maath are installed, but no imports/usages were found under `src`; they should be verified and removed if truly unused.
3. **Duplicate and incorrect image/font loading.** `index.html` preloads `/assets/LBK.jpeg`, while the first hero slide is `/assets/beaut.jpg`. The hero additionally preloads its first two slides in Helmet, preloads three in its effect, and preloads the next slide after each index change. Google Fonts are declared in both `index.html` (Inter/Poppins) and `src/index.css` (Lora/Outfit), despite Tailwind using Outfit/Lora. This creates unnecessary font requests and preload warnings.
4. **Large client-rendered page trees.** Every route is a client-side render; no route-level code splitting, SSG/ISR, or server-rendered package pages exist. The package list is small today, but it has no pagination/virtualization contract.
5. **Repeated motion and glass effects.** Framer Motion is used across most public sections and admin pages. `liquid-glass` and `liquid-glass-dark` apply backdrop filters, and several sections add blur filters. This is costly when many visible surfaces overlap on mid-range mobile GPUs. The global reduced-motion media rule exists in the current worktree, but image and route performance remain unaddressed.
6. **Service worker caching.** `public/sw.js` uses a cache-first strategy for every request and caches only the shell/manifest. There is no explicit cache version migration or stale-content strategy for updates.
7. **Development server console issue.** `vite.config.ts` fixes the HMR client port to 443 while the app is served on ports 5173-5176. The integrated browser reported a failed WebSocket connection to `localhost:443`; this is a development configuration error, separate from production rendering.
8. **Missing local resources.** `/assets/best.mp4` in the legacy page and `/vite.svg` as the declared favicon are absent from `public`.
9. **Weak production observability and SEO.** No Lighthouse baseline, analytics configuration, sitemap, robots, canonical/structured data, or performance budget is present. Some numeric social-proof values/testimonials are hard-coded and should be confirmed as real or labeled sample data.

## Verification Performed

- `npm run build`: passed TypeScript and Vite production build; Vite emitted the >500 KB chunk warning.
- Integrated browser: local app returned HTTP 200; 390 px mobile sample had no horizontal overflow; the local API proxy returned 503 while Express was offline.
- Source asset reference scan: 63 local `/assets` references were checked; the only missing referenced media file was `/assets/best.mp4`. `/vite.svg` is separately missing from the static head reference.
- All 20 package fallback records and 9 JSON API records were counted.
- No Lighthouse CLI or local Chrome/Edge executable was available, so Lighthouse, throttling, cross-browser, and full target-width matrices remain unverified.

## Fix Priority

1. Remove the default admin bypass and protect every mutation/read of lead data; move records to the selected managed database with row-level policies before exposing the admin panel.
2. Resolve the public tax-bill-looking PDF immediately; verify ownership/permission for every image and testimonial before release.
3. Convert and resize image assets, establish responsive image dimensions/variants, and correct hero preloads. Do not eagerly fetch all carousel images.
4. Lazy-load route modules, starting with admin, and confirm/remove unused 3D dependencies; split heavy editors and animation code.
5. Establish a single self-hosted or consistently loaded font strategy, fix favicon/HMR configuration, and review service-worker cache invalidation.
6. Define and validate the richer package/cruise/content/lead schema; reconcile the 20 TypeScript packages and 9 JSON records.
7. Complete the brief's missing routes, forms, SEO/indexing behavior, and end-to-end admin CRUD/lead workflows after the secure data architecture is in place.
8. Repeat Lighthouse on a production build with mobile throttling, then validate 320, 375, 768, 1024, 1440, and 1920 px plus at least Chrome, Safari, and Firefox.