<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/primitives

Internal element type constants for react-pdf. This package defines the primitive node types used throughout the react-pdf rendering pipeline.

## Installation

```bash
yarn add @react-pdf/primitives
```

## Usage

```js
import { View, Text, Page, Document } from '@react-pdf/primitives';

console.log(View); // 'VIEW'
console.log(Text); // 'TEXT'
console.log(Page); // 'PAGE'
console.log(Document); // 'DOCUMENT'
```

These constants are primarily used internally by react-pdf packages to identify element types during the rendering process.

## Available Primitives

### Document Structure

| Export     | Value        | Description                       |
| ---------- | ------------ | --------------------------------- |
| `Document` | `'DOCUMENT'` | Root document container           |
| `Page`     | `'PAGE'`     | Individual page within a document |
| `View`     | `'VIEW'`     | Generic container element         |
| `Text`     | `'TEXT'`     | Text content container            |
| `Link`     | `'LINK'`     | Hyperlink element                 |
| `Note`     | `'NOTE'`     | Annotation/note element           |
| `Image`    | `'IMAGE'`    | Image element                     |
| `Canvas`   | `'CANVAS'`   | Custom drawing canvas             |

### Form Elements

| Export      | Value          | Description                   |
| ----------- | -------------- | ----------------------------- |
| `FieldSet`  | `'FIELD_SET'`  | Form field grouping container |
| `TextInput` | `'TEXT_INPUT'` | Text input field              |
| `Select`    | `'SELECT'`     | Dropdown select field         |
| `Checkbox`  | `'CHECKBOX'`   | Checkbox input field          |
| `List`      | `'LIST'`       | List element for forms        |

### SVG Elements

| Export           | Value               | Description                |
| ---------------- | ------------------- | -------------------------- |
| `Svg`            | `'SVG'`             | SVG root container         |
| `G`              | `'G'`               | SVG group element          |
| `Path`           | `'PATH'`            | SVG path element           |
| `Rect`           | `'RECT'`            | SVG rectangle element      |
| `Line`           | `'LINE'`            | SVG line element           |
| `Circle`         | `'CIRCLE'`          | SVG circle element         |
| `Ellipse`        | `'ELLIPSE'`         | SVG ellipse element        |
| `Polygon`        | `'POLYGON'`         | SVG polygon element        |
| `Polyline`       | `'POLYLINE'`        | SVG polyline element       |
| `Tspan`          | `'TSPAN'`           | SVG text span element      |
| `ClipPath`       | `'CLIP_PATH'`       | SVG clipping path          |
| `Defs`           | `'DEFS'`            | SVG definitions container  |
| `Stop`           | `'STOP'`            | Gradient stop element      |
| `LinearGradient` | `'LINEAR_GRADIENT'` | Linear gradient definition |
| `RadialGradient` | `'RADIAL_GRADIENT'` | Radial gradient definition |

### Internal Types

| Export         | Value             | Description                             |
| -------------- | ----------------- | --------------------------------------- |
| `TextInstance` | `'TEXT_INSTANCE'` | Internal representation of text content |

## License

MIT
