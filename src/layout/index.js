import { LayoutEngine as BaseLayoutEngine } from '@react-pdf/textkit-core';
import scriptItemizer from '@react-pdf/script-itemizer';
import justificationEngine from '@textkit/justification-engine';
import textDecorationEngine from '@textkit/text-decoration-engine';
import fontSubstitutionEngine from './fontSubstitution';
import wordHyphenation from './wordHyphenation';
import lineBreaker from './linebreaker';

// justificationEngine values
const shrinkWhitespaceFactor = { before: -0.5, after: -0.5 };

export class LayoutEngine extends BaseLayoutEngine {
  constructor({ hyphenationCallback, hyphenationPenalty }) {
    const engines = {
      wordHyphenation: wordHyphenation,
      scriptItemizer: scriptItemizer(),
      decorationEngine: textDecorationEngine(),
      fontSubstitutionEngine: fontSubstitutionEngine(),
      justificationEngine: justificationEngine({ shrinkWhitespaceFactor }),
      lineBreaker: lineBreaker({
        callback: hyphenationCallback,
        penalty: hyphenationPenalty,
      }),
    };

    super(engines);
  }
}

export {
  Run,
  BBox,
  Path,
  Rect,
  Point,
  Block,
  Range,
  Polygon,
  RunStyle,
  GlyphRun,
  Container,
  Attachment,
  GlyphString,
  LineFragment,
  ParagraphStyle,
  DecorationLine,
  FontDescriptor,
  AttributedString,
} from '@react-pdf/textkit-core';
