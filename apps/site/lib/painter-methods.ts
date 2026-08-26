/**
 * The Painter object passed to a Canvas `paint` callback. These are pdfkit's
 * drawing methods, grouped so the set is scannable — the reference for what
 * each one takes lives in pdfkit's own docs, which the page links to.
 */
export const painterGroups: { name: string; methods: string[] }[] = [
  {
    name: 'Shapes',
    methods: ['rect', 'roundedRect', 'circle', 'ellipse', 'polygon'],
  },
  {
    name: 'Paths',
    methods: ['path', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo'],
  },
  {
    name: 'Painting',
    methods: ['fill', 'stroke', 'clip'],
  },
  {
    name: 'Color',
    methods: [
      'fillColor',
      'strokeColor',
      'opacity',
      'fillOpacity',
      'strokeOpacity',
    ],
  },
  {
    name: 'Strokes',
    methods: ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'dash'],
  },
  {
    name: 'Gradients',
    methods: ['linearGradient', 'radialGradient'],
  },
  {
    name: 'Text',
    methods: ['font', 'fontSize', 'text'],
  },
  {
    name: 'Transform',
    methods: ['translate', 'scale', 'rotate'],
  },
  {
    name: 'State',
    methods: ['save', 'restore'],
  },
];
