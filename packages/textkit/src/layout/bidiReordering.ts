import resolveStringIndices from '../string-indices/resolve';
import resolveGlyphIndices from '../glyph-indices/resolve';
import { AttributedString, Paragraph, Run } from '../types';

/**
 * Order runs for visual display, applying UAX #9 rule L2: from the highest
 * bidi level down to level 1, reverse every contiguous sequence of runs at
 * that level or above.
 *
 * @param runs - Runs
 * @returns Run indices in visual order
 */
const reorderRuns = (runs: Run[]) => {
  const levels = runs.map((run) => run.attributes.bidiLevel || 0);
  const order = runs.map((_, index) => index);
  const maxLevel = Math.max(...levels);

  for (let level = maxLevel; level >= 1; level -= 1) {
    let start = 0;

    while (start < order.length) {
      if (levels[order[start]] < level) {
        start += 1;
        continue;
      }

      let end = start + 1;
      while (end < order.length && levels[order[end]] >= level) end += 1;

      order.splice(start, end - start, ...order.slice(start, end).reverse());
      start = end;
    }
  }

  return order;
};

/**
 * Reverse the glyphs and characters of a right to left run. Glyphs stay inside
 * their own run, so run attributes are never mixed between runs.
 *
 * @param run - Run
 * @param string - Run substring
 * @returns Reversed run and string
 */
const reverseRun = (run: Run, string: string) => {
  const glyphs = [...(run.glyphs || [])].reverse();
  const positions = [...(run.positions || [])].reverse();

  return {
    run: {
      ...run,
      glyphs,
      positions,
      stringIndices: resolveStringIndices(glyphs),
      glyphIndices: resolveGlyphIndices(glyphs),
    },
    string: Array.from(string).reverse().join(''),
  };
};

const reorderLine = (line: AttributedString): AttributedString => {
  if (line.runs.length === 0) return line;

  const levels = line.runs.map((run) => run.attributes.bidiLevel || 0);

  // No need for bidi reordering
  if (Math.max(...levels) === 0) return line;

  let offset = 0;
  let string = '';

  const runs = reorderRuns(line.runs).map((index) => {
    const run = line.runs[index];
    const runString = line.string.slice(run.start, run.end);
    const reversed = levels[index] % 2 === 1 && reverseRun(run, runString);

    const start = offset;
    offset += run.end - run.start;

    string += reversed ? reversed.string : runString;

    return { ...(reversed ? reversed.run : run), start, end: offset };
  });

  return { ...line, runs, string };
};

const reorderParagraph = (paragraph: Paragraph) => paragraph.map(reorderLine);

/**
 * Perform bidi reordering
 *
 * @returns Reordered paragraphs
 */
const bidiReordering = () => {
  /**
   * @param paragraphs - Paragraphs
   * @returns Reordered paragraphs
   */
  return (paragraphs: Paragraph[]) => paragraphs.map(reorderParagraph);
};

export default bidiReordering;
