/**
 * Get string index at offset
 *
 * @param {number} offset
 * @param {Object} run
 * @returns {number} string index at offset N
 */
const indexAtOffset = (offset, run) => {
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
