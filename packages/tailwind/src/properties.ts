import { Style } from '@react-pdf/types';

const negativeProperties = [
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  'translate',
  'scale',
  'rotate',
  'skew',
  'order',
  'margin',
] as const;

export function isNegativeProperty(
  key: unknown,
): key is (typeof negativeProperties)[number] {
  return typeof key === 'string' && negativeProperties.includes(key as any);
}

const scaledProperties = [
  'borderRadius',
  'borderWidth',
  'flexBasis',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'gap',
  'height',
  'inset',
  'letterSpacing',
  'lineClamp',
  'lineHeight',
  'margin',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'objectPosition',
  'opacity',
  'order',
  'padding',
  'rotate',
  'scale',
  'size',
  'skew',
  'textIndent',
  'transformOrigin',
  'translate',
  'width',
  'zIndex',
] as const;

export type ScaledProperty = (typeof scaledProperties)[number];

export function isScaledProperty(key: unknown): key is ScaledProperty {
  return typeof key === 'string' && scaledProperties.includes(key as any);
}

// Reach Yoga, which throws on anything it can't read as a length.
const dimensionProperties = [
  // Not borderWidth/fontSize: `border-*` and `text-*` disambiguate by colour.
  'borderRadius',
  'flexBasis',
  'gap',
  'height',
  'inset',
  'margin',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'padding',
  'size',
  'width',
] as const;

export function isDimensionProperty(
  key: unknown,
): key is (typeof dimensionProperties)[number] {
  return typeof key === 'string' && dimensionProperties.includes(key as any);
}

// Mirrors the units @react-pdf/stylesheet parses, plus percentages and `auto`.
const RENDERABLE_LENGTH = /^-?\d*\.?\d+(in|mm|cm|pt|vh|vw|px|rem|%)?$/;

export function isRenderableLength(value: string) {
  return value === 'auto' || RENDERABLE_LENGTH.test(value);
}

