import Yoga from 'yoga-layout';
import Base from './Base';
import { fetchImage } from '../utils/image';

class Image extends Base {
  image = null;

  constructor(root, props) {
    super(root, props);

    this.fetch = fetchImage(props.src);
    this.layout.setMeasureFunc(this.measureImage.bind(this));
  }

  shouldGrow() {
    return !!this.style.flexGrow;
  }

  getHeight(width) {
    const ratio = this.image.width / this.image.height;
    return width / ratio;
  }

  measureImage(width, widthMode, height, heightMode) {
    if (this.image) {
      if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
        return { height: this.shouldGrow() ? height : this.getHeight(width) };
      }

      if (
        widthMode === Yoga.MEASURE_MODE_AT_MOST &&
        heightMode === Yoga.MEASURE_MODE_AT_MOST
      ) {
        const imageWidth = Math.min(this.image.width, width);

        return {
          width: this.shouldGrow() ? NaN : imageWidth,
          height: this.shouldGrow() ? height : this.getHeight(imageWidth),
        };
      }
    }
    return {};
  }

  async recalculateLayout() {
    this.image = await this.fetch;
    this.layout.markDirty();
  }

  async render() {
    const { left, top, width, height } = this.getAbsoluteLayout();

    this.drawBackgroundColor();

    this.root.image(this.image.data, left, top, { width, height });
  }
}

export default Image;
