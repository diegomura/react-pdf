import * as R from 'ramda';

import { POLYLINE } from '../constants';

/**
 * Checks if node is polyline
 *
 * @param {Object} node
 * @returns {Boolean} is node polyline?
 */
const isPolyline = R.propEq('type', POLYLINE);

export default isPolyline;
