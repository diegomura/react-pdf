import getOrientation from './getOrientation';

/**
 * Return true if page is portrait
 *
 * @param {Object} page instance
 * @returns {boolean} is page portrait
 */
const isPortrait = (page) => getOrientation(page) === 'portrait';

export default isPortrait;
