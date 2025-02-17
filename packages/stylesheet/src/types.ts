export type Container = {
  dpi?: number;
  remBase?: number;
  width?: number;
  height?: number;
  orientation?: 'landscape' | 'portrait';
};

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
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
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
  rowGap?: number;
  columnGap?: number;
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

export type TransformShorthandStyle = {
  transformOrigin?: number | string;
};

export type TransformExpandedStyle = {
  transformOriginX?: number | string;
  transformOriginY?: number | string;
  transform?: string;
};

export type TransformSafeStyle = TransformExpandedStyle & {
  transformOriginX?: number;
  transformOriginY?: number;
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
  height?: number;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  width?: number;
};

// Colors

export type ColorStyle = {
  backgroundColor?: string;
  color?: string;
  opacity?: number;
};

export type ColorExpandedStyle = ColorStyle;

export type ColorSafeStyle = ColorExpandedStyle;

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

export type TextTransform = 'capitalize' | 'lowercase' | 'uppercase' | 'none';

export type VerticalAlign = 'sub' | 'super';

export type TextStyle = {
  fontSize?: number | string;
  fontFamily?: string | string[];
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
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
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
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
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
};

export type PaddingStyle = PaddingShorthandStyle & PaddingExpandedStyle;

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
  TransformStyle;

type MediaQueryStyle = {
  [key in `@media${string}`]: BaseStyle;
};

export type Style = BaseStyle & MediaQueryStyle;

export type StyleKey = keyof Style;

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
  TransformExpandedStyle;

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
  TransformSafeStyle;
