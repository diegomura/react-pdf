/* eslint-disable no-param-reassign */

import yogaModule from 'yoga-layout/sync';

import layoutText from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

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
