import * as R from 'ramda';

import { SVG } from '../constants';

/**
 * Checks if node is svg
 *
 * @param {Object} node
 * @returns {Boolean} is node svg?
 */
const isSvg = R.propEq('type', SVG);

export default isSvg;
