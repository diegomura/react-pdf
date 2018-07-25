import Yoga from 'yoga-layout';
import Base from './Base';
import { fetchImage } from '../utils/image';

const SAFETY_HEIGHT = 10;

// We manage two bounding boxes in this class:
//  - Yoga node: Image bounding box. Adjust based on image and page size
//  - Image node: Real image container. In most cases equals Yoga node, except if image is bigger than page
class Image extends Base {
  static defaultProps = {
    wrap: false,
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
      this.page.height -
      pagePadding.top -
      pagePadding.bottom -
      imageMargin.top -
      imageMargin.bottom -
      SAFETY_HEIGHT;

    if (
      widthMode === Yoga.MEASURE_MODE_EXACTLY &&
      heightMode === Yoga.MEASURE_MODE_UNDEFINED
    ) {
      const scaledHeight = width / this.ratio;
      return { height: Math.min(pageArea, scaledHeight) };
    }

    if (
      heightMode === Yoga.MEASURE_MODE_EXACTLY &&
      widthMode === Yoga.MEASURE_MODE_UNDEFINED
    ) {
      return { width: height * this.ratio };
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

  isEmpty() {
    return false;
  }

  get ratio() {
    return this.image.data ? this.image.width / this.image.height : 1;
  }

  async fetch() {
    try {
      this.image = await fetchImage(this.props.src);
    } catch (e) {
      this.image = { width: 0, height: 0 };
      console.warn(e.message);
    }
  }

  async render() {
    const margin = this.margin;
    const padding = this.padding;
    const { left, top } = this.getAbsoluteLayout();

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    if (this.image.data) {
      // Inner offset between yoga node and image box
      // Makes image centered inside Yoga node
      const containerWidth = this.width - margin.right - margin.left;
      const containerHeight = this.height - margin.top - margin.bottom;
      const imageWidth = Math.min(containerHeight * this.ratio, containerWidth);
      const xOffset = Math.max((containerWidth - imageWidth) / 2, 0);

      this.root.image(
        this.image.data,
        left + padding.left + margin.left + xOffset,
        top + padding.top + margin.top,
        {
          width: imageWidth - padding.left - padding.right,
          height: containerHeight - padding.top - padding.bottom,
        },
      );
    }
  }
}

export default Image;
