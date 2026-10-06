<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/layout

Layout engine for react-pdf. Takes the document element tree produced by the reconciler and resolves it into an absolutely positioned page tree: it parses styles, measures text with textkit, computes flexbox layout with Yoga, resolves images and SVG, and paginates content into fixed-size pages ready for rendering.

## Installation

```bash
yarn add @react-pdf/layout
```

## Usage

```js
import layout from '@react-pdf/layout';

const layoutTree = await layout(documentTree, fontStore);
```

The default export is an async function that composes the individual resolution steps (styles, inheritance, page sizes, Yoga layout, text layout, pagination, and so on) over a document root node and returns the fully resolved tree consumed by `@react-pdf/render`.

## License

MIT
