import * as R from 'ramda';

const unitsPerEm = ['font', 'unitsPerEm'];

/**
 * Calculate run scale
 *
 * @param  {Object}  run
 * @return {number} scale
 */
const calculateScale = R.compose(
  R.ifElse(
    R.compose(R.not, R.isNil, R.path(unitsPerEm)),
    R.converge(R.divide, [R.propOr(12, 'fontSize'), R.path(unitsPerEm)]),
    R.always(0),
  ),
  R.propOr({}, 'attributes'),
);

/**
 * Get run scale
 *
 * @param  {Object}  run
 * @return {number} scale
 */
const scale = R.either(R.path(['attributes', 'scale']), calculateScale);

export default scale;
