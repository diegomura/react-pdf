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
    this.imageWidth = null;
    this.imageHeight = null;
    this.layout.setMeasureFunc(this.measureImage.bind(this));
  }

  shouldGrow() {
    return !!this.getComputedStyles().flexGrow;
  }

  measureImage(width, widthMode, height, heightMode) {
    const imageMargin = this.margin;
    const pagePadding = this.page.padding;
    const ratio = this.image.width / this.image.height;
    const pageArea =
      this.page.height -
      pagePadding.top -
      pagePadding.bottom -
      imageMargin.top -
      imageMargin.bottom -
      SAFETY_HEIGHT;

    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      const scaledHeight = width / ratio;

      if (pageArea < scaledHeight) {
        this.imageWidth = pageArea * ratio;
        this.imageHeight = pageArea;

        return { height: pageArea };
      }

      this.imageWidth = width;
      this.imageHeight = scaledHeight;

      return { height: scaledHeight };
    }

    if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.imageHeight = height;
      this.imageWidth = height * ratio;

      return { width: height * ratio };
    }

    if (
      widthMode === Yoga.MEASURE_MODE_AT_MOST &&
      heightMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      const imageWidth = Math.min(this.image.width, width);

      return {
        width: imageWidth,
        height: this.calculateHeight(imageWidth),
      };
    }
  }

  isEmpty() {
    return false;
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
    const padding = this.padding;
    const { left, top, width, height } = this.getAbsoluteLayout();

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    if (this.image.data) {
      // Inner offset between yoga node and image box
      // Makes image centered inside Yoga node
      const xOffset = (width - this.imageWidth) / 2;
      const yOffset = (height - this.imageHeight) / 2;

      this.root.image(
        this.image.data,
        left + padding.left + xOffset,
        top + padding.top + yOffset,
        { width: this.imageWidth, height: this.imageHeight },
      );
    }
  }
}

export default Image;
