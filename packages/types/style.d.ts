export interface Style {
  // Flexbox

  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
  flex?: number | string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexFlow?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;

  // Layout

  aspectRatio?: number | string;
  bottom?: number | string;
  display?: 'flex' | 'none';
  left?: number | string;
  position?: 'absolute' | 'relative';
  right?: number | string;
  top?: number | string;
  overflow?: 'hidden';
  zIndex?: number | string;

  // Dimension

  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  width?: number | string;

  // Color

  backgroundColor?: string;
  color?: string;
  opacity?: number;

  // Text

  fontSize?: number | string;
  fontFamily?: string;
  fontStyle?: string | 'normal';
  fontWeight?:
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
  letterSpacing?: number | string;
  lineHeight?: number | string;
  maxLines?: number; // ?
  textAlign?: 'left' | 'right' | 'center' | 'justify'; // ?
  textDecoration?:
    | 'line-through'
    | 'underline'
    | 'none'
    | 'line-through underline'
    | 'underline line-through';
  textDecorationColor?: string;
  textDecorationStyle?: 'dashed' | 'dotted' | 'solid' | string; // ?
  textIndent?: any; // ?
  textOverflow?: 'ellipsis';
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase';
  verticalAlign?: 'sub' | 'super';

  // Sizing/positioning

  objectFit?: string;
  objectPosition?: number | string;
  objectPositionX?: number | string;
  objectPositionY?: number | string;

  // Margin/padding

  margin?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;

  // Transformations

  transform?: string;
  transformOrigin?: number | string;
  transformOriginX?: number | string;
  transformOriginY?: number | string;

  // Borders

  border?: number | string;
  borderWidth?: number | string;
  borderColor?: string;
  borderStyle?: 'dashed' | 'dotted' | 'solid';
  borderTop?: number | string;
  borderTopColor?: string;
  borderTopStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderTopWidth?: number | string;
  borderRight?: number | string;
  borderRightColor?: string;
  borderRightStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderRightWidth?: number | string;
  borderBottom?: number | string;
  borderBottomColor?: string;
  borderBottomStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderBottomWidth?: number | string;
  borderLeft?: number | string;
  borderLeftColor?: string;
  borderLeftStyle?: 'dashed' | 'dotted' | 'solid'; // ?
  borderLeftWidth?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
  borderRadius?: number | string;
}
