import { Factor as JustificationFactor } from './engines/justification/types';

export type Coordinate = {
  x: number;
  y: number;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Container = Rect & {
  truncateMode?: 'ellipsis';
  maxLines?: number;
  excludeRects?: Rect[];
};

export type Glyph = {
  id: number;
  advanceWidth: number;
  codePoints: number[];
  isMark?: boolean;
  isLigature?: boolean;
};

export type Position = {
  xAdvance: number;
  yAdvance: number;
  xOffset: number;
  yOffset: number;
};

export type Attachment = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type BBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
};

export type GlyphRun = {
  glyphs: Glyph[];
  positions: Position[];
  stringIndices: number[];
  script: string;
  language: string;
  direction: string;
  features: object;
  advanceWidth: number;
  advanceHeight: number;
  bbox: BBox;
};

export type Font = {
  ascent?: number;
  descent?: number;
  height?: number;
  unitsPerEm?: number;
  lineGap?: number;
  encode?: (string: string) => number[];
  glyphForCodePoint?: (codePoint: number) => Glyph;
  layout?: (
    string: string,
    userFeatures?: unknown,
    script?: unknown,
    language?: unknown,
    direction?: 'rtl' | 'ltr',
  ) => GlyphRun;
};

export type Attributes = {
  align?: string;
  alignLastLine?: string;
  attachment?: Attachment;
  backgroundColor?: string;
  bidiLevel?: number;
  bullet?: unknown;
  characterSpacing?: number;
  color?: string;
  direction?: 'rtl' | 'ltr';
  features?: unknown[];
  fill?: boolean;
  font?: Font;
  fontSize?: number;
  hangingPunctuation?: boolean;
  hyphenationFactor?: number;
  indent?: number;
  justificationFactor?: number;
  lineHeight?: number;
  lineSpacing?: number;
  link?: unknown;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  opacity?: number;
  padding?: number;
  paddingTop?: number;
  paragraphSpacing?: number;
  scale?: number;
  script?: unknown;
  shrinkFactor?: number;
  strike?: boolean;
  strikeColor?: string;
  strikeStyle?: string;
  stroke?: boolean;
  underline?: boolean;
  underlineColor?: string;
  underlineStyle?: string;
  verticalAlign?: string;
  wordSpacing?: number;
  yOffset?: number;
};

export type Run = {
  start: number;
  end: number;
  attributes: Attributes;
  glyphIndices?: number[];
  glyphs?: Glyph[];
  positions?: Position[];
};

export type DecorationLine = {
  rect: Rect;
  opacity: number;
  color: string;
  style: string;
};

export type AttributedString = {
  string: string;
  syllables?: string[];
  runs: Run[];
  box?: Rect;
  decorationLines?: DecorationLine[];

  // TODO: Remove these properties
  overflowLeft?: number;
  overflowRight?: number;
};

export type Fragment = {
  string: string;
  attributes?: Attributes;
};

export type Paragraph = AttributedString[];

export type LayoutOptions = {
  hyphenationCallback?: (word: string) => string[];
  tolerance?: number;
  hyphenationPenalty?: number;
  expandCharFactor?: JustificationFactor;
  shrinkCharFactor?: JustificationFactor;
  expandWhitespaceFactor?: JustificationFactor;
  shrinkWhitespaceFactor?: JustificationFactor;
};
