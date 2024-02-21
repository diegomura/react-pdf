/* eslint-disable no-param-reassign */

import * as Yoga from 'yoga-layout';

import layoutText from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

/**
 * @typedef {Function} MeasureText
 * @param {number} width
 * @param {number} widthMode
 * @param {number} height
 * @returns {{ width: number, height: number }} text width and height
 */

/**
 * Yoga text measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Object} fontStore
 * @returns {MeasureText} measure text function
 */
const measureText = (page, node, fontStore) => (width, widthMode, height) => {
  if (widthMode === Yoga.MeasureMode.Exactly) {
    if (!node.lines) node.lines = layoutText(node, width, height, fontStore);

    return { height: linesHeight(node) };
  }

  if (widthMode === Yoga.MeasureMode.AtMost) {
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
