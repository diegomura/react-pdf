import { PageNode } from '../types';
import getOrientation from './getOrientation';

/**
 * Return true if page is landscape
 *
 * @param page - Page instance
 * @returns Is page landscape
 */
const isLandscape = (page: PageNode) => getOrientation(page) === 'landscape';

export default isLandscape;
