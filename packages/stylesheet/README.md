<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/stylesheet

Styles resolution engine for react-pdf. Transforms CSS-like style objects into normalized, resolved values ready for layout and rendering. Handles unit conversions, color parsing, shorthand expansion, media queries, and style flattening.

## Installation

```bash
yarn add @react-pdf/stylesheet
```

## Usage

```js
import stylesheet from '@react-pdf/stylesheet';

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

// Result:
// {
//   width: 200,
//   height: 120,
//   marginTop: 20,
//   marginLeft: 20,
//   marginRight: 20,
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

## Features

### Style Flattening

Merges arrays of style objects into a single object. Supports nested arrays and filters out null/undefined values.

```js
import stylesheet, { flatten } from '@react-pdf/stylesheet';

const baseStyle = { margin: 10, padding: 5 };
const activeStyle = { backgroundColor: 'blue' };

// Pass an array of styles
const computed = stylesheet(container, [baseStyle, activeStyle]);

// Or use flatten directly
const merged = flatten([baseStyle, null, activeStyle, undefined]);
// => { margin: 10, padding: 5, backgroundColor: 'blue' }
```

### Media Queries

Apply styles conditionally based on container dimensions and orientation.

```js
const style = {
  fontSize: 12,
  '@media max-width: 500': {
    fontSize: 10,
  },
  '@media orientation: landscape': {
    flexDirection: 'row',
  },
  '@media min-width: 400 and max-width: 800': {
    padding: 20,
  },
};
```

Supported media features:

- `min-width` / `max-width`
- `min-height` / `max-height`
- `orientation` (`portrait` | `landscape`)

### Unit Conversion

Converts various CSS units to points (the PDF standard unit).

```js
const style = {
  width: '2in', // 144pt (72pt per inch)
  height: '50mm', // ~141.73pt
  padding: '1cm', // ~28.35pt
  margin: '10vh', // 10% of container height
  fontSize: '5vw', // 5% of container width
  gap: '2rem', // 36pt (default rem base: 18pt)
  left: '100px', // ~100pt at 72dpi
};
```

| Unit  | Description                          |
| ----- | ------------------------------------ |
| `pt`  | Points (default, 1pt = 1/72 inch)    |
| `in`  | Inches (1in = 72pt)                  |
| `mm`  | Millimeters                          |
| `cm`  | Centimeters                          |
| `vh`  | Percentage of container height       |
| `vw`  | Percentage of container width        |
| `rem` | Relative to rem base (default 18pt)  |
| `px`  | Pixels (converted using DPI setting) |

### Color Transformation

Normalizes color values to hexadecimal format.

```js
import { transformColor } from '@react-pdf/stylesheet';

transformColor('rgb(255, 0, 0)'); // => '#FF0000'
transformColor('rgba(0, 0, 255, 0.5)'); // => '#0000FF80'
transformColor('hsl(120, 100%, 50%)'); // => '#00FF00'
transformColor('hsla(0, 100%, 50%, 0.8)'); // => '#FF0000CC'
transformColor('red'); // => 'red' (passed through)
```

### Shorthand Expansion

Expands CSS shorthand properties into their individual components.

#### Margin & Padding

```js
// Input
{ margin: '10 20 30 40' }
// Output
{
  marginTop: 10,
  marginRight: 20,
  marginBottom: 30,
  marginLeft: 40
}

// Also supports marginHorizontal/marginVertical
{ marginHorizontal: 20, marginVertical: 10 }
// Output
{
  marginTop: 10,
  marginRight: 20,
  marginBottom: 10,
  marginLeft: 20
}
```

#### Border

```js
// Input
{ border: '2 solid red' }
// Output
{
  borderTopWidth: 2,
  borderTopStyle: 'solid',
  borderTopColor: 'red',
  borderRightWidth: 2,
  borderRightStyle: 'solid',
  borderRightColor: 'red',
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  borderBottomColor: 'red',
  borderLeftWidth: 2,
  borderLeftStyle: 'solid',
  borderLeftColor: 'red',
}

// Border radius expansion
{ borderRadius: 5 }
// Output
{
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  borderBottomLeftRadius: 5,
}
```

#### Flex

```js
// Input
{ flex: '1 0 auto' }
// Output
{
  flexGrow: 1,
  flexShrink: 0,
  flexBasis: 'auto'
}

