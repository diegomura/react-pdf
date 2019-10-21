import * as R from 'ramda';

import { ELLIPSE } from '../constants';

/**
 * Checks if node is ellipse
 *
 * @param {Object} node
 * @returns {Boolean} is node ellipse?
 */
const isEllipse = R.propEq('type', ELLIPSE);

export default isEllipse;
