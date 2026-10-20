import * as Yoga from 'yoga-layout/load';
import FontStore from '@react-pdf/font';

import layoutText from './layoutText';
import linesWidth from './linesWidth';
import linesHeight from './linesHeight';
import { SafePageNode, SafeTextNode } from '../types';

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

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
    if (widthMode === Yoga.MeasureMode.Exactly) {
      // An exact width is the width the node really gets, so lines that were
      // built for a different one are wrong and are laid out again. Without
      // this a text keeps the line breaks of the first width yoga happened to
      // ask about - usually the whole space above it - and then sits in a box
      // that is narrower and one line too short, which draws the row below it
      // straight through the line that did not fit.
      //
      // Three things are never re-wrapped:
      // - a width of zero or less, which yoga passes while it is still
      //   resolving a flex basis and which would throw the text away,
      // - the halves of a text that was split across a page, whose lines are
      //   slices of one layout and would be re-joined by a new one,
      // - a text whose lines already belong to this width, which is the
      //   common case and has to stay free.
      const veraltet =
        !!node.lines &&
        node.linesLayoutWidth !== width &&
        width > 0 &&
        !node.wasSplit;

      if (!node.lines || veraltet) {
        node.lines = layoutText(node, width, height, fontStore);
        node.linesLayoutWidth = width;
      }

      return { height: linesHeight(node), width };
    }

    if (widthMode === Yoga.MeasureMode.AtMost) {
      const alignFactor = ALIGNMENT_FACTORS[node.style?.textAlign] || 0;

      // Deliberately no re-layout here: "at most" is yoga asking how much room
      // the text would like, not what it will get. Answering from lines that
      // were already built for the real width is both correct and what keeps
      // the two from overwriting each other in turn.
      if (!node.lines) {
        node.lines = layoutText(node, width, height, fontStore);
        node.linesLayoutWidth = width;
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
