import Base from './Base';
import { getURL, setLink } from '../utils/url';

class Link extends Base {
  get name() {
    return 'Link';
  }

  get src() {
    return getURL(this.props.src || this.props.href);
  }

  async render() {
    setLink(this);
    await this.renderChildren();
    if (this.props.debug) this.debug();
  }
}

export default Link;
