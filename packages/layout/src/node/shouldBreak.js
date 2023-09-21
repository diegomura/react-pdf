/* eslint-disable no-continue */

import getWrap from './getWrap';

const getBreak = node => node.props?.break || false;

const getMinPresenceAhead = node => node.props?.minPresenceAhead || 0;

const shouldBreak = (child, futureElements, height) => {
  const shouldSplit = height < child.box.top + child.box.height;
  const shouldWrap = getWrap(child);
  const minPresenceAhead = getMinPresenceAhead(child);
  const afterMinPresenceAhead =
    child.box.top +
    child.box.height +
    child.box.marginBottom +
    minPresenceAhead;
  const endOfLastFutureElement = Math.max(
    ...futureElements.map(node => node.box.top + node.box.height),
  );
  const afterPresence = Math.min(afterMinPresenceAhead, endOfLastFutureElement);
  // If the child is already at the top of the page, breaking won't improve presence
  // (as long as react-pdf does not support breaking into differently sized containers)
  const breakingImprovesPresence = child.box.top > child.box.marginTop;

  return (
    getBreak(child) ||
    (!shouldWrap && shouldSplit) ||
    (afterPresence > height && breakingImprovesPresence)
  );
};

export default shouldBreak;
