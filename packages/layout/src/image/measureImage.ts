import * as Yoga from 'yoga-layout/load';

import getRatio from './getRatio';
import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import isHeightAuto from '../page/isHeightAuto';
import { SafeImageNode, SafePageNode } from '../types';

const SAFETY_HEIGHT = 10;

/**
 * Yoga image measure function
 *
 * @param page - Page
 * @param node - Node
 * @returns Measure image
 */
const measureImage =
  (page: SafePageNode, node: SafeImageNode): Yoga.MeasureFunction =>
  (width, widthMode, height, heightMode) => {
    const imageRatio = getRatio(node);
    const imageMargin = getMargin(node);
    const pagePadding = getPadding(page);

    // TODO: Check image percentage margins
    const pageArea = isHeightAuto(page)
      ? Infinity
      : (page.box?.height || 0) -
        (pagePadding.paddingTop as number) -
        (pagePadding.paddingBottom as number) -
        (imageMargin.marginTop as number) -
        (imageMargin.marginBottom as number) -
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

export default measureImage;
