/* eslint-disable no-param-reassign */

import Yoga from 'yoga-layout/sync';

import layoutText from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

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
const measureText = (page, node, fontStore) => (width, widthMode, height) => {
  if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
    if (!node.lines) node.lines = layoutText(node, width, height, fontStore);

    return { height: linesHeight(node) };
  }

  if (widthMode === Yoga.MEASURE_MODE_AT_MOST) {
    const alignFactor = ALIGNMENT_FACTORS[node.style?.textAlign] || 0;

    if (!node.lines) {
      node.lines = layoutText(node, width, height, fontStore);
      node.alignOffset = (width - linesWidth(node)) * alignFactor; // Compensate align in variable width containers
    }

    return {
      height: linesHeight(node),
      width: Math.min(width, linesWidth(node)),
    };
  }

  return {};
};

export default measureText;
