import { SafeNode } from '../types';
import getWrap from './getWrap';
import isFixed from './isFixed';

// Mirrors SAFETY_THRESHOLD in resolvePagination. An overflow smaller than this
// is not split there, so it must not cost a whole page here either.
const SAFETY_THRESHOLD = 0.001;

const getBreak = (node: SafeNode) =>
  'break' in node.props ? node.props.break : false;

const getBreakWhenNeeded = (node: SafeNode) =>
  'breakWhenNeeded' in node.props ? node.props.breakWhenNeeded : false;

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

const getEndOfPresence = (child: SafeNode, futureElements: SafeNode[]) => {
  const afterMinPresenceAhead = getEndOfMinPresenceAhead(child);
  const nonFixedFuture = futureElements.filter(
    (node) => !('fixed' in node.props),
  );
  const endOfFurthestFutureElement = getFurthestEnd(nonFixedFuture);

  // When there are no future non-fixed siblings, use only minPresenceAhead
  if (endOfFurthestFutureElement === null) return afterMinPresenceAhead;

  return Math.min(afterMinPresenceAhead, endOfFurthestFutureElement);
};

const shouldBreak = (
  child: SafeNode,
  futureElements: SafeNode[],
  height: number,
  previousElements: SafeNode[],
  contentAbove = false,
) => {
  if ('fixed' in child.props) return false;

  const shouldSplit = height < child.box.top + child.box.height;
  const canWrap = getWrap(child);

  // Calculate the y coordinate where the desired presence of the child ends
  const endOfPresence = getEndOfPresence(child, futureElements);

  // If the child is already at the top of the page, breaking won't improve its presence
  // (as long as react-pdf does not support breaking into differently sized containers)
  const breakingImprovesPresence =
    previousElements.filter((node: SafeNode) => !isFixed(node)).length > 0;
  // Unlike minPresenceAhead, moving also pays off for a node that is the first
  // child of its container, as long as something sits above that container on
  // the page — it still gains a full page by waiting for the next one.
  const movingImprovesPresence = contentAbove || breakingImprovesPresence;

  // Use the same tolerance as resolvePagination, so an overflow it would leave
  // alone never moves the node to the next page.
  const overflowsPage =
    height + SAFETY_THRESHOLD < child.box.top + child.box.height;

  const shouldBreakWhenNeeded =
    overflowsPage &&
    canWrap &&
    getBreakWhenNeeded(child) &&
    movingImprovesPresence;

  return (
    getBreak(child) ||
    (shouldSplit && !canWrap) ||
    shouldBreakWhenNeeded ||
    (!shouldSplit && endOfPresence > height && breakingImprovesPresence)
  );
};

export default shouldBreak;
