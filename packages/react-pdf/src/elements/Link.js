import Text from './Text';

class Link extends Text {
  async render() {
    const { fontSize = 18, color = 'blue', align, textDecoration } = this.style;
    const { left, top, width, height } = this.getAbsoluteLayout();

    const finalWidth = width + 0.1; // Increase a bit the width of the text or excecution freezes.
    const finalHeight = height + 0.1; // Increase a bit the height of the text or excecution freezes.

    this.drawBackgroundColor();

    this.root
      .fillColor(color)
      .fontSize(fontSize)
      .text(this.children, left, top, {
        width: finalWidth,
        height: finalHeight,
        align,
        underline: textDecoration === 'underline',
      })
      .link(left, top, finalWidth, finalHeight, this.props.src);
  }
}

export default Link;
