import Base from './Base';

import painter from '../utils/painter';

class Canvas extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  get name() {
    return 'Canvas';
  }

  async render() {
    const { left, top, width, height } = this.getAbsoluteLayout();

    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();

    this.root.instance.translate(
      left + this.paddingLeft,
      top + this.paddingTop,
    );

    const availableWidth = width - this.paddingLeft - this.paddingRight;
    const availableHeight = height - this.paddingTop - this.paddingBottom;

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
  }
}

export default Canvas;
