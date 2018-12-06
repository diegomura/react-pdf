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
    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();
    const { left, top, width, height } = this.getAbsoluteLayout();
    this.root.instance.translate(left, top);
    if (this.props.paint)
      this.props.paint(painter(this.root.instance), width, height);
    if (this.props.debug) this.debug();
    this.root.instance.restore();
  }
}

export default Canvas;
