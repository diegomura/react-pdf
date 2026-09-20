import { MeasureFunction, MeasureMode } from '../taffy/measure';

import { SafePageNode, SafeSvgNode, Viewbox } from '../types';

const getAspectRatio = (viewbox: string | Viewbox) => {
  if (!viewbox) return null;
  if (typeof viewbox === 'string') return null;

  return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};

/**
 * Svg measure function
 *
 * @param page
 * @param node
 * @returns Measure svg
 */
const measureCanvas =
  (page: SafePageNode, node: SafeSvgNode): MeasureFunction =>
  (width, widthMode, height, heightMode) => {
    const aspectRatio = getAspectRatio(node.props.viewBox) || 1;

    if (widthMode === MeasureMode.Exactly || widthMode === MeasureMode.AtMost) {
      return { width, height: width / aspectRatio };
    }

    if (heightMode === MeasureMode.Exactly) {
      return { width: height * aspectRatio };
    }

    return {};
  };

export default measureCanvas;
