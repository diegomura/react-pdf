import Base from './Base';

class View extends Base {
  static defaultProps = {
    wrap: true,
  };

  get name() {
    return 'View';
  }

  setDest() {
    this.root.instance.addNamedDestination(this.props.dest);
  }

  async render() {
    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();
    await this.renderChildren();
    if (this.props.dest) this.setDest();
    if (this.props.debug) this.debug();
    this.root.instance.restore();
  }
}

export default View;
