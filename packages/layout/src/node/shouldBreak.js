/* eslint-disable no-continue */

import getWrap from './getWrap';

const getBreak = (node) => node.props?.break || false;

const getMinPresenceAhead = (node) => node.props?.minPresenceAhead || 0;

const getFurthestEnd = (elements) =>
  Math.max(...elements.map((node) => node.box.top + node.box.height));

const getEndOfMinPresenceAhead = (child) => {
  return (
    child.box.top +
    child.box.height +
    child.box.marginBottom +
    getMinPresenceAhead(child)
  );
};

const getEndOfPresence = (child, futureElements) => {
  const afterMinPresenceAhead = getEndOfMinPresenceAhead(child);
  const endOfFurthestFutureElement = getFurthestEnd(
    futureElements.filter((node) => !node.props?.fixed),
  );
  return Math.min(afterMinPresenceAhead, endOfFurthestFutureElement);
};

const shouldBreak = (child, futureElements, height) => {
  if (child.props?.fixed) return false;

  const shouldSplit = height < child.box.top + child.box.height;
  const canWrap = getWrap(child);

  // Calculate the y coordinate where the desired presence of the child ends
  const endOfPresence = getEndOfPresence(child, futureElements);
  // If the child is already at the top of the page, breaking won't improve its presence
  // (as long as react-pdf does not support breaking into differently sized containers)
  const breakingImprovesPresence = child.box.top > child.box.marginTop;

  return (
    getBreak(child) ||
    (shouldSplit && !canWrap) ||
    (!shouldSplit && endOfPresence > height && breakingImprovesPresence)
  );
};

export default shouldBreak;
