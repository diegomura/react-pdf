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

Ids for clip paths, gradients, and named destinations are generated
sequentially per document (`clip-1`, `grad-1`, `dest-foo`, ...). Pass
`idPrefix` when embedding several documents' SVG output in the same DOM so
their ids don't collide:

```js
const ctx = new SVGDocument({ idPrefix: 'doc2-' });
```

## Text

How text is rendered depends on whether the font was registered (embedded)
or is one of the standard 14 PDF fonts:

- **Registered fonts** render as glyph-outline `<path>` elements, one per
  glyph, positioned using the same shaping output the PDF renderer uses.
  This is pixel-faithful to the PDF output, but the text is not selectable
  or searchable in the SVG.
- **Standard fonts** (Helvetica, Times, Courier and their variants) have no
  embedded outline data, so they render as `<text>` elements with per-glyph
  x positions and a CSS font-family fallback (e.g. `Helvetica, Arial,
  sans-serif`). The text is selectable, but its exact shape depends on
  whichever matching font the viewer has installed.

## Parity with PDF output

Supported and matching PDF output:

- Fills, strokes, clips, gradients, transforms, images
- Links (`src`) and internal destinations (`id` / `#dest`)

Silent no-ops — these draw nothing in SVG output, unlike the PDF renderer:

- Form fields (`TextInput`, `Select`, `Checkbox`, and other AcroForm nodes)
- Notes and annotations
- Bookmarks / outlines

## License

MIT
