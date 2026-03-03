import type { Glyph as FontkitGlyph } from 'fontkit';
import type { Font } from '@react-pdf/font';
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

export type Glyph = FontkitGlyph;

export type Position = {
  xAdvance: number;
  yAdvance: number;
  xOffset: number;
  yOffset: number;
  // TODO: remove?
  advanceWidth?: number;
};

export type Attachment = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  xOffset?: number;
  yOffset?: number;
  image: Buffer;
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
  font?: Font[];
  fontSize?: number;
  hangingPunctuation?: boolean;
  hyphenationFactor?: number;
  indent?: number;
  justificationFactor?: number;
  lineHeight?: number;
  lineSpacing?: number;
  link?: string;
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
  xAdvance?: number;

  // TODO: Remove these properties
  height?: number;
  descent?: number;
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
  xAdvance?: number;
  ascent?: number;
};

export type Fragment = {
  string: string;
  attributes?: Attributes;
};

export type Paragraph = AttributedString[];

export type LayoutOptions = {
  hyphenationCallback?: (
    word: string | null,
    fallback: (word: string | null) => string[],
  ) => string[];
  tolerance?: number;
  hyphenationPenalty?: number;
  expandCharFactor?: JustificationFactor;
  shrinkCharFactor?: JustificationFactor;
  expandWhitespaceFactor?: JustificationFactor;
  shrinkWhitespaceFactor?: JustificationFactor;
};

export type { Font } from '@react-pdf/font';
