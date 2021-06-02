import * as R from 'ramda';

import omit from '../run/omit';
import flatten from '../run/flatten';
import empty from '../attributedString/empty';

const omitFont = R.evolve({ runs: R.map(omit('font')) });

/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} processed attributed string
 */
const preprocessRuns = (engines, options) =>
  R.ifElse(
    R.isNil,
    empty,
    R.applySpec({
      string: R.prop('string'),
      runs: R.compose(
        flatten,
        R.flatten,
        R.pluck('runs'),
        R.juxt([
          engines.bidi(options), // bidi processing
          engines.fontSubstitution(options), // font substitution
          engines.scriptItemizer(options), // script itemization
          omitFont,
        ]),
      ),
    }),
  );

export default preprocessRuns;
