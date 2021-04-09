import * as R from 'ramda';

import runDropLast from '../run/dropLast';

/**
 * Drop last glyph
 *
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
const dropLast = string =>
  R.evolve({
    string: R.dropLast(1),
    runs: R.adjust(-1, runDropLast),
  })(string);

export default dropLast;
