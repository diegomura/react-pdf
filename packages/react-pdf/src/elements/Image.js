import Yoga from 'yoga-layout';
import Base from './Base';
import { fetchImage } from '../utils/image';

class Image extends Base {
  image = null;

  constructor(root, props) {
    super(root, props);

    this.fetch = fetchImage(props.src);
  }

  shouldGrow() {
    return !!this.getComputedStyles().flexGrow;
  }

  calculateHeight(width) {
    const ratio = this.image.width / this.image.height;
    return width / ratio;
  }

  calculateWidth(height) {
    const ratio = this.image.width / this.image.height;
    return height * ratio;
  }

  measureImage(width, widthMode, height, heightMode) {
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      return { height: this.calculateHeight(width) };
    }

    if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
      return { width: this.calculateWidth(height) };
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

  async recalculateLayout() {
    this.image = await this.fetch;

    if (!this.shouldGrow()) {
      this.layout.setMeasureFunc(this.measureImage.bind(this));
      this.layout.markDirty();
    }
  }

  async render() {
    const padding = this.getPadding();
    const { left, top, width, height } = this.getAbsoluteLayout();

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    this.root.image(this.image.data, left + padding.left, top + padding.top, {
      width: width - padding.left - padding.right,
      height: height - padding.top - padding.bottom,
    });
  }
}

export default Image;
