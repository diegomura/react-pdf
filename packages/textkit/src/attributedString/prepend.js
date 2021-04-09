import * as R from 'ramda';

import addToRun from '../run/add';
import emptyRun from '../run/empty';
import prependToRun from '../run/prepend';
import stringFromCodePoints from '../utils/stringFromCodePoints';

/**
 * prepend glyph into last run of attributed string
 *
 * @param {Object} glyph
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
const prepend = (glyph, string) => {
  const codePoints = R.propOr([], 'codePoints')(glyph);

  return R.evolve({
    string: R.concat(stringFromCodePoints(codePoints)),
    runs: R.converge(R.concat, [
      R.compose(
        R.unapply(R.identity),
        prependToRun(glyph),
        R.either(R.head, emptyRun),
      ),
      R.compose(R.map(addToRun(codePoints.length)), R.tail),
    ]),
  })(string);
};

export default R.curryN(2, prepend);
