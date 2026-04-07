# @react-pdf/math

Render LaTeX math expressions in [react-pdf](https://github.com/diegomura/react-pdf) documents.

Uses [MathJax](https://www.mathjax.org/) to convert LaTeX into SVG paths, then maps them to react-pdf's built-in SVG primitives. No fonts or external assets needed — all glyphs are rendered as vector paths directly in the PDF.

## Installation

```bash
npm install @react-pdf/math
# or
yarn add @react-pdf/math
```

Peer dependencies:

```bash
npm install @react-pdf/renderer react
```

## Usage

```tsx
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { Math } from '@react-pdf/math';

const MyDocument = () => (
  <Document>
    <Page size="A4" style={{ padding: 40 }}>
      <Math>{"x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"}</Math>
    </Page>
  </Document>
);
```

## API

### `<Math>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | — | LaTeX math expression to render |
| `inline` | `boolean` | `false` | Inline mode (compact) vs display mode (centered, larger) |
| `width` | `number \| string` | — | Width of the SVG element |
| `height` | `number \| string` | — | Height of the SVG element |
| `color` | `string` | `"black"` | Color for the math expression |
| `debug` | `boolean` | `false` | Adds a visible border around the SVG element for debugging layout |

### Display vs Inline mode

**Display mode** (default) renders the expression as a block, centered with larger operators — ideal for standalone equations:

```tsx
<Math>{"\\int_0^\\infty e^{-x^2} dx = \\sqrt{\\pi}"}</Math>
```

**Inline mode** (`inline`) renders compact expressions suitable for embedding within text:

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text>The equation </Text>
  <Math inline>{"E = mc^2"}</Math>
  <Text> is famous.</Text>
</View>
```

## Examples

### Fractions and roots

```tsx
<Math>{"\\frac{\\sqrt{3}}{2}"}</Math>
```

### Summations and integrals

```tsx
<Math>{"\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}"}</Math>
<Math>{"\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"}</Math>
```

### Matrices

```tsx
<Math>{"\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}"}</Math>
```

### Greek letters and operators

```tsx
<Math>{"\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}"}</Math>
```

### Limits

```tsx
<Math>{"\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1"}</Math>
```

## How it works

1. **LaTeX → SVG**: MathJax converts the LaTeX expression into SVG markup with `fontCache: 'none'`, ensuring all glyphs are inlined as `<path>` elements (no `<use>`/`<defs>` references).
2. **SVG → react-pdf**: A lightweight parser converts the SVG string into a tree, then recursively maps each SVG element (`path`, `rect`, `g`, etc.) to the corresponding react-pdf SVG component.

## Supported LaTeX features

All standard LaTeX math features supported by MathJax are available, including:

- Arithmetic operators, fractions, roots
- Greek and Hebrew letters
- Summations, products, integrals
- Limits
- Matrices and arrays
- Binomial coefficients
- Trigonometric functions
- Accents and decorations
- Spacing commands

## License

MIT
