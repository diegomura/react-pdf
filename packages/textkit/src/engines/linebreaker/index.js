import bestFit from './bestFit';
import linebreak from './linebreak';
import slice from '../../attributedString/slice';
import insertGlyph from '../../attributedString/insertGlyph';
import advanceWidthBetween from '../../attributedString/advanceWidthBetween';

/**
 * @typedef {import('../../types.js').AttributedString} AttributedString
 * @typedef {import('../../types.js').Attributes} Attributes
 */

const HYPHEN = 0x002d;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 50;

const opts = {
  width: 3,
  stretch: 6,
  shrink: 9,
};

/**
 * Slice attributed string to many lines
 *
 * @param {AttributedString} string attributed string
 * @param {Object[]} nodes
 * @param {Object[]} breaks
 * @returns {AttributedString[]} attributed strings
 */
const breakLines = (string, nodes, breaks) => {
  let start = 0;
  let end = null;

  const lines = breaks.reduce((acc, breakPoint) => {
    const node = nodes[breakPoint.position];
    const prevNode = nodes[breakPoint.position - 1];

    // Last breakpoint corresponds to K&P mandatory final glue
    if (breakPoint.position === nodes.length - 1) return acc;

    let line;
    if (node.type === 'penalty') {
      end = prevNode.value.end;

      line = slice(start, end, string);
      line = insertGlyph(line.length, HYPHEN, line);
    } else {
      end = node.value.end;
      line = slice(start, end, string);
    }

    start = end;
    return [...acc, line];
  }, []);

  // Last line
  lines.push(slice(start, string.string.length, string));

  return lines;
};

/**
 * Return Knuth & Plass nodes based on line and previously calculated syllables
 *
 * @param {AttributedString} attributedString attributed string
 * @param {Object} args attributed string args
 * @param {Object} options layout options
 * @returns {Object[]} attributed strings
 */
const getNodes = (attributedString, { align }, options) => {
  let start = 0;

  const hyphenWidth = 5;
  const { syllables } = attributedString;
  const hyphenPenalty =
    options.hyphenationPenalty || (align === 'justify' ? 100 : 600);

  const result = syllables.reduce((acc, s, index) => {
    const width = advanceWidthBetween(
      start,
      start + s.length,
      attributedString,
    );

    if (s.trim() === '') {
      const stretch = (width * opts.width) / opts.stretch;
      const shrink = (width * opts.width) / opts.shrink;
      const value = { start, end: start + s.length };

      acc.push(linebreak.glue(width, value, stretch, shrink));
    } else {
      const hyphenated = syllables[index + 1] !== ' ';

      const value = { start, end: start + s.length };
      acc.push(linebreak.box(width, value, hyphenated));

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
};

/**
 * @param {AttributedString} attributedString attributed string
 * @returns {Attributes} styles
 */
const getStyles = (attributedString) => {
  return attributedString.runs?.[0]?.attributes || {};
};

/**
 * Performs Knuth & Plass line breaking algorithm
 * Fallbacks to best fit algorithm if latter not successful
 *
 * @param {Object} options layout options
 */
const linebreaker = (options) => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @param {number[]} availableWidths available widths
   * @returns {AttributedString[]} attributed strings
   */
  return (attributedString, availableWidths) => {
    let tolerance = options.tolerance || 4;

    const style = getStyles(attributedString);
    const nodes = getNodes(attributedString, style, options);

    /** @type {Object[]} */
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

    return breakLines(attributedString, nodes, breaks.slice(1));
  };
};

export default linebreaker;
