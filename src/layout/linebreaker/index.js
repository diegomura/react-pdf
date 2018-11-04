import linebreak from './linebreak';

const HYPHEN = 0x002d;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 40;

const opts = {
  width: 3,
  stretch: 6,
  shrink: 9,
};

export default ({ penalty } = {}) => () => {
  return class KPLineBreaker {
    constructor(tolerance) {
      this.tolerance = tolerance || 4;
    }

    applyFallback(syllables, availableWidth) {
      const breaks = [];

      let currentY = 0;
      let currentBreak = 0;
      for (const s of syllables) {
        if (currentY + s.advanceWidth > availableWidth) {
          currentY = 0;
          breaks.push(currentBreak);
        }

        currentBreak += s.end;
        currentY += s.advanceWidth;
      }

      return breaks;
    }

    getNodes(glyphString, syllables, { align }) {
      let start = 0;
      const hyphenWidth = 5;
      const hyphenPenalty = penalty || (align === 'justify' ? 100 : 600);

      const result = syllables.reduce((acc, s, index) => {
        const glyphStart = glyphString.glyphIndexForStringIndex(start);
        const glyphEnd = glyphString.glyphIndexForStringIndex(start + s.length);
        const syllable = glyphString.slice(glyphStart, glyphEnd);

        if (syllable.string.trim() === '') {
          const width = syllable.advanceWidth;
          const stretch = (width * opts.width) / opts.stretch;
          const shrink = (width * opts.width) / opts.shrink;
          const value = { value: syllable, start, end: start + syllable.end };
          acc.push(linebreak.glue(width, value, stretch, shrink));
        } else {
          const hyphenated = syllables[index + 1] !== ' ';
          const value = { value: syllable, start, end: start + syllable.end };
          acc.push(linebreak.box(syllable.advanceWidth, value, hyphenated));

          if (hyphenated) {
            acc.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
          }
        }

        start += s.length;

        return acc;
      }, []);

      return result;
    }

    applyKnuthAndPlass(glyphString, nodes, breaks) {
      let start = 0;
      let end = null;

      const lines = breaks.map(breakPoint => {
        const node = nodes[breakPoint.position];
        const prevNode = nodes[breakPoint.position - 1];

        let line;
        if (node.type === 'penalty') {
          end = glyphString.glyphIndexForStringIndex(prevNode.value.end);
          line = glyphString.slice(start, end);
          line.insertGlyph(line.length, HYPHEN);
        } else {
          end = glyphString.glyphIndexForStringIndex(node.value.end);
          line = glyphString.slice(start, end);
        }

        start = end;
        return line;
      });

      const lastLine = glyphString.slice(start, glyphString.length);
      lines.push(lastLine);

      return lines;
    }

    suggestLineBreak(glyphString, syllables, availableWidth, paragraphStyle) {
      const nodes = this.getNodes(glyphString, syllables, paragraphStyle);

      let tolerance = this.tolerance;
      let breaks = linebreak(nodes, [availableWidth], { tolerance });

      // Try again with a higher tolerance if the line breaking failed.
      while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
        breaks = linebreak(nodes, [availableWidth], { tolerance });
        tolerance += TOLERANCE_STEPS;
      }

      const res =
        breaks.length > 0
          ? this.applyKnuthAndPlass(glyphString, nodes, breaks.slice(1))
          : this.applyFallback(glyphString, syllables, availableWidth);

      return res;
    }
  };
};
