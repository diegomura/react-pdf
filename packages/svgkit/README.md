<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/svgkit

> A pdfkit-shaped drawing context that renders to SVG

A pdfkit-compatible drawing context for react-pdf. `@react-pdf/render` draws
react-pdf's resolved layout tree by calling pdfkit-style methods (`fill`,
`stroke`, `moveTo`, `text`, ...) on a context object. `@react-pdf/svgkit`
implements that same context shape but emits SVG strings instead of PDF
drawing operations, so a resolved document can be rendered to SVG without
pulling in pdfkit or a PDF viewer. Useful for lightweight in-browser previews,
such as a REPL or documentation site.

## Installation

```bash
yarn add @react-pdf/svgkit
```

## Usage

```js
import FontStore from '@react-pdf/font';
import layout from '@react-pdf/layout';
import render from '@react-pdf/render';
import SVGDocument from '@react-pdf/svgkit';

const fontStore = new FontStore();
const resolved = await layout(documentTree, fontStore);

const ctx = new SVGDocument({ idPrefix: 'doc1-' });
render(ctx, resolved);

ctx.pages; // string[] — one `<svg>…</svg>` per page
```

`render()` calls `ctx.end()` itself once every page has been drawn, so
consumers never call it directly. After `render()` returns, `ctx.pages` holds
one serialized `<svg>` string per page.

### idPrefix

Clip path and gradient ids are generated sequentially per document
(`clip-1`, `grad-1`, ...). Destination ids are derived from the document's
own `id` props (`dest-<id>`). Pass `idPrefix` when embedding several
documents' SVG output in the same DOM so none of these ids collide:

```js
const ctx = new SVGDocument({ idPrefix: 'doc2-' });
```

### Document info

Pass `info` (or set `ctx.info` directly before calling `render()`) to embed
document metadata. It accepts the same keys pdfkit does — `Title`, `Author`,
`Subject`, `Keywords`, `Creator`, `Producer`, `CreationDate`,
`ModificationDate` — and `Title`/`Subject` land as native `<title>`/`<desc>`
elements, with `Title`, `Author`, `Keywords`, `Subject` and `CreationDate`
also emitted as Dublin Core RDF inside a `<metadata>` element (the same
convention Inkscape and Illustrator use), one per page:

```js
const ctx = new SVGDocument({
  info: { Title: 'Invoice #42', Author: 'Acme Inc.' },
});
```

Any key left unset is simply omitted — an empty `info` produces no extra
markup at all.

## Bookmarks

Bookmarked elements (`<View bookmark="Chapter 1">` and friends) don't have a
native SVG outline to render into, so they render as an empty, positioned
`<g id="...">` marker on their page plus a machine-readable outline tree in a
`<metadata>` element on the first page:

```xml
<metadata>
  <rpdf:outline xmlns:rpdf="https://react-pdf.org/ns">
    <rpdf:item title="Chapter 1" page="0" href="#bookmark-1">
      <rpdf:item title="Section 1.1" page="0" href="#bookmark-2"/>
    </rpdf:item>
  </rpdf:outline>
</metadata>
```

A consumer builds a sidebar by `DOMParser`-parsing that fragment, walking the
`rpdf:item` elements for `title`/`page`/`expanded`, and using `href` to jump
to the matching marker (e.g. `document.getElementById(...)` or
`location.hash`) — on the page indicated by `page`, not necessarily the one
the outline metadata itself lives on.

## Text

How text is rendered depends on whether the font was registered (embedded)
or is one of the standard 14 PDF fonts:

- **Registered fonts** render as glyph-outline `<path>` elements, one per
  glyph, positioned using the same shaping output the PDF renderer uses.
  This is pixel-faithful to the PDF output. An invisible `<text>` run
  (`fill-opacity="0"`) is layered on top of the outlines, pdf.js-style, so
  the text stays selectable, copyable, searchable, and accessible to screen
  readers even though the visible glyphs are vector art.
- **Standard fonts** (Helvetica, Times, Courier and their variants) have no
  embedded outline data, so they render as `<text>` elements with per-glyph
  x positions and a CSS font-family fallback (e.g. `Helvetica, Arial,
  sans-serif`). The text is selectable, but its exact shape depends on
  whichever matching font the viewer has installed.
- Link anchors paint above the content they cover so they stay clickable
  (SVG hit-testing follows paint order), which means dragging to select text
  *inside* a link's box may be blocked in some browsers, the same trade-off
  pdf.js makes with its annotation layer above its text layer.

## Parity with PDF output

Supported and matching PDF output:

- Fills, strokes, clips, gradients, transforms, images
- Links (`src`) and internal destinations (`id` / `#dest`)
- `TextInput`, `Select`, `List`, `Checkbox` and `Note` render a static,
  non-interactive approximation of what a PDF viewer shows: the field's
  value (masked for `password`, falling back to the first `select` option
  for `Select`/`List`), a check mark for a checked `Checkbox`, and a fixed
  comment-bubble icon carrying the note text as a native `<title>` tooltip.
  There's no typing, no toggling and no popups, and long field values are
  clipped to the box rather than shrunk to fit, since svgkit has no font
  metrics to size against.
- Bookmarks / outlines (see [Bookmarks](#bookmarks)) and document info (see
  [Document info](#document-info)) — SVG has no native outline pane or info
  dictionary, so both come through as structured markup rather than viewer
  chrome.

## License

MIT
