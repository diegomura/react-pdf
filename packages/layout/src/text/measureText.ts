import * as Yoga from 'yoga-layout/load';
import FontStore from '@react-pdf/font';

import layoutText from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';
import { SafePageNode, SafeTextNode } from '../types';

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

const isVerticalWritingMode = (node: SafeTextNode) => {
  const wm = node.style?.writingMode;
  return wm === 'vertical-rl' || wm === 'vertical-lr';
};

/**
 * Yoga text measure function
 *
 * @param page
 * @param node
 * @param fontStore
 * @returns {MeasureText} measure text function
 */
const measureText =
  (
    page: SafePageNode,
    node: SafeTextNode,
    fontStore: FontStore,
  ): Yoga.MeasureFunction =>
  (width, widthMode, height) => {
    if (isVerticalWritingMode(node)) {
      // For vertical text, after transformVerticalLines:
      // - linesWidth returns the total width of all columns (sum of `line.box.width` across columns)
      // - linesHeight returns the column height (the max height among columns)
      if (widthMode === Yoga.MeasureMode.Exactly) {
        if (!node.lines)
          node.lines = layoutText(node, width, height, fontStore);

        return { height: linesHeight(node), width };
      }

      if (widthMode === Yoga.MeasureMode.AtMost) {
        if (!node.lines)
          node.lines = layoutText(node, width, height, fontStore);

        return {
          height: linesHeight(node),
          width: Math.min(width, linesWidth(node)),
        };
      }

      return {};
    }

    if (widthMode === Yoga.MeasureMode.Exactly) {
      if (!node.lines) node.lines = layoutText(node, width, height, fontStore);

      return { height: linesHeight(node), width };
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
