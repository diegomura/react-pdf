# react-pdf.org Modernization — Design

**Date:** 2026-08-24
**Status:** Approved pending final review

## Goal

Replace the current react-pdf.org site (Next.js 14 pages-router, MDX v1, Emotion 10, CodeMirror 5 + buble REPL, in `diegomura/react-pdf-site`) with a modern site that keeps the same content and spirit: best-in-class docs framework, versioned docs, dark-default theming with brand continuity, an eye-catching hero, a more robust REPL, and AI/MCP support. The site moves into the react-pdf monorepo.

## Decisions (approved during brainstorm)

| Topic | Decision |
|---|---|
| Framework | Fumadocs on Next.js App Router |
| Versioning | Full versioned docs; old majors flattened from `react-pdf-site` branches into frozen folders |
| REPL | Modernized single-file editor with autocomplete + error overlay; TypeScript later |
| Location | `apps/site` in the react-pdf monorepo; old repo archived after launch |
| Hosting | Vercel, root directory `apps/site`, ignored-build-step scoped to `apps/site` |
| Blog | Migrate posts as-is, keep nav link |
| AI/MCP | llms.txt + raw markdown + hosted MCP server; no chat widget for now |
| Hero | "Big type" layout with an embedded, actually-editable mini-REPL |
| Theme | Dark by default; light mode reuses today's palette, dark mode adapts it |

## Architecture

New app at `apps/site` (new top-level `apps/` directory, outside `packages/`, so Lerna/changesets never touch it; `private: true`).

**Stack:** Next.js (App Router), `fumadocs-ui` + `fumadocs-core` + `fumadocs-mdx` (content layer), Tailwind CSS. Emotion, buble, CodeMirror 5, recompose, and the rest of the legacy stack are not carried over.

**Routes:**

- `/` — custom hero landing page (plain Next page)
- `/docs/[version]/…` — Fumadocs docs, folder-per-major, `v4` default
- `/repl` — full playground (plain Next page)
- `/blog/…` — blog via the same MDX content layer
- `/api/search` — Orama search endpoint
- `/llms.txt`, `/llms-full.txt`, raw `.mdx` per docs page
- `/api/mcp` — MCP server route handler

**Dependency policy:** the site consumes `@react-pdf/renderer` as a pinned npm release, not a workspace link, so site deploys are decoupled from in-progress package work.

**Dev workflow:** `yarn dev` inside `apps/site`.

## Content and versioning

- The ~22 docs pages migrate to `apps/site/content/docs/v4/` as MDX, prose essentially untouched; sidebar order mirrors today's nav via `meta.json`.
- Custom MDX components used by the docs (prop tables, callouts, inline demos) are rebuilt once as Fumadocs-styled equivalents.
- Each old-major branch of `react-pdf-site` with distinct content is flattened one time into `content/docs/v3/`, `v2/`, … (audit branches during implementation). Old versions are frozen snapshots.
- Version dropdown in the docs navbar; old-version pages show a banner linking to the v4 equivalent.
- **URL compatibility:** all current top-level paths (`/components`, `/styling`, `/quick-start`, …) become permanent redirects to their `/docs/...` equivalents. `/repl` keeps its exact path and lz-string `?code=` format so existing shared links keep working.
- Blog posts migrate with the same slugs.

## REPL

- `/repl`: full-viewport split view — editor left, PDF preview right, draggable divider; tabs on mobile.
- Editor: CodeMirror 6, JSX highlighting, custom autocomplete source for react-pdf components, props, and style properties generated from `@react-pdf/types`. Inline syntax diagnostics. (No TS language service initially; Monaco/TS is the later upgrade path.)
- Pipeline: code → web worker → sucrase JSX transform → evaluate with `@react-pdf/renderer` → PDF blob → main thread. Debounced ~500ms.
- Error handling: preview keeps last good render with a dismissible error banner on failure; worker is restarted if it crashes.
- Preview: pdf.js-based viewer with page navigation, zoom, rendering indicator.
- Features: shareable lz-string URLs (backwards compatible), copy link, download PDF, curated examples dropdown (quick start, resume, invoice, custom fonts, SVG).
- Docs integration: code samples in docs get an "Open in REPL" link.

## Hero

"Big type" layout, dark, on a subtle dotted-grid texture:

1. Headline ("PDFs, made with React" direction) + one-line pitch
2. `npm install @react-pdf/renderer` command with copy button
3. CTAs: Get started / Open full REPL
4. Centerpiece: an **editable mini-REPL** — real rendering pipeline, small code snippet left, live PDF preview right. Lazy-loaded below the headline so text paints instantly; a static placeholder shows until the worker is ready. Links through to the full REPL.

## Theming and brand

- Dark by default; light/dark toggle persisted in local storage.
- **Light mode uses today's palette for continuity:** red `#F22300`, lightRed `#FCD3CC`, darkRed `#8D1602`, black `#3E3E3E`, grays `#A6A6A6`/`#F1F1F1`/`#F8F8F8`, blue `#4F8FED`.
- **Dark mode adapts the same palette** (red brightened toward `#E8442E`-range for contrast on near-black surfaces; grays inverted to a matching scale).
- Implemented as CSS variables over Fumadocs' theme tokens; single accent color (the red) in both modes.
- Typography: Inter for UI/prose, JetBrains Mono for code (replaces Source Sans Pro).
- Existing logo carries over.

## Search + AI/MCP

- Orama (Fumadocs built-in) ⌘K search; indexes all versions, results filtered to the version being browsed.
- `llms.txt` / `llms-full.txt` generated at build from v4 content only.
- Every docs page available as raw markdown + "Copy page as Markdown" button.
- MCP server at `/api/mcp` (streamable HTTP, no auth) with two tools: `search_docs` (Orama over v4) and `read_doc` (full page as markdown). A docs page documents client setup (Claude Code, Cursor).

## Error handling

- REPL: errors surface inline (syntax) or as a banner (render); never a blank preview; worker crash auto-recovers.
- Hero mini-REPL: if the worker fails to boot (old browsers, blocked workers), the panel falls back to the static snippet + pre-rendered PDF image.
- 404s from stale deep links covered by the redirect map; unknown docs paths get Fumadocs' not-found page with search.

## Testing

- Redirect map: unit test asserting every legacy URL resolves to the intended new path.
- REPL pipeline: unit tests for transpile+render worker round-trip (valid doc → blob; syntax error → structured error; runtime throw → structured error).
- MCP: route-level tests for `search_docs` and `read_doc` responses.
- Build-time link check over migrated MDX (Fumadocs validates internal links at build).
- CI: site build + tests run only when `apps/site` changes.

## Launch checklist (site cutover)

1. Ship `apps/site` behind a Vercel preview; verify redirects, REPL link compat, versioned content.
2. Point react-pdf.org DNS/Vercel domain at the new project.
3. Archive `diegomura/react-pdf-site` with a README pointer.

## Out of scope (deliberate)

- TypeScript/Monaco in the REPL (upgrade path noted)
- "Ask AI" chat widget (revisit if demand appears)
- Multi-file REPL projects / gallery beyond the curated examples
- Restyling or rewriting docs prose (content parity is the goal)
