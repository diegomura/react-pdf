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
const prepend = (glyph, attributedString) => {
  const codePoints = glyph?.codePoints || [];

  const string = stringFromCodePoints(codePoints) + attributedString.string;

  const runs = R.converge(R.concat, [
    R.compose(
      R.unapply(R.identity),
      prependToRun(glyph),
      R.either(R.head, emptyRun),
    ),
    R.compose(
      R.map(v => addToRun(codePoints.length, v)),
      R.tail,
    ),
  ])(attributedString.runs);

  return Object.assign({}, attributedString, { runs, string });
};

export default R.curryN(2, prepend);
