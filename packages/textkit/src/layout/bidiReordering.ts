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

/**
 * Build a lookup array that maps each string index to its run index.
 * Allows O(1) run lookup instead of O(R) linear search per index.
 */
const buildRunIndex = (runs: Run[], length: number) => {
  const runIndex = new Int32Array(length);

  for (let r = 0; r < runs.length; r++) {
    const run = runs[r];
    for (let j = run.start; j < run.end; j++) {
      runIndex[j] = r;
    }
  }

  return runIndex;
};

const getItemAtIndex = (
  runs: Run[],
  runIndex: Int32Array,
  objectName: string,
  index: number,
) => {
  const run = runs[runIndex[index]];
  const updatedIndex = run.stringIndices[index - run.start];
  return run[objectName][updatedIndex];
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
  const runIndex = buildRunIndex(line.runs, line.string.length);

  const updatedString = bidi.getReorderedString(line.string, embeddingLevels);

  const updatedRuns = line.runs.map((run) => {
    const selectedIndices = indices.slice(run.start, run.end);
    const updatedGlyphs = [];
    const updatedPositions = [];

    const addedGlyphs = new Set();

    for (let i = 0; i < selectedIndices.length; i += 1) {
      const index = selectedIndices[i];

      const glyph = getItemAtIndex(line.runs, runIndex, 'glyphs', index);

      if (addedGlyphs.has(glyph.id)) continue;

      updatedGlyphs.push(glyph);
      updatedPositions.push(
        getItemAtIndex(line.runs, runIndex, 'positions', index),
      );

      if (glyph.isLigature) {
        addedGlyphs.add(glyph.id);
      }
    }

    return {
      ...run,
      glyphs: updatedGlyphs,
      positions: updatedPositions,
    };
  });

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