export const exactUtilities: Record<string, Style> = {
  // Layout
  flex: { display: 'flex' },
  hidden: { display: 'none' },
  'object-contain': { objectFit: 'contain' },
  'object-cover': { objectFit: 'cover' },
  'object-fill': { objectFit: 'fill' },
  'object-none': { objectFit: 'none' },
  'object-scale-down': { objectFit: 'scale-down' },
  'overflow-hidden': { overflow: 'hidden' },
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  'float-left': { float: 'left' },
  'float-right': { float: 'right' },
  'float-none': { float: 'none' },
  'clear-left': { clear: 'left' },
  'clear-right': { clear: 'right' },
  'clear-both': { clear: 'both' },
  'clear-none': { clear: 'none' },
  // Flexbox
  'flex-row': { flexDirection: 'row' },
  'flex-row-reverse': { flexDirection: 'row-reverse' },
  'flex-col': { flexDirection: 'column' },
  'flex-col-reverse': { flexDirection: 'column-reverse' },
  'flex-wrap': { flexWrap: 'wrap' },
  'flex-wrap-reverse': { flexWrap: 'wrap-reverse' },
  'flex-nowrap': { flexWrap: 'nowrap' },
  'flex-1': { flex: '1 1 0%' },
  'flex-auto': { flex: '1 1 auto' },
  'flex-initial': { flex: '0 1 auto' },
  'flex-none': { flex: 'none' },
  grow: { flexGrow: 1 },
  'grow-0': { flexGrow: 0 },
  shrink: { flexShrink: 1 },
  'shrink-0': { flexShrink: 0 },
  'justify-start': { justifyContent: 'flex-start' },
  'justify-end': { justifyContent: 'flex-end' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'justify-around': { justifyContent: 'space-around' },
  'justify-evenly': { justifyContent: 'space-evenly' },
  'content-start': { alignContent: 'flex-start' },
  'content-end': { alignContent: 'flex-end' },
  'content-center': { alignContent: 'center' },
  'content-between': { alignContent: 'space-between' },
  'content-around': { alignContent: 'space-around' },
  'items-start': { alignItems: 'flex-start' },
  'items-end': { alignItems: 'flex-end' },
  'items-center': { alignItems: 'center' },
  'items-baseline': { alignItems: 'baseline' },
  'items-stretch': { alignItems: 'stretch' },
  'self-auto': { alignSelf: 'auto' },
  'self-start': { alignSelf: 'flex-start' },
  'self-end': { alignSelf: 'flex-end' },
  'self-center': { alignSelf: 'center' },
  'self-baseline': { alignSelf: 'baseline' },
  'self-stretch': { alignSelf: 'stretch' },
  // Typography
  italic: { fontStyle: 'italic' },
  'not-italic': { fontStyle: 'normal' },
  'text-left': { textAlign: 'left' },
  'text-center': { textAlign: 'center' },
  'text-right': { textAlign: 'right' },
  'text-justify': { textAlign: 'justify' },
  'text-inherit': { color: 'inherit' },
  'text-current': { color: 'currentColor' },
  'text-transparent': { color: 'transparent' },
  'text-black': { color: 'black' },
  'text-white': { color: 'white' },
  underline: { textDecoration: 'underline' },
  'decoration-solid': { textDecorationStyle: 'solid' },
  'decoration-double': { textDecorationStyle: 'double' },
  'decoration-dotted': { textDecorationStyle: 'dotted' },
  'decoration-dashed': { textDecorationStyle: 'dashed' },
  'decoration-wavy': { textDecorationStyle: 'wavy' },
  'decoration-inherit': { textDecorationColor: 'inherit' },
  'decoration-current': { textDecorationColor: 'currentColor' },
  'decoration-transparent': { textDecorationColor: 'transparent' },
  'decoration-black': { textDecorationColor: 'black' },
  'decoration-white': { textDecorationColor: 'white' },
  'line-through': { textDecoration: 'line-through' },
  'no-underline': { textDecoration: 'none' },
  ordinal: { fontFeatureSettings: ['ordn'] },
  'slashed-zero': { fontFeatureSettings: ['zero'] },
  'lining-nums': { fontFeatureSettings: ['lnum'] },
  'oldstyle-nums': { fontFeatureSettings: ['onum'] },
  'proportional-nums': { fontFeatureSettings: ['pnum'] },
  'tabular-nums': { fontFeatureSettings: ['tnum'] },
  'diagonal-fractions': { fontFeatureSettings: ['frac'] },
  'stacked-fractions': { fontFeatureSettings: ['afrc'] },
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  'text-ellipsis': { textOverflow: 'ellipsis' },
  // Backgrounds
  'bg-inherit': { backgroundColor: 'inherit' },
  'bg-current': { backgroundColor: 'currentColor' },
  'bg-transparent': { backgroundColor: 'transparent' },
  'bg-black': { backgroundColor: 'black' },
  'bg-white': { backgroundColor: 'white' },
  // Borders
  'border-solid': { borderStyle: 'solid' },
  'border-dashed': { borderStyle: 'dashed' },
  'border-dotted': { borderStyle: 'dotted' },
  'border-inherit': { borderColor: 'inherit' },
  'border-current': { borderColor: 'currentColor' },
  'border-transparent': { borderColor: 'transparent' },
  'border-black': { borderColor: 'black' },
  'border-white': { borderColor: 'white' },
  'border-x-inherit': {
    borderLeftColor: 'inherit',
    borderRightColor: 'inherit',
  },
  'border-x-current': {
    borderLeftColor: 'currentColor',
    borderRightColor: 'currentColor',
  },
  'border-x-transparent': {
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  'border-x-black': { borderLeftColor: 'black', borderRightColor: 'black' },
  'border-x-white': { borderLeftColor: 'white', borderRightColor: 'white' },
  'border-y-inherit': {
    borderTopColor: 'inherit',
    borderBottomColor: 'inherit',
  },
  'border-y-current': {
    borderTopColor: 'currentColor',
    borderBottomColor: 'currentColor',
  },
  'border-y-transparent': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  'border-y-black': { borderTopColor: 'black', borderBottomColor: 'black' },
  'border-y-white': { borderTopColor: 'white', borderBottomColor: 'white' },
  'border-t-inherit': { borderTopColor: 'inherit' },
  'border-t-current': { borderTopColor: 'currentColor' },
  'border-t-transparent': { borderTopColor: 'transparent' },
  'border-t-black': { borderTopColor: 'black' },
  'border-t-white': { borderTopColor: 'white' },
  'border-r-inherit': { borderRightColor: 'inherit' },
  'border-r-current': { borderRightColor: 'currentColor' },
  'border-r-transparent': { borderRightColor: 'transparent' },
  'border-r-black': { borderRightColor: 'black' },
  'border-r-white': { borderRightColor: 'white' },
  'border-b-inherit': { borderBottomColor: 'inherit' },
  'border-b-current': { borderBottomColor: 'currentColor' },
  'border-b-transparent': { borderBottomColor: 'transparent' },
  'border-b-black': { borderBottomColor: 'black' },
  'border-b-white': { borderBottomColor: 'white' },
  'border-l-inherit': { borderLeftColor: 'inherit' },
  'border-l-current': { borderLeftColor: 'currentColor' },
  'border-l-transparent': { borderLeftColor: 'transparent' },
  'border-l-black': { borderLeftColor: 'black' },
  'border-l-white': { borderLeftColor: 'white' },
};

export const utilityPatterns: Record<
  string,
  string | [string, string | string[]]
> = {
  // Layout
  object: 'objectPosition',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  z: 'zIndex',
  // Flexbox
  basis: 'flexBasis',
  flex: 'flex',
  'gap-x': ['gap', 'columnGap'],
  'gap-y': ['gap', 'rowGap'],
  gap: 'gap',
  grow: 'flexGrow',
  shrink: 'flexShrink',
  order: 'order',
  // Spacing
  m: 'margin',
  mx: ['margin', ['marginLeft', 'marginRight']],
  my: ['margin', ['marginTop', 'marginBottom']],
  ml: ['margin', 'marginLeft'],
  mr: ['margin', 'marginRight'],
  mt: ['margin', 'marginTop'],
  mb: ['margin', 'marginBottom'],
  p: 'padding',
  px: ['padding', ['paddingLeft', 'paddingRight']],
  py: ['padding', ['paddingTop', 'paddingBottom']],
  pl: ['padding', 'paddingLeft'],
  pr: ['padding', 'paddingRight'],
  pt: ['padding', 'paddingTop'],
  pb: ['padding', 'paddingBottom'],
  // Sizing
  w: 'width',
  'min-w': 'minWidth',
  'max-w': 'maxWidth',
  h: 'height',
  'min-h': 'minHeight',
  'max-h': 'maxHeight',
  size: ['size', ['width', 'height']],
  // Typography
  'line-clamp': ['lineClamp', 'maxLines'],
  leading: 'lineHeight',
  tracking: 'letterSpacing',
  indent: 'textIndent',
  // Backgrounds
  bg: 'backgroundColor',
  // Effects
  opacity: 'opacity',
  // Transforms
  origin: 'transformOrigin',
};
