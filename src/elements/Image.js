import Yoga from 'yoga-layout-prebuilt';
import warning from 'fbjs/lib/warning';
import Base from './Base';
import { resolveImage } from '../utils/image';

const SAFETY_HEIGHT = 10;

// We manage two bounding boxes in this class:
//  - Yoga node: Image bounding box. Adjust based on image and page size
//  - Image node: Real image container. In most cases equals Yoga node, except if image is bigger than page
class Image extends Base {
  static defaultProps = {
    wrap: false,
    cache: true,
  };

  constructor(root, props) {
    super(root, props);

    this.image = null;
    this.layout.setMeasureFunc(this.measureImage.bind(this));
  }

  get name() {
    return 'Image';
  }

  shouldGrow() {
    return !!this.getComputedStyles().flexGrow;
  }

  measureImage(width, widthMode, height, heightMode) {
    const imageMargin = this.margin;
    const pagePadding = this.page.padding;
    const pageArea =
      this.page.size.height -
      pagePadding.top -
      pagePadding.bottom -
      imageMargin.top -
      imageMargin.bottom -
      SAFETY_HEIGHT;

    // Skip measure if image data not present yet
    if (!this.image) return { width: 0, height: 0 };

    if (
      widthMode === Yoga.MEASURE_MODE_EXACTLY &&
      heightMode === Yoga.MEASURE_MODE_UNDEFINED
    ) {
      const scaledHeight = width / this.ratio;
      return { height: Math.min(pageArea, scaledHeight) };
    }

    if (
      heightMode === Yoga.MEASURE_MODE_EXACTLY &&
      (widthMode === Yoga.MEASURE_MODE_AT_MOST ||
        widthMode === Yoga.MEASURE_MODE_UNDEFINED)
    ) {
      return { width: Math.min(height * this.ratio, width) };
    }

    if (
      widthMode === Yoga.MEASURE_MODE_EXACTLY &&
      heightMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      const scaledHeight = width / this.ratio;
      return { height: Math.min(height, pageArea, scaledHeight) };
    }

    if (
      widthMode === Yoga.MEASURE_MODE_AT_MOST &&
      heightMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      const imageWidth = Math.min(this.image.width, width);

      return {
        width: imageWidth,
        height: imageWidth / this.ratio,
      };
    }

    return { height, width };
  }

  get ratio() {
    return this.image.data ? this.image.width / this.image.height : 1;
  }

  async fetch() {
    try {
      this.image = await resolveImage(this.props.src, this.props.cache);
    } catch (e) {
      this.image = { width: 0, height: 0 };
      console.warn(e.message);
    }
  }

  clone() {
    const clone = super.clone();
    clone.image = this.image;
    return clone;
  }

  async render() {
    const padding = this.padding;
    const { left, top } = this.getAbsoluteLayout();

    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();

    if (this.image.data) {
      // Inner offset between yoga node and image box
      // Makes image centered inside Yoga node
      const width =
        Math.min(this.height * this.ratio, this.width) -
        padding.left -
        padding.right;
      const height = this.height - padding.top - padding.bottom;
      const xOffset = Math.max((this.width - width) / 2, 0);

      if (width !== 0 && height !== 0) {
        this.root.instance.image(
          this.image.data,
          left + padding.left + xOffset,
          top + padding.top,
          { width, height },
        );
      } else {
        warning(
          false,
          `Image with src '${
            this.props.src
          }' skipped due to invalid dimensions`,
        );
      }
    }

    if (this.props.debug) {
      this.debug();
    }

    this.root.instance.restore();
  }
}

export default Image;
