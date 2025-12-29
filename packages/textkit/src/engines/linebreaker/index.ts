import bestFit from './bestFit';
import knuthPlass from './knuthPlass';
import slice from '../../attributedString/slice';
import insertGlyph from '../../attributedString/insertGlyph';
import advanceWidthBetween from '../../attributedString/advanceWidthBetween';
import { AttributedString, Attributes, LayoutOptions } from '../../types';
import { Node } from './types';

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
 * @param attributedString - Attributed string
 * @param nodes
 * @param breaks
 * @returns Attributed strings
 */
const breakLines = (
  attributedString: AttributedString,
  nodes: Node[],
  breaks: number[],
) => {
  let start = 0;
  let end = null;

  const lines: AttributedString[] = breaks.reduce((acc, breakPoint) => {
    const node = nodes[breakPoint];
    const prevNode = nodes[breakPoint - 1];

    // Last breakpoint corresponds to K&P mandatory final glue
    if (breakPoint === nodes.length - 1) return acc;

    let line: AttributedString;
    if (node.type === 'penalty') {
      // @ts-expect-error penalty node will always preceed box or glue node
      end = prevNode.end;

      line = slice(start, end, attributedString);

      line = insertGlyph(line.string.length, HYPHEN, line);
    } else {
      end = node.end;
      line = slice(start, end, attributedString);
    }

    start = end;

    return [...acc, line];
  }, []);

  lines.push(slice(start, attributedString.string.length, attributedString));

  return lines;
};

/**
 * Return Knuth & Plass nodes based on line and previously calculated syllables
 *
 * @param attributedString - Attributed string
 * @param attributes - Attributes
 * @param options - Layout options
 * @returns ?
 */
const getNodes = (
  attributedString: AttributedString,
  { align }: Attributes,
  options: LayoutOptions,
): Node[] => {
  let start = 0;

  const hyphenWidth = 5;

  const { syllables } = attributedString;

  const hyphenPenalty =
    options.hyphenationPenalty || (align === 'justify' ? 100 : 600);

  const result = syllables.reduce((acc: Node[], s: string, index: number) => {
    const width = advanceWidthBetween(
      start,
      start + s.length,
      attributedString,
    );

    if (s.trim() === '') {
      const stretch = (width * opts.width) / opts.stretch;
      const shrink = (width * opts.width) / opts.shrink;
      const end = start + s.length;

      // Add glue node. Glue nodes are used to fill the space between words.
      acc.push(knuthPlass.glue(width, start, end, stretch, shrink));
    } else {
      const hyphenated = syllables[index + 1] !== ' ';
      const end = start + s.length;

      // Add box node. Box nodes are used to represent words.
      acc.push(knuthPlass.box(width, start, end, hyphenated));

      if (syllables[index + 1] && hyphenated) {
        // Add penalty node. Penalty nodes are used to represent hyphenation points.
        acc.push(knuthPlass.penalty(hyphenWidth, hyphenPenalty, 1));
      }
    }

    start += s.length;

    return acc;
  }, []);

  // Add mandatory final glue
  result.push(knuthPlass.glue(0, start, start, knuthPlass.infinity, 0));
  result.push(knuthPlass.penalty(0, -knuthPlass.infinity, 1));

  return result;
};

/**
 * @param attributedString - Attributed string
 * @returns Attributes
 */
const getAttributes = (attributedString: AttributedString) => {
  return attributedString.runs?.[0]?.attributes || {};
};

/**
 * Performs Knuth & Plass line breaking algorithm
 * Fallbacks to best fit algorithm if latter not successful
 *
 * @param options - Layout options
 */
const linebreaker = (options: LayoutOptions) => {
  /**
   * @param attributedString - Attributed string
   * @param availableWidths - Available widths
   * @returns Attributed string
   */
  return (attributedString: AttributedString, availableWidths: number[]) => {
    let tolerance = options.tolerance || 4;

    const attributes = getAttributes(attributedString);
    const nodes = getNodes(attributedString, attributes, options);

    let breaks = knuthPlass(nodes, availableWidths, tolerance);

    // Try again with a higher tolerance if the line breaking failed.
    while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
      tolerance += TOLERANCE_STEPS;
      breaks = knuthPlass(nodes, availableWidths, tolerance);
    }

    if (breaks.length === 0 || (breaks.length === 1 && breaks[0] === 0)) {
      breaks = bestFit(nodes, availableWidths);
    }

    return breakLines(attributedString, nodes, breaks.slice(1));
  };
};

export default linebreaker;
