import bidiFactory from 'bidi-js';

import sliceRun from '../run/slice';
import resolveStringIndices from '../string-indices/resolve';
import resolveGlyphIndices from '../glyph-indices/resolve';
import { AttributedString, Paragraph, Run } from '../types';

const bidi = bidiFactory();

const TRAILING_WHITESPACE = /[ \t]+$/;

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

/**
 * Get the paragraph embedding level a line was laid out with
 *
 * @param line - Line
 * @returns Paragraph level
 */
const paragraphLevel = (line: AttributedString) => {
  const direction = line.runs[0]?.attributes.direction;

  if (direction === 'rtl') return 1;
  if (direction === 'ltr') return 0;

  return bidi.getEmbeddingLevels(line.string).paragraphs[0]?.level || 0;
};

const withLevel = (run: Run, bidiLevel: number): Run => ({
  ...run,
  attributes: { ...run.attributes, bidiLevel },
});

/**
 * Apply UAX #9 rule L1 to a line: whitespace at the end of a line is reset to
 * the paragraph level. Levels are resolved once for the whole paragraph, so
 * without this a wrapped line's trailing space keeps the level of the run it
 * belonged to and is drawn inside it once that run is reversed.
 *
 * @param line - Line
 * @returns Line with trailing whitespace at the paragraph level
 */
const resetTrailingWhitespace = (line: AttributedString): AttributedString => {
  const match = TRAILING_WHITESPACE.exec(line.string);
  if (!match) return line;

  const level = paragraphLevel(line);
  const at = match.index;

  const runs = line.runs.flatMap((run) => {
    if (run.end <= at || (run.attributes.bidiLevel || 0) === level) {
      return [run];
    }

    if (run.start >= at) return [withLevel(run, level)];

    const head = sliceRun(0, at - run.start, run);
    const tail = sliceRun(at - run.start, run.end - run.start, run);

    return [head, withLevel(tail, level)];
  });

  return { ...line, runs };
};

const reorderLine = (unresolvedLine: AttributedString): AttributedString => {
  if (unresolvedLine.runs.length === 0) return unresolvedLine;

  const line = resetTrailingWhitespace(unresolvedLine);

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
