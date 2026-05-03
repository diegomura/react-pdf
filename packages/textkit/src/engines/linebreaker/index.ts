import unicode from 'unicode-properties';

import bestFit from './bestFit';
import knuthPlass from './knuthPlass';
import slice from '../../attributedString/slice';
import insertGlyph from '../../attributedString/insertGlyph';
import advanceWidthBetween from '../../attributedString/advanceWidthBetween';
import { AttributedString, Attributes, LayoutOptions } from '../../types';
import { Node } from './types';

/**
 * Check if a character is East Asian Wide or Fullwidth.
 * These characters don't need hyphens when wrapping.
 */
const isEastAsianWide = (char: string): boolean => {
  const codePoint = char.codePointAt(0);
  if (codePoint === undefined) return false;
  const eaw = unicode.getEastAsianWidth(codePoint);
  return eaw === 'W' || eaw === 'F';
};

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
 * Check if a hyphen should be inserted at the end of a line.
 * CJK characters don't need hyphens when wrapping.
 *
 * @param line - Line attributed string
 * @param hyphenCodePoints - Hyphen code points to use
 * @returns True if hyphen should be inserted
 */
const shouldInsertHyphen = (
  line: AttributedString,
  hyphenCodePoints: number[] | null,
): boolean => {
  if (hyphenCodePoints === null) return false;

  // Get the last character of the line
  const lastChar = line.string.slice(-1);
  if (!lastChar) return false;

  // Don't insert hyphen after East Asian Wide characters (CJK, etc.)
  if (isEastAsianWide(lastChar)) return false;

  return true;
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

      // Insert hyphen character(s) if configured and appropriate
      if (shouldInsertHyphen(line, hyphenCodePoints)) {
        for (const codePoint of hyphenCodePoints!) {
          line = insertGlyph(line.string.length, codePoint, line);
        }
      }
    } else {
      end = node.end;
      line = slice(start, end, attributedString);
    }

    start = end;

    acc.push(line);
    return acc;
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

  const hyphenWidth = getHyphenCodePoints(options) === null ? 0 : 5;

  const { syllables } = attributedString;

  const hyphenPenalty =
    options.hyphenationPenalty || (align === 'justify' ? 100 : 600);

  const allowCJKBreak = options.wordBreak !== 'keep-all';

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
        // CJK boundaries are soft wrap opportunities (penalty 0, no hyphen width)
        // unless keep-all is set, which suppresses CJK breaks
        const isSoftWrap = allowCJKBreak && isEastAsianWide(s.slice(-1));
        const penaltyValue = isSoftWrap ? 0 : hyphenPenalty;
        const penaltyWidth = isSoftWrap ? 0 : hyphenWidth;

        acc.push(knuthPlass.penalty(penaltyWidth, penaltyValue, 1));
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
