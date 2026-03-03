import { AttributedString, Paragraph, Run } from '../types';

/**
 * Reorder a single line for bidi display.
 *
 * The previous implementation shuffled individual glyphs across run boundaries
 * using character-level index remapping. This broke run attributes (color,
 * font-weight, etc.) because glyphs from one styled run ended up in another.
 *
 * This implementation instead:
 * 1. Applies UAX #9 L2 at the run level to determine visual run order
 * 2. Reverses glyphs/positions within RTL runs (odd bidiLevel)
 * 3. Preserves all run attributes intact
 */
const reorderLine = (line: AttributedString): AttributedString => {
  const { runs } = line;

  if (runs.length === 0) return line;

  const direction = runs[0]?.attributes.direction;
  const baseLevel = direction === 'rtl' ? 1 : 0;

  // Get bidi level per run (uniform within each run after preprocessing)
  const runLevels = runs.map((r) => r.attributes.bidiLevel ?? 0);
  const maxLevel = Math.max(...runLevels);

  // No reordering needed if all runs are LTR at base level
  if (maxLevel === 0 && baseLevel === 0) return line;

  // UAX #9 L2: From highest level to lowest odd level,
  // reverse contiguous sequences of runs at that level or higher
  const orderedIndices = runs.map((_, i) => i);

  for (let level = maxLevel; level >= 1; level -= 1) {
    let i = 0;

    while (i < orderedIndices.length) {
      if (runLevels[orderedIndices[i]] >= level) {
        let j = i + 1;

        while (
          j < orderedIndices.length &&
          runLevels[orderedIndices[j]] >= level
        ) {
          j += 1;
        }

        // Reverse the segment [i, j)
        const segment = orderedIndices.slice(i, j).reverse();

        for (let k = 0; k < segment.length; k += 1) {
          orderedIndices[i + k] = segment[k];
        }

        i = j;
      } else {
        i += 1;
      }
    }
  }

  // Build reordered runs with internal glyph reversal for RTL runs
  let updatedString = '';
  let offset = 0;

  const updatedRuns: Run[] = orderedIndices.map((origIdx) => {
    const run = runs[origIdx];
    const runStr = line.string.slice(run.start, run.end);
    const isRtl = runLevels[origIdx] % 2 === 1;
    const runLength = run.end - run.start;

    let glyphs = run.glyphs ? [...run.glyphs] : [];
    let positions = run.positions ? [...run.positions] : [];

    if (isRtl) {
      glyphs = glyphs.reverse();
      positions = positions.reverse();

      // Deduplicate ligature glyphs (a ligature glyph represents multiple
      // characters but should only appear once in the glyph array)
      const seen = new Set();
      const filteredGlyphs: typeof glyphs = [];
      const filteredPositions: typeof positions = [];

      for (let i = 0; i < glyphs.length; i += 1) {
        const glyph = glyphs[i];

        if (glyph?.isLigature && seen.has(glyph.id)) continue;

        filteredGlyphs.push(glyph);
        filteredPositions.push(positions[i]);

        if (glyph?.isLigature) {
          seen.add(glyph.id);
        }
      }

      glyphs = filteredGlyphs;
      positions = filteredPositions;

      // Reverse the string using Array.from to handle surrogate pairs
      updatedString += Array.from(runStr).reverse().join('');
    } else {
      updatedString += runStr;
    }

    const newRun: Run = {
      ...run,
      start: offset,
      end: offset + runLength,
      glyphs,
      positions,
    };

    offset += runLength;
    return newRun;
  });

  return {
    ...line,
    runs: updatedRuns,
    string: updatedString,
  } as AttributedString;
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
