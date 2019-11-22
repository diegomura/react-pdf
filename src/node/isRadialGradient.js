import * as R from 'ramda';

import { RADIAL_GRADIENT } from '../constants';

/**
 * Checks if node is radial gradient
 *
 * @param {Object} node
 * @returns {Boolean} is node radial gradient?
 */
const isRadialGradient = R.propEq('type', RADIAL_GRADIENT);

export default isRadialGradient;
