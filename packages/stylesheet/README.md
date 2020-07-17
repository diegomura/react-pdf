# @react-pdf/stylesheet

> React-pdf styles engine

## How to install

```sh
yarn add @react-pdf/stylesheet
```

## How it works

```js
const stylesheet = require('@react-pdf/stylesheet');

const container = {
  width: 400,
  height: 600,
  orientation: 'portrait',
};

const style = {
  margin: 20,
  width: '50vw',
  height: '20vh',
  borderRadius: 5,
  fontWeight: 'semibold',
  borderBottom: '2 solid yellow',
  '@media max-width: 500': {
    backgroundColor: 'rgb(255, 0, 0)',
  },
};

const computed = stylesheet(container, style);

// Computed
// {
//   width: 200,
//   height: 120,
//   marginTop: 20,
//   marginLeft: 20,
//   marginRight: 20,
//   marginBottom: 20,
//   marginBottom: 20,
//   borderTopLeftRadius: 5,
//   borderTopRightRadius: 5,
//   borderBottomLeftRadius: 5,
//   borderBottomRightRadius: 5,
//   fontWeight: 600,
//   borderBottomWidth: 2,
//   borderBottomStyle: 'solid',
//   borderBottomColor: 'yellow',
//   backgroundColor: '#FF0000'
// }
```

This library exports a `stylesheet` function that takes two arguments:

- _container_: Container where the styles are being computed into. It specifies the `width` and `height` in points (needed for media queries and unit conversions), and optionally the container `orientation` (needed for certain media queries).
- _style_: Style to be computed. JS object with raw styles that you would like to get in a normalized format.

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
