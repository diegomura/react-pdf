import createLinebreaker from '@textkit/linebreaker';
import formatter from './formatter';
import linebreak from './linebreak';

const HYPHEN = 0x002d;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 40;

export default ({ callback, penalty } = {}) => Textkit => {
  const TextkitLinebreaker = createLinebreaker()(Textkit);
  const fallbackLinebreaker = new TextkitLinebreaker();

  return class KPLineBreaker {
    constructor(tolerance) {
      this.tolerance = tolerance || 4;
    }

    suggestLineBreak(glyphString, availableWidth, paragraphStyle) {
      let tolerance = this.tolerance;
      const width = this.measureWidth(glyphString);
      const nodes = formatter(width, paragraphStyle.align, callback, penalty)(
        glyphString,
      );
      let breaks = [];

      // Try again with a higher tolerance if the line breaking failed.
      while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
        breaks = linebreak(nodes, [availableWidth], { tolerance });
        tolerance += TOLERANCE_STEPS;
      }

      // Fallback to textkit default's linebreaking algorithm if K&P fails
      if (breaks.length === 0) {
        const fallback = fallbackLinebreaker.suggestLineBreak(
          glyphString,
          availableWidth,
          paragraphStyle,
        );
        if (fallback) return fallback;

        // If fallback didn't worked, we split workd based on width
        const index = glyphString.glyphIndexAtOffset(availableWidth) - 1;
        glyphString.insertGlyph(index, HYPHEN);
        return { position: index + 1 };
      }

      if (!breaks[1]) {
        return { position: glyphString.end };
      }

      const breakNode = this.findBreakNode(nodes, breaks[1].position);
      const breakIndex = breakNode.value.end - glyphString.start;

      if (breakNode.hyphenated) {
        glyphString.insertGlyph(breakIndex, HYPHEN);
        return { position: breakIndex + 1 };
      }

      // We kep the blank space at the end of the line to avoid justification issues
      const offset = glyphString.isWhiteSpace(breakIndex) ? 1 : 0;
      return { position: breakIndex + offset };
    }

    measureWidth(glyphString) {
      const { font, fontSize } = glyphString.glyphRuns[0].attributes;

      return word => {
        if (typeof word === 'string') {
          const scale = fontSize / font.unitsPerEm;
          return font.layout(word).positions[0].xAdvance * scale;
        }

        return word.advanceWidth;
      };
    }

    findBreakNode(nodes, position) {
      let index = position - 1;

      while (!nodes[index].value) {
        index -= 1;
      }

      return nodes[index];
    }
  };
};
