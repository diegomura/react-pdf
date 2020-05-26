const fs = require('fs');
const render = require('@react-pdf/render');
const pdfkit = require('@react-pdf/pdfkit');
const primitives = require('@react-pdf/primitives');

const PDFDocument = pdfkit.default;

const ctx = new PDFDocument({ autoFirstPage: false });

const subview = {
  type: primitives.VIEW,
  box: {
    left: 0,
    top: 0,
    width: 20,
    height: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  style: {
    opacity: 0.5,
    backgroundColor: 'blue',
  },
};

const view = {
  type: primitives.VIEW,
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
    paddingTop: 5,
    marginLeft: 5,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 1,
    borderRightWidth: 4,
  },
  children: [subview],
};

const note = {
  type: primitives.NOTE,
  box: { left: 200, top: 20 },
  children: [
    {
      type: primitives.TEXT_INSTANCE,
      value: 'This is a note',
    },
  ],
};

const circle = {
  type: primitives.CIRCLE,
  props: {
    cx: 50,
    cy: 50,
    r: 40,
    stroke: 'black',
    strokeWidth: 3,
    fill: 'red',
  },
};

const rectangle = {
  type: primitives.RECT,
  props: {
    x: 100,
    y: 100,
    ry: 10,
    rx: 10,
    width: 100,
    height: 50,
    opacity: 0.6,
    stroke: 'black',
    strokeWidth: 3,
    fill: 'green',
  },
};

const ellipse = {
  type: primitives.ELLIPSE,
  props: {
    cx: 150,
    cy: 40,
    rx: 50,
    ry: 10,
    fill: 'yellow',
    stroke: 'purple',
    strokeWidth: 2,
  },
};

const line = {
  type: primitives.LINE,
  props: {
    x1: 0,
    y1: 0,
    x2: 200,
    y2: 200,
    strokeWidth: 2,
    stroke: '#CACACA',
  },
};

const polygon = {
  type: primitives.POLYGON,
  props: {
    points: '100,10 40,198 190,78 10,78 160,198',
    fill: 'lime',
    stroke: 'purple',
    strokeWidth: 2,
    fillRule: 'nonzero',
  },
};

const polyline = {
  type: primitives.POLYLINE,
  props: {
    points: '0,40 40,40 40,80 80,80 80,120 120,120 120,160',
    fill: 'white',
    fillOpacity: 0,
    stroke: 'red',
    strokeWidth: 4,
  },
};

const path = {
  type: primitives.PATH,
  props: {
    d: 'M150 0 L75 200 L225 200 Z',
    fill: 'black',
  },
};

const bezier = {
  type: primitives.PATH,
  props: {
    d: 'M 100 350 q 150 -300 300 0',
    strokeWidth: 5,
    stroke: 'blue',
    fill: 'white',
    fillOpacity: 0,
  },
};

const linecaps = {
  type: primitives.GROUP,
  children: [
    {
      type: primitives.PATH,
      props: {
        d: 'M5 20 l215 0',
        stroke: 'black',
        strokeWidth: 4,
        strokeLinecap: 'butt',
        strokeDasharray: '5,5',
    },
},
{
    type: primitives.PATH,
    props: {
        d: 'M5 40 l215 0',
        stroke: 'black',
        strokeWidth: 4,
        strokeLinecap: 'round',
        strokeDasharray: '10,10',
    },
},
{
    type: primitives.PATH,
    props: {
        d: 'M5 60 l215 0',
        stroke: 'black',
        strokeWidth: 4,
        strokeLinecap: 'square',
        strokeDasharray: '20,10,5,5,5,10',
      },
    },
  ],
};

const svg = {
  type: primitives.SVG,
  props: {
    viewBox: {
      minX: 0,
      minY: 0,
      maxX: 300,
      maxy: 380,
    },
  },
  style: {
    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderBottomColor: 'black',
    borderRightColor: 'black',
  },
  box: {
    left: 20,
    top: 200,
    width: 300,
    height: 380,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  children: [
    path,
    circle,
    rectangle,
    ellipse,
    line,
    polygon,
    polyline,
    bezier,
    linecaps,
  ],
};

const doc = {
  type: primitives.DOCUMENT,
  children: [
    {
      type: primitives.PAGE,
      props: { size: 'A4' },
      box: { left: 0, top: 0, width: 400, height: 600 },
      children: [view, note, svg],
    },
    {
      type: primitives.PAGE,
      props: { size: 'A4' },
      box: { left: 0, top: 0, width: 400, height: 200 },
    },
  ],
};

render.default(ctx, doc);

const stream = fs.createWriteStream('./test.pdf');

ctx.pipe(stream);

console.log(primitives);
