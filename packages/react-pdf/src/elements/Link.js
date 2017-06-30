import Text from './Text';

class Link extends Text {
  async render({ inline } = {}) {
    const {
      align,
      fontSize = 18,
      color = 'blue',
      textDecoration = 'underline',
    } = this.style;

    if (inline) {
      this.root.fillColor(color).fontSize(fontSize).text(this.children, {
        link: this._getSrc(),
        continued: true,
        underline: textDecoration === 'underline',
      });
    } else {
      this.drawBackgroundColor();

      const { left, top, width, height } = this.getAbsoluteLayout();

      this.root
        .fillColor(color)
        .fontSize(fontSize)
        .text(this.children, left, top, {
          link: this._getSrc(),
          width: width + 0.1,
          height: height + 0.1,
          align,
          underline: textDecoration === 'underline',
        });
    }
  }

  _getSrc() {
    const PROTOCOL_REGEXP = /^(http|https|ftp|ftps|mailto)\:\/\//i;

    let { src } = this.props;

    if (typeof src === 'string' && !src.match(PROTOCOL_REGEXP)) {
      src = `http://${src}`;
    }

    return src;
  }
}

export default Link;
