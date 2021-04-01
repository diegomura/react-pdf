/* eslint-disable no-param-reassign */

import * as R from 'ramda';
import Yoga from '@react-pdf/yoga';

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
const measureText = (page, node, fontStore, width, widthMode, height) => {
  // console.log(node, width, height);
  if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
    if (!node.lines) node.lines = layoutText(node, width, height, fontStore);

    // console.log(linesHeight(node), node.lines);

    return { height: linesHeight(node) };
  }

  if (widthMode === Yoga.MEASURE_MODE_AT_MOST) {
    if (!node.lines) node.lines = layoutText(node, width, height, fontStore);

    return {
      height: linesHeight(node),
      width: Math.min(width, linesWidth(node)),
    };
  }

  return {};
};

export default R.curryN(7, measureText);
