import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
  };

  async render() {
    this.drawBackgroundColor();
    this.drawBorders();

    await this.renderChildren();
  }
}

export default View;
