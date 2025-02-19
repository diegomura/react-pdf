import { isNil } from '@react-pdf/fns';
import { PageNode } from '../types';

/**
 * Checks if page has auto height
 *
 * @param page
 * @returns Is page height auto
 */
const isHeightAuto = (page: PageNode) => isNil(page.box?.height);

export default isHeightAuto;
