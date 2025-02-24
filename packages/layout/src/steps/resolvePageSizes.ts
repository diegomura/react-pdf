import { flatten } from '@react-pdf/stylesheet';

import getPageSize from '../page/getSize';
import { DocumentNode, PageNode } from '../types';

/**
 * Resolves page size
 *
 * @param page
 * @returns Page with resolved size in style attribute
 */
export const resolvePageSize = (page: PageNode): PageNode => {
  const size = getPageSize(page);
  const style = flatten(page.style || {});

  return { ...page, style: { ...style, ...size } };
};

/**
 * Resolves page sizes
 *
 * @param root  -Document root
 * @returns Document root with resolved page sizes
 */
const resolvePageSizes = (root: DocumentNode) => {
  if (!root.children) return root;

  const children = root.children.map(resolvePageSize);

  return Object.assign({}, root, { children });
};

export default resolvePageSizes;
