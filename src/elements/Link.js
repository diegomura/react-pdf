import Text from './Text';

const PROTOCOL_REGEXP = /^(http|https|ftp|ftps|mailto)\:\/\//i;

class Link extends Text {
  static defaultProps = {
    style: {
      color: 'blue',
      textDecoration: 'underline',
    },
  };

  get name() {
    return 'Link';
  }

  get src() {
    let { src } = this.props;

    if (typeof src === 'string' && !src.match(PROTOCOL_REGEXP)) {
      src = `http://${src}`;
    }

    return src;
  }
}

export default Link;
