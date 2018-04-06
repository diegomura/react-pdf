import Yoga from 'yoga-layout';
import Base from './Base';
import { fetchImage } from '../utils/image';

class Image extends Base {
  static defaultProps = {
    wrap: false,
  };

  constructor(root, props) {
    super(root, props);

    this.image = null;
    this.layout.setMeasureFunc(this.measureImage.bind(this));
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

  async fetch() {
    this.image = await fetchImage(this.props.src);
  }

  async render() {
    const margin = this.margin;
    const padding = this.padding;
    const { left, top, width, height } = this.getAbsoluteLayout();

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    this.root.image(
      this.image.data,
      left + padding.left + margin.left,
      top + padding.top + margin.top,
      {
        width:
          width - padding.left - padding.right - margin.left - margin.right,
        height:
          height - padding.top - padding.bottom - margin.top - margin.bottom,
      },
    );
  }
}

export default Image;
