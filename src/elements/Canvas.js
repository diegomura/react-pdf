import Base from './Base';
import painter from '../painter';

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
    const { left, top } = this.getAbsoluteLayout();
    this.root.instance.translate(left, top);
    if (this.props.children) this.props.children(painter(this.root.instance));
    if (this.props.debug) this.debug();
    this.root.instance.restore();
  }
}

export default Canvas;
