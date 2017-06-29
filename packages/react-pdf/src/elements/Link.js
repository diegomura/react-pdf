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
        link: this.props.src,
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
          link: this.props.src,
          width: width + 0.1,
          height: height + 0.1,
          align,
          underline: textDecoration === 'underline',
        });
    }
  }
}

export default Link;
