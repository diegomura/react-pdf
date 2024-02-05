/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Returns empty run
 *
 * @returns {Run} empty run
 */
const empty = () => {
  return {
    start: 0,
    end: 0,
    glyphIndices: [],
    glyphs: [],
    positions: [],
    attributes: {},
  };
};

export default empty;
