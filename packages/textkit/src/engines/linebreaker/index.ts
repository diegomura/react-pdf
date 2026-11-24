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

      line = insertGlyph(line.string.length, HYPHEN, line);
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
  availableWidths: number[] = [],
): Node[] => {
  const hyphenWidth = 5;

  const { syllables } = attributedString;

  const hyphenPenalty =
    options.hyphenationPenalty || (align === 'justify' ? 100 : 600);

  const hyphenationAllowed = Number.isFinite(hyphenPenalty);

  // Where every syllable sits and how wide it is, measured once.
  let cursor = 0;
  const parts = syllables.map((s: string) => {
    const start = cursor;
    const end = start + s.length;
    const width = advanceWidthBetween(start, end, attributedString);

    cursor = end;

    return { s, start, end, width, isSpace: s.trim() === '' };
  });

  // The width of the WHOLE word each syllable belongs to.
  //
  // A word is only allowed to be hyphenated when it cannot fit on a line of
  // its own. Otherwise it moves down whole, which is what a reader expects:
  // breaking "Unternehmenswebsite" into "Un-" plus the rest only to fill the
  // line above it is harder to read than a slightly shorter line.
  const wordWidths: number[] = new Array(parts.length).fill(0);

  for (let i = 0; i < parts.length; ) {
    if (parts[i].isSpace) {
      i += 1;
      continue;
    }

    let end = i;
    let total = 0;

    while (end < parts.length && !parts[end].isSpace) {
      total += parts[end].width;
      end += 1;
    }

    for (let k = i; k < end; k += 1) wordWidths[k] = total;

    i = end;
  }

  // The NARROWEST line this paragraph can be laid out on.
  //
  // The narrowest and not the widest: the widths differ when text flows around
  // something, and the algorithm is free to put the word on any of those lines.
  // A word that fits on the widest one but not on the line it actually lands on
  // would have no way out - it could not be hyphenated and would be broken
  // without one. Measuring against the narrowest keeps the hyphenation point
  // available in exactly those cases, and changes nothing for a plain
  // paragraph, where every line is the same width.
  const narrowestLine = availableWidths.length
    ? Math.min(...availableWidths)
    : Infinity;

  const result = parts.reduce((acc: Node[], part, index: number) => {
    const { start, end, width } = part;

    if (part.isSpace) {
      const stretch = (width * opts.width) / opts.stretch;
      const shrink = (width * opts.width) / opts.shrink;

      // Add glue node. Glue nodes are used to fill the space between words.
      acc.push(knuthPlass.glue(width, start, end, stretch, shrink));
    } else {
      const hyphenated = syllables[index + 1] !== ' ';

      // Add box node. Box nodes are used to represent words.
      acc.push(knuthPlass.box(width, start, end, hyphenated));

      // Add penalty node. Penalty nodes are used to represent hyphenation
      // points - and this is the only place one is offered, so a word that
      // fits on a line has none and cannot be broken.
      //
      // An infinite hyphenationPenalty means "never hyphenate", and it has to
      // be answered by leaving the point out rather than by weighing it: a word
      // that fits nowhere makes Knuth & Plass fail, and the best-fit fallback
      // that takes over does not weigh penalties at all - it would hyphenate
      // exactly where the option asked it not to.
      if (
        syllables[index + 1] &&
        hyphenated &&
        hyphenationAllowed &&
        wordWidths[index] > narrowestLine
      ) {
        acc.push(knuthPlass.penalty(hyphenWidth, hyphenPenalty, 1));
      }
    }

    return acc;
  }, []);

  const start = cursor;

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
    const nodes = getNodes(attributedString, attributes, options, availableWidths);

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
