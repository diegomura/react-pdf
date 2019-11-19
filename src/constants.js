export const VIEW = 'VIEW';
export const TEXT = 'TEXT';
export const LINK = 'LINK';
export const PAGE = 'PAGE';
export const NOTE = 'NOTE';
export const IMAGE = 'IMAGE';
export const DOCUMENT = 'DOCUMENT';
export const CANVAS = 'CANVAS';
export const TEXT_INSTANCE = 'TEXT_INSTANCE';
export const SVG = 'SVG';
export const GROUP = 'G';
export const PATH = 'PATH';
export const RECT = 'RECT';
export const LINE = 'LINE';
export const CIRCLE = 'CIRCLE';
export const ELLIPSE = 'ELLIPSE';
export const POLYGON = 'POLYGON';
export const POLYLINE = 'POLYLINE';
export const DEFS = 'DEFS';
export const TSPAN = 'TSPAN';
export const CLIP_PATH = 'CLIP_PATH';
export const STOP = 'STOP';
export const LINEAR_GRADIENT = 'LINEAR_GRADIENT';

export const DPI = 72; // 72pt per inch.

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900,
};

export const PAGE_SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0],
};

export const PORTRAIT = 'portrait';
export const LANDSCAPE = 'landscape';

export const INHERITED_PROPERTIES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'opacity',
  'textDecoration',
  'lineHeight',
  'textAlign',
  'visibility',
  'wordSpacing',
];

export const SVG_INHERITED_PROPS = [
  'x',
  'y',
  'clipPath',
  'clipRule',
  'opacity',
  'fill',
  'fillOpacity',
  'fillRule',
  'stroke',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeOpacity',
  'strokeWidth',
  'textAnchor',
  ...INHERITED_PROPERTIES,
];

export const RULER_WIDTH = 13;
export const RULER_COLOR = 'white';
export const RULER_FONT_SIZE = 6;
export const DEFAULT_RULER_STEPS = 50;
export const LINE_WIDTH = 0.5;
export const LINE_COLOR = 'gray';
export const GRID_COLOR = '#ababab';
