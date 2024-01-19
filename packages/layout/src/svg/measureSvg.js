import Yoga from '../../yoga';

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
      widthMode === Yoga.MEASURE_MODE_EXACTLY ||
      widthMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      return { width, height: width / aspectRatio };
    }

    if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
      return { width: height * aspectRatio };
    }

    return {};
  };

export default measureCanvas;
