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

## Annotations

svgkit doesn't emit navigable `<a>` elements or interactive form widgets.
Instead, links, notes and form fields each render an inert annotation
alongside their visible output: a `pointer-events: none`, unpainted `<rect>`
(or, for notes, a `data-rpdf-note` attribute on the icon's own `<g>`) marking
where the thing is and carrying enough data for a host to build the real
interaction. The visible rendering described below is always emitted too —
annotations are additive, never a replacement for it.

### Links

`link()`/`goTo()` render:

```xml
<rect x="0" y="-10" width="50" height="10" fill="none" pointer-events="none" data-rpdf-link="https://react-pdf.org"/>
```

- External links carry the URL as given in `data-rpdf-link`.
- Internal links (`goTo`) carry a fragment, e.g. `data-rpdf-link="#doc1-dest-chapter"`,
  which resolves directly via `document.querySelector(...)` to the matching
  destination marker — the `<g>` that `addNamedDestination` emits, tagged
  with both `id` and `data-rpdf-dest`:

  ```xml
  <g id="doc1-dest-chapter" data-rpdf-dest="chapter"/>
  ```

### Notes

`Note` still draws its fixed comment-bubble icon and `<title>` tooltip; the
icon's `<g>` additionally carries the note's contents:

```xml
<g data-rpdf-note="Please review before signing"><rect .../><path .../><title>Please review before signing</title></g>
```

### Form fields

`TextInput`, `Select`, `List` and `Checkbox` still draw their static
approximation of what a PDF viewer shows (the field's value, masked for
`password` and falling back to the first `select` option for `Select`/`List`;
a check mark for a checked `Checkbox`) — an overlaid control naturally covers
this baked-in drawing, the same way pdf.js's form layer covers its own static
appearance streams. Alongside that drawing, each field gets one annotation
rect. Attributes with no value for a given field are omitted:

| Attribute                   | Meaning                                           | Present on          |
| --------------------------- | ------------------------------------------------- | ------------------- |
| `data-rpdf-field`           | Field type: `text`, `checkbox`, `combo` or `list` | all                 |
| `data-rpdf-field-name`      | Field name                                        | all, when named     |
| `data-rpdf-field-value`     | Current value (masked for `password`)             | text, combo, list   |
| `data-rpdf-field-checked`   | `"true"` / `"false"`                              | checkbox only       |
| `data-rpdf-field-options`   | JSON array of choices                             | combo, list         |
| `data-rpdf-field-multiline` | `"true"` when set                                 | text only           |
| `data-rpdf-field-password`  | `"true"` when set                                 | text only           |
| `data-rpdf-field-readonly`  | `"true"` when set                                 | any, when read-only |

```xml
<rect x="40" y="80" width="120" height="20" fill="none" pointer-events="none" data-rpdf-field="text" data-rpdf-field-name="email" data-rpdf-field-value="jane@example.com"/>
```

Because every annotation rect is unpainted and ignores pointer events, none
of them block clicks, typing or text selection underneath — a host queries
them purely for geometry and data, then builds its own interaction:

```js
document.querySelectorAll('[data-rpdf-field]').forEach((el) => {
  const box = el.getBoundingClientRect(); // position a real control here
  const {
    rpdfField: type,
    rpdfFieldValue,
    rpdfFieldChecked,
    rpdfFieldReadonly,
  } = el.dataset;

  const input = document.createElement(type === 'text' ? 'input' : 'select');
  if (type === 'checkbox') input.checked = rpdfFieldChecked === 'true';
  else input.value = rpdfFieldValue || '';
  input.disabled = rpdfFieldReadonly === 'true';
  // position `input` over `box` and append it — it now covers the
  // baked-in drawing and is the thing the user actually interacts with
});

document.querySelectorAll('[data-rpdf-link]').forEach((el) => {
  const target = el.dataset.rpdfLink;
  const box = el.getBoundingClientRect(); // position an overlay here
  overlay.addEventListener('click', () => {
    if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(target, '_blank', 'noopener');
    }
  });
});
```

This keeps interaction policy (same-tab vs. new-tab navigation, how an
internal jump scrolls, what widget renders a field, whether a note pops up
inline or as an alert) in the host's hands rather than baked into svgkit. A
standalone `.svg` file opened directly (e.g. double-clicked in a file
browser) has no interactivity by design — annotations only become
interactive once a host implements the pattern above. See
`apps/examples/src/svg-viewer.tsx` for a full implementation that
overlays real `<input>`/`<select>`/`<textarea>` controls and note popups.

## License

MIT
