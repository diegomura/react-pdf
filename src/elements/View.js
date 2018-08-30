import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  get name() {
    return 'View';
  }

  async render(page) {
    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    await this.renderChildren(page);
  }
}

export default View;
