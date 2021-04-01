import * as R from 'ramda';
import Yoga from '@react-pdf/yoga';

import getRatio from './getRatio';
import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import isHeightAuto from '../page/isHeightAuto';

const SAFETY_HEIGHT = 10;

/**
 * Yoga image measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} image width and height
 */
const measureImage = (page, node, width, widthMode, height, heightMode) => {
  const imageRatio = getRatio(node);
  const imageMargin = getMargin(node);
  const pagePadding = getPadding(page);
  const pageArea = isHeightAuto(page)
    ? Infinity
    : page.box.height -
      pagePadding.paddingTop -
      pagePadding.paddingBottom -
      imageMargin.marginTop -
      imageMargin.marginBottom -
      SAFETY_HEIGHT;

  // Skip measure if image data not present yet
  if (!node.image) return { width: 0, height: 0 };

  if (
    widthMode === Yoga.MEASURE_MODE_EXACTLY &&
    heightMode === Yoga.MEASURE_MODE_UNDEFINED
  ) {
    const scaledHeight = width / imageRatio;
    return { height: Math.min(pageArea, scaledHeight) };
  }

  if (
    heightMode === Yoga.MEASURE_MODE_EXACTLY &&
    (widthMode === Yoga.MEASURE_MODE_AT_MOST ||
      widthMode === Yoga.MEASURE_MODE_UNDEFINED)
  ) {
    return { width: Math.min(height * imageRatio, width) };
  }

  if (
    widthMode === Yoga.MEASURE_MODE_EXACTLY &&
    heightMode === Yoga.MEASURE_MODE_AT_MOST
  ) {
    const scaledHeight = width / imageRatio;
    return { height: Math.min(height, pageArea, scaledHeight) };
  }

  if (
    widthMode === Yoga.MEASURE_MODE_AT_MOST &&
    heightMode === Yoga.MEASURE_MODE_AT_MOST
  ) {
    if (imageRatio > 1) {
      return {
        width,
        height: Math.min(width / imageRatio, height),
      };
    }

    return {
      height,
      width: Math.min(height * imageRatio, width),
    };
  }

  return { height, width };
};

export default R.curryN(6, measureImage);
