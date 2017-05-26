import Base from './Base';
import Yoga from 'yoga-layout';

class Text extends Base {
  constructor(root, props) {
    super(root, props);

    this.layout.setMeasureFunc((w, wm, h, hm) => {
      console.log(`${wm} : ${w} - ${hm} : ${h}`);

      // Set fontSize to calculate height and width
      this.root.fontSize(this.style.fontSize || 18);

      if (wm === Yoga.MEASURE_MODE_EXACTLY) {
        return { height: this.getHeight(w) };
      }

      return {};
    });
  }

  appendChild(child) {
    this.children = child;
  }

  removeChild(child) {
    this.children = null;
  }

  // Width is the minimum between the text as
  // it were in one line and the parent's width.
  getWidth() {
    const layout = this.getAbsoluteLayout();
    const parentLayout = this.parent.getAbsoluteLayout();

    return Math.min(
      this.root.widthOfString(`${this.props.children}`),
      parentLayout.width,
      layout.width,
    );
  }

  // Then, with that width we calculate the text's
  // height on the document.
  getHeight(width) {
    return this.root.heightOfString(`${this.props.children}`, { width });
  }

  recalculateLayout() {
    // Set fontSize to calculate height and width
    this.root.fontSize(this.style.fontSize || 18);

    const width = this.getWidth();
    const height = this.getHeight(width);

    this.layout.setWidth(width);
    this.layout.setHeight(height);
  }

  async render() {
    const { fontSize = 18, color = 'black' } = this.style;
    const { left, top, width, height } = this.getAbsoluteLayout();

    console.log('render', width, height);

    this.root.rect(left, top, width, height).stroke();

    // Increase a bit the width of the text.
    // If not, the excecution freezes.
    this.root
      .fillColor(color)
      .fontSize(fontSize)
      .text(this.children, left, top, {
        width: width + 0.1,
        height: height + 0.1,
      });
  }
}

export default Text;
