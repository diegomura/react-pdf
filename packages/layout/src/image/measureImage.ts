import { MeasureFunction, MeasureMode } from '../taffy/measure';

import getRatio from './getRatio';
import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import isHeightAuto from '../page/isHeightAuto';
import { SafeImageNode, SafePageNode } from '../types';

const SAFETY_HEIGHT = 10;

/**
 * Image measure function
 *
 * @param page - Page
 * @param node - Node
 * @returns Measure image
 */
const measureImage =
  (page: SafePageNode, node: SafeImageNode): MeasureFunction =>
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
      widthMode === MeasureMode.Exactly &&
      heightMode === MeasureMode.Undefined
    ) {
      const scaledHeight = width / imageRatio;
      return { height: Math.min(pageArea, scaledHeight) };
    }

    if (
      heightMode === MeasureMode.Exactly &&
      (widthMode === MeasureMode.AtMost || widthMode === MeasureMode.Undefined)
    ) {
      return { width: Math.min(height * imageRatio, width) };
    }

    if (
      widthMode === MeasureMode.Exactly &&
      heightMode === MeasureMode.AtMost
    ) {
      const scaledHeight = width / imageRatio;
      return { height: Math.min(height, pageArea, scaledHeight) };
    }

    if (widthMode === MeasureMode.AtMost && heightMode === MeasureMode.AtMost) {
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

    // Unconstrained width (Taffy asks for the max-content size when sizing
    // flex items in rows): use the image's intrinsic size, clamped by the
    // available height. Yoga never asked; it offered the container width.
    if (widthMode === MeasureMode.Undefined) {
      const intrinsicWidth = width === 0 ? 0 : node.image.width;
      const maxHeight =
        heightMode === MeasureMode.AtMost
          ? Math.min(height, pageArea)
          : pageArea;
      const scaledHeight = Math.min(intrinsicWidth / imageRatio, maxHeight);

      return { width: scaledHeight * imageRatio, height: scaledHeight };
    }

    return { height, width };
  };

export default measureImage;
