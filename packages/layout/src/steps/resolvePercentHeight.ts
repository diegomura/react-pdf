import { isNil, matchPercent } from '@react-pdf/fns';

import { isSlot } from '../page/template';
import { SafeDocumentNode, SafeNode, SafePageNode } from '../types';

/**
 * Transform percent height into fixed
 *
 * @param height
 * @returns Height
 */
const transformHeight = (pageArea: number, height: number | string) => {
  const match = matchPercent(height);
  return match ? match.percent * pageArea : height;
};

/**
 * Get page area (height minus paddings)
 *
 * @param page
 * @returns Page area
 */
const getPageArea = (page: SafePageNode) => {
  const pageHeight = page.style.height as number;
  const pagePaddingTop = (page.style?.paddingTop || 0) as number;
  const pagePaddingBottom = (page.style?.paddingBottom || 0) as number;

  return pageHeight - pagePaddingTop - pagePaddingBottom;
};

/**
 * Transform node percent height to fixed
 *
 * @param page
 * @param node
 * @returns Transformed node
 */
const resolveNodePercentHeight = (
  page: SafePageNode,
  node: SafeNode,
): SafeNode => {
  if (isNil(page.style?.height)) return node;
  if (isNil(node.style?.height)) return node;

  const pageArea = getPageArea(page);
  const height = transformHeight(pageArea, node.style.height);
  const style = Object.assign({}, node.style, { height });

  return Object.assign({}, node, { style });
};

/**
 * Transform page immediate children with percent height to fixed
 *
 * @param page
 * @returns Transformed page
 */
const resolvePagePercentHeight = (page: SafePageNode) => {
  if (!page.children) return page;

  // The slot is invisible plumbing between the page and its content, so
  // percentages reach through it and keep resolving against the page area.
  const resolveChild = (child: SafeNode): SafeNode => {
    if (isSlot(child)) {
      return Object.assign({}, child, {
        children: ((child.children || []) as SafeNode[]).map((inner) =>
          resolveNodePercentHeight(page, inner),
        ),
      });
    }

    return resolveNodePercentHeight(page, child);
  };

  const children = page.children.map(resolveChild);

  return Object.assign({}, page, { children });
};

/**
 * Transform all page immediate children with percent height to fixed.
 * This is needed for computing correct dimensions on pre-pagination layout.
 *
 * @param root - Document root
 * @returns Transformed document root
 */
const resolvePercentHeight = (root: SafeDocumentNode) => {
  if (!root.children) return root;

  const children = root.children.map(resolvePagePercentHeight);

  return Object.assign({}, root, { children });
};

export default resolvePercentHeight;
