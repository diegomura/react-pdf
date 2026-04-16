import { SafeNode } from '../types';
import getWrap from './getWrap';
import isFixed from './isFixed';

const getBreak = (node: SafeNode) =>
  'break' in node.props ? node.props.break : false;

const getMinPresenceAhead = (node: SafeNode) =>
  'minPresenceAhead' in node.props ? node.props.minPresenceAhead : 0;

const getFurthestEnd = (elements: SafeNode[]) => {
  if (elements.length === 0) return null;
  return Math.max(...elements.map((node) => node.box.top + node.box.height));
};

const getEndOfMinPresenceAhead = (child: SafeNode) => {
  return (
    child.box.top +
    child.box.height +
    child.box.marginBottom +
    getMinPresenceAhead(child)
  );
};

/**
 * Determines whether a node should break to the next page.
 * Accepts pre-computed values to avoid O(N) array scans per call.
 *
 * @param child - The node to evaluate
 * @param furthestEndOfNonFixedFuture - Pre-computed max(top+height) of future non-fixed siblings, or null if none
 * @param height - Available page height
 * @param hasNonFixedPrevious - Whether any non-fixed sibling precedes this node
 */
export const shouldBreakOptimized = (
  child: SafeNode,
  furthestEndOfNonFixedFuture: number | null,
  height: number,
  hasNonFixedPrevious: boolean,
) => {
  if ('fixed' in child.props) return false;

  const shouldSplit = height < child.box.top + child.box.height;
  const canWrap = getWrap(child);

  const afterMinPresenceAhead = getEndOfMinPresenceAhead(child);
  const endOfPresence =
    furthestEndOfNonFixedFuture === null
      ? afterMinPresenceAhead
      : Math.min(afterMinPresenceAhead, furthestEndOfNonFixedFuture);

  return (
    getBreak(child) ||
    (shouldSplit && !canWrap) ||
    (!shouldSplit && endOfPresence > height && hasNonFixedPrevious)
  );
};

/**
 * Array-based wrapper around shouldBreakOptimized.
 * Computes the pre-computed values from raw arrays for convenience in tests.
 */
const shouldBreak = (
  child: SafeNode,
  futureElements: SafeNode[],
  height: number,
  previousElements: SafeNode[],
) => {
  const nonFixedFuture = futureElements.filter(
    (node) => !('fixed' in node.props),
  );
  const furthestEndOfNonFixedFuture = getFurthestEnd(nonFixedFuture);
  const hasNonFixedPrevious =
    previousElements.filter((node: SafeNode) => !isFixed(node)).length > 0;

  return shouldBreakOptimized(
    child,
    furthestEndOfNonFixedFuture,
    height,
    hasNonFixedPrevious,
  );
};

export default shouldBreak;
