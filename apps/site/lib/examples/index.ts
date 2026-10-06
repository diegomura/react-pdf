import breakable_unbreakable from './breakable-unbreakable';
import checkbox from './checkbox';
import circle from './circle';
import clippath from './clippath';
import debugging from './debugging';
import disable_hyphenation from './disable-hyphenation';
import disable_wrapping from './disable-wrapping';
import ellipse from './ellipse';
import emoji from './emoji';
import fixed_components from './fixed-components';
import float from './float';
import font_feature_settings from './font-feature-settings';
import font_register from './font-register';
import formfield from './formfield';
import fractals from './fractals';
import g from './g';
import hyphenation_callback from './hyphenation-callback';
import images from './images';
import inline_styles from './inline-styles';
import knobs from './knobs';
import line from './line';
import lineargradient from './lineargradient';
import math from './math';
import media_queries from './media-queries';
import mixed_styles from './mixed-styles';
import orphans_and_widows from './orphans-and-widows';
import page_breaks from './page-breaks';
import page_numbers from './page-numbers';
import page_wrap from './page-wrap';
import path from './path';
import picker_formlist from './picker-formlist';
import polygon from './polygon';
import polyline from './polyline';
import quick_start from './quick-start';
import radialgradient from './radialgradient';
import rect from './rect';
import resume from './resume';
import shape_outside from './shape-outside';
import styles from './styles';
import svg from './svg';
import svgtext from './svgtext';
import tailwind from './tailwind';
import text from './text';
import textinput from './textinput';

export const examples: Record<string, string> = {
  'breakable-unbreakable': breakable_unbreakable,
  checkbox: checkbox,
  circle: circle,
  clippath: clippath,
  debugging: debugging,
  'disable-hyphenation': disable_hyphenation,
  'disable-wrapping': disable_wrapping,
  ellipse: ellipse,
  emoji: emoji,
  'fixed-components': fixed_components,
  float: float,
  'font-feature-settings': font_feature_settings,
  'font-register': font_register,
  formfield: formfield,
  fractals: fractals,
  g: g,
  'hyphenation-callback': hyphenation_callback,
  images: images,
  'inline-styles': inline_styles,
  knobs: knobs,
  line: line,
  lineargradient: lineargradient,
  math: math,
  'media-queries': media_queries,
  'mixed-styles': mixed_styles,
  'orphans-and-widows': orphans_and_widows,
  'page-breaks': page_breaks,
  'page-numbers': page_numbers,
  'page-wrap': page_wrap,
  path: path,
  'picker-formlist': picker_formlist,
  polygon: polygon,
  polyline: polyline,
  'quick-start': quick_start,
  radialgradient: radialgradient,
  rect: rect,
  resume: resume,
  'shape-outside': shape_outside,
  styles: styles,
  svg: svg,
  svgtext: svgtext,
  tailwind: tailwind,
  text: text,
  textinput: textinput,
};

// First match wins, so `svgtext` lands in SVG and `textinput` in Forms.
const RULES: [string, RegExp][] = [
  [
    'SVG',
    /^(svg|svgtext|circle|ellipse|line|path|polygon|polyline|rect|g|clippath|lineargradient|radialgradient|fractals)$/,
  ],
  ['Forms', /checkbox|formfield|picker|textinput/],
  ['Text & fonts', /text|font|hyphenation|emoji/],
  ['Layout & pagination', /page|break|orphans|widows|fixed|float|shape|wrap/],
  ['Images', /image/],
  ['Advanced', /math|resume|knobs|tailwind/],
];

const FALLBACK = 'Essentials';

const GROUP_ORDER = [
  FALLBACK,
  'Text & fonts',
  'Layout & pagination',
  'Images',
  'SVG',
  'Forms',
  'Advanced',
];

const groupOf = (name: string) =>
  RULES.find(([, pattern]) => pattern.test(name))?.[0] ?? FALLBACK;

export const groupedExamples = GROUP_ORDER.map((group) => ({
  group,
  names: Object.keys(examples)
    .filter((name) => groupOf(name) === group)
    .sort(),
})).filter(({ names }) => names.length > 0);
