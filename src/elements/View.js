import Base from './Base';

class View extends Base {
  static defaultProps = {
    wrap: true,
  };

  async render() {
    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();
    await this.renderChildren();
    if (this.props.debug) this.debug();
    this.root.instance.restore();
  }
}

export default View;
