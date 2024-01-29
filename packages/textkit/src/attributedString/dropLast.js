import { adjust, dropLast as arrayDropLast } from '@react-pdf/fns';

import runDropLast from '../run/dropLast';

/**
 * Drop last glyph
 *
 * @param {Object} attributedString attributed string
 * @returns {Object} attributed string with new glyph
 */
const dropLast = (attributedString) => {
  const string = arrayDropLast(attributedString.string);
  const runs = adjust(-1, runDropLast, attributedString.runs);

  return Object.assign({}, attributedString, { string, runs });
};

export default dropLast;
