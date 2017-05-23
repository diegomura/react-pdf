import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
  };

  async render() {
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { backgroundColor } = this.style;

    if (backgroundColor) {
      this.root
        .fillColor(backgroundColor)
        .rect(left, top, width, height)
        .fill();
    }

    await this.renderChildren();
  }
}

export default View;
