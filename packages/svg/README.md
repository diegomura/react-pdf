<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/svg

SVG string parser for [react-pdf](https://github.com/diegomura/react-pdf).

Parses SVG markup into a tree of nodes compatible with react-pdf's SVG primitives.

## Installation

```bash
yarn add @react-pdf/svg
```

## Usage

```js
import { parseSvg } from '@react-pdf/svg';

const tree = parseSvg(
  '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg>',
);
```

Returns an `SvgNode` tree:

```js
{
  type: 'SVG',
  props: { viewBox: '0 0 100 100' },
  children: [
    {
      type: 'CIRCLE',
      props: { cx: '50', cy: '50', r: '40', fill: 'red' },
      children: []
    }
  ]
}
```

## Supported elements

`svg`, `g`, `path`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, `clipPath`, `linearGradient`, `radialGradient`, `stop`, `image`

## API

### `parseSvg(svgString: string): SvgNode`

Parses an SVG string and returns the root `SvgNode`. Attributes are converted to camelCase and tag names are mapped to react-pdf primitive types. Unsupported elements are skipped with a console warning.

### `SvgNode`

```ts
interface SvgNode {
  type: string;
  props: Record<string, unknown>;
  children?: SvgNode[];
}
```

## License

MIT
