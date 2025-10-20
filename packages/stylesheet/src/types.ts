export type Container = {
  width: number;
  height: number;
  dpi?: number;
  remBase?: number;
  orientation?: 'landscape' | 'portrait';
};

export type Percentage = `${string}%`;

// Borders

export type BorderStyleValue = 'dashed' | 'dotted' | 'solid';

export type BorderShorthandStyle = {
  border?: number | string;
  borderTop?: number | string;
  borderRight?: number | string;
  borderBottom?: number | string;
  borderLeft?: number | string;
  borderColor?: string;
  borderRadius?: number | string;
  borderStyle?: BorderStyleValue;
  borderWidth?: number | string;
};

export type BorderExpandedStyle = {
  borderTopColor?: string;
  borderTopStyle?: BorderStyleValue;
  borderTopWidth?: number | string;
  borderRightColor?: string;
  borderRightStyle?: BorderStyleValue;
  borderRightWidth?: number | string;
  borderBottomColor?: string;
  borderBottomStyle?: BorderStyleValue;
  borderBottomWidth?: number | string;
  borderLeftColor?: string;
  borderLeftStyle?: BorderStyleValue;
  borderLeftWidth?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
};

export type BorderSafeStyle = BorderExpandedStyle & {
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderTopLeftRadius?: number | Percentage;
  borderTopRightRadius?: number | Percentage;
  borderBottomRightRadius?: number | Percentage;
  borderBottomLeftRadius?: number | Percentage;
};

export type BorderStyle = BorderShorthandStyle & BorderExpandedStyle;

// Flexbox

export type FlexboxShorthandStyle = {
  flex?: number | string;
};

export type AlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type AlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

export type AlignSelf =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type JustifySelf = string; // not really supported

export type FlexboxExpandedStyle = {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  flexFlow?: number | string;
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexBasis?: number | string;
  justifySelf?: JustifySelf;
  justifyContent?: JustifyContent;
};

export type FlexboxSafeStyle = FlexboxExpandedStyle & {
  flexGrow?: number;
  flexShrink?: number;
};

export type FlexboxStyle = FlexboxShorthandStyle & FlexboxExpandedStyle;

// Gap

export type GapShorthandStyle = {
  gap?: number | string;
};

export type GapExpandedStyle = {
  rowGap?: number | string;
  columnGap?: number | string;
};

export type GapSafeStyle = {
  rowGap?: number | Percentage;
  columnGap?: number | Percentage;
};

export type GapStyle = GapShorthandStyle & GapExpandedStyle;

// Sizing/positioning

export type PositionShorthandStyle = {
  objectPosition?: number | string;
};

export type PositionExpandedStyle = {
  objectPositionX?: number | string;
  objectPositionY?: number | string;
  objectFit?: string;
};

export type PositionSafeStyle = PositionExpandedStyle & {
  objectPositionX?: number;
  objectPositionY?: number;
};

export type PositioningStyle = PositionShorthandStyle & PositionExpandedStyle;

// Transform

export type ScaleTransform = {
  operation: 'scale';
  value: [number, number];
};

export type TranslateTransform = {
  operation: 'translate';
  value: [number, number];
};

export type RotateTransform = {
  operation: 'rotate';
  value: [number];
};

export type SkewTransform = {
  operation: 'skew';
  value: [number, number];
};

export type MatrixTransform = {
  operation: 'matrix';
  value: [number, number, number, number, number, number];
};

export type Transform =
  | ScaleTransform
  | TranslateTransform
  | RotateTransform
  | SkewTransform
  | MatrixTransform;

export type TransformShorthandStyle = {
  transformOrigin?: number | string;
};

export type TransformExpandedStyle = {
  transformOriginX?: number | string;
  transformOriginY?: number | string;
  transform?: string | Transform[];
  gradientTransform?: string | Transform[];
};

export type TransformSafeStyle = Omit<TransformExpandedStyle, 'transform'> & {
  transformOriginX?: number | Percentage;
  transformOriginY?: number | Percentage;
  transform?: Transform[];
  gradientTransform?: Transform[];
};

export type TransformStyle = TransformShorthandStyle & TransformExpandedStyle;

// Layout

export type Display = 'flex' | 'none';

export type Position = 'absolute' | 'relative' | 'static';

export type LayoutStyle = {
  aspectRatio?: number | string;
  bottom?: number | string;
  display?: Display;
  left?: number | string;
  position?: Position;
  right?: number | string;
  top?: number | string;
  overflow?: 'hidden';
  zIndex?: number | string;
};

export type LayoutExpandedStyle = LayoutStyle;

export type LayoutSafeStyle = LayoutExpandedStyle & {
  aspectRatio?: number;
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  zIndex?: number;
};

// Dimensions

export type DimensionStyle = {
  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  width?: number | string;
};

export type DimensionExpandedStyle = DimensionStyle;

export type DimensionSafeStyle = DimensionExpandedStyle & {
  height?: number | Percentage;
  maxHeight?: number | Percentage;
  maxWidth?: number | Percentage;
  minHeight?: number | Percentage;
  minWidth?: number | Percentage;
  width?: number | Percentage;
};

