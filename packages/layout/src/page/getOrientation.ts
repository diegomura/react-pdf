import { PageNode } from '../types';

const VALID_ORIENTATIONS = ['portrait', 'landscape'];

/**
 * Get page orientation. Defaults to portrait
 *
 * @param page - Page object
 * @returns Page orientation
 */
const getOrientation = (page: PageNode) => {
  const value = page.props?.orientation || 'portrait';
  return VALID_ORIENTATIONS.includes(value) ? value : 'portrait';
};

export default getOrientation;
