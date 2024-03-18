import * as Yoga from 'yoga-layout';

import getRatio from './getRatio';
import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import isHeightAuto from '../page/isHeightAuto';

const SAFETY_HEIGHT = 10;

/**
 * @typedef {Function} MeasureImage
 * @param {number} width
 * @param {number} widthMode
 * @param {number} height
 * @param {number} heightMode
 * @returns {{ width: number, height: number }} image width and height
 */

/**
 * Yoga image measure function
 *
 * @param {Object} page page
 * @param {Object} node node
 * @returns {MeasureImage} measure image
 */
const measureImage = (page, node) => (width, widthMode, height, heightMode) => {
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
    widthMode === Yoga.MeasureMode.Exactly &&
    heightMode === Yoga.MeasureMode.Undefined
  ) {
    const scaledHeight = width / imageRatio;
    return { height: Math.min(pageArea, scaledHeight) };
  }

  if (
    heightMode === Yoga.MeasureMode.Exactly &&
    (widthMode === Yoga.MeasureMode.AtMost ||
      widthMode === Yoga.MeasureMode.Undefined)
  ) {
    return { width: Math.min(height * imageRatio, width) };
  }

  if (
    widthMode === Yoga.MeasureMode.Exactly &&
    heightMode === Yoga.MeasureMode.AtMost
  ) {
    const scaledHeight = width / imageRatio;
    return { height: Math.min(height, pageArea, scaledHeight) };
  }

  if (
    widthMode === Yoga.MeasureMode.AtMost &&
    heightMode === Yoga.MeasureMode.AtMost
  ) {
    if ((node.image.width/width) > 1 || (node.image.height/height) > 1) {
      if ((node.image.width/width) > (node.image.height/height)) {
        const newRatio = (node.image.width/width);
        return {
          width: Math.min(node.image.width / newRatio, width),
          height: Math.min(node.image.height / newRatio, height),
        };
      }
      const newRatio = (node.image.height/height);
      return {
        width: Math.min(node.image.width / newRatio, width),
        height: Math.min(node.image.height / newRatio, height),
      };
    }

    return {
      height,
      width: Math.min(height * imageRatio, width),
    };
  }

  return { height, width };
};

export default measureImage;
