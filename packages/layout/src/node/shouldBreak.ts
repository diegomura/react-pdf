import { SafeNode } from '../types';
import getWrap from './getWrap';
import isFixed from './isFixed';

const getBreak = (node: SafeNode) =>
  'break' in node.props ? node.props.break : false;

const getMinPresenceAhead = (node: SafeNode) =>
  'minPresenceAhead' in node.props ? node.props.minPresenceAhead : 0;

const getFurthestEnd = (elements: SafeNode[]) =>
  Math.max(...elements.map((node) => node.box.top + node.box.height));

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
  const endOfFurthestFutureElement = getFurthestEnd(
    futureElements.filter((node) => !('fixed' in node.props)),
  );
  return Math.min(afterMinPresenceAhead, endOfFurthestFutureElement);
};

const shouldBreak = (
  child: SafeNode,
  futureElements: SafeNode[],
  height: number,
  previousElements: SafeNode[],
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

  return (
    getBreak(child) ||
    (shouldSplit && !canWrap) ||
    (!shouldSplit && endOfPresence > height && breakingImprovesPresence)
  );
};

export default shouldBreak;
