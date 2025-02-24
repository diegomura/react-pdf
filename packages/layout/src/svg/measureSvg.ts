import * as Yoga from 'yoga-layout/load';

import { SafePageNode, SafeSvgNode, Viewbox } from '../types';

const getAspectRatio = (viewbox: string | Viewbox) => {
  if (!viewbox) return null;
  if (typeof viewbox === 'string') return null;

  return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};

/**
 * Yoga svg measure function
 *
 * @param page
 * @param node
 * @returns Measure svg
 */
const measureCanvas =
  (page: SafePageNode, node: SafeSvgNode): Yoga.MeasureFunction =>
  (width, widthMode, height, heightMode) => {
    const aspectRatio = getAspectRatio(node.props.viewBox) || 1;

    if (
      widthMode === Yoga.MeasureMode.Exactly ||
      widthMode === Yoga.MeasureMode.AtMost
    ) {
      return { width, height: width / aspectRatio };
    }

    if (heightMode === Yoga.MeasureMode.Exactly) {
      return { width: height * aspectRatio };
    }

    return {};
  };

export default measureCanvas;
