# Architecture and Delivery Notes

## Phase 0 Architecture Decision

**Decision:** Keep the existing React/Vite application and use Supabase directly for Postgres, Auth, Storage, and Row Level Security (the Vite option in the client brief).

**Why:** The repository already has a Vite/React customer site and admin UI. A Next.js rewrite during the first data/security phase would add migration risk and delay the highest-priority deliverable. Supabase supplies a managed Postgres database, secure user sessions, file storage, and authorization policies without adding a custom Express authentication stack.

**Security boundary:** The browser may use only the Supabase URL and public anon/publishable key, protected by RLS. Never put a Supabase service-role key, database password, or email-provider secret in the Vite bundle. Admin access must use Supabase Auth sessions plus server/database-enforced roles and RLS; hiding routes or checking `sessionStorage` is not authorization. Public queries should only expose published records and fields intended for visitors. Leads and admin mutations must require the appropriate authenticated role.

**Rendering/caching caveat:** Vite is a static SPA and does not provide Next.js SSG/ISR or tag-based on-demand revalidation. For the first compatible implementation, keep the shell static, query only published records, use CDN-friendly public responses and short client cache lifetimes, and refresh affected public queries through Supabase Realtime after admin saves. If indexed package-detail HTML with true SSG/ISR is a non-negotiable launch requirement, revisit the framework decision before building the package-detail route; do not claim Vite provides ISR.

**Media:** Use Supabase Storage with public read access only for approved published images, upload validation and size limits, generated responsive WebP/AVIF variants, and private access for any non-public documents. Remove the current unreviewed PDF from the public deployment unless the client confirms it is intended to be public.

## Phase Order

1. Phase 0: audit and this architecture record.
2. Phase 1: establish performance budgets, optimize local media/fonts, lazy-load routes (especially admin), and remove unused dependencies after verifying bundle impact.
3. Phase 2: define the CMS-ready schema and migrations/seeds; use the current package data as seed input, reconcile source inconsistencies, and add the required internal source notes.
4. Phase 3: implement secure admin authentication/roles first, then package/departure/media/content CRUD, audit log, and leads inbox.
5. Phase 4: connect public package, cruise, corporate, and inquiry flows to published database content without exposing privileged credentials.
6. Phase 5: verify CRUD and public propagation, security/RLS, uploads, responsive behavior, Lighthouse, deployment, and client handover.

## Repository State and Constraints

- Phase 0 created documentation only. The existing visual-refresh changes in the working tree were not staged or included in the Phase 0 commit.
- Current Vite API proxy expects a separate Express process on port 3001; the server is not running on Vercel under the current configuration.
- No `.env.example`, migration system, package test suite, lint script, Lighthouse CLI, or deployment-ready admin identity provider is present yet.
- The client must review real package prices/availability, testimonials, corporate logos/permissions, cancellation terms, contact details, and image rights before launch.