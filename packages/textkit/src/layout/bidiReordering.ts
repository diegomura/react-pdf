import bidiFactory from 'bidi-js';
import { repeat } from '@react-pdf/fns';

import stringLength from '../attributedString/length';
import { AttributedString, Paragraph, Run } from '../types';

const bidi = bidiFactory();

const getBidiLevels = (runs: Run[]) => {
  return runs.reduce((acc, run) => {
    const length = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length);
    return acc.concat(levels);
  }, []);
};

const getReorderedIndices = (string: string, segments) => {
  // Fill an array with indices
  const indices = [];
  for (let i = 0; i < string.length; i += 1) {
    indices[i] = i;
  }
  // Reverse each segment in order
  segments.forEach(([start, end]) => {
    const slice = indices.slice(start, end + 1);
    for (let i = slice.length - 1; i >= 0; i -= 1) {
      indices[end - i] = slice[i];
    }
  });

  return indices;
};

const getRunItemAtIndex = (runs: Run[], index: number) => {
  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    if (index >= run.start && index < run.end) {
      const glyphIndex = run.stringIndices?.[index - run.start];
      if (glyphIndex !== undefined) return { run, glyphIndex };
    }
  }

  throw new Error(`index ${index} out of range`);
};

const reorderLine = (line: AttributedString) => {
  const levels = getBidiLevels(line.runs);
  const direction = line.runs[0]?.attributes.direction;
  const level = direction === 'rtl' ? 1 : 0;
  const end = stringLength(line) - 1;
  const paragraphs = [{ start: 0, end, level }];
  const embeddingLevels = { paragraphs, levels };

  const segments = bidi.getReorderSegments(line.string, embeddingLevels);

  // No need for bidi reordering
  if (segments.length === 0) return line;

  const indices = getReorderedIndices(line.string, segments);

  const updatedString = bidi.getReorderedString(line.string, embeddingLevels);

  const updatedRuns: Run[] = [];
  let currentRun: Run | null = null;
  let currentStart = 0;
  let currentGlyphs: NonNullable<Run['glyphs']> = [];
  let currentGlyphIndices: number[] = [];
  let currentPositions: NonNullable<Run['positions']> = [];
  let currentStringIndices: number[] = [];
  let currentStringIndexByGlyphIndex = new Map<number, number>();

  const flushRun = (end: number) => {
    if (!currentRun) return;

    updatedRuns.push({
      ...currentRun,
      start: currentStart,
      end,
      glyphs: currentGlyphs,
      glyphIndices: currentGlyphIndices,
      positions: currentPositions,
      stringIndices: currentStringIndices,
    });
  };

  for (let visualIndex = 0; visualIndex < indices.length; visualIndex += 1) {
    const { run, glyphIndex } = getRunItemAtIndex(
      line.runs,
      indices[visualIndex],
    );

    if (run !== currentRun) {
      flushRun(visualIndex);
      currentRun = run;
      currentStart = visualIndex;
      currentGlyphs = [];
      currentGlyphIndices = [];
      currentPositions = [];
      currentStringIndices = [];
      currentStringIndexByGlyphIndex = new Map<number, number>();
    }

    let reorderedGlyphIndex = currentStringIndexByGlyphIndex.get(glyphIndex);

    if (reorderedGlyphIndex === undefined) {
      reorderedGlyphIndex = currentGlyphs.length;
      currentStringIndexByGlyphIndex.set(glyphIndex, reorderedGlyphIndex);
      currentGlyphs.push(run.glyphs![glyphIndex]);
      currentGlyphIndices.push(visualIndex - currentStart);
      currentPositions.push(run.positions![glyphIndex]);
    }

    currentStringIndices.push(reorderedGlyphIndex);
  }

  flushRun(indices.length);

  return {
    box: line.box,
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
