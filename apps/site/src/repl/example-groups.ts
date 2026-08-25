import { examples } from './examples';

// First match wins, so `svgtext` lands in SVG and `textinput` in Forms.
const RULES: [string, RegExp][] = [
  [
    'SVG',
    /^(svg|svgtext|circle|ellipse|line|path|polygon|polyline|rect|g|clippath|lineargradient|radialgradient|fractals)$/,
  ],
  ['Forms', /checkbox|formfield|picker|textinput/],
  ['Text & fonts', /text|font|hyphenation|emoji|wrapping/],
  ['Layout & pagination', /page|break|orphans|widows|fixed|float/],
  ['Images', /image/],
  ['Advanced', /math|resume|knobs/],
];

const FALLBACK = 'Essentials';

export const GROUP_ORDER = [
  FALLBACK,
  'Text & fonts',
  'Layout & pagination',
  'Images',
  'SVG',
  'Forms',
  'Advanced',
];

export const groupOf = (name: string) =>
  RULES.find(([, pattern]) => pattern.test(name))?.[0] ?? FALLBACK;

export const groupedExamples = GROUP_ORDER.map((group) => ({
  group,
  names: Object.keys(examples)
    .filter((name) => groupOf(name) === group)
    .sort(),
})).filter(({ names }) => names.length > 0);
