import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
  };

  async render() {
    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    await this.renderChildren();
  }
}

export default View;
