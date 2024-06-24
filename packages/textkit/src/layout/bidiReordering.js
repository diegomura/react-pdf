import bidiFactory from 'bidi-js';
import { repeat } from '@react-pdf/fns';

import stringLength from '../attributedString/length';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

const bidi = bidiFactory();

/**
 * @param {Run[]} runs
 * @returns {number[]} bidi levels
 */
const getBidiLevels = (runs) => {
  return runs.reduce((acc, run) => {
    const length = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length);
    return acc.concat(levels);
  }, []);
};

const getReorderedIndices = (string, segments) => {
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
 * @template {'glyphs'|'positions'} T
 * @param {Run[]} runs
 * @param {T} objectName
 * @param {number} index
 * @returns {T extends 'glyphs' ? Glyph|undefined : Position|undefined}
 */
const getItemAtIndex = (runs, objectName, index) => {
  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    const updatedIndex = run.glyphIndices[index - run.start];
    if (index >= run.start && index < run.end) {
      return run[objectName][updatedIndex];
    }
  }

  throw new Error(`index ${index} out of range`);
};

/**
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} reordered attributed string
 */
const reorderLine = (attributedString) => {
  const levels = getBidiLevels(attributedString.runs);
  const direction = attributedString.runs[0]?.attributes.direction;
  const level = direction === 'rtl' ? 1 : 0;
  const end = stringLength(attributedString) - 1;
  const paragraphs = [{ start: 0, end, level }];
  const embeddingLevels = { paragraphs, levels };

  const segments = bidi.getReorderSegments(
    attributedString.string,
    embeddingLevels,
  );

  // No need for bidi reordering
  if (segments.length === 0) return attributedString;

  const indices = getReorderedIndices(attributedString.string, segments);

  const updatedString = bidi.getReorderedString(
    attributedString.string,
    embeddingLevels,
  );

  const updatedRuns = attributedString.runs.map((run) => {
    const selectedIndices = indices.slice(run.start, run.end);
    const updatedGlyphs = [];
    const updatedPositions = [];

    const addedGlyphs = new Set();

    for (let i = 0; i < selectedIndices.length; i += 1) {
      const index = selectedIndices[i];

      const glyph = getItemAtIndex(attributedString.runs, 'glyphs', index);

      if (addedGlyphs.has(glyph.id)) continue;

      updatedGlyphs.push(glyph);
      updatedPositions.push(
        getItemAtIndex(attributedString.runs, 'positions', index),
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
    ...attributedString,
    runs: updatedRuns,
    string: updatedString,
  };
};

/**
 * Reorder a paragraph
 *
 * @param {AttributedString[]} lines
 * @returns {AttributedString[]} reordered lines
 */
const reorderParagraph = (lines) => lines.map(reorderLine);

/**
 * Perform bidi reordering
 *
 * @returns {(paragraphs: AttributedString[][]) => AttributedString[][]} reordered paragraphs
 */
const bidiReordering = () => {
  /**
   * @param {AttributedString[][]} paragraphs line blocks
   * @returns {AttributedString[][]} reordered line blocks
   */
  return (paragraphs) => paragraphs.map(reorderParagraph);
};

export default bidiReordering;
