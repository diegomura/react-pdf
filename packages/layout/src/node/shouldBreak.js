/* eslint-disable no-continue */

import * as R from 'ramda';

import getWrap from './getWrap';
import getNodesHeight from './getNodesHeight';

const getBreak = R.pathOr(false, ['props', 'break']);

const getMinPresenceAhead = R.path(['props', 'minPresenceAhead']);

const defaultPresenceAhead = element => height =>
  Math.min(element.box.height, height);

const getPresenceAhead = (elements, height) => {
  let result = 0;

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (!element.box) continue;

    const isElementInside = height > element.box.top;
    const presenceAhead =
      element.props.presenceAhead || defaultPresenceAhead(element);

    if (element && isElementInside) {
      result += presenceAhead(height - element.box.top);
    }
  }

  return result;
};

const shouldBreak = (child, futureElements, height) => {
  const minPresenceAhead = getMinPresenceAhead(child);
  const presenceAhead = getPresenceAhead(futureElements, height);
  const futureHeight = getNodesHeight(futureElements);
  const shouldSplit = height < child.box.top + child.box.height;
  const shouldWrap = getWrap(child);

  return (
    getBreak(child) ||
    (!shouldWrap && shouldSplit) ||
    (minPresenceAhead < futureHeight && presenceAhead < minPresenceAhead)
  );
};

export default shouldBreak;
