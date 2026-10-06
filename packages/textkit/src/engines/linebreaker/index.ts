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
 * Get the hyphen character code point(s) based on options
 *
 * @param options - Layout options
 * @returns Array of code points for the hyphen character, or null if no hyphen should be inserted
 */
const getHyphenCodePoints = (options: LayoutOptions): number[] | null => {
  // If hyphens is 'none', don't insert any hyphen character
  if (options.hyphens === 'none') {
    return null;
  }

  // If hyphenateCharacter is explicitly set
  if (options.hyphenateCharacter !== undefined) {
    // Empty string means no hyphen
    if (options.hyphenateCharacter === '') {
      return null;
    }
    // Convert custom character to code points
    const codePoints: number[] = [];
    for (const char of options.hyphenateCharacter) {
      const codePoint = char.codePointAt(0);
      if (codePoint !== undefined) {
        codePoints.push(codePoint);
      }
    }
    return codePoints.length > 0 ? codePoints : null;
  }

  // Default: use standard hyphen
  return [HYPHEN];
};

/**
 * Slice attributed string to many lines
 *
 * @param attributedString - Attributed string
 * @param nodes
 * @param breaks
 * @param options - Layout options
 * @returns Attributed strings
 */
const breakLines = (
  attributedString: AttributedString,
  nodes: Node[],
  breaks: number[],
  options: LayoutOptions,
) => {
  let start = 0;
  let end = null;

  const hyphenCodePoints = getHyphenCodePoints(options);

  const lines: AttributedString[] = [];

  for (const breakPoint of breaks) {
    const node = nodes[breakPoint];
    const prevNode = nodes[breakPoint - 1];

    // Last breakpoint corresponds to K&P mandatory final glue
    if (breakPoint === nodes.length - 1) continue;

    let line: AttributedString;
    if (node.type === 'penalty') {
      // @ts-expect-error penalty node will always preceed box or glue node
      end = prevNode.end;

      line = slice(start, end, attributedString);

      // Only hyphenation breaks are flagged; soft wrap breaks show nothing.
      if (node.flagged && hyphenCodePoints !== null) {
        for (const codePoint of hyphenCodePoints) {
          line = insertGlyph(line.string.length, codePoint, line);
        }
      }
    } else {
      end = node.end;
      line = slice(start, end, attributedString);
    }

    start = end;

    lines.push(line);
  }

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

  const hyphenWidth = getHyphenCodePoints(options) === null ? 0 : 5;

  const { syllables, syllableBreaks } = attributedString;

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
      const next = syllables[index + 1];
      const breakable = next !== undefined && next.trim() !== '';
      const hyphenated =
        breakable && (syllableBreaks?.[index] ?? 'hyphen') === 'hyphen';
      const end = start + s.length;

      // Add box node. Box nodes are used to represent words.
      acc.push(knuthPlass.box(width, start, end, hyphenated));

      // Add penalty node. Penalty nodes are used to represent breaks inside
      // words. Only hyphenation breaks cost a hyphen.
      if (hyphenated) {
        acc.push(knuthPlass.penalty(hyphenWidth, hyphenPenalty, 1));
      } else if (breakable) {
        acc.push(knuthPlass.penalty(0, 0, 0));
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

    return breakLines(attributedString, nodes, breaks.slice(1), options);
  };
};

export default linebreaker;
