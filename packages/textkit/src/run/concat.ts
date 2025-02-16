import { last } from '@react-pdf/fns';

import length from './length';
import normalizeIndices from '../indices/normalize';
import { Run } from '../types';

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

  const runAIndices = runA.glyphIndices || [];
  const runALastIndex = last(runAIndices) || 0;
  const runBIndices = (runB.glyphIndices || []).map(
    (i) => i + runALastIndex + 1,
  );
  const glyphIndices = normalizeIndices(runAIndices.concat(runBIndices));

  return Object.assign({}, runA, {
    end,
    glyphs,
    positions,
    attributes,
    glyphIndices,
  });
};

export default concat;
