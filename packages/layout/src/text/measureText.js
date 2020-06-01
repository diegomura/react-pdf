/* eslint-disable no-param-reassign */

import * as R from 'ramda';
import Yoga from 'yoga-layout-prebuilt';

import layoutText from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';

/**
 * Yoga text measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} text width and height
 */
const measureText = (page, node, width, widthMode, height) => {
  if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
    if (!node.lines) node.lines = layoutText(node, width, height);

    return { height: linesHeight(node) };
  }

  if (widthMode === Yoga.MEASURE_MODE_AT_MOST) {
    if (!node.lines) node.lines = layoutText(node, width, height);

    return {
      height: linesHeight(node),
      width: Math.min(width, linesWidth(node)),
    };
  }

  return {};
};

export default R.curryN(6, measureText);
