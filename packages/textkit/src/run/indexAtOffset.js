import * as R from 'ramda';

/**
 * Get string index at offset
 *
 * @param  {Object}  run
 * @param  {number}  offset
 * @return {number} string index at offset N
 */
const indexAtOffset = (offset, run) => {
  let counter = 0;
  let index = 0;

  const glyphs = R.propOr([], 'glyphs', run);
  const positions = R.propOr([], 'positions', run);

  for (let i = 0; i < positions.length; i += 1) {
    const { xAdvance } = positions[i];

    if (counter + xAdvance > offset) return index;

    counter += xAdvance;
    index += R.pathOr(0, [i, 'codePoints', 'length'], glyphs);
  }

  return index;
};

export default R.curryN(2, indexAtOffset);
