import Text from './Text';

const PROTOCOL_REGEXP = /^(http|https|ftp|ftps|mailto)\:\/\//i;

class Link extends Text {
  getSrc() {
    let { src } = this.props;

    if (typeof src === 'string' && !src.match(PROTOCOL_REGEXP)) {
      src = `http://${src}`;
    }

    return src;
  }

  async render(page) {
    this.style.color = this.style.color || 'blue';
    this.style.textDecoration = this.style.textDecoration || 'underline';

    await super.render(page);
  }
}

export default Link;
