import { isNil } from '@react-pdf/fns';

/**
 * Checks if page has auto height
 *
 * @param {Object} page
 * @returns {Boolean} is page height auto
 */
const isHeightAuto = page => isNil(page.box?.height);

export default isHeightAuto;
