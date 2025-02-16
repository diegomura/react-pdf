import { Run } from '../types';

/**
 * Get string index at offset
 *
 * @param offset - Offset
 * @param run - Run
 * @returns String index at offset N
 */
const indexAtOffset = (offset: number, run: Run) => {
  let counter = 0;
  let index = 0;

  const glyphs = run.glyphs || [];
  const positions = run.positions || [];

  for (let i = 0; i < positions.length; i += 1) {
    const { xAdvance } = positions[i];

    if (counter + xAdvance > offset) return index;

    counter += xAdvance;
    index += glyphs[i]?.codePoints?.length || 0;
  }

  return index;
};

export default indexAtOffset;
