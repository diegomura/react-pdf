import getOrientation from './getOrientation';
import { PageNode } from '../types';

/**
 * Return true if page is portrait
 *
 * @param page - Page node
 * @returns Is page portrait
 */
const isPortrait = (page: PageNode) => getOrientation(page) === 'portrait';

export default isPortrait;
