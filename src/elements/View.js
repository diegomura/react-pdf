import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  get name() {
    return 'View';
  }

  async render() {
    this.drawBackgroundColor();
    this.drawBorders();

    await this.renderChildren();

    if (this.props.debug) this.debug();
  }
}

export default View;
