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

export type ExclusionRect = Rect & {
  type?: 'rect';
  extend?: 'left' | 'right';
};

export type ExclusionEllipse = {
  type: 'ellipse';
  extend?: 'left' | 'right';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

export type ExclusionPolygon = {
  type: 'polygon';
  extend?: 'left' | 'right';
  points: Coordinate[];
};

export type ExclusionShape =
  | ExclusionRect
  | ExclusionEllipse
  | ExclusionPolygon;

export type Container = Rect & {
  truncateMode?: 'ellipsis';
  maxLines?: number;
  exclusions?: ExclusionShape[];
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
  features?: string[] | Record<string, boolean>;
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
  /** Maps each string codepoint index to its corresponding glyph index */
  stringIndices?: number[];
  /** Maps each glyph index to its corresponding string codepoint index */
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

// A soft wrap opportunity breaks as is. A hyphenation opportunity shows the
// hyphenate character when the line breaks there.
export type SyllableBreak = 'soft' | 'hyphen';

export type AttributedString = {
  string: string;
  syllables?: string[];
  /** How the line may break after each syllable. Missing means 'hyphen'. */
  syllableBreaks?: SyllableBreak[];
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
  /**
   * CSS-like hyphens property.
   * - 'none': Words are not hyphenated, even at soft hyphens
   * - 'manual': Words are hyphenated only at soft hyphens
   * - 'auto': Words are hyphenated by the hyphenation engine or callback (default)
   *
   * Unlike CSS, the default is 'auto' to keep the existing behavior.
   */
  hyphens?: 'none' | 'auto' | 'manual';
  /**
   * CSS-like hyphenate-character property.
   * String shown at a hyphenation break. Default is '-'.
   * An empty string hyphenates without a visible character.
   */
  hyphenateCharacter?: string;
  /**
   * CSS-like word-break property.
   * - 'normal': Lines break at UAX #14 opportunities, e.g. between CJK characters (default)
   * - 'break-all': Lines may also break between any letters or digits, without hyphenation
   * - 'keep-all': Lines do not break between letters, including CJK characters
   */
  wordBreak?: 'normal' | 'break-all' | 'keep-all';
};

export type { Font } from '@react-pdf/font';
