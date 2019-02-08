import linebreak from './linebreak';
import bestFit from './bestFit';

const HYPHEN = 0x002d;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 50;

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

          if (syllables[index + 1] && hyphenated) {
            acc.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
          }
        }

        start += s.length;

        return acc;
      }, []);

      result.push(linebreak.glue(0, null, linebreak.infinity, 0));
      result.push(linebreak.penalty(0, -linebreak.infinity, 1));

      return result;
    }

    breakLines(glyphString, nodes, breaks) {
      let start = 0;
      let end = null;

      const lines = breaks.reduce((acc, breakPoint) => {
        const node = nodes[breakPoint.position];
        const prevNode = nodes[breakPoint.position - 1];

        // Last breakpoint corresponds to K&P mandatory final glue
        if (breakPoint.position === nodes.length - 1) return acc;

        let line;
        if (node.type === 'penalty') {
          end = glyphString.glyphIndexForStringIndex(prevNode.value.end);
          line = glyphString.copy().slice(start, end);
          line.insertGlyph(line.length, HYPHEN);
        } else {
          end = glyphString.glyphIndexForStringIndex(node.value.end);
          line = glyphString.copy().slice(start, end);
        }

        start = end;
        return [...acc, line];
      }, []);

      const lastLine = glyphString.slice(start, glyphString.length);
      lines.push(lastLine);

      return lines;
    }

    suggestLineBreak(glyphString, syllables, availableWidths, paragraphStyle) {
      const nodes = this.getNodes(glyphString, syllables, paragraphStyle);
      let tolerance = this.tolerance;
      let breaks = linebreak(nodes, availableWidths, { tolerance });

      // Try again with a higher tolerance if the line breaking failed.
      while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
        tolerance += TOLERANCE_STEPS;
        breaks = linebreak(nodes, availableWidths, { tolerance });
      }

      if (
        breaks.length === 0 ||
        (breaks.length === 1 && breaks[0].position === 0)
      ) {
        breaks = bestFit(nodes, availableWidths);
      }

      return this.breakLines(glyphString, nodes, breaks.slice(1));
    }
  };
};
