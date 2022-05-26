import * as R from 'ramda';

import emptyRun from '../run/empty';
import appendToRun from '../run/append';
import stringFromCodePoints from '../utils/stringFromCodePoints';

/**
 * Append glyph into last run of attributed string
 *
 * @param {Object} glyph
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
const append = (glyph, string) => {
  const codePoints = R.propOr([], 'codePoints')(glyph);

  return R.evolve({
    string: R.concat(R.__, stringFromCodePoints(codePoints)),
    runs: R.converge(R.concat, [
      R.init,
      R.compose(
        R.unapply(R.identity),
        v => appendToRun(glyph, v),
        R.either(R.last, emptyRun),
      ),
    ]),
  })(string);
};

export default R.curryN(2, append);
