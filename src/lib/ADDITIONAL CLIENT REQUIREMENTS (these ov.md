ADDITIONAL CLIENT REQUIREMENTS (these override or extend the earlier phases where they conflict)

The client's brief, verbatim:
- "Explore all packages"
- "Cruise"
- "Customize trips: add destination, form filling, dates, people etc. Short and simple"
- "Corporate tours: testimonials, photos"
- "Admin panel: most important. Change of tours, dates, showcasing, photos etc."

The admin panel is the TOP PRIORITY deliverable. The public site must now be data-driven from a real database, not static files. The one-package-per-destination JSON from Phase 2 becomes the SEED DATA for the database.

## A. Architecture decision (make this in Phase 0 and log it in NOTES.md)
Introduce a backend so the client can manage content without a developer. Pick the simplest option that fits the existing stack:
 - Option 1 (preferred if the site is Next.js): Next.js App Router + PostgreSQL (Supabase or Neon) + Prisma + Supabase Auth or Auth.js + Supabase Storage/Cloudinary for images.
 - Option 2 (if the site is plain React/Vite): Supabase directly (Postgres + Auth + Storage + Row Level Security).
Requirements: public pages must stay FAST, so use static generation with on-demand revalidation (revalidate the affected pages whenever the admin saves a change), cache aggressively, and never expose admin code or keys to public bundles. Admin code must be code-split and loaded only on /admin routes.

## B. New public sections

1. "Explore All Packages" page (/packages)
   - Single page listing every package (holiday, cruise, corporate-friendly, etc.) with tabs or chips: All, Domestic, International, Honeymoon, Family, Adventure, Cruise, Corporate
   - Filters: destination, budget range, duration, travel month, category; sort by price/duration/popularity; text search with debounce
   - Fast card grid with skeleton loading and lazy images; URL-synced filters so results are shareable
   - Compact, simple cards: image, title, duration, "from" price, 2 highlight tags, CTA

2. Cruise section (/cruises and /cruises/[slug])
   - Data model: title, cruise line (use generic/own wording), ship name, route/ports of call, duration, embarkation/disembarkation port, departure dates (multiple, with per-date price and seats left), cabin types (interior, ocean view, balcony, suite) with price each, itinerary by day (port, arrival/departure time, shore excursion ideas), onboard amenities, inclusions/exclusions, gallery, FAQs
   - Seed at least 5 cruises with realistic routes (e.g., Mumbai-Goa-Kochi-Lakshadweep, Singapore-Phuket-Penang, Mediterranean, Dubai-Abu Dhabi-Doha, Alaska or Norway fjords). Rewrite all content in original wording, same research and copyright rules as before.
   - Cruise detail page: gallery, cabin selector with price, departure date picker, itinerary timeline, enquiry/booking card

3. Customize Your Trip (/customize) — "Short and simple"
   - A clean 3-step form (progress bar, no page reloads, big touch-friendly inputs, saves progress in state):
     Step 1 – Where & when: destinations (multi-select with search, can add custom text for "other"), travel start date, flexible dates toggle, trip length (nights)
     Step 2 – Who & what: number of adults, children (with age fields), rooms, budget per person (slider or ranges), hotel category (3/4/5-star), interests (chips: beaches, adventure, culture, food, shopping, wellness...), optional notes
     Step 3 – Contact: name, phone (with country code), email, preferred contact method/time
   - Validation with clear inline errors (Zod + react-hook-form or equivalent), spam protection, success screen with a summary and "our expert will call you within X hours"
   - Entry points: nav button, home page CTA, and "Customize this package" button on every package page that pre-fills the form
   - On submit: store in the database as a Lead (type: custom_trip), email the admin, show in the admin Leads inbox, and offer a WhatsApp deep link with the summary prefilled

4. Corporate Tours (/corporate)
   - Sections: hero, services (MICE, incentive trips, team outings/offsites, conferences, destination weddings if relevant), why choose us, process steps, 3-4 sample corporate packages, photo gallery (masonry, lazy-loaded, lightbox), client testimonials carousel (name, designation, company, quote, photo, rating), client logos strip (only with permission; use placeholders), FAQ
   - Corporate enquiry form: company name, contact person, designation, team size, preferred destination, dates, budget, requirements
   - Testimonials and photos must be editable from the admin panel

5. Keep the home page short and simple: hero with search, quick-access tiles for Packages / Cruises / Customize Trip / Corporate Tours, featured packages (admin-controlled), testimonials, CTA.

## C. ADMIN PANEL (most important). Build it fully, not as a stub.

Route: /admin (protected, noindex, separate layout, code-split).

Auth and security
- Secure email + password login (plus optional magic link); sessions via httpOnly cookies; password reset
- Roles: Super Admin (everything, manages users), Editor (content only), Viewer/Sales (leads only)
- Route and API protection on the server side (never rely on hiding UI), rate-limited login, CSRF protection, input validation on every mutation, sanitized rich text, secure file uploads (type and size limits)
- Audit log: who changed what and when (package edits, deletions, publish/unpublish)

Dashboard
- KPI cards: total packages, active vs draft, upcoming departures, new leads (today/7 days/30 days), lead conversion statuses
- Recent leads, quick actions ("Add package", "Add departure date", "Upload photos"), and a simple lead chart

Packages manager (CRUD)
- Table with search, filters (status, destination, category), sort, bulk actions (publish, unpublish, feature, delete), duplicate package, pagination
- Create/edit form with tabs: Basic info (title, slug auto-generated and editable, destination, category, duration, short and long description), Pricing (base price, currency, per-person rules, discounts or offer badge, offer validity), Itinerary builder (add, remove, drag-to-reorder days; each day has title, description, activities, meals, stay), Inclusions/Exclusions (tag-style list editors), Hotels, FAQs, Policies, SEO (meta title and description, preview), Media (see below)
- Status: Draft / Published / Archived; "Featured on home page" toggle and "Popular", "Trending", "Best seller" badges; display order control
- Autosave drafts, unsaved-changes warning, and validation errors shown inline
- Live preview button that opens the public page in preview mode

Dates and departures manager
- For each package and cruise: add, edit, delete departure dates with price override, seats total/available, status (open, filling fast, sold out, cancelled)
- Calendar view and list view, bulk-add recurring departures (e.g., every Friday for 3 months)
- Public pages must show only upcoming, open dates, and automatically hide past dates

Media manager
- Drag-and-drop multi-image upload with progress, auto-compression and conversion to WebP/AVIF, automatic responsive sizes, alt-text field (required), caption, reorder gallery by drag, set cover image, delete with confirmation
- Central media library with search, reuse across packages, and usage tracking
- Video: support YouTube/Vimeo URL embeds (lazy-loaded)

Other content managers (all with CRUD, draft/publish, reorder where relevant)
- Destinations (name, hero image, description, popular flag, display order)
- Cruises (full model above, with cabins and departures)
- Corporate: testimonials, gallery photos, sample corporate packages, client logos
- Customer testimonials (for the home page)
- Home page showcase: choose and order featured packages, destinations, banners/hero slides, and offers
- Banners and promotions (title, image, link, start/end dates)
- Blog (only if the site already has one)
- Site settings: company name, logo, phone, WhatsApp number, email, address, social links, footer text, SEO defaults, and policy pages editor (Terms, Privacy, Cancellation) with a rich text editor

Leads and enquiries inbox
- Unified list for: package enquiries, cruise enquiries, custom trip requests, corporate enquiries, contact form and callback requests
- Filters by type, status, date range, destination; search; detail drawer showing all submitted fields
- Status pipeline (New, Contacted, Quote sent, Confirmed, Lost), assignee, internal notes, follow-up date
- Export to CSV; email notification to admin on every new lead

Admin UX
- Modern, clean UI (sidebar nav, breadcrumbs, responsive down to tablet/mobile), consistent with the public brand colors, dark mode optional
- Toast notifications, confirmation dialogs for destructive actions, loading and empty states, keyboard-friendly forms
- Optimistic updates where safe, and on save trigger revalidation of the affected public pages so changes appear on the live site within seconds
- Fast: paginate server-side, no giant payloads, lazy-load editors and charts

Data model (adapt to the chosen ORM; include migrations and a seed script)
Package, PackageDay, Departure, Destination, Cruise, CruiseCabin, CruiseDeparture, MediaAsset, Testimonial, CorporateGalleryItem, Banner, Lead, LeadNote, SiteSetting, User, AuditLog. Add proper indexes (slug, status, destination, departure date) and foreign keys.

## D. Updated phase order
Phase 0 Audit and architecture → Phase 1 Performance refactor → Phase 2 Database + seed data (packages, cruises, corporate content) → Phase 3 Admin panel (auth, then packages, dates, media, then the other managers, then leads) → Phase 4 Public pages wired to the database (Explore All Packages, Cruises, Customize Trip, Corporate, package details) → Phase 5 QA, performance re-audit, security checklist, docs.

## E. Extra acceptance criteria
- A non-technical client can, without touching code: add a new package with photos, edit an itinerary, change prices, add or remove departure dates, feature a package on the home page, add a testimonial, upload corporate photos, and read and manage leads. Verify each of these by actually performing it and recording the steps in ADMIN_GUIDE.md (with screenshots if possible).
- Changes made in the admin appear on the public site within a few seconds, without redeploying.
- Public pages keep Lighthouse mobile Performance at 90+ even though they are now data-driven.
- Security checklist completed: no secrets in the repo, RLS or server-side authorization on all admin mutations, upload validation, rate limiting on forms and login, and a seed admin account whose password must be changed on first login.
- Provide .env.example, a one-command local setup (install, migrate, seed, run), and deployment steps for Vercel plus a managed Postgres.
- Final summary must list: what is done, what needs client content (real photos, prices, policies, testimonials, logos with permission), and any remaining risks.


PERFORMANCE FIX BRIEF (from Lighthouse 13.5, Vercel desktop run: Performance 62, FCP 0.9s, LCP 1.6s, TBT 890ms, CLS 0, Speed Index 1.9s. Mobile on a tunnel: 57, LCP 9.9s, TBT 310ms.)

Diagnosis: the bottleneck is main-thread JavaScript, not network or images. Lighthouse reports 2.0s JS execution, 3.6s main-thread work, 16 long tasks, 317 KiB unused JS, 49 KiB unused CSS, 28 KiB legacy JS, a forced reflow, 640ms document latency, 210ms render-blocking, more than 4 preconnects, and short cache lifetimes.

Do the following, measuring with a production build (never dev mode) and re-running Lighthouse after each step:
1. Open the bundle treemap / run the bundle analyzer. List the 10 largest modules and what imports them. Remove, replace or lazy-load anything not needed for first paint.
2. Code-split per route and dynamically import below-the-fold and interactive-on-demand components (gallery, testimonials, maps, modals, carousels, forms, admin). Admin code must never load on public pages.
3. Find every long task (Performance panel). Break up or defer work (requestIdleCallback / scheduler.yield / setTimeout). Remove any work done on load that isn't needed above the fold.
4. Eliminate forced reflows: no layout reads (offsetHeight, getBoundingClientRect, scrollY) interleaved with writes; batch reads then writes; replace scroll event listeners and JS parallax with IntersectionObserver or CSS scroll-driven animations; animate only transform/opacity; reduce backdrop-filter/blur; respect prefers-reduced-motion.
5. Make public pages static (SSG/ISR) so the HTML comes from the CDN, and set the server function region to Mumbai (bom1) for any dynamic routes. Target document TTFB under 200ms.
6. Remove render-blocking CSS/JS: inline critical CSS, defer the rest, self-host fonts with font-display swap and a preloaded primary font only.
7. Keep at most 2 preconnect hints. Remove the rest.
8. Purge unused CSS. Set the build target and browserslist to modern browsers to drop legacy polyfills.
9. Add immutable long-term cache headers for hashed static assets and sensible headers for images.
10. Fix: remove user-scalable=no / maximum-scale from the viewport meta; fix low-contrast text to WCAG AA; add unique meta descriptions per page; clear all console errors; add a CSP header.

Targets on a production deployment: desktop Performance 90+, mobile Performance 85+, TBT under 200ms (desktop) and under 300ms (mobile), LCP under 2.5s on mobile, no long task over 100ms during load, CLS stays 0. Report before and after numbers in PERFORMANCE.md.