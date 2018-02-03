import warning from 'fbjs/lib/warning';
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

  renderInlineLink() {
    const { color = 'blue', textDecoration = 'underline' } = this.style;

    this.root.fillColor(color).text(this.children, {
      link: this.getSrc(),
      continued: true,
      underline: textDecoration === 'underline',
    });
  }

  renderBlockLink() {
    const {
      align,
      textAlign,
      color = 'blue',
      textDecoration = 'underline',
    } = this.getComputedStyles();
    const { left, top, width, height } = this.getAbsoluteLayout();

    warning(
      !align,
      '"align" style prop will be deprecated on future versions. Please use "textAlign" instead in Link node',
    );

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    this.root.fillColor(color).text(this.children, left, top, {
      link: this.getSrc(),
      width,
      height,
      align: align || textAlign,
      underline: textDecoration === 'underline',
    });
  }

  async render({ inline } = {}) {
    this.setFontSize();
    this.setFontFamily();

    if (inline) {
      this.renderInlineLink();
    } else {
      this.renderBlockLink();
    }
  }
}

export default Link;
