<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/render

> React-pdf render engine

## How to install

```sh
yarn add @react-pdf/render
```

## How it works

```js
const render = require('@react-pdf/render');
const primitives = require('@react-pdf/primitives');

const view = {
  type: primitives.View,
  style: {
    backgroundColor: 'red',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderTopColor: 'yellow',
    borderLeftColor: 'green',
    borderBottomColor: 'black',
    borderRightColor: 'purple',
  },
  box: {
    left: 20,
    top: 20,
    width: 100,
    height: 80,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 1,
    borderRightWidth: 4,
  },
};

const doc = {
  type: primitives.Document,
  children: [
    {
      type: primitives.Page,
      box: { width: 400, height: 600 },
      children: [view],
    },
  ],
};

// Provide your own context
const ctx = createContext();

render.default(ctx, doc);
```

This library exports a `render` function that takes two arguments:

- _ctx_: This is the target context where the document is going to be rendered. React-pdf currently uses a [pdfkit](https://github.com/react-pdf/pdfkit) document as context, but it can target any other type of structure as long as it signature matches pdfkit API. In the future this will enable rendering documents into muliple formats in addition to PDF.
- _node_: Document root node. A node is a nested structure that defines a single element in a document. They are defined by it's `type` and arguments.

## Node structure

A node represents a single element inside a document. It's mainly defined by it's `type` (mandatory) field in addition to other values to define where that element is positioned inside the document (`box`), how it looks (`style`), how it should behave (`params`) and what sub-nodes it contains (`children`).

The root node must always be of type `DOCUMENT`, containing as many `PAGE` nodes as desired inside it's children field.

Bare in mind this package does not handle any type of node positioning, inheritance, style transformations or any other layout related logic. It's role is limited to render exactly the node it get's into the provided context. Take this into account when definig styles as `paddingTop`, `paddingLeft` and so on instead of the shortcut `padding`. For layout or styles transformation this project provides separate packages.

### node.type

Mandatory field specifiying the type of the particular node. The full list of types can be found and imported from `@react-pdf/primitives`

### node.box

Defines bounding box where a particular node is located inside a document

- left
- top
- width
- height
- paddingTop
- paddingLeft
- paddingBottom
- paddingRight
- marginTop
- marginLeft
- marginBottom
- marginRight
- borderTopWidth
- borderLeftWidth
- borderBottomWidth
- borderRightWidth

### node.style

Defines how the node looks like. There are some types of nodes that expect special style values, but generally all support:

- color
- opacity
- overflow
- backgroundColor
- borderTopLeftRadius
- borderTopRightRadius
- borderBottomLeftRadius
- borderBottomRightRadius
- borderTopColor
- borderLeftColor
- borderBottomColor
- borderRightColor
- _others..._

### node.props

Specific node params needed to render correctly ot behave like certain way. Specially needed for SVG nodes

## PDF example

```js
const fs = require('fs');
const render = require('@react-pdf/render');
const pdfkit = require('@react-pdf/pdfkit');

const PDFDocument = pdfkit.default;

const ctx = new PDFDocument({ autoFirstPage: false });

const doc = {}; // See above

render.default(ctx, doc);

const stream = fs.createWriteStream('./test.pdf');

ctx.pipe(stream);
```

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
