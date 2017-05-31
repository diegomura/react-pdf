import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
  };

  async render() {
    this.drawBackgroundColor();

    await this.renderChildren();
  }
}

export default View;
