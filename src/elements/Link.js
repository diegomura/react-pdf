import Base from './Base';
import { getURL } from '../utils/url';

class Link extends Base {
  get name() {
    return 'Link';
  }

  get src() {
    return getURL(this.props.src || this.props.href);
  }

  isSrcDest() {
    console.log('in link');
    return this.src.slice(0, 1) === '-';
  }

  async render() {
    const { top, left, width, height } = this.getAbsoluteLayout();
    this.root.instance[this.isSrcDest() ? 'goTo' : 'link'](
      left,
      top,
      width,
      height,
      this.src,
    );
    await this.renderChildren();
    if (this.props.debug) this.debug();
  }
}

export default Link;
