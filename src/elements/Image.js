import Base from './Base';
import warning from '../utils/warning';
import { resolveObjectFit } from '../utils/objectFit';

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

  async onAppendDynamically() {
    await this.fetch();
  }

  renderImage() {
    const padding = this.padding;
    const { left, top } = this.getAbsoluteLayout();
    const { opacity, objectPositionX, objectPositionY } = this.style;

    this.root.instance.save();

    // Clip path to keep image inside border radius
    this.clip();

    if (this.image.data) {
      const { width, height, xOffset, yOffset } = resolveObjectFit(
        this.style.objectFit,
        this.width - padding.left - padding.right,
        this.height - padding.top - padding.bottom,
        this.image.width,
        this.image.height,
        objectPositionX,
        objectPositionY,
      );

      if (width !== 0 && height !== 0) {
        this.root.instance
          .fillOpacity(opacity)
          .image(
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
