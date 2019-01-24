import Yoga from 'yoga-layout-prebuilt';
import warning from 'fbjs/lib/warning';
import Base from './Base';
import { resolveImage } from '../utils/image';
import { resolveObjectFit } from '../utils/objectFit';

const SAFETY_HEIGHT = 10;

// We manage two bounding boxes in this class:
//  - Yoga node: Image bounding box. Adjust based on image and page size
//  - Image node: Real image container. In most cases equals Yoga node, except if image is bigger than page
class Image extends Base {
  static defaultProps = {
    wrap: false,
    cache: true,
    style: {},
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
      if (this.ratio > 1) {
        return {
          width: width,
          height: Math.min(width / this.ratio, height),
        };
      } else {
        return {
          width: Math.min(height * this.ratio, width),
          height: height,
        };
      }
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

  async onAppendDynamically() {
    await this.fetch();
  }

  renderImage() {
    const padding = this.padding;
    const { left, top } = this.getAbsoluteLayout();
    const { objectPositionX, objectPositionY } = this.getComputedStyles();

    this.root.instance.save();

    // Clip path to keep image inside border radius
    this.clip();

    if (this.image.data) {
      const { width, height, xOffset, yOffset } = resolveObjectFit(
        this.props.style.objectFit,
        this.width - padding.left - padding.right,
        this.height - padding.top - padding.bottom,
        this.image.width,
        this.image.height,
        objectPositionX,
        objectPositionY,
      );

      if (width !== 0 && height !== 0) {
        this.root.instance.image(
          this.image.data,
          left + padding.left + xOffset,
          top + padding.top + yOffset,
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

    this.root.instance.restore();
  }

  async render() {
    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.renderImage();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    this.root.instance.restore();
  }
}

export default Image;
