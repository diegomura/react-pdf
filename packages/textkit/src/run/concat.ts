import { last } from '@react-pdf/fns';

import { Run } from '../types';
import length from './length';
import normalize from '../utils/normalize';

const concatStringIndices = (runA: Run, runB: Run): number[] => {
  const runAIndices = runA.stringIndices || [];
  const runALastIndex = last(runAIndices) || 0;
  const runBIndices = (runB.stringIndices || []).map(
    (i) => i + runALastIndex + 1,
  );
  return normalize(runAIndices.concat(runBIndices));
};

const concatGlyphIndices = (runA: Run, runB: Run): number[] => {
  const runAIndices = runA.glyphIndices || [];
  const runALength = runA.stringIndices?.length || 0;
  const runBIndices = (runB.glyphIndices || []).map((i) => i + runALength);
  return normalize(runAIndices.concat(runBIndices));
};

/**
 * Concats two runs into one
 *
 * @param runA - First run
 * @param runB - Second run
 * @returns Concatenated run
 */
const concat = (runA: Run, runB: Run): Run => {
  const end = runA.end + length(runB);

  const glyphs = (runA.glyphs || []).concat(runB.glyphs || []);
  const positions = (runA.positions || []).concat(runB.positions || []);
  const attributes = Object.assign({}, runA.attributes, runB.attributes);

  const stringIndices = concatStringIndices(runA, runB);
  const glyphIndices = concatGlyphIndices(runA, runB);

  return Object.assign({}, runA, {
    end,
    glyphs,
    positions,
    attributes,
    stringIndices,
    glyphIndices,
  });
};

export default concat;
