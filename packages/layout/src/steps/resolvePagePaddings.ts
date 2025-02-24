import { evolve, matchPercent } from '@react-pdf/fns';
import { SafeStyle } from '@react-pdf/stylesheet';

import { SafeDocumentNode, SafePageNode } from '../types';

/**
 * Translates page percentage horizontal paddings in fixed ones
 *
 * @param container - Page container
 * @returns Resolve page horizontal padding
 */
const resolvePageHorizontalPadding =
  (container: SafeStyle) => (value: number) => {
    const match = matchPercent(value);
    const width = container.width as number;
    return match ? match.percent * width : value;
  };

/**
 * Translates page percentage vertical paddings in fixed ones
 *
 * @param container - Page container
 * @returns Resolve page vertical padding
 */
const resolvePageVerticalPadding =
  (container: SafeStyle) => (value: number) => {
    const match = matchPercent(value);
    const height = container.height as number;
    return match ? match.percent * height : value;
  };

/**
 * Translates page percentage paddings in fixed ones
 *
 * @param page
 * @returns Page with fixed paddings
 */
const resolvePagePaddings = (page: SafePageNode): SafePageNode => {
  const container = page.style;

  const style = evolve(
    {
      paddingTop: resolvePageVerticalPadding(container),
      paddingLeft: resolvePageHorizontalPadding(container),
      paddingRight: resolvePageHorizontalPadding(container),
      paddingBottom: resolvePageVerticalPadding(container),
    },
    page.style,
  );

  return Object.assign({}, page, { style });
};

/**
 * Translates all pages percentage paddings in fixed ones
 * This has to be computed from pages calculated size and not by Yoga
 * because at this point we didn't performed pagination yet.
 *
 * @param root - Document root
 * @returns Document root with translated page paddings
 */
const resolvePagesPaddings = (root: SafeDocumentNode) => {
  if (!root.children) return root;

  const children = root.children.map(resolvePagePaddings);

  return Object.assign({}, root, { children });
};

export default resolvePagesPaddings;
