import * as R from 'ramda';

import { POLYGON } from '../constants';

/**
 * Checks if node is polygon
 *
 * @param {Object} node
 * @returns {Boolean} is node polygon?
 */
const isPolygon = R.propEq('type', POLYGON);

export default isPolygon;
