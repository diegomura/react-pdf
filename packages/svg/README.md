<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
  <p align="center">React renderer for creating PDF files on the browser and server<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@react-pdf/renderer">
      <img src="https://img.shields.io/npm/v/@react-pdf/renderer?style=flat&colorA=000000&colorB=000000" />
    </a>
     <a href="https://opencollective.com/react-pdf">
      <img src="https://img.shields.io/opencollective/all/react-pdf?style=flat&colorA=000000&colorB=000000" />
    </a>
    <a href="https://github.com/diegomura/react-pdf/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/diegomura/react-pdf?style=flat&colorA=000000&colorB=000000" />
    </a>
    <a href="https://blockchain.com/btc/address/bc1qj223udztpmt5dck46dw0yap08yum63ht56h90v">
      <img src="https://img.shields.io/badge/BTC-f5f5f5?style=flat&colorA=000000&colorB=000000" />
    </a>
     <a href="https://blockchain.com/eth/address/0x4e1DB76bA0858BbCAa4DD804418D0D9EcF77B1cC">
      <img src="https://img.shields.io/badge/ETH-f5f5f5?style=flat&colorA=000000&colorB=000000" />
    </a>
  </p>
</p>

# @react-pdf/svg

SVG string parser for [react-pdf](https://github.com/diegomura/react-pdf).

Parses SVG markup into a tree of nodes compatible with react-pdf's SVG primitives.

## Installation

```bash
npm install @react-pdf/svg
# or
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