// Single value
{ flex: 1 }
// Output
{ flexGrow: 1 }
```

#### Gap

```js
// Input
{ gap: '10 20' }
// Output
{
  rowGap: 10,
  columnGap: 20
}
```

#### Object Position

```js
// Input
{ objectPosition: '50% 25%' }
// Output
{
  objectPositionX: 0.5,
  objectPositionY: 0.25
}
```

#### Transform Origin

```js
// Input
{ transformOrigin: 'center top' }
// Output
{
  transformOriginX: '50%',
  transformOriginY: '0%'
}
```

### Transform Parsing

Parses CSS transform strings into structured transform arrays.

```js
// Input
{
  transform: 'translate(10, 20) rotate(45) scale(2)';
}
// Output
{
  transform: [
    { operation: 'translate', value: [10, 20] },
    { operation: 'rotate', value: [45] },
    { operation: 'scale', value: [2, 2] },
  ];
}
```

Supported transform functions:

- `translate(x, y)` - Translation
- `translateX(x)` / `translateY(y)` - Single-axis translation
- `rotate(angle)` - Rotation in degrees
- `scale(x, y)` - Scaling (y defaults to x if omitted)
- `scaleX(x)` / `scaleY(y)` - Single-axis scaling
- `skew(x, y)` - Skewing in degrees
- `skewX(x)` / `skewY(y)` - Single-axis skewing
- `matrix(a, b, c, d, e, f)` - Full transformation matrix

### Font Weight Resolution

Converts font weight keywords to numeric values.

| Keyword                    | Numeric Value |
| -------------------------- | ------------- |
| `thin`, `hairline`         | 100           |
| `ultralight`, `extralight` | 200           |
| `light`                    | 300           |
| `normal`                   | 400           |
| `medium`                   | 500           |
| `semibold`, `demibold`     | 600           |
| `bold`                     | 700           |
| `ultrabold`, `extrabold`   | 800           |
| `heavy`, `black`           | 900           |

## API Reference

### Default Export

#### `stylesheet(container, style)`

Resolves styles for a given container.

**Parameters:**

- `container` - Container dimensions and settings
- `style` - Style object or array of style objects

**Returns:** Resolved style object with expanded shorthands and converted units

### Named Exports

#### `flatten(styles)`

Flattens an array of style objects into a single merged object.

```js
import { flatten } from '@react-pdf/stylesheet';

flatten([{ margin: 10 }, null, { padding: 5 }]);
// => { margin: 10, padding: 5 }
```

#### `transformColor(value)`

Transforms RGB/HSL color strings to hexadecimal format.

```js
import { transformColor } from '@react-pdf/stylesheet';

transformColor('rgb(255, 128, 0)'); // => '#FF8000'
```

## Types

### Container

```ts
type Container = {
  width: number; // Container width in points
  height: number; // Container height in points
  dpi?: number; // DPI for px unit conversion (default: 72)
  remBase?: number; // Base size for rem units (default: 18)
  orientation?: 'landscape' | 'portrait';
};
```

### Style

The input style object supporting all CSS-like properties:

```ts
type Style = {
  // Dimensions
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;

  // Flexbox
  flex?: number | string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexBasis?: number | string;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';

  // Gap
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;

  // Spacing
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;

  // Borders
  border?: number | string;
  borderTop?: number | string;
  borderRight?: number | string;
  borderBottom?: number | string;
  borderLeft?: number | string;
  borderWidth?: number | string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  borderColor?: string;
  borderRadius?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
  // ... and per-side border properties

  // Layout
  display?: 'flex' | 'none';
  position?: 'absolute' | 'relative' | 'static';
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number | string;
  overflow?: 'hidden';
  aspectRatio?: number | string;

  // Colors
  backgroundColor?: string;
  color?: string;
  opacity?: number | string;

  // Text
  fontFamily?: string | string[];
  fontSize?: number | string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: FontWeight;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textDecoration?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  textDecorationColor?: string;
  textDecorationStyle?: 'solid' | 'dashed' | 'dotted';
  textTransform?:
    | 'none'
    | 'capitalize'
    | 'lowercase'
    | 'uppercase'
    | 'upperfirst';
  textOverflow?: 'ellipsis';
  maxLines?: number | string;

  // Transform
  transform?: string | Transform[];
  transformOrigin?: number | string;
  transformOriginX?: number | string;
  transformOriginY?: number | string;

  // Object positioning (for images)
  objectFit?: string;
  objectPosition?: number | string;
  objectPositionX?: number | string;
  objectPositionY?: number | string;

  // SVG
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
  strokeDasharray?: string;
  fillOpacity?: string | number;
  strokeOpacity?: string | number;
  fillRule?: 'nonzero' | 'evenodd';
  textAnchor?: 'start' | 'middle' | 'end';
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  visibility?: 'visible' | 'hidden' | 'collapse';
  clipPath?: string;
  dominantBaseline?:
    | 'auto'
    | 'middle'
    | 'central'
    | 'hanging'
    | 'mathematical'
    | 'text-after-edge'
    | 'text-before-edge';

  // Media queries
  [key: `@media${string}`]: Style;
};
```

### SafeStyle

The resolved output style with normalized values:

```ts
type SafeStyle = {
  // All shorthand properties expanded
  // All units converted to points (numbers)
  // All colors normalized
  // Transforms parsed into structured arrays
};
```

### Transform

```ts
type Transform =
  | { operation: 'translate'; value: [number, number] }
  | { operation: 'rotate'; value: [number] }
  | { operation: 'scale'; value: [number, number] }
  | { operation: 'skew'; value: [number, number] }
  | {
      operation: 'matrix';
      value: [number, number, number, number, number, number];
    };
```

### FontWeight

```ts
type FontWeight =
  | number
  | 'thin'
  | 'hairline'
  | 'ultralight'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'demibold'
  | 'bold'
  | 'ultrabold'
  | 'extrabold'
  | 'heavy'
  | 'black';
```

## License

MIT
