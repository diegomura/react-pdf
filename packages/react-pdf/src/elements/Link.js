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
    const {
      fontSize = 18,
      color = 'blue',
      textDecoration = 'underline',
    } = this.style;

    this.root.fillColor(color).fontSize(fontSize).text(this.children, {
      link: this.getSrc(),
      continued: true,
      underline: textDecoration === 'underline',
    });
  }

  renderBlockLink() {
    const {
      align,
      fontSize = 18,
      color = 'blue',
      textDecoration = 'underline',
    } = this.style;

    const { left, top, width, height } = this.getAbsoluteLayout();

    this.drawBackgroundColor();
    this.drawBorders();

    this.root
      .fillColor(color)
      .fontSize(fontSize)
      .text(this.children, left, top, {
        link: this.getSrc(),
        width: width + 0.1,
        height: height + 0.1,
        align,
        underline: textDecoration === 'underline',
      });
  }

  async render({ inline } = {}) {
    await this.loadFont();

    if (inline) {
      this.renderInlineLink();
    } else {
      this.renderBlockLink();
    }
  }
}

export default Link;
