<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/reconciler

React fiber reconciler for react-pdf. Turns React elements into the internal element tree consumed by the layout engine. Detects the installed React version at runtime and picks a compatible reconciler build, supporting React 18 and earlier, React 19, and React 19.2+.

## Installation

```bash
yarn add @react-pdf/reconciler
```

## Usage

```js
import createRenderer from '@react-pdf/reconciler';

const renderer = createRenderer({
  appendChild,
  createInstance,
  createTextInstance,
  // ...remaining host config callbacks
});
```

The factory receives the host config callbacks that build and mutate the element tree, and returns a `react-reconciler` instance.

## License

MIT
