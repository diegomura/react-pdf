# @react-pdf/svgkit

## 0.1.1

### Patch Changes

- [#3618](https://github.com/diegomura/react-pdf/pull/3618) [`2089b23a9bed6e763e5392c5178982c40d78b137`](https://github.com/diegomura/react-pdf/commit/2089b23a9bed6e763e5392c5178982c40d78b137) Thanks [@BAHAA-THE-KING](https://github.com/BAHAA-THE-KING)! - Draw glyph offsets from the font at their real size, so Arabic dots and other marks are placed where the font puts them, and sub/super shifts stay correct for fonts that are not 1000 units per em

## 0.1.0

### Minor Changes

- [#3531](https://github.com/diegomura/react-pdf/pull/3531) [`b768f01e862cd56987f046c117919191ef810646`](https://github.com/diegomura/react-pdf/commit/b768f01e862cd56987f046c117919191ef810646) Thanks [@diegomura](https://github.com/diegomura)! - Reintroduce @react-pdf/svgkit: a pdfkit-shaped drawing context that renders documents to SVG strings. @react-pdf/render gains an optional `ctx.glyphs` capability seam so non-PDF backends receive raw glyphs; pdf output is unchanged.
