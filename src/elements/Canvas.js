import Base from './Base';

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
    if (this.props.children) this.props.children(this.root.instance);
    if (this.props.debug) this.debug();
    this.root.instance.restore();
  }
}

export default Canvas;