// Colors

export type ColorStyle = {
  backgroundColor?: string;
  color?: string;
  opacity?: number | string;
};

export type ColorExpandedStyle = ColorStyle;

export type ColorSafeStyle = {
  backgroundColor?: string;
  color?: string;
  opacity?: number;
};

// Text

export type FontStyle = 'normal' | 'italic' | 'oblique';

export type FontWeight =
  | string
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

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export type TextDecoration =
  | 'line-through'
  | 'underline'
  | 'none'
  | 'line-through underline'
  | 'underline line-through';

export type TextDecorationStyle = 'dashed' | 'dotted' | 'solid' | string;

export type TextTransform =
  | 'capitalize'
  | 'lowercase'
  | 'uppercase'
  | 'upperfirst'
  | 'none';

export type VerticalAlign = 'sub' | 'super';

export type FontFeatureSetting =
  | 'liga'
  | 'dlig'
  | 'onum'
  | 'lnum'
  | 'tnum'
  | 'zero'
  | 'frac'
  | 'sups'
  | 'subs'
  | 'smcp'
  | 'c2sc'
  | 'case'
  | 'hlig'
  | 'calt'
  | 'swsh'
  | 'hist'
  | 'ss**'
  | 'kern'
  | 'locl'
  | 'rlig'
  | 'medi'
  | 'init'
  | 'isol'
  | 'fina'
  | 'mark'
  | 'mkmk';
export type FontFeatureSettings =
  | FontFeatureSetting[]
  | Record<FontFeatureSetting, number>;

export type TextStyle = {
  direction?: 'ltr' | 'rtl';
  fontSize?: number | string;
  fontFamily?: string | string[];
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
  fontFeatureSettings?: FontFeatureSettings;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  maxLines?: number;
  textAlign?: TextAlign;
  textDecoration?: TextDecoration;
  textDecorationColor?: string;
  textDecorationStyle?: TextDecorationStyle;
  textIndent?: any; // ?
  textOverflow?: 'ellipsis';
  textTransform?: TextTransform;
  verticalAlign?: VerticalAlign;
};

export type TextExpandedStyle = TextStyle;

export type TextSafeStyle = TextExpandedStyle & {
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  lineHeight?: number;
};

// Margins

export type MarginShorthandStyle = {
  margin?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
};

export type MarginExpandedStyle = {
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
};

export type MarginSafeStyle = MarginExpandedStyle & {
  marginTop?: number | Percentage;
  marginRight?: number | Percentage;
  marginBottom?: number | Percentage;
  marginLeft?: number | Percentage;
};

export type MarginStyle = MarginShorthandStyle & MarginExpandedStyle;

// Paddings

export type PaddingShorthandStyle = {
  padding?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
};

export type PaddingExpandedStyle = {
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
};

export type PaddingSafeStyle = PaddingExpandedStyle & {
  paddingTop?: number | Percentage;
  paddingRight?: number | Percentage;
  paddingBottom?: number | Percentage;
  paddingLeft?: number | Percentage;
};

export type PaddingStyle = PaddingShorthandStyle & PaddingExpandedStyle;

// Svg

export interface SvgStyle {
  fill?: string;
  stroke?: string;
  strokeDasharray?: string;
  strokeWidth?: string | number;
  fillOpacity?: string | number;
  fillRule?: 'nonzero' | 'evenodd';
  strokeOpacity?: string | number;
  textAnchor?: 'start' | 'middle' | 'end';
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'butt' | 'round' | 'square' | 'miter' | 'bevel';
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
}

export type SvgExpandedStyle = SvgStyle;

export type SvgSafeStyle = SvgStyle & {
  strokeWidth?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
};

// Global

type BaseStyle = BorderStyle &
  ColorStyle &
  DimensionStyle &
  FlexboxStyle &
  GapStyle &
  LayoutStyle &
  MarginStyle &
  PaddingStyle &
  PositioningStyle &
  TextStyle &
  TransformStyle &
  SvgStyle;

type MediaQueryStyle = {
  [key in `@media${string}`]: BaseStyle;
};

export type Style = BaseStyle & MediaQueryStyle;

export type StyleKey = keyof BaseStyle;

export type ExpandedStyle = BorderExpandedStyle &
  ColorExpandedStyle &
  DimensionExpandedStyle &
  FlexboxExpandedStyle &
  GapExpandedStyle &
  LayoutExpandedStyle &
  MarginExpandedStyle &
  PaddingExpandedStyle &
  PositionExpandedStyle &
  TextExpandedStyle &
  TransformExpandedStyle &
  SvgExpandedStyle;

export type SafeStyle = BorderSafeStyle &
  ColorSafeStyle &
  DimensionSafeStyle &
  FlexboxSafeStyle &
  GapSafeStyle &
  LayoutSafeStyle &
  MarginSafeStyle &
  PaddingSafeStyle &
  PositionSafeStyle &
  TextSafeStyle &
  TransformSafeStyle &
  SvgSafeStyle;
