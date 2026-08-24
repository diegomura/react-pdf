# svgkit revival — SVG backend for @react-pdf/render

**Date:** 2026-08-24
**Status:** Approved design

## Goal

Bring back `@react-pdf/svgkit` as a pdfkit-shaped drawing context that emits
SVG instead of PDF. `@react-pdf/render` runs unchanged against it (one small
seam aside), so a layout tree renders to SVG strings. Primary consumers: the
REPL and doc site, replacing the pdfkit + pdf.js display pipeline with
something much lighter.

## Decisions made

- **Text renders as glyph outlines** (`<path>` from fontkit `glyph.path`),
  pixel-faithful to the PDF. A pdf.js-style invisible selectable-text overlay
  is a designed-for future extension, not built now.
- **Output is serialized SVG strings**, one per page, environment-agnostic
  (no DOM, no streams). Snapshot-testable in Node.
- **svgkit stays low-level.** No renderer subpath export; consumers
  self-assemble reconciler + layout + render + `SVGDocument`. Package is
  local to the monorepo for now (publish decisions out of scope).
- **Glyphs cross the ctx boundary via a capability seam** in render's
  `renderGlyphs.ts` (option 2 below), not by parsing PDF content-stream
  operators and not by a standalone layout-tree renderer.

### Alternatives rejected

1. *Pure ctx swap:* svgkit parses the raw PDF operators (`BT`/`Tm`/`TJ`/`ET`)
   render emits via `addContent()` and reverse-maps CIDs to glyphs. Zero
   render changes, but requires a fragile mini content-stream parser to
   recover data render already had.
2. **Chosen:** capability seam in `renderGlyphs.ts` (see below).
3. *Standalone SVG renderer over the layout tree:* cleanest boundary but
   re-implements all of render (clipping, borders, transforms, decorations,
   SVG-in-PDF) and drifts forever.

## Architecture

New `packages/svgkit` — ESM, TypeScript, Rollup, same skeleton as
`packages/image`. Exports one class, `SVGDocument`, implementing the ~45
pdfkit methods `@react-pdf/render` actually calls, nothing more.

Usage (consumer self-assembles):

```js
const doc = new SVGDocument();
render(doc, safeDocumentNode);  // unchanged @react-pdf/render; calls doc.end() itself
doc.pages;                       // string[] — one `<svg>…</svg>` per page
```

Pages are sized from each `addPage({ size })` call. Elements are built on a
tiny internal virtual-element tree (`createElement`/`appendChild`/
`setAttribute`, as in the old svgkit) and stringified at `end()`.
Dependencies: at most `@react-pdf/fns`. fontkit objects arrive through
render; svgkit never imports fontkit.

## Internals

Five small modules:

- **state** — save/restore stack, current transform, fill/stroke colors,
  opacities, lineWidth/lineCap/lineJoin, dash/undash. Realized as attributes
  on `<g>`/`<path>` at draw time, not eagerly.
- **path** — `moveTo`/`lineTo`/`bezierCurveTo`/`quadraticCurveTo`/`rect`/
  `ellipse`/`circle`/`path(d)`/`closePath` accumulate a `d` string.
  `fill`/`stroke`/`fillAndStroke` flush it as `<path>`. `clip` flushes into
  a `<clipPath>` in `<defs>` and wraps subsequent content in a group.
- **text** — `font()`/`fontSize()` track state; `glyphs(glyphs, positions,
  x, y)` emits each fontkit `glyph.path` as `<path>` outlines, scaled
  `fontSize / unitsPerEm` with y-flip, colored by current fill state.
- **image** — `openImage(src)` parses only PNG/JPEG headers for dimensions,
  returns `{ width, height }`. `image()` emits `<image>` with a data URL.
- **gradient** — `linearGradient`/`radialGradient` return pdfkit-compatible
  objects whose stops emit `<linearGradient>`/`<radialGradient>` into
  `<defs>`.

`link`/`goTo` wrap content in `<a>`.

**No-op stubs (the parity exception):** forms (`initForm`, `formField`,
`formCombo`, `formList`, `_fieldDict`, `_addToParent`, `ref`), `note`,
bookmarks/outlines, `addNamedDestination`. Silent no-ops, documented in the
package README. Form documents therefore do NOT behave identically in SVG
output.

## The render seam

`packages/render/src/primitives/renderGlyphs.ts` gains one early branch: if
the ctx exposes `glyphs(glyphs, positions, x, y)`, call it and return.
Otherwise the existing `addContent` path runs, byte-identical for pdfkit.
This is the only change to `@react-pdf/render`.

The future selectable-text overlay plugs in at this same seam — the run's
unicode is in scope at the call site, so the extension widens this signature
rather than re-architecting.

## Testing

Vitest string snapshots in `packages/svgkit/tests`:

- Unit tests per module: paths, transforms, clipping, gradients, images.
- Integration tests running real layout fixtures (text, styled views, an
  `<Svg>` element, an image) through `@react-pdf/render` with an
  `SVGDocument`, snapshotting the page strings.

Render's existing suite guards that the pdfkit path is untouched. No
visual-regression tooling for SVG initially — string snapshots plus
eyeballing in the REPL; resvg-based image snapshots can come later if drift
bites.

## Out of scope

- Renderer subpath export / one-call `renderToSvg` API
- Selectable-text overlay (designed for, not built)
- Forms, bookmarks, notes in SVG output
- npm publishing / doc-site integration itself
