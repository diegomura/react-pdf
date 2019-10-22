import Base from './Base';
import { getURL } from '../utils/url';

class Link extends Base {
  get name() {
    return 'Link';
  }

  get src() {
    return getURL(this.props.src || this.props.href);
  }

  async render() {
    await this.renderChildren();
    if (this.props.debug) this.debug();
  }
}

export default Link;
