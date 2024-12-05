import * as Yoga from 'yoga-layout/load';

const getAspectRatio = (viewbox) => {
  if (!viewbox) return null;
  return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};

/**
 * @typedef {Function} MeasureSvg
 * @param {number} width
 * @param {number} widthMode
 * @param {number} height
 * @param {number} heightMode
 * @returns {{ width: number, height: number }} svg width and height
 */

/**
 * Yoga svg measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @returns {MeasureSvg} measure svg
 */
const measureCanvas =
  (page, node) => (width, widthMode, height, heightMode) => {
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
