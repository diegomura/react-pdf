import Base from './Base';

import painter from '../utils/painter';
import warning from '../utils/warning';

class Canvas extends Base {
  static defaultProps = {
    style: {},
    wrap: false,
  };

  get name() {
    return 'Canvas';
  }

  async render() {
    const { left, top, width, height } = this.getAbsoluteLayout();

    const availableWidth = width - this.paddingLeft - this.paddingRight;
    const availableHeight = height - this.paddingTop - this.paddingBottom;

    warning(
      availableWidth && availableHeight,
      'Canvas element has null width or height. Please provide valid values via the `style` prop in order to correctly render it.',
    );

    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();
    this.clip();

    this.root.instance.translate(
      left + this.paddingLeft,
      top + this.paddingTop,
    );

    if (this.props.paint) {
      this.props.paint(
        painter(this.root.instance),
        availableWidth,
        availableHeight,
      );
    }

    this.root.instance.restore();

    if (this.props.debug) {
      this.debug();
    }

    if (this.props.testID) {
      this.registerTestId(this.props.testID);
    }
  }
}

export default Canvas;
