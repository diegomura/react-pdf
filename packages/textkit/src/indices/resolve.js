import * as R from 'ramda';

import isNumber from '../utils/isNumber';

/**
 * Generate glyphs indices from string indices
 *
 * ex. resolve([[0, 1, 2, 4]]) => [0, 1, 2, 2, 3]
 *
 * @param  {String}  string
 * @param  {Array}  string indices
 * @return {Array} glyph indices
 */
const resolve = (string, stringIndices = []) => {
  let counter = 0;
  const glyphIndices = [];

  for (let i = 0; i < stringIndices.length; i += 1) {
    const current = stringIndices[i];
    const prevValue = stringIndices[i - 1];
    const stringIndex = isNumber(current) ? current : prevValue + 1 || 0;
    const nextValue = stringIndices[i + 1] || stringIndex + 1;
    const diff = Math.abs(nextValue - stringIndex);

    glyphIndices.push(...R.repeat(counter, diff));
    counter += 1;
  }

  // Append ending ligature glyph indices
  if (string.length !== glyphIndices.length) {
    const diff = Math.max(0, string.length - glyphIndices.length);
    const lastValue = R.last(glyphIndices);

    glyphIndices.push(...R.repeat(lastValue, diff));
  }

  return glyphIndices;
};

export default resolve;
