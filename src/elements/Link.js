import Base from './Base';

class Link extends Base {
  async render() {
    const { top, left, width, height } = this.getAbsoluteLayout();
    this.root.instance.link(left, top, width, height, this.src);
    await this.renderChildren();
    if (this.props.debug) this.debug();
  }
}

export default Link;
