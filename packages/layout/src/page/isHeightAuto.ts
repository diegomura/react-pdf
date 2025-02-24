import { isNil } from '@react-pdf/fns';
import { SafePageNode } from '../types';

/**
 * Checks if page has auto height
 *
 * @param page
 * @returns Is page height auto
 */
const isHeightAuto = (page: SafePageNode) => isNil(page.box?.height);

export default isHeightAuto;
