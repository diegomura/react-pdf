import Yoga from '@nutshelllabs-pdf/yoga';

const getAspectRatio = viewbox => {
  if (!viewbox) return null;
  return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};

/**
 * Yoga svg measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} canvas width and height
 */
const measureCanvas = (page, node) => (
  width,
  widthMode,
  height,
  heightMode,
) => {
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
