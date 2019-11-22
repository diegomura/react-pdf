import * as R from 'ramda';

import { CLIP_PATH } from '../constants';

/**
 * Checks if node is clip path
 *
 * @param {Object} node
 * @returns {Boolean} is node clip path?
 */
const isClipPath = R.propEq('type', CLIP_PATH);

export default isClipPath;
